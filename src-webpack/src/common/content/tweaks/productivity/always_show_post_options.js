/**
 * Tweaks: Productivity - Always Show Post Options
 *
 * @name alwaysShowPostOptions
 * @description Move the post options from the overflow menu to the action bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */
import { showBannerMessage } from '../../banner_message';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

let hideNotification = false,
	leftSideVoteButtons = false,
	buttons = ['award', 'brandAffiliate', 'delete', 'edit', 'hide', 'nsfwTag', 'pinToProfile', 'report', 'save', 'spoilerTag'];

export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions', 'hidePostAwardOption', 'hidePostBrandAwarenessOption', 'hidePostDeleteOption', 'hidePostEditOption', 'hidePostHideOption', 'hidePostNotificationOption', 'hidePostNsfwOption', 'hidePostReportOption', 'hidePostSaveOption', 'hidePostSpoilerOption', 'leftSideVoteButtons'], function (result) {
		if (result.alwaysShowPostOptions === true) {
			hideNotification = result.hidePostNotificationOption;
			leftSideVoteButtons = result.leftSideVoteButtons;
			if (result.hidePostSaveOption === true) buttons = buttons.filter((action) => action !== 'save');
			if (result.hidePostHideOption === true) buttons = buttons.filter((action) => action !== 'hide');
			if (result.hidePostReportOption === true) buttons = buttons.filter((action) => action !== 'report');
			if (result.hidePostEditOption === true) buttons = buttons.filter((action) => action !== 'edit');
			if (result.hidePostDeleteOption === true) buttons = buttons.filter((action) => action !== 'delete');
			if (result.hidePostSpoilerOption === true) buttons = buttons.filter((action) => action !== 'spoilerTag');
			if (result.hidePostNsfwOption === true) buttons = buttons.filter((action) => action !== 'nsfwTag');
			if (result.hidePostBrandAwarenessOption === true) buttons = buttons.filter((action) => action !== 'brandAffiliate');
			if (result.hidePostAwardOption === true) buttons = buttons.filter((action) => action !== 'award');
			alwaysShowPostOptions(true);
		}
	});
}

// Store cleanup function for the observer
let observerPostCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function alwaysShowPostOptions(value) {
	if (value && redditVersion === 'newnew') {
		// Attach menu options to posts and comment action rows already present on the page
		document.querySelectorAll('shreddit-post').forEach(attachPostMenu);

		// Register with centralised observer manager
		// Clean up any existing observer first
		if (observerPostCleanup) {
			observerPostCleanup();
		}
		const feed = document.querySelector('shreddit-feed');
		if (feed) {
			observerPostCleanup = registerMutationCallback(
				feed,
				(mutations) => {
					mutations.forEach((mutation) => {
						mutation.addedNodes.forEach((addedNode) => {
							if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
								setTimeout(() => {
									document.querySelectorAll('shreddit-post:not(.re-post-options-attached)').forEach(attachPostMenu);
								}, 1000);
							}
						});
					});
				},
				{ childList: true, subtree: true },
				'alwaysShowPostOptions',
			);
		}
	} else {
		// Cleanup observer
		if (observerPostCleanup) {
			observerPostCleanup();
			observerPostCleanup = null;
		}
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the changes to take effect.');
	}
}

function attachPostMenu(post) {
	// Prevent duplicate modifications if already attached
	if (post.classList.contains('re-post-options-attached')) return;

	// Get overflow menu element
	const overflowMenuButton = post.querySelector('shreddit-post-overflow-menu');
	const overflowMenuContainer = post.querySelector('shreddit-post-overflow-menu')?.closest('span');
	const overflowMenu = overflowMenuButton.shadowRoot?.querySelector('faceplate-dropdown-menu, faceplate-bottom-sheet, faceplate-menu') || post?.querySelector('shreddit-post-overflow-menu')?.shadowRoot?.querySelector('faceplate-menu');
	if (!overflowMenuButton || !overflowMenu) return;

	// Point of reference
	const shareButton = post.shadowRoot.querySelector('slot[name="share-button"]');
	const shareButton2 = shareButton.querySelector('shreddit-post-share-button').shadowRoot.querySelector('button');
	if (shareButton2) shareButton2.style.borderRadius = 'var(--re-theme-border-radius)';

	// Init action bar
	const actionBar = shareButton.parentElement;
	actionBar.style.flexWrap = 'wrap';
	actionBar.style.height = 'fit-content';

	// Move Follow button
	const followButton = overflowMenu.querySelector('#post-overflow-follow') || overflowMenu.querySelector('#post-overflow-replyNotifs');
	followButton.querySelector(':scope > div').removeAttribute('style');
	followButton.querySelector(':scope > div').classList.remove('gap-xs');
	followButton.querySelector(':scope > div').style.padding = 0;
	followButton.querySelector(':scope > div').style.borderRadius = 'var(--re-theme-border-radius)';
	followButton.querySelector('span:has(>.text-body-2)').style.display = 'none';
	overflowMenuContainer.append(followButton);
	if (followButton.previousElementSibling.getAttribute('bundleName') === 'shreddit_post_overflow_menu') followButton.style.marginRight = '0.5rem';

	// Move remaining buttons
	buttons.forEach((action) => {
		const buttonEl = overflowMenu.querySelector(`#post-overflow-${action}`);
		if (buttonEl) {
			buttonEl.className = 'button button-secondary';
			buttonEl.style.borderRadius = 'var(--re-theme-border-radius)';
			buttonEl.querySelector(':scope div.py-2xs').classList.remove('py-2xs');
			buttonEl.querySelector(':scope div').style.color = 'var(--re-theme-post-text-2)';
			buttonEl.querySelector(':scope div').style.padding = 0;
			buttonEl.querySelector(':scope div > span').classList.remove('gap-xs');
			actionBar.insertBefore(buttonEl, shareButton);
		}
	});

	post.classList.add('re-post-options-attached');

	if (!overflowMenu.querySelector('li')) {
		overflowMenuButton.style.display = 'none';
	}
}

export function hidePostNotificationOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostSaveOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostHideOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostReportOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostEditOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostDeleteOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostSpoilerOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostNsfwOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostBrandAwarenessOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

export function hidePostAwardOption() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}
