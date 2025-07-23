/**
 * Tweaks: Productivity - Non Sticky Header Bar
 * @name nonStickyHeaderBar
 * @description Prevent the top/header bar from being fixed to the top of the page when the user scrolls down.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadNonStickyHeaderBar() {
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		if (result.nonStickyHeaderBar) nonStickyHeaderBar(true);
	});
}

/* === Enable/Disable The Feature === */
export function nonStickyHeaderBar(value) {
	if (redditVersion === 'newnew' && value) {
		enableNonStickyHeaderBarRV3();
	} else {
		disableNonStickyHeaderBarAll();
	}
}

// Enable Non Sticky Header Bar - RV3
function enableNonStickyHeaderBarRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-non-sticky-header-bar';
	styleElement.textContent = `:root {
									--re-non-sticky-header-bar: 0;
								}
								shreddit-app reddit-header-large {
									position: absolute !important;
								}
								shreddit-app :not(.re-header-menu) > reddit-sidebar-nav,
								shreddit-app div#flex-left-nav-container {
									position: sticky;
									height: 100vh !important;
									top: 0 !important;
								}
								shreddit-app #right-sidebar-container {
									height: initial;
									max-height: initial !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Non Sticky Header Bar - All
function disableNonStickyHeaderBarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-non-sticky-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
