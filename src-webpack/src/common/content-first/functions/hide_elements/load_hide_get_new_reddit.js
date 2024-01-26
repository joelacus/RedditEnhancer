// Hide Get New Reddit

import { hideGetNewReddit } from '../../../content/functions/hide_elements/hide_get_new_reddit';

export function loadHideGetNewReddit() {
	BROWSER_API.storage.sync.get(['hideGetNewReddit'], function (result) {
		if (result.hideGetNewReddit === true) {
			hideGetNewReddit(result.hideGetNewReddit);
		}
	});
}
