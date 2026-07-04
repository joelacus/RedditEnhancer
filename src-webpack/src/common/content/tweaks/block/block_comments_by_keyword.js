/**
 * Tweaks: Block - Blocked Keyword Comments
 *
 * @name hideBlockedKeywordComments
 * @description Hide all comments containing certain keywords.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { logToDevConsole } from '../../../utilities/logging';
let keywordList = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedKeywordComments() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordComments'], function (result) {
		if (result.hideBlockedKeywordComments === true) hideBlockedKeywordComments(true);
	});
}

// Store cleanup functions for the scroll event
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedKeywordComments(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedKeywordCommentsList'], function (result) {
				updateKeywordList(result.hideBlockedKeywordCommentsList);
				logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				enableHideBlockedKeywordCommentsRV1();
			});
		} else {
			disableHideBlockedKeywordCommentsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedKeywordCommentsList'], function (result) {
				updateKeywordList(result.hideBlockedKeywordCommentsList);
				logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				document.querySelectorAll('shreddit-comment').forEach(filterBlockedKeywordPost);
				setTimeout(() => {
					document.querySelectorAll('shreddit-comment').forEach(filterBlockedKeywordPost);
				}, 3000);

				// === Run again on page scroll ===
				// Add scroll event listener with debounce to make sure no posts have been missed
				if (document.querySelector('shreddit-comment-tree')) {
					const debouncedScrollHandler = debounce(() => {
						document.querySelectorAll('shreddit-comment').forEach(filterBlockedKeywordPost);
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
			disableHideBlockedKeywordCommentsAll();
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

function updateKeywordList(list) {
	keywordList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked Keyword Posts - RV1
function enableHideBlockedKeywordCommentsRV1() {
	document.querySelectorAll('.commentarea .entry').forEach((post) => {
		const commentText = post.querySelector('.usertext-body p');
		if (!commentText) return;

		if (keywordList.some((word) => matchesPattern(commentText.textContent, word))) {
			post.classList.add('re-hide-comment');
		}
	});
}

// Enable Hide Blocked Keyword Posts - RV3
function filterBlockedKeywordPost(comment) {
	if (comment.classList.contains('re-hide-comment')) return;

	const content = comment.querySelector('p')?.parentElement;
	if (!content) return;

	if (keywordList.some((word) => matchesPattern(content.textContent, word))) {
		content.classList.add('re-hide-comment');
	} else {
		content.classList.remove('re-hide-comment');
	}
}

// Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordCommentsAll() {
	document.querySelectorAll('.re-hide-comment').forEach((comment) => {
		comment.classList.remove('re-hide-comment');
	});
}
