// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Productivity Tweaks
// ────────────────────────────────────────────────────────────────────────────

import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';

// Toggle - Sticky Sort
document.querySelector('#checkbox-sticky-sort').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ stickySort: this.checked });
	sendMessage({ stickySort: this.checked });
	document.querySelector('.sticky-sort').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Show Scroll To Top Button In The Header
document.querySelector('#checkbox-show-to-top-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showToTopButton: this.checked });
	sendMessage({ showToTopButton: this.checked });
	document.querySelector('.icon-scroll-to-top').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Show Floating Scroll To Top Button
document.querySelector('#checkbox-show-to-top-button-float').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showToTopButtonFloat: this.checked });
	sendMessage({ showToTopButtonFloat: this.checked });
	document.querySelector('.icon-scroll-to-top-button-float').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Scroll To Next/Previous Post
document.querySelector('#checkbox-scroll-to-post').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ scrollToPost: this.checked });
	sendMessage({ scrollToPost: this.checked });
	document.querySelector('.icon-scroll-to-post').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Open Sub Links In New Tab
document.querySelector('#checkbox-open-sub-new-tab').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ openSubInNewTab: this.checked });
	sendMessage({ openSubInNewTab: this.checked });
	document.querySelector('.open-sub-new-tab').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Open Post Links In New Tab
document.querySelector('#checkbox-open-post-new-tab').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ openPostInNewTab: this.checked });
	sendMessage({ openPostInNewTab: this.checked });
	document.querySelector('.open-post-new-tab').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options
document.querySelector('#checkbox-always-show-post-options').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ alwaysShowPostOptions: this.checked });
	sendMessage({ alwaysShowPostOptions: this.checked });
	document.querySelector('.icon-always-show-post-options').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Notification" Option
document.querySelector('#checkbox-hide-post-notification-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostNotificationOption: this.checked });
	sendMessage({ hidePostNotificationOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-notification-option');
	icon.classList.replace(this.checked ? 'icon-notification' : 'icon-notification-slash', this.checked ? 'icon-notification-slash' : 'icon-notification');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Save" Option
document.querySelector('#checkbox-hide-post-save-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostSaveOption: this.checked });
	sendMessage({ hidePostSaveOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-save-option');
	icon.classList.replace(this.checked ? 'icon-bookmark' : 'icon-bookmark-slash', this.checked ? 'icon-bookmark-slash' : 'icon-bookmark');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Hide" Option
document.querySelector('#checkbox-hide-post-hide-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostHideOption: this.checked });
	sendMessage({ hidePostHideOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-hide-option');
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Report" Option
document.querySelector('#checkbox-hide-post-report-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostReportOption: this.checked });
	sendMessage({ hidePostReportOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-report-option');
	icon.classList.replace(this.checked ? 'icon-flag' : 'icon-flag-slash', this.checked ? 'icon-flag-slash' : 'icon-flag');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Edit" Option
document.querySelector('#checkbox-hide-post-edit-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostEditOption: this.checked });
	sendMessage({ hidePostEditOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-edit-option');
	icon.classList.replace(this.checked ? 'icon-pen' : 'icon-pen-slash', this.checked ? 'icon-pen-slash' : 'icon-pen');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Delete" Option
document.querySelector('#checkbox-hide-post-delete-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostDeleteOption: this.checked });
	sendMessage({ hidePostDeleteOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-delete-option');
	icon.classList.replace(this.checked ? 'icon-bin' : 'icon-bin-slash', this.checked ? 'icon-bin-slash' : 'icon-bin');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Spoiler" Option
document.querySelector('#checkbox-hide-post-spoiler-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostSpoilerOption: this.checked });
	sendMessage({ hidePostSpoilerOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-spoiler-option');
	icon.classList.replace(this.checked ? 'icon-spoiler' : 'icon-spoiler-slash', this.checked ? 'icon-spoiler-slash' : 'icon-spoiler');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "NSFW" Option
document.querySelector('#checkbox-hide-post-nsfw-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostNsfwOption: this.checked });
	sendMessage({ hidePostNsfwOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-nsfw-option');
	icon.classList.replace(this.checked ? 'icon-nsfw' : 'icon-nsfw-slash', this.checked ? 'icon-nsfw-slash' : 'icon-nsfw');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Hide "Brand Awareness" Option
document.querySelector('#checkbox-hide-post-brand-awareness-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hidePostBrandAwarenessOption: this.checked });
	sendMessage({ hidePostBrandAwarenessOption: this.checked });
	const icon = document.querySelector('.icon-hide-post-brand-awareness-option');
	icon.classList.replace(this.checked ? 'icon-brand-awareness' : 'icon-brand-awareness-slash', this.checked ? 'icon-brand-awareness-slash' : 'icon-brand-awareness');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options
document.querySelector('#checkbox-always-show-comment-options').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ alwaysShowCommentOptions: this.checked });
	sendMessage({ alwaysShowCommentOptions: this.checked });
	document.querySelector('.icon-always-show-comment-options').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Post Options - Remove Comment Button Icons
document.querySelector('#checkbox-remove-comment-btn-icons').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ removeCommentButtonIcons: this.checked });
	sendMessage({ removeCommentButtonIcons: this.checked });
	const icon = document.querySelector('.icon-remove-comment-btn-icons');
	icon.classList.replace(this.checked ? 'icon-show' : 'icon-hide', this.checked ? 'icon-hide' : 'icon-show');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Award" Option
document.querySelector('#checkbox-hide-comment-award-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentAwardOption: this.checked });
	sendMessage({ hideCommentAwardOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-award-option');
	icon.classList.replace(this.checked ? 'icon-award' : 'icon-award-slash', this.checked ? 'icon-award-slash' : 'icon-award');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Share" Option
document.querySelector('#checkbox-hide-comment-share-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentShareOption: this.checked });
	sendMessage({ hideCommentShareOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-share-option');
	icon.classList.replace(this.checked ? 'icon-share' : 'icon-share-slash', this.checked ? 'icon-share-slash' : 'icon-share');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Save" Option
document.querySelector('#checkbox-hide-comment-save-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentSaveOption: this.checked });
	sendMessage({ hideCommentSaveOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-save-option');
	icon.classList.replace(this.checked ? 'icon-bookmark' : 'icon-bookmark-slash', this.checked ? 'icon-bookmark-slash' : 'icon-bookmark');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Report" Option
document.querySelector('#checkbox-hide-comment-report-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentReportOption: this.checked });
	sendMessage({ hideCommentReportOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-report-option');
	icon.classList.replace(this.checked ? 'icon-flag' : 'icon-flag-slash', this.checked ? 'icon-flag-slash' : 'icon-flag');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Follow Comment" Option
document.querySelector('#checkbox-hide-comment-follow-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentFollowOption: this.checked });
	sendMessage({ hideCommentFollowOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-follow-option');
	icon.classList.replace(this.checked ? 'icon-bell' : 'icon-bell-slash', this.checked ? 'icon-bell-slash' : 'icon-bell');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Delete" Option
document.querySelector('#checkbox-hide-comment-delete-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentDeleteOption: this.checked });
	sendMessage({ hideCommentDeleteOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-delete-option');
	icon.classList.replace(this.checked ? 'icon-bin' : 'icon-bin-slash', this.checked ? 'icon-bin-slash' : 'icon-bin');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Edit" Option
document.querySelector('#checkbox-hide-comment-edit-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentEditOption: this.checked });
	sendMessage({ hideCommentEditOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-edit-option');
	icon.classList.replace(this.checked ? 'icon-pen' : 'icon-pen-slash', this.checked ? 'icon-pen-slash' : 'icon-pen');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Brand Affiliate" Option
document.querySelector('#checkbox-hide-comment-brand-affiliate-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentBrandAffiliateOption: this.checked });
	sendMessage({ hideCommentBrandAffiliateOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-brand-affiliate-option');
	icon.classList.replace(this.checked ? 'icon-brand-awareness' : 'icon-brand-awareness-slash', this.checked ? 'icon-brand-awareness-slash' : 'icon-brand-awareness');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Always Show Comment Options - Hide "Reply Notifications" Option
document.querySelector('#checkbox-hide-comment-reply-notifications-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideCommentReplyNotificationsOption: this.checked });
	sendMessage({ hideCommentReplyNotificationsOption: this.checked });
	const icon = document.querySelector('.icon-hide-comment-reply-notifications-option');
	icon.classList.replace(this.checked ? 'icon-bell' : 'icon-bell-slash', this.checked ? 'icon-bell-slash' : 'icon-bell');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Comments Limit
document.querySelector('#input-post-comments-limit').addEventListener('input', function () {
	const icon = document.querySelector('.icon-post-comments-limit');
	const display = document.querySelector('#post-comments-limit-value');
	if (this.value == 0) {
		icon.style.backgroundColor = 'var(--accent)';
		display.innerText = '1';
	} else if (this.value != -10) {
		icon.style.backgroundColor = 'var(--accent)';
		display.innerText = this.value;
	} else {
		icon.style.backgroundColor = '';
		display.innerText = '∞';
	}
	BROWSER_API.runtime.sendMessage({ message: 'update_listener' });
	sendMessage({ commentsLimit: this.value == 0 ? 1 : this.value });
});
document.querySelector('#input-post-comments-limit').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ commentsLimit: this.value });
});

// Toggle - Enable Default Home Feed Sort Option
document.querySelector('#checkbox-default-home-feed-sort-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ enableDefaultHomeFeedSortOption: this.checked });
	sendMessage({ enableDefaultHomeFeedSortOption: this.checked });
	document.querySelector('.icon-default-home-feed-sort-option').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Dropdown - Default Home Feed Sort Option
const home_feed_sort_option_dropdown = document.querySelector('#select-home-feed-sort-option');
const home_feed_sort_option_dropdownMenu = document.querySelector('#select-home-feed-sort-option-menu');
document.querySelector('#select-home-feed-sort-option .select').addEventListener('click', function () {
	home_feed_sort_option_dropdown.classList.toggle('active');
	home_feed_sort_option_dropdownMenu.style.maxHeight = home_feed_sort_option_dropdown.classList.contains('active') ? home_feed_sort_option_dropdownMenu.scrollHeight + 'px' : '0';
});
document.addEventListener('click', function (event) {
	if (!home_feed_sort_option_dropdown.contains(event.target)) {
		home_feed_sort_option_dropdown.classList.remove('active');
		home_feed_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
home_feed_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	let homeFeedSortOption;
	if (btn === 'li') {
		homeFeedSortOption = event.target.getAttribute('data-value');
	} else if (btn === 'span') {
		homeFeedSortOption = event.target.parentNode.getAttribute('data-value');
	}
	document.querySelector('#select-home-feed-sort-option .select').querySelector('span').textContent = event.target.textContent;
	home_feed_sort_option_dropdown.classList.remove('active');
	home_feed_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultHomeFeedSortOption: homeFeedSortOption });
});

// Toggle - Enable Default Feed Sort Option
document.querySelector('#checkbox-default-feed-sort-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ enableDefaultFeedSortOption: this.checked });
	sendMessage({ enableDefaultFeedSortOption: this.checked });
	document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Dropdown - Default Feed Sort Option
const feed_sort_option_dropdown = document.querySelector('#select-feed-sort-option');
const feed_sort_option_dropdownMenu = document.querySelector('#select-feed-sort-option-menu');
document.querySelector('#select-feed-sort-option .select').addEventListener('click', function () {
	feed_sort_option_dropdown.classList.toggle('active');
	feed_sort_option_dropdownMenu.style.maxHeight = feed_sort_option_dropdown.classList.contains('active') ? feed_sort_option_dropdownMenu.scrollHeight + 'px' : '0';
});
document.addEventListener('click', function (event) {
	if (!feed_sort_option_dropdown.contains(event.target)) {
		feed_sort_option_dropdown.classList.remove('active');
		feed_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
feed_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	let feedSortOption;
	if (btn === 'li') {
		feedSortOption = event.target.getAttribute('data-value');
	} else if (btn === 'span') {
		feedSortOption = event.target.parentNode.getAttribute('data-value');
	}
	document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = event.target.textContent;
	feed_sort_option_dropdown.classList.remove('active');
	feed_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultFeedSortOption: feedSortOption });
});

// Dropdown - Default Comments Sort Option
const comments_sort_option_dropdown = document.querySelector('#select-comments-sort-option');
const comments_sort_option_dropdownMenu = document.querySelector('#select-comments-sort-option-menu');
document.querySelector('#select-comments-sort-option .select').addEventListener('click', function () {
	comments_sort_option_dropdown.classList.toggle('active');
	comments_sort_option_dropdownMenu.style.maxHeight = comments_sort_option_dropdown.classList.contains('active') ? comments_sort_option_dropdownMenu.scrollHeight + 'px' : '0';
});
document.addEventListener('click', function (event) {
	if (!comments_sort_option_dropdown.contains(event.target)) {
		comments_sort_option_dropdown.classList.remove('active');
		comments_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
comments_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	let commentsSortOption;
	if (btn === 'li') {
		commentsSortOption = event.target.id.replace('comments-sort-', '');
	} else if (btn === 'span') {
		commentsSortOption = event.target.parentNode.id.replace('comments-sort-', '');
	}
	document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = event.target.textContent;
	comments_sort_option_dropdown.classList.remove('active');
	comments_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultCommentsSortOption: commentsSortOption });
});

// Toggle - Enable Default Comments Sort Option
document.querySelector('#checkbox-default-comments-sort-option').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: this.checked });
	sendMessage({ enableDefaultCommentsSortOption: this.checked });
	document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Scroll To Next Root Comment
document.querySelector('#checkbox-scroll-to-next-root-comment').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ scrollToNextRootComment: this.checked });
	sendMessage({ scrollToNextRootComment: this.checked });
	document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Scroll To Root Comment Position X
document.querySelector('#input-scroll-to-root-comment-position-x').addEventListener('mousedown', function () {
	sendMessage({ scrollToNextRootCommentRemoveStyle: true });
});
document.querySelector('#input-scroll-to-root-comment-position-x').addEventListener('input', function () {
	document.querySelector('.icon-scroll-to-root-comment-position-x').style.backgroundColor = this.value === '-1' ? '' : 'var(--accent)';
	const display = document.querySelector('#scroll-to-root-comment-position-x-value');
	display.innerText = this.value === '-1' ? '48px' : `${this.value}%`;
	const valueY = document.querySelector('#input-scroll-to-root-comment-position-y').value;
	sendMessage({ scrollToNextRootCommentPosition: { x: this.value, y: valueY } });
});
document.querySelector('#input-scroll-to-root-comment-position-x').addEventListener('mouseup', function () {
	const valueY = document.querySelector('#input-scroll-to-root-comment-position-y').value;
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: { x: this.value, y: valueY } });
});

// Slider - Scroll To Root Comment Position Y
document.querySelector('#input-scroll-to-root-comment-position-y').addEventListener('mousedown', function () {
	sendMessage({ scrollToNextRootCommentRemoveStyle: true });
});
document.querySelector('#input-scroll-to-root-comment-position-y').addEventListener('input', function () {
	document.querySelector('.icon-scroll-to-root-comment-position-y').style.backgroundColor = this.value === '-1' ? '' : 'var(--accent)';
	const display = document.querySelector('#scroll-to-root-comment-position-y-value');
	display.innerText = this.value === '-1' ? '50%' : `${this.value}%`;
	const valueX = document.querySelector('#input-scroll-to-root-comment-position-x').value;
	sendMessage({ scrollToNextRootCommentPosition: { x: valueX, y: this.value } });
});
document.querySelector('#input-scroll-to-root-comment-position-y').addEventListener('mouseup', function () {
	const valueX = document.querySelector('#input-scroll-to-root-comment-position-x').value;
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: { x: valueX, y: this.value } });
});

// Toggle - Show Post Numbers
document.querySelector('#checkbox-show-post-numbers').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showPostNumbers: this.checked });
	sendMessage({ showPostNumbers: this.checked });
	document.querySelector('.icon-show-post-numbers').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Show Post Absolute Timestamp
document.querySelector('#checkbox-show-post-absolute-timestamp').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showPostAbsoluteTimestamp: this.checked });
	sendMessage({ showPostAbsoluteTimestamp: this.checked });
	document.querySelector('.icon-show-post-absolute-timestamp').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Customise Absolute Post Timestamp Format
document.querySelector('#input-post-absolute-timestamp-format').addEventListener('input', function () {
	BROWSER_API.storage.sync.set({ postAbsoluteTimestampFormat: this.value });
	const checked = document.querySelector('#checkbox-show-post-absolute-timestamp').checked;
	if (checked) sendMessage({ updatePostAbsoluteTimestamps: this.value });
});

// Toggle - Show Comment Absolute Timestamp
document.querySelector('#checkbox-show-comment-absolute-timestamp').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showCommentAbsoluteTimestamp: this.checked });
	sendMessage({ showCommentAbsoluteTimestamp: this.checked });
	document.querySelector('.icon-show-comment-absolute-timestamp').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Customise Comment Absolute Timestamp Format
document.querySelector('#input-comment-absolute-timestamp-format').addEventListener('input', function () {
	BROWSER_API.storage.sync.set({ commentAbsoluteTimestampFormat: this.value });
	const checked = document.querySelector('#checkbox-show-comment-absolute-timestamp').checked;
	if (checked) sendMessage({ updateCommentAbsoluteTimestamps: this.value });
});

// Toggle - Show Post Author
document.querySelector('#checkbox-show-post-author').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showPostAuthor: this.checked });
	sendMessage({ showPostAuthor: this.checked });
	document.querySelector('.icon-show-post-author').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Show Post Flair
document.querySelector('#checkbox-show-post-flair').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showPostFlair: this.checked });
	sendMessage({ showPostFlair: this.checked });
	document.querySelector('.icon-show-post-flair').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Add User Profile Pictures To Comments
document.querySelector('#checkbox-add-profile-pictures-to-comments').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ addProfilePicturesToComments: this.checked });
	sendMessage({ addProfilePicturesToComments: this.checked });
	document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Non Sticky Header Bar
document.querySelector('#checkbox-non-sticky-header-bar').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ nonStickyHeaderBar: this.checked });
	sendMessage({ nonStickyHeaderBar: this.checked });
	const icon = document.querySelector('.icon-non-sticky-header-bar');
	icon.classList.replace(this.checked ? 'icon-sticky-note' : 'icon-sticky-note-slash', this.checked ? 'icon-sticky-note-slash' : 'icon-sticky-note');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Break Reminder
/*document.querySelector('#checkbox-break-reminder').addEventListener('change', function (e) {
	var breakReminder = document.querySelector('#checkbox-break-reminder').checked;
	if (breakReminder == true) {
		BROWSER_API.storage.sync.set({ breakReminder: true });
		document.querySelector('.icon-break-reminder').style.backgroundColor = 'var(--accent)';
		if (document.querySelector('#checkbox-limit-infinity-scroll').checked === true) {
			document.querySelector('#checkbox-limit-infinity-scroll').click();
		}
		sendMessage({ breakReminder: true });
	} else if (breakReminder == false) {
		BROWSER_API.storage.sync.set({ breakReminder: false });
		document.querySelector('.icon-break-reminder').style.backgroundColor = '';
		sendMessage({ breakReminder: false });
	}
});

// Slider - Break Reminder Frequency
document.querySelector('#input-break-reminder-frequency').addEventListener('input', function (e) {
	document.querySelector('#break-reminder-frequency-value').innerText = e.target.value;
	sendMessage({ breakReminderFrequency: e.target.value });
});
document.querySelector('#input-break-reminder-frequency').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ breakReminderFrequency: e.target.value });
});*/

// Toggle - Auto Collapse AutoModerator Comment
document.querySelector('#checkbox-auto-collapse-automoderator-comment').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ autoCollapseAutoModeratorComment: this.checked });
	sendMessage({ autoCollapseAutoModeratorComment: this.checked });
	document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Auto Load More Comments
document.querySelector('#checkbox-auto-load-more-comments').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ autoLoadMoreComments: this.checked });
	sendMessage({ autoLoadMoreComments: this.checked });
	document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Only Load Downvoted Comments
document.querySelector('#checkbox-only-load-downvoted-comments').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ autoLoadMoreCommentsDownvotedOnly: this.checked });
	sendMessage({ autoLoadMoreCommentsDownvotedOnly: this.checked });
	document.querySelector('.icon-only-load-downvoted-comments').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Better Comment Box
document.querySelector('#checkbox-better-comment-box').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ betterCommentBox: this.checked });
	sendMessage({ betterCommentBox: this.checked });
	document.querySelector('.icon-better-comment-box').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Side Menu Width
document.querySelector('#input-side-menu-width').addEventListener('input', function () {
	const display = document.querySelector('#side-menu-width-value');
	display.textContent = this.value === '199' ? '' : `${this.value}px`;
	const icon = document.querySelector('.icon-side-menu-width');
	icon.style.backgroundColor = this.value === '199' ? '' : 'var(--accent)';
	sendMessage({ sideMenuWidth: this.value });
});
document.querySelector('#input-side-menu-width').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ sideMenuWidth: this.value });
});

// Toggle - Remember Side Menu Section Hidden State
document.querySelector('#checkbox-remember-side-menu-section-hidden-state').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenState: this.checked });
	sendMessage({ rememberSideMenuSectionHiddenState: this.checked });
	document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Username Hover Popup Delay
document.querySelector('#input-username-hover-popup-delay').addEventListener('input', function () {
	const display = document.querySelector('#username-hover-popup-delay-value');
	display.innerText = this.value === '-0.5' ? '0.5s' : `${this.value}s`;
	const icon = document.querySelector('.icon-username-hover-popup-delay');
	icon.style.backgroundColor = this.value === '-0.5' ? '' : 'var(--accent)';
	sendMessage({ usernameHoverPopupDelay: this.value });
});
document.querySelector('#input-username-hover-popup-delay').addEventListener('mouseup', function () {
	BROWSER_API.storage.sync.set({ usernameHoverPopupDelay: this.value });
});

// Toggle - Show Upvote Ratio
document.querySelector('#checkbox-show-upvote-ratio').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showUpvoteRatio: this.checked });
	sendMessage({ showUpvoteRatio: this.checked });
	document.querySelector('.icon-show-upvote-ratio').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - View Crossposts
document.querySelector('#checkbox-view-crossposts').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ viewCrossposts: this.checked });
	sendMessage({ viewCrossposts: this.checked });
	document.querySelector('.icon-view-crossposts').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Mark Read On Open Expandos
document.querySelector('#checkbox-mark-read-on-open-expandos').addEventListener('change', function () {
	if (this.checked) {
		BROWSER_API.permissions
			.request({ permissions: ['history'] })
			.then((granted) => {
				if (granted) {
					console.debug('markReadOnOpenExpandos: "history" permission granted');
					enabled(true);
				} else {
					console.debug('markReadOnOpenExpandos: "history" permission denied');
					document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
				}
			})
			.catch((e) => {
				console.error('markReadOnOpenExpandos: Error requesting "history" permission: ', e);
				document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
			});
	} else {
		enabled(false);
	}

	function enabled(value) {
		BROWSER_API.storage.sync.set({ markReadOnOpenExpandos: value });
		const icon = document.querySelector('.icon-mark-read-on-open-expandos');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		sendMessage({ markReadOnOpenExpandos: value });
	}
});

// Toggle - Add Mark Post As Read Button
document.querySelector('#checkbox-add-mark-post-as-read-button').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ markPostAsReadButton: this.checked });
	sendMessage({ markPostAsReadButton: this.checked });
	document.querySelector('.icon-add-mark-post-as-read-button').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Show Member Count
document.querySelector('#checkbox-show-member-count').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showMemberCount: this.checked });
	sendMessage({ showMemberCount: this.checked });
	document.querySelector('.icon-show-member-count').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Canned Messages
document.querySelector('#checkbox-canned-messages').addEventListener('change', function () {
	document.querySelector('.icon-canned-messages').style.backgroundColor = this.checked === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ cannedMessages: this.checked });
});

// Textarea - Canned Messages List
document.querySelector('#input-canned-messages').addEventListener(
	'input',
	debounce(function () {
		const keywordList = this.value;
		BROWSER_API.storage.sync.set({ cannedMessagesList: keywordList });
	}, 1000),
);

// Toggle - Clean Link
document.querySelector('#checkbox-clean-link').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ cleanLink: this.checked });
	sendMessage({ cleanLink: this.checked });
	document.querySelector('.icon-clean-link').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Shorten Clean Link
document.querySelector('#checkbox-shorten-clean-link').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ shortenCleanLink: this.checked });
	sendMessage({ shortenCleanLink: this.checked });
	document.querySelector('.icon-shorten-clean-link').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Show Communities Filter
document.querySelector('#checkbox-show-communities-filter').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ showCommunitiesFilter: this.checked });
	sendMessage({ showCommunitiesFilter: this.checked });
	document.querySelector('.icon-show-communities-filter').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});
