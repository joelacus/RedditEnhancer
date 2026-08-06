/**
 * Tweaks: Hide Elements - Hide Repost Button
 *
 * @name hideRepostButton
 * @description Hide the repost button on posts.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */
import { registerMutationCallback, unregisterMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideRepostButton() {
	BROWSER_API.storage.sync.get(['hideRepostButton']).then(function (result) {
		if (result.hideRepostButton) hideRepostButton(true);
	});
}

// Store cleanup function for the observer
let postObserverCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideRepostButton(value) {
	if (value && redditVersion === 'newnew') {
		// Add a CSS class which lets RE_styles.css know to hide award-button in comments
		document.documentElement.classList.add('re-hide-repost-button');

		// Initially remove repost buttons from existing posts
		document.querySelectorAll('shreddit-post').forEach(enableHideRepostButton);

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
									document.querySelectorAll('shreddit-post').forEach(enableHideRepostButton);
								}, 1000);
							}
						});
					});
				},
				{ childList: true },
				'hideRepostButton',
			);
		}
	} else {
		// Remove the CSS class that hides award buttons and disconnect the observer
		document.documentElement.classList.remove('re-hide-awards');
		if (postObserverCleanup) {
			postObserverCleanup();
			postObserverCleanup = null;
		}

		document.querySelectorAll('shreddit-post').forEach(disableHideRepostButton);
	}
}

function enableHideRepostButton(post) {
	const button = post.querySelector('[slot="repost-button"]') || post.shadowRoot.querySelector('[slot="repost-button"]') || post.shadowRoot.querySelector('slot[name="repost-button"]');
	button.style.display = 'none';
}

function disableHideRepostButton(post) {
	const button = post.querySelector('[slot="repost-button"]') || post.shadowRoot.querySelector('[slot="repost-button"]') || post.shadowRoot.querySelector('slot[name="repost-button"]');
	button.style.display = '';
}
