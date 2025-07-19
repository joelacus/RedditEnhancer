/**
 * Tweaks: Hide Elements - Hide Community Status
 *
 * @name hideCommunityStatus
 * @description Hide the community status next to the r/ handle on posts, sidebar and subreddit pages.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideCommunityStatus() {
	BROWSER_API.storage.sync.get(['hideCommunityStatus']).then((result) => {
		if (result.hideCommunityStatus) hideCommunityStatus(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideCommunityStatus(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-community-status"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-community-status';
				styleElement.textContent = `span[slot="community-status"],
                                            community-status-tooltip,
                                            activate-feature[name^="CommunityStatusEditModal_"] {
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
