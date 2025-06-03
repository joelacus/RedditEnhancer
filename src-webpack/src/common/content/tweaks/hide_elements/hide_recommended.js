/* ===== Tweaks - Hide - Recommended Posts ===== */

/* === Triggered On Page Load === */
export function loadHideRecommendedPosts() {
	BROWSER_API.storage.sync.get(['hideRecommended'], function (result) {
		if (result.hideRecommended) hideRecommended(true);
	});
}

/* === Main Function === */
export function hideRecommended(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHideRecommendedPostsNew();
		} else if (value === false) {
			disableHideRecommendedPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideRecommendedPostsNewNew();
		} else if (value === false) {
			disableHideRecommendedPostsAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Recommended Posts - New
function enableHideRecommendedPostsNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-recommended-posts';
	styleElement.textContent = `.Post:has([data-click-id="background"] > .RichTextJSON-root > p):has([id^="subscribe-button"]),
								[data-testid="frontpage-sidebar"] > div:has(.ad-banner) {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide Recommended Posts - New New
function enableHideRecommendedPostsNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-recommended-posts';
	styleElement.textContent = `shreddit-post[recommendation-subreddit-name],
								shreddit-post[recommendation-source]{
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

// Function - Disable Hide Recommended Posts - All
function disableHideRecommendedPostsAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-recommended-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
