// Hide Home Sidebar
let hideHomeSidebar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		if (value == true) {
			if (link.indexOf('old.reddit.com/r/') <= 0) {
				// home page
				if (document.querySelector('.side')) {
					document.querySelector('.side').classList.add('re-hide');
				}
			}
		} else if (value == false) {
			if (document.querySelector('.side')) {
				document.querySelector('.side').classList.remove('re-hide');
			}
		}
	} else {
		// new reddit
		if (value == true) {
			if (document.querySelector('.re-sidebar-home')) {
				document.querySelector('.re-sidebar-home').parentNode.classList.add('re-hide');
			}
		} else if (value == false) {
			if (document.querySelector('.re-sidebar-home')) {
				document.querySelector('.re-sidebar-home').parentNode.classList.remove('re-hide');
			}
		}
	}
};
export { hideHomeSidebar };

// Hide Sub Sidebar
let hideSubSidebar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			if (document.querySelector('.re-sidebar-sub')) {
				document.querySelector('.re-sidebar-sub').parentNode.classList.add('re-hide');
			}
		} else if (value == false) {
			if (document.querySelector('.re-sidebar-sub')) {
				document.querySelector('.re-sidebar-sub').parentNode.classList.remove('re-hide');
			}
		}
	}
};
export { hideSubSidebar };

// Hide Post Sidebar
let hidePostSidebar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		if (value == true) {
			if (document.querySelector('.re-sidebar-post')) {
				document.querySelector('.re-sidebar-post').classList.add('re-hide');
			}
		} else if (value == false) {
			if (document.querySelector('.re-sidebar-post')) {
				document.querySelector('.re-sidebar-post').classList.remove('re-hide');
			}
		}
	}
};
export { hidePostSidebar };

// Hide User Sidebar
let hideUserSidebar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		if (value == true) {
			if (document.querySelector('.re-sidebar-user')) {
				document.querySelector('.re-sidebar-user').classList.add('re-hide');
			}
		} else if (value == false) {
			if (document.querySelector('.re-sidebar-user')) {
				document.querySelector('.re-sidebar-user').classList.remove('re-hide');
			}
		}
	}
};
export { hideUserSidebar };
