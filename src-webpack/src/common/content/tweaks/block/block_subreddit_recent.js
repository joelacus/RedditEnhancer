/**
 * Tweaks: Block - Blocked Subreddits in the Recent Side Menu
 *
 * @name setHideBlockedSubredditRecent
 * @description Hides page-scoped blocked subreddits from the "Recent" section of the RV3
 *              side menu. Posts-only blocks stay visible because their subreddit page still
 *              opens.
 *              The section has lived in both the light DOM and reddit-recent-pages' shadow
 *              root, so both are scanned. Items are hidden with an inline display style
 *              because a stylesheet class cannot cross a shadow boundary.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { readBlocks, getBlockedSubredditPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { debounce } from '../../../utilities/debounce.js';

const HIDDEN_CLASS = 're-hide-blocked-subreddit';

let active = false;
let pagePatterns = [];
let observer = null;
let observedRoots = new Set();
// Remembers the element's own inline display value so unhiding restores it.
const hiddenItems = new Map();

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedSubredditRecent() {
	if (redditVersion !== 'newnew') return;
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], function (result) {
		setHideBlockedSubredditRecent(result.hideBlockedSubredditPosts === true);
	});
}

// ─── Enable/Disable The Tweak ───────────────────────────────────────────────

export function setHideBlockedSubredditRecent(value) {
	const enabled = value === true && redditVersion === 'newnew';
	if (enabled === active) {
		if (enabled) scan();
		return;
	}
	active = enabled;
	if (!enabled) {
		teardown();
		return;
	}
	readBlocks().then((store) => {
		if (!active) return;
		pagePatterns = getBlockedSubredditPatterns(store, 'page');
		ensureObserver();
		scan();
		// The section can be attached or filled after the first scan.
		setTimeout(scan, 500);
		setTimeout(scan, 2000);
	});
}

function subredditFromHref(href) {
	if (!href) return '';
	let pathname;
	try {
		pathname = new URL(href, window.location.origin).pathname;
	} catch {
		return '';
	}
	const match = pathname.match(/^\/r\/([^/]+)/i);
	if (!match) return '';
	try {
		return decodeURIComponent(match[1]);
	} catch {
		return match[1];
	}
}

function getRecentSections() {
	const sections = new Set();
	const lightSection = document.querySelector('#recent-communities-section');
	if (lightSection) sections.add(lightSection);
	const shadowRoot = document.querySelector('reddit-recent-pages')?.shadowRoot;
	if (shadowRoot) {
		const shadowSection = shadowRoot.querySelector('#recent-communities-section');
		if (shadowSection) sections.add(shadowSection);
	}
	return [...sections];
}

function getItemForLink(link) {
	return link.closest('li, [role="listitem"]') || link;
}

function hideItem(item) {
	if (hiddenItems.has(item)) return;
	hiddenItems.set(item, {
		value: item.style.getPropertyValue('display'),
		priority: item.style.getPropertyPriority('display'),
	});
	item.classList.add(HIDDEN_CLASS);
	item.style.setProperty('display', 'none', 'important');
}

function showItem(item) {
	if (!hiddenItems.has(item)) return;
	const previous = hiddenItems.get(item);
	if (previous.value) item.style.setProperty('display', previous.value, previous.priority);
	else item.style.removeProperty('display');
	item.classList.remove(HIDDEN_CLASS);
	hiddenItems.delete(item);
}

function restoreAllItems() {
	for (const item of [...hiddenItems.keys()]) showItem(item);
}

function scan() {
	if (!active) return;
	ensureObserver();
	for (const section of getRecentSections()) {
		section.querySelectorAll('a[href]').forEach((link) => {
			const subreddit = subredditFromHref(link.getAttribute('href'));
			if (!subreddit) return;
			const item = getItemForLink(link);
			const blocked = pagePatterns.some((pattern) => matchesPattern(subreddit, pattern));
			if (blocked) hideItem(item);
			else showItem(item);
		});
	}
}

const debouncedScan = debounce(scan, 100);

function ensureObserver() {
	if (!observer) observer = new MutationObserver(debouncedScan);
	const targets = [document.body, document.querySelector('reddit-recent-pages')?.shadowRoot].filter(Boolean);
	for (const target of targets) {
		if (observedRoots.has(target)) continue;
		observer.observe(target, { childList: true, subtree: true });
		observedRoots.add(target);
	}
}

function teardown() {
	if (observer) {
		observer.disconnect();
		observer = null;
	}
	observedRoots = new Set();
	pagePatterns = [];
	restoreAllItems();
}

// Re-read the page-scoped patterns when the block list changes elsewhere
// (Block Manager, inline block button in another tab, backup restore).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !active) return;
	readBlocks().then((store) => {
		if (!active) return;
		pagePatterns = getBlockedSubredditPatterns(store, 'page');
		scan();
	});
});
