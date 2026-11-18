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
import { parseHtmlString } from '../../../utilities/parse_html_string.js';
import { logToDevConsole } from '../../../utilities/logging';
import { isSafeRegexPattern, reportUnsafeRegexPattern } from '../../../utilities/safe_regex.js';
import { readBlocks, writeBlocks, findKey, getBlockedUserPatterns, addUserBlock, removeUserBlock, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { showToast } from '../../../utilities/toast_notification.js';
import { registerMutationCallback } from '../../observer_manager';
let userList = [];
let userPostsFilteringActive = false;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !userPostsFilteringActive) return;
	readBlocks().then((store) => {
		userList = getBlockedUserPatterns(store, 'posts');
		scanPage();
	});
});

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
	userPostsFilteringActive = value === true;
	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				userList = getBlockedUserPatterns(store, 'posts');
				//logToDevConsole('log', `Blocked Users List (posts): ${userList}`);
				enableHideBlockedUserPostsRV1();
			});
		} else {
			disableHideBlockedUserPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				userList = getBlockedUserPatterns(store, 'posts');
				//logToDevConsole('log', `Blocked Users List: ${userList}`);
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
	// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
	// else branch removes stale classes from unblocked posts.
	if (redditVersion === 'old') {
		enableHideBlockedUserPostsRV1();
		return;
	}
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
	userList = getBlockedUserPatterns(store, 'posts');
	logToDevConsole('log', `Updated block scopes for user: ${username}`);
	document.querySelectorAll('.re-block-user-btn').forEach((btn) => {
		if (btn.dataset.username === username) {
			const blocked = userList.some((pattern) => matchesPattern(username, pattern));
			btn.classList.toggle('is-blocked', blocked);
			btn.title = blocked ? 'Unblock user' : 'Block user';
		}
	});
	if (redditVersion === 'newnew') {
		document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedUserPost);
	} else if (redditVersion === 'old') {
		enableHideBlockedUserPostsRV1();
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

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedUserPostsRV1() {
	if (!userList) return;
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const authorElement = post.querySelector('a.author');
		if (!authorElement) return;
		const authorText = authorElement.textContent;

		if (userList.some((word) => matchesPattern(authorText, word))) {
			post.classList.add('re-hide-user');
		} else {
			post.classList.remove('re-hide-user');
		}

		addBlockButtonToPost(post, authorElement);
	});
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedUserPost(post) {
	if (!userList) return;

	const authorText = post.querySelector('shreddit-post')?.getAttribute('author');
	if (!authorText) return;

	if (userList.some((word) => matchesPattern(authorText, word))) {
		post.classList.add('re-hide-user');
	} else {
		post.classList.remove('re-hide-user');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedUserPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide-user').forEach((post) => {
		post.classList.remove('re-hide-user');
	});
	document.querySelectorAll('shreddit-post .re-block-user-btn').forEach((btn) => {
		btn.remove();
	});
}
