/**
 * Tweaks: Block - Blocked Subreddit Posts
 *
 * @name hideBlockedSubredditPosts
 * @description Hide all posts from certain subreddits.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../../utilities/logging';
import { registerMutationCallback } from '../../observer_manager';
let subredditList = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedSubredditPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], function (result) {
		if (result.hideBlockedSubredditPosts === true) hideBlockedSubredditPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedSubredditPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedSubredditPostsList'], function (result) {
				console.log(result.hideBlockedSubredditPostsList);
				updateSubredditList(result.hideBlockedSubredditPostsList);
				logToDevConsole('log', `Blocked Subreddits List: ${subredditList}`);
				enableHideBlockedSubredditPostsRV1();
			});
		} else {
			disableHideBlockedSubredditPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedSubredditPostsList'], function (result) {
				updateSubredditList(result.hideBlockedSubredditPostsList);
				logToDevConsole('log', `Blocked Subreddits List: ${subredditList}`);
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
						'hideBlockedSubredditPosts',
					);
				}
			});
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			disableHideBlockedSubredditPostsAll();
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

function updateSubredditList(list) {
	subredditList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedSubredditPostsRV1() {
	const pageSub = document.location.pathname.replace('/r/', '').replace('/', '') ?? '';
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const subredditName = post.dataset.subreddit;
		if (!subredditName) return;
		if (pageSub === subredditName) return;

		if (subredditList.some((word) => matchesPattern(subredditName, word))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(post) {
	if (document.querySelector('shreddit-app').getAttribute('pagetype') === 'community') return;
	if (post.classList.contains('re-hide')) return;

	const subredditName = post.querySelector('shreddit-post')?.getAttribute('subreddit-name');
	if (!subredditName) return;

	if (subredditList.some((word) => matchesPattern(subredditName, word))) {
		post.classList.add('re-hide');
	} else {
		post.classList.remove('re-hide');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedSubredditPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
}
