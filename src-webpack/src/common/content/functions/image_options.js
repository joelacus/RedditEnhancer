// Scale Tall Images To Fit Post
let fitImage = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector('body').classList.remove('re-image-scroll');
			document.querySelector('body').classList.add('re-fit-image');
		} else if (value == false) {
			document.querySelector('body').classList.remove('re-fit-image');
		}
	}
}
export { fitImage };


let imageScroll = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if ((value == true)||(value == undefined)) {
			document.querySelector('body').classList.remove('re-fit-image');
			document.querySelector('body').classList.add('re-image-scroll');
		} else if (value == false) {
			document.querySelector('body').classList.remove('re-image-scroll');
		}
	}
}
export { imageScroll };
