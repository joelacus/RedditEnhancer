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

			// If sh.reddit.com, redirect these links about to www.reddit.com
			// Disabling as it might be causing random page refreshes. Will be irrelevent soon anyway.
			/*const excludedPaths = [
				'about/contributors',
				'about/moderators',
				'about/scheduledposts',
				'about/removal',
				'about/settings',
				'about/wiki/config/automoderator',
				'about/edit/?page=safety',
			];
			const currentUrl = window.location.href;
			if (currentUrl.startsWith('https://sh.reddit.com/r/')) {
				for (const path of excludedPaths) {
					if (currentUrl.includes(path)) {
						console.log(path + ' does not yet support New New UI, redirecting to www.reddit.com');
						const newUrl = currentUrl.replace('sh.reddit.com', 'www.reddit.com');
						window.location.replace(newUrl);
						return;
					}
				}
			} else {*/
			// If post overlay on old new ui
			const overlay = document.querySelector('#overlayScrollContainer');
			if (overlay) {
				observerPostOverlay();
			} else {
				if (document.querySelector('.re-scroll-to-comment-container')) {
					console.log('found scroll to root comment container');
					document.querySelector('.re-scroll-to-comment-container').remove();
				}
				defaultSortOption();
				init();
				load_saves();
			}
			//}
		}
	});
});

// Start observer
observer.observe(body, { childList: true, subtree: true });
