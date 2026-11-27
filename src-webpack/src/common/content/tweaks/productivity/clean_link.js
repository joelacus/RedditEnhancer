/**
 * Tweaks: Productivity - Clean Link
 *
 * @name cleanLink
 * @description Add a share option to copy post/comment links without parameters, optionally shortened to redd.it format.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import i18next from 'i18next';
import { registerMutationCallback } from '../../observer_manager';
import { showToast } from '../../../utilities/toast_notification';

// ─── State ──────────────────────────────────────────────────────────────────

let cleanLinkEnabled = false;
let shortenCleanLinkEnabled = false;

// Observer/listener cleanup handles
let cleanLinkRV3Cleanup = null;
let observerCleanupOld = null;

// Share menu items injected into the v3 UI, kept so they can be updated or removed
const injectedMenuItems = new Set();

// Dropdowns waiting for their menu to render, mapped to their cleanup function
const pendingDropdowns = new Map();

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadCleanLink() {
	BROWSER_API.storage.sync.get(['cleanLink', 'shortenCleanLink'], function (result) {
		cleanLinkEnabled = result.cleanLink === true;
		shortenCleanLinkEnabled = result.shortenCleanLink === true;
		if (cleanLinkEnabled) {
			cleanLink(true);
		} else {
			cleanLink(false);
		}
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function cleanLink(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed', 'post_page', 'comments_page', 'global_serp', 'community_serp', 'custom_feed_serp'];
	// Every profile tab (overview, posts, comments, saved, ...) uses a "profile_" route
	const isSupportedRouteV3 = feedRoutesv3.includes(routeName) || routeName?.startsWith('profile_');
	if (value) {
		if (redditVersion === 'newnew') {
			if (isSupportedRouteV3) enableCleanLinkRV3();
		} else if (redditVersion === 'old') {
			enableCleanLinkRV1();
		}
	} else {
		disableCleanLinkAll();
	}
}

// Called when the shorten sub-option changes while the feature is active
export function shortenCleanLink(value) {
	shortenCleanLinkEnabled = value === true;
	// Update the label on any RV3 share menu items that are still in the page
	injectedMenuItems.forEach((item) => {
		if (!item.isConnected) {
			injectedMenuItems.delete(item);
			return;
		}
		updateMenuItemLabel(item);
	});
	// Update any existing old UI share inputs
	document.querySelectorAll('.post-sharing.re-clean-link-modified input.post-sharing-link-input').forEach((input) => {
		input.value = cleanUrl(input.value, shortenCleanLinkEnabled);
	});
}

// ─── Helper: Clean URL ──────────────────────────────────────────────────────

function cleanUrl(url, shorten) {
	try {
		const parsed = new URL(url);
		// Remove query and hash
		parsed.search = '';
		parsed.hash = '';
		if (shorten) {
			const segments = parsed.pathname.split('/').filter((s) => s !== '');
			// Find the 'comments' segment
			const commentsIdx = segments.indexOf('comments');
			if (commentsIdx !== -1 && commentsIdx + 1 < segments.length) {
				const postId = segments[commentsIdx + 1];
				// After 'comments' we have: postId, optional slug, possibly commentId etc.
				// A post permalink has at most ONE non-empty segment after postId (the slug/title)
				// A comment permalink has at least TWO segments after postId (slug + commentId or commentId only)
				const afterPostId = segments.slice(commentsIdx + 2);
				// Treat as a post URL if afterPostId is empty (no slug) OR has exactly 1 segment (slug/title)
				if (afterPostId.length <= 1) {
					return `https://redd.it/${postId}`;
				}
			}
		}
		return parsed.toString();
	} catch (e) {
		console.error('[RedditEnhancer] cleanLink: URL parsing failed', e);
		return url;
	}
}

// ─── New New UI Implementation ──────────────────────────────────────────────

function enableCleanLinkRV3() {
	if (cleanLinkRV3Cleanup) return;

	// Share menus are rendered lazily when the share button is clicked, and on feed cards they live inside
	// open shadow roots, so watch clicks (composed path crosses shadow boundaries) instead of body mutations.
	const onClick = (event) => {
		const dropdown = event.composedPath().find((el) => el instanceof Element && el.matches?.('rpl-dropdown.share-dropdown-menu'));
		if (dropdown) enhanceShareMenu(dropdown);
	};
	document.addEventListener('click', onClick, true);

	cleanLinkRV3Cleanup = () => {
		document.removeEventListener('click', onClick, true);
		removeInjectedMenuItems();
	};
}

// Wait for the menu contents to render, then add the extra item
function enhanceShareMenu(dropdown) {
	if (pendingDropdowns.has(dropdown) || dropdown.querySelector('.re-clean-link-option')) return;

	const observer = new MutationObserver(tryAdd);
	const timeout = setTimeout(cleanup, 5000);

	function cleanup() {
		observer.disconnect();
		clearTimeout(timeout);
		pendingDropdowns.delete(dropdown);
	}

	function tryAdd() {
		if (!dropdown.isConnected) {
			cleanup();
			return;
		}
		const menu = dropdown.querySelector('rpl-menu');
		const nativeItem = dropdown.querySelector('rpl-menu-item.share-menu-copy-link-option');
		if (!menu || !nativeItem) return;
		addCleanLinkOption(dropdown, menu, nativeItem);
		cleanup();
	}

	pendingDropdowns.set(dropdown, cleanup);
	observer.observe(dropdown, { childList: true, subtree: true });
	tryAdd();
}

function addCleanLinkOption(dropdown, menu, nativeItem) {
	if (menu.querySelector('.re-clean-link-option')) return;

	const context = getShareContext(dropdown);
	if (!context?.permalink) return;

	// Clone the native "Copy link" item so the styling and behaviour match
	const item = nativeItem.cloneNode(true);
	item.classList.add('re-clean-link-option');
	item.removeAttribute('id');
	// A different value prevents Reddit's own "copy-link" handler from running
	item.setAttribute('value', 're-clean-link');
	item.dataset.rePermalink = context.permalink;
	item.dataset.reIsComment = String(context.isComment);
	updateMenuItemLabel(item);

	// Do not preventDefault() the click: Reddit's dropdown uses it to decide
	// whether to close the menu, and cancelling it leaves the menu open.
	item.addEventListener('click', () => copyCleanLink(item));
	// rpl-menu-item closes the menu on Enter/Space but does not dispatch a click,
	// and it already stops Space from scrolling, so the key event is not cancelled
	item.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') copyCleanLink(item);
	});

	// Add as the first item in the share menu
	menu.insertBefore(item, menu.firstChild);
	injectedMenuItems.add(item);
}

function getShareContext(dropdown) {
	// Feed cards render the share button and its menu inside open shadow roots,
	// so read the permalink from the shadow host instead of using closest()
	const host = dropdown.getRootNode()?.host;
	if (host?.matches?.('shreddit-post-share-button, shreddit-comment-share-button')) {
		return {
			permalink: host.getAttribute('permalink'),
			isComment: host.tagName === 'SHREDDIT-COMMENT-SHARE-BUTTON',
		};
	}
	// Post pages and comments render the share button in the light DOM
	const commentButton = dropdown.closest('shreddit-comment-share-button');
	if (commentButton) {
		return { permalink: commentButton.getAttribute('permalink'), isComment: true };
	}
	const post = dropdown.closest('shreddit-post, shreddit-ad-post');
	if (post) {
		return { permalink: post.getAttribute('permalink'), isComment: false };
	}
	return null;
}

function updateMenuItemLabel(item) {
	const shorten = shortenCleanLinkEnabled && item.dataset.reIsComment !== 'true';
	const label = i18next.t(shorten ? 'CopyCleanLinkShort.message' : 'CopyCleanLink.message');
	const labelSpan = item.querySelector(':scope > span:not([slot])');
	if (labelSpan) labelSpan.textContent = label;
	item.setAttribute('aria-label', label);
}

function copyCleanLink(item) {
	const isComment = item.dataset.reIsComment === 'true';
	const shorten = shortenCleanLinkEnabled && !isComment;
	const permalink = item.dataset.rePermalink;
	const rawUrl = permalink?.startsWith('/') ? `https://www.reddit.com${permalink}` : permalink || window.location.href;
	copyToClipboard(cleanUrl(rawUrl, shorten));
	showToast('success', i18next.t(shorten ? 'CopiedCleanLinkShort.message' : 'CopiedCleanLink.message'));
}

function removeInjectedMenuItems() {
	injectedMenuItems.forEach((item) => item.remove());
	injectedMenuItems.clear();
	pendingDropdowns.forEach((cleanup) => cleanup());
	pendingDropdowns.clear();
}

// ─── Old UI Implementation ──────────────────────────────────────────────────

function enableCleanLinkRV1() {
	if (observerCleanupOld) return;

	observerCleanupOld = registerMutationCallback(
		document.body,
		(mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType !== Node.ELEMENT_NODE) return;
					let sharingEls = [];
					if (node.classList?.contains('post-sharing')) {
						sharingEls.push(node);
					} else if (node.querySelectorAll) {
						sharingEls = Array.from(node.querySelectorAll('.post-sharing'));
					}
					sharingEls.forEach(modifyOldSharing);
				});
			});
		},
		{ childList: true, subtree: true },
		'cleanLinkOld',
	);
}

function modifyOldSharing(sharingEl) {
	if (sharingEl.classList.contains('re-clean-link-modified')) return;
	sharingEl.classList.add('re-clean-link-modified');

	const input = sharingEl.querySelector('input.post-sharing-link-input');
	if (!input) return;

	const cleaned = cleanUrl(input.value, shortenCleanLinkEnabled);
	input.value = cleaned;
}

// ─── Disable Feature ────────────────────────────────────────────────────────

function disableCleanLinkAll() {
	if (cleanLinkRV3Cleanup) {
		cleanLinkRV3Cleanup();
		cleanLinkRV3Cleanup = null;
	}
	if (observerCleanupOld) {
		observerCleanupOld();
		observerCleanupOld = null;
	}
	// Remove any injected options from menus
	document.querySelectorAll('.re-clean-link-option').forEach((el) => el.remove());
}

// ─── Clipboard & UX ─────────────────────────────────────────────────────────

function copyToClipboard(text) {
	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(text).catch((err) => {
			console.error('[RedditEnhancer] cleanLink: clipboard write failed', err);
			fallbackCopy(text);
		});
	} else {
		fallbackCopy(text);
	}
}

function fallbackCopy(text) {
	const ta = document.createElement('textarea');
	ta.value = text;
	ta.style.position = 'fixed';
	ta.style.left = '-9999px';
	document.body.appendChild(ta);
	ta.select();
	try {
		document.execCommand('copy');
	} catch (e) {
		console.error('[RedditEnhancer] cleanLink: fallback copy failed', e);
	}
	document.body.removeChild(ta);
}
