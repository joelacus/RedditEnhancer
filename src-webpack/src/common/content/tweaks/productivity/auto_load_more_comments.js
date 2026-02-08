/**
 * Tweaks: Productivity - Auto Load More Comment
 *
 * @name autoLoadMoreComments
 * @description Automatically load more comments as the user scrolls down the post comments page.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
let downvoteOnly;
export function loadAutoLoadMoreComments() {
	BROWSER_API.storage.sync.get(['autoLoadMoreComments', 'autoLoadMoreCommentsDownvotedOnly'], function (result) {
		if (result.autoLoadMoreComments) autoLoadMoreComments(true);
		downvoteOnly = result.autoLoadMoreCommentsDownvotedOnly === true;
	});
}

/* === Enable/Disable The Feature === */
export function autoLoadMoreComments(value) {
	if (value) {
		if (redditVersion === 'newnew') {
			const viewMoreCommentBtn = document.querySelector('#top-level-more-comments-partial');
			if (viewMoreCommentBtn) viewMoreCommentBtn.dispatchEvent(new Event('faceplate-enter', { bubbles: true }));
			window.addEventListener('scroll', v3);

			const comments = document.querySelector('shreddit-comment-tree');
			if (comments) {
				comments.querySelectorAll('shreddit-comment').forEach(expandComments);
				observer.observe(comments);
			}
		} else if (redditVersion === 'old') {
			window.addEventListener('scroll', v1);
			const comments = document.querySelector('.commentarea');
			if (comments) {
				comments.querySelectorAll('.comment').forEach(expandComments);
				observer.observe(comments);
			}
		}
	} else {
		observer.disconnect();
		window.removeEventListener('scroll', v1);
		window.removeEventListener('scroll', v3);
	}
}

export function autoLoadMoreCommentsDownvotedOnly(value) {
	downvoteOnly = value;
}

function v1() {
	document.querySelectorAll('.morecomments a').forEach(loadMoreComments);
}

function v3() {
	document.querySelectorAll('faceplate-partial[src*="/more-comments/"]').forEach(loadMoreComments);
}

function expandComments(comment) {
	let isNegative;
	if (redditVersion === 'old') {
		isNegative = false; // old Reddit doesn't seem to collapse/hide negative karma comments.
	} else if (redditVersion === 'newnew') {
		isNegative = comment.querySelector('shreddit-comment-action-row')?.shadowRoot?.querySelector('faceplate-number')?.number < 0 ?? false;
	}

	if (downvoteOnly && !isNegative) return;
	if (redditVersion === 'old' && comment.classList.contains('collapsed') && comment.getAttribute('data-author') !== 'AutoModerator') {
		comment.querySelector('a.expand').click();
		comment.dataset.uncollapsed = 'true';
		console.debug('[RedditEnhancer] autoLoadMoreComments: Comment uncollapsed:', comment);
	} else if (redditVersion === 'newnew' && comment.getAttribute('author') !== 'AutoModerator') {
		comment.removeAttribute('collapsed');
		comment.setAttribute('re-uncollapsed', '');
	}
}

function loadMoreComments(button) {
	if (downvoteOnly) return;
	const rect = button.getBoundingClientRect();
	if (rect.top >= window.innerHeight * -1 && rect.bottom <= window.innerHeight * 2) {
		button.focus({ preventScroll: true });
		button.click();
	}
}

const observer = new ResizeObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.target.querySelectorAll('.comment:not([data-uncollapsed]), shreddit-comment:not([re-uncollapsed])').forEach(expandComments);
	});
});
