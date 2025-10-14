/**
 * Tweaks: Block - Blocked Keyword Posts
 *
 * @name hideBlockedKeywordPosts
 * @description Hide all posts containing certain keywords in the title or content.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../logging';
let keywordList = [];

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts'], function (result) {
		if (result.hideBlockedKeywordPosts) hideBlockedKeywordPosts(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideBlockedKeywordPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
				updateKeywordList(result.hideBlockedKeywordPostsList);
				logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				enableHideBlockedKeywordPostsRV1();
			});
		} else {
			disableHideBlockedKeywordPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
				updateKeywordList(result.hideBlockedKeywordPostsList);
				logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
				setTimeout(() => {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
				}, 3000);
				observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
			});
		} else {
			observer.disconnect();
			disableHideBlockedKeywordPostsAll();
		}
	}
}

function updateKeywordList(list) {
	keywordList = list
		.toLowerCase()
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked Keyword Posts - RV1
function enableHideBlockedKeywordPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const titleAnchor = post.querySelector('a.title');
		if (!titleAnchor) return;

		const titleText = titleAnchor.textContent.toLowerCase();
		if (keywordList.some((word) => new RegExp(`\\b${word.replace(/\*/g, '.*')}\\b`, 'i').test(titleText))) {
			post.classList.add('re-hide');
		}
	});
}

// Enable Hide Blocked Keyword Posts - RV3
function filterBlockedKeywordPost(post) {
	if (post.classList.contains('re-hide')) return;

	const titleAnchor = post.querySelector('a[id^="post-title-"]');
	if (!titleAnchor) return;

	const titleText = titleAnchor.textContent.toLowerCase();
	if (keywordList.some((word) => new RegExp(`\\b${word.replace(/\*/g, '.*')}\\b`, 'i').test(titleText))) {
		post.classList.add('re-hide');
	}
}

// Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;
			if (node) document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
		});
	});
});
