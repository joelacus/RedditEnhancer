/* ===== Tweaks - Hide - Join Button On r/all and r/popular Posts ===== */

/* === Triggered On Page Load === */
export function loadHideJoinButtonOnPosts() {
	BROWSER_API.storage.sync.get(['hideJoinButtonOnPosts'], function (result) {
		if (result.hideJoinButtonOnPosts) hideJoinButtonOnPosts(true);
	});
}

/* === Main Function === */
export function hideJoinButtonOnPosts(value) {
	if (redditVersion === 'new' && value === true) {
		enableHideJoinButtonOnPostsNew();
	} else if (redditVersion === 'newnew' && value === true) {
		enableHideJoinButtonOnPostsNewNew();
	} else if (value === false) {
		disableHideJoinButtonOnPostsAll();
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Join Button On Posts - New
function enableHideJoinButtonOnPostsNew() {
	if (!document.head.querySelector('style[id="re-hide-join-button-on-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-join-button-on-posts';
		document.head.appendChild(styleElement);
		styleElement.textContent = `[data-testid="post-container"] [id^="subscribe-button"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide Join Button On Posts - New New
function enableHideJoinButtonOnPostsNewNew() {
	if (!document.head.querySelector('style[id="re-hide-join-button-on-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-join-button-on-posts';
		document.head.appendChild(styleElement);
		styleElement.textContent = `shreddit-post shreddit-join-button,
									[data-testid="credit-bar-join-button"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Join Button On Posts - All
function disableHideJoinButtonOnPostsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-join-button-on-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
