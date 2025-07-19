/* ===== Detect Reddit Version ===== */

import { waitForAddedNode } from './tweak_loaders/main_observer';
import { tweakLoaderOld } from './tweak_loaders/tweak_loader_old';
import { tweakLoaderNewNew } from './tweak_loaders/tweak_loader_newnew';

// Detect the Reddit version and load the tweaks accordingly
export function detectRedditVersion() {
	// Do not reload tweaks if already loaded. Most of these are CSS injection tweaks and should only be loaded once.
	// If it is very necessary to reload the tweak, consider putting it in tweak_loader.js.
	if (window.tweaksLoaded) return;
	window.tweaksLoaded = true;

	const hostname = window.location.hostname;
	if (hostname === 'old.reddit.com') {
		window.redditVersion = 'old';
		tweakLoaderOld();
	} else if (hostname === 'sh.reddit.com') {
		window.redditVersion = 'newnew';
		tweakLoaderNewNew();
	} else {
		// Old UI
		waitForAddedNode({
			query: 'div.footer-parent',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				window.redditVersion = 'old';
				tweakLoaderOld();
			},
		});

		// New New UI (SH)
		waitForAddedNode({
			query: 'shreddit-app',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				window.redditVersion = 'newnew';
				tweakLoaderNewNew();
			},
		});
	}
}

// Return the Reddit version
export function getRedditVersion() {
	const hostname = window.location.href;
	if (hostname === 'old.reddit.com') {
		return 1;
	} else if (hostname === 'sh.reddit.com') {
		return 3;
	} else {
		// New New UI (SH)
		waitForAddedNode({
			query: 'shreddit-app',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				return 3;
			},
		});

		// Old UI
		waitForAddedNode({
			id: true,
			query: 'siteTable',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				return 1;
			},
		});
	}
}
