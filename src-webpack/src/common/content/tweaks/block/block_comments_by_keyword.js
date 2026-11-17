/**
 * Tweaks: Block - Blocked Keyword Comments
 *
 * @name hideBlockedKeywordComments
 * @description Hide all comments containing certain keywords.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
//import { logToDevConsole } from '../../../utilities/logging';
import { isSafeRegexPattern, reportUnsafeRegexPattern } from '../../../utilities/safe_regex.js';
import { readBlocks, getCommentKeywordPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
let keywordList = [];
let keywordCommentsFilteringActive = false;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !keywordCommentsFilteringActive) return;
	readBlocks().then((store) => {
		keywordList = getCommentKeywordPatterns(store);
		// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
		// else branch removes stale classes from unblocked comments.
		if (redditVersion === 'old') {
			enableHideBlockedKeywordCommentsRV1();
		} else {
			document.querySelectorAll('shreddit-comment').forEach(filterBlockedKeywordPost);
		}
	});
});

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
	keywordCommentsFilteringActive = value === true;
	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				keywordList = getCommentKeywordPatterns(store);
				//logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
				enableHideBlockedKeywordCommentsRV1();
			});
		} else {
			disableHideBlockedKeywordCommentsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				keywordList = getCommentKeywordPatterns(store);
				//logToDevConsole('log', `Blocked Keywords List: ${keywordList}`);
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
		if (!isSafeRegexPattern(pattern, flags)) {
			reportUnsafeRegexPattern(patternStr);
			return false;
		}
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

// In-memory pattern list, refreshed from the block store on load.

// Enable Hide Blocked Keyword Comments - RV1
function enableHideBlockedKeywordCommentsRV1() {
	document.querySelectorAll('.commentarea .entry').forEach((post) => {
		const commentText = post.querySelector('.usertext-body p');
		if (!commentText) return;

		if (keywordList.some((word) => matchesPattern(commentText.textContent, word))) {
			post.classList.add('re-hide-comment-keyword');
		} else {
			post.classList.remove('re-hide-comment-keyword');
		}
	});
}

// Enable Hide Blocked Keyword Comments - RV3
function filterBlockedKeywordPost(comment) {
	const content = comment.querySelector('p')?.parentElement;
	if (!content) return;

	if (keywordList.some((word) => matchesPattern(content.textContent, word))) {
		content.classList.add('re-hide-comment-keyword');
	} else {
		content.classList.remove('re-hide-comment-keyword');
	}
}

// Disable Hide Blocked Keyword Comments - All
function disableHideBlockedKeywordCommentsAll() {
	// Only remove this filter's own class: the user-comment filter marks its
	// comments with re-hide-comment-user, and both classes can sit on nodes in
	// the same comment tree. Removing .re-hide-comment* here would un-hide the
	// other filter's comments.
	document.querySelectorAll('.re-hide-comment-keyword').forEach((comment) => {
		comment.classList.remove('re-hide-comment-keyword');
	});
}
