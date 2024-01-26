// Detect Reddit Version

import { waitForAddedNode } from './functions/observers/main_observer';
import { observersOld } from './functions/observers/observers_old';
import { observersNew } from './functions/observers/observers_new';
import { observersNewNew } from './functions/observers/observers_newnew';

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
		// new new
		waitForAddedNode({
			query: 'shreddit-app',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				window.redditVersion = 'newnew';
				observersNewNew();
			},
		});

		// new
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

		// old
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
