/**
 * Tweaks: Hide Elements - Hide Header Bar
 *
 * @name hideHeaderBar
 * @description Hide the top/header bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideHeaderBar() {
	BROWSER_API.storage.sync.get(['hideHeaderBar'], function (result) {
		if (result.hideHeaderBar) hideHeaderBar(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideHeaderBar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideHeaderBarRV3();
	} else {
		disableHideHeaderBarAll();
	}
}

// Enable Hide Header Bar - RV3
function enableHideHeaderBarRV3() {
	if (!document.head.querySelector('style[id="re-hide-header-bar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-bar';
		styleElement.textContent = `shreddit-app reddit-header-large {
										display: none !important;
										visibility: hidden;
									}
									shreddit-app {
										--shreddit-header-height: 0 !important;
										--shreddit-header-large-height: 0 !important;
									}
									shreddit-app shreddit-aspect-ratio {
										--max-height: min(100%, calc(100vh - 250px)) !important;
									}
									reddit-sidebar-nav {
										top: 0 !important;
										height: 100vh !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Header Bar - All
function disableHideHeaderBarAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
