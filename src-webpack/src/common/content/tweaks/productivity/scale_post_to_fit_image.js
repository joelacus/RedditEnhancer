/* ===== Tweaks - Productivity - Scale Post To Fit Image ===== */

import { disableImageScrollAll } from './scroll_images';
import { disableFitImageNew } from './scale_tall_images_to_fit_post';
//import { disableDragImageToResizeAll } from './scale_image_on_drag';

/* === Triggered On Page Load === */
export function loadScalePostToFitImage() {
	BROWSER_API.storage.sync.get(['scalePostToFitImage'], function (result) {
		if (result.scalePostToFitImage) {
			scalePostToFitImage(true);
		}
	});
}

/* === Main Function === */
export function scalePostToFitImage(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			disableImageScrollAll();
			disableFitImageNew();
			//disableDragImageToResizeAll();
			enableScalePostToFitImageNewNew();
		} else if (value === false) {
			disableScalePostToFitImageAll();
		}
	}
}

// Function - Enable Scale Post To Fit Image - New New
function enableScalePostToFitImageNewNew() {
	if (!document.head.querySelector('style[id="re-scale-post-to-fit-image"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-scale-post-to-fit-image';
		styleElement.textContent = `:root {
										--re-limit-image-width: 100%
									}
									div[id*="aspect-ratio"]:has(img.preview-img) {
										min-height: fit-content !important;
										padding: 0 !important;
									}
										div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener {
										display: block !important;
										height: fit-content !important;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener div {
										height: fit-content !important;
										max-width: var(--re-limit-image-width, fit-content);
										margin: 0 auto;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener .post-background-image-filter {
										display: none;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) div:has(>img.preview-img) {
										height: fit-content !important;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) img {
										margin-bottom: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
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

// Function - Disable Scale Post To Fit Image - All
export function disableScalePostToFitImageAll() {
	observer.disconnect();
	const dynamicStyleElements = document.querySelectorAll('style[id="re-scale-post-to-fit-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('div[id*="aspect-ratio"]:has(img.preview-img)').forEach(function (tag) {
		revertTag(tag);
	});
}
