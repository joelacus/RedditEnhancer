// Classic Post Height
let largerClassicPost = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		if (value === true) {
			document.body.classList.add('re-larger-classic-post');
		} else if (value === false) {
			document.body.classList.remove('re-larger-classic-post');
		}
	} else {
		// new reddit
		if (value === true) {
			document.body.classList.add('re-larger-classic-post');
			if (document.querySelector('.re-sort .icon-view_classic')) {
				document.querySelector('.re-feed-container').classList.add('view-classic');
			}
		} else if (value === false) {
			document.body.classList.remove('re-larger-classic-post');
		}
	}
};
export { largerClassicPost };
