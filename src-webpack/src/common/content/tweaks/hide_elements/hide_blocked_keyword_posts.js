/* ===== Tweaks - Hide - Blocked Keyword Posts ===== */

let keywordList = [];
let keywordFilteringEnabled = false;

/* === Triggered On Page Load === */
export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsEnable'], function (result) {
		if (result.hideBlockedKeywordPostsEnable) hideBlockedKeywordPosts(true);
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
			keywordFilteringEnabled = false
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			enableHideBlockedKeywordPostsNewNew();
			observer.observe(document.querySelector('.main-container'), {childList: true, subtree: true})
		} 
		else {
			keywordPostObserver.disconnect();
			disableHideBlockedKeywordPostsAll();
			keywordFilteringEnabled = false
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Blocked Keyword Posts - Old
function enableHideBlockedKeywordPostsOld() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
		keywordList = result.hideBlockedKeywordPostsList
			?.split(',')
			.map(word => word.trim().toLowerCase()) || [];
		keywordFilteringEnabled = true;
		const styleId = "re-hide-keyword-posts";

		if (!document.head.querySelector(`style[id="${styleId}"]`)) {
			const styleElement = document.createElement('style');
			styleElement.id = styleId;

			document.querySelectorAll('#siteTable > .thing').forEach(post => {
				const titleAnchor = post.querySelector('a.title');
				if (!titleAnchor) return;

				const titleText = titleAnchor.textContent.toLowerCase();
				if (keywordList.some(word => titleText.includes(word))) {
					post.classList.add("re-hidden-keyword");
				}
			});

			styleElement.textContent = `
				.thing.re-hidden-keyword {
					display: none !important;
				}
			`;

			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	});
}

// Function - Enable Hide Blocked Keyword Posts - New New
let keywordPostObserver = null;

function enableHideBlockedKeywordPostsNewNew() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
		keywordList = result.hideBlockedKeywordPostsList
			?.split(',')
			.map(word => word.trim().toLowerCase()) || [];
		keywordFilteringEnabled = true;
		const styleId = "re-hide-keyword-posts";

		// inject CSS style block
		if (!document.head.querySelector(`style[id="${styleId}"]`)) {
			const styleElement = document.createElement('style');
			styleElement.id = styleId;
			styleElement.textContent = `
				shreddit-post.re-hidden-keyword {
					display: none !important;
				}
			`;
			document.head.appendChild(styleElement);
		}

		// initial scan of all posts
		document.querySelectorAll('article > shreddit-post').forEach(filterBlockedKeywordPost);
	});
}

// Function - Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	const styleElements = document.head.querySelectorAll('style[id="re-hide-keyword-posts"]');
	styleElements.forEach(el => el.remove());

	document.querySelectorAll('shreddit-post.re-hidden-keyword').forEach(post => {
		post.classList.remove('re-hidden-keyword');
	});
}

function filterBlockedKeywordPost(post) {
	if (post.classList.contains('re-hidden-keyword')) return;

	const titleAnchor = post.querySelector('a[id^="post-title-"]');
	if (!titleAnchor) return;

	const titleText = titleAnchor.textContent.toLowerCase();
	if (keywordList.some(word => titleText.includes(word))) {
		post.classList.add('re-hidden-keyword');
	}
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;

			if (node.tagName === 'ARTICLE') {
				const post = node.querySelector('shreddit-post');
				if (post && keywordFilteringEnabled) {
					filterBlockedKeywordPost(post);
				}
			}
		});
	});
});