/**
 * Tweaks: Media - Hide Video Recommendations
 *
 * @name hideVideoRecommendations
 * @description Hide video recommendations after playing a video in the Reddit video player.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideVideoRecommendations() {
	BROWSER_API.storage.sync.get(['hideVideoRecommendations']).then((result) => {
		if (result.hideVideoRecommendations) hideVideoRecommendations(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideVideoRecommendations(value) {
	if (redditVersion === 'newnew') {
		value ? enableHideVideoRecommendations() : disableHideVideoRecommendations();
	}
}

// Enable Hide Video Recommendations
function enableHideVideoRecommendations() {
	if (!document.head.querySelector('style[id="re-hide-video-recommendations"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-video-recommendations';
		styleElement.textContent = `shreddit-aspect-ratio div[slot="recommendation-overlay"],
									shreddit-player-2 .overlay-recommendations {
                                        display: none;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Video Recommendations
function disableHideVideoRecommendations() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-video-recommendations"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
