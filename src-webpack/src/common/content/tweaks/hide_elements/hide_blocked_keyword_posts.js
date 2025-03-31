/* ===== Tweaks - Hide - Blocked Keyword Posts ===== */

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
let keywordPostObserver = null;

function enableHideBlockedKeywordPostsNewNew() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPostsList'], function (result) {
		const keywordList = result.hideBlockedKeywordPostsList?.split(',') || [];
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

		// tag posts
		const filterPost = (post) => {
			if (post.classList.contains('re-hidden-keyword')) return;

			const titleAnchor = post.querySelector('a[id^="post-title-"]');
			if (!titleAnchor) return;

			const titleText = titleAnchor.textContent.toLowerCase();
			if (keywordList.some(word => titleText.includes(word.trim().toLowerCase()))) {
				post.classList.add('re-hidden-keyword');
			}
		};

		// initial scan of all posts
		document.querySelectorAll('shreddit-post').forEach(filterPost);

		// start observer to handle dynamically added posts
		const container = document.querySelector('.main-container') || document.body;

		if (keywordPostObserver) keywordPostObserver.disconnect(); // Reset if already running

		keywordPostObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (!(node instanceof HTMLElement)) return;
		
					// If the node itself is a post
					if (node.tagName === 'SHREDDIT-POST') {
						filterPost(node);
					}
		
					// If it might contain posts inside
					const nestedPosts = node.querySelectorAll?.('shreddit-post');
					nestedPosts?.forEach(filterPost);
				});
			});
		});
		
		keywordPostObserver.observe(container, {
			childList: true,
			subtree: true,
		});
	});
}



// Function - Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	const styleElements = document.head.querySelectorAll('style[id="re-hide-keyword-posts"]');
	styleElements.forEach(el => el.remove());

	document.querySelectorAll('shreddit-post.re-hidden-keyword').forEach(post => {
		post.classList.remove('re-hidden-keyword');
	});

	if (keywordPostObserver) {
		keywordPostObserver.disconnect();
		keywordPostObserver = null;
	}
}
