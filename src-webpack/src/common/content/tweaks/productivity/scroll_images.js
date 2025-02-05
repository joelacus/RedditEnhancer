/* ===== Tweaks - Productivity - Add Scroll Bar To Tall Images ===== */

import { disableFitImageNew } from './scale_tall_images_to_fit_post';
import { disableScalePostToFitImageAll } from './scale_post_to_fit_image';
//import { disableDragImageToResizeAll } from './scale_image_on_drag';

/* === Triggered On Page Load === */
export function loadImageScroll() {
	BROWSER_API.storage.sync.get(['imageScroll', 'limitImageWidth'], function (result) {
		if (result.imageScroll) imageScroll(true);
		setLimitImageWidth(result.limitImageWidth);
	});
}

/* === Main Function === */
export function imageScroll(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			disableFitImageNew();
			disableScalePostToFitImageAll();
			//disableDragImageToResizeAll();
			enableImageScrollNew();
		} else if (value === false) {
			disableImageScrollAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			disableScalePostToFitImageAll();
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
									--re-limit-image-width: 100%;
								}
								.Post .media-element div:first-child > img,
								.Post figure > div > img {
									width: var(--re-limit-image-width) !important;
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
									--re-limit-image-width: 100%
								}
								div[id*="aspect-ratio"]:has(img.preview-img) {
									max-height: 540px !important;
									overflow-y: auto;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener div {
									height: fit-content !important;
									overflow-y: auto !important;
									max-width: var(--re-limit-image-width, fit-content);
									margin: 0 auto;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener .post-background-image-filter {
									display: none;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener .preview-img {
									top: 0;
									height: fit-content;
									max-height: fit-content;
									object-fit: cover !important;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) img {
									margin-bottom: 0 !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
	// Replace all instances of <shreddit-aspect-ratio> with <div>
	document.querySelectorAll('shreddit-aspect-ratio:has(img.preview-img)').forEach(function (tag) {
		replaceTag(tag);
	});
	if (document.querySelector('shreddit-feed')) {
		observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
	}
}

// Function - Replace <shreddit-aspect-ratio> with <div>
function replaceTag(tag) {
	const newDiv = document.createElement('div');
	Array.from(tag.attributes).forEach((attr) => {
		newDiv.setAttribute(attr.name, attr.value);
	});
	while (tag.firstChild) {
		newDiv.appendChild(tag.firstChild);
	}
	tag.parentNode.replaceChild(newDiv, tag);
}

// Function - Revert <div> to <shreddit-aspect-ratio>
function revertTag(tag) {
	const newSar = document.createElement('shreddit-aspect-ratio');
	Array.from(tag.attributes).forEach((attr) => {
		newSar.setAttribute(attr.name, attr.value);
	});
	while (tag.firstChild) {
		newSar.appendChild(tag.firstChild);
	}
	tag.parentNode.replaceChild(newSar, tag);
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (addedNode.nodeName === 'ARTICLE') {
				setTimeout(() => {
					const tag = addedNode.querySelector('shreddit-aspect-ratio:has(img.preview-img)');
					if (tag) {
						replaceTag(tag);
					}
				}, 1000);
			}
		});
	});
});

// Function - Disable Image Scroll - All
export function disableImageScrollAll() {
	if (redditVersion === 'newnew') {
		observer.disconnect();
	}
	const dynamicStyleElements = document.querySelectorAll('style[id="re-image-scroll"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('div[id*="aspect-ratio"]:has(img.preview-img)').forEach(function (tag) {
		revertTag(tag);
	});
}

// Function - Set Limit Image Width
export function setLimitImageWidth(value) {
	if (value > 9 && value <= 100) {
		document.documentElement.style.setProperty('--re-limit-image-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-limit-image-width');
	}
}
