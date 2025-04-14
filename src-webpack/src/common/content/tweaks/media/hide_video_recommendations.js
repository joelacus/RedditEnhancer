/**
 * Tweaks: Hide Elements - Hide Video Recommendations
 *
 * @name hideVideoRecommendations
 * @description Hide video recommendations after playing a video in the Reddit video player.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHideVideoRecommendations() {
    BROWSER_API.storage.sync.get(['hideVideoRecommendations']).then((result) => {
        if (result.hideVideoRecommendations) hideVideoRecommendations(true);
    });
}

// Activate the feature based on Reddit version
export function hideVideoRecommendations(value) {
    if (redditVersion === 'newnew') {
        value ? enableHideVideoRecommendations() : disableHideVideoRecommendations();
    }
}

// Enable the feature
function enableHideVideoRecommendations() {
    if (!document.head.querySelector('style[id="re-hide-video-recommendations"]')) {
        const styleElement = document.createElement('style');
        styleElement.id = 're-hide-video-recommendations';
        styleElement.textContent = `shreddit-aspect-ratio div[slot="recommendation-overlay"] {
                                        display: none;
                                    }`;
        document.head.insertBefore(styleElement, document.head.firstChild);
    }
}

// Disable the feature
function disableHideVideoRecommendations() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-video-recommendations"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}