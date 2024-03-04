// Hide Post Hidden Message

export function hidePostHiddenMessage(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHidePostHiddenMessageNew();
		} else if (value === false) {
			disbleHidePostHiddenMessageAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHidePostHiddenMessageNewNew();
		} else if (value === false) {
			disbleHidePostHiddenMessageAll();
		}
	}
}

// Function - Hide Post Hidden Message - New
function enableHidePostHiddenMessageNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-post-hidden-message';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post) > div:has(div>div>h3) {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Hide Post Hidden Message - New New
function enableHidePostHiddenMessageNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-post-hidden-message';
	styleElement.textContent = `article:has(shreddit-post[hidden]) {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Hide Post Hidden Message - All
function disbleHidePostHiddenMessageAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-hidden-message"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
