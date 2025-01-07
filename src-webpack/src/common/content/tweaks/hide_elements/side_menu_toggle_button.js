/* ===== Tweaks - Hide - Side Menu Toggle Button ===== */

import { loadSideMenuWidth } from '../resize_elements/side_menu_width';

/* === Triggered On Page Load === */
export function loadSideMenuToggleButton() {
	BROWSER_API.storage.sync.get(['sideMenuToggleButton'], function (result) {
		if (result.sideMenuToggleButton) sideMenuToggleButton(true);
	});
}

/* === Main Function === */
export function sideMenuToggleButton(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableSideMenuToggleButton();
		} else if (value === false) {
			disableSideMenuToggleButton();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Side Menu Toggle Button - New New
function enableSideMenuToggleButton() {
	// create and append close button
	const chevron = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>';
	let btnClose, btnOpen;
	if (!document.querySelector('.re-side-menu-close')) {
		btnClose = document.createElement('div');
		btnClose.classList.add('re-side-menu-close');
		btnClose.innerHTML = chevron;
		btnClose.addEventListener('click', function (e) {
			document.querySelector('shreddit-app').setAttribute('data-re-hide-side-menu', true);
			btnClose.classList.add('hidden');
			btnOpen.classList.remove('hidden');
			BROWSER_API.storage.sync.set({ sideMenuToggleButtonHiddenState: true });
			// document.documentElement.style.setProperty('--re-side-menu-width', 0);
		});
		const nav = document.querySelector('#left-sidebar-container nav');
		nav.insertBefore(btnClose, nav.firstChild);
	}
	// create and append open button
	if (!document.querySelector('.re-side-menu-open')) {
		btnOpen = document.createElement('div');
		btnOpen.classList.add('re-side-menu-open', 'hidden');
		btnOpen.innerHTML = chevron;
		btnOpen.addEventListener('click', function (e) {
			document.querySelector('shreddit-app').setAttribute('data-re-hide-side-menu', false);
			btnClose.classList.remove('hidden');
			btnOpen.classList.add('hidden');
			BROWSER_API.storage.sync.set({ sideMenuToggleButtonHiddenState: false });
			loadSideMenuWidth();
		});
		document.querySelector('body').append(btnOpen);
	}
	// set side menu attribute
	BROWSER_API.storage.sync.get(['sideMenuToggleButtonHiddenState'], function (result) {
		const state = result.sideMenuToggleButtonHiddenState;
		if (state) {
			document.querySelector('shreddit-app').setAttribute('data-re-hide-side-menu', true);
			btnClose.classList.add('hidden');
			btnOpen.classList.remove('hidden');
			// document.documentElement.style.setProperty('--re-side-menu-width', 0);
		} else {
			document.querySelector('shreddit-app').setAttribute('data-re-hide-side-menu', false);
			loadSideMenuWidth();
		}
	});
	// add main stylesheet
	if (!document.head.querySelector('style[id="re-side-menu-toggle-button"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-side-menu-toggle-button';
		styleElement.textContent = `:root {
										--re-hide-side-menu-gap-multiplyer: 1;
										--re-hide-side-menu-gap-multiplyer2: 1;
									}
									[data-re-hide-side-menu="true"] {
										--re-side-menu-width: 0;
									}
									shreddit-app[data-re-hide-side-menu="true"] #left-sidebar-container {
										display: none !important;
									}
									shreddit-app[data-re-hide-side-menu="false"] #left-sidebar-container {
										z-index: 1;
									}
									pdp-back-button {
										position: static !important;
									}
									@media (min-width: 1200px) {
										shreddit-app[data-re-hide-side-menu="true"] .grid-container {
											grid-template-columns: 0 1fr !important;
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
									.re-side-menu-close svg,
									.re-side-menu-open svg {
										transform: rotate(-90deg);
										width: 20px;
										height: 20px;
									}
									.re-side-menu-open svg {
										transform: rotate(90deg);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Side Menu Toggle Button - New New
function disableSideMenuToggleButton() {
	document.querySelector('html').classList.remove('re-hide-side-menu');
	document.querySelector('shreddit-app').removeAttribute('data-re-hide-side-menu');
	document.querySelector('.re-side-menu-close').remove();
	document.querySelector('.re-side-menu-open').remove();
	const dynamicStyleElements = document.querySelectorAll('style[id="re-side-menu-toggle-button"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	loadSideMenuWidth();
}
