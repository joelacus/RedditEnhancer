// Hide Side Menu

import { hideSideMenuOld, hideSideMenu } from '../../../content/functions/hide_elements/hide_side_menu';

// Hide Side Menu - Old
export function loadHideSideMenuOld() {
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function (result) {
		hideSideMenuOld(result.hideSideMenuOld);
	});
}

// Hide Side Menu - New New
export function loadHideSideMenu() {
	BROWSER_API.storage.sync.get(['hideSideMenu'], function (result) {
		hideSideMenu(result.hideSideMenu);
	});
}
