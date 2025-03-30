/* ===== Tweaks - Hide - NSFW Posts ===== */

/* === Triggered On Page Load === */
export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsEnable'], function (result) {
		if (result.hideBlockedKeywordPostsEnable) hideBlockedKeywordPosts(true);
	});
}

/* === Main Function === */
export function hideBlockedKeywordPosts(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHideBlockedKeywordPostsOld();
		} else if (value === false) {
			disableHideBlockedKeywordPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideBlockedKeywordPostsNewNew();
		} else if (value === false) {
			disableHideBlockedKeywordPostsAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Blocked Keyword Posts - Old
function enableHideBlockedKeywordPostsOld() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
		const keywordList = result.hideBlockedKeywordPostsList?.split(',') || [];
		const styleId = "re-hide-keyword-posts";

		if (!document.head.querySelector(`style[id="${styleId}"]`)) {
			const styleElement = document.createElement('style');
			styleElement.id = styleId;

			document.querySelectorAll('#siteTable > .thing').forEach(post => {
				const titleAnchor = post.querySelector('a.title');
				if (!titleAnchor) return;

				const titleText = titleAnchor.textContent.toLowerCase();
				if (keywordList.some(word => titleText.includes(word.trim().toLowerCase()))) {
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
function enableHideBlockedKeywordPostsNewNew() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
		const keywordList = result.hideBlockedKeywordPostsList.split(',');
		const styleId = "re-hide-keyword-posts";

		if (!document.head.querySelector(`style[id="${styleId}"]`)) {
			const styleElement = document.createElement('style');
			styleElement.id = styleId;

			document.querySelectorAll('shreddit-post').forEach(post => {
				const titleAnchor = post.querySelector('a[id^="post-title-"]');
				if (!titleAnchor) return;

				const titleText = titleAnchor.textContent.toLowerCase();
				if (keywordList.some(word => titleText.includes(word.toLowerCase()))) {
					post.classList.add("re-hidden-keyword");
				}
			});

			styleElement.textContent = `
			shreddit-post.re-hidden-keyword {
				display: none !important;
				}
				`;

			document.head.appendChild(styleElement);
		}
	})
}

// Function - Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	const styleElements = document.head.querySelectorAll('style[id="re-hide-keyword-posts"]');
	styleElements.forEach(el => el.remove());

	document.querySelectorAll('shreddit-post.re-hidden-keyword').forEach(post => {
		post.classList.remove('re-hidden-keyword');
	});
}

