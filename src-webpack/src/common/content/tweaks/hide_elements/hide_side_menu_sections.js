/**
 * Tweaks: Hide Elements - Hide Side Menu Sections
 *
 * @description Hide the various sections in the side menu.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideSideMenuSections() {
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection', 'hideSideMenuGamesSection', 'hideSideMenuModerationSection', 'hideSideMenuRecentSection', 'hideSideMenuCommunitiesSection', 'hideSideMenuCustomFeedsSection', 'hideSideMenuResourcesSection', 'hideSideMenuTopicsSection'], function (result) {
		if (result.hideSideMenuTopSection) hideSideMenuTopSection(true);
		if (result.hideSideMenuGamesSection) hideSideMenuGamesSection(true);
		if (result.hideSideMenuModerationSection) hideSideMenuModerationSection(true);
		if (result.hideSideMenuRecentSection) hideSideMenuRecentSection(true);
		if (result.hideSideMenuCommunitiesSection) hideSideMenuCommunitiesSection(true);
		if (result.hideSideMenuCustomFeedsSection) hideSideMenuCustomFeedsSection(true);
		if (result.hideSideMenuResourcesSection) hideSideMenuResourcesSection(true);
		if (result.hideSideMenuTopicsSection) hideSideMenuTopicsSection(true);
	});
}

/* === Enable/Disable The Features === */

/* = Hide Top Section = */
export function hideSideMenuTopSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuTopSection();
	} else {
		disableHideSideMenuTopSection();
	}
}

// Enable Hide the Top Section - RV3
function enableHideSideMenuTopSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-top-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-top-section';
		styleElement.textContent = `shreddit-app reddit-sidebar-nav left-nav-top-section,
									shreddit-app reddit-sidebar-nav left-nav-top-section + hr {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Top Section - RV3
function disableHideSideMenuTopSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-top-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Games Section = */
export function hideSideMenuGamesSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuGamesSection();
	} else {
		disableHideSideMenuGamesSection();
	}
}

// Enable Hide the Games Section - RV3
function enableHideSideMenuGamesSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-games-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-games-section';
		styleElement.textContent = `shreddit-app reddit-sidebar-nav  faceplate-tracker[noun="games_drawer"],
									shreddit-app reddit-sidebar-nav  faceplate-tracker[noun="games_drawer"] + hr {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Games Section - RV3
function disableHideSideMenuGamesSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-games-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Moderation Section = */
export function hideSideMenuModerationSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuModerationSection();
	} else {
		disableHideSideMenuModerationSection();
	}
}

// Enable Hide the Moderation Section - RV3
function enableHideSideMenuModerationSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-moderation-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-moderation-section';
		styleElement.textContent = `shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#moderation_section),
									shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#moderation_section) + hr {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Moderation Section - RV3
function disableHideSideMenuModerationSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-moderation-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Recent Section = */
export function hideSideMenuRecentSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuRecentSection();
	} else {
		disableHideSideMenuRecentSection();
	}
}

// Enable Hide the Recent Section - RV3
function enableHideSideMenuRecentSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-recent-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-recent-section';
		styleElement.textContent = `shreddit-app reddit-sidebar-nav reddit-recent-pages,
									shreddit-app reddit-sidebar-nav reddit-recent-pages + hr,
									shreddit-app reddit-sidebar-nav faceplate-loader[name*="LeftNavRecentCommunities_"],
									shreddit-app reddit-sidebar-nav left-nav-recent-communities {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Recent Section - RV3
function disableHideSideMenuRecentSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-recent-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Custom Feeds Section = */
export function hideSideMenuCustomFeedsSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuCustomFeedsSection();
	} else {
		disableHideSideMenuCustomFeedsSection();
	}
}

// Enable Hide the Custom Feeds Section - RV3
function enableHideSideMenuCustomFeedsSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-custom-feeds-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-custom-feeds-section';
		styleElement.textContent = `shreddit-app faceplate-expandable-section-helper:has(#multireddits_section),
									shreddit-app faceplate-expandable-section-helper:has(#multireddits_section) + hr {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Custom Feeds Section - RV3
function disableHideSideMenuCustomFeedsSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-custom-feeds-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Communities Section = */
export function hideSideMenuCommunitiesSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuCommunitiesSection();
	} else {
		disableHideSideMenuCommunitiesSection();
	}
}

// Enable Hide the Communities Section - RV3
function enableHideSideMenuCommunitiesSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-communities-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-communities-section';
		styleElement.textContent = `shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#communities_section),
									shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#communities_section) + hr {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Communities Section - RV3
function disableHideSideMenuCommunitiesSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-communities-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Resources Section = */
export function hideSideMenuResourcesSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuResourcesSection();
	} else {
		disableHideSideMenuResourcesSection();
	}
}

// Enable Hide the Resources Section - RV3
function enableHideSideMenuResourcesSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-resources-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-resources-section';
		styleElement.textContent = `shreddit-app reddit-sidebar-nav nav nav:has(#RESOURCES),
									shreddit-app reddit-sidebar-nav nav nav:has(#RESOURCES) + hr {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Resources Section - RV3
function disableHideSideMenuResourcesSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-resources-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Topics Section = */
export function hideSideMenuTopicsSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSideMenuTopicsSection();
	} else {
		disableHideSideMenuTopicsSection();
	}
}

// Enable Hide the Topics Section - RV3
function enableHideSideMenuTopicsSection() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-topics-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-topics-section';
		styleElement.textContent = `shreddit-app faceplate-expandable-section-helper:has(#TOPICS) {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide the Topics Section - RV3
function disableHideSideMenuTopicsSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-topics-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
