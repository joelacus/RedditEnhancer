/* ===== Restore Popup UI / Hide Elements ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Hide Elements" options.

export function restorePopupHideElementsOptions() {
	// Hide Reddit Premium
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		if (result.hideRedditPremium == true) {
			document.querySelector('#checkbox-hide-reddit-premium').checked = true;
			document.querySelector('.hide-reddit-premium').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-reddit-premium').classList.remove('icon-show');
			document.querySelector('.hide-reddit-premium').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideRedditPremium == 'undefined' || result.hideRedditPremium == false) {
			document.querySelector('#checkbox-hide-reddit-premium').checked = false;
			var value = false;
		}
		console.log('Hide Reddit Premium: ' + value);
	});

	// Hide Create Post
	BROWSER_API.storage.sync.get(['hideCreatePost'], function (result) {
		if (result.hideCreatePost == true) {
			document.querySelector('#checkbox-hide-create-post').checked = true;
			document.querySelector('.icon-hide-create-post').classList.remove('icon-plus');
			document.querySelector('.icon-hide-create-post').classList.add('icon-plus-slash');
			document.querySelector('.icon-hide-create-post').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideCreatePost == 'undefined' || result.hideCreatePost == false) {
			document.querySelector('#checkbox-hide-create-post').checked = false;
			var value = false;
		}
		console.log('Hide Create Post: ' + value);
	});

	// Hide Home Sidebar
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		if (result.hideHomeSidebar == true) {
			document.querySelector('#checkbox-hide-home-sidebar').checked = true;
			document.querySelector('.icon-hide-home-sidebar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-home-sidebar').classList.remove('icon-show');
			document.querySelector('.icon-hide-home-sidebar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideHomeSidebar == 'undefined' || result.hideHomeSidebar == false) {
			document.querySelector('#checkbox-hide-home-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide Home Sidebar: ' + value);
	});

	// Hide Sub Sidebar
	BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
		if (result.hideSubSidebar == true) {
			document.querySelector('#checkbox-hide-sub-sidebar').checked = true;
			document.querySelector('.icon-hide-sub-sidebar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-sub-sidebar').classList.remove('icon-show');
			document.querySelector('.icon-hide-sub-sidebar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSubSidebar == 'undefined' || result.hideSubSidebar == false) {
			document.querySelector('#checkbox-hide-sub-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide Sub Sidebar: ' + value);
	});

	// Hide Post Sidebar
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		if (result.hidePostSidebar == true) {
			document.querySelector('#checkbox-hide-post-sidebar').checked = true;
			document.querySelector('.icon-hide-post-sidebar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-post-sidebar').classList.remove('icon-show');
			document.querySelector('.icon-hide-post-sidebar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hidePostSidebar == 'undefined' || result.hidePostSidebar == false) {
			document.querySelector('#checkbox-hide-post-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide Post Sidebar: ' + value);
	});

	// Hide Post Overlay Sidebar
	BROWSER_API.storage.sync.get(['hidePostOverlaySidebar'], function (result) {
		if (result.hidePostOverlaySidebar == true) {
			document.querySelector('#checkbox-hide-post-overlay-sidebar').checked = true;
			document.querySelector('.icon-hide-post-overlay-sidebar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-post-overlay-sidebar').classList.remove('icon-show');
			document.querySelector('.icon-hide-post-overlay-sidebar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hidePostOverlaySidebar == 'undefined' || result.hidePostOverlaySidebar == false) {
			document.querySelector('#checkbox-hide-post-overlay-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide Post Overlay Sidebar: ' + value);
	});

	// Hide User Sidebar
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		if (result.hideUserSidebar == true) {
			document.querySelector('#checkbox-hide-user-sidebar').checked = true;
			document.querySelector('.icon-hide-user-sidebar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-user-sidebar').classList.remove('icon-show');
			document.querySelector('.icon-hide-user-sidebar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideUserSidebar == 'undefined' || result.hideUserSidebar == false) {
			document.querySelector('#checkbox-hide-user-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide User Sidebar: ' + value);
	});

	// Hide Custom Feed Sidebar
	BROWSER_API.storage.sync.get(['hideCustomFeedSidebar'], function (result) {
		const hideCustomFeedSidebar = (result.hideCustomFeedSidebar === true);
		document.querySelector('#checkbox-hide-custom-feed-sidebar').checked = hideCustomFeedSidebar;
		document.querySelector('.icon-hide-custom-feed-sidebar').style.backgroundColor = hideCustomFeedSidebar ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-custom-feed-sidebar').classList.toggle('icon-show', !hideCustomFeedSidebar);
		document.querySelector('.icon-hide-custom-feed-sidebar').classList.toggle('icon-hide', hideCustomFeedSidebar);
		document.querySelector('.icon-hide-elements').style.backgroundColor = hideCustomFeedSidebar ? 'var(--accent)' : '';
		console.log('Hide Custom Feed Sidebar: ' + hideCustomFeedSidebar);
	});

	// Hide Sidebar Policy
	BROWSER_API.storage.sync.get(['hideSidebarPolicy'], function (result) {
		if (result.hideSidebarPolicy == true) {
			document.querySelector('#checkbox-hide-sidebar-policy').checked = true;
			document.querySelector('.hide-sidebar-policy').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-sidebar-policy').classList.remove('icon-show');
			document.querySelector('.hide-sidebar-policy').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSidebarPolicy == 'undefined' || result.hideSidebarPolicy == false) {
			document.querySelector('#checkbox-hide-sidebar-policy').checked = false;
			var value = false;
		}
		console.log('Hide Sidebar Policy: ' + value);
	});

	// Hide Search Sidebar
	BROWSER_API.storage.sync.get(['hideSearchSidebar'], function (result) {
		if (result.hideSearchSidebar == true) {
			document.querySelector('#checkbox-hide-search-sidebar').checked = true;
			document.querySelector('.icon-hide-search-sidebar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-search-sidebar').classList.remove('icon-show');
			document.querySelector('.icon-hide-search-sidebar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSearchSidebar == 'undefined' || result.hideSearchSidebar == false) {
			document.querySelector('#checkbox-hide-search-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide Search Sidebar: ' + value);
	});

	// Hide Advertise Button
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		if (result.hideAdvertiseButton == true) {
			document.querySelector('#checkbox-hide-advertise-button').checked = true;
			document.querySelector('.hide-advertise-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-advertise-button').classList.remove('icon-advertise');
			document.querySelector('.hide-advertise-button').classList.add('icon-advertise-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideAdvertiseButton == 'undefined' || result.hideAdvertiseButton == false) {
			document.querySelector('#checkbox-hide-advertise-button').checked = false;
			var value = false;
		}
		console.log('Hide Advertise Button: ' + value);
	});

	// Hide Moderation Button
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		if (result.hideModerationButton == true) {
			document.querySelector('#checkbox-hide-moderation-button').checked = true;
			document.querySelector('.hide-moderation-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-moderation-button').classList.remove('icon-mod');
			document.querySelector('.hide-moderation-button').classList.add('icon-mod-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideModerationButton == 'undefined' || result.hideModerationButton == false) {
			document.querySelector('#checkbox-hide-moderation-button').checked = false;
			var value = false;
		}
		console.log('Hide Moderation Button: ' + value);
	});

	// Hide Popular Button
	BROWSER_API.storage.sync.get(['hidePopularButton'], function (result) {
		if (result.hidePopularButton == true) {
			document.querySelector('#checkbox-hide-popular-button').checked = true;
			document.querySelector('.hide-popular-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-popular-button').classList.remove('icon-popular');
			document.querySelector('.hide-popular-button').classList.add('icon-popular-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hidePopularButton == 'undefined' || result.hidePopularButton == false) {
			document.querySelector('#checkbox-hide-popular-button').checked = false;
			var value = false;
		}
		console.log('Hide Popular Button: ' + value);
	});

	// Hide Chat Button
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		if (result.hideChatButton == true) {
			document.querySelector('#checkbox-hide-chat-button').checked = true;
			document.querySelector('.hide-chat-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-chat-button').classList.remove('icon-chat');
			document.querySelector('.hide-chat-button').classList.add('icon-chat-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideChatButton == 'undefined' || result.hideChatButton == false) {
			document.querySelector('#checkbox-hide-chat-button').checked = false;
			var value = false;
		}
		console.log('Hide Chat Button: ' + value);
	});

	// Hide Notification Button
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		if (result.hideNotificationButton == true) {
			document.querySelector('#checkbox-hide-notification-button').checked = true;
			document.querySelector('.hide-notification-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-notification-button').classList.remove('icon-notification');
			document.querySelector('.hide-notification-button').classList.add('icon-notification-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideNotificationButton == 'undefined' || result.hideNotificationButton == false) {
			document.querySelector('#checkbox-hide-notification-button').checked = false;
			var value = false;
		}
		console.log('Hide Notification Button: ' + value);
	});

	// Hide Create Post Button
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		if (result.hideCreatePostButton == true) {
			document.querySelector('#checkbox-hide-create-post-button').checked = true;
			document.querySelector('.hide-create-post-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-create-post-button').classList.remove('icon-plus');
			document.querySelector('.hide-create-post-button').classList.add('icon-plus-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideCreatePostButton == 'undefined' || result.hideCreatePostButton == false) {
			document.querySelector('#checkbox-hide-create-post-button').checked = false;
			var value = false;
		}
		console.log('Hide Create Post Button: ' + value);
	});

	// Hide Username
	BROWSER_API.storage.sync.get(['hideUsername'], function (result) {
		if (result.hideUsername == true) {
			document.querySelector('#checkbox-hide-username').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.hide-username').classList.remove('icon-user');
			document.querySelector('.hide-username').classList.add('icon-user-slash');
			document.querySelector('.hide-username').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideUsername == 'undefined' || result.hideUsername == false) {
			document.querySelector('#checkbox-hide-username').checked = false;
			var value = false;
		}
		console.log('Hide Username: ' + value);
	});

	// Hide Karma
	BROWSER_API.storage.sync.get(['hideKarma'], function (result) {
		if (result.hideKarma == true) {
			document.querySelector('#checkbox-hide-karma').checked = true;
			document.querySelector('.icon-hide-karma').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-karma').classList.remove('icon-karma');
			document.querySelector('.icon-hide-karma').classList.add('icon-karma-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideKarma == 'undefined' || result.hideKarma == false) {
			document.querySelector('#checkbox-hide-karma').checked = false;
			var value = false;
		}
		console.log('Hide Karma: ' + value);
	});

	// Hide Get New Reddit
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		if (result.hideGetNewReddit == true) {
			document.querySelector('#checkbox-hide-get-new-reddit').checked = true;
			document.querySelector('.hide-get-new-reddit').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-get-new-reddit').classList.remove('icon-show');
			document.querySelector('.hide-get-new-reddit').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideGetNewReddit == 'undefined' || result.hideGetNewReddit == false) {
			document.querySelector('#checkbox-hide-get-new-reddit').checked = false;
			var value = false;
		}
		console.log('Hide Get New Reddit Button: ' + value);
	});

	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		if (result.hidePromoted == true) {
			document.querySelector('#checkbox-hide-promoted').checked = true;
			document.querySelector('.icon-hide-promoted').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-promoted').classList.remove('icon-ad');
			document.querySelector('.icon-hide-promoted').classList.add('icon-ad-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hidePromoted == 'undefined' || result.hidePromoted == false) {
			document.querySelector('#checkbox-hide-promoted').checked = false;
			var value = false;
		}
		console.log('Hide Promoted Posts: ' + value);
	});

	// Hide Recommended Links
	BROWSER_API.storage.sync.get(['hideRecommended'], function (result) {
		if (result.hideRecommended == true) {
			document.querySelector('#checkbox-hide-recommended').checked = true;
			document.querySelector('.icon-hide-recommended').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-recommended').classList.remove('icon-hand');
			document.querySelector('.icon-hide-recommended').classList.add('icon-hand-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideRecommended == 'undefined' || result.hideRecommended == false) {
			document.querySelector('#checkbox-hide-recommended').checked = false;
			var value = false;
		}
		console.log('Hide Recommended Posts: ' + value);
	});

	// Hide NSFW Links
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		if (result.hideNSFW == true) {
			document.querySelector('#checkbox-hide-nsfw').checked = true;
			document.querySelector('.icon-hide-nsfw').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-nsfw').classList.remove('icon-nsfw');
			document.querySelector('.icon-hide-nsfw').classList.add('icon-nsfw-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideNSFW == 'undefined' || result.hideNSFW == false) {
			document.querySelector('#checkbox-hide-nsfw').checked = false;
			var value = false;
		}
		console.log('Hide NSFW Links: ' + value);
	});

	// Hide See Full Image
	BROWSER_API.storage.sync.get(['hideSeeFullImage'], function (result) {
		if (result.hideSeeFullImage == true) {
			document.querySelector('#checkbox-hide-see-full-image').checked = true;
			document.querySelector('.icon-hide-see-full-image').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSeeFullImage == 'undefined' || result.hideSeeFullImage == false) {
			document.querySelector('#checkbox-hide-see-full-image').checked = false;
			var value = false;
		}
		console.log("Hide 'See Full Image' Button: " + value);
	});

	// Hide Header Sub Bar
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		if (result.hideHeaderSubBar == true) {
			document.querySelector('#checkbox-hide-header-sub-bar').checked = true;
			document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-header-sub-bar').classList.remove('icon-show');
			document.querySelector('.icon-hide-header-sub-bar').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideHeaderSubBar == 'undefined' || result.hideHeaderSubBar == false) {
			document.querySelector('#checkbox-hide-header-sub-bar').checked = false;
			var value = false;
		}
		console.log('Hide Header Sub Bar: ' + value);
	});

	// Hide Side Menu Old
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		if (result.hideSideMenuOld == true) {
			document.querySelector('#checkbox-hide-side-menu-old').checked = true;
			document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-old').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-old').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuOld == 'undefined' || result.hideSideMenuOld == false) {
			document.querySelector('#checkbox-hide-side-menu-old').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Old: ' + value);
	});

	// Hide Side Menu
	BROWSER_API.storage.sync.get(['hideSideMenu'], function (result) {
		if (result.hideSideMenu == true) {
			document.querySelector('#checkbox-hide-side-menu').checked = true;
			document.querySelector('.icon-hide-side-menu').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenu == 'undefined' || result.hideSideMenu == false) {
			document.querySelector('#checkbox-hide-side-menu').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu: ' + value);
	});

	// Hide "Turn On Notifications" Popup
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		if (result.hideTurnOnNotificationsPopup == true) {
			document.querySelector('#checkbox-hide-turn-on-notifications').checked = true;
			document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-turn-on-notifications').classList.remove('icon-bell');
			document.querySelector('.icon-hide-turn-on-notifications').classList.add('icon-bell-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideTurnOnNotificationsPopup == 'undefined' || result.hideTurnOnNotificationsPopup == false) {
			document.querySelector('#checkbox-hide-turn-on-notifications').checked = false;
			var value = false;
		}
		console.log('Hide "Turn On Notifications" Popup: ' + value);
	});

	// Hide Sub Sidebar Exceptions Enable
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionsEnable'], function (result) {
		if (result.hideSubSidebarExceptionsEnable == true) {
			document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').checked = true;
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSubSidebarExceptionsEnable == 'undefined' || result.hideSubSidebarExceptionsEnable == false) {
			document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').checked = false;
			var value = false;
		}
		console.log('Hide Sub Sidebar Exceptions Enable: ' + value);
	});

	// Hide Sub Sidebar Exception Mode
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionMode'], function (result) {
		if (typeof result.hideSubSidebarExceptionMode == 'undefined' || result.hideSubSidebarExceptionMode === 'blacklist') {
			var value = 'blacklist';
		} else if (result.hideSubSidebarExceptionMode === 'whitelist') {
			document.querySelector('#btn-hide-sub-sidebar-blacklist').classList.remove('tab-active');
			document.querySelector('#btn-hide-sub-sidebar-whitelist').classList.add('tab-active');
			document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.remove('hidden');
			document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.add('hidden');
			var value = 'whitelist';
		}
		console.log('Hide Sub Sidebar Exception Mode: ' + value);
	});

	// Hide Sub Sidebar Exceptions List
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionSubList'], function (result) {
		if (typeof result.hideSubSidebarExceptionSubList != 'undefined') {
			var value = result.hideSubSidebarExceptionSubList;
			document.querySelector('#input-hide-sub-sidebar-exceptions').value = value;
		} else {
			var value = '';
		}
		console.log('Hide Sub Sidebar Exceptions Sub List: ' + value);
	});

	// Hide Header Bar
	BROWSER_API.storage.sync.get(['hideHeaderBar'], function (result) {
		if (result.hideHeaderBar == true) {
			document.querySelector('#checkbox-hide-header-bar').checked = true;
			document.querySelector('.icon-hide-header-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-header-bar').classList.remove('icon-header');
			document.querySelector('.icon-hide-header-bar').classList.add('icon-header-slash');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideHeaderBar == 'undefined' || result.hideHeaderBar == false) {
			document.querySelector('#checkbox-hide-header-bar').checked = false;
			var value = false;
		}
		console.log('Hide Header Bar: ' + value);
	});

	// Hide Original Scroll To Top Button
	BROWSER_API.storage.sync.get(['hideOriginalScrollToTop'], function (result) {
		if (result.hideOriginalScrollToTop == true) {
			document.querySelector('#checkbox-hide-original-scroll-to-top').checked = true;
			document.querySelector('.icon-hide-original-scroll-to-top').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-original-scroll-to-top').classList.remove('icon-show');
			document.querySelector('.icon-hide-original-scroll-to-top').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideOriginalScrollToTop == 'undefined' || result.hideOriginalScrollToTop == false) {
			document.querySelector('#checkbox-hide-original-scroll-to-top').checked = false;
			var value = false;
		}
		console.log('Hide Original Scroll To Top Button: ' + value);
	});

	// Hide Side Menu Top Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection'], function (result) {
		if (result.hideSideMenuTopSection == true) {
			document.querySelector('#checkbox-hide-side-menu-top-section').checked = true;
			document.querySelector('.icon-hide-side-menu-top-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-top-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-top-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuTopSection == 'undefined' || result.hideSideMenuTopSection == false) {
			document.querySelector('#checkbox-hide-side-menu-top-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Top Section: ' + value);
	});

	// Hide Side Menu Moderation Section
	BROWSER_API.storage.sync.get(['hideSideMenuModerationSection'], function (result) {
		if (result.hideSideMenuModerationSection == true) {
			document.querySelector('#checkbox-hide-side-menu-moderation-section').checked = true;
			document.querySelector('.icon-hide-side-menu-moderation-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-moderation-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-moderation-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuModerationSection == 'undefined' || result.hideSideMenuModerationSection == false) {
			document.querySelector('#checkbox-hide-side-menu-moderation-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Moderation Section: ' + value);
	});

	// Hide Side Menu Recent Section
	BROWSER_API.storage.sync.get(['hideSideMenuRecentSection'], function (result) {
		if (result.hideSideMenuRecentSection == true) {
			document.querySelector('#checkbox-hide-side-menu-recent-section').checked = true;
			document.querySelector('.icon-hide-side-menu-recent-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-recent-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-recent-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuRecentSection == 'undefined' || result.hideSideMenuRecentSection == false) {
			document.querySelector('#checkbox-hide-side-menu-recent-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Recent Section: ' + value);
	});

	// Hide Side Menu Custom Feeds Section
	BROWSER_API.storage.sync.get(['hideSideMenuCustomFeedsSection'], function (result) {
		if (result.hideSideMenuCustomFeedsSection == true) {
			document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').checked = true;
			document.querySelector('.icon-hide-side-menu-custom-feeds-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-custom-feeds-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-custom-feeds-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuCustomFeedsSection == 'undefined' || result.hideSideMenuCustomFeedsSection == false) {
			document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Custom Feeds Section: ' + value);
	});

	// Hide Side Menu Communities Section
	BROWSER_API.storage.sync.get(['hideSideMenuCommunitiesSection'], function (result) {
		if (result.hideSideMenuCommunitiesSection == true) {
			document.querySelector('#checkbox-hide-side-menu-communities-section').checked = true;
			document.querySelector('.icon-hide-side-menu-communities-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-communities-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-communities-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuCommunitiesSection == 'undefined' || result.hideSideMenuCommunitiesSection == false) {
			document.querySelector('#checkbox-hide-side-menu-communities-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Communities Section: ' + value);
	});

	// Hide Side Menu Resources Section
	BROWSER_API.storage.sync.get(['hideSideMenuResourcesSection'], function (result) {
		if (result.hideSideMenuResourcesSection == true) {
			document.querySelector('#checkbox-hide-side-menu-resources-section').checked = true;
			document.querySelector('.icon-hide-side-menu-resources-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-resources-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-resources-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuResourcesSection == 'undefined' || result.hideSideMenuResourcesSection == false) {
			document.querySelector('#checkbox-hide-side-menu-resources-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Resources Section: ' + value);
	});

	// Hide Side Menu Topics Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopicsSection'], function (result) {
		if (result.hideSideMenuTopicsSection == true) {
			document.querySelector('#checkbox-hide-side-menu-topics-section').checked = true;
			document.querySelector('.icon-hide-side-menu-topics-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-topics-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-topics-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideSideMenuTopicsSection == 'undefined' || result.hideSideMenuTopicsSection == false) {
			document.querySelector('#checkbox-hide-side-menu-topics-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Topics Section: ' + value);
	});

	// Hide Related Posts Section in Sidebar
	BROWSER_API.storage.sync.get(['hideRelatedPostsSection'], function (result) {
		if (result.hideRelatedPostsSection == true) {
			document.querySelector('#checkbox-hide-related-posts-section').checked = true;
			document.querySelector('.icon-hide-related-posts-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-related-posts-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-related-posts-section').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hideRelatedPostsSection == 'undefined' || result.hideRelatedPostsSection == false) {
			document.querySelector('#checkbox-hide-related-posts-section').checked = false;
			var value = false;
		}
		console.log('Hide Related Posts Section: ' + value);
	});

	// Hide User Profile Pics
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		if (result.hideUserProfilePics == true) {
			document.querySelector('.icon-hide-user-profile-pics').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-user-profile-pics').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-user-profile-pics').classList.remove('icon-show');
			document.querySelector('.icon-hide-user-profile-pics').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideUserProfilePics == 'undefined' || result.hideUserProfilePics == false) {
			document.querySelector('#checkbox-hide-user-profile-pics').checked = false;
			var value = false;
		}
		console.log('Hide User Profile Pics: ' + value);
	});

	// Hide Post Hidden Message
	BROWSER_API.storage.sync.get(['hidePostHiddenMessage'], function (result) {
		if (result.hidePostHiddenMessage == true) {
			document.querySelector('.icon-hide-post-hidden-message').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-post-hidden-message').checked = true;
			document.querySelector('.icon-hide-post-hidden-message').classList.remove('icon-show');
			document.querySelector('.icon-hide-post-hidden-message').classList.add('icon-hide');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.hidePostHiddenMessage == 'undefined' || result.hidePostHiddenMessage == false) {
			document.querySelector('#checkbox-hide-post-hidden-message').checked = false;
			var value = false;
		}
		console.log('Hide Post Hidden Message: ' + value);
	});

	// Hide Join Button On r/all Posts
	BROWSER_API.storage.sync.get(['hideJoinButtonOnPosts'], function (result) {
		if (result.hideJoinButtonOnPosts === true) {
			document.querySelector('.icon-hide-join-button-on-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-join-button-on-posts').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-join-button-on-posts').classList.remove('icon-show');
			document.querySelector('.icon-hide-join-button-on-posts').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideJoinButtonOnPosts == 'undefined' || result.hideJoinButtonOnPosts === false) {
			document.querySelector('#checkbox-hide-join-button-on-posts').checked = false;
			var value = false;
		}
		console.log('Hide Join Button On r/all Posts: ' + value);
	});

	// Hide The Post Back Button
	BROWSER_API.storage.sync.get(['hidePostBackButton'], function (result) {
		if (result.hidePostBackButton === true) {
			document.querySelector('.icon-hide-post-back-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-post-back-button').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-post-back-button').classList.remove('icon-show');
			document.querySelector('.icon-hide-post-back-button').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hidePostBackButton == 'undefined' || result.hidePostBackButton === false) {
			document.querySelector('#checkbox-hide-post-back-button').checked = false;
			var value = false;
		}
		console.log('Hide The Post Back Button: ' + value);
	});

	// Hide Post Karma
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		if (result.hidePostKarma === true) {
			document.querySelector('.icon-hide-post-karma').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-post-karma').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-post-karma').classList.remove('icon-show');
			document.querySelector('.icon-hide-post-karma').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hidePostKarma == 'undefined' || result.hidePostKarma === false) {
			document.querySelector('#checkbox-hide-post-karma').checked = false;
			var value = false;
		}
		console.log('Hide Post Karma: ' + value);
	});

	// Hide Comment Karma
	BROWSER_API.storage.sync.get(['hideCommentKarma'], function (result) {
		if (result.hideCommentKarma === true) {
			document.querySelector('.icon-hide-comment-karma').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-comment-karma').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-comment-karma').classList.remove('icon-show');
			document.querySelector('.icon-hide-comment-karma').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideCommentKarma == 'undefined' || result.hideCommentKarma === false) {
			document.querySelector('#checkbox-hide-comment-karma').checked = false;
			var value = false;
		}
		console.log('Hide Comment Karma: ' + value);
	});

	// Hide Recent Posts
	BROWSER_API.storage.sync.get(['hideRecentPosts'], function (result) {
		if (result.hideRecentPosts === true) {
			document.querySelector('.icon-hide-recent-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-recent-posts').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-recent-posts').classList.remove('icon-show');
			document.querySelector('.icon-hide-recent-posts').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideRecentPosts == 'undefined' || result.hideRecentPosts === false) {
			document.querySelector('#checkbox-hide-recent-posts').checked = false;
			var value = false;
		}
		console.log('Hide Recent Posts: ' + value);
	});

	// Hide Side Menu Favourite Buttons
	BROWSER_API.storage.sync.get(['hideSideMenuFavouriteButton'], function (result) {
		if (result.hideSideMenuFavouriteButton === true) {
			document.querySelector('.icon-hide-side-menu-star').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-side-menu-star').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-side-menu-star').classList.remove('icon-star');
			document.querySelector('.icon-hide-side-menu-star').classList.add('icon-star-slash');
			var value = true;
		} else if (typeof result.hideSideMenuFavouriteButton == 'undefined' || result.hideSideMenuFavouriteButton === false) {
			document.querySelector('#checkbox-hide-side-menu-star').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Favourite Buttons: ' + value);
	});

	// Hide Compact View Blank Thumbnails
	BROWSER_API.storage.sync.get(['hideCompactViewBlankThumbnails'], function (result) {
		if (result.hideCompactViewBlankThumbnails === true) {
			document.querySelector('.icon-hide-compact-view-blank-thumbnails').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-compact-view-blank-thumbnails').classList.remove('icon-show');
			document.querySelector('.icon-hide-compact-view-blank-thumbnails').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideCompactViewBlankThumbnails == 'undefined' || result.hideCompactViewBlankThumbnails === false) {
			document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').checked = false;
			var value = false;
		}
		console.log('Hide Compact View Blank Thumbnails: ' + value);
	});

	// Hide "NSFW" In The Search Results
	BROWSER_API.storage.sync.get(['hideNsfwInSearchResults'], function (result) {
		if (result.hideNsfwInSearchResults === true) {
			document.querySelector('.icon-hide-nsfw-search-results').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-nsfw-search-results').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-nsfw-search-results').classList.remove('icon-show');
			document.querySelector('.icon-hide-nsfw-search-results').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideNsfwInSearchResults == 'undefined' || result.hideNsfwInSearchResults === false) {
			document.querySelector('#checkbox-hide-nsfw-search-results').checked = false;
			var value = false;
		}
		console.log('Hide "NSFW" In The Search Results: ' + value);
	});

	// Hide "Trending Today" In The Search Results
	BROWSER_API.storage.sync.get(['hideTrendingTodayInSearchResults'], function (result) {
		if (result.hideTrendingTodayInSearchResults === true) {
			document.querySelector('.icon-hide-trending-today-in-search-results').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-trending-today-in-search-results').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-trending-today-in-search-results').classList.remove('icon-show');
			document.querySelector('.icon-hide-trending-today-in-search-results').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideTrendingTodayInSearchResults == 'undefined' || result.hideTrendingTodayInSearchResults === false) {
			document.querySelector('#checkbox-hide-trending-today-in-search-results').checked = false;
			var value = false;
		}
		console.log('Hide "Trending Today" In The Search Results: ' + value);
	});

	// Hide Community Highlights
	BROWSER_API.storage.sync.get(['hideCommunityHighlights'], function (result) {
		if (result.hideCommunityHighlights === true) {
			document.querySelector('.icon-hide-community-highlights').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-community-highlights').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-community-highlights').classList.remove('icon-thumbtack');
			document.querySelector('.icon-hide-community-highlights').classList.add('icon-thumbtack-slash');
			var value = true;
		} else if (typeof result.hideCommunityHighlights == 'undefined' || result.hideCommunityHighlights === false) {
			document.querySelector('#checkbox-hide-community-highlights').checked = false;
			var value = false;
		}
		console.log('Hide Community Highlights: ' + value);
	});

	// Hide NSFW Users In The Search Page Sidebar
	BROWSER_API.storage.sync.get(['hideSearchSidebarNsfwUsers'], function (result) {
		if (result.hideSearchSidebarNsfwUsers === true) {
			document.querySelector('.icon-hide-search-sidebar-nsfw-users').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-search-sidebar-nsfw-users').classList.remove('icon-show');
			document.querySelector('.icon-hide-search-sidebar-nsfw-users').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideSearchSidebarNsfwUsers == 'undefined' || result.hideSearchSidebarNsfwUsers === false) {
			document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').checked = false;
			var value = false;
		}
		console.log('Hide NSFW Users In The Search Page Sidebar: ' + value);
	});

	// Show Side Menu Toggle Button
	BROWSER_API.storage.sync.get(['sideMenuToggleButton'], function (result) {
		if (result.sideMenuToggleButton == true) {
			document.querySelector('#checkbox-side-menu-toggle-button').checked = true;
			document.querySelector('.icon-side-menu-toggle-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-side-menu-toggle-button').classList.remove('icon-hide');
			document.querySelector('.icon-side-menu-toggle-button').classList.add('icon-show');
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.sideMenuToggleButton == 'undefined' || result.sideMenuToggleButton == false) {
			document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
			var value = false;
		}
		console.log('Show Side Menu Toggle Button: ' + value);
	});

	// Side Menu Icons Only
	BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
		if (result.sideMenuIconsOnly === true) {
			document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-side-menu-icons-only').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-side-menu-icons-only').classList.remove('icon-side-menu-list');
			document.querySelector('.icon-side-menu-icons-only').classList.add('icon-side-menu-icons');
			var value = true;
		} else if (typeof result.sideMenuIconsOnly == 'undefined' || result.sideMenuIconsOnly === false) {
			document.querySelector('#checkbox-side-menu-icons-only').checked = false;
			var value = false;
		}
		console.log('Side Menu Icons Only: ' + value);
	});

	// Hide Home Feed
	BROWSER_API.storage.sync.get(['hideHomeFeed'], function (result) {
		if (result.hideHomeFeed === true) {
			document.querySelector('.icon-hide-home-feed').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-home-feed').checked = true;
			highlightMenuIcon('hide-elements');
			document.querySelector('.icon-hide-home-feed').classList.remove('icon-show');
			document.querySelector('.icon-hide-home-feed').classList.add('icon-hide');
			var value = true;
		} else if (typeof result.hideHomeFeed == 'undefined' || result.hideHomeFeed === false) {
			document.querySelector('#checkbox-hide-home-feed').checked = false;
			var value = false;
		}
		console.log('Hide Home Feed: ' + value);
	});

	// Remember Side Menu Section Hidden State
	BROWSER_API.storage.sync.get(['rememberSideMenuSectionHiddenState'], function (result) {
		if (result.rememberSideMenuSectionHiddenState === true) {
			document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-remember-side-menu-section-hidden-state').checked = true;
			highlightMenuIcon('hide-elements');
			var value = true;
		} else if (typeof result.rememberSideMenuSectionHiddenState == 'undefined' || result.rememberSideMenuSectionHiddenState === false) {
			document.querySelector('#checkbox-remember-side-menu-section-hidden-state').checked = false;
			var value = false;
		}
		console.log('Remember Side Menu Section Hidden State: ' + value);
	});

	// Hide Post Divider
	BROWSER_API.storage.sync.get(['hidePostDivider'], function (result) {
		const hidePostDivider = (result.hidePostDivider === true);
		if (hidePostDivider) highlightMenuIcon('hide-elements');
		document.querySelector('#checkbox-hide-post-divider').checked = hidePostDivider;
		document.querySelector('.icon-hide-post-divider').style.backgroundColor = hidePostDivider ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-post-divider').classList.toggle('icon-show', !hidePostDivider);
		document.querySelector('.icon-hide-post-divider').classList.toggle('icon-hide', hidePostDivider);
		document.querySelector('.icon-hide-elements').style.backgroundColor = hidePostDivider ? 'var(--accent)' : '';
		console.log('Hide Post Divider: ' + hidePostDivider);
	});

	// Post Separator Length
	BROWSER_API.storage.sync.get(['postSeparatorLength'], function (result) {
		const value = result.postSeparatorLength || '';
		document.querySelector('#input-post-separator-length').value = value;
		document.querySelector('#post-separator-length-value').innerText = value + 'px';
		console.log('Post Separator Length: ' + value);
	});

	// Hide Blurred Media Background
	BROWSER_API.storage.sync.get(['hideBlurredMediaBackground'], function (result) {
		const hideBlurredMediaBackground = result.hideBlurredMediaBackground === true;
		if (hideBlurredMediaBackground) highlightMenuIcon('hide-elements');
		document.querySelector('#checkbox-hide-blurred-media-background').checked = hideBlurredMediaBackground;
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = hideBlurredMediaBackground ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-blurred-media-background').classList.toggle('icon-show', !hideBlurredMediaBackground);
		document.querySelector('.icon-hide-blurred-media-background').classList.toggle('icon-hide', hideBlurredMediaBackground);
		document.querySelector('.icon-hide-elements').style.backgroundColor = hideBlurredMediaBackground ? 'var(--accent)' : '';
		console.log('Hide Blurred Media Background: ' + hideBlurredMediaBackground);
	});

	// Hide Vote Buttons
	BROWSER_API.storage.sync.get(['hideVoteButtons'], function (result) {
		const hideVoteButtons = result.hideVoteButtons === true;
		if (hideVoteButtons) highlightMenuIcon('hide-elements');
		document.querySelector('#checkbox-hide-vote-buttons').checked = hideVoteButtons;
		document.querySelector('.icon-hide-vote-buttons').style.backgroundColor = hideVoteButtons ? 'var(--accent)' : '';
		document.querySelector('.icon-hide-vote-buttons').classList.toggle('icon-show', !hideVoteButtons);
		document.querySelector('.icon-hide-vote-buttons').classList.toggle('icon-hide', hideVoteButtons);
		document.querySelector('.icon-hide-elements').style.backgroundColor = hideVoteButtons ? 'var(--accent)' : '';
		console.log('Hide Vote Buttons: ' + hideVoteButtons);
	});
}
