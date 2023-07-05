// Hide Popular Button
let loadHidePopularButton = function () {
	BROWSER_API.storage.sync.get(['hidePopularButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hidePopularButton == true) {
				document.querySelector('.re-popular-button').classList.add('re-hide');
			} else if (result.hidePopularButton == false) {
				document.querySelector('.re-popular-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHidePopularButton };

// Hide Coin Button
let loadHideCoinButton = function () {
	BROWSER_API.storage.sync.get(['hideCoinButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideCoinButton == true) {
				document.querySelector('.re-coin-button').classList.add('re-hide');
			} else if (result.hideCoinButton == false) {
				document.querySelector('.re-coin-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHideCoinButton };

// Hide Happening Now Button
let loadHideHappeningNowButton = function () {
	BROWSER_API.storage.sync.get(['hideHappeningNowButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			var item = document.querySelector('.re-happening-now-button');
			if (result.hideHappeningNowButton == true) {
				if (item.href.indexOf('/now')) {
					item.classList.add('re-hide');
				}
			} else if (result.hideHappeningNowButton == false) {
				if (item.href.indexOf('/now')) {
					item.classList.remove('re-hide');
				}
			}
		}
	});
};
export { loadHideHappeningNowButton };

// Hide Moderation Button
let loadHideModerationButton = function () {
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideModerationButton == true) {
				document.querySelector('.re-moderation-button').classList.add('re-hide');
			} else if (result.hideModerationButton == false) {
				document.querySelector('.re-moderation-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHideModerationButton };

// Hide Chat Button
let loadHideChatButton = function () {
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideChatButton == true) {
				document.querySelector('.re-chat-button').classList.add('re-hide');
			} else if (result.hideChatButton == false) {
				document.querySelector('.re-chat-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHideChatButton };

// Hide Advertise Button
let loadHideAdvertiseButton = function () {
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideAdvertiseButton == true) {
				document.querySelector('.re-advertise-button').classList.add('re-hide');
			} else if (result.hideAdvertiseButton == false) {
				document.querySelector('.re-advertise-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHideAdvertiseButton };

// Hide Notification Button
let loadHideNotificationButton = function () {
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideNotificationButton == true) {
				document.querySelector('.re-notification-button').classList.add('re-hide');
			} else if (result.hideNotificationButton == false) {
				document.querySelector('.re-notification-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHideNotificationButton };

// Hide CreatePost Button
let loadHideCreatePostButton = function () {
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.hideCreatePostButton == true) {
				document.querySelector('.re-create-post-button').classList.add('re-hide');
			} else if (result.hideCreatePostButton == false) {
				document.querySelector('.re-create-post-button').classList.remove('re-hide');
			}
		}
	});
};
export { loadHideCreatePostButton };
