/**
 * Tweak type: Hide Elements
 * Tweak name: Hide Recommended/Suggested Posts
 *
 * @name hideRecommended
 * @description Hide Recommended/Suggested posts on the feed.
 *
 * Compatibility: V3 - New New UI (2023-)
 */

/* === Get saved value and enable tweak if true on page load === */
export function loadHideRecommendedPosts() {
	BROWSER_API.storage.sync.get(['hideRecommended'], function (result) {
		if (result.hideRecommended) hideRecommended(true);
	});
}

/* === Enable/Disable tweak based on Reddit version === */
export function hideRecommended(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideRecommendedPostsNewNew();
		} else if (value === false) {
			disableHideRecommendedPostsAll();
		}
	}
}

/* === Functions to Enable/Disable the tweak === */

// Enable Hide Recommended Posts - V3
function enableHideRecommendedPostsNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-recommended-posts';
	styleElement.textContent = `article:has(shreddit-post[recommendation-subreddit-name]),
								article:has(shreddit-post[recommendation-source]){
									display: none !important;
								}
								article:has(shreddit-post[recommendation-subreddit-name]),
								article:has(shreddit-post[recommendation-source]),
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
