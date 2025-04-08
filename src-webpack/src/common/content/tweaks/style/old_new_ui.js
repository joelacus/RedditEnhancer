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
			sessionStorage.setItem('compactHeaderSideMenu', value);
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
									.pt-md {
										padding-top: initial !important;
									}
									.re-header-menu svg, .re-header-menu img {
										position: static;
										height: 24px;
									}
									.re-header-menu img {
										width: 24px;
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
										div.re-user-info {
											display: none;
										}
									}
									flex-left-nav-container#left-sidebar-container reddit-sidebar-nav#left-sidebar {
										padding-right: 0;
									}
									div#left-sidebar-container,
									flex-left-nav-container div#flex-left-nav-container,
									flex-left-nav-container[expanded="0"].hovered div#flex-left-nav-container {
										border: none;
									}
									reddit-sidebar-nav {
										top: 48px !important;
									}
									shreddit-app reddit-sidebar-nav#left-sidebar {
										padding: 0;
									}
									shreddit-app reddit-sidebar-nav#left-sidebar hr {
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

export async function postCompactHeaderSideMenu() {
	if (sessionStorage.getItem('compactHeaderSideMenu')) {
		let loggedIn = document.querySelector('shreddit-app')?.getAttribute('user-logged-in') === 'true';
		if (loggedIn && !document.querySelector('.re-user-info')) {
			let username = document.querySelector('shreddit-app > div:last-child')?.shadowRoot
				?.querySelector('rs-current-user').getAttribute('display-name');
			const user = await fetchCurrentUserData(username);
			const a = Object.assign(document.createElement('div'), {
				innerHTML: `<div class="font-semibold overflow-hidden text-ellipsis">${username}</div><span class="text-neutral-content-weak">${formatNumber(user.total_karma)} karma</span>`,
				className: "re-user-info inline-block ml-2xs text-12 font-normal"
			});
			document.querySelector('button#expand-user-drawer-button').appendChild(a);
		}
	}
}

let e = false;
async function fetchCurrentUserData(username) {
	const fetch_url = `https://www.reddit.com/user/${username}/about.json`;
	const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
	let response;

	try {
		// See explanation above
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

		// If this is a known error, display a visual banner message
		if (error instanceof TypeError && error.message === 'NetworkError when attempting to fetch resource.') {
			showBannerMessage('error', 'Cannot retrieve post data and assign flairs as www.reddit.com is currently unreachable.');
		} else if (error === 403) {
			showBannerMessage('error', 'Error retrieving post data and assigning flairs: you seem to be rate-limited by reddit');
		} else {
			showBannerMessage('error', 'Cannot retrieve post data and assign flairs as something wrong happened on Reddit\'s end.');
		}

		// Log the error to the developer console
		console.error('[RedditEnhancer] Error retrieving post data:', error);
		e = true;
		throw error;
	}
}

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

export function headerSideMenu() {
	if (!sessionStorage.getItem('compactHeaderSideMenu') || document.querySelector('.re-header-menu')) return null;

	const currentPage = document.querySelector('shreddit-app').getAttribute('routename');
	let logo, title;

	switch (currentPage) {
		case 'frontpage':
			title = '<span>Home</span>';
			logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/?feed=home"] svg').outerHTML;
			break;
		case 'popular':
			title = '<span>Popular</span>';
			logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/r/popular/"] svg').outerHTML;
			break;
		case 'all':
			title = '<span>All</span>';
			logo = document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('a[href="/r/all/"] svg').outerHTML;
			break;
		case 'subreddit':
		case 'subreddit_wiki':
		case 'post_page':
		case 'comment_page':
			title = window.location.pathname.match(/^\/(r\/[^\/]+)\/?/)[1];
			logo = `<img alt="r/${title} logo" class="rounded-full h-lg w-lg mb-0" src=${document.querySelector('img.shreddit-subreddit-icon__icon').getAttribute('src')}>`;
			break;
		case 'profile_overview':
		case 'profile_posts':
		case 'profile_comments':
		case 'profile_saved':
		case 'profile_hidden':
		case 'profile_upvoted':
		case 'profile_downvoted':
		case 'profile_post_page':
			title = "u/" + window.location.pathname.match(/^\/(?:u|user)\/([^\/]+)\/?/)[1];
			logo = document.querySelector('img[data-testid="profile-icon"]').outerHTML;
			break;
		case 'custom_feed':
			title = document.title;
			logo = `<img alt="" class="rounded-sm h-lg w-lg mb-0" src=${document.querySelector('custom-feed-header')?.shadowRoot?.querySelector('img').getAttribute('src')}>`
			break;
		case 'post_submit':
			title = '<span>Create post</span>';
			logo = document.querySelector('a#create-post svg').outerHTML;
			break;
		case 'inbox':
			title = '<span>Notifications</span>';
			logo = document.querySelector('a#notifications-inbox-button svg').outerHTML;
			break;
		default:
			if (document.querySelector('mod-queue-app')) {
				title = "r/" + window.location.pathname.match(/^\/mod\/([^\/]+)\/?/)[1];
				logo = document.querySelector('img[alt="subreddit icon"]').outerHTML;
			} else {
				title = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
				logo = '';
			}
	}

	const sideMenu = Object.assign(document.createElement('nav'), {
		innerHTML: `${logo}${title}`,
		className: 're-header-menu flex items-center mb-0 h-[40px] mr-md font-semibold text-neutral-content-strong',
		style: `width: 256px; gap: 10px;`,
	});
	const searchBar = document.querySelector('reddit-header-large header > nav.h-header-large > div.justify-stretch');
	searchBar.parentNode.insertBefore(sideMenu, searchBar);
}