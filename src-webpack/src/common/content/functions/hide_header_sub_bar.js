// Hide Header Sub Bar
let hideHeaderSubBar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		var el = document.querySelector('#sr-header-area');
		if (value === true) {
			var link = window.location.href;
			if (link.indexOf('old.reddit.com/r/') >= 0) {
				//el.classList.add("re-invisible");
				el.classList.add('re-hide');
			} else {
				el.classList.add('re-hide');
			}
		} else if (value === false) {
			el.classList.remove('re-invisible');
			el.classList.remove('re-hide');
		}
	}
};
export { hideHeaderSubBar };
