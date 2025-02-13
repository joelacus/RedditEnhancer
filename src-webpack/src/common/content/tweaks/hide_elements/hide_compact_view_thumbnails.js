/* ===== Tweaks - Hide - Compact View Thumbnails ===== */

/* === Triggered On Page Load === */
export function loadHideCompactViewThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewThumbnails'], function (result) {
		if (result.hideCompactViewThumbnails) hideCompactViewThumbnails(true);
	});
}

/* === Main Function === */
export function hideCompactViewThumbnails(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHideCompactViewThumbnailsOld();
		} else if (value === false) {
			disableHideCompactViewThumbnailsAll();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			enableHideCompactViewThumbnailsNew();
		} else if (value === false) {
			disableHideCompactViewThumbnailsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideCompactViewThumbnailsNewNew();
		} else if (value === false) {
			disableHideCompactViewThumbnailsAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Compact View Thumbnails - Old
function enableHideCompactViewThumbnailsOld() {
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

// Function - Enable Hide Compact View Thumbnails - New
function enableHideCompactViewThumbnailsNew() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-thumbnail"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-thumbnails';
		styleElement.textContent = `.Post.scrollerItem div[data-click-id="background"] > div > div:first-child {
										display: none;
										visibility: hidden;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide Compact View Thumbnails - New New
function enableHideCompactViewThumbnailsNewNew() {
	if (!document.head.querySelector('style[id="re-hide-compact-view-thumbnail"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-compact-view-thumbnails';
		styleElement.textContent = `shreddit-post [slot="thumbnail"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Compact View Thumbnails - New New
function disableHideCompactViewThumbnailsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-compact-view-thumbnails"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
