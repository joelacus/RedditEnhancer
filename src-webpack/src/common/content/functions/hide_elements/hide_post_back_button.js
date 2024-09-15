/* ===== Tweaks - Hide - Post Back Button ===== */

/* === Triggered On Page Load === */
export function loadHidePostBackButton() {
	BROWSER_API.storage.sync.get(['hidePostBackButton'], function (result) {
		hidePostBackButton(result.hidePostBackButton);
	});
}

/* === Main Function === */
export function hidePostBackButton(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideBackButton();
		} else if (value === false) {
			disbaleHideBackButton();
		}
	}
}

// Function - Enable Hide Post Back Button - New
function enableHideBackButton() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-post-back-button';
	styleElement.textContent = `pdp-back-button {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Post Back Button - New
function disbaleHideBackButton() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-back-button"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
