// Show Post Numbers

import { showPostNumbers } from '../../../content/functions/productivity/show_post_numbers';

export function loadShowPostNumbers() {
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		showPostNumbers(result.showPostNumbers);
	});
}
