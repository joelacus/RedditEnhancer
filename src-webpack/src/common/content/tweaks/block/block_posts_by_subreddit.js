/**
 * Tweaks: Block - Blocked Subreddit Posts
 *
 * @name hideBlockedSubredditPosts
 * @description Hide all posts from certain subreddits.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../../utilities/logging';
import { registerMutationCallback } from '../../observer_manager';
import { escapeHtml } from '../../../utilities/escape_html.js';
import { debounce } from '../../../utilities/debounce.js';
let subredditList = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedSubredditPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], function (result) {
		if (result.hideBlockedSubredditPosts === true) hideBlockedSubredditPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedSubredditPosts(value) {
	if (redditVersion === 'old') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedSubredditPostsList'], function (result) {
				updateSubredditList(result.hideBlockedSubredditPostsList);
				logToDevConsole('log', `Blocked Subreddits List: ${subredditList}`);
				enableHideBlockedSubredditPostsRV1();
			});
		} else {
			disableHideBlockedSubredditPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			BROWSER_API.storage.sync.get(['hideBlockedSubredditPostsList'], function (result) {
				updateSubredditList(result.hideBlockedSubredditPostsList);
				logToDevConsole('log', `Blocked Subreddits List: ${subredditList}`);
				scanPage();
				setTimeout(scanPage, 3000);

				// Register with centralised observer manager
				// Clean up any existing observer first
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
												filterBlockedSubredditPost(addedNode);
												const subredditLink = addedNode.querySelector('shreddit-post a[data-testid="subreddit-name"]');
												if (subredditLink) addBlockButtonToSubreddit(addedNode, subredditLink);
											}
										}, 1000);
									}
								});
							});
						},
						{ childList: true, subtree: true },
						'hideBlockedSubredditPosts',
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
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			if (scrollCleanup) {
				scrollCleanup();
				scrollCleanup = null;
			}
			disableHideBlockedSubredditPostsAll();
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

function updateSubredditList(list) {
	subredditList = list
		.split(',')
		.map((word) => word.trim())
		.filter((item) => item !== '' && item !== '*');
}

function scanPage() {
	document.querySelectorAll('article:has(>shreddit-post)').forEach((post) => {
		const subredditLink = post.querySelector('shreddit-post a[data-testid="subreddit-name"]');
		filterBlockedSubredditPost(post);
		if (subredditLink) addBlockButtonToSubreddit(post, subredditLink);
	});
}

function addBlockButtonToSubreddit(post, subredditLink) {
	if (!subredditList || post.querySelector('.re-block-subreddit-btn')) return;

	const href = subredditLink.getAttribute('href') || '';
	const match = href.match(/\/r\/([^/]+)/);
	const subredditName = match ? match[1] : '';
	if (!subredditName) return;

	const isBlocked = subredditList.some((pattern) => matchesPattern(subredditName, pattern));

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-block-subreddit-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	btn.title = isBlocked ? 'Unblock subreddit' : 'Block subreddit';
	btn.dataset.subreddit = subredditName;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const isBlocked = subredditList.some((pattern) => matchesPattern(subredditName, pattern));
		showBlockConfirmModal(subredditName, isBlocked);
	});

	subredditLink.insertAdjacentElement('afterend', btn);
}

function showBlockConfirmModal(subredditName, isBlocked) {
	const existing = document.querySelector('.re-confirm-modal');
	if (existing) existing.remove();

	const action = isBlocked ? 'unblock' : 'block';
	const confirmLabel = isBlocked ? 'Unblock Subreddit' : 'Block Subreddit';
	const confirmClass = isBlocked ? 'btn-confirm-unblock' : 'btn-confirm-block';
	const actionText = isBlocked ? 'visible' : 'hidden';

	const modal = document.createElement('div');
	modal.className = 're-confirm-modal';
	modal.innerHTML = `
		<div class="re-modal-content">
			<p>Are you sure you want to ${action} this subreddit?</p>
			<p><strong>${escapeHtml(subredditName)}</strong></p>
			<p>Posts from r/${escapeHtml(subredditName)} will be ${actionText}.</p>
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
		toggleBlockSubreddit(subredditName, isBlocked);
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

function toggleBlockSubreddit(subredditName, isBlocked) {
	if (isBlocked) {
		unblockSubreddit(subredditName);
	} else {
		blockSubreddit(subredditName);
	}
}

function blockSubreddit(subredditName) {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPostsList'], function (result) {
		let list = result.hideBlockedSubredditPostsList || '';
		const subreddits = list
			.split(',')
			.map((s) => s.trim())
			.filter((s) => s !== '');

		if (!subreddits.includes(subredditName)) {
			subreddits.push(subredditName);
			const newList = subreddits.join(',');

			BROWSER_API.storage.sync.set({ hideBlockedSubredditPostsList: newList }, function () {
				updateSubredditList(newList);
				logToDevConsole('log', `Blocked subreddit: ${subredditName}. Updated list: ${subredditList}`);
				document.querySelectorAll('.re-block-subreddit-btn').forEach((btn) => {
					if (btn.dataset.subreddit === subredditName) {
						btn.classList.add('is-blocked');
						btn.title = 'Unblock subreddit';
					}
				});
				if (redditVersion === 'old') {
					document.querySelectorAll('.re-block-subreddit-btn').forEach((btn) => {
						if (btn.dataset.subreddit === subredditName) {
							btn.closest('.thing').classList.add('re-hide');
						}
					});
				} else {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedSubredditPost);
				}
			});
		}
	});
}

function unblockSubreddit(subredditName) {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPostsList'], function (result) {
		let list = result.hideBlockedSubredditPostsList || '';
		const subreddits = list
			?.split(',')
			?.map((s) => s.trim())
			?.filter((s) => s !== '');

		const index = subreddits.indexOf(subredditName);
		if (index > -1) {
			subreddits.splice(index, 1);
			const newList = subreddits.join(',');

			BROWSER_API.storage.sync.set({ hideBlockedSubredditPostsList: newList }, function () {
				updateSubredditList(newList);
				logToDevConsole('log', `Unblocked subreddit: ${subredditName}. Updated list: ${subredditList}`);
				document.querySelectorAll('.re-block-subreddit-btn').forEach((btn) => {
					if (btn.dataset.subreddit === subredditName) {
						btn.classList.remove('is-blocked');
						btn.title = 'Block subreddit';
					}
				});
				if (redditVersion === 'old') {
					enableHideBlockedSubredditPostsRV1();
				} else {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedSubredditPost);
				}
			});
		}
	});
}

// Enable Hide Blocked User Posts - RV1
function enableHideBlockedSubredditPostsRV1() {
	const pageSub = document.location.pathname.replace('/r/', '').replace('/', '') ?? '';
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const subredditName = post.dataset.subreddit;
		if (!subredditName) return;
		if (pageSub === subredditName) return;

		if (subredditList.some((word) => matchesPattern(subredditName, word))) {
			post.classList.add('re-hide');
		} else {
			post.classList.remove('re-hide');
		}
		addBlockButtonToSubredditRV1(post);
	});
}

function addBlockButtonToSubredditRV1(post) {
	if (!subredditList || post.querySelector('.re-block-subreddit-btn')) return;

	const subredditPrefixed = post.getAttribute('data-subreddit-prefixed') || '';
	const match = subredditPrefixed.match(/^r\/(.+)$/);
	const subredditName = match ? match[1] : '';
	if (!subredditName) return;

	const isBlocked = subredditList.some((pattern) => matchesPattern(subredditName, pattern));

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-block-subreddit-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	btn.title = isBlocked ? 'Unblock subreddit' : 'Block subreddit';
	btn.dataset.subreddit = subredditName;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const isBlocked = subredditList.some((pattern) => matchesPattern(subredditName, pattern));
		showBlockConfirmModal(subredditName, isBlocked);
	});

	const anchor = post.querySelector('.tagline a.subreddit');
	if (anchor) {
		anchor.insertAdjacentElement('afterend', btn);
	}
}

// Enable Hide Blocked User Posts - RV3
function filterBlockedSubredditPost(post) {
	if (document.querySelector('shreddit-app').getAttribute('pagetype') === 'community') return;
	if (post.classList.contains('re-hide')) return;

	const subredditName = post.querySelector('shreddit-post')?.getAttribute('subreddit-name');
	if (!subredditName) return;

	if (subredditList.some((word) => matchesPattern(subredditName, word))) {
		post.classList.add('re-hide');
	} else {
		post.classList.remove('re-hide');
	}
}

// Disable Hide Blocked User Posts - All
function disableHideBlockedSubredditPostsAll() {
	const existing = document.querySelector('.re-confirm-modal');
	if (existing) existing.remove();

	document.querySelectorAll('#siteTable > .thing, article.re-hide').forEach((post) => {
		post.classList.remove('re-hide');
	});
	document.querySelectorAll('shreddit-post .re-block-subreddit-btn, #siteTable > .thing .re-block-subreddit-btn').forEach((btn) => {
		btn.remove();
	});
}
