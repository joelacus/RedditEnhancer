/**
 * Tweaks: Block - Blocked Keyword Posts
 *
 * @name hideBlockedKeywordPosts
 * @description Hide all posts containing certain keywords in the title or content.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

//import { logToDevConsole } from '../../../utilities/logging';
import { isSafeRegexPattern, reportUnsafeRegexPattern } from '../../../utilities/safe_regex.js';
import { readBlocks, getPostKeywordPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { registerMutationCallback } from '../../observer_manager';
let keywordList = [];
let keywordFilteringActive = false;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !keywordFilteringActive) return;
	readBlocks().then((store) => {
		keywordList = getPostKeywordPatterns(store);
		// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
		// else branches remove stale classes from unblocked posts.
		if (redditVersion === 'old') {
			enableHideBlockedKeywordPostsRV1();
		} else {
			document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
		}
	});
});

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts'], function (result) {
		if (result.hideBlockedKeywordPosts === true) hideBlockedKeywordPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedKeywordPosts(value) {
	keywordFilteringActive = value === true;
	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				keywordList = getPostKeywordPatterns(store);
				//logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				enableHideBlockedKeywordPostsRV1();
			});
		} else {
			disableHideBlockedKeywordPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				keywordList = getPostKeywordPatterns(store);
				//logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
				setTimeout(() => {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
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
												filterBlockedKeywordPost(addedNode);
											}
										}, 1000);
									}
								});
							});
						},
						{ childList: true, subtree: true },
						'hideBlockedKeywordPosts',
					);
				}
			});
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			disableHideBlockedKeywordPostsAll();
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

// Enable Hide Blocked Keyword Posts - RV1
function enableHideBlockedKeywordPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const titleAnchor = post.querySelector('a.title');
		if (!titleAnchor) return;

		const titleText = titleAnchor.textContent;
		if (keywordList.some((word) => matchesPattern(titleText, word))) {
			post.classList.add('re-hide-keyword');
		} else {
			post.classList.remove('re-hide-keyword');
		}
	});
}

// Enable Hide Blocked Keyword Posts - RV3
function filterBlockedKeywordPost(post) {
	// Reddit has used several title markups over time; try each known form.
	const titleAnchor = post.querySelector('a[id^="post-title-"], a[data-testid="post-title-text"]');
	if (!titleAnchor) return;

	const titleText = titleAnchor.textContent;
	if (keywordList.some((word) => matchesPattern(titleText, word))) {
		post.classList.add('re-hide-keyword');
	} else {
		post.classList.remove('re-hide-keyword');
	}
}

// Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide-keyword').forEach((post) => {
		post.classList.remove('re-hide-keyword');
	});
}
