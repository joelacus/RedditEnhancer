/**
 * Tweaks: Media - Click Lightbox Background To Close
 *
 * @name clickLightboxBackgroundToClose
 * @description Close the image lightbox by clicking the background outside the image.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// Store cleanup function for the click listener
let lightboxClickHandler = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadClickLightboxBackgroundToClose() {
	BROWSER_API.storage.sync.get(['clickLightboxBackgroundToClose']).then((result) => {
		if (result.clickLightboxBackgroundToClose === true) clickLightboxBackgroundToClose(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function clickLightboxBackgroundToClose(value) {
	if (redditVersion === 'newnew' && value) {
		enableClickLightboxBackgroundToClose();
	} else {
		disableClickLightboxBackgroundToClose();
	}
}

// Enable "Click Lightbox Background To Close"
function enableClickLightboxBackgroundToClose() {
	if (lightboxClickHandler) return;
	lightboxClickHandler = (event) => {
		const lightbox = document.querySelector('#shreddit-media-lightbox');
		if (!lightbox) return;
		// Leave video lightboxes alone.
		if (lightbox.querySelector('video, shreddit-player-2, shreddit-player-iframe')) return;
		// Only a real click on the background closes the lightbox. Clicks dispatched by
		// scripts (other tweaks, Reddit itself) must not close it, e.g. the gallery arrow
		// clicked by "Gallery Keyboard Navigation".
		if (!event.isTrusted) return;

		const path = event.composedPath();
		if (!path.includes(lightbox)) return;

		// Leave controls, links and players alone.
		const isControl = path.some(
			(node) =>
				node.nodeType === 1 &&
				node.matches('button, a, [role="button"], [slot="nextButton"], [slot="prevButton"], input, select, textarea, video, audio, iframe, shreddit-player-2, shreddit-player-iframe, faceplate-pagination-indicator'),
		);
		if (isControl) return;

		// Clicking the visible image should zoom, not close the lightbox.
		const isVisibleImage = path.some((node) => node.nodeType === 1 && node.tagName === 'IMG' && node.closest('zoomable-img'));
		if (isVisibleImage) return;

		// Stop the click reaching the gallery underneath, otherwise it reopens the lightbox.
		event.preventDefault();
		event.stopImmediatePropagation();
		lightbox.querySelector('[data-testid="close-button"]')?.click();
	};
	document.addEventListener('click', lightboxClickHandler, true);
}

// Disable "Click Lightbox Background To Close"
function disableClickLightboxBackgroundToClose() {
	if (lightboxClickHandler) {
		document.removeEventListener('click', lightboxClickHandler, true);
		lightboxClickHandler = null;
	}
}
