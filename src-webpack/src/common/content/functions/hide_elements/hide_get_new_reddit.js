/* ===== Tweaks - Hide - Get New Reddit ===== */

/* === Triggered On Page Load === */
export function loadHideGetNewReddit() {
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		if (result.hideGetNewReddit === true) {
			hideGetNewReddit(result.hideGetNewReddit);
		}
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
