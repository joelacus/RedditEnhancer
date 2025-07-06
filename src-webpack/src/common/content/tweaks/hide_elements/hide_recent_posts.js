/**
 * Tweaks: Hide Elements - Hide Recent Posts
 *
 * @name hideRecentPosts
 * @description Hide the recent posts in the sidebar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideRecentPosts() {
	BROWSER_API.storage.sync.get(['hideRecentPosts'], function (result) {
		if (result.hideRecentPosts) hideRecentPosts(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideRecentPosts(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideRecentPostsRV3();
	} else {
		disableHideRecentPostsAll();
	}
}

// Enable Hide Recent Posts - RV3
function enableHideRecentPostsRV3() {
	if (!document.head.querySelector('style[id="re-hide-recent-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-recent-posts';
		styleElement.textContent = `recent-posts {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Recent Posts - All
function disableHideRecentPostsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-recent-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
