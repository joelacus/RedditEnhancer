// Auto Collapse AutoModerator Comment

import { autoCollapseAutoModeratorComment } from '../../../content/functions/productivity/auto_collapse_automod_comment';

export function loadAutoCollapseAutoModeratorComment() {
	BROWSER_API.storage.sync.get(['autoCollapseAutoModeratorComment'], function (result) {
		autoCollapseAutoModeratorComment(result.autoCollapseAutoModeratorComment);
	});
}
