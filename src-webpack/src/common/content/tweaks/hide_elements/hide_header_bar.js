/* ===== Tweaks - Hide - Header Bar ===== */

/* === Triggered On Page Load === */
export function loadHideHeaderBar() {
	BROWSER_API.storage.sync.get(['hideHeaderBar'], function (result) {
		if (result.hideHeaderBar) hideHeaderBar(true);
	});
}

/* === Main Function === */
export function hideHeaderBar(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			hideHeaderBarNew();
		} else if (value === false) {
			showHeaderBar();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			hideHeaderBarNewNew();
		} else if (value === false) {
			showHeaderBar();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Hide Header Bar - New
function hideHeaderBarNew() {
	if (!document.head.querySelector('style[id="re-hide-header-bar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-bar';
		styleElement.textContent = `header {
										display: none !important;
									}
									#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
										top: 0;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Hide Header Bar - New New
function hideHeaderBarNewNew() {
	if (!document.head.querySelector('style[id="re-hide-header-bar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-bar';
		styleElement.textContent = `shreddit-app reddit-header-large {
										display: none !important;
										visibility: hidden;
									}
									shreddit-app {
										--shreddit-header-height: 0 !important;
										--shreddit-header-large-height: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Show Header Bar
function showHeaderBar() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
