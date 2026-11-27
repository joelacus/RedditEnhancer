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
import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { readBlocks, writeBlocks, findKey, getBlockedUserPatterns, addUserBlock, removeUserBlock, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { showToast } from '../../../utilities/toast_notification.js';
import { registerMutationCallback } from '../../observer_manager';
import { acquireBlockFeedGuard, releaseBlockFeedGuard } from './block_feed_guard.js';
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
	if (value) acquireBlockFeedGuard('hideBlockedUserPosts');
	else releaseBlockFeedGuard('hideBlockedUserPosts');
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
											if (!addedNode.isConnected) return;
											const postEl = addedNode.matches?.('shreddit-post') ? addedNode : addedNode.closest?.('shreddit-post') ?? addedNode.querySelector?.('shreddit-post');
											if (!postEl) return;
											filterBlockedUserPost(postEl.closest('article') ?? postEl);
											addBlockButtonToPost(postEl, getPostAuthorEl(postEl) ?? postEl);
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
	getPostContainers().forEach(filterBlockedUserPost);
	document.querySelectorAll('shreddit-post').forEach((post) => {
		addBlockButtonToPost(post, getPostAuthorEl(post) ?? post);
	});
}

function removeModalButtonStyles() {
	const styleElement = document.head.querySelector('style[id="re-modal-button"]');
	if (styleElement) {
		styleElement.remove();
	}
	document.querySelectorAll('.re-confirm-modal').forEach((m) => m.remove());
}

// ─── Post Button Helpers ────────────────────────────────────────────────────

// The elements to apply the hidden state to: the feed card on feed pages, or
// the post element itself when it is rendered on its own (e.g. post pages).
function getPostContainers() {
	const containers = new Set();
	document.querySelectorAll('shreddit-post').forEach((post) => {
		containers.add(post.closest('article') ?? post);
	});
	return containers;
}

// Author element inside a post. Our own Show Post Author span takes priority,
// then Reddit's native author link.
function getPostAuthorEl(post) {
	return queryOwnPost(post, '.re-post-author > a[href*="/user/"]') || queryOwnPost(post, '[noun="user_profile"] a[href*="/user/"]') || queryOwnPost(post, '.author');
}

// Query a descendant that belongs to this post, not to a nested post (crosspost).
function queryOwnPost(root, selector) {
	const matches = root.querySelectorAll(selector);
	if (!root.matches?.('shreddit-post')) return matches[0] ?? null;
	return [...matches].find((el) => el.closest('shreddit-post') === root) ?? null;
}

function getOwnBlockButtons(post) {
	const buttons = [...post.querySelectorAll('.re-block-user-btn')];
	if (!post.matches?.('shreddit-post')) return buttons;
	return buttons.filter((btn) => btn.closest('shreddit-post') === post);
}

function addBlockButtonToPost(post, authorEl) {
	if (!userList) return;

	// The caller may pass a subtree, so always resolve the post that actually
	// owns the author element. This keeps the duplicate guard post-wide.
	const postEl = authorEl?.closest?.('shreddit-post') ?? (post.matches?.('shreddit-post') ? post : post.querySelector?.('shreddit-post') ?? post);
	const username = authorEl?.getAttribute('author') || authorEl?.textContent?.replace('u/', '').trim();
	if (!username || username === '[deleted]') {
		getOwnBlockButtons(postEl).forEach((btn) => btn.remove());
		return;
	}
	const isBlocked = userList.some((pattern) => matchesPattern(username, pattern));

	// Keep one button per post and remove any duplicates the observers added.
	let btn = pickBlockButton(postEl, username);

	if (!btn) {
		btn = document.createElement('button');
		btn.type = 'button';
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			showBlockConfirmModal(btn.dataset.username);
		});
	}

	const btnClass = 're-block-user-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	if (btn.className !== btnClass) btn.className = btnClass;
	const btnTitle = isBlocked ? 'Unblock user' : 'Block user';
	if (btn.title !== btnTitle) btn.title = btnTitle;
	if (btn.dataset.username !== username) btn.dataset.username = username;

	placeBlockButton(btn, postEl, authorEl);
}

// Keep the best of any existing buttons and remove the rest.
function pickBlockButton(post, username) {
	const buttons = getOwnBlockButtons(post);
	if (buttons.length === 0) return null;
	const authorLink = queryOwnPost(post, '.re-post-author > a[href*="/user/"]');
	const keep = buttons.find((btn) => authorLink && btn.previousElementSibling === authorLink) || buttons.find((btn) => (btn.dataset.username || '').toLowerCase() === username.toLowerCase()) || buttons[0];
	buttons.forEach((btn) => {
		if (btn !== keep) btn.remove();
	});
	return keep;
}

// Put the button directly after the author, falling back to the other known
// credit bar layouts. Each move is a no-op when the button is already placed.
function placeBlockButton(btn, post, authorEl) {
	const authorLink = queryOwnPost(post, '.re-post-author > a[href*="/user/"]');
	if (authorLink) {
		insertAfter(authorLink, btn);
		return;
	}

	const userTag = queryOwnPost(post, '.re-create-tag-btn, .re-user-tag');
	if (userTag) {
		insertBefore(userTag, btn);
		return;
	}

	const hovercard = authorEl?.closest?.('faceplate-hovercard');
	if (hovercard) {
		insertAfter(hovercard, btn);
		return;
	}

	if (authorEl?.tagName === 'SHREDDIT-POST') {
		const timeago = authorEl.querySelector('faceplate-timeago');
		if (timeago) {
			insertAfter(timeago, btn);
		} else {
			const container = authorEl.querySelector('[slot="credit-bar"] > span') ?? authorEl.querySelector('[slot="credit-bar"]') ?? authorEl;
			if (container.lastElementChild !== btn) container.appendChild(btn);
		}
		return;
	}

	if (authorEl) {
		insertAfter(authorEl, btn);
	} else {
		const container = post.querySelector('[slot="credit-bar"]') ?? post;
		if (container.lastElementChild !== btn) container.appendChild(btn);
	}
}

function insertAfter(reference, el) {
	if (reference.nextElementSibling !== el) reference.insertAdjacentElement('afterend', el);
}

function insertBefore(reference, el) {
	if (reference.previousElementSibling !== el) reference.parentElement.insertBefore(el, reference);
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
			<label><input type="checkbox" class="re-scope-hide-username" checked /> Hide their username</label>
			<div class="re-modal-actions">
				<div>
					<button class="btn red btn-confirm-block" type="button">Block User</button>
					<button class="btn btn-cancel" type="button">Cancel</button>
				</div>
			</div>
		</div>`),
	);

	document.body.appendChild(modal);

	// Reflect the user's current block scopes (all boxes stay checked for new entries).
	readBlocks().then((store) => {
		const key = findKey(store.users, username);
		if (key) {
			modal.querySelector('.re-scope-posts').checked = !!store.users[key].posts;
			modal.querySelector('.re-scope-comments').checked = !!store.users[key].comments;
			modal.querySelector('.re-scope-hide-username').checked = store.users[key].hide_username !== false;
		}
	});

	const closeModal = () => modal.remove();
	modal.querySelector('.btn-cancel').addEventListener('click', closeModal);
	modal.querySelector('.btn-confirm-block').addEventListener('click', async () => {
		await applyUserBlock(
			username,
			modal.querySelector('.re-scope-posts').checked,
			modal.querySelector('.re-scope-comments').checked,
			modal.querySelector('.re-scope-hide-username').checked,
		);
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

async function applyUserBlock(username, wantPosts, wantComments, wantHideUsername) {
	const store = await readBlocks();
	if (wantPosts) addUserBlock(store, username, 'posts');
	else removeUserBlock(store, username, 'posts');
	if (wantComments) addUserBlock(store, username, 'comments');
	else removeUserBlock(store, username, 'comments');
	if (wantHideUsername) addUserBlock(store, username, 'hide_username');
	else removeUserBlock(store, username, 'hide_username');
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
		getPostContainers().forEach(filterBlockedUserPost);
	} else if (redditVersion === 'old') {
		enableHideBlockedUserPostsRV1();
	}
}

// ─── Helpers ────────────────────────────────────────────────────────────────

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

	const authorText = post.matches?.('shreddit-post') ? post.getAttribute('author') : post.querySelector('shreddit-post')?.getAttribute('author');
	if (!authorText) return;

	if (userList.some((word) => matchesPattern(authorText, word))) {
		post.classList.add('re-hide-user');
	} else {
		post.classList.remove('re-hide-user');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedUserPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide-user, shreddit-post.re-hide-user').forEach((post) => {
		post.classList.remove('re-hide-user');
	});
	document.querySelectorAll('shreddit-post .re-block-user-btn').forEach((btn) => {
		btn.remove();
	});
}
