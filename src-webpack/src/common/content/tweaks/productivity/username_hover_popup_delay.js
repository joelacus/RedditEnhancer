/**
 * Tweaks: Productivity - Username Hover Popup Delay
 * @name usernameHoverPopupDelay
 * @description Set a custom delay for when hovering over a username before the user info card pops up.
 *
 * Applies to: New New UI (2023-)
 */

// Load the feature state from browser sync storage
export function loadUsernameHoverPopupDelay() {
	BROWSER_API.storage.sync.get(['usernameHoverPopupDelay'], function (result) {
		if (result.usernameHoverPopupDelay >= 0) {
			usernameHoverPopupDelay(result.usernameHoverPopupDelay);
		}
	});
}

// Activate the feature based on Reddit version
export function usernameHoverPopupDelay(value) {
	const enableFunctionMap = {
		newnew: enableUsernameHoverPopupDelayNewNew,
	};

	if (value >= 0) {
		enableFunctionMap[redditVersion]?.(value);
	} else {
		disableUsernameHoverPopupDelayAll();
	}
}

let observer_active = false;
let target_delay = 500;

// Function - Enable Username Hover Popup Delay - New New
function enableUsernameHoverPopupDelayNewNew(value) {
	target_delay = value * 1000;
	setDelay();
	if (observer_active) return;
	observer_active = true;
	let feed = document.querySelector('reddit-feed');
	if (!feed) {
		feed = document.querySelector('shreddit-feed');
	}
	observer.observe(feed, { childList: true, subtree: true });
}

// Function - Disable Username Hover Popup Delay - All
function disableUsernameHoverPopupDelayAll() {
	observer.disconnect();
	observer_active = false;
	document.querySelectorAll('faceplate-hovercard[enter-delay]').forEach((card) => {
		card.setAttribute('enter-delay', '500');
	});
}

// Function - Set popup delay on posts
function setDelay() {
	document.querySelectorAll('faceplate-hovercard[enter-delay]').forEach((card) => {
		const card_delay = card.getAttribute('enter-delay');
		if (card_delay !== target_delay) {
			card.setAttribute('enter-delay', target_delay);
		}
	});
}

// Observe feed for new nodes
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			setTimeout(() => {
				setDelay();
			}, 1000);
		});
	});
});
