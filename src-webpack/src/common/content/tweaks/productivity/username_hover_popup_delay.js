/**
 * Tweaks: Productivity - Username Hover Popup Delay
 *
 * @name usernameHoverPopupDelay
 * @description Set a custom delay for when hovering over a username before the user info card pops up.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadUsernameHoverPopupDelay() {
	BROWSER_API.storage.sync.get(['usernameHoverPopupDelay'], function (result) {
		if (result.usernameHoverPopupDelay >= 0) {
			usernameHoverPopupDelay(result.usernameHoverPopupDelay);
		}
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function usernameHoverPopupDelay(value) {
	if (redditVersion === 'newnew' && value >= 0) {
		enableUsernameHoverPopupDelayRV3;
	} else {
		disableUsernameHoverPopupDelayAll();
	}
}

// let observer_active = false;
let target_delay = 500;

// Enable Username Hover Popup Delay - RV3
function enableUsernameHoverPopupDelayRV3(value) {
	target_delay = value * 1000;
	setDelay();
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
								setDelay();
							}, 1000);
						}
					});
				});
			},
			{ childList: true, subtree: true },
			'usernameHoverPopupDelay',
		);
	}
}

// Disable Username Hover Popup Delay - All
function disableUsernameHoverPopupDelayAll() {
	// Cleanup observer
	if (observerCleanup) {
		observerCleanup();
		observerCleanup = null;
	}
	document.querySelectorAll('faceplate-hovercard[enter-delay]').forEach((card) => {
		card.setAttribute('enter-delay', '500');
	});
}

// Set popup delay on posts
function setDelay() {
	document.querySelectorAll('faceplate-hovercard[enter-delay]').forEach((card) => {
		const card_delay = card.getAttribute('enter-delay');
		if (card_delay !== target_delay) {
			card.setAttribute('enter-delay', target_delay);
		}
	});
}
