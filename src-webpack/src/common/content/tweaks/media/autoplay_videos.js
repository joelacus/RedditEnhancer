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
	if (scrollCleanup) return;
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
	const script = document.createElement('script');
	script.textContent = `
	(function() {
		const posts = document.querySelectorAll('shreddit-post[post-type="video"]');
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
