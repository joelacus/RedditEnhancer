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
	buttons = ['save', 'hide', 'report', 'edit', 'delete', 'pinToProfile', 'spoilerTag', 'nsfwTag', 'brandAffiliate'];

const slots = ['share-button', 'save-button', 'hide-button', 'report-button', 'edit-button', 'pinToProfile-button', 'delete-button', 'spoilerTag-button', 'nsfwTag-button', 'brandAffiliate-button', 'overflow-menu'];

export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions', 'hidePostNotificationOption', 'hidePostSaveOption', 'hidePostHideOption', 'hidePostReportOption', 'hidePostEditOption', 'hidePostDeleteOption', 'hidePostSpoilerOption', 'hidePostNsfwOption', 'hidePostBrandAwarenessOption', 'leftSideVoteButtons'], function (result) {
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

	// Check for all necessary elements
	const overflowMenuContainer = post.querySelector('shreddit-post-overflow-menu');
	if (!overflowMenuContainer) return;
	const overflowMenu = overflowMenuContainer.shadowRoot?.querySelector('faceplate-dropdown-menu, faceplate-bottom-sheet, faceplate-menu');
	const overflowMenuBtnPlaceholder = post.querySelector('[id^="feed-post-credit-bar-t3_"] + span, span:has(> pdp-back-button) + span');
	if (!overflowMenu || !overflowMenuBtnPlaceholder) return;
	const placeholder = post.querySelector('shreddit-async-loader[bundlename="shreddit_post_overflow_menu"]');
	if (placeholder) placeholder.remove();

	// Initialise the shadow DOM slots for the buttons, appending after the share button
	post.shadowRoot?.querySelector('.shreddit-post-container').setAttribute('part', 'actionBar');
	for (let i = 1; i < slots.length; i++) {
		const previousSlot = post.shadowRoot?.querySelector(`.shreddit-post-container slot[name='${slots[i - 1]}']`);
		const slot = document.createElement('slot');
		slot.name = slots[i];
		if (previousSlot) previousSlot.insertAdjacentElement('afterend', slot);
	}

	// Stylise the overflow menu and attach it outside the shadow DOM
	if (overflowMenu.tagName === 'FACEPLATE-DROPDOWN-MENU') {
		overflowMenu.setAttribute('slot', 'overflow-menu');
		overflowMenu.setAttribute('position', 'bottom-start');
		overflowMenu.classList.add('z-5');
		overflowMenu.querySelector('button')?.classList.replace('button-plain', 'button-plain-weak');
		post.appendChild(overflowMenu);
	}

	// Stylise the current options on screen: comment, award, share
	const btnContainer = post.shadowRoot?.querySelector('.shreddit-post-container');
	if (btnContainer) {
		btnContainer.classList.remove('h-2xl', 'gap-sm');
		btnContainer.classList.replace('flex-nowrap', 'flex-wrap');
		btnContainer.classList.replace('py-xs', 'py-sm');
		if (leftSideVoteButtons) {
			btnContainer.classList.add('-m-[4px]');
		}

		const commentBtn = btnContainer.querySelector('button[data-post-click-location="comments-button"], a');
		if (commentBtn) {
			commentBtn.classList.replace('px-sm', 'p-[6px]');
			commentBtn.classList.replace('button-secondary', 'button-plain-weak');
			commentBtn.classList.remove('h-xl');
			commentBtn.classList.add('rounded-sm', 'mr-2xs');
			commentBtn.setAttribute('style', 'border: none;');
			commentBtn.setAttribute('slot', 'comment-button');

			// Replace the comment button with a slot, attach the button outside the shadow DOM
			const slot = document.createElement('slot');
			slot.name = 'comment-button';
			commentBtn.insertAdjacentElement('afterend', slot);
			post.appendChild(commentBtn);
		}

		const awardBtn = btnContainer.querySelector('award-button')?.shadowRoot?.querySelector('button');
		if (awardBtn) {
			awardBtn.classList.replace('px-sm', 'p-[6px]');
			awardBtn.classList.replace('button-secondary', 'button-plain-weak');
			awardBtn.classList.remove('h-xl');
			awardBtn.classList.add('rounded-sm', 'mr-2xs');
		}

		const shareBtn = btnContainer.querySelector('shreddit-post-share-button');
		if (shareBtn) {
			const shareInnerBtn = shareBtn.shadowRoot?.querySelector('button');
			if (shareInnerBtn) {
				shareInnerBtn.className = 'button flex flex-row justify-center items-center font-semibold relative text-12 button-plain-weak inline-flex p-[6px] rounded-sm mr-2xs h-[28px]';
				shareInnerBtn.removeAttribute('style');
				shareBtn.setAttribute('slot', 'share-button');
				post.appendChild(shareBtn);
			} else {
				const slot = document.createElement('slot');
				slot.name = 'ssr-share-button';
				btnContainer.querySelector('slot[name="share-button"]')?.insertAdjacentElement('afterend', slot);
			}
		}
	}

	const shareBtn = post.querySelector('.share-dropdown-menu button');
	if (shareBtn) {
		shareBtn.classList.replace('px-sm', 'p-[6px]');
		shareBtn.classList.replace('button-secondary', 'button-plain-weak');
		shareBtn.classList.add('rounded-sm', 'mr-2xs');
		shareBtn.classList.remove('border-md', 'h-xl');
		shareBtn.setAttribute('style', 'border: none; height: initial;');
	}

	// Move the overflow menu buttons to the action bar
	buttons.forEach((action) => {
		const button = overflowMenu.querySelector(`#post-overflow-${action} > div`);
		if (button) {
			Object.assign(button, {
				className: 'button flex flex-row justify-center items-center font-semibold relative text-12 button-plain-weak inline-flex items-center p-[6px] mr-2xs bg-transparent hover:bg-secondary-background-hover rounded-sm',
				slot: `${action}-button`,
				style: 'height: initial;',
			});
			const icon = button.querySelector('span > span');
			if (icon) {
				icon.classList.replace('h-xl', 'h-md');
				icon.classList.replace('w-xl', 'w-md');
			}
			button.querySelector('span > span + span')?.classList.remove('py-[var(--rem6)]'); // Remove padding from text
			const text = button.querySelector('span > span + span > .text-14');
			if (text) {
				text.classList.remove('text-14');
			}
			button.querySelector('span + span > .h-lg')?.classList.remove('h-lg'); // Remove some random placeholder
			post.appendChild(button);
			overflowMenu.querySelector(`#post-overflow-${action}`)?.remove();
		}
	});

	// Move the follow/reply notification button to the top of the post, mimic Old New UI
	if (!hideNotification) {
		const notificationBtn = overflowMenu.querySelector('#post-overflow-follow > div, #post-overflow-replyNotifs > div');
		if (notificationBtn) {
			notificationBtn.classList.remove('px-md', 'py-2xs', 'gap-[0.5rem]'); // Remove excessive padding
			notificationBtn.removeAttribute('style');
			const icon = notificationBtn.querySelector('span > span');
			if (icon) {
				icon.classList.replace('h-xl', 'h-lg');
				icon.classList.replace('w-xl', 'w-lg');
			}
			const text = notificationBtn.querySelector('span > span + span');
			if (text) text.remove();
			overflowMenuBtnPlaceholder.appendChild(notificationBtn);
			if (!overflowMenu.querySelector('#post-overflow-follow > div, #post-overflow-replyNotifs > div')) {
				overflowMenu.querySelector('#post-overflow-follow, #post-overflow-replyNotifs').remove();
			}
		}
	}

	// Move the overflow menu to the post action bar
	if (overflowMenu.tagName === 'FACEPLATE-BOTTOM-SHEET' || overflowMenu.tagName === 'FACEPLATE-MENU') {
		const button = overflowMenuContainer.shadowRoot?.querySelector('button');
		if (button) button.className = 'button flex flex-row justify-center items-center font-semibold relative text-12 button-plain-weak ' + 'inline-flex items-center p-[6px] mr-2xs bg-transparent hover:bg-secondary-background-hover rounded-sm';
		const popup = overflowMenuContainer.shadowRoot?.querySelector('rpl-dropdown');
		if (popup) popup.setAttribute('exportparts', 'popper--popup');
		overflowMenuContainer.setAttribute('slot', 'overflow-menu');
		post.appendChild(overflowMenuContainer);
	}

	// Remove the overflow menu if it has no buttons left
	if (!overflowMenu.querySelector(':not(faceplate-bottom-sheet)[id^="post-overflow-"]')) {
		overflowMenu.remove();
		overflowMenuContainer.remove();
	}
	post.classList.add('re-post-options-attached');
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
