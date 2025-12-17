/**
 * Tweaks: Hide Elements - Hide AI in the search bar
 *
 * @name hideAiInSearch
 * @description Hide AI in the search bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideAiInSearch() {
	BROWSER_API.storage.sync.get(['hideAiInSearch'], function (result) {
		if (result.hideAiInSearch) hideAiInSearch(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideAiInSearch(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideAiInSearchRV3();
	} else {
		disableHideAiInSearchAll();
	}
}

// Enable Hide AI In Search - RV3
function enableHideAiInSearchRV3() {
	document.querySelector('reddit-search-large').removeAttribute('show-ask-button', 'show-snoo-loading-icon');
}

// Disable Hide AI In Search - All
function disableHideAiInSearchAll() {
	document.querySelector('reddit-search-large').setAttribute('show-ask-button', 'show-snoo-loading-icon');
}
