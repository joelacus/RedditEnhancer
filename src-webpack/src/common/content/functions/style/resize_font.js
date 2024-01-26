// Resize Font

export function postContentFontSize(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		if (value != '9' && value != false) {
			if (!document.querySelector('style[id="re-post-content-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `shreddit-post [data-post-click-location="text-body"] p {
												font-size: var(--re-post-content-font-size) !important;
												line-height: calc(var(--re-post-content-font-size) + 2px) !important;
											}				
											.Post p {
												font-size: var(--re-post-content-font-size);
												line-height: calc(var(--re-post-content-font-size) + 2px);
												overflow: hidden;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
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
}

export function postCommentsFontSize(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		if (value != '9' && value != false) {
			if (!document.querySelector('style[id="re-post-comment-font-size"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-styles';
				styleElement.textContent = `shreddit-comment p {
												font-size: var(--re-post-comments-font-size);
												line-height: calc(var(--re-post-comments-font-size) + 2px);
											}
											.Comment [data-testid="comment"] p {
												font-size: var(--re-post-comments-font-size);
												line-height: calc(var(--re-post-comments-font-size) + 2px);
												overflow: hidden;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
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
}
