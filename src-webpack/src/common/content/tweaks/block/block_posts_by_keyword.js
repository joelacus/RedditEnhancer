/**
 * Tweaks: Block - Blocked Keyword Posts
 *
 * @name hideBlockedKeywordPosts
 * @description Hide all posts containing certain keywords in the title or content.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

//import { logToDevConsole } from '../../../utilities/logging';
import { matchesPattern } from '../../../utilities/block_pattern_match.js';
import { readBlocks, getPostTitleKeywordPatterns, getPostContentKeywordPatterns, BLOCK_STORE_KEY } from '../../../utilities/block_store.js';
import { registerMutationCallback } from '../../observer_manager';
import { acquireBlockFeedGuard, releaseBlockFeedGuard } from './block_feed_guard.js';
// Kept separate: a keyword scoped to the title must not match the body, and
// vice versa. Both lists are refreshed from the block store together.
let titleKeywordList = [];
let contentKeywordList = [];
let keywordFilteringActive = false;

// Re-filter when the block store changes elsewhere (e.g. Block Manager page).
BROWSER_API.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes[BLOCK_STORE_KEY] || !keywordFilteringActive) return;
	readBlocks().then((store) => {
		applyKeywordLists(store);
		// Re-scan both UIs: the RV1 re-scan re-runs the enable function, whose
		// else branches remove stale classes from unblocked posts.
		if (redditVersion === 'old') {
			enableHideBlockedKeywordPostsRV1();
		} else {
			document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
		}
	});
});

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts'], function (result) {
		if (result.hideBlockedKeywordPosts === true) hideBlockedKeywordPosts(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

function applyKeywordLists(store) {
	titleKeywordList = getPostTitleKeywordPatterns(store);
	contentKeywordList = getPostContentKeywordPatterns(store);
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideBlockedKeywordPosts(value) {
	keywordFilteringActive = value === true;
	if (value) acquireBlockFeedGuard('hideBlockedKeywordPosts');
	else releaseBlockFeedGuard('hideBlockedKeywordPosts');
	if (redditVersion === 'old') {
		if (value) {
			readBlocks().then((store) => {
				applyKeywordLists(store);
				//logToDevConsole('log', `Blocked Keywords List: ${titleKeywordList}`);
				enableHideBlockedKeywordPostsRV1();
			});
		} else {
			disableHideBlockedKeywordPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			readBlocks().then((store) => {
				applyKeywordLists(store);
				//logToDevConsole('log', `Blocked Keywords List: ${titleKeywordList}`);
				document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
				setTimeout(() => {
					document.querySelectorAll('article:has(>shreddit-post)').forEach(filterBlockedKeywordPost);
				}, 3000);
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
									// Body text often renders after the post shell, so
									// react to added paragraphs as well as whole posts.
									if (addedNode.nodeType === 1 && ['TIME', 'ARTICLE', 'DIV', 'SPAN', 'P'].includes(addedNode.nodeName)) {
										setTimeout(() => {
											if (addedNode) {
												filterBlockedKeywordPost(addedNode);
											}
										}, 1000);
									}
								});
							});
						},
						{ childList: true, subtree: true },
						'hideBlockedKeywordPosts',
					);
				}
			});
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			disableHideBlockedKeywordPostsAll();
		}
	}
}

// ─── Matching ───────────────────────────────────────────────────────────────

// Finds the element that carries the hide class. Feed posts are wrapped in an
// <article>; post pages only have the <shreddit-post> itself.
function resolvePostContainer(node) {
	if (!node || node.nodeType !== 1) return null;
	if (node.matches?.('article')) return node;
	const shredditPost = node.matches?.('shreddit-post') ? node : node.closest?.('shreddit-post');
	if (shredditPost) return shredditPost.closest('article') || shredditPost;
	return node.closest?.('article') || null;
}

function getPostTitleText(post) {
	// Reddit has used several title markups over time; try each known form.
	return post.querySelector('a[id^="post-title-"], a[data-testid="post-title-text"]')?.textContent || '';
}

// Only the post body is read, never the whole post element: author names,
// flairs, vote counts and other UI text must not trigger a content match.
function getPostContentText(post) {
	const container = post.querySelector('[slot="text-body"], [data-post-click-location="text-body"]');
	const markdown = container?.querySelector('.md, .feed-card-text-preview') || post.querySelector('.feed-card-text-preview');
	return (markdown || container)?.textContent || '';
}

function isPostBlocked(titleText, contentText) {
	return (titleText && titleKeywordList.some((word) => matchesPattern(titleText, word))) || (contentText && contentKeywordList.some((word) => matchesPattern(contentText, word)));
}

// ─── Filtering ──────────────────────────────────────────────────────────────

// Enable Hide Blocked Keyword Posts - RV1
function enableHideBlockedKeywordPostsRV1() {
	document.querySelectorAll('#siteTable > .thing').forEach((post) => {
		const titleText = post.querySelector('a.title')?.textContent || '';
		const contentText = post.querySelector('.expando .usertext-body, .usertext-body')?.textContent || '';
		post.classList.toggle('re-hide-keyword', !!isPostBlocked(titleText, contentText));
	});
}

// Enable Hide Blocked Keyword Posts - RV3
function filterBlockedKeywordPost(node) {
	const post = resolvePostContainer(node);
	if (!post) return;
	const blocked = isPostBlocked(getPostTitleText(post), getPostContentText(post));
	post.classList.toggle('re-hide-keyword', !!blocked);
}

// Disable Hide Blocked Keyword Posts - All
function disableHideBlockedKeywordPostsAll() {
	document.querySelectorAll('#siteTable > .thing, article.re-hide-keyword, shreddit-post.re-hide-keyword').forEach((post) => {
		post.classList.remove('re-hide-keyword');
	});
}
