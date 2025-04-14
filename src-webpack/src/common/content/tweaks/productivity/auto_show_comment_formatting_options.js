/**
 * Tweaks: Productivity - Auto Show Comment Formatting Options
 *
 * @name autoShowCommentFormattingOptions
 * @description Automatically click the button to show formatting options when commenting.
 *
 * Applies to: New New UI (2023-)
 */

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
			const composer = document.querySelector('shreddit-composer')?.shadowRoot;
			if (!composer) return;

			const rteComposer = composer.querySelector('reddit-rte')?.shadowRoot?.querySelector('rte-toolbar-button');
			if (rteComposer) composer.click();

			const mdComposer = composer.querySelector('shreddit-markdown-composer');
			if (mdComposer) {
				mdComposer.shadowRoot?.querySelector('div.flex')?.remove();

				const textarea = mdComposer.shadowRoot.querySelector('div.textarea-container textarea');
				mdComposer.setAttribute('exportparts', 'md-inner');
				textarea.setAttribute('part', 'md-inner');
			}

			// reply to comments
			document.querySelectorAll('[slot="comment-reply"]').forEach((btn) => {
				if (!btn.getAttribute('re-showFormatting')) {
					btn.setAttribute('re-showFormatting', '');
					btn.addEventListener('click', handleReplyClick);
				}
			});

			setTimeout(() => {
				observer.observe(document.querySelector('shreddit-comment-tree'), {childList: true, subtree: true});
			}, 1000);
		}
	}
}

const handleReplyClick = (e) => {
	setTimeout(() => {
		const composer = e.target.closest('shreddit-comment-action-row').querySelector('[bundlename="comment_composer"] shreddit-composer');
		if (composer.shadowRoot.querySelector('reddit-rte')) {
			const toolbarButton = composer.shadowRoot.children[0].querySelector('reddit-rte').shadowRoot.querySelector('rte-toolbar-button[screenreadercontent="Show formatting options"]');
			toolbarButton.click();
		} else if (composer.shadowRoot.querySelector('shreddit-markdown-composer')) {
			const toolbar = composer.shadowRoot.children[0].querySelector('shreddit-markdown-composer').shadowRoot.querySelector('div.flex');
			toolbar.remove();

			const mdComposer = composer.shadowRoot.querySelector('shreddit-markdown-composer');
			const textarea = mdComposer.shadowRoot.querySelector('div.textarea-container textarea');
			mdComposer.setAttribute('exportparts', 'md-inner');
			textarea.setAttribute('part', 'md-inner');
		}
		setTimeout(() => {
			composer.querySelector('div').focus();
		}, 100);
	}, 100);
};

const observer = new MutationObserver(mutations => {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(addedNode => {
			if (addedNode.nodeName === 'SHREDDIT-COMMENT') {
				const replyBtn = addedNode.querySelector('faceplate-tracker[slot="comment-reply"]');
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
	});
});
