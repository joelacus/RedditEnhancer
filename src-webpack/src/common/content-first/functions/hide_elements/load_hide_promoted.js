// Hide Promoted Posts

import { hidePromoted } from '../../../content/functions/hide_elements/hide_promoted';

export function loadHidePromotedPosts() {
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		hidePromoted(result.hidePromoted);
	});
}
