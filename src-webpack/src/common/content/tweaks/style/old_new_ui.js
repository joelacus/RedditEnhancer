/**
 * Tweaks: Style - Full Width Banner
 * @name fullWidthBanner
 * @description Show the subreddit banner at full viewport width.
 *
 * Applies to: New New UI (2023-)
 */

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

// Disable the feature
function disableFullWidthBanner() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-full-width-banner"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/**
 * Tweaks: Style - Compact Subreddit Rule List
 * @name compactSubRuleList
 * @description Bring back Old New UI-style subreddit rule list in the right sidebar.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadCompactSubRuleList() {
	BROWSER_API.storage.sync.get(['compactSubRuleList'], function (result) {
		if (result.compactSubRuleList) compactSubRuleList(true);
	});
}

// Activate the feature based on Reddit version
export function compactSubRuleList(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableCompactSubRuleList();
		} else {
			disableCompactSubRuleList();
		}
	}
}

// Enable the feature
function enableCompactSubRuleList() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-compact-sub-rule-list';
	styleElement.textContent = `div#right-sidebar-container div.-mx-xs.-mt-xs faceplate-tracker[source="rules_widget"] span,
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

// Disable the feature
function disableCompactSubRuleList() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compact-sub-rule-list"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/**
 * Tweaks: Style - Compact Header Bar & Side Menu
 * @name compactHeaderSideMenu
 * @description Attempt to make the header bar and side menu more compact by removing paddings.
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
		} else {
			disableCompactHeaderSideMenu();
		}
	}
}

// Enable the feature
function enableCompactHeaderSideMenu() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-compact-header-side-menu';
	styleElement.textContent = `shreddit-app {
									--shreddit-header-height: 48px !important;
									--shreddit-header-large-height: 48px !important;
								}
								.pt-md {
									padding-top: initial !important;
								}
								nav.h-header-large > div:nth-child(2) div {
									top: 0.25rem !important;
								}
								div#left-sidebar-container {
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
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable the feature
function disableCompactHeaderSideMenu() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compact-header-side-menu"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
