// Hide Popular Button
let hidePopularButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector('.re-popular-button').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-popular-button').classList.remove('re-hide');
		}
	}
}
export { hidePopularButton };


// Hide Coin Button
let hideCoinButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector('.re-coin-button').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-coin-button').classList.remove('re-hide');
		}
	}
}
export { hideCoinButton };


// Hide Happening Now Button
let hideHappeningNowButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		var item = document.querySelector('.re-happening-now-button');
		if (value == true) {
			if (item.href.indexOf("/now")) {
				item.classList.add('re-hide');
			}
		} else if (value == false) {
			if (item.href.indexOf("/now")) {
				item.classList.remove('re-hide');
			}
		}
	}
}
export { hideHappeningNowButton};


// Hide Moderation Button
let hideModerationButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector('.re-moderation-button').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-moderation-button').classList.remove('re-hide');
		}
	}
}
export { hideModerationButton };


// Hide Chat Button
let hideChatButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector('.re-chat-button').classList.add('re-hide');
		} else if (value == false) {
			document.querySelector('.re-chat-button').classList.remove('re-hide');
		}
	}
}
export { hideChatButton };


// Hide Advertise Button
let hideAdvertiseButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector(".re-advertise-button").classList.add('re-hide');
		} else if (value == false) {
			document.querySelector(".re-advertise-button").classList.remove('re-hide');
		}
	}
}
export { hideAdvertiseButton };


// Hide Notification Button
let hideNotificationButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector(".re-notification-button").classList.add('re-hide');
		} else if (value == false) {
			document.querySelector(".re-notification-button").classList.remove('re-hide');
		}
	}
}
export { hideNotificationButton };


// Hide Create Post Button
let hideCreatePostButton = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		// do nothing
	} else { // new reddit
		if (value == true) {
			document.querySelector(".re-create-post-button").classList.add('re-hide');
		} else if (value == false) {
			document.querySelector(".re-create-post-button").classList.remove('re-hide');
		}
	}
}
export { hideCreatePostButton };
