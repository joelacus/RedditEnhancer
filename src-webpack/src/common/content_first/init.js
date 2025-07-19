/* ===== Content First - Initialise ===== */

import { detectFirefoxVersion } from './functions/detect_browser_version';
import { detectRedditVersion } from './functions/detect_reddit_version';

// Waits for page to load the <head> element before starting to load tweaks.
const observer = new MutationObserver((mutationsList) => {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			for (let node of mutation.addedNodes) {
				if (node.nodeName === 'HEAD') {
					// Stop observer
					observer.disconnect();
					// Start loading tweaks after head is found
					init();
				}
			}
		}
	}
});

if (!document.querySelector('head')) {
	observer.observe(document.documentElement, { childList: true });
} else {
	init();
}

// Init Tweaks
export function init() {
	// Detect outdated web browser versions. Some features require the :has() selector and may not work correctly.
	if (CHECK_LEGACY_FIREFOX) {
		if (detectFirefoxVersion()) {
			console.log('[Reddit Enhancer] Firefox is outdated. Please update to version 121 or newer.');
		}
	}

	// Detect Reddit Version And Continue Loading Tweaks
	detectRedditVersion();
}
