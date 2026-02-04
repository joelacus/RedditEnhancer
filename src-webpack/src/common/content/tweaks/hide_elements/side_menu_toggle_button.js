/**
 * Tweaks: Hide Elements - Side Menu Toggle Button
 *
 * @name sideMenuToggleButton
 * @description Add a button to the top of the side menu (left) to toggle it open or closed.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { loadSideMenuWidth } from '../resize_elements/side_menu_width';

/* === Run by Tweak Loader when the Page Loads === */
export function loadSideMenuToggleButton() {
	BROWSER_API.storage.sync.get(['sideMenuToggleButton'], function (result) {
		if (result.sideMenuToggleButton) sideMenuToggleButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function sideMenuToggleButton(value) {
	if (redditVersion === 'newnew' && value) {
		enableSideMenuToggleButton();
	} else {
		disableSideMenuToggleButton();
	}
}

// Enable Side Menu Toggle Button - RV3
function enableSideMenuToggleButton() {
	document.documentElement.classList.add('re-hide-side-menu');
	const chevron = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>';

	const app = document.querySelector('shreddit-app');
	const sideMenu = document.getElementById('flex-left-nav-container');
	if (!app || !sideMenu) return;

	if (!document.querySelector('.re-side-menu-close')) {
		const closeBtn = document.createElement('button');
		closeBtn.innerHTML = chevron;
		closeBtn.classList.add('re-side-menu-close');
		closeBtn.addEventListener('click', function (e) {
			app.setAttribute('data-re-hide-side-menu', 'true');
			localStorage.setItem('sideMenuHidden', 'true');
		});
		sideMenu.insertBefore(closeBtn, sideMenu.firstChild);
	}

	if (!document.querySelector('.re-side-menu-open')) {
		const openBtn = document.createElement('button');
		openBtn.innerHTML = chevron;
		openBtn.classList.add('re-side-menu-open');
		openBtn.addEventListener('click', function (e) {
			app.setAttribute('data-re-hide-side-menu', 'false');
			localStorage.setItem('sideMenuHidden', 'false');
			loadSideMenuWidth();
		});
		document.body.appendChild(openBtn);
	}

	const state = localStorage.getItem('sideMenuHidden');
	if (state && state === 'true') {
		app.setAttribute('data-re-hide-side-menu', 'true');
	} else {
		app.setAttribute('data-re-hide-side-menu', 'false');
		loadSideMenuWidth();
	}

	// add main stylesheet
	if (!document.head.querySelector('style[id="re-side-menu-toggle-button"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-side-menu-toggle-button';
		styleElement.textContent = `:root {
										--re-hide-side-menu-gap-multiplyer: 1;
										--re-hide-side-menu-gap-multiplyer2: 1;
									}
									/* For functions relying on RE's own CSS variable */
									[data-re-hide-side-menu="true"] {
										--re-side-menu-width: 0;
									}
									flex-left-nav-container#left-sidebar-container {
										--flex-nav-closed-size: 0;
									}
									shreddit-app[data-re-hide-side-menu="true"] #left-sidebar-container,
									shreddit-app div#flex-nav-buttons {
										display: none !important;
									}
									[data-re-hide-side-menu="true"] flex-left-nav-container#left-sidebar-container reddit-sidebar-nav#left-sidebar {
										padding-right: 0;
									}
									shreddit-app[data-re-hide-side-menu="false"] #left-sidebar-container {
										z-index: 1;
									}
									@media (min-width: 1200px) {
										[data-re-hide-side-menu="true"] div.grid-container:not(.grid-full),
										[data-re-hide-side-menu="true"] div.grid-container:not(.grid-full).flex-nav-collapsed {
											--flex-nav-width: 0;
										}
									}
									.re-side-menu-close,
									.re-side-menu-open {
										display: flex;
										align-items: center;
										justify-content: center;
										width: 40px;
										height: 40px;
										cursor: pointer;
										z-index: 9;
										background: none;
									}
									.re-side-menu-close {
										position: sticky;
										top: 0;
										left: 100%;
									}
									.re-side-menu-open {
										position: fixed;
										top: 57px;
										left: 0;
									}
									.re-compact-header-side-menu .re-side-menu-open {
										top: 48px;
									}
									shreddit-app[data-re-hide-side-menu="false"] ~ .re-side-menu-open {
										display: none;
									}
									reddit-sidebar-nav > nav {
										padding-top: 0 !important;
									}
									.re-side-menu-close svg,
									.re-side-menu-open svg {
										transform: rotate(-90deg);
										width: 20px;
										height: 20px;
									}
									.re-side-menu-open svg {
										transform: rotate(90deg);
									}
									#left-sidebar-container #flex-left-nav-contents {
										position: absolute;
										top: 0;
										width: 100%;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
		document.cookie = 'hui_flex_nav_expanded_state=1; path=/';
	}
}

//  Disable Side Menu Toggle Button - RV3
function disableSideMenuToggleButton() {
	document.querySelector('html').classList.remove('re-hide-side-menu');
	document.querySelector('shreddit-app')?.removeAttribute('data-re-hide-side-menu');
	document.querySelector('.re-side-menu-close')?.remove();
	document.querySelector('.re-side-menu-open')?.remove();
	const dynamicStyleElements = document.querySelectorAll('style[id="re-side-menu-toggle-button"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	loadSideMenuWidth();
}
