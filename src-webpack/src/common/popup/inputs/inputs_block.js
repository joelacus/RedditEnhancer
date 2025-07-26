/* ===== Inputs / Hide Elements ===== */

import { sendMessage } from '../send_message';

// Toggle - Hide Blocked Keyword Posts
document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').addEventListener('change', function () {
	const hideBlockedKeywordPostsEnable = document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked;
	document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = hideBlockedKeywordPostsEnable === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedKeywordPosts: hideBlockedKeywordPostsEnable });
	sendMessage({ hideBlockedKeywordPosts: hideBlockedKeywordPostsEnable });
});

// Textarea - Hide Blocked Keyword Posts
let timeout_keywords;
document.querySelector('#input-blocked-keyword-posts').addEventListener('keyup', function (e) {
	const keywordList = e.target.value;
	BROWSER_API.storage.sync.set({ hideBlockedKeywordPostsList: keywordList });
	// apply blocked keywords after 2 seconds of no input if enabled
	const hideBlockedKeywordPostsEnable = document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked;
	if (hideBlockedKeywordPostsEnable) {
		clearTimeout(timeout_keywords);
		timeout_keywords = setTimeout(() => {
			console.log('Refreshing blocked posts...');
			sendMessage({ hideBlockedKeywordPosts: false });
			sendMessage({ hideBlockedKeywordPosts: true });
		}, 2000);
	}
});

// Toggle - Hide Blocked Users Posts
document.querySelector('#checkbox-hide-blocked-user-posts-enable').addEventListener('change', function () {
	const hideBlockedUserPostsEnable = document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked;
	document.querySelector('.icon-hide-blocked-user-posts').style.backgroundColor = hideBlockedUserPostsEnable === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ hideBlockedUserPosts: hideBlockedUserPostsEnable });
	sendMessage({ hideBlockedUserPosts: hideBlockedUserPostsEnable });
});

// Textarea - Hide Blocked Users Posts
let timeout_users;
document.querySelector('#input-blocked-user-posts').addEventListener('keyup', function (e) {
	const UserList = e.target.value;
	BROWSER_API.storage.sync.set({ hideBlockedUserPostsList: UserList });
	// apply blocked users after 2 seconds of no input if enabled
	const hideBlockedUserPostsEnable = document.querySelector('#checkbox-hide-blocked-user-posts-enable').checked;
	if (hideBlockedUserPostsEnable) {
		clearTimeout(timeout_users);
		timeout_users = setTimeout(() => {
			console.log('Refreshing blocked posts...');
			sendMessage({ hideBlockedUserPosts: false });
			sendMessage({ hideBlockedUserPosts: true });
		}, 2000);
	}
});
