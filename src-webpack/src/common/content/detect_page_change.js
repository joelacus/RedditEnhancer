/* ===== Detect Page Title Change ===== */

// Detect page changes (search, user profile etc) and reapply tweaks.

import { init } from '../content-first/init';
import { load_saves } from './content_load_saves';
import { observerPostOverlay } from '../content-first/functions/observers/observer_post_overlay';
import { defaultSortOption } from '../content-first/functions/default_sort_option';

// Detect mutation in page url
let oldHref = document.location.href;
const body = document.querySelector('body');
const observer = new MutationObserver((mutations) => {
	mutations.forEach(() => {
		if (oldHref !== document.location.href) {
			oldHref = document.location.href;
			//console.log('detected page change');
			// if post overlay
			const overlay = document.querySelector('#overlayScrollContainer');
			if (overlay) {
				observerPostOverlay();
			} else {
				if (document.querySelector('.re-scroll-to-comment-container')) {
					document.querySelector('.re-scroll-to-comment-container').remove();
				}
				defaultSortOption();
				init();
				load_saves();
			}
		}
	});
});

// Start observer
observer.observe(body, { childList: true, subtree: true });
