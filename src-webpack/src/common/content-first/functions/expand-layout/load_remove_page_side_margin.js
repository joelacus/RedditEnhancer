// Remove Feed Margin

import { removePageSideMargin } from '../../../content/functions/expand_feed_post/remove_page_side_margin';

export function loadRemovePageSideMargin() {
	BROWSER_API.storage.sync.get(['removePageSideMargin'], function (result) {
		removePageSideMargin(result.removePageSideMargin);
	});
}
