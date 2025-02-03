/* ===== Tweaks - Hide - Post Karma ===== */

/* === Triggered On Page Load === */
export function loadHidePostKarma() {
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		if (result.hidePostKarma) hidePostKarma(true);
	});
}

export function loadHideCommentKarma() {
	BROWSER_API.storage.sync.get(['hideCommentKarma'], function (result) {
		if (result.hideCommentKarma) hideCommentKarma(true);
	});
}

/* === Main Function === */
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
	} if (redditVersion === 'new') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-post-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-karma';
				styleElement.textContent = `div[data-testid="post-container"] button[data-click-id="upvote"] ~ div,
											#overlayScrollContainer > :first-child button.voteButton ~ div {
											  display: none;
											}
											div[data-testid="post-container"] div[id*="vote-arrows-"],
											#overlayScrollContainer > :first-child div[id*="vote-arrows-"] {
											  gap: .5rem;
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
				styleElement.textContent = `shreddit-post::part(karma) {
												display: none !important;
  											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			// hide post karma
			document.querySelectorAll('shreddit-post').forEach((post) => {
				enableHidePostKarma(post);
			});
			// observer
			observer.observe(document.querySelector('.main-container'), {childList: true, subtree: true});
		} else {
			observer.disconnect();
			disableHidePostKarma();
		}
	}
}

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
	} if (redditVersion === 'new') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-comment-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-comment-karma';
				styleElement.textContent = `div.Comment div[id*="vote-arrows-"] div,
											div[data-testid="comment-top-meta"] > span:not([id*="CommentTopMeta"]) {
												display: none;
											}
											div.Comment div[id*="vote-arrows-"] {
												gap: .5rem;
												margin: 0 .5rem 0 0 !important;
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
			observer.observe(document.querySelector('.main-container'), {childList: true, subtree: true});
		} else {
			observer.disconnect();
			disableHideCommentKarma();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Post Karma - New New
function enableHidePostKarma(post) {
	post.shadowRoot.querySelector('span:has(>faceplate-number)').setAttribute('part', 'karma');
}

// Function - Disable Hide Post Karma - New New
function disableHidePostKarma() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('shreddit-post').forEach((post) => {
		post.shadowRoot.querySelector('span:has(>faceplate-number)').removeAttribute('part');
	});
}

// Function - Enable Hide Comment Karma - New New
function enableHideCommentKarma(comment) {
	const a = comment.shadowRoot.querySelector('span:has(>faceplate-number)');
	if (a) { a.setAttribute('part', 'karma'); }
}

// Function - Disable Hide Comment Karma - New New
function disableHideCommentKarma() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-comment-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('shreddit-comment-action-row').forEach((comment) => {
		const a = comment.shadowRoot.querySelector('span:has(>faceplate-number)');
		if (a) { a.removeAttribute('part'); }
	});
}

// Observe feed for new posts
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
