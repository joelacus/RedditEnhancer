// Resize Font

// Resize Post Title Font
export function postTitleFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-size';
				styleElement.textContent = `.thing p.title a {
												font-size: var(--re-post-title-font-size);
												line-height: var(--re-post-title-font-size);
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
												line-height: var(--re-post-title-font-size);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-title-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-title-font-size';
				styleElement.textContent = `shreddit-post a[slot="title"],
											shreddit-post h1[slot="title"] {
												font-size: var(--re-post-title-font-size);
												line-height: var(--re-post-title-font-size);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
		document.documentElement.style.setProperty('--re-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-title-font-size');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-post-content-font-size"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Resize Post Content Font
export function postContentFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-size';
				styleElement.textContent = `.thing[data-type="link"] .usertext p {
												font-size: var(--re-post-content-font-size);
												line-height: var(--re-post-content-font-size);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-size';
				styleElement.textContent = `.Post [data-click-id="text"] p {
												font-size: var(--re-post-content-font-size);
												line-height: calc(var(--re-post-content-font-size) + 2px);
												overflow: hidden;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-post-content-font-size';
				styleElement.textContent = `shreddit-post [data-post-click-location="text-body"] p {
												font-size: var(--re-post-content-font-size) !important;
												line-height: calc(var(--re-post-content-font-size) + 2px) !important;
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

// Resize Post Comments Font
export function postCommentsFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'old') {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `.commentarea .thing[data-type="comment"] .usertext p {
												font-size: var(--re-post-comments-font-size);
												line-height: var(--re-post-comments-font-size);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'new') {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `.Comment [data-testid="comment"] p {
												font-size: var(--re-post-comments-font-size);
												line-height: calc(var(--re-post-comments-font-size) + 2px);
												overflow: hidden;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else if (redditVersion === 'newnew') {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `shreddit-comment p {
												font-size: var(--re-post-comments-font-size);
												line-height: calc(var(--re-post-comments-font-size) + 2px);
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
