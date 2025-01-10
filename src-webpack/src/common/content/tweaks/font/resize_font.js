/* ===== Tweaks - Accessibility - Resize Font ===== */

/* === Triggered On Page Load === */
export function loadResizeFont() {
	BROWSER_API.storage.sync.get(['postTitleFontSize', 'postContentFontSize', 'postCommentsFontSize', 'feedPostTitleFontSize', 'feedPostContentFontSize', 'createPostTitleFontSize', 'createPostBodyFontSize'], function (result) {
		if (result.postTitleFontSize) postTitleFontSize(result.postTitleFontSize);
		if (result.postContentFontSize) postContentFontSize(result.postContentFontSize);
		if (result.postCommentsFontSize) postCommentsFontSize(result.postCommentsFontSize);
		if (result.feedPostTitleFontSize) feedPostTitleFontSize(result.feedPostTitleFontSize);
		if (result.feedPostContentFontSize) feedPostContentFontSize(result.feedPostContentFontSize);
		if (result.createPostTitleFontSize) createPostTitleFontSize(result.createPostTitleFontSize);
		if (result.createPostBodyFontSize) createPostBodyFontSize(result.createPostBodyFontSize);
	});
}

/* === Main Functions === */

// Resize "Post Title" Font
export function postTitleFontSize(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-size';
				styleElement.textContent = `.comments-page .thing p.title a {
												font-size: var(--re-post-title-font-size);
												line-height: 1.5;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-size';
				styleElement.textContent = `.Post [data-adclicklocation="title"] h1,
											.Post [data-adclicklocation="title"] h3 {
												font-size: var(--re-post-title-font-size);
												line-height: 1.5;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-size';
				styleElement.textContent = `[routename="post_page"] shreddit-post a[slot="title"],
											[routename="post_page"] shreddit-post h1[slot="title"],
											[routename="post_page"] div.crosspost-title a,
											[routename="comments_page"] shreddit-post h1[slot="title"],
											[routename="comments_page"] div.crosspost-title a,
											mod-queue-app shreddit-post h1[slot="title"] > a {
												font-size: var(--re-post-title-font-size) !important;
												line-height: 1.4;
											}
											shreddit-post h1[slot="title"] {
												margin: .5rem 0;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-title-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-title-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize "Post Content" Font
export function postContentFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-size';
				styleElement.textContent = `.comments-page .thing[data-type="link"] .usertext p {
												font-size: var(--re-post-content-font-size);
												line-height: 1.5;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-size';
				styleElement.textContent = `.Post [data-click-id="text"] p {
												font-size: var(--re-post-content-font-size);
												line-height: 1.5;
												overflow: hidden;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-size';
				styleElement.textContent = `shreddit-post div[slot="text-body"] div.md,
											shreddit-post a[slot="text-body"] div:has(>p),
											shreddit-profile-comment [id*="-content"],
											div[slot="post-media-container"] div.md {
												font-size: var(--re-post-content-font-size) !important;
												line-height: 1.5 !important;
											}
											shreddit-post div[slot="text-body"] div.md h1 {
												font-size: 1.5em;
												line-height: inherit;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-content-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-content-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-content-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize "Post Comments" Font
export function postCommentsFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `.commentarea .thing[data-type="comment"] .usertext p {
												font-size: var(--re-post-comments-font-size);
												line-height: 1.4;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `.Comment [data-testid="comment"] p {
												font-size: var(--re-post-comments-font-size);
												line-height: 1.4;
												overflow: hidden;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `shreddit-comment div.md[slot="comment"],
											shreddit-profile-comment div.md,
											shreddit-composer div[contenteditable] {
												font-size: var(--re-post-comments-font-size);
												line-height: 1.6;
											}
											shreddit-comment div.md[slot="comment"] h1,
											shreddit-profile-comment div.md h1,
											shreddit-composer div[contenteditable] h1 {
												font-size: 1.5em;
												line-height: inherit;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-comments-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-comments-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-comment-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize "Feed Post Title" Font
export function feedPostTitleFontSize(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-feed-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-title-font-size';
				styleElement.textContent = `.listing-page .thing p.title a {
												font-size: var(--re-feed-post-title-font-size);
												line-height: 1.2;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-feed-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-title-font-size';
				styleElement.textContent = `shreddit-feed shreddit-post a[slot="title"],
											shreddit-feed shreddit-post h1[slot="title"],
											shreddit-feed div.crosspost-title a,
											search-telemetry-tracker a[data-testid="post-title-text"],
											mod-queue-app shreddit-post a[slot="title"] {
												font-size: var(--re-feed-post-title-font-size) !important;
												line-height: 1.4;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-feed-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-title-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-feed-post-title-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize "Feed Post Content" Font
export function feedPostContentFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-feed-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-content-font-size';
				styleElement.textContent = `.listing-page .thing[data-type="link"] .usertext p {
												font-size: var(--re-feed-post-content-font-size);
												line-height: 1.5;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-feed-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-feed-post-content-font-size';
				styleElement.textContent = `shreddit-feed shreddit-post [data-post-click-location="text-body"] p,
											shreddit-feed shreddit-profile-comment [id*="-content"],
											shreddit-feed div[slot="post-media-container"] div.md,
											div.md.feed-card-text-preview,
											mod-queue-app shreddit-post [data-post-click-location="text-body"] div.md {
												font-size: var(--re-feed-post-content-font-size) !important;
												line-height: 1.5 !important;
											}
											shreddit-feed shreddit-post [data-post-click-location="text-body"] h1 {
												font-size: 1.5em;
												line-height: inherit;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-feed-post-content-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-content-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-feed-post-content-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize "Create Post: Title" Font
export function createPostTitleFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-create-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-create-post-title-font-size';
				styleElement.textContent = `#title-field textarea {
												font-size: var(--re-create-post-title-font-size);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-create-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-create-post-title-font-size';
				styleElement.textContent = `div#AppRouter-main-content textarea[placeholder="Title"] {
												font-size: var(--re-create-post-title-font-size);
												line-height: 1.4;
												height: unset !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-create-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-create-post-title-font-size';
				styleElement.textContent = `shreddit-app[pagetype="post_submit"] faceplate-textarea-input::part(title) {
												font-size: var(--re-create-post-title-font-size) !important;
												line-height: 1.2 !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			if (document.querySelector('shreddit-app[pagetype="post_submit"] faceplate-textarea-input')) {
				document.querySelector('shreddit-app[pagetype="post_submit"] faceplate-textarea-input').shadowRoot.querySelector('#innerTextArea').setAttribute('part', 'title');
			}
		}
		document.documentElement.style.setProperty('--re-create-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-create-post-title-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-create-post-title-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize "Create Post: Body" Font
export function createPostBodyFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-create-post-body-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-create-post-body-font-size';
				styleElement.textContent = `#text-field textarea {
												font-size: var(--re-create-post-body-font-size);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-create-post-body-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-create-post-body-font-size';
				styleElement.textContent = `div#AppRouter-main-content div.public-DraftEditor-content[contenteditable],
				 							div#AppRouter-main-content textarea[placeholder="Url"],
				 							div#AppRouter-main-content div[data-testid="poll-creator"] input {
												font-size: var(--re-create-post-body-font-size);
												line-height: 1.4;
											}
											div#AppRouter-main-content div.public-DraftEditor-content[contenteditable] h1 {
												font-size: 1.5em;
												line-height: inherit;
											}
											div#AppRouter-main-content div.public-DraftEditor-content[contenteditable] h1 > div,
											div#AppRouter-main-content div.public-DraftEditor-content[contenteditable] div:has(> code) {
												font-size: inherit;
												line-height: inherit;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-create-post-body-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-create-post-body-font-size';
				styleElement.textContent = `shreddit-app[pagetype="post_submit"] shreddit-composer p > span {
												font-size: var(--re-create-post-body-font-size) !important;
												line-height: 1.6 !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-create-post-body-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-create-post-body-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-create-post-body-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
