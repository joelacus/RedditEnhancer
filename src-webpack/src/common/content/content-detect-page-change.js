/* ===== Detect Page Title Change ===== */

// Detect page changes (search, user profile etc) and reapply tweaks.

import { loadStart } from '../content-first/content-first-load-start';
import { load_saves } from './content-load-saves';
import { observerPostOverlay } from '../content-first/functions/init_class_names';

// Detect mutation in page url
let oldHref = document.location.href;
const body = document.querySelector('body');
const observer = new MutationObserver((mutations) => {
	mutations.forEach(() => {
		if (oldHref !== document.location.href) {
			oldHref = document.location.href;
			// if post overlay
			var overlay = document.querySelector('#overlayScrollContainer');
			if (overlay) {
				observerPostOverlay();
			} else {
				setTimeout(() => {
					// reload saves
					loadStart();
					setTimeout(() => {
						load_saves();
						// remove duplicate style elements
						const head = document.head;
						const styleElements = head.querySelectorAll('style');
						const uniqueStyles = {};
						styleElements.forEach((styleElement) => {
							const id = styleElement.id;
							const styleContent = styleElement.textContent;
							if (id && id.startsWith('re-')) {
								if (!uniqueStyles[styleContent]) {
									uniqueStyles[styleContent] = true;
								} else {
									head.removeChild(styleElement);
								}
							}
						});
					}, 100);
				}, 10);
			}
		}
	});
});

// Start observer
observer.observe(body, { childList: true, subtree: true });
