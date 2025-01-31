/* ===== Tweaks - Hide - Side Menu Sections ===== */

/* === Triggered On Page Load === */
export function loadHideSideMenuSections() {
	// Hide Top Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection', 'hideSideMenuModerationSection', 'hideSideMenuRecentSection', 'hideSideMenuCommunitiesSection', 'hideSideMenuCustomFeedsSection', 'hideSideMenuResourcesSection', 'hideSideMenuTopicsSection'], function (result) {
		if (result.hideSideMenuTopSection) hideSideMenuTopSection(true);
		if (result.hideSideMenuModerationSection) hideSideMenuModerationSection(true);
		if (result.hideSideMenuRecentSection) hideSideMenuRecentSection(true);
		if (result.hideSideMenuCommunitiesSection) hideSideMenuCommunitiesSection(true);
		if (result.hideSideMenuCustomFeedsSection) hideSideMenuCustomFeedsSection(true);
		if (result.hideSideMenuResourcesSection) hideSideMenuResourcesSection(true);
		if (result.hideSideMenuTopicsSection) hideSideMenuTopicsSection(true);
	});
}

/* === Main Function === */

// Hide Top Section
export function hideSideMenuTopSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuTopSection();
		} else if (value === false) {
			disableHideSideMenuTopSection();
		}
	}
}

// Hide Moderation Section
export function hideSideMenuModerationSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuModerationSection();
		} else if (value === false) {
			disableHideSideMenuModerationSection();
		}
	}
}

// Hide Recent Section
export function hideSideMenuRecentSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuRecentSection();
		} else if (value === false) {
			disableHideSideMenuRecentSection();
		}
	}
}

// Hide Custom Feeds Section
export function hideSideMenuCustomFeedsSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuCustomFeedsSection();
		} else if (value === false) {
			disableHideSideMenuCustomFeedsSection();
		}
	}
}

// Hide Communities Section
export function hideSideMenuCommunitiesSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuCommunitiesSection();
		} else if (value === false) {
			disableHideSideMenuCommunitiesSection();
		}
	}
}

// Hide Resources Section
export function hideSideMenuResourcesSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuResourcesSection();
		} else if (value === false) {
			disableHideSideMenuResourcesSection();
		}
	}
}

// Hide Topics Section
export function hideSideMenuTopicsSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSideMenuTopicsSection();
		} else if (value === false) {
			disableHideSideMenuTopicsSection();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide the Top Section - New New
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

// Function - Disable Hide the Top Section - New New
function disableHideSideMenuTopSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-top-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide the Moderation Section - New New
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

// Function - Disable Hide the Moderation Section - New New
function disableHideSideMenuModerationSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-moderation-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide the Recent Section - New New
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

// Function - Disable Hide the Recent Section - New New
function disableHideSideMenuRecentSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-recent-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide the Custom Feeds Section - New New
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

// Function - Disable Hide the Custom Feeds Section - New New
function disableHideSideMenuCustomFeedsSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-custom-feeds-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide the Communities Section - New New
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

// Function - Disable Hide the Communities Section - New New
function disableHideSideMenuCommunitiesSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-communities-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide the Resources Section - New New
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

// Function - Disable Hide the Resources Section - New New
function disableHideSideMenuResourcesSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-resources-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide the Topics Section - New New
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

// Function - Disable Hide the Topics Section - New New
function disableHideSideMenuTopicsSection() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-topics-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
