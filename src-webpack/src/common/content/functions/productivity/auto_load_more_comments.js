/* ===== Tweaks - Productivity - Auto Load More Comments ===== */

import { waitForAddedNode } from '../../../content-first/functions/observers/main_observer';

/* === Triggered On Page Load === */
export function loadAutoLoadMoreComments() {
	BROWSER_API.storage.sync.get(['autoLoadMoreComments'], function (result) {
		if (result.autoLoadMoreComments) autoLoadMoreComments(true);
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
		/*function findLoadMoreButtonAndClick() {
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
		);*/
		enableAutoLoadMoreCommentsNewNew();
	} else if (redditVersion === 'new' && value === true) {
		enableAutoLoadMoreCommentsNew();
	} else if (redditVersion === 'old' && value === true) {
		enableAutoLoadMoreCommentsOld();
	} else if (value === false) {
		disableAutoLoadMoreCommentsAll();
	}
}

let load_more_comments_button;

// Function - Enable Auto Load More Comments - Old
function enableAutoLoadMoreCommentsOld() {
	load_more_comments_button = '.morecomments a';
	window.addEventListener('scroll', loadMoreComments);
}

// Function - Enable Auto Load More Comments - New
function enableAutoLoadMoreCommentsNew() {
	load_more_comments_button = '[id^="moreComments"] p';
	window.addEventListener('scroll', loadMoreComments);
}

// Function - Enable Auto Load More Comments - New New
function enableAutoLoadMoreCommentsNewNew() {
	load_more_comments_button = 'faceplate-partial[src*="/more-comments/"]';
	window.addEventListener('scroll', loadMoreComments);
}

// Function - Disable Auto Load More Comments - All
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
