/**
 * Tweaks: Hide Elements - Hide User Profile Pics
 *
 * @name hideUserProfilePics
 * @description Hide the user profile pictures on comments.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideUserProfilePics() {
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		if (result.hideUserProfilePics) hideUserProfilePics(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideUserProfilePics(value) {
	if (redditVersion === 'newnew' && value) {
		enableUserProfilePicsRV3();
	} else {
		disableUserProfilePicsAll();
	}
}

// Enable Hide User Profile Pics - RV3
function enableUserProfilePicsRV3() {
	if (!document.head.querySelector('style[id="re-hide-user-profile-pics"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-user-profile-pics';
		styleElement.textContent = `shreddit-comment [noun="comment_author_avatar"] {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide User Profile Pics - All
function disableUserProfilePicsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-user-profile-pics"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
