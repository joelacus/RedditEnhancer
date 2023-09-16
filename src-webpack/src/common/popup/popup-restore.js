/* ===== Popup / Restore ===== */

import { addBackgroundListeners } from './popup-functions';
import { tabShowOldVersion } from './inputs/version_select';
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
		setRedditVersion(result);
	});
	function setRedditVersion(result) {
		if (typeof result.redditVersion != 'undefined') {
			if (result.redditVersion === 'old') {
				tabShowOldVersion();
				var value = 'old';
			} else {
				var value = 'new';
			}
		} else if (typeof result.redditVersion == 'undefined') {
			var value = 'new';
		}
		console.log('Selected Reddit Version: ' + value);
	}

	// Backgrounds
	BROWSER_API.storage.sync.get(['customBackgrounds'], function (result) {
		setCustomBackgrounds(result);
	});
	function setCustomBackgrounds(result) {
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
	}

	// Dark Mode
	BROWSER_API.storage.sync.get(['darkMode'], function (result) {
		setDarkMode(result);
	});
	function setDarkMode(result) {
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
	}

	// Dark Mode Auto
	BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
		setDarkModeAuto(result);
	});
	function setDarkModeAuto(result) {
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
	}

	// Dark Mode Time Values
	BROWSER_API.storage.sync.get(['darkModeTimeStart', 'darkModeTimeEnd'], function (result) {
		setDarkModeTimeValues(result);
	});
	function setDarkModeTimeValues(result) {
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
	}

	// Expand Layout Width
	BROWSER_API.storage.sync.get(['expandLayoutWidth'], function (result) {
		setExpandLayoutWidth(result);
	});
	function setExpandLayoutWidth(result) {
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
	}

	// Expand Layout
	BROWSER_API.storage.sync.get(['expandLayout'], function (result) {
		setExpandLayout(result);
	});
	function setExpandLayout(result) {
		if (typeof result.expandLayout == 'undefined' || result.expandLayout == false) {
			document.querySelector('#checkbox-expand-layout').checked = false;
			var value = false;
		} else if (result.expandLayout == true) {
			document.querySelector('#checkbox-expand-layout').checked = true;
			var icons = document.querySelectorAll('.icon-layout');
			icons.forEach(function (icon) {
				icon.style.backgroundColor = 'var(--accent)';
			});
			var value = true;
		}
		console.log('Expand Layout: ' + value);
	}

	// Layout Centre
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		setLayoutCentre(result);
	});
	function setLayoutCentre(result) {
		if (result.layoutCentre == true) {
			document.querySelector('#checkbox-layout-centre').checked = true;
			document.querySelector('.icon-centre').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-layout').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.layoutCentre == 'undefined' || result.layoutCentre == false) {
			document.querySelector('#checkbox-layout-centre').checked = false;
			var value = false;
		}
		console.log('Layout Centre: ' + value);
	}

	// Scale Tall Images To Fit Post
	BROWSER_API.storage.sync.get(['fitImage'], function (result) {
		setFitImage(result);
	});
	function setFitImage(result) {
		if (result.fitImage == true) {
			document.querySelector('#checkbox-fit-image').checked = true;
			document.querySelector('.icon-scale').style.backgroundColorr = 'var(--accent)';
			var value = true;
		} else if (typeof result.fitImage == 'undefined' || result.fitImage == false) {
			document.querySelector('#checkbox-fit-image').checked = false;
			var value = false;
		}
		console.log('Scale Tall Images: ' + value);
	}

	// Add Scrollbar To Tall Images
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		setImageScroll(result);
	});
	function setImageScroll(result) {
		if (typeof result.imageScroll == 'undefined') {
			BROWSER_API.storage.sync.set({ imageScroll: true });
		}
		if (typeof result.imageScroll == 'undefined' || result.imageScroll == true) {
			document.querySelector('#checkbox-image-scroll').checked = true;
			document.querySelector('.icon-scroll').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (result.imageScroll == false) {
			document.querySelector('#checkbox-image-scroll').checked = false;
			var value = false;
		}
		console.log('Scroll Tall Images: ' + value);
	}

	// Dropshadows
	BROWSER_API.storage.sync.get(['shadows'], function (result) {
		setShadows(result);
	});
	function setShadows(result) {
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
	}

	// Custom Background
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		setCustomBackground(result);
	});
	function setCustomBackground(result) {
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
	}

	// Set Selected Background
	BROWSER_API.storage.sync.get(['customBackground'], function (result) {
		setBackgroundChoice(result);
	});
	function setBackgroundChoice(result) {
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
	}

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
		setHideRedditPremium(result);
	});
	function setHideRedditPremium(result) {
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
	}

	// Hide Create Post
	BROWSER_API.storage.sync.get(['hideCreatePost'], function (result) {
		setHideCreatePost(result);
	});
	function setHideCreatePost(result) {
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
	}

	// Hide Home Sidebar
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		setHideHomeSidebar(result);
	});
	function setHideHomeSidebar(result) {
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
	}

	// Hide Sub Sidebar
	BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
		setHideSubSidebar(result);
	});
	function setHideSubSidebar(result) {
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
	}

	// Hide Post Sidebar
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		setHidePostSidebar(result);
	});
	function setHidePostSidebar(result) {
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
	}

	// Hide User Sidebar
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		setHideUserSidebar(result);
	});
	function setHideUserSidebar(result) {
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
	}

	// Hide Sidebar Policy
	BROWSER_API.storage.sync.get(['hideSidebarPolicy'], function (result) {
		setHideSidebarPolicy(result);
	});
	function setHideSidebarPolicy(result) {
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
	}

	// Hide Coin Button
	BROWSER_API.storage.sync.get(['hideCoinButton'], function (result) {
		setHideCoinButton(result);
	});
	function setHideCoinButton(result) {
		if (result.hideCoinButton == true) {
			document.querySelector('#checkbox-hide-coin-button').checked = true;
			document.querySelector('.hide-coin-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-coin-button').classList.remove('icon-coin');
			document.querySelector('.hide-coin-button').classList.add('icon-coin-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideCoinButton == 'undefined' || result.hideCoinButton == false) {
			document.querySelector('#checkbox-hide-coin-button').checked = false;
			var value = false;
		}
		console.log('Hide Coin Button: ' + value);
	}

	// Hide Advertise Button
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		setHideAdvertiseButton(result);
	});
	function setHideAdvertiseButton(result) {
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
	}

	// Hide Moderation Button
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		setHideModerationButton(result);
	});
	function setHideModerationButton(result) {
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
	}

	// Hide Popular Button
	BROWSER_API.storage.sync.get(['hidePopularButton'], function (result) {
		setHidePopularButton(result);
	});
	function setHidePopularButton(result) {
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
	}

	// Hide Happening Now Button
	BROWSER_API.storage.sync.get(['hideHappeningNowButton'], function (result) {
		setHideHappeningNowButton(result);
	});
	function setHideHappeningNowButton(result) {
		if (result.hideHappeningNowButton == true) {
			document.querySelector('#checkbox-hide-happening-now-button').checked = true;
			document.querySelector('.hide-happening-now-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.hide-happening-now-button').classList.remove('icon-happening-now');
			document.querySelector('.hide-happening-now-button').classList.add('icon-happening-now-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideHappeningNowButton == 'undefined' || result.hideHappeningNowButton == false) {
			document.querySelector('#checkbox-hide-happening-now-button').checked = false;
			var value = false;
		}
		console.log('Hide Happening Now Button: ' + value);
	}

	// Hide Chat Button
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		setHideChatButton(result);
	});
	function setHideChatButton(result) {
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
	}

	// Hide Notification Button
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		setHideNotificationButton(result);
	});
	function setHideNotificationButton(result) {
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
	}

	// Hide Create Post Button
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		setHideCreatePostButton(result);
	});
	function setHideCreatePostButton(result) {
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
	}

	// Header Height
	/*BROWSER_API.storage.sync.get(['headerHeight'], function(result) {
		setHeaderHeight(result)
	});
	function setHeaderHeight(result) {
		if (typeof result.headerHeight != 'undefined') {
			if (result.headerHeight == 4) {
				document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
				var height = "228px"
			} else if (result.headerHeight == 3) {
				document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
				var height = "128px"
			} else if (result.headerHeight == 2) {
				document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
				var height = "64px"
			} else if (result.headerHeight == 1) {
				document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
				var height = "0px"
			} else if (result.headerHeight == 0) {
				document.querySelector('.header-height').style.backgroundColor = ""
				var height = "default"
			}
			document.querySelector("#input-header-height").value = result.headerHeight
			document.querySelector("#header-height-value").innerText = height
		} else if (typeof result.headerHeight == 'undefined') {
			document.querySelector("#input-header-height").value = 0
			document.querySelector("#header-height-value").innerText = "default"
			var height = "default"
		}
		console.log("Header Height: "+height)
	}*/

	// Hide Gap
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		setHideGap(result);
	});
	function setHideGap(result) {
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
	}

	// Sticky Sort
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		setStickySort(result);
	});
	function setStickySort(result) {
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
	}

	// Hide Username
	BROWSER_API.storage.sync.get(['hideUsername'], function (result) {
		setHideUsername(result);
	});
	function setHideUsername(result) {
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
	}

	// Hide Karma
	BROWSER_API.storage.sync.get(['hideKarma'], function (result) {
		setHideKarma(result);
	});
	function setHideKarma(result) {
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
	}

	// New Player
	BROWSER_API.storage.sync.get(['newPlayer'], function (result) {
		setNewPlayer(result);
	});
	function setNewPlayer(result) {
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
	}

	// Scroll To Top
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		setShowToTopButton(result);
	});
	function setShowToTopButton(result) {
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
	}

	// Always Show Rising Sort Button
	BROWSER_API.storage.sync.get(['alwaysShowRisingButton'], function (result) {
		setAlwaysShowRisingButton(result);
	});
	function setAlwaysShowRisingButton(result) {
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
	}

	// Show Controversial Sort Button
	BROWSER_API.storage.sync.get(['showControversialSortButton'], function (result) {
		setShowControversialSortButton(result);
	});
	function setShowControversialSortButton(result) {
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
	}

	// Hide Get New Reddit
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		setHideGetNewReddit(result);
	});
	function setHideGetNewReddit(result) {
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
	}

	// Open Sub Links In New Tab
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		setOpenSubInNewTab(result);
	});
	function setOpenSubInNewTab(result) {
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
	}

	// Open Post Links In New Tab
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		setOPostPostInNewTab(result);
	});
	function setOPostPostInNewTab(result) {
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
	}

	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		setHidePromoted(result);
	});
	function setHidePromoted(result) {
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
	}

	// Hide NSFW Links
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		setHideNSFW(result);
	});
	function setHideNSFW(result) {
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
	}

	/*
	// Add Emoji Picker
	BROWSER_API.storage.sync.get(['addEmojiPicker'], function(result) {
		setAddEmojiPicker(result)
	});
	function setAddEmojiPicker(result) {
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
	}*/

	// Show r/All Button
	BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
		setShowAllButton(result);
	});
	function setShowAllButton(result) {
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
	}

	// Move Feed Section In Side Menu To The Top
	BROWSER_API.storage.sync.get(['sidemenuFeedTop'], function (result) {
		setSidemenuFeedTop(result);
	});
	function setSidemenuFeedTop(result) {
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
	}

	// Expand Post Options
	/*BROWSER_API.storage.sync.get(['expandPostOptions'], function (result) {
		setExpandPostOptions(result);
	});
	function setExpandPostOptions(result) {
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
	}*/

	// Add Scroll To Text Post
	BROWSER_API.storage.sync.get(['textPostScroll'], function (result) {
		setTextPostScroll(result);
	});
	function setTextPostScroll(result) {
		if (typeof result.textPostScroll == 'undefined' || result.textPostScroll == true) {
			document.querySelector('#checkbox-text-scroll-post').checked = true;
			document.querySelector('.icon-text-scroll-post').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (result.textPostScroll == false) {
			document.querySelector('#checkbox-text-scroll-post').checked = false;
			var value = false;
		}
		console.log('Add Scroll To Long Text Posts: ' + value);
	}

	// Hide See Full Image
	BROWSER_API.storage.sync.get(['hideSeeFullImage'], function (result) {
		setHideSeeFullImage(result);
	});
	function setHideSeeFullImage(result) {
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
	}

	// Modern Old Reddit
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		setModerniseOldReddit(result);
	});
	function setModerniseOldReddit(result) {
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
	}

	// Hide Header Sub Bar
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		setHideHeaderSubBar(result);
	});
	function setHideHeaderSubBar(result) {
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
	}

	// Hide Side Menu Old
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		setHideSideMenuOld(result);
	});
	function setHideSideMenuOld(result) {
		if (result.hideSideMenuOld == true) {
			document.querySelector('#checkbox-hide-side-menu-old').checked = true;
			document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideSideMenuOld == 'undefined' || result.hideSideMenuOld == false) {
			document.querySelector('#checkbox-hide-side-menu-old').checked = false;
			var value = false;
		}
		console.log('Hide Side Menu Old: ' + value);
	}

	// Comments Limit
	BROWSER_API.storage.sync.get(['commentsLimit'], function (result) {
		setBgBlur(result);
	});
	function setBgBlur(result) {
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
	}

	// Auto Expand Feed/Post To 100% At Value
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		setAutoExpandValue(result);
	});
	function setAutoExpandValue(result) {
		if (typeof result.autoExpandValue != 'undefined') {
			document.querySelector('#auto-expand-value').value = result.autoExpandValue;
			var value = result.autoExpandValue;
		} else {
			document.querySelector('#auto-expand-value').value = 1000;
			var value = 1000;
		}
		console.log('Expand Post/Feed To 100% At Width: ' + value + 'px');
	}

	// Limit Infinity Scroll
	BROWSER_API.storage.sync.get(['limitInfinityScroll'], function (result) {
		setLimitInfinityScroll(result);
	});
	function setLimitInfinityScroll(result) {
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
	}

	// Enable Default Feed Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption'], function (result) {
		setEnableDefaultFeedSortOption(result);
	});
	function setEnableDefaultFeedSortOption(result) {
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
	}

	// Default Feed Sort Option
	BROWSER_API.storage.sync.get(['defaultFeedSortOption'], function (result) {
		setDefaultFeedSortOption(result);
	});
	function setDefaultFeedSortOption(result) {
		setTimeout(function () {
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
	}

	// Enable Default Comments Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption'], function (result) {
		setEnableDefaultCommentsSortOption(result);
	});
	function setEnableDefaultCommentsSortOption(result) {
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
	}

	// Default Comments Sort Option
	BROWSER_API.storage.sync.get(['defaultCommentsSortOption'], function (result) {
		setDefaultCommentsSortOption(result);
	});
	function setDefaultCommentsSortOption(result) {
		setTimeout(function () {
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
	}

	// Hide "Turn On Notifications" Popup
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		setHideTurnOnNotificationsPopup(result);
	});
	function setHideTurnOnNotificationsPopup(result) {
		if (result.hideTurnOnNotificationsPopup == true) {
			document.querySelector('#checkbox-hide-turn-on-notifications').checked = true;
			document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-turn-on-notifications').classList.add('icon-bell');
			document.querySelector('.icon-hide-turn-on-notifications').classList.remove('icon-bell-slash');
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideTurnOnNotificationsPopup == 'undefined' || result.hideTurnOnNotificationsPopup == false) {
			document.querySelector('#checkbox-hide-turn-on-notifications').checked = false;
			var value = false;
		}
		console.log('Hide "Turn On Notifications" Popup: ' + value);
	}

	// Scroll To Next Root Comment
	BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
		setScrollToNextRootComment(result);
	});
	function setScrollToNextRootComment(result) {
		if (typeof result.scrollToNextRootComment == 'undefined' || result.scrollToNextRootComment == true) {
			document.querySelector('#checkbox-scroll-to-next-root-comment').checked = true;
			document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (result.scrollToNextRootComment == false) {
			document.querySelector('#checkbox-scroll-to-next-root-comment').checked = false;
			var value = false;
		}
		console.log('Scroll To Next Root Comment Button: ' + value);
	}

	// Show Post Numbers
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		setShowPostNumbers(result);
	});
	function setShowPostNumbers(result) {
		if (typeof result.showPostNumbers == 'undefined' || result.showPostNumbers == true) {
			document.querySelector('#checkbox-show-post-numbers').checked = true;
			document.querySelector('.icon-show-post-numbers').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (result.showPostNumbers == false) {
			document.querySelector('#checkbox-show-post-numbers').checked = false;
			var value = false;
		}
		console.log('Show Post Numbers: ' + value);
	}

	// Override Drop Shadow
	BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
		setOverrideDropShadow(result);
	});
	function setOverrideDropShadow(result) {
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
	}

	// Override Drop Shadow CSS
	BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
		setOverrideDropShadowCSS(result);
	});
	function setOverrideDropShadowCSS(result) {
		if (typeof result.overrideDropShadowCSS != 'undefined') {
			document.querySelector('#input-shadow-override-css').value = result.overrideDropShadowCSS;
			var value = result.overrideDropShadowCSS;
		} else {
			document.querySelector('#input-shadow-override-css').value = '';
			var value = '';
		}
		console.log('Override Drop Shadow CSS: ' + value);
	}

	// Post Max Height
	BROWSER_API.storage.sync.get(['postMaxHeight'], function (result) {
		setPostMaxHeight(result);
	});
	function setPostMaxHeight(result) {
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
	}

	// Bionic Reader - Comments
	/*BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
		setBionicReaderComments(result);
	});
	function setBionicReaderComments(result) {
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
	}

	// Bionic Reader - Posts
	BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
		setBionicReaderPosts(result);
	});
	function setBionicReaderPosts(result) {
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
	}*/

	// Theme Header Background Colour
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
		setThemeHeaderBackgroundColour(result);
	});
	function setThemeHeaderBackgroundColour(result) {
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
	}

	// Theme Header Background Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
		setThemeHeaderBackgroundColourCSS(result);
	});
	function setThemeHeaderBackgroundColourCSS(result) {
		if (typeof result.themeHeaderBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-header-bg-colour-css').value = result.themeHeaderBackgroundColourCSS;
			var value = result.themeHeaderBackgroundColourCSS;
		} else {
			document.querySelector('#input-header-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Header Background Colour CSS: ' + value);
	}

	// Theme Header Text Colour
	BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
		setThemeHeaderTextColour(result);
	});
	function setThemeHeaderTextColour(result) {
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
	}

	// Theme Header Text Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
		setThemeHeaderTextColourCSS(result);
	});
	function setThemeHeaderTextColourCSS(result) {
		if (typeof result.themeHeaderTextColourCSS != 'undefined') {
			document.querySelector('#input-header-text-colour-css').value = result.themeHeaderTextColourCSS;
			var value = result.themeHeaderTextColourCSS;
		} else {
			document.querySelector('#input-header-text-colour-css').value = '';
			var value = '';
		}
		console.log('Header Text Colour CSS: ' + value);
	}

	// Theme Sort Background Colour
	BROWSER_API.storage.sync.get(['themeSortBackgroundColour'], function (result) {
		setThemeSortBackgroundColour(result);
	});
	function setThemeSortBackgroundColour(result) {
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
	}

	// Theme Sort Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSortBackgroundColourCSS'], function (result) {
		setThemeSortBackgroundColourCSS(result);
	});
	function setThemeSortBackgroundColourCSS(result) {
		if (typeof result.themeSortBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-sort-bg-colour-css').value = result.themeSortBackgroundColourCSS;
			var value = result.themeSortBackgroundColourCSS;
		} else {
			document.querySelector('#input-sort-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Background Colour CSS: ' + value);
	}

	// Theme Sort Text Colour
	BROWSER_API.storage.sync.get(['themeSortTextColour'], function (result) {
		setThemeSortTextColour(result);
	});
	function setThemeSortTextColour(result) {
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
	}

	// Theme Sort Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSortTextColourCSS'], function (result) {
		setThemeSortTextColourCSS(result);
	});
	function setThemeSortTextColourCSS(result) {
		if (typeof result.themeSortTextColourCSS != 'undefined') {
			document.querySelector('#input-sort-text-colour-css').value = result.themeSortTextColourCSS;
			var value = result.themeSortTextColourCSS;
		} else {
			document.querySelector('#input-sort-text-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Text Colour CSS: ' + value);
	}

	// Theme Sort Text Colour 2
	BROWSER_API.storage.sync.get(['themeSortTextColour2'], function (result) {
		setThemeSortTextColour2(result);
	});
	function setThemeSortTextColour2(result) {
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
	}

	// Theme Sort Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themeSortTextColour2CSS'], function (result) {
		setThemeSortTextColour2CSS(result);
	});
	function setThemeSortTextColour2CSS(result) {
		if (typeof result.themeSortTextColour2CSS != 'undefined') {
			document.querySelector('#input-sort-text-colour-2-css').value = result.themeSortTextColour2CSS;
			var value = result.themeSortTextColour2CSS;
		} else {
			document.querySelector('#input-sort-text-colour-2-css').value = '';
			var value = '';
		}
		console.log('Sort Text Colour 2 CSS: ' + value);
	}

	// Theme Sort Border Colour
	BROWSER_API.storage.sync.get(['themeSortBorderColour'], function (result) {
		setThemeSortBorderColour(result);
	});
	function setThemeSortBorderColour(result) {
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
	}

	// Theme Sort Border Colour CSS
	BROWSER_API.storage.sync.get(['themeSortBorderColourCSS'], function (result) {
		setThemeSortBorderColourCSS(result);
	});
	function setThemeSortBorderColourCSS(result) {
		if (typeof result.themeSortBorderColourCSS != 'undefined') {
			document.querySelector('#input-sort-border-colour-css').value = result.themeSortBorderColourCSS;
			var value = result.themeSortBorderColourCSS;
		} else {
			document.querySelector('#input-sort-border-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Border Colour CSS: ' + value);
	}

	// Theme Post Background Colour
	BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
		setThemePostBackgroundColour(result);
	});
	function setThemePostBackgroundColour(result) {
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
	}

	// Theme Post Background Colour CSS
	BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
		setThemePostBackgroundColourCSS(result);
	});
	function setThemePostBackgroundColourCSS(result) {
		if (typeof result.themePostBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-post-bg-colour-css').value = result.themePostBackgroundColourCSS;
			var value = result.themePostBackgroundColourCSS;
		} else {
			document.querySelector('#input-post-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Post Background Colour CSS: ' + value);
	}

	// Theme Post Text Colour
	BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
		setThemePostTextColour1(result);
	});
	function setThemePostTextColour1(result) {
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
	}

	// Theme Post Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
		setThemePostTextColour1CSS(result);
	});
	function setThemePostTextColour1CSS(result) {
		if (typeof result.themePostTextColour1CSS != 'undefined') {
			document.querySelector('#input-post-text-colour-css').value = result.themePostTextColour1CSS;
			var value = result.themePostTextColour1CSS;
		} else {
			document.querySelector('#input-post-text-colour-css').value = '';
			var value = '';
		}
		console.log('Post Text Colour CSS: ' + value);
	}

	// Theme Post Visited Title Colour
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColour'], function (result) {
		setThemePostVisitedTitleColour(result);
	});
	function setThemePostVisitedTitleColour(result) {
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
	}

	// Theme Post Visited Title Colour CSS
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColourCSS'], function (result) {
		setThemePostVisitedTitleColourCSS(result);
	});
	function setThemePostVisitedTitleColourCSS(result) {
		if (typeof result.themePostVisitedTitleColourCSS != 'undefined') {
			document.querySelector('#input-post-visited-title-colour-css').value = result.themePostVisitedTitleColourCSS;
			var value = result.themePostVisitedTitleColourCSS;
		} else {
			document.querySelector('#input-post-visited-title-colour-css').value = '';
			var value = '';
		}
		console.log('Post Visited Title Colour CSS: ' + value);
	}

	// Theme Post Text Colour 2
	BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
		setThemePostTextColour2(result);
	});
	function setThemePostTextColour2(result) {
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
	}

	// Theme Post Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
		setThemePostTextColour2CSS(result);
	});
	function setThemePostTextColour2CSS(result) {
		if (typeof result.themePostTextColour2CSS != 'undefined') {
			document.querySelector('#input-post-text-colour-2-css').value = result.themePostTextColour2CSS;
			var value = result.themePostTextColour2CSS;
		} else {
			document.querySelector('#input-post-text-colour-2-css').value = '';
			var value = '';
		}
		console.log('Post Text Colour 2 CSS: ' + value);
	}

	// Theme Post Border Colour
	BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
		setThemePostBorderColour(result);
	});
	function setThemePostBorderColour(result) {
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
	}

	// Theme Post Border Colour CSS
	BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
		setThemePostBorderColourCSS(result);
	});
	function setThemePostBorderColourCSS(result) {
		if (typeof result.themePostBorderColourCSS != 'undefined') {
			document.querySelector('#input-post-border-colour-css').value = result.themePostBorderColourCSS;
			var value = result.themePostBorderColourCSS;
		} else {
			document.querySelector('#input-post-border-colour-css').value = '';
			var value = '';
		}
		console.log('Post Border Colour CSS: ' + value);
	}

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
			document.querySelector('#input-theme-blur').value = 5;
			document.querySelector('#theme-blur-value').innerText = '5px';
			var value = 0;
		}
		console.log('Theme Blur: ' + value + 'px');
	});

	// Theme Exceptions Enable
	BROWSER_API.storage.sync.get(['themeExceptionsEnable'], function (result) {
		setThemeExceptionsEnable(result);
	});
	function setThemeExceptionsEnable(result) {
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
	}

	// Theme Exception Mode
	BROWSER_API.storage.sync.get(['themeExceptionMode'], function (result) {
		if (typeof result.themeExceptionMode == 'undefined' || result.themeExceptionMode === 'blacklist') {
			var value = 'blacklist';
		} else if (result.themeExceptionMode === 'whitelist') {
			document.querySelector('#btn-theme-blacklist').classList.remove('tab-active');
			document.querySelector('#btn-theme-whitelist').classList.add('tab-active');
			document.querySelector('#textThemeWhitelistInfo').classList.remove('hidden');
			document.querySelector('#textThemeBlacklistInfo').classList.add('hidden');
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
		setHideSubSidebarExceptionsEnable(result);
	});
	function setHideSubSidebarExceptionsEnable(result) {
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
	}

	// Hide Sub Sidebar Exception Mode
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionMode'], function (result) {
		if (typeof result.hideSubSidebarExceptionMode == 'undefined' || result.hideSubSidebarExceptionMode === 'blacklist') {
			var value = 'blacklist';
		} else if (result.hideSubSidebarExceptionMode === 'whitelist') {
			document.querySelector('#btn-hide-sub-sidebar-blacklist').classList.remove('tab-active');
			document.querySelector('#btn-hide-sub-sidebar-whitelist').classList.add('tab-active');
			document.querySelector('#textHideSubSidebarWhitelistInfo').classList.remove('hidden');
			document.querySelector('#textHideSubSidebarBlacklistInfo').classList.add('hidden');
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
		setHideHeaderBar(result);
	});
	function setHideHeaderBar(result) {
		if (result.hideHeaderBar == true) {
			document.querySelector('#checkbox-hide-header-bar').checked = true;
			document.querySelector('.icon-hide-header-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideHeaderBar == 'undefined' || result.hideHeaderBar == false) {
			document.querySelector('#checkbox-hide-header-bar').checked = false;
			var value = false;
		}
		console.log('Hide Header Bar: ' + value);
	}

	// Non Sticky Header Bar
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		setNonStickyHeaderBar(result);
	});
	function setNonStickyHeaderBar(result) {
		if (result.nonStickyHeaderBar == true) {
			document.querySelector('#checkbox-non-sticky-header-bar').checked = true;
			document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-productivity-tweaks').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.nonStickyHeaderBar == 'undefined' || result.nonStickyHeaderBar == false) {
			document.querySelector('#checkbox-non-sticky-header-bar').checked = false;
			var value = false;
		}
		console.log('Non Header Bar: ' + value);
	}

	// Hide Original Scroll To Top Button
	BROWSER_API.storage.sync.get(['hideOriginalScrollToTop'], function (result) {
		sethideOriginalScrollToTop(result);
	});
	function sethideOriginalScrollToTop(result) {
		if (result.hideOriginalScrollToTop == true) {
			document.querySelector('#checkbox-hide-original-scroll-to-top').checked = true;
			document.querySelector('.icon-hide-original-scroll-to-top').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-hide-elements').style.backgroundColor = 'var(--accent)';
			var value = true;
		} else if (typeof result.hideOriginalScrollToTop == 'undefined' || result.hideOriginalScrollToTop == false) {
			document.querySelector('#checkbox-hide-original-scroll-to-top').checked = false;
			var value = false;
		}
		console.log('Hide Original Scroll To Top Button: ' + value);
	}

	// Theme CreatePost Background Colour
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColour'], function (result) {
		setThemeCreatePostBackgroundColour(result);
	});
	function setThemeCreatePostBackgroundColour(result) {
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
	}

	// Theme CreatePost Background Colour CSS
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColourCSS'], function (result) {
		setThemeCreatePostBackgroundColourCSS(result);
	});
	function setThemeCreatePostBackgroundColourCSS(result) {
		if (typeof result.themeCreatePostBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-create-post-bg-colour-css').value = result.themeCreatePostBackgroundColourCSS;
			var value = result.themeCreatePostBackgroundColourCSS;
		} else {
			document.querySelector('#input-create-post-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Create Post Background Colour CSS: ' + value);
	}

	// Theme CreatePost Border Colour
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColour'], function (result) {
		setThemeCreatePostBorderColour(result);
	});
	function setThemeCreatePostBorderColour(result) {
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
	}

	// Theme CreatePost Border Colour CSS
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColourCSS'], function (result) {
		setThemeCreatePostBorderColourCSS(result);
	});
	function setThemeCreatePostBorderColourCSS(result) {
		if (typeof result.themeCreatePostBorderColourCSS != 'undefined') {
			document.querySelector('#input-create-post-border-colour-css').value = result.themeCreatePostBorderColourCSS;
			var value = result.themeCreatePostBorderColourCSS;
		} else {
			document.querySelector('#input-create-post-border-colour-css').value = '';
			var value = '';
		}
		console.log('Create Post Border Colour CSS: ' + value);
	}

	// Pre-Select Search Input
	document.querySelector('#search').focus();
}
