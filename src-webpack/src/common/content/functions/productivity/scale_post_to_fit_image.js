// Scale Post To Fit Image

/*import { disableImageScrollAll } from './scroll_tall_images';
import { disableFitImageNew } from './scale_tall_images_to_fit_post';
import { disableDragImageToResizeAll } from './scale_image_on_drag';

export function scalePostToFitImage(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			disableImageScrollAll();
			disableFitImageNew();
			disableDragImageToResizeAll();
			enableScalePostToFitImageNew();
		} else if (value === false) {
			disableScalePostToFitImageAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			disableImageScrollAll();
			disableFitImageNew();
			disableDragImageToResizeAll();
			enableScalePostToFitImageNewNew();
		} else if (value === false) {
			disableScalePostToFitImageAll();
		}
	}
}

// Function - Enable Scale Post To Fit Image - New
function enableScalePostToFitImageNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-scale-post-to-fit-image';
	styleElement.textContent = `:root {
									--re-scale-post-to-fit-image-max-image-width: 40%
								}
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child {
									display: flex !important;
									justify-content: center !important;
									max-height: unset !important;
								}
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :first-child {
									display: none !important;
								}
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :last-child {
									position: relative;
									display: block;
									height: fit-content;
									width: 100%;
								}
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :last-child div,
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :last-child img {
									max-height: unset !important;
								}
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :last-child > :first-child,
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :last-child > :first-child div:has(> img) {
									width: 100% !important;
								}
								.Post:has(a > div > div > img) > :last-child > div:has(.media-element) > :first-child > :last-child > :first-child img {
									width: var(--re-scale-post-to-fit-image-max-image-width) !important;
								}`;
								
Image carousel support, needs finishing

.Post:has(figure) > :last-child > div:has(figure) div {
	max-height: unset !important;
	height: fit-content !important;
	position: relative;
}
.Post:has(figure) > :last-child > div:has(figure) ul,
.Post:has(figure) > :last-child > div:has(figure) li,
.Post:has(figure) > :last-child > div:has(figure) figure {
	height: fit-content !important;
}
.Post:has(figure) > :last-child > div:has(figure) ul {
	position: relative;
}
.Post:has(figure) > :last-child > div:has(figure) li {
	position: absolute;
}
.Post:has(figure) > :last-child > div:has(figure) > :first-child > :first-child{
	display: none !important;
}
.Post:has(figure) > :last-child > div:has(figure) div:has(img) {
	width: 100% !important;
}
.Post:has(figure) > :last-child > div:has(figure) > :first-child > :last-child > :first-child img {
	width: var(--re-scale-post-to-fit-image-max-image-width) !important;
}
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Scale Post To Fit Image - New New
function enableScalePostToFitImageNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-scale-post-to-fit-image';
	styleElement.textContent = `:root {
									--re-scale-post-to-fit-image-max-image-width: 100%
								}
								shreddit-post shreddit-aspect-ratio {
									--max-height: 100% !important;
									position: relative;
									display: block;
									padding: 0;
									min-height: fit-content;
								}
								shreddit-post .media-lightbox-img {
									display: flex;
									max-height: unset !important;
									justify-content: center;
								}
								shreddit-post .media-lightbox-img > :first-child {
									position: relative;
									top: 0;
									margin: 0;
									filter: none !important;
									opacity: 1 !important;
									transform: none !important;
									width: var(--re-scale-post-to-fit-image-max-image-width) !important;
								}
								shreddit-post .media-lightbox-img > :last-child {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Scale Post To Fit Image - All
export function disableScalePostToFitImageAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-scale-post-to-fit-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Set Max Image Width
export function scalePostToFitImageMaxImageWidth(value) {
	if (value > 9 && value <= 100) {
		document.documentElement.style.setProperty('--re-scale-post-to-fit-image-max-image-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-scale-post-to-fit-image-max-image-width');
	}
}*/
