/* ===== Tweaks - Productivity - Drag To Resize Image ===== */

/*import { disableFitImageNew } from './scale_tall_images_to_fit_post';
import { disableImageScrollAll } from './scroll_tall_images';
import { disableScalePostToFitImageAll } from './scale_post_to_fit_image';
*/
/* === Triggered On Page Load === */
/*export function loadDragImageToResize() {
	BROWSER_API.storage.sync.get(['dragImageToResize', 'dragImageToResizeInitialSize'], function (result) {
		dragImageToResize(result.dragImageToResize);
		dragImageToResizeInitialSize(result.dragImageToResizeInitialSize);
	});
}*/

/* === Main Function === */
/*export function dragImageToResize(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			disableFitImageNew();
			disableImageScrollAll();
			disableScalePostToFitImageAll();
			enableDragImageToResizeNew();
		} else if (value === false) {
			disableDragImageToResizeAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			disableFitImageNew();
			disableImageScrollAll();
			disableScalePostToFitImageAll();
			enableDragImageToResizeNewNew();
		} else if (value === false) {
			disableDragImageToResizeAll();
		}
	}
}

// Function - Enable Drag To Resize Image - New
function enableDragImageToResizeNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-drag-to-resize-image';
	styleElement.textContent = `:root {
									--re-drag-image-to-resize-initial-size: 350px;
								}
								.Post:has(a > div > div > img) div[style^="max-height"],
								.Post:has(a > div > div > img) div[style^="height"],
								.Post:has(a > div > div > img) [data-click-id="media"] {
									height: var(--re-drag-image-to-resize-initial-size) !important;
									max-height: var(--re-drag-image-to-resize-initial-size) !important;
								}
								.Post:has(a > div > div > img) [data-click-id="media"] > div,
								.Post [data-adclicklocation="media"]:has(figure) > div[style^=padding-bottom] {
									padding-bottom: var(--re-drag-image-to-resize-initial-size) !important;
								}
								.Post a > img.ImageBox-image,
								.Post a > div > div > img.ImageBox-image,
								.Post figure a > div > img,
								.Post figure > div > img {
									height: max( 50px, var(--re-drag-image-to-resize-initial-size) ) !important;
									max-height: 100% !important;
									object-fit: contain !important;
								}
								.Post:has(a > div > div > img) a > div.media-element {
									max-height: unset !important;
								}
								.Comment div > img {
									height: 100%;
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
		if ('buttons' in e) {
			if (e.buttons == 1) {
				e.preventDefault();
				if (e.target.classList.contains('ImageBox-image')) {
					target = e.target.closest('.Post');
				} else if (e.target.closest('figure > a > div > img') || (e.target.closest('figure > div > img') && e.target.nodeName === 'IMG')) {
					target = e.target.closest('.Post');
				}
				if (target) {
					if (target.style.getPropertyValue('--re-drag-image-to-resize-initial-size')) {
						initial = target.style.getPropertyValue('--re-drag-image-to-resize-initial-size');
					}
					isMouseDown = true;
					startX = e.clientX;
				}
			}
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
		if (isMouseDown) {
			e.preventDefault();
			e.stopPropagation();
		}
		console.log(isMouseDown, isMouseMove);
		setTimeout(() => {
			if (isMouseDown) {
				isMouseDown = false;
				isMouseMove = false;
				target = null;
			}
		}, 10);
	});

	document.addEventListener('click', function (e) {
		console.log(isMouseDown, isMouseMove);
		//console.log(e.target);
		//if (e.target.classList.contains('ImageBox-image')) {
		//	target = e.target.closest('.Post');
		//} else if (e.target.closest('figure > a > div > img') || e.target.closest('figure > div > img') && e.target.nodeName === 'IMG') {
		//	target = e.target.closest('.Post');
		//}
		if (isMouseMove) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
}

// Function - Enable Drag To Resize Image - New New
function enableDragImageToResizeNewNew() {
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

// Function - Disable Drag To Resize Image - All
export function disableDragImageToResizeAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-drag-to-resize-image"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Initial Size
export function dragImageToResizeInitialSize(value) {
	if (value > 99 && value <= 1000) {
		document.documentElement.style.setProperty('--re-drag-image-to-resize-initial-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-drag-image-to-resize-initial-size');
	}
}*/
