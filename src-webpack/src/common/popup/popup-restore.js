/* ===== Popup / Restore ===== */

import i18n from 'i18next';
import { addBackgroundListeners } from './popup-functions';
import { filterShowOldVersion } from './inputs/filter_version_select';
import { filterShowNewVersion } from './inputs/filter_version_select';
import { filterShowNewNewVersion } from './inputs/filter_version_select';
import { tabDmSystem } from './inputs/inputs_dark_mode';
import { tabDmTime } from './inputs/inputs_dark_mode';

/* = Restore Save On Popup Load = */
window.onload = function () {
	restoreOptions();
};

/* = Restore Settings Function = */
function restoreOptions() {
	// Set Reddit Version Filter
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		if (typeof result.redditVersion != 'undefined') {
			if (result.redditVersion === 'old') {
				filterShowOldVersion();
				var value = 'old';
			} else if (result.redditVersion === 'new') {
				filterShowNewVersion();
				var value = 'new';
			} else if (result.redditVersion === 'newnew') {
				filterShowNewNewVersion();
				var value = 'newnew';
			}
		} else if (typeof result.redditVersion == 'undefined') {
			var value = 'choose';
			document.querySelector('.menu-list').classList.add('hide');
			document.querySelector('#start-page').classList.remove('hide');
			document.querySelector('#chosen-version').textContent = 'Select';
			document.querySelector('#old-reddit').addEventListener('click', done);
			document.querySelector('#new-reddit').addEventListener('click', done);
			document.querySelector('#newnew-reddit').addEventListener('click', done);
			function done() {
				document.querySelector('.menu-list').classList.remove('hide');
				document.querySelector('#start-page').classList.add('hide');
			}
			document.querySelector('#search').blur();
		}
		console.log('Selected Reddit Version: ' + value);
	});

	// Backgrounds
	BROWSER_API.storage.sync.get(['customBackgrounds'], function (result) {
		if (!(typeof result.customBackgrounds == 'undefined') || result.customBackgrounds == '') {
			const backgrounds = result.customBackgrounds;
			backgrounds.forEach(function (value) {
				console.log('Custom Background URL: ' + value);
				// create background element container
				var node = document.createElement('div');
				node.setAttribute('class', 'background');
				// add image node
				var background_img = document.createElement('div');
				background_img.classList.add('background-img');
				background_img.setAttribute('style', 'background-image: url(' + value + ');');
				node.appendChild(background_img);
				// append element to grid
				const grid = document.querySelector('.p-grid-bg');
				grid.insertBefore(node, grid.firstChild);
			});
		}
		addBackgroundListeners();
	});

	// Dark Mode
	BROWSER_API.storage.sync.get(['darkMode'], function (result) {
		if (typeof result.darkMode == 'undefined') {
			BROWSER_API.storage.sync.set({ darkMode: true });
		}
		if (typeof result.darkMode == 'undefined' || result.darkMode == true) {
			document.querySelector('#checkbox-dark-mode').checked = true;
			var icons = document.querySelectorAll('.icon-dark-mode');
			icons.forEach(function (icon) {
				icon.style.backgroundColor = 'var(--accent)';
			});
			var value = true;
		} else if (result.darkMode == false) {
			document.querySelector('body').classList.add('light-mode');
			document.querySelector('#checkbox-dark-mode').checked = false;
			var value = false;
		}
		console.log('Dark Mode: ' + value);
	});

	// Dark Mode Auto
	BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
		if (typeof result.darkModeAuto == 'undefined') {
			BROWSER_API.storage.sync.set({ darkModeAuto: 'false' });
			var value = 'false';
		} else if (result.darkModeAuto == 'system') {
			tabDmSystem();
			var value = 'system';
		} else if (result.darkModeAuto == 'time') {
			tabDmTime();
			var value = 'time';
		} else {
			var value = 'false';
		}
		console.log('Dark Mode Auto: ' + value);
	});

	// Dark Mode Time Values
	BROWSER_API.storage.sync.get(['darkModeTimeStart', 'darkModeTimeEnd'], function (result) {
		if (result.darkModeTimeStart == undefined) {
			document.querySelector('#dm-time-start').value = '19:00';
			console.log('Dark Mode Auto Time Start: 19:00');
		} else {
			document.querySelector('#dm-time-start').value = result.darkModeTimeStart;
			console.log('Dark Mode Auto Time Start: ' + result.darkModeTimeStart);
		}
		if (result.darkModeTimeEnd == undefined) {
			document.querySelector('#dm-time-end').value = '07:00';
			console.log('Dark Mode Auto Time End: 07:00');
		} else {
			document.querySelector('#dm-time-end').value = result.darkModeTimeEnd;
			console.log('Dark Mode Auto Time End: ' + result.darkModeTimeEnd);
		}
	});

	// Expand Layout Width
	BROWSER_API.storage.sync.get(['expandLayoutWidth'], function (result) {
		if (typeof result.expandLayoutWidth != 'undefined') {
			document.querySelector('#input-expand-view-width').value = result.expandLayoutWidth;
			document.querySelector('#expand-view-width').innerText = result.expandLayoutWidth + '%';
			var value = result.expandLayoutWidth;
		}
		if (typeof result.expandLayoutWidth == 'undefined') {
			document.querySelector('#input-expand-view-width').value = 80;
			document.querySelector('#expand-view-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Layout Width: ' + value + '%');
	});

	// Expand Post Overlay Width
	BROWSER_API.storage.sync.get(['expandPostOverlayWidth'], function (result) {
		if (typeof result.expandPostOverlayWidth != 'undefined') {
			document.querySelector('#input-expand-post-overlay-width').value = result.expandPostOverlayWidth;
			document.querySelector('#expand-post-overlay-width').innerText = result.expandPostOverlayWidth + '%';
			var value = result.expandPostOverlayWidth;
		}
		if (typeof result.expandPostOverlayWidth == 'undefined') {
			document.querySelector('#input-expand-post-overlay-width').value = 80;
			document.querySelector('#expand-post-overlay-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Post Overlay Width: ' + value + '%');
	});

	// Expand Post Width
	BROWSER_API.storage.sync.get(['expandPostWidth'], function (result) {
		if (typeof result.expandPostWidth != 'undefined') {
			document.querySelector('#input-expand-post-width').value = result.expandPostWidth;
			document.querySelector('#expand-post-width').innerText = result.expandPostWidth + '%';
			var value = result.expandPostWidth;
		}
		if (typeof result.expandPostWidth == 'undefined') {
			document.querySelector('#input-expand-post-width').value = 80;
			document.querySelector('#expand-post-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Post Width: ' + value + '%');
	});

	// Expand Sub Reddit Width
	BROWSER_API.storage.sync.get(['expandSubWidth'], function (result) {
		if (typeof result.expandSubWidth != 'undefined') {
			document.querySelector('#input-expand-sub-width').value = result.expandSubWidth;
			document.querySelector('#expand-sub-width').innerText = result.expandSubWidth + '%';
			var value = result.expandSubWidth;
		}
		if (typeof result.expandSubWidth == 'undefined') {
			document.querySelector('#input-expand-sub-width').value = 80;
			document.querySelector('#expand-sub-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand Sub Width: ' + value + '%');
	});

	// Expand User Profile Width
	BROWSER_API.storage.sync.get(['expandUserProfileWidth'], function (result) {
		if (typeof result.expandUserProfileWidth != 'undefined') {
			document.querySelector('#input-expand-user-profile-width').value = result.expandUserProfileWidth;
			document.querySelector('#expand-user-profile-width').innerText = result.expandUserProfileWidth + '%';
			var value = result.expandUserProfileWidth;
		}
		if (typeof result.expandUserProfileWidth == 'undefined') {
			document.querySelector('#input-expand-user-profile-width').value = 80;
			document.querySelector('#expand-user-profile-width').innerText = '80%';
			var value = '80';
		}
		console.log('Expand User Profile Width: ' + value + '%');
	});

	// Expand Layout
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		if (typeof result.expandLayout == 'undefined' || result.expandLayout == false) {
			document.querySelector('#checkbox-expand-layout').checked = false;
			var value = false;
		} else if (result.expandLayout == true) {
			document.querySelector('#checkbox-expand-layout').checked = true;
			var icons = document.querySelectorAll('.icon-expand-layout');
			icons.forEach(function (icon) {
				icon.style.backgroundColor = 'var(--accent)';
			});
			var value = true;
		}
		console.log('Expand Layout: ' + value);
	});

	// Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		if (result.layoutCentre == true) {
			document.querySelector('#checkbox-layout-centre').checked = true;
			document.querySelector('.icon-centre').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-expand-layout').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.layoutCentre == 'undefined' || result.layoutCentre == false) {
			document.querySelector('#checkbox-layout-centre').checked = false;
			var value = false;
		}
		console.log('Layout Centre: ' + value);
	});

	// Scale Tall Images To Fit Post
	BROWSER_API.storage.sync.get(['fitImage'], function (result) {
		if (result.fitImage == true) {
			document.querySelector('#checkbox-fit-image').checked = true;
			document.querySelector('.icon-scale').style.backgroundColorr = 'var(--accent)';
			var value = true;
		} else if (typeof result.fitImage == 'undefined' || result.fitImage == false) {
			document.querySelector('#checkbox-fit-image').checked = false;
			var value = false;
		}
		console.log('Scale Tall Images: ' + value);
	});

	// Add Scrollbar To Tall Images
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		if (result.imageScroll == true) {
			document.querySelector('#checkbox-image-scroll').checked = true;
			document.querySelector('.icon-scroll').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.imageScroll == 'undefined' || result.imageScroll == false) {
			document.querySelector('#checkbox-image-scroll').checked = false;
			var value = false;
		}
		console.log('Scroll Tall Images: ' + value);
	});

	// Dropshadows
	BROWSER_API.storage.sync.get(['shadows'], function (result) {
		if (result.shadows == true) {
			document.querySelector('#checkbox-shadow').checked = true;
			document.querySelector('.icon-shadow').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-shadow').classList.add('icon-light-on');
			document.querySelector('.icon-shadow').classList.remove('icon-light-off');
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.shadows == 'undefined' || result.shadows == false) {
			document.querySelector('#checkbox-shadow').checked = false;
			var value = false;
		}
		console.log('Use Drop Shadows: ' + value);
	});

	// Custom Background
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		if (result.useCustomBackground == true) {
			document.querySelector('#checkbox-background').checked = true;
			var icons = document.querySelectorAll('.icon-background');
			icons.forEach(function (icon) {
				icon.style.backgroundColor = 'var(--accent)';
			});
			var value = true;
		} else if (typeof result.useCustomBackground == 'undefined' || result.useCustomBackground == false) {
			document.querySelector('#checkbox-background').checked = false;
			var value = false;
		}
		console.log('Use Custom Background: ' + value);
	});

	// Set Selected Background
	BROWSER_API.storage.sync.get(['customBackground'], function (result) {
		// highlight chosen background
		if (typeof result.customBackground != 'undefined') {
			var url = 'url("' + result.customBackground + '")';
			var elms = document.querySelectorAll('*[style]');
			Array.prototype.forEach.call(elms, function (elm) {
				var bg = elm.style.backgroundImage || '';
				if (url == bg) {
					elm.parentNode.style.borderColor = 'var(--accent)';
				}
			});
			var value = result.customBackground;
		} else if (typeof result.customBackground == 'undefined') {
			var value = 'none';
		}
		console.log('Selected Custom Background: ' + value);
	});

	// Background Blur
	BROWSER_API.storage.sync.get(['bgBlur'], function (result) {
		if (typeof result.bgBlur != 'undefined') {
			document.querySelector('#input-bg-blur').value = result.bgBlur;
			document.querySelector('#bg-blur-value').innerText = result.bgBlur + 'px';
			if (result.bgBlur != 0) {
				document.querySelector('.icon-bg-blur').style.backgroundColor = 'var(--accent)';
			}
			var value = result.bgBlur;
		} else if (typeof result.bgBlur == 'undefined') {
			document.querySelector('#input-bg-blur').value = 0;
			document.querySelector('#bg-blur-value').innerText = '0px';
			var value = 0;
		}
		console.log('Background Blur: ' + value + 'px');
	});

	// Hide Reddit Premium
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		if (result.hideRedditPremium == true) {
			document.querySelector('#checkbox-hide-reddit-premium').checked = true;
			document.querySelector('.hide-reddit-premium').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-reddit-premium').classList.remove('icon-show');
			document.querySelector('.hide-reddit-premium').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideUserSidebar == 'undefined' || result.hideUserSidebar == false) {
			document.querySelector('#checkbox-hide-user-sidebar').checked = false;
			var value = false;
		}
		console.log('Hide User Sidebar: ' + value);
	});

	// Hide Sidebar Policy
	BROWSER_API.storage.sync.get(['hideSidebarPolicy'], function (result) {
		if (result.hideSidebarPolicy == true) {
			document.querySelector('#checkbox-hide-sidebar-policy').checked = true;
			document.querySelector('.hide-sidebar-policy').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-sidebar-policy').classList.remove('icon-show');
			document.querySelector('.hide-sidebar-policy').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSidebarPolicy == 'undefined' || result.hideSidebarPolicy == false) {
			document.querySelector('#checkbox-hide-sidebar-policy').checked = false;
			var value = false;
		}
		console.log('Hide Sidebar Policy: ' + value);
	});

	// Hide Advertise Button
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		if (result.hideAdvertiseButton == true) {
			document.querySelector('#checkbox-hide-advertise-button').checked = true;
			document.querySelector('.hide-advertise-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-advertise-button').classList.remove('icon-advertise');
			document.querySelector('.hide-advertise-button').classList.add('icon-advertise-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideCreatePostButton == 'undefined' || result.hideCreatePostButton == false) {
			document.querySelector('#checkbox-hide-create-post-button').checked = false;
			var value = false;
		}
		console.log('Hide Create Post Button: ' + value);
	});

	// Hide Gap
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		if (result.hideGap == true) {
			document.querySelector('#checkbox-hide-gap').checked = true;
			document.querySelector('.hide-gap').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideGap == 'undefined' || result.hideGap == false) {
			document.querySelector('#checkbox-hide-gap').checked = false;
			var value = false;
		}
		console.log('Hide Gap: ' + value);
	});

	// Sticky Sort
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		if (result.stickySort == true) {
			document.querySelector('#checkbox-sticky-sort').checked = true;
			document.querySelector('.sticky-sort').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.stickySort == 'undefined' || result.stickySort == false) {
			document.querySelector('#checkbox-sticky-sort').checked = false;
			var value = false;
		}
		console.log('Sticky Sort: ' + value);
	});

	// Hide Username
	BROWSER_API.storage.sync.get(['hideUsername'], function (result) {
		if (result.hideUsername == true) {
			document.querySelector('#checkbox-hide-username').checked = true;
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideKarma == 'undefined' || result.hideKarma == false) {
			document.querySelector('#checkbox-hide-karma').checked = false;
			var value = false;
		}
		console.log('Hide Karma: ' + value);
	});

	// New Player
	BROWSER_API.storage.sync.get(['newPlayer'], function (result) {
		if (result.newPlayer == true) {
			document.querySelector('#checkbox-new-player').checked = true;
			document.querySelector('.icon-new-player').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.newPlayer == 'undefined' || result.newPlayer == false) {
			document.querySelector('#checkbox-new-player').checked = false;
			var value = false;
		}
		console.log('Use New Video Player: ' + value);
	});

	// Scroll To Top
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		if (result.showToTopButton == true) {
			document.querySelector('#checkbox-show-to-top-button').checked = true;
			document.querySelector('.icon-scroll-to-top').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.showToTopButton == 'undefined' || result.showToTopButton == false) {
			document.querySelector('#checkbox-show-to-top-button').checked = false;
			var value = false;
		}
		console.log('Show Scroll To Top Button: ' + value);
	});

	// Always Show Rising Sort Button
	BROWSER_API.storage.sync.get(['alwaysShowRisingButton'], function (result) {
		if (result.alwaysShowRisingButton == true) {
			document.querySelector('#checkbox-always-show-rising-button').checked = true;
			document.querySelector('.always-show-rising-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.always-show-rising-button').classList.remove('icon-rising');
			document.querySelector('.always-show-rising-button').classList.add('icon-rising-fill');
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.alwaysShowRisingButton == 'undefined' || result.alwaysShowRisingButton == false) {
			document.querySelector('#checkbox-always-show-rising-button').checked = false;
			var value = false;
		}
		console.log('Always Show Rising Sort Button: ' + value);
	});

	// Show Controversial Sort Button
	BROWSER_API.storage.sync.get(['showControversialSortButton'], function (result) {
		if (result.showControversialSortButton == true) {
			document.querySelector('#checkbox-controversial-sort-button').checked = true;
			document.querySelector('.icon-controversial-sort-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-controversial-sort-button').classList.remove('icon-sword');
			document.querySelector('.icon-controversial-sort-button').classList.add('icon-sword-fill');
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.showControversialSortButton == 'undefined' || result.showControversialSortButton == false) {
			document.querySelector('#checkbox-controversial-sort-button').checked = false;
			var value = false;
		}
		console.log('Show Controversial Sort Button: ' + value);
	});

	// Hide Get New Reddit
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		if (result.hideGetNewReddit == true) {
			document.querySelector('#checkbox-hide-get-new-reddit').checked = true;
			document.querySelector('.hide-get-new-reddit').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-get-new-reddit').classList.remove('icon-show');
			document.querySelector('.hide-get-new-reddit').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideGetNewReddit == 'undefined' || result.hideGetNewReddit == false) {
			document.querySelector('#checkbox-hide-get-new-reddit').checked = false;
			var value = false;
		}
		console.log('Hide Get New Reddit Button: ' + value);
	});

	// Open Sub Links In New Tab
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		if (result.openSubInNewTab == true) {
			document.querySelector('#checkbox-open-sub-new-tab').checked = true;
			document.querySelector('.open-sub-new-tab').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.openSubInNewTab == 'undefined' || result.openSubInNewTab == false) {
			document.querySelector('#checkbox-open-sub-new-tab').checked = false;
			var value = false;
		}
		console.log('Open Sub Links In New Tab: ' + value);
	});

	// Open Post Links In New Tab
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		if (result.openPostInNewTab == true) {
			document.querySelector('#checkbox-open-post-new-tab').checked = true;
			document.querySelector('.open-post-new-tab').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.openPostInNewTab == 'undefined' || result.openPostInNewTab == false) {
			document.querySelector('#checkbox-open-post-new-tab').checked = false;
			var value = false;
		}
		console.log('Open Post Links In New Tab: ' + value);
	});

	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		if (result.hidePromoted == true) {
			document.querySelector('#checkbox-hide-promoted').checked = true;
			document.querySelector('.icon-hide-promoted').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-promoted').classList.remove('icon-ad');
			document.querySelector('.icon-hide-promoted').classList.add('icon-ad-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hidePromoted == 'undefined' || result.hidePromoted == false) {
			document.querySelector('#checkbox-hide-promoted').checked = false;
			var value = false;
		}
		console.log('Hide Promoted Links: ' + value);
	});

	// Hide NSFW Links
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		if (result.hideNSFW == true) {
			document.querySelector('#checkbox-hide-nsfw').checked = true;
			document.querySelector('.icon-hide-nsfw').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-nsfw').classList.remove('icon-nsfw');
			document.querySelector('.icon-hide-nsfw').classList.add('icon-nsfw-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideNSFW == 'undefined' || result.hideNSFW == false) {
			document.querySelector('#checkbox-hide-nsfw').checked = false;
			var value = false;
		}
		console.log('Hide NSFW Links: ' + value);
	});

	/*
	// Add Emoji Picker
	BROWSER_API.storage.sync.get(['addEmojiPicker'], function(result) {
		if (result.addEmojiPicker == true) {
			document.querySelector("#checkbox-add-emoji-picker").checked = true
			document.querySelector(".icon-emoji-picker").style.backgroundColor = "var(--accent)"
			document.querySelector(".icon-productivity-tweaks").style.backgroundColor = "var(--accent)"
			var value = true
		} else if ((typeof result.addEmojiPicker == 'undefined')||(result.addEmojiPicker == false)) {
			document.querySelector("#checkbox-add-emoji-picker").checked = false
			var value = false
		}
		console.log("Add Emoji Picker: "+value)
	})*/

	// Show r/All Button
	BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
		if (result.showAllButton == true) {
			document.querySelector('#checkbox-show-r-all-button').checked = true;
			document.querySelector('.icon-show-r-all').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.showAllButton == 'undefined' || result.showAllButton == false) {
			document.querySelector('#checkbox-show-r-all-button').checked = false;
			var value = false;
		}
		console.log('Show r/All Button: ' + value);
	});

	// Move Feed Section In Side Menu To The Top
	BROWSER_API.storage.sync.get(['sidemenuFeedTop'], function (result) {
		if (result.sidemenuFeedTop == true) {
			document.querySelector('#checkbox-sidemenu-feed-top').checked = true;
			document.querySelector('.icon-sidemenu-feed-top').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.sidemenuFeedTop == 'undefined' || result.sidemenuFeedTop == false) {
			document.querySelector('#checkbox-sidemenu-feed-top').checked = false;
			var value = false;
		}
		console.log('Move Feed Section In Side Menu To The Top: ' + value);
	});

	// Expand Post Options
	/*BROWSER_API.storage.sync.get(['expandPostOptions'], function (result) {
		if (result.expandPostOptions == true) {
			document.querySelector('#checkbox-expand-post-options').checked = true;
			document.querySelector('.icon-expand-post-options').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.expandPostOptions == 'undefined' || result.expandPostOptions == false) {
			document.querySelector('#checkbox-expand-post-options').checked = false;
			var value = false;
		}
		console.log('Expand Post Options: ' + value);
	})*/

	// Add Scroll To Text Post
	BROWSER_API.storage.sync.get(['textPostScroll'], function (result) {
		if (result.textPostScroll == true) {
			document.querySelector('#checkbox-text-scroll-post').checked = true;
			document.querySelector('.icon-text-scroll-post').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.textPostScroll == 'undefined' || result.textPostScroll == false) {
			document.querySelector('#checkbox-text-scroll-post').checked = false;
			var value = false;
		}
		console.log('Add Scroll To Long Text Posts: ' + value);
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

	// Modern Old Reddit
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		if (result.moderniseOldReddit == true) {
			document.querySelector('#checkbox-modern-old-reddit').checked = true;
			document.querySelector('.icon-modern-old-reddit').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.moderniseOldReddit == 'undefined' || result.moderniseOldReddit == false) {
			document.querySelector('#checkbox-modern-old-reddit').checked = false;
			var value = false;
		}
		console.log('Modernise Old Reddit: ' + value);
	});

	// Hide Header Sub Bar
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		if (result.hideHeaderSubBar == true) {
			document.querySelector('#checkbox-hide-header-sub-bar').checked = true;
			document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-header-sub-bar').classList.remove('icon-show');
			document.querySelector('.icon-hide-header-sub-bar').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenu == 'undefined' || result.hideSideMenu == false) {
			document.querySelector('#checkbox-hide-side-menu').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu: ' + value);
	});

	// Comments Limit
	BROWSER_API.storage.sync.get(['commentsLimit'], function (result) {
		if (typeof result.commentsLimit != 'undefined') {
			document.querySelector('#input-post-comments-limit').value = result.commentsLimit;
			if (result.commentsLimit == 0) {
				document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
				document.querySelector('#post-comments-limit-value').innerText = '1';
				var value = '1';
			} else if (result.commentsLimit != -10) {
				document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
				document.querySelector('#post-comments-limit-value').innerText = result.commentsLimit;
				var value = result.commentsLimit;
			} else {
				document.querySelector('#post-comments-limit-value').innerText = '∞';
				var value = '∞';
			}
		} else if (typeof result.commentsLimit == 'undefined') {
			document.querySelector('#input-post-comments-limit').value = -10;
			document.querySelector('#post-comments-limit-value').innerText = '∞';
			var value = '∞';
		}
		console.log('Post Comments Limit: ' + value);
	});

	// Auto Expand Feed/Post To 100% At Value
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		if (typeof result.autoExpandValue != 'undefined') {
			document.querySelector('#auto-expand-value').value = result.autoExpandValue;
			var value = result.autoExpandValue;
		} else {
			document.querySelector('#auto-expand-value').value = 1000;
			var value = 1000;
		}
		console.log('Expand Post/Feed To 100% At Width: ' + value + 'px');
	});

	// Limit Infinity Scroll
	BROWSER_API.storage.sync.get(['limitInfinityScroll'], function (result) {
		if (result.limitInfinityScroll == true) {
			document.querySelector('#checkbox-limit-infinity-scroll').checked = true;
			document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity');
			document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity-slash');
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.limitInfinityScroll == 'undefined' || result.limitInfinityScroll == false) {
			document.querySelector('#checkbox-limit-infinity-scroll').checked = false;
			var value = false;
		}
		console.log('Limit Infinity Scroll: ' + value);
	});

	// Enable Default Feed Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption'], function (result) {
		if (result.enableDefaultFeedSortOption == true) {
			document.querySelector('#checkbox-default-feed-sort-option').checked = true;
			document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.enableDefaultFeedSortOption == 'undefined' || result.enableDefaultFeedSortOption == false) {
			document.querySelector('#checkbox-default-feed-sort-option').checked = false;
			var value = false;
		}
		console.log('Enable Default Feed Sort Option: ' + value);
	});

	// Default Feed Sort Option
	BROWSER_API.storage.sync.get(['defaultFeedSortOption'], function (result) {
		setTimeout(() => {
			// delay for translation
			if (typeof result.defaultFeedSortOption != 'undefined') {
				const text = document.querySelector('#feed-sort-' + result.defaultFeedSortOption).textContent;
				document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = text;
				var value = result.defaultFeedSortOption;
			} else if (typeof result.defaultFeedSortOption == 'undefined') {
				const text = document.querySelector('#feed-sort-best').textContent;
				document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = text;
				var value = 'best';
			}
			console.log('Default Feed Sort Option: ' + value);
		}, 500);
	});

	// Enable Default Comments Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption'], function (result) {
		if (result.enableDefaultCommentsSortOption == true) {
			document.querySelector('#checkbox-default-comments-sort-option').checked = true;
			document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.enableDefaultCommentsSortOption == 'undefined' || result.enableDefaultCommentsSortOption == false) {
			document.querySelector('#checkbox-default-comments-sort-option').checked = false;
			var value = false;
		}
		console.log('Enable Default Comments Sort Option: ' + value);
	});

	// Default Comments Sort Option
	BROWSER_API.storage.sync.get(['defaultCommentsSortOption'], function (result) {
		setTimeout(() => {
			// delay for translation
			if (typeof result.defaultCommentsSortOption != 'undefined') {
				const text = document.querySelector('#comments-sort-' + result.defaultCommentsSortOption).textContent;
				document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = text;
				var value = result.defaultCommentsSortOption;
			} else if (typeof result.defaultCommentsSortOption == 'undefined') {
				const text = document.querySelector('#comments-sort-confidence').textContent;
				document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = text;
				var value = 'best';
			}
			console.log('Default Comments Sort Option: ' + value);
		}, 500);
	});

	// Hide "Turn On Notifications" Popup
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		if (result.hideTurnOnNotificationsPopup == true) {
			document.querySelector('#checkbox-hide-turn-on-notifications').checked = true;
			document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-turn-on-notifications').classList.remove('icon-bell');
			document.querySelector('.icon-hide-turn-on-notifications').classList.add('icon-bell-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideTurnOnNotificationsPopup == 'undefined' || result.hideTurnOnNotificationsPopup == false) {
			document.querySelector('#checkbox-hide-turn-on-notifications').checked = false;
			var value = false;
		}
		console.log('Hide "Turn On Notifications" Popup: ' + value);
	});

	// Scroll To Next Root Comment
	BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
		if (result.scrollToNextRootComment == true) {
			document.querySelector('#checkbox-scroll-to-next-root-comment').checked = true;
			document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.scrollToNextRootComment == 'undefined' || result.scrollToNextRootComment == false) {
			document.querySelector('#checkbox-scroll-to-next-root-comment').checked = false;
			var value = false;
		}
		console.log('Scroll To Next Root Comment Button: ' + value);
	});

	// Show Post Numbers
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers == true) {
			document.querySelector('#checkbox-show-post-numbers').checked = true;
			document.querySelector('.icon-show-post-numbers').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.showPostNumbers == 'undefined' || result.showPostNumbers == false) {
			document.querySelector('#checkbox-show-post-numbers').checked = false;
			var value = false;
		}
		console.log('Show Post Numbers: ' + value);
	});

	// Override Drop Shadow
	BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
		if (result.overrideDropShadow == true) {
			document.querySelector('.icon-drop-shadow-override').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-shadow-override').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.overrideDropShadow == 'undefined' || result.overrideDropShadow == false) {
			document.querySelector('#checkbox-shadow-override').checked = false;
			var value = false;
		}
		console.log('Override Drop Shadow: ' + value);
	});

	// Override Drop Shadow CSS
	BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
		if (typeof result.overrideDropShadowCSS != 'undefined') {
			document.querySelector('#input-shadow-override-css').value = result.overrideDropShadowCSS;
			var value = result.overrideDropShadowCSS;
		} else {
			document.querySelector('#input-shadow-override-css').value = '';
			var value = '';
		}
		console.log('Override Drop Shadow CSS: ' + value);
	});

	// Post Max Height
	BROWSER_API.storage.sync.get(['postMaxHeight'], function (result) {
		if (typeof result.postMaxHeight != 'undefined') {
			if (result.postMaxHeight > 304 && result.postMaxHeight <= 1000) {
				document.querySelector('.icon-feed-post-max-height').style.backgroundColor = 'var(--accent)';
				document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
				document.querySelector('#input-feed-post-max-height').value = result.postMaxHeight;
				document.querySelector('#feed-post-max-height-value').innerText = result.postMaxHeight + 'px';
				var value = result.postMaxHeight + 'px';
			} else {
				document.querySelector('#input-feed-post-max-height').value = 296;
				document.querySelector('#feed-post-max-height-value').innerText = '512px';
				var value = 'default (512px)';
			}
		} else if (typeof result.postMaxHeight == 'undefined') {
			document.querySelector('#input-feed-post-max-height').value = 296;
			document.querySelector('#feed-post-max-height-value').innerText = '512px';
			var value = 'default (512px)';
		}
		console.log('Max Post Height: ' + value);
	});

	// Bionic Reader - Comments
	BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
		if (result.bionicReaderComments == true) {
			document.querySelector('.icon-bionic-reader-comments').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-bionic-reader-comments').classList.remove('icon-book');
			document.querySelector('.icon-bionic-reader-comments').classList.add('icon-book-open');
			document.querySelector('#checkbox-bionic-reader-comments').checked = true;
			document.querySelector('.icon-accessibility').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.bionicReaderComments == 'undefined' || result.bionicReaderComments == false) {
			document.querySelector('#checkbox-bionic-reader-comments').checked = false;
			var value = false;
		}
		console.log('Bionic Reader Comments: ' + value);
	});

	// Bionic Reader - Posts
	BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
		if (result.bionicReaderPosts == true) {
			document.querySelector('.icon-bionic-reader-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-bionic-reader-posts').classList.remove('icon-book');
			document.querySelector('.icon-bionic-reader-posts').classList.add('icon-book-open');
			document.querySelector('#checkbox-bionic-reader-posts').checked = true;
			document.querySelector('.icon-accessibility').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.bionicReaderPosts == 'undefined' || result.bionicReaderPosts == false) {
			document.querySelector('#checkbox-bionic-reader-posts').checked = false;
			var value = false;
		}
		console.log('Bionic Reader Posts: ' + value);
	});

	// Theme Header Background Colour
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
		if (result.themeHeaderBackgroundColour == true) {
			document.querySelector('.icon-header-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-header-bg-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeHeaderBackgroundColour == 'undefined' || result.themeHeaderBackgroundColour == false) {
			document.querySelector('#checkbox-header-bg-colour').checked = false;
			var value = false;
		}
		console.log('Header Background Colour: ' + value);
	});

	// Theme Header Background Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
		if (typeof result.themeHeaderBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-header-bg-colour-css').value = result.themeHeaderBackgroundColourCSS;
			var value = result.themeHeaderBackgroundColourCSS;
		} else {
			document.querySelector('#input-header-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Header Background Colour CSS: ' + value);
	});

	// Theme Header Text Colour
	BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
		if (result.themeHeaderTextColour == true) {
			document.querySelector('.icon-header-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-header-text-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeHeaderTextColour == 'undefined' || result.themeHeaderTextColour == false) {
			document.querySelector('#checkbox-header-text-colour').checked = false;
			var value = false;
		}
		console.log('Header Text Colour: ' + value);
	});

	// Theme Header Text Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
		if (typeof result.themeHeaderTextColourCSS != 'undefined') {
			document.querySelector('#input-header-text-colour-css').value = result.themeHeaderTextColourCSS;
			var value = result.themeHeaderTextColourCSS;
		} else {
			document.querySelector('#input-header-text-colour-css').value = '';
			var value = '';
		}
		console.log('Header Text Colour CSS: ' + value);
	});

	// Theme Sort Background Colour
	BROWSER_API.storage.sync.get(['themeSortBackgroundColour'], function (result) {
		if (result.themeSortBackgroundColour == true) {
			document.querySelector('.icon-sort-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-bg-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeSortBackgroundColour == 'undefined' || result.themeSortBackgroundColour == false) {
			document.querySelector('#checkbox-sort-bg-colour').checked = false;
			var value = false;
		}
		console.log('Sort Background Colour: ' + value);
	});

	// Theme Sort Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSortBackgroundColourCSS'], function (result) {
		if (typeof result.themeSortBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-sort-bg-colour-css').value = result.themeSortBackgroundColourCSS;
			var value = result.themeSortBackgroundColourCSS;
		} else {
			document.querySelector('#input-sort-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Background Colour CSS: ' + value);
	});

	// Theme Sort Text Colour
	BROWSER_API.storage.sync.get(['themeSortTextColour'], function (result) {
		if (result.themeSortTextColour == true) {
			document.querySelector('.icon-sort-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-text-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeSortTextColour == 'undefined' || result.themeSortTextColour == false) {
			document.querySelector('#checkbox-sort-text-colour').checked = false;
			var value = false;
		}
		console.log('Sort Text Colour: ' + value);
	});

	// Theme Sort Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSortTextColourCSS'], function (result) {
		if (typeof result.themeSortTextColourCSS != 'undefined') {
			document.querySelector('#input-sort-text-colour-css').value = result.themeSortTextColourCSS;
			var value = result.themeSortTextColourCSS;
		} else {
			document.querySelector('#input-sort-text-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Text Colour CSS: ' + value);
	});

	// Theme Sort Text Colour 2
	BROWSER_API.storage.sync.get(['themeSortTextColour2'], function (result) {
		if (result.themeSortTextColour2 == true) {
			document.querySelector('.icon-sort-text-colour-2').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-text-colour-2').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeSortTextColour2 == 'undefined' || result.themeSortTextColour2 == false) {
			document.querySelector('#checkbox-sort-text-colour-2').checked = false;
			var value = false;
		}
		console.log('Sort Text Colour 2: ' + value);
	});

	// Theme Sort Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themeSortTextColour2CSS'], function (result) {
		if (typeof result.themeSortTextColour2CSS != 'undefined') {
			document.querySelector('#input-sort-text-colour-2-css').value = result.themeSortTextColour2CSS;
			var value = result.themeSortTextColour2CSS;
		} else {
			document.querySelector('#input-sort-text-colour-2-css').value = '';
			var value = '';
		}
		console.log('Sort Text Colour 2 CSS: ' + value);
	});

	// Theme Sort Border Colour
	BROWSER_API.storage.sync.get(['themeSortBorderColour'], function (result) {
		if (result.themeSortBorderColour == true) {
			document.querySelector('.icon-sort-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-border-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeSortBorderColour == 'undefined' || result.themeSortBorderColour == false) {
			document.querySelector('#checkbox-sort-border-colour').checked = false;
			var value = false;
		}
		console.log('Sort Border Colour: ' + value);
	});

	// Theme Sort Border Colour CSS
	BROWSER_API.storage.sync.get(['themeSortBorderColourCSS'], function (result) {
		if (typeof result.themeSortBorderColourCSS != 'undefined') {
			document.querySelector('#input-sort-border-colour-css').value = result.themeSortBorderColourCSS;
			var value = result.themeSortBorderColourCSS;
		} else {
			document.querySelector('#input-sort-border-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Border Colour CSS: ' + value);
	});

	// Theme Post Background Colour
	BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
		if (result.themePostBackgroundColour == true) {
			document.querySelector('.icon-post-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-bg-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themePostBackgroundColour == 'undefined' || result.themePostBackgroundColour == false) {
			document.querySelector('#checkbox-post-bg-colour').checked = false;
			var value = false;
		}
		console.log('Post Background Colour: ' + value);
	});

	// Theme Post Background Colour CSS
	BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
		if (typeof result.themePostBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-post-bg-colour-css').value = result.themePostBackgroundColourCSS;
			var value = result.themePostBackgroundColourCSS;
		} else {
			document.querySelector('#input-post-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Post Background Colour CSS: ' + value);
	});

	// Theme Post Text Colour
	BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
		if (result.themePostTextColour1 == true) {
			document.querySelector('.icon-post-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-text-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themePostTextColour1 == 'undefined' || result.themePostTextColour1 == false) {
			document.querySelector('#checkbox-post-text-colour').checked = false;
			var value = false;
		}
		console.log('Post Text Colour: ' + value);
	});

	// Theme Post Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
		if (typeof result.themePostTextColour1CSS != 'undefined') {
			document.querySelector('#input-post-text-colour-css').value = result.themePostTextColour1CSS;
			var value = result.themePostTextColour1CSS;
		} else {
			document.querySelector('#input-post-text-colour-css').value = '';
			var value = '';
		}
		console.log('Post Text Colour CSS: ' + value);
	});

	// Theme Post Visited Title Colour
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColour'], function (result) {
		if (result.themePostVisitedTitleColour == true) {
			document.querySelector('.icon-post-visited-title-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-visited-title-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themePostVisitedTitleColour == 'undefined' || result.themePostVisitedTitleColour == false) {
			document.querySelector('#checkbox-post-visited-title-colour').checked = false;
			var value = false;
		}
		console.log('Post Visited Title Colour: ' + value);
	});

	// Theme Post Visited Title Colour CSS
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColourCSS'], function (result) {
		if (typeof result.themePostVisitedTitleColourCSS != 'undefined') {
			document.querySelector('#input-post-visited-title-colour-css').value = result.themePostVisitedTitleColourCSS;
			var value = result.themePostVisitedTitleColourCSS;
		} else {
			document.querySelector('#input-post-visited-title-colour-css').value = '';
			var value = '';
		}
		console.log('Post Visited Title Colour CSS: ' + value);
	});

	// Theme Post Text Colour 2
	BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
		if (result.themePostTextColour2 == true) {
			document.querySelector('.icon-post-text-colour-2').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-text-colour-2').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themePostTextColour2 == 'undefined' || result.themePostTextColour2 == false) {
			document.querySelector('#checkbox-post-text-colour-2').checked = false;
			var value = false;
		}
		console.log('Post Text Colour 2: ' + value);
	});

	// Theme Post Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
		if (typeof result.themePostTextColour2CSS != 'undefined') {
			document.querySelector('#input-post-text-colour-2-css').value = result.themePostTextColour2CSS;
			var value = result.themePostTextColour2CSS;
		} else {
			document.querySelector('#input-post-text-colour-2-css').value = '';
			var value = '';
		}
		console.log('Post Text Colour 2 CSS: ' + value);
	});

	// Theme Post Border Colour
	BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
		if (result.themePostBorderColour == true) {
			document.querySelector('.icon-post-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-border-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themePostBorderColour == 'undefined' || result.themePostBorderColour == false) {
			document.querySelector('#checkbox-post-border-colour').checked = false;
			var value = false;
		}
		console.log('Post Border Colour: ' + value);
	});

	// Theme Post Border Colour CSS
	BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
		if (typeof result.themePostBorderColourCSS != 'undefined') {
			document.querySelector('#input-post-border-colour-css').value = result.themePostBorderColourCSS;
			var value = result.themePostBorderColourCSS;
		} else {
			document.querySelector('#input-post-border-colour-css').value = '';
			var value = '';
		}
		console.log('Post Border Colour CSS: ' + value);
	});

	// Theme Blur
	BROWSER_API.storage.sync.get(['themeBlur'], function (result) {
		if (typeof result.themeBlur != 'undefined') {
			document.querySelector('#input-theme-blur').value = result.themeBlur;
			document.querySelector('#theme-blur-value').innerText = result.themeBlur + 'px';
			if (result.bgBlur != 0) {
				document.querySelector('.icon-theme-blur').style.backgroundColor = 'var(--accent)';
			}
			var value = result.themeBlur;
		} else if (typeof result.themeBlur == 'undefined') {
			document.querySelector('.icon-theme-blur').style.backgroundColor = 'var(--accent)';
			document.querySelector('#input-theme-blur').value = 5;
			document.querySelector('#theme-blur-value').innerText = '5px';
			var value = 0;
		}
		console.log('Theme Blur: ' + value + 'px');
	});

	// Theme Exceptions Enable
	BROWSER_API.storage.sync.get(['themeExceptionsEnable'], function (result) {
		if (result.themeExceptionsEnable == true) {
			document.querySelector('.icon-theme-exceptions').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-theme-exceptions-enable').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeExceptionsEnable == 'undefined' || result.themeExceptionsEnable == false) {
			document.querySelector('#checkbox-theme-exceptions-enable').checked = false;
			var value = false;
		}
		console.log('Theme Exceptions Enable: ' + value);
	});

	// Theme Exception Mode
	BROWSER_API.storage.sync.get(['themeExceptionMode'], function (result) {
		if (typeof result.themeExceptionMode == 'undefined' || result.themeExceptionMode === 'blacklist') {
			var value = 'blacklist';
		} else if (result.themeExceptionMode === 'whitelist') {
			document.querySelector('#btn-theme-blacklist').classList.remove('tab-active');
			document.querySelector('#btn-theme-whitelist').classList.add('tab-active');
			document.querySelector('[data-lang=ThemeWhitelistInfo]').classList.remove('hidden');
			document.querySelector('[data-lang=ThemeBlacklistInfo]').classList.add('hidden');
			var value = 'whitelist';
		}
		console.log('Theme Exception Mode: ' + value);
	});

	// Theme Exceptions List
	BROWSER_API.storage.sync.get(['themeExceptionSubList'], function (result) {
		if (typeof result.themeExceptionSubList != 'undefined') {
			var value = result.themeExceptionSubList;
			document.querySelector('#input-theme-exceptions').value = value;
		} else {
			var value = '';
		}
		console.log('Theme Exceptions Sub List: ' + value);
	});

	// Hide Sub Sidebar Exceptions Enable
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionsEnable'], function (result) {
		if (result.hideSubSidebarExceptionsEnable == true) {
			document.querySelector('.icon-hide-sub-sidebar-exceptions').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-sub-sidebar-exceptions-enable').checked = true;
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
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
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideHeaderBar == 'undefined' || result.hideHeaderBar == false) {
			document.querySelector('#checkbox-hide-header-bar').checked = false;
			var value = false;
		}
		console.log('Hide Header Bar: ' + value);
	});

	// Non Sticky Header Bar
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		if (result.nonStickyHeaderBar == true) {
			document.querySelector('#checkbox-non-sticky-header-bar').checked = true;
			document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.nonStickyHeaderBar == 'undefined' || result.nonStickyHeaderBar == false) {
			document.querySelector('#checkbox-non-sticky-header-bar').checked = false;
			var value = false;
		}
		console.log('Non Sticky Header Bar: ' + value);
	});

	// Larger Classic Post
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		if (result.largerClassicPost == true) {
			document.querySelector('#checkbox-larger-classic-post').checked = true;
			document.querySelector('.icon-larger-classic-post').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.largerClassicPost == 'undefined' || result.largerClassicPost == false) {
			document.querySelector('#checkbox-larger-classic-post').checked = false;
			var value = false;
		}
		console.log('Larger Classic Post: ' + value);
	});

	// Hide Original Scroll To Top Button
	BROWSER_API.storage.sync.get(['hideOriginalScrollToTop'], function (result) {
		if (result.hideOriginalScrollToTop == true) {
			document.querySelector('#checkbox-hide-original-scroll-to-top').checked = true;
			document.querySelector('.icon-hide-original-scroll-to-top').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-original-scroll-to-top').classList.remove('icon-show');
			document.querySelector('.icon-hide-original-scroll-to-top').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideOriginalScrollToTop == 'undefined' || result.hideOriginalScrollToTop == false) {
			document.querySelector('#checkbox-hide-original-scroll-to-top').checked = false;
			var value = false;
		}
		console.log('Hide Original Scroll To Top Button: ' + value);
	});

	// Theme CreatePost Background Colour
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColour'], function (result) {
		if (result.themeCreatePostBackgroundColour == true) {
			document.querySelector('.icon-create-post-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-create-post-bg-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeCreatePostBackgroundColour == 'undefined' || result.themeCreatePostBackgroundColour == false) {
			document.querySelector('#checkbox-create-post-bg-colour').checked = false;
			var value = false;
		}
		console.log('Create Post Background Colour: ' + value);
	});

	// Theme CreatePost Background Colour CSS
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColourCSS'], function (result) {
		if (typeof result.themeCreatePostBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-create-post-bg-colour-css').value = result.themeCreatePostBackgroundColourCSS;
			var value = result.themeCreatePostBackgroundColourCSS;
		} else {
			document.querySelector('#input-create-post-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Create Post Background Colour CSS: ' + value);
	});

	// Theme CreatePost Border Colour
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColour'], function (result) {
		if (result.themeCreatePostBorderColour == true) {
			document.querySelector('.icon-create-post-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-create-post-border-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.themeCreatePostBorderColour == 'undefined' || result.themeCreatePostBorderColour == false) {
			document.querySelector('#checkbox-create-post-border-colour').checked = false;
			var value = false;
		}
		console.log('Create Post Border Colour: ' + value);
	});

	// Theme CreatePost Border Colour CSS
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColourCSS'], function (result) {
		if (typeof result.themeCreatePostBorderColourCSS != 'undefined') {
			document.querySelector('#input-create-post-border-colour-css').value = result.themeCreatePostBorderColourCSS;
			var value = result.themeCreatePostBorderColourCSS;
		} else {
			document.querySelector('#input-create-post-border-colour-css').value = '';
			var value = '';
		}
		console.log('Create Post Border Colour CSS: ' + value);
	});

	// Scroll To Next Root Comment Position Horizontal
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPosition'], function (result) {
		if (typeof result.scrollToNextRootCommentPosition == 'undefined' || result.scrollToNextRootCommentPosition === '-1') {
			document.querySelector('#input-scroll-to-root-comment-position').value = -1;
			document.querySelector('#scroll-to-root-comment-position-value').innerText = '48px';
			console.log('Scroll To Next Root Comment Position: 48px');
		} else if (typeof result.scrollToNextRootCommentPosition != 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position').value = result.scrollToNextRootCommentPosition;
			document.querySelector('#scroll-to-root-comment-position-value').innerText = result.scrollToNextRootCommentPosition + '%';
			document.querySelector('.icon-scroll-to-root-comment-position').style.backgroundColor = 'var(--accent)';
			var value = result.scrollToNextRootCommentPosition;
			console.log('Scroll To Next Root Comment Position: ' + value + '%');
		}
	});

	// Scroll To Next Root Comment Position Vertical
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPositionV'], function (result) {
		if (typeof result.scrollToNextRootCommentPositionV == 'undefined' || result.scrollToNextRootCommentPositionV === '-1') {
			document.querySelector('#input-scroll-to-root-comment-position-v').value = -1;
			document.querySelector('#scroll-to-root-comment-position-v-value').innerText = '50%';
			console.log('Scroll To Next Root Comment Position Vertically: 50%');
		} else if (typeof result.scrollToNextRootCommentPositionV != 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position-v').value = result.scrollToNextRootCommentPositionV;
			document.querySelector('#scroll-to-root-comment-position-v-value').innerText = result.scrollToNextRootCommentPositionV + '%';
			document.querySelector('.icon-scroll-to-root-comment-position-v').style.backgroundColor = 'var(--accent)';
			var value = result.scrollToNextRootCommentPositionV;
			console.log('Scroll To Next Root Comment Position Vertically: ' + value + '%');
		}
	});

	// Break Reminder
	BROWSER_API.storage.sync.get(['breakReminder'], function (result) {
		if (result.breakReminder == true) {
			document.querySelector('.icon-break-reminder').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.breakReminder == 'undefined' || result.breakReminder == false) {
			var value = false;
		}
		document.querySelector('#checkbox-break-reminder').checked = value;
		console.log('Break Reminder: ' + value);
	});

	// Break Reminder Frequency
	BROWSER_API.storage.sync.get(['breakReminderFrequency'], function (result) {
		if (typeof result.breakReminderFrequency == 'undefined') {
			var value = 50;
		} else if (typeof result.breakReminderFrequency != 'undefined') {
			var value = result.breakReminderFrequency;
		}
		document.querySelector('#input-break-reminder-frequency').value = value;
		document.querySelector('#break-reminder-frequency-value').innerText = value;
		console.log('Break Reminder Frequency: ' + value);
	});

	// Auto Redirect To Version
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		if (result.autoRedirectVersion === 'off' || typeof result.redditVersion == 'undefined') {
			document.querySelector('#chosen-reddit-version').textContent = i18n.t('Off.message');
		} else if (result.autoRedirectVersion === 'old') {
			document.querySelector('#chosen-reddit-version').textContent = i18n.t('OldReddit.message');
		} else if (result.autoRedirectVersion === 'new') {
			document.querySelector('#chosen-reddit-version').textContent = i18n.t('NewReddit.message');
		} else if (result.autoRedirectVersion === 'newnew') {
			document.querySelector('#chosen-reddit-version').textContent = i18n.t('LatestReddit.message');
		}
	});

	// Show Post Author
	BROWSER_API.storage.sync.get(['showPostAuthor'], function (result) {
		if (result.showPostAuthor == true) {
			document.querySelector('#checkbox-show-post-author').checked = true;
			document.querySelector('.icon-show-post-author').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.showPostAuthor == 'undefined' || result.showPostAuthor == false) {
			document.querySelector('#checkbox-show-post-author').checked = false;
			var value = false;
		}
		console.log('Show Post Author: ' + value);
	});

	// Remove Page Side Margin
	BROWSER_API.storage.sync.get(['removePageSideMargin'], function (result) {
		if (result.removePageSideMargin == true) {
			document.querySelector('#checkbox-remove-page-side-margin').checked = true;
			document.querySelector('.icon-remove-page-side-margin').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-remove-page-side-margin').classList.remove('icon-show');
			document.querySelector('.icon-remove-page-side-margin').classList.add('icon-hide');
			document.querySelector('.icon-expand-layout').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.removePageSideMargin == 'undefined' || result.removePageSideMargin == false) {
			document.querySelector('#checkbox-remove-page-side-margin').checked = false;
			var value = false;
		}
		console.log('Remove Page Side Margin: ' + value);
	});

	// Remove Side Menu Top Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection'], function (result) {
		if (result.hideSideMenuTopSection == true) {
			document.querySelector('#checkbox-hide-side-menu-top-section').checked = true;
			document.querySelector('.icon-hide-side-menu-top-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-top-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-top-section').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenuTopSection == 'undefined' || result.hideSideMenuTopSection == false) {
			document.querySelector('#checkbox-hide-side-menu-top-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Top Section: ' + value);
	});

	// Remove Side Menu Moderation Section
	BROWSER_API.storage.sync.get(['hideSideMenuModerationSection'], function (result) {
		if (result.hideSideMenuModerationSection == true) {
			document.querySelector('#checkbox-hide-side-menu-moderation-section').checked = true;
			document.querySelector('.icon-hide-side-menu-moderation-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-moderation-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-moderation-section').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenuModerationSection == 'undefined' || result.hideSideMenuModerationSection == false) {
			document.querySelector('#checkbox-hide-side-menu-moderation-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Moderation Section: ' + value);
	});

	// Remove Side Menu Recent Section
	BROWSER_API.storage.sync.get(['hideSideMenuRecentSection'], function (result) {
		if (result.hideSideMenuRecentSection == true) {
			document.querySelector('#checkbox-hide-side-menu-recent-section').checked = true;
			document.querySelector('.icon-hide-side-menu-recent-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-recent-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-recent-section').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenuRecentSection == 'undefined' || result.hideSideMenuRecentSection == false) {
			document.querySelector('#checkbox-hide-side-menu-recent-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Recent Section: ' + value);
	});

	// Remove Side Menu Communities Section
	BROWSER_API.storage.sync.get(['hideSideMenuCommunitiesSection'], function (result) {
		if (result.hideSideMenuCommunitiesSection == true) {
			document.querySelector('#checkbox-hide-side-menu-communities-section').checked = true;
			document.querySelector('.icon-hide-side-menu-communities-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-communities-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-communities-section').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenuCommunitiesSection == 'undefined' || result.hideSideMenuCommunitiesSection == false) {
			document.querySelector('#checkbox-hide-side-menu-communities-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Communities Section: ' + value);
	});

	// Remove Side Menu Resources Section
	BROWSER_API.storage.sync.get(['hideSideMenuResourcesSection'], function (result) {
		if (result.hideSideMenuResourcesSection == true) {
			document.querySelector('#checkbox-hide-side-menu-resources-section').checked = true;
			document.querySelector('.icon-hide-side-menu-resources-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-side-menu-resources-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-side-menu-resources-section').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenuResourcesSection == 'undefined' || result.hideSideMenuResourcesSection == false) {
			document.querySelector('#checkbox-hide-side-menu-resources-section').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Resources Section: ' + value);
	});

	// Layout Offset
	BROWSER_API.storage.sync.get(['layoutOffset'], function (result) {
		if (typeof result.layoutOffset != 'undefined') {
			var value = result.layoutOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-offset').value = value;
		document.querySelector('#layout-offset-value').innerText = value + '%';
		console.log('Layout Home Offset: ' + value + '%');
	});

	// Layout Sub Offset
	BROWSER_API.storage.sync.get(['layoutSubOffset'], function (result) {
		if (typeof result.layoutSubOffset != 'undefined') {
			var value = result.layoutSubOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-sub-offset').value = value;
		document.querySelector('#layout-sub-offset-value').innerText = value + '%';
		console.log('Layout Sub Offset: ' + value + '%');
	});

	// Layout Post Offset
	BROWSER_API.storage.sync.get(['layoutPostOffset'], function (result) {
		if (typeof result.layoutPostOffset != 'undefined') {
			var value = result.layoutPostOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-post-offset').value = value;
		document.querySelector('#layout-post-offset-value').innerText = value + '%';
		console.log('Layout Post Offset: ' + value + '%');
	});

	// Layout User Profile Offset
	BROWSER_API.storage.sync.get(['layoutUserProfileOffset'], function (result) {
		if (typeof result.layoutUserProfileOffset != 'undefined') {
			var value = result.layoutUserProfileOffset;
		} else {
			var value = 0;
		}
		document.querySelector('#input-layout-user-profile-offset').value = value;
		document.querySelector('#layout-user-profile-offset-value').innerText = value + '%';
		console.log('Layout User Profile Offset: ' + value + '%');
	});

	// Hide Related Posts Section in Sidebar
	BROWSER_API.storage.sync.get(['hideRelatedPostsSection'], function (result) {
		if (result.hideRelatedPostsSection == true) {
			document.querySelector('#checkbox-hide-related-posts-section').checked = true;
			document.querySelector('.icon-hide-related-posts-section').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-related-posts-section').classList.remove('icon-show');
			document.querySelector('.icon-hide-related-posts-section').classList.add('icon-hide');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideRelatedPostsSection == 'undefined' || result.hideRelatedPostsSection == false) {
			document.querySelector('#checkbox-hide-related-posts-section').checked = false;
			var value = false;
		}
		console.log('Hide Related Posts Section: ' + value);
	});

	// Post Content Font Size
	BROWSER_API.storage.sync.get(['postContentFontSize'], function (result) {
		if (typeof result.postContentFontSize == 'undefined' || result.postContentFontSize == false) {
			document.querySelector('#input-post-content-font-size').value = 9;
			document.querySelector('#post-content-font-size-value').innerText = '';
			var value = 'false';
		} else {
			document.querySelector('#input-post-content-font-size').value = result.postContentFontSize;
			document.querySelector('#post-content-font-size-value').innerText = result.postContentFontSize + 'px';
			document.querySelector('.icon-post-content-font-size').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-accessibility').style.backgroundColor = 'var(--accent)';
			var value = result.postContentFontSize + 'px';
		}
		console.log('Post Content Font Size: ' + value);
	});

	// Post Comments Font Size
	BROWSER_API.storage.sync.get(['postCommentsFontSize'], function (result) {
		if (typeof result.postCommentsFontSize == 'undefined' || result.postCommentsFontSize == false) {
			document.querySelector('#input-post-comments-font-size').value = 9;
			document.querySelector('#post-comments-font-size-value').innerText = '';
			var value = 'false';
		} else {
			document.querySelector('#input-post-comments-font-size').value = result.postCommentsFontSize;
			document.querySelector('#post-comments-font-size-value').innerText = result.postCommentsFontSize + 'px';
			document.querySelector('.icon-post-comments-font-size').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-accessibility').style.backgroundColor = 'var(--accent)';
			var value = result.postCommentsFontSize + 'px';
		}
		console.log('Post Comments Font Size: ' + value);
	});

	// Bionic Font Colour
	BROWSER_API.storage.sync.get(['bionicReaderFontColour'], function (result) {
		if (result.bionicReaderFontColour == true) {
			document.querySelector('.icon-bionic-font-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-bionic-font-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.bionicReaderFontColour == 'undefined' || result.bionicReaderFontColour == false) {
			document.querySelector('#checkbox-bionic-font-colour').checked = false;
			var value = false;
		}
		console.log('Bionic Font Colour: ' + value);
	});

	// Bionic Font Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderFontColourCSS'], function (result) {
		if (typeof result.bionicReaderFontColourCSS != 'undefined') {
			document.querySelector('#input-bionic-font-colour-css').value = result.bionicReaderFontColourCSS;
			var value = result.bionicReaderFontColourCSS;
		} else {
			document.querySelector('#input-bionic-font-colour-css').value = '';
			var value = '';
		}
		console.log('Bionic Font Colour CSS: ' + value);
	});

	// Bionic Background Colour
	BROWSER_API.storage.sync.get(['bionicReaderBgColour'], function (result) {
		if (result.bionicReaderBgColour == true) {
			document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-bionic-bg-colour').checked = true;
			document.querySelector('.icon-style-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.bionicReaderBgColour == 'undefined' || result.bionicReaderBgColour == false) {
			document.querySelector('#checkbox-bionic-bg-colour').checked = false;
			var value = false;
		}
		console.log('Bionic Background Colour: ' + value);
	});

	// Bionic Background Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderBgColourCSS'], function (result) {
		if (typeof result.bionicReaderBgColourCSS != 'undefined') {
			document.querySelector('#input-bionic-bg-colour-css').value = result.bionicReaderBgColourCSS;
			var value = result.bionicReaderBgColourCSS;
		} else {
			document.querySelector('#input-bionic-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Bionic Background Colour CSS: ' + value);
	});

	// Hide User Profile Pics
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		if (result.hideUserProfilePics == true) {
			document.querySelector('.icon-hide-user-profile-pics').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-hide-user-profile-pics').checked = true;
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideUserProfilePics == 'undefined' || result.hideUserProfilePics == false) {
			document.querySelector('#checkbox-hide-user-profile-pics').checked = false;
			var value = false;
		}
		console.log('Hide User Profile Pics: ' + value);
	});

	// Auto Expand Comments
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		if (result.autoExpandComments == true) {
			document.querySelector('.icon-auto-expand-comments').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-auto-expand-comments').checked = true;
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.autoExpandComments == 'undefined' || result.autoExpandComments == false) {
			document.querySelector('#checkbox-auto-expand-comments').checked = false;
			var value = false;
		}
		console.log('Auto Expand Comments: ' + value);
	});

	// Pre-Select Search Input
	document.querySelector('#search').focus();
}
