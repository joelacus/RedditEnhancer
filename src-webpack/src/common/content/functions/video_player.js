import { videoObserver } from '../video-observer'

// New Player
let newPlayer = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			videoObserver(true);
		} else if (value == false) {
			videoObserver(false);
		}
	}
}
export { newPlayer };
