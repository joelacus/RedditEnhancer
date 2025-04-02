/**
 * Tweaks: Hide Elements - Hide post separators
 * @name hidePostDivider
 * @description Hide the separator lines between entries in feeds (frontpage, subreddits, etc.)
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHidePostDivider() {
	BROWSER_API.storage.sync.get(['hidePostDivider', 'postSeparatorHeight']).then((result) => {
		if (result.hidePostDivider) {
			hidePostDivider(true);
			postSeparatorHeight(result.postSeparatorHeight);
		}
	});
}

// Activate the feature based on Reddit version
export function hidePostDivider(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableHidePostDivider();
		} else {
			disableHidePostDivider();
		}
	}
}

// Enable the feature
function enableHidePostDivider() {
	if (!document.head.querySelector('style[id="re-hide-post-divider"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-divider';
		styleElement.textContent = `shreddit-title ~ hr,
									article ~ hr,
									faceplate-tracker ~ hr,
									faceplate-tracker > hr,
									custom-feed > hr,
									search-telemetry-tracker ~ hr,
									comment-body-header > hr {
										display: none;
										visibility: hidden;
									}
									/* Add margins between posts to compensate for removed dividers, Card and Compact view */
									article:has(> shreddit-post[view-type="cardView"]),
									faceplate-batch > article:has(> shreddit-post[view-type="cardView"]),
									/* Comment search results */
									reddit-feed > faceplate-tracker > div {
										margin-bottom: var(--re-post-separator-height, 10px) !important;
									}
									article:has(> shreddit-post[view-type="compactView"]) {
										margin-bottom: var(--re-post-separator-height, 0) !important;
									}
									main#main-content search-telemetry-tracker > div,
									main.main search-telemetry-tracker > div,
									main.main post-consume-tracker > div {
										margin: var(--re-post-separator-height, 0) 0;
									}
									shreddit-async-loader[bundlename="feed_announcement"] {
										margin: 0;
										margin-bottom: var(--re-post-separator-height, 10px);
									
										& > feed-announcement {
											margin: 0;
										}
									}
									/* Add padding to posts, Card and Compact view */
									article > shreddit-post[view-type="cardView"] {
										margin: 0 !important;
										padding: .7rem !important;
									}
									article > shreddit-post[view-type="compactView"] {
										padding: .25rem .5rem !important;
										margin: 0 !important;
									}
									/* Allow spaces for post selection checkboxes in mod queue */
									shreddit-app[routename="mod_queue"] article > shreddit-post,
									shreddit-app[routename="mod_queue_all"] article > shreddit-post {
										padding-left: 2rem !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable the feature
function disableHidePostDivider() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-divider"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Set custom height for post separators
export function postSeparatorHeight(value) {
	if (value && value >= 0) {
		document.documentElement.style.setProperty('--re-post-separator-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-separator-height');
	}
}
