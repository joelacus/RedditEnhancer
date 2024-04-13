/* ===== Tweaks - Hide - Join Button On r/all and r/popular Posts ===== */

/* === Triggered On Page Load === */
export function loadHideJoinButtonOnPosts() {
	BROWSER_API.storage.sync.get(['hideJoinButtonOnPosts'], function (result) {
		hideJoinButtonOnPosts(result.hideJoinButtonOnPosts);
	});
}

/* === Main Function === */
export function hideJoinButtonOnPosts(value) {
	if (redditVersion === 'new' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-join-button-on-posts';
		document.head.appendChild(styleElement);
		styleElement.textContent = `[data-testid="post-container"] [id^="subscribe-button"] {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (redditVersion === 'newnew' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-join-button-on-posts';
		document.head.appendChild(styleElement);
		styleElement.textContent = `shreddit-post shreddit-join-button {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (value === false) {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-join-button-on-posts"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
