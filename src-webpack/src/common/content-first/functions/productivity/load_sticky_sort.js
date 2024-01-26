// Sticky Sort

export function loadStickySort() {
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		if (redditVersion === 'old') {
			if (result.stickySort === true) {
				if (document.querySelector('.tabmenu')) {
					document.querySelector('.tabmenu').classList.add('re-sticky-sort');
				}
			} else if (result.stickySort === false) {
				if (document.querySelector('.tabmenu')) {
					document.querySelector('.tabmenu').classList.remove('re-sticky-sort');
				}
			}
		} else if (redditVersion === 'new') {
			if (result.stickySort === true) {
				if (document.querySelector('.re-sort')) {
					document.querySelector('.re-sort').classList.add('re-sticky-sort');
				}
			} else if (result.stickySort === false) {
				if (document.querySelector('.re-sort')) {
					document.querySelector('.re-sort').classList.remove('re-sticky-sort');
				}
			}
		}
	});
}
