/**
 * Tweaks: Productivity - Highlight original poster (OP) in comments
 *
 * @name highlightOP
 * @description Highlight the original poster (OP) in comments by adding the is-highlighted attribute (similar to r/IAmA).
 *
 * Notes: v1 UI users should use RES's implementation instead.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// Get the feature state from browser sync storage
export function loadHighlightOP() {
	BROWSER_API.storage.sync.get(['highlightOp'], function (result) {
		if (result.highlightOp) highlightOp(true);
	});
}

// Activate the feature based on Reddit version
export function highlightOp(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			document.querySelectorAll('shreddit-comment').forEach(highlightComment);
			observer.observe(document.querySelector('shreddit-comment-tree'));
		} else {
			observer.disconnect();
		}
	}
}

function highlightComment(comment) {
	const tag = comment.querySelector(':scope > div[slot="commentMeta"] shreddit-comment-author-modifier-icon');
	if (tag && tag.getAttribute('op') === '') {
		comment.setAttribute('is-highlighted', '');
	}
}

// Observe the comment tree for dynamic changes
const observer = new ResizeObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.target.querySelectorAll('shreddit-comment').forEach(highlightComment);
		});
	}, 100)
);

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
