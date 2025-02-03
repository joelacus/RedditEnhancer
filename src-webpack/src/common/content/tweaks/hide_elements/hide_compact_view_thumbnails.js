/* ===== Tweaks - Hide - Compact View Thumbnails ===== */

/* === Triggered On Page Load === */
export function loadHideCompactViewThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewThumbnails'], function (result) {
		if (result.hideCompactViewThumbnails) hideCompactViewThumbnails(true);
	});
}

/* === Main Function === */
export function hideCompactViewThumbnails(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideCompactViewThumbnails();
		} else if (value === false) {
			DisableHideCompactViewThumbnails();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Compact View Thumbnails - New New
function enableHideCompactViewThumbnails() {
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
function DisableHideCompactViewThumbnails() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-compact-view-thumbnails"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
