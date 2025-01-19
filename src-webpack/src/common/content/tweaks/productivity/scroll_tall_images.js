/* ===== Tweaks - Productivity - Add Scroll Bar To Tall Images ===== */

import { disableFitImageNew } from './scale_tall_images_to_fit_post';
//import { disableScalePostToFitImageAll } from './scale_post_to_fit_image';
//import { disableDragImageToResizeAll } from './scale_image_on_drag';

/* === Triggered On Page Load === */
export function loadImageScroll() {
	BROWSER_API.storage.sync.get(['imageScroll', 'imageScrollMaxImageWidth'], function (result) {
		if (result.imageScroll) imageScroll(true);
		imageScrollMaxImageWidth(result.imageScrollMaxImageWidth);
	});
}

/* === Main Function === */
export function imageScroll(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			disableFitImageNew();
			//disableScalePostToFitImageAll();
			//disableDragImageToResizeAll();
			enableImageScrollNew();
		} else if (value === false) {
			disableImageScrollAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			//disableDragImageToResizeAll();
			enableImageScrollNewNew();
		} else if (value === false) {
			disableImageScrollAll();
		}
	}
}

// Function - Enable Image Scroll - New
function enableImageScrollNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-image-scroll';
	styleElement.textContent = `:root {
									--re-image-scroll-max-image-width: 100%;
								}
								.Post .media-element div:first-child > img,
								.Post figure > div > img {
									width: var(--re-image-scroll-max-image-width) !important;
  									object-fit: cover;
  									height: fit-content;
								}
								.Post div:has(> img) {
									overflow: auto;
								}
								.Post figure div:first-child {
									overflow-y: scroll;
									height: 100%;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Image Scroll - New New
function enableImageScrollNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-image-scroll';
	styleElement.textContent = `:root {
									--re-image-scroll-max-image-width: 100%
								}
								/*shreddit-media-lightbox-listener {
									display: block;
									height: fit-content;
								}
								media-lightbox-img {
									height: fit-content !important;
								}*/
								shreddit-media-lightbox-listener div {
									display: flex;
									justify-content: center;
									max-height: fit-content !important;
									overflow-y: auto !important;
									max-width: var(--re-image-scroll-max-image-width, fit-content);
									margin: 0 auto;
								}
								shreddit-media-lightbox-listener .post-background-image-filter {
									display: none;
								}
								shreddit-media-lightbox-listener .preview-img {
									top: 0;
									height: fit-content;
									max-height: fit-content;
									object-fit: cover !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Image Scroll - All
export function disableImageScrollAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-image-scroll"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Set Max Image Width
export function imageScrollMaxImageWidth(value) {
	if (value > 9 && value <= 100) {
		document.documentElement.style.setProperty('--re-image-scroll-max-image-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-image-scroll-max-image-width');
	}
}
