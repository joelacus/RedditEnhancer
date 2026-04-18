/**
 * Tweaks: Productivity - Show Post Numbers
 *
 * @name showPostNumbers
 * @description Display the number count of posts in feeds.
 *
 * RE will actively scan and count posts in feeds, then display the post numbers in the info bar (Card view), next to
 * post titles (Classic view), or between the vote buttons and post information (Compact view). Post count resets when
 * navigating between pages or switching between views.
 *
 * To mimic the Old UI style of post numbers where stickied posts are not counted, RE attempts to fetch the post data
 * of the first two posts if data-scroller-first is blank, which almost exclusively happens on subreddit pages.
 *
 * NOTE: on v3 UI, posts are dynamically loaded and replaced with a placeholder (i.e. not shreddit-post). Post number
 * track therefore may be lost if something wrong happens while user scrolls mid-page.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadShowPostNumbers() {
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers) showPostNumbers(true);
	});
}

// Flag to prevent showPostNumbers from occasionally running when attachPostCount is still running => resetting counter
let isAttaching = false;

// Global variables to keep track of current view
let postNumber, view;

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function showPostNumbers(value) {
	// Do not run post numbers on post and settings pages
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed'];

	if (value) {
		// Prevent the counter from resetting when navigating between SPA pages
		if (!document.querySelector('.re-post-number')) postNumber = 1;
		getCurrentView();
		if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName)) {
			// Initial pass
			attachPostCountRV3();
			// Register with centralised observer manager
			// Clean up any existing observer first
			if (observerCleanup) {
				observerCleanup();
			}
			const feed = document.querySelector('shreddit-feed');
			if (feed) {
				observerCleanup = registerMutationCallback(
					feed,
					(mutations) => {
						mutations.forEach((mutation) => {
							mutation.addedNodes.forEach((addedNode) => {
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										let previousView = view;
										getCurrentView();
										if (view !== previousView) {
											postNumber = 1;
										}
										attachPostCountRV3();
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'showPostNumbers',
				);
			}
		}
	} else {
		// Cleanup observer
		if (observerCleanup) {
			observerCleanup();
			observerCleanup = null;
		}
		const numbers = document.querySelectorAll('.re-post-number');
		numbers.forEach((el) => {
			el.remove();
		});
		postNumber = 1;
	}
}

function getCurrentView() {
	if (redditVersion === 'newnew') {
		view = document.querySelector('shreddit-post')?.getAttribute('view-type');
	}
}

function attachPostCountRV3() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('shreddit-post');
	let postArray = [...posts];

	postArray.forEach((post) => {
		if (!post.querySelector('.re-post-number')) {
			let el, span;

			switch (view) {
				case 'cardView':
					el = post.querySelector('span[id*="feed-post-credit-bar-t3_"]');
					break;
				case 'compactView':
					el = post.querySelector('div[id*="feed-post-credit-bar-t3_"]');
					break;
			}

			span = document.createElement('span');
			span.className = 're-post-number';
			span.textContent = `${postNumber++} •`;

			el.insertBefore(span, el.firstChild);
		}
	});

	// Done attaching post numbers. Let's reset the flag
	isAttaching = false;
}
