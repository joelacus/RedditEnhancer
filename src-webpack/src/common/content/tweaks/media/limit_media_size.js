/* ===== Tweaks - Media - Limit Media Size ===== */

// "Add Scrollbar To Tall Images" or "Scale Post To Fit Image" must be enabled.

/* === Triggered On Page Load === */
export function limitImageSize() {
	BROWSER_API.storage.sync.get(['maxImageWidth', 'maxImagePostHeight', 'maxVideoWidth', 'maxVideoPostHeight'], function (result) {
		setMaxImageWidth(result.maxImageWidth);
		setMaxImagePostHeight(result.maxImagePostHeight);
		setMaxVideoWidth(result.maxVideoWidth);
		setMaxVideoPostHeight(result.maxVideoPostHeight);
	});
}

/* === Main Functions === */

// Function - Set Limit Image Width
export function setMaxImageWidth(value) {
	if (value > 9 && value <= 100) {
		document.documentElement.style.setProperty('--re-limit-image-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-limit-image-width');
	}
}

// Function - Set Max Image Post Height
export function setMaxImagePostHeight(value) {
	if (value > 99 && value <= 1000) {
		document.documentElement.style.setProperty('--re-max-image-post-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-max-image-post-height');
	}
}

// Function - Set Limit Video Width
export function setMaxVideoWidth(value) {
	if (value > 9 && value <= 100) {
		document.documentElement.style.setProperty('--re-limit-video-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-limit-video-width');
	}
}

// Function - Set Max Video Post Height
export function setMaxVideoPostHeight(value) {
	if (value > 99 && value <= 1000) {
		document.documentElement.style.setProperty('--re-max-video-post-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-max-video-post-height');
	}
}
