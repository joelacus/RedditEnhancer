/**
 * Tweaks: Hide Elements - Hide Post Karma
 *
 * @name hidePostKarma
 * @description Hide the post karma.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHidePostKarma() {
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		if (result.hidePostKarma) hidePostKarma(true);
	});
}

/* === Enable/Disable The Feature === */
export function hidePostKarma(value) {
	if (redditVersion === 'old') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-post-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-karma';
				styleElement.textContent = `.link div.midcol div.score {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-karma"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-post-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-karma';
				styleElement.textContent = `.re-vote-panel faceplate-number,
											shreddit-post::part(karma) {
												display: none !important;
  											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			// hide post karma
			document.querySelectorAll('shreddit-post').forEach((post) => {
				enableHidePostKarma(post);
			});
			// observer
			observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
		} else {
			observer.disconnect();
			disableHidePostKarma();
		}
	}
}

// Enable Hide Post Karma - RV3
function enableHidePostKarma(post) {
	post.shadowRoot.querySelector('span:has(>faceplate-number)').setAttribute('part', 'karma');
}

// Disable Hide Post Karma - RV3
function disableHidePostKarma() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('shreddit-post').forEach((post) => {
		post.shadowRoot.querySelector('span:has(>faceplate-number)').removeAttribute('part');
	});
}

/**
 * Tweaks: Hide Elements - Hide Comment Karma
 *
 * @name hideCommentKarma
 * @description Hide the comment karma.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideCommentKarma() {
	BROWSER_API.storage.sync.get(['hideCommentKarma'], function (result) {
		if (result.hideCommentKarma) hideCommentKarma(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideCommentKarma(value) {
	if (redditVersion === 'old') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-comment-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-comment-karma';
				styleElement.textContent = `.comment p.tagline span.score {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-comment-karma"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-comment-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-comment-karma';
				styleElement.textContent = `shreddit-comment-action-row::part(karma) {
												display: none !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			// hide comment karma
			document.querySelectorAll('shreddit-comment-action-row').forEach((comment) => {
				enableHideCommentKarma(comment);
			});
			// observer
			observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
		} else {
			observer.disconnect();
			disableHideCommentKarma();
		}
	}
}

// Enable Hide Comment Karma - RV3
function enableHideCommentKarma(comment) {
	const a = comment.shadowRoot.querySelector('span:has(>faceplate-number)');
	if (a) {
		a.setAttribute('part', 'karma');
	}
}

// Disable Hide Comment Karma - RV3
function disableHideCommentKarma() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-comment-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('shreddit-comment-action-row').forEach((comment) => {
		const a = comment.shadowRoot.querySelector('span:has(>faceplate-number)');
		if (a) {
			a.removeAttribute('part');
		}
	});
}

/* === Observe feed for new posts === */
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (addedNode.nodeName === 'DIV' || addedNode.nodeName === 'SHREDDIT-COMMENT') {
				setTimeout(() => {
					document.querySelectorAll('shreddit-post').forEach(enableHidePostKarma);
					document.querySelectorAll('shreddit-comment-action-row').forEach(enableHideCommentKarma);
				}, 0);
			}
		});
	});
});
