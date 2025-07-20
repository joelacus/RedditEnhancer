/**
 * Tweaks: Hide Elements - Hide Buttons In The Header Bar
 *
 * @description Hide buttons in the top/header bar.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */

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

// Hide Create Post Button
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

/* === Enable/Disable The Features === */

// Hide Advertise Button
export function hideAdvertiseButton(value) {
	if (redditVersion === 'newnew' && value) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-advertise-button';
		styleElement.textContent = `header span[data-part="advertise"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-advertise-button"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Hide Chat Button
export function hideChatButton(value) {
	if (redditVersion === 'old' && value) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-chat-button';
		styleElement.textContent = `a#chat,
									a#chat + span.separator,
									a#chat-v2, 
									a#chat-v2 + span.separator {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (redditVersion === 'newnew' && value) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-chat-button';
		styleElement.textContent = `header span[data-part="chat"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-chat-button"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Hide Create Post Button
export function hideCreatePostButton(value) {
	if (redditVersion === 'newnew' && value) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-create-post-button';
		styleElement.textContent = `header span[data-part="create"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-create-post-button"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Hide Moderation Button
export function hideModerationButton(value) {
	if (redditVersion === 'old' && value) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-mod-button';
		styleElement.textContent = `a#new_modmail, a#new_modmail + span.separator {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-mod-button"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Hide Notification Button
export function hideNotificationButton(value) {
	if (redditVersion === 'old' && value) {
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
	} else if (redditVersion === 'newnew' && value) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-header-notification-button';
		styleElement.textContent = `header span[data-part="inbox"],
									faceplate-loader[name^="HeaderActionItemInbox_"] + div,
		 							#notifications-inbox-button {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-header-notification-button"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
