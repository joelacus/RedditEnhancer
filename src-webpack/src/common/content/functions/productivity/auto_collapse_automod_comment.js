// Auto Collapse AutoModerator Comment

export function autoCollapseAutoModeratorComment(value) {
	if (redditVersion === 'old' && value === true) {
    autoCollapseAutoModeratorCommentOld();
  } else if (redditVersion === 'new' && value === true) {
		setTimeout(() => {
      autoCollapseAutoModeratorCommentNew();
		}, 1000);
  } else if (redditVersion === 'newnew' && value === true) {
    autoCollapseAutoModeratorCommentNewNew();
  }
}

// Function - Auto Collapse AutoModerator Comment - Old
function autoCollapseAutoModeratorCommentOld() {
  document.querySelector('.comment[data-author="AutoModerator"]').classList.add('collapsed');
}

// Function - Auto Collapse AutoModerator Comment - New
function autoCollapseAutoModeratorCommentNew() {
  document.querySelector(".Comment [href='/user/AutoModerator/']").parentElement.parentElement.previousSibling.click();
}

// Function - Auto Collapse AutoModerator Comment - New New
function autoCollapseAutoModeratorCommentNewNew() {
  document.querySelector('shreddit-comment[author="AutoModerator"]').setAttribute('collapsed', 'true');
}
