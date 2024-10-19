/* ===== Tweaks - Hide - User Profile Pics ===== */

/* === Triggered On Page Load === */
export function loadHideUserProfilePics() {
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		if (result.hideUserProfilePics) hideUserProfilePics(true);
	});
}

/* === Main Function === */
export function hideUserProfilePics(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableUserProfilePicsNew();
		} else {
			disableUserProfilePicsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableUserProfilePicsNewNew();
		} else {
			disableUserProfilePicsAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide User Profile Pics - New
function enableUserProfilePicsNew() {
	if (!document.head.querySelector('style[id="re-hide-user-profile-pics"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-user-profile-pics';
		styleElement.textContent = `.Comment > div:has([data-testid="comment_author_icon"]) {
										display: none !important;
									}
									.Comment > :last-child {
										margin-left: 34px !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide User Profile Pics - New New
function enableUserProfilePicsNewNew() {
	if (!document.head.querySelector('style[id="re-hide-user-profile-pics"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-user-profile-pics';
		styleElement.textContent = `shreddit-comment [noun="comment_author_avatar"] {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide User Profile Pics - All
function disableUserProfilePicsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-user-profile-pics"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
