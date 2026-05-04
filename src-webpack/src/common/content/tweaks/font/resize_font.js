/**
 * Tweaks: Fonts - Resize Fonts
 *
 * @description Resize some of the text on the website.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

import { validateInt } from '../../../popup/restore/validation';

export function loadResizeFont() {
	BROWSER_API.storage.sync.get(['postTitleFontSize', 'postContentFontSize', 'postCommentsFontSize', 'feedPostTitleFontSize', 'feedPostContentFontSize', 'createPostTitleFontSize', 'createPostBodyFontSize'], function (result) {
		postTitleFontSize(validateInt(parseInt(result.postTitleFontSize), 9, 40, 9));
		postContentFontSize(validateInt(parseInt(result.postContentFontSize), 9, 40, 9));
		postCommentsFontSize(validateInt(parseInt(result.postCommentsFontSize), 9, 40, 9));
		feedPostTitleFontSize(validateInt(parseInt(result.feedPostTitleFontSize), 9, 40, 9));
		feedPostContentFontSize(validateInt(parseInt(result.feedPostContentFontSize), 9, 40, 9));
		createPostTitleFontSize(validateInt(parseInt(result.createPostTitleFontSize), 9, 40, 9));
		createPostBodyFontSize(validateInt(parseInt(result.createPostBodyFontSize), 9, 40, 9));
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

// Resize "Post Title" Font
export function postTitleFontSize(value) {
	if (value != 9) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-post-title-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-post-title-font-size';
			styleElement.textContent = `/* RV1 */
										.comments-page .thing p.title > a,
										.other-discussions-page .thing p.title > a {
											font-size: var(--re-post-title-font-size, 16px);
											line-height: 1.4;
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
											font-size: var(--re-post-title-font-size, 1.5rem);
											line-height: 1.4;
										}
										shreddit-post h1[slot='title'] {
											margin: 0.35rem 0 0.5rem;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-post-title-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-post-title-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-post-title-font-size');
	}
}

// Resize "Post Content" Font
export function postContentFontSize(value) {
	if (value != 9) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-post-content-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-post-content-font-size';
			styleElement.textContent = `/* RV1 */
										.comments-page .thing[data-type="link"] .usertext div.md {
											font-size: var(--re-post-content-font-size, 14px);
											line-height: 1.5;
										}
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
											font-size: var(--re-post-content-font-size, 14px);
											line-height: 1.5;
										}
										/* h1 in text content */
										shreddit-post div[slot='text-body'] div.md h1 {
											font-size: 1.5em;
											line-height: inherit;
										}
										.Post [data-click-id='text'] p {
											overflow: hidden;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-post-content-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-post-content-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-post-content-font-size');
	}
}

// Resize "Post Comments" Font
export function postCommentsFontSize(value) {
	if (value !== 9) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-post-comments-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-post-comments-font-size';
			styleElement.textContent = `/* RV1 */
										.commentarea .thing[data-type="comment"] .usertext p {
											font-size: var(--re-post-comments-font-size, 14px);
											line-height: 1.5;
										}
										/* RV3 */
										shreddit-comment div.md[slot="comment"],
										shreddit-profile-comment div.md,
										shreddit-composer div[contenteditable],
										shreddit-composer::part(md-inner) {
											font-size: var(--re-post-comments-font-size, 14px);
											line-height: 1.5;
										}
										/* h1 in comments */
										shreddit-comment div.md[slot='comment'] h1,
										shreddit-profile-comment div.md h1,
										shreddit-composer div[contenteditable] h1 {
											font-size: 1.5em;
											line-height: inherit;
										}
										div[data-test-id='comment-submission-form-richtext'] div.public-DraftEditor-content[contenteditable] h1 > div {
											font-size: inherit;
											line-height: inherit;
										}
										.Comment [data-testid='comment'] > div,
										.Comment [data-testid='comment'] > div code,
										div[data-test-id='comment-submission-form-richtext'] div.public-DraftEditor-content[contenteditable],
										div[data-test-id='comment-submission-form-markdown'] textarea {
											overflow: hidden;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-post-comments-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-post-comments-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-post-comments-font-size');
	}
}

// Resize "Feed Post Title" Font
export function feedPostTitleFontSize(value) {
	if (value != 9) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-feed-post-title-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-feed-post-title-font-size';
			styleElement.textContent = `/* RV1 */
										.listing-page .thing p.title > a {
											font-size: var(--re-feed-post-title-font-size);
											line-height: 1.4;
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
											font-size: var(--re-feed-post-title-font-size);
											line-height: 1.4;
										}
										shreddit-feed shreddit-post[view-type='compactView'] a[slot='title'] {
											font-size: var(--re-feed-post-title-font-size, 1rem);
										}
										shreddit-feed shreddit-profile-comment h2 a img {
											min-width: 24px;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-feed-post-title-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-feed-post-title-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-feed-post-title-font-size');
	}
}

// Resize "Feed Post Content" Font
export function feedPostContentFontSize(value) {
	if (value != 9) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-feed-post-content-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-feed-post-content-font-size';
			styleElement.textContent = `/* RV1 */
										.listing-page .thing[data-type="link"] .usertext div.md {
											font-size: var(--re-feed-post-content-font-size, 14px);
											line-height: 1.5;
										}
										/* RV3 */
										shreddit-feed shreddit-post [data-post-click-location="text-body"] p,
										shreddit-feed shreddit-profile-comment [id*="-content"],
										shreddit-feed div[slot="post-media-container"] div.md,
										div.md.feed-card-text-preview,
										mod-queue-app shreddit-post [data-post-click-location="text-body"] div.md,
										shreddit-feed shreddit-post .re-media-link,
										shreddit-feed shreddit-post .post-link {
											font-size: var(--re-feed-post-content-font-size, 14px);
											line-height: 1.5;
										}
										/* h1 in text content */
										shreddit-feed shreddit-post [data-post-click-location='text-body'] h1 {
											font-size: 1.5em;
											line-height: inherit;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-feed-post-content-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-feed-post-content-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-feed-post-content-font-size');
	}
}

// Resize "Create Post: Title" Font
export function createPostTitleFontSize(value) {
	if (value != 9) {
		if (redditVersion === 'newnew') {
			if (document.querySelector('shreddit-app[pagetype="post_submit"] faceplate-textarea-input')) {
				document.querySelector('shreddit-app[pagetype="post_submit"] faceplate-textarea-input').shadowRoot.querySelector('#innerTextArea').setAttribute('part', 'title');
			}
		}
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-create-post-title-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-create-post-title-font-size';
			styleElement.textContent = `/* RV1 */
										#title-field textarea {
											font-size: var(--re-create-post-title-font-size, 18px);
										}
										/* RV3 */
										shreddit-app[pagetype='post_submit'] faceplate-textarea-input::part(title) {
											font-size: var(--re-create-post-title-font-size, 16px) !important;
											line-height: 1.2 !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-create-post-title-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-create-post-title-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-create-post-title-font-size');
	}
}

// Resize "Create Post: Body" Font
export function createPostBodyFontSize(value) {
	if (value != 9) {
		// Append stylesheet
		if (!document.head.querySelector('style[id="re-create-post-body-font-size"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-create-post-body-font-size';
			styleElement.textContent = `/* RV1 */
										#text-field textarea {
											font-size: var(--re-create-post-body-font-size, 14px);
										}
										/* RV3 */
										shreddit-app[pagetype='post_submit'] shreddit-composer p > span {
											font-size: var(--re-create-post-body-font-size, 14px) !important;
											line-height: 1.5 !important;
										}

										/* Compact blockquote */
										div.md blockquote {
											margin: 0 0 1rem 0.125rem;
											padding: 0 0 0 1rem;
										}
										div.md blockquote:last-of-type {
											margin-bottom: 0;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
		// Set Property
		document.documentElement.style.setProperty('--re-create-post-body-font-size', value + 'px');
	} else {
		// Remove stylesheet
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-create-post-body-font-size"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		// Remove Property
		document.documentElement.style.removeProperty('--re-create-post-body-font-size');
	}
}
