/* ===== Inputs / Hide Elements ===== */

import { sendMessage } from '../send_message';

// Toggle - Hide Reddit Premium
document.querySelector('#checkbox-hide-reddit-premium').addEventListener('change', function () {
	const hideRedditPremium = document.querySelector('#checkbox-hide-reddit-premium').checked;
	if (hideRedditPremium === true) {
		BROWSER_API.storage.sync.set({ hideRedditPremium: true });
		document.querySelector('.hide-reddit-premium').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-reddit-premium').classList.remove('icon-show');
		document.querySelector('.hide-reddit-premium').classList.add('icon-hide');
		sendMessage({ hideRedditPremium: true });
	} else if (hideRedditPremium === false) {
		BROWSER_API.storage.sync.set({ hideRedditPremium: false });
		document.querySelector('.hide-reddit-premium').style.backgroundColor = '';
		document.querySelector('.hide-reddit-premium').classList.add('icon-show');
		document.querySelector('.hide-reddit-premium').classList.remove('icon-hide');
		sendMessage({ hideRedditPremium: false });
	}
});

// Toggle - Hide Create Post
document.querySelector('#checkbox-hide-create-post').addEventListener('change', function () {
	const hideCreatePost = document.querySelector('#checkbox-hide-create-post').checked;
	if (hideCreatePost === true) {
		BROWSER_API.storage.sync.set({ hideCreatePost: true });
		document.querySelector('.icon-hide-create-post').classList.remove('icon-plus');
		document.querySelector('.icon-hide-create-post').classList.add('icon-plus-slash');
		document.querySelector('.icon-hide-create-post').style.backgroundColor = 'var(--accent)';
		sendMessage({ hideCreatePost: true });
	} else if (hideCreatePost === false) {
		BROWSER_API.storage.sync.set({ hideCreatePost: false });
		document.querySelector('.icon-hide-create-post').classList.add('icon-plus');
		document.querySelector('.icon-hide-create-post').classList.remove('icon-plus-slash');
		document.querySelector('.icon-hide-create-post').style.backgroundColor = '';
		sendMessage({ hideCreatePost: false });
	}
});

// Toggle - Hide Home Sidebar
document.querySelector('#checkbox-hide-home-sidebar').addEventListener('change', function (e) {
	const hideHomeSidebar = e.target.checked;
	if (hideHomeSidebar === true) {
		BROWSER_API.storage.sync.set({ hideHomeSidebar: true });
		document.querySelector('.icon-hide-home-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-home-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-home-sidebar').classList.add('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideHomeSidebar: true });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	} else if (hideHomeSidebar === false) {
		BROWSER_API.storage.sync.set({ hideHomeSidebar: false });
		document.querySelector('.icon-hide-home-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-home-sidebar').classList.add('icon-show');
		document.querySelector('.icon-hide-home-sidebar').classList.remove('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideHomeSidebar: false });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	}
});

// Toggle - Hide Sub Sidebar
document.querySelector('#checkbox-hide-sub-sidebar').addEventListener('change', function () {
	const hideSubSidebar = document.querySelector('#checkbox-hide-sub-sidebar').checked;
	if (hideSubSidebar === true) {
		BROWSER_API.storage.sync.set({ hideSubSidebar: true });
		document.querySelector('.icon-hide-sub-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-sub-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-sub-sidebar').classList.add('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideSubSidebar: true });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	} else if (hideSubSidebar === false) {
		BROWSER_API.storage.sync.set({ hideSubSidebar: false });
		document.querySelector('.icon-hide-sub-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-sub-sidebar').classList.add('icon-show');
		document.querySelector('.icon-hide-sub-sidebar').classList.remove('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideSubSidebar: false });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	}
});

// Toggle - Hide Post Sidebar
document.querySelector('#checkbox-hide-post-sidebar').addEventListener('change', function () {
	const hidePostSidebar = document.querySelector('#checkbox-hide-post-sidebar').checked;
	if (hidePostSidebar === true) {
		BROWSER_API.storage.sync.set({ hidePostSidebar: true });
		document.querySelector('.icon-hide-post-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-post-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-sidebar').classList.add('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hidePostSidebar: true });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	} else if (hidePostSidebar === false) {
		BROWSER_API.storage.sync.set({ hidePostSidebar: false });
		document.querySelector('.icon-hide-post-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-sidebar').classList.add('icon-show');
		document.querySelector('.icon-hide-post-sidebar').classList.remove('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hidePostSidebar: false });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	}
});

// Toggle - Hide Post Overlay Sidebar
document.querySelector('#checkbox-hide-post-overlay-sidebar').addEventListener('change', function () {
	const hidePostOverlaySidebar = document.querySelector('#checkbox-hide-post-overlay-sidebar').checked;
	if (hidePostOverlaySidebar) {
		document.querySelector('.icon-hide-post-overlay-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-post-overlay-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-overlay-sidebar').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-post-overlay-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-overlay-sidebar').classList.add('icon-show');
		document.querySelector('.icon-hide-post-overlay-sidebar').classList.remove('icon-hide');
	}
	BROWSER_API.storage.sync.set({ hidePostOverlaySidebar: hidePostOverlaySidebar });
	sendMessage({ hidePostOverlaySidebar: hidePostOverlaySidebar });
});

// Toggle - Hide User Sidebar
document.querySelector('#checkbox-hide-user-sidebar').addEventListener('change', function () {
	const hideUserSidebar = document.querySelector('#checkbox-hide-user-sidebar').checked;
	if (hideUserSidebar === true) {
		BROWSER_API.storage.sync.set({ hideUserSidebar: true });
		document.querySelector('.icon-hide-user-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-user-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-user-sidebar').classList.add('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideUserSidebar: true });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	} else if (hideUserSidebar === false) {
		BROWSER_API.storage.sync.set({ hideUserSidebar: false });
		document.querySelector('.icon-hide-user-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-user-sidebar').classList.add('icon-show');
		document.querySelector('.icon-hide-user-sidebar').classList.remove('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideUserSidebar: false });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	}
});

// Toggle - Hide Custom Feed Sidebar
document.querySelector('#checkbox-hide-custom-feed-sidebar').addEventListener('change', function () {
	const hideCustomFeedSidebar = document.querySelector('#checkbox-hide-custom-feed-sidebar').checked;
	if (hideCustomFeedSidebar) {
		document.querySelector('.icon-hide-custom-feed-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-custom-feed-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-custom-feed-sidebar').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-custom-feed-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-custom-feed-sidebar').classList.add('icon-show');
		document.querySelector('.icon-hide-custom-feed-sidebar').classList.remove('icon-hide');
	}
	BROWSER_API.storage.sync.set({ hideCustomFeedSidebar: hideCustomFeedSidebar });
	sendMessage({ hideCustomFeedSidebar: hideCustomFeedSidebar });
});

// Toggle - Sidebar Toggle Button
document.querySelector('#checkbox-sidebar-toggle-button').addEventListener('change', function () {
	const sidebarToggleButton = document.querySelector('#checkbox-sidebar-toggle-button').checked;
	if (sidebarToggleButton) {
		document.querySelector('.icon-sidebar-toggle-button').classList.remove('icon-show');
		document.querySelector('.icon-sidebar-toggle-button').classList.add('icon-hide');
		document.querySelector('.icon-sidebar-toggle-button').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-sidebar-toggle-button').classList.remove('icon-hide');
		document.querySelector('.icon-sidebar-toggle-button').classList.add('icon-show');
		document.querySelector('.icon-sidebar-toggle-button').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ sidebarToggleButton: sidebarToggleButton });
	sendMessage({ sidebarToggleButton: sidebarToggleButton });
});

// Toggle - Hide Sidebar Policy
document.querySelector('#checkbox-hide-sidebar-policy').addEventListener('change', function () {
	const hideSidebarPolicy = document.querySelector('#checkbox-hide-sidebar-policy').checked;
	if (hideSidebarPolicy) {
		document.querySelector('.hide-sidebar-policy').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-sidebar-policy').classList.remove('icon-show');
		document.querySelector('.hide-sidebar-policy').classList.add('icon-hide');
	} else {
		document.querySelector('.hide-sidebar-policy').style.backgroundColor = '';
		document.querySelector('.hide-sidebar-policy').classList.add('icon-show');
		document.querySelector('.hide-sidebar-policy').classList.remove('icon-hide');
	}
	BROWSER_API.storage.sync.set({ hideSidebarPolicy: hideSidebarPolicy });
	sendMessage({ hideSidebarPolicy: hideSidebarPolicy });
});

// Toggle - Hide Advertise Button
document.querySelector('#checkbox-hide-advertise-button').addEventListener('change', function () {
	const hideAdvertiseButton = document.querySelector('#checkbox-hide-advertise-button').checked;
	if (hideAdvertiseButton) {
		document.querySelector('.hide-advertise-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-advertise-button').classList.remove('icon-advertise');
		document.querySelector('.hide-advertise-button').classList.add('icon-advertise-slash');
	} else {
		document.querySelector('.hide-advertise-button').style.backgroundColor = '';
		document.querySelector('.hide-advertise-button').classList.add('icon-advertise');
		document.querySelector('.hide-advertise-button').classList.remove('icon-advertise-slash');
	}
	BROWSER_API.storage.sync.set({ hideAdvertiseButton: hideAdvertiseButton });
	sendMessage({ hideAdvertiseButton: hideAdvertiseButton });
});

// Toggle - Hide Moderation Button
document.querySelector('#checkbox-hide-moderation-button').addEventListener('change', function () {
	const hideModerationButton = document.querySelector('#checkbox-hide-moderation-button').checked;
	if (hideModerationButton) {
		document.querySelector('.hide-moderation-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-moderation-button').classList.remove('icon-mod');
		document.querySelector('.hide-moderation-button').classList.add('icon-mod-slash');
	} else {
		document.querySelector('.hide-moderation-button').style.backgroundColor = '';
		document.querySelector('.hide-moderation-button').classList.add('icon-mod');
		document.querySelector('.hide-moderation-button').classList.remove('icon-mod-slash');
	}
	BROWSER_API.storage.sync.set({ hideModerationButton: hideModerationButton });
	sendMessage({ hideModerationButton: hideModerationButton });
});

// Toggle - Hide Popular Button
document.querySelector('#checkbox-hide-popular-button').addEventListener('change', function () {
	const hidePopularButton = document.querySelector('#checkbox-hide-popular-button').checked;
	if (hidePopularButton) {
		document.querySelector('.hide-popular-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-popular-button').classList.remove('icon-popular');
		document.querySelector('.hide-popular-button').classList.add('icon-popular-slash');
	} else {
		document.querySelector('.hide-popular-button').style.backgroundColor = '';
		document.querySelector('.hide-popular-button').classList.add('icon-popular');
		document.querySelector('.hide-popular-button').classList.remove('icon-popular-slash');
	}
	BROWSER_API.storage.sync.set({ hidePopularButton: hidePopularButton });
	sendMessage({ hidePopularButton: hidePopularButton });
});

// Toggle - Hide Chat Button
document.querySelector('#checkbox-hide-chat-button').addEventListener('change', function () {
	const hideChatButton = document.querySelector('#checkbox-hide-chat-button').checked;
	if (hideChatButton) {
		document.querySelector('.hide-chat-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-chat-button').classList.remove('icon-chat');
		document.querySelector('.hide-chat-button').classList.add('icon-chat-slash');
	} else {
		document.querySelector('.hide-chat-button').style.backgroundColor = '';
		document.querySelector('.hide-chat-button').classList.add('icon-chat');
		document.querySelector('.hide-chat-button').classList.remove('icon-chat-slash');
	}
	BROWSER_API.storage.sync.set({ hideChatButton: hideChatButton });
	sendMessage({ hideChatButton: hideChatButton });
});

// Toggle - Hide Notification Button
document.querySelector('#checkbox-hide-notification-button').addEventListener('change', function () {
	const hideNotificationButton = document.querySelector('#checkbox-hide-notification-button').checked;
	if (hideNotificationButton) {
		document.querySelector('.hide-notification-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-notification-button').classList.remove('icon-notification');
		document.querySelector('.hide-notification-button').classList.add('icon-notification-slash');
	} else {
		document.querySelector('.hide-notification-button').style.backgroundColor = '';
		document.querySelector('.hide-notification-button').classList.add('icon-notification');
		document.querySelector('.hide-notification-button').classList.remove('icon-notification-slash');
	}
	BROWSER_API.storage.sync.set({ hideNotificationButton: hideNotificationButton });
	sendMessage({ hideNotificationButton: hideNotificationButton });
});

// Toggle - Hide Create Post Button
document.querySelector('#checkbox-hide-create-post-button').addEventListener('change', function () {
	const hideCreatePostButton = document.querySelector('#checkbox-hide-create-post-button').checked;
	if (hideCreatePostButton) {
		document.querySelector('.hide-create-post-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-create-post-button').classList.remove('icon-plus');
		document.querySelector('.hide-create-post-button').classList.add('icon-plus-slash');
	} else {
		document.querySelector('.hide-create-post-button').style.backgroundColor = '';
		document.querySelector('.hide-create-post-button').classList.add('icon-plus');
		document.querySelector('.hide-create-post-button').classList.remove('icon-plus-slash');
	}
	BROWSER_API.storage.sync.set({ hideCreatePostButton: hideCreatePostButton });
	sendMessage({ hideCreatePostButton: hideCreatePostButton });
});

// Toggle - Hide Username
document.querySelector('#checkbox-hide-username').addEventListener('change', function () {
	const hideUsername = document.querySelector('#checkbox-hide-username').checked;
	if (hideUsername) {
		document.querySelector('.hide-username').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-username').classList.remove('icon-user');
		document.querySelector('.hide-username').classList.add('icon-user-slash');
	} else {
		document.querySelector('.hide-username').style.backgroundColor = '';
		document.querySelector('.hide-username').classList.add('icon-user');
		document.querySelector('.hide-username').classList.remove('icon-user-slash');
	}
	BROWSER_API.storage.sync.set({ hideUsername: hideUsername });
	sendMessage({ hideUsername: hideUsername });
});

// Toggle - Hide Karma
document.querySelector('#checkbox-hide-karma').addEventListener('change', function () {
	const hideKarma = document.querySelector('#checkbox-hide-karma').checked;
	if (hideKarma) {
		document.querySelector('.icon-hide-karma').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-karma').classList.remove('icon-karma');
		document.querySelector('.icon-hide-karma').classList.add('icon-karma-slash');
	} else {
		document.querySelector('.icon-hide-karma').style.backgroundColor = '';
		document.querySelector('.icon-hide-karma').classList.add('icon-karma');
		document.querySelector('.icon-hide-karma').classList.remove('icon-karma-slash');
	}
	BROWSER_API.storage.sync.set({ hideKarma: hideKarma });
	sendMessage({ hideKarma: hideKarma });
});

// Toggle - Hide Get New Reddit
document.querySelector('#checkbox-hide-get-new-reddit').addEventListener('change', function () {
	const hideGetNewReddit = document.querySelector('#checkbox-hide-get-new-reddit').checked;
	if (hideGetNewReddit) {
		document.querySelector('.hide-get-new-reddit').style.backgroundColor = 'var(--accent)';
		document.querySelector('.hide-get-new-reddit').classList.remove('icon-show');
		document.querySelector('.hide-get-new-reddit').classList.add('icon-hide');
	} else {
		document.querySelector('.hide-get-new-reddit').style.backgroundColor = '';
		document.querySelector('.hide-get-new-reddit').classList.remove('icon-hide');
		document.querySelector('.hide-get-new-reddit').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideGetNewReddit: hideGetNewReddit });
	sendMessage({ hideGetNewReddit: hideGetNewReddit });
});

// Toggle - Hide Promoted Links
document.querySelector('#checkbox-hide-promoted').addEventListener('change', function () {
	const hidePromoted = document.querySelector('#checkbox-hide-promoted').checked;
	if (hidePromoted) {
		document.querySelector('.icon-hide-promoted').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-promoted').classList.remove('icon-ad');
		document.querySelector('.icon-hide-promoted').classList.add('icon-ad-slash');
	} else {
		document.querySelector('.icon-hide-promoted').style.backgroundColor = '';
		document.querySelector('.icon-hide-promoted').classList.add('icon-ad');
		document.querySelector('.icon-hide-promoted').classList.remove('icon-ad-slash');
	}
	BROWSER_API.storage.sync.set({ hidePromoted: hidePromoted });
	sendMessage({ hidePromoted: hidePromoted });
});

// Toggle - Hide Recommended Links
document.querySelector('#checkbox-hide-recommended').addEventListener('change', function () {
	const hideRecommended = document.querySelector('#checkbox-hide-recommended').checked;
	if (hideRecommended) {
		document.querySelector('.icon-hide-recommended').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-recommended').classList.remove('icon-hand');
		document.querySelector('.icon-hide-recommended').classList.add('icon-hand-slash');
	} else {
		document.querySelector('.icon-hide-recommended').style.backgroundColor = '';
		document.querySelector('.icon-hide-recommended').classList.add('icon-hand');
		document.querySelector('.icon-hide-recommended').classList.remove('icon-hand-slash');
	}
	BROWSER_API.storage.sync.set({ hideRecommended: hideRecommended });
	sendMessage({ hideRecommended: hideRecommended });
});

// Toggle - Hide See Full Image
document.querySelector('#checkbox-hide-see-full-image').addEventListener('change', function () {
	const hideSeeFullImage = document.querySelector('#checkbox-hide-see-full-image').checked;
	if (hideSeeFullImage) {
		document.querySelector('.icon-hide-see-full-image').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-see-full-image').classList.remove('icon-show');
		document.querySelector('.icon-hide-see-full-image').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-see-full-image').style.backgroundColor = '';
		document.querySelector('.icon-hide-see-full-image').classList.add('icon-show');
		document.querySelector('.icon-hide-see-full-image').classList.remove('icon-hide');
	}
	BROWSER_API.storage.sync.set({ hideSeeFullImage: hideSeeFullImage });
	sendMessage({ hideSeeFullImage: hideSeeFullImage });
});

// Toggle - Hide Header Sub Bar
document.querySelector('#checkbox-hide-header-sub-bar').addEventListener('change', function () {
	const hideHeaderSubBar = document.querySelector('#checkbox-hide-header-sub-bar').checked;
	if (hideHeaderSubBar) {
		document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-header-sub-bar').classList.remove('icon-show');
		document.querySelector('.icon-hide-header-sub-bar').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = '';
		document.querySelector('.icon-hide-header-sub-bar').classList.remove('icon-hide');
		document.querySelector('.icon-hide-header-sub-bar').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideHeaderSubBar: hideHeaderSubBar });
	sendMessage({ hideHeaderSubBar: hideHeaderSubBar });
});

// Toggle - Hide Side Menu Old
document.querySelector('#checkbox-hide-side-menu-old').addEventListener('change', function () {
	const hideSideMenuOld = document.querySelector('#checkbox-hide-side-menu-old').checked;
	if (hideSideMenuOld) {
		document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-old').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-old').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-old').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-old').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuOld: hideSideMenuOld });
	sendMessage({ hideSideMenuOld: hideSideMenuOld });
});

// Toggle - Hide NSFW Links
document.querySelector('#checkbox-hide-nsfw').addEventListener('change', function () {
	const hideNSFW = document.querySelector('#checkbox-hide-nsfw').checked;
	if (hideNSFW) {
		document.querySelector('.icon-hide-nsfw').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-nsfw').classList.remove('icon-nsfw');
		document.querySelector('.icon-hide-nsfw').classList.add('icon-nsfw-slash');
	} else {
		document.querySelector('.icon-hide-nsfw').style.backgroundColor = '';
		document.querySelector('.icon-hide-nsfw').classList.add('icon-nsfw');
		document.querySelector('.icon-hide-nsfw').classList.remove('icon-nsfw-slash');
	}
	BROWSER_API.storage.sync.set({ hideNSFW: hideNSFW });
	sendMessage({ hideNSFW: hideNSFW });
});

// Toggle - Hide "Turn On Notifications" Popup
document.querySelector('#checkbox-hide-turn-on-notifications').addEventListener('change', function () {
	const hideTurnOnNotificationsPopup = document.querySelector('#checkbox-hide-turn-on-notifications').checked;
	if (hideTurnOnNotificationsPopup) {
		document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-turn-on-notifications').classList.remove('icon-bell');
		document.querySelector('.icon-hide-turn-on-notifications').classList.add('icon-bell-slash');
	} else {
		document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = '';
		document.querySelector('.icon-hide-turn-on-notifications').classList.add('icon-bell');
		document.querySelector('.icon-hide-turn-on-notifications').classList.remove('icon-bell-slash');
	}
	BROWSER_API.storage.sync.set({ hideTurnOnNotificationsPopup: hideTurnOnNotificationsPopup });
	sendMessage({ hideTurnOnNotificationsPopup: hideTurnOnNotificationsPopup });
});

// Toggle - Hide Sub Sidebar Exceptions
document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').addEventListener('change', function () {
	const themeExceptionsEnable = document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').checked;
	if (themeExceptionsEnable === true) {
		BROWSER_API.storage.sync.set({ hideSubSidebarExceptionsEnable: true });
		document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = 'var(--accent)';
	} else if (themeExceptionsEnable === false) {
		BROWSER_API.storage.sync.set({ hideSubSidebarExceptionsEnable: false });
		document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = '';
	}
});

// Button - Hide Sub Sidebar Whitelist
document.querySelector('#btn-hide-sub-sidebar-whitelist').addEventListener('click', function (e) {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-hide-sub-sidebar-whitelist').nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionMode: 'whitelist' });
});

// Button - Hide Sub Sidebar Blacklist
document.querySelector('#btn-hide-sub-sidebar-blacklist').addEventListener('click', function (e) {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-hide-sub-sidebar-blacklist').previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="HideSubSidebarBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="HideSubSidebarWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionMode: 'blacklist' });
});

// Textarea - Hide Sub Sidebar Exceptions
document.querySelector('#input-hide-sub-sidebar-exceptions').addEventListener('keyup', function (e) {
	const value = e.target.value;
	BROWSER_API.storage.sync.set({ hideSubSidebarExceptionSubList: value });
});

// Toggle - Hide Header Bar
document.querySelector('#checkbox-hide-header-bar').addEventListener('change', function () {
	const hideHeaderBar = document.querySelector('#checkbox-hide-header-bar').checked;
	if (hideHeaderBar) {
		document.querySelector('.icon-hide-header-bar').classList.remove('icon-header');
		document.querySelector('.icon-hide-header-bar').classList.add('icon-header-slash');
		document.querySelector('.icon-hide-header-bar').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-header-bar').classList.remove('icon-header-slash');
		document.querySelector('.icon-hide-header-bar').classList.add('icon-header');
		document.querySelector('.icon-hide-header-bar').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideHeaderBar: hideHeaderBar });
	sendMessage({ hideHeaderBar: hideHeaderBar });
});

// Toggle - Hide Original Scroll To Top Button
document.querySelector('#checkbox-hide-original-scroll-to-top').addEventListener('change', function () {
	const hideOriginalScrollToTop = document.querySelector('#checkbox-hide-original-scroll-to-top').checked;
	if (hideOriginalScrollToTop) {
		document.querySelector('.icon-hide-original-scroll-to-top').classList.remove('icon-show');
		document.querySelector('.icon-hide-original-scroll-to-top').classList.add('icon-hide');
		document.querySelector('.icon-hide-original-scroll-to-top').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-original-scroll-to-top').classList.remove('icon-hide');
		document.querySelector('.icon-hide-original-scroll-to-top').classList.add('icon-show');
		document.querySelector('.icon-hide-original-scroll-to-top').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideOriginalScrollToTop: hideOriginalScrollToTop });
	sendMessage({ hideOriginalScrollToTop: hideOriginalScrollToTop });
});

// Toggle - Hide Side Menu
function disableHideSideMenu() {
	BROWSER_API.storage.sync.set({ hideSideMenu: false });
	document.querySelector('.icon-hide-side-menu').style.backgroundColor = '';
	document.querySelector('.icon-hide-side-menu').classList.remove('icon-hide');
	document.querySelector('.icon-hide-side-menu').classList.add('icon-show');
	sendMessage({ hideSideMenu: false });
}
document.querySelector('#checkbox-hide-side-menu').addEventListener('change', function () {
	const hideSideMenu = document.querySelector('#checkbox-hide-side-menu').checked;
	if (hideSideMenu === true) {
		// disable side menu toggle and side menu icons only
		disableSideMenuToggle();
		document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
		disableSideMenuIconsOnly();
		document.querySelector('#checkbox-side-menu-icons-only').checked = false;
		// enable hide side menu
		BROWSER_API.storage.sync.set({ hideSideMenu: true });
		document.querySelector('.icon-hide-side-menu').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu').classList.add('icon-hide');
		sendMessage({ hideSideMenu: true });
	} else if (hideSideMenu === false) {
		disableHideSideMenu();
	}
});

// Toggle - Side Menu Show/Hide Toggle Button
function disableSideMenuToggle() {
	BROWSER_API.storage.sync.set({ sideMenuToggleButton: false });
	document.querySelector('.icon-side-menu-toggle-button').style.backgroundColor = '';
	document.querySelector('.icon-side-menu-toggle-button').classList.remove('icon-show');
	document.querySelector('.icon-side-menu-toggle-button').classList.add('icon-hide');
	sendMessage({ sideMenuToggleButton: false });
}
document.querySelector('#checkbox-side-menu-toggle-button').addEventListener('change', function () {
	const sideMenuToggleButton = document.querySelector('#checkbox-side-menu-toggle-button').checked;
	if (sideMenuToggleButton === true) {
		// disable hide side menu and side menu icons only
		disableHideSideMenu();
		document.querySelector('#checkbox-hide-side-menu').checked = false;
		disableSideMenuIconsOnly();
		document.querySelector('#checkbox-side-menu-icons-only').checked = false;
		// enable side menu toggle
		BROWSER_API.storage.sync.set({ sideMenuToggleButton: true });
		document.querySelector('.icon-side-menu-toggle-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-side-menu-toggle-button').classList.remove('icon-hide');
		document.querySelector('.icon-side-menu-toggle-button').classList.add('icon-show');
		sendMessage({ sideMenuToggleButton: true });
	} else if (sideMenuToggleButton === false) {
		disableSideMenuToggle();
	}
});

// Toggle - Hide Side Menu Top Section
document.querySelector('#checkbox-hide-side-menu-top-section').addEventListener('change', function () {
	const hideSideMenuTopSection = document.querySelector('#checkbox-hide-side-menu-top-section').checked;
	if (hideSideMenuTopSection) {
		document.querySelector('.icon-hide-side-menu-top-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-top-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-top-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-top-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-top-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-top-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuTopSection: hideSideMenuTopSection });
	sendMessage({ hideSideMenuTopSection: hideSideMenuTopSection });
});

// Toggle - Hide Side Menu Moderation Section
document.querySelector('#checkbox-hide-side-menu-moderation-section').addEventListener('change', function () {
	const hideSideMenuModerationSection = document.querySelector('#checkbox-hide-side-menu-moderation-section').checked;
	if (hideSideMenuModerationSection) {
		document.querySelector('.icon-hide-side-menu-moderation-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-moderation-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-moderation-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-moderation-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-moderation-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-moderation-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuModerationSection: hideSideMenuModerationSection });
	sendMessage({ hideSideMenuModerationSection: hideSideMenuModerationSection });
});

// Toggle - Hide Side Menu Recent Section
document.querySelector('#checkbox-hide-side-menu-recent-section').addEventListener('change', function () {
	const hideSideMenuRecentSection = document.querySelector('#checkbox-hide-side-menu-recent-section').checked;
	if (hideSideMenuRecentSection) {
		document.querySelector('.icon-hide-side-menu-recent-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-recent-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-recent-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-recent-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-recent-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-recent-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuRecentSection: hideSideMenuRecentSection });
	sendMessage({ hideSideMenuRecentSection: hideSideMenuRecentSection });
});

// Toggle - Hide Side Menu Custom Feeds Section
document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').addEventListener('change', function () {
	const hideSideMenuCustomFeedsSection = document.querySelector('#checkbox-hide-side-menu-custom-feeds-section').checked;
	if (hideSideMenuCustomFeedsSection) {
		document.querySelector('.icon-hide-side-menu-custom-feeds-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-custom-feeds-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-custom-feeds-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-custom-feeds-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-custom-feeds-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-custom-feeds-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuCustomFeedsSection: hideSideMenuCustomFeedsSection });
	sendMessage({ hideSideMenuCustomFeedsSection: hideSideMenuCustomFeedsSection });
});

// Toggle - Hide Side Menu Communities Section
document.querySelector('#checkbox-hide-side-menu-communities-section').addEventListener('change', function () {
	const hideSideMenuCommunitiesSection = document.querySelector('#checkbox-hide-side-menu-communities-section').checked;
	if (hideSideMenuCommunitiesSection) {
		document.querySelector('.icon-hide-side-menu-communities-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-communities-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-communities-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-communities-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-communities-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-communities-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuCommunitiesSection: hideSideMenuCommunitiesSection });
	sendMessage({ hideSideMenuCommunitiesSection: hideSideMenuCommunitiesSection });
});

// Toggle - Hide Side Menu Resources Section
document.querySelector('#checkbox-hide-side-menu-resources-section').addEventListener('change', function () {
	const hideSideMenuResourcesSection = document.querySelector('#checkbox-hide-side-menu-resources-section').checked;
	if (hideSideMenuResourcesSection) {
		document.querySelector('.icon-hide-side-menu-resources-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-resources-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-resources-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-resources-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-resources-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-resources-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuResourcesSection: hideSideMenuResourcesSection });
	sendMessage({ hideSideMenuResourcesSection: hideSideMenuResourcesSection });
});

// Toggle - Hide Side Menu Topics Section
document.querySelector('#checkbox-hide-side-menu-topics-section').addEventListener('change', function () {
	const hideSideMenuTopicsSection = document.querySelector('#checkbox-hide-side-menu-topics-section').checked;
	if (hideSideMenuTopicsSection) {
		document.querySelector('.icon-hide-side-menu-topics-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-topics-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-side-menu-topics-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-side-menu-topics-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-topics-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-side-menu-topics-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuTopicsSection: hideSideMenuTopicsSection });
	sendMessage({ hideSideMenuTopicsSection: hideSideMenuTopicsSection });
});

// Toggle - Hide Related Posts Section in Sidebar
document.querySelector('#checkbox-hide-related-posts-section').addEventListener('change', function () {
	const hideRelatedPostsSection = document.querySelector('#checkbox-hide-related-posts-section').checked;
	if (hideRelatedPostsSection) {
		document.querySelector('.icon-hide-related-posts-section').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-related-posts-section').classList.remove('icon-show');
		document.querySelector('.icon-hide-related-posts-section').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-related-posts-section').style.backgroundColor = '';
		document.querySelector('.icon-hide-related-posts-section').classList.remove('icon-hide');
		document.querySelector('.icon-hide-related-posts-section').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideRelatedPostsSection: hideRelatedPostsSection });
	sendMessage({ hideRelatedPostsSection: hideRelatedPostsSection });
});

// Toggle - Hide User Profile Pics
document.querySelector('#checkbox-hide-user-profile-pics').addEventListener('change', function () {
	const hideUserProfilePics = document.querySelector('#checkbox-hide-user-profile-pics').checked;
	if (hideUserProfilePics) {
		document.querySelector('.icon-hide-user-profile-pics').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-user-profile-pics').classList.remove('icon-show');
		document.querySelector('.icon-hide-user-profile-pics').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-user-profile-pics').style.backgroundColor = '';
		document.querySelector('.icon-hide-user-profile-pics').classList.remove('icon-hide');
		document.querySelector('.icon-hide-user-profile-pics').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideUserProfilePics: hideUserProfilePics });
	sendMessage({ hideUserProfilePics: hideUserProfilePics });
});

// Toggle - Hide Post Hidden Message
document.querySelector('#checkbox-hide-post-hidden-message').addEventListener('change', function () {
	const hidePostHiddenMessage = document.querySelector('#checkbox-hide-post-hidden-message').checked;
	if (hidePostHiddenMessage) {
		document.querySelector('.icon-hide-post-hidden-message').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-post-hidden-message').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-hidden-message').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-post-hidden-message').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-hidden-message').classList.remove('icon-hide');
		document.querySelector('.icon-hide-post-hidden-message').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hidePostHiddenMessage: hidePostHiddenMessage });
	sendMessage({ hidePostHiddenMessage: hidePostHiddenMessage });
});

// Toggle - Hide Join Button On r/all Posts
document.querySelector('#checkbox-hide-join-button-on-posts').addEventListener('change', function () {
	const hideJoinButtonOnPosts = document.querySelector('#checkbox-hide-join-button-on-posts').checked;
	if (hideJoinButtonOnPosts) {
		document.querySelector('.icon-hide-join-button-on-posts').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-join-button-on-posts').classList.remove('icon-show');
		document.querySelector('.icon-hide-join-button-on-posts').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-join-button-on-posts').style.backgroundColor = '';
		document.querySelector('.icon-hide-join-button-on-posts').classList.remove('icon-hide');
		document.querySelector('.icon-hide-join-button-on-posts').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideJoinButtonOnPosts: hideJoinButtonOnPosts });
	sendMessage({ hideJoinButtonOnPosts: hideJoinButtonOnPosts });
});

// Toggle - Hide Search Sidebar
document.querySelector('#checkbox-hide-search-sidebar').addEventListener('change', function () {
	const hideSearchSidebar = document.querySelector('#checkbox-hide-search-sidebar').checked;
	if (hideSearchSidebar === true) {
		BROWSER_API.storage.sync.set({ hideSearchSidebar: true });
		document.querySelector('.icon-hide-search-sidebar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-search-sidebar').classList.remove('icon-show');
		document.querySelector('.icon-hide-search-sidebar').classList.add('icon-hide');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideSearchSidebar: true });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	} else if (hideSearchSidebar === false) {
		BROWSER_API.storage.sync.set({ hideSearchSidebar: false });
		document.querySelector('.icon-hide-search-sidebar').style.backgroundColor = '';
		document.querySelector('.icon-hide-search-sidebar').classList.remove('icon-hide');
		document.querySelector('.icon-hide-search-sidebar').classList.add('icon-show');
		BROWSER_API.tabs.query({}, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { hideSearchSidebar: false });
					// Reapply Layout Centre
					BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
						BROWSER_API.tabs.sendMessage(tab.id, { layoutCentre: result.layoutCentre });
					});
				}
			});
		});
	}
});

// Toggle - Hide Post Back Button
document.querySelector('#checkbox-hide-post-back-button').addEventListener('change', function () {
	const hidePostBackButton = document.querySelector('#checkbox-hide-post-back-button').checked;
	if (hidePostBackButton) {
		document.querySelector('.icon-hide-post-back-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-post-back-button').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-back-button').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-post-back-button').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-back-button').classList.remove('icon-hide');
		document.querySelector('.icon-hide-post-back-button').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hidePostBackButton: hidePostBackButton });
	sendMessage({ hidePostBackButton: hidePostBackButton });
});

// Toggle - Hide Post Karma
document.querySelector('#checkbox-hide-post-karma').addEventListener('change', function () {
	const hidePostKarma = document.querySelector('#checkbox-hide-post-karma').checked;
	if (hidePostKarma) {
		document.querySelector('.icon-hide-post-karma').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-post-karma').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-karma').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-post-karma').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-karma').classList.remove('icon-hide');
		document.querySelector('.icon-hide-post-karma').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hidePostKarma: hidePostKarma });
	sendMessage({ hidePostKarma: hidePostKarma });
});

// Toggle - Hide Comment Karma
document.querySelector('#checkbox-hide-comment-karma').addEventListener('change', function () {
	const hideCommentKarma = document.querySelector('#checkbox-hide-comment-karma').checked;
	if (hideCommentKarma) {
		document.querySelector('.icon-hide-comment-karma').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-comment-karma').classList.remove('icon-show');
		document.querySelector('.icon-hide-comment-karma').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-comment-karma').style.backgroundColor = '';
		document.querySelector('.icon-hide-comment-karma').classList.remove('icon-hide');
		document.querySelector('.icon-hide-comment-karma').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideCommentKarma: hideCommentKarma });
	sendMessage({ hideCommentKarma: hideCommentKarma });
});

// Toggle - Hide Recent Posts
document.querySelector('#checkbox-hide-recent-posts').addEventListener('change', function () {
	const hideRecentPosts = document.querySelector('#checkbox-hide-recent-posts').checked;
	if (hideRecentPosts) {
		document.querySelector('.icon-hide-recent-posts').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-recent-posts').classList.remove('icon-show');
		document.querySelector('.icon-hide-recent-posts').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-recent-posts').style.backgroundColor = '';
		document.querySelector('.icon-hide-recent-posts').classList.remove('icon-hide');
		document.querySelector('.icon-hide-recent-posts').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideRecentPosts: hideRecentPosts });
	sendMessage({ hideRecentPosts: hideRecentPosts });
});

// Toggle - Hide Side Menu Star
document.querySelector('#checkbox-hide-side-menu-star').addEventListener('change', function () {
	const hideSideMenuFavouriteButton = document.querySelector('#checkbox-hide-side-menu-star').checked;
	if (hideSideMenuFavouriteButton) {
		document.querySelector('.icon-hide-side-menu-star').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-star').classList.remove('icon-star');
		document.querySelector('.icon-hide-side-menu-star').classList.add('icon-star-slash');
	} else {
		document.querySelector('.icon-hide-side-menu-star').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-star').classList.remove('icon-star-slash');
		document.querySelector('.icon-hide-side-menu-star').classList.add('icon-star');
	}
	BROWSER_API.storage.sync.set({ hideSideMenuFavouriteButton: hideSideMenuFavouriteButton });
	sendMessage({ hideSideMenuFavouriteButton: hideSideMenuFavouriteButton });
});

// Toggle - Side Menu Icons Only
function disableSideMenuIconsOnly() {
	BROWSER_API.storage.sync.set({ sideMenuIconsOnly: false });
	document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = '';
	document.querySelector('.icon-side-menu-icons-only').classList.remove('icon-side-menu-icons');
	document.querySelector('.icon-side-menu-icons-only').classList.add('icon-side-menu-list');
	sendMessage({ sideMenuIconsOnly: false });
}
document.querySelector('#checkbox-side-menu-icons-only').addEventListener('change', function () {
	const sideMenuIconsOnly = document.querySelector('#checkbox-side-menu-icons-only').checked;
	if (sideMenuIconsOnly === true) {
		// disable hide side menu and side menu toggle
		disableHideSideMenu();
		document.querySelector('#checkbox-hide-side-menu').checked = false;
		disableSideMenuToggle();
		document.querySelector('#checkbox-side-menu-toggle-button').checked = false;
		BROWSER_API.storage.sync.set({ sideMenuIconsOnly: true });
		document.querySelector('.icon-side-menu-icons-only').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-side-menu-icons-only').classList.remove('icon-side-menu-list');
		document.querySelector('.icon-side-menu-icons-only').classList.add('icon-side-menu-icons');
		sendMessage({ sideMenuIconsOnly: true });
	} else if (sideMenuIconsOnly === false) {
		disableSideMenuIconsOnly();
	}
});

// Toggle - Hide Blank Thumbnails In Compact View
document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').addEventListener('change', function () {
	const hideCompactViewBlankThumbnails = document.querySelector('#checkbox-hide-compact-view-blank-thumbnails').checked;
	if (hideCompactViewBlankThumbnails) {
		document.querySelector('.icon-hide-compact-view-blank-thumbnails').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-compact-view-blank-thumbnails').classList.remove('icon-show');
		document.querySelector('.icon-hide-compact-view-blank-thumbnails').classList.add('icon-hide');
	} else {
		document.querySelector('.icon-hide-compact-view-blank-thumbnails').style.backgroundColor = '';
		document.querySelector('.icon-hide-compact-view-blank-thumbnails').classList.remove('icon-hide');
		document.querySelector('.icon-hide-compact-view-blank-thumbnails').classList.add('icon-show');
	}
	BROWSER_API.storage.sync.set({ hideCompactViewBlankThumbnails: hideCompactViewBlankThumbnails });
	sendMessage({ hideCompactViewBlankThumbnails: hideCompactViewBlankThumbnails });
});

// Toggle - Hide "NSFW" In The Search Results
document.querySelector('#checkbox-hide-nsfw-search-results').addEventListener('change', function () {
	const hideNsfwInSearchResults = document.querySelector('#checkbox-hide-nsfw-search-results').checked;
	if (hideNsfwInSearchResults) {
		document.querySelector('.icon-hide-nsfw-search-results').classList.remove('icon-show');
		document.querySelector('.icon-hide-nsfw-search-results').classList.add('icon-hide');
		document.querySelector('.icon-hide-nsfw-search-results').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-nsfw-search-results').classList.remove('icon-hide');
		document.querySelector('.icon-hide-nsfw-search-results').classList.add('icon-show');
		document.querySelector('.icon-hide-nsfw-search-results').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideNsfwInSearchResults: hideNsfwInSearchResults });
	sendMessage({ hideNsfwInSearchResults: hideNsfwInSearchResults });
});

// Toggle - Hide "Trending Today" In The Search Results
document.querySelector('#checkbox-hide-trending-today-in-search-results').addEventListener('change', function () {
	const hideTrendingTodayInSearchResults = document.querySelector('#checkbox-hide-trending-today-in-search-results').checked;
	if (hideTrendingTodayInSearchResults) {
		document.querySelector('.icon-hide-trending-today-in-search-results').classList.remove('icon-show');
		document.querySelector('.icon-hide-trending-today-in-search-results').classList.add('icon-hide');
		document.querySelector('.icon-hide-trending-today-in-search-results').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-trending-today-in-search-results').classList.remove('icon-hide');
		document.querySelector('.icon-hide-trending-today-in-search-results').classList.add('icon-show');
		document.querySelector('.icon-hide-trending-today-in-search-results').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideTrendingTodayInSearchResults: hideTrendingTodayInSearchResults });
	sendMessage({ hideTrendingTodayInSearchResults: hideTrendingTodayInSearchResults });
});

// Toggle - Hide Community Highlights
document.querySelector('#checkbox-hide-community-highlights').addEventListener('change', function () {
	const hideCommunityHighlights = document.querySelector('#checkbox-hide-community-highlights').checked;
	if (hideCommunityHighlights) {
		document.querySelector('.icon-hide-community-highlights').classList.remove('icon-thumbtack');
		document.querySelector('.icon-hide-community-highlights').classList.add('icon-thumbtack-slash');
		document.querySelector('.icon-hide-community-highlights').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-community-highlights').classList.remove('icon-thumbtack-slash');
		document.querySelector('.icon-hide-community-highlights').classList.add('icon-thumbtack');
		document.querySelector('.icon-hide-community-highlights').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideCommunityHighlights: hideCommunityHighlights });
	sendMessage({ hideCommunityHighlights: hideCommunityHighlights });
});

// Toggle - Hide NSFW Users In The Search Page Sidebar
document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').addEventListener('change', function () {
	const hideSearchSidebarNsfwUsers = document.querySelector('#checkbox-hide-search-sidebar-nsfw-users').checked;
	if (hideSearchSidebarNsfwUsers) {
		document.querySelector('.icon-hide-search-sidebar-nsfw-users').classList.remove('icon-show');
		document.querySelector('.icon-hide-search-sidebar-nsfw-users').classList.add('icon-hide');
		document.querySelector('.icon-hide-search-sidebar-nsfw-users').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-search-sidebar-nsfw-users').classList.remove('icon-hide');
		document.querySelector('.icon-hide-search-sidebar-nsfw-users').classList.add('icon-show');
		document.querySelector('.icon-hide-search-sidebar-nsfw-users').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideSearchSidebarNsfwUsers: hideSearchSidebarNsfwUsers });
	sendMessage({ hideSearchSidebarNsfwUsers: hideSearchSidebarNsfwUsers });
});

// Toggle - Hide Home Feed
document.querySelector('#checkbox-hide-home-feed').addEventListener('change', function () {
	const hideHomeFeed = document.querySelector('#checkbox-hide-home-feed').checked;
	if (hideHomeFeed) {
		document.querySelector('.icon-hide-home-feed').classList.remove('icon-show');
		document.querySelector('.icon-hide-home-feed').classList.add('icon-hide');
		document.querySelector('.icon-hide-home-feed').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-home-feed').classList.remove('icon-hide');
		document.querySelector('.icon-hide-home-feed').classList.add('icon-show');
		document.querySelector('.icon-hide-home-feed').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideHomeFeed: hideHomeFeed });
	sendMessage({ hideHomeFeed: hideHomeFeed });
});

// Toggle - Hide Post Divider
document.querySelector('#checkbox-hide-post-divider').addEventListener('change', function () {
	const hidePostDivider = document.querySelector('#checkbox-hide-post-divider').checked;
	if (hidePostDivider) {
		document.querySelector('.icon-hide-post-divider').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-divider').classList.add('icon-hide');
		document.querySelector('.icon-hide-post-divider').style.backgroundColor = 'var(--accent)';
		if (document.querySelector('#input-post-separator-height').value != -1) {
			document.querySelector('.icon-post-separator-height').style.backgroundColor = 'var(--accent)';
		}
	} else {
		document.querySelector('.icon-hide-post-divider').classList.remove('icon-hide');
		document.querySelector('.icon-hide-post-divider').classList.add('icon-show');
		document.querySelector('.icon-hide-post-divider').style.backgroundColor = '';
		document.querySelector('.icon-post-separator-height').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hidePostDivider: hidePostDivider });
	sendMessage({ hidePostDivider: hidePostDivider });
});

// Slider - Post Separator Height
document.querySelector('#input-post-separator-height').addEventListener('input', function (e) {
	const hidePostDivider = document.querySelector('#checkbox-hide-post-divider').checked;
	if (hidePostDivider === true) {
		document.querySelector('.icon-post-separator-height').style.backgroundColor = e.target.value != -1 ? 'var(--accent)' : '';
	}
	document.querySelector('#post-separator-height-value').textContent = e.target.value != -1 ? e.target.value + 'px' : '';
	sendMessage({ postSeparatorHeight: e.target.value });
});
document.querySelector('#input-post-separator-height').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ postSeparatorHeight: e.target.value });
});

// Toggle - Hide Blurred Media Background
document.querySelector('#checkbox-hide-blurred-media-background').addEventListener('change', function () {
	const hideBlurredMediaBackground = document.querySelector('#checkbox-hide-blurred-media-background').checked;
	if (hideBlurredMediaBackground) {
		document.querySelector('.icon-hide-blurred-media-background').classList.remove('icon-show');
		document.querySelector('.icon-hide-blurred-media-background').classList.add('icon-hide');
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-blurred-media-background').classList.remove('icon-hide');
		document.querySelector('.icon-hide-blurred-media-background').classList.add('icon-show');
		document.querySelector('.icon-hide-blurred-media-background').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideBlurredMediaBackground: hideBlurredMediaBackground });
	sendMessage({ hideBlurredMediaBackground: hideBlurredMediaBackground });
});

// Toggle - Hide Vote Buttons
document.querySelector('#checkbox-hide-vote-buttons').addEventListener('change', function () {
	const hideVoteButtons = document.querySelector('#checkbox-hide-vote-buttons').checked;
	if (hideVoteButtons) {
		document.querySelector('.icon-hide-vote-buttons').classList.remove('icon-show');
		document.querySelector('.icon-hide-vote-buttons').classList.add('icon-hide');
		document.querySelector('.icon-hide-vote-buttons').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-hide-vote-buttons').classList.remove('icon-hide');
		document.querySelector('.icon-hide-vote-buttons').classList.add('icon-show');
		document.querySelector('.icon-hide-vote-buttons').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ hideVoteButtons: hideVoteButtons });
	sendMessage({ hideVoteButtons: hideVoteButtons });
});
