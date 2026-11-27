/**
 * Tweaks: Productivity - Default Feed Tab
 *
 * @name defaultFeedTab
 * @description Selects the preferred home feed tab ("For You" or "Following") when the home
 * feed loads. "Reddit Default" leaves Reddit's own remembered/default tab
 * alone. The "Default Home Feed Sort Option" takes precedence because sorting
 * the home feed forces the Following feed.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { waitForAddedNode } from './tweak_loaders/main_observer';

const HOME_PATH = '/';
const RETRY_DELAY = 1200;
const CLICK_COOLDOWN = 700;
const WATCH_DURATION = 5000;
const MAX_CLICKS = 3;

// Only apply the default when the user enters the home feed, not when they
// switch tabs manually while already on it.
let lastPathname = null;
let activePath = null;
let attemptId = 0;
let retryTimer = null;
let watchTimer = null;
let groupObserver = null;
let cancelGroup = null;
let cancelHandlers = null;

// Going back or forward is a user action; do not re-apply the default over it.
window.addEventListener('popstate', clearAttempt);

export function loadDefaultFeedTab() {
	if (redditVersion !== 'newnew') return;

	const pathname = window.location.pathname;
	if (activePath && pathname !== activePath) clearAttempt();
	const enteredHome = pathname === HOME_PATH && lastPathname !== HOME_PATH;
	lastPathname = pathname;
	if (!enteredHome) return;

	BROWSER_API.storage.sync.get(['defaultFeedTab', 'enableDefaultHomeFeedSortOption'], function (result) {
		if (BROWSER_API.runtime.lastError) {
			console.debug('[RedditEnhancer] defaultFeedTab: Unable to read storage: ' + BROWSER_API.runtime.lastError);
			return;
		}
		if (result.enableDefaultHomeFeedSortOption === true) {
			console.debug('[RedditEnhancer] defaultFeedTab: Skipped because the home feed sort option is enabled');
			return;
		}

		let tabId;
		if (result.defaultFeedTab === 'following') {
			tabId = 'feed-tab-2';
		} else if (result.defaultFeedTab === 'for-you') {
			tabId = 'feed-tab-1';
		} else {
			return;
		}

		// Reddit has already opened the Following feed.
		if (tabId === 'feed-tab-2' && new URL(window.location.href).searchParams.get('feed') === 'following') return;

		selectTab(tabId, pathname);
	});
}

/**
 * Wait for the tab to render, then select it. Reddit's SSR markup can appear
 * before React attaches the click handler, and Reddit may apply its remembered
 * tab after hydration, so keep checking for a short while. A successful
 * selection or any real user interaction stops the checks.
 *
 * @param {string} tabId ID of the tab button
 * @param {string} expectedPath Path the tab should be selected on
 */
function selectTab(tabId, expectedPath) {
	const thisAttempt = ++attemptId;
	clearAttempt();
	activePath = expectedPath;

	waitForAddedNode(
		{
			id: true,
			query: tabId,
			done: () => {
				if (thisAttempt !== attemptId || window.location.pathname !== expectedPath) return;
				const tab = document.getElementById(tabId);
				if (!tab) return;

				const deadline = Date.now() + WATCH_DURATION;
				let clicks = 0;
				let lastClickAt = 0;

				const attempt = () => {
					if (thisAttempt !== attemptId || window.location.pathname !== expectedPath) {
						clearAttempt();
						return;
					}
					if (Date.now() > deadline) {
						clearAttempt();
						return;
					}

					const current = document.getElementById(tabId);
					if (!current || current.disabled || isTabSelected(current)) return;

					const now = Date.now();
					if (clicks >= MAX_CLICKS || now - lastClickAt < CLICK_COOLDOWN) return;
					clicks++;
					lastClickAt = now;
					clickTab(tabId, thisAttempt, expectedPath);
				};

				const group = tab.closest('#feed-tab-group');
				if (group) {
					cancelGroup = group;
					const cancel = () => clearAttempt();
					const cancelTrustedClick = (event) => {
						if (event.isTrusted) clearAttempt();
					};
					cancelHandlers = { cancel, cancelTrustedClick };
					group.addEventListener('pointerdown', cancel, { capture: true, once: true });
					group.addEventListener('keydown', cancel, { capture: true, once: true });
					group.addEventListener('click', cancelTrustedClick, { capture: true, once: true });

					// Reddit can swap the selected tab once hydration applies its
					// remembered tab, so react to the selection changing at any point
					// during the watch window.
					groupObserver = new MutationObserver(attempt);
					groupObserver.observe(group, {
						attributes: true,
						subtree: true,
						attributeFilter: ['class', 'aria-selected', 'aria-current'],
					});
				}

				attempt();
				retryTimer = setInterval(attempt, RETRY_DELAY);
				watchTimer = setTimeout(clearAttempt, WATCH_DURATION + 100);
			},
		},
		15000,
	);
}

function clearAttempt() {
	if (retryTimer) {
		clearInterval(retryTimer);
		retryTimer = null;
	}
	if (watchTimer) {
		clearTimeout(watchTimer);
		watchTimer = null;
	}
	if (groupObserver) {
		groupObserver.disconnect();
		groupObserver = null;
	}
	if (cancelGroup && cancelHandlers) {
		cancelGroup.removeEventListener('pointerdown', cancelHandlers.cancel, { capture: true });
		cancelGroup.removeEventListener('keydown', cancelHandlers.cancel, { capture: true });
		cancelGroup.removeEventListener('click', cancelHandlers.cancelTrustedClick, { capture: true });
		cancelGroup = null;
		cancelHandlers = null;
	}
	activePath = null;
}

function clickTab(tabId, thisAttempt, expectedPath) {
	if (thisAttempt !== attemptId || window.location.pathname !== expectedPath) return;
	const tab = document.getElementById(tabId);
	if (!tab || tab.disabled || isTabSelected(tab)) return;

	try {
		tab.click();
		console.debug('[RedditEnhancer] defaultFeedTab: Selected #' + tabId);
		// Our click is not a user interaction, but Reddit may still focus the tab.
		// Drop the focus ring once its click handler has run.
		setTimeout(() => {
			const active = document.activeElement;
			if (active && active.closest?.('#feed-tab-group')) active.blur();
		}, 0);
	} catch (error) {
		console.error('[RedditEnhancer] defaultFeedTab: Unable to select #' + tabId + ': ' + error);
	}
}

function isTabSelected(tab) {
	return tab.classList.contains('tab-selected') || tab.getAttribute('aria-selected') === 'true' || tab.getAttribute('aria-current') === 'page';
}
