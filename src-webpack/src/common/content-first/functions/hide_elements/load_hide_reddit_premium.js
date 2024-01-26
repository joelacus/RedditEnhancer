// Hide Reddit Premium

import { hideRedditPremium } from '../../../content/functions/hide_elements/hide_reddit_premium';

export function loadHideRedditPremium() {
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		hideRedditPremium(result.hideRedditPremium);
	});
}
