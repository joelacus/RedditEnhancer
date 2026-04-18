/**
 * Tweaks: Resize Feed/Post - Feed Offset
 *
 * @name layoutOffset
 * @description Offset the feed/post by percentage horizontally.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { validateInt } from '../../../popup/restore/validation';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadLayoutOffset() {
	BROWSER_API.storage.sync.get(['layoutOffset', 'layoutSubOffset', 'layoutPostOffset', 'layoutUserProfileOffset', 'layoutSearchPageOffset'], function (result) {
		layoutOffset(validateInt(parseInt(result.layoutOffset), -100, 100, 0));
		layoutSubOffset(validateInt(parseInt(result.layoutSubOffset), -100, 100, 0));
		layoutPostOffset(validateInt(parseInt(result.layoutPostOffset), -100, 100, 0));
		layoutUserProfileOffset(validateInt(parseInt(result.layoutUserProfileOffset), -100, 100, 0));
		layoutSearchPageOffset(validateInt(parseInt(result.layoutSearchPageOffset), -100, 100, 0));
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

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
