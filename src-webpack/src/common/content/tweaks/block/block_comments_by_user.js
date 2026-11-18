/**
 * Tweaks: Block - Blocked User Comments
 *
 * @name hideBlockedUserComments
 * @description Hide all comments by a certain user(s).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { escapeHtml } from '../../../utilities/escape_html.js';
import { parseHtmlString } from '../../../utilities/parse_html_string.js';
import { logToDevConsole } from '../../../utilities/logging';
import { isSafeRegexPattern, reportUnsafeRegexPattern } from '../../../utilities/safe_regex.js';
import { readBlocks, writeBlocks, findKey, getBlockedUserPatterns, addUserBlock, removeUserBlock, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { showToast } from '../../../utilities/toast_notification.js';

let userList = [];
let userCommentsFilteringActive = false;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !userCommentsFilteringActive) return;
	readBlocks().then((store) => {
		userList = getBlockedUserPatterns(store, 'comments');
		// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
		// else branch removes stale classes from unblocked comments.
		if (redditVersion === 'old') {
			enableHideBlockedUserCommentsRV1();
		} else {
			document.querySelectorAll('shreddit-comment').forEach((comment) => {
				filterBlockedUserComment(comment);
				addBlockButton(comment);
			});
		}
	});
});

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
	userCommentsFilteringActive = value === true;
	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				userList = getBlockedUserPatterns(store, 'comments');
				//logToDevConsole('log', `Blocked Users List (comments): ${userList}`);
				enableHideBlockedUserCommentsRV1();
			});
		} else {
			disableHideBlockedUserCommentsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				userList = getBlockedUserPatterns(store, 'comments');
				//logToDevConsole('log', `Blocked Users List: ${userList}`);
				document.querySelectorAll('shreddit-comment').forEach((comment) => {
					filterBlockedUserComment(comment);
					addBlockButton(comment);
				});
				setTimeout(() => {
					document.querySelectorAll('shreddit-comment').forEach((comment) => {
						filterBlockedUserComment(comment);
						addBlockButton(comment);
					});
				}, 3000);

				// Add scroll event listener with debounce to make sure no posts have been missed
				if (document.querySelector('shreddit-comment-tree')) {
					const debouncedScrollHandler = debounce(() => {
						document.querySelectorAll('shreddit-comment').forEach((comment) => {
							filterBlockedUserComment(comment);
							addBlockButton(comment);
						});
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
			BROWSER_API.storage.sync.get(['hideBlockedUserPosts'], function (result) {
				if (!result.hideBlockedUserPosts) removeModalButtonStyles();
			});
			disableHideBlockedUserCommentsAll();
		}
	}
}

function removeModalButtonStyles() {
	const styleElement = document.head.querySelector('style[id="re-modal-button"]');
	if (styleElement) {
		styleElement.remove();
	}
	document.querySelectorAll('.re-confirm-modal').forEach((m) => m.remove());
}

function addBlockButton(comment) {
	if (!userList || comment.dataset.reBlockBtnAdded) return;

	const username = comment.getAttribute('author') || comment.querySelector('[noun="comment_author"] a')?.textContent?.replace('u/', '')?.trim();
	if (username === '[deleted]') return;
	const isBlocked = userList.some((pattern) => matchesPattern(username, pattern));

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-block-user-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	btn.title = isBlocked ? 'Unblock user' : 'Block user';
	btn.dataset.username = username;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		showBlockConfirmModal(username);
	});

	const userTag = comment.querySelector('.re-create-tag-btn, .re-user-tag');
	const anchor = comment.querySelector('[slot="commentMeta"] .author-hovercard-trigger');
	if (userTag) {
		userTag.parentElement.insertBefore(btn, userTag);
	} else if (anchor) {
		anchor.insertAdjacentElement('afterend', btn);
	} else {
		comment.querySelector('[noun="comment_author"] a')?.insertAdjacentElement('afterend', btn);
	}
	comment.dataset.reBlockBtnAdded = 'true';
}

function showBlockConfirmModal(username) {
	const existing = document.querySelector('.re-confirm-modal');
	if (existing) existing.remove();

	const modal = document.createElement('div');
	modal.className = 're-confirm-modal';
	modal.append(
		parseHtmlString(`
		<div class="re-modal-content">
			<p>Block user <strong>${escapeHtml(username)}</strong>?</p>
			<label><input type="checkbox" class="re-scope-posts" checked /> Hide their posts</label>
			<label><input type="checkbox" class="re-scope-comments" checked /> Hide their comments</label>
			<div class="re-modal-actions">
				<div>
					<button class="btn red btn-confirm-block" type="button">Block User</button>
					<button class="btn btn-cancel" type="button">Cancel</button>
				</div>
			</div>
		</div>`),
	);

	document.body.appendChild(modal);

	// Reflect the user's current block scopes (both boxes stay checked for new entries).
	readBlocks().then((store) => {
		const key = findKey(store.users, username);
		if (key) {
			modal.querySelector('.re-scope-posts').checked = !!store.users[key].posts;
			modal.querySelector('.re-scope-comments').checked = !!store.users[key].comments;
		}
	});

	const closeModal = () => modal.remove();
	modal.querySelector('.btn-cancel').addEventListener('click', closeModal);
	modal.querySelector('.btn-confirm-block').addEventListener('click', async () => {
		await applyUserBlock(username, modal.querySelector('.re-scope-posts').checked, modal.querySelector('.re-scope-comments').checked);
		closeModal();
	});
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});

	const escHandler = (e) => {
		if (e.key === 'Escape') {
			closeModal();
			document.removeEventListener('keydown', escHandler);
		}
	};
	document.addEventListener('keydown', escHandler);
}

async function applyUserBlock(username, wantPosts, wantComments) {
	const store = await readBlocks();
	if (wantPosts) addUserBlock(store, username, 'posts');
	else removeUserBlock(store, username, 'posts');
	if (wantComments) addUserBlock(store, username, 'comments');
	else removeUserBlock(store, username, 'comments');
	const result = await writeBlocks(store);
	if (!result.ok) {
		showToast('error', 'Could not save the block list (storage is full).');
		return;
	}
	userList = getBlockedUserPatterns(store, 'comments');
	logToDevConsole('log', `Updated block scopes for user: ${username}.`);
	document.querySelectorAll('.re-block-user-btn').forEach((btn) => {
		if (btn.dataset.username === username) {
			const blocked = userList.some((pattern) => matchesPattern(username, pattern));
			btn.classList.toggle('is-blocked', blocked);
			btn.title = blocked ? 'Unblock user' : 'Block user';
		}
	});
	if (redditVersion === 'newnew') {
		document.querySelectorAll('shreddit-comment').forEach(filterBlockedUserComment);
	} else if (redditVersion === 'old') {
		enableHideBlockedUserCommentsRV1();
	}
}

// ─── Helpers ────────────────────────────────────────────────────────────────

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

// In-memory pattern list, refreshed from the block store on load and on every block/unblock action.

// Enable Hide Blocked User Comments - RV1
function enableHideBlockedUserCommentsRV1() {
	document.querySelectorAll('.commentarea .entry').forEach((comment) => {
		if (!userList) return;

		const authorEl = comment.querySelector('.author');
		const author = authorEl?.textContent;
		const content = comment.querySelector('.usertext-body div:has(>p)');
		if (!author || !content) return;

		if (userList.some((word) => matchesPattern(author, word))) {
			content.classList.add('re-hide-comment-user');
		} else {
			content.classList.remove('re-hide-comment-user');
		}

		addBlockButton(comment, authorEl);
	});
}

// Enable Hide Blocked User Comments - RV3
function filterBlockedUserComment(comment) {
	if (!userList) return;

	const author = comment.getAttribute('author');
	const content = comment.querySelector('[slot="comment"]');
	if (!author || !content) return;

	if (userList.some((word) => matchesPattern(author, word))) {
		content.classList.add('re-hide-comment-user');
	} else {
		content.classList.remove('re-hide-comment-user');
	}
}

// Disable Hide Blocked User Comments - All
function disableHideBlockedUserCommentsAll() {
	// Only remove this filter's own class: the keyword-comment filter marks
	// its comments with re-hide-comment-keyword, and both classes can sit on
	// nodes in the same comment tree.
	document.querySelectorAll('.re-hide-comment-user').forEach((comment) => {
		comment.classList.remove('re-hide-comment-user');
	});
	document.querySelectorAll('shreddit-comment-tree .re-block-user-btn').forEach((btn) => {
		btn.remove();
	});
	document.querySelectorAll('shreddit-comment-tree [data-re-block-btn-added]').forEach((el) => {
		delete el.dataset.reBlockBtnAdded;
	});
}
