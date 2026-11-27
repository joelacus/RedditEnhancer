/**
 * Tweaks: Style - Modernise Old Reddit
 *
 * @name moderniseOldReddit
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
										--re-link: #7cc0ff;
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
										--re-link: #006aba;
									}

									body {
										background-color: var(--re-background-primary) !important;
									}
									#header {
										position: sticky !important;
										top: 0 !important;
										height: auto !important;
										min-height: 50px;
									}
									.re-header-container {
										display: flex;
										align-items: flex-start;
										justify-content: space-between;
										width: 100%;
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
										margin-bottom: 16px;
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
									#siteTable .thing .tagline,
									#siteTable .thing .flat-list.buttons,
									#siteTable .thing .reportform {
										font-size: 11px;
										line-height: 1.4;
									}
									.side .flairtoggle {
										background-color: transparent !important;
										color: var(--re-text-secondary) !important;
										padding: 2px 0 6px;
									}
									.side .flairtoggle label {
										color: var(--re-text-secondary) !important;
									}
									.side .flairselector {
										background-color: var(--re-background-secondary) !important;
										border-color: var(--re-border-primary) !important;
										color: var(--re-text-primary) !important;
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
									#re-container {
										display: flex;
										align-items: flex-start;
									}
									.content {
										flex: 1 1 auto;
										min-width: 0;
										margin: 0 !important;
										width: auto !important;
									}
									.side {
										flex: 0 0 300px;
										min-width: 0 !important;
										height: fit-content !important;
										margin: 24px 24px 24px 0 !important;
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
										flex: 0 0 120px;
										width: 120px !important;
										max-width: 120px;
									}
									#header-bottom-left {
										display: flex;
										align-items: center;
										gap: 8px;
										flex: 1 1 auto;
										min-width: 0;
										height: auto !important;
										min-height: 50px;
										position: relative !important;
										width: auto !important;
									}
									#header .pagename {
										flex: 0 0 auto;
										max-width: 220px;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
									}
									#header a, #header span {
										color: var(--re-text-primary) !important
									}
									#search {
										position: relative;
										display: flex;
										flex-wrap: wrap;
										align-items: center;
										column-gap: 16px;
										row-gap: 4px;
										flex: 1 1 240px;
										min-width: 200px;
										width: auto !important;
										height: auto !important;
										margin: 0 8px !important;
										padding-right: 0 !important;
										white-space: normal;
									}
									#search input[type="text"] {
										flex: 1 1 100%;
										box-sizing: border-box;
										border-radius: 50px;
										height: 42px;
										width: 100% !important;
										min-width: 0 !important;
										max-width: none !important;
										background-color: var(--re-background-tertiary);
										border: solid 1px var(--re-border-primary) !important;
										color: var(--re-text-primary) !important;
										outline: none;
										font-family: Verdana, sans-serif !important;
										font-size: 14px !important;
										padding: 0 44px 0 16px !important;
									}
									#search input[type="text"]::placeholder {
										color: var(--re-text-muted);
										opacity: 1;
										text-transform: capitalize;
									}
									#search input[type="text"]:hover, #search input[type="text"]:focus {
										border-color: var(--re-link) !important;
									}
									body.re-modernise #search input[type="submit"],
									body.re-modernise #search .search-submit-button {
										position: absolute !important;
										top: 5px !important;
										right: 5px !important;
										width: 32px !important;
										height: 32px !important;
										margin: 0 !important;
										padding: 0 !important;
										border: none !important;
										border-radius: 50%;
										background-color: var(--re-text-secondary) !important;
										background-image: none !important;
										box-shadow: none !important;
										cursor: pointer;
										display: block !important;
										-webkit-mask: var(--icon-search) center / 18px no-repeat;
										mask: var(--icon-search) center / 18px no-repeat;
										z-index: 2;
									}
									body.re-modernise #search input[type="submit"]:hover,
									body.re-modernise #search .search-submit-button:hover {
										background-color: var(--re-link) !important;
									}
									#search .search-submit-button .search-icon {
										display: none !important;
									}
									body.re-modernise #search input[type="submit"]:focus-visible,
									body.re-modernise #search .search-submit-button:focus-visible {
										outline: 2px solid var(--re-link);
										outline-offset: 2px;
									}
									body.re-modernise.search-page #header {
										position: relative !important;
									}
									body.re-modernise.search-page #header-bottom-left {
										flex-wrap: wrap;
										padding-bottom: 4px;
									}
									body.re-modernise.search-page #search {
										flex: 1 1 100%;
										margin: 0 !important;
									}
									body.re-modernise.search-page #search > label,
									body.re-modernise.search-page #search > p {
										flex: 0 0 auto;
										margin: 0;
										color: var(--re-text-secondary);
										font-size: 12px;
										line-height: 1.4;
									}
									body.re-modernise.search-page #search > label {
										display: inline-flex;
										align-items: center;
										gap: 6px;
									}
									body.re-modernise.search-page #search > label input[type="checkbox"] {
										margin: 0;
									}
									body.re-modernise.search-page #search > p {
										margin-left: auto;
									}
									body.re-modernise.search-page #search > p a {
										color: var(--re-text-secondary) !important;
										text-decoration: none;
									}
									body.re-modernise.search-page #search > p a:hover {
										color: var(--re-text-primary) !important;
										text-decoration: underline;
									}
									#searchexpando {
										position: absolute;
										top: calc(100% + 6px);
										left: 0;
										width: min(480px, 100%);
										box-sizing: border-box;
										margin: 0 !important;
										padding: 12px 16px !important;
										background-color: var(--re-background-secondary) !important;
										color: var(--re-text-primary) !important;
										border: solid 1px var(--re-border-primary) !important;
										border-radius: 8px;
										box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
										z-index: 1000;
										font-size: 13px;
										line-height: 1.4;
									}
									#searchexpando label {
										display: flex;
										align-items: center;
										gap: 8px;
										margin: 4px 0;
										color: var(--re-text-primary) !important;
										font-size: 13px;
									}
									#searchexpando input[type="checkbox"] {
										margin: 0;
									}
									#searchexpando p,
									#searchexpando dl,
									#searchexpando dd {
										color: var(--re-text-muted) !important;
									}
									#searchexpando dt {
										margin-top: 8px;
										color: var(--re-text-secondary) !important;
									}
									#searchexpando dt i {
										color: var(--re-text-primary) !important;
									}
									#searchexpando code {
										background-color: var(--re-hover-overlay);
										border-radius: 3px;
										padding: 1px 4px;
										color: var(--re-text-primary) !important;
									}
									#searchexpando a,
									#searchexpando #search_hidemore,
									#searchexpando #search_showmore {
										color: var(--re-link) !important;
										text-decoration: none;
									}
									#searchexpando a:hover,
									#searchexpando #search_hidemore:hover,
									#searchexpando #search_showmore:hover {
										text-decoration: underline;
									}
									#header-bottom-right {
										position: relative !important;
										top: 0 !important;
										right: auto !important;
										bottom: auto !important;
										flex: 0 0 auto;
										align-items: center;
										gap: 12px;
										height: 50px;
										min-width: 0;
										box-sizing: border-box;
										padding: 0 16px 0 0 !important;
										border-radius: 0 !important;
										font-size: 14px;
										background-color: transparent !important;
										color: var(--re-text-primary);
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
										flex: 0 1 150px;
										min-width: 120px;
										max-width: 180px;
										line-height: 28px;
										padding: 4px 8px;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
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
										width: auto !important;
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
									.searchpane {
										margin: 16px 24px !important;
										padding: 12px 16px !important;
										background-color: var(--re-background-secondary) !important;
										border: solid 1px var(--re-border-primary) !important;
										border-radius: 8px;
									}
									.searchpane h4 {
										margin: 0 !important;
										color: var(--re-text-secondary) !important;
										font-size: 12px !important;
										font-weight: 600;
										letter-spacing: 0.08em;
										text-transform: uppercase;
									}
									.search-result-listing {
										font-size: 13px !important;
									}
									.search-result-listing:not(:has(.search-result)):has(+ .search-result-listing .search-result) {
										display: none !important;
									}
									.search-result-group {
										max-width: none !important;
										min-width: 0 !important;
										width: auto !important;
										padding: 0 24px 24px !important;
										font-size: 13px !important;
									}
									.search-result-group-header {
										margin: 16px 0 !important;
										border-bottom: solid 1px var(--re-border-primary) !important;
										color: var(--re-text-secondary) !important;
										font-size: 13px !important;
									}
									.search-result-group-header .search-menu {
										color: var(--re-text-secondary) !important;
										font-size: 13px !important;
									}
									.search-result-group-header .search-menu a {
										color: var(--re-text-secondary);
									}
									.search-result-group-header .search-menu a:hover,
									.search-result-group-header .search-menu .selected {
										color: var(--re-link);
									}
									.search-result {
										margin: 10px 0 14px !important;
										padding: 12px !important;
										border: solid 1px var(--re-border-primary) !important;
										border-radius: 8px;
										background-color: var(--re-background-secondary) !important;
										color: var(--re-text-primary) !important;
										font-size: 13px !important;
									}
									.search-result:hover {
										border-color: var(--re-text-secondary) !important;
									}
									.search-result .thumbnail {
										margin-right: 12px;
									}
									.search-result .search-title,
									.search-result .search-link {
										color: var(--re-link) !important;
										font-weight: 600;
									}
									.search-result .search-title:visited,
									.search-result .search-link:visited {
										color: var(--re-p-link-visited, #551a8b) !important;
									}
									.search-result .search-title:hover,
									.search-result .search-link:hover {
										text-decoration: underline;
									}
									.search-result .search-result-meta,
									.search-result .search-result-footer,
									.search-result .search-time,
									.search-result .search-score {
										color: var(--re-text-muted) !important;
										font-size: 12px !important;
									}
									.search-result .search-result-meta a {
										color: var(--re-link) !important;
									}
									.search-result .search-expando-button-label-collapsed,
									.search-result .search-expando-button-label-expanded {
										color: var(--re-link) !important;
									}
									.search-result-body {
										padding-right: 0 !important;
										color: var(--re-text-primary) !important;
										font-size: 13px !important;
										line-height: 1.45 !important;
									}
									.search-result-body p {
										color: var(--re-text-primary) !important;
										font-size: 13px !important;
										line-height: 1.45 !important;
									}
									.search-result mark {
										background-color: var(--re-p-yellow, #f9e2af) !important;
										color: #111 !important;
										border-radius: 2px;
										padding: 0 2px;
									}
									.search-result-group footer .info,
									.search-result-group footer .nav-buttons {
										color: var(--re-text-muted) !important;
										font-size: 13px;
									}
									.search-result-group footer .nav-buttons .nextprev a {
										background-color: var(--re-background-tertiary) !important;
										border: solid 1px var(--re-border-primary) !important;
										border-radius: 4px;
										color: var(--re-text-primary) !important;
										padding: 4px 10px;
									}
									@media (max-width: 1000px) {
										#re-container {
											flex-wrap: wrap;
										}
										.content {
											flex-basis: 100%;
										}
										.side {
											flex: 1 1 100%;
											width: auto !important;
											margin: 0 24px 24px !important;
										}
										#search {
											min-width: 160px;
											margin-left: 8px !important;
											margin-right: 8px !important;
										}
										#header-bottom-left .dropdown {
											flex-basis: 120px;
											min-width: 110px;
										}
										#header-bottom-right {
											gap: 8px;
											padding-right: 8px !important;
										}
										#header .pagename {
											max-width: 160px;
										}
									}
									@media (max-width: 800px) {
										.re-header-container {
											flex-wrap: wrap;
										}
										#header-bottom-left {
											flex-basis: 100%;
											flex-wrap: wrap;
											padding-bottom: 4px;
										}
										#header-bottom-right {
											flex-basis: 100%;
											height: auto;
											justify-content: flex-end;
											padding: 0 8px 8px !important;
										}
										#search {
											flex: 1 1 100%;
											margin: 0 !important;
										}
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
