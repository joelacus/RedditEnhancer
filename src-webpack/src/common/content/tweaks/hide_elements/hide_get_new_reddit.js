/**
 * Tweaks - Hide - Get New Reddit
 * Hide the Get New Reddit button at the top left of the page when you're browsing Old UI.
 * 
 * Applies to: Old UI (2005-)
 */

/* === Triggered On Page Load === */
export function loadHideGetNewReddit() {
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		if (result.hideGetNewReddit) hideGetNewReddit(true);
	});
}

/* === Main Function === */
export function hideGetNewReddit(value) {
	if (value === true) {
		hideGetNewRedditOld();
	} else if (value === false) {
		showGetNewRedditOld();
	}
}

/* === Enable/Disable Functions === */

// Function - Hide Get New Reddit - Old
function hideGetNewRedditOld() {
	if (!document.head.querySelector('style[id="re-hide-get-new-reddit"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-get-new-reddit';
		styleElement.textContent = `#redesign-beta-optin-btn {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Show Get New Reddit - Old
function showGetNewRedditOld() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-get-new-reddit"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
