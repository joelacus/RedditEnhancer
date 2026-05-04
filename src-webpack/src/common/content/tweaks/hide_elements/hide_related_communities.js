/**
 * Tweaks: Hide Elements - Hide Related Communities
 *
 * @name hideRelatedCommunities
 * @description Hide the "Related Communities" section on subreddit pages.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideRelatedCommunities() {
	BROWSER_API.storage.sync.get(['hideRelatedCommunities'], function (result) {
		if (result.hideRelatedCommunities) hideRelatedCommunities(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideRelatedCommunities(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideRelatedCommunitiesRV3();
	} else {
		disableHideRelatedCommunitiesAll();
	}
}

// Enable Hide Related Communities - RV3
function enableHideRelatedCommunitiesRV3() {
	if (!document.head.querySelector('style[id="re-hide-related-communities"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-related-communities';
		styleElement.textContent = `shreddit-app:not([pagetype="explore"])in-feed-community-recommendations {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Related Communities - All
function disableHideRelatedCommunitiesAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-related-communities"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
