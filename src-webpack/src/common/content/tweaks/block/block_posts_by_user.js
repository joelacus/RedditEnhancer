/**
 * Tweaks: Block - Blocked User Posts
 *
 * @name hideBlockedUserPosts
 * @description Hide all posts by a certain username(s).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce.js';
import { escapeHtml } from '../../../utilities/escape_html.js';
import { logToDevConsole } from '../../../utilities/logging';
import { registerMutationCallback } from '../../observer_manager';
let userList = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts'], function (result) {
		if (result.hideBlockedUserPosts === true) hideBlockedUserPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedUserPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedUserPostsList'], function (result) {
				updateUserList(result.hideBlockedUserPostsList);
				logToDevConsole('log', `Blocked Users List (posts): ${userList}`);
				enableHideBlockedUserPostsRV1();
			});
		} else {
			disableHideBlockedUserPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedUserPostsList'], function (result) {
				updateUserList(result.hideBlockedUserPostsList);
				logToDevConsole('log', `Blocked Users List: ${userList}`);
				scanPage();
				setTimeout(() => {
					scanPage();
				}, 3000);

				// Register with centralised observer manager
				if (observerCleanup) {
					observerCleanup();
				}
				const feed = document.querySelector('shreddit-feed');
				if (feed) {
					observerCleanup = registerMutationCallback(
						feed,
						(mutations) => {
							mutations.forEach((mutation) => {
								mutation.addedNodes.forEach((addedNode) => {
									if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
										setTimeout(() => {
											if (addedNode) {
												filterBlockedUserPost(addedNode);
												const authorEl = addedNode.querySelector('shreddit-post [noun="user_profile"] a, shreddit-post .author, shreddit-post .re-post-author a');
												if (authorEl) addBlockButtonToPost(addedNode, authorEl);
											}
										}, 1000);
									}
								});
							});
						},
						{ childList: true, subtree: true },
						'hideBlockedUserPosts',
					);
				}

				if (document.querySelector('shreddit-feed')) {
					const debouncedScrollHandler = debounce(() => {
						scanPage();
					}, 200);
					window.addEventListener('scroll', debouncedScrollHandler);
					scrollCleanup = () => {
						window.removeEventListener('scroll', debouncedScrollHandler);
					};
				}
			});
		} else {
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			if (scrollCleanup) {
				scrollCleanup();
				scrollCleanup = null;
			}
			BROWSER_API.storage.sync.get(['hideBlockedUserComments'], function (result) {
				if (!result.hideBlockedUserComments) removeModalButtonStyles();
			});
			disableHideBlockedUserPostsAll();
		}
	}
}

function scanPage() {
	document.querySelectorAll('article:has(>shreddit-post)').forEach((post) => {
		let authorEl = post.querySelector('shreddit-post [noun="user_profile"] a, shreddit-post .author, shreddit-post .re-post-author a');
		if (!authorEl) authorEl = post.querySelector('shreddit-post');
		filterBlockedUserPost(post);
		if (authorEl) addBlockButtonToPost(post, authorEl);
	});
}

function removeModalButtonStyles() {
	const styleElement = document.head.querySelector('style[id="re-modal-button"]');
	if (styleElement) {
		styleElement.remove();
	}
	document.querySelectorAll('.re-confirm-modal').forEach((m) => m.remove());
}

function addBlockButtonToPost(post, authorEl) {
	if (!userList || post.querySelector('.re-block-user-btn')) return;

	const username = authorEl.getAttribute('author') || authorEl.textContent.replace('u/', '').trim();
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

	const userTag = post.querySelector('.re-create-tag-btn');
	const hovercard = authorEl.closest('faceplate-hovercard');
	if (userTag) {
		userTag.parentElement.insertBefore(btn, userTag);
	} else if (hovercard) {
		hovercard.insertAdjacentElement('afterend', btn);
	} else if (authorEl.tagName === 'SHREDDIT-POST') {
		authorEl.querySelector('faceplate-timeago').insertAdjacentElement('afterend', btn);
	} else {
		authorEl.insertAdjacentElement('afterend', btn);
	}
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
			<p>Their posts will be ${actionText}.</p>
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
	BROWSER_API.storage.sync.get(['hideBlockedUserPostsList'], function (result) {
		let list = result.hideBlockedUserPostsList || '';
		const users = list
			.split(',')
			.map((u) => u.trim())
			.filter((u) => u !== '');

		if (!users.includes(username)) {
			users.push(username);
			const newList = users.join(',');

			BROWSER_API.storage.sync.set({ hideBlockedUserPostsList: newList }, function () {
				updateUserList(newList);
				logToDevConsole('log', `Blocked user: ${username}. Updated list: ${userList}`);
				document.querySelectorAll('.re-block-user-btn').forEach((btn) => {
					if (btn.dataset.username === username) {
						btn.classList.add('is-blocked');
						btn.title = 'Unblock user';
					}
				});
				if (redditVersion === 'newnew') {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedUserPost);
				} else if (redditVersion === 'old') {
					enableHideBlockedUserPostsRV1();
				}
			});
		}
	});
}

function unblockUser(username) {
	BROWSER_API.storage.sync.get(['hideBlockedUserPostsList'], function (result) {
		let list = result.hideBlockedUserPostsList || '';
		const users = list
			?.split(',')
			?.map((u) => u.trim())
			?.filter((u) => u !== '');

		const index = users.indexOf(username);
		if (index > -1) {
			users.splice(index, 1);
			const newList = users.join(',');

			BROWSER_API.storage.sync.set({ hideBlockedUserPostsList: newList }, function () {
				updateUserList(newList);
				logToDevConsole('log', `Unblocked user: ${username}. Updated list: ${userList}`);
				document.querySelectorAll('.re-block-user-btn').forEach((btn) => {
					if (btn.dataset.username === username) {
						btn.classList.remove('is-blocked');
						btn.title = 'Block user';
					}
				});
				if (redditVersion === 'newnew') {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedUserPost);
				} else if (redditVersion === 'old') {
					enableHideBlockedUserPostsRV1();
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
function enableHideBlockedUserPostsRV1() {
	if (!userList) return;
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const authorElement = post.querySelector('a.author');
		if (!authorElement) return;
		const authorText = authorElement.textContent;

		if (userList.some((word) => matchesPattern(authorText, word))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}

		addBlockButtonToPost(post, authorElement);
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(post) {
	if (!userList || post.classList.contains('re-hide')) return;

	const authorText = post.querySelector('shreddit-post')?.getAttribute('author');
	if (!authorText) return;

	if (userList.some((word) => matchesPattern(authorText, word))) {
		post.classList.add('re-hide');
	} else {
		post.classList.remove('re-hide');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedUserPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
	document.querySelectorAll('shreddit-post .re-block-user-btn').forEach((btn) => {
		btn.remove();
	});
}
