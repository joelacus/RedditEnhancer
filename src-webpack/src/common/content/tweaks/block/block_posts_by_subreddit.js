/**
 * Tweaks: Block - Blocked Subreddit Posts
 *
 * @name hideBlockedSubredditPosts
 * @description Hide posts and block post/comment pages from certain subreddits, optionally blocking their subreddit pages.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { logToDevConsole } from '../../../utilities/logging';
import { readBlocks, writeBlocks, getBlockedSubredditPatterns, addSubredditBlock, removeSubredditBlock, findKey, normaliseSubredditEntry, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { showToast } from '../../../utilities/toast_notification.js';
import { registerMutationCallback } from '../../observer_manager';
import { acquireBlockFeedGuard, releaseBlockFeedGuard } from './block_feed_guard.js';
import { escapeHtml } from '../../../utilities/escape_html.js';
import { parseHtmlString } from '../../../utilities/parse_html_string.js';
import { debounce } from '../../../utilities/debounce.js';
import { checkBlockedSubredditPage, getSubredditFromPath } from '../../../content_first/functions/block_subreddit_page.js';
import { loadHideBlockedSubredditRecent, setHideBlockedSubredditRecent } from './block_subreddit_recent.js';

// Posts-scoped patterns: used by the feed filters.
let subredditList = [];
// Every entry with at least one scope on: used for the block button state.
let blockedSubredditList = [];
let subredditFilteringActive = false;

function refreshLists(store) {
	subredditList = getBlockedSubredditPatterns(store, 'posts');
	blockedSubredditList = getBlockedSubredditPatterns(store);
}

function updateAllSubredditButtons() {
	document.querySelectorAll('.re-block-subreddit-btn').forEach((btn) => {
		const subredditName = btn.dataset.subreddit;
		if (!subredditName) return;
		const isBlocked = blockedSubredditList.some((pattern) => matchesPattern(subredditName, pattern));
		btn.classList.toggle('is-blocked', isBlocked);
		btn.title = isBlocked ? 'Unblock subreddit' : 'Block subreddit';
		btn.setAttribute('aria-label', btn.title);
	});
}

// Adds the block icon next to the subreddit page's masthead heading.
function addBlockButtonToMasthead(patterns = blockedSubredditList) {
	if (redditVersion !== 'newnew') return;

	const mastheadHeading = document.querySelector('subreddit-feed-masthead h1');
	const isCommunityPage = document.querySelector('shreddit-app')?.getAttribute('pagetype') === 'community';
	const heading = mastheadHeading || (isCommunityPage ? document.querySelector('div.masthead h1') : null);
	if (!heading) return;
	const subredditName = getSubredditFromPath();
	if (!subredditName) return;

	let btn = heading.querySelector('.re-block-subreddit-masthead-btn');
	if (!btn) {
		btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 're-block-subreddit-btn re-block-subreddit-masthead-btn icon-block';
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			const name = btn.dataset.subreddit;
			if (name) showBlockSubredditModal(name);
		});
		heading.appendChild(btn);
	}

	btn.dataset.subreddit = subredditName;
	const isBlocked = patterns.some((pattern) => matchesPattern(subredditName, pattern));
	btn.classList.toggle('is-blocked', isBlocked);
	btn.title = isBlocked ? 'Unblock subreddit' : 'Block subreddit';
	btn.setAttribute('aria-label', btn.title);
}

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !subredditFilteringActive) return;
	readBlocks().then((store) => {
		refreshLists(store);
		updateAllSubredditButtons();
		scanPage();
	});
});

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedSubredditPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], function (result) {
		if (result.hideBlockedSubredditPosts === true) hideBlockedSubredditPosts(true);
	});
	// The recent side-menu section is a separate v3 tweak; it reads the same flag.
	loadHideBlockedSubredditRecent();
}

export function loadBlockedSubredditMastheadButton() {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], function (result) {
		if (result.hideBlockedSubredditPosts !== true) return;
		readBlocks().then((store) => {
			if (subredditFilteringActive) {
				refreshLists(store);
				updateAllSubredditButtons();
			}
			addBlockButtonToMasthead(getBlockedSubredditPatterns(store));
		});
	});
}

// Store cleanup function for the observer
let observerCleanup = null;
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedSubredditPosts(value) {
	subredditFilteringActive = value === true;
	if (value) acquireBlockFeedGuard('hideBlockedSubredditPosts');
	else releaseBlockFeedGuard('hideBlockedSubredditPosts');
	setHideBlockedSubredditRecent(value === true);
	if (value) checkBlockedSubredditPage();

	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				refreshLists(store);
				updateAllSubredditButtons();
				enableHideBlockedSubredditPostsRV1();
			});
		} else {
			disableHideBlockedSubredditPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				refreshLists(store);
				updateAllSubredditButtons();
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

// In-memory pattern list, refreshed from the block store on load and on every block/unblock action.

function scanPage() {
	// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
	// else branch removes stale classes from unblocked posts.
	addBlockButtonToMasthead();
	if (redditVersion === 'old') {
		enableHideBlockedSubredditPostsRV1();
		return;
	}
	document.querySelectorAll('article:has(>shreddit-post)').forEach((post) => {
		const subredditLink = post.querySelector('shreddit-post a[data-testid="subreddit-name"]');
		filterBlockedSubredditPost(post);
		if (subredditLink) addBlockButtonToSubreddit(post, subredditLink);
	});
}

function addBlockButtonToSubreddit(post, subredditLink) {
	if (!blockedSubredditList || post.querySelector('.re-block-subreddit-btn')) return;

	const href = subredditLink.getAttribute('href') || '';
	const match = href.match(/\/r\/([^/]+)/);
	const subredditName = match ? match[1] : '';
	if (!subredditName) return;

	const isBlocked = blockedSubredditList.some((pattern) => matchesPattern(subredditName, pattern));

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-block-subreddit-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	btn.title = isBlocked ? 'Unblock subreddit' : 'Block subreddit';
	btn.dataset.subreddit = subredditName;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		showBlockSubredditModal(subredditName);
	});

	subredditLink.insertAdjacentElement('afterend', btn);
}

let modalOpening = false;

async function showBlockSubredditModal(subredditName) {
	// Read the saved scopes before rendering: the checkbox state must be
	// correct from the first paint, and Save must never race the storage read.
	if (modalOpening) return;
	modalOpening = true;
	const existing = document.querySelector('.re-confirm-modal');
	if (existing) existing.remove();

	let scopes = { posts: true, page: true };
	try {
		const store = await readBlocks();
		const key = findKey(store.subreddits, subredditName);
		if (key) scopes = normaliseSubredditEntry(store.subreddits[key]);
	} catch (e) {
		modalOpening = false;
		console.error('[RedditEnhancer] Could not open the subreddit block dialogue:', e);
		showToast('error', 'Could not read the block list.');
		return;
	}
	modalOpening = false;

	const modal = document.createElement('div');
	modal.className = 're-confirm-modal';
	modal.append(
		parseHtmlString(`
		<div class="re-modal-content">
			<p>Subreddit block: <strong>r/${escapeHtml(subredditName)}</strong></p>
			<label><input type="checkbox" class="re-scope-posts" ${scopes.posts ? 'checked' : ''} /> Hide its posts and block post/comment pages</label>
			<label><input type="checkbox" class="re-scope-page" ${scopes.page ? 'checked' : ''} /> Block its subreddit pages</label>
			<div class="re-modal-actions">
				<div>
					<button class="btn red btn-confirm-block" type="button">Save</button>
					<button class="btn btn-cancel" type="button">Cancel</button>
				</div>
			</div>
		</div>`),
	);

	document.body.appendChild(modal);

	let escHandler = null;
	const closeModal = () => {
		modal.remove();
		if (escHandler) document.removeEventListener('keydown', escHandler);
	};
	modal.querySelector('.btn-cancel').addEventListener('click', closeModal);
	modal.querySelector('.btn-confirm-block').addEventListener('click', async (e) => {
		e.target.disabled = true;
		await applySubredditBlock(subredditName, modal.querySelector('.re-scope-posts').checked, modal.querySelector('.re-scope-page').checked);
		closeModal();
	});
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});

	escHandler = (e) => {
		if (e.key === 'Escape') closeModal();
	};
	document.addEventListener('keydown', escHandler);
}

async function applySubredditBlock(subredditName, wantPosts, wantPage) {
	const store = await readBlocks();
	if (wantPosts) addSubredditBlock(store, subredditName, 'posts');
	else removeSubredditBlock(store, subredditName, 'posts');
	if (wantPage) addSubredditBlock(store, subredditName, 'page');
	else removeSubredditBlock(store, subredditName, 'page');

	const result = await writeBlocks(store);
	if (!result.ok) {
		showToast('error', 'Could not save the block list (storage is full).');
		return;
	}

	refreshLists(store);
	logToDevConsole('log', `Updated block scopes for subreddit: ${subredditName}`);
	updateAllSubredditButtons();

	if (redditVersion === 'old') {
		enableHideBlockedSubredditPostsRV1();
	} else {
		scanPage();
	}

	// A saved scope can make the current URL blocked (Page on its own page,
	// Posts on a post/comment page), so re-check after every save.
	checkBlockedSubredditPage();
}

// Enable Hide Blocked Subreddit Posts - RV1
function enableHideBlockedSubredditPostsRV1() {
	const pageSub = document.location.pathname.replace('/r/', '').replace('/', '') ?? '';
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const subredditName = post.dataset.subreddit;
		if (!subredditName) return;
		if (pageSub === subredditName) return;

		if (subredditList.some((word) => matchesPattern(subredditName, word))) {
			post.classList.add('re-hide-subreddit');
		} else {
			post.classList.remove('re-hide-subreddit');
		}
		addBlockButtonToSubredditRV1(post);
	});
}

function addBlockButtonToSubredditRV1(post) {
	if (!blockedSubredditList || post.querySelector('.re-block-subreddit-btn')) return;

	const subredditPrefixed = post.getAttribute('data-subreddit-prefixed') || '';
	const match = subredditPrefixed.match(/^r\/(.+)$/);
	const subredditName = match ? match[1] : '';
	if (!subredditName) return;

	const isBlocked = blockedSubredditList.some((pattern) => matchesPattern(subredditName, pattern));

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 're-block-subreddit-btn icon-block' + (isBlocked ? ' is-blocked' : '');
	btn.title = isBlocked ? 'Unblock subreddit' : 'Block subreddit';
	btn.dataset.subreddit = subredditName;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		showBlockSubredditModal(subredditName);
	});

	const anchor = post.querySelector('.tagline a.subreddit');
	if (anchor) {
		anchor.insertAdjacentElement('afterend', btn);
	}
}

// Enable Hide Blocked Subreddit Posts - RV3
function filterBlockedSubredditPost(post) {
	if (document.querySelector('shreddit-app')?.getAttribute('pagetype') === 'community') return;

	const subredditName = post.querySelector('shreddit-post')?.getAttribute('subreddit-name');
	if (!subredditName) return;

	if (subredditList.some((word) => matchesPattern(subredditName, word))) {
		post.classList.add('re-hide-subreddit');
	} else {
		post.classList.remove('re-hide-subreddit');
	}
}

// Disable Hide Blocked Subreddit Posts - All
function disableHideBlockedSubredditPostsAll() {
	const existing = document.querySelector('.re-confirm-modal');
	if (existing) existing.remove();

	document.querySelectorAll('#siteTable > .thing, article.re-hide-subreddit').forEach((post) => {
		post.classList.remove('re-hide-subreddit');
	});
	document.querySelectorAll('shreddit-post .re-block-subreddit-btn, #siteTable > .thing .re-block-subreddit-btn, .re-block-subreddit-masthead-btn').forEach((btn) => {
		btn.remove();
	});
}
