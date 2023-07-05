/* ===== Content First - HEAD Observer ===== */

import { loadStart } from './content-first-load-start';

// Waits for page to load the <head> element before starting to load tweaks.

// Create observer
const observer = new MutationObserver((mutationsList) => {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			for (let node of mutation.addedNodes) {
				if (node.nodeName === 'HEAD') {
					// Stop observer
					observer.disconnect();
					// Start loading changes after head is found
					loadStart();
				}
			}
		}
	}
});

// Start observer
observer.observe(document.documentElement, { childList: true });
