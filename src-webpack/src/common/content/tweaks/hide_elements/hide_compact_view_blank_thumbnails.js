/**
 * Tweaks: Hide Elements - Hide Compact View Blank Thumbnails
 *
 * @name hideCompactViewBlankThumbnails
 * @description Hide the community status next to the r/ handle on posts, sidebar and subreddit pages.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideCompactViewBlankThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		if (result.hideCompactViewBlankThumbnails) hideCompactViewBlankThumbnails(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideCompactViewBlankThumbnails(value) {
	if (redditVersion === 'old') {
		if (value) {
			enableHideCompactViewBlankThumbnailsRV1();
		} else {
			disableHideCompactViewBlankThumbnailsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			enableHideCompactViewBlankThumbnailsRV3();
		} else {
			disableHideCompactViewBlankThumbnailsAll();
		}
	}
}

// Enable Hide Compact View Blank Thumbnails - RV1
function enableHideCompactViewBlankThumbnailsRV1() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-blank-thumbnails"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-blank-thumbnails';
		styleElement.textContent = `a.thumbnail.self,
									a.thumbnail.spoiler,
									a.thumbnail.nsfw,
									a.thumbnail.default {
									    display: none;
									    visibility: hidden;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Enable Hide Compact View Blank Thumbnails - RV3
function enableHideCompactViewBlankThumbnailsRV3() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-blank-thumbnail"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-blank-thumbnails';
		styleElement.textContent = `shreddit-post[post-type="text"] > div.contents[slot="thumbnail"],
		                            shreddit-post[post-type="text"]::part(thumbnail),
									shreddit-post[post-type="poll"] > div.contents[slot="thumbnail"],
									shreddit-post[post-type="poll"]::part(thumbnail),
									shreddit-post[post-type="link"] > div.contents[slot="thumbnail"]:has(svg[icon-name="link-outline"]),
		 							shreddit-post[view-type="compactView"] div:has([slot="thumbnail"] div.thumbnail-shadow) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Compact View Blank Thumbnails - All
function disableHideCompactViewBlankThumbnailsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-compact-view-blank-thumbnails"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
