// ────────────────────────────────────────────────────────────────────────────
// Block - Blocked Subreddit Page (early redirect)
// ────────────────────────────────────────────────────────────────────────────
// Runs at document_start, before Reddit paints the page. When the current URL
// is a subreddit page whose block entry has the "page" scope enabled, or a
// post/comment page whose entry has the "posts" scope enabled, it navigates
// to the extension's blocked page instead of injecting a message into
// Reddit's DOM (which a website update could break).
//
// The scopes are independent: a Page-only block hides the subreddit itself but
// still lets individual posts open, while a Posts-only block hides feed posts
// and blocks direct post/comment URLs without hiding the subreddit listing.
//
// The page is hidden while the async storage read is in flight (only on the
// initial load, never during SPA navigation) so a blocked page cannot flash
// before the redirect.
// ────────────────────────────────────────────────────────────────────────────

import { readBlocks, getBlockedSubredditPatterns, BLOCK_STORE_KEY } from '../../utilities/block_store.js';
import { matchesPattern } from '../../utilities/block_pattern_match.js';

const HIDE_CLASS = 're-block-page-checking';
const SAFETY_TIMEOUT_MS = 1500;
const BLOCKED_PAGE = 'blocked_subreddit.html';

let redirecting = false;
let safetyTimer = 0;

// Extracts the subreddit name from "/r/<name>/..." (or "/r/<name>").
export function getSubredditFromPath(pathname = window.location.pathname) {
	const match = pathname.match(/^\/r\/([^/]+)/i);
	if (!match) return '';
	try {
		return decodeURIComponent(match[1]);
	} catch {
		return match[1];
	}
}

// Post and comment pages, plus the /r/<sub>/s/<token> share links that resolve
// to them. These are governed by the Posts scope, not the Page scope, so a
// Page-only block still lets the user open a post from that subreddit.
export function isSubredditPostPath(pathname = window.location.pathname) {
	return /^\/r\/[^/]+\/(?:comments|s)(?:\/|$)/i.test(pathname);
}

// Posts scope: hide feed posts and block direct post/comment pages.
// Page scope: block the subreddit's own listing, wiki, about and other pages.
export function getSubredditPathScope(pathname = window.location.pathname) {
	return isSubredditPostPath(pathname) ? 'posts' : 'page';
}

export function shouldBlockSubredditPath({ pathname = window.location.pathname, subreddit, store }) {
	const scope = getSubredditPathScope(pathname);
	return getBlockedSubredditPatterns(store, scope).some((pattern) => matchesPattern(subreddit, pattern));
}

function hidePage() {
	document.documentElement?.classList.add(HIDE_CLASS);
	clearTimeout(safetyTimer);
	// A failed/blocked storage read must never leave Reddit hidden forever.
	safetyTimer = setTimeout(releasePage, SAFETY_TIMEOUT_MS);
}

function releasePage() {
	clearTimeout(safetyTimer);
	safetyTimer = 0;
	document.documentElement?.classList.remove(HIDE_CLASS);
}

function isFeatureEnabled() {
	return new Promise((resolve) => {
		try {
			BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], (result) => {
				resolve(result?.hideBlockedSubredditPosts === true);
			});
		} catch {
			resolve(false);
		}
	});
}

// Returns true when a redirect was started. detect_page_change.js uses that to
// skip the rest of the SPA navigation handling.
export async function checkBlockedSubredditPage({ initial = false } = {}) {
	if (redirecting) return true;

	const pathname = window.location.pathname;
	const subreddit = getSubredditFromPath(pathname);
	if (!subreddit) {
		if (initial) releasePage();
		return false;
	}
	if (initial) hidePage();

	let enabled = false;
	try {
		enabled = await isFeatureEnabled();
	} catch {
		enabled = false;
	}
	if (!enabled) {
		if (initial) releasePage();
		return false;
	}

	let store = null;
	try {
		store = await readBlocks();
	} catch (e) {
		console.warn('[RedditEnhancer] Could not read the block list for the page check:', e);
		if (initial) releasePage();
		return false;
	}

	if (redirecting) return true;
	if (!shouldBlockSubredditPath({ pathname, subreddit, store })) {
		if (initial) releasePage();
		return false;
	}

	redirecting = true;
	clearTimeout(safetyTimer);
	// replace() keeps the blocked URL out of the history, so Back does not
	// bounce the user straight back into the redirect.
	window.location.replace(BROWSER_API.runtime.getURL(BLOCKED_PAGE) + '?sub=' + encodeURIComponent(subreddit));
	return true;
}

// Keeps the redirect in sync with the block list and the popup toggle while
// the user is already on a Reddit page. Called once from content_first_index.
export function watchForBlockedSubredditPage() {
	BROWSER_API.storage.onChanged.addListener((changes, area) => {
		if (redirecting) return;
		const syncToggleChanged = area === 'sync' && changes.hideBlockedSubredditPosts?.newValue === true;
		const blockListChanged = area === 'local' && !!changes[BLOCK_STORE_KEY];
		if (syncToggleChanged || blockListChanged) checkBlockedSubredditPage();
	});
}
