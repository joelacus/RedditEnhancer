// Hide Side Menu Sections

import {
	hideSideMenuCommunitiesSection,
	hideSideMenuModerationSection,
	hideSideMenuRecentSection,
	hideSideMenuResourcesSection,
	hideSideMenuTopSection,
} from '../../../content/functions/hide_elements/hide_side_menu_sections';

export function loadHideSideMenuSections() {
	// Hide Top Section
	BROWSER_API.storage.sync.get(['hideSideMenuTopSection'], function (result) {
		hideSideMenuTopSection(result.hideSideMenuTopSection);
	});
	// Hide Moderation Section
	BROWSER_API.storage.sync.get(['hideSideMenuModerationSection'], function (result) {
		hideSideMenuModerationSection(result.hideSideMenuModerationSection);
	});
	// Hide Recent Section
	BROWSER_API.storage.sync.get(['hideSideMenuRecentSection'], function (result) {
		hideSideMenuRecentSection(result.hideSideMenuRecentSection);
	});
	// Hide Communities Section
	BROWSER_API.storage.sync.get(['hideSideMenuCommunitiesSection'], function (result) {
		hideSideMenuCommunitiesSection(result.hideSideMenuCommunitiesSection);
	});
	// Hide Resources Section
	BROWSER_API.storage.sync.get(['hideSideMenuResourcesSection'], function (result) {
		hideSideMenuResourcesSection(result.hideSideMenuResourcesSection);
	});
}
