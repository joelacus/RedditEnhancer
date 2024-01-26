// Scroll To Next Root Comment Position

import { scrollToNextRootCommentPosition, scrollToNextRootCommentPositionV } from '../../../content/functions/productivity/scroll_to_next_root_comment';

export function loadScrollToNextRootCommentPosition() {
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPosition'], function (result) {
		scrollToNextRootCommentPosition(result.scrollToNextRootCommentPosition);
	});
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPositionV'], function (result) {
		scrollToNextRootCommentPositionV(result.scrollToNextRootCommentPositionV);
	});
}
