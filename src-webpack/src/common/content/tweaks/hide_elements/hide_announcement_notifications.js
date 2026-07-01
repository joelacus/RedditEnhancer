/**
 * Tweaks: Hide Elements - Reddit Announcement Notifications
 *
 * @name hideAnnouncementNotifications
 * @description Hide Reddit announcement notifications from your notifications list.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideAnnouncementNotifications() {
	BROWSER_API.storage.sync.get(['hideAnnouncementNotifications'], function (result) {
		if (result.hideAnnouncementNotifications) hideAnnouncementNotifications(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideAnnouncementNotifications(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideAnnouncementNotifications();
	} else {
		disableHideAnnouncementNotifications();
	}
}

// Enable Reddit Announcement Notifications - RV3
function enableHideAnnouncementNotifications() {
	if (!document.head.querySelector('style[id="re-hide-announcement-notifications"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-announcement-notifications';
		styleElement.textContent = `notifications-main-manager notification-announcement {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Reddit Announcement Notifications - RV3
function disableHideAnnouncementNotifications() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-announcement-notifications"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
