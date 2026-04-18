/**
 * Tweaks: Hide Elements - Hide Awards
 *
 * @name hideAwards
 * @description Hide buttons to give awards on posts and comments.
 *
 * shreddit-post has an attribute `is-awardable` (in Card view) and `is-post-awardable` (in Compact view) which are used
 * to determine if a post can be awarded. For comments, hide the `award-button` element in the overflow menu.
 *
 * This feature also goes nuclear by removing the award dialog scripts from the DOM, making Award buttons useless.
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

// Store cleanup functions for the observers
let postObserverCleanup = null;
let commentObserverCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideAwards(value) {
	if (value && redditVersion === 'newnew') {
		// Go nuclear and remove all award dialog handler scripts
		document.querySelector('faceplate-loader[name^="AwardDialog_"]')?.remove();
		document.querySelector('faceplate-partial[name^="AwardDialog_"]')?.remove();

		// Add a CSS class which lets RE_styles.css know to hide award-button in comments
		document.documentElement.classList.add('re-hide-awards');

		// Initially remove award buttons from existing posts
		document.querySelectorAll('shreddit-post').forEach(removeAwardBtn);
		document.querySelectorAll('shreddit-comment[award-count]').forEach(removeCommentAwardHighlight);

		// Observe the feed for new posts and remove their award buttons
		const feed = document.querySelector('shreddit-feed');
		if (feed) {
			postObserverCleanup = registerMutationCallback(
				feed,
				(mutations) => {
					mutations.forEach((mutation) => {
						mutation.addedNodes.forEach((addedNode) => {
							if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-PARTIAL', 'FACEPLATE-LOADER', 'SHREDDIT-COMMENT'].includes(addedNode.nodeName)) {
								setTimeout(() => {
									document.querySelectorAll('shreddit-post').forEach(removeAwardBtn);
								}, 1000);
							}
						});
					});
				},
				{ childList: true },
				'hideAwards',
			);
		}

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
		document.documentElement.classList.remove('re-hide-awards');
		if (postObserverCleanup) {
			postObserverCleanup();
			postObserverCleanup = null;
		}
		if (commentObserverCleanup) {
			commentObserverCleanup();
			commentObserverCleanup = null;
		}
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the changes to take effect.');
	}
}

function removeAwardBtn(post) {
	// Remove award button from Card view posts
	post.removeAttribute('is-awardable');

	// Remove award button from Compact view posts
	const overflowMenu = post.querySelector('unpacking-overflow-menu');
	if (overflowMenu) overflowMenu.removeAttribute('is-post-awardable');
}

function removeCommentAwardHighlight(comment) {
	comment.removeAttribute('award-count');
}
