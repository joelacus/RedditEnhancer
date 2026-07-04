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
		if (result.autoplayCommentGifs === true) autoplayCommentGifs(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function autoplayCommentGifs(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutes = ['post_page', 'comments_page'];
	if (redditVersion === 'newnew' && value && feedRoutes.includes(routeName)) {
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
	// MV3 isolated world - use scripting API to reach the main world
	BROWSER_API.runtime.sendMessage({ action: 'runAutoplayCommentGifs' }).catch((e) => {
		console.error('Autoplay Comment GIFs failed:', e);
	});
}
