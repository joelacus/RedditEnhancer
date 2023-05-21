/* ===== Detect Page Title Change ===== */

// Detect page changes (search, user profile etc) and reapply tweaks.

import { loadStart } from '../content-first/content-first-load-start'
import { load_saves } from './content-load-saves'
import { loadHidePostSidebar } from '../content-first/functions/load_hide_sidebar'
import { observerPostOverlay } from '../content-first/functions/init_class_names'


// Detect mutation in page url
let oldHref = document.location.href;
const body = document.querySelector("body");
const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
		if (oldHref !== document.location.href) {
			oldHref = document.location.href;
			// if post overlay
			var overlay = document.querySelector('#overlayScrollContainer');
			if (overlay) {
				observerPostOverlay();
			} else {
				setTimeout(function () {
					loadStart();
					setTimeout(function () {
						load_saves();
					},1000);
				}, 100);
			}
		}
	});
});

// Start observer
observer.observe(body, { childList: true, subtree: true });
