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
		if (value === true && window.location.pathname.includes('/comments/')) {
			enableAutoShowCommentFormattingOptions();
		}
	}
}

// Function - Enable Auto Show Comment Formatting Options - New New
async function enableAutoShowCommentFormattingOptions() {
	const composer = document.querySelector('shreddit-composer')?.shadowRoot?.querySelector('reddit-rte')?.shadowRoot?.querySelector('rte-toolbar-button');
	if (composer) composer.click();

	const handleReplyClick = (e) => {
		setTimeout(() => {
			const composer = e.target.closest('shreddit-comment-action-row').querySelector('[bundlename="comment_composer"] shreddit-composer');
			const toolbarButton = composer.shadowRoot.children[0].querySelector('reddit-rte').shadowRoot.children[1].querySelector('rte-toolbar-button');
			toolbarButton.click();
			setTimeout(() => {
				composer.querySelector('div').focus();
			}, 100);
		}, 100);
	};

	// reply to comments
	document.querySelectorAll('[slot="comment-reply"]').forEach((btn) => {
		if (!btn.getAttribute('re-showFormatting')) {
			btn.setAttribute('re-showFormatting', '');
			btn.addEventListener('click', handleReplyClick);
		}
	});

	const targetNode = document.querySelector('shreddit-comment-tree');
	const config = { childList: true, subtree: true };

	const callback = function (mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList' || mutation.type === 'subtree') {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeName === 'SHREDDIT-COMMENT') {
						const replyBtn = node.querySelector('faceplate-tracker[slot="comment-reply"]');
						if (!replyBtn.getAttribute('re-showFormatting')) {
							replyBtn.setAttribute('re-showFormatting', '');
							replyBtn.addEventListener('click', handleReplyClick);
						}
						// reapply just to be sure
						document.querySelectorAll('[slot="comment-reply"]').forEach((btn) => {
							if (!btn.getAttribute('re-showFormatting')) {
								btn.setAttribute('re-showFormatting', '');
								btn.addEventListener('click', handleReplyClick);
							}
						});
					}
				});
			}
		});
	};

	const observer = new MutationObserver(callback);
	observer.observe(targetNode, config);
}
