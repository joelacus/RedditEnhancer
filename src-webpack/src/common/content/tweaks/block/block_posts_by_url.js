/**
 * Tweaks: Block - Blocked URL Posts
 *
 * @name hideBlockedLinkPosts
 * @description Hide all "link" posts if the URL contains a certain keyword.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../../utilities/logging';
import { registerMutationCallback } from '../../observer_manager';
let urlKeywordsList = [];

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
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedLinkPostsList'], function (result) {
				updateLinkList(result.hideBlockedLinkPostsList);
				logToDevConsole('log', `Blocked Link Keywords List: ${urlKeywordsList}`);
				enableHideBlockedLinkPostsRV1();
			});
		} else {
			disableHideBlockedLinkPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedLinkPostsList'], function (result) {
				updateLinkList(result.hideBlockedLinkPostsList);
				logToDevConsole('log', `Blocked Link Keywords List: ${urlKeywordsList}`);
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

function updateLinkList(list) {
	urlKeywordsList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked Link Posts - RV1
function enableHideBlockedLinkPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const url = post.querySelector('p.title a')?.href;
		if (!url) return;

		if (urlKeywordsList.some((word) => matchesPattern(url, word))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}
	});
}

// Enable Hide Blocked Link Posts - RV3
function filterBlockedLinkPost(post) {
	if (post.classList.contains('re-hide')) return;

	const url = post.querySelector('.post-link')?.href;
	if (!url) return;

	if (urlKeywordsList.some((word) => matchesPattern(url, word))) {
		post.classList.add('re-hide');
	} else {
		post.classList.remove('re-hide');
	}
}

// Disable Hide Blocked Link Posts - All
function disableHideBlockedLinkPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
}
