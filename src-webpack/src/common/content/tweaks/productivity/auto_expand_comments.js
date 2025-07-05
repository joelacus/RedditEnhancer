/**
 * Tweaks: Productivity - Auto Expand Comments
 *
 * @name autoExpandComments
 * @description Automatically expand collapsed comments as the user scrolls down the post comments page.
 *
 * Applies to: Old UI (2005-)
 *             New New UI (2023-)
 */

/* === Triggered On Page Load === */
export function loadAutoExpandComments() {
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		if (result.autoExpandComments) autoExpandComments(true);
	});
}

let comment_id;

/* === Main Function === */
export function autoExpandComments(value) {
	if (value) {
		if (redditVersion === 'old') {
			const comments = document.querySelector('.commentarea');
			if (comments) {
				comments.querySelectorAll('.comment').forEach(expandComments);
				observer.observe(comments);
			}
		} else if (redditVersion === 'newnew') {
			const comments = document.querySelector('shreddit-comment-tree');
			if (comments) {
				comments.querySelectorAll('shreddit-comment').forEach(expandComments);
				observer.observe(comments);
			}
		}
	} else {
		observer.disconnect();
	}
}

function expandComments(comment) {
	if (redditVersion === 'old' && comment.classList.contains('collapsed') && comment.getAttribute('data-author') !== 'AutoModerator') {
		comment.classList.replace('collapsed', 'noncollapsed');
		comment.querySelector('.expand').textContent = '[–]';
		comment.dataset.uncollapsed = 'true';
	} else if (redditVersion === 'newnew' && comment.getAttribute('author') !== 'AutoModerator') {
		comment.removeAttribute('collapsed');
		comment.querySelector('[loading="action"][slot^="children"]')?.click();
		comment.setAttribute('re-uncollapsed', '');
	}
}

const observer = new ResizeObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.target.querySelectorAll('.comment:not([data-uncollapsed]), shreddit-comment:not([re-uncollapsed])').forEach(expandComments);
	});
});