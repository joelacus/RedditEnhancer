/* ===== Tweaks - Hide - Post Karma ===== */

/* === Triggered On Page Load === */
export function loadHidePostKarma() {
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		if (result.hidePostKarma) hidePostKarma(true);
	});
}

/* === Main Function === */
export function hidePostKarma(value) {
	if (redditVersion === 'newnew' && value === true) {
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
		observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
	} else {
		observer.disconnect();
		disableHidePostKarma();
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

// Observe feed for new posts
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				setTimeout(() => {
					document.querySelectorAll('shreddit-post').forEach((post) => {
						enableHidePostKarma(post);
					});
				}, 1000);
			}
		});
	});
});
