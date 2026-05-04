/**
 * Tweaks: Productivity - Always Show Comment Options
 *
 * @name alwaysShowCommentOptions
 * @description Move the comment options from the overflow menu to the action bar.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { showBannerMessage } from '../../banner_message';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

let hideCommentBtnIcons = false;
let overflowButtons = ['award', 'share', 'save', 'report', 'follow', 'edit', 'delete', 'brand-affiliate', 'reply-notifications'];
let otherButtons = [];

export function loadAlwaysShowCommentOptions() {
	BROWSER_API.storage.sync.get(['alwaysShowCommentOptions', 'hideCommentAwardOption', 'hideCommentShareOption', 'hideCommentSaveOption', 'hideCommentReportOption', 'hideCommentFollowOption', 'hideCommentEditOption', 'hideCommentDeleteOption', 'hideCommentBrandAffiliateOption', 'hideCommentReplyNotificationsOption', 'removeCommentButtonIcons'], function (result) {
		if (result.alwaysShowCommentOptions === true) {
			hideCommentBtnIcons = result.removeCommentButtonIcons;
			if (result.hideCommentAwardOption === true && !otherButtons.includes('award')) otherButtons.push('award');
			if (result.hideCommentShareOption === true && !otherButtons.includes('share')) otherButtons.push('share');
			if (result.hideCommentSaveOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'save');
			if (result.hideCommentReportOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'report');
			if (result.hideCommentFollowOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'follow');
			if (result.hideCommentEditOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'edit');
			if (result.hideCommentDeleteOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'delete');
			if (result.hideCommentBrandAffiliateOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'brand-affiliate');
			if (result.hideCommentReplyNotificationsOption === true) overflowButtons = overflowButtons.filter((action) => action !== 'reply-notifications');
			alwaysShowCommentOptions(true);
		}
	});
}

let borderRadius;

// Store cleanup function for the scroll event
let commentsScrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function alwaysShowCommentOptions(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutes = ['post_page', 'comments_page'];
	if (redditVersion === 'newnew' && value && feedRoutes.includes(routeName)) {
		// Attach menu options to posts and comment action rows already present on the page
		document.querySelectorAll('shreddit-comment-action-row').forEach(attachCommentMenu);

		// Clean up any existing scroll events first
		if (commentsScrollCleanup) {
			commentsScrollCleanup();
		}

		// Add scroll event listener for post_detail pages with debounce
		if (document.querySelector('shreddit-app[pagetype="post_detail"]')) {
			const debouncedScrollHandler = debounce(() => {
				document.querySelectorAll('shreddit-comment-action-row:not(.re-comment-options-attached)').forEach(attachCommentMenu);
			}, 100);

			window.addEventListener('scroll', debouncedScrollHandler);
			commentsScrollCleanup = () => {
				window.removeEventListener('scroll', debouncedScrollHandler);
			};
		}
	} else {
		// Cleanup scroll event listener
		if (commentsScrollCleanup) {
			commentsScrollCleanup();
			commentsScrollCleanup = null;
		}
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the changes to take effect.');
	}
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
	const overflowMenu = overflowMenuContainer.shadowRoot?.querySelector('faceplate-dropdown-menu, faceplate-bottom-sheet, faceplate-menu');
	if (!overflowSlot || !overflowMenu) return;

	// Initialise the shadow DOM slots for the buttons, appending after the overflow slot
	['overflow-menu', 'send-replies', 'brand-affiliate', 'delete', 'edit', 'follow', 'report', 'save', 'share-as-post', 'share'].forEach(function (action) {
		const slot = document.createElement('slot');
		slot.name = `comment-${action}`;
		overflowSlot.insertAdjacentElement('afterend', slot);
	});
	//overflowSlot.remove();

	// Move the overflow menu buttons to the action row
	[
		{
			name: 'save',
			slot: 'comment-save',
			selector: '.save-comment-menu-button > div',
			remove: '.save-comment-menu-button',
		},
		{
			name: 'follow',
			slot: 'comment-follow',
			selector: '.follow-comment-menu-button > div',
			remove: '.follow-comment-menu-button',
		},
		{
			name: 'report',
			slot: 'comment-report',
			selector: 'faceplate-tracker[noun="report"] li div',
			remove: 'faceplate-tracker[noun="report"]',
		},
		{
			name: 'edit',
			slot: 'comment-edit',
			selector: 'faceplate-tracker[noun="edit"] li div',
			remove: 'faceplate-tracker[noun="edit"]',
		},
		{
			name: 'delete',
			slot: 'comment-delete',
			selector: 'faceplate-tracker[noun="delete"] li div',
			remove: 'faceplate-tracker[noun="delete"]',
		},
		{
			name: 'brand-affiliate',
			slot: 'comment-brand-affiliate',
			selector: '.brand-affiliate-menu-button > div',
			remove: '.brand-affiliate-menu-button',
		},
		{
			name: 'reply-notifications',
			slot: 'comment-send-replies',
			selector: 'faceplate-tracker[noun="overflow_send_replies_disable"] li div',
			remove: 'faceplate-tracker[noun="overflow_send_replies_disable"]',
		},
	]
		.filter((action) => overflowButtons.includes(action.name))
		.map((action) => {
			const button = overflowMenu.querySelector(action.selector);
			if (button) {
				// Special handling for award and share: just hide them
				if (action.slot === 'comment-edit') {
					const dropdown = commentActionRow.querySelector('shreddit-overflow-menu').shadowRoot.querySelector('rpl-dropdown');
					dropdown.append(button);
					dropdown.querySelector('faceplate-tracker').style.display = 'none';
					button.setAttribute('style', '');
					button.className = 'button border-md relative text-caption-1 button-plain-weak inline-flex items-center p-2xs font-semibold rounded-sm';
					if (borderRadius) button.style.borderRadius = `${borderRadius}px`;
					const text = button.querySelector('.text-14')?.textContent ?? button.querySelector('.text-body-2')?.textContent ?? 'Edit Comment';
					const span = document.createElement('span');
					span.className = 'text-12';
					span.textContent = text;
					button.replaceChildren(span);
				} else {
					Object.assign(button, {
						slot: action.slot,
						className: 'button border-md relative text-caption-1 button-plain-weak inline-flex items-center p-2xs font-semibold rounded-sm',
						style: '',
					});
					button.querySelector(':scope span').className = 'flex items-center';
					const icon = button.querySelector('span > span');
					icon.className = 'flex text-body-1';
					button.querySelector('svg')?.setAttribute('height', '16');
					const text = button.querySelector('span > span + span > span');
					button.querySelector('.text-body-2').className = '';
					if (icon && text) {
						icon.classList.remove('h-xl', 'w-xl');
						if (hideCommentBtnIcons) icon.classList.add('hidden');
					}
					button.querySelector('span > span + span')?.classList.remove('py-[var(--rem6)]');
					if (text) {
						text.classList.replace('text-14', 'text-12');
					}
					button.querySelector('span + span > .h-lg')?.classList.remove('h-lg');
					commentActionRow.appendChild(button);
					//overflowMenu.querySelector(action.remove)?.remove();
				}
			}
		});

	// Hide other buttons in the action bar
	otherButtons.map((name) => {
		if (name === 'award') {
			document.querySelectorAll('award-button').forEach((el) => {
				el.style.display = 'none';
			});
		} else if (name === 'share') {
			document.querySelectorAll('shreddit-comment-share-button').forEach((el) => {
				el.style.display = 'none';
			});
		}
	});

	// If comment-overflow-menu is empty, remove it
	/*if (!overflowMenuContainer.querySelector('div[slot="devvit-context-actions"]') && !overflowMenu.querySelector('faceplate-tracker[noun="edit"]')) {
		overflowMenuContainer.remove();
	} else {
		const button = overflowMenuContainer.shadowRoot?.querySelector('button');
		if (button) {
			button.className = 'button border-md relative text-caption-1 button-plain-weak inline-flex items-center p-2xs font-semibold rounded-sm';
			button.setAttribute('style', 'height: initial;');
		}
	}*/

	// Stylise the current options on screen: reply, share, award, insight
	const commentBtn = commentActionRow.querySelector('faceplate-tracker[noun="reply_comment"] button, faceplate-tracker[noun="reply"] a');
	if (commentBtn) {
		commentBtn.setAttribute('style', 'height:initial;font-weight:600;');
		commentBtn.classList.replace('px-sm', 'p-2xs');
	}

	const shareBtnContainer = commentActionRow.querySelector('shreddit-comment-share-button');
	shareBtnContainer?.classList.remove('hidden');

	const shareBtn = shareBtnContainer && commentActionRow.getAttribute('telemetry-source') === 'profile' ? shareBtnContainer.shadowRoot.querySelector('button') : shareBtnContainer.querySelector('button');
	if (shareBtn) {
		shareBtn.setAttribute('style', 'height:initial;border-radius:var(--re-theme-border-radius,4px);');
		shareBtn.classList.replace('px-sm', 'p-2xs');

		const icon = shareBtn.querySelector('span > span');
		const text = shareBtn.querySelector('span > span + span');
		if (icon && !text) {
			const textSpan = document.createElement('span');
			textSpan.textContent = 'Share';
			icon.insertAdjacentElement('afterend', textSpan);
		}
		if (icon && hideCommentBtnIcons) icon.classList.add('hidden');
	}

	const awardBtnContainer = commentActionRow.querySelector('award-button');
	awardBtnContainer?.classList.remove('hidden');

	const awardBtn = awardBtnContainer?.shadowRoot?.querySelector('button');
	if (awardBtn) {
		awardBtn.setAttribute('style', 'height: initial;');
		awardBtn.classList.replace('px-sm', 'p-2xs');
		awardBtn.classList.add('font-semibold', 'rounded-sm');

		const icon = awardBtn.querySelector('span > span:has(svg)');
		if (icon && hideCommentBtnIcons) icon.classList.add('hidden');
	}

	const insightBtn = commentActionRow.querySelector('a[slot="comment-insight"] button');
	if (insightBtn) {
		insightBtn.setAttribute('style', 'height: initial;');
		insightBtn.classList.replace('px-sm', 'p-2xs');
		insightBtn.classList.add('font-semibold', 'rounded-sm');
	}

	commentActionRow.classList.add('re-comment-options-attached');
}

export function hideCommentAwardOption() {
	refreshRequiredBanner();
}
export function hideCommentBrandAffiliateOption() {
	refreshRequiredBanner();
}
export function hideCommentDeleteOption() {
	refreshRequiredBanner();
}
export function hideCommentEditOption() {
	refreshRequiredBanner();
}
export function hideCommentFollowOption() {
	refreshRequiredBanner();
}
export function hideCommentReplyNotificationsOption() {
	refreshRequiredBanner();
}
export function hideCommentReportOption() {
	refreshRequiredBanner();
}
export function hideCommentSaveOption() {
	refreshRequiredBanner();
}
export function hideCommentShareOption() {
	refreshRequiredBanner();
}
export function removeCommentButtonIcons() {
	refreshRequiredBanner();
}

function refreshRequiredBanner() {
	BROWSER_API.storage.sync.get(['alwaysShowCommentOptions'], function (result) {
		if (result.alwaysShowCommentOptions === true) showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
	});
}
