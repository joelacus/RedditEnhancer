/* ===== Inputs / Hide Elements ===== */

import { sendMessage } from '../send_message';

// Toggle - Hide Reddit Premium
document.querySelector('#checkbox-hide-reddit-premium').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideRedditPremium: value });
	const icon = document.querySelector('.hide-reddit-premium');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideRedditPremium: value });
});

// Toggle - Hide Home Sidebar
document.querySelector('#checkbox-hide-home-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideHomeSidebar: value });
	const icon = document.querySelector('.icon-hide-home-sidebar');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideHomeSidebar: value });
});

// Toggle - Hide Sub Sidebar
document.querySelector('#checkbox-hide-sub-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSubSidebar: value });
	const icon = document.querySelector('.icon-hide-sub-sidebar');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSubSidebar: value });
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide Username In Sub Sidebar
document.querySelector('#checkbox-hide-username-in-sub-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ value });
	const icon = document.querySelector('.icon-hide-username-in-sub-sidebar');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideUsernameInSubSidebar: value });
});

// Toggle - Hide Post Sidebar
document.querySelector('#checkbox-hide-post-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hidePostSidebar: value });
	const icon = document.querySelector('.icon-hide-post-sidebar');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideUsernameInSubSidebar: value });
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide User Sidebar
document.querySelector('#checkbox-hide-user-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideUserSidebar: value });
	const icon = document.querySelector('.icon-hide-user-sidebar');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideUserSidebar: value });
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide Custom Feed Sidebar
document.querySelector('#checkbox-hide-custom-feed-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCustomFeedSidebar: value });
	const icon = document.querySelector('.icon-hide-custom-feed-sidebar');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideCustomFeedSidebar: value });
});

// Toggle - Sidebar Toggle Button
document.querySelector('#checkbox-sidebar-toggle-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ sidebarToggleButton: value });
	const icon = document.querySelector('.icon-sidebar-toggle-button');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ sidebarToggleButton: value });
});

// Toggle - Hide Advertise Button
document.querySelector('#checkbox-hide-advertise-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideAdvertiseButton: value });
	const icon = document.querySelector('.hide-advertise-button');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-advertise' : 'icon-advertise-slash', value ? 'icon-advertise-slash' : 'icon-advertise');
	sendMessage({ hideAdvertiseButton: value });
});

// Toggle - Hide Moderation Button
document.querySelector('#checkbox-hide-moderation-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideModerationButton: value });
	const icon = document.querySelector('.hide-moderation-button');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-mod' : 'icon-mod-slash', value ? 'icon-mod-slash' : 'icon-mod');
	sendMessage({ hideModerationButton: value });
});

// Toggle - Hide Chat Button
document.querySelector('#checkbox-hide-chat-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideChatButton: value });
	const icon = document.querySelector('.hide-chat-button');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-chat' : 'icon-chat-slash', value ? 'icon-chat-slash' : 'icon-chat');
	sendMessage({ hideChatButton: value });
});

// Toggle - Hide Notification Button
document.querySelector('#checkbox-hide-notification-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideNotificationButton: value });
	const icon = document.querySelector('.hide-notification-button');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-notification' : 'icon-notification-slash', value ? 'icon-notification-slash' : 'icon-notification');
	sendMessage({ hideNotificationButton: value });
});

// Toggle - Hide Create Post Button
document.querySelector('#checkbox-hide-create-post-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCreatePostButton: value });
	const icon = document.querySelector('.hide-create-post-button');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-plus' : 'icon-plus-slash', value ? 'icon-plus-slash' : 'icon-plus');
	sendMessage({ hideCreatePostButton: value });
});

// Toggle - Hide Username
document.querySelector('#checkbox-hide-username').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideUsername: value });
	const icon = document.querySelector('.hide-username');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-user' : 'icon-user-slash', value ? 'icon-user-slash' : 'icon-user');
	sendMessage({ hideUsername: value });
});

// Toggle - Hide Karma
document.querySelector('#checkbox-hide-karma').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideKarma: value });
	const icon = document.querySelector('.icon-hide-karma');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-karma' : 'icon-karma-slash', value ? 'icon-karma-slash' : 'icon-karma');
	sendMessage({ hideKarma: value });
});

// Toggle - Hide Get New Reddit
document.querySelector('#checkbox-hide-get-new-reddit').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideGetNewReddit: value });
	const icon = document.querySelector('.hide-get-new-reddit');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-hide' : 'icon-hide-slash', value ? 'icon-hide-slash' : 'icon-hide');
	sendMessage({ hideGetNewReddit: value });
});

// Toggle - Hide Promoted Links
document.querySelector('#checkbox-hide-promoted').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hidePromoted: value });
	const icon = document.querySelector('.icon-hide-promoted');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-ad' : 'icon-ad-slash', value ? 'icon-ad-slash' : 'icon-ad');
	sendMessage({ hidePromoted: value });
});

// Toggle - Hide Recommended Links
document.querySelector('#checkbox-hide-recommended').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideRecommended: value });
	const icon = document.querySelector('.icon-hide-recommended');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-hand' : 'icon-hand-slash', value ? 'icon-hand-slash' : 'icon-hand');
	sendMessage({ hideRecommended: value });
});

// Toggle - Hide Header Sub Bar
document.querySelector('#checkbox-hide-header-sub-bar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideHeaderSubBar: value });
	const icon = document.querySelector('.icon-hide-header-sub-bar');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-hide' : 'icon-hide-slash', value ? 'icon-hide-slash' : 'icon-hide');
	sendMessage({ hideHeaderSubBar: value });
});

// Toggle - Hide Side Menu Old
document.querySelector('#checkbox-hide-side-menu-old').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuOld: value });
	const icon = document.querySelector('.icon-hide-side-menu-old');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-hide' : 'icon-hide-slash', value ? 'icon-hide-slash' : 'icon-hide');
	sendMessage({ hideSideMenuOld: value });
});

// Toggle - Hide NSFW Links
document.querySelector('#checkbox-hide-nsfw').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideNSFW: value });
	const icon = document.querySelector('.icon-hide-nsfw');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-nsfw' : 'icon-nsfw-slash', value ? 'icon-nsfw-slash' : 'icon-nsfw');
	sendMessage({ hideNSFW: value });
});

// Toggle - Hide Sub Sidebar Exceptions
document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionsEnable: value });
	document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = value === true ? 'var(--accent)' : '';
});

// Button - Hide Sub Sidebar Whitelist
document.querySelector('#btn-hide-sub-sidebar-whitelist').addEventListener('click', (e) => {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-hide-sub-sidebar-whitelist').nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionMode: 'whitelist' });
});

// Button - Hide Sub Sidebar Blacklist
document.querySelector('#btn-hide-sub-sidebar-blacklist').addEventListener('click', (e) => {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-hide-sub-sidebar-blacklist').previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionMode: 'blacklist' });
});

// Textarea - Hide Sub Sidebar Exceptions
document.querySelector('#input-hide-sub-sidebar-exceptions').addEventListener('keyup', (e) => {
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionSubList: e.target.value });
});

// Toggle - Hide Header Bar
document.querySelector('#checkbox-hide-header-bar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideHeaderBar: value });
	const icon = document.querySelector('.icon-hide-header-bar');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-header' : 'icon-header-slash', value ? 'icon-header-slash' : 'icon-header');
	sendMessage({ hideHeaderBar: value });
});

// Toggle - Hide 'Get App' Button
document.querySelector('#checkbox-hide-get-app-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideGetAppButton: value });
	const icon = document.querySelector('.icon-hide-get-app-button');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideGetAppButton: value });
});

// Toggle - Hide AI In Search
document.querySelector('#checkbox-hide-ai-in-search').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideAiInSearch: value });
	const icon = document.querySelector('.icon-hide-ai-in-search');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideAiInSearch: value });
});

// Toggle - Hide Logo In Search
document.querySelector('#checkbox-hide-logo-in-search').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideLogoInSearch: value });
	const icon = document.querySelector('.icon-hide-logo-in-search');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideLogoInSearch: value });
});

// Toggle - Replace Search Bar Placeholder Text
document.querySelector('#checkbox-replace-search-bar-placeholder').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ replaceSearchPlaceholderText: value });
	const icon = document.querySelector('.icon-replace-search-bar-placeholder');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ replaceSearchPlaceholderText: value });
});

// Toggle - Hide Side Menu
function disableHideSideMenu() {
	BROWSER_API.storage.sync.set({ hideSideMenu: false });
	const icon = document.querySelector('.icon-hide-side-menu');
	icon.style.backgroundColor = '';
	icon.classList.replace('icon-hide', 'icon-show');
	sendMessage({ hideSideMenu: false });
}
document.querySelector('#checkbox-hide-side-menu').addEventListener('change', (e) => {
	if (e.target.checked) {
		// disable side menu toggle and side menu icons only
		disableSideMenuToggle();
		document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
		disableSideMenuIconsOnly();
		document.querySelector('#checkbox-side-menu-icons-only').checked = false;
		// enable hide side menu
		BROWSER_API.storage.sync.set({ hideSideMenu: true });
		const icon = document.querySelector('.icon-hide-side-menu');
		icon.style.backgroundColor = 'var(--accent)';
		icon.classList.replace('icon-show', 'icon-hide');
		sendMessage({ hideSideMenu: true });
	} else {
		disableHideSideMenu();
	}
});

// Toggle - Side Menu Show/Hide Toggle Button
function disableSideMenuToggle() {
	BROWSER_API.storage.sync.set({ sideMenuToggleButton: false });
	const icon = document.querySelector('.icon-side-menu-toggle-button');
	icon.style.backgroundColor = '';
	icon.classList.replace('icon-show', 'icon-hide');
	sendMessage({ sideMenuToggleButton: false });
}
document.querySelector('#checkbox-side-menu-toggle-button').addEventListener('change', (e) => {
	if (e.target.checked) {
		// disable hide side menu and side menu icons only
		disableHideSideMenu();
		document.querySelector('#checkbox-hide-side-menu').checked = false;
		disableSideMenuIconsOnly();
		document.querySelector('#checkbox-side-menu-icons-only').checked = false;
		// enable side menu toggle
		BROWSER_API.storage.sync.set({ sideMenuToggleButton: true });
		const icon = document.querySelector('.icon-side-menu-toggle-button');
		icon.style.backgroundColor = 'var(--accent)';
		icon.classList.replace('icon-hide', 'icon-show');
		sendMessage({ sideMenuToggleButton: true });
	} else {
		disableSideMenuToggle();
	}
});

// Toggle - Hide Side Menu Top Section
document.querySelector('#checkbox-hide-side-menu-top-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuTopSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-top-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuTopSection: value });
});

// Toggle - Hide Side Menu Games Section
document.querySelector('#checkbox-hide-side-menu-games-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuGamesSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-games-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuGamesSection: value });
});

// Toggle - Hide Side Menu Moderation Section
document.querySelector('#checkbox-hide-side-menu-moderation-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuModerationSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-moderation-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuModerationSection: value });
});

// Toggle - Hide Side Menu Recent Section
document.querySelector('#checkbox-hide-side-menu-recent-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuRecentSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-recent-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuRecentSection: value });
});

// Toggle - Hide Side Menu Custom Feeds Section
document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuCustomFeedsSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-custom-feeds-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuCustomFeedsSection: value });
});

// Toggle - Hide Side Menu Communities Section
document.querySelector('#checkbox-hide-side-menu-communities-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuCommunitiesSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-communities-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuCommunitiesSection: value });
});

// Toggle - Hide Side Menu Resources Section
document.querySelector('#checkbox-hide-side-menu-resources-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuResourcesSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-resources-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuResourcesSection: value });
});

// Toggle - Hide Side Menu Topics Section
document.querySelector('#checkbox-hide-side-menu-topics-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuTopicsSection: value });
	const icon = document.querySelector('.icon-hide-side-menu-topics-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSideMenuTopicsSection: value });
});

// Toggle - Hide Related Posts Section in Sidebar
document.querySelector('#checkbox-hide-related-posts-section').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideRelatedPostsSection: value });
	const icon = document.querySelector('.icon-hide-related-posts-section');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideRelatedPostsSection: value });
});

// Toggle - Hide User Profile Pics
document.querySelector('#checkbox-hide-user-profile-pics').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideUserProfilePics: value });
	const icon = document.querySelector('.icon-hide-user-profile-pics');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideUserProfilePics: value });
});

// Toggle - Hide Post Hidden Message
document.querySelector('#checkbox-hide-post-hidden-message').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hidePostHiddenMessage: value });
	const icon = document.querySelector('.icon-hide-post-hidden-message');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hidePostHiddenMessage: value });
});

// Toggle - Hide Join Button On r/all Posts
document.querySelector('#checkbox-hide-join-button-on-posts').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideJoinButtonOnPosts: value });
	const icon = document.querySelector('.icon-hide-join-button-on-posts');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideJoinButtonOnPosts: value });
});

// Toggle - Hide Search Sidebar
document.querySelector('#checkbox-hide-search-sidebar').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSearchSidebar: value });
	const icon = document.querySelector('.icon-hide-search-sidebar');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSearchSidebar: value });
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide Blocked Keyword Posts
document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideBlockedKeywordPosts: value });
	document.querySelector('.icon-hide-blocked-keyword-posts').style.backgroundColor = value ? 'var(--accent)' : '';
	sendMessage({ hideBlockedKeywordPosts: value });
});

// Textarea - Hide Blocked Keyword Posts
let timeout;
document.querySelector('#input-blocked-keyword-posts').addEventListener('keyup', (e) => {
	const keywordList = e.target.value;
	BROWSER_API.storage.sync.set({ hideBlockedKeywordPostsList: keywordList });
	// apply blocked keywords after 2 seconds of no input if enabled
	const enabled = document.querySelector('#checkbox-hide-blocked-keyword-posts-enable').checked;
	if (enabled) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			console.log('Refreshing blocked posts...');
			sendMessage({ hideBlockedKeywordPosts: false });
			sendMessage({ hideBlockedKeywordPosts: true });
		}, 2000);
	}
});

// Toggle - Hide Post Back Button
document.querySelector('#checkbox-hide-post-back-button').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hidePostBackButton: value });
	const icon = document.querySelector('.icon-hide-post-back-button');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hidePostBackButton: value });
});

// Toggle - Hide Post Karma
document.querySelector('#checkbox-hide-post-karma').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hidePostKarma: value });
	const icon = document.querySelector('.icon-hide-post-karma');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hidePostKarma: value });
});

// Toggle - Hide Comment Karma
document.querySelector('#checkbox-hide-comment-karma').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCommentKarma: value });
	const icon = document.querySelector('.icon-hide-comment-karma');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideCommentKarma: value });
});

// Toggle - Hide Recent Posts
document.querySelector('#checkbox-hide-recent-posts').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideRecentPosts: value });
	const icon = document.querySelector('.icon-hide-recent-posts');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideRecentPosts: value });
});

// Toggle - Hide Side Menu Star
document.querySelector('#checkbox-hide-side-menu-star').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSideMenuFavouriteButton: value });
	const icon = document.querySelector('.icon-hide-side-menu-star');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-star' : 'icon-star-slash', value ? 'icon-star-slash' : 'icon-star');
	sendMessage({ hideSideMenuFavouriteButton: value });
});

// Toggle - Side Menu Icons Only
function disableSideMenuIconsOnly() {
	BROWSER_API.storage.sync.set({ sideMenuIconsOnly: false });
	document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = '';
	document.querySelector('.icon-side-menu-icons-only').classList.replace('icon-side-menu-icons', 'icon-side-menu-list');
	sendMessage({ sideMenuIconsOnly: false });
}
document.querySelector('#checkbox-side-menu-icons-only').addEventListener('change', (e) => {
	if (document.querySelector('#checkbox-side-menu-icons-only').checked) {
		// disable hide side menu and side menu toggle
		disableHideSideMenu();
		document.querySelector('#checkbox-hide-side-menu').checked = false;
		disableSideMenuToggle();
		document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
		BROWSER_API.storage.sync.set({ sideMenuIconsOnly: true });
		document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-side-menu-icons-only').classList.replace('icon-side-menu-list', 'icon-side-menu-icons');
		sendMessage({ sideMenuIconsOnly: true });
	} else {
		disableSideMenuIconsOnly();
	}
});

// Toggle - Hide Blank Thumbnails In Compact View
document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCompactViewBlankThumbnails: value });
	const icon = document.querySelector('.icon-hide-compact-view-blank-thumbnails');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideCompactViewBlankThumbnails: value });
});

// Toggle - Hide Thumbnails In Compact View
document.querySelector('#checkbox-hide-compact-view-thumbnails').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCompactViewThumbnails: value });
	const icon = document.querySelector('.icon-hide-compact-view-thumbnails');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideCompactViewThumbnails: value });
});

// Toggle - Hide "NSFW" In The Search Results
document.querySelector('#checkbox-hide-nsfw-search-results').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideNsfwInSearchResults: value });
	const icon = document.querySelector('.icon-hide-nsfw-search-results');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideNsfwInSearchResults: value });
});

// Toggle - Hide "Trending Today" In The Search Results
document.querySelector('#checkbox-hide-trending-today-in-search-results').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideTrendingTodayInSearchResults: value });
	const icon = document.querySelector('.icon-hide-trending-today-in-search-results');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideTrendingTodayInSearchResults: value });
});

// Toggle - Hide Community Highlights
document.querySelector('#checkbox-hide-community-highlights').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCommunityHighlights: value });
	const icon = document.querySelector('.icon-hide-community-highlights');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-thumbtack' : 'icon-thumbtack-slash', value ? 'icon-thumbtack-slash' : 'icon-thumbtack');
	sendMessage({ hideCommunityHighlights: value });
});

// Toggle - Hide NSFW Users In The Search Page Sidebar
document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSearchSidebarNsfwUsers: value });
	const icon = document.querySelector('.icon-hide-search-sidebar-nsfw-users');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSearchSidebarNsfwUsers: value });
});

// Toggle - Hide Home Feed
document.querySelector('#checkbox-hide-home-feed').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideHomeFeed: value });
	const icon = document.querySelector('.icon-hide-home-feed');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideHomeFeed: value });
});

// Toggle - Hide Post Divider
document.querySelector('#checkbox-hide-post-divider').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hidePostDivider: value });
	const icon = document.querySelector('.icon-hide-post-divider');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hidePostDivider: value });
	if (value && document.querySelector('#input-post-separator-height').value != -1) {
		document.querySelector('.icon-post-separator-height').style.backgroundColor = 'var(--accent)';
	}
});

// Slider - Post Separator Height
document.querySelector('#input-post-separator-height').addEventListener('input', (e) => {
	const value = e.target.value;
	const enabled = document.querySelector('#checkbox-hide-post-divider').checked;
	document.querySelector('.icon-post-separator-height').style.backgroundColor = enabled && value != -1 ? 'var(--accent)' : '';
	document.querySelector('#post-separator-height-value').textContent = value != -1 ? value + 'px' : '';
	sendMessage({ postSeparatorHeight: value });
});
document.querySelector('#input-post-separator-height').addEventListener('mouseup', (e) => {
	BROWSER_API.storage.sync.set({ postSeparatorHeight: e.target.value });
});

// Toggle - Hide Vote Buttons
document.querySelector('#checkbox-hide-vote-buttons').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideVoteButtons: value });
	const icon = document.querySelector('.icon-hide-vote-buttons');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideVoteButtons: value });
});

// Toggle - Hide Video Recommendations
document.querySelector('#checkbox-hide-video-recommendations').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideVideoRecommendations: value });
	const icon = document.querySelector('.icon-hide-video-recommendations');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideVideoRecommendations: value });
});

// Toggle - Hide Community Status
document.querySelector('#checkbox-hide-community-status').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideCommunityStatus: value });
	const icon = document.querySelector('.icon-hide-community-status');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideCommunityStatus: value });
});

// Toggle - Hide Awards
document.querySelector('#checkbox-hide-awards').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideAwards: value });
	const icon = document.querySelector('.icon-hide-awards');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideAwards: value });
});

// Toggle - Hide Search Hero
document.querySelector('#checkbox-hide-search-hero').addEventListener('change', (e) => {
	const value = e.target.checked;
	BROWSER_API.storage.sync.set({ hideSearchHero: value });
	const icon = document.querySelector('.icon-hide-search-hero');
	icon.style.backgroundColor = value ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
	sendMessage({ hideSearchHero: value });
});
