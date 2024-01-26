// Hide Get New Reddit

export function hideGetNewReddit(value) {
	if (value === true) {
		hideGetNewRedditOld();
	} else if (value === false) {
		showGetNewRedditOld();
	}
}

// Function - Hide Get New Reddit - Old
function hideGetNewRedditOld() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-get-new-reddit';
	styleElement.textContent = `#redesign-beta-optin-btn {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Show Get New Reddit - Old
function showGetNewRedditOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-get-new-reddit"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
