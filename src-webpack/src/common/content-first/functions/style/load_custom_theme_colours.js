// Custom Theme Colour Styles

import {
	themeBlur,
	themeCreatePostBackgroundColour,
	themeCreatePostBorderColour,
	themeHeaderBackgroundColour,
	themeHeaderTextColour,
	themePostBackgroundColour,
	themePostBorderColour,
	themePostCommentsTextColour1,
	themePostCommentsTextColour2,
	themePostTextColour1,
	themePostTextColour2,
	themePostVisitedTitleColour,
	themeSidebarBgColour,
	themeSidebarBorderColour,
	themeSidebarTextColour,
	themeSidemenuBgColour,
	themeSidemenuTextColour,
	themeSortBackgroundColour,
	themeSortBorderColour,
	themeSortTextColour,
	themeSortTextColour2,
} from '../../../content/functions/style/override_theme_colours';

// Theme Exception
export function loadCustomTheme() {
	BROWSER_API.storage.sync.get(['themeExceptionsEnable', 'themeExceptionMode', 'themeExceptionSubList'], function (result) {
		const link = window.location.href;
		if (redditVersion === 'new' || redditVersion === 'newnew') {
			if (result.themeExceptionsEnable == true) {
				// check exception mode
				if (result.themeExceptionMode === 'whitelist') {
					// only load theme for listed sub reddits
					const list = result.themeExceptionSubList.replaceAll(' ', '').split(',');
					if (list.some((sub) => link.includes('r/' + sub + '/'))) {
						loadTheme();
					} else {
						removeTheme();
					}
				} else if (result.themeExceptionMode === 'blacklist') {
					// show theme globally except listed sub reddits
					const list = result.themeExceptionSubList.replaceAll(' ', '').split(',');
					if (!list.some((sub) => link.includes('r/' + sub + '/'))) {
						loadTheme();
					} else {
						removeTheme();
					}
				}
			} else {
				// load theme for all sub reddits
				loadTheme();
			}
		}
	});
}

function loadTheme() {
	BROWSER_API.storage.sync.get(['themeBlur'], function (result) {
		if (typeof result.themeBlur != 'undefined') {
			themeBlur(result.themeBlur);
		} else if (typeof result.themeBlur == 'undefined') {
			themeBlur('10px');
		}
	});
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
		themeHeaderBackgroundColour(result.themeHeaderBackgroundColour);
	});
	BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
		themeHeaderTextColour(result.themeHeaderTextColour);
	});
	BROWSER_API.storage.sync.get(['themeSortBackgroundColour'], function (result) {
		themeSortBackgroundColour(result.themeSortBackgroundColour);
	});
	BROWSER_API.storage.sync.get(['themeSortTextColour'], function (result) {
		themeSortTextColour(result.themeSortTextColour);
	});
	BROWSER_API.storage.sync.get(['themeSortTextColour2'], function (result) {
		themeSortTextColour2(result.themeSortTextColour2);
	});
	BROWSER_API.storage.sync.get(['themeSortBorderColour'], function (result) {
		themeSortBorderColour(result.themeSortBorderColour);
	});
	BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
		themePostBackgroundColour(result.themePostBackgroundColour);
	});
	BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
		themePostTextColour1(result.themePostTextColour1);
	});
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour1'], function (result) {
		themePostCommentsTextColour1(result.themePostCommentsTextColour1);
	});
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour2'], function (result) {
		themePostCommentsTextColour2(result.themePostCommentsTextColour2);
	});
	BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
		themePostTextColour2(result.themePostTextColour2);
	});
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColour'], function (result) {
		themePostVisitedTitleColour(result.themePostVisitedTitleColour);
	});
	BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
		themePostBorderColour(result.themePostBorderColour);
	});
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColour'], function (result) {
		themeCreatePostBackgroundColour(result.themeCreatePostBackgroundColour);
	});
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColour'], function (result) {
		themeCreatePostBorderColour(result.themeCreatePostBorderColour);
	});
	BROWSER_API.storage.sync.get(['themeSidebarTextColour'], function (result) {
		themeSidebarTextColour(result.themeSidebarTextColour);
	});
	BROWSER_API.storage.sync.get(['themeSidebarBgColour'], function (result) {
		themeSidebarBgColour(result.themeSidebarBgColour);
	});
	BROWSER_API.storage.sync.get(['themeSidebarBorderColour'], function (result) {
		themeSidebarBorderColour(result.themeSidebarBorderColour);
	});
	BROWSER_API.storage.sync.get(['themeSidemenuTextColour'], function (result) {
		themeSidemenuTextColour(result.themeSidemenuTextColour);
	});
	BROWSER_API.storage.sync.get(['themeSidemenuBgColour'], function (result) {
		themeSidemenuBgColour(result.themeSidemenuBgColour);
	});
}

function removeTheme() {
	// remove element properties
	document.documentElement.style.removeProperty('--re-theme-header-bg');
	document.documentElement.style.removeProperty('--re-theme-header-text');
	document.documentElement.style.removeProperty('--re-theme-sort-bg');
	document.documentElement.style.removeProperty('--re-theme-sort-text');
	document.documentElement.style.removeProperty('--re-theme-sort-text-2');
	document.documentElement.style.removeProperty('--re-theme-sort-border');
	document.documentElement.style.removeProperty('--re-theme-post-bg');
	document.documentElement.style.removeProperty('--re-theme-post-text');
	document.documentElement.style.removeProperty('--re-theme-post-visited-title');
	document.documentElement.style.removeProperty('--re-theme-post-text-2');
	document.documentElement.style.removeProperty('--re-theme-post-border');
	// remove stylesheets
	const dynamicStyleElements = document.querySelectorAll(
		`style[id="re-theme-header-bg-colour"],
		style[id="re-theme-header-text-colour"],
		style[id="re-theme-sort-bg-colour"],
		style[id="re-theme-sort-text-colour"],
		style[id="re-theme-sort-text-colour-2"],
		style[id="re-theme-sort-border-colour"],
		style[id="re-theme-post-bg-colour"],
		style[id="re-theme-post-text-colour"],
		style[id="re-theme-post-visited-title-colour"],
		style[id="re-theme-post-text-colour-2"],
		style[id="re-theme-post-border-colour"`
	);
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
