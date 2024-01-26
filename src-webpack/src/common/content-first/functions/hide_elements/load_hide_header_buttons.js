// Hide Buttons In The Header Bar

import {
	hideAdvertiseButton,
	hideChatButton,
	hideCreatePostButton,
	hideModerationButton,
	hideNotificationButton,
	hidePopularButton,
} from '../../../content/functions/hide_elements/hide_header_buttons';

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
