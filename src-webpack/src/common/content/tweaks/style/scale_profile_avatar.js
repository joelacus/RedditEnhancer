/**
 * Tweaks: Style - Scale Profile Avatar
 *
 * @name scaleProfileAvatar
 * @description Scale the avatar image on the profile page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadScaleProfileAvatar() {
	BROWSER_API.storage.sync.get(['scaleProfileAvatar'], function (result) {
		const value = result.scaleProfileAvatar;
		if (value) scaleProfileAvatar(value);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function scaleProfileAvatar(value) {
	if (redditVersion === 'newnew' && value) {
		document.documentElement.style.setProperty('--re-profile-avatar-scaler', value);
		if (!document.querySelector('style[id="re-scale-profile-avatar"]')) {
			addScaleProfileAvatarStylesheet();
		}
	} else {
		document.documentElement.style.removeProperty('--re-profile-avatar-scaler');
		removeScaleProfileAvatarStylesheet();
	}
}

// Add Scale Profile Avatar Stylesheet
function addScaleProfileAvatarStylesheet() {
	if (!document.head.querySelector('style[id="re-scale-profile-avatar"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-scale-profile-avatar';
		styleElement.textContent = `div:has(>#profile-icon) {
										width: fit-content !important;
									}
									[data-testid="profile-main"] #profile-icon:only-child {
                                        height: calc(64px * var(--re-profile-avatar-scaler));
										width: auto;
                                    }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Remove Scale Profile Avatar Stylesheet
function removeScaleProfileAvatarStylesheet() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-scale-profile-avatar"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
