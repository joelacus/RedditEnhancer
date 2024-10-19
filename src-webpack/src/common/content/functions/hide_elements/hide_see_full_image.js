/* ===== Tweaks - Hide - See Full Image ===== */

/* === Triggered On Page Load === */
export function loadHideSeeFullImage() {
	BROWSER_API.storage.sync.get(['hideSeeFullImage'], function (result) {
		if (result.hideSeeFullImage) hideSeeFullImage(true);
	});
}

/* === Main Function === */
export function hideSeeFullImage(value) {
	if (redditVersion === 'new') {
		if (useLegacy) {
			if (value === true) {
				enableHideSeeFullImageNewLegacy();
			} else if (value === false) {
				disableHideSeeFullImageAll();
			}
		} else {
			if (value === true) {
				enableHideSeeFullImageNew();
			} else if (value === false) {
				disableHideSeeFullImageAll();
			}
		}
	}
}

// Function - Enable Hide See Full Image - New - Legacy
function enableHideSeeFullImageNewLegacy() {
	if (!document.head.querySelector('style[id="re-hide-see-full-image"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-see-full-image';
		styleElement.textContent = `.media-element div:last-child, 
									figure > div > img + div {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide See Full Image - New
function enableHideSeeFullImageNew() {
	if (!document.head.querySelector('style[id="re-hide-see-full-image"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-see-full-image';
		styleElement.textContent = `.media-element > div:has(img) + div,
									figure > div > img + div {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide See Full Image - All
function disableHideSeeFullImageAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-see-full-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
