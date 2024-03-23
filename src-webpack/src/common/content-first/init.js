/* ===== Content First - Initialise ===== */

import { loadStyles } from './functions/load_styles';
import { detectEdgeVersion, detectFirefoxVersion } from './detect_browser_version';
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

	window.useLegacy = false;
	// Detect Browser For Legacy Support
	if (CHECK_LEGACY_FIREFOX) {
		useLegacy = detectFirefoxVersion();
		console.log('use legacy loaders: ' + useLegacy);
	}
	if (CHECK_LEGACY_EDGE) {
		useLegacy = detectEdgeVersion();
		if (useLegacy) console.log('detected Edge on Windows 10');
		console.log('use legacy loaders: ' + useLegacy);
	}

	// Detect Reddit version and continue loading tweaks
	detectRedditVersion();
}
