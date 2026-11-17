/**
 * Tweaks: Hide Elements - Hide NSFW Search Results
 *
 * @name hideNsfwInSearchResults
 * @description Hide the "NSFW" section in the search results.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideNsfwInSearchResults() {
	BROWSER_API.storage.sync.get(['hideNsfwInSearchResults'], function (result) {
		if (result.hideNsfwInSearchResults) hideNsfwInSearchResults(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideNsfwInSearchResults(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideNsfwSearchResults();
	} else {
		disableHideNsfwSearchResults();
	}
}

// Enable Hide The "NSFW" Section In The Search Results - RV3
function enableHideNsfwSearchResults() {
	if (!document.querySelector('reddit-search-large').shadowRoot.querySelector('style[id="re-hide-nsfw-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-nsfw-section';
		styleElement.textContent = `#typeahead-results-nsfw-section,
									#nsfw_typeahead_section,
									div:has(>[icon-name="rising-outline"]) {
										display: none !important;
									}`;
		document.querySelector('reddit-search-large').shadowRoot.append(styleElement);
	}
}

// Disable Hide The "NSFW" Section In The Search Results - RV3
function disableHideNsfwSearchResults() {
	const dynamicStyleElements = document.querySelector('reddit-search-large').shadowRoot.querySelectorAll('style[id="re-hide-nsfw-section"]');
	dynamicStyleElements.forEach((element) => {
		document.querySelector('reddit-search-large').shadowRoot.removeChild(element);
	});
}

/**
 * Tweaks: Hide Elements - Hide Search Bar Trending Sections in the searchbar.
 *
 * @name hideTrendingTodayInSearchResults
 * @description Hide the Search Bar Trending Sections in the search bar dropdown.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideTrendingTodayInSearchResults() {
	BROWSER_API.storage.sync.get(['hideTrendingTodayInSearchResults'], function (result) {
		if (result.hideTrendingTodayInSearchResults) hideTrendingTodayInSearchResults(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideTrendingTodayInSearchResults(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideTrendingTodaySearchResults();
	} else {
		disableHideTrendingTodaySearchResults();
	}
}

// Enable Hide Search Bar Trending Sections - RV3
function enableHideTrendingTodaySearchResults() {
	if (!document.querySelector('reddit-search-large').shadowRoot.querySelector('style[id="re-hide-trending-today-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-trending-today-section';
		styleElement.textContent = `[id$="_trending_query"],
									[id$="_trending_query"] ~ li,
									[id="subreddit_typeahead_section"],
									[id="subreddit_typeahead_section"] ~ search-telemetry-tracker {
										display: none !important;
									}`;
		document.querySelector('reddit-search-large').shadowRoot.append(styleElement);
	}
}

// Disable Hide Search Bar Trending Sections - RV3
function disableHideTrendingTodaySearchResults() {
	const dynamicStyleElements = document.querySelector('reddit-search-large').shadowRoot.querySelectorAll('style[id="re-hide-trending-today-section"]');
	dynamicStyleElements.forEach((element) => {
		document.querySelector('reddit-search-large').shadowRoot.removeChild(element);
	});
}
