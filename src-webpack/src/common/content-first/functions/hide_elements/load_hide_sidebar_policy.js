// Hide Sidebar Policy

import { hideSidebarPolicy } from '../../../content/functions/hide_elements/hide_sidebar_policy';

export function loadHideSidebarPolicy() {
	BROWSER_API.storage.sync.get(['hideSidebarPolicy'], function (result) {
		hideSidebarPolicy(result.hideSidebarPolicy);
	});
}
