/* ===== Tweaks - Hide - Side Menu Sections ===== */

/* === Triggered On Page Load === */
export function loadHideSideMenuSections() {
	// Hide Top Section
	BROWSER_API.storage.sync.get(
		['hideSideMenuTopSection', 'hideSideMenuModerationSection', 'hideSideMenuRecentSection', 'hideSideMenuCommunitiesSection', 'hideSideMenuResourcesSection'],
		function (result) {
			hideSideMenuTopSection(result.hideSideMenuTopSection);
			hideSideMenuModerationSection(result.hideSideMenuModerationSection);
			hideSideMenuRecentSection(result.hideSideMenuRecentSection);
			hideSideMenuCommunitiesSection(result.hideSideMenuCommunitiesSection);
			hideSideMenuResourcesSection(result.hideSideMenuResourcesSection);
		}
	);
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

// Function - Enable Hide the Top Section - New New
function enableHideSideMenuTopSection() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-top-section';
	styleElement.textContent = `shreddit-app reddit-sidebar-nav left-nav-top-section,
                                shreddit-app reddit-sidebar-nav left-nav-top-section + hr {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide the Top Section - New New
function disableHideSideMenuTopSection() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-top-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
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

// Function - Enable Hide the Moderation Section - New New
function enableHideSideMenuModerationSection() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-moderation-section';
	styleElement.textContent = `shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#moderation_section),
                                shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#moderation_section) + hr {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide the Moderation Section - New New
function disableHideSideMenuModerationSection() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-moderation-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
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

// Function - Enable Hide the Recent Section - New New
function enableHideSideMenuRecentSection() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-recent-section';
	styleElement.textContent = `shreddit-app reddit-sidebar-nav reddit-recent-pages,
                                shreddit-app reddit-sidebar-nav reddit-recent-pages + hr {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide the Recent Section - New New
function disableHideSideMenuRecentSection() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-recent-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
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

// Function - Enable Hide the Communities Section - New New
function enableHideSideMenuCommunitiesSection() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-communities-section';
	styleElement.textContent = `shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#communities_section),
                                shreddit-app reddit-sidebar-nav faceplate-expandable-section-helper:has(#communities_section) + hr {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide the Communities Section - New New
function disableHideSideMenuCommunitiesSection() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-communities-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
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

// Function - Enable Hide the Resources Section - New New
function enableHideSideMenuResourcesSection() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-side-menu-resources-section';
	styleElement.textContent = `shreddit-app reddit-sidebar-nav nav nav:has(#RESOURCES),
                                shreddit-app reddit-sidebar-nav nav nav:has(#RESOURCES) + hr {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide the Resources Section - New New
function disableHideSideMenuResourcesSection() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-resources-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
