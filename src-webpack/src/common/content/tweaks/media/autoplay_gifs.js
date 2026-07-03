/**
 * Tweaks: Hide Elements - Autoplay GIFs
 *
 * @name autoplayGifs
 * @description Autoplay GIFs on a feed (not videos).
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';

// Store cleanup functions for the scroll event
let scrollCleanup = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadAutoplayGifs() {
	BROWSER_API.storage.sync.get(['autoplayGifs']).then((result) => {
		if (result.autoplayGifs) autoplayGifs(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function autoplayGifs(value) {
	if (redditVersion === 'newnew' && value) {
		enableAutoplayGifs();

		// === Run again on page scroll ===
		// Add scroll event listener with debounce to make sure no posts have been missed
		if (document.querySelector('shreddit-feed')) {
			const debouncedScrollHandler = debounce(() => {
				enableAutoplayGifs();
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

// Enable Autoplay GIFs - RV3
async function enableAutoplayGifs() {
	// MV3 isolated world - use scripting API to reach the main world
	BROWSER_API.runtime.sendMessage({ action: 'runAutoplayGifs' }).catch((e) => {
		console.error('Autoplay GIFs failed:', e);
	});
}
