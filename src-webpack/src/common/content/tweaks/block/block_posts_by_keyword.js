/* ===== Tweaks - Hide - Blocked Keyword Posts ===== */

import { logToDevConsole } from '../../logging';

let keywordList = [];

/* === Triggered On Page Load === */
export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts'], function (result) {
		if (result.hideBlockedKeywordPosts) hideBlockedKeywordPosts(true);
	});
}

/* === Main Function === */
export function hideBlockedKeywordPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
				updateKeywordList(result.hideBlockedKeywordPostsList);
				logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				enableHideBlockedKeywordPostsOld();
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
		.filter((item) => item !== '');
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Blocked Keyword Posts - Old
function enableHideBlockedKeywordPostsOld() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const titleAnchor = post.querySelector('a.title');
		if (!titleAnchor) return;

		const titleText = titleAnchor.textContent.toLowerCase();
		if (keywordList.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(titleText))) {
			post.classList.add('re-hide');
		}
	});
}

// Function - Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	document.querySelectorAll('#sideTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
}

// Function - Enable Hide Blocked Keyword Posts - New New
function filterBlockedKeywordPost(post) {
	if (post.classList.contains('re-hide')) return;

	const titleAnchor = post.querySelector('a[id^="post-title-"]');
	if (!titleAnchor) return;

	const titleText = titleAnchor.textContent.toLowerCase();
	if (keywordList.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(titleText))) {
		post.classList.add('re-hide');
	}
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;

			if (node.tagName === 'ARTICLE') {
				const post = node; //.querySelector('shreddit-post');
				if (post) filterBlockedKeywordPost(post);
			}
		});
	});
});
