/**
 * Tweaks: Productivity - Open Post In New Tab
 * @name openPostInNewTab
 * @description Set post links to open in a new tab.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadOpenPostInNewTab() {
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		if (result.openPostInNewTab) openPostInNewTab(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function openPostInNewTab(value) {
	if (redditVersion === 'newnew' && value) {
		if (document.querySelector('shreddit-app shreddit-feed')) {
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
					'openPostInNewTab',
				);
			}

			function applyTweak() {
				const links = document.querySelectorAll('shreddit-post [slot="full-post-link"]:not(.re-post-link)');
				if (links) {
					links.forEach(function (link) {
						link.classList.add('re-post-link');
						link.setAttribute('target', '_blank');
						link.addEventListener('click', function (event) {
							event.stopPropagation();
						});
					});
				}
			}
		}
	} else {
		// Cleanup observer
		if (observerCleanup) {
			observerCleanup();
			observerCleanup = null;
		}
		const links = document.querySelectorAll('.re-post-link');
		if (links) {
			links.forEach(function (link) {
				link.classList.remove('re-post-link');
				link.setAttribute('target', '_self');
			});
		}
	}
}
