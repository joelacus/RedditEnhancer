/**
 * Tweaks: Hide Elements - Hide Search Page Sidebar NSFW Users
 *
 * @name hideSearchSidebarNsfwUsers
 * @description Hide any NSFW users on the search results page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideSearchSidebarNsfwUsers() {
	BROWSER_API.storage.sync.get(['hideSearchSidebarNsfwUsers'], function (result) {
		if (result.hideSearchSidebarNsfwUsers) hideSearchSidebarNsfwUsers(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideSearchSidebarNsfwUsers(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideSearchSidebarNsfwUsersRV3();
	} else {
		disableHideSearchSidebarNsfwUsersAll();
	}
}

// Enable Hide NSFW Posts - RV3
function enableHideSearchSidebarNsfwUsersRV3() {
	if (!document.head.querySelector('style[id="re-hide-search-page-sidebar-nsfw-users"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-search-page-sidebar-nsfw-users';
		styleElement.textContent = `[noun="people"][data-faceplate-tracking-context*='"nsfw":true'] {
                                        display: none !important;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide NSFW Posts - All
function disableHideSearchSidebarNsfwUsersAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-search-page-sidebar-nsfw-users"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
