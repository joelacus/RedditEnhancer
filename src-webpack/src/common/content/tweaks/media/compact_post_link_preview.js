/**
 * Tweaks: Media - Compact Post Link Display
 *
 * @name compactPostLinkPreview
 * @description Compact the display of the external link preview on a link post.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

const STYLE_ID = 're-compact-post-link-display';
const POST_ROUTES = ['post_page', 'comments_page', 'profile_post_page'];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadCompactPostLinkPreview() {
	BROWSER_API.storage.sync.get(['compactPostLinkPreview'], function (result) {
		if (result.compactPostLinkPreview === true) compactPostLinkPreview(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function compactPostLinkPreview(value) {
	if (redditVersion !== 'newnew') return;

	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const post = document.querySelector('shreddit-post[post-type="link"]');
	const postLink = post?.getAttribute('content-href');
	const isUnsupportedPost =
		!value ||
		!POST_ROUTES.includes(routeName) ||
		!post ||
		!postLink ||
		post.querySelector('shreddit-embed') ||
		post.querySelector('div[slot="text-body"]') ||
		isImageHost(postLink);

	if (isUnsupportedPost) {
		disableCompactPostLinkPreview();
		return;
	}

	let styleElement = document.head.querySelector(`style[id="${STYLE_ID}"]`);
	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.id = STYLE_ID;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// The link preview is a fixed-height shell with a media row and a CTA row.
	// Lay the rows out side by side and let the 16:9 thumbnail size the card.
	styleElement.textContent = `@media (min-width: 768px) {
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-empty-media-sizer],
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-empty-cta-sizer] {
		display: none !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-fixed-height-shell] {
		height: auto !important;
		min-height: 0 !important;
		max-height: none !important;
		overflow: visible !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-content-grid] {
		position: static !important;
		display: flex !important;
		align-items: stretch;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-media-row] {
		flex: 0 0 144px;
		width: 144px;
		height: auto;
		aspect-ratio: 16 / 9;
		align-self: center;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-media-row] img.post-background-image-filter {
		display: none !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-media-row] img.preview-img {
		height: 100% !important;
		object-fit: cover !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-cta-row] {
		flex: 1 1 auto;
		min-width: 0;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-cta-row] > div,
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-cta-row] > div > div {
		height: 100%;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-link-preview-cta-row] > div > div {
		border-top: 0 !important;
	}
	/* Comment permalinks render a full-width hero image and a link bar below it,
	   without the data-link-preview-* attributes. Lay those two out side by side
	   like the compact shell above. The img in the :has() guard keeps video-only
	   previews untouched. */
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [slot="post-media-container"] > div:has(> [data-aspect-ratio-container]:not([data-link-preview-fixed-height-shell]) img) {
		display: flex !important;
		align-items: stretch !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [slot="post-media-container"] > div > [data-aspect-ratio-container]:not([data-link-preview-fixed-height-shell]) {
		flex: 0 0 144px !important;
		width: 144px !important;
		height: auto !important;
		min-height: 0 !important;
		max-height: none !important;
		aspect-ratio: 16 / 9 !important;
		align-self: center !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-aspect-ratio-container]:not([data-link-preview-fixed-height-shell]) img.post-background-image-filter {
		display: none !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-aspect-ratio-container]:not([data-link-preview-fixed-height-shell]) img.preview-img,
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [data-aspect-ratio-container]:not([data-link-preview-fixed-height-shell]) img[data-post-media-primary] {
		width: 100% !important;
		height: 100% !important;
		max-height: none !important;
		object-fit: cover !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [slot="post-media-container"] > div > div:has(> faceplate-tracker) {
		flex: 1 1 auto !important;
		min-width: 0 !important;
		display: flex !important;
		align-items: center !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [slot="post-media-container"] > div > div:has(> faceplate-tracker) > faceplate-tracker,
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [slot="post-media-container"] > div > div:has(> faceplate-tracker) a {
		width: 100% !important;
	}
	shreddit-app:is([routename="post_page"], [routename="comments_page"], [routename="profile_post_page"]) shreddit-post[post-type="link"] [slot="post-media-container"] > div > div:has(> faceplate-tracker) a {
		border-top: 0 !important;
	}
}`;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function isImageHost(url) {
	try {
		return /(imgur\.com|imgur\.io|ibb\.co)/.test(new URL(url).hostname);
	} catch {
		return false;
	}
}

function disableCompactPostLinkPreview() {
	document.head.querySelectorAll(`style[id="${STYLE_ID}"]`).forEach((element) => element.remove());

	// Remove the URL link inserted by versions before 3.7.0, without touching
	// [slot="full-post-link"] links marked by "Open Post Links in New Tab".
	document.querySelectorAll('shreddit-post > a.re-post-link:not([slot])').forEach((link) => link.remove());
	document.documentElement.style.removeProperty('--re-post-media-container-margin');
}
