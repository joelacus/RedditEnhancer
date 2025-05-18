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
	if (redditVersion !== 'newnew' || !value || !window.location.pathname.includes('/comments/')) return;

	// Process all shreddit composers
	document.querySelectorAll('shreddit-composer').forEach(processComposer);

	// Attach event listeners to reply buttons
	document.querySelectorAll('[slot="comment-reply"]').forEach(attachReplyButtonListener);

	// Observe shreddit-comment-tree for dynamic changes
	setTimeout(() => {
		observer.observe(document.querySelector('shreddit-comment-tree'), { childList: true, subtree: true });
	}, 1000);
}

function processComposer(composer) {
	const rteComposer = composer.shadowRoot.querySelector('reddit-rte')?.shadowRoot?.querySelector('rte-toolbar-button');
	if (rteComposer && !rteComposer.getAttribute('re-showFormatting')) {
		rteComposer.click();
		rteComposer.setAttribute('re-showFormatting', '');
	}

	const mdComposer = composer.shadowRoot.querySelector('shreddit-markdown-composer');
	if (mdComposer) {
		mdComposer.shadowRoot?.querySelector('div.flex')?.remove();
		const textarea = mdComposer.shadowRoot?.querySelector('div.textarea-container textarea');
		mdComposer.setAttribute('exportparts', 'md-inner');
		if (textarea) textarea.setAttribute('part', 'md-inner');
	}
}

function attachReplyButtonListener(btn) {
	if (!btn.getAttribute('re-showFormatting')) {
		btn.setAttribute('re-showFormatting', '');
		btn.addEventListener('click', handleReplyClick);
	}
}

const handleReplyClick = (e) => {
	setTimeout(() => {
		const composer = e.target.closest('shreddit-comment-action-row').querySelector('[bundlename="comment_composer"] shreddit-composer');
		if (composer) processComposer(composer);

		setTimeout(() => composer.querySelector('div')?.focus(), 100);
	}, 100);
};

const observer = new MutationObserver(mutations => {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(addedNode => {
			if (addedNode.nodeName === 'SHREDDIT-COMMENT') {
				attachReplyButtonListener(addedNode.querySelector('faceplate-tracker[slot="comment-reply"]'));
				document.querySelectorAll('[slot="comment-reply"]').forEach(attachReplyButtonListener); // reapply just to be sure
			} else if (addedNode.nodeName === 'SHREDDIT-ASYNC-LOADER') {
				setTimeout(() => {
					document.querySelectorAll('shreddit-composer').forEach(processComposer);
				}, 300);
			}
		});
	});
});
