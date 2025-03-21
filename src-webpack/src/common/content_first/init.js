/* ===== Content First - Initialise ===== */

import { detectEdgeVersion, detectFirefoxVersion } from './functions/detect_browser_version';
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
	// Detect Browser For Legacy Support (avoids using :has() selector)
	window.useLegacy = false;
	if (CHECK_LEGACY_FIREFOX) {
		useLegacy = detectFirefoxVersion();
		console.log('use legacy loaders: ' + useLegacy);
	}
	if (CHECK_LEGACY_EDGE) {
		useLegacy = detectEdgeVersion();
		if (useLegacy) console.log('detected Edge on Windows 10');
		console.log('use legacy loaders: ' + useLegacy);
	}

	// Detect Reddit Version And Continue Loading Tweaks
	detectRedditVersion();
}
