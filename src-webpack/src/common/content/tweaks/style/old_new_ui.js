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
	if (!document.head.querySelector('style[id="re-compact-sub-rule-list"]')) {
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
}

// Disable the feature
function disableCompactHeaderSideMenu() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-compact-header-side-menu"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/**
 * Tweaks: Style - Add Fading Effects to Text Post Preview
 * @name textPostPreviewFade
 * @description Add fading effects to preview of text posts in feed in Card view.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadTextPostPreviewFade() {
	BROWSER_API.storage.sync.get(['textPostPreviewFade', 'textPostPreviewFadeHeight', 'textPostPreviewMaxHeight'], function (result) {
		if (result.textPostPreviewFade) {
			textPostPreviewFade(true);
			setTextPostPreviewFadeHeight(result.textPostPreviewFadeHeight);
			setTextPostPreviewMaxHeight(result.textPostPreviewMaxHeight);
		}
	});
}

// Activate the feature based on Reddit version
export function textPostPreviewFade(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableTextPostPreviewFade();
		} else {
			disableTextPostPreviewFade();
		}
	}
}

// Enable the feature
function enableTextPostPreviewFade() {
	if (!document.head.querySelector('style[id="re-text-post-preview-fade"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-text-post-preview-fade';
		styleElement.textContent = `shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > p, 
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > p ~ object,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > hr {
									    display: block !important;
									    margin: 0 0 .75rem 0 !important;
									    overflow: inherit;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview p strong {
									    font-weight: 700;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview p em {
									    font-style: italic;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre {
									    padding: 0.5rem 0.75rem;
									    background-color: var(--color-tone-4);
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre::before,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre::after {
									    content: none;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview {
									    max-height: var(--re-text-post-preview-max-height, 250px);
									    mask-image: linear-gradient(180deg, #000 var(--re-text-post-preview-fade, 150px), transparent);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable the feature
function disableTextPostPreviewFade() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-text-post-preview-fade"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Set the custom fade height
export function setTextPostPreviewFadeHeight(value) {
	if (value && value > 0) {
		document.documentElement.style.setProperty('--re-text-post-preview-fade', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-text-post-preview-fade');
	}
}

// Set the custom max height
export function setTextPostPreviewMaxHeight(value) {
	if (value && value > 0) {
		document.documentElement.style.setProperty('--re-text-post-preview-max-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-text-post-preview-max-height');
	}
}