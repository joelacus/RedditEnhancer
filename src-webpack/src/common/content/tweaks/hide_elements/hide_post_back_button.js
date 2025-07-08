/**
 * Tweaks: Hide Elements - Hide Post Back Button
 *
 * @name hidePostBackButton
 * @description Hide the back button on a post.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHidePostBackButton() {
	BROWSER_API.storage.sync.get(['hidePostBackButton'], function (result) {
		if (result.hidePostBackButton) hidePostBackButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function hidePostBackButton(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideBackButtonRV3();
	} else {
		disableHideBackButton();
	}
}

// Enable Hide Post Back Button - RV3
function enableHideBackButtonRV3() {
	if (!document.head.querySelector('style[id="re-hide-post-back-button"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-back-button';
		styleElement.textContent = `pdp-back-button {
                                    display: none !important;
                                }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Post Back Button - RV3
function disableHideBackButton() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-back-button"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
