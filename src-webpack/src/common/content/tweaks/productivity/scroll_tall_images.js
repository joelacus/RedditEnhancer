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
									--re-image-scroll-max-image-width: 100%;
								}
								[slot="post-media-container"] {
									background: none !important;
								}
								shreddit-media-lightbox-listener {
									display: block !important;
								}
								shreddit-aspect-ratio {
									padding: 0 !important;
									overflow-y: auto;
								}
								/*shreddit-aspect-ratio,
								shreddit-aspect-ratio div {
									height: 200px;
								}*/
								shreddit-aspect-ratio div {
									overflow-y: auto !important;
									background: none !important;
									width: var(--re-image-scroll-max-image-width) !important;
									margin: 0 auto;
								}
								shreddit-aspect-ratio div img {
									position: relative;
									margin: 0;
								}
								shreddit-aspect-ratio .media-lightbox-img :first-child {
									transform: scale(1) !important;
									filter: none !important;
									opacity: 1 !important;
									top: 0;
								}
								shreddit-aspect-ratio .media-lightbox-img :nth-child(2) {
									display: none;
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
