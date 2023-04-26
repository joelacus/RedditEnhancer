// Hide Home Sidebar
let loadHideHomeSidebar = function() {
	BROWSER_API.storage.sync.get(['hideHomeSidebar'], function(result) {
		var link = window.location.href
		if (link.indexOf("old.reddit.com") >= 0) { // old reddit
			if (result.hideHomeSidebar == true) {
				if (link.indexOf("old.reddit.com/r/") <= 0) { // home page
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
}
export { loadHideHomeSidebar };


// Hide Sub Sidebar
let loadHideSubSidebar = function() {
	BROWSER_API.storage.sync.get(['hideSubSidebar'], function(result) {
		var link = window.location.href
		if (link.indexOf("old.reddit.com") >= 0) { // old reddit
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
}
export { loadHideSubSidebar };
