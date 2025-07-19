/**
 * Tweaks: Hide Elements - Hide Header Sub Bar on old.reddit
 *
 * @name hideHeaderSubBar
 * @description Hide the top bar on old Reddit with the list of joined subreddits.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideHeaderSubBar() {
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		if (result.hideHeaderSubBar) hideHeaderSubBar(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideHeaderSubBar(value) {
	if (value) {
		enableHideHeaderSubBarRV1();
	} else {
		disableHideHeaderSubBarRV1();
	}
}

// Enable Hide Header Sub Bar - RV1
function enableHideHeaderSubBarRV1() {
	if (!document.head.querySelector('style[id="re-hide-header-sub-bar"]')) {
		const style = document.createElement('style');
		style.id = 're-hide-header-sub-bar';
		style.textContent = `#sr-header-area {
								display: none !important;
							}
							body.with-listing-chooser div.listing-chooser {
								top: 45px;
							}`;
		document.head.insertBefore(style, document.head.firstChild);
	}
}

// Disable Hide Header Sub Bar - RV1
function disableHideHeaderSubBarRV1() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-sub-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
