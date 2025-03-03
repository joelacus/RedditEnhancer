/**
 * Tweaks: Productivity - Show Post Numbers
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
 * Applies to: Old New UI (2018-2024), New New UI (2023-)
 *
 * @see ./show_post_flair.js
 */

import { fetchPostData } from "./show_post_flair";

// Get the feature state from browser sync storage
export function loadShowPostNumbers() {
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers) showPostNumbers(true);
	});
}

// Flag to prevent showPostNumbers from occasionally running when attachPostCount is still running => resetting counter
let isAttaching = false;
// Global variables to keep track of current view
let postNumber, view;

export function showPostNumbers(value) {
	// Do not run post numbers on post and settings pages
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const notFeedRoutesv2 = ['comments', 'settings', 'user'];
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed'];

	if (value) {
		if (redditVersion === 'new' && !window.location.pathname.includes(notFeedRoutesv2)) {
			postNumber = 1;
			getCurrentView();
			attachPostCountv2();
			observer.observe(document.querySelector('.ListingLayout-outerContainer'), {childList: true, subtree: true});
		} else if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName)) {
			// Prevent the counter from resetting when navigating between SPA pages
			if (!document.querySelector('.re-post-number')) postNumber = 1;
			getCurrentView();
			attachPostCountv3();
			observer.observe(document.querySelector('shreddit-feed'), {childList: true, subtree: true});
		}
	} else {
		// Disconnect the observer, reset the counter and remove all post numbers
		observer.disconnect();
		const numbers = document.querySelectorAll('.re-post-number');
		numbers.forEach((el) => {
			el.remove();
		});
		postNumber = 1;
	}
}

function getCurrentView() {
	switch (redditVersion) {
		case 'new':
			// Get the current post view. Reddit display the current post view with i.icon.icon-view_card
			const layoutSwitchIcon = document.querySelector('button#LayoutSwitch--picker > span > i');
			if (layoutSwitchIcon) {
				view = layoutSwitchIcon.className.split('_').pop();
			}
			break;
		case 'newnew':
			view = document.querySelector('shreddit-post')?.getAttribute('view-type');
			break;
	}
}

async function attachPostCountv2() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('.Post.scrollerItem:not(.promotedlink):not(.re-break-reminder)');
	let postArray = [...posts];

	// If data-scroller-first is blank, attempt to fetch post data of the first two posts to check if they are stickied
	if (!document.querySelector('div[data-scroller-first]')?.querySelector('.Post.scrollerItem')) {
		for (let i = 0; i < 2; i++) {
			if (posts[i]) {
				try {
					const postData = await fetchPostData(posts[i].getAttribute('id'));
					if (postData.children[0].data.stickied) {
						postArray.shift(); // if so, remove the post from the array
					}
				} catch (e) {
					console.info("Cannot retrieve subreddit announcement post information as something wrong " +
						"happened on Reddit's end. Pinned posts will still be numbered. Error: ", e);
				}
			}
		}
	}

	postArray.forEach((element) => {
		if (!element.querySelector('.re-post-number')) {
			let el, span;

			switch (view) {
				case 'card':
				case 'classic':
					// Attach the post number to the info bar in Card view and next to post titles in Classic view
					el = element.querySelector('div:has(> div > div[data-adclicklocation="top_bar"])');
					span = Object.assign(document.createElement('span'), {
						className: 're-post-number',
						innerHTML: `${postNumber++} &centerdot;`
					});
					el.insertBefore(span, el.firstChild);
					break;
				case 'compact':
					// Attach the post number between the vote buttons and post information in Compact view
					el = element.querySelector('div[data-click-id="background"] > div');
					span = Object.assign(document.createElement('span'), {
						className: 're-post-number compact',
						innerHTML: `${postNumber++}`
					});
					el.insertBefore(span, el.firstChild);
					break;
			}
		}
	});

	// Done attaching post numbers. Let's reset the flag
	isAttaching = false;
}

function attachPostCountv3() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('shreddit-post');
	let postArray = [...posts];

	postArray.forEach((element) => {
		if (!element.querySelector('.re-post-number')) {
			let el, span;

			switch (view) {
				case 'cardView':
					el = element.querySelector('span[id*="feed-post-credit-bar-t3_"]');
					break;
				case 'compactView':
					el = element.querySelector('div[id*="feed-post-credit-bar-t3_"]');
					break;
			}

			span = Object.assign(document.createElement('span'), {
				className: 're-post-number',
				innerHTML: `${postNumber++} &bull;`
			});
			el.insertBefore(span, el.firstChild);
		}
	});

	// Done attaching post numbers. Let's reset the flag
	isAttaching = false;
}

// Observer for watching new posts in feed
const observer = new MutationObserver(debounce(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV' && redditVersion === 'new') {
				// Did user or Reddit switch post view?
				let previousView = view;
				getCurrentView();
				if (view !== previousView) {
					postNumber = 1;
					attachPostCountv2();
				} else if (addedNode.querySelector('div[data-scroller-first]')) {
					// Reset post number count when navigating between pages for edge SPA cases,
					// usually showPostNumber will be triggered again instead
					postNumber = 1;
					attachPostCountv2();
				} else if (addedNode.querySelector('.Post.scrollerItem')) {
					attachPostCountv2(); // new posts added
				}
			}
			if (['TIME', 'ARTICLE', 'DIV'].includes(addedNode.nodeName) && redditVersion === 'newnew') {
				let previousView = view;
				getCurrentView();
				if (view !== previousView) {
					postNumber = 1;
				}
				attachPostCountv3();
			}
		});
	});
}, 100));

// Allowing some timeout between post number attachment to prevent performance issues
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
