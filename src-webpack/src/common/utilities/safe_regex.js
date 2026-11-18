// ────────────────────────────────────────────────────────────────────────────
// Utility / Safe Regex
// ────────────────────────────────────────────────────────────────────────────

/**
 * Checks whether a user-supplied regex pattern is safe to compile with
 * `new RegExp()`. Rejects patterns with catastrophic backtracking shapes
 * (nested/stacked quantifiers) that could freeze the page, plus overlong
 * patterns and invalid flags. This is a heuristic against accidental
 * self-DoS from the user's own block lists, not a full safe-regex engine.
 *
 * The pattern is scanned linearly, tracking for every group the character
 * class of its first token and of its trailing token: a group that is
 * unbounded-quantified (+, *, {n,}) and whose trailing atom can match the
 * same characters another iteration starts with — (a+)+, ((a+))+, (\s*\w+)* —
 * can backtrack exponentially, so it is rejected. Unambiguous shapes pass:
 * lazy quantifiers (a+?, \d{2,4}?, x??), (\w+\s?)* (trailing \s? cannot match
 * what the next iteration starts with), (\w+\.)+ (trailing dot vs word
 * first), and URL/host patterns like (\.[a-z0-9-]+)*.
 *
 * Known residuals (both classes also pass this guard today):
 * - a bounded trailing atom inside an unbounded group: (\d{1,3})+
 * - overlapping alternations with equal-length branches: (a|aa)+
 *
 * @param {*} pattern - The regex body (without /delimiters/ and flags)
 * @param {*} flags - The regex flags
 * @returns {boolean} True if the pattern is safe to compile
 */

// Maximum allowed pattern length.
const MAX_PATTERN_LENGTH = 200;

// Maximum number of real quantifiers in a single pattern (rejects
// a*a*a*a*…-style stacked repetition). Quantifiers that are part of a group
// intro — the "?" of (?:, (?=, (?!, (?<=, (?<name> — are not counted.
const MAX_QUANTIFIERS = 10;

// Valid RegExp flags (d and v were added in ES2023 / ES2024).
const VALID_FLAGS = /^[dgimsuvy]*$/;

// ─── Quantifier helpers ─────────────────────────────────────────────────────

// Parses a quantifier token ('+', '*', '?', '+?', '{2}', '{2,}', '{2,4}?')
// into its repetition properties.
function parseRange(q) {
	if (q[0] === '+' || q[0] === '*' || q[0] === '?') {
		return { unbounded: q[0] !== '?', nullable: q[0] === '*' || q[0] === '?' };
	}
	const m = /^\{([0-9]+)(?:,([0-9]*))?\}$/.exec(q);
	if (!m) return { unbounded: false, nullable: false };
	// {n} matches exactly n times; {n,} is unbounded; {n,m} is bounded.
	// Only a minimum of 0 allows the atom to match zero times.
	return { unbounded: m[2] === '', nullable: m[1] === '0' };
}

// True when the quantifier allows zero repetitions (a*, a?, a{0,3}, a{0,}).
function isNullable(q) {
	return q ? parseRange(q).nullable : false;
}

// True when the quantifier allows unbounded repetition (a+, a*, a{2,}).
function isUnbounded(q) {
	return q ? parseRange(q).unbounded : false;
}

// ─── Character-class descriptors ────────────────────────────────────────────
// Rough character sets used for the first-vs-trailing overlap test:
// {t:'lit',c} single character; {t:'sh',s} shorthand class (d/w/s, upper for
// negated); {t:'dot'} the dot; {t:'cls',neg,members} a bracket class;
// {t:'any'} anything unknown (conservatively overlaps everything).

const SH_CAN = { d: /[0-9]/, w: /[A-Za-z0-9_]/, s: /[\t\n\v\f\r ]/ };

function canMatch(desc, ch) {
	if (!desc || desc.t === 'any' || desc.t === 'dot') return true;
	if (desc.t === 'lit') return ch === desc.c;
	if (desc.t === 'sh') {
		const r = SH_CAN[desc.s.toLowerCase()];
		return desc.s === desc.s.toLowerCase() ? r.test(ch) : !r.test(ch);
	}
	// Bracket class.
	const inside = desc.members.some((m) => {
		if (m.t === 'lit') return ch === m.c;
		if (m.t === 'rng') return ch >= m.a && ch <= m.b;
		if (m.t === 'sh') {
			const r = SH_CAN[m.s.toLowerCase()];
			return m.s === m.s.toLowerCase() ? r.test(ch) : !r.test(ch);
		}
		return true; // unknown member (\p{…}, …)
	});
	return desc.neg ? !inside : inside;
}

const SAMPLES = ['a', 'z', 'A', '0', '5', '_', ' ', '\t', '.', '-', '!', '~'];

// Conservative overlap test: true unless both descriptors are known and
// provably disjoint.
function overlapsDesc(d1, d2) {
	if (!d1 || !d2) return true;
	if (d1.t === 'any' || d2.t === 'any' || d1.t === 'dot' || d2.t === 'dot') return true;
	if (d1.t === 'lit' && d2.t === 'lit') return d1.c === d2.c;
	if (d1.t === 'lit') return canMatch(d2, d1.c);
	if (d2.t === 'lit') return canMatch(d1, d2.c);
	// Shorthand/class vs shorthand/class: probe sample characters plus the
	// literal members of both classes.
	const chars = new Set(SAMPLES);
	for (const d of [d1, d2]) {
		if (d.t === 'cls') for (const m of d.members) if (m.t === 'lit') chars.add(m.c);
	}
	return [...chars].some((ch) => canMatch(d1, ch) && canMatch(d2, ch));
}

const ESC_DESC = { d: 'd', w: 'w', s: 's', D: 'D', W: 'W', S: 'S' };

// Reads a bracket class starting at p[i] === '['. Returns its descriptor and
// the index of its closing ']'.
function readClass(p, i) {
	let j = i + 1;
	let neg = false;
	if (p[j] === '^') {
		neg = true;
		j++;
	}
	const members = [];
	let unknown = false;
	if (p[j] === ']') {
		members.push({ t: 'lit', c: ']' });
		j++;
	} // []…] starts with a literal ]
	while (j < p.length && p[j] !== ']') {
		if (p[j] === '\\') {
			const c = p[j + 1];
			if (ESC_DESC[c] !== undefined) members.push({ t: 'sh', s: ESC_DESC[c] });
			else if (/[pPu]/.test(c)) unknown = true;
			else members.push({ t: 'lit', c });
			j += 2;
			continue;
		}
		if (p[j + 1] === '-' && p[j + 2] !== ']' && p[j + 2] !== undefined) {
			members.push({ t: 'rng', a: p[j], b: p[j + 2] });
			j += 3;
			continue;
		}
		members.push({ t: 'lit', c: p[j] });
		j++;
	}
	if (unknown) members.push({ t: 'unk' });
	return { desc: { t: 'cls', neg, members }, end: j };
}

// Reads a quantifier at p[i] ('+', '*', '?', '{…}' each with optional lazy
// '?'). Returns {q, len} or null.
function readQuant(p, i) {
	const c = p[i];
	if (c === '+' || c === '*' || c === '?') {
		const len = p[i + 1] === '?' ? 2 : 1;
		return { q: p.slice(i, i + len), len };
	}
	if (c === '{') {
		const m = /^\{[0-9]+(?:,[0-9]*)?\}/.exec(p.slice(i));
		if (m) return { q: m[0], len: m[0].length };
	}
	return null;
}

/**
 * Scans a pattern body and reports its real quantifier count and whether it
 * has a catastrophic nested-quantifier shape. Malformed patterns (unbalanced
 * groups, stray quantifiers) never throw here — they are rejected by the
 * `new RegExp()` compile check at the call sites.
 * @param {string} p - The regex body
 * @returns {{quantifiers: number, catastrophic: boolean}}
 */
function scanRegexBody(p) {
	// One frame per open group. Per branch inside the frame:
	// firsts[i] — descriptor of the branch's first non-nullable token (null
	// until set, or when every token of the branch is nullable), and
	// trails[i] — {unbounded, desc} of the branch's last token, where
	// unbounded means "this branch can end with an unbounded-quantified atom"
	// (its own quantifier, or transitively through unquantified groups).
	const stack = [{ firsts: [null], trails: [null] }];
	let escaped = false;
	let quantifiers = 0;
	let catastrophic = false;

	const cur = () => stack[stack.length - 1];
	// Records a token in the current branch: firsts (unless nullable) and the
	// branch trail. q is the token's own quantifier, endsUnbounded says the
	// token can end with an unbounded-quantified atom (groups).
	const recordToken = (frame, firstDesc, trailDesc, q, endsUnbounded) => {
		if (q) quantifiers++;
		const branch = frame.firsts.length - 1;
		if (!isNullable(q) && frame.firsts[branch] === null) frame.firsts[branch] = firstDesc;
		frame.trails[branch] = { unbounded: isUnbounded(q) || endsUnbounded, desc: trailDesc };
	};

	for (let i = 0; i < p.length; i++) {
		const c = p[i];
		if (escaped) {
			escaped = false;
			const f = cur();
			const qInfo = readQuant(p, i + 1);
			if (ESC_DESC[c] !== undefined) recordToken(f, { t: 'sh', s: ESC_DESC[c] }, { t: 'sh', s: ESC_DESC[c] }, qInfo?.q, false);
			else recordToken(f, { t: 'lit', c }, { t: 'lit', c }, qInfo?.q, false);
			if (qInfo) i += qInfo.len;
			continue;
		}
		if (c === '\\') {
			escaped = true;
			continue;
		}
		const f = cur();
		if (c === '(') {
			stack.push({ firsts: [null], trails: [null] });
			// Consume the group intro so (?: (?= (?! (?<= (?<! (?<name> (?i:
			// characters are not mistaken for atoms.
			let j = i + 1;
			if (p[j] === '?') {
				if (p[j + 1] === '<' && (p[j + 2] === '=' || p[j + 2] === '!')) j += 4;
				else if (p[j + 1] === '<') {
					const m = /^<[^>]*>/.exec(p.slice(j + 1));
					j += m ? 1 + m[0].length : 2;
				} else {
					const m = /^[a-zA-Z-]*[:=)!]?/.exec(p.slice(j + 1));
					j += 1 + m[0].length;
				}
			}
			i = j - 1; // the for-loop's i++ lands on the first content char
			continue;
		}
		if (c === ')') {
			if (stack.length === 1) continue; // unbalanced; compile check rejects
			const g = stack.pop();
			const qInfo = readQuant(p, i + 1);
			// Catastrophic shape: the group is unbounded-quantified and some
			// branch's trailing atom overlaps what some iteration can start
			// with. A branch with no non-nullable first token (everything
			// nullable) can effectively start anywhere → treated as 'any'.
			if (isUnbounded(qInfo?.q)) {
				for (let bi = 0; bi < g.trails.length; bi++) {
					const tr = g.trails[bi];
					if (!tr || !tr.unbounded) continue;
					for (let bj = 0; bj < g.firsts.length; bj++) {
						if (overlapsDesc(tr.desc, g.firsts[bj])) catastrophic = true;
					}
				}
			}
			// The group becomes a token in the parent branch: its first is the
			// first of a single set branch (or 'any'), its trail is the trail
			// of a single branch (or 'any'), and "ends unbounded" propagates
			// through the group when it is unquantified or itself unbounded.
			const gf = stack[stack.length - 1];
			const firstsSet = g.firsts.filter(Boolean);
			const groupFirst = firstsSet.length === 1 ? firstsSet[0] : { t: 'any' };
			const realTrails = g.trails.filter(Boolean);
			const groupTrailDesc = realTrails.length === 1 ? realTrails[0].desc : { t: 'any' };
			const groupEndsUnb = realTrails.some((tr) => tr.unbounded);
			recordToken(gf, groupFirst, groupTrailDesc, qInfo?.q, groupEndsUnb);
			if (qInfo) i += qInfo.len;
			continue;
		}
		if (c === '|') {
			f.firsts.push(null);
			f.trails.push(null);
			continue;
		}
		if (c === '[') {
			const { desc, end } = readClass(p, i);
			const qInfo = readQuant(p, end + 1);
			recordToken(f, desc, desc, qInfo?.q, false);
			if (qInfo) i = end + qInfo.len;
			else i = end;
			continue;
		}
		if (c === '.') {
			const qInfo = readQuant(p, i + 1);
			recordToken(f, { t: 'dot' }, { t: 'dot' }, qInfo?.q, false);
			if (qInfo) i += qInfo.len;
			continue;
		}
		if (c === '+' || c === '*' || c === '?') continue; // stray; compile check rejects
		if (c === '{') {
			const m = /^\{[0-9]+(?:,[0-9]*)?\}/.exec(p.slice(i));
			if (m) i += m[0].length - 1;
			continue;
		}
		// Plain literal atom.
		{
			const qInfo = readQuant(p, i + 1);
			recordToken(f, { t: 'lit', c }, { t: 'lit', c }, qInfo?.q, false);
			if (qInfo) i += qInfo.len;
		}
	}
	return { quantifiers, catastrophic };
}

export function isSafeRegexPattern(pattern, flags = '') {
	if (typeof pattern !== 'string' || typeof flags !== 'string') return false;
	if (pattern.length === 0 || pattern.length > MAX_PATTERN_LENGTH) return false;
	if (!VALID_FLAGS.test(flags)) return false;
	const { quantifiers, catastrophic } = scanRegexBody(pattern);
	if (catastrophic || quantifiers > MAX_QUANTIFIERS) return false;
	return true;
}

// Warns about an unsafe pattern once per unique pattern string. Used by the
// matching path in the block filters: a stored pattern that no longer passes
// the guard would otherwise silently match nothing, or spam the console once
// per tested post.
const warnedUnsafePatterns = new Set();

export function reportUnsafeRegexPattern(patternStr) {
	if (warnedUnsafePatterns.has(patternStr)) return;
	warnedUnsafePatterns.add(patternStr);
	console.warn('Unsafe regex pattern rejected (it will never match):', patternStr);
}

// Validate regex patterns in a comma-separated block list.
// Returns true if all patterns that look like regex (starting with '/') are valid and safe.
export function validateRegexList(value) {
	if (!value) return true;
	const patterns = value
		.split(',')
		.map((p) => p.trim())
		.filter((p) => p !== '' && p !== '*');
	for (const pattern of patterns) {
		const trimmed = pattern.trim();
		if (trimmed.startsWith('/')) {
			const match = trimmed.match(/^\/(.+?)\/([a-z]*)$/i);
			if (!match) {
				return false;
			}
			const patternBody = match[1];
			const flags = match[2] || 'i';
			try {
				new RegExp(patternBody, flags);
			} catch (e) {
				return false;
			}
			if (!isSafeRegexPattern(patternBody, flags)) {
				return false;
			}
		}
	}
	return true;
}

// Returns an array of invalid regex pattern strings from a comma-separated block list.
export function getInvalidRegexPatterns(value) {
	if (!value) return [];
	const patterns = value
		.split(',')
		.map((p) => p.trim())
		.filter((p) => p !== '' && p !== '*');
	const invalid = [];
	for (const pattern of patterns) {
		const trimmed = pattern.trim();
		if (trimmed.startsWith('/')) {
			const match = trimmed.match(/^\/(.+?)\/([a-z]*)$/i);
			if (!match) {
				invalid.push(trimmed);
			} else {
				const patternBody = match[1];
				const flags = match[2] || 'i';
				try {
					new RegExp(patternBody, flags);
				} catch (e) {
					invalid.push(trimmed);
					continue;
				}
				if (!isSafeRegexPattern(patternBody, flags)) {
					invalid.push(trimmed);
				}
			}
		}
	}
	return invalid;
}
