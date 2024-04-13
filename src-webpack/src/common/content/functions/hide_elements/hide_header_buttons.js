/* ===== Tweaks - Hide - Buttons In The Header Bar ===== */

/* === Triggered On Page Load === */

// Hide Advertise Button
export function loadHideAdvertiseButton() {
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		hideAdvertiseButton(result.hideAdvertiseButton);
	});
}

// Hide Chat Button
export function loadHideChatButton() {
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		hideChatButton(result.hideChatButton);
	});
}

// Hide CreatePost Button
export function loadHideCreatePostButton() {
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		hideCreatePostButton(result.hideCreatePostButton);
	});
}

// Hide Moderation Button
export function loadHideModerationButton() {
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		hideModerationButton(result.hideModerationButton);
	});
}

// Hide Notification Button
export function loadHideNotificationButton() {
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		hideNotificationButton(result.hideNotificationButton);
	});
}

// Hide Popular Button
export function loadHidePopularButton() {
	BROWSER_API.storage.sync.get(['hidePopularButton'], function (result) {
		hidePopularButton(result.hidePopularButton);
	});
}

/* === Main Function === */

// Hide Advertise Button
export function hideAdvertiseButton(value) {
	if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-advertise-button').classList.add('re-hide');
		} else {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-header-advertise-button';
			styleElement.textContent = `#change-username-tooltip-id span:has(.icon-topic_activism) {
											display: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else if (redditVersion === 'newnew' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-advertise-button';
		styleElement.textContent = `header span[data-part="advertise"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (value === false) {
		if (useLegacy) {
			document.querySelector('.re-advertise-button').classList.remove('re-hide');
		} else {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-advertise-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Chat Button
export function hideChatButton(value) {
	if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-chat-button').classList.add('re-hide');
		} else {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-header-chat-button';
			styleElement.textContent = `#change-username-tooltip-id span:has(.icon-chat) {
											display: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else if (redditVersion === 'newnew' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-chat-button';
		styleElement.textContent = `header span[data-part="chat"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (value === false) {
		if (useLegacy) {
			document.querySelector('.re-chat-button').classList.remove('re-hide');
		} else {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-chat-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Create Post Button
export function hideCreatePostButton(value) {
	if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-create-post-button').classList.add('re-hide');
		} else {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-header-create-post-button';
			styleElement.textContent = `#change-username-tooltip-id span:has(.icon-add) {
											display: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else if (redditVersion === 'newnew' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-create-post-button';
		styleElement.textContent = `header span[data-part="create"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (value === false) {
		if (useLegacy) {
			document.querySelector('.re-create-post-button').classList.remove('re-hide');
		} else {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-create-post-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Moderation Button
export function hideModerationButton(value) {
	if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-moderation-button').classList.add('re-hide');
		} else {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-header-mod-button';
			styleElement.textContent = `#change-username-tooltip-id span:has(.icon-mod) {
											display: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else if (value === false) {
		if (useLegacy) {
			document.querySelector('.re-moderation-button').classList.remove('re-hide');
		} else {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-mod-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Notification Button
export function hideNotificationButton(value) {
	if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-notification-button').classList.add('re-hide');
		} else {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-header-notification-button';
			styleElement.textContent = `#change-username-tooltip-id span:has(.icon-notification) {
										display: none !important;
									}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else if (redditVersion === 'newnew' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-notification-button';
		styleElement.textContent = `header span[data-part="inbox"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (value === false) {
		if (useLegacy) {
			document.querySelector('.re-notification-button').classList.remove('re-hide');
		} else {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-notification-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Popular Button
export function hidePopularButton(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-header-popular-button';
			styleElement.textContent = `#SHORTCUT_FOCUSABLE_DIV div a[href="/r/popular/"] {
											display: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		} else if (value === false) {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-popular-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}
