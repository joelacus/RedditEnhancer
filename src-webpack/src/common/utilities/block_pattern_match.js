// ────────────────────────────────────────────────────────────────────────────
// Utility / Block Pattern Match
// ────────────────────────────────────────────────────────────────────────────
// Shared matcher for every block list. A pattern is either a regular
// expression wrapped in slashes ("/pattern/flags") or plain text with "*"
// wildcards. Plain-text matching is case-insensitive; an explicit regex uses
// exactly its own flags (add /i for case-insensitive matching). Keeping this
// in one place means posts, comments, URLs, subreddit pages and the Block
// Manager all agree on what a pattern means.
// ────────────────────────────────────────────────────────────────────────────

import { isSafeRegexPattern, parseRegexPattern, reportUnsafeRegexPattern } from './safe_regex.js';

export function escapeRegExp(string) {
	// Escape regex metacharacters to prevent ReDoS
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function matchesPattern(text, patternStr) {
	if (!text) return false;
	// Check if pattern is regex format: /pattern/flags
	const parsed = parseRegexPattern(patternStr);
	if (parsed) {
		if (!isSafeRegexPattern(parsed.body, parsed.flags)) {
			reportUnsafeRegexPattern(patternStr);
			return false;
		}
		try {
			// An explicit regex uses exactly its own flags. Defaulting to "i"
			// here would make a case-sensitive class such as [A-Z] match
			// lowercase letters too.
			const regex = new RegExp(parsed.body, parsed.flags);
			return regex.test(text);
		} catch (e) {
			console.warn('Invalid regex pattern:', patternStr, e);
			return false;
		}
	} else {
		// Plain pattern with wildcard support. A word boundary is only added
		// where the pattern itself starts/ends with a word character: "\b"
		// can never match next to punctuation, so "c++", ".net", "#nsfw" and
		// "$100" could not match at all when it was added unconditionally.
		const escaped = escapeRegExp(patternStr);
		const regexPattern = escaped.replace(/\\\*/g, '.*');
		const lead = /^\w/.test(patternStr) ? '\\b' : '';
		const tail = /\w$/.test(patternStr) ? '\\b' : '';
		const regex = new RegExp(`${lead}${regexPattern}${tail}`, 'i');
		return regex.test(text);
	}
}
