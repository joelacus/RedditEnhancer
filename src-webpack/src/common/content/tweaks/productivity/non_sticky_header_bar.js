/* ===== Tweaks - Productivity - Non Sticky Header Bar ===== */

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
								div:has(> div#overlayScrollContainer),
								#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
									top: 0;
								}
								#SHORTCUT_FOCUSABLE_DIV:has(div#overlayScrollContainer) header {
									display: none;
								}
								div[data-testid$="-sidebar"] > div:last-child > div {
									top: 1rem;
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

// Function - Enable Non Sticky Header Bar - New New
function enableNonStickyHeaderBarNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-non-sticky-header-bar';
	styleElement.textContent = `:root {
									--re-non-sticky-header-bar: 0;
								}
								shreddit-app reddit-header-large {
									position: absolute !important;
								}
								shreddit-app :not(.re-header-menu) > reddit-sidebar-nav,
								shreddit-app div#flex-left-nav-container {
									position: sticky;
									height: 100vh !important;
									top: 0 !important;
								}
								shreddit-app #right-sidebar-container {
									position: sticky;
									height: 100vh;
									top: 0;
									max-height: unset !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Non Sticky Header Bar - New New
function disableNonStickyHeaderBarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-non-sticky-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
