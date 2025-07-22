/**
 * Tweaks: Media - Scale Post To Fit Image
 *
 * @name scalePostToFitImage
 * @description Scale the post vertically to fit the full height of the image.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { disableImageScrollAll } from './scroll_images';
//import { disableDragImageToResizeAll } from './scale_image_on_drag';

/* === Run by Tweak Loader when the Page Loads === */
export function loadScalePostToFitImage() {
	BROWSER_API.storage.sync.get(['scalePostToFitImage'], function (result) {
		if (result.scalePostToFitImage) {
			scalePostToFitImage(true);
		}
	});
}

/* === Enable/Disable The Feature === */
export function scalePostToFitImage(value) {
	if (redditVersion === 'newnew' && value) {
		disableImageScrollAll();
		//disableDragImageToResizeAll();
		enableScalePostToFitImageRV3();
	} else {
		disableScalePostToFitImageAll();
	}
}

// Enable Scale Post To Fit Image - RV3
function enableScalePostToFitImageRV3() {
	if (!document.head.querySelector('style[id="re-scale-post-to-fit-image"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-scale-post-to-fit-image';
		styleElement.textContent = `:root {
										--re-limit-image-width: 100%;
										--re-max-image-post-height: unset;
									}
									/* single image */
									div[id*="aspect-ratio"]:has(img.preview-img) {
										min-height: fit-content !important;
										max-height: var(--re-max-image-post-height) !important;
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
										background-color: transparent !important;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener .post-background-image-filter {
										display: none;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) div:has(>img.preview-img) {
										height: fit-content !important;
									}
									div[id*="aspect-ratio"]:has(img.preview-img) img {
										margin-bottom: 0 !important;
										max-height: var(--re-max-image-post-height) !important;
									}
									shreddit-aspect-ratio:has(#post-image) {
										--max-height: var(--re-max-image-post-height) !important;
									}
									/* gallery */
									shreddit-post gallery-carousel ul,
									shreddit-post gallery-carousel ul li,
									shreddit-post gallery-carousel ul figure {
										height: fit-content !important;
									}
									shreddit-post gallery-carousel ul {
										max-height: var(--re-max-image-post-height) !important;
										align-items: center;
									}
									shreddit-post gallery-carousel .post-background-image-filter {
										display: none;
									}
									shreddit-post gallery-carousel ul figure {
										height: 100% !important;
									}
									shreddit-post gallery-carousel ul figure img {
										max-width: var(--re-limit-image-width, fit-content) !important;
										max-height: var(--re-max-image-post-height) !important;
										margin: 0 auto !important;
									}
									shreddit-post gallery-carousel::part(gallery) {
										max-height: fit-content !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// Replace all instances of <shreddit-aspect-ratio> with <div>
	let counter = 0;
	const maxAttempts = 10;
	const intervalId = setInterval(function () {
		const images = document.querySelectorAll('shreddit-post shreddit-aspect-ratio:has(img.preview-img)');
		if (images.length > 0) {
			images.forEach((image) => {
				replaceTag(image);
			});
			clearInterval(intervalId);
		} else {
			counter++;
			if (counter >= maxAttempts) {
				clearInterval(intervalId);
			}
		}
	}, 50);
	// Append shadow part ID
	let g_counter = 0;
	const g_maxAttempts = 10;
	const g_intervalId = setInterval(function () {
		const galleries = document.querySelectorAll('shreddit-post gallery-carousel');
		if (galleries.length > 0) {
			galleries.forEach((gallery) => {
				appendPart(gallery);
			});
			clearInterval(g_intervalId);
		} else {
			g_counter++;
			if (g_counter >= g_maxAttempts) {
				clearInterval(g_intervalId);
			}
		}
	}, 50);
	// Start observer
	if (document.querySelector('shreddit-feed')) {
		observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
	}
}

// Replace <shreddit-aspect-ratio> with <div>
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

// Revert <div> to <shreddit-aspect-ratio>
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

// Append Part Attribute
function appendPart(gallery) {
	gallery.shadowRoot?.querySelector('faceplate-carousel')?.setAttribute('part', 'gallery');
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (addedNode.nodeName === 'ARTICLE') {
				setTimeout(() => {
					document.querySelectorAll('shreddit-post shreddit-aspect-ratio:has(img.preview-img)').forEach((image) => {
						replaceTag(image);
					});
					document.querySelectorAll('shreddit-post gallery-carousel').forEach((gallery) => {
						appendPart(gallery);
					});
				}, 1000);
			}
		});
	});
});

// Disable Scale Post To Fit Image - All
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
