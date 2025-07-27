/**
 * Tweaks: Productivity - Always Show Post Options
 *
 * @name alwaysShowPostOptions
 * @description Move the post and comment options from the overflow menu to the action bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */
import { showBannerMessage } from '../../banner_message';

let hideNotification = false,
	leftSideVoteButtons = false,
	buttons = ['save', 'hide', 'report', 'edit', 'delete', 'pinToProfile', 'spoilerTag', 'nsfwTag', 'brandAffiliate'];

const slots = ['share-button', 'save-button', 'hide-button', 'report-button', 'edit-button', 'pinToProfile-button', 'delete-button', 'spoilerTag-button', 'nsfwTag-button', 'brandAffiliate-button', 'overflow-menu'];

export function loadAlwaysShowPostOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions', 'hidePostNotificationOption', 'hidePostSaveOption', 'hidePostHideOption', 'hidePostReportOption', 'hidePostEditOption', 'hidePostDeleteOption', 'hidePostSpoilerOption', 'hidePostNsfwOption', 'hidePostBrandAwarenessOption', 'leftSideVoteButtons'], function (result) {
		if (result.alwaysShowPostOptions) {
			hideNotification = result.hidePostNotificationOption;
			leftSideVoteButtons = result.leftSideVoteButtons;
			if (result.hidePostSaveOption) buttons = buttons.filter((action) => action !== 'save');
			if (result.hidePostHideOption) buttons = buttons.filter((action) => action !== 'hide');
			if (result.hidePostReportOption) buttons = buttons.filter((action) => action !== 'report');
			if (result.hidePostEditOption) buttons = buttons.filter((action) => action !== 'edit');
			if (result.hidePostDeleteOption) buttons = buttons.filter((action) => action !== 'delete');
			if (result.hidePostSpoilerOption) buttons = buttons.filter((action) => action !== 'spoilerTag');
			if (result.hidePostNsfwOption) buttons = buttons.filter((action) => action !== 'nsfwTag');
			if (result.hidePostBrandAwarenessOption) buttons = buttons.filter((action) => action !== 'brandAffiliate');
			alwaysShowPostOptions(true);
		}
	});
}

/* === Enable/Disable The Features === */
export function alwaysShowPostOptions(value) {
	if (value && redditVersion === 'newnew') {
		// Attach menu options to posts and comment action rows already present on the page
		document.querySelectorAll('shreddit-post').forEach(attachPostMenu);
		document.querySelectorAll('shreddit-comment-action-row').forEach(attachCommentMenu);

		// Observe for new posts being added to the feed
		const feed = document.querySelector('shreddit-feed');
		if (feed) postObserver.observe(feed, { childList: true });

		// Observe for new comment action rows being added to the comment tree
		const commentTree = document.querySelector('shreddit-comment-tree');
		if (commentTree) {
			postObserver.observe(commentTree, { childList: true });
			commentObserver.observe(commentTree);
		}
	} else {
		postObserver.disconnect();
		commentObserver.disconnect();
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the changes to take effect.');
	}
}

function attachPostMenu(post) {
	// Check for all necessary elements
	const overflowMenuContainer = post.querySelector('shreddit-post-overflow-menu');
	if (!overflowMenuContainer) return;
	const overflowMenu = overflowMenuContainer.shadowRoot?.querySelector('faceplate-dropdown-menu, faceplate-bottom-sheet');
	const overflowMenuBtnPlaceholder = post.querySelector('[id^="feed-post-credit-bar-t3_"] + span, span:has(> pdp-back-button) + span');
	if (!overflowMenu || !overflowMenuBtnPlaceholder) return;
	const placeholder = post.querySelector('shreddit-async-loader[bundlename="shreddit_post_overflow_menu"]');
	if (placeholder) placeholder.remove();

	// Initialise the shadow DOM slots for the buttons, appending after the share button
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
			btnContainer.classList.add('m-[-6px]');
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

	if (overflowMenu.tagName === 'FACEPLATE-BOTTOM-SHEET') {
		const button = overflowMenuContainer.shadowRoot?.querySelector('button');
		if (button) button.className = 'button flex flex-row justify-center items-center font-semibold relative text-12 button-plain-weak ' + 'inline-flex items-center p-[6px] mr-2xs bg-transparent hover:bg-secondary-background-hover rounded-sm';
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

function attachCommentMenu(commentActionRow) {
	if (commentActionRow.classList.contains('re-comment-options-attached')) return;

	// Check for all necessary elements
	commentActionRow.classList.add('overflow-y-hidden');
	const overflowMenuContainer = commentActionRow.querySelector('shreddit-overflow-menu');
	if (!overflowMenuContainer) return;
	overflowMenuContainer.removeAttribute('should-use-bottom-sheet');
	overflowMenuContainer.setAttribute('slot', 'comment-overflow-menu');
	const overflowSlot = commentActionRow.shadowRoot?.querySelector('slot[name="overflow"]');
	const overflowMenu = overflowMenuContainer.shadowRoot?.querySelector('faceplate-dropdown-menu, faceplate-bottom-sheet');
	if (!overflowSlot || !overflowMenu) return;

	// Initialise the shadow DOM slots for the buttons, appending after the overflow slot
	['overflow-menu', 'send-replies', 'brand-affiliate', 'delete', 'edit', 'follow', 'report', 'save', 'share-as-post', 'share'].forEach(function (action) {
		const slot = document.createElement('slot');
		slot.name = `comment-${action}`;
		overflowSlot.insertAdjacentElement('afterend', slot);
	});
	overflowSlot.remove();

	// Move the overflow menu buttons to the action row
	[
		{
			slot: 'comment-save',
			selector: '.save-comment-menu-button > div',
			remove: '.save-comment-menu-button',
		},
		{
			slot: 'comment-follow',
			selector: '.follow-comment-menu-button > div',
			remove: '.follow-comment-menu-button',
		},
		{
			slot: 'comment-report',
			selector: 'faceplate-tracker[noun="report"] li div',
			remove: 'faceplate-tracker[noun="report"]',
		},
		// {
		// 	slot: 'comment-edit',
		// 	selector: 'faceplate-tracker[noun="edit"] li div',
		// 	remove: 'faceplate-tracker[noun="edit"]',
		// },
		{
			slot: 'comment-delete',
			selector: 'faceplate-tracker[noun="delete"] li div',
			remove: 'faceplate-tracker[noun="delete"]',
		},
		{
			slot: 'comment-brand-affiliate',
			selector: '.brand-affiliate-menu-button > div',
			remove: '.brand-affiliate-menu-button',
		},
		{
			slot: 'comment-share-as-post',
			selector: '.share-comment-as-post-button > div',
			remove: '.share-comment-as-post-button',
		},
		{
			slot: 'comment-send-replies',
			selector: 'faceplate-tracker[noun="overflow_send_replies_disable"] li div',
			remove: 'faceplate-tracker[noun="overflow_send_replies_disable"]',
		},
	].map((action) => {
		const button = overflowMenu.querySelector(action.selector);
		if (button) {
			Object.assign(button, {
				slot: action.slot,
				className: 'button border-md shrink-0 text-12 button-plain-weak inline-flex items-center font-semibold rounded-sm p-2xs',
				style: '',
			});
			const icon = button.querySelector('span > span');
			const text = button.querySelector('span > span + span > span');
			if (icon && text) {
				icon.classList.remove('h-xl', 'w-xl');
				//icon.classList.add('hidden');
			}
			button.querySelector('span > span + span')?.classList.remove('py-[var(--rem6)]');
			if (text) {
				text.classList.replace('text-14', 'text-12');
			}
			button.querySelector('span + span > .h-lg')?.classList.remove('h-lg');
			commentActionRow.appendChild(button);
			overflowMenu.querySelector(action.remove)?.remove();
		}
	});

	// If comment-overflow-menu is empty, remove it
	if (!overflowMenuContainer.querySelector('div[slot="devvit-context-actions"]') && !overflowMenu.querySelector('faceplate-tracker[noun="edit"]')) {
		overflowMenuContainer.remove();
	} else {
		const button = overflowMenuContainer.shadowRoot?.querySelector('button');
		if (button) {
			button.className = 'button border-md shrink-0 text-12 button-plain-weak inline-flex items-center font-semibold rounded-sm p-2xs';
			button.setAttribute('style', 'height: initial;');
		}
	}

	// Stylise the current options on screen: reply, share, award, insight
	const commentBtn = commentActionRow.querySelector('faceplate-tracker[noun="reply_comment"] button');
	if (commentBtn) {
		commentBtn.setAttribute('style', 'height: initial;');
		commentBtn.classList.replace('px-sm', 'p-2xs');
	}

	const shareBtnContainer = commentActionRow.querySelector('shreddit-comment-share-button');
	shareBtnContainer?.classList.remove('hidden');

	const shareBtn = shareBtnContainer?.querySelector('button');
	if (shareBtn) {
		shareBtn.setAttribute('style', 'height: initial;');
		shareBtn.classList.replace('px-sm', 'p-2xs');

		const icon = shareBtn.querySelector('span > span');
		const text = shareBtn.querySelector('span > span + span');
		if (icon && !text) {
			const textSpan = document.createElement('span');
			textSpan.textContent = 'Share';
			icon.insertAdjacentElement('afterend', textSpan);
		}
		//if (icon) icon.classList.add('hidden');
	}

	const awardBtnContainer = commentActionRow.querySelector('award-button');
	awardBtnContainer?.classList.remove('hidden');

	const awardBtn = awardBtnContainer?.shadowRoot?.querySelector('button');
	if (awardBtn) {
		awardBtn.setAttribute('style', 'height: initial;');
		awardBtn.classList.replace('px-sm', 'p-2xs');
		awardBtn.classList.add('font-semibold', 'rounded-sm');

		const icon = awardBtn.querySelector('span > span:has(svg)');
		//if (icon) icon.classList.add('hidden');
	}

	const insightBtn = commentActionRow.querySelector('a[slot="comment-insight"] button');
	if (insightBtn) {
		insightBtn.setAttribute('style', 'height: initial;');
		insightBtn.classList.replace('px-sm', 'p-2xs');
		insightBtn.classList.add('font-semibold', 'rounded-sm');
	}

	commentActionRow.classList.add('re-comment-options-attached');
}

// Observe feed for new posts and comments
const postObserver = new MutationObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (addedNode) {
				if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-PARTIAL', 'FACEPLATE-LOADER', 'SHREDDIT-COMMENT'].includes(addedNode.nodeName)) {
					document.querySelectorAll('shreddit-post:not(.re-post-options-attached)').forEach(attachPostMenu);
					document.querySelectorAll('shreddit-comment-action-row:not(.re-comment-options-attached)').forEach(attachCommentMenu);
				}
			});
		});
	}, 100)
);

const commentObserver = new ResizeObserver(
	debounce(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.target.querySelectorAll('shreddit-comment-action-row:not(.re-comment-options-attached)').forEach(attachCommentMenu);
			mutation.target.querySelectorAll('faceplate-partial[src*="/more-comments/"] button').forEach(function (button) {
				button.addEventListener('click', function () {
					setTimeout(function () {
						document.querySelectorAll('shreddit-comment-action-row:not(.re-comment-options-attached)').forEach(attachCommentMenu);
					}, 500);
				});
			});
		});
	}, 100)
);

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
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
