/**
 * Tweaks: Hide Elements - Hide The Sidebars
 *
 * @description Hide the sidebars for different pages.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */

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
					if (redditVersion === 'newnew') {
						enableHideSubSidebarRV3();
					}
				} else {
					if (redditVersion === 'newnew') {
						disableHideSubSidebarRV3();
					}
				}
			} else if (result.hideSubSidebarExceptionMode === 'blacklist') {
				// hide sidebar globally except listed sub reddits
				const list = result.hideSubSidebarExceptionSubList.replaceAll(' ', '').split(',');
				if (!list.some((sub) => link.includes('r/' + sub + '/')) && result.hideSubSidebar === true) {
					if (redditVersion === 'newnew') {
						enableHideSubSidebarRV3();
					}
				} else {
					if (redditVersion === 'newnew') {
						disableHideSubSidebarRV3();
					}
				}
			}
		} else {
			if (result.hideSubSidebar === true) {
				// hide sidebar for all sub reddits
				if (redditVersion === 'newnew') {
					enableHideSubSidebarRV3();
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

/* === Enable/Disable The Features === */

/* = Hide Home Sidebar = */
export function hideHomeSidebar(value) {
	const link = window.location.href;
	if (redditVersion === 'old') {
		if (value) {
			if (link.indexOf('old.reddit.com/r/') <= 0) {
				enableHideHomeSidebarOld();
			}
		} else {
			disableHideHomeSidebarOld();
		}
	}
	if (redditVersion === 'newnew') {
		if (value) {
			enableHideHomeSidebarRV3();
		} else {
			disableHideHomeSidebarRV3();
		}
	}
}

// Enable Hide Home Sidebar - RV1
function enableHideHomeSidebarOld() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-home-sidebar';
	styleElement.textContent = `.side {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Home Sidebar - RV1
function disableHideHomeSidebarOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-home-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Enable Hide Home Sidebar - RV3
export function enableHideHomeSidebarRV3() {
	if (!document.head.querySelector('style[id="re-hide-home-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-home-sidebar';
		styleElement.textContent = `shreddit-app[routename="frontpage"] #right-sidebar-container,
									shreddit-app[routename="all"] #right-sidebar-container,
									shreddit-app[routename="popular"] #right-sidebar-container,
									shreddit-app[routename="inbox"] #right-sidebar-container {
										display: none;
										visibility: hidden;
									}
									shreddit-app[routename="frontpage"] div.main-container,
									shreddit-app[routename="all"] div.main-container,
									shreddit-app[routename="popular"] div.main-container,
									shreddit-app[routename="inbox"] div.main-container {
										grid-template-columns: 1fr;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelector('html').classList.add('re-hide-home-sidebar');
	document.documentElement.style.setProperty('--re-home-sidebar-width', 0);
}

// Disable Hide Home Sidebar - RV3
export function disableHideHomeSidebarRV3() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-home-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-home-sidebar');
	document.documentElement.style.removeProperty('--re-home-sidebar-width');
}

/* = Hide Sub Sidebar = */
export function hideSubSidebar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSubSidebarRV3();
	} else {
		disableHideSubSidebarRV3();
	}
}

// Enable Hide Sub Sidebar - RV3
export function enableHideSubSidebarRV3() {
	if (!document.head.querySelector('style[id="re-hide-sub-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-sub-sidebar';
		styleElement.textContent = `#right-sidebar-container:has([router-name="subreddit"]) {
										display: none !important;
									}
									shreddit-app[routename="subreddit"] div.main-container {
										grid-template-columns: 1fr;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelector('html').classList.add('re-hide-sub-sidebar');
	document.documentElement.style.setProperty('--re-sub-sidebar-width', 0);
}

// Disable Hide Sub Sidebar - RV3
export function disableHideSubSidebarRV3() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-sub-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-sub-sidebar');
	document.documentElement.style.removeProperty('--re-sub-sidebar-width');
}

/* = Hide Post Sidebar = */
export function hidePostSidebar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHidePostSidebarRV3();
	} else {
		disableHidePostSidebarRV3();
	}
}

// Enable Hide Post Sidebar - RV3
function enableHidePostSidebarRV3() {
	if (!document.head.querySelector('style[id="re-hide-post-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-sidebar';
		styleElement.textContent = `:root {
										--re-hide-sidebar-gap-multiplyer: 1;
									}
									shreddit-app[routename="post_page"] #right-sidebar-container,
									shreddit-app[routename="comments_page"] #right-sidebar-container,
									shreddit-app[routename="profile_post_page"] #right-sidebar-container,
									shreddit-app[routename="profile_post_page_comments"] #right-sidebar-container,
									shreddit-app[routename="post_stats"] #right-sidebar-container,
									shreddit-app[routename="CommentStats"] #right-sidebar-container {
										display: none !important;
									}
									shreddit-app[routename="post_page"] div.main-container,
									shreddit-app[routename="comments_page"] div.main-container,
									shreddit-app[routename="profile_post_page"] div.main-container,
									shreddit-app[routename="profile_post_page_comments"] div.main-container,
									shreddit-app[routename="post_stats"] div.main-container,
									shreddit-app[routename="CommentStats"] div.main-container {
										grid-template-columns: 1fr;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelector('html').classList.add('re-hide-post-sidebar');
	document.documentElement.style.setProperty('--re-post-sidebar-width', 0);
}

// Disable Hide Post Sidebar - RV3
function disableHidePostSidebarRV3() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-post-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-post-sidebar');
	document.documentElement.style.removeProperty('--re-post-sidebar-width');
}

/* = Hide User Sidebar = */
export function hideUserSidebar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideUserSidebarRV3();
	} else {
		disableHideUserSidebarAll();
	}
}

// Enable Hide User Sidebar - RV3
export function enableHideUserSidebarRV3() {
	if (!document.head.querySelector('style[id="re-hide-user-sidebar"]')) {
		document.querySelector('html').classList.add('re-hide-profile-sidebar');
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-user-sidebar';
		styleElement.textContent = `#right-sidebar-container:has([source="profile"]) {
										display: none !important;
									}
									shreddit-app[routename="profile_overview"] div.main-container,
									shreddit-app[routename="profile_posts"] div.main-container,
									shreddit-app[routename="profile_comments"] div.main-container,
									shreddit-app[routename="profile_saved"] div.main-container,
									shreddit-app[routename="profile_hidden"] div.main-container,
									shreddit-app[routename="profile_upvoted"] div.main-container,
									shreddit-app[routename="profile_downvoted"] div.main-container {
										grid-template-columns: 1fr;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.documentElement.style.setProperty('--re-user-profile-sidebar-width', 0);
}

// Disable Hide User Sidebar - All
export function disableHideUserSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-user-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-profile-sidebar');
	document.documentElement.style.removeProperty('--re-user-profile-sidebar-width');
}

/* = Hide Related Posts Section in Sidebar = */
export function hideRelatedPostsSection(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideRelatedPostsSectionRV3();
	} else {
		disableHideRelatedPostsSectionAll();
	}
}

// Enable Hide Related Posts Section in Sidebar - RV3
export function enableHideRelatedPostsSectionRV3() {
	if (!document.head.querySelector('style[id="re-hide-related-posts-section"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-related-posts-section';
		styleElement.textContent = `#pdp-right-rail-topics {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Related Posts Section in Sidebar - All
export function disableHideRelatedPostsSectionAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-related-posts-section"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Search Sidebar = */
export function hideSearchSidebar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSearchSidebarNewNew();
	} else {
		disableHideSearchSidebarAll();
	}
}

// Enable Hide Search Sidebar - RV3
export function enableHideSearchSidebarNewNew() {
	if (!document.head.querySelector('style[id="re-hide-search-sidebar"]')) {
		document.querySelector('html').classList.add('re-hide-search-sidebar');
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-search-sidebar';
		styleElement.textContent = `[pagetype="search_results"] #right-sidebar-container {
										display: none !important;
									}
									shreddit-app[pagetype="search_results"] div.main-container {
										grid-template-columns: 1fr;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.documentElement.style.setProperty('--re-search-sidebar-width', 0);
}

// Disable Hide Search Sidebar - All
export function disableHideSearchSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-search-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('html').classList.remove('re-hide-search-sidebar');
	document.documentElement.style.removeProperty('--re-search-sidebar-width');
}

/* = Hide Custom Feed Sidebar = */
export function hideCustomFeedSidebar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideCustomFeedSidebarRV3();
	} else {
		disableHideCustomFeedSidebarAll();
	}
}

// Enable Hide Custom Feed Sidebar - RV3
function enableHideCustomFeedSidebarRV3() {
	if (!document.head.querySelector('style[id="re-hide-custom-feed-sidebar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-custom-feed-sidebar';
		styleElement.textContent = `shreddit-app[routename="custom_feed"] #right-sidebar-container {
										display: none;
										visibility: hidden;
									}
									shreddit-app[routename="custom_feed"] div.main-container {
										grid-template-columns: 1fr;
									}
									:root {
										--re-custom-feed-sidebar-width: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Custom Feed Sidebar - All
function disableHideCustomFeedSidebarAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-custom-feed-sidebar"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
