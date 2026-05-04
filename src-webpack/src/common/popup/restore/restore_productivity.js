// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Productivity
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { validateInt, validateString } from './validation';

// Restore UI settings for "Productivity" options.

export function restorePopupProductivityOptions() {
	// Scroll To Top Button Header
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		const checked = result.showToTopButton === true;
		document.querySelector('#checkbox-show-to-top-button').checked = checked;
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log(`Show Scroll To Top button in the header: ${checked}`);
	});

	// Floating Scroll To Top Button
	BROWSER_API.storage.sync.get(['showToTopButtonFloat'], function (result) {
		const checked = result.showToTopButtonFloat === true;
		document.querySelector('#checkbox-show-to-top-button-float').checked = checked;
		document.querySelector('.icon-scroll-to-top-button-float').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log(`Show floating Scroll To Top button: ${checked}`);
	});

	// Scroll To Next/Previous Post
	BROWSER_API.storage.sync.get(['scrollToPost'], function (result) {
		const checked = result.scrollToPost === true;
		document.querySelector('#checkbox-scroll-to-post').checked = checked;
		document.querySelector('.icon-scroll-to-post').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log(`Scroll to next/previous post on keypress: ${checked}`);
	});

	// Open Sub Links In New Tab
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		const checked = result.openSubInNewTab === true;
		document.querySelector('#checkbox-open-sub-new-tab').checked = checked;
		document.querySelector('.open-sub-new-tab').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Open Sub Links In New Tab: ' + checked);
	});

	// Open Post Links In New Tab
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		const checked = result.openPostInNewTab === true;
		document.querySelector('#checkbox-open-post-new-tab').checked = checked;
		document.querySelector('.open-post-new-tab').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Open Post Links In New Tab: ' + checked);
	});

	// Always Show Post Options
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions'], function (result) {
		const checked = result.alwaysShowPostOptions === true;
		document.querySelector('#checkbox-always-show-post-options').checked = checked;
		document.querySelector('.icon-always-show-post-options').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Always Show Post Options: ' + checked);
	});

	// Always Show Post Options - Hide "Notification" Option
	BROWSER_API.storage.sync.get(['hidePostNotificationOption'], function (result) {
		const checked = result.hidePostNotificationOption === true;
		document.querySelector('#checkbox-hide-post-notification-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-notification-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-notification' : 'icon-notification-slash', checked ? 'icon-notification-slash' : 'icon-notification');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Notification" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Save" Option
	BROWSER_API.storage.sync.get(['hidePostSaveOption'], function (result) {
		const checked = result.hidePostSaveOption === true;
		document.querySelector('#checkbox-hide-post-save-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-save-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-bookmark' : 'icon-bookmark-slash', checked ? 'icon-bookmark-slash' : 'icon-bookmark');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Save" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Hide" Option
	BROWSER_API.storage.sync.get(['hidePostHideOption'], function (result) {
		const checked = result.hidePostHideOption === true;
		document.querySelector('#checkbox-hide-post-hide-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-hide-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Hide" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Report" Option
	BROWSER_API.storage.sync.get(['hidePostReportOption'], function (result) {
		const checked = result.hidePostReportOption === true;
		document.querySelector('#checkbox-hide-post-report-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-report-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-flag' : 'icon-flag-slash', checked ? 'icon-flag-slash' : 'icon-flag');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Report" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Edit" Option
	BROWSER_API.storage.sync.get(['hidePostEditOption'], function (result) {
		const checked = result.hidePostEditOption === true;
		document.querySelector('#checkbox-hide-post-edit-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-edit-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-pen' : 'icon-pen-slash', checked ? 'icon-pen-slash' : 'icon-pen');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Edit" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Delete" Option
	BROWSER_API.storage.sync.get(['hidePostDeleteOption'], function (result) {
		const checked = result.hidePostDeleteOption === true;
		document.querySelector('#checkbox-hide-post-delete-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-delete-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-bin' : 'icon-bin-slash', checked ? 'icon-bin-slash' : 'icon-bin');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Delete" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Spoiler" Option
	BROWSER_API.storage.sync.get(['hidePostSpoilerOption'], function (result) {
		const checked = result.hidePostSpoilerOption === true;
		document.querySelector('#checkbox-hide-post-spoiler-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-spoiler-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-spoiler' : 'icon-spoiler-slash', checked ? 'icon-spoiler-slash' : 'icon-spoiler');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Spoiler" Option: ' + checked);
	});

	// Always Show Post Options - Hide "NSFW" Option
	BROWSER_API.storage.sync.get(['hidePostNsfwOption'], function (result) {
		const checked = result.hidePostNsfwOption === true;
		document.querySelector('#checkbox-hide-post-nsfw-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-nsfw-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-nsfw' : 'icon-nsfw-slash', checked ? 'icon-nsfw-slash' : 'icon-nsfw');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "NSFW" Option: ' + checked);
	});

	// Always Show Post Options - Hide "Brand Awareness" Option
	BROWSER_API.storage.sync.get(['hidePostBrandAwarenessOption'], function (result) {
		const checked = result.hidePostBrandAwarenessOption === true;
		document.querySelector('#checkbox-hide-post-brand-awareness-option').checked = checked;
		const icon = document.querySelector('.icon-hide-post-brand-awareness-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-brand-awareness' : 'icon-brand-awareness-slash', checked ? 'icon-brand-awareness-slash' : 'icon-brand-awareness');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Post "Brand Awareness" Option: ' + checked);
	});

	// Always Show Post Options - Remove Comment Button Icons
	BROWSER_API.storage.sync.get(['removeCommentButtonIcons'], function (result) {
		const checked = result.removeCommentButtonIcons === true;
		document.querySelector('#checkbox-remove-comment-btn-icons').checked = checked;
		const icon = document.querySelector('.icon-remove-comment-btn-icons');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-show' : 'icon-hide', checked ? 'icon-hide' : 'icon-show');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Remove Comment Button Icons: ' + checked);
	});

	// Always Show Comment Options
	BROWSER_API.storage.sync.get(['alwaysShowCommentOptions'], function (result) {
		const checked = result.alwaysShowCommentOptions === true;
		document.querySelector('#checkbox-always-show-comment-options').checked = checked;
		document.querySelector('.icon-always-show-comment-options').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Always Show Comment Options: ' + checked);
	});

	// Always Show Comment Options - Hide "Award" Option
	BROWSER_API.storage.sync.get(['hideCommentAwardOption'], function (result) {
		const checked = result.hideCommentAwardOption === true;
		document.querySelector('#checkbox-hide-comment-award-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-award-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-award' : 'icon-award-slash', checked ? 'icon-award-slash' : 'icon-award');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Award" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Share" Option
	BROWSER_API.storage.sync.get(['hideCommentShareOption'], function (result) {
		const checked = result.hideCommentShareOption === true;
		document.querySelector('#checkbox-hide-comment-share-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-share-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-share' : 'icon-share-slash', checked ? 'icon-share-slash' : 'icon-share');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Share" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Save" Option
	BROWSER_API.storage.sync.get(['hideCommentSaveOption'], function (result) {
		const checked = result.hideCommentSaveOption === true;
		document.querySelector('#checkbox-hide-comment-save-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-save-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-bookmark' : 'icon-bookmark-slash', checked ? 'icon-bookmark-slash' : 'icon-bookmark');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Save" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Report" Option
	BROWSER_API.storage.sync.get(['hideCommentReportOption'], function (result) {
		const checked = result.hideCommentReportOption === true;
		document.querySelector('#checkbox-hide-comment-report-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-report-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-flag' : 'icon-flag-slash', checked ? 'icon-flag-slash' : 'icon-flag');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Report" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Follow Comment" Option
	BROWSER_API.storage.sync.get(['hideCommentFollowOption'], function (result) {
		const checked = result.hideCommentFollowOption === true;
		document.querySelector('#checkbox-hide-comment-follow-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-follow-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-bell' : 'icon-bell-slash', checked ? 'icon-bell-slash' : 'icon-bell');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Follow Comment" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Edit" Option
	BROWSER_API.storage.sync.get(['hideCommentEditOption'], function (result) {
		const checked = result.hideCommentEditOption === true;
		document.querySelector('#checkbox-hide-comment-edit-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-edit-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-pen' : 'icon-pen-slash', checked ? 'icon-pen-slash' : 'icon-pen');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Edit" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Delete" Option
	BROWSER_API.storage.sync.get(['hideCommentDeleteOption'], function (result) {
		const checked = result.hideCommentDeleteOption === true;
		document.querySelector('#checkbox-hide-comment-delete-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-delete-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-bin' : 'icon-bin-slash', checked ? 'icon-bin-slash' : 'icon-bin');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Delete" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Brand Affiliate" Option
	BROWSER_API.storage.sync.get(['hideCommentBrandAffiliateOption'], function (result) {
		const checked = result.hideCommentBrandAffiliateOption === true;
		document.querySelector('#checkbox-hide-comment-brand-affiliate-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-brand-affiliate-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-brand-awareness' : 'icon-brand-awareness-slash', checked ? 'icon-brand-awareness-slash' : 'icon-brand-awareness');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Brand Affiliate" Option: ' + checked);
	});

	// Always Show Comment Options - Hide "Reply Notifications" Option
	BROWSER_API.storage.sync.get(['hideCommentReplyNotificationsOption'], function (result) {
		const checked = result.hideCommentReplyNotificationsOption === true;
		document.querySelector('#checkbox-hide-comment-reply-notifications-option').checked = checked;
		const icon = document.querySelector('.icon-hide-comment-reply-notifications-option');
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-bell' : 'icon-bell-slash', checked ? 'icon-bell-slash' : 'icon-bell');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Hide Comment "Reply Notifications" Option: ' + checked);
	});

	// Comments Limit
	BROWSER_API.storage.sync.get(['commentsLimit'], function (result) {
		if (typeof result.commentsLimit != 'undefined') {
			document.querySelector('#input-post-comments-limit').value = result.commentsLimit;
			if (result.commentsLimit == 0) {
				document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
				document.querySelector('#post-comments-limit-value').textContent = '1';
				var value = '1';
			} else if (result.commentsLimit != -10) {
				document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
				document.querySelector('#post-comments-limit-value').textContent = result.commentsLimit;
				var value = result.commentsLimit;
			} else {
				document.querySelector('#post-comments-limit-value').textContent = '∞';
				var value = '∞';
			}
		} else if (typeof result.commentsLimit == 'undefined') {
			document.querySelector('#input-post-comments-limit').value = -10;
			document.querySelector('#post-comments-limit-value').textContent = '∞';
			var value = '∞';
		}
		console.log('Post Comments Limit: ' + value);
	});

	// Limit Infinity Scroll
	/*BROWSER_API.storage.sync.get(['limitInfinityScroll'], function (result) {
		const checked = result.limitInfinityScroll == true
		document.querySelector('#checkbox-limit-infinity-scroll').checked = checked;
		const icon = document.querySelector('.icon-limit-infinity-scroll')
		icon.style.backgroundColor = checked === true ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-infinity' : 'icon-infinity-slash', checked ? 'icon-infinity-slash' : 'icon-infinity');
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Limit Infinity Scroll: ' + checked);
	});*/

	// Enable Default Home Feed Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultHomeFeedSortOption'], function (result) {
		const checked = result.enableDefaultHomeFeedSortOption === true;
		document.querySelector('#checkbox-default-home-feed-sort-option').checked = checked;
		document.querySelector('.icon-default-home-feed-sort-option').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Enable Default Home Feed Sort Option: ' + checked);
	});

	// Default Home Feed Sort Option
	BROWSER_API.storage.sync.get(['defaultHomeFeedSortOption'], function (result) {
		setTimeout(() => {
			// delay for translation
			if (typeof result.defaultHomeFeedSortOption != 'undefined') {
				var value = result.defaultHomeFeedSortOption;
				if (value === 'relevance') {
					value = 'best';
				}
				if (value === 'rising') {
					value = 'hot';
				}
				const text = document.querySelector(`#select-home-feed-sort-option-menu [data-value="${value}"]`).textContent;
				document.querySelector('#select-home-feed-sort-option .select').querySelector('span').textContent = text;
			} else if (typeof result.defaultHomeFeedSortOption == 'undefined') {
				const text = document.querySelector('#select-home-feed-sort-option-menu [data-value="best"]').textContent;
				document.querySelector('#select-home-feed-sort-option .select').querySelector('span').textContent = text;
				var value = 'best';
			}
			console.log('Default Home Feed Sort Option: ' + value);
		}, 500);
	});

	// Enable Default Feed Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption'], function (result) {
		const checked = result.enableDefaultFeedSortOption == true;
		document.querySelector('#checkbox-default-feed-sort-option').checked = checked;
		document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Enable Default Feed Sort Option: ' + checked);
	});

	// Default Feed Sort Option
	BROWSER_API.storage.sync.get(['defaultFeedSortOption'], function (result) {
		setTimeout(() => {
			// delay for translation
			if (typeof result.defaultFeedSortOption != 'undefined') {
				var value = result.defaultFeedSortOption;
				if (value === 'relevance') {
					value = 'best';
				} else if (value === 'rising') {
					value = 'hot';
				}
				const text = document.querySelector(`#select-feed-sort-option-menu [data-value="${value}"]`).textContent;
				document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = text;
			} else if (typeof result.defaultFeedSortOption == 'undefined') {
				const text = document.querySelector('#select-feed-sort-option-menu [data-value="best"]').textContent;
				document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = text;
				var value = 'best';
			}
			console.log('Default Feed Sort Option: ' + value);
		}, 500);
	});

	// Enable Default Comments Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption'], function (result) {
		const checked = result.enableDefaultCommentsSortOption == true;
		document.querySelector('#checkbox-default-comments-sort-option').checked = checked;
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Enable Default Comments Sort Option: ' + checked);
	});

	// Default Comments Sort Option
	BROWSER_API.storage.sync.get(['defaultCommentsSortOption'], function (result) {
		setTimeout(() => {
			// delay for translation
			const value = validateString(result.defaultCommentsSortOption, ['confidence', 'top', 'new', 'controversial', 'old', 'qa'], 'confidence');
			const text = document.querySelector('#comments-sort-' + value)?.textContent;
			document.querySelector('#select-comments-sort-option .select span').textContent = text;
			console.log('Default Comments Sort Option: ' + value);
		}, 500);
	});

	// Scroll To Next Root Comment
	BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
		const checked = result.scrollToNextRootComment === true;
		document.querySelector('#checkbox-scroll-to-next-root-comment').checked = checked;
		document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Scroll To Next Root Comment Button: ' + checked);
	});

	// Show Post Numbers
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		const checked = result.showPostNumbers === true;
		document.querySelector('#checkbox-show-post-numbers').checked = checked;
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Post Numbers: ' + checked);
	});

	// Show Post Absolute Timestamp
	BROWSER_API.storage.sync.get(['showPostAbsoluteTimestamp'], function (result) {
		const checked = result.showPostAbsoluteTimestamp === true;
		document.querySelector('#checkbox-show-post-absolute-timestamp').checked = checked;
		document.querySelector('.icon-show-post-absolute-timestamp').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Post Absolute Timestamp: ' + checked);
	});

	// Customise Post Absolute Timestamp Format
	BROWSER_API.storage.sync.get(['postAbsoluteTimestampFormat'], function (result) {
		document.querySelector('#input-post-absolute-timestamp-format').value = result.postAbsoluteTimestampFormat ?? '';
	});

	// Show Comment Absolute Timestamp
	BROWSER_API.storage.sync.get(['showCommentAbsoluteTimestamp'], function (result) {
		const checked = result.showCommentAbsoluteTimestamp === true;
		document.querySelector('#checkbox-show-comment-absolute-timestamp').checked = checked;
		document.querySelector('.icon-show-comment-absolute-timestamp').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Comment Absolute Timestamp: ' + checked);
	});

	// Customise Absolute Timestamp Format
	BROWSER_API.storage.sync.get(['commentAbsoluteTimestampFormat'], function (result) {
		document.querySelector('#input-comment-absolute-timestamp-format').value = result.commentAbsoluteTimestampFormat ?? '';
	});

	// Scroll To Next Root Comment Position X
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPosition'], function (result) {
		const valueX = result.scrollToNextRootCommentPosition?.x ?? -1;
		document.querySelector('#input-scroll-to-root-comment-position-x').value = valueX;
		document.querySelector('#scroll-to-root-comment-position-x-value').textContent = valueX > -1 ? `${Math.round(valueX)}%` : '48px';
		document.querySelector('.icon-scroll-to-root-comment-position-x').style.backgroundColor = valueX > -1 ? 'var(--accent)' : '';
		console.log(`Scroll To Next Root Comment Position X: ${valueX === -1 ? '48px' : valueX + '%'}`);

		// Scroll To Next Root Comment Position Y
		const valueY = result.scrollToNextRootCommentPosition?.y ?? -1;
		document.querySelector('#input-scroll-to-root-comment-position-y').value = valueY;
		document.querySelector('#scroll-to-root-comment-position-y-value').textContent = valueY > -1 ? `${Math.round(valueY)}%` : '50%';
		document.querySelector('.icon-scroll-to-root-comment-position-y').style.backgroundColor = valueY > -1 ? 'var(--accent)' : '';
		console.log(`Scroll To Next Root Comment Position Y: ${valueY === -1 ? '50%' : valueY + '%'}`);
	});

	// Break Reminder
	/*BROWSER_API.storage.sync.get(['breakReminder'], function (result) {
		const checked = result.breakReminder === true
		document.querySelector('#checkbox-break-reminder').checked = checked;
		document.querySelector('.icon-break-reminder').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Break Reminder: ' + checked);
	});*/

	// Break Reminder Frequency
	/*BROWSER_API.storage.sync.get(['breakReminderFrequency'], function (result) {
		const value = result.breakReminderFrequency ?? 50
		document.querySelector('#input-break-reminder-frequency').value = value;
		document.querySelector('#break-reminder-frequency-value').textContent = value;
		console.log('Break Reminder Frequency: ' + value);
	});*/

	// Show Post Author
	BROWSER_API.storage.sync.get(['showPostAuthor'], function (result) {
		const checked = result.showPostAuthor === true;
		document.querySelector('#checkbox-show-post-author').checked = checked;
		document.querySelector('.icon-show-post-author').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Post Author: ' + checked);
	});

	// Show Post Flair
	BROWSER_API.storage.sync.get(['showPostFlair'], function (result) {
		const checked = result.showPostFlair === true;
		document.querySelector('#checkbox-show-post-flair').checked = checked;
		document.querySelector('.icon-show-post-flair').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Post Flair: ' + checked);
	});

	// Add User Profile Pictures To Comments
	BROWSER_API.storage.sync.get(['addProfilePicturesToComments'], function (result) {
		const checked = result.addProfilePicturesToComments === true;
		document.querySelector('#checkbox-add-profile-pictures-to-comments').checked = checked;
		document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Add User Profile Pictures To Comments: ' + checked);
	});

	// Auto Collapse AutoModerator Comment
	BROWSER_API.storage.sync.get(['autoCollapseAutoModeratorComment'], function (result) {
		const checked = result.autoCollapseAutoModeratorComment === true;
		document.querySelector('#checkbox-auto-collapse-automoderator-comment').checked = checked;
		document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Auto Collapse AutoModerator Comment: ' + checked);
	});

	// Auto Load More Comments
	BROWSER_API.storage.sync.get(['autoLoadMoreComments'], function (result) {
		const checked = result.autoLoadMoreComments === true;
		document.querySelector('#checkbox-auto-load-more-comments').checked = checked;
		document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Auto Load More Comments: ' + checked);
	});

	// Only Load Downvoted Comments
	BROWSER_API.storage.sync.get(['autoLoadMoreCommentsDownvotedOnly'], function (result) {
		const checked = result.autoLoadMoreCommentsDownvotedOnly === true;
		document.querySelector('#checkbox-only-load-downvoted-comments').checked = checked;
		document.querySelector('.icon-only-load-downvoted-comments').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Only Load Downvoted Comments: ' + checked);
	});

	// Better Comment Box
	BROWSER_API.storage.sync.get(['betterCommentBox'], function (result) {
		const checked = result.betterCommentBox === true;
		document.querySelector('#checkbox-better-comment-box').checked = checked;
		document.querySelector('.icon-better-comment-box').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Better Comment Box: ' + checked);
	});

	// Sticky Sort
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		const checked = result.stickySort === true;
		document.querySelector('#checkbox-sticky-sort').checked = checked;
		document.querySelector('.sticky-sort').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Sticky Sort: ' + checked);
	});

	// Username Hover Popup Delay
	BROWSER_API.storage.sync.get(['usernameHoverPopupDelay'], function (result) {
		const value = validateInt(result.usernameHoverPopupDelay, -0.5, 10, -0.5);
		document.querySelector('#input-username-hover-popup-delay').value = value;
		document.querySelector('#username-hover-popup-delay-value').textContent = value === -0.5 ? '0.5s' : `${value}s`;
		document.querySelector('.icon-username-hover-popup-delay').style.backgroundColor = value > -0.5 ? 'var(--accent)' : '';
		console.log(`Scroll To Next Root Comment Position: ${value === -0.5 ? '0.5s' : value + 's'}`);
	});

	// Show Upvote Ratio
	BROWSER_API.storage.sync.get(['showUpvoteRatio'], function (result) {
		const checked = result.showUpvoteRatio === true;
		document.querySelector('#checkbox-show-upvote-ratio').checked = checked;
		document.querySelector('.icon-show-upvote-ratio').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Upvote Ratio: ' + checked);
	});

	// View Crossposts
	BROWSER_API.storage.sync.get(['viewCrossposts'], function (result) {
		const checked = result.viewCrossposts === true;
		document.querySelector('#checkbox-view-crossposts').checked = checked;
		document.querySelector('.icon-view-crossposts').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('View Crossposts: ' + checked);
	});

	// Mark Read On Open Expandos
	BROWSER_API.storage.sync.get(['markReadOnOpenExpandos'], async function (result) {
		let value = false;
		if (result.markReadOnOpenExpandos) {
			await BROWSER_API.permissions
				.contains({ permissions: ['history'] })
				.then((granted) => {
					if (granted) {
						console.debug('markReadOnOpenExpandos: history permission granted');
						document.querySelector('.icon-mark-read-on-open-expandos').style.backgroundColor = 'var(--accent)';
						highlightMenuIcon('productivity-tweaks');
						value = true;
					} else {
						console.debug('markReadOnOpenExpandos: history permission denied');
					}
				})
				.catch((e) => {
					console.error('markReadOnOpenExpandos: Error getting history permission: ', e);
				});
		}
		document.querySelector('#checkbox-mark-read-on-open-expandos').checked = value;
		console.log('Mark Read On Open Expandos: ' + value);
	});

	// Add Mark Post As Read Button
	BROWSER_API.storage.sync.get(['markPostAsReadButton'], function (result) {
		const checked = result.markPostAsReadButton === true;
		document.querySelector('#checkbox-add-mark-post-as-read-button').checked = checked;
		document.querySelector('.icon-add-mark-post-as-read-button').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Add Mark Post As Read Button: ' + checked);
	});

	// Show Member Count
	BROWSER_API.storage.sync.get(['showMemberCount'], function (result) {
		const checked = result.showMemberCount === true;
		document.querySelector('#checkbox-show-member-count').checked = checked;
		document.querySelector('.icon-show-member-count').style.backgroundColor = checked === true ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Member Count: ' + checked);
	});

	// Canned Messages
	BROWSER_API.storage.sync.get(['cannedMessages', 'cannedMessagesList'], function (result) {
		const checked = result.cannedMessages === true;
		document.querySelector('#checkbox-canned-messages').checked = checked;
		document.querySelector('.icon-canned-messages').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Canned Messages: ' + checked);

		// Canned Messages List
		const list = result.cannedMessagesList ?? '';
		const textarea = document.querySelector('#input-canned-messages');
		textarea.value = list;

		console.log('Canned Messages List: ' + list);
	});

	// Clean Link
	BROWSER_API.storage.sync.get(['cleanLink'], function (result) {
		const checked = result.cleanLink === true;
		document.querySelector('#checkbox-clean-link').checked = checked;
		document.querySelector('.icon-clean-link').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Clean Link: ' + checked);
	});

	// Shorten Clean Link
	BROWSER_API.storage.sync.get(['shortenCleanLink'], function (result) {
		const checked = result.shortenCleanLink === true;
		document.querySelector('#checkbox-shorten-clean-link').checked = checked;
		document.querySelector('.icon-shorten-clean-link').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Shorten Clean Link: ' + checked);
	});

	// Show Communities Filter
	BROWSER_API.storage.sync.get(['showCommunitiesFilter'], function (result) {
		const checked = result.showCommunitiesFilter === true;
		document.querySelector('#checkbox-show-communities-filter').checked = checked;
		document.querySelector('.icon-show-communities-filter').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('productivity-tweaks');
		console.log('Show Communities Filter: ' + checked);
	});
}
