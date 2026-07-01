/**
 * Tweaks: Hide Elements - Reddit Gamification Notifications
 *
 * @name hideGamificationNotifications
 * @description Hide Reddit gamification notifications from your notifications list.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideGamificationNotifications() {
	BROWSER_API.storage.sync.get(['hideGamificationNotifications'], function (result) {
		if (result.hideGamificationNotifications) hideGamificationNotifications(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideGamificationNotifications(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideGamificationNotifications();
	} else {
		disableHideGamificationNotifications();
	}
}

// Enable Reddit Gamification Notifications - RV3
function enableHideGamificationNotifications() {
	if (!document.head.querySelector('style[id="re-hide-gamification-notifications"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-gamification-notifications';
		styleElement.textContent = `notification-item[message-type="GAMIFICATION_REMINDER"],
									notification-item[message-type="GAMIFICATION_ACHIEVEMENT_UNLOCKED"] {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Reddit Gamification Notifications - RV3
function disableHideGamificationNotifications() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-gamification-notifications"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
