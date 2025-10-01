/**
 * Tweaks: Hide Elements - Hide Username And Profile Picture In Sub Sidebar
 * @name hideUsernameInSubSidebar
 * @description Hides the username and profile picture in the edit flair section of the subreddit sidebar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideUsernameInSubSidebar() {
	BROWSER_API.storage.sync.get(['hideUsernameInSubSidebar']).then((result) => {
		if (result.hideUsernameInSubSidebar) hideUsernameInSubSidebar(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideUsernameInSubSidebar(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideUsernameInSubSidebar();
	} else {
		disableHideUsernameInSubSidebar();
	}
}

function enableHideUsernameInSubSidebar() {
	// Hide username
	const username_el = document.querySelector('#right-sidebar-contents community-author-flair .author-username');
	if (!username_el) return;
	const clone_username_el = username_el.cloneNode();
	const parent_el = username_el.parentElement;
	username_el.classList.add('re-hide-username');
	username_el.style.display = 'none';
	clone_username_el.textContent = 'Username';
	clone_username_el.classList.add('re-fake-username');
	parent_el.append(clone_username_el);

	// Hide profile picture
	const picture_el = document.querySelector('#right-sidebar-contents community-author-flair .snoovatar');
	picture_el.classList.add('re-hide-profile-picture');
	picture_el.style.display = 'none';
}

function disableHideUsernameInSubSidebar() {
	document.querySelector('.re-hide-username')?.removeAttribute('style');
	document.querySelector('.re-fake-username')?.remove();
	document.querySelector('.re-hide-profile-picture')?.removeAttribute('style');
}
