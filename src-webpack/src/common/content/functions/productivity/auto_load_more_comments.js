/* ===== Tweaks - Productivity - Auto Load More Comments ===== */

import { waitForAddedNode } from '../../../content-first/functions/observers/main_observer';

/* === Triggered On Page Load === */
export function loadAutoLoadMoreComments() {
	BROWSER_API.storage.sync.get(['autoLoadMoreComments'], function (result) {
		autoLoadMoreComments(result.autoLoadMoreComments);
	});
}

/* === Main Function === */
export function autoLoadMoreComments(value) {
	if (redditVersion === 'newnew' && value === true) {
		setTimeout(() => {
			window.scrollTo(0, document.body.scrollHeight);
		}, 2000);
		setTimeout(() => {
			document.documentElement.scrollTop = 0;
		}, 3000);
		function findLoadMoreButtonAndClick() {
			const btn = document.querySelector('#comment-tree > :last-child:has(button) button');
			if (btn) {
				btn.click();
				setTimeout(findLoadMoreButtonAndClick, 5000);
			}
		}
		waitForAddedNode(
			{
				query: '#comment-tree > :last-child:has(button) button',
				parent: document.querySelector('body'),
				recursive: true,
				done: function (el) {
					findLoadMoreButtonAndClick();
				},
			},
			false
		);
	}
}
