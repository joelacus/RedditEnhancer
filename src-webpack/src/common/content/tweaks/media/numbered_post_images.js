/**
 * Tweaks: Hide Elements - Numbered Post Images
 *
 * @name numberedPostImages
 * @description Append numbers to image posts with multiple images.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';

// Store cleanup functions for the observer and scroll event
let scrollCleanup = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadNumberedPostImages() {
	BROWSER_API.storage.sync.get(['numberedPostImages']).then((result) => {
		if (result.numberedPostImages) numberedPostImages(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function numberedPostImages(value) {
	if (redditVersion === 'newnew' && value) {
		enableNumberedPostImagesRV3();

		// === Run again on page scroll ===
		// Add scroll event listener with debounce to make sure no posts have been missed
		if (document.querySelector('shreddit-feed')) {
			const debouncedScrollHandler = debounce(() => {
				enableNumberedPostImagesRV3();
			}, 200);

			window.addEventListener('scroll', debouncedScrollHandler);
			scrollCleanup = () => {
				window.removeEventListener('scroll', debouncedScrollHandler);
			};
		}
	} else if (redditVersion === 'old' && value) {
		document.querySelectorAll('.expando-button').forEach((expando) => {
			expando.addEventListener('click', function () {
				if (this.classList.contains('collapsed')) {
					setTimeout(() => {
						enableNumberedPostImagesRV1();
					}, 10);
				}
			});
		});
		enableNumberedPostImagesRV1();
	} else {
		// Cleanup scroll event listener
		if (scrollCleanup) {
			scrollCleanup();
			scrollCleanup = null;
		}
		disableNumberedPostImages();
	}
}

// Enable Numbered Post Images - RV3
function enableNumberedPostImagesRV3() {
	const posts = document.querySelectorAll('shreddit-post:has(gallery-carousel)');
	posts.forEach((post) => {
		if (post.querySelector('.re-gallery-number')) return;
		const images = post.querySelectorAll('gallery-carousel ul >li');
		for (let i = 0; i < images.length; i++) {
			const span = document.createElement('span');
			span.className = 're-gallery-number';
			span.textContent = i + 1;
			const span2 = document.createElement('span');
			span2.textContent = '/' + images.length;
			span.appendChild(span2);
			images[i].insertBefore(span, images[i].firstElementChild);
		}
	});
}

// Enable Numbered Post Images - RV1
function enableNumberedPostImagesRV1() {
	const galleries = document.querySelectorAll('.entry .media-gallery');
	galleries.forEach((gallery) => {
		// remove any existing numbers
		const numberEl = document.querySelectorAll('.re-gallery-number');
		numberEl.forEach((el) => {
			el.remove();
		});

		// add numbers to tile previews
		const tiles = gallery.querySelectorAll('.gallery-tiles .gallery-tile');
		for (let i = 0; i < tiles.length; i++) {
			const span = document.createElement('span');
			span.className = 're-gallery-number';
			span.textContent = i + 1;
			const span2 = document.createElement('span');
			span2.textContent = '/' + tiles.length;
			span.appendChild(span2);
			const image = tiles[i].querySelector('.media-preview-content');
			image.insertBefore(span, image.firstElementChild);
		}

		// add numbers to images
		const images = gallery.querySelectorAll(':scope > .gallery-preview .media-preview-content');
		for (let i = 0; i < images.length; i++) {
			const span = document.createElement('span');
			span.className = 're-gallery-number';
			span.textContent = i + 1;
			const span2 = document.createElement('span');
			span2.textContent = '/' + images.length;
			span.appendChild(span2);
			images[i].insertBefore(span, images[i].firstElementChild);
		}
	});
}

// Disable Numbered Post Images - All
function disableNumberedPostImages() {
	const numberEl = document.querySelectorAll('.re-gallery-number');
	numberEl.forEach((el) => {
		el.remove();
	});
}
