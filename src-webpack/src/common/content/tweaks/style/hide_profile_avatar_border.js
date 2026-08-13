/**
 * Tweaks: Style - Hide Profile Avatar Border
 *
 * @name hideProfileAvatarBorder
 * @description Hide the border and border radius of the avatar on the user profile page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideProfileAvatarBorder() {
	BROWSER_API.storage.sync.get(['hideProfileAvatarBorder'], function (result) {
		if (result.hideProfileAvatarBorder === true) hideProfileAvatarBorder(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideProfileAvatarBorder(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideProfileAvatarBorderRV3();
	} else {
		disableHideProfileAvatarBorderAll();
	}
}

// Enable Hide Profile Avatar Border - RV3
function enableHideProfileAvatarBorderRV3() {
	if (!document.head.querySelector('style[id="re-hide-profile-avatar-border"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-profile-avatar-border';
		styleElement.textContent = `[data-testid="profile-main"] #profile-icon:only-child {
                                        border: 0 !important;
                                        border-radius: 0 !important;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Profile Avatar Border - All
function disableHideProfileAvatarBorderAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-profile-avatar-border"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
