// Hide Gap
let hideGap = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
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
		} else if (value == false) {
			if (document.querySelector('.re-feed')) {
				document.querySelector('.re-feed').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.feed-container')) {
				document.querySelector('.feed-container').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-search')) {
				document.querySelector('.re-search').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-search-results-nav')) {
				document.querySelector('.re-search-results-nav').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-search-results-subnav')) {
				document.querySelector('.re-search-results-subnav').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-search-sidebar')) {
				document.querySelector('.re-search-sidebar').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-posts-list')) {
				document.querySelector('.re-posts-list').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-sort')) {
				document.querySelector('.re-sort').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-create-post')) {
				document.querySelector('.re-create-post').classList.remove('re-hide-gap');
			}
			if (document.querySelector('.re-sidebar')) {
				document.querySelector('.re-sidebar').classList.remove('re-hide-gap');
			}
		}
	}
};
export { hideGap };
