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

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowPostNumbers() {
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers) showPostNumbers(true);
	});
}

// Flag to prevent showPostNumbers from occasionally running when attachPostCount is still running => resetting counter
let isAttaching = false;
// Global variables to keep track of current view
let postNumber, view;

/* === Enable/Disable The Feature === */
export function showPostNumbers(value) {
	// Do not run post numbers on post and settings pages
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed'];

	if (value) {
		// Prevent the counter from resetting when navigating between SPA pages
		if (!document.querySelector('.re-post-number')) postNumber = 1;
		getCurrentView();
		if (redditVersion === 'newnew' && feedRoutesv3.includes(routeName)) {
			attachPostCountRV3();
			observer.observe(document.querySelector('shreddit-feed'), { childList: true });
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
				innerHTML: `${postNumber++} &bull;`,
			});
			el.insertBefore(span, el.firstChild);
		}
	});

	// Done attaching post numbers. Let's reset the flag
	isAttaching = false;
}

// Observer for watching new posts in feed
const observer = new MutationObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (addedNode) {
				if (['TIME', 'ARTICLE', 'DIV'].includes(addedNode.nodeName) && redditVersion === 'newnew') {
					let previousView = view;
					getCurrentView();
					if (view !== previousView) {
						postNumber = 1;
					}
					attachPostCountRV3();
				}
			});
		});
	}, 100)
);

// Allowing some timeout between post number attachment to prevent performance issues
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
