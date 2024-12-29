/* ===== Detect Page Title Change ===== */

// Detect page changes (search, user profile etc) and reapply tweaks.

import { init } from '../content_first/init';
import { loadTweaks } from './tweak_loader';
import { observerPostOverlay } from '../content_first/functions/tweak_loaders/observer_post_overlay';
import { defaultSortOption } from '../content_first/functions/default_sort_option';

// Detect mutation in page url
let oldHref = document.location.href;
const body = document.querySelector('body');
const observer = new MutationObserver((mutations) => {
	mutations.forEach(() => {
		if (oldHref !== document.location.href) {
			oldHref = document.location.href;

			// If post overlay on old new ui
			const overlay = document.querySelector('#overlayScrollContainer');
			if (overlay) {
				observerPostOverlay();
			} else {
				if (document.querySelector('.re-scroll-to-comment-container')) {
					document.querySelector('.re-scroll-to-comment-container').remove();
				}
				defaultSortOption();
				init();
				loadTweaks();
			}
		}
	});
});

// Start observer
observer.observe(body, { childList: true, subtree: true });
