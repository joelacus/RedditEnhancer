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
	if (scrollCleanup) return;
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
function enableAutoplayGifs() {
	const script = document.createElement('script');
	script.textContent = `
	(function() {
		const posts = document.querySelectorAll('shreddit-post[post-type="gif"]');
		posts.forEach((post) => {
			const player = post.querySelector('shreddit-player');
			if (!player) return;

			const rect = player.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			if (rect.top < viewportHeight && rect.bottom > 0) {
		  		try {
		   			player.play();
		  		} catch(e) {}
			}
	  	});
	})();`;
	document.documentElement.appendChild(script);
	script.remove();
}
