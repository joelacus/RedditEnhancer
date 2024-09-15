/* ===== Tweaks - Hide - Compact View Blank Thumbnails ===== */

/* === Triggered On Page Load === */
export function loadHideCompactViewBlankThumbnails() {
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		hideCompactViewBlankThumbnails(result.hideCompactViewBlankThumbnails);
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

// Function - Enable Hide Compact View Blank Thumbnails - New
function enableHideCompactViewBlankThumbnails() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-compact-view-blank-thumbnail';
	styleElement.textContent = `shreddit-post div:has([slot="thumbnail"] [icon-name="text-post-outline"]) {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Compact View Blank Thumbnails - New
function DisableHideCompactViewBlankThumbnails() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-compact-view-blank-thumbnail"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
