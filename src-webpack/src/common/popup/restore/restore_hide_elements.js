/* ===== Restore Popup UI / Hide Elements ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Hide Elements" options.

export function restorePopupHideElementsOptions() {
	// Hide Reddit Premium
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		const value = result.hideRedditPremium === true;
		document.querySelector('#checkbox-hide-reddit-premium').checked = value;
		const icon = document.querySelector('.hide-reddit-premium');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Reddit Premium: ' + value);
	});

	// Hide Home Sidebar
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		const value = result.hideHomeSidebar === true;
		document.querySelector('#checkbox-hide-home-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-home-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Home Sidebar: ' + value);
	});

	// Hide Sub Sidebar
	BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
		const value = result.hideSubSidebar === true;
		document.querySelector('#checkbox-hide-sub-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-sub-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Sub Sidebar: ' + value);
	});

	// Hide Username In Subreddit Sidebar
	BROWSER_API.storage.sync.get(['hideUsernameInSubSidebar'], function (result) {
		const value = result.hideUsernameInSubSidebar === true;
		document.querySelector('#checkbox-hide-username-in-sub-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-username-in-sub-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Username In Sub Sidebar: ' + value);
	});

	// Hide Post Sidebar
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		const value = result.hidePostSidebar === true;
		document.querySelector('#checkbox-hide-post-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-post-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Post Sidebar: ' + value);
	});

	// Hide User Sidebar
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		const value = result.hideUserSidebar === true;
		document.querySelector('#checkbox-hide-user-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-user-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide User Sidebar: ' + value);
	});

	// Hide Custom Feed Sidebar
	BROWSER_API.storage.sync.get(['hideCustomFeedSidebar'], function (result) {
		const value = result.hideCustomFeedSidebar === true;
		document.querySelector('#checkbox-hide-custom-feed-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-custom-feed-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Custom Feed Sidebar: ' + value);
	});

	// Sidebar Toggle Button
	BROWSER_API.storage.sync.get(['sidebarToggleButton'], function (result) {
		const value = result.sidebarToggleButton === true;
		document.querySelector('#checkbox-sidebar-toggle-button').checked = value;
		const icon = document.querySelector('.icon-sidebar-toggle-button');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Vote Buttons: ' + value);
	});

	// Hide Search Sidebar
	BROWSER_API.storage.sync.get(['hideSearchSidebar'], function (result) {
		const value = result.hideSearchSidebar === true;
		document.querySelector('#checkbox-hide-search-sidebar').checked = value;
		const icon = document.querySelector('.icon-hide-search-sidebar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Search Sidebar: ' + value);
	});

	// Hide Advertise Button
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		const value = result.hideAdvertiseButton === true;
		document.querySelector('#checkbox-hide-advertise-button').checked = value;
		const icon = document.querySelector('.hide-advertise-button');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-advertise' : 'icon-advertise-slash', value ? 'icon-advertise-slash' : 'icon-advertise');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Advertise Button: ' + value);
	});

	// Hide Moderation Button
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		const value = result.hideModerationButton === true;
		document.querySelector('#checkbox-hide-moderation-button').checked = value;
		const icon = document.querySelector('.hide-moderation-button');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-mod' : 'icon-mod-slash', value ? 'icon-mod-slash' : 'icon-mod');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Moderation Button: ' + value);
	});

	// Hide Chat Button
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		const value = result.hideChatButton === true;
		document.querySelector('#checkbox-hide-chat-button').checked = value;
		const icon = document.querySelector('.hide-chat-button');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-chat' : 'icon-chat-slash', value ? 'icon-chat-slash' : 'icon-chat');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Chat Button: ' + value);
	});

	// Hide Notification Button
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		const value = result.hideNotificationButton === true;
		document.querySelector('#checkbox-hide-notification-button').checked = value;
		const icon = document.querySelector('.hide-notification-button');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-notification' : 'icon-notification-slash', value ? 'icon-notification-slash' : 'icon-notification');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Notification Button: ' + value);
	});

	// Hide Create Post Button
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		const value = result.hideCreatePostButton === true;
		document.querySelector('#checkbox-hide-create-post-button').checked = value;
		const icon = document.querySelector('.hide-create-post-button');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-plus' : 'icon-plus-slash', value ? 'icon-plus-slash' : 'icon-plus');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Create Post Button: ' + value);
	});

	// Hide Username
	BROWSER_API.storage.sync.get(['hideUsername'], function (result) {
		const value = result.hideUsername === true;
		document.querySelector('#checkbox-hide-username').checked = value;
		const icon = document.querySelector('.hide-username');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-user' : 'icon-user-slash', value ? 'icon-user-slash' : 'icon-user');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Username: ' + value);
	});

	// Hide Karma
	BROWSER_API.storage.sync.get(['hideKarma'], function (result) {
		const value = result.hideKarma === true;
		document.querySelector('#checkbox-hide-karma').checked = value;
		const icon = document.querySelector('.icon-hide-karma');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-karma' : 'icon-karma-slash', value ? 'icon-karma-slash' : 'icon-karma');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Karma: ' + value);
	});

	// Hide Get New Reddit
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		const value = result.hideGetNewReddit === true;
		document.querySelector('#checkbox-hide-get-new-reddit').checked = value;
		const icon = document.querySelector('.hide-get-new-reddit');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Get New Reddit Button: ' + value);
	});

	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		const value = result.hidePromoted === true;
		document.querySelector('#checkbox-hide-promoted').checked = value;
		const icon = document.querySelector('.icon-hide-promoted');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-ad' : 'icon-ad-slash', value ? 'icon-ad-slash' : 'icon-ad');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Promoted Posts: ' + value);
	});

	// Hide Recommended Links
	BROWSER_API.storage.sync.get(['hideRecommended'], function (result) {
		const value = result.hideRecommended === true;
		document.querySelector('#checkbox-hide-recommended').checked = value;
		const icon = document.querySelector('.icon-hide-recommended');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-hand' : 'icon-hand-slash', value ? 'icon-hand-slash' : 'icon-hand');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Recommended Posts: ' + value);
	});

	// Hide NSFW Links
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		const value = result.hideNSFW === true;
		document.querySelector('#checkbox-hide-nsfw').checked = value;
		const icon = document.querySelector('.icon-hide-nsfw');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-nsfw' : 'icon-nsfw-slash', value ? 'icon-nsfw-slash' : 'icon-nsfw');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide NSFW Links: ' + value);
	});

	// Hide Header Sub Bar
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		const value = result.hideHeaderSubBar === true;
		document.querySelector('#checkbox-hide-header-sub-bar').checked = value;
		const icon = document.querySelector('.icon-hide-header-sub-bar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Header Sub Bar: ' + value);
	});

	// Hide Side Menu Old
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		const value = result.hideSideMenuOld === true;
		document.querySelector('#checkbox-hide-side-menu-old').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-old');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Old: ' + value);
	});

	// Hide Side Menu
	BROWSER_API.storage.sync.get(['hideSideMenu'], function (result) {
		const value = result.hideSideMenu === true;
		document.querySelector('#checkbox-hide-side-menu').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu: ' + value);
	});

	// Hide Sub Sidebar Exceptions Enable
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionsEnable'], function (result) {
		const value = result.hideSubSidebarExceptionsEnable === true;
		document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').checked = value;
		document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Sub Sidebar Exceptions Enable: ' + value);
	});

	// Hide Sub Sidebar Exception Mode
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionMode'], function (result) {
		const value = result.hideSubSidebarExceptionMode === 'whitelist' ? 'whitelist' : 'blacklist';
		if (value === 'whitelist') {
			document.querySelector('#btn-hide-sub-sidebar-blacklist').classList.remove('tab-active');
			document.querySelector('#btn-hide-sub-sidebar-whitelist').classList.add('tab-active');
			document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.remove('hidden');
			document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.add('hidden');
		}
		console.log('Hide Sub Sidebar Exception Mode: ' + value);
	});

	// Hide Sub Sidebar Exceptions List
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionSubList'], function (result) {
		const value = result.hideSubSidebarExceptionSubList ?? '';
		document.querySelector('#input-hide-sub-sidebar-exceptions').value = value;
		console.log('Hide Sub Sidebar Exceptions Sub List: ' + value);
	});

	// Hide Header Bar
	BROWSER_API.storage.sync.get(['hideHeaderBar'], function (result) {
		const value = result.hideHeaderBar === true;
		document.querySelector('#checkbox-hide-header-bar').checked = value;
		const icon = document.querySelector('.icon-hide-header-bar');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-header' : 'icon-header-slash', value ? 'icon-header-slash' : 'icon-header');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Header Bar: ' + value);
	});

	// Hide 'Get App' Button
	BROWSER_API.storage.sync.get(['hideGetAppButton'], function (result) {
		const value = result.hideGetAppButton === true;
		document.querySelector('#checkbox-hide-get-app-button').checked = value;
		const icon = document.querySelector('.icon-hide-get-app-button');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide "Get App" Button: ' + value);
	});

	// Hide AI In Search
	BROWSER_API.storage.sync.get(['hideAiInSearch'], function (result) {
		const value = result.hideAiInSearch === true;
		document.querySelector('#checkbox-hide-ai-in-search').checked = value;
		const icon = document.querySelector('.icon-hide-ai-in-search');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide AI In Search: ' + value);
	});

	// Hide Logo In Search
	BROWSER_API.storage.sync.get(['hideLogoInSearch'], function (result) {
		const value = result.hideLogoInSearch === true;
		document.querySelector('#checkbox-hide-logo-in-search').checked = value;
		document.querySelector('.icon-hide-logo-in-search').style.backgroundColor = value === true ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-logo-in-search').classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Logo In Search: ' + value);
	});

	// Replace Search Bar Placeholder Text
	BROWSER_API.storage.sync.get(['replaceSearchPlaceholderText'], function (result) {
		const value = result.replaceSearchPlaceholderText === true;
		document.querySelector('#checkbox-replace-search-bar-placeholder').checked = value;
		const icon = document.querySelector('.icon-replace-search-bar-placeholder');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Replace Search Bar Placeholder Text: ' + value);
	});

	// Hide Side Menu Top Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection'], function (result) {
		const value = result.hideSideMenuTopSection === true;
		document.querySelector('#checkbox-hide-side-menu-top-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-top-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Top Section: ' + value);
	});

	// Hide Side Menu Games Section
	BROWSER_API.storage.sync.get(['hideSideMenuGamesSection'], function (result) {
		const value = result.hideSideMenuGamesSection === true;
		document.querySelector('#checkbox-hide-side-menu-games-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-games-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Games Section: ' + value);
	});

	// Hide Side Menu Moderation Section
	BROWSER_API.storage.sync.get(['hideSideMenuModerationSection'], function (result) {
		const value = result.hideSideMenuModerationSection === true;
		document.querySelector('#checkbox-hide-side-menu-moderation-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-moderation-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Moderation Section: ' + value);
	});

	// Hide Side Menu Recent Section
	BROWSER_API.storage.sync.get(['hideSideMenuRecentSection'], function (result) {
		const value = result.hideSideMenuRecentSection === true;
		document.querySelector('#checkbox-hide-side-menu-recent-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-recent-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Recent Section: ' + value);
	});

	// Hide Side Menu Custom Feeds Section
	BROWSER_API.storage.sync.get(['hideSideMenuCustomFeedsSection'], function (result) {
		const value = result.hideSideMenuCustomFeedsSection === true;
		document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-custom-feeds-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Custom Feeds Section: ' + value);
	});

	// Hide Side Menu Communities Section
	BROWSER_API.storage.sync.get(['hideSideMenuCommunitiesSection'], function (result) {
		const value = result.hideSideMenuCommunitiesSection === true;
		document.querySelector('#checkbox-hide-side-menu-communities-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-communities-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Communities Section: ' + value);
	});

	// Hide Side Menu Resources Section
	BROWSER_API.storage.sync.get(['hideSideMenuResourcesSection'], function (result) {
		const value = result.hideSideMenuResourcesSection === true;
		document.querySelector('#checkbox-hide-side-menu-resources-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-resources-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Resources Section: ' + value);
	});

	// Hide Side Menu Topics Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopicsSection'], function (result) {
		const value = result.hideSideMenuTopicsSection === true;
		document.querySelector('#checkbox-hide-side-menu-topics-section').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-topics-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Topics Section: ' + value);
	});

	// Hide Related Posts Section in Sidebar
	BROWSER_API.storage.sync.get(['hideRelatedPostsSection'], function (result) {
		const value = result.hideRelatedPostsSection === true;
		document.querySelector('#checkbox-hide-related-posts-section').checked = value;
		const icon = document.querySelector('.icon-hide-related-posts-section');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Related Posts Section: ' + value);
	});

	// Hide User Profile Pics
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		const value = result.hideUserProfilePics === true;
		document.querySelector('#checkbox-hide-user-profile-pics').checked = value;
		const icon = document.querySelector('.icon-hide-user-profile-pics');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide User Profile Pics: ' + value);
	});

	// Hide Post Hidden Message
	BROWSER_API.storage.sync.get(['hidePostHiddenMessage'], function (result) {
		const value = result.hidePostHiddenMessage === true;
		document.querySelector('#checkbox-hide-post-hidden-message').checked = value;
		const icon = document.querySelector('.icon-hide-post-hidden-message');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Post Hidden Message: ' + value);
	});

	// Hide Join Button On r/all Posts
	BROWSER_API.storage.sync.get(['hideJoinButtonOnPosts'], function (result) {
		const value = result.hideJoinButtonOnPosts === true;
		document.querySelector('#checkbox-hide-join-button-on-posts').checked = value;
		const icon = document.querySelector('.icon-hide-join-button-on-posts');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Join Button On r/all Posts: ' + value);
	});

	// Hide The Post Back Button
	BROWSER_API.storage.sync.get(['hidePostBackButton'], function (result) {
		const value = result.hidePostBackButton === true;
		document.querySelector('#checkbox-hide-post-back-button').checked = value;
		const icon = document.querySelector('.icon-hide-post-back-button');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide The Post Back Button: ' + value);
	});

	// Hide Post Karma
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		const value = result.hidePostKarma === true;
		document.querySelector('#checkbox-hide-post-karma').checked = value;
		const icon = document.querySelector('.icon-hide-post-karma');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Post Karma: ' + value);
	});

	// Hide Comment Karma
	BROWSER_API.storage.sync.get(['hideCommentKarma'], function (result) {
		const value = result.hideCommentKarma === true;
		document.querySelector('#checkbox-hide-comment-karma').checked = value;
		const icon = document.querySelector('.icon-hide-comment-karma');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Comment Karma: ' + value);
	});

	// Hide Recent Posts
	BROWSER_API.storage.sync.get(['hideRecentPosts'], function (result) {
		const value = result.hideRecentPosts === true;
		document.querySelector('#checkbox-hide-recent-posts').checked = value;
		const icon = document.querySelector('.icon-hide-recent-posts');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Recent Posts: ' + value);
	});

	// Hide Side Menu Favourite Buttons
	BROWSER_API.storage.sync.get(['hideSideMenuFavouriteButton'], function (result) {
		const value = result.hideSideMenuFavouriteButton === true;
		document.querySelector('#checkbox-hide-side-menu-star').checked = value;
		const icon = document.querySelector('.icon-hide-side-menu-star');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-star' : 'icon-star-slash', value ? 'icon-star-slash' : 'icon-star');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Favourite Buttons: ' + value);
	});

	// Hide Compact View Blank Thumbnails
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		const value = result.hideCompactViewBlankThumbnails === true;
		document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').checked = value;
		const icon = document.querySelector('.icon-hide-compact-view-blank-thumbnails');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Compact View Blank Thumbnails: ' + value);
	});

	// Hide Compact View Thumbnails
	BROWSER_API.storage.sync.get(['hideCompactViewThumbnails'], function (result) {
		const value = result.hideCompactViewThumbnails === true;
		document.querySelector('#checkbox-hide-compact-view-thumbnails').checked = value;
		const icon = document.querySelector('.icon-hide-compact-view-thumbnails');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Compact View Thumbnails: ' + value);
	});

	// Hide "NSFW" In The Search Results
	BROWSER_API.storage.sync.get(['hideNsfwInSearchResults'], function (result) {
		const value = result.hideNsfwInSearchResults === true;
		document.querySelector('#checkbox-hide-nsfw-search-results').checked = value;
		const icon = document.querySelector('.icon-hide-nsfw-search-results');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide "NSFW" In The Search Results: ' + value);
	});

	// Hide "Trending Today" In The Search Results
	BROWSER_API.storage.sync.get(['hideTrendingTodayInSearchResults'], function (result) {
		const value = result.hideTrendingTodayInSearchResults === true;
		document.querySelector('#checkbox-hide-trending-today-in-search-results').checked = value;
		const icon = document.querySelector('.icon-hide-trending-today-in-search-results');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide "Trending Today" In The Search Results: ' + value);
	});

	// Hide Community Highlights
	BROWSER_API.storage.sync.get(['hideCommunityHighlights'], function (result) {
		const value = result.hideCommunityHighlights === true;
		document.querySelector('#checkbox-hide-community-highlights').checked = value;
		const icon = document.querySelector('.icon-hide-community-highlights');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-thumbtack' : 'icon-thumbtack-slash', value ? 'icon-thumbtack-slash' : 'icon-thumbtack');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Community Highlights: ' + value);
	});

	// Hide NSFW Users In The Search Page Sidebar
	BROWSER_API.storage.sync.get(['hideSearchSidebarNsfwUsers'], function (result) {
		const value = result.hideSearchSidebarNsfwUsers === true;
		document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').checked = value;
		const icon = document.querySelector('.icon-hide-search-sidebar-nsfw-users');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide NSFW Users In The Search Page Sidebar: ' + value);
	});

	// Show Side Menu Toggle Button
	BROWSER_API.storage.sync.get(['sideMenuToggleButton'], function (result) {
		const value = result.sideMenuToggleButton === true;
		document.querySelector('#checkbox-side-menu-toggle-button').checked = value;
		const icon = document.querySelector('.icon-side-menu-toggle-button');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Show Side Menu Toggle Button: ' + value);
	});

	// Side Menu Icons Only
	BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
		const value = result.sideMenuIconsOnly === true;
		document.querySelector('#checkbox-side-menu-icons-only').checked = value;
		const icon = document.querySelector('.icon-side-menu-icons-only');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-side-menu-list' : 'icon-side-menu-icons', value ? 'icon-side-menu-icons' : 'icon-side-menu-list');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Side Menu Icons Only: ' + value);
	});

	// Hide Home Feed
	BROWSER_API.storage.sync.get(['hideHomeFeed'], function (result) {
		const value = result.hideHomeFeed === true;
		document.querySelector('#checkbox-hide-home-feed').checked = value;
		const icon = document.querySelector('.icon-hide-home-feed');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Home Feed: ' + value);
	});

	// Remember Side Menu Section Hidden State
	BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenState'], function (result) {
		const value = result.rememberSideMenuSectionHiddenState === true;
		document.querySelector('#checkbox-remember-side-menu-section-hidden-state').checked = value;
		document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = value === true ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('hide-elements');
		console.log('Remember Side Menu Section Hidden State: ' + value);
	});

	// Hide Post Divider
	BROWSER_API.storage.sync.get(['hidePostDivider'], function (result) {
		const value = result.hidePostDivider === true;
		document.querySelector('#checkbox-hide-post-divider').checked = value;
		const icon = document.querySelector('.icon-hide-post-divider');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Post Divider: ' + value);
	});

	// Post Separator Height
	BROWSER_API.storage.sync.get(['postSeparatorHeight', 'hidePostDivider'], function (result) {
		const value = result.postSeparatorHeight || -1;
		const hidePostDivider = result.hidePostDivider === true;
		if (hidePostDivider) document.querySelector('.icon-post-separator-height').style.backgroundColor = value != -1 ? 'var(--accent)' : '';
		document.querySelector('#input-post-separator-height').value = value;
		document.querySelector('#post-separator-height-value').innerText = value >= 0 ? value + 'px' : '';
		console.log(`Post Separator Length: ${value >= 0 ? value + 'px' : 'default'}`);
	});

	// Hide Vote Buttons
	BROWSER_API.storage.sync.get(['hideVoteButtons'], function (result) {
		const value = result.hideVoteButtons === true;
		document.querySelector('#checkbox-hide-vote-buttons').checked = value;
		const icon = document.querySelector('.icon-hide-vote-buttons');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Vote Buttons: ' + value);
	});

	// Hide Video Recommendations
	BROWSER_API.storage.sync.get(['hideVideoRecommendations'], function (result) {
		const value = result.hideVideoRecommendations === true;
		document.querySelector('#checkbox-hide-video-recommendations').checked = value;
		const icon = document.querySelector('.icon-hide-video-recommendations');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Video Recommendations: ' + value);
	});

	// Hide Community Status
	BROWSER_API.storage.sync.get(['hideCommunityStatus'], function (result) {
		const value = result.hideCommunityStatus === true;
		document.querySelector('#checkbox-hide-community-status').checked = value;
		const icon = document.querySelector('.icon-hide-community-status');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Community Status: ' + value);
	});

	// Hide Awards
	BROWSER_API.storage.sync.get(['hideAwards'], function (result) {
		const value = result.hideAwards === true;
		document.querySelector('#checkbox-hide-awards').checked = value;
		const icon = document.querySelector('.icon-hide-awards');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Awards: ' + value);
	});

	// Hide Search Hero
	BROWSER_API.storage.sync.get(['hideSearchHero'], function (result) {
		const value = result.hideSearchHero === true;
		document.querySelector('#checkbox-hide-search-hero').checked = value;
		const icon = document.querySelector('.icon-hide-search-hero');
		icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-show' : 'icon-hide', value ? 'icon-hide' : 'icon-show');
		if (value) highlightMenuIcon('hide-elements');
		console.log('Hide Search Hero: ' + value);
	});
}
