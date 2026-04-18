/**
 * Tweaks: Hide Elements - Hide Vote Buttons
 *
 * @name hideVoteButtons
 * @description Hide the vote buttons on posts and comments.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideVoteButtons() {
	BROWSER_API.storage.sync.get(['hideVoteButtons']).then((result) => {
		if (result.hideVoteButtons) hideVoteButtons(true);
	});
}

// Store cleanup functions for the observer and scroll event
let observerCleanup = null;
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideVoteButtons(value) {
	if (redditVersion === 'old') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-vote-buttons"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-vote-buttons';
				styleElement.textContent = `/* Post vote buttons */
                                            .thing div.midcol,
                                            /* Comment vote buttons */
                                            .comment div.midcol {
                                                display: none;
                                                visibility: hidden;
                                            }
                                            a.thumbnail {
                                                margin-left: .5rem;
                                            }`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-vote-buttons"]');
			dynamicStyleElements.forEach((element) => {
				element.remove();
			});
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-vote-buttons"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-vote-buttons';
				styleElement.textContent = `.re-vote-panel span,
                                            shreddit-post::part(vote),
                                            shreddit-comment-action-row::part(vote) {
                                                visibility: hidden;
                                            }`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			attachPartObserver();
			// Register with centralised observer manager
			// Clean up any existing observer first
			if (observerCleanup) {
				observerCleanup();
			}
			const feed = document.querySelector('shreddit-feed');
			if (feed) {
				observerCleanup = registerMutationCallback(
					feed,
					(mutations) => {
						mutations.forEach((mutation) => {
							mutation.addedNodes.forEach((addedNode) => {
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										attachPartObserver();
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'hideVoteButtons',
				);
			}

			// Add scroll event listener for post_detail pages with debounce
			if (document.querySelector('shreddit-app[pagetype="post_detail"]')) {
				const debouncedScrollHandler = debounce(() => {
					attachPartObserver();
				}, 100);

				window.addEventListener('scroll', debouncedScrollHandler);
				scrollCleanup = () => {
					window.removeEventListener('scroll', debouncedScrollHandler);
				};
			}
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-vote-buttons"]');
			dynamicStyleElements.forEach((element) => {
				element.remove();
			});
			detachPartObserver();

			// Cleanup scroll event listener
			if (scrollCleanup) {
				scrollCleanup();
				scrollCleanup = null;
			}
		}
	}
}

// Attach part attribute to element inside shadow DOM (shreddit-post, shreddit-comment-action-row)
function attachPartObserver() {
	document.querySelectorAll('shreddit-post, shreddit-comment-action-row').forEach((element) => {
		element.shadowRoot?.querySelector('button[upvote')?.setAttribute('part', 'vote');
		element.shadowRoot?.querySelector('button[downvote')?.setAttribute('part', 'vote');
	});
}

// Detach part attribute from element inside shadow DOM (shreddit-post, shreddit-comment-action-row)
function detachPartObserver() {
	document.querySelectorAll('shreddit-post, shreddit-comment-action-row').forEach((element) => {
		element.shadowRoot?.querySelector('button[upvote')?.removeAttribute('part', 'vote');
		element.shadowRoot?.querySelector('button[downvote')?.removeAttribute('part', 'vote');
	});
}
