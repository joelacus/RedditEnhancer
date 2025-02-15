/* ===== Tweaks - Hide - Header Sub Bar on old.reddit ===== */

/* === Triggered On Page Load === */
export function loadHideHeaderSubBar() {
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		if (result.hideHeaderSubBar) hideHeaderSubBar(true);
	});
}

/* === Main Function === */
export function hideHeaderSubBar(value) {
	if (value === true) {
		hideHeaderSubBarOld();
	} else if (value === false) {
		showHeaderSubBarOld();
	}
}

/* === Enable/Disable Functions === */

// Function - Hide Header Sub Bar - Old
function hideHeaderSubBarOld() {
	if (!document.head.querySelector('style[id="re-hide-header-sub-bar"]')) {
		const style = document.createElement('style');
		style.id = 're-hide-header-sub-bar';
		style.textContent = `#sr-header-area {
								display: none !important;
							}
							body.with-listing-chooser div.listing-chooser {
								top: 45px;
							}`;
		document.head.insertBefore(style, document.head.firstChild);
	}
}

// Function - Show Header Sub Bar - Old
function showHeaderSubBarOld() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-sub-bar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
