// Hide See Full Image
let hideSeeFullImage = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true || value == undefined) {
			document.querySelector('body').classList.add('re-hide-see-full-image');
		} else if (value == false) {
			document.querySelector('body').classList.remove('re-hide-see-full-image');
		}
	}
};
export { hideSeeFullImage };
