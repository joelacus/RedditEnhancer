/* ===== Tweaks - Hide - Blocked Keyword Posts ===== */

let keywordList = [];

/* === Triggered On Page Load === */
export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts', 'hideBlockedKeywordPostsList'], function (result) {
		if (result.hideBlockedKeywordPosts) {
			keywordList = result.hideBlockedKeywordPostsList.toLowerCase().split(',').map(word => word.trim());
			hideBlockedKeywordPosts(true);
		}
	});
}

/* === Main Function === */
export function hideBlockedKeywordPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			enableHideBlockedKeywordPostsOld();
		} 
		else {
			disableHideBlockedKeywordPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			document.querySelectorAll('article > shreddit-post').forEach(filterBlockedKeywordPost);
			observer.observe(document.querySelector('.main-container'), {childList: true, subtree: true})
		} 
		else {
			observer.disconnect();
			disableHideBlockedKeywordPostsAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Blocked Keyword Posts - Old
function enableHideBlockedKeywordPostsOld() {
	console.log('keywordList: ', keywordList);

	document.querySelectorAll('#siteTable > .thing').forEach(post => {
		const titleAnchor = post.querySelector('a.title');
		if (!titleAnchor) return;

		const titleText = titleAnchor.textContent.toLowerCase();
		if (keywordList.some(word => new RegExp(`\\b${word}\\b`, 'i').test(titleText))) {
			post.classList.add('re-hide');
		}
	});
}

// Function - Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	document.querySelectorAll('#sideTable > .thing, shreddit-post.re-hide').forEach(post => {
		post.classList.remove('re-hide');
	});
}

function filterBlockedKeywordPost(post) {
	if (post.classList.contains('re-hide')) return;

	const titleAnchor = post.querySelector('a[id^="post-title-"]');
	if (!titleAnchor) return;

	const titleText = titleAnchor.textContent.toLowerCase();
	if (keywordList.some(word => new RegExp(`\\b${word}\\b`, 'i').test(titleText))) {
		post.classList.add('re-hide');
	}
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;

			if (node.tagName === 'ARTICLE') {
				const post = node.querySelector('shreddit-post');
				if (post) filterBlockedKeywordPost(post);
			}
		});
	});
});