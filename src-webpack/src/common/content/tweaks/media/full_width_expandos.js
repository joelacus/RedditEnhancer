/**
 * Tweaks: Media - Expand post previews in Compact view
 *
 * @name fullWidthExpandos
 * @description Remove the width limit and grid placement of expando content in Compact view.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadFullWidthExpandos() {
	BROWSER_API.storage.sync.get(['fullWidthExpandos']).then((result) => {
		if (result.fullWidthExpandos === true) fullWidthExpandos(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function fullWidthExpandos(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			document.querySelectorAll('shreddit-post[view-type="compactView"]').forEach(removeGridClasses);

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
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-PARTIAL', 'FACEPLATE-LOADER'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										document.querySelectorAll('shreddit-post[view-type="compactView"]').forEach(removeGridClasses);
									}, 1000);
								}
							});
						});
					},
					{ childList: true },
					'fullWidthExpandos',
				);
			}
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
		}
	}
}

function removeGridClasses(post) {
	const shadowRoot = post.shadowRoot;
	if (shadowRoot) {
		const thumbnail = shadowRoot.querySelector('slot[name="thumbnail"]');
		if (thumbnail) {
			thumbnail.parentElement.setAttribute('part', 'thumbnail');
		}
		const expandoContent = shadowRoot.querySelector('slot[name="expando-content"]');
		if (expandoContent) {
			expandoContent.parentElement.classList.remove('xs:col-start-2', 'xs:col-end-3');
		}
	}
	const expandoContent = post.querySelector('.toggle__expando .max-w-\\[768px\\], .toggle__expando .max-w-\\[720px\\]');
	if (expandoContent) {
		expandoContent.classList.remove('max-w-[768px]', 'max-w-[720px]', 'max-h-[540px]');
	}
}
