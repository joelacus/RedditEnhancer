// Hide Gap

import { hideGap } from '../../../content/functions/hide_elements/hide_gap';

export function loadHideGap() {
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		hideGap(result.hideGap);
	});
}
