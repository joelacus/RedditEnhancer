/**
 * Tweaks: Block - Blocked User Posts
 *
 * @name hideBlockedUserPosts
 * @description Hide all posts by a certain username(s).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../../utilities/logging';
import { registerMutationCallback } from '../../observer_manager';
let userList = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts'], function (result) {
		if (result.hideBlockedUserPosts === true) hideBlockedUserPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedUserPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedUserPostsList'], function (result) {
				updateUserList(result.hideBlockedUserPostsList);
				logToDevConsole('log', `Blocked Users List: ${userList}`);
				enableHideBlockedUserPostsRV1();
			});
		} else {
			disableHideBlockedUserPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedUserPostsList'], function (result) {
				updateUserList(result.hideBlockedUserPostsList);
				logToDevConsole('log', `Blocked Users List: ${userList}`);
				document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedUserPost);
				setTimeout(() => {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedUserPost);
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
												filterBlockedUserPost(addedNode);
											}
										}, 1000);
									}
								});
							});
						},
						{ childList: true, subtree: true },
						'hideBlockedUserPosts',
					);
				}
			});
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			disableHideBlockedUserPostsAll();
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

function updateUserList(list) {
	userList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedUserPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const authorElement = post.querySelector('a.author');
		if (!authorElement) return;
		const authorText = authorElement.textContent;

		if (userList.some((word) => matchesPattern(authorText, word))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(post) {
	if (post.classList.contains('re-hide')) return;

	const authorText = post.querySelector('shreddit-post')?.getAttribute('author');
	if (!authorText) return;

	if (userList.some((word) => matchesPattern(authorText, word))) {
		post.classList.add('re-hide');
	} else {
		post.classList.remove('re-hide');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedUserPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
}
