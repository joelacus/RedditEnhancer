/* ===== Tweaks - Productivity - Auto Show Comment Formatting Options ===== */

/* === Triggered On Page Load === */
export function loadAutoShowCommentFormattingOptions() {
	BROWSER_API.storage.sync.get(['autoShowCommentFormattingOptions'], function (result) {
		if (result.autoShowCommentFormattingOptions) autoShowCommentFormattingOptions(true);
	});
}

/* === Main Function === */
export function autoShowCommentFormattingOptions(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableAutoShowCommentFormattingOptions();
		}
	}
}

// Function - Enable Auto Show Comment Formatting Options - New New
function enableAutoShowCommentFormattingOptions() {
	// add new comment
	document.querySelector('shreddit-composer').shadowRoot.children[0].querySelector('reddit-rte').shadowRoot.children[1].querySelector('rte-toolbar-button').click();
	// reply to comments
	document.querySelectorAll('[slot="comment-reply"]').forEach((btn) => {
		btn.addEventListener('click', function (e) {
			setTimeout(() => {
				e.target.closest('shreddit-comment-action-row').querySelector('[bundlename="comment_composer"] shreddit-composer').shadowRoot.children[0].querySelector('reddit-rte').shadowRoot.children[1].querySelector('rte-toolbar-button').click();
				setTimeout(() => {
					e.target.closest('shreddit-comment-action-row').querySelector('[bundlename="comment_composer"] shreddit-composer > div').focus();
				}, 100);
			}, 400);
		});
	});
}
