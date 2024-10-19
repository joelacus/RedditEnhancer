/* ===== Tweaks - Hide - Search Results Sections ===== */

/* === Triggered On Page Load === */
export function loadHideNsfwInSearchResults() {
	BROWSER_API.storage.sync.get(['hideNsfwInSearchResults'], function (result) {
		if (result.hideNsfwInSearchResults) hideNsfwInSearchResults(true);
	});
}
export function loadHideTrendingTodayInSearchResults() {
	BROWSER_API.storage.sync.get(['hideTrendingTodayInSearchResults'], function (result) {
		if (result.hideTrendingTodayInSearchResults) hideTrendingTodayInSearchResults(true);
	});
}

/* === Main Function === */

// Hide The "NSFW" Section In The Search Results
export function hideNsfwInSearchResults(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideNsfwSearchResults();
		} else if (value === false) {
			disableHideNsfwSearchResults();
		}
	}
}

// Hide The "Trending Today" Section In The Search Results
export function hideTrendingTodayInSearchResults(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideTrendingTodaySearchResults();
		} else if (value === false) {
			disableHideTrendingTodaySearchResults();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide The "NSFW" Section In The Search Results - New New
function enableHideNsfwSearchResults() {
	if (!document.querySelector('reddit-search-large').shadowRoot.querySelector('style[id="re-hide-nsfw-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-nsfw-section';
		styleElement.textContent = `#typeahead-results-nsfw-section,
									div:has(>[icon-name="rising-outline"]) {
										display: none !important;
									}`;
		document.querySelector('reddit-search-large').shadowRoot.append(styleElement);
	}
}

// Function - Disable Hide The "NSFW" Section In The Search Results - New New
function disableHideNsfwSearchResults() {
	const dynamicStyleElements = document.querySelector('reddit-search-large').shadowRoot.querySelectorAll('style[id="re-hide-nsfw-section"]');
	dynamicStyleElements.forEach((element) => {
		document.querySelector('reddit-search-large').shadowRoot.removeChild(element);
	});
}

// Function - Enable Hide "Trending Today" Section - New New
function enableHideTrendingTodaySearchResults() {
	if (!document.querySelector('reddit-search-large').shadowRoot.querySelector('style[id="re-hide-trending-today-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-trending-today-section';
		styleElement.textContent = `#reddit-trending-searches-partial-container,
									div:has(>[icon-name="rising-outline"]) {
										display: none !important;
									}
									div:has(>#reddit-recent-searches-partial-container) {
										border: none !important;
									}`;
		document.querySelector('reddit-search-large').shadowRoot.append(styleElement);
	}
}

// Function - Disable Hide "Trending Today" Section - New New
function disableHideTrendingTodaySearchResults() {
	const dynamicStyleElements = document.querySelector('reddit-search-large').shadowRoot.querySelectorAll('style[id="re-hide-trending-today-section"]');
	dynamicStyleElements.forEach((element) => {
		document.querySelector('reddit-search-large').shadowRoot.removeChild(element);
	});
}
