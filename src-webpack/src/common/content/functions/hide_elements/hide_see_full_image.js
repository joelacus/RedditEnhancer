/* ===== Tweaks - Hide - See Full Image ===== */

/* === Triggered On Page Load === */
export function loadHideSeeFullImage() {
	BROWSER_API.storage.sync.get(['hideSeeFullImage'], function (result) {
		hideSeeFullImage(result.hideSeeFullImage);
	});
}

/* === Main Function === */
export function hideSeeFullImage(value) {
	if (redditVersion === 'new') {
		if (useLegacy) {
			if (value === true) {
				enableHideSeeFullImageNewLegacy();
			} else if (value === false) {
				disableHideSeeFullImageNewLegacy();
			}
		} else {
			if (value === true) {
				enableHideSeeFullImageNew();
			} else if (value === false) {
				disableHideSeeFullImageNew();
			}
		}
	}
}

// Function - Enable Hide See Full Image - New - Legacy
function enableHideSeeFullImageNewLegacy() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-see-full-image';
	styleElement.textContent = `.media-element div:last-child, 
								figure > div > img + div {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide See Full Image - New - Legacy
function disableHideSeeFullImageNewLegacy() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-see-full-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide See Full Image - New
function enableHideSeeFullImageNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-see-full-image';
	styleElement.textContent = `.media-element > div:has(img) + div,
								figure > div > img + div {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide See Full Image - New
function disableHideSeeFullImageNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-see-full-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
