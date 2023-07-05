// Hide Get New Reddit
let hideGetNewReddit = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		var el = document.querySelector('#redesign-beta-optin-btn');
		if (value === true) {
			el.style.display = 'none';
		} else if (value === false) {
			el.style.display = 'block';
		}
	}
};
export { hideGetNewReddit };
