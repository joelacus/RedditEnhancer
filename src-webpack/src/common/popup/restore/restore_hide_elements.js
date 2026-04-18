// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Hide Elements
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Hide Elements" options.

export function restorePopupHideElementsOptions() {
	// Hide Reddit Premium
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		const checked = result.hideRedditPremium === true;
		document.querySelector('#checkbox-hide-reddit-premium').checked = checked;
		const icon = document.querySelector('.hide-reddit-premium');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Reddit Premium: ' + checked);
	});

	// Hide Home Sidebar
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		const checked = result.hideHomeSidebar === true;
		document.querySelector('#checkbox-hide-home-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-home-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Home Sidebar: ' + checked);
	});

	// Hide Sub Sidebar
	BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
		const checked = result.hideSubSidebar === true;
		document.querySelector('#checkbox-hide-sub-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-sub-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Sub Sidebar: ' + checked);
	});

	// Hide Username In Subreddit Sidebar
	BROWSER_API.storage.sync.get(['hideUsernameInSubSidebar'], function (result) {
		const checked = result.hideUsernameInSubSidebar === true;
		document.querySelector('#checkbox-hide-username-in-sub-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-username-in-sub-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Username In Sub Sidebar: ' + checked);
	});

	// Hide Post Sidebar
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		const checked = result.hidePostSidebar === true;
		document.querySelector('#checkbox-hide-post-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-post-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Post Sidebar: ' + checked);
	});

	// Hide User Sidebar
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		const checked = result.hideUserSidebar === true;
		document.querySelector('#checkbox-hide-user-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-user-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide User Sidebar: ' + checked);
	});

	// Hide Custom Feed Sidebar
	BROWSER_API.storage.sync.get(['hideCustomFeedSidebar'], function (result) {
		const checked = result.hideCustomFeedSidebar === true;
		document.querySelector('#checkbox-hide-custom-feed-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-custom-feed-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Custom Feed Sidebar: ' + checked);
	});

	// Sidebar Toggle Button
	BROWSER_API.storage.sync.get(['sidebarToggleButton'], function (result) {
		const checked = result.sidebarToggleButton === true;
		document.querySelector('#checkbox-sidebar-toggle-button').checked = checked;
		const icon = document.querySelector('.icon-sidebar-toggle-button');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Vote Buttons: ' + checked);
	});

	// Hide Search Sidebar
	BROWSER_API.storage.sync.get(['hideSearchSidebar'], function (result) {
		const checked = result.hideSearchSidebar === true;
		document.querySelector('#checkbox-hide-search-sidebar').checked = checked;
		const icon = document.querySelector('.icon-hide-search-sidebar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Search Sidebar: ' + checked);
	});

	// Hide Advertise Button
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		const checked = result.hideAdvertiseButton === true;
		document.querySelector('#checkbox-hide-advertise-button').checked = checked;
		const icon = document.querySelector('.hide-advertise-button');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-advertise' : 'icon-advertise-slash', checked ? 'icon-advertise-slash' : 'icon-advertise');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Advertise Button: ' + checked);
	});

	// Hide Moderation Button
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		const checked = result.hideModerationButton === true;
		document.querySelector('#checkbox-hide-moderation-button').checked = checked;
		const icon = document.querySelector('.hide-moderation-button');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-mod' : 'icon-mod-slash', checked ? 'icon-mod-slash' : 'icon-mod');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Moderation Button: ' + checked);
	});

	// Hide Chat Button
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		const checked = result.hideChatButton === true;
		document.querySelector('#checkbox-hide-chat-button').checked = checked;
		const icon = document.querySelector('.hide-chat-button');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-chat' : 'icon-chat-slash', checked ? 'icon-chat-slash' : 'icon-chat');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Chat Button: ' + checked);
	});

	// Hide Notification Button
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		const checked = result.hideNotificationButton === true;
		document.querySelector('#checkbox-hide-notification-button').checked = checked;
		const icon = document.querySelector('.hide-notification-button');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-notification' : 'icon-notification-slash', checked ? 'icon-notification-slash' : 'icon-notification');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Notification Button: ' + checked);
	});

	// Hide Create Post Button
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		const checked = result.hideCreatePostButton === true;
		document.querySelector('#checkbox-hide-create-post-button').checked = checked;
		const icon = document.querySelector('.hide-create-post-button');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-plus' : 'icon-plus-slash', checked ? 'icon-plus-slash' : 'icon-plus');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Create Post Button: ' + checked);
	});

	// Hide Username
	BROWSER_API.storage.sync.get(['hideUsername'], function (result) {
		const checked = result.hideUsername === true;
		document.querySelector('#checkbox-hide-username').checked = checked;
		const icon = document.querySelector('.hide-username');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-user' : 'icon-user-slash', checked ? 'icon-user-slash' : 'icon-user');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Username: ' + checked);
	});

	// Hide Karma
	BROWSER_API.storage.sync.get(['hideKarma'], function (result) {
		const checked = result.hideKarma === true;
		document.querySelector('#checkbox-hide-karma').checked = checked;
		const icon = document.querySelector('.icon-hide-karma');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-karma' : 'icon-karma-slash', checked ? 'icon-karma-slash' : 'icon-karma');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Karma: ' + checked);
	});

	// Hide Get New Reddit
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		const checked = result.hideGetNewReddit === true;
		document.querySelector('#checkbox-hide-get-new-reddit').checked = checked;
		const icon = document.querySelector('.hide-get-new-reddit');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Get New Reddit Button: ' + checked);
	});

	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		const checked = result.hidePromoted === true;
		document.querySelector('#checkbox-hide-promoted').checked = checked;
		const icon = document.querySelector('.icon-hide-promoted');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-ad' : 'icon-ad-slash', checked ? 'icon-ad-slash' : 'icon-ad');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Promoted Posts: ' + checked);
	});

	// Hide Recommended Links
	BROWSER_API.storage.sync.get(['hideRecommended'], function (result) {
		const checked = result.hideRecommended === true;
		document.querySelector('#checkbox-hide-recommended').checked = checked;
		const icon = document.querySelector('.icon-hide-recommended');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-hand' : 'icon-hand-slash', checked ? 'icon-hand-slash' : 'icon-hand');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Recommended Posts: ' + checked);
	});

	// Hide NSFW Links
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		const checked = result.hideNSFW === true;
		document.querySelector('#checkbox-hide-nsfw').checked = checked;
		const icon = document.querySelector('.icon-hide-nsfw');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-nsfw' : 'icon-nsfw-slash', checked ? 'icon-nsfw-slash' : 'icon-nsfw');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide NSFW Links: ' + checked);
	});

	// Hide Header Sub Bar
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		const checked = result.hideHeaderSubBar === true;
		document.querySelector('#checkbox-hide-header-sub-bar').checked = checked;
		const icon = document.querySelector('.icon-hide-header-sub-bar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Header Sub Bar: ' + checked);
	});

	// Hide Side Menu Old
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		const checked = result.hideSideMenuOld === true;
		document.querySelector('#checkbox-hide-side-menu-old').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-old');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Old: ' + checked);
	});

	// Hide Side Menu
	BROWSER_API.storage.sync.get(['hideSideMenu'], function (result) {
		const checked = result.hideSideMenu === true;
		document.querySelector('#checkbox-hide-side-menu').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu: ' + checked);
	});

	// Hide Sub Sidebar Exceptions Enable
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionsEnable'], function (result) {
		const checked = result.hideSubSidebarExceptionsEnable === true;
		document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').checked = checked;
		document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Sub Sidebar Exceptions Enable: ' + checked);
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
		const checked = result.hideHeaderBar === true;
		document.querySelector('#checkbox-hide-header-bar').checked = checked;
		const icon = document.querySelector('.icon-hide-header-bar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-header' : 'icon-header-slash', checked ? 'icon-header-slash' : 'icon-header');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Header Bar: ' + checked);
	});

	// Hide 'Get App' Button
	BROWSER_API.storage.sync.get(['hideGetAppButton'], function (result) {
		const checked = result.hideGetAppButton === true;
		document.querySelector('#checkbox-hide-get-app-button').checked = checked;
		const icon = document.querySelector('.icon-hide-get-app-button');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide "Get App" Button: ' + checked);
	});

	// Hide AI In Search
	BROWSER_API.storage.sync.get(['hideAiInSearch'], function (result) {
		const checked = result.hideAiInSearch === true;
		document.querySelector('#checkbox-hide-ai-in-search').checked = checked;
		const icon = document.querySelector('.icon-hide-ai-in-search');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide AI In Search: ' + checked);
	});

	// Hide Logo In Search
	BROWSER_API.storage.sync.get(['hideLogoInSearch'], function (result) {
		const checked = result.hideLogoInSearch === true;
		document.querySelector('#checkbox-hide-logo-in-search').checked = checked;
		document.querySelector('.icon-hide-logo-in-search').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-logo-in-search').classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Logo In Search: ' + checked);
	});

	// Replace Search Bar Placeholder Text
	BROWSER_API.storage.sync.get(['replaceSearchPlaceholderText'], function (result) {
		const checked = result.replaceSearchPlaceholderText === true;
		document.querySelector('#checkbox-replace-search-bar-placeholder').checked = checked;
		const icon = document.querySelector('.icon-replace-search-bar-placeholder');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Replace Search Bar Placeholder Text: ' + checked);
	});

	// Hide Side Menu Top Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection'], function (result) {
		const checked = result.hideSideMenuTopSection === true;
		document.querySelector('#checkbox-hide-side-menu-top-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-top-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Top Section: ' + checked);
	});

	// Hide Side Menu Games Section
	BROWSER_API.storage.sync.get(['hideSideMenuGamesSection'], function (result) {
		const checked = result.hideSideMenuGamesSection === true;
		document.querySelector('#checkbox-hide-side-menu-games-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-games-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Games Section: ' + checked);
	});

	// Hide Side Menu Moderation Section
	BROWSER_API.storage.sync.get(['hideSideMenuModerationSection'], function (result) {
		const checked = result.hideSideMenuModerationSection === true;
		document.querySelector('#checkbox-hide-side-menu-moderation-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-moderation-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Moderation Section: ' + checked);
	});

	// Hide Side Menu Recent Section
	BROWSER_API.storage.sync.get(['hideSideMenuRecentSection'], function (result) {
		const checked = result.hideSideMenuRecentSection === true;
		document.querySelector('#checkbox-hide-side-menu-recent-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-recent-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Recent Section: ' + checked);
	});

	// Hide Side Menu Custom Feeds Section
	BROWSER_API.storage.sync.get(['hideSideMenuCustomFeedsSection'], function (result) {
		const checked = result.hideSideMenuCustomFeedsSection === true;
		document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-custom-feeds-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Custom Feeds Section: ' + checked);
	});

	// Hide Side Menu Communities Section
	BROWSER_API.storage.sync.get(['hideSideMenuCommunitiesSection'], function (result) {
		const checked = result.hideSideMenuCommunitiesSection === true;
		document.querySelector('#checkbox-hide-side-menu-communities-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-communities-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Communities Section: ' + checked);
	});

	// Hide Side Menu Resources Section
	BROWSER_API.storage.sync.get(['hideSideMenuResourcesSection'], function (result) {
		const checked = result.hideSideMenuResourcesSection === true;
		document.querySelector('#checkbox-hide-side-menu-resources-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-resources-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Resources Section: ' + checked);
	});

	// Hide Side Menu Topics Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopicsSection'], function (result) {
		const checked = result.hideSideMenuTopicsSection === true;
		document.querySelector('#checkbox-hide-side-menu-topics-section').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-topics-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Topics Section: ' + checked);
	});

	// Hide Related Posts Section in Sidebar
	BROWSER_API.storage.sync.get(['hideRelatedPostsSection'], function (result) {
		const checked = result.hideRelatedPostsSection === true;
		document.querySelector('#checkbox-hide-related-posts-section').checked = checked;
		const icon = document.querySelector('.icon-hide-related-posts-section');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Related Posts Section: ' + checked);
	});

	// Hide User Profile Pics
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		const checked = result.hideUserProfilePics === true;
		document.querySelector('#checkbox-hide-user-profile-pics').checked = checked;
		const icon = document.querySelector('.icon-hide-user-profile-pics');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide User Profile Pics: ' + checked);
	});

	// Hide Post Hidden Message
	BROWSER_API.storage.sync.get(['hidePostHiddenMessage'], function (result) {
		const checked = result.hidePostHiddenMessage === true;
		document.querySelector('#checkbox-hide-post-hidden-message').checked = checked;
		const icon = document.querySelector('.icon-hide-post-hidden-message');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Post Hidden Message: ' + checked);
	});

	// Hide Join Button On r/all Posts
	BROWSER_API.storage.sync.get(['hideJoinButtonOnPosts'], function (result) {
		const checked = result.hideJoinButtonOnPosts === true;
		document.querySelector('#checkbox-hide-join-button-on-posts').checked = checked;
		const icon = document.querySelector('.icon-hide-join-button-on-posts');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Join Button On r/all Posts: ' + checked);
	});

	// Hide The Post Back Button
	BROWSER_API.storage.sync.get(['hidePostBackButton'], function (result) {
		const checked = result.hidePostBackButton === true;
		document.querySelector('#checkbox-hide-post-back-button').checked = checked;
		const icon = document.querySelector('.icon-hide-post-back-button');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide The Post Back Button: ' + checked);
	});

	// Hide Post Karma
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		const checked = result.hidePostKarma === true;
		document.querySelector('#checkbox-hide-post-karma').checked = checked;
		const icon = document.querySelector('.icon-hide-post-karma');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Post Karma: ' + checked);
	});

	// Hide Comment Karma
	BROWSER_API.storage.sync.get(['hideCommentKarma'], function (result) {
		const checked = result.hideCommentKarma === true;
		document.querySelector('#checkbox-hide-comment-karma').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-karma');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Comment Karma: ' + checked);
	});

	// Hide Recent Posts
	BROWSER_API.storage.sync.get(['hideRecentPosts'], function (result) {
		const checked = result.hideRecentPosts === true;
		document.querySelector('#checkbox-hide-recent-posts').checked = checked;
		const icon = document.querySelector('.icon-hide-recent-posts');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Recent Posts: ' + checked);
	});

	// Hide Side Menu Favourite Buttons
	BROWSER_API.storage.sync.get(['hideSideMenuFavouriteButton'], function (result) {
		const checked = result.hideSideMenuFavouriteButton === true;
		document.querySelector('#checkbox-hide-side-menu-star').checked = checked;
		const icon = document.querySelector('.icon-hide-side-menu-star');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-star' : 'icon-star-slash', checked ? 'icon-star-slash' : 'icon-star');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Side Menu Favourite Buttons: ' + checked);
	});

	// Hide Compact View Blank Thumbnails
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		const checked = result.hideCompactViewBlankThumbnails === true;
		document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').checked = checked;
		const icon = document.querySelector('.icon-hide-compact-view-blank-thumbnails');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Compact View Blank Thumbnails: ' + checked);
	});

	// Hide Compact View Thumbnails
	BROWSER_API.storage.sync.get(['hideCompactViewThumbnails'], function (result) {
		const checked = result.hideCompactViewThumbnails === true;
		document.querySelector('#checkbox-hide-compact-view-thumbnails').checked = checked;
		const icon = document.querySelector('.icon-hide-compact-view-thumbnails');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Compact View Thumbnails: ' + checked);
	});

	// Hide "NSFW" In The Search Results
	BROWSER_API.storage.sync.get(['hideNsfwInSearchResults'], function (result) {
		const checked = result.hideNsfwInSearchResults === true;
		document.querySelector('#checkbox-hide-nsfw-search-results').checked = checked;
		const icon = document.querySelector('.icon-hide-nsfw-search-results');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide "NSFW" In The Search Results: ' + checked);
	});

	// Hide "Trending Today" In The Search Results
	BROWSER_API.storage.sync.get(['hideTrendingTodayInSearchResults'], function (result) {
		const checked = result.hideTrendingTodayInSearchResults === true;
		document.querySelector('#checkbox-hide-trending-today-in-search-results').checked = checked;
		const icon = document.querySelector('.icon-hide-trending-today-in-search-results');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide "Trending Today" In The Search Results: ' + checked);
	});

	// Hide Community Highlights
	BROWSER_API.storage.sync.get(['hideCommunityHighlights'], function (result) {
		const checked = result.hideCommunityHighlights === true;
		document.querySelector('#checkbox-hide-community-highlights').checked = checked;
		const icon = document.querySelector('.icon-hide-community-highlights');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-thumbtack' : 'icon-thumbtack-slash', checked ? 'icon-thumbtack-slash' : 'icon-thumbtack');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Community Highlights: ' + checked);
	});

	// Hide NSFW Users In The Search Page Sidebar
	BROWSER_API.storage.sync.get(['hideSearchSidebarNsfwUsers'], function (result) {
		const checked = result.hideSearchSidebarNsfwUsers === true;
		document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').checked = checked;
		const icon = document.querySelector('.icon-hide-search-sidebar-nsfw-users');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide NSFW Users In The Search Page Sidebar: ' + checked);
	});

	// Show Side Menu Toggle Button
	BROWSER_API.storage.sync.get(['sideMenuToggleButton'], function (result) {
		const checked = result.sideMenuToggleButton === true;
		document.querySelector('#checkbox-side-menu-toggle-button').checked = checked;
		const icon = document.querySelector('.icon-side-menu-toggle-button');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Show Side Menu Toggle Button: ' + checked);
	});

	// Side Menu Icons Only
	BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
		const checked = result.sideMenuIconsOnly === true;
		document.querySelector('#checkbox-side-menu-icons-only').checked = checked;
		const icon = document.querySelector('.icon-side-menu-icons-only');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-side-menu-list' : 'icon-side-menu-icons', checked ? 'icon-side-menu-icons' : 'icon-side-menu-list');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Side Menu Icons Only: ' + checked);
	});

	// Hide Home Feed
	BROWSER_API.storage.sync.get(['hideHomeFeed'], function (result) {
		const checked = result.hideHomeFeed === true;
		document.querySelector('#checkbox-hide-home-feed').checked = checked;
		const icon = document.querySelector('.icon-hide-home-feed');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Home Feed: ' + checked);
	});

	// Remember Side Menu Section Hidden State
	BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenState'], function (result) {
		const checked = result.rememberSideMenuSectionHiddenState === true;
		document.querySelector('#checkbox-remember-side-menu-section-hidden-state').checked = checked;
		document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Remember Side Menu Section Hidden State: ' + checked);
	});

	// Hide Post Divider
	BROWSER_API.storage.sync.get(['hidePostDivider'], function (result) {
		const checked = result.hidePostDivider === true;
		document.querySelector('#checkbox-hide-post-divider').checked = checked;
		const icon = document.querySelector('.icon-hide-post-divider');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Post Divider: ' + checked);
	});

	// Post Separator Height
	BROWSER_API.storage.sync.get(['postSeparatorHeight', 'hidePostDivider'], function (result) {
		const checked = result.postSeparatorHeight || -1;
		const hidePostDivider = result.hidePostDivider === true;
		if (hidePostDivider) document.querySelector('.icon-post-separator-height').style.backgroundColor = checked != -1 ? 'var(--accent)' : '';
		document.querySelector('#input-post-separator-height').checked = checked;
		document.querySelector('#post-separator-height-checked').innerText = checked >= 0 ? checked + 'px' : '';
		console.log(`Post Separator Length: ${checked >= 0 ? checked + 'px' : 'default'}`);
	});

	// Hide Vote Buttons
	BROWSER_API.storage.sync.get(['hideVoteButtons'], function (result) {
		const checked = result.hideVoteButtons === true;
		document.querySelector('#checkbox-hide-vote-buttons').checked = checked;
		const icon = document.querySelector('.icon-hide-vote-buttons');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Vote Buttons: ' + checked);
	});

	// Hide Video Recommendations
	BROWSER_API.storage.sync.get(['hideVideoRecommendations'], function (result) {
		const checked = result.hideVideoRecommendations === true;
		document.querySelector('#checkbox-hide-video-recommendations').checked = checked;
		const icon = document.querySelector('.icon-hide-video-recommendations');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Video Recommendations: ' + checked);
	});

	// Hide Community Status
	BROWSER_API.storage.sync.get(['hideCommunityStatus'], function (result) {
		const checked = result.hideCommunityStatus === true;
		document.querySelector('#checkbox-hide-community-status').checked = checked;
		const icon = document.querySelector('.icon-hide-community-status');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Community Status: ' + checked);
	});

	// Hide Awards
	BROWSER_API.storage.sync.get(['hideAwards'], function (result) {
		const checked = result.hideAwards === true;
		document.querySelector('#checkbox-hide-awards').checked = checked;
		const icon = document.querySelector('.icon-hide-awards');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Awards: ' + checked);
	});

	// Hide Search Hero
	BROWSER_API.storage.sync.get(['hideSearchHero'], function (result) {
		const checked = result.hideSearchHero === true;
		document.querySelector('#checkbox-hide-search-hero').checked = checked;
		const icon = document.querySelector('.icon-hide-search-hero');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Search Hero: ' + checked);
	});

	// Hide Related Communities
	BROWSER_API.storage.sync.get(['hideRelatedCommunities'], function (result) {
		const checked = result.hideRelatedCommunities === true;
		document.querySelector('#checkbox-hide-related-subreddits').checked = checked;
		const icon = document.querySelector('.icon-hide-related-subreddits');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('hide-elements');
		console.log('Hide Related Communities: ' + checked);
	});
}
