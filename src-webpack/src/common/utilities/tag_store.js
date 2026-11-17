// ────────────────────────────────────────────────────────────────────────────
// Utility / Tag Store
// ────────────────────────────────────────────────────────────────────────────
// Single compressed store for all user tags, kept in storage.local (which
// holds ~10MiB, far more than sync's ~100KiB). Shape:
// { "<username>": { label, note, colourBg, colourFg, icon, createdAt, updatedAt } }
// Usernames keep their original capitalisation and are matched
// case-insensitively.
// ────────────────────────────────────────────────────────────────────────────

import { readCompressedObject, writeCompressedObject } from './compressed_storage.js';
import { sanitiseMap } from './safe_map_key.js';

export const TAG_STORE_KEY = 'redditUserTags';

export function isValidTagMap(tags) {
	return !!tags && typeof tags === 'object' && !Array.isArray(tags);
}

// Decoded-map cache. The content script's processUsernameElement calls
// readTags() for every username element on the page. The cache
// serves those reads from one decode and coalesces concurrent first reads
// (the whole first scan bursts in at once) into a single storage read.
//
// Invalidation:
// - writeTags below writes through to the cache on success. It must: the
//   storage.onChanged event fires asynchronously after the write, so an
//   invalidation-only design leaves a window where saveTagFromPopover's
//   follow-up scan reads a cached map that is missing the tag it just saved
//   and does not render the new chip.
// - The onChanged listener invalidates on any write from another context
//   (manager page, popup, backup import): onChanged is delivered to every
//   extension context, including this one.
// - The content tweak's userTagging:'refresh' handler (fired by the manager
//   after each of its writes) also invalidates before re-scanning, because
//   the ordering of that runtime message against the storage event is not
//   guaranteed.
let cachedTags = null;
let inflightRead = null;

export function readTags() {
	if (cachedTags) return Promise.resolve(cachedTags);
	if (!inflightRead) {
		inflightRead = readCompressedObject(TAG_STORE_KEY, isValidTagMap)
			.then((tags) => {
				const map = sanitiseMap(tags || {});
				cachedTags = map;
				inflightRead = null;
				return map;
			})
			.catch((e) => {
				inflightRead = null;
				throw e;
			});
	}
	return inflightRead;
}

export function invalidateTagsCache() {
	cachedTags = null;
}

// Writes the store. Never throws: returns { ok, reason } and leaves existing
// data untouched on failure. Callers show UI feedback (showToast) themselves,
// as this module has no DOM access (it also runs where document is unavailable).
export async function writeTags(tags) {
	const result = await writeCompressedObject(TAG_STORE_KEY, tags);
	if (result.ok) cachedTags = tags;
	return result;
}

BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && changes[TAG_STORE_KEY]) cachedTags = null;
});
