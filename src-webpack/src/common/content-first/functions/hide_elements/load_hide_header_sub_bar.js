// Hide Header Sub Bar on old.reddit

import { hideHeaderSubBar } from '../../../content/functions/hide_elements/hide_header_sub_bar';

export function loadHideHeaderSubBar() {
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function (result) {
		hideHeaderSubBar(result.hideHeaderSubBar);
	});
}
