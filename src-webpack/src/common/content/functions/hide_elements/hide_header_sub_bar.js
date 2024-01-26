// Hide Header Sub Bar on old.reddit

export function hideHeaderSubBar(value) {
	if (value === true) {
		hideHeaderSubBarOld();
	} else if (value === false) {
		showHeaderSubBarOld();
	}
}

// Function - Hide Header Sub Bar - Old
function hideHeaderSubBarOld() {
	const style = document.createElement('style');
	style.id = 're-hide-header-sub-bar';
	style.textContent = `#sr-header-area {
							display: none !important;
						}`;
	document.head.insertBefore(style, document.head.firstChild);
}

// Function - Show Header Sub Bar - Old
function showHeaderSubBarOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-sub-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
