/**
 * Tweaks - Hide - Community Highlights
 * Hide the Community Highlights section, which shows posts pinned by moderators as a collapsible section,
 * at the top of subreddit pages.
 *
 * Applies to: New New UI (2023-)
 */

/* === Triggered On Page Load === */
export function loadHideCommunityHighlights() {
	BROWSER_API.storage.sync.get(['hideCommunityHighlights'], function (result) {
		if (result.hideCommunityHighlights) hideCommunityHighlights(true);
	});
}

/* === Main Function === */
export function hideCommunityHighlights(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideCommunityHighlights();
		} else if (value === false) {
			disableHideCommunityHighlights();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Community Highlights - New New
function enableHideCommunityHighlights() {
	if (!document.head.querySelector('style[id="re-hide-community-highlights"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-community-highlights';
		styleElement.textContent = `community-highlight-carousel {
                                        display: none !important;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Community Highlights - New New
function disableHideCommunityHighlights() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-community-highlights"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
