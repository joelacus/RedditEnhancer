/**
 * Tweaks: Hide Elements - Hide Compact View Thumbnails
 *
 * @name hideCompactViewThumbnails
 * @description Hide the community status next to the r/ handle on posts, sidebar and subreddit pages.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideCompactViewThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewThumbnails'], function (result) {
		if (result.hideCompactViewThumbnails) hideCompactViewThumbnails(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideCompactViewThumbnails(value) {
	if (redditVersion === 'old' && value) {
		enableHideCompactViewThumbnailsRV1();
	} else if (redditVersion === 'newnew' && value) {
		enableHideCompactViewThumbnailsRV3();
	} else {
		disableHideCompactViewThumbnailsAll();
	}
}

// Enable Hide Compact View Thumbnails - RV1
function enableHideCompactViewThumbnailsRV1() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-thumbnail"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-thumbnails';
		styleElement.textContent = `a.thumbnail {
										display: none !important;
										visibility: hidden;
									}
									.thing .top-matter {
										margin-left: 4px !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Enable Hide Compact View Thumbnails - RV3
function enableHideCompactViewThumbnailsRV3() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-thumbnail"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-thumbnails';
		styleElement.textContent = `shreddit-post [slot="thumbnail"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Compact View Thumbnails - All
function disableHideCompactViewThumbnailsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-compact-view-thumbnails"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
