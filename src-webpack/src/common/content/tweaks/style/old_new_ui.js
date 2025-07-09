/**
 * Tweaks: Style - Full Width Banner
 * @name fullWidthBanner
 * @description Show the subreddit banner at full viewport width.
 *
 * Applies to: New New UI (2023-)
 */

import { showBannerMessage } from '../../banner_message';

// Get the feature state from browser sync storage
export function loadFullWidthBanner() {
	BROWSER_API.storage.sync.get(['fullWidthBanner'], function (result) {
		if (result.fullWidthBanner) fullWidthBanner(true);
	});
}

// Activate the feature based on Reddit version
export function fullWidthBanner(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableFullWidthBanner();
		} else {
			disableFullWidthBanner();
		}
	}
}

// Enable the feature
function enableFullWidthBanner() {
	if (!document.head.querySelector('style[id="re-full-width-banner"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-full-width-banner';
		styleElement.textContent = `div.community-banner {
										margin-top: 0;
										border-radius: 0;
									}
									shreddit-app[routename="subreddit"] div.subgrid-container,
									shreddit-app[routename="subreddit_wiki"] div.subgrid-container {
										padding: 0 !important;
										max-width: 100% !important;
										width: 100%;
									}
									shreddit-app[routename="subreddit"] div.masthead,
									shreddit-app[routename="subreddit_wiki"] div.masthead {
										max-width: revert;
										padding: revert;
										background-color: var(--re-theme-post-bg);
									}
									shreddit-app[routename="subreddit"] div.masthead > section,
									shreddit-app[routename="subreddit_wiki"] div.masthead > section {
										max-width: min(var(--re-sub-width), var(--re-main-container-width));
										padding: 0 1.5rem;
									}
									html:not(.re-expand-feed-layout) shreddit-app[routename="subreddit"] div.main-container,
									html:not(.re-expand-feed-layout) shreddit-app[routename="subreddit_wiki"] div.main-container {
										justify-content: center;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable the feature
function disableFullWidthBanner() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-full-width-banner"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/**
 * Tweaks: Style - Compact Header Bar, Side Menu & Subreddit Rule List
 * @name compactHeaderSideMenu
 * @description Attempt to make the header bar, side menu and subreddit rule list more compact by removing paddings.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadCompactHeaderSideMenu() {
	BROWSER_API.storage.sync.get(['compactHeaderSideMenu'], function (result) {
		if (result.compactHeaderSideMenu) compactHeaderSideMenu(true);
	});
}

// Activate the feature based on Reddit version
export function compactHeaderSideMenu(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableCompactHeaderSideMenu();
			sessionStorage.setItem('compactHeaderSideMenu', true);
		} else {
			disableCompactHeaderSideMenu();
		}
	}
}

// Enable the feature
function enableCompactHeaderSideMenu() {
	if (!document.head.querySelector('style[id="re-compact-header-side-menu"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-compact-header-side-menu';
		styleElement.textContent = `shreddit-app {
										--shreddit-header-height: 48px !important;
										--shreddit-header-large-height: 48px !important;
									}
									flex-left-nav-container#left-sidebar-container reddit-sidebar-nav#left-sidebar {
										padding-right: 0;
									}
									div#left-sidebar-container,
									flex-left-nav-container div#flex-left-nav-container,
									flex-left-nav-container[expanded="0"].hovered div#flex-left-nav-container {
										border: none;
									}
									reddit-sidebar-nav#left-sidebar {
										padding: 0;
									}
									reddit-sidebar-nav#left-sidebar hr {
										display: none;
										visibility: hidden;
									}
									nav.h-header-large > .justify-stretch > div {
										top: .25rem;
									}
									
									/* COMPACT SUBREDDIT RULE LIST */
									div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] span,
									div#right-sidebar-container div.-mx-xs.-mt-xs > div span {
										align-items: start;
										justify-content: start;
										width: fit-content;
										padding: 0;
										gap: .3rem;
									}
									div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] > li div,
									div#right-sidebar-container div.-mx-xs.-mt-xs > div {
										padding: .35rem 0 0 0 !important;
										margin: 0 .5rem;
									}     
									div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] span:first-of-type > span:first-of-type span::after,
									div#right-sidebar-container div.-mx-xs.-mt-xs div span:first-of-type > span:first-of-type span::after {
										content: "."
									}
									div#right-sidebar-container details:has(faceplate-tracker[source="rules_widget"]) div.ml-xl {
										margin-left: .5rem;
									}
									div#right-sidebar-container details:has(faceplate-tracker[source="rules_widget"]) ul,
									div#right-sidebar-container details:has(faceplate-tracker[source="rules_widget"]) ol {
										padding-left: 1rem;
									}
									div#right-sidebar-container li.group:not(:has(span[avatar=""])) > div {
										padding-left: 0.5rem;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable the feature
function disableCompactHeaderSideMenu() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compact-header-side-menu"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/**
 * Tweaks: Style - Display current page and user info in header
 *
 * @name attachSideMenuHeader
 * @description Bring back Old New UI header style by attaching the side menu to and display user info in the header.
 *
 * Note: similar to Productivity/Show Post Flair, this feature calls Reddit's public JSON APIs to get the logo of the
 * current subreddit and user. All implications of fetching Reddit's APIs with GET requests still apply here.
 *
 * Applies to: New New UI (2023-)
 *
 * @async fetchData
 */

let optOutAttach, e = false;

// Get the feature state from browser sync storage
export function loadAttachSideMenuHeader() {
	BROWSER_API.storage.sync.get(['attachSideMenuHeader', 'optOutAttachSideMenu'], function (result) {
		optOutAttachSideMenu(result.optOutAttachSideMenu);
		attachSideMenuHeader(result.attachSideMenuHeader);
	});
}

// Activate the feature based on Reddit version
export function attachSideMenuHeader(value) {
	if (redditVersion === 'newnew') {
		value ? enableAttachSideMenuHeader() : disableAttachSideMenuHeader();
	}
}

// Set the opt-out state for attaching the side menu to the header (while still keeping page title and user info)
export function optOutAttachSideMenu(value) {
	optOutAttach = value;
}

// Enable the feature
async function enableAttachSideMenuHeader() {
	if (!document.head.querySelector('style[id="re-attach-side-menu-header"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-attach-side-menu-header';
		styleElement.textContent = `
			.re-header-menu {
				width: 256px;
				border: 1px solid transparent;
				border-radius: var(--re-theme-border-radius, 4px);
			}
			.re-header-menu:hover {
				border: 1px solid var(--color-neutral-border-weak);
				cursor: pointer;
			}
			.re-header-menu reddit-sidebar-nav {
				backdrop-filter: blur(20px);
			}
			.re-header-menu:not(:has(reddit-sidebar-nav)) {
				border: none !important;
				cursor: default !important;
			}
			.re-header-menu:has(reddit-sidebar-nav) .re-side-menu-close {
				display: none !important;
			}
			/* Icon of the toggle menu button */
			.re-header-menu > div > :first-child:not(span) {
				position: static;
				height: 24px !important;
				width: 24px !important;
				border: none;
				background-color: transparent;
				object-fit: contain;
			}
			.re-header-menu > div > span {
				font-weight: 600;
			}
			.re-header-menu reddit-sidebar-nav {
				display: none;
				position: absolute;
				top: 44px;
				width: var(--re-side-menu-width, 256px);
				height: fit-content;
				max-height: max(512px, 60vh);
			}
			.re-header-menu reddit-sidebar-nav nav {
				min-height: revert;
			}
			nav.h-header-large > div.justify-stretch > div {
				position: static;
			}
			nav.h-header-large > div.justify-stretch > div > div {
				width: 100%;
				margin: 0;
			}
			nav.h-header-large > div.justify-stretch reddit-search-large {
				max-width: initial;
			}
			nav.h-header-large > div:nth-child(2) div {
				top: 0.25rem !important;
			}
			nav.h-header-large > div.justify-end {
				padding-left: .75rem;
			}
			nav.h-header-large > div.justify-end > div:first-child {
				gap: .25rem;
			}
			nav.h-header-large > div.justify-end > .w-\\[40px\\] {
				width: initial;
			}
			#create-post {
				padding: var(--rem10);
			}
			#create-post > span > span:first-child {
				margin-right: 0;
			}
			#create-post > span > span + span {
				display: none;
			}
			button#expand-user-drawer-button {
				width: initial;
				max-width: 220px;
				padding: 0 .25rem;
			}
			button#expand-user-drawer-button::after {
				content: '▼';
				margin-left: .5rem;
			}
			div#re-user-info {
				width: 156px;
				line-height: 1.5;
				text-align: left;
			}
			@media (max-width: 1199px) {
				.re-header-menu,
				div#re-user-info {
					display: none;
				}
			}
			comment-composer-host > faceplate-form::before {
				content: "Comment as " var(--re-username);
				display: block;
				margin-bottom: .25rem;
				font-size: small;
			}`;
		if (!optOutAttach) {
			styleElement.textContent += `
				.re-header-menu {
					width: var(--re-side-menu-width, 256px);
				}
				flex-left-nav-container#left-sidebar-container {
					display: none;
				}
				@media (min-width: 1200px) {
					div.grid-container:not(.grid-full),
					div.grid-container:not(.grid-full).flex-nav-collapsed {
						--flex-nav-width: 0 !important;
						grid-template-columns: 0 1fr;
					}
				}`;
		}
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	try {
		await Promise.all([attachUserInfo(), attachPageTitle()]);
	} catch (e) {
		// Log the error to the developer console
		console.error('[RedditEnhancer] Error attaching user info and page title in header: ', e);
	}
}

// Disable the feature
function disableAttachSideMenuHeader() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-attach-side-menu-header"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	if (document.querySelector('.re-header-menu')) document.querySelector('.re-header-menu').remove();
	if (document.querySelector('#re-user-info')) document.querySelector('#re-user-info').remove();
}

// Display username and karma within the toggle user drawer button
async function attachUserInfo() {
	let loggedIn = document.querySelector('shreddit-app')?.getAttribute('user-logged-in') === 'true';
	if (!loggedIn) return;

	document.querySelector('#re-user-info')?.remove();
	const user = (await BROWSER_API.runtime.sendMessage({ actions: [{ action: 'fetchData', url: 'https://www.reddit.com/api/me.json' }] }))?.data;
	if (user && user.name && user.total_karma && document.querySelector('button#expand-user-drawer-button')) {
		const a = Object.assign(document.createElement('div'), {
			id: 're-user-info',
			innerHTML: `<div class="font-semibold overflow-hidden text-ellipsis">${user.name}</div><span class="text-neutral-content-weak">${formatNumber(user.total_karma)} karma</span>`,
			className: 'inline-block ml-2xs text-12 font-normal',
		});
		document.querySelector('button#expand-user-drawer-button').appendChild(a);
		document.documentElement.style.setProperty('--re-username', "'" + user.name + "'");
	} else {
		throw new Error('[RedditEnhancer] attachSideMenuHeader: Unable to fetch user data.');
	}
}

// Attach the side menu to the header
async function attachPageTitle() {
	const currentPage = document.querySelector('shreddit-app').getAttribute('routename');
	let logo = '', title = '', data;

	try {
		switch (currentPage) {
			case 'frontpage':
				title = 'Home';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="home-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.724 6.765-9.08-6.11A1.115 1.115 0 0 0 9.368.647L.276 6.765a.623.623 0 0 0 .35 1.141h.444v10.001c.001.278.113.544.31.74.196.195.462.304.739.303h5.16a.704.704 0 0 0 .706-.707v-4.507c0-.76 1.138-1.475 2.02-1.475.882 0 2.02.715 2.02 1.475v4.507a.71.71 0 0 0 .707.707h5.16c.274-.001.538-.112.732-.307.195-.195.305-.46.306-.736v-10h.445a.618.618 0 0 0 .598-.44.625.625 0 0 0-.25-.702Z"></path></svg>`;
				break;
			case 'popular':
				title = 'Popular';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="popular-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm4 13.791L10.812 10.6l-6.245 6.247a8.92 8.92 0 0 1-1.414-1.414L9.4 9.188 6.209 6h7.778l.013.638v7.153Z"></path></svg>`;
				break;
			case 'all':
				title = 'All';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="all-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0ZM7 18.209a8.664 8.664 0 0 1-1.5-.719V14H7v4.209Zm4 .479c-.332.04-.666.06-1 .062-.169 0-.334-.016-.5-.025V10H11v8.688Zm4-1.517c-.471.33-.973.612-1.5.843V6H15v11.171Z"></path></svg>`;
				break;
			case 'explore-page':
				title = 'Explore';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="communities-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17.806 16.25a10 10 0 1 0-1.403 1.43l2.187 2.15 1.403-1.429-2.187-2.151ZM13.133 6.04a2.453 2.453 0 1 1 0 4.905 2.453 2.453 0 0 1 0-4.905Zm-6.056 0a2.453 2.453 0 1 1 0 4.905 2.453 2.453 0 0 1 0-4.905ZM11.733 17.8a7.982 7.982 0 0 1-9.018-4.504 3.507 3.507 0 0 1 2.898-1.49h2.495a3.574 3.574 0 0 1 3.623 3.515l.002 2.48Zm1.503-.493v-1.986a4.946 4.946 0 0 0-1.477-3.515h2.247a3.628 3.628 0 0 1 3.139 1.796 8.065 8.065 0 0 1-3.909 3.705Z"></path></svg>`;
				break;
			case 'mod_queue_all':
				title = 'Mod Queue';
				logo = '';
				break;
			case 'subreddit':
			case 'subreddit_wiki':
			case 'post_page':
			case 'comments_page':
			case 'community_serp':
			case 'post_submit_subreddit':
			case 'wiki_page':
			case 'mod_queue':
				title = 'r/' + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2];
				data = (await BROWSER_API.runtime.sendMessage({
					actions: [{
						action: 'fetchData',
						url: `https://www.reddit.com/${title}/about.json`
					}]
				})).data;
				if (data && (data.community_icon || data.icon_img)) {
					logo = `<img alt="${title} logo" class="rounded-full h-lg w-lg mb-0" src="${data.community_icon ? data.community_icon : data.icon_img}">`;
				} else {
					logo = document.querySelector('.shreddit-subreddit-icon__icon').outerHTML;
				}
				break;
			case 'profile_overview':
			case 'profile_posts':
			case 'profile_comments':
			case 'profile_saved':
			case 'profile_hidden':
			case 'profile_upvoted':
			case 'profile_downvoted':
			case 'profile_post_page':
			case 'profile_post_page_comments':
			case 'profile_serp':
				title = 'u/' + window.location.pathname.match(/^\/(?:u|user)\/([^\/]+)\/?/)[1];
				data = (await BROWSER_API.runtime.sendMessage({
					actions: [{
						action: 'fetchData',
						url: `https://www.reddit.com/user/${window.location.pathname.match(/^\/(?:u|user)\/([^\/]+)\/?/)[1]}/about.json`
					}]
				})).data;
				if (data && (data.snoovatar_img || data.icon_img)) {
					logo = `<img alt="${title} user avatar" class="${data.snoovatar_img ? '' : 'rounded-full'} h-lg w-lg mb-0" 
						src="${data.snoovatar_img ? data.snoovatar_img : data.icon_img}">`;
				} else logo = '';
				break;
			case 'global_serp':
				title = 'Search results';
				logo = '';
				break;
			case 'custom_feed':
				title = document.querySelector('custom-feed-header').getAttribute('display-name');
				logo = `<img alt="${title} icon" class="rounded-sm h-lg w-lg mb-0" src=${document.querySelector('custom-feed-header').getAttribute('icon')}>`;
				break;
			case 'post_submit':
				title = 'Create post';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="add-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.25h-7.25V2a.772.772 0 0 0-.75-.75.772.772 0 0 0-.75.75v7.25H2a.772.772 0 0 0-.75.75c0 .398.352.75.75.75h7.25V18c0 .398.352.75.75.75s.75-.352.75-.75v-7.25H18c.398 0 .75-.352.75-.75a.772.772 0 0 0-.75-.75Z"></path></svg>`;
				break;
			case 'inbox':
				title = 'Notifications';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="notification-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 18h1a2 2 0 0 1-4 0h3Zm8-3.792v.673A1.12 1.12 0 0 1 17.883 16H2.117A1.12 1.12 0 0 1 1 14.881v-.673a3.947 3.947 0 0 1 1.738-3.277A2.706 2.706 0 0 0 3.926 8.7V7.087a6.07 6.07 0 0 1 12.138 0l.01 1.613a2.7 2.7 0 0 0 1.189 2.235A3.949 3.949 0 0 1 19 14.208Zm-1.25 0a2.7 2.7 0 0 0-1.188-2.242A3.956 3.956 0 0 1 14.824 8.7V7.088a4.819 4.819 0 1 0-9.638 0v1.615a3.956 3.956 0 0 1-1.738 3.266 2.7 2.7 0 0 0-1.198 2.239v.542h15.5v-.542Z"></path></svg>`;
				break;
			case 'settings-account-page':
			case 'settings-profile-page':
			case 'settings-privacy-page':
			case 'settings-preferences-page':
			case 'settings-notifications-page':
			case 'settings-email-page':
				title = 'Settings';
				logo = '';
				break;
			case 'guides':
			case 'guides_conversation':
				title = 'Answers';
				logo = `<svg rpl="" fill="currentColor" height="20" icon-name="answers-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16.11 18.57h.03a4.37 4.37 0 0 0 3.23-4.22c0-2.42-1.96-4.38-4.38-4.38h-.02c-.4 0-1.32.06-2.21.57-1.22.71-2 1.97-2.12 3.35v.02c0 .11-.02.21-.02.32 0 1.33-.46 2.57-1.34 3.6-.29.34-.61.63-.97.88H15c.17 0 .35-.01.51-.03.08 0 .15-.02.23-.03.13-.02.25-.05.37-.08Z"></path><path d="M13.17 2.58s-.02-.02-.02-.03a4.374 4.374 0 0 0-5.27-.69 4.38 4.38 0 0 0-1.6 5.98v.02c.21.35.72 1.11 1.62 1.63 1.23.71 2.71.75 3.96.16 0 0 .01 0 .02-.01.1-.05.19-.09.29-.14 1.16-.67 2.46-.88 3.79-.64.43.08.85.22 1.24.4l-3.34-5.79c-.09-.15-.18-.29-.29-.43-.05-.06-.1-.12-.14-.18-.08-.1-.17-.19-.26-.28Z"></path><path d="M.78 13.18v.03c-.49 1.86.29 3.9 2.04 4.91a4.38 4.38 0 0 0 5.98-1.6v-.02c.21-.35.62-1.17.62-2.2 0-1.41-.7-2.72-1.84-3.51 0 0-.01 0-.02-.01-.09-.06-.17-.12-.27-.18a5.511 5.511 0 0 1-2.73-4.24l-3.34 5.79c-.09.15-.16.31-.23.46-.03.07-.06.14-.08.21l-.12.36H.78Z"></path></svg>`;
				break;
			default:
				if (window.location.pathname.includes('/mod/')) {
					title = 'r/' + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2];
					data = (await BROWSER_API.runtime.sendMessage({
						actions: [{
							action: 'fetchData',
							url: `https://www.reddit.com/${title}/about.json`
						}]
					})).data;
					logo = `<img alt="${title} logo" class="rounded-full h-lg w-lg mb-0" src="${data.community_icon}">`;
				} else {
					// Fallback for unknown pages
					title = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
					logo = '';
				}
				break;
		}
	} catch (error) {
		title = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
		logo = '';
	}

	if (document.querySelector('.re-header-menu')) return;
	const sideMenu = Object.assign(document.createElement('nav'), {
		innerHTML: `<div class="flex items-center gap-xs px-xs h-full">${logo}<span>${title}</span></div>`,
		className: 're-header-menu mb-0 h-[40px] mr-md text-neutral-content-strong box-border',
	});

	// Attach the side menu to the header
	if (!optOutAttach) attachSideMenu(sideMenu);

	// Finally, insert the side menu into the header
	const searchBar = document.querySelector('reddit-header-large header > nav.h-header-large > div.justify-stretch');
	if (searchBar) searchBar.parentNode.insertBefore(sideMenu, searchBar);
}

function attachSideMenu(sideMenu) {
	// Clicking the side menu toggle without the side menu will show a warning banner
	const banner = () => showBannerMessage('warning', "Reddit Enhancer wasn't able to attach the side menu. Please refresh the page. Sorry!");
	sideMenu.querySelector('div').addEventListener('click', banner);

	const sideMenu2 = document.querySelector('reddit-sidebar-nav');
	if (sideMenu2) {
		sideMenu2.setAttribute('style', '');
		sideMenu.appendChild(sideMenu2);
		// Display or hide the side menu when clicking on the header button
		sideMenu.querySelector('div').addEventListener('click', (e) => {
			e.stopPropagation();
			sideMenu2.style.display = getComputedStyle(sideMenu2).display === 'none' ? 'block' : 'none';
		});
		// Hide the side menu when clicking outside of it
		window.addEventListener('click', (e) => {
			if (!sideMenu.contains(e.target) || !sideMenu2.contains(e.target)) sideMenu2.style.display = 'none';
		});
		sideMenu.querySelector('div').removeEventListener('click', banner);
	}
}

/**
 * Format numbers to short form, e.g. 1500 to 1.5k.
 *
 * @param num
 * @returns {string|string}
 */
function formatNumber(num) {
	const units = [
		{ value: 1e18, symbol: 'e' },
		{ value: 1e15, symbol: 'p' },
		{ value: 1e12, symbol: 't' },
		{ value: 1e9, symbol: 'g' },
		{ value: 1e6, symbol: 'm' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1, symbol: '' },
	];
	const item = units.find((unit) => num >= unit.value);
	return item ? (num / item.value).toFixed(1).replace(/\.0$/, '') + item.symbol : '0';
}

/**
 * Tweaks: Style - Show subreddit display name in its banner
 *
 * @name subredditDisplayNameBanner
 * @description Duh.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadSubredditDisplayNameBanner() {
	BROWSER_API.storage.sync.get(['subredditDisplayNameBanner'], function (result) {
		if (result.subredditDisplayNameBanner) subredditDisplayNameBanner(true);
	});
}

// Activate the feature based on Reddit version
export function subredditDisplayNameBanner(value) {
	if (redditVersion === 'newnew') {
		if (value && window.innerWidth >= 960) {
			if (!document.head.querySelector('style[id="re-subreddit-display-name-banner"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-subreddit-display-name-banner';
				styleElement.textContent = `div.masthead div:has(> h1)::after {
												content: attr(data-sub-name);
												margin-top: 0.35rem;
												margin-bottom: 10px;
												font-weight: 600;
												color: var(--color-tone-2);
											}
											div.masthead > section {
												top: 0;
                								margin-top: 10px !important;
           									}
           									.masthead .items-end,
           									.masthead section > div > .items-center {
           										align-items: initial;
           									}
           									.masthead .xs\\:h-\\[88px\\] {
           										height: initial;
           									}
           									.masthead span[avatar] {
           										margin-top: -40px;
           									}
           									.masthead h1 {
           										margin-top: initial;
           									}
											community-appearance-entrypoint[target="banner"] {
                								margin-bottom: 3rem !important;
            								}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			const route = document.querySelector('shreddit-app')?.getAttribute('routename');
			if (route === 'subreddit' || route === 'subreddit_wiki') {
				const subredditName = document.querySelector('shreddit-subreddit-header')?.getAttribute('display-name');
				if (subredditName && subredditName.length > 0) {
					document.querySelector('div.masthead h1').textContent = subredditName;
					document.querySelector('div.masthead div:has(> h1)')?.setAttribute('data-sub-name', 'r/' + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2]);
				}
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-subreddit-display-name-banner"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
			const title = document.querySelector('div.masthead h1');
			if (title) title.textContent = 'r/' + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2];
		}
	}
}
