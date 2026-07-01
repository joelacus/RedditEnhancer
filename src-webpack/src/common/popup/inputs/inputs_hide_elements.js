// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Hide Elements
// ────────────────────────────────────────────────────────────────────────────

import { sendMessage } from '../../utilities/send_message';

// Toggle - Hide Reddit Premium
document.querySelector('#checkbox-hide-reddit-premium').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideRedditPremium: this.checked });
	sendMessage({ hideRedditPremium: this.checked });
	const icon = document.querySelector('.hide-reddit-premium');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Home Sidebar
document.querySelector('#checkbox-hide-home-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideHomeSidebar: this.checked });
	sendMessage({ hideHomeSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-home-sidebar');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Sub Sidebar
document.querySelector('#checkbox-hide-sub-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSubSidebar: this.checked });
	sendMessage({ hideSubSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-sub-sidebar');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide Username In Sub Sidebar
document.querySelector('#checkbox-hide-username-in-sub-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideUsernameInSubSidebar: this.checked });
	sendMessage({ hideUsernameInSubSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-username-in-sub-sidebar');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Post Sidebar
document.querySelector('#checkbox-hide-post-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostSidebar: this.checked });
	sendMessage({ hidePostSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-post-sidebar');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide User Sidebar
document.querySelector('#checkbox-hide-user-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideUserSidebar: this.checked });
	sendMessage({ hideUserSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-user-sidebar');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide Custom Feed Sidebar
document.querySelector('#checkbox-hide-custom-feed-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCustomFeedSidebar: this.checked });
	sendMessage({ hideCustomFeedSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-custom-feed-sidebar');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Sidebar Toggle Button
document.querySelector('#checkbox-sidebar-toggle-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ sidebarToggleButton: this.checked });
	sendMessage({ sidebarToggleButton: this.checked });
	const icon = document.querySelector('.icon-sidebar-toggle-button');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Advertise Button
document.querySelector('#checkbox-hide-advertise-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideAdvertiseButton: this.checked });
	sendMessage({ hideAdvertiseButton: this.checked });
	const icon = document.querySelector('.hide-advertise-button');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-advertise' : 'icon-advertise-slash', this.checked ? 'icon-advertise-slash' : 'icon-advertise');
});

// Toggle - Hide Moderation Button
document.querySelector('#checkbox-hide-moderation-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideModerationButton: this.checked });
	sendMessage({ hideModerationButton: this.checked });
	const icon = document.querySelector('.hide-moderation-button');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-mod' : 'icon-mod-slash', this.checked ? 'icon-mod-slash' : 'icon-mod');
});

// Toggle - Hide Chat Button
document.querySelector('#checkbox-hide-chat-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideChatButton: this.checked });
	sendMessage({ hideChatButton: this.checked });
	const icon = document.querySelector('.hide-chat-button');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-chat' : 'icon-chat-slash', this.checked ? 'icon-chat-slash' : 'icon-chat');
});

// Toggle - Hide Notification Button
document.querySelector('#checkbox-hide-notification-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideNotificationButton: this.checked });
	sendMessage({ hideNotificationButton: this.checked });
	const icon = document.querySelector('.hide-notification-button');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-notification' : 'icon-notification-slash', this.checked ? 'icon-notification-slash' : 'icon-notification');
});

// Toggle - Hide Create Post Button
document.querySelector('#checkbox-hide-create-post-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCreatePostButton: this.checked });
	sendMessage({ hideCreatePostButton: this.checked });
	const icon = document.querySelector('.hide-create-post-button');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-plus' : 'icon-plus-slash', this.checked ? 'icon-plus-slash' : 'icon-plus');
});

// Toggle - Hide Username
document.querySelector('#checkbox-hide-username').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideUsername: this.checked });
	sendMessage({ hideUsername: this.checked });
	const icon = document.querySelector('.hide-username');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-user' : 'icon-user-slash', this.checked ? 'icon-user-slash' : 'icon-user');
});

// Toggle - Hide Karma
document.querySelector('#checkbox-hide-karma').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideKarma: this.checked });
	sendMessage({ hideKarma: this.checked });
	const icon = document.querySelector('.icon-hide-karma');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-karma' : 'icon-karma-slash', this.checked ? 'icon-karma-slash' : 'icon-karma');
});

// Toggle - Hide Get New Reddit
document.querySelector('#checkbox-hide-get-new-reddit').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideGetNewReddit: this.checked });
	sendMessage({ hideGetNewReddit: this.checked });
	const icon = document.querySelector('.hide-get-new-reddit');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-hide' : 'icon-hide-slash', this.checked ? 'icon-hide-slash' : 'icon-hide');
});

// Toggle - Hide Promoted Links
document.querySelector('#checkbox-hide-promoted').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePromoted: this.checked });
	sendMessage({ hidePromoted: this.checked });
	const icon = document.querySelector('.icon-hide-promoted');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-ad' : 'icon-ad-slash', this.checked ? 'icon-ad-slash' : 'icon-ad');
});

// Toggle - Hide Recommended Links
document.querySelector('#checkbox-hide-recommended').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideRecommended: this.checked });
	sendMessage({ hideRecommended: this.checked });
	const icon = document.querySelector('.icon-hide-recommended');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-hand' : 'icon-hand-slash', this.checked ? 'icon-hand-slash' : 'icon-hand');
});

// Toggle - Hide Header Sub Bar
document.querySelector('#checkbox-hide-header-sub-bar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideHeaderSubBar: this.checked });
	sendMessage({ hideHeaderSubBar: this.checked });
	const icon = document.querySelector('.icon-hide-header-sub-bar');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-hide' : 'icon-hide-slash', this.checked ? 'icon-hide-slash' : 'icon-hide');
});

// Toggle - Hide Side Menu Old
document.querySelector('#checkbox-hide-side-menu-old').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuOld: this.checked });
	sendMessage({ hideSideMenuOld: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-old');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-hide' : 'icon-hide-slash', this.checked ? 'icon-hide-slash' : 'icon-hide');
});

// Toggle - Hide NSFW Links
document.querySelector('#checkbox-hide-nsfw').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideNSFW: this.checked });
	sendMessage({ hideNSFW: this.checked });
	const icon = document.querySelector('.icon-hide-nsfw');
	icon.style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-nsfw' : 'icon-nsfw-slash', this.checked ? 'icon-nsfw-slash' : 'icon-nsfw');
});

// Toggle - Hide Sub Sidebar Exceptions
document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionsEnable: this.checked });
	document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Button - Hide Sub Sidebar Whitelist
document.querySelector('#btn-hide-sub-sidebar-whitelist').addEventListener('click', function () {
	this.classList.add('tab-active');
	this.nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionMode: 'whitelist' });
});

// Button - Hide Sub Sidebar Blacklist
document.querySelector('#btn-hide-sub-sidebar-blacklist').addEventListener('click', function () {
	this.classList.add('tab-active');
	this.previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionMode: 'blacklist' });
});

// Textarea - Hide Sub Sidebar Exceptions
document.querySelector('#input-hide-sub-sidebar-exceptions').addEventListener('keyup', function () {
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionSubList: this.value });
});

// Toggle - Hide Header Bar
document.querySelector('#checkbox-hide-header-bar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideHeaderBar: this.checked });
	sendMessage({ hideHeaderBar: this.checked });
	const icon = document.querySelector('.icon-hide-header-bar');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-header' : 'icon-header-slash', this.checked ? 'icon-header-slash' : 'icon-header');
});

// Toggle - Hide 'Get App' Button
document.querySelector('#checkbox-hide-get-app-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideGetAppButton: this.checked });
	sendMessage({ hideGetAppButton: this.checked });
	const icon = document.querySelector('.icon-hide-get-app-button');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide AI In Search
document.querySelector('#checkbox-hide-ai-in-search').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideAiInSearch: this.checked });
	sendMessage({ hideAiInSearch: this.checked });
	const icon = document.querySelector('.icon-hide-ai-in-search');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Logo In Search
document.querySelector('#checkbox-hide-logo-in-search').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideLogoInSearch: this.checked });
	sendMessage({ hideLogoInSearch: this.checked });
	const icon = document.querySelector('.icon-hide-logo-in-search');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Replace Search Bar Placeholder Text
document.querySelector('#checkbox-replace-search-bar-placeholder').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ replaceSearchPlaceholderText: this.checked });
	sendMessage({ replaceSearchPlaceholderText: this.checked });
	const icon = document.querySelector('.icon-replace-search-bar-placeholder');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu
function disableHideSideMenu() {
	BROWSER_API.storage.sync.set({ hideSideMenu: false });
	sendMessage({ hideSideMenu: false });
	const icon = document.querySelector('.icon-hide-side-menu');
	icon.style.backgroundColor = '';
	icon.classList.replace('icon-hide', 'icon-show');
}
document.querySelector('#checkbox-hide-side-menu').addEventListener('change', function () {
	if (this.checked) {
		// disable side menu toggle and side menu icons only
		disableSideMenuToggle();
		document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
		disableSideMenuIconsOnly();
		document.querySelector('#checkbox-side-menu-icons-only').checked = false;
		// enable hide side menu
		BROWSER_API.storage.sync.set({ hideSideMenu: true });
		sendMessage({ hideSideMenu: true });
		const icon = document.querySelector('.icon-hide-side-menu');
		icon.style.backgroundColor = 'var(--accent)';
		icon.classList.replace('icon-show', 'icon-hide');
	} else {
		disableHideSideMenu();
	}
});

// Toggle - Side Menu Show/Hide Toggle Button
function disableSideMenuToggle() {
	BROWSER_API.storage.sync.set({ sideMenuToggleButton: false });
	sendMessage({ sideMenuToggleButton: false });
	const icon = document.querySelector('.icon-side-menu-toggle-button');
	icon.style.backgroundColor = '';
	icon.classList.replace('icon-show', 'icon-hide');
}
document.querySelector('#checkbox-side-menu-toggle-button').addEventListener('change', function () {
	if (this.checked) {
		// disable hide side menu and side menu icons only
		disableHideSideMenu();
		document.querySelector('#checkbox-hide-side-menu').checked = false;
		disableSideMenuIconsOnly();
		document.querySelector('#checkbox-side-menu-icons-only').checked = false;
		// enable side menu toggle
		BROWSER_API.storage.sync.set({ sideMenuToggleButton: true });
		sendMessage({ sideMenuToggleButton: true });
		const icon = document.querySelector('.icon-side-menu-toggle-button');
		icon.style.backgroundColor = 'var(--accent)';
		icon.classList.replace('icon-hide', 'icon-show');
	} else {
		disableSideMenuToggle();
	}
});

// Toggle - Hide Side Menu Top Section
document.querySelector('#checkbox-hide-side-menu-top-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuTopSection: this.checked });
	sendMessage({ hideSideMenuTopSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-top-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Games Section
document.querySelector('#checkbox-hide-side-menu-games-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuGamesSection: this.checked });
	sendMessage({ hideSideMenuGamesSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-games-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Moderation Section
document.querySelector('#checkbox-hide-side-menu-moderation-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuModerationSection: this.checked });
	sendMessage({ hideSideMenuModerationSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-moderation-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Recent Section
document.querySelector('#checkbox-hide-side-menu-recent-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuRecentSection: this.checked });
	sendMessage({ hideSideMenuRecentSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-recent-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Custom Feeds Section
document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuCustomFeedsSection: this.checked });
	sendMessage({ hideSideMenuCustomFeedsSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-custom-feeds-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Communities Section
document.querySelector('#checkbox-hide-side-menu-communities-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuCommunitiesSection: this.checked });
	sendMessage({ hideSideMenuCommunitiesSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-communities-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Resources Section
document.querySelector('#checkbox-hide-side-menu-resources-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuResourcesSection: this.checked });
	sendMessage({ hideSideMenuResourcesSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-resources-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Topics Section
document.querySelector('#checkbox-hide-side-menu-topics-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuTopicsSection: this.checked });
	sendMessage({ hideSideMenuTopicsSection: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-topics-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Related Posts Section in Sidebar
document.querySelector('#checkbox-hide-related-posts-section').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideRelatedPostsSection: this.checked });
	sendMessage({ hideRelatedPostsSection: this.checked });
	const icon = document.querySelector('.icon-hide-related-posts-section');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide User Profile Pics
document.querySelector('#checkbox-hide-user-profile-pics').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideUserProfilePics: this.checked });
	sendMessage({ hideUserProfilePics: this.checked });
	const icon = document.querySelector('.icon-hide-user-profile-pics');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Post Hidden Message
document.querySelector('#checkbox-hide-post-hidden-message').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostHiddenMessage: this.checked });
	sendMessage({ hidePostHiddenMessage: this.checked });
	const icon = document.querySelector('.icon-hide-post-hidden-message');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Join Button On r/all Posts
document.querySelector('#checkbox-hide-join-button-on-posts').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideJoinButtonOnPosts: this.checked });
	sendMessage({ hideJoinButtonOnPosts: this.checked });
	const icon = document.querySelector('.icon-hide-join-button-on-posts');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Search Sidebar
document.querySelector('#checkbox-hide-search-sidebar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSearchSidebar: this.checked });
	sendMessage({ hideSearchSidebar: this.checked });
	const icon = document.querySelector('.icon-hide-search-sidebar');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	// Reapply Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		sendMessage({ layoutCentre: result.layoutCentre });
	});
});

// Toggle - Hide Related Communities
document.querySelector('#checkbox-hide-related-subreddits').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideRelatedCommunities: this.checked });
	sendMessage({ hideRelatedCommunities: this.checked });
	const icon = document.querySelector('.icon-hide-related-subreddits');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Post Back Button
document.querySelector('#checkbox-hide-post-back-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostBackButton: this.checked });
	sendMessage({ hidePostBackButton: this.checked });
	const icon = document.querySelector('.icon-hide-post-back-button');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Post Karma
document.querySelector('#checkbox-hide-post-karma').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostKarma: this.checked });
	sendMessage({ hidePostKarma: this.checked });
	const icon = document.querySelector('.icon-hide-post-karma');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Comment Karma
document.querySelector('#checkbox-hide-comment-karma').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentKarma: this.checked });
	sendMessage({ hideCommentKarma: this.checked });
	const icon = document.querySelector('.icon-hide-comment-karma');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Recent Posts
document.querySelector('#checkbox-hide-recent-posts').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideRecentPosts: this.checked });
	sendMessage({ hideRecentPosts: this.checked });
	const icon = document.querySelector('.icon-hide-recent-posts');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Side Menu Star
document.querySelector('#checkbox-hide-side-menu-star').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSideMenuFavouriteButton: this.checked });
	sendMessage({ hideSideMenuFavouriteButton: this.checked });
	const icon = document.querySelector('.icon-hide-side-menu-star');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-star' : 'icon-star-slash', this.checked ? 'icon-star-slash' : 'icon-star');
});

// Toggle - Side Menu Icons Only
function disableSideMenuIconsOnly() {
	BROWSER_API.storage.sync.set({ sideMenuIconsOnly: false });
	sendMessage({ sideMenuIconsOnly: false });
	document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = '';
	document.querySelector('.icon-side-menu-icons-only').classList.replace('icon-side-menu-icons', 'icon-side-menu-list');
}
document.querySelector('#checkbox-side-menu-icons-only').addEventListener('change', function () {
	if (this.checked) {
		// disable hide side menu and side menu toggle
		disableHideSideMenu();
		document.querySelector('#checkbox-hide-side-menu').checked = false;
		disableSideMenuToggle();
		document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
		BROWSER_API.storage.sync.set({ sideMenuIconsOnly: true });
		sendMessage({ sideMenuIconsOnly: true });
		document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-side-menu-icons-only').classList.replace('icon-side-menu-list', 'icon-side-menu-icons');
	} else {
		disableSideMenuIconsOnly();
	}
});

// Toggle - Hide Blank Thumbnails In Compact View
document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCompactViewBlankThumbnails: this.checked });
	sendMessage({ hideCompactViewBlankThumbnails: this.checked });
	const icon = document.querySelector('.icon-hide-compact-view-blank-thumbnails');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Thumbnails In Compact View
document.querySelector('#checkbox-hide-compact-view-thumbnails').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCompactViewThumbnails: this.checked });
	sendMessage({ hideCompactViewThumbnails: this.checked });
	const icon = document.querySelector('.icon-hide-compact-view-thumbnails');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide "NSFW" In The Search Results
document.querySelector('#checkbox-hide-nsfw-search-results').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideNsfwInSearchResults: this.checked });
	sendMessage({ hideNsfwInSearchResults: this.checked });
	const icon = document.querySelector('.icon-hide-nsfw-search-results');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide "Trending Today" In The Search Results
document.querySelector('#checkbox-hide-trending-today-in-search-results').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideTrendingTodayInSearchResults: this.checked });
	sendMessage({ hideTrendingTodayInSearchResults: this.checked });
	const icon = document.querySelector('.icon-hide-trending-today-in-search-results');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Community Highlights
document.querySelector('#checkbox-hide-community-highlights').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommunityHighlights: this.checked });
	sendMessage({ hideCommunityHighlights: this.checked });
	const icon = document.querySelector('.icon-hide-community-highlights');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-thumbtack' : 'icon-thumbtack-slash', this.checked ? 'icon-thumbtack-slash' : 'icon-thumbtack');
});

// Toggle - Hide NSFW Users In The Search Page Sidebar
document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideSearchSidebarNsfwUsers: this.checked });
	sendMessage({ hideSearchSidebarNsfwUsers: this.checked });
	const icon = document.querySelector('.icon-hide-search-sidebar-nsfw-users');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Home Feed
document.querySelector('#checkbox-hide-home-feed').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideHomeFeed: this.checked });
	sendMessage({ hideHomeFeed: this.checked });
	const icon = document.querySelector('.icon-hide-home-feed');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Post Divider
document.querySelector('#checkbox-hide-post-divider').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostDivider: this.checked });
	sendMessage({ hidePostDivider: this.checked });
	const icon = document.querySelector('.icon-hide-post-divider');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	if (this.checked && document.querySelector('#input-post-separator-height').value != -1) {
		document.querySelector('.icon-post-separator-height').style.backgroundColor = 'var(--accent)';
	}
});

// Slider - Post Separator Height
document.querySelector('#input-post-separator-height').addEventListener('input', function () {
	const enabled = document.querySelector('#checkbox-hide-post-divider').checked;
	document.querySelector('.icon-post-separator-height').style.backgroundColor = enabled && this.value != -1 ? 'var(--accent)' : '';
	document.querySelector('#post-separator-height-value').textContent = this.value != -1 ? this.value + 'px' : '';
	sendMessage({ postSeparatorHeight: this.value });
});
document.querySelector('#input-post-separator-height').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ postSeparatorHeight: this.value });
});

// Toggle - Hide Vote Buttons
document.querySelector('#checkbox-hide-vote-buttons').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideVoteButtons: this.checked });
	sendMessage({ hideVoteButtons: this.checked });
	const icon = document.querySelector('.icon-hide-vote-buttons');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Video Recommendations
document.querySelector('#checkbox-hide-video-recommendations').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideVideoRecommendations: this.checked });
	sendMessage({ hideVideoRecommendations: this.checked });
	const icon = document.querySelector('.icon-hide-video-recommendations');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Community Status
document.querySelector('#checkbox-hide-community-status').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommunityStatus: this.checked });
	sendMessage({ hideCommunityStatus: this.checked });
	const icon = document.querySelector('.icon-hide-community-status');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Awards
document.querySelector('#checkbox-hide-awards').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideAwards: this.checked });
	sendMessage({ hideAwards: this.checked });
	const icon = document.querySelector('.icon-hide-awards');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Page Footer Text
document.querySelector('#checkbox-hide-page-footer').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePageFooter: this.checked });
	sendMessage({ hidePageFooter: this.checked });
	const icon = document.querySelector('.icon-hide-page-footer');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Hide Post Comments
document.querySelector('#checkbox-hide-post-comments').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostComments: this.checked });
	sendMessage({ hidePostComments: this.checked });
	const icon = document.querySelector('.icon-hide-post-comments');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Reddit Announcement Notifications
document.querySelector('#checkbox-hide-announcement-notifications').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideAnnouncementNotifications: this.checked });
	sendMessage({ hideAnnouncementNotifications: this.checked });
	const icon = document.querySelector('.icon-hide-announcement-notifications');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Reddit Gamification Notifications
document.querySelector('#checkbox-hide-gamification-notifications').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideGamificationNotifications: this.checked });
	sendMessage({ hideGamificationNotifications: this.checked });
	const icon = document.querySelector('.icon-hide-gamification-notifications');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});

// Toggle - Join Conversation Input
document.querySelector('#checkbox-hide-join-conversation').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideJoinConversation: this.checked });
	sendMessage({ hideJoinConversation: this.checked });
	const icon = document.querySelector('.icon-hide-join-conversation');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
});
