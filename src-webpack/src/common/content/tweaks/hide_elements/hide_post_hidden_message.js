/**
 * Tweaks: Hide Elements - Hide Post Hidden Message
 *
 * @name hidePostHiddenMessage
 * @description Hide the "Post Hidden" message when you hide a post on a feed.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHidePostHiddenMessage() {
	BROWSER_API.storage.sync.get(['hidePostHiddenMessage'], function (result) {
		if (result.hidePostHiddenMessage) hidePostHiddenMessage(true);
	});
}

/* === Enable/Disable The Feature === */
export function hidePostHiddenMessage(value) {
	if (redditVersion === 'newnew' && value) {
		enableHidePostHiddenMessageRV3();
	} else {
		disableHidePostHiddenMessageAll();
	}
}

// Enable Hide Post Hidden Message - RV3
function enableHidePostHiddenMessageRV3() {
	if (!document.head.querySelector('style[id="re-hide-post-hidden-message"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-hidden-message';
		styleElement.textContent = `article:has(shreddit-post[hidden]) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Post Hidden Message - All
function disableHidePostHiddenMessageAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-hidden-message"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
