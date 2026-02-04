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

	// seems like new NSFW users are shown in shadow root elements...
	document.querySelectorAll('#right-sidebar-contents search-telemetry-tracker:has([data-testid="search-author"]), #main-content search-telemetry-tracker:has(>div[data-testid="search-author"])').forEach((item) => {
		if (item.querySelector('faceplate-screen-reader-content').shadowRoot) {
			try {
				// Look up post ID from the URL and query post data Reddit's public API.
				const user = item.querySelector('a')?.href.replace('/user/', '');
				const url = `https://www.reddit.com/u/${user}`;
				if (hasKeyWithTrueValue(url, 'over_18')) {
					console.log('is 18+');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});
}

async function hasKeyWithTrueValue(url, keyName) {
	const response = await fetch(url);
	const data = await response.json();

	function searchObject(obj) {
		for (const key in obj) {
			if (key === keyName && obj[key] === 'true') {
				return true;
			}
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				if (searchObject(obj[key])) return true;
			}
		}
		return false;
	}

	return searchObject(data);
}

// Disable Hide NSFW Posts - All
function disableHideSearchSidebarNsfwUsersAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-search-page-sidebar-nsfw-users"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});

	/*document.querySelectorAll('#right-sidebar-contents search-telemetry-tracker:has([data-testid="search-author"])').forEach((item) => {
		if (item.querySelector('faceplate-screen-reader-content').shadowRoot) {
			item.classList.remove('re-hide');
		}
	});*/
}
