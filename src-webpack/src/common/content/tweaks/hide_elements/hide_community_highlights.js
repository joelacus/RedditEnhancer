/**
 * Tweaks: Hide Elements - Hide Community Highlights
 * @name hideCommunityHighlights
 * @description Hides the community highlights element at the top of a subreddit.
 *
 * Applies to: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideCommunityHighlights() {
	BROWSER_API.storage.sync.get(['hideCommunityHighlights'], function (result) {
		if (result.hideCommunityHighlights) hideCommunityHighlights(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideCommunityHighlights(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableHideCommunityHighlightsRV3();
		} else {
			disableHideCommunityHighlights();
		}
	}
}

// Enable Hide Community Highlights - RV3
function enableHideCommunityHighlightsRV3() {
	if (!document.head.querySelector('style[id="re-hide-community-highlights"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-community-highlights';
		styleElement.textContent = `community-highlight-carousel {
                                        display: none !important;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Community Highlights - RV3
function disableHideCommunityHighlights() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-community-highlights"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
