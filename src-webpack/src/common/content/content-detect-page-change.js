/* ===== Detect Page Title Change ===== */

// Detect page changes (search, user profile etc) and reapply tweaks.

import { loadStart } from '../content-first/content-first-load-start'
import { load_saves } from './content-load-saves'


// Detect mutation in page title
const observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList' && mutation.target === document.querySelector('title')) {
			setTimeout(function () {
				loadStart();
				load_saves();
			}, 100);
		}
	});
});

// Start observer
observer.observe(document.querySelector('head'), { childList: true, subtree: true });
