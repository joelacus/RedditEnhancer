// ────────────────────────────────────────────────────────────────────────────
// Utility / Safe Map Keys
// ────────────────────────────────────────────────────────────────────────────
// Object keys that must never be used as keys in plain-object maps (blocked
// users, subreddits, user tags): reading map["__proto__"] returns
// Object.prototype instead of undefined, so a truthy-guard is defeated and
// the following assignment pollutes every object in the realm. "constructor"
// and "prototype" behave similarly. These strings can never be a real
// Reddit username or subreddit name, so they are rejected outright.
// ────────────────────────────────────────────────────────────────────────────

const UNSAFE_MAP_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

// True when name is safe to use as a key in a plain-object map. Check BEFORE
// any property access with that key.
export function isSafeMapKey(name) {
	return typeof name === 'string' && name !== '' && !UNSAFE_MAP_KEYS.has(name.toLowerCase());
}

// Copies a plain-object map into a fresh object, dropping unsafe keys.
// Decoded storage data can come from any source (storage payload, backup
// file), so maps are sanitised on every read.
export function sanitiseMap(map) {
	const clean = {};
	if (!map || typeof map !== 'object') return clean;
	for (const key of Object.keys(map)) {
		if (!isSafeMapKey(key)) {
			console.warn(`[RedditEnhancer] dropping unsafe map key "${key}"`);
			continue;
		}
		clean[key] = map[key];
	}
	return clean;
}
