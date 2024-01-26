// Hide Username And Karma

import { hideUsername, hideKarma } from '../../../content/functions/hide_elements/hide_username_and_karma';

export function loadHideUsernameAndKarma() {
	BROWSER_API.storage.sync.get(['hideUsername', 'hideKarma'], function (result) {
		hideUsername(result.hideUsername);
		hideKarma(result.hideKarma);
	});
}
