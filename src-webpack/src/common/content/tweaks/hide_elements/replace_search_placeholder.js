/**
 * Tweaks: Hide Elements - Replace Search Bar Placeholder Text
 *
 * @name replaceSearchPlaceholderText
 * @description Replace the "Find anything" in the search bar back to "Search Reddit".
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadReplaceSearchPlaceholderText() {
	BROWSER_API.storage.sync.get(['replaceSearchPlaceholderText'], function (result) {
		if (result.replaceSearchPlaceholderText) replaceSearchPlaceholderText(true);
	});
}

/* === Enable/Disable The Feature === */
export function replaceSearchPlaceholderText(value) {
	const routename = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutes = ['frontpage', 'popular'];

	if (redditVersion === 'newnew' && value && feedRoutes.includes(routename)) {
		enableReplaceSearchPlaceholderTextRV3();
	} else {
		disableReplaceSearchPlaceholderTextAll();
	}
}

// Enable Replace Search Bar Placeholder Text - RV3
function enableReplaceSearchPlaceholderTextRV3() {
	const input = document.querySelector('reddit-search-large').shadowRoot.querySelector('faceplate-search-input').shadowRoot.querySelector('input');
	if (input) input.placeholder = 'Search Reddit';
}

// Disable Replace Search Bar Placeholder Text - All
function disableReplaceSearchPlaceholderTextAll() {
	const input = document.querySelector('reddit-search-large')?.shadowRoot?.querySelector('faceplate-search-input')?.shadowRoot?.querySelector('input');
	if (input && input.placeholder === 'Search Reddit') input.placeholder = 'Find anything';
}
