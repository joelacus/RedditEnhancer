/* ===== Tweaks - Hide - Search Page Sidebar NSFW Users ===== */

/* === Triggered On Page Load === */
export function loadHideSearchSidebarNsfwUsers() {
	BROWSER_API.storage.sync.get(['hideSearchSidebarNsfwUsers'], function (result) {
		if (result.hideSearchSidebarNsfwUsers) hideSearchSidebarNsfwUsers(true);
	});
}

/* === Main Function === */
export function hideSearchSidebarNsfwUsers(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideSearchSidebarNsfwUsersNewNew();
		} else if (value === false) {
			disableHideSearchSidebarNsfwUsersAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide NSFW Posts - New New
function enableHideSearchSidebarNsfwUsersNewNew() {
	if (!document.head.querySelector('style[id="re-hide-search-page-sidebar-nsfw-users"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-search-page-sidebar-nsfw-users';
		styleElement.textContent = `[noun="people"][data-faceplate-tracking-context*='"nsfw":true'] {
                                        display: none !important;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide NSFW Posts - All
function disableHideSearchSidebarNsfwUsersAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-search-page-sidebar-nsfw-users"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
