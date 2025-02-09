/* ===== Tweaks - Hide - Compact View Blank Thumbnails ===== */

/* === Triggered On Page Load === */
export function loadHideCompactViewBlankThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		if (result.hideCompactViewBlankThumbnails) hideCompactViewBlankThumbnails(true);
	});
}

/* === Main Function === */
export function hideCompactViewBlankThumbnails(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHideCompactViewBlankThumbnailsOld();
		} else if (value === false) {
			disableHideCompactViewBlankThumbnailsAll();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			enableHideCompactViewBlankThumbnailsNew();
		} else if (value === false) {
			disableHideCompactViewBlankThumbnailsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideCompactViewBlankThumbnailsNewNew();
		} else if (value === false) {
			disableHideCompactViewBlankThumbnailsAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Compact View Blank Thumbnails - Old
function enableHideCompactViewBlankThumbnailsOld() {
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

// Function - Enable Hide Compact View Blank Thumbnails - New
function enableHideCompactViewBlankThumbnailsNew() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-blank-thumbnails"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-blank-thumbnails';
		styleElement.textContent = `.Post.scrollerItem div[data-click-id="background"] > div > div:first-child:has(i.icon.icon-text_post),
		 							.Post.scrollerItem div[data-click-id="background"] > div > div:first-child:has(i.icon.icon-link_post),
		 							.Post.scrollerItem div[data-click-id="background"] > div > div:first-child:has(i.icon.icon-image_post),
		 							.Post.scrollerItem div[data-click-id="background"] > div > div:first-child:has(i.icon.icon-video_post),
		 							.Post.scrollerItem div[data-click-id="background"] > div > div:first-child:has(i.icon.icon-media_gallery) {
										display: none;
										visibility: hidden;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide Compact View Blank Thumbnails - New New
function enableHideCompactViewBlankThumbnailsNewNew() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-blank-thumbnail"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-blank-thumbnails';
		styleElement.textContent = `shreddit-post div:has([slot="thumbnail"] [icon-name="text-post-outline"]) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Compact View Blank Thumbnails - New New
function disableHideCompactViewBlankThumbnailsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-compact-view-blank-thumbnails"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
