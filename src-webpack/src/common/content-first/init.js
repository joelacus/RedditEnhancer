/* ===== Content First - Initialise ===== */

import { loadStyles } from './functions/load_styles';
import { detectFirefoxVersion } from './detect_firefox_version';
import { detectRedditVersion } from './detect_reddit_version';

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
observer.observe(document.documentElement, { childList: true });

// Init Tweaks
export function init() {
	// Add-on Style Prerequisite
	loadStyles();

	// Detect Firefox version for legacy support
	if (CHECK_LEGACY) {
		detectFirefoxVersion();
	}

	// Detect Reddit version and continue loading tweaks
	detectRedditVersion();
}
