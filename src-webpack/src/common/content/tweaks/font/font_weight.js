/**
 * Tweaks: Fonts - Font Weight
 *
 * @description Change some of the font weights on the website.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadPostFontWeight() {
	BROWSER_API.storage.sync.get(['postTitleFontWeight', 'postContentFontWeight', 'postCommentsFontWeight', 'feedPostTitleFontWeight', 'feedPostContentFontWeight'], function (result) {
		postTitleFontWeight(result.postTitleFontWeight);
		postContentFontWeight(result.postContentFontWeight);
		postCommentsFontWeight(result.postCommentsFontWeight);
		feedPostTitleFontWeight(result.feedPostTitleFontWeight);
		feedPostContentFontWeight(result.feedPostContentFontWeight);
	});
}

/* === Enable/Disable The Features === */

// Post Title Font Weight
export function postTitleFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-post-title-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-title-font-weight');
	}
}

// Post Content Font Weight
export function postContentFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-post-content-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-content-font-weight');
	}
}

// Post Comments Font Weight
export function postCommentsFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-post-comments-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-post-comments-font-weight');
	}
}

// Feed Post Title Font Weight
export function feedPostTitleFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-feed-post-title-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-title-font-weight');
	}
}

// Feed Post Content Font Weight
export function feedPostContentFontWeight(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-feed-post-content-font-weight', value);
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-content-font-weight');
	}
}
