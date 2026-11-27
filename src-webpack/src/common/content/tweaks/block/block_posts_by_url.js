/**
 * Tweaks: Block - Blocked URL Posts
 *
 * @name hideBlockedLinkPosts
 * @description Hide all "link" posts if the URL contains a certain keyword.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

//import { logToDevConsole } from '../../../utilities/logging';
import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { readBlocks, getUrlKeywordPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { registerMutationCallback } from '../../observer_manager';
import { acquireBlockFeedGuard, releaseBlockFeedGuard } from './block_feed_guard.js';
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
	if (value) acquireBlockFeedGuard('hideBlockedLinkPosts');
	else releaseBlockFeedGuard('hideBlockedLinkPosts');
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
