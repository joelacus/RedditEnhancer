// Hide Sidebars

// Hide Home Sidebar
export function hideHomeSidebar(value) {
	const link = window.location.href;
	if (redditVersion === 'old') {
		if (value === true) {
			if (link.indexOf('old.reddit.com/r/') <= 0) {
				enableHideHomeSidebarOld();
			}
		} else if (value === false) {
			disableHideHomeSidebarOld();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			enableHideHomeSidebarNew();
		} else if (value === false) {
			disableHideHomeSidebarNew();
		}
	}
}

// Function - Enable Hide Home Sidebar - Old
function enableHideHomeSidebarOld() {
	if (document.querySelector('.side')) {
		document.querySelector('.side').classList.add('re-hide');
	}
}

// Function - Disable Home Sidebar - Old
function disableHideHomeSidebarOld() {
	if (document.querySelector('.side')) {
		document.querySelector('.side').classList.remove('re-hide');
	}
}

// Function - Enable Hide Home Sidebar - New
function enableHideHomeSidebarNew() {
	if (useLegacy) {
		document.querySelector('.re-sidebar-home').parentNode.classList.add('re-hide');
	} else {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-home-sidebar';
		styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child div:has([data-testid="frontpage-sidebar"]) {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Home Sidebar - New
function disableHideHomeSidebarNew() {
	if (useLegacy) {
		document.querySelector('.re-sidebar-home').parentNode.classList.remove('re-hide');
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-home-sidebar"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Hide Sub Sidebar
export function hideSubSidebar(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHideSubSidebarNew();
		} else if (value === false) {
			disableHideSubSidebarNew();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSubSidebarNewNew();
		} else if (value === false) {
			disableHideSubSidebarNewNew();
		}
	}
}

// Function - Enable Hide Sub Sidebar - New
export function enableHideSubSidebarNew() {
	if (useLegacy) {
		document.querySelector('.re-sidebar-sub').parentNode.classList.add('re-hide');
	} else {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-sub-sidebar';
		styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :last-child:has([data-testid="subreddit-sidebar"]) {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Sub Sidebar - New
export function disableHideSubSidebarNew() {
	if (useLegacy) {
		document.querySelector('.re-sidebar-sub').parentNode.classList.remove('re-hide');
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-sub-sidebar"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Function - Enable Hide Sub Sidebar - New New
export function enableHideSubSidebarNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-sub-sidebar';
	styleElement.textContent = `#right-sidebar-container:has([router-name="subreddit"]) {
									display: none !important;
								}
								shreddit-app[routename="subreddit"] #main-content {
									grid-column: span 14/span 14 !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Sub Sidebar - New New
export function disableHideSubSidebarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-sub-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Hide Post Sidebar
export function hidePostSidebar(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHidePostSidebarNew();
		} else if (value === false) {
			disableHidePostSidebarNew();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHidePostSidebarNewNew();
		} else if (value === false) {
			disableHidePostSidebarNewNew();
		}
	}
}

// Function - Enable Hide Post Sidebar - New
function enableHidePostSidebarNew() {
	if (useLegacy) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-sidebar';
		styleElement.textContent = `.re-sidebar-post {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-sidebar';
		styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :last-child:has([id^="IdCard--Subscribers"]):has(> :not([data-testid="subreddit-sidebar"])) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Post Sidebar - New
function disableHidePostSidebarNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Hide Post Sidebar - New New
function enableHidePostSidebarNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-post-sidebar';
	styleElement.textContent = `:root {
									--re-hide-sidebar-gap-multiplyer: 1;
								}
								#right-sidebar-container:has([router-name="post_page"]) {
									display: none !important;
								}
								shreddit-app[routename="post_page"] #main-content {
									grid-column-end: 19 !important;
								}
								shreddit-app[routename="post_page"] {
									margin-right: 1.3rem;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide  Post Sidebar - New New
function disableHidePostSidebarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Hide Post Overlay Sidebar
export function hidePostOverlaySidebar(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHidePostOverlaySidebarNew();
		} else if (value === false) {
			disableHidePostOverlaySidebarNew();
		}
	}
}

// Function - Enable Hide Post Overlay Sidebar - New
function enableHidePostOverlaySidebarNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-post-overlay-sidebar';
	styleElement.textContent = `#overlayScrollContainer > :nth-child(2) > :last-child {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Post Overlay Sidebar - New
function disableHidePostOverlaySidebarNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-overlay-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Hide User Sidebar
export function hideUserSidebar(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			if (useLegacy) {
				enableHideUserSidebarNewLegacy();
			} else {
				enableHideUserSidebarNew();
			}
		} else if (value === false) {
			if (useLegacy) {
				disableHideUserSidebarNewLegacy();
			} else {
				disableHideUserSidebarAll();
			}
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideUserSidebarNewNew();
		} else if (value === false) {
			disableHideUserSidebarAll();
		}
	}
}

// Function - Enable Hide User Sidebar - New - Legacy
export function enableHideUserSidebarNewLegacy() {
	if (document.querySelector('.re-sidebar-user')) {
		document.querySelector('.re-sidebar-user').classList.add('re-hide');
	}
}

// Function - Disable Hide User Sidebar - New - Legacy
export function disableHideUserSidebarNewLegacy() {
	if (document.querySelector('.re-sidebar-user')) {
		document.querySelector('.re-sidebar-user').classList.remove('re-hide');
	}
}

// Function - Enable Hide User Sidebar - New
export function enableHideUserSidebarNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-user-sidebar';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div:has([href="/settings/profile"]) > :last-child > :last-child {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide User Sidebar - New New
export function enableHideUserSidebarNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-user-sidebar';
	styleElement.textContent = `#right-sidebar-container:has([source="profile"]) {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide User Sidebar - All
export function disableHideUserSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-user-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Hide Related Posts Section in Sidebar
export function hideRelatedPostsSection(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideRelatedPostsSectionNewNew();
		} else if (value === false) {
			disableHideRelatedPostsSectionNewNew();
		}
	}
}

// Function - Enable Hide Related Posts Section in Sidebar - New New
export function enableHideRelatedPostsSectionNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-related-posts-section';
	styleElement.textContent = `#pdp-right-rail-topics {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Related Posts Section in Sidebar - New New
export function disableHideRelatedPostsSectionNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-related-posts-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
