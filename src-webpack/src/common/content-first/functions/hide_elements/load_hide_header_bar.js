// Hide Header Bar

import { hideHeaderBar } from '../../../content/functions/hide_elements/hide_header_bar';

export function loadHideHeaderBar() {
	BROWSER_API.storage.sync.get(['hideHeaderBar'], function (result) {
		hideHeaderBar(result.hideHeaderBar);
	});
}
