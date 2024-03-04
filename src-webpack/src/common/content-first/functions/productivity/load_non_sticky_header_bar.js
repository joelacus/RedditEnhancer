// Non Sticky Header Bar

import { nonStickyHeaderBar } from '../../../content/functions/productivity/non_sticky_header_bar';

export function loadNonStickyHeaderBar() {
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		nonStickyHeaderBar(result.nonStickyHeaderBar);
	});
}
