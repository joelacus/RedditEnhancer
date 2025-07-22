/**
 * Tweaks: Resize Feed/Post - Auto Expand Feed/Post To 100% At Value
 *
 * @name autoExpandValue
 * @description Automatically expand the main container to 100% when the window/screen is at certain width.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadAutoExpandValue() {
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		autoExpandValue(result.autoExpandValue);
	});
}

/* === Enable/Disable The Feature === */
export function autoExpandValue(widthVariable) {
	if (redditVersion === 'newnew') {
		disableAutoExpandValueAll();
		enableAutoExpandValueRV3(widthVariable);
	}
}

// Enable Auto Expand Value - RV3
function enableAutoExpandValueRV3(widthVariable) {
	const styleElement = document.createElement('style');
	styleElement.id = 're-auto-expand-layout';
	styleElement.textContent = `@media only screen and (max-width: ${widthVariable}px) {
									.subgrid-container {
										width: 100% !important;
										padding-inline: 0 !important;
										--re-main-container-width: 100% !important;
									}
									.main-container {
										margin: 0 !important;
										padding-inline: 1.5rem;
										max-width: 100% !important;
										--re-content-width: 100% !important;
										--re-sub-width: 100% !important;
										--re-post-width: 100% !important;
										--re-post-overlay-width: 100% !important;
										--re-user-profile-width: 100% !important;
										transform: none !important;
										box-sizing: border-box;
									}
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Auto Expand Value - All
function disableAutoExpandValueAll() {
	const dynamicStyleElements1 = document.head.querySelectorAll('style[id="re-auto-expand-layout"]');
	dynamicStyleElements1.forEach((element) => {
		document.head.removeChild(element);
	});
}
