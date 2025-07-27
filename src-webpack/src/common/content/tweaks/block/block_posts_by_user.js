/**
 * Tweaks: Block - Blocked User Posts
 *
 * @name hideBlockedUserPosts
 * @description Hide all posts by a certain username(s).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../logging';
let userList = [];

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts'], function (result) {
		if (result.hideBlockedUserPosts) hideBlockedUserPosts(true);
	});
}

/* === Enable/Disable The Feature === */
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
				observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
			});
		} else {
			observer.disconnect();
			disableHideBlockedUserPostsAll();
		}
	}
}

function updateUserList(list) {
	userList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '');
}

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedUserPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const authorText = post.querySelector('a.author');
		if (!authorText) return;

		if (userList.some((word) => new RegExp(`\\b${word}\\b`).test(authorText))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(post) {
	if (post.classList.contains('re-hide')) return;

	const authorText = post.querySelector('shreddit-post').getAttribute('author');
	if (!authorText) return;

	if (userList.some((word) => new RegExp(`\\b${word}\\b`).test(authorText))) {
		post.classList.add('re-hide');
	} else {
		post.classList.remove('re-hide');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedUserPostsAll() {
	document.querySelectorAll('#sideTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;

			if (node.tagName === 'ARTICLE') {
				const post = node;
				if (post) filterBlockedUserPost(post);
			}
		});
	});
});
