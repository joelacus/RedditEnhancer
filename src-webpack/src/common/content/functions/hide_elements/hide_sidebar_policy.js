// Hide Sidebar Policy
let hideSidebarPolicy = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		var policy = document.querySelector('#re-policy');
		if (policy) {
			if (value == true) {
				policy.classList.add('re-hide');
			} else if (value == false) {
				policy.classList.remove('re-hide');
			}
		}
	}
};
export { hideSidebarPolicy };
