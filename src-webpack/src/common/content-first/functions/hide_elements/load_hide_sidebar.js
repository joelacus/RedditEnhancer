import {
	enableHideSubSidebarNew,
	disableHideSubSidebarNew,
	enableHideSubSidebarNewNew,
	disableHideSubSidebarNewNew,
	hideHomeSidebar,
	hidePostSidebar,
	hidePostOverlaySidebar,
	hideUserSidebar,
	hideRelatedPostsSection,
} from '../../../content/functions/hide_elements/hide_sidebar';

// Hide Home Sidebar
export function loadHideHomeSidebar() {
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		hideHomeSidebar(result.hideHomeSidebar);
	});
}

// Hide Post Sidebar
export function loadHidePostSidebar() {
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		hidePostSidebar(result.hidePostSidebar);
	});
}

// Hide Post Overlay Sidebar
export function loadHidePostOverlaySidebar() {
	BROWSER_API.storage.sync.get(['hidePostOverlaySidebar'], function (result) {
		hidePostOverlaySidebar(result.hidePostOverlaySidebar);
	});
}

// Hide User Sidebar
export function loadHideUserSidebar() {
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		hideUserSidebar(result.hideUserSidebar);
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
		hideRelatedPostsSection(result.hideRelatedPostsSection);
	});
}
