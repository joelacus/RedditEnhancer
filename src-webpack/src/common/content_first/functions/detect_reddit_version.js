/* ===== Detect Reddit Version ===== */

import { waitForAddedNode } from './tweak_loaders/main_observer';
import { tweakLoaderOld } from './tweak_loaders/tweak_loader_old';
import { tweakLoaderOldNew } from './tweak_loaders/tweak_loader_oldnew';
import { tweakLoaderNewNew } from './tweak_loaders/tweak_loader_newnew';

export function detectRedditVersion() {
	const link = window.location.href;
	if (link.indexOf('sh.reddit.com') >= 0) {
		window.redditVersion = 'newnew';
		tweakLoaderNewNew();
	} else if (link.indexOf('new.reddit.com') >= 0) {
		window.redditVersion = 'new';
		tweakLoaderOldNew();
	} else if (link.indexOf('old.reddit.com') >= 0) {
		window.redditVersion = 'old';
		tweakLoaderOld();
	} else if (link.indexOf('www.reddit.com') >= 0) {
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

		// Old New UI
		waitForAddedNode({
			id: true,
			query: '2x-container',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				window.redditVersion = 'new';
				tweakLoaderOldNew();
			},
		});

		// Old UI
		waitForAddedNode({
			id: true,
			query: 'siteTable',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				window.redditVersion = 'old';
				tweakLoaderOld();
			},
		});
	}
}

/*export function getRedditVersion() {
	const link = window.location.href;
	if (link.indexOf('sh.reddit.com') >= 0) {
		return 'newnew';
	} else if (link.indexOf('new.reddit.com') >= 0) {
		return 'new';
	} else if (link.indexOf('old.reddit.com') >= 0) {
		return 'old';
	} else if (link.indexOf('www.reddit.com') >= 0) {
		// New New UI (SH)
		waitForAddedNode({
			query: 'shreddit-app',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				return 'newnew';
			},
		});

		// Old New UI
		waitForAddedNode({
			id: true,
			query: '2x-container',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				return 'new';
			},
		});

		// Old UI
		waitForAddedNode({
			id: true,
			query: 'siteTable',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				return 'old';
			},
		});
	}
}*/