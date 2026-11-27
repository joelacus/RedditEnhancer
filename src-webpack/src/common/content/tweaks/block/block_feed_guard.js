/**
 * Tweaks: Block - Feed Reload Guard
 *
 * @name blockFeedGuard
 * @description Stops the RV3 feed reloading forever when the block filters hide
 *              every post in it. Reddit's next-page partial fetches another page
 *              whenever it is in the viewport; with no visible posts the partial
 *              never leaves the viewport, so each fetched page immediately
 *              triggers the next. After two auto-loaded pages add no visible
 *              posts, the partial is paused and a notice offers one more page or
 *              the Block Manager.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import i18next from 'i18next';
import { registerMutationCallback } from '../../observer_manager';

const BLOCK_CLASS_SELECTOR = '.re-hide-subreddit, .re-hide-user, .re-hide-keyword, .re-hide-url';
const BLOCK_CLASS_PATTERN = /\bre-hide-(?:subreddit|user|keyword|url)\b/;
const EMPTY_BATCH_LIMIT = 2;
const BATCH_MIN_POSTS = 3;
const BATCH_ADD_DEBOUNCE_MS = 300;
const BATCH_MAX_WAIT_MS = 1200;
const BATCH_SETTLE_MS = 1600;
const VISIBLE_SETTLE_MS = 4000;
const INITIAL_PAGE_MS = 3000;
const RESUME_TIMEOUT_MS = 8000;
const BIND_RETRY_MS = 500;
const BIND_RETRY_LIMIT = 10;
const DOCUMENT_DEBOUNCE_MS = 500;

// The four post filters share the guard. It stops when the last one is turned
// off, and keeps running when only one of several is turned off.
const activeTweaks = new Set();

let feed = null;
let boundUrl = '';
let observerCleanup = null;
let documentCleanup = null;
let notice = null;
let paused = false;
let emptyBatches = 0;
let initialPagePending = false;
let batchQueue = [];
let pendingAddedContainers = new Set();
let batchAddTimer = null;
let batchAddDeadline = null;
let resumeTimer = null;
let initialPageTimer = null;
let bindTimer = null;
let bindAttempts = 0;

// ─── Public API ─────────────────────────────────────────────────────────────

export function acquireBlockFeedGuard(tweakName) {
	activeTweaks.add(tweakName);
	if (redditVersion !== 'newnew') return;

	if (!documentCleanup) {
		documentCleanup = registerMutationCallback(
			document.body,
			() => {
				if (activeTweaks.size === 0 || (feed && feed.isConnected)) return;
				// Do not spin the retry loop on post pages, which have no feed.
				if (!document.querySelector('shreddit-feed')) return;
				bindAttempts = 0;
				bindFeed();
			},
			{ childList: true, subtree: true },
			'blockFeedGuardDocument',
			DOCUMENT_DEBOUNCE_MS,
		);
	}

	// SPA navigation can reuse the feed element; do not carry a pause from the
	// previous page into the new one.
	if (feed && feed.isConnected && boundUrl !== location.href) {
		resetGuard();
		feed = null;
	}

	if (!feed || !feed.isConnected) {
		bindAttempts = 0;
		// On a post page there is no feed; the document observer binds one when
		// (or if) a feed appears after an SPA navigation.
		if (document.querySelector('shreddit-feed')) bindFeed();
	}
}

export function releaseBlockFeedGuard(tweakName) {
	activeTweaks.delete(tweakName);
	if (activeTweaks.size === 0) stopGuard();
}

// ─── Bind / Unbind ──────────────────────────────────────────────────────────

function bindFeed() {
	clearTimeout(bindTimer);
	bindTimer = null;
	const currentFeed = document.querySelector('shreddit-feed');
	if (!currentFeed) {
		if (bindAttempts < BIND_RETRY_LIMIT) {
			bindAttempts++;
			bindTimer = setTimeout(bindFeed, BIND_RETRY_MS);
		}
		return;
	}
	bindAttempts = 0;
	if (currentFeed === feed && observerCleanup) return;

	resetGuard();
	feed = currentFeed;
	boundUrl = location.href;
	observerCleanup = registerMutationCallback(
		feed,
		onFeedMutations,
		{
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['class'],
			attributeOldValue: true,
		},
		'blockFeedGuard',
	);
	// An empty feed is about to receive its initial page, not an auto-loaded
	// one. Give that render a window so its chunks are not counted as batches.
	if (getPostContainers().length === 0) {
		initialPagePending = true;
		initialPageTimer = setTimeout(() => {
			initialPageTimer = null;
			initialPagePending = false;
		}, INITIAL_PAGE_MS);
	}
}

function stopGuard() {
	clearTimeout(bindTimer);
	bindTimer = null;
	bindAttempts = 0;
	if (documentCleanup) {
		documentCleanup();
		documentCleanup = null;
	}
	resetGuard();
	feed = null;
}

function resetGuard() {
	clearTimeout(batchAddTimer);
	clearTimeout(resumeTimer);
	clearTimeout(initialPageTimer);
	batchAddTimer = null;
	resumeTimer = null;
	initialPageTimer = null;
	clearBatchQueue();
	if (observerCleanup) {
		observerCleanup();
		observerCleanup = null;
	}
	removePauseClass();
	removeNotice();
	paused = false;
	emptyBatches = 0;
	initialPagePending = false;
	boundUrl = '';
}

// ─── Feed Watching ──────────────────────────────────────────────────────────

function onFeedMutations(mutations) {
	let addedPosts = 0;
	let blockClassRemoved = false;

	for (const mutation of mutations) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName !== 'class') continue;
			const oldHadBlock = BLOCK_CLASS_PATTERN.test(mutation.oldValue || '');
			const nowHasBlock = mutation.target.matches?.(BLOCK_CLASS_SELECTOR) ?? false;
			if (oldHadBlock && !nowHasBlock) blockClassRemoved = true;
			continue;
		}
		if (mutation.type !== 'childList') continue;
		for (const node of mutation.addedNodes) {
			if (node.nodeType !== 1) continue;
			if (node.matches?.('shreddit-post')) {
				pendingAddedContainers.add(node.closest('article') ?? node);
				addedPosts++;
			} else {
				const posts = node.querySelectorAll?.('shreddit-post') ?? [];
				posts.forEach((post) => pendingAddedContainers.add(post.closest('article') ?? post));
				addedPosts += posts.length;
			}
		}
	}

	// Reddit can replace the next-page partial; keep it hidden while paused.
	if (paused) ensurePaused();
	if (blockClassRemoved) onBlockUnhidden();

	if (addedPosts > 0) {
		// Reddit may append a page in several chunks. A real page is ~25 posts;
		// a re-render adds one or two, which must not count as a page.
		clearTimeout(batchAddTimer);
		batchAddTimer = setTimeout(flushAddedPosts, BATCH_ADD_DEBOUNCE_MS);
		// A very fast feed can append pages faster than the debounce, which
		// would keep pushing the flush back forever. Cap the wait so even a
		// continuous stream is classified in chunks.
		if (!batchAddDeadline) {
			batchAddDeadline = setTimeout(flushAddedPosts, BATCH_MAX_WAIT_MS);
		}
	}
}

function flushAddedPosts() {
	clearTimeout(batchAddTimer);
	clearTimeout(batchAddDeadline);
	batchAddTimer = null;
	batchAddDeadline = null;
	const containers = pendingAddedContainers;
	pendingAddedContainers = new Set();

	// The initial page is not an auto-loaded batch.
	if (initialPagePending) return;
	if (containers.size < BATCH_MIN_POSTS) return;

	// Each page is judged on its own posts. A single settle timer would be
	// reset by the next page and could never fire while the feed loops fast.
	const batch = { containers, timer: null, visibleTimer: null };
	batch.timer = setTimeout(() => classifyBatch(batch), BATCH_SETTLE_MS);
	batchQueue.push(batch);
}

function onBlockUnhidden() {
	if (initialPagePending) return;
	if (isFeedCollapsed()) return;
	// A post is visible again (e.g. a block was removed), so the run of empty
	// pages is over. Hiding a post must not reset the counter here: the filters
	// hide a page over ~1s, which would wipe the previous page's count.
	emptyBatches = 0;
	if (paused) unpause();
}

function classifyBatch(batch) {
	batch.timer = null;
	if (!batchQueue.includes(batch)) return;
	if (!batchHasConnected(batch)) {
		removeBatch(batch);
		return;
	}
	if (batchHasVisible(batch)) {
		// A post can be hidden when its body renders seconds later, so give the
		// batch the longer window before deciding it had a visible post.
		batch.visibleTimer = setTimeout(() => settleBatch(batch), VISIBLE_SETTLE_MS);
		return;
	}
	removeBatch(batch);
	recordEmptyBatch();
}

function settleBatch(batch) {
	batch.visibleTimer = null;
	if (!batchQueue.includes(batch)) return;
	if (!batchHasConnected(batch)) {
		removeBatch(batch);
		return;
	}
	const visible = batchHasVisible(batch);
	removeBatch(batch);
	if (visible) recordVisibleBatch();
	else recordEmptyBatch();
}

function recordEmptyBatch() {
	emptyBatches++;
	// Only pause when the whole feed is hidden; a visible post from another
	// page means normal infinite scroll is still doing its job.
	if (emptyBatches >= EMPTY_BATCH_LIMIT && isFeedCollapsed()) {
		pause();
	} else if (paused) {
		ensurePaused();
	}
}

function recordVisibleBatch() {
	emptyBatches = 0;
	if (paused) unpause();
}

function batchHasConnected(batch) {
	for (const container of batch.containers) {
		if (container.isConnected) return true;
	}
	return false;
}

function batchHasVisible(batch) {
	for (const container of batch.containers) {
		if (container.isConnected && container.getBoundingClientRect().height > 0) return true;
	}
	return false;
}

function removeBatch(batch) {
	clearTimeout(batch.timer);
	clearTimeout(batch.visibleTimer);
	batch.timer = null;
	batch.visibleTimer = null;
	batchQueue = batchQueue.filter((entry) => entry !== batch);
}

function clearBatchQueue() {
	for (const batch of batchQueue) {
		clearTimeout(batch.timer);
		clearTimeout(batch.visibleTimer);
	}
	batchQueue = [];
	pendingAddedContainers = new Set();
	clearTimeout(batchAddTimer);
	clearTimeout(batchAddDeadline);
	batchAddTimer = null;
	batchAddDeadline = null;
}

function isFeedCollapsed() {
	if (!feed || !feed.isConnected) return false;
	if (!feed.querySelector(BLOCK_CLASS_SELECTOR)) return false;
	const containers = getPostContainers();
	if (containers.length === 0) return false;
	return !containers.some((container) => container.getBoundingClientRect().height > 0);
}

// ─── Pause / Resume ─────────────────────────────────────────────────────────

function pause() {
	paused = true;
	clearTimeout(resumeTimer);
	resumeTimer = null;
	ensurePaused();
}

function ensurePaused() {
	const partial = getPartial();
	// classList.add() rewrites the attribute even when the token is already
	// present, which would retrigger the feed observer from inside its own
	// callback. Only touch the DOM when the class is actually missing.
	if (partial && !partial.classList.contains('re-feed-blocked-pause')) {
		partial.classList.add('re-feed-blocked-pause');
	}
	ensureNotice();
}

function unpause() {
	paused = false;
	// A visible post breaks the run of empty pages, so the next collapse gets
	// the full grace again.
	emptyBatches = 0;
	clearTimeout(resumeTimer);
	resumeTimer = null;
	removePauseClass();
	removeNotice();
}

function onLoadMore() {
	if (!paused) return;
	paused = false;
	// One click buys one page: the next empty batch reaches the limit again.
	emptyBatches = EMPTY_BATCH_LIMIT - 1;
	// Drop any batch still settling from before the pause; it must not count
	// against the page the user just asked for.
	clearBatchQueue();
	removePauseClass();
	removeNotice();
	clearTimeout(resumeTimer);
	resumeTimer = setTimeout(() => {
		resumeTimer = null;
		if (isFeedCollapsed()) {
			emptyBatches = EMPTY_BATCH_LIMIT;
			pause();
		}
	}, RESUME_TIMEOUT_MS);
}

// ─── Notice ─────────────────────────────────────────────────────────────────

function ensureNotice() {
	if (!feed) return;
	const partial = getPartial();

	if (notice?.isConnected) {
		const hasLoadMore = !!notice.querySelector('.re-feed-blocked-load-more');
		if (hasLoadMore === !!partial) {
			positionNotice(partial);
			return;
		}
		removeNotice();
	}

	notice = document.createElement('div');
	notice.className = 're-feed-blocked-notice';
	notice.setAttribute('role', 'status');

	const message = document.createElement('p');
	message.textContent = i18next.t('BlockFeedAllHidden.message');
	notice.appendChild(message);

	if (partial) {
		const loadMore = document.createElement('button');
		loadMore.type = 'button';
		loadMore.className = 're-feed-blocked-load-more';
		loadMore.textContent = i18next.t('BlockFeedLoadMore.message');
		loadMore.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			onLoadMore();
		});
		notice.appendChild(loadMore);
	}

	const manage = document.createElement('button');
	manage.type = 'button';
	manage.className = 're-feed-blocked-manage';
	manage.textContent = i18next.t('ManageBlocks.message');
	manage.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		BROWSER_API.runtime.sendMessage({ openBlockManager: true });
	});
	notice.appendChild(manage);

	positionNotice(partial);
}

function positionNotice(partial) {
	if (!notice || !feed) return;
	if (partial?.parentElement) {
		if (notice.parentElement !== partial.parentElement || notice.nextElementSibling !== partial) {
			partial.parentElement.insertBefore(notice, partial);
		}
		return;
	}
	if (!notice.isConnected) feed.appendChild(notice);
}

function removeNotice() {
	if (!notice) return;
	notice.remove();
	notice = null;
}

function removePauseClass() {
	document.querySelectorAll('.re-feed-blocked-pause').forEach((el) => el.classList.remove('re-feed-blocked-pause'));
}

// ─── DOM Helpers ────────────────────────────────────────────────────────────

function getPartial() {
	if (!feed) return null;
	const byId = feed.querySelector('#feed-next-page-partial') || document.querySelector('#feed-next-page-partial');
	if (byId) return byId;
	// Prefer a feed-level partial; a post can contain its own load-after partial
	// (e.g. a comment preview), which must not be hidden.
	for (const partial of feed.querySelectorAll('faceplate-partial[slot="load-after"]')) {
		if (!partial.closest('article')) return partial;
	}
	return null;
}

function getPostContainers() {
	if (!feed) return [];
	const containers = new Set();
	feed.querySelectorAll('shreddit-post').forEach((post) => {
		containers.add(post.closest('article') ?? post);
	});
	return [...containers];
}
