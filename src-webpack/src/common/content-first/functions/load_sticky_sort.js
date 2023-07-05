// Sticky Sort
let loadStickySort = function () {
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			if (result.stickySort == true) {
				if (document.querySelector('.tabmenu')) {
					document.querySelector('.tabmenu').classList.add('re-sticky-sort');
				}
			} else if (result.stickySort == false) {
				if (document.querySelector('.tabmenu')) {
					document.querySelector('.tabmenu').classList.remove('re-sticky-sort');
				}
			}
		} else {
			// new reddit
			if (result.stickySort == true) {
				if (document.querySelector('.re-sort')) {
					document.querySelector('.re-sort').classList.add('re-sticky-sort');
				}
			} else if (result.stickySort == false) {
				if (document.querySelector('.re-sort')) {
					document.querySelector('.re-sort').classList.remove('re-sticky-sort');
				}
			}
		}
	});
};
export { loadStickySort };
