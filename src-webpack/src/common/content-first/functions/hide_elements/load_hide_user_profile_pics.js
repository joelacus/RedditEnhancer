// Hide User Profile Pics

import { hideUserProfilePics } from '../../../content/functions/hide_elements/hide_user_profile_pics';

export function loadHideUserProfilePics() {
	BROWSER_API.storage.sync.get(['hideUserProfilePics'], function (result) {
		hideUserProfilePics(result.hideUserProfilePics);
	});
}
