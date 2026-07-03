/**
 * Tweaks: Hide Elements - Autoplay Videos
 *
 * @name autoplayVideos
 * @description Autoplay videos on a feed (not GIFs).
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';

// Store cleanup functions for the scroll event
let scrollCleanup = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadAutoplayVideos() {
	BROWSER_API.storage.sync.get(['autoplayVideos']).then((result) => {
		if (result.autoplayVideos) autoplayVideos(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function autoplayVideos(value) {
	if (redditVersion === 'newnew' && value) {
		enableAutoplayVideos();

		// === Run again on page scroll ===
		// Add scroll event listener with debounce to make sure no posts have been missed
		if (document.querySelector('shreddit-feed')) {
			const debouncedScrollHandler = debounce(() => {
				enableAutoplayVideos();
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
	}
}

// Enable Autoplay Videos - RV3
function enableAutoplayVideos() {
	// MV3 isolated world - use scripting API to reach the main world
	BROWSER_API.runtime.sendMessage({ action: 'runAutoplayVideos' }).catch((e) => {
		console.error('Autoplay Videos failed:', e);
	});
}
