// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Block
// ────────────────────────────────────────────────────────────────────────────

import { sendMessage } from '../../utilities/send_message';

// ─── Keywords ───────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Keyword Posts
document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedKeywordPosts: this.checked });
	sendMessage({ hideBlockedKeywordPosts: this.checked });
});

// ─── Users ──────────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Users Posts
document.querySelector('#checkbox-hide-blocked-user-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedUserPosts: this.checked });
	sendMessage({ hideBlockedUserPosts: this.checked });
});

// ─── Links ──────────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Link Posts
document.querySelector('#checkbox-hide-blocked-link-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-link-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedLinkPosts: this.checked });
	sendMessage({ hideBlockedLinkPosts: this.checked });
});

// ─── Subreddits ─────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Subreddit Posts
document.querySelector('#checkbox-hide-blocked-subreddit-posts-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-subreddit-posts').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedSubredditPosts: this.checked });
	sendMessage({ hideBlockedSubredditPosts: this.checked });
});

// ─── Comments ───────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Keyword Comments
document.querySelector('#checkbox-hide-blocked-keyword-comments-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-keyword-comments').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedKeywordComments: this.checked });
	sendMessage({ hideBlockedKeywordComments: this.checked });
});

// Toggle - Hide Blocked User Comments
document.querySelector('#checkbox-hide-blocked-user-comments-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-user-comments').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedUserComments: this.checked });
	sendMessage({ hideBlockedUserComments: this.checked });
});

// ─── Search ─────────────────────────────────────────────────────────────────

// Toggle - Hide Blocked Entries in Search
document.querySelector('#checkbox-hide-blocked-search-entries-enable').addEventListener('change', function () {
	document.querySelector('.icon-hide-blocked-search-entries').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedSearchEntries: this.checked });
	sendMessage({ hideBlockedSearchEntries: this.checked });
});

// ─── Block Manager ──────────────────────────────────────────────────────────

// Open the Block Manager on the relevant tab for each section button.
document.querySelectorAll('.btn-open-block-manager').forEach((button) => {
	button.addEventListener('click', function () {
		BROWSER_API.runtime.sendMessage({ openBlockManager: true, tab: this.dataset.tab || 'users' });
	});
});
