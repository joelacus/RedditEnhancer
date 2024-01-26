// Hide Header Bar

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

// Function - Hide Header Bar - New
function hideHeaderBarNew() {
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

// Function - Hide Header Bar - New new
function hideHeaderBarNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-header-bar';
	styleElement.textContent = `shreddit-app reddit-header-large {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Show Header Bar
function showHeaderBar() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
