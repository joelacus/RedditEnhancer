/**
 * Tweaks: Fonts - Font Weight
 *
 * @description Change some of the font weights on the website.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

import { validateEnum } from '../../../popup/restore/validation';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

const FONT_WEIGHTS = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function loadPostFontWeight() {
	BROWSER_API.storage.sync.get(['postTitleFontWeight', 'postContentFontWeight', 'postCommentsFontWeight', 'feedPostTitleFontWeight', 'feedPostContentFontWeight'], function (result) {
		postTitleFontWeight(validateEnum(parseInt(result.postTitleFontWeight), FONT_WEIGHTS, 0));
		postContentFontWeight(validateEnum(parseInt(result.postContentFontWeight), FONT_WEIGHTS, 0));
		postCommentsFontWeight(validateEnum(parseInt(result.postCommentsFontWeight), FONT_WEIGHTS, 0));
		feedPostTitleFontWeight(validateEnum(parseInt(result.feedPostTitleFontWeight), FONT_WEIGHTS, 0));
		feedPostContentFontWeight(validateEnum(parseInt(result.feedPostContentFontWeight), FONT_WEIGHTS, 0));
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

// Post Title Font Weight
export function postTitleFontWeight(value) {
	if (value !== 0) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-post-title-font-weight"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-post-title-font-weight';
			styleElement.textContent = `/* RV1 */
										.comments-page .thing p.title > a,
										.other-discussions-page .thing p.title > a {
											font-weight: var(--re-post-title-font-weight, normal);
										}
										/* RV3 */
										[routename='post_page'] shreddit-post a[slot='title'],
										[routename='post_page'] shreddit-post h1[slot='title'],
										[routename='post_page'] div.crosspost-title a,
										[routename='comments_page'] shreddit-post h1[slot='title'],
										[routename='comments_page'] div.crosspost-title a,
										[routename='profile_post_page'] shreddit-post h1[slot='title'],
										[routename='profile_post_page'] div.crosspost-title a,
										[routename='profile_post_page_comments'] shreddit-post h1[slot='title'],
										[routename='profile_post_page_comments'] div.crosspost-title a,
										mod-queue-app shreddit-post h1[slot='title'] > a {
											font-weight: var(--re-post-title-font-weight, 600);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-post-title-font-weight', value);
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-post-title-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		document.documentElement.style.removeProperty('--re-post-title-font-weight');
	}
}

// Post Content Font Weight
export function postContentFontWeight(value) {
	if (value !== 0) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-post-content-font-weight"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-post-content-font-weight';
			styleElement.textContent = `/* RV1 */
										.comments-page .thing[data-type="link"] .usertext div.md,
										/* RV3 */
										shreddit-post div[slot="text-body"] div.md,
										shreddit-post a[slot="text-body"] div:has(>p),
										shreddit-profile-comment [id*="-content"],
										/* x-posts and link posts */
										div[slot="post-media-container"] div.md,
										[routename="post_page"] shreddit-post .re-media-link,
										/* wiki pilot */
										.wiki-content.wiki-pilot-communities .md,
										.wiki-content.wiki-pilot-communities .md p {
											font-weight: var(--re-post-content-font-weight);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-post-content-font-weight', value);
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-post-content-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-post-content-font-weight');
	}
}

// Post Comments Font Weight
export function postCommentsFontWeight(value) {
	if (value !== 0) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-post-comments-font-weight"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-post-comments-font-weight';
			styleElement.textContent = `/* RV1 */
										.commentarea .thing[data-type="comment"] .usertext p {
											font-weight: var(--re-post-comments-font-weight);
										}
										/* RV3 */
										shreddit-comment div.md[slot="comment"],
										shreddit-profile-comment div.md,
										shreddit-composer div[contenteditable],
										shreddit-composer::part(md-inner) {
											font-weight: var(--re-post-comments-font-weight);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-post-comments-font-weight', value);
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-post-comments-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-post-comments-font-weight');
	}
}

// Feed Post Title Font Weight
export function feedPostTitleFontWeight(value) {
	if (value !== 0) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-feed-post-title-font-weight"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-feed-post-title-font-weight';
			styleElement.textContent = `/* RV1 */
										.listing-page .thing p.title > a {
											font-weight: var(--re-feed-post-title-font-weight);
										}
										/* RV3 */
										shreddit-feed shreddit-post a[slot='title'],
										shreddit-feed shreddit-post h1[slot='title'],
										shreddit-feed div.crosspost-title a,
										shreddit-feed div[slot="post-media-container"] .text-18,
										search-telemetry-tracker a[data-testid='post-title-text'],
										faceplate-tracker[data-testid='search-post'] a[data-testid='post-title-text'],
										faceplate-tracker h2.i18n-search-comment-post-title,
										mod-queue-app shreddit-post a[slot='title'] {
											font-weight: var(--re-feed-post-title-font-weight);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-feed-post-title-font-weight', value);
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-feed-post-title-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-feed-post-title-font-weight');
	}
}

// Feed Post Content Font Weight
export function feedPostContentFontWeight(value) {
	if (value !== 0) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-feed-post-content-font-weight"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-feed-post-content-font-weight';
			styleElement.textContent = `/* RV1 */
										.listing-page .thing[data-type="link"] .usertext div.md {
											font-weight: var(--re-feed-post-content-font-weight);
										}
										/* RV3 */
										shreddit-feed shreddit-post [data-post-click-location="text-body"] p,
										shreddit-feed shreddit-profile-comment [id*="-content"],
										shreddit-feed div[slot="post-media-container"] div.md,
										div.md.feed-card-text-preview,
										mod-queue-app shreddit-post [data-post-click-location="text-body"] div.md,
										shreddit-feed shreddit-post .re-media-link,
										shreddit-feed shreddit-post .post-link {
											font-weight: var(--re-feed-post-content-font-weight);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-feed-post-content-font-weight', value);
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-feed-post-content-font-weight"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-feed-post-content-font-weight');
	}
}
