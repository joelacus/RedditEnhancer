// Hide User Profile Pics

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

// Function - Enable Hide User Profile Pics - New
function enableUserProfilePicsNew() {
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

// Function - Enable Hide User Profile Pics - New New
function enableUserProfilePicsNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-user-profile-pics';
	styleElement.textContent = `shreddit-comment [noun="comment_author_avatar"] {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide User Profile Pics - All
function disableUserProfilePicsAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-user-profile-pics"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
