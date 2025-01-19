/* ===== Tweaks - Hide - Sidebars ===== */

/* === Triggered On Page Load === */

// Hide Home Sidebar
export function loadHideHomeSidebar() {
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		if (result.hideHomeSidebar) hideHomeSidebar(true);
	});
}

// Hide Post Sidebar
export function loadHidePostSidebar() {
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		if (result.hidePostSidebar) hidePostSidebar(true);
	});
}

// Hide Post Overlay Sidebar
export function loadHidePostOverlaySidebar() {
	BROWSER_API.storage.sync.get(['hidePostOverlaySidebar'], function (result) {
		if (result.hidePostOverlaySidebar) hidePostOverlaySidebar(true);
	});
}

// Hide User Sidebar
export function loadHideUserSidebar() {
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		if (result.hideUserSidebar) hideUserSidebar(true);
	});
}

// Hide Search Sidebar
export function loadHideSearchSidebar() {
	BROWSER_API.storage.sync.get(['hideSearchSidebar'], function (result) {
		if (result.hideSearchSidebar) hideSearchSidebar(true);
	});
}

// Hide the Custom Feed sidebar
export function loadHideCustomFeedSidebar() {
	BROWSER_API.storage.sync.get(['hideCustomFeedSidebar'], function (result) {
		if (result.hideCustomFeedSidebar) hideCustomFeedSidebar(true);
	});
}

// Sub Sidebar Exception
export function loadHideSubSidebarException() {
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionsEnable', 'hideSubSidebarExceptionMode', 'hideSubSidebarExceptionSubList', 'hideSubSidebar'], function (result) {
		const link = window.location.href;
		if (result.hideSubSidebarExceptionsEnable == true) {
			// check exception mode
			if (result.hideSubSidebarExceptionMode === 'whitelist') {
				// only hide sub sidebar for listed sub reddits
				const list = result.hideSubSidebarExceptionSubList.replaceAll(' ', '').split(',');
				if (list.some((sub) => link.includes('r/' + sub + '/')) && result.hideSubSidebar === true) {
					if (redditVersion === 'new') {
						enableHideSubSidebarNew();
					} else if (redditVersion === 'newnew') {
						enableHideSubSidebarNewNew();
					}
				} else {
					if (redditVersion === 'new') {
						disableHideSubSidebarNew();
					} else if (redditVersion === 'newnew') {
						disableHideSubSidebarNewNew();
					}
				}
			} else if (result.hideSubSidebarExceptionMode === 'blacklist') {
				// hide sidebar globally except listed sub reddits
				const list = result.hideSubSidebarExceptionSubList.replaceAll(' ', '').split(',');
				if (!list.some((sub) => link.includes('r/' + sub + '/')) && result.hideSubSidebar === true) {
					if (redditVersion === 'new') {
						enableHideSubSidebarNew();
					} else if (redditVersion === 'newnew') {
						enableHideSubSidebarNewNew();
					}
				} else {
					if (redditVersion === 'new') {
						disableHideSubSidebarNew();
					} else if (redditVersion === 'newnew') {
						disableHideSubSidebarNewNew();
					}
				}
			}
		} else {
			if (result.hideSubSidebar === true) {
				// hide sidebar for all sub reddits
				if (redditVersion === 'new') {
					enableHideSubSidebarNew();
				} else if (redditVersion === 'newnew') {
					enableHideSubSidebarNewNew();
				}
			}
		}
	});
}

// Hide Related Posts Section in Sidebar
export function loadHideRelatedPostsSection() {
	BROWSER_API.storage.sync.get(['hideRelatedPostsSection'], function (result) {
		if (result.hideRelatedPostsSection) hideRelatedPostsSection(true);
	});
}

/* === Main Function - Hide Home Sidebar === */

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
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideHomeSidebarNewNew();
		} else if (value === false) {
			disableHideHomeSidebarNewNew();
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

// Function - Enable Hide Home Sidebar - New New
export function enableHideHomeSidebarNewNew() {
	if (!document.head.querySelector('style[id="re-hide-home-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-home-sidebar';
		styleElement.textContent = `shreddit-app[routename="frontpage"] #right-sidebar-container,
									shreddit-app[routename="all"] #right-sidebar-container,
									shreddit-app[routename="popular"] #right-sidebar-container,
									shreddit-app[routename="inbox"] #right-sidebar-container {
										display: none;
									}
									shreddit-app[routename="frontpage"] .main-container,
									shreddit-app[routename="all"] .main-container,
									shreddit-app[routename="popular"] .main-container,
									shreddit-app[routename="inbox"] .main-container {
										grid-gap: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelector('html').classList.add('re-hide-home-sidebar');
	document.documentElement.style.setProperty('--re-home-sidebar-width', 0);
}

// Function - Disable Hide Home Sidebar - New New
export function disableHideHomeSidebarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-sub-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-home-sidebar');
	document.documentElement.style.removeProperty('--re-home-sidebar-width');
}

/* === Main Function - Hide Sub Sidebar === */

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
	if (!document.head.querySelector('style[id="re-hide-sub-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-sub-sidebar';
		styleElement.textContent = `#right-sidebar-container:has([router-name="subreddit"]),
									shreddit-app[pagetype="custom_feed"] #right-sidebar-container {
										display: none !important;
									}
									shreddit-app[routename="subreddit"] .main-container,
									shreddit-app[pagetype="custom_feed"] .main-container {
										grid-gap: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelector('html').classList.add('re-hide-sub-sidebar');
	document.documentElement.style.setProperty('--re-sub-sidebar-width', 0);
}

// Function - Disable Hide Sub Sidebar - New New
export function disableHideSubSidebarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-sub-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-sub-sidebar');
	document.documentElement.style.removeProperty('--re-sub-sidebar-width');
}

/* === Main Function - Hide Post Sidebar === */

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
	if (!document.head.querySelector('style[id="re-hide-post-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-sidebar';
		styleElement.textContent = `:root {
										--re-hide-sidebar-gap-multiplyer: 1;
									}
									#right-sidebar-container:has([router-name="post_page"]),
									[routename="profile_post_page"] #right-sidebar-container,
									[routename="comments_page"] #right-sidebar-container {
										display: none !important;
									}
									shreddit-app[routename="post_page"] #main-content.grid,
									shreddit-app[routename="profile_post_page"] #main-content.grid,
									shreddit-app[routename="profile_post_page"] #main-content.col-start-1 {
										grid-column-end: 19 !important;
									}
									shreddit-app[routename="post_page"] main.grid,
									shreddit-app[routename="profile_post_page"] main.grid,
									shreddit-app[routename="profile_post_page"] main.col-start-1 {
										grid-column-end: 19 !important;
									}
									/*shreddit-app[routename="post_page"],
									shreddit-app[routename="profile_post_page"] {
										margin-right: 1.3rem;
									}*/
									shreddit-app[routename="post_page"] .main-container {
										grid-gap: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelector('html').classList.add('re-hide-post-sidebar');
	document.documentElement.style.setProperty('--re-post-sidebar-width', 0);
}

// Function - Disable Hide Post Sidebar - New New
function disableHidePostSidebarNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-post-sidebar');
	document.documentElement.style.removeProperty('--re-post-sidebar-width');
}

/* === Main Function - Hide Post Overlay Sidebar === */

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
									
									~ div {
										margin: 1.25rem !important;
									}
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

/* === Main Function - Hide User Sidebar === */

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
	if (!document.head.querySelector('style[id="re-hide-user-sidebar"]')) {
		document.querySelector('html').classList.add('re-hide-profile-sidebar');
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-user-sidebar';
		styleElement.textContent = `#right-sidebar-container:has([source="profile"]) {
										display: none !important;
									}
									shreddit-app[routename="profile_post_page"] .main-container,
									shreddit-app[routename="profile_overview"] .main-container,
									shreddit-app[routename="profile_posts"] .main-container,
									shreddit-app[routename="profile_comments"] .main-container,
									shreddit-app[routename="profile_saved"] .main-container,
									shreddit-app[routename="profile_hidden"] .main-container,
									shreddit-app[routename="profile_upvoted"] .main-container,
									shreddit-app[routename="profile_downvoted"] .main-container {
										grid-gap: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.documentElement.style.setProperty('--re-user-profile-sidebar-width', 0);
}

// Function - Disable Hide User Sidebar - All
export function disableHideUserSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-user-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-profile-sidebar');
	document.documentElement.style.removeProperty('--re-user-profile-sidebar-width');
}

/* === Main Function - Hide Related Posts Section in Sidebar === */

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
	if (!document.head.querySelector('style[id="re-hide-related-posts-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-related-posts-section';
		styleElement.textContent = `#pdp-right-rail-topics {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Related Posts Section in Sidebar - New New
export function disableHideRelatedPostsSectionNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-related-posts-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* === Main Function - Hide Search Sidebar === */

export function hideSearchSidebar(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHideSearchSidebarNew();
		} else if (value === false) {
			disableHideSearchSidebarAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSearchSidebarNewNew();
		} else if (value === false) {
			disableHideSearchSidebarAll();
		}
	}
}

// Function - Enable Hide Search Sidebar - New
export function enableHideSearchSidebarNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-search-sidebar';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div > div:has([data-testid="search-results-subnav"]) > div > :last-child > :last-child {
									display: none !important;
								}
								.ListingLayout-backgroundContainer + div > div:has([data-testid="search-results-subnav"]) > div > :last-child > :first-child {
									max-width: 100% !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide Search Sidebar - New New
export function enableHideSearchSidebarNewNew() {
	if (!document.head.querySelector('style[id="re-hide-search-sidebar"]')) {
		document.querySelector('html').classList.add('re-hide-search-sidebar');
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-search-sidebar';
		styleElement.textContent = `[pagetype="search_results"] #right-sidebar-container {
										display: none !important;
									}
									shreddit-app[pagetype="search_results"] .main-container {
										grid-gap: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.documentElement.style.setProperty('--re-search-sidebar-width', 0);
}

// Function - Disable Hide Search Sidebar - All
export function disableHideSearchSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-search-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-search-sidebar');
	document.documentElement.style.removeProperty('--re-search-sidebar-width');
}

/* === Main Function - Hide Custom Feed Sidebar === */

export function hideCustomFeedSidebar(value) {
	if (redditVersion === 'new' && value) {
		enableHideCustomFeedSidebarNew();
	} else if (redditVersion === 'newnew' && value) {
		enableHideCustomFeedSidebarNewNew();
	} else {
		disableHideCustomFeedSidebarAll();
	}
}

// Function - Enable Hide Custom Feed Sidebar - New
function enableHideCustomFeedSidebarNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-custom-feed-sidebar';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div:has(button#MULTIREDDIT_TOP_BAR_OVERFLOW) > :last-child > :last-child {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide Custom Feed Sidebar - New New
function enableHideCustomFeedSidebarNewNew() {
	if (!document.head.querySelector('style[id="re-hide-custom-feed-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-custom-feed-sidebar';
		styleElement.textContent = `shreddit-app[routename="custom_feed"] #right-sidebar-container {
										display: none;
										visibility: hidden;
									}
									shreddit-app[routename="custom_feed"] div.main-container {
										gap: 0;
									}
									shreddit-app[routename="custom_feed"] main.main {
										max-width: 100% !important;
									}
									:root {
										--re-custom-feed-sidebar-width: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Custom Feed Sidebar - New New
function disableHideCustomFeedSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-custom-feed-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
