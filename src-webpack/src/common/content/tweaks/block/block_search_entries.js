/**
 * Tweaks: Block - Blocked Search Entries
 *
 * @name hideBlockedSearchEntries
 * @description Hide blocked keywords, subreddits and users from the search bar
 * typeahead and the search results page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { readBlocks, getPostTitleKeywordPatterns, getPostContentKeywordPatterns, getCommentKeywordPatterns, getTextKeywordPatterns, getBlockedSubredditPatterns, getBlockedUserPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { registerMutationCallback } from '../../observer_manager';
import { waitForAddedNode } from '../../../content_first/functions/tweak_loaders/main_observer';

const SEARCH_HIDE_CLASS = 're-hide-search-blocked';
const SEARCH_SECTION_HIDE_CLASS = 're-hide-search-blocked-section';
const TYPEAHEAD_STYLE_ID = 're-hide-blocked-search-style';

const POST_SELECTOR = 'div[data-testid="search-post-unit"], div[data-testid="search-post-with-content-preview"]';
const COMMENT_SELECTOR = 'div[data-testid="search-sdui-comment-unit"]';
const COMMUNITY_SELECTOR = 'div[data-testid="search-community"]';
const PERSON_SELECTOR = 'div[data-testid="search-author"]';
const MEDIA_SELECTOR = 'search-media-feed > search-telemetry-tracker';
const QUERY_WRAPPER_SELECTOR = 'search-telemetry-tracker[data-testid="search-sdui-query-suggestion-wrapper"]';
const QUERY_LINK_SELECTOR = 'a[data-testid="search-sdui-query-suggestion"]';
const RESULT_SELECTOR = `${POST_SELECTOR}, ${COMMENT_SELECTOR}, ${COMMUNITY_SELECTOR}, ${PERSON_SELECTOR}, ${MEDIA_SELECTOR}, ${QUERY_WRAPPER_SELECTOR}, ${QUERY_LINK_SELECTOR}`;

let active = false;
let patterns = {
	title: [],
	content: [],
	comments: [],
	text: [],
	subreddits: [],
	users: [],
};

let typeaheadRoot = null;
let typeaheadObserver = null;
let typeaheadScanTimer = null;
let resultsObserverCleanup = null;
let resultsScanTimer = null;
let focusHandler = null;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !active) return;
	readBlocks().then((store) => {
		if (!active) return;
		applyPatterns(store);
		scanAll();
	});
});

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedSearchEntries() {
	BROWSER_API.storage.sync.get(['hideBlockedSearchEntries'], function (result) {
		// Always call, so a disabled toggle also cleans up after SPA navigation.
		hideBlockedSearchEntries(result.hideBlockedSearchEntries === true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedSearchEntries(value) {
	if (redditVersion !== 'newnew') return;

	if (value) {
		active = true;
		readBlocks().then((store) => {
			if (!active) return;
			applyPatterns(store);
			ensureTypeaheadObserver();
			if (isSearchPage()) attachResultsObserver();
			scanAll();
		});
		if (!focusHandler) {
			focusHandler = (event) => {
				if (!active) return;
				const host = document.querySelector('reddit-search-large');
				if (host && event.composedPath().includes(host)) ensureTypeaheadObserver();
			};
			document.addEventListener('focusin', focusHandler, true);
		}
	} else {
		disable();
	}
}

function disable() {
	active = false;
	detachResultsObserver();
	disconnectTypeaheadObserver();
	if (focusHandler) {
		document.removeEventListener('focusin', focusHandler, true);
		focusHandler = null;
	}
	document.querySelectorAll(`.${SEARCH_HIDE_CLASS}`).forEach((el) => el.classList.remove(SEARCH_HIDE_CLASS));
	document.querySelectorAll(`.${SEARCH_SECTION_HIDE_CLASS}`).forEach((el) => el.classList.remove(SEARCH_SECTION_HIDE_CLASS));
}

function applyPatterns(store) {
	patterns = {
		title: getPostTitleKeywordPatterns(store),
		content: getPostContentKeywordPatterns(store),
		comments: getCommentKeywordPatterns(store),
		text: getTextKeywordPatterns(store),
		subreddits: getBlockedSubredditPatterns(store),
		users: getBlockedUserPatterns(store),
	};
}

function scanAll() {
	scanTypeahead();
	scanResults();
}

// ─── Search Bar Typeahead ───────────────────────────────────────────────────

function ensureTypeaheadObserver() {
	if (!active) return;
	const host = document.querySelector('reddit-search-large');
	const root = host?.shadowRoot;
	if (!root) {
		waitForAddedNode({
			query: 'reddit-search-large',
			parent: document.body,
			recursive: true,
			shadowRoot: true,
			done: function () {
				if (active) attachTypeaheadObserver();
			},
		});
		return;
	}
	attachTypeaheadObserver(root);
}

function attachTypeaheadObserver(root = document.querySelector('reddit-search-large')?.shadowRoot) {
	if (!active || !root) return;
	if (typeaheadRoot === root && typeaheadObserver) {
		scanTypeahead();
		return;
	}
	disconnectTypeaheadObserver();
	typeaheadRoot = root;
	ensureTypeaheadStyle(root);
	typeaheadObserver = new MutationObserver(() => scheduleTypeaheadScan());
	typeaheadObserver.observe(root, { childList: true, subtree: true });
	scanTypeahead();
}

// Coalesce bursts without resetting the timer on every mutation: a page that
// mutates continuously would otherwise starve a trailing debounce forever.
function scheduleTypeaheadScan() {
	if (!active || typeaheadScanTimer) return;
	typeaheadScanTimer = setTimeout(() => {
		typeaheadScanTimer = null;
		scanTypeahead();
	}, 50);
}

function disconnectTypeaheadObserver() {
	if (typeaheadObserver) {
		typeaheadObserver.disconnect();
		typeaheadObserver = null;
	}
	clearTimeout(typeaheadScanTimer);
	typeaheadScanTimer = null;
	if (typeaheadRoot) {
		typeaheadRoot.querySelectorAll(`.${SEARCH_HIDE_CLASS}`).forEach((el) => el.classList.remove(SEARCH_HIDE_CLASS));
		typeaheadRoot.querySelector(`#${TYPEAHEAD_STYLE_ID}`)?.remove();
		typeaheadRoot = null;
	}
}

function ensureTypeaheadStyle(root) {
	if (root.querySelector(`#${TYPEAHEAD_STYLE_ID}`)) return;
	const style = document.createElement('style');
	style.id = TYPEAHEAD_STYLE_ID;
	style.textContent = `.${SEARCH_HIDE_CLASS} { display: none !important; }`;
	root.appendChild(style);
}

function scanTypeahead() {
	if (!active || !typeaheadRoot) return;
	const container = typeaheadRoot.querySelector('#reddit-typeahead-results-partial-container');
	if (!container) return;
	container.querySelectorAll('search-telemetry-tracker[data-type="search-dropdown-item"]').forEach((item) => {
		const info = getTypeaheadItemInfo(item);
		const blocked = info ? isTypeaheadItemBlocked(info) : false;
		item.classList.toggle(SEARCH_HIDE_CLASS, blocked);
	});
}

function getTypeaheadItemInfo(item) {
	const context = parseTrackingContext(item);
	const href = item.querySelector('a')?.getAttribute('href') || '';
	const type = context?.action_info?.type;

	if (type === 'subreddit' || (!type && href.startsWith('/r/'))) {
		const name = context?.subreddit?.name || getHrefName(href, /^\/r\/([^/]+)/);
		return name ? { kind: 'subreddit', value: name } : null;
	}
	if (type === 'query_suggestion' || type === 'search_history' || (!type && href.startsWith('/search/'))) {
		const text = context?.meta_search?.display_query || context?.meta_search?.raw_query || item.querySelector('li')?.textContent?.trim() || '';
		return text ? { kind: 'term', value: text } : null;
	}
	if (context?.profile?.name || context?.user?.name || href.startsWith('/user/') || href.startsWith('/u/')) {
		const name = context?.profile?.name || context?.user?.name || getHrefName(href, /^\/(?:user|u)\/([^/]+)/);
		return name ? { kind: 'user', value: name } : null;
	}
	return null;
}

function isTypeaheadItemBlocked(info) {
	if (info.kind === 'term') return matchesAny(info.value, patterns.text);
	if (info.kind === 'subreddit') return matchesAny(info.value, patterns.subreddits);
	if (info.kind === 'user') return matchesAny(info.value, patterns.users);
	return false;
}

// ─── Search Results Page ────────────────────────────────────────────────────

function attachResultsObserver() {
	detachResultsObserver();
	if (!active) return;
	const main = document.querySelector('main');
	const target = main?.parentElement || main || document.body;
	resultsObserverCleanup = registerMutationCallback(target, scheduleResultsScan, { childList: true, subtree: true }, 'hideBlockedSearchEntries');
}

function scheduleResultsScan() {
	if (!active || !isSearchPage() || resultsScanTimer) return;
	resultsScanTimer = setTimeout(() => {
		resultsScanTimer = null;
		scanResults();
	}, 150);
}

function detachResultsObserver() {
	if (resultsObserverCleanup) {
		resultsObserverCleanup();
		resultsObserverCleanup = null;
	}
	clearTimeout(resultsScanTimer);
	resultsScanTimer = null;
}

function scanResults() {
	if (!active || !isSearchPage()) return;

	const seen = new Set();
	const hide = (el, blocked) => {
		const wrapper = resolveResultWrapper(el);
		if (!wrapper || seen.has(wrapper)) return;
		seen.add(wrapper);
		wrapper.classList.toggle(SEARCH_HIDE_CLASS, blocked);
	};

	document.querySelectorAll(POST_SELECTOR).forEach((row) => {
		hide(row, isPostResultBlocked(row));
	});
	document.querySelectorAll(COMMENT_SELECTOR).forEach((row) => {
		hide(row, isCommentResultBlocked(row));
	});
	document.querySelectorAll(COMMUNITY_SELECTOR).forEach((card) => {
		const name = getCommunityName(card);
		hide(card, !!name && matchesAny(name, patterns.subreddits));
	});
	document.querySelectorAll(PERSON_SELECTOR).forEach((card) => {
		const name = getPersonName(card);
		hide(card, !!name && matchesAny(name, patterns.users));
	});
	document.querySelectorAll(MEDIA_SELECTOR).forEach((card) => {
		hide(card, isPostLikeBlocked(card, false));
	});
	document.querySelectorAll(QUERY_WRAPPER_SELECTOR).forEach((wrapper) => {
		const text = getQueryText(wrapper);
		hide(wrapper, !!text && matchesAny(text, patterns.text));
	});
	document.querySelectorAll(QUERY_LINK_SELECTOR).forEach((link) => {
		const text = getQueryText(link);
		hide(link, !!text && matchesAny(text, patterns.text));
	});

	collapseEmptySidebarSections();
	collapseEmptyPreviewHeaders();
	collapseResultDividers();
}

function isPostResultBlocked(row) {
	return isPostLikeBlocked(row, true);
}

function isPostLikeBlocked(el, includeSnippet) {
	const info = getResultInfo(el);
	if (info.subreddit && matchesAny(info.subreddit, patterns.subreddits)) return true;
	if (info.author && matchesAny(info.author, patterns.users)) return true;
	if (info.title && matchesAny(info.title, patterns.title)) return true;
	if (includeSnippet && info.snippet) {
		const snippetPatterns = info.snippetIsComment ? patterns.comments : patterns.content;
		if (matchesAny(info.snippet, snippetPatterns)) return true;
	}
	return false;
}

function isCommentResultBlocked(row) {
	const info = getResultInfo(row);
	if (info.subreddit && matchesAny(info.subreddit, patterns.subreddits)) return true;
	if (info.author && matchesAny(info.author, patterns.users)) return true;
	if (info.title && matchesAny(info.title, patterns.title)) return true;
	const body = getCommentBody(row) || info.snippet || '';
	return !!body && matchesAny(body, patterns.comments);
}

function getResultInfo(el) {
	const contexts = collectTrackingContexts(el);
	const info = { title: '', subreddit: '', author: '', snippet: '', snippetIsComment: false };

	for (const context of contexts) {
		if (!info.title && context.post?.title) info.title = context.post.title;
		if (!info.subreddit && context.subreddit?.name) info.subreddit = context.subreddit.name;
		if (!info.author) info.author = context.profile?.name || context.user?.name || '';
		if (!info.snippet && context.search?.snippet) {
			info.snippet = context.search.snippet;
			info.snippetIsComment = /^t1_/.test(context.search.snippet_id || '');
		}
	}

	if (!info.title) info.title = getPostTitle(el);
	if (!info.subreddit) info.subreddit = getCommunityName(el);
	if (!info.author) info.author = getAuthorName(el);
	if (!info.snippet) info.snippet = getPostSnippet(el);
	return info;
}

function collectTrackingContexts(el) {
	const trackers = [];
	if (el.matches?.('search-telemetry-tracker[data-faceplate-tracking-context]')) trackers.push(el);
	trackers.push(...el.querySelectorAll('search-telemetry-tracker[data-faceplate-tracking-context]'));
	const outer = el.closest?.('search-telemetry-tracker[data-faceplate-tracking-context]');
	if (outer && !trackers.includes(outer)) trackers.push(outer);

	const contexts = [];
	for (const tracker of trackers) {
		const context = parseTrackingContext(tracker);
		if (context) contexts.push(context);
	}
	return contexts;
}

function resolveResultWrapper(el) {
	if (!el) return null;
	if (el.matches('search-telemetry-tracker')) return el;
	let node = el;
	while (node.parentElement && node.parentElement.tagName === 'SEARCH-TELEMETRY-TRACKER') {
		node = node.parentElement;
	}
	return node;
}

// ─── Result Fields ──────────────────────────────────────────────────────────

function getPostTitle(el) {
	return el.querySelector('a[data-testid="post-title"], a[data-testid="post-title-text"], a[id^="post-title-"]')?.textContent?.trim() || '';
}

function getPostSnippet(el) {
	return el.querySelector('.feed-card-text-preview, [slot="text-body"]')?.textContent?.trim() || '';
}

function getCommentBody(el) {
	return (
		el.querySelector('[data-testid="search-comment-content"] shreddit-stop-propagation')?.textContent?.trim() ||
		el.querySelector('.i18n-search-comment-content')?.textContent?.trim() ||
		el.querySelector('[data-testid="search-comment-content"]')?.textContent?.trim() ||
		''
	);
}

function getCommunityName(el) {
	const href = el.querySelector('a[href^="/r/"]')?.getAttribute('href') || '';
	const fromHref = getHrefName(href, /^\/r\/([^/]+)/);
	if (fromHref) return fromHref;
	const text = el.querySelector('[data-testid="search-community-title"], span[id^="search-community-title-"]')?.textContent?.trim() || '';
	return stripPrefix(text, /^r\//i);
}

function getPersonName(el) {
	const href = el.querySelector('a[href^="/user/"], a[href^="/u/"]')?.getAttribute('href') || '';
	const fromHref = getHrefName(href, /^\/(?:user|u)\/([^/]+)/);
	if (fromHref) return fromHref;
	const label = el.querySelector('faceplate-hovercard[data-id="user-hover-card"]')?.getAttribute('label') || '';
	const fromLabel = stripPrefix(label.replace(/\s+details$/i, '').trim(), /^u\//i);
	if (fromLabel) return fromLabel;
	const text = el.querySelector('[data-testid="search-community-title"]')?.textContent?.trim() || '';
	return stripPrefix(text, /^u\//i);
}

function getAuthorName(el) {
	const label = el.querySelector('faceplate-hovercard[data-id="user-hover-card"]')?.getAttribute('label') || '';
	const fromLabel = stripPrefix(label.replace(/\s+details$/i, '').trim(), /^u\//i);
	if (fromLabel) return fromLabel;
	const href = el.querySelector('a[href^="/user/"], a[href^="/u/"]')?.getAttribute('href') || '';
	return getHrefName(href, /^\/(?:user|u)\/([^/]+)/);
}

function getQueryText(el) {
	const link = el.matches?.('a[data-testid="search-sdui-query-suggestion"]') ? el : el.querySelector('a[data-testid="search-sdui-query-suggestion"]');
	return link?.textContent?.trim() || el.textContent?.trim() || '';
}

// ─── Empty Section Cleanup ──────────────────────────────────────────────────

function collapseEmptySidebarSections() {
	const sidebar = document.querySelector('#right-sidebar-contents');
	if (!sidebar) return;
	sidebar.querySelectorAll('section').forEach((section) => {
		const cards = section.querySelectorAll(`${COMMUNITY_SELECTOR}, ${PERSON_SELECTOR}, ${QUERY_WRAPPER_SELECTOR}, ${QUERY_LINK_SELECTOR}`);
		if (!cards.length) {
			section.classList.remove(SEARCH_SECTION_HIDE_CLASS);
			return;
		}
		const anyVisible = [...cards].some((card) => {
			const wrapper = resolveResultWrapper(card);
			return wrapper && !wrapper.classList.contains(SEARCH_HIDE_CLASS);
		});
		section.classList.toggle(SEARCH_SECTION_HIDE_CLASS, !anyVisible);
	});
}

function collapseEmptyPreviewHeaders() {
	document.querySelectorAll('a[data-testid="all-header"]').forEach((link) => {
		const header = getPreviewHeaderRow(link);
		if (!header) return;
		let node = header.nextElementSibling;
		let resultCount = 0;
		let visibleCount = 0;
		while (node && !node.querySelector('a[data-testid="all-header"]')) {
			const wrappers = getResultWrappersIn(node);
			resultCount += wrappers.length;
			visibleCount += wrappers.filter((wrapper) => !wrapper.classList.contains(SEARCH_HIDE_CLASS)).length;
			node = node.nextElementSibling;
		}
		header.classList.toggle(SEARCH_HIDE_CLASS, resultCount > 0 && visibleCount === 0);
	});
}

// The "See more" link is nested a different number of levels deep depending on
// the section, so walk up to the row that is a direct child of the results
// container (the row that holds the section title and the link).
function getPreviewHeaderRow(link) {
	let node = link;
	while (node.parentElement) {
		const parent = node.parentElement;
		const headerChildren = [...parent.children].filter((child) => child.querySelector('a[data-testid="all-header"]'));
		const hasResultSiblings = [...parent.children].some((child) => child.matches('search-telemetry-tracker, hr, faceplate-partial') && !child.contains(link));
		if (headerChildren.length > 1 || hasResultSiblings) return node;
		node = parent;
	}
	return link.closest('div');
}

// Each hidden result leaves its divider line behind in the All tab, so hide a
// divider when either result beside it is hidden. Scan every divider under the
// results container so an unblocked result also restores its divider.
function collapseResultDividers() {
	document.querySelectorAll('main hr').forEach((divider) => {
		const prev = divider.previousElementSibling;
		const next = divider.nextElementSibling;
		const hide = prev?.classList?.contains(SEARCH_HIDE_CLASS) || next?.classList?.contains(SEARCH_HIDE_CLASS);
		divider.classList.toggle(SEARCH_HIDE_CLASS, !!hide);
	});
}

function getResultWrappersIn(node) {
	const wrappers = new Set();
	if (node.matches?.(RESULT_SELECTOR)) {
		const wrapper = resolveResultWrapper(node);
		if (wrapper) wrappers.add(wrapper);
	}
	node.querySelectorAll?.(RESULT_SELECTOR).forEach((el) => {
		const wrapper = resolveResultWrapper(el);
		if (wrapper) wrappers.add(wrapper);
	});
	return [...wrappers];
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function isSearchPage() {
	return location.pathname === '/search' || location.pathname.startsWith('/search/');
}

function parseTrackingContext(el) {
	const raw = el?.getAttribute?.('data-faceplate-tracking-context');
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function getHrefName(href, regex) {
	const match = (href || '').match(regex);
	return match ? decodeURIComponent(match[1]) : '';
}

function stripPrefix(text, regex) {
	return (text || '').replace(regex, '').trim();
}

function matchesAny(value, list) {
	return !!value && list.some((pattern) => matchesPattern(value, pattern));
}
