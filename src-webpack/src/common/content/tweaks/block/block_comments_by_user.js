/**
 * Tweaks: Block - Blocked User Comments
 *
 * @name hideBlockedUserComments
 * @description Hide all comments by a certain user(s).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { logToDevConsole } from '../../../utilities/logging';
let userList = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedUserComments() {
	BROWSER_API.storage.sync.get(['hideBlockedUserComments'], function (result) {
		if (result.hideBlockedUserComments === true) hideBlockedUserComments(true);
	});
}

// Store cleanup functions for the scroll event
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedUserComments(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedUserCommentsList'], function (result) {
				updateUserList(result.hideBlockedUserCommentsList);
				logToDevConsole('log', `Blocked Users List: ${userList}`);
				enableHideBlockedUserCommentsRV1();
			});
		} else {
			disableHideBlockedUserCommentsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedUserCommentsList'], function (result) {
				updateUserList(result.hideBlockedUserCommentsList);
				logToDevConsole('log', `Blocked Users List: ${userList}`);
				document.querySelectorAll('shreddit-comment').forEach(filterBlockedUserPost);
				setTimeout(() => {
					document.querySelectorAll('shreddit-comment').forEach(filterBlockedUserPost);
				}, 3000);

				// === Run again on page scroll ===
				// Add scroll event listener with debounce to make sure no posts have been missed
				if (document.querySelector('shreddit-comment-tree')) {
					const debouncedScrollHandler = debounce(() => {
						document.querySelectorAll('shreddit-comment').forEach(filterBlockedUserPost);
					}, 200);

					window.addEventListener('scroll', debouncedScrollHandler);
					scrollCleanup = () => {
						window.removeEventListener('scroll', debouncedScrollHandler);
					};
				}
			});
		} else {
			// Cleanup scroll event listener
			if (scrollCleanup) {
				scrollCleanup();
				scrollCleanup = null;
			}
			disableHideBlockedUserCommentsAll();
		}
	}
}

function escapeRegExp(string) {
	// Escape regex metacharacters to prevent ReDoS
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesPattern(text, patternStr) {
	if (!text) return false;
	// Check if pattern is regex format: /pattern/flags
	const regexMatch = patternStr.match(/^\/(.+?)\/([a-z]*)$/i);
	if (regexMatch) {
		const pattern = regexMatch[1];
		const flags = regexMatch[2] || 'i';
		try {
			const regex = new RegExp(pattern, flags);
			return regex.test(text);
		} catch (e) {
			console.warn('Invalid regex pattern:', patternStr, e);
			return false;
		}
	} else {
		// Plain pattern with wildcard support
		const escaped = escapeRegExp(patternStr);
		const regexPattern = escaped.replace(/\\\*/g, '.*');
		const regex = new RegExp(`\\b${regexPattern}\\b`, 'i');
		return regex.test(text);
	}
}

function updateUserList(list) {
	userList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedUserCommentsRV1() {
	document.querySelectorAll('.commentarea .entry').forEach((comment) => {
		if (comment.classList.contains('re-hide-comment')) return;

		const author = comment.querySelector('.author')?.textContent;
		console.log(author);
		const content = comment.querySelector('.usertext-body p');
		console.log(content);
		if (!author && !content) return;

		if (userList.some((word) => matchesPattern(author, word))) {
			content.classList.add('re-hide-comment');
		}
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(comment) {
	if (comment.classList.contains('re-hide-comment')) return;

	const author = comment.getAttribute('author');
	const content = comment.querySelector('p')?.parentElement;
	if (!author && !content) return;

	if (userList.some((word) => matchesPattern(author, word))) {
		content.classList.add('re-hide-comment');
	} else {
		content.classList.remove('re-hide-comment');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedUserCommentsAll() {
	document.querySelectorAll('.re-hide-comment').forEach((comment) => {
		comment.classList.remove('re-hide-comment');
	});
}
