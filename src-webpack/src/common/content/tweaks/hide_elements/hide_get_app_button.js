/**
 * Tweaks: Hide Elements - Hide 'Get App' Button
 *
 * @name hideGetAppButton
 * @description Hide the 'Get App' button in the top/header bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideGetAppButton() {
	BROWSER_API.storage.sync.get(['hideGetAppButton'], function (result) {
		if (result.hideGetAppButton) hideGetAppButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideGetAppButton(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideGetAppButtonRV3();
	} else {
		disableHideGetAppButtonAll();
	}
}

// Enable Hide 'Get App' Button - RV3
function enableHideGetAppButtonRV3() {
	if (!document.head.querySelector('style[id="re-hide-get-app-button"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-get-app-button';
		styleElement.textContent = `[data-part="get-app-btn"],
									header nav > div > span:has(#get-app) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide 'Get App' Button - All
function disableHideGetAppButtonAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-get-app-button"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
