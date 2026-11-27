// ────────────────────────────────────────────────────────────────────────────
// Utility / Block Store
// ────────────────────────────────────────────────────────────────────────────
// Single compressed store for all block lists, kept in storage.local (which
// holds ~10MiB, far more than sync's ~100KiB). Shape:
// {
//   users: { "<name>": { posts: bool, comments: bool, hide_username: bool } },
//   subreddits: { "<name>": { posts: bool, page: bool } },
//   keywords: [{ pattern: "<raw>", title: bool, content: bool, url: bool, comments: bool }]
// }
// User/subreddit keys keep their original capitalisation and are matched
// case-insensitively.
// ────────────────────────────────────────────────────────────────────────────

import { readCompressedObject, writeCompressedObject, MAX_COMPRESSED_CHARS } from './compressed_storage.js';
import { isSafeMapKey, sanitiseMap } from './safe_map_key.js';
import { getBlockPatternError, looksLikeBareRegex } from './safe_regex.js';
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

// User blocks gained a "hide_username" scope after the original posts/comments
// shape. A missing value therefore means the block predates the scope (or came
// from an old backup), and the scope defaults to on. An explicit false is kept,
// so turning it off does not get undone by the next read.
export function normaliseUserEntry(entry) {
	return {
		posts: !!entry?.posts,
		comments: !!entry?.comments,
		hide_username: entry?.hide_username !== false,
	};
}

// Fills in the user scopes in place. Returns true when anything changed, so the
// caller can persist the one-time migration.
export function normaliseUserScopes(users) {
	let changed = false;
	for (const [name, entry] of Object.entries(users || {})) {
		const normalised = normaliseUserEntry(entry);
		if (!entry || typeof entry !== 'object' || Array.isArray(entry) || entry.posts !== normalised.posts || entry.comments !== normalised.comments || entry.hide_username !== normalised.hide_username) {
			users[name] = normalised;
			changed = true;
		}
	}
	return changed;
}

// Subreddit blocks gained a "page" scope after the original posts-only store.
// A missing scope therefore means the block predates the split (or came from
// an old backup), and both scopes default to on. An explicit false is kept.
export function normaliseSubredditEntry(entry) {
	return {
		posts: entry?.posts !== false,
		page: entry?.page !== false,
	};
}

// Fills in missing subreddit scopes in place. Returns true when anything
// changed, so the caller can persist the one-time migration.
export function normaliseSubredditScopes(subreddits) {
	let changed = false;
	for (const [name, entry] of Object.entries(subreddits || {})) {
		const normalised = normaliseSubredditEntry(entry);
		if (!entry || typeof entry !== 'object' || Array.isArray(entry) || entry.posts !== normalised.posts || entry.page !== normalised.page) {
			subreddits[name] = normalised;
			changed = true;
		}
	}
	return changed;
}

// A regex typed without its /…/ delimiters ("\b\w*\d\w*\b") was stored as a
// literal username/subreddit, where it can never match. Wrap the ones that
// become a valid regex, merging scopes with an already-wrapped key. Keywords
// are left alone: "c++", "$100" and ".net" are legitimate literal text.
export function normaliseBareRegexKeys(store) {
	let changed = false;
	for (const map of [store?.users, store?.subreddits]) {
		if (!map || typeof map !== 'object') continue;
		for (const [key, entry] of Object.entries(map)) {
			if (!looksLikeBareRegex(key)) continue;
			const wrapped = `/${key}/`;
			// Skip anything that would not compile: wrapping it would turn a
			// dead literal into a dead regex and lose the original text.
			if (getBlockPatternError(wrapped) !== null) continue;
			const existing = findKey(map, wrapped);
			if (existing && existing !== key) {
				const merged = { ...map[existing] };
				if (entry && typeof entry === 'object') {
					for (const [scope, on] of Object.entries(entry)) {
						if (on) merged[scope] = true;
					}
				}
				map[existing] = merged;
			} else {
				map[wrapped] = entry;
			}
			delete map[key];
			changed = true;
		}
	}
	return changed;
}

// Keyword blocks gained a separate "content" scope after the original title/url/comments shape.
// A missing value therefore means the entry predates the split (or came from an old backup):
// it inherits the title scope, so an old title block keeps hiding the same posts (title and body)
// and a comments-only or link-only keyword stays unchanged. An explicit false is kept, so a user
// who turns the content scope off does not get it back.
export function normaliseKeywordEntry(entry) {
	const title = !!entry?.title;
	return {
		pattern: entry?.pattern,
		title,
		content: typeof entry?.content === 'boolean' ? entry.content : title,
		url: !!entry?.url,
		comments: !!entry?.comments,
	};
}

// Fills in a missing keyword content scope in place. Returns true when anything changed,
// so the caller can persist the one-time migration.
export function normaliseKeywordScopes(keywords) {
	let changed = false;
	for (const entry of keywords || []) {
		if (!entry || typeof entry !== 'object') continue;
		if (typeof entry.content !== 'boolean') {
			entry.content = !!entry.title;
			changed = true;
		}
	}
	return changed;
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

// Reads the store and sanitises the maps on every read: decoded data can come from any source
// (storage payload, backup import), so unsafe keys ("__proto__" etc.) are dropped here rather than trusted.
async function readStore() {
	const store = await readCompressedObject(BLOCK_STORE_KEY, isValidStore);
	if (!store) return null;
	store.users = sanitiseMap(store.users);
	store.subreddits = sanitiseMap(store.subreddits);
	return store;
}

async function loadBlocks() {
	const store = await readStore();
	if (store) {
		// Migrate posts-only subreddit entries, title-only keyword entries and user entries without
		// the hide_username scope to the new shapes once. If the write fails, the selectors still
		// treat a missing scope as on, so the features keep working and the migration retries next load.
		const usersChanged = normaliseUserScopes(store.users);
		const subredditsChanged = normaliseSubredditScopes(store.subreddits);
		const keywordsChanged = normaliseKeywordScopes(store.keywords);
		const bareRegexChanged = normaliseBareRegexKeys(store);
		if (usersChanged || subredditsChanged || keywordsChanged || bareRegexChanged) {
			const result = await writeBlocks(store);
			if (!result.ok) {
				console.warn('[RedditEnhancer] blockStore: could not persist scope migration', result.reason);
			}
		}
		return store;
	}
	return (await importLegacyBackup()) || emptyBlockStore();
}

// Waits for the one-shot legacy migration (shared across concurrent callers), then always reads fresh
// from storage: the popup edits the same store from a separate JS context, so caching reads could clobber its changes.
export async function readBlocks() {
	if (!migrationPromise) migrationPromise = loadBlocks();
	await migrationPromise;
	const store = (await readStore()) || emptyBlockStore();
	// The on-disk migration can fail (storage full); normalise in memory too so
	// every caller sees the same shape either way.
	normaliseUserScopes(store.users);
	normaliseSubredditScopes(store.subreddits);
	normaliseKeywordScopes(store.keywords);
	normaliseBareRegexKeys(store);
	return store;
}

// Writes the store. Never throws: returns { ok } and leaves existing data untouched on failure. Callers show
// UI feedback (showToast) themselves, as this module has no DOM access (it also runs where document is unavailable).
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
		store.keywords.push({ pattern, title: false, content: false, url: false, comments: false, [scope]: true });
	}
}

function mergeUser(store, name, scope) {
	if (!isSafeMapKey(name)) {
		console.warn('[RedditEnhancer] blockStore: ignoring invalid block name "' + name + '"');
		return;
	}
	const existing = findKey(store.users, name);
	const key = existing ?? name;
	if (!store.users[key]) store.users[key] = { posts: false, comments: false, hide_username: true };
	store.users[key][scope] = true;
}

// Finds an existing object key case-insensitively (preserving its stored capitalisation).
export function findKey(obj, name) {
	const lower = name.toLowerCase();
	return Object.keys(obj || {}).find((k) => k.toLowerCase() === lower) ?? null;
}

// Folds legacy comma-separated sync lists into the store. Starts from the current store when one exists
// (backup restore merges rather than wipes). Verifies by reading back, and only then removes the legacy keys.
export async function importLegacyBackup() {
	const legacy = await readLegacyLists();
	const hasLegacy = LEGACY_LIST_KEYS.some((key) => typeof legacy[key] === 'string' && legacy[key] !== '');
	if (!hasLegacy) return null;

	const current = await readStore();
	const store = current || emptyBlockStore();
	for (const pattern of parseBlockList(legacy.hideBlockedKeywordPostsList)) {
		mergeKeyword(store, pattern, 'title');
		// The old keyword list matched titles only; migrate it to both post scopes so the same blocks also cover the post body.
		mergeKeyword(store, pattern, 'content');
	}
	for (const pattern of parseBlockList(legacy.hideBlockedLinkPostsList)) mergeKeyword(store, pattern, 'url');
	for (const pattern of parseBlockList(legacy.hideBlockedKeywordCommentsList)) mergeKeyword(store, pattern, 'comments');
	for (const name of parseBlockList(legacy.hideBlockedUserPostsList)) mergeUser(store, name, 'posts');
	for (const name of parseBlockList(legacy.hideBlockedUserCommentsList)) mergeUser(store, name, 'comments');
	for (const name of parseBlockList(legacy.hideBlockedSubredditPostsList)) {
		if (!findKey(store.subreddits, name)) store.subreddits[name] = { posts: true, page: true };
	}
	normaliseSubredditScopes(store.subreddits);
	normaliseKeywordScopes(store.keywords);

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

// Restores the storage.local parts of a full config backup: blockStore and redditUserTags, exported
// as plain JSON by collectBackupData (popup backup_config.js). Replace semantics — restoring a backup
// reproduces the backed-up state, matching how the storage.sync keys restore (the Block Manager's own
// import stays merge-only). Invalid payloads are skipped so the sync keys still restore, and the writes
// never throw. Returns the per-store { ok, reason } results for the keys that were present.
export async function restoreLocalBackupStores(json) {
	const results = {};
	if (json && typeof json === 'object' && Object.prototype.hasOwnProperty.call(json, 'blockStore')) {
		if (isValidStore(json.blockStore)) {
			const users = sanitiseMap(json.blockStore.users);
			const subreddits = sanitiseMap(json.blockStore.subreddits);
			normaliseUserScopes(users);
			normaliseSubredditScopes(subreddits);
			normaliseBareRegexKeys({ users, subreddits });
			results.blockStore = await writeBlocks({
				users,
				subreddits,
				keywords: json.blockStore.keywords.map((e) => normaliseKeywordEntry(e)),
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

export function getPostTitleKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.title).map((e) => e.pattern);
}

export function getPostContentKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.content).map((e) => e.pattern);
}

export function getUrlKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.url).map((e) => e.pattern);
}

export function getCommentKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.comments).map((e) => e.pattern);
}

// Patterns that apply to free text such as a search term or a result snippet.
// URL-only keywords are excluded because a search term is not a link.
export function getTextKeywordPatterns(store) {
	return (store.keywords || []).filter((e) => e.title || e.content || e.comments).map((e) => e.pattern);
}

export function getBlockedUserPatterns(store, scope) {
	return Object.keys(store.users || {}).filter((name) => {
		const entry = store.users[name];
		if (!entry) return false;
		// hide_username defaults to on for entries created before the scope existed; the other scopes default to off.
		if (!scope) return entry.posts === true || entry.comments === true || entry.hide_username !== false;
		if (scope === 'hide_username') return entry.hide_username !== false;
		return entry[scope] === true;
	});
}

export function getBlockedSubredditPatterns(store, scope) {
	return Object.keys(store.subreddits || {}).filter((name) => {
		const entry = store.subreddits[name];
		if (scope) return entry?.[scope] !== false;
		// No scope: entries with at least one active block. An entry whose scopes are both off
		// is kept as a disabled block, but it must not make the post button look blocked.
		return entry?.posts !== false || entry?.page !== false;
	});
}

// ─── Mutators (pure: modify the object, then writeBlocks) ───────────────────

export function addUserBlock(store, username, scope) {
	if (!isSafeMapKey(username)) {
		console.warn('[RedditEnhancer] blockStore: ignoring invalid block name "' + username + '"');
		return;
	}
	const key = findKey(store.users, username) ?? username;
	if (!store.users[key]) store.users[key] = { posts: false, comments: false, hide_username: true };
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
		if (!entry.posts && !entry.comments && !entry.hide_username) delete store.users[key];
	}
}

export function addSubredditBlock(store, name, scope = 'both') {
	if (!isSafeMapKey(name)) {
		console.warn('[RedditEnhancer] blockStore: ignoring invalid block name "' + name + '"');
		return;
	}
	const key = findKey(store.subreddits, name) ?? name;
	let entry = store.subreddits[key];
	if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
		entry = { posts: false, page: false };
	} else {
		// Fill in a missing page scope before applying the requested change;
		// existing posts-only entries migrate to both scopes on.
		entry = normaliseSubredditEntry(entry);
	}
	store.subreddits[key] = entry;
	if (scope === 'both') {
		entry.posts = true;
		entry.page = true;
	} else {
		entry[scope] = true;
	}
}

export function removeSubredditBlock(store, name, scope) {
	const key = findKey(store.subreddits, name);
	if (!key) return;
	// No scope means "remove the entry" (the Block Manager delete action). A scope removes only that scope.
	// A disabled entry with both scopes off is intentionally kept so the user can re-enable it later.
	if (!scope) {
		delete store.subreddits[key];
		return;
	}
	const entry = normaliseSubredditEntry(store.subreddits[key]);
	store.subreddits[key] = entry;
	entry[scope] = false;
}

export function addKeywordBlock(store, pattern, scopes) {
	for (const scope of ['title', 'content', 'url', 'comments']) {
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
	for (const scope of ['title', 'content', 'url', 'comments']) {
		if (scopes[scope]) store.keywords[index][scope] = false;
	}
	const entry = store.keywords[index];
	if (!entry.title && !entry.content && !entry.url && !entry.comments) {
		store.keywords.splice(index, 1);
	}
}
