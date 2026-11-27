/**
 * Tweaks: Media - Gallery Keyboard Navigation
 *
 * @name galleryKeyboardNavigation
 * @description Use the left and right arrow keys to navigation to the next/previous image in a post image gallery.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { isInputFocused } from '../../../utilities/isInputFocused';

// Store cleanup functions for the keyboard and scroll event
let scrollCleanup = null;
let keyboardCleanup = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadGalleryKeyboardNavigation() {
	BROWSER_API.storage.sync.get(['galleryKeyboardNavigation']).then((result) => {
		if (result.galleryKeyboardNavigation) galleryKeyboardNavigation(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function galleryKeyboardNavigation(value) {
	if (redditVersion === 'newnew' && value) {
		enableGalleryKeyboardNavigation();

		// === Run again on page scroll ===
		// Add scroll event listener with debounce to make sure no posts have been missed
		if (document.querySelector('shreddit-feed')) {
			const debouncedScrollHandler = debounce(() => {
				enableGalleryKeyboardNavigation();
			}, 200);

			window.addEventListener('scroll', debouncedScrollHandler);
			scrollCleanup = () => {
				window.removeEventListener('scroll', debouncedScrollHandler);
			};
		}
	} else {
		// Cleanup scroll event listener
		if (scrollCleanup) {
			scrollCleanup();
			scrollCleanup = null;
		}
		disableGalleryKeyboardNavigation();
	}
}

// Enable Gallery Keyboard Navigation - RV3
function enableGalleryKeyboardNavigation() {
	if (keyboardCleanup) return;

	function carouselButton(carousel, direction) {
		const shadow = carousel?.shadowRoot;
		if (!shadow) return null;
		return direction === 'right' ? shadow.querySelector('span[slot="nextButton"]') : shadow.querySelector('span[slot="prevButton"]');
	}

	function navigate(direction) {
		const posts = Array.from(document.querySelectorAll('shreddit-post:has(gallery-carousel)'));
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

		const visiblePosts = posts
			.map((post) => {
				const rect = post.getBoundingClientRect();
				const visibleTop = Math.max(rect.top, 0);
				const visibleBottom = Math.min(rect.bottom, viewportHeight);
				const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
				return { post, visibleHeight };
			})
			.filter(({ visibleHeight }) => visibleHeight > 0)
			.sort((a, b) => b.visibleHeight - a.visibleHeight);

		const bestPost = visiblePosts[0]?.post;
		if (!bestPost) return;

		carouselButton(bestPost.querySelector('gallery-carousel'), direction)?.click();
	}

	// A lightbox has its own gallery. Navigate that one, because clicking the post gallery underneath the lightbox closes it.
	function navigateLightbox(lightbox, direction) {
		if (lightbox.querySelector('video, shreddit-player-2, shreddit-player-iframe')) return false;
		const button = carouselButton(lightbox.querySelector('gallery-carousel'), direction);
		if (!button) return false;
		button.click();
		return true;
	}

	const handler = (event) => {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		// Reddit handles the arrow keys inside the lightbox itself; don't move twice.
		if (event.defaultPrevented) return;
		if (isInputFocused()) return;

		const direction = event.key === 'ArrowRight' ? 'right' : 'left';
		const lightbox = document.querySelector('#shreddit-media-lightbox');

		if (lightbox) {
			if (!navigateLightbox(lightbox, direction)) return;
		} else {
			navigate(direction);
		}

		event.preventDefault();
		// Capture phase: keep Reddit's own handler from moving the gallery a second time.
		event.stopPropagation();
	};

	document.addEventListener('keydown', handler, true);
	keyboardCleanup = () => {
		document.removeEventListener('keydown', handler, true);
		keyboardCleanup = null;
	};
}

// Disable Gallery Keyboard Navigation - RV3
function disableGalleryKeyboardNavigation() {
	if (keyboardCleanup) {
		keyboardCleanup();
		keyboardCleanup = null;
	}
}
