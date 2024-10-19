/* ===== Tweaks - Hide - Post Hidden Message ===== */

/* === Triggered On Page Load === */
export function loadHidePostHiddenMessage() {
	BROWSER_API.storage.sync.get(['hidePostHiddenMessage'], function (result) {
		if (result.hidePostHiddenMessage) hidePostHiddenMessage(true);
	});
}

/* === Main Function === */
export function hidePostHiddenMessage(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHidePostHiddenMessageNew();
		} else if (value === false) {
			disableHidePostHiddenMessageAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHidePostHiddenMessageNewNew();
		} else if (value === false) {
			disableHidePostHiddenMessageAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Hide Post Hidden Message - New
function enableHidePostHiddenMessageNew() {
	if (!document.head.querySelector('style[id="re-hide-post-hidden-message"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-hidden-message';
		styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post) > div:has(div>div>h3) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Hide Post Hidden Message - New New
function enableHidePostHiddenMessageNewNew() {
	if (!document.head.querySelector('style[id="re-hide-post-hidden-message"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-hidden-message';
		styleElement.textContent = `article:has(shreddit-post[hidden]) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Hide Post Hidden Message - All
function disableHidePostHiddenMessageAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-hidden-message"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
