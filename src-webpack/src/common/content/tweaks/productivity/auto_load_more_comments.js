/**
 * Tweaks: Productivity - Auto Load More Comment
 *
 * @name autoLoadMoreComments
 * @description Automatically load more comments as the user scrolls down the post comments page.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadAutoLoadMoreComments() {
	BROWSER_API.storage.sync.get(['autoLoadMoreComments'], function (result) {
		if (result.autoLoadMoreComments) autoLoadMoreComments(true);
	});
}

/* === Enable/Disable The Feature === */
export function autoLoadMoreComments(value) {
	if (redditVersion === 'newnew' && value) {
		setTimeout(() => {
			window.scrollTo(0, document.body.scrollHeight);
		}, 2000);
		setTimeout(() => {
			document.documentElement.scrollTop = 0;
		}, 3000);
		enableAutoLoadMoreCommentsRV3();
	} else if (redditVersion === 'old' && value) {
		enableAutoLoadMoreCommentsRV1();
	} else {
		disableAutoLoadMoreCommentsAll();
	}
}

let load_more_comments_button;

// Enable Auto Load More Comments - RV3
function enableAutoLoadMoreCommentsRV3() {
	load_more_comments_button = 'faceplate-partial[src*="/more-comments/"]';
	window.addEventListener('scroll', loadMoreComments);
}

// Enable Auto Load More Comments - RV1
function enableAutoLoadMoreCommentsRV1() {
	load_more_comments_button = '.morecomments a';
	window.addEventListener('scroll', loadMoreComments);
}

// Disable Auto Load More Comments - All
function disableAutoLoadMoreCommentsAll() {
	window.removeEventListener('scroll', loadMoreComments);
}

// Function to check for "load more comments" buttons on scroll
function loadMoreComments() {
	// Get the current scroll position
	var scrollX = window.scrollX || window.pageXOffset;
	var scrollY = window.scrollY || window.pageYOffset;

	// Get the elements within the current scroll view
	var elementsInViewport = document.querySelectorAll(load_more_comments_button);

	var visibleElements = [];

	elementsInViewport.forEach(function (element) {
		var rect = element.getBoundingClientRect();
		var elementX = rect.left + scrollX;
		var elementY = rect.top + scrollY;

		if (elementX >= scrollX && elementX <= scrollX + window.innerWidth && elementY >= scrollY && elementY <= scrollY + window.innerHeight) {
			visibleElements.push(element);
		}
	});

	// Load Comments
	for (let i = 0; i < visibleElements.length; i++) {
		setTimeout(() => {
			visibleElements[i].focus({
				preventScroll: true,
			});
			visibleElements[i].click();
		}, i * 750);
	}
}
