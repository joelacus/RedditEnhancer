/**
 * Tweaks: Resize Feed/Post - Feed Offset
 *
 * @name layoutOffset
 * @description Offset the feed/post by percentage horizontally.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadLayoutOffset() {
	BROWSER_API.storage.sync.get(['layoutOffset', 'layoutSubOffset', 'layoutPostOffset', 'layoutUserProfileOffset', 'layoutSearchPageOffset'], function (result) {
		if (result.layoutOffset) layoutOffset(result.layoutOffset);
		if (result.layoutSubOffset) layoutSubOffset(result.layoutSubOffset);
		if (result.layoutPostOffset) layoutPostOffset(result.layoutPostOffset);
		if (result.layoutUserProfileOffset) layoutUserProfileOffset(result.layoutUserProfileOffset);
		if (result.layoutSearchPageOffset) layoutSearchPageOffset(result.layoutSearchPageOffset);
	});
}

/* === Enable/Disable The Feature === */
export function layoutOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-offset', value + '%');
	}
}

// Layout Sub Offset
export function layoutSubOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-sub-offset', value + '%');
	}
}

// Layout Post Offset
export function layoutPostOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-post-offset', value + '%');
	}
}

// Layout User Profile Offset
export function layoutUserProfileOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-user-profile-offset', value + '%');
	}
}

// Layout Search Page Offset
export function layoutSearchPageOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-search-page-offset', value + '%');
	}
}
