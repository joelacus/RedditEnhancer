// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Block
// ────────────────────────────────────────────────────────────────────────────

import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';

// Validate regex patterns in a comma-separated list.
// Returns true if all patterns that look like regex (starting with '/') are valid.
export function validateRegexList(value) {
	if (!value) return true;
	const patterns = value
		.split(',')
		.map((p) => p.trim())
		.filter((p) => p !== '' && p !== '*');
	for (const pattern of patterns) {
		const trimmed = pattern.trim();
		if (trimmed.startsWith('/')) {
			const match = trimmed.match(/^\/(.+?)\/([a-z]*)$/i);
			if (!match) {
				return false;
			}
			const patternBody = match[1];
			const flags = match[2] || 'i';
			try {
				new RegExp(patternBody, flags);
			} catch (e) {
				return false;
			}
		}
	}
	return true;
}

// Returns an array of invalid regex pattern strings from a comma-separated list.
export function getInvalidRegexPatterns(value) {
	if (!value) return [];
	const patterns = value
		.split(',')
		.map((p) => p.trim())
		.filter((p) => p !== '' && p !== '*');
	const invalid = [];
	for (const pattern of patterns) {
		const trimmed = pattern.trim();
		if (trimmed.startsWith('/')) {
			const match = trimmed.match(/^\/(.+?)\/([a-z]*)$/i);
			if (!match) {
				invalid.push(trimmed);
			} else {
				const patternBody = match[1];
				const flags = match[2] || 'i';
				try {
					new RegExp(patternBody, flags);
				} catch (e) {
					invalid.push(trimmed);
				}
			}
		}
	}
	return invalid;
}

// ─── Keywords ───────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Keyword Posts
document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedKeywordPosts: this.checked });
	sendMessage({ hideBlockedKeywordPosts: this.checked });
});

// Textarea - Hide Blocked Keyword Posts
document.querySelector('#input-blocked-keyword-posts').addEventListener(
	'input',
	debounce(function () {
		const keywordList = this.value;
		// Validate regex patterns and show error message
		const invalidEl = this.closest('li').querySelector('.info.invalid-regex');
		if (validateRegexList(keywordList)) {
			this.classList.remove('invalid-regex');
			if (invalidEl) invalidEl.textContent = '';
		} else {
			this.classList.add('invalid-regex');
			if (invalidEl) invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(keywordList).join(', ');
		}
		BROWSER_API.storage.sync.set({ hideBlockedKeywordPostsList: keywordList });
		const enabled = document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked;
		if (enabled) {
			console.log('Refreshing blocked posts...');
			sendMessage({ hideBlockedKeywordPosts: false });
			sendMessage({ hideBlockedKeywordPosts: true });
		}
	}, 1000),
);

// ─── Users ──────────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Users Posts
document.querySelector('#checkbox-hide-blocked-user-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedUserPosts: this.checked });
	sendMessage({ hideBlockedUserPosts: this.checked });
});

// Textarea - Hide Blocked Users Posts
document.querySelector('#input-blocked-user-posts').addEventListener(
	'input',
	debounce(function () {
		const userList = this.value;
		// Validate regex patterns and show error message
		const invalidEl = this.closest('li').querySelector('.info.invalid-regex');
		if (validateRegexList(userList)) {
			this.classList.remove('invalid-regex');
			if (invalidEl) invalidEl.textContent = '';
		} else {
			this.classList.add('invalid-regex');
			if (invalidEl) invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(userList).join(', ');
		}
		BROWSER_API.storage.sync.set({ hideBlockedUserPostsList: userList });
		const enabled = document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked;
		if (enabled) {
			console.log('Refreshing blocked posts...');
			sendMessage({ hideBlockedUserPosts: false });
			sendMessage({ hideBlockedUserPosts: true });
		}
	}, 1000),
);

// ─── Links ──────────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Link Posts
document.querySelector('#checkbox-hide-blocked-link-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-link-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedLinkPosts: this.checked });
	sendMessage({ hideBlockedLinkPosts: this.checked });
});

// Textarea - Hide Blocked Link Posts
document.querySelector('#input-blocked-link-posts').addEventListener(
	'input',
	debounce(function () {
		const linkKeywordsList = this.value;
		// Validate regex patterns and show error message
		const invalidEl = this.closest('li').querySelector('.info.invalid-regex');
		if (validateRegexList(linkKeywordsList)) {
			this.classList.remove('invalid-regex');
			if (invalidEl) invalidEl.textContent = '';
		} else {
			this.classList.add('invalid-regex');
			if (invalidEl) invalidEl.textContent = 'Invalid regex: ' + getInvalidRegexPatterns(linkKeywordsList).join(', ');
		}
		BROWSER_API.storage.sync.set({ hideBlockedLinkPostsList: linkKeywordsList });
		const enabled = document.querySelector('#checkbox-hide-blocked-link-posts-enable').checked;
		if (enabled) {
			console.log('Refreshing blocked posts...');
			sendMessage({ hideBlockedLinkPosts: false });
			sendMessage({ hideBlockedLinkPosts: true });
		}
	}, 1000),
);
