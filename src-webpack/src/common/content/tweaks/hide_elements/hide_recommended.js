/**
 * Tweaks: Hide Elements - Hide Recommended/Suggested Posts
 *
 * @name hideRecommended
 * @description Hide Recommended/Suggested posts on the feed.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideRecommendedPosts() {
	BROWSER_API.storage.sync.get(['hideRecommended'], function (result) {
		if (result.hideRecommended) hideRecommended(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideRecommended(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideRecommendedPostsRV3();
	} else {
		disableHideRecommendedPostsAll();
	}
}

// Enable Hide Recommended Posts - RV3
function enableHideRecommendedPostsRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-recommended-posts';
	styleElement.textContent = `article:has(shreddit-post[recommendation-subreddit-name]),
								article:has(shreddit-post[recommendation-source]){
									display: none !important;
								}
								chat-feed-element-wrapper,
								chat-channel-recommendations-wrapper,
								chat-channel-recommendations-wrapper + div {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Hide Recommended Posts - All
function disableHideRecommendedPostsAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-recommended-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
