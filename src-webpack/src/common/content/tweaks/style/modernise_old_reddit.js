/**
 * Tweaks: Style - Modernise Old Reddit
 *
 * @name largerClassicPost
 * @description Style old Reddit look and feel like new Reddit.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

import { loadCustomBackground } from '../background/custom_background';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadModerniseOldReddit() {
	BROWSER_API.storage.sync.get(['moderniseOldReddit', 'moderniseOldRedditLight'], function (result) {
		if (result.moderniseOldReddit === true) moderniseOldReddit(true);
		if (result.moderniseOldRedditLight === true) moderniseOldRedditLight(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function moderniseOldReddit(value) {
	const link = window.location.href;
	if (value) {
		loadCustomBackground();
		styleModerniseOldReddit();
		document.querySelector('body').classList.add('re-modernise');
		// Header
		const header_container = document.querySelector('.re-header-container');
		if (!header_container) {
			const header = document.querySelector('#header');
			const headerLeft = document.querySelector('#header-bottom-left');
			const headerRight = document.querySelector('#header-bottom-right');
			const headerContainer = document.createElement('div');
			headerContainer.classList.add('re-header-container');
			headerContainer.append(headerLeft);
			headerContainer.append(headerRight);
			header.append(headerContainer);
		}

		// Search
		const search = document.querySelector('#search');
		const headerLeft = document.querySelector('#header-bottom-left');
		if (search) {
			headerLeft.append(search);
		}

		// Sub List
		const dropdown_btn = document.querySelector('#sr-header-area .dropdown.srdrop');
		const dropdown_menu = document.querySelector('#sr-header-area .drop-choices.srdrop');
		if (dropdown_btn && dropdown_menu) {
			headerLeft.insertBefore(dropdown_menu, search);
			headerLeft.insertBefore(dropdown_btn, dropdown_menu);
		}

		// Sub Filter
		if (!document.querySelector('.sub-filter') && dropdown_btn && dropdown_menu) {
			const searchFilter = document.createElement('input');
			searchFilter.type = 'text';
			searchFilter.classList.add('sub-filter');
			searchFilter.placeholder = 'Filter';
			searchFilter.addEventListener('keyup', function (e) {
				var input, filter, div, a, i, txtValue;
				filter = e.target.value.toUpperCase();
				div = document.querySelector('.drop-choices.srdrop');
				a = div.getElementsByTagName('a');
				for (i = 0; i < a.length; i++) {
					txtValue = a[i].textContent || a[i].innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						a[i].style.display = '';
					} else {
						a[i].style.display = 'none';
					}
				}
			});
			dropdown_menu?.insertBefore(searchFilter, dropdown_menu.firstChild);

			searchFilter.addEventListener('click', function (e) {
				e.stopPropagation();
			});

			dropdown_btn.addEventListener('click', function (e) {
				searchFilter.value = '';
				searchFilter.focus();
				const list = document.querySelector('.drop-choices.srdrop').querySelectorAll('a');
				list.forEach(function (item) {
					item.style.display = '';
				});
			});
		}

		// Main
		const reMain = document.querySelector('#re-main');
		if (!reMain) {
			const main = document.createElement('div');
			main.id = 're-main';
			const container = document.createElement('div');
			container.id = 're-container';
			const body = document.querySelector('body');
			const sidemenu = document.querySelector('.listing-chooser');
			const side = document.querySelector('.side');
			const content = document.querySelector('.content[role="main"]');
			body.insertBefore(main, side);
			if (document.querySelector('#header .tabmenu')) {
				const sort = document.querySelector('#header .tabmenu');
				content.insertBefore(sort, content.firstChild);
			}
			if (sidemenu) {
				main.append(sidemenu);
			}
			container.append(content);
			container.append(side);
			main.append(container);
		} else {
			const content = document.querySelector('.content');
			if (document.querySelector('#header .tabmenu')) {
				const sort = document.querySelector('#header .tabmenu');
				content.insertBefore(sort, content.firstChild);
			}
		}
		if (link.indexOf('old.reddit.com/prefs/') >= 0) {
			const body = document.querySelector('body');
			const header = document.querySelector('#header');
			const main = document.querySelector('#re-main');
			body.insertBefore(main, header.nextSibling);
		}
	}
}

// Light Mode
export function moderniseOldRedditLight(value) {
	if (value) {
		document.querySelector('body').classList.add('re-modernise-light');
	} else {
		document.querySelector('body').classList.remove('re-modernise-light');
	}
}

// Append stylesheet
function styleModerniseOldReddit() {
	if (!document.head.querySelector('style[id="re-modernise-old-reddit"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-modernise-old-reddit';
		styleElement.textContent = `:root {
										--re-background-primary: #030303;
										--re-background-secondary: #1a1a1b;
										--re-background-tertiary: #272729;
										--re-text-primary: #fff;
										--re-text-secondary: #818384;
										--re-text-highlight: #d7dadc;
										--re-text-muted: #a8aaab;
										--re-border-primary: #343536;
										--re-hover-overlay: rgba(255,255,255,0.04);
									}

									.re-modernise-light {
										--re-background-primary: #ffffff;
										--re-background-secondary: #f0f0f0;
										--re-background-tertiary: #e0e0e0;
										--re-text-primary: #1a1a1a;
										--re-text-secondary: #666666;
										--re-text-highlight: #1a1a1a;
										--re-text-muted: #888888;
										--re-border-primary: #cccccc;
										--re-hover-overlay: rgba(0,0,0,0.04);
									}

									body {
										background-color: var(--re-background-primary) !important;
									}
									#header {
										position: sticky !important;
										top: 0 !important;
									}
									#header-bottom-right {
										display: flex;
									}
									#siteTable {
										margin: 0 24px 0 24px;
									}
									.content > .menuarea {
										margin-right: 24px
									}
									#siteTable .thing {
										maring-bottom: 16px;
										padding: 8px;
										border: solid 1px var(--re-border-primary);
										border-radius: 4px;
										background-color: var(--re-background-secondary);
									}
									#siteTable .thing:hover {
										border-color: var(--re-text-primary) !important;
									}
									#siteTable .thing .title {
										color: var(--re-text-primary);
									}
									.listing-chooser {
										position: relative !important;
										top: 0 !important;
										z-index: 2 !important;
										background: var(--re-background-secondary);
									}
									.listing-chooser .grippy::before, .listing-chooser .grippy::after {
										border-left: solid 1px var(--re-border-primary) !important;
										background-color: var(--re-border-primary) !important;
									}
									.content {
										margin: 0 !important;
										width: 100% !important;
									}
									.side {
										min-width: 300px;
										height: fit-content !important;
										margin: 24px !important;
										padding: 8px;
										border-radius: 2px;
										background-color: var(--re-background-secondary) !important;
									}
									.side .morelink {
										background-image: none !important;
										background: transparent !important;
										border: solid 1px var(--re-border-primary) !important;
										border-radius: 2px;
									}
									.side .morelink:hover {
										border-color: var(--re-text-primary) !important;
										background: var(--re-hover-overlay) !important;
									}
									.side .morelink a {
										color: var(--re-text-primary) !important;
									}
									.side .morelink .nub {
										display: none !important;
									}
									#sr-header-area {
										background-color: transparent !important;
										border-bottom: solid 1px var(--re-border-primary) !important;
									}
									#sr-header-area a {
										color: var(--re-text-primary);
									}
									#sr-more-link {
										background-color: var(--re-background-secondary) !important;
									}
									#header {
										background-color: var(--re-background-secondary) !important;
										border-bottom: solid 1px var(--re-border-primary) !important;
									}
									#header-img {
										margin-left: 20px;
										width: 160px !important;
									}
									#header-bottom-left {
										display: flex;
										align-items: center;
										grid-gap: 8px;
										height: 50px;
										position: relative !important;
										width: 100% !important;
									}
									#header a, #header span {
										color: var(--re-text-primary) !important
									}
									#search input[type="text"] {
										border-radius: 50px;
										height: 42px;
										width: 100% !important;
										background-color: var(--re-background-tertiary);
										border: solid 1px var(--re-border-primary) !important;
										color: var(--re-text-primary);
										outline: none;
										font-family: Verdana, sans-serif !important;
										font-size: 14px !important;
										padding-left: 16px !important;
									}
									#search input[type="text"]::placeholder {
										text-transform: capitalize;
									}
									#search input[type="text"]:hover, #search input[type="text"]:focus {
										border-color: var(--re-text-primary) !important;
									}
									#search input[type="submit"] {
										margin-left: -28px !important;
									}
									#search {
										width: 100%;
										height: 42px;
										margin-left: 48px;
										margin-right: 48px;
									}
									#searchexpando {
										position: absolute;
									}
									.re-header-container {
										display: flex;
									}
									#header-bottom-right {
										position: relative !important;
										top: 0 !important;
										align-items: center;
										grid-gap: 16px;
										height: 50px;
										padding: 0 !important;
										padding-right: 24px !important;
										border-radius: 0 !important;
										font-size: 14px;
										background-color: transparent !important;
										color: var(--re-text-primary);
										font-size: 14px;
									}
									#header-bottom-right .user span {
										color: var(--re-text-muted) !important;
									}
									#header-bottom-right .user a {
										color: var(--re-text-primary) !important;
									}
									#header-bottom-right .separator {
										display: none;
									}
									#header-bottom-right a {
										color: var(--re-text-primary) !important;
										font-weight: normal;
									}
									#header-bottom-left .dropdown {
										height: 28px;
										min-width: 252px;
										line-height: 28px;
										padding: 4px 8px;
										border: solid 1px transparent;
										border-radius: 4px;
										font-size: 14px;
										cursor: pointer;
									}
									#header-bottom-left .dropdown:hover {
										border: solid 1px var(--re-border-primary);
									}
									#header-bottom-left .dropdown span {
										margin-left: 0 !important;
										margin-right: 0 !important;
										padding-right: 0 !important;
										color: var(--re-text-primary);
										width: 100%;
									}
									#header-bottom-left .drop-choices.srdrop {
										max-height: 400px;
										min-width: 270px;
										overflow-x: hidden;
										overflow-y: scroll;
										border-radius: 0 0 4px 4px;
										margin-top: 14px;
										margin-left: 0;
										background-color: var(--re-background-secondary);
										border: solid 1px var(--re-border-primary) !important;
										border-top: none !important;
									}
									#header-bottom-left .drop-choices .sub-filter {
										margin: 8px;
										height: 30px;
										width: calc(100% - 26px);
										padding: 0 4px 0 4px;
										border-radius: 2px;
										outline: none;
										background-color: var(--re-background-secondary);
										border: solid 1px var(--re-border-primary) !important;
										color: var(--re-text-primary);
									}
									#header-bottom-left .drop-choices .sub-filter:hover, #header-bottom-left .drop-choices .sub-filter:focus {
										border-color: var(--re-text-primary) !important;
									}
									#header-bottom-left .drop-choices a.choice {
										height: 24px;
										line-height: 24px;
										padding: 4px 16px;
										color: var(--re-text-primary);
										font-size: 16px;
									}
									#header-bottom-left .drop-choices a.choice:hover {
										background-color: var(--re-hover-overlay);
									}
									.tabmenu {
										display: flex !important;
										align-items: center;
										grid-gap: 8px;
										height: 50px;
										margin: 24px 24px 16px 24px !important;
										width: calc(100% - 50px);
										background-color: var(--re-background-secondary);
										border: solid 1px var(--re-border-primary);
										border-radius: 4px;
										padding: 4px 12px !important;
									}
									.tabmenu li a {
										background-color: transparent !important;
										color: var(--re-text-secondary);
										font-size: 14px !important;
										border: none !important;
										border-radius: 20px;
										text-transform: capitalize;
										padding: 8px 16px !important;
									}
									.tabmenu li a:hover {
										background-color: var(--re-hover-overlay) !important;
									}
									.tabmenu li.selected a {
										background-color: var(--re-background-tertiary) !important;
										color: var(--re-text-highlight) !important;
									}
									.nav-buttons {
										display:flex;
										justify-content: center;
									}
									.nav-buttons .nextprev {
										color: var(--re-text-primary);
									}
									.nav-buttons a {
										padding: 4px 8px !important;
									}
									.sitetable.nestedlisting {
										background-color: var(--re-background-secondary);
										border-radius: 2px;
										padding: 8px;
									}
									.usertext-edit textarea {
										background-color: var(--re-background-secondary);
										border: solid 1px var(--re-border-primary);
										border-radius: 4px;
										color: var(--re-text-primary);
										outline: none;
									}
									.usertext-edit textarea:focus {
										border-color: var(--re-text-primary);
									}
									.sitetable.nestedlisting .usertext-body p, .usertext-body li {
										color: var(--re-text-primary);
									}
									.markhelp tbody td {
										color: var(--re-text-primary);
									}
									.markhelp tbody tr:first-child td {
										color: #000;
									}
									.side .titlebox, .side p {
										color: var(--re-text-primary);
									}
									.side h1, .side h2, .side .titlebox a {
										color: var(--re-text-primary);
									}
									.side .titlebox a:hover {
										text-decoration: underline;
									}
									#pref-form {
										background-color: var(--re-background-secondary);
										color: var(--re-text-primary);
									}
									#header-bottom-left span a {
										left: 0;
										top: 0;
										height: 100%;
										max-width: 185px;
										background-size: 100% auto;
										background-position: center;
									}
									.md-container .md {
										background-color: var(--re-background-secondary) !important;
									}
									.md-container .md p {
										color: var(--re-text-primary) !important;
									}
									.commentarea {
										border: solid 1px var(--re-border-primary);
									}
									.footer-parent {
										margin-left: 0 !important;
									}
									#newlink .formtabs-content {
										margin: 0 auto;
									}`;
		document.head.append(styleElement);
	}
}
