/* ===== Inputs / Productivity Tweaks ===== */

import { sendMessage } from '../send_message';

// Toggle - Sticky Sort
document.querySelector('#checkbox-sticky-sort').addEventListener('change', function (e) {
	var stickySort = document.querySelector('#checkbox-sticky-sort').checked;
	if (stickySort === true) {
		BROWSER_API.storage.sync.set({ stickySort: true });
		document.querySelector('.sticky-sort').style.backgroundColor = 'var(--accent)';
		sendMessage({ stickySort: true });
	} else if (stickySort === false) {
		BROWSER_API.storage.sync.set({ stickySort: false });
		document.querySelector('.sticky-sort').style.backgroundColor = '';
		sendMessage({ stickySort: false });
	}
});

// Toggle - Show To Top Button
document.querySelector('#checkbox-show-to-top-button').addEventListener('change', function (e) {
	var showToTopButton = document.querySelector('#checkbox-show-to-top-button').checked;
	if (showToTopButton == true) {
		BROWSER_API.storage.sync.set({ showToTopButton: true });
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = 'var(--accent)';
		sendMessage({ showToTopButton: true });
	} else if (showToTopButton == false) {
		BROWSER_API.storage.sync.set({ showToTopButton: false });
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = '';
		sendMessage({ showToTopButton: false });
	}
});

// Toggle - Open Sub Links In New Tab
document.querySelector('#checkbox-open-sub-new-tab').addEventListener('change', function (e) {
	var openSubInNewTab = document.querySelector('#checkbox-open-sub-new-tab').checked;
	if (openSubInNewTab == true) {
		BROWSER_API.storage.sync.set({ openSubInNewTab: true });
		document.querySelector('.open-sub-new-tab').style.backgroundColor = 'var(--accent)';
		sendMessage({ openSubInNewTab: true });
	} else if (openSubInNewTab == false) {
		BROWSER_API.storage.sync.set({ openSubInNewTab: false });
		document.querySelector('.open-sub-new-tab').style.backgroundColor = '';
		sendMessage({ openSubInNewTab: false });
	}
});

// Toggle - Open Post Links In New Tab
document.querySelector('#checkbox-open-post-new-tab').addEventListener('change', function (e) {
	var openPostInNewTab = document.querySelector('#checkbox-open-post-new-tab').checked;
	if (openPostInNewTab == true) {
		BROWSER_API.storage.sync.set({ openPostInNewTab: true });
		document.querySelector('.open-post-new-tab').style.backgroundColor = 'var(--accent)';
		sendMessage({ openPostInNewTab: true });
	} else if (openPostInNewTab == false) {
		BROWSER_API.storage.sync.set({ openPostInNewTab: false });
		document.querySelector('.open-post-new-tab').style.backgroundColor = '';
		sendMessage({ openPostInNewTab: false });
	}
});

// Toggle - Always Show Post Options
document.querySelector('#checkbox-always-show-post-options').addEventListener('change', function (e) {
	const alwaysShowPostOptions = document.querySelector('#checkbox-always-show-post-options').checked;
	if (alwaysShowPostOptions === true) {
		BROWSER_API.storage.sync.set({ alwaysShowPostOptions: true });
		document.querySelector('.icon-always-show-post-options').style.backgroundColor = 'var(--accent)';
		sendMessage({ alwaysShowPostOptions: true });
	} else if (alwaysShowPostOptions === false) {
		BROWSER_API.storage.sync.set({ alwaysShowPostOptions: false });
		document.querySelector('.icon-always-show-post-options').style.backgroundColor = '';
		sendMessage({ alwaysShowPostOptions: false });
	}
});

// Toggle - Always Show Post Options - Hide "Notification" Option
document.querySelector('#checkbox-hide-post-notification-option').addEventListener('change', function (e) {
	const hidePostNotificationOption = document.querySelector('#checkbox-hide-post-notification-option').checked;
	if (hidePostNotificationOption === true) {
		BROWSER_API.storage.sync.set({ hidePostNotificationOption: true });
		document.querySelector('.icon-hide-post-notification-option').classList.remove('icon-notification');
		document.querySelector('.icon-hide-post-notification-option').classList.add('icon-notification-slash');
		document.querySelector('.icon-hide-post-notification-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostNotificationOption: true });
	} else if (hidePostNotificationOption === false) {
		BROWSER_API.storage.sync.set({ hidePostNotificationOption: false });
		document.querySelector('.icon-hide-post-notification-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-notification-option').classList.remove('icon-notification-slash');
		document.querySelector('.icon-hide-post-notification-option').classList.add('icon-notification');
		sendMessage({ hidePostNotificationOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Save" Option
document.querySelector('#checkbox-hide-post-save-option').addEventListener('change', function (e) {
	const hidePostSaveOption = document.querySelector('#checkbox-hide-post-save-option').checked;
	if (hidePostSaveOption === true) {
		BROWSER_API.storage.sync.set({ hidePostSaveOption: true });
		document.querySelector('.icon-hide-post-save-option').classList.remove('icon-bookmark');
		document.querySelector('.icon-hide-post-save-option').classList.add('icon-bookmark-slash');
		document.querySelector('.icon-hide-post-save-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostSaveOption: true });
	} else if (hidePostSaveOption === false) {
		BROWSER_API.storage.sync.set({ hidePostSaveOption: false });
		document.querySelector('.icon-hide-post-save-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-save-option').classList.remove('icon-bookmark-slash');
		document.querySelector('.icon-hide-post-save-option').classList.add('icon-bookmark');
		sendMessage({ hidePostSaveOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Hide" Option
document.querySelector('#checkbox-hide-post-hide-option').addEventListener('change', function (e) {
	const hidePostHideOption = document.querySelector('#checkbox-hide-post-hide-option').checked;
	if (hidePostHideOption === true) {
		BROWSER_API.storage.sync.set({ hidePostHideOption: true });
		document.querySelector('.icon-hide-post-hide-option').classList.remove('icon-show');
		document.querySelector('.icon-hide-post-hide-option').classList.add('icon-hide');
		document.querySelector('.icon-hide-post-hide-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostHideOption: true });
	} else if (hidePostHideOption === false) {
		BROWSER_API.storage.sync.set({ hidePostHideOption: false });
		document.querySelector('.icon-hide-post-hide-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-hide-option').classList.remove('icon-hide');
		document.querySelector('.icon-hide-post-hide-option').classList.add('icon-show');
		sendMessage({ hidePostHideOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Report" Option
document.querySelector('#checkbox-hide-post-report-option').addEventListener('change', function (e) {
	const hidePostReportOption = document.querySelector('#checkbox-hide-post-report-option').checked;
	if (hidePostReportOption === true) {
		BROWSER_API.storage.sync.set({ hidePostReportOption: true });
		document.querySelector('.icon-hide-post-report-option').classList.remove('icon-flag');
		document.querySelector('.icon-hide-post-report-option').classList.add('icon-flag-slash');
		document.querySelector('.icon-hide-post-report-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostReportOption: true });
	} else if (hidePostReportOption === false) {
		BROWSER_API.storage.sync.set({ hidePostReportOption: false });
		document.querySelector('.icon-hide-post-report-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-report-option').classList.remove('icon-flag-slash');
		document.querySelector('.icon-hide-post-report-option').classList.add('icon-flag');
		sendMessage({ hidePostReportOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Edit" Option
document.querySelector('#checkbox-hide-post-edit-option').addEventListener('change', function (e) {
	const hidePostEditOption = document.querySelector('#checkbox-hide-post-edit-option').checked;
	if (hidePostEditOption === true) {
		BROWSER_API.storage.sync.set({ hidePostEditOption: true });
		document.querySelector('.icon-hide-post-edit-option').classList.remove('icon-pen');
		document.querySelector('.icon-hide-post-edit-option').classList.add('icon-pen-slash');
		document.querySelector('.icon-hide-post-edit-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostEditOption: true });
	} else if (hidePostEditOption === false) {
		BROWSER_API.storage.sync.set({ hidePostEditOption: false });
		document.querySelector('.icon-hide-post-edit-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-edit-option').classList.remove('icon-pen-slash');
		document.querySelector('.icon-hide-post-edit-option').classList.add('icon-pen');
		sendMessage({ hidePostEditOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Delete" Option
document.querySelector('#checkbox-hide-post-delete-option').addEventListener('change', function (e) {
	const hidePostDeleteOption = document.querySelector('#checkbox-hide-post-delete-option').checked;
	if (hidePostDeleteOption === true) {
		BROWSER_API.storage.sync.set({ hidePostDeleteOption: true });
		document.querySelector('.icon-hide-post-delete-option').classList.remove('icon-bin');
		document.querySelector('.icon-hide-post-delete-option').classList.add('icon-bin-slash');
		document.querySelector('.icon-hide-post-delete-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostDeleteOption: true });
	} else if (hidePostDeleteOption === false) {
		BROWSER_API.storage.sync.set({ hidePostDeleteOption: false });
		document.querySelector('.icon-hide-post-delete-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-delete-option').classList.remove('icon-bin-slash');
		document.querySelector('.icon-hide-post-delete-option').classList.add('icon-bin');
		sendMessage({ hidePostDeleteOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Spoiler" Option
document.querySelector('#checkbox-hide-post-spoiler-option').addEventListener('change', function (e) {
	const hidePostSpoilerOption = document.querySelector('#checkbox-hide-post-spoiler-option').checked;
	if (hidePostSpoilerOption === true) {
		BROWSER_API.storage.sync.set({ hidePostSpoilerOption: true });
		document.querySelector('.icon-hide-post-spoiler-option').classList.remove('icon-spoiler');
		document.querySelector('.icon-hide-post-spoiler-option').classList.add('icon-spoiler-slash');
		document.querySelector('.icon-hide-post-spoiler-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostSpoilerOption: true });
	} else if (hidePostSpoilerOption === false) {
		BROWSER_API.storage.sync.set({ hidePostSpoilerOption: false });
		document.querySelector('.icon-hide-post-spoiler-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-spoiler-option').classList.remove('icon-spoiler-slash');
		document.querySelector('.icon-hide-post-spoiler-option').classList.add('icon-spoiler');
		sendMessage({ hidePostSpoilerOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "NSFW" Option
document.querySelector('#checkbox-hide-post-nsfw-option').addEventListener('change', function (e) {
	const hidePostNsfwOption = document.querySelector('#checkbox-hide-post-nsfw-option').checked;
	if (hidePostNsfwOption === true) {
		BROWSER_API.storage.sync.set({ hidePostNsfwOption: true });
		document.querySelector('.icon-hide-post-nsfw-option').classList.remove('icon-nsfw');
		document.querySelector('.icon-hide-post-nsfw-option').classList.add('icon-nsfw-slash');
		document.querySelector('.icon-hide-post-nsfw-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostNsfwOption: true });
	} else if (hidePostNsfwOption === false) {
		BROWSER_API.storage.sync.set({ hidePostNsfwOption: false });
		document.querySelector('.icon-hide-post-nsfw-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-nsfw-option').classList.remove('icon-nsfw-slash');
		document.querySelector('.icon-hide-post-nsfw-option').classList.add('icon-nsfw');
		sendMessage({ hidePostNsfwOption: false });
	}
});

// Toggle - Always Show Post Options - Hide "Brand Awareness" Option
document.querySelector('#checkbox-hide-post-brand-awareness-option').addEventListener('change', function (e) {
	const hidePostBrandAwarenessOption = document.querySelector('#checkbox-hide-post-brand-awareness-option').checked;
	if (hidePostBrandAwarenessOption === true) {
		BROWSER_API.storage.sync.set({ hidePostBrandAwarenessOption: true });
		document.querySelector('.icon-hide-post-brand-awareness-option').classList.remove('icon-brand-awareness');
		document.querySelector('.icon-hide-post-brand-awareness-option').classList.add('icon-brand-awareness-slash');
		document.querySelector('.icon-hide-post-brand-awareness-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ hidePostBrandAwarenessOption: true });
	} else if (hidePostBrandAwarenessOption === false) {
		BROWSER_API.storage.sync.set({ hidePostBrandAwarenessOption: false });
		document.querySelector('.icon-hide-post-brand-awareness-option').style.backgroundColor = '';
		document.querySelector('.icon-hide-post-brand-awareness-option').classList.remove('icon-brand-awareness-slash');
		document.querySelector('.icon-hide-post-brand-awareness-option').classList.add('icon-brand-awareness');
		sendMessage({ hidePostBrandAwarenessOption: false });
	}
});

// Slider - Comments Limit
document.querySelector('#input-post-comments-limit').addEventListener('input', function (e) {
	// set ui
	var value = e.target.value;
	if (value == 0) {
		document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-comments-limit-value').innerText = '1';
		var value = 1;
	} else if (value != -10) {
		document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-comments-limit-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-post-comments-limit').style.backgroundColor = '';
		document.querySelector('#post-comments-limit-value').innerText = '∞';
	}
	// update background.js listener
	BROWSER_API.runtime.sendMessage({ message: 'update_listener' }, () => {
		//console.log("Listener updated");
	});
	// apply
	sendMessage({ commentsLimit: value });
});
document.querySelector('#input-post-comments-limit').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ commentsLimit: e.target.value });
});

// Toggle - Limit Infinity Scroll
/*document.querySelector('#checkbox-limit-infinity-scroll').addEventListener('change', function (e) {
	var limitInfinityScroll = document.querySelector('#checkbox-limit-infinity-scroll').checked;
	if (limitInfinityScroll == true) {
		BROWSER_API.storage.sync.set({ limitInfinityScroll: true });
		document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity');
		document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity-slash');
		if (document.querySelector('#checkbox-break-reminder').checked === true) {
			document.querySelector('#checkbox-break-reminder').click();
		}
		sendMessage({ limitInfinityScroll: true });
	} else if (limitInfinityScroll == false) {
		BROWSER_API.storage.sync.set({ limitInfinityScroll: false });
		document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = '';
		document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity');
		document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity-slash');
		sendMessage({ limitInfinityScroll: false });
	}
});*/

// Toggle - Enable Default Home Feed Sort Option
document.querySelector('#checkbox-default-home-feed-sort-option').addEventListener('change', function (e) {
	var enableDefaultHomeFeedSortOption = document.querySelector('#checkbox-default-home-feed-sort-option').checked;
	if (enableDefaultHomeFeedSortOption == true) {
		BROWSER_API.storage.sync.set({ enableDefaultHomeFeedSortOption: true });
		document.querySelector('.icon-default-home-feed-sort-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ enableDefaultHomeFeedSortOption: true });
	} else if (enableDefaultHomeFeedSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultHomeFeedSortOption: false });
		document.querySelector('.icon-default-home-feed-sort-option').style.backgroundColor = '';
		sendMessage({ enableDefaultHomeFeedSortOption: false });
	}
});

// Dropdown - Default Home Feed Sort Option
const home_feed_sort_option_dropdown = document.querySelector('#select-home-feed-sort-option');
const home_feed_sort_option_dropdownMenu = document.querySelector('#select-home-feed-sort-option-menu');
document.querySelector('#select-home-feed-sort-option .select').addEventListener('click', function () {
	if (home_feed_sort_option_dropdown.classList.contains('active')) {
		home_feed_sort_option_dropdown.classList.remove('active');
		home_feed_sort_option_dropdownMenu.style.maxHeight = '0';
	} else {
		home_feed_sort_option_dropdown.classList.add('active');
		home_feed_sort_option_dropdownMenu.style.maxHeight = home_feed_sort_option_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!home_feed_sort_option_dropdown.contains(event.target)) {
		home_feed_sort_option_dropdown.classList.remove('active');
		home_feed_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
home_feed_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	if (btn === 'li') {
		var homeFeedSortOption = event.target.getAttribute('data-value');
	}
	if (btn === 'span') {
		var homeFeedSortOption = event.target.parentNode.getAttribute('data-value');
	}
	document.querySelector('#select-home-feed-sort-option .select').querySelector('span').textContent = event.target.textContent;
	home_feed_sort_option_dropdown.classList.remove('active');
	home_feed_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultHomeFeedSortOption: homeFeedSortOption });
});

// Toggle - Enable Default Feed Sort Option
document.querySelector('#checkbox-default-feed-sort-option').addEventListener('change', function (e) {
	var enableDefaultFeedSortOption = document.querySelector('#checkbox-default-feed-sort-option').checked;
	if (enableDefaultFeedSortOption == true) {
		BROWSER_API.storage.sync.set({ enableDefaultFeedSortOption: true });
		document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ enableDefaultFeedSortOption: true });
	} else if (enableDefaultFeedSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultFeedSortOption: false });
		document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = '';
		sendMessage({ enableDefaultFeedSortOption: false });
	}
});

// Dropdown - Default Feed Sort Option
const feed_sort_option_dropdown = document.querySelector('#select-feed-sort-option');
const feed_sort_option_dropdownMenu = document.querySelector('#select-feed-sort-option-menu');
document.querySelector('#select-feed-sort-option .select').addEventListener('click', function () {
	if (feed_sort_option_dropdown.classList.contains('active')) {
		feed_sort_option_dropdown.classList.remove('active');
		feed_sort_option_dropdownMenu.style.maxHeight = '0';
	} else {
		feed_sort_option_dropdown.classList.add('active');
		feed_sort_option_dropdownMenu.style.maxHeight = feed_sort_option_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!feed_sort_option_dropdown.contains(event.target)) {
		feed_sort_option_dropdown.classList.remove('active');
		feed_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
feed_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	if (btn === 'li') {
		var feedSortOption = event.target.getAttribute('data-value');
	}
	if (btn === 'span') {
		var feedSortOption = event.target.parentNode.getAttribute('data-value');
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
	if (comments_sort_option_dropdown.classList.contains('active')) {
		comments_sort_option_dropdown.classList.remove('active');
		comments_sort_option_dropdownMenu.style.maxHeight = '0';
	} else {
		comments_sort_option_dropdown.classList.add('active');
		comments_sort_option_dropdownMenu.style.maxHeight = comments_sort_option_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!comments_sort_option_dropdown.contains(event.target)) {
		comments_sort_option_dropdown.classList.remove('active');
		comments_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
comments_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	if (btn === 'li') {
		var commentsSortOption = event.target.id.replace('comments-sort-', '');
	}
	if (btn === 'span') {
		var commentsSortOption = event.target.parentNode.id.replace('comments-sort-', '');
	}
	document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = event.target.textContent;
	comments_sort_option_dropdown.classList.remove('active');
	comments_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultCommentsSortOption: commentsSortOption });
});

// Toggle - Enable Default Comments Sort Option
document.querySelector('#checkbox-default-comments-sort-option').addEventListener('change', function (e) {
	var enableDefaultCommentsSortOption = document.querySelector('#checkbox-default-comments-sort-option').checked;
	if (enableDefaultCommentsSortOption == true) {
		BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: true });
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ enableDefaultCommentsSortOption: true });
	} else if (enableDefaultCommentsSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: false });
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = '';
		sendMessage({ enableDefaultCommentsSortOption: false });
	}
});

// Toggle - Scroll To Next Root Comment
document.querySelector('#checkbox-scroll-to-next-root-comment').addEventListener('change', function (e) {
	var scrollToNextRootComment = document.querySelector('#checkbox-scroll-to-next-root-comment').checked;
	if (scrollToNextRootComment == true) {
		BROWSER_API.storage.sync.set({ scrollToNextRootComment: true });
		document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
		sendMessage({ scrollToNextRootComment: true });
	} else if (scrollToNextRootComment == false) {
		BROWSER_API.storage.sync.set({ scrollToNextRootComment: false });
		document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = '';
		sendMessage({ scrollToNextRootComment: false });
	}
});

// Slider - Scroll To Root Comment Position X
document.querySelector('#input-scroll-to-root-comment-position-x').addEventListener('input', function (e) {
	const valueX = e.target.value;
	console.log(valueX);
	if (valueX === '-1') {
		document.querySelector('.icon-scroll-to-root-comment-position-x').style.backgroundColor = '';
		document.querySelector('#scroll-to-root-comment-position-value-x').innerText = '48px';
	} else {
		document.querySelector('.icon-scroll-to-root-comment-position-x').style.backgroundColor = 'var(--accent)';
		document.querySelector('#scroll-to-root-comment-position-x-value').innerText = valueX + '%';
	}
	const valueY = document.querySelector('#input-scroll-to-root-comment-position-y').value;
	sendMessage({ scrollToNextRootCommentPosition: { x: valueX, y: valueY } });
});
document.querySelector('#input-scroll-to-root-comment-position-x').addEventListener('mouseup', function (e) {
	const valueX = e.target.value;
	const valueY = document.querySelector('#input-scroll-to-root-comment-position-y').value;
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: { x: valueX, y: valueY } });
});

// Slider - Scroll To Root Comment Position Y
document.querySelector('#input-scroll-to-root-comment-position-y').addEventListener('input', function (e) {
	const valueY = e.target.value;
	if (valueY === '-1') {
		document.querySelector('.icon-scroll-to-root-comment-position-y').style.backgroundColor = '';
		document.querySelector('#scroll-to-root-comment-position-y-value').innerText = '50%';
	} else {
		document.querySelector('.icon-scroll-to-root-comment-position-y').style.backgroundColor = 'var(--accent)';
		document.querySelector('#scroll-to-root-comment-position-y-value').innerText = valueY + '%';
	}
	const valueX = document.querySelector('#input-scroll-to-root-comment-position-x').value;
	sendMessage({ scrollToNextRootCommentPosition: { x: valueX, y: valueY } });
});
document.querySelector('#input-scroll-to-root-comment-position-y').addEventListener('mouseup', function (e) {
	const valueX = document.querySelector('#input-scroll-to-root-comment-position-x').value;
	const valueY = e.target.value;
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: { x: valueX, y: valueY } });
});

// Toggle - Show Post Numbers
document.querySelector('#checkbox-show-post-numbers').addEventListener('change', function (e) {
	var showPostNumbers = document.querySelector('#checkbox-show-post-numbers').checked;
	if (showPostNumbers == true) {
		BROWSER_API.storage.sync.set({ showPostNumbers: true });
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = 'var(--accent)';
		sendMessage({ showPostNumbers: true });
	} else if (showPostNumbers == false) {
		BROWSER_API.storage.sync.set({ showPostNumbers: false });
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = '';
		sendMessage({ showPostNumbers: false });
	}
});

// Toggle - Show Post Author
document.querySelector('#checkbox-show-post-author').addEventListener('change', function (e) {
	var showPostAuthor = document.querySelector('#checkbox-show-post-author').checked;
	if (showPostAuthor == true) {
		BROWSER_API.storage.sync.set({ showPostAuthor: true });
		document.querySelector('.icon-show-post-author').style.backgroundColor = 'var(--accent)';
		sendMessage({ showPostAuthor: true });
	} else if (showPostAuthor == false) {
		BROWSER_API.storage.sync.set({ showPostAuthor: false });
		document.querySelector('.icon-show-post-author').style.backgroundColor = '';
		sendMessage({ showPostAuthor: false });
	}
});

// Toggle - Show Post Flair
document.querySelector('#checkbox-show-post-flair').addEventListener('change', function (e) {
	var showPostFlair = document.querySelector('#checkbox-show-post-flair').checked;
	if (showPostFlair == true) {
		BROWSER_API.storage.sync.set({ showPostFlair: true });
		document.querySelector('.icon-show-post-flair').style.backgroundColor = 'var(--accent)';
		sendMessage({ showPostFlair: true });
	} else if (showPostFlair == false) {
		BROWSER_API.storage.sync.set({ showPostFlair: false });
		document.querySelector('.icon-show-post-flair').style.backgroundColor = '';
		sendMessage({ showPostFlair: false });
	}
});

// Toggle - Add User Profile Pictures To Comments
document.querySelector('#checkbox-add-profile-pictures-to-comments').addEventListener('change', function (e) {
	var addProfilePicturesToComments = document.querySelector('#checkbox-add-profile-pictures-to-comments').checked;
	if (addProfilePicturesToComments == true) {
		BROWSER_API.storage.sync.set({ addProfilePicturesToComments: true });
		document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = 'var(--accent)';
		sendMessage({ addProfilePicturesToComments: true });
	} else if (addProfilePicturesToComments == false) {
		BROWSER_API.storage.sync.set({ addProfilePicturesToComments: false });
		document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = '';
		sendMessage({ addProfilePicturesToComments: false });
	}
});

// Toggle - Non Sticky Header Bar
document.querySelector('#checkbox-non-sticky-header-bar').addEventListener('change', function (e) {
	var nonStickyHeaderBar = document.querySelector('#checkbox-non-sticky-header-bar').checked;
	if (nonStickyHeaderBar == true) {
		BROWSER_API.storage.sync.set({ nonStickyHeaderBar: true });
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-non-sticky-header-bar').classList.remove('icon-sticky-note');
		document.querySelector('.icon-non-sticky-header-bar').classList.add('icon-sticky-note-slash');
		sendMessage({ nonStickyHeaderBar: true });
	} else if (nonStickyHeaderBar == false) {
		BROWSER_API.storage.sync.set({ nonStickyHeaderBar: false });
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = '';
		document.querySelector('.icon-non-sticky-header-bar').classList.remove('icon-sticky-note-slash');
		document.querySelector('.icon-non-sticky-header-bar').classList.add('icon-sticky-note');
		sendMessage({ nonStickyHeaderBar: false });
	}
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
document.querySelector('#checkbox-auto-collapse-automoderator-comment').addEventListener('change', function (e) {
	const autoCollapseAutoModeratorComment = document.querySelector('#checkbox-auto-collapse-automoderator-comment').checked;
	if (autoCollapseAutoModeratorComment === true) {
		BROWSER_API.storage.sync.set({ autoCollapseAutoModeratorComment: true });
		document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = 'var(--accent)';
		sendMessage({ autoCollapseAutoModeratorComment: true });
	} else if (autoCollapseAutoModeratorComment === false) {
		BROWSER_API.storage.sync.set({ autoCollapseAutoModeratorComment: false });
		document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = '';
		sendMessage({ autoCollapseAutoModeratorComment: false });
	}
});

// Toggle - Auto Load More Comments
document.querySelector('#checkbox-auto-load-more-comments').addEventListener('change', function (e) {
	const autoLoadMoreComments = document.querySelector('#checkbox-auto-load-more-comments').checked;
	if (autoLoadMoreComments === true) {
		BROWSER_API.storage.sync.set({ autoLoadMoreComments: true });
		document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = 'var(--accent)';
		sendMessage({ autoLoadMoreComments: true });
	} else if (autoLoadMoreComments === false) {
		BROWSER_API.storage.sync.set({ autoLoadMoreComments: false });
		document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = '';
		sendMessage({ autoLoadMoreComments: false });
	}
});

// Toggle - Better Comment Box
document.querySelector('#checkbox-better-comment-box').addEventListener('change', function (e) {
	const betterCommentBox = document.querySelector('#checkbox-better-comment-box').checked;
	BROWSER_API.storage.sync.set({ betterCommentBox: betterCommentBox });
	document.querySelector('.icon-better-comment-box').style.backgroundColor = betterCommentBox ? 'var(--accent)' : '';
	sendMessage({ betterCommentBox: betterCommentBox });
});

// Slider - Side Menu Width
document.querySelector('#input-side-menu-width').addEventListener('input', function (e) {
	// set ui
	if (e.target.value === '199') {
		document.querySelector('.icon-side-menu-width').style.backgroundColor = '';
		document.querySelector('#side-menu-width-value').textContent = '';
	} else {
		document.querySelector('.icon-side-menu-width').style.backgroundColor = 'var(--accent)';
		document.querySelector('#side-menu-width-value').textContent = e.target.value + 'px';
	}
	// apply
	sendMessage({ sideMenuWidth: e.target.value });
});
document.querySelector('#input-side-menu-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ sideMenuWidth: e.target.value });
});

// Toggle - Remember Side Menu Section Hidden State
document.querySelector('#checkbox-remember-side-menu-section-hidden-state').addEventListener('change', function (e) {
	const rememberSideMenuSectionHiddenState = document.querySelector('#checkbox-remember-side-menu-section-hidden-state').checked;
	if (rememberSideMenuSectionHiddenState === true) {
		BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenState: true });
		document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = 'var(--accent)';
		sendMessage({ rememberSideMenuSectionHiddenState: true });
	} else if (rememberSideMenuSectionHiddenState === false) {
		BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenState: false });
		document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = '';
		sendMessage({ rememberSideMenuSectionHiddenState: false });
	}
});

// Slider - Username Hover Popup Delay
document.querySelector('#input-username-hover-popup-delay').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value === '-0.5') {
		document.querySelector('.icon-username-hover-popup-delay').style.backgroundColor = '';
		document.querySelector('#username-hover-popup-delay-value').innerText = '0.5s';
	} else {
		document.querySelector('.icon-username-hover-popup-delay').style.backgroundColor = 'var(--accent)';
		document.querySelector('#username-hover-popup-delay-value').innerText = e.target.value + 's';
	}
	// apply
	sendMessage({ usernameHoverPopupDelay: e.target.value });
});
document.querySelector('#input-username-hover-popup-delay').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ usernameHoverPopupDelay: e.target.value });
});

// Toggle - Show Upvote Ratio
document.querySelector('#checkbox-show-upvote-ratio').addEventListener('change', function (e) {
	const showUpvoteRatio = document.querySelector('#checkbox-show-upvote-ratio').checked;
	BROWSER_API.storage.sync.set({ showUpvoteRatio: showUpvoteRatio });
	document.querySelector('.icon-show-upvote-ratio').style.backgroundColor = showUpvoteRatio ? 'var(--accent)' : '';
	sendMessage({ showUpvoteRatio: showUpvoteRatio });
});

// Toggle - View Crossposts
document.querySelector('#checkbox-view-crossposts').addEventListener('change', function (e) {
	const viewCrossposts = document.querySelector('#checkbox-view-crossposts').checked;
	BROWSER_API.storage.sync.set({ viewCrossposts: viewCrossposts });
	document.querySelector('.icon-view-crossposts').style.backgroundColor = viewCrossposts ? 'var(--accent)' : '';
	sendMessage({ viewCrossposts: viewCrossposts });
});

// Toggle - Mark Read On Open Expandos
document.querySelector('#checkbox-mark-read-on-open-expandos').addEventListener('change', function (e) {
	const markReadOnOpenExpandos = document.querySelector('#checkbox-mark-read-on-open-expandos').checked;
	if (markReadOnOpenExpandos) {
		if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
			BROWSER_API.permissions
				.request({ permissions: ['history'] })
				.then((granted) => {
					if (granted) {
						console.debug('[RedditEnhancer] markReadOnOpenExpandos: "history" permission granted');
					} else {
						console.debug('[RedditEnhancer] markReadOnOpenExpandos: "history" permission denied');
						document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
					}
				})
				.catch((e) => {
					console.error('[RedditEnhancer] markReadOnOpenExpandos: Error requesting "history" permission: ', e);
					document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
				});
		}
	}
	BROWSER_API.storage.sync.set({ markReadOnOpenExpandos: markReadOnOpenExpandos });
	document.querySelector('.icon-mark-read-on-open-expandos').style.backgroundColor = markReadOnOpenExpandos ? 'var(--accent)' : '';
	sendMessage({ markReadOnOpenExpandos: markReadOnOpenExpandos });
});

// Toggle - Highlight OP
document.querySelector('#checkbox-highlight-op').addEventListener('change', function (e) {
	const highlightOp = document.querySelector('#checkbox-highlight-op').checked;
	BROWSER_API.storage.sync.set({ highlightOp: highlightOp });
	document.querySelector('.icon-highlight-op').style.backgroundColor = highlightOp ? 'var(--accent)' : '';
	sendMessage({ highlightOp: highlightOp });
});