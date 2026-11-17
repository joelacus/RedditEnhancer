// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Block
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Block" options.
// Block lists themselves live in the Block Manager (block store).

export function restorePopupBlockOptions() {
	restoreHideBlockedKeywordPosts();
	restoreHideBlockedUserPosts();
	restoreHideBlockedLinkPosts();
	restoreHideBlockedSubredditPosts();
	restoreHideBlockedKeywordComments();
	restoreHideBlockedUserComments();
}

// Hide Blocked Keyword Posts Enable
function restoreHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts'], function (result) {
		const checked = result.hideBlockedKeywordPosts === true;
		document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked Keyword Posts Enable: ' + checked);
	});
}

// Hide Blocked User Posts Enable
function restoreHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts'], function (result) {
		const checked = result.hideBlockedUserPosts === true;
		document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked User Posts Enable: ' + checked);
	});
}

// Hide Blocked Link Posts Enable
function restoreHideBlockedLinkPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedLinkPosts'], function (result) {
		const checked = result.hideBlockedLinkPosts === true;
		document.querySelector('#checkbox-hide-blocked-link-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-link-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked Link Posts Enable: ' + checked);
	});
}

// Hide Blocked Subreddit Posts Enable
function restoreHideBlockedSubredditPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedSubredditPosts'], function (result) {
		const checked = result.hideBlockedSubredditPosts === true;
		document.querySelector('#checkbox-hide-blocked-subreddit-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-subreddit-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked Subreddit Posts Enable: ' + checked);
	});
}

// Hide Blocked Keyword Comments Enable
function restoreHideBlockedKeywordComments() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordComments'], function (result) {
		const checked = result.hideBlockedKeywordComments === true;
		document.querySelector('#checkbox-hide-blocked-keyword-comments-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-keyword-comments').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked Keyword Comments Enable: ' + checked);
	});
}

// Hide Blocked User Comments Enable
function restoreHideBlockedUserComments() {
	BROWSER_API.storage.sync.get(['hideBlockedUserComments'], function (result) {
		const checked = result.hideBlockedUserComments === true;
		document.querySelector('#checkbox-hide-blocked-user-comments-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-user-comments').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked User Comments Enable: ' + checked);
	});
}
