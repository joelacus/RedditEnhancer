// Sticky Sort
let stickySort = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		if (value == true) {
			if (document.querySelector('.tabmenu')) {
				document.querySelector('.tabmenu').classList.add('re-sticky-sort');
			}
		} else if (value == false) {
			if (document.querySelector('.tabmenu')) {
				document.querySelector('.tabmenu').classList.remove('re-sticky-sort');
			}
		}
	} else {
		// new reddit
		if (value == true) {
			if (document.querySelector('.re-sort')) {
				document.querySelector('.re-sort').classList.add('re-sticky-sort');
			}
		} else if (value == false) {
			if (document.querySelector('.re-sort')) {
				document.querySelector('.re-sort').classList.remove('re-sticky-sort');
			}
		}
	}
};
export { stickySort };
