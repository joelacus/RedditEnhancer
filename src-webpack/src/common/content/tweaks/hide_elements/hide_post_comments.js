/**
 * Tweaks: Hide Elements - Hide Post Comments
 *
 * @name hidePostComments
 * @description Completely hide the comments on a post page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import i18next from 'i18next';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHidePostComments() {
	BROWSER_API.storage.sync.get(['hidePostComments'], function (result) {
		if (result.hidePostComments) hidePostComments(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hidePostComments(value) {
	if (redditVersion === 'newnew' && value) {
		enableHidePostCommentsRV3();
	} else if (redditVersion === 'old' && value) {
		enableHidePostCommentsRV1();
	} else {
		disableHidePostCommentsAll();
	}
}

// Enable Hide Post Comments - RV3
function enableHidePostCommentsRV3() {
	if (document.querySelector('#re-show-comments')) return;

	// hide comment tree with stylesheet
	if (!document.head.querySelector('style[id="re-hide-post-comments"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-comments';
		styleElement.textContent = `shreddit-comment-tree > * {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// append "Comments Hidden" message and a button to show the comments for the current post.
	const label = i18next.t('CommentsHidden.message') ?? '';
	if (label) {
		if (!document.querySelector('#re-show-comments')) {
			const tree = document.querySelector('[id^="comment-tree-content-anchor"]');
			if (!tree) return;

			const container = document.createElement('div');
			container.id = 're-show-comments';
			container.style = 'display: flex;flex-direction: column;gap: 0.5rem;';

			// message
			const message = document.createElement('span');
			message.textContent = label;
			container.append(message);

			// button
			const button = document.createElement('a');
			button.style = 'cursor: pointer;';
			button.textContent = i18next.t('ShowComments.message') ?? 'Show Comments';
			button.addEventListener('click', function () {
				disableHidePostCommentsAll();
				container.style.display = 'none';
			});
			container.append(button);

			tree.appendChild(container);
		}
	}
}

// Enable Hide Post Comments - RV1
function enableHidePostCommentsRV1() {
	if (document.querySelector('#re-show-comments')) return;

	// hide comment tree with stylesheet
	if (!document.head.querySelector('style[id="re-hide-post-comments"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-post-comments';
		styleElement.textContent = `.commentarea * {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// append "Comments Hidden" message and a button to show the comments for the current post.
	const label = i18next.t('CommentsHidden.message') ?? '';
	if (label) {
		if (!document.querySelector('#re-show-comments')) {
			const tree = document.querySelector('.commentarea');
			if (!tree) return;

			const container = document.createElement('div');
			container.id = 're-show-comments';
			container.style = 'display: flex;flex-direction: column;gap: 0.5rem;';

			// message
			const message = document.createElement('span');
			message.textContent = label;
			container.append(message);

			// button
			const button = document.createElement('a');
			button.style = 'cursor: pointer;';
			button.textContent = i18next.t('ShowComments.message') ?? 'Show Comments';
			button.addEventListener('click', function () {
				disableHidePostCommentsAll();
				container.style.display = 'none';
			});
			container.append(button);

			document.querySelector('.content[role="main"]').insertBefore(container, tree);
		}
	}
}

// Disable Hide Post Comments - RV3
function disableHidePostCommentsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-comments"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
