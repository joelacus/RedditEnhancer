// Hide Post Hidden Message

import { hidePostHiddenMessage } from '../../../content/functions/hide_elements/hide_post_hidden_message';

export function loadHidePostHiddenMessage() {
	BROWSER_API.storage.sync.get(['hidePostHiddenMessage'], function (result) {
		hidePostHiddenMessage(result.hidePostHiddenMessage);
	});
}
