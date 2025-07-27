/* ===== Restore Popup UI / Block ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Block" options.

export function restorePopupBlockOptions() {
	restoreHideBlockedKeywordPosts();
	restoreHideBlockedUserPosts();
	restoreHideBlockedLinkPosts();
}

// Hide Blocked Keyword Posts Enable
function restoreHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts', 'hideBlockedKeywordPostsList'], function (result) {
		if (result.hideBlockedKeywordPosts) {
			document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = true;
			highlightMenuIcon('block');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = false;
			var value = false;
		}
		console.log('Hide Blocked Keyword Posts Enable: ' + value);

		// Hide Blocked Keyword Posts List
		if (typeof result.hideBlockedKeywordPostsList != 'undefined') {
			var value = result.hideBlockedKeywordPostsList;
			document.querySelector('#input-blocked-keyword-posts').value = value;
		} else {
			var value = '';
		}
		console.log('Hide Blocked Keyword Posts List: ' + value);
	});
}

// Hide Blocked User Posts Enable
function restoreHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts', 'hideBlockedUserPostsList'], function (result) {
		if (result.hideBlockedUserPosts) {
			document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked = true;
			highlightMenuIcon('block');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked = false;
			var value = false;
		}
		console.log('Hide Blocked User Posts Enable: ' + value);

		// Hide Blocked User Posts List
		if (typeof result.hideBlockedUserPostsList != 'undefined') {
			var value = result.hideBlockedUserPostsList;
			document.querySelector('#input-blocked-user-posts').value = value;
		} else {
			var value = '';
		}
		console.log('Hide Blocked User Posts List: ' + value);
	});
}

// Hide Blocked Link Posts Enable
function restoreHideBlockedLinkPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedLinkPosts', 'hideBlockedLinkPostsList'], function (result) {
		if (result.hideBlockedLinkPosts) {
			document.querySelector('.icon-hide-blocked-link-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-blocked-link-posts-enable').checked = true;
			highlightMenuIcon('block');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-blocked-link-posts-enable').checked = false;
			var value = false;
		}
		console.log('Hide Blocked Link Posts Enable: ' + value);

		// Hide Blocked Link Posts List
		if (typeof result.hideBlockedLinkPostsList != 'undefined') {
			var value = result.hideBlockedLinkPostsList;
			document.querySelector('#input-blocked-link-posts').value = value;
		} else {
			var value = '';
		}
		console.log('Hide Blocked Link Posts List: ' + value);
	});
}
