/**
 * Tweaks: Media - Drag To Resize Image
 *
 * @name dragImageToResize
 * @description Click and drag on an image to resize it.
 *
 * Notes: Works, but activates reddit full screen image preview, or opens posts.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/*import { disableImageScrollAll } from './scroll_images';
import { disableScalePostToFitImageAll } from './scale_post_to_fit_image';*/

/* === Run by Tweak Loader when the Page Loads === 
export function loadDragImageToResize() {
	BROWSER_API.storage.sync.get(['dragImageToResize', 'dragImageToResizeInitialSize'], function (result) {
		if (result.dragImageToResize) {
			dragImageToResize(true);
			dragImageToResizeInitialSize(result.dragImageToResizeInitialSize);
		}
	});
}*/

/* === Enable/Disable The Feature === 
export function dragImageToResize(value) {
	if (redditVersion === 'newnew' && value) {
		disableImageScrollAll();
		disableScalePostToFitImageAll();
		enableDragImageToResizeRV3();
	} else {
		disableDragImageToResizeAll();
	}
}*/

/*
// Enable Drag To Resize Image - RV3
function enableDragImageToResizeRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-drag-to-resize-image';
	styleElement.textContent = `:root {
									--re-drag-image-to-resize-initial-size: 350px;
								}
								shreddit-post shreddit-aspect-ratio,
								shreddit-post gallery-carousel > ul {
									--max-height: max( 50px, var(--re-drag-image-to-resize-initial-size) ) !important;
								}
								shreddit-post .media-lightbox-img {
									min-width: 100% !important;
									margin: 0 !important;
									object-fit: contain !important;
									min-height: 50px;
									height: var(--re-drag-image-to-resize-initial-size) !important;
									min-block-size: 50px !important;
									max-height: 1224px !important;
								}
								shreddit-post shreddit-aspect-ratio a:has(.opacity-30) {
									display: none
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);

	let target;
	let isMouseDown = false;
	let isMouseMove = false;
	let startX, endX;
	let initial = 350;
	BROWSER_API.storage.sync.get(['dragImageToResizeInitialSize'], function (result) {
		initial = result.dragImageToResizeInitialSize;
		if (initial === '49') {
			initial = 350;
		}
		document.documentElement.style.setProperty('--re-drag-image-to-resize-initial-size', initial + 'px');
	});

	// Function to calculate the lateral distance
	function calculateLateralDistance(startX, endX) {
		return Math.abs(endX - startX);
	}

	// Event listener for mouse down
	document.addEventListener('mousedown', function (e) {
		e.preventDefault();
		target = e.target.closest('shreddit-aspect-ratio');
		if (!target) {
			target = e.target.closest('gallery-carousel');
		}
		if (target) {
			if (target.style.getPropertyValue('--re-drag-image-to-resize-initial-size')) {
				initial = target.style.getPropertyValue('--re-drag-image-to-resize-initial-size');
			}
			isMouseDown = true;
			startX = e.clientX;
		}
	});

	// Event listener for mouse move
	document.addEventListener('mousemove', function (e) {
		if (isMouseDown) {
			isMouseMove = true;
			endX = e.clientX;
			const deltaX = endX - startX;
			const lateralDistance = calculateLateralDistance(startX, endX);
			const size = lateralDistance.toFixed(2) * 3;
			if (size < 1224) {
				if (deltaX > 0) {
					if (parseInt(initial) + size >= 50) {
						target.style.setProperty('--re-drag-image-to-resize-initial-size', parseInt(initial) + size + 'px');
					}
				} else if (deltaX < 0) {
					if (parseInt(initial) - size >= 50) {
						target.style.setProperty('--re-drag-image-to-resize-initial-size', parseInt(initial) - size + 'px');
					}
				}
			}
		}
	});

	// Event listener for mouse up
	document.addEventListener('mouseup', function (e) {
		e.preventDefault();
		setTimeout(() => {
			if (isMouseDown) {
				isMouseDown = false;
				isMouseMove = false;
			}
		}, 5);
	});

	document.addEventListener('click', function (e) {
		let target = e.target.closest('shreddit-aspect-ratio');
		if (!target) {
			target = e.target.closest('gallery-carousel');
		}
		if (target && isMouseMove) {
			e.preventDefault();
			e.stopPropagation();
			console.log('stop');
			setTimeout(() => {
				document.querySelector('#shreddit-media-lightbox > div > button').click();
			}, 400);
		}
	});
}

// Disable Drag To Resize Image - All
export function disableDragImageToResizeAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-drag-to-resize-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Initial Size
export function dragImageToResizeInitialSize(value) {
	if (value > 99 && value <= 1000) {
		document.documentElement.style.setProperty('--re-drag-image-to-resize-initial-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-drag-image-to-resize-initial-size');
	}
}*/
