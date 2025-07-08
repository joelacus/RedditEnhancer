/**
 * Tweaks: Hide Elements - Hide Join Button
 *
 * @name hideJoinButtonOnPosts
 * @description Hide the "Join" button on posts on r/all and r/popular.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideJoinButtonOnPosts() {
	BROWSER_API.storage.sync.get(['hideJoinButtonOnPosts'], function (result) {
		if (result.hideJoinButtonOnPosts) hideJoinButtonOnPosts(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideJoinButtonOnPosts(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideJoinButtonOnPostsRV3();
	} else {
		disableHideJoinButtonOnPostsAll();
	}
}

// Enable Hide Join Button On Posts - RV3
function enableHideJoinButtonOnPostsRV3() {
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

// Disable Hide Join Button On Posts - All
function disableHideJoinButtonOnPostsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-join-button-on-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
