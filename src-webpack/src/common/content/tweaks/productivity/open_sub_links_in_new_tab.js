/**
 * Tweaks: Productivity - Open Subreddits In New Tab
 * @name openSubInNewTab
 * @description Set subreddit links to open in a new tab.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadOpenSubInNewTab() {
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		if (result.openSubInNewTab) openSubInNewTab(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function openSubInNewTab(value) {
	if (redditVersion === 'newnew' && value) {
		// Initial pass
		applyTweak();
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
									applyTweak();
								}, 1000);
							}
						});
					});
				},
				{ childList: true, subtree: true },
				'openSubInNewTab',
			);
		}

		function applyTweak() {
			const links = document.querySelectorAll('shreddit-post [data-testid="subreddit-name"]:not(.re-sub-link)');
			if (links) {
				links.forEach(function (link) {
					link.classList.add('re-sub-link');
					link.removeAttribute('data-click-id');
					link.setAttribute('target', '_blank');
					link.addEventListener('click', function (event) {
						event.stopPropagation();
					});
				});
			}
		}
	} else {
		// Cleanup observer
		if (observerCleanup) {
			observerCleanup();
			observerCleanup = null;
		}
		const links = document.querySelectorAll('.re-sub-link');
		if (links) {
			links.forEach(function (link) {
				link.classList.remove('re-sub-link');
				link.setAttribute('data-click-id', 'subreddit');
				link.removeAttribute('target');
			});
		}
	}
}
