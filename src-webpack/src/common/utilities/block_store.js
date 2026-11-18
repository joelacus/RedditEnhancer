// ────────────────────────────────────────────────────────────────────────────
// Utility / Block Store
// ────────────────────────────────────────────────────────────────────────────
// Single compressed store for all block lists, kept in storage.local (which
// holds ~10MiB, far more than sync's ~100KiB). Shape:
// {
//   users: { "<name>": { posts: bool, comments: bool } },
//   subreddits: { "<name>": { posts: bool } },
//   keywords: [{ pattern: "<raw>", title: bool, url: bool, comments: bool }]
// }
// User/subreddit keys keep their original capitalisation and are matched
// case-insensitively.
// ────────────────────────────────────────────────────────────────────────────

import { readCompressedObject, writeCompressedObject, MAX_COMPRESSED_CHARS } from './compressed_storage.js';
import { isSafeMapKey, sanitiseMap } from './safe_map_key.js';
import { isValidTagMap, writeTags } from './tag_store.js';

export const BLOCK_STORE_KEY = 'blockStore';

// Legacy sync keys, migrated once into the store and then removed.
export const LEGACY_LIST_KEYS = ['hideBlockedKeywordPostsList', 'hideBlockedUserPostsList', 'hideBlockedLinkPostsList', 'hideBlockedSubredditPostsList', 'hideBlockedKeywordCommentsList', 'hideBlockedUserCommentsList'];

// Refuse to write payloads larger than this (characters of base64 text).
const MAX_PAYLOAD_CHARS = MAX_COMPRESSED_CHARS;

// The one-shot legacy migration: the in-flight promise is cached so that
// concurrent readBlocks() callers (the block filters all batch together on
// page load) await the same migration instead of reading an empty
// storage.local while it is still running.
let migrationPromise = null;

export function invalidateBlockCache() {
	migrationPromise = null;
}

export function emptyBlockStore() {
	return { users: {}, subreddits: {}, keywords: [] };
}

// Parse a comma-separated block list into pattern strings (same rules as the legacy textareas).
export function parseBlockList(value) {
	if (typeof value !== 'string') return [];
	return value
		.split(',')
		.map((item) => item.trim())
		.filter((item) => item !== '' && item !== '*');
}

// ─── Validation ─────────────────────────────────────────────────────────────

function isValidStore(store) {
	if (!store || typeof store !== 'object') return false;
	if (!store.users || typeof store.users !== 'object' || Array.isArray(store.users)) return false;
	if (!store.subreddits || typeof store.subreddits !== 'object' || Array.isArray(store.subreddits)) return false;
	if (!Array.isArray(store.keywords)) return false;
	if (!store.keywords.every((e) => e && typeof e.pattern === 'string')) return false;
	return true;
}
export { isValidStore };

// ─── Read / Write ───────────────────────────────────────────────────────────

// Reads the store and sanitises the maps on every read: decoded data can come
// from any source (storage payload, backup import), so unsafe keys
// ("__proto__" etc.) are dropped here rather than trusted.
async function readStore() {
	const store = await readCompressedObject(BLOCK_STORE_KEY, isValidStore);
	if (!store) return null;
	store.users = sanitiseMap(store.users);
	store.subreddits = sanitiseMap(store.subreddits);
	return store;
}

async function loadBlocks() {
	const store = await readStore();
	if (store) return store;
	return (await importLegacyBackup()) || emptyBlockStore();
}

// Waits for the one-shot legacy migration (shared across concurrent callers),
// then always reads fresh from storage: the popup edits the same store from
// a separate JS context, so caching reads could clobber its changes.
export async function readBlocks() {
	if (!migrationPromise) migrationPromise = loadBlocks();
	await migrationPromise;
	return (await readStore()) || emptyBlockStore();
}

// Writes the store. Never throws: returns { ok } and leaves existing data
// untouched on failure. Callers show UI feedback (showToast) themselves, as
// this module has no DOM access (it also runs where document is unavailable).
export async function writeBlocks(store) {
	return writeCompressedObject(BLOCK_STORE_KEY, store, MAX_PAYLOAD_CHARS);
}

// ─── Legacy migration ───────────────────────────────────────────────────────

function readLegacyLists() {
	return new Promise((resolve) => {
		BROWSER_API.storage.sync.get(LEGACY_LIST_KEYS, (result) => {
			if (BROWSER_API.runtime.lastError) {
				console.error('[RedditEnhancer] blockStore: failed to read legacy lists', BROWSER_API.runtime.lastError.message);
				resolve({});
				return;
			}
			resolve(result || {});
		});
	});
}

function mergeKeyword(store, pattern, scope) {
	const existing = store.keywords.find((e) => e.pattern === pattern);
	if (existing) {
		existing[scope] = true;
	} else {
		store.keywords.push({ pattern, title: false, url: false, comments: false, [scope]: true });
	}
}

function mergeUser(store, name, scope) {
	if (!isSafeMapKey(name)) {
		console.warn('[RedditEnhancer] blockStore: ignoring invalid block name "' + name + '"');
		return;
	}
	const existing = findKey(store.users, name);
	const key = existing ?? name;
	if (!store.users[key]) store.users[key] = { posts: false, comments: false };
	store.users[key][scope] = true;
}

// Finds an existing object key case-insensitively (preserving its stored capitalisation).
export function findKey(obj, name) {
	const lower = name.toLowerCase();
	return Object.keys(obj || {}).find((k) => k.toLowerCase() === lower) ?? null;
}

// Folds legacy comma-separated sync lists into the store. Starts from the
// current store when one exists (backup restore merges rather than wipes).
// Verifies by reading back, and only then removes the legacy keys.
export async function importLegacyBackup() {
	const legacy = await readLegacyLists();
	const hasLegacy = LEGACY_LIST_KEYS.some((key) => typeof legacy[key] === 'string' && legacy[key] !== '');
	if (!hasLegacy) return null;

	const current = await readStore();
	const store = current || emptyBlockStore();
	for (const pattern of parseBlockList(legacy.hideBlockedKeywordPostsList)) mergeKeyword(store, pattern, 'title');
	for (const pattern of parseBlockList(legacy.hideBlockedLinkPostsList)) mergeKeyword(store, pattern, 'url');
	for (const pattern of parseBlockList(legacy.hideBlockedKeywordCommentsList)) mergeKeyword(store, pattern, 'comments');
	for (const name of parseBlockList(legacy.hideBlockedUserPostsList)) mergeUser(store, name, 'posts');
	for (const name of parseBlockList(legacy.hideBlockedUserCommentsList)) mergeUser(store, name, 'comments');
	for (const name of parseBlockList(legacy.hideBlockedSubredditPostsList)) {
		if (!findKey(store.subreddits, name)) store.subreddits[name] = { posts: true };
	}

	const writeResult = await writeBlocks(store);
	if (!writeResult.ok) return null;
	// Verify by reading back before deleting anything.
	const check = await readStore();
	if (!check) return null;
	await new Promise((resolve) => {
		BROWSER_API.storage.sync.remove(LEGACY_LIST_KEYS, () => resolve());
	});
	console.log('[RedditEnhancer] blockStore: imported legacy block lists');
	return check;
}

// ─── Backup restore (storage.local part) ────────────────────────────────────

// Restores the storage.local parts of a full config backup: blockStore and
// redditUserTags, exported as plain JSON by collectBackupData (popup
// backup_config.js). Replace semantics — restoring a backup reproduces the
// backed-up state, matching how the storage.sync keys restore (the Block
// Manager's own import stays merge-only). Invalid payloads are skipped so
// the sync keys still restore, and the writes never throw. Returns the
// per-store { ok, reason } results for the keys that were present.
export async function restoreLocalBackupStores(json) {
	const results = {};
	if (json && typeof json === 'object' && Object.prototype.hasOwnProperty.call(json, 'blockStore')) {
		if (isValidStore(json.blockStore)) {
			results.blockStore = await writeBlocks({
				users: sanitiseMap(json.blockStore.users),
				subreddits: sanitiseMap(json.blockStore.subreddits),
				keywords: json.blockStore.keywords.map((e) => ({ pattern: e.pattern, title: !!e.title, url: !!e.url, comments: !!e.comments })),
			});
		} else {
			console.error('[RedditEnhancer] backup restore: invalid blockStore in backup, skipping it');
			results.blockStore = { ok: false, reason: 'invalid' };
		}
	}
	if (json && typeof json === 'object' && Object.prototype.hasOwnProperty.call(json, 'redditUserTags')) {
		if (isValidTagMap(json.redditUserTags)) {
			results.redditUserTags = await writeTags(sanitiseMap(json.redditUserTags));
		} else {
			console.error('[RedditEnhancer] backup restore: invalid redditUserTags in backup, skipping it');
			results.redditUserTags = { ok: false, reason: 'invalid' };
		}
	}
	return results;
}

// ─── Selectors (patterns for the matching code) ─────────────────────────────

export function getPostKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.title).map((e) => e.pattern);
}

export function getUrlKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.url).map((e) => e.pattern);
}

export function getCommentKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.comments).map((e) => e.pattern);
}

export function getBlockedUserPatterns(store, scope) {
	return Object.keys(store.users || {}).filter((name) => store.users[name][scope]);
}

export function getBlockedSubredditPatterns(store) {
	return Object.keys(store.subreddits || {});
}

// ─── Mutators (pure: modify the object, then writeBlocks) ───────────────────

export function addUserBlock(store, username, scope) {
	if (!isSafeMapKey(username)) {
		console.warn('[RedditEnhancer] blockStore: ignoring invalid block name "' + username + '"');
		return;
	}
	const key = findKey(store.users, username) ?? username;
	if (!store.users[key]) store.users[key] = { posts: false, comments: false };
	if (scope === 'both') {
		store.users[key].posts = true;
		store.users[key].comments = true;
	} else {
		store.users[key][scope] = true;
	}
}

export function removeUserBlock(store, username, scope) {
	const key = findKey(store.users, username);
	if (!key) return;
	const entry = store.users[key];
	if (scope === 'both') {
		delete store.users[key];
	} else {
		entry[scope] = false;
		if (!entry.posts && !entry.comments) delete store.users[key];
	}
}

export function addSubredditBlock(store, name) {
	if (!isSafeMapKey(name)) {
		console.warn('[RedditEnhancer] blockStore: ignoring invalid block name "' + name + '"');
		return;
	}
	const key = findKey(store.subreddits, name) ?? name;
	if (!store.subreddits[key]) store.subreddits[key] = { posts: true };
}

export function removeSubredditBlock(store, name) {
	const key = findKey(store.subreddits, name);
	if (key) delete store.subreddits[key];
}

export function addKeywordBlock(store, pattern, scopes) {
	for (const scope of ['title', 'url', 'comments']) {
		if (scopes[scope]) mergeKeyword(store, pattern, scope);
	}
}

export function removeKeywordBlock(store, pattern, scopes) {
	const index = store.keywords.findIndex((e) => e.pattern === pattern);
	if (index === -1) return;
	if (!scopes) {
		store.keywords.splice(index, 1);
		return;
	}
	for (const scope of ['title', 'url', 'comments']) {
		if (scopes[scope]) store.keywords[index][scope] = false;
	}
	if (!store.keywords[index].title && !store.keywords[index].url && !store.keywords[index].comments) {
		store.keywords.splice(index, 1);
	}
}
