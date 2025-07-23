/**
 * Tweaks: Hide Elements - Hide The Side Menu
 *
 * @name hideSideMenu
 * @description Hide the side menu (left).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { loadSideMenuWidth } from '../resize_elements/side_menu_width';

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideSideMenuOld() {
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		if (result.hideSideMenuOld) hideSideMenuOld(true);
	});
}

export function loadHideSideMenu() {
	BROWSER_API.storage.sync.get(['hideSideMenu'], function (result) {
		if (result.hideSideMenu) hideSideMenu(true);
	});
}

/* === Enable/Disable The Feature === */

/* = Hide Side Menu - RV1 = */
export function hideSideMenuOld(value) {
	if (value) {
		enableHideSideMenuRV1();
	} else {
		disableHideSideMenuRV1();
	}
}

// Enable Hide Side Menu - RV1
function enableHideSideMenuRV1() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-old';
	styleElement.textContent = `.listing-chooser {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Hide Side Menu - RV1
function disableHideSideMenuRV1() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-old"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Side Menu - RV3 = */
export function hideSideMenu(value) {
	if (value) {
		enableHideSideMenuNewNew();
	} else {
		disableHideSideMenuNewNew();
	}
}

// Enable Hide Side Menu - RV3
function enableHideSideMenuNewNew() {
	document.documentElement.classList.add('re-hide-side-menu');
	if (!document.head.querySelector('style[id="re-hide-side-menu"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu';
		styleElement.textContent = `:root {
										--re-hide-side-menu-gap-multiplyer: 1;
									}
									#left-nav-drawer,
									reddit-sidebar-nav#left-sidebar,
									faceplate-tracker[noun="hamburger_menu"],
									shreddit-app #left-sidebar-container,
									shreddit-app flex-left-nav-container#left-sidebar-container.left-sidebar {
										display: none !important;
										visibility: hidden;
									}
									@media (min-width: 1200px) {
										div.grid-container:not(.grid-full), 
										div.grid-container:not(.grid-full).flex-nav-expanded {
											--flex-nav-width: 0;
										}
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	// needs timeout for some reason
	setTimeout(() => {
		document.documentElement.style.setProperty('--re-side-menu-width', 0);
	}, 1000);
}

// Disable Hide Side Menu - RV3
function disableHideSideMenuNewNew() {
	document.querySelector('html').classList.remove('re-hide-side-menu');
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.documentElement.style.removeProperty('--re-side-menu-width');
	loadSideMenuWidth();
}
