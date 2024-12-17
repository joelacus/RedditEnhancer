/* ===== Tweaks - Hide - Side Menu ===== */

import { loadSideMenuWidth } from '../productivity/side_menu_width';

/* === Triggered On Page Load === */

// Load Hide Side Menu - Old
export function loadHideSideMenuOld() {
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		if (result.hideSideMenuOld) hideSideMenuOld(true);
	});
}

// Load Hide Side Menu - New New
export function loadHideSideMenu() {
	BROWSER_API.storage.sync.get(['hideSideMenu'], function (result) {
		if (result.hideSideMenu) hideSideMenu(true);
	});
}

/* === Main Function === */

// Hide Side Menu - Old
export function hideSideMenuOld(value) {
	if (value === true) {
		enableHideSideMenuOld();
	} else if (value === false) {
		disableHideSideMenuOld();
	}
}

// Hide Side Menu - New New
export function hideSideMenu(value) {
	if (value === true) {
		enableHideSideMenuNewNew();
	} else if (value === false) {
		disableHideSideMenuNewNew();
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Side Menu - Old
function enableHideSideMenuOld() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-old';
	styleElement.textContent = `.listing-chooser {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Side Menu - Old
function disableHideSideMenuOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-old"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Hide Side Menu - New New
function enableHideSideMenuNewNew() {
	document.querySelector('html').classList.add('re-hide-side-menu');
	if (!document.head.querySelector('style[id="re-hide-side-menu"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu';
		styleElement.textContent = `:root {
										--re-hide-side-menu-gap-multiplyer: 1;
									}
									shreddit-app #left-sidebar-container {
										display: none !important;
									}
									/*shreddit-app .grid-container .subgrid-container {
										grid-column-start: 1 !important;
									}
									shreddit-app #main-content {
										margin-left: 1.5rem;
									}
									shreddit-app[routename="subreddit"] #main-content,
									shreddit-app[routename="post_page"] #main-content,
									shreddit-app[routename="profile_post_page"] #main-content,
									shreddit-app[routename="profile_overview"] #main-content {
										grid-column-start: 1 !important;
										margin-left: 0 !important;
									}
									shreddit-app[routename="post_page"] .subgrid-container,
									shreddit-app[routename="profile_post_page"] .subgrid-container {
										padding-left: 1.3rem;
									}
									shreddit-app[routename="frontpage"] #main-content {
										margin-left: 0 !important;
									}
									shreddit-app[routename="subreddit"] .masthead {
										margin: 0 !important;
									} */
									shreddit-app .grid-container {
										grid-template-columns: 0 1fr;
									}
									/* shreddit-app .subgrid-container {
										max-width: 100vw;
									}*/`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	// needs timeout for some reason
	setTimeout(() => {
		document.documentElement.style.setProperty('--re-side-menu-width', 0);
	}, 1000);
}

// Function - Show Side Menu - New New
function disableHideSideMenuNewNew() {
	document.querySelector('html').classList.remove('re-hide-side-menu');
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	loadSideMenuWidth();
}
