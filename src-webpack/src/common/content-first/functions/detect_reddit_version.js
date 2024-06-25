/* ===== Detect Reddit Version ===== */

import { waitForAddedNode } from './observers/main_observer';
import { observersOld } from './observers/observers_old';
import { observersNew } from './observers/observers_new';
import { observersNewNew } from './observers/observers_newnew';

export function detectRedditVersion() {
	const link = window.location.href;
	if (link.indexOf('sh.reddit.com') >= 0) {
		window.redditVersion = 'newnew';
		observersNewNew();
	} else if (link.indexOf('new.reddit.com') >= 0) {
		window.redditVersion = 'new';
		observersNew();
	} else if (link.indexOf('old.reddit.com') >= 0) {
		window.redditVersion = 'old';
		observersOld();
	} else if (link.indexOf('www.reddit.com') >= 0) {
		// New New UI (SH)
		waitForAddedNode({
			query: 'shreddit-app',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				window.redditVersion = 'newnew';
				observersNewNew();
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
				observersNew();
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
				observersOld();
			},
		});
	}
}
