/* ===== Tweaks - Accessibility - Font Weight ===== */

/* === Triggered On Page Load === */
export function loadPostFontWeight() {
	BROWSER_API.storage.sync.get(['postTitleFontWeight', 'postContentFontWeight', 'postCommentsFontWeight', 'feedPostTitleFontWeight', 'feedPostContentFontWeight'], function (result) {
		postTitleFontWeight(result.postTitleFontWeight);
		postContentFontWeight(result.postContentFontWeight);
		postCommentsFontWeight(result.postCommentsFontWeight);
		feedPostTitleFontWeight(result.feedPostTitleFontWeight);
		feedPostContentFontWeight(result.feedPostContentFontWeight);
	});
}

/* === Main Functions === */

// Post Title Font Weight
export function postTitleFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-title-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-weight';
				styleElement.textContent = `.comments-page .thing p.title a {
												font-weight: var(--re-post-title-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-title-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-weight';
				styleElement.textContent = `[routename="post_page"] shreddit-post a[slot="title"],
											[routename="post_page"] shreddit-post h1[slot="title"],
											[routename="post_page"] shreddit-profile-comment h2 a {
												font-weight: var(--re-post-title-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-title-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-title-font-weight');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-title-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Content Font Weight
export function postContentFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-content-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-weight';
				styleElement.textContent = `.comments-page .thing[data-type="link"] .usertext p {
												font-weight: var(--re-post-content-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-content-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-weight';
				styleElement.textContent = `[routename="post_page"] shreddit-post [data-post-click-location="text-body"] p,
											[routename="post_page"] shreddit-profile-comment [id*="-content"] {
												font-weight: var(--re-post-content-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-content-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-content-font-weight');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-content-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Comments Font Weight
export function postCommentsFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-comments-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-comments-font-weight';
				styleElement.textContent = `.commentarea .thing[data-type="comment"] .usertext p {
												font-weight: var(--re-post-comments-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-comments-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-comments-font-weight';
				styleElement.textContent = `shreddit-comment p {
												font-weight: var(--re-post-comments-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-comments-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-comments-font-weight');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-comments-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Feed Post Title Font Weight
export function feedPostTitleFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-feed-post-title-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-title-font-weight';
				styleElement.textContent = `.listing-page .thing p.title a {
												font-weight: var(--re-feed-post-title-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-feed-post-title-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-title-font-weight';
				styleElement.textContent = `shreddit-feed shreddit-post a[slot="title"],
											shreddit-feed shreddit-post h1[slot="title"],
											shreddit-feed shreddit-profile-comment h2 a {
												font-weight: var(--re-feed-post-title-font-weight) !important;
											}
											shreddit-feed shreddit-profile-comment h2 a img {
												min-width: 24px;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-feed-post-title-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-title-font-weight');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-feed-post-title-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Feed Post Content Font Weight
export function feedPostContentFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-feed-post-content-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-content-font-weight';
				styleElement.textContent = `.listing-page .thing[data-type="link"] .usertext p {
												font-weight: var(--re-feed-post-content-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-feed-post-content-font-weight"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-content-font-weight';
				styleElement.textContent = `shreddit-feed shreddit-post [data-post-click-location="text-body"] p,
											shreddit-feed shreddit-profile-comment [id*="-content"] {
												font-weight: var(--re-feed-post-content-font-weight) !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-feed-post-content-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-content-font-weight');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-feed-post-content-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
