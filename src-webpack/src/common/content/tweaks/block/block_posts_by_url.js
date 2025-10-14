/**
 * Tweaks: Block - Blocked URL Posts
 *
 * @name hideBlockedLinkPosts
 * @description Hide all "link" posts if the URL contains a certain keyword.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../logging';
let urlKeywordsList = [];

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideBlockedLinkPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedLinkPosts'], function (result) {
		if (result.hideBlockedLinkPosts) hideBlockedLinkPosts(true);
	});
}

/* === Enable/Disable The Feature === */
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
				observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
			});
		} else {
			observer.disconnect();
			disableHideBlockedLinkPostsAll();
		}
	}
}

function updateLinkList(list) {
	urlKeywordsList = list
		.toLowerCase()
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked Link Posts - RV1
function enableHideBlockedLinkPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const url = post.querySelector('p.title a')?.href.toLowerCase();
		if (!url) return;

		if (urlKeywordsList.some((word) => new RegExp(word.replace(/\*/g, '.*'), 'i').test(url))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}
	});
}

// Enable Hide Blocked Link Posts - RV3
function filterBlockedLinkPost(post) {
	if (post.classList.contains('re-hide')) return;

	const url = post.querySelector('.post-link')?.href.toLowerCase();
	if (!url) return;

	if (urlKeywordsList.some((word) => new RegExp(word.replace(/\*/g, '.*'), 'i').test(url))) {
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

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;
			if (node) document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedLinkPost);
		});
	});
});
