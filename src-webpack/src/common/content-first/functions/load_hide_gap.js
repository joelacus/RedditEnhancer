// Hide Gap
let loadHideGap = function () {
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideGap == true) {
				if (document.querySelector('.re-feed')) {
					document.querySelector('.re-feed').classList.add('re-hide-gap');
				}
				if (document.querySelector('.feed-container')) {
					document.querySelector('.feed-container').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-search')) {
					document.querySelector('.re-search').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-search-results-nav')) {
					document.querySelector('.re-search-results-nav').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-search-results-subnav')) {
					document.querySelector('.re-search-results-subnav').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-search-sidebar')) {
					document.querySelector('.re-search-sidebar').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-posts-list')) {
					document.querySelector('.re-posts-list').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-sort')) {
					document.querySelector('.re-sort').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-create-post')) {
					document.querySelector('.re-create-post').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-sidebar')) {
					document.querySelector('.re-sidebar').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-post-container')) {
					document.querySelector('.re-post-container').classList.add('re-hide-gap');
				}
				if (document.querySelector('.re-feed-container')) {
					document.querySelector('.re-feed-container').classList.add('re-hide-gap');
				}
			}
		}
	});
};
export { loadHideGap };
