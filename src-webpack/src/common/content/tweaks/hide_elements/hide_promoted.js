/**
 * Tweaks: Hide Elements - Hide Promoted Posts
 *
 * @name hidePromoted
 * @description Hide all the promoted posts and ads.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHidePromotedPosts() {
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		if (result.hidePromoted) hidePromoted(true);
	});
}

/* === Enable/Disable The Feature === */
export function hidePromoted(value) {
	if (redditVersion === 'old' && value) {
		enableHidePromotedPostsRV1();
	} else if (redditVersion === 'newnew' && value) {
		enableHidePromotedPostsRV3();
	} else {
		disableHidePromotedPostsAll();
	}
}

// Enable Hide Promoted Posts - RV1
function enableHidePromotedPostsRV1() {
	if (!document.head.querySelector('style[id="re-hide-promoted-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-promoted-posts';
		styleElement.textContent = `#siteTable > .thing.promoted {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Enable Hide Promoted Posts - RV3
function enableHidePromotedPostsRV3() {
	if (!document.head.querySelector('style[id="re-hide-promoted-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-promoted-posts';
		styleElement.textContent = `shreddit-ad-post,
									shreddit-comments-page-ad,
									shreddit-sidebar-ad,
									shreddit-comment-tree-ad,
									shreddit-async-loader[bundlename="feed_announcement"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Promoted Posts - All
function disableHidePromotedPostsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-promoted-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
