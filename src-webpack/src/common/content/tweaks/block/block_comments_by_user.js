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
				logToDevConsole('log', `Blocked Users List (comments): ${userList}`);
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
				document.querySelectorAll('shreddit-comment').forEach((comment) => {
					filterBlockedUserPost(comment);
					addBlockButton(comment);
				});
				setTimeout(() => {
					document.querySelectorAll('shreddit-comment').forEach((comment) => {
						filterBlockedUserPost(comment);
						addBlockButton(comment);
					});
				}, 3000);

				// === Run again on page scroll ===
				// Add scroll event listener with debounce to make sure no posts have been missed
				if (document.querySelector('shreddit-comment-tree')) {
					const debouncedScrollHandler = debounce(() => {
						document.querySelectorAll('shreddit-comment').forEach((comment) => {
							filterBlockedUserPost(comment);
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
	const isBlocked = userList.some((pattern) => matchesPattern(username, pattern));

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-block-user-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	btn.title = isBlocked ? 'Unblock user' : 'Block user';
	btn.dataset.username = username;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const isBlocked = userList.some((pattern) => matchesPattern(username, pattern));
		showBlockConfirmModal(username, isBlocked);
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

function showBlockConfirmModal(username, isBlocked) {
	const existing = document.querySelector('.re-confirm-modal');
	if (existing) existing.remove();

	const action = isBlocked ? 'unblock' : 'block';
	const confirmLabel = isBlocked ? 'Unblock User' : 'Block User';
	const confirmClass = isBlocked ? 'btn-confirm-unblock' : 'btn-confirm-block';
	const actionText = isBlocked ? 'visible' : 'hidden';

	const modal = document.createElement('div');
	modal.className = 're-confirm-modal';
	modal.innerHTML = `
		<div class="re-modal-content">
			<p>Are you sure you want to ${action} this user?</p>
			<p><strong>${escapeHtml(username)}</strong></p>
			<p>Their comments will be ${actionText}.</p>
			<div class="re-modal-actions">
				<div>
					<button class="btn red ${confirmClass}" type="button">${confirmLabel}</button>
					<button class="btn btn-cancel" type="button">Cancel</button>
				</div>
			</div>
		</div>`;

	document.body.appendChild(modal);

	const closeModal = () => modal.remove();
	modal.querySelector('.btn-cancel').addEventListener('click', closeModal);
	modal.querySelector(`.${confirmClass}`).addEventListener('click', () => {
		toggleBlockUser(username, isBlocked);
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

function toggleBlockUser(username, isBlocked) {
	if (isBlocked) {
		unblockUser(username);
	} else {
		blockUser(username);
	}
}

function blockUser(username) {
	BROWSER_API.storage.sync.get(['hideBlockedUserCommentsList'], function (result) {
		let list = result.hideBlockedUserCommentsList || '';
		const users = list
			?.split(',')
			?.map((u) => u.trim())
			?.filter((u) => u !== '');

		if (!users.includes(username)) {
			users.push(username);
			const newList = users.join(',');

			BROWSER_API.storage.sync.set({ hideBlockedUserCommentsList: newList }, function () {
				updateUserList(newList);
				logToDevConsole('log', `Blocked user: ${username}. Updated list: ${userList}`);
				document.querySelectorAll('.re-block-user-btn').forEach((btn) => {
					if (btn.dataset.username === username) {
						btn.classList.add('is-blocked');
						btn.title = 'Unblock user';
					}
				});
				if (redditVersion === 'newnew') {
					document.querySelectorAll('shreddit-comment').forEach(filterBlockedUserPost);
				} else if (redditVersion === 'old') {
					enableHideBlockedUserCommentsRV1();
				}
			});
		}
	});
}

function unblockUser(username) {
	BROWSER_API.storage.sync.get(['hideBlockedUserCommentsList'], function (result) {
		let list = result.hideBlockedUserCommentsList || '';
		const users = list
			.split(',')
			.map((u) => u.trim())
			.filter((u) => u !== '');

		const index = users.indexOf(username);
		if (index > -1) {
			users.splice(index, 1);
			const newList = users.join(',');

			BROWSER_API.storage.sync.set({ hideBlockedUserCommentsList: newList }, function () {
				updateUserList(newList);
				logToDevConsole('log', `Unblocked user: ${username}. Updated list: ${userList}`);
				document.querySelectorAll('.re-block-user-btn').forEach((btn) => {
					if (btn.dataset.username === username) {
						btn.classList.remove('is-blocked');
						btn.title = 'Block user';
					}
				});
				if (redditVersion === 'newnew') {
					document.querySelectorAll('shreddit-comment').forEach(filterBlockedUserPost);
				} else if (redditVersion === 'old') {
					enableHideBlockedUserCommentsRV1();
				}
			});
		}
	});
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

function updateUserList(list = '') {
	userList = list
		?.split(',')
		?.map((word) => word.trim())
		?.filter((item) => item !== '' && item !== '*');
}

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedUserCommentsRV1() {
	document.querySelectorAll('.commentarea .entry').forEach((comment) => {
		if (!userList || comment.classList.contains('re-hide-comment')) return;

		const authorEl = comment.querySelector('.author');
		const author = authorEl?.textContent;
		const content = comment.querySelector('.usertext-body div:has(>p)');
		if (!author || !content) return;

		if (userList.some((word) => matchesPattern(author, word))) {
			content.classList.add('re-hide-comment');
		} else {
			content.classList.remove('re-hide-comment');
		}

		addBlockButton(comment, authorEl);
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(comment) {
	if (!userList || comment.classList.contains('re-hide-comment')) return;

	const author = comment.getAttribute('author');
	const content = comment.querySelector('[slot="comment"]');
	if (!author || !content) return;

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
	document.querySelectorAll('shreddit-comment-tree .re-block-user-btn').forEach((btn) => {
		btn.remove();
	});
	document.querySelectorAll('shreddit-comment-tree [data-re-block-btn-added]').forEach((el) => {
		delete el.dataset.reBlockBtnAdded;
	});
}
