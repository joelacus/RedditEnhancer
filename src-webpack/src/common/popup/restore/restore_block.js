// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Block
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { validateRegexList, getInvalidRegexPatterns } from '../inputs/inputs_block.js';

// Restore UI settings for "Block" options.

export function restorePopupBlockOptions() {
	restoreHideBlockedKeywordPosts();
	restoreHideBlockedUserPosts();
	restoreHideBlockedLinkPosts();
}

// Hide Blocked Keyword Posts Enable
function restoreHideBlockedKeywordPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedKeywordPosts', 'hideBlockedKeywordPostsList'], function (result) {
		const checked = result.hideBlockedKeywordPosts === true;
		document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked Keyword Posts Enable: ' + checked);

		// Hide Blocked Keyword Posts List
		const list = result.hideBlockedKeywordPostsList ?? '';
		const textarea = document.querySelector('#input-blocked-keyword-posts');
		textarea.value = list;
		// Validate regex patterns and show error message
		const invalidEl = textarea.closest('li').querySelector('.info.invalid-regex');
		if (validateRegexList(list)) {
			textarea.classList.remove('invalid-regex');
			if (invalidEl) invalidEl.textContent = '';
		} else {
			textarea.classList.add('invalid-regex');
			if (invalidEl) invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(list).join(', ');
		}
		console.log('Hide Blocked Keyword Posts List: ' + list);
	});
}

// Hide Blocked User Posts Enable
function restoreHideBlockedUserPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedUserPosts', 'hideBlockedUserPostsList'], function (result) {
		const checked = result.hideBlockedUserPosts === true;
		document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked User Posts Enable: ' + checked);

		// Hide Blocked User Posts List
		const list = result.hideBlockedUserPostsList ?? '';
		const textarea = document.querySelector('#input-blocked-user-posts');
		textarea.value = list;
		// Validate regex patterns and show error message
		const invalidEl = textarea.closest('li').querySelector('.info.invalid-regex');
		if (validateRegexList(list)) {
			textarea.classList.remove('invalid-regex');
			if (invalidEl) invalidEl.textContent = '';
		} else {
			textarea.classList.add('invalid-regex');
			if (invalidEl) invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(list).join(', ');
		}
		console.log('Hide Blocked User Posts List: ' + list);
	});
}

// Hide Blocked Link Posts Enable
function restoreHideBlockedLinkPosts() {
	BROWSER_API.storage.sync.get(['hideBlockedLinkPosts', 'hideBlockedLinkPostsList'], function (result) {
		const checked = result.hideBlockedLinkPosts === true;
		document.querySelector('#checkbox-hide-blocked-link-posts-enable').checked = checked;
		document.querySelector('.icon-hide-blocked-link-posts').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('block');
		console.log('Hide Blocked Link Posts Enable: ' + checked);

		// Hide Blocked Link Posts List
		const list = result.hideBlockedLinkPostsList ?? '';
		const textarea = document.querySelector('#input-blocked-link-posts');
		textarea.value = list;
		// Validate regex patterns and show error message
		const invalidEl = textarea.closest('li').querySelector('.info.invalid-regex');
		if (validateRegexList(list)) {
			textarea.classList.remove('invalid-regex');
			if (invalidEl) invalidEl.textContent = '';
		} else {
			textarea.classList.add('invalid-regex');
			if (invalidEl) invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(list).join(', ');
		}
		console.log('Hide Blocked Link Posts List: ' + list);
	});
}
