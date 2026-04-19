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
		document.documentElement.style.setProperty('--re-post-title-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-title-font-weight');
	}
}

// Post Content Font Weight
export function postContentFontWeight(value) {
	if (value !== 0) {
		document.documentElement.style.setProperty('--re-post-content-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-content-font-weight');
	}
}

// Post Comments Font Weight
export function postCommentsFontWeight(value) {
	if (value !== 0) {
		document.documentElement.style.setProperty('--re-post-comments-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-comments-font-weight');
	}
}

// Feed Post Title Font Weight
export function feedPostTitleFontWeight(value) {
	if (value !== 0) {
		document.documentElement.style.setProperty('--re-feed-post-title-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-title-font-weight');
	}
}

// Feed Post Content Font Weight
export function feedPostContentFontWeight(value) {
	if (value !== 0) {
		document.documentElement.style.setProperty('--re-feed-post-content-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-content-font-weight');
	}
}
