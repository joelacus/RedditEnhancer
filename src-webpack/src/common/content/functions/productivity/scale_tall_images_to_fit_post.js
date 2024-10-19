/* ===== Tweaks - Productivity - Scale Tall Images To Fit Post ===== */

import { disableImageScrollAll } from './scroll_tall_images';
//import { disableScalePostToFitImageAll } from './scale_post_to_fit_image';
//import { disableDragImageToResizeAll } from './scale_image_on_drag';

/* === Triggered On Page Load === */
export function loadFitImage() {
	BROWSER_API.storage.sync.get(['fitImage'], function (result) {
		if (result.fitImage) fitImage(true);
	});
}

/* === Main Function === */
export function fitImage(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			disableImageScrollAll();
			//disableScalePostToFitImageAll();
			//disableDragImageToResizeAll();
			enableFitImageNew();
		} else if (value === false) {
			disableFitImageNew();
		}
	}
}

// Function - Enable Fit Image - New
function enableFitImageNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-fit-image';
	styleElement.textContent = `.Post .ImageBox-image {
									height: 100%;
								}
								.Post figure > div {
									height:inherit;
								}
								.Post figure a > div {
									height:inherit;
								}
								.Post figure img {
									width: 100%;
									height: 100%;
									object-fit: contain;
									overflow: hidden;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Fit Image - New
export function disableFitImageNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-fit-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
