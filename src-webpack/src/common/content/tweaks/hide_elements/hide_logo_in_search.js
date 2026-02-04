/**
 * Tweaks: Hide Elements - Hide logo in the search bar
 *
 * @name hideLogoInSearch
 * @description Hide the Reddit logo in the search bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideLogoInSearch() {
	BROWSER_API.storage.sync.get(['hideLogoInSearch'], function (result) {
		if (result.hideLogoInSearch) hideLogoInSearch(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideLogoInSearch(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideLogoInSearchRV3();
	} else {
		disableHideLogoInSearchAll();
	}
}

// Enable Hide AI In Search - RV3
function enableHideLogoInSearchRV3() {
	document.querySelector('reddit-search-large')?.removeAttribute('show-snoo-leading-icon');
}

// Disable Hide AI In Search - All
function disableHideLogoInSearchAll() {
	document.querySelector('reddit-search-large')?.setAttribute('show-snoo-leading-icon', '');
}
