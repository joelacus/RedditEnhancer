/**
 * Tweaks: Hide Elements - Hide Get New Reddit
 *
 * @name hideGetNewReddit
 * @description Hide the "Get New Reddit" button.
 *
 * Applies to: RV1 (Old New UI) (2018-2024)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideGetNewReddit() {
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		if (result.hideGetNewReddit) hideGetNewReddit(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideGetNewReddit(value) {
	if (value) {
		enableHideGetNewReddit();
	} else {
		disableHideGetNewReddit();
	}
}

// Enable Hide Get New Reddit - RV1
function enableHideGetNewReddit() {
	if (!document.head.querySelector('style[id="re-hide-get-new-reddit"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-get-new-reddit';
		styleElement.textContent = `#redesign-beta-optin-btn {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Get New Reddit - RV1
function disableHideGetNewReddit() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-get-new-reddit"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
