/**
 * Tweaks: Media - Add Scroll Bar To Tall Images
 *
 * @name imageScroll
 * @description Add a scroll bar to tall images so you can see the entire image if it gets cut off.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { disableScalePostToFitImageAll } from './scale_post_to_fit_image';
//import { disableDragImageToResizeAll } from './scale_image_on_drag';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadImageScroll() {
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		if (result.imageScroll === true) imageScroll(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function imageScroll(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			disableScalePostToFitImageAll();
			//disableDragImageToResizeAll();
			enableImageScrollRV3();
		} else {
			disableImageScrollAll();
		}
	}
}

// Enable Image Scroll - RV3
function enableImageScrollRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-image-scroll';
	styleElement.textContent = `:root {
									--re-limit-image-width: 100%;
									--re-max-image-post-height: unset;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) {
									max-height: var(--re-max-image-post-height) !important;
									overflow-y: auto;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener div {
									height: fit-content !important;
									max-width: var(--re-limit-image-width, fit-content);
									max-height: fit-content !important;
									margin: 0 auto;
									background-color: transparent !important;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener .post-background-image-filter {
									display: none;
								}
								div[id*="aspect-ratio"]:has(img.preview-img) shreddit-media-lightbox-listener .preview-img {
									top: 0;
									height: fit-content;
									max-height: fit-content;
									object-fit: cover !important;
									margin-bottom: 0 !important;
								}
								gallery-carousel figure {
									overflow-y: auto;
									align-items: unset !important;
								}
								gallery-carousel figure img {
									height: fit-content !important;
									max-height: fit-content !important;
									width: var(--re-limit-image-width) !important;
									margin: 0 auto;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
	// Replace all instances of <shreddit-aspect-ratio> with <div>
	document.querySelectorAll('shreddit-aspect-ratio:has(img.preview-img)').forEach(function (tag) {
		replaceTag(tag);
	});
	if (document.querySelector('shreddit-feed')) {
		// Clean up any existing observer first
		if (observerCleanup) {
			observerCleanup();
		}
		observerCleanup = registerMutationCallback(
			document.querySelector('shreddit-feed'),
			(mutations) => {
				mutations.forEach((mutation) => {
					mutation.addedNodes.forEach((addedNode) => {
						if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
							setTimeout(() => {
								const tag = addedNode.querySelector('shreddit-aspect-ratio:has(img.preview-img)');
								if (tag) {
									replaceTag(tag);
								}
							}, 1000);
						}
					});
				});
			},
			{ childList: true, subtree: true },
			'imageScroll',
		);
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

// Disable Image Scroll - All
export function disableImageScrollAll() {
	// Cleanup observer
	if (observerCleanup) {
		observerCleanup();
		observerCleanup = null;
	}
	const dynamicStyleElements = document.querySelectorAll('style[id="re-image-scroll"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
	document.querySelectorAll('div[id*="aspect-ratio"]:has(img.preview-img)').forEach(function (tag) {
		revertTag(tag);
	});
}
