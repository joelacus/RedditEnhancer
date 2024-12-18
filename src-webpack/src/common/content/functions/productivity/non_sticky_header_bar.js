/* ===== Tweaks - Productivity - Non Sticky HeaderBar ===== */

/* === Triggered On Page Load === */
export function loadNonStickyHeaderBar() {
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		if (result.nonStickyHeaderBar) nonStickyHeaderBar(true);
	});
}

/* === Main Function === */
export function nonStickyHeaderBar(value) {
	if (redditVersion === 'new') {
		if (value == true) {
			enableNonStickyHeaderBarNew();
		} else if (value == false) {
			disableNonStickyHeaderBarNew();
		}
	} else if (redditVersion === 'newnew') {
		if (value == true) {
			enableNonStickyHeaderBarNewNew();
		} else if (value == false) {
			disableNonStickyHeaderBarNewNew();
		}
	}
}

// Function - Enable Non Sticky Header Bar - New
function enableNonStickyHeaderBarNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-non-sticky-header-bar';
	styleElement.textContent = `header[data-redditstyle="true"] {
									position: absolute !important;
								}
								#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
									top: 0;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Non Sticky Header Bar - New
function disableNonStickyHeaderBarNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-non-sticky-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Non Sticky Header Bar - NewNew
function enableNonStickyHeaderBarNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-non-sticky-header-bar';
	styleElement.textContent = `shreddit-app reddit-header-large {
									position: absolute !important;
								}
								shreddit-app reddit-sidebar-nav {
									position: sticky;
									height: 100vh;
									top: 0;
								}
								shreddit-app .right-sidebar-container {
									position: sticky;
									height: 100vh;
									top: 0;
									max-height: unset !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Non Sticky Header Bar - NewNew
function disableNonStickyHeaderBarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-non-sticky-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
