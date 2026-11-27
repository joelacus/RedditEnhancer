/**
 * Tweaks: Media - Comment Image Hyperlink Thumbnails
 *
 * @name commentImageThumbnails
 * @description Show an inline thumbnail for image links in comments.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

const STYLE_ID = 're-comment-image-thumbnails';
const OVERLAY_ID = 're-comment-image-lightbox';
const IMAGE_EXTENSION = /\.(avif|bmp|gif|jpe?g|png|webp)$/i;

const DEFAULT_THUMBNAIL_WIDTH = 200;

// Feature state
let enabled = false;
let hideLinks = false;
let thumbnailWidth = DEFAULT_THUMBNAIL_WIDTH;
let observerCleanup = null;
let generation = 0;

// Page-link resolution
let resolutionQueue = [];
let resolving = false;
let pageResolutionUnavailable = false;
const pageResolutionCache = new Map();

// Preview overlay
let overlay = null;
let overlayClickHandler = null;
let overlayKeyHandler = null;
let overlayReturnFocus = null;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadCommentImageThumbnails() {
	BROWSER_API.storage.sync.get(['commentImageThumbnails', 'hideCommentImageLinks', 'commentImageThumbnailWidth']).then((result) => {
		hideLinks = result.hideCommentImageLinks === true;
		thumbnailWidth = clampWidth(parseInt(result.commentImageThumbnailWidth));
		if (result.commentImageThumbnails === true) commentImageThumbnails(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function commentImageThumbnails(value) {
	if (!value) {
		disableCommentImageThumbnails();
		return;
	}
	if (redditVersion !== 'old' && redditVersion !== 'newnew') return;

	enabled = true;
	injectStyle();
	applyThumbnailWidth();

	if (!observerCleanup) {
		observerCleanup = registerMutationCallback(
			document.body || document.documentElement,
			() => {
				scanForImageLinks();
			},
			{ childList: true, subtree: true },
			'commentImageThumbnails',
			250,
		);
	}

	scanForImageLinks();
}

// Show/hide the original link
export function hideCommentImageLinks(value) {
	hideLinks = value === true;
	if (!enabled) return;
	document.querySelectorAll('[data-re-image-thumb="done"]').forEach((anchor) => {
		anchor.classList.toggle('re-comment-image-link-hidden', hideLinks);
	});
}

// Set the thumbnail width
export function setCommentImageThumbnailWidth(value) {
	thumbnailWidth = clampWidth(parseInt(value));
	applyThumbnailWidth();
}

// Disable "Comment Image Hyperlink Thumbnails"
function disableCommentImageThumbnails() {
	if (!enabled) return;
	enabled = false;
	generation++;
	resolutionQueue = [];
	pageResolutionUnavailable = false;
	pageResolutionCache.clear();

	if (observerCleanup) {
		observerCleanup();
		observerCleanup = null;
	}

	document.querySelectorAll('.re-comment-image-thumb').forEach((thumbnail) => thumbnail.remove());
	document.querySelectorAll('[data-re-image-thumb]').forEach((anchor) => {
		anchor.removeAttribute('data-re-image-thumb');
		anchor.classList.remove('re-comment-image-link-hidden');
	});
	document.getElementById(STYLE_ID)?.remove();
	document.documentElement.style.removeProperty('--re-comment-image-thumb-width');
	closeOverlay();
}

// ─── Find And Process Image Links ───────────────────────────────────────────

function scanForImageLinks() {
	if (!enabled) return;

	const anchors = getCommentAnchors();
	anchors.forEach((anchor) => {
		if (anchor.dataset.reImageThumb) return;
		if (anchor.querySelector('img')) return;
		if (anchor.closest('pre, code')) return;
		if (redditVersion === 'old' && anchor.closest('.usertext-edit')) return;

		const href = anchor.getAttribute('href');
		if (!href) return;

		let url;
		try {
			url = new URL(href, location.href);
		} catch {
			return;
		}
		if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

		const imgurImage = imgurSingleImage(url);
		if (isDirectImage(url)) {
			anchor.dataset.reImageThumb = addThumbnail(anchor, url.href, linkText(anchor)) ? 'done' : 'failed';
		} else if (imgurImage) {
			// A single imgur image page needs no fetch: the CDN serves the image
			// at the same id, so this works even when imgur.com is rate-limited.
			anchor.dataset.reImageThumb = addThumbnail(anchor, imgurImage, linkText(anchor)) ? 'done' : 'failed';
		} else if (isPageImageLink(url)) {
			anchor.dataset.reImageThumb = 'pending';
			queuePageLink(anchor, url.href);
		}
	});
}

function getCommentAnchors() {
	if (redditVersion === 'old') {
		return document.querySelectorAll('.commentarea .comment .md a[href]');
	}
	return document.querySelectorAll('shreddit-comment div[id$="-post-rtjson-content"] a[href]');
}

function isDirectImage(url) {
	return IMAGE_EXTENSION.test(url.pathname);
}

// imgur.com/<id> is a single image page; i.imgur.com/<id>.jpg is the image itself.
function imgurSingleImage(url) {
	const host = url.hostname.replace(/^www\./i, '').toLowerCase();
	if (host !== 'imgur.com') return null;
	const match = url.pathname.match(/^\/([A-Za-z0-9]{5,12})\/?$/);
	return match ? `https://i.imgur.com/${match[1]}.jpg` : null;
}

function isPageImageLink(url) {
	const host = url.hostname.replace(/^www\./i, '').toLowerCase();
	const path = url.pathname;

	if (host === 'imgur.com') {
		return /^\/(?:a|gallery)\/[A-Za-z0-9]+/i.test(path) || /^\/[A-Za-z0-9]{5,12}\/?$/i.test(path);
	}
	if (host === 'postimg.cc') {
		return /^\/gallery\/[A-Za-z0-9]+/i.test(path) || /^\/[A-Za-z0-9]{5,12}\/?$/i.test(path);
	}
	if (host === 'ibb.co') {
		return /^\/album\/[A-Za-z0-9]+/i.test(path) || /^\/[A-Za-z0-9]{5,12}\/?$/i.test(path);
	}
	return false;
}

function linkText(anchor) {
	return (anchor.textContent || '').trim();
}

// ─── Page Link Resolution ───────────────────────────────────────────────────

function queuePageLink(anchor, url) {
	if (pageResolutionUnavailable) {
		anchor.dataset.reImageThumb = 'failed';
		return;
	}
	resolutionQueue.push({ anchor, url, generation });
	processResolutionQueue();
}

async function processResolutionQueue() {
	if (resolving) return;
	resolving = true;
	try {
		while (resolutionQueue.length) {
			const job = resolutionQueue.shift();
			if (!enabled) break;
			if (job.generation !== generation) continue;
			if (!job.anchor.isConnected || job.anchor.dataset.reImageThumb !== 'pending') continue;

			const imageUrl = await resolvePageLink(job.url);

			if (!enabled || job.generation !== generation) continue;
			if (!job.anchor.isConnected || job.anchor.dataset.reImageThumb !== 'pending') continue;

			if (imageUrl) {
				job.anchor.dataset.reImageThumb = addThumbnail(job.anchor, imageUrl, linkText(job.anchor)) ? 'done' : 'failed';
			} else {
				job.anchor.dataset.reImageThumb = 'failed';
			}
		}
	} finally {
		resolving = false;
		if (enabled && resolutionQueue.length) processResolutionQueue();
	}
}

async function resolvePageLink(url) {
	if (pageResolutionCache.has(url)) return pageResolutionCache.get(url);

	try {
		const response = await BROWSER_API.runtime.sendMessage({ actions: [{ action: 'resolveImagePage', url }] });
		if (response?.success) {
			pageResolutionCache.set(url, response.imageUrl);
			return response.imageUrl;
		}
		if (response?.missingPermission) {
			// Direct image links keep working; stop trying page links until the
			// feature is re-enabled or the page is reloaded after granting access.
			pageResolutionUnavailable = true;
			resolutionQueue = [];
			markPendingPageLinksFailed();
		} else if (response?.error) {
			console.debug(`[RedditEnhancer] commentImageThumbnails: ${url}: ${response.error}`);
		}
	} catch (error) {
		console.debug('[RedditEnhancer] commentImageThumbnails: could not resolve ' + url, error);
	}
	return null;
}

function markPendingPageLinksFailed() {
	document.querySelectorAll('[data-re-image-thumb="pending"]').forEach((anchor) => {
		anchor.dataset.reImageThumb = 'failed';
	});
}

// ─── Thumbnail ──────────────────────────────────────────────────────────────

function addThumbnail(anchor, imageUrl, text) {
	if (!enabled || !anchor.isConnected) return false;

	const button = document.createElement('button');
	button.type = 'button';
	button.className = 're-comment-image-thumb';
	button.title = text;
	button.setAttribute('aria-label', text ? `Open image preview: ${text}` : 'Open image preview');

	const image = document.createElement('img');
	image.src = imageUrl;
	image.alt = text || 'Image';
	image.title = text;
	image.loading = 'lazy';
	image.referrerPolicy = 'no-referrer';
	image.addEventListener(
		'error',
		() => {
			button.remove();
			anchor.dataset.reImageThumb = 'failed';
			// Never leave a link hidden without a thumbnail to replace it.
			anchor.classList.remove('re-comment-image-link-hidden');
		},
		{ once: true },
	);

	button.appendChild(image);
	button.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		openOverlay(imageUrl, text, button);
	});

	anchor.after(button);
	anchor.classList.toggle('re-comment-image-link-hidden', hideLinks);
	return true;
}

// ─── Styles ─────────────────────────────────────────────────────────────────

function injectStyle() {
	if (document.getElementById(STYLE_ID)) return;

	const style = document.createElement('style');
	style.id = STYLE_ID;
	style.textContent = `
		.re-comment-image-thumb {
			display: inline-block;
			vertical-align: text-top;
			height: fit-content;
			width: var(--re-comment-image-thumb-width, 200px);
			max-width: 100%;
			margin: 2px 6px;
			padding: 0;
			border: 0;
			background: none;
			line-height: 0;
			cursor: zoom-in;
			border-radius: 0;
		}
		.re-comment-image-thumb img {
			display: block;
			width: 100%;
			height: auto;
			border-radius: 4px;
		}
		.re-comment-image-link-hidden {
			display: none !important;
		}
		#${OVERLAY_ID} {
			position: fixed;
			inset: 0;
			z-index: 2147483000;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 0, 0, 0.9);
			cursor: zoom-out;
		}
		#${OVERLAY_ID} img {
			display: block;
			max-width: 92vw;
			max-height: 92vh;
			cursor: zoom-out;
		}
	`;
	(document.head || document.documentElement).appendChild(style);
}

function applyThumbnailWidth() {
	document.documentElement.style.setProperty('--re-comment-image-thumb-width', `${thumbnailWidth}px`);
}

function clampWidth(value) {
	// 40 is the slider's "off" position: fall back to the default width.
	if (!Number.isFinite(value) || value < 50) return DEFAULT_THUMBNAIL_WIDTH;
	return Math.min(600, value);
}

// ─── Preview Overlay ────────────────────────────────────────────────────────

function openOverlay(imageUrl, text, returnFocus) {
	closeOverlay();

	overlayReturnFocus = returnFocus;
	overlay = document.createElement('div');
	overlay.id = OVERLAY_ID;
	overlay.setAttribute('role', 'dialog');
	overlay.setAttribute('aria-modal', 'true');
	overlay.setAttribute('aria-label', text ? `Image preview: ${text}` : 'Image preview');
	overlay.tabIndex = -1;

	const image = document.createElement('img');
	image.src = imageUrl;
	image.alt = text || 'Image';
	overlay.appendChild(image);

	overlayClickHandler = (event) => {
		if (!event.composedPath().includes(overlay)) return;
		event.preventDefault();
		event.stopImmediatePropagation();
		closeOverlay();
	};
	overlayKeyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopImmediatePropagation();
			closeOverlay();
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			// Do not let the gallery shortcuts behind the overlay react.
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	};
	// Window capture runs before the document capture listeners used by
	// "Click Lightbox Background To Close" and "Gallery Keyboard Navigation".
	window.addEventListener('click', overlayClickHandler, true);
	window.addEventListener('keydown', overlayKeyHandler, true);

	document.body.appendChild(overlay);
	overlay.focus();
}

function closeOverlay() {
	if (overlayClickHandler) {
		window.removeEventListener('click', overlayClickHandler, true);
		overlayClickHandler = null;
	}
	if (overlayKeyHandler) {
		window.removeEventListener('keydown', overlayKeyHandler, true);
		overlayKeyHandler = null;
	}
	if (overlay) {
		overlay.remove();
		overlay = null;
	}
	if (overlayReturnFocus?.isConnected) {
		overlayReturnFocus.focus();
	}
	overlayReturnFocus = null;
}
