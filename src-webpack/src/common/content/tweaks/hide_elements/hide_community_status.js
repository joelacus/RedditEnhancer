/**
 * Tweaks: Hide Elements - Hide community status
 *
 * @name hideCommunityStatus
 * @description Hide the community status next to the r/ handle on posts, sidebar and subreddit pages.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHideCommunityStatus() {
    BROWSER_API.storage.sync.get(['hideCommunityStatus']).then((result) => {
        if (result.hideCommunityStatus) hideCommunityStatus(true);
    });
}

// Activate the feature based on Reddit version
export function hideCommunityStatus(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            if (!document.head.querySelector('style[id="re-hide-community-status"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-hide-community-status';
                styleElement.textContent = `span[slot="community-status"],
                                            community-status-tooltip {
                                                display: none !important;
                                            }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        } else {
            const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-community-status"]');
            dynamicStyleElements.forEach((element) => {
                document.head.removeChild(element);
            });
        }
    }
}