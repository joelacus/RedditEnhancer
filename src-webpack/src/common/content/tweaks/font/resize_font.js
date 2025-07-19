/**
 * Tweaks: Fonts - Resize Fonts
 *
 * @description Resize some of the text on the website.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadResizeFont() {
	BROWSER_API.storage.sync.get(['postTitleFontSize', 'postContentFontSize', 'postCommentsFontSize', 'feedPostTitleFontSize', 'feedPostContentFontSize', 'createPostTitleFontSize', 'createPostBodyFontSize'], function (result) {
		if (result.postTitleFontSize) postTitleFontSize(result.postTitleFontSize);
		if (result.postContentFontSize) postContentFontSize(result.postContentFontSize);
		if (result.postCommentsFontSize) postCommentsFontSize(result.postCommentsFontSize);
		if (result.feedPostTitleFontSize) feedPostTitleFontSize(result.feedPostTitleFontSize);
		if (result.feedPostContentFontSize) feedPostContentFontSize(result.feedPostContentFontSize);
		if (result.createPostTitleFontSize) createPostTitleFontSize(result.createPostTitleFontSize);
		if (result.createPostBodyFontSize) createPostBodyFontSize(result.createPostBodyFontSize);
	});
}

/* === Enable/Disable The Features === */

// Resize "Post Title" Font
export function postTitleFontSize(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-title-font-size');
	}
}

// Resize "Post Content" Font
export function postContentFontSize(value) {
	if (value != '9' && value != false) {
		document.documentElement.style.setProperty('--re-post-content-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-content-font-size');
	}
}

// Resize "Post Comments" Font
export function postCommentsFontSize(value) {
	if (value !== '9' && value !== false) {
		document.documentElement.style.setProperty('--re-post-comments-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-post-comments-font-size');
	}
}

// Resize "Feed Post Title" Font
export function feedPostTitleFontSize(value) {
	if (typeof value != 'undefined' && value != false && value != '9') {
		document.documentElement.style.setProperty('--re-feed-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-title-font-size');
	}
}

// Resize "Feed Post Content" Font
export function feedPostContentFontSize(value) {
	if (value != '9' && value != false) {
		document.documentElement.style.setProperty('--re-feed-post-content-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-feed-post-content-font-size');
	}
}

// Resize "Create Post: Title" Font
export function createPostTitleFontSize(value) {
	if (value != '9' && value != false) {
		if (redditVersion === 'newnew') {
			if (document.querySelector('shreddit-app[pagetype="post_submit"] faceplate-textarea-input')) {
				document.querySelector('shreddit-app[pagetype="post_submit"] faceplate-textarea-input').shadowRoot.querySelector('#innerTextArea').setAttribute('part', 'title');
			}
		}
		document.documentElement.style.setProperty('--re-create-post-title-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-create-post-title-font-size');
	}
}

// Resize "Create Post: Body" Font
export function createPostBodyFontSize(value) {
	if (value != '9' && value != false) {
		document.documentElement.style.setProperty('--re-create-post-body-font-size', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-create-post-body-font-size');
	}
}
