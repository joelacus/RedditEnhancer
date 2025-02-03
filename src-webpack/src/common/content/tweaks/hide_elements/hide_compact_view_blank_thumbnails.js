/* ===== Tweaks - Hide - Compact View Blank Thumbnails ===== */

/* === Triggered On Page Load === */
export function loadHideCompactViewBlankThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		if (result.hideCompactViewBlankThumbnails) hideCompactViewBlankThumbnails(true);
	});
}

/* === Main Function === */
export function hideCompactViewBlankThumbnails(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideCompactViewBlankThumbnails();
		} else if (value === false) {
			DisableHideCompactViewBlankThumbnails();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Compact View Blank Thumbnails - New New
function enableHideCompactViewBlankThumbnails() {
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
function DisableHideCompactViewBlankThumbnails() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-compact-view-blank-thumbnails"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
