/**
 * Tweaks: Hide Elements - Hide Awards
 *
 * @name hideAwards
 * @description Hide buttons to give awards on comments.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */
import { showBannerMessage } from '../../banner_message';
import { registerMutationCallback, unregisterMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideAwards() {
	BROWSER_API.storage.sync.get(['hideAwards']).then(function (result) {
		if (result.hideAwards) hideAwards(true);
	});
}

// Store cleanup function for the observer
let commentObserverCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideAwards(value) {
	if (value && redditVersion === 'newnew') {
		// Add a CSS class which lets RE_styles.css know to hide award-button in comments
		document.documentElement.classList.add('re-hide-awards');

		// Initially remove award buttons from existing comments
		document.querySelectorAll('shreddit-comment[award-count]').forEach(removeCommentAwardHighlight);

		// Observe comments for award highlights and remove them
		const commentTree = document.querySelector('shreddit-comment-tree');
		if (commentTree) {
			commentObserverCleanup = registerMutationCallback(
				commentTree,
				(mutations) => {
					mutations.forEach((mutation) => {
						mutation.addedNodes.forEach((addedNode) => {
							if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-PARTIAL', 'FACEPLATE-LOADER', 'SHREDDIT-COMMENT'].includes(addedNode.nodeName)) {
								setTimeout(() => {
									commentTree.querySelectorAll('shreddit-comment[award-count]').forEach(removeCommentAwardHighlight);
								}, 1000);
							}
						});
					});
				},
				{ childList: true },
				'hideAwards',
			);
		}
	} else {
		// Remove the CSS class that hides award buttons and disconnect the observer
		if (commentObserverCleanup) {
			commentObserverCleanup();
			commentObserverCleanup = null;
		}
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the changes to take effect.');
	}
}

function removeCommentAwardHighlight(comment) {
	comment.removeAttribute('award-count');
}
