// Add Scroll To Long Text Posts
let textPostScroll = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true || value == undefined) {
			document.body.classList.add('re-text-scroll');
		} else if (value == false) {
			document.body.classList.remove('re-text-scroll');
		}
	}
};
export { textPostScroll };
