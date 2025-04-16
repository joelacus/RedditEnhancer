/**
 * Tweaks: Style - Full Width Banner
 * @name fullWidthBanner
 * @description Show the subreddit banner at full viewport width.
 *
 * Applies to: New New UI (2023-)
 */

import { showBannerMessage } from "../../banner_message";

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
									shreddit-app[routename="subreddit"] div.main-container,
									shreddit-app[routename="subreddit_wiki"] div.main-container {
										width: initial;
										padding: 0 1.1rem;
										gap: 1.1rem;
									}
									html:not(.re-expand-feed-layout) shreddit-app[routename="subreddit"] div.main-container,
									html:not(.re-expand-feed-layout) shreddit-app[routename="subreddit_wiki"] div.main-container {
										justify-content: center;
									}
									/* Community highlight */
									shreddit-gallery-carousel > li {
										padding: 0 !important;
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
									div.subgrid-container {
										padding: 0 1rem;
									}
									div.main-container {
										gap: 1rem;
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

let optOutAttach, e = false, listenerAttached = false;
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

export function optOutAttachSideMenu(value) {
	optOutAttach = value;
}

// Enable the feature
async function enableAttachSideMenuHeader() {
	if (!document.head.querySelector('style[id="re-attach-side-menu-header"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-attach-side-menu-header';
		styleElement.textContent =
			`
			.re-header-menu {
				width: 256px;
				border: 1px solid transparent;
				border-radius: var(--re-theme-border-radius, 4px);
			}
			.re-header-menu:hover {
				border: 1px solid var(--color-neutral-border-weak);
			}
			.re-header-menu > div > :first-child:not(span) {
				position: static;
				height: 24px;
				width: 24px;
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
				height: 60vh;
				min-height: 512px;
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
			div.re-user-info {
				width: 156px;
				line-height: 1.5;
				text-align: left;
			}
			@media (max-width: 1199px) {
				.re-header-menu span,
				div.re-user-info {
					display: none;
				}
			}
			comment-composer-host > faceplate-form::before {
				content: "Comment as " var(--re-username);
				display: block;
				margin-bottom: .25rem;
				font-size: small;
			}
			div.masthead div:has(> h1)::after {
				content: attr(data-sub-name);
				margin-top: 0.35rem;
				margin-bottom: -1.35rem;
				font-weight: 600;
				color: var(--color-tone-2);
			}
			`;
		if (!optOutAttach) styleElement.textContent += `
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
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// Display username and karma within the toggle user drawer button
	if (!document.querySelector('.re-user-info')) {
		let loggedIn = document.querySelector('shreddit-app')?.getAttribute('user-logged-in') === 'true';
		if (loggedIn) {
			const user = await fetchData(`api/me.json`);
			if (user && !document.querySelector('.re-user-info') && document.querySelector('button#expand-user-drawer-button')) {
				const a = Object.assign(document.createElement('div'), {
					innerHTML: `<div class="font-semibold overflow-hidden text-ellipsis">${user.name}</div><span class="text-neutral-content-weak">${formatNumber(user.total_karma)} karma</span>`,
					className: "re-user-info inline-block ml-2xs text-12 font-normal"
				});
				document.querySelector('button#expand-user-drawer-button').appendChild(a);
				document.documentElement.style.setProperty('--re-username', "'" + user.name + "'");
			}
		}
	}

	// Attach the side menu to the header
	const currentPage = document.querySelector('shreddit-app').getAttribute('routename');
	let logo, title, data;
	try {
		switch (currentPage) {
			case 'frontpage':
				title = 'Home';
				logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/?feed=home"] svg').outerHTML;
				break;
			case 'popular':
				title = 'Popular';
				logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/r/popular/"] svg').outerHTML;
				break;
			case 'all':
				title = 'All';
				logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/r/all/"] svg').outerHTML;
				break;
			case 'explore-page':
				title = 'Explore';
				logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/explore/"] svg').outerHTML;
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
				title = "r/" + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2];
				data = await fetchData(`${title}/about.json`);
				if (data.community_icon || data.icon_img) {
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
			case 'profile_serp':
				title = "u/" + window.location.pathname.match(/^\/(?:u|user)\/([^\/]+)\/?/)[1];
				data = await fetchData(`user/${window.location.pathname.match(/^\/(?:u|user)\/([^\/]+)\/?/)[1]}/about.json`);
				logo = `<img alt="${title} user avatar" class="${data.snoovatar_img ? '' : 'rounded-full'} h-lg w-lg mb-0" 
						src="${data.snoovatar_img ? data.snoovatar_img : data.icon_img}">`;
				break;
			case 'global_serp':
				title = 'Search results';
				logo = '';
				break;
			case 'custom_feed':
				title = document.querySelector('custom-feed-header').getAttribute('display-name');
				logo = `<img alt="${title} icon" class="rounded-sm h-lg w-lg mb-0" src=${document.querySelector('custom-feed-header').getAttribute('icon')}>`
				break;
			case 'post_submit':
				title = 'Create post';
				logo = document.querySelector('a#create-post svg').outerHTML;
				break;
			case 'inbox':
				title = 'Notifications';
				logo = document.querySelector('a#notifications-inbox-button svg').outerHTML;
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
			default:
				if (document.querySelector('moderation-tracker#mod-tracker')) {
					title = "r/" + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2];
					data = await fetchData(title);
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

	if (!optOutAttach) {
		const banner = () => {
			showBannerMessage('info', 'Reddit Enhancer wasn\'t able to attach the side menu. Please refresh the page. Sorry!');
		}
		sideMenu.querySelector('div').addEventListener('click', banner);
		const sideMenu2 = document.querySelector('reddit-sidebar-nav');
		if (sideMenu2) {
			sideMenu2.setAttribute('style', '');
			sideMenu.appendChild(sideMenu2);
			sideMenu.querySelector('div').addEventListener('click', (e) => {
				e.stopPropagation();
				sideMenu2.style.display = (getComputedStyle(sideMenu2).display === 'none') ? 'block' : 'none';
			});
			window.addEventListener('click', () => {
				if (!sideMenu.contains(e.target)) sideMenu2.style.display = 'none';
			});
			sideMenu.querySelector('div').removeEventListener('click', banner);
		}
	}

	const searchBar = document.querySelector('reddit-header-large header > nav.h-header-large > div.justify-stretch');
	searchBar.parentNode.insertBefore(sideMenu, searchBar);
}

// Disable the feature
function disableAttachSideMenuHeader() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-attach-side-menu-header"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	if (document.querySelector('.re-header-menu')) document.querySelector('.re-header-menu').remove();
	if (document.querySelector('.re-user-info')) document.querySelector('.re-user-info').remove();
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
		if (value) {
			const route = document.querySelector('shreddit-app')?.getAttribute('routename');
			if (route === 'subreddit' || route === 'subreddit_wiki') {
				const subredditName = document.querySelector('shreddit-subreddit-header')?.getAttribute('display-name');
				if (subredditName && subredditName.length > 0) {
					document.querySelector('div.masthead h1').textContent = subredditName;
					document.querySelector('div.masthead div:has(> h1)')?.setAttribute('data-sub-name',
						"r/" + window.location.pathname.match(/^\/?(r|mod)\/([^/?#]+)/)[2]);
				}
			}
		} else {
			showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the change to take effect.');
		}
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
		{ value: 1E18, symbol: 'e' },
		{ value: 1E15, symbol: 'p' },
		{ value: 1E12, symbol: 't' },
		{ value: 1E9, symbol: 'g' },
		{ value: 1E6, symbol: 'm' },
		{ value: 1E3, symbol: 'k' },
		{ value: 1, symbol: '' }
	];
	const item = units.find(unit => num >= unit.value);
	return item ? (num / item.value).toFixed(1).replace(/\.0$/, '') + item.symbol : '0';
}

async function fetchData(query) {
	const fetch_url = `https://www.reddit.com/${query}`;
	const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
	let response;

	try {
		if (isChrome && window.location.hostname === 'sh.reddit.com') {
			response = await fetch(fetch_url, { method: 'GET', mode: 'no-cors' });
		} else {
			response = await fetch(fetch_url, { method: 'GET' });
		}
		if (!response.ok) { throw response.status; }
		const data = await response.json();
		return data.data;
	} catch (error) {
		// whoa there, pardner!
		if (e) return;

		// Log the error to the developer console
		console.error('[RedditEnhancer] Error getting info for attaching side menu to and display user info in header: ', error);
		e = true;
		throw error;
	}
}