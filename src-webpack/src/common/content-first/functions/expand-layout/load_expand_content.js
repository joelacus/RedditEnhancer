// Expand Layout

import { expandLayout, expandLayoutWidth, expandSubWidth, expandPostWidth, expandPostOverlayWidth, expandUserProfileWidth } from '../../../content/functions/expand_feed_post/expand_content';

export function loadExpandContent() {
	BROWSER_API.storage.sync.get(['expandLayout', 'expandLayoutWidth', 'expandSubWidth', 'expandPostWidth', 'expandPostOverlayWidth', 'expandUserProfileWidth'], function (result) {
		expandLayout(result.expandLayout);
		expandLayoutWidth(result.expandLayoutWidth);
		expandSubWidth(result.expandSubWidth);
		expandPostWidth(result.expandPostWidth);
		expandPostOverlayWidth(result.expandPostOverlayWidth);
		expandUserProfileWidth(result.expandUserProfileWidth);
	});
}
