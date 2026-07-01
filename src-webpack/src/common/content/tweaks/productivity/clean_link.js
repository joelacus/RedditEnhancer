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

// Observer cleanup handles
let observerCleanupNewnew = null;
let observerCleanupOld = null;

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
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed', 'post_page', 'comments_page'];
	if (value) {
		if (redditVersion === 'newnew') {
			if (feedRoutesv3.includes(routeName)) enableCleanLinkRV3();
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
	// Update label on any existing newnew UI menu items
	document.querySelectorAll('.re-clean-link-option .text-14, .re-clean-link-option .text-body-2 span').forEach((el) => {
		el.textContent = shortenCleanLinkEnabled ? 'Copy clean link (short)' : 'Copy clean link';
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
	if (observerCleanupNewnew) return;

	observerCleanupNewnew = registerMutationCallback(
		document.body,
		(mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType !== Node.ELEMENT_NODE) return;
					let menus = [];
					if (node.tagName === 'FACEPLATE-MENU') {
						menus.push(node);
					} else if (node.querySelectorAll) {
						// Check if this node or its descendants contain a share menu
						menus = Array.from(node.querySelectorAll('faceplate-menu'));
					}
					menus.forEach((menu) => {
						// Only process if the menu contains a copy link option
						if (menu.querySelector('.share-menu-copy-link-option')) {
							addCleanLinkOption(menu);
						}
					});
				});
			});
		},
		{ childList: true, subtree: true },
		'cleanLink',
	);
}

function addCleanLinkOption(menu) {
	// Avoid duplicate insertion
	if (menu.querySelector('.re-clean-link-option')) return;

	const copyLi = menu.querySelector('li.share-menu-copy-link-option');
	let permaLink = copyLi.closest('[permalink]')?.getAttribute('permalink') ?? '';
	if (permaLink) permaLink = 'https://www.reddit.com' + permaLink;
	const isComment = menu.closest('shreddit-comment-share-button') ?? false;
	if (!copyLi) return;

	// Clone the original li
	const newLi = copyLi.cloneNode(true);
	newLi.classList.add('re-clean-link-option');
	newLi.removeAttribute('id');

	// Update label text
	const labelSpan = newLi.querySelector('.text-14, .text-body-2 span');
	if (labelSpan) {
		labelSpan.textContent = shortenCleanLinkEnabled && !isComment ? i18next.t('CopyCleanLinkShort.message') : i18next.t('CopyCleanLink.message');
	}

	// Attach click handler to copy cleaned URL
	const clickTarget = newLi.querySelector('[role="menuitem"]') || newLi;
	clickTarget.addEventListener('click', () => {
		const rawUrl = permaLink ?? window.location.href;
		const cleaned = cleanUrl(rawUrl, shortenCleanLinkEnabled && !isComment);
		copyToClipboard(cleaned);
		showToast('success', shortenCleanLinkEnabled && !isComment ? i18next.t('CopiedCleanLinkShort.message') : i18next.t('CopiedCleanLink.message'));
	});

	// Insert as first item in the menu
	menu.insertBefore(newLi, menu.firstChild);
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
	if (observerCleanupNewnew) {
		observerCleanupNewnew();
		observerCleanupNewnew = null;
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
