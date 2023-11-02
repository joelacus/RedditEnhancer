// Feed Post Max Height
let postMaxHeight = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == 296) {
			document.documentElement.style.setProperty('--re-max-post-height', '512px');
			setTimeout(() => {
				document.documentElement.style.removeProperty('--re-max-post-height');
				document.body.classList.remove('re-max-post-height');
			}, 500);
		} else if (value > 296 && value <= 1000) {
			document.body.classList.add('re-max-post-height');
			document.documentElement.style.setProperty('--re-max-post-height', value + 'px');
		}
	}
};
export { postMaxHeight };
