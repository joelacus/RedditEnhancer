/**
 * Tweaks: Hide Elements - Autoplay CommentGIFs
 *
 * @name autoplayCommentGifs
 * @description Autoplay GIFs in comments on the post page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';

// Store cleanup functions for the scroll event
let scrollCleanup = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadAutoplayCommentGifs() {
	BROWSER_API.storage.sync.get(['autoplayCommentGifs']).then((result) => {
		if (result.autoplayCommentGifs) autoplayCommentGifs(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function autoplayCommentGifs(value) {
	if (scrollCleanup) return;
	if (redditVersion === 'newnew' && value) {
		enableAutoplayCommentGifs();

		// === Run again on page scroll ===
		// Add scroll event listener with debounce to make sure no posts have been missed
		if (document.querySelector('shreddit-comment-tree')) {
			const debouncedScrollHandler = debounce(() => {
				enableAutoplayCommentGifs();
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

// Enable Autoplay Comment GIFs - RV3
function enableAutoplayCommentGifs() {
	const script = document.createElement('script');
	script.textContent = `
	(function() {
		const gifs = document.querySelectorAll('shreddit-comment shreddit-player');
		gifs.forEach((gif) => {
			const rect = gif.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			if (rect.top < viewportHeight && rect.bottom > 0) {
				try {
					gif.play();
				} catch(e) {}
			}
		});
	})();`;
	document.documentElement.appendChild(script);
	script.remove();
}
