/* ===== Tweaks - Productivity - Auto Collapse AutoModerator Comment ===== */

/* === Triggered On Page Load === */
export function loadAutoCollapseAutoModeratorComment() {
	BROWSER_API.storage.sync.get(['autoCollapseAutoModeratorComment'], function (result) {
		autoCollapseAutoModeratorComment(result.autoCollapseAutoModeratorComment);
	});
}

/* === Main Function === */
export function autoCollapseAutoModeratorComment(value) {
	if (redditVersion === 'old' && value === true) {
		autoCollapseAutoModeratorCommentOld();
	} else if (redditVersion === 'new' && value === true) {
		autoCollapseAutoModeratorCommentNew();
	} else if (redditVersion === 'newnew' && value === true) {
		autoCollapseAutoModeratorCommentNewNew();
	}
}

// Function - Auto Collapse AutoModerator Comment - Old
function autoCollapseAutoModeratorCommentOld() {
	if (document.querySelector('.comment[data-author="AutoModerator"]')) {
		document.querySelector('.comment[data-author="AutoModerator"]').classList.add('collapsed');
	}
}

// Function - Auto Collapse AutoModerator Comment - New
function autoCollapseAutoModeratorCommentNew() {
	setTimeout(() => {
		if (document.querySelector('.Comment:has([href="/user/AutoModerator/"]) button')) {
			document.querySelector('.Comment:has([href="/user/AutoModerator/"]) button').click();
		}
	}, 1000);
}

// Function - Auto Collapse AutoModerator Comment - New New
function autoCollapseAutoModeratorCommentNewNew() {
	if (document.querySelector('shreddit-comment[author="AutoModerator"]')) {
		document.querySelector('shreddit-comment[author="AutoModerator"]').setAttribute('collapsed', 'true');
	}
}
