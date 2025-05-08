/* ===== Restore Popup UI / Block ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Block" options.

export function restorePopupBlockOptions() {
	// Hide Blocked Keyword Posts Enable
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts'], function (result) {
		if (result.hideBlockedKeywordPosts === true) {
			document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = true;
			highlightMenuIcon('block');
			var value = true;
		} else if (typeof result.hideBlockedKeywordPosts === 'undefined' || result.hideBlockedKeywordPosts === false) {
			document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = false;
			var value = false;
		}
		console.log('Hide Blocked Keyword Posts Enable: ' + value);
	});
}
