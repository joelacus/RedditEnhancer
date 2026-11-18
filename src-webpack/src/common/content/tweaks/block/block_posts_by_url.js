/**
 * Tweaks: Block - Blocked URL Posts
 *
 * @name hideBlockedLinkPosts
 * @description Hide all "link" posts if the URL contains a certain keyword.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

//import { logToDevConsole } from '../../../utilities/logging';
import { isSafeRegexPattern, reportUnsafeRegexPattern } from '../../../utilities/safe_regex.js';
import { readBlocks, getUrlKeywordPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { registerMutationCallback } from '../../observer_manager';
let urlKeywordsList = [];
let linkFilteringActive = false;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !linkFilteringActive) return;
	readBlocks().then((store) => {
		urlKeywordsList = getUrlKeywordPatterns(store);
		// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
		// else branch removes stale classes from unblocked posts.
		if (redditVersion === 'old') {
			enableHideBlockedLinkPostsRV1();
		} else {
			document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedLinkPost);
		}
	});
});

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedLinkPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedLinkPosts'], function (result) {
		if (result.hideBlockedLinkPosts === true) hideBlockedLinkPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedLinkPosts(value) {
	linkFilteringActive = value === true;
	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				urlKeywordsList = getUrlKeywordPatterns(store);
				//logToDevConsole('log', `Blocked Link Keywords List: ${urlKeywordsList}`);
				enableHideBlockedLinkPostsRV1();
			});
		} else {
			disableHideBlockedLinkPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				urlKeywordsList = getUrlKeywordPatterns(store);
				//logToDevConsole('log', `Blocked Link Keywords List: ${urlKeywordsList}`);
				document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedLinkPost);
				setTimeout(() => {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedLinkPost);
				}, 3000);
				// Register with centralised observer manager
				// Clean up any existing observer first
				if (observerCleanup) {
					observerCleanup();
				}
				const feed = document.querySelector('shreddit-feed');
				if (feed) {
					observerCleanup = registerMutationCallback(
						feed,
						(mutations) => {
							mutations.forEach((mutation) => {
								mutation.addedNodes.forEach((addedNode) => {
									if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
										setTimeout(() => {
											if (addedNode) {
												filterBlockedLinkPost(addedNode);
											}
										}, 1000);
									}
								});
							});
						},
						{ childList: true, subtree: true },
						'hideBlockedLinkPosts',
					);
				}
			});
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			disableHideBlockedLinkPostsAll();
		}
	}
}

function escapeRegExp(string) {
	// Escape regex metacharacters to prevent ReDoS
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesPattern(text, patternStr) {
	if (!text) return false;
	// Check if pattern is regex format: /pattern/flags
	const regexMatch = patternStr.match(/^\/(.+?)\/([a-z]*)$/i);
	if (regexMatch) {
		const pattern = regexMatch[1];
		const flags = regexMatch[2] || 'i';
		if (!isSafeRegexPattern(pattern, flags)) {
			reportUnsafeRegexPattern(patternStr);
			return false;
		}
		try {
			const regex = new RegExp(pattern, flags);
			return regex.test(text);
		} catch (e) {
			console.warn('Invalid regex pattern:', patternStr, e);
			return false;
		}
	} else {
		// Plain pattern with wildcard support
		const escaped = escapeRegExp(patternStr);
		const regexPattern = escaped.replace(/\\\*/g, '.*');
		const regex = new RegExp(`\\b${regexPattern}\\b`, 'i');
		return regex.test(text);
	}
}

// In-memory pattern list, refreshed from the block store on load.

// Enable Hide Blocked Link Posts - RV1
function enableHideBlockedLinkPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const url = post.querySelector('p.title a')?.href;
		if (!url) return;

		if (urlKeywordsList.some((word) => matchesPattern(url, word))) {
			post.classList.add('re-hide-url');
		} else {
			post.classList.remove('re-hide-url');
		}
	});
}

// Enable Hide Blocked Link Posts - RV3
function filterBlockedLinkPost(post) {
	const url = post.querySelector('.post-link')?.href;
	if (!url) return;

	if (urlKeywordsList.some((word) => matchesPattern(url, word))) {
		post.classList.add('re-hide-url');
	} else {
		post.classList.remove('re-hide-url');
	}
}

// Disable Hide Blocked Link Posts - All
function disableHideBlockedLinkPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide-url').forEach((post) => {
		post.classList.remove('re-hide-url');
	});
}
