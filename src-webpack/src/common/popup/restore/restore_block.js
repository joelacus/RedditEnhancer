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
		const value = result.hideBlockedKeywordPosts === true;
		document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = value;
		document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('block');
		console.log('Hide Blocked Keyword Posts Enable: ' + value);

		// Hide Blocked Keyword Posts List
		const list = result.hideBlockedKeywordPostsList ?? '';
		document.querySelector('#input-blocked-keyword-posts').value = list;
		console.log('Hide Blocked Keyword Posts List: ' + value);
	});
}

// Hide Blocked User Posts Enable
function restoreHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts', 'hideBlockedUserPostsList'], function (result) {
		const value = result.hideBlockedUserPosts === true;
		document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked = value;
		document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('block');
		console.log('Hide Blocked User Posts Enable: ' + value);

		// Hide Blocked User Posts List
		const list = result.hideBlockedUserPostsList ?? '';
		document.querySelector('#input-blocked-user-posts').value = list;
		console.log('Hide Blocked User Posts List: ' + list);
	});
}

// Hide Blocked Link Posts Enable
function restoreHideBlockedLinkPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedLinkPosts', 'hideBlockedLinkPostsList'], function (result) {
		const value = result.hideBlockedLinkPosts === true;
		document.querySelector('#checkbox-hide-blocked-link-posts-enable').checked = value;
		document.querySelector('.icon-hide-blocked-link-posts').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('block');
		console.log('Hide Blocked Link Posts Enable: ' + value);

		// Hide Blocked Link Posts List
		const list = result.hideBlockedLinkPostsList ?? '';
		document.querySelector('#input-blocked-link-posts').value = list;
		console.log('Hide Blocked Link Posts List: ' + list);
	});
}
