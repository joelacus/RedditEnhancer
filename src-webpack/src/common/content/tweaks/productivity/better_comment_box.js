/**
 * Tweaks: Productivity - Better Comment Box
 *
 * @name betterCommentBox
 * @description Automatically show formatting options when commenting, add the Ctrl/Cmd + Enter shortcut to submit comments,
 * and hide the toolbar for switching to rich-text editor when setting Markdown composer as default.
 *
 * ResizeObserver is used to watch for resizes in the comment tree, which expands as new comments are added.
 *
 * Applies to: New New UI (2023-)
 */
import { showBannerMessage } from "../../banner_message";

/* === Triggered On Page Load === */
export function loadBetterCommentBox() {
	BROWSER_API.storage.sync.get(['betterCommentBox'], function (result) {
		if (result.betterCommentBox) betterCommentBox(true);
	});
}

/* === Main Function === */
export function betterCommentBox(value) {
	if (redditVersion !== 'newnew' || !value || !window.location.pathname.includes('/comments/')) return;

	// Process all shreddit composers
	document.querySelectorAll('shreddit-composer').forEach(processComposer);

	// Attach event listeners to reply buttons
	document.querySelectorAll('[slot="comment-reply"]').forEach(attachReplyButtonListener);

	// Observe shreddit-comment-tree for dynamic changes
	setTimeout(() => {
		observer.observe(document.querySelector('shreddit-comment-tree'));
	}, 1000);
}

function processComposer(composer) {
	const submitButton = composer.querySelector('button[type="submit"]');
	if (!submitButton) {
		showBannerMessage('error', '[RedditEnhancer] autoShowCommentFormattingOptions: No submit button found in composer.');
	}

	const rteComposer = composer.shadowRoot?.querySelector('reddit-rte');
	if (rteComposer && !rteComposer.getAttribute('re-showFormatting')) {
		rteComposer.shadowRoot?.querySelector('rte-toolbar.toolbar-top-responsive')?.classList.remove('hidden');
		rteComposer.shadowRoot?.querySelector('rte-toolbar-button:last-child')?.remove();
		composer.querySelector('div[contenteditable="true"]')?.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				submitButton.click();
				showBannerMessage('info', 'Submitting comment...');
			}
		});
		rteComposer.setAttribute('re-showFormatting', '');
	}

	const mdComposer = composer.shadowRoot.querySelector('shreddit-markdown-composer');
	if (mdComposer && !mdComposer.getAttribute('re-showFormatting')) {
		mdComposer.shadowRoot?.querySelector('div.flex')?.remove();
		const textarea = mdComposer.shadowRoot?.querySelector('div.textarea-container textarea');
		mdComposer.setAttribute('exportparts', 'md-inner');
		if (textarea) {
			textarea.setAttribute('part', 'md-inner');
			textarea.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
					e.preventDefault();
					submitButton.click();
					showBannerMessage('info', 'Submitting comment...');
				}
			});
			textarea.setAttribute('re-showFormatting', '');
		}
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

const observer = new ResizeObserver(function (entries) {
	entries.forEach(function (entry) {
		if (entry.target.nodeName === 'SHREDDIT-COMMENT-TREE') {
			entry.target.querySelectorAll('shreddit-composer').forEach(processComposer);
			entry.target.querySelectorAll('[slot="comment-reply"]').forEach(attachReplyButtonListener);
		}
	});
});
