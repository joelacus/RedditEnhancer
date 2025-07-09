/**
 * Tweaks: Productivity - Auto Collapse AutoModerator Comment
 *
 * @name autoCollapseAutoModeratorComment
 * @description Automatically collapse the AutoModerator comment.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadAutoCollapseAutoModeratorComment() {
	BROWSER_API.storage.sync.get(['autoCollapseAutoModeratorComment'], function (result) {
		if (result.autoCollapseAutoModeratorComment) autoCollapseAutoModeratorComment(true);
	});
}

/* === Enable/Disable The Feature === */
export function autoCollapseAutoModeratorComment(value) {
	if (redditVersion === 'newnew' && value) {
		autoCollapseAutoModeratorCommentRV3();
	} else if (redditVersion === 'old' && value) {
		autoCollapseAutoModeratorCommentRV1();
	}
}

// Enable Auto Collapse AutoModerator Comment - RV3
function autoCollapseAutoModeratorCommentRV3() {
	if (document.querySelector('shreddit-comment[author="AutoModerator"]')) {
		document.querySelector('shreddit-comment[author="AutoModerator"]').setAttribute('collapsed', 'true');
	}
}

// Enable Auto Collapse AutoModerator Comment - RV1
function autoCollapseAutoModeratorCommentRV1() {
	if (document.querySelector('.comment[data-author="AutoModerator"]')) {
		document.querySelector('.comment[data-author="AutoModerator"]').classList.add('collapsed');
	}
}
