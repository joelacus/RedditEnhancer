// Hide Home Sidebar
let loadHideHomeSidebar = function () {
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			if (result.hideHomeSidebar == true) {
				if (link.indexOf('old.reddit.com/r/') <= 0) {
					// home page
					if (document.querySelector('.side')) {
						document.querySelector('.side').classList.add('re-hide');
					}
				}
			} else if (result.hideHomeSidebar == false) {
				if (document.querySelector('.side')) {
					document.querySelector('.side').classList.remove('re-hide');
				}
			}
		} else {
			if (result.hideHomeSidebar == true) {
				if (document.querySelector('.re-sidebar-home')) {
					document.querySelector('.re-sidebar-home').parentNode.classList.add('re-hide');
				}
			} else if (result.hideHomeSidebar == false) {
				if (document.querySelector('.re-sidebar-home')) {
					document.querySelector('.re-sidebar-home').parentNode.classList.remove('re-hide');
				}
			}
		}
	});
};
export { loadHideHomeSidebar };

// Hide Sub Sidebar
/*let loadHideSubSidebar = function () {
	BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			if (result.hideSubSidebar == true) {
				if (document.querySelector('.re-sidebar-sub')) {
					document.querySelector('.re-sidebar-sub').parentNode.classList.add('re-hide');
				}
			} else if (result.hideSubSidebar == false) {
				if (document.querySelector('.re-sidebar-sub')) {
					document.querySelector('.re-sidebar-sub').parentNode.classList.remove('re-hide');
				}
			}
		}
	});
};
export { loadHideSubSidebar };*/

// Hide Post Sidebar
let loadHidePostSidebar = function () {
	BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			if (result.hidePostSidebar == true) {
				if (document.querySelector('.re-sidebar-post')) {
					document.querySelector('.re-sidebar-post').classList.add('re-hide');
				}
			} else if (result.hidePostSidebar == false) {
				if (document.querySelector('.re-sidebar-post')) {
					document.querySelector('.re-sidebar-post').classList.remove('re-hide');
				}
			}
		}
	});
};
export { loadHidePostSidebar };

// Hide User Sidebar
let loadHideUserSidebar = function () {
	BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			if (result.hideUserSidebar == true) {
				if (document.querySelector('.re-sidebar-user')) {
					document.querySelector('.re-sidebar-user').classList.add('re-hide');
				}
			} else if (result.hideUserSidebar == false) {
				if (document.querySelector('.re-sidebar-user')) {
					document.querySelector('.re-sidebar-user').classList.remove('re-hide');
				}
			}
		}
	});
};
export { loadHideUserSidebar };

// Sub Sidebar Exception
let loadHideSubsidebarException = function () {
	BROWSER_API.storage.sync.get(['hideSubSidebarExceptionsEnable', 'hideSubSidebarExceptionMode', 'hideSubSidebarExceptionSubList', 'hideSubSidebar'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideSubSidebarExceptionsEnable == true) {
				// check exception mode
				if (result.hideSubSidebarExceptionMode === 'whitelist') {
					// only hide sub sidebar for listed sub reddits
					const list = result.hideSubSidebarExceptionSubList.replaceAll(' ', '').split(',');
					if (list.some((sub) => link.includes('r/' + sub + '/')) && result.hideSubSidebar === true) {
						hideSidebar();
					} else {
						showSidebar();
					}
				} else if (result.hideSubSidebarExceptionMode === 'blacklist') {
					// hide sidebar globally except listed sub reddits
					const list = result.hideSubSidebarExceptionSubList.replaceAll(' ', '').split(',');
					if (!list.some((sub) => link.includes('r/' + sub + '/')) && result.hideSubSidebar === true) {
						hideSidebar();
					} else {
						showSidebar();
					}
				}
			} else {
				if (result.hideSubSidebar === true) {
					// hide sidebar for all sub reddits
					hideSidebar();
				}
			}
		}
	});
};
export { loadHideSubsidebarException };

function showSidebar() {
	if (document.querySelector('.re-sidebar-sub')) {
		document.querySelector('.re-sidebar-sub').parentNode.classList.remove('re-hide');
	}
}
function hideSidebar() {
	if (document.querySelector('.re-sidebar-sub')) {
		document.querySelector('.re-sidebar-sub').parentNode.classList.add('re-hide');
	}
}
