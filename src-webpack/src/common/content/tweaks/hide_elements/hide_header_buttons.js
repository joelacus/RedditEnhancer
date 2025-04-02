/* ===== Tweaks - Hide - Buttons In The Header Bar ===== */

/* === Triggered On Page Load === */

// Hide Advertise Button
export function loadHideAdvertiseButton() {
	BROWSER_API.storage.sync.get(['hideAdvertiseButton'], function (result) {
		if (result.hideAdvertiseButton) hideAdvertiseButton(true);
	});
}

// Hide Chat Button
export function loadHideChatButton() {
	BROWSER_API.storage.sync.get(['hideChatButton'], function (result) {
		if (result.hideChatButton) hideChatButton(true);
	});
}

// Hide CreatePost Button
export function loadHideCreatePostButton() {
	BROWSER_API.storage.sync.get(['hideCreatePostButton'], function (result) {
		if (result.hideCreatePostButton) hideCreatePostButton(true);
	});
}

// Hide Moderation Button
export function loadHideModerationButton() {
	BROWSER_API.storage.sync.get(['hideModerationButton'], function (result) {
		if (result.hideModerationButton) hideModerationButton(true);
	});
}

// Hide Notification Button
export function loadHideNotificationButton() {
	BROWSER_API.storage.sync.get(['hideNotificationButton'], function (result) {
		if (result.hideNotificationButton) hideNotificationButton(true);
	});
}

// Hide Popular Button
export function loadHidePopularButton() {
	BROWSER_API.storage.sync.get(['hidePopularButton'], function (result) {
		if (result.hidePopularButton) hidePopularButton(true);
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
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-advertise-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

/* === Enable/Disable Functions === */

// Hide Chat Button
export function hideChatButton(value) {
	if (redditVersion === 'old' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-chat-button';
		styleElement.textContent = `a#chat,
									a#chat + span.separator,
									a#chat-v2, 
									a#chat-v2 + span.separator {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
		if (document.querySelector('iframe.chat-app-window')) {
			document.querySelector('iframe.chat-app-window').remove();
		}
	}
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
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-chat-button"]');
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
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-create-post-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Moderation Button
export function hideModerationButton(value) {
	if (redditVersion === 'old' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-mod-button';
		styleElement.textContent = `a#new_modmail, a#new_modmail + span.separator {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
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
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-mod-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Hide Notification Button
export function hideNotificationButton(value) {
	if (redditVersion === 'old' && value === true) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-notification-button';
		styleElement.textContent = `a#mail,
									a.message-count,
									a#mail + span.separator,
									a.message-count + span.separator,
									a#notifications, 
									a#notifications + span.separator,
									a.badge-count,
									a.badge-count + span.separator {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
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
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-notification-button"]');
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
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-popular-button"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}
