/* ===== Restore Popup UI / Productivity ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Productivity" options.

export function restorePopupProductivityOptions() {
	// Scroll To Top
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		if (result.showToTopButton == true) {
			document.querySelector('#checkbox-show-to-top-button').checked = true;
			document.querySelector('.icon-scroll-to-top').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showToTopButton == 'undefined' || result.showToTopButton == false) {
			document.querySelector('#checkbox-show-to-top-button').checked = false;
			var value = false;
		}
		console.log('Show Scroll To Top Button: ' + value);
	});

	// Always Show Rising Sort Button
	BROWSER_API.storage.sync.get(['alwaysShowRisingButton'], function (result) {
		if (result.alwaysShowRisingButton == true) {
			document.querySelector('#checkbox-always-show-rising-button').checked = true;
			document.querySelector('.always-show-rising-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.always-show-rising-button').classList.remove('icon-rising');
			document.querySelector('.always-show-rising-button').classList.add('icon-rising-fill');
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.alwaysShowRisingButton == 'undefined' || result.alwaysShowRisingButton == false) {
			document.querySelector('#checkbox-always-show-rising-button').checked = false;
			var value = false;
		}
		console.log('Always Show Rising Sort Button: ' + value);
	});

	// Show Controversial Sort Button
	BROWSER_API.storage.sync.get(['showControversialSortButton'], function (result) {
		if (result.showControversialSortButton == true) {
			document.querySelector('#checkbox-controversial-sort-button').checked = true;
			document.querySelector('.icon-controversial-sort-button').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-controversial-sort-button').classList.remove('icon-sword');
			document.querySelector('.icon-controversial-sort-button').classList.add('icon-sword-fill');
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showControversialSortButton == 'undefined' || result.showControversialSortButton == false) {
			document.querySelector('#checkbox-controversial-sort-button').checked = false;
			var value = false;
		}
		console.log('Show Controversial Sort Button: ' + value);
	});

	// Open Sub Links In New Tab
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		if (result.openSubInNewTab == true) {
			document.querySelector('#checkbox-open-sub-new-tab').checked = true;
			document.querySelector('.open-sub-new-tab').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.openSubInNewTab == 'undefined' || result.openSubInNewTab == false) {
			document.querySelector('#checkbox-open-sub-new-tab').checked = false;
			var value = false;
		}
		console.log('Open Sub Links In New Tab: ' + value);
	});

	// Open Post Links In New Tab
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		if (result.openPostInNewTab == true) {
			document.querySelector('#checkbox-open-post-new-tab').checked = true;
			document.querySelector('.open-post-new-tab').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.openPostInNewTab == 'undefined' || result.openPostInNewTab == false) {
			document.querySelector('#checkbox-open-post-new-tab').checked = false;
			var value = false;
		}
		console.log('Open Post Links In New Tab: ' + value);
	});

	/*
// Add Emoji Picker
BROWSER_API.storage.sync.get(['addEmojiPicker'], function(result) {
    if (result.addEmojiPicker == true) {
        document.querySelector("#checkbox-add-emoji-picker").checked = true
        document.querySelector(".icon-emoji-picker").style.backgroundColor = "var(--accent)"
        highlightMenuIcon('productivity-tweaks');
        var value = true
    } else if ((typeof result.addEmojiPicker == 'undefined')||(result.addEmojiPicker == false)) {
        document.querySelector("#checkbox-add-emoji-picker").checked = false
        var value = false
    }
    console.log("Add Emoji Picker: "+value)
})*/

	// Show r/All Button
	BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
		if (result.showAllButton == true) {
			document.querySelector('#checkbox-show-r-all-button').checked = true;
			document.querySelector('.icon-show-r-all').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showAllButton == 'undefined' || result.showAllButton == false) {
			document.querySelector('#checkbox-show-r-all-button').checked = false;
			var value = false;
		}
		console.log('Show r/All Button: ' + value);
	});

	// Move Feed Section In Side Menu To The Top
	BROWSER_API.storage.sync.get(['sidemenuFeedTop'], function (result) {
		if (result.sidemenuFeedTop == true) {
			document.querySelector('#checkbox-sidemenu-feed-top').checked = true;
			document.querySelector('.icon-sidemenu-feed-top').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.sidemenuFeedTop == 'undefined' || result.sidemenuFeedTop == false) {
			document.querySelector('#checkbox-sidemenu-feed-top').checked = false;
			var value = false;
		}
		console.log('Move Feed Section In Side Menu To The Top: ' + value);
	});

	// Always Show Post Options
	BROWSER_API.storage.sync.get(['alwaysShowPostOptions'], function (result) {
		if (result.alwaysShowPostOptions === true) {
			document.querySelector('#checkbox-always-show-post-options').checked = true;
			document.querySelector('.icon-always-show-post-options').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-always-show-post-options').checked = false;
			var value = false;
		}
		console.log('Always Show Post Options: ' + value);
	});

	// Always Show Post Options - Hide "Notification" Option
	BROWSER_API.storage.sync.get(['hidePostNotificationOption'], function (result) {
		if (result.hidePostNotificationOption === true) {
			document.querySelector('#checkbox-hide-post-notification-option').checked = true;
			document.querySelector('.icon-hide-post-notification-option').classList.remove('icon-notification');
			document.querySelector('.icon-hide-post-notification-option').classList.add('icon-notification-slash');
			document.querySelector('.icon-hide-post-notification-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-notification-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Notification" Option: ' + value);
	});

	// Always Show Post Options - Hide "Save" Option
	BROWSER_API.storage.sync.get(['hidePostSaveOption'], function (result) {
		if (result.hidePostSaveOption === true) {
			document.querySelector('#checkbox-hide-post-save-option').checked = true;
			document.querySelector('.icon-hide-post-save-option').classList.remove('icon-bookmark');
			document.querySelector('.icon-hide-post-save-option').classList.add('icon-bookmark-slash');
			document.querySelector('.icon-hide-post-save-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-save-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Save" Option: ' + value);
	});

	// Always Show Post Options - Hide "Hide" Option
	BROWSER_API.storage.sync.get(['hidePostHideOption'], function (result) {
		if (result.hidePostHideOption === true) {
			document.querySelector('#checkbox-hide-post-hide-option').checked = true;
			document.querySelector('.icon-hide-post-hide-option').classList.remove('icon-show');
			document.querySelector('.icon-hide-post-hide-option').classList.add('icon-hide');
			document.querySelector('.icon-hide-post-hide-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-hide-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Hide" Option: ' + value);
	});

	// Always Show Post Options - Hide "Report" Option
	BROWSER_API.storage.sync.get(['hidePostReportOption'], function (result) {
		if (result.hidePostReportOption === true) {
			document.querySelector('#checkbox-hide-post-report-option').checked = true;
			document.querySelector('.icon-hide-post-report-option').classList.remove('icon-flag');
			document.querySelector('.icon-hide-post-report-option').classList.add('icon-flag-slash');
			document.querySelector('.icon-hide-post-report-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-report-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Report" Option: ' + value);
	});

	// Always Show Post Options - Hide "Edit" Option
	BROWSER_API.storage.sync.get(['hidePostEditOption'], function (result) {
		if (result.hidePostEditOption === true) {
			document.querySelector('#checkbox-hide-post-edit-option').checked = true;
			document.querySelector('.icon-hide-post-edit-option').classList.remove('icon-pen');
			document.querySelector('.icon-hide-post-edit-option').classList.add('icon-pen-slash');
			document.querySelector('.icon-hide-post-edit-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-edit-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Edit" Option: ' + value);
	});

	// Always Show Post Options - Hide "Delete" Option
	BROWSER_API.storage.sync.get(['hidePostDeleteOption'], function (result) {
		if (result.hidePostDeleteOption === true) {
			document.querySelector('#checkbox-hide-post-delete-option').checked = true;
			document.querySelector('.icon-hide-post-delete-option').classList.remove('icon-bin');
			document.querySelector('.icon-hide-post-delete-option').classList.add('icon-bin-slash');
			document.querySelector('.icon-hide-post-delete-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-delete-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Delete" Option: ' + value);
	});

	// Always Show Post Options - Hide "Spoiler" Option
	BROWSER_API.storage.sync.get(['hidePostSpoilerOption'], function (result) {
		if (result.hidePostSpoilerOption === true) {
			document.querySelector('#checkbox-hide-post-spoiler-option').checked = true;
			document.querySelector('.icon-hide-post-spoiler-option').classList.remove('icon-bin');
			document.querySelector('.icon-hide-post-spoiler-option').classList.add('icon-bin-slash');
			document.querySelector('.icon-hide-post-spoiler-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-spoiler-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Spoiler" Option: ' + value);
	});

	// Always Show Post Options - Hide "NSFW" Option
	BROWSER_API.storage.sync.get(['hidePostNsfwOption'], function (result) {
		if (result.hidePostNsfwOption === true) {
			document.querySelector('#checkbox-hide-post-nsfw-option').checked = true;
			document.querySelector('.icon-hide-post-nsfw-option').classList.remove('icon-nsfw');
			document.querySelector('.icon-hide-post-nsfw-option').classList.add('icon-nsfw-slash');
			document.querySelector('.icon-hide-post-nsfw-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-nsfw-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "NSFW" Option: ' + value);
	});

	// Always Show Post Options - Hide "Brand Awareness" Option
	BROWSER_API.storage.sync.get(['hidePostBrandAwarenessOption'], function (result) {
		if (result.hidePostBrandAwarenessOption === true) {
			document.querySelector('#checkbox-hide-post-brand-awareness-option').checked = true;
			document.querySelector('.icon-hide-post-brand-awareness-option').classList.remove('icon-brand-awareness');
			document.querySelector('.icon-hide-post-brand-awareness-option').classList.add('icon-brand-awareness-slash');
			document.querySelector('.icon-hide-post-brand-awareness-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-hide-post-brand-awareness-option').checked = false;
			var value = false;
		}
		console.log('Hide Post "Brand Awareness" Option: ' + value);
	});

	// Comments Limit
	BROWSER_API.storage.sync.get(['commentsLimit'], function (result) {
		if (typeof result.commentsLimit != 'undefined') {
			document.querySelector('#input-post-comments-limit').value = result.commentsLimit;
			if (result.commentsLimit == 0) {
				document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
				document.querySelector('#post-comments-limit-value').innerText = '1';
				var value = '1';
			} else if (result.commentsLimit != -10) {
				document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
				document.querySelector('#post-comments-limit-value').innerText = result.commentsLimit;
				var value = result.commentsLimit;
			} else {
				document.querySelector('#post-comments-limit-value').innerText = '∞';
				var value = '∞';
			}
		} else if (typeof result.commentsLimit == 'undefined') {
			document.querySelector('#input-post-comments-limit').value = -10;
			document.querySelector('#post-comments-limit-value').innerText = '∞';
			var value = '∞';
		}
		console.log('Post Comments Limit: ' + value);
	});

	// Limit Infinity Scroll
	BROWSER_API.storage.sync.get(['limitInfinityScroll'], function (result) {
		if (result.limitInfinityScroll == true) {
			document.querySelector('#checkbox-limit-infinity-scroll').checked = true;
			document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity');
			document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity-slash');
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.limitInfinityScroll == 'undefined' || result.limitInfinityScroll == false) {
			document.querySelector('#checkbox-limit-infinity-scroll').checked = false;
			var value = false;
		}
		console.log('Limit Infinity Scroll: ' + value);
	});

	// Enable Default Home Feed Sort Option
	BROWSER_API.storage.sync.get(['enableDefaultHomeFeedSortOption'], function (result) {
		if (result.enableDefaultHomeFeedSortOption == true) {
			document.querySelector('#checkbox-default-home-feed-sort-option').checked = true;
			document.querySelector('.icon-default-home-feed-sort-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.enableDefaultHomeFeedSortOption == 'undefined' || result.enableDefaultHomeFeedSortOption == false) {
			document.querySelector('#checkbox-default-home-feed-sort-option').checked = false;
			var value = false;
		}
		console.log('Enable Default Home Feed Sort Option: ' + value);
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
		if (result.enableDefaultFeedSortOption == true) {
			document.querySelector('#checkbox-default-feed-sort-option').checked = true;
			document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.enableDefaultFeedSortOption == 'undefined' || result.enableDefaultFeedSortOption == false) {
			document.querySelector('#checkbox-default-feed-sort-option').checked = false;
			var value = false;
		}
		console.log('Enable Default Feed Sort Option: ' + value);
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
		if (result.enableDefaultCommentsSortOption == true) {
			document.querySelector('#checkbox-default-comments-sort-option').checked = true;
			document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.enableDefaultCommentsSortOption == 'undefined' || result.enableDefaultCommentsSortOption == false) {
			document.querySelector('#checkbox-default-comments-sort-option').checked = false;
			var value = false;
		}
		console.log('Enable Default Comments Sort Option: ' + value);
	});

	// Default Comments Sort Option
	BROWSER_API.storage.sync.get(['defaultCommentsSortOption'], function (result) {
		setTimeout(() => {
			// delay for translation
			if (typeof result.defaultCommentsSortOption != 'undefined') {
				const text = document.querySelector('#comments-sort-' + result.defaultCommentsSortOption).textContent;
				document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = text;
				var value = result.defaultCommentsSortOption;
			} else if (typeof result.defaultCommentsSortOption == 'undefined') {
				const text = document.querySelector('#comments-sort-confidence').textContent;
				document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = text;
				var value = 'best';
			}
			console.log('Default Comments Sort Option: ' + value);
		}, 500);
	});

	// Scroll To Next Root Comment
	BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
		if (result.scrollToNextRootComment == true) {
			document.querySelector('#checkbox-scroll-to-next-root-comment').checked = true;
			document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.scrollToNextRootComment == 'undefined' || result.scrollToNextRootComment == false) {
			document.querySelector('#checkbox-scroll-to-next-root-comment').checked = false;
			var value = false;
		}
		console.log('Scroll To Next Root Comment Button: ' + value);
	});

	// Show Post Numbers
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		if (result.showPostNumbers == true) {
			document.querySelector('#checkbox-show-post-numbers').checked = true;
			document.querySelector('.icon-show-post-numbers').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showPostNumbers == 'undefined' || result.showPostNumbers == false) {
			document.querySelector('#checkbox-show-post-numbers').checked = false;
			var value = false;
		}
		console.log('Show Post Numbers: ' + value);
	});

	// Post Height
	BROWSER_API.storage.sync.get(['postHeight'], function (result) {
		if (result.postHeight === true) {
			document.querySelector('#checkbox-post-height').checked = true;
			document.querySelector('.icon-post-height').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.postHeight == 'undefined' || result.postHeight == false) {
			document.querySelector('#checkbox-post-height').checked = false;
			var value = false;
		}
		console.log('Post Height: ' + value);
	});

	// Post Height Size
	BROWSER_API.storage.sync.get(['postHeightSize'], function (result) {
		if (typeof result.postHeightSize != 'undefined') {
			if (result.postHeightSize > 304 && result.postHeightSize <= 1000) {
				highlightMenuIcon('productivity-tweaks');
				document.querySelector('#input-feed-post-max-height').value = result.postHeightSize;
				document.querySelector('#feed-post-max-height-value').innerText = result.postHeightSize + 'px';
				var value = result.postHeightSize + 'px';
			} else {
				document.querySelector('#input-feed-post-max-height').value = 296;
				document.querySelector('#feed-post-max-height-value').innerText = '512px';
				var value = 'default (512px)';
			}
		} else if (typeof result.postHeightSize == 'undefined') {
			document.querySelector('#input-feed-post-max-height').value = 296;
			document.querySelector('#feed-post-max-height-value').innerText = '512px';
			var value = 'default (512px)';
		}
		console.log('Post Height Size: ' + value);
	});

	// Non Sticky Header Bar
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		if (result.nonStickyHeaderBar == true) {
			document.querySelector('#checkbox-non-sticky-header-bar').checked = true;
			document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-non-sticky-header-bar').classList.remove('icon-sticky-note');
			document.querySelector('.icon-non-sticky-header-bar').classList.add('icon-sticky-note-slash');
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.nonStickyHeaderBar == 'undefined' || result.nonStickyHeaderBar == false) {
			document.querySelector('#checkbox-non-sticky-header-bar').checked = false;
			var value = false;
		}
		console.log('Non Sticky Header Bar: ' + value);
	});

	// Larger Classic Post
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		if (result.largerClassicPost == true) {
			document.querySelector('#checkbox-larger-classic-post').checked = true;
			document.querySelector('.icon-larger-classic-post').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.largerClassicPost == 'undefined' || result.largerClassicPost == false) {
			document.querySelector('#checkbox-larger-classic-post').checked = false;
			var value = false;
		}
		console.log('Larger Classic Post: ' + value);
	});

	// Scroll To Next Root Comment Position X
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPosition'], function (result) {
		const valueX = result.scrollToNextRootCommentPosition.x || undefined;
		if (typeof valueX == 'undefined' || valueX === '-1' || valueX === 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position-x').value = -1;
			document.querySelector('#scroll-to-root-comment-position-x-value').innerText = '48px';
			console.log('Scroll To Next Root Comment Position: 48px');
		} else if (typeof valueX != 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position-x').value = valueX;
			document.querySelector('#scroll-to-root-comment-position-x-value').innerText = valueX + '%';
			document.querySelector('.icon-scroll-to-root-comment-position-x').style.backgroundColor = 'var(--accent)';
			var value = valueX;
			console.log('Scroll To Next Root Comment Position X: ' + value + '%');
		}

		// Scroll To Next Root Comment Position Y
		const valueY = result.scrollToNextRootCommentPosition.y || undefined;
		if (typeof valueY == 'undefined' || valueY === '-1' || valueY === 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position-y').value = -1;
			document.querySelector('#scroll-to-root-comment-position-y-value').innerText = '50%';
			console.log('Scroll To Next Root Comment Position Vertically: 50%');
		} else if (typeof valueY != 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position-y').value = valueY;
			document.querySelector('#scroll-to-root-comment-position-y-value').innerText = valueY + '%';
			document.querySelector('.icon-scroll-to-root-comment-position-y').style.backgroundColor = 'var(--accent)';
			var value = valueY;
			console.log('Scroll To Next Root Comment Position Y: ' + value + '%');
		}
	});

	// Break Reminder
	BROWSER_API.storage.sync.get(['breakReminder'], function (result) {
		if (result.breakReminder == true) {
			document.querySelector('.icon-break-reminder').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.breakReminder == 'undefined' || result.breakReminder == false) {
			var value = false;
		}
		document.querySelector('#checkbox-break-reminder').checked = value;
		console.log('Break Reminder: ' + value);
	});

	// Break Reminder Frequency
	BROWSER_API.storage.sync.get(['breakReminderFrequency'], function (result) {
		if (typeof result.breakReminderFrequency == 'undefined') {
			var value = 50;
		} else if (typeof result.breakReminderFrequency != 'undefined') {
			var value = result.breakReminderFrequency;
		}
		document.querySelector('#input-break-reminder-frequency').value = value;
		document.querySelector('#break-reminder-frequency-value').innerText = value;
		console.log('Break Reminder Frequency: ' + value);
	});

	// Show Post Author
	BROWSER_API.storage.sync.get(['showPostAuthor'], function (result) {
		if (result.showPostAuthor == true) {
			document.querySelector('#checkbox-show-post-author').checked = true;
			document.querySelector('.icon-show-post-author').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showPostAuthor == 'undefined' || result.showPostAuthor == false) {
			document.querySelector('#checkbox-show-post-author').checked = false;
			var value = false;
		}
		console.log('Show Post Author: ' + value);
	});

	// Show Post Flair
	BROWSER_API.storage.sync.get(['showPostFlair'], function (result) {
		if (result.showPostFlair == true) {
			document.querySelector('#checkbox-show-post-flair').checked = true;
			document.querySelector('.icon-show-post-flair').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showPostFlair == 'undefined' || result.showPostFlair == false) {
			document.querySelector('#checkbox-show-post-flair').checked = false;
			var value = false;
		}
		console.log('Show Post Flair: ' + value);
	});

	// Add User Profile Pictures To Comments
	BROWSER_API.storage.sync.get(['addProfilePicturesToComments'], function (result) {
		if (result.addProfilePicturesToComments == true) {
			document.querySelector('#checkbox-add-profile-pictures-to-comments').checked = true;
			document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.addProfilePicturesToComments == 'undefined' || result.addProfilePicturesToComments == false) {
			document.querySelector('#checkbox-add-profile-pictures-to-comments').checked = false;
			var value = false;
		}
		console.log('Add User Profile Pictures To Comments: ' + value);
	});

	// Auto Expand Comments
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		if (result.autoExpandComments == true) {
			document.querySelector('.icon-auto-expand-comments').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-auto-expand-comments').checked = true;
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.autoExpandComments == 'undefined' || result.autoExpandComments == false) {
			document.querySelector('#checkbox-auto-expand-comments').checked = false;
			var value = false;
		}
		console.log('Auto Expand Comments: ' + value);
	});

	// Auto Collapse AutoModerator Comment
	BROWSER_API.storage.sync.get(['autoCollapseAutoModeratorComment'], function (result) {
		if (result.autoCollapseAutoModeratorComment === true) {
			document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-auto-collapse-automoderator-comment').checked = true;
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.autoCollapseAutoModeratorComment == 'undefined' || result.autoCollapseAutoModeratorComment === false) {
			document.querySelector('#checkbox-auto-collapse-automoderator-comment').checked = false;
			var value = false;
		}
		console.log('Auto Collapse AutoModerator Comment: ' + value);
	});

	// Auto Load More Comments
	BROWSER_API.storage.sync.get(['autoLoadMoreComments'], function (result) {
		if (result.autoLoadMoreComments === true) {
			document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-auto-load-more-comments').checked = true;
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.autoLoadMoreComments == 'undefined' || result.autoLoadMoreComments === false) {
			document.querySelector('#checkbox-auto-load-more-comments').checked = false;
			var value = false;
		}
		console.log('Auto Load More Comments: ' + value);
	});

	// Better Comment Box
	BROWSER_API.storage.sync.get(['betterCommentBox'], function (result) {
		if (result.betterCommentBox === true) {
			document.querySelector('.icon-better-comment-box').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-better-comment-box').checked = true;
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.betterCommentBox == 'undefined' || result.betterCommentBox === false) {
			document.querySelector('#checkbox-better-comment-box').checked = false;
			var value = false;
		}
		console.log('Better Comment Box: ' + value);
	});

	// Sticky Sort
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		if (result.stickySort == true) {
			document.querySelector('#checkbox-sticky-sort').checked = true;
			document.querySelector('.sticky-sort').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.stickySort == 'undefined' || result.stickySort == false) {
			document.querySelector('#checkbox-sticky-sort').checked = false;
			var value = false;
		}
		console.log('Sticky Sort: ' + value);
	});

	// Username Hover Popup Delay
	BROWSER_API.storage.sync.get(['usernameHoverPopupDelay'], function (result) {
		if (typeof result.usernameHoverPopupDelay == 'undefined' || result.usernameHoverPopupDelay === '-0.5') {
			document.querySelector('#input-username-hover-popup-delay').value = -0.5;
			document.querySelector('#username-hover-popup-delay-value').innerText = '0.5s';
			console.log('Scroll To Next Root Comment Position: 0.5s');
		} else if (typeof result.usernameHoverPopupDelay != 'undefined') {
			document.querySelector('#input-username-hover-popup-delay').value = result.usernameHoverPopupDelay;
			document.querySelector('#username-hover-popup-delay-value').innerText = result.usernameHoverPopupDelay + 's';
			document.querySelector('.icon-username-hover-popup-delay').style.backgroundColor = 'var(--accent)';
			var value = result.usernameHoverPopupDelay;
			console.log('Username Hover Popup Delay: ' + value + 's');
		}
	});

	// Show Upvote Ratio
	BROWSER_API.storage.sync.get(['showUpvoteRatio'], function (result) {
		if (result.showUpvoteRatio === true) {
			document.querySelector('#checkbox-show-upvote-ratio').checked = true;
			document.querySelector('.icon-show-upvote-ratio').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.showUpvoteRatio == 'undefined' || result.showUpvoteRatio === false) {
			document.querySelector('#checkbox-show-upvote-ratio').checked = false;
			var value = false;
		}
		console.log('Show Upvote Ratio: ' + value);
	});

	// View Crossposts
	BROWSER_API.storage.sync.get(['viewCrossposts'], function (result) {
		if (result.viewCrossposts) {
			document.querySelector('#checkbox-view-crossposts').checked = true;
			document.querySelector('.icon-view-crossposts').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else {
			document.querySelector('#checkbox-view-crossposts').checked = false;
			var value = false;
		}
		console.log('View Crossposts: ' + value);
	});

	// Mark Read On Open Expandos
	BROWSER_API.storage.sync.get(['markReadOnOpenExpandos'], function (result) {
		if (result.markReadOnOpenExpandos === true) {
			if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
				BROWSER_API.permissions
					.contains({ permissions: ['history'] })
					.then((granted) => {
						if (granted) {
							console.debug('[RedditEnhancer] markReadOnOpenExpandos: history permission granted');
						} else {
							console.debug('[RedditEnhancer] markReadOnOpenExpandos: history permission denied');
							document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
						}
					})
					.catch((e) => {
						console.error('[RedditEnhancer] markReadOnOpenExpandos: Error getting history permission: ', e);
						document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
					});
			}
			document.querySelector('#checkbox-mark-read-on-open-expandos').checked = true;
			document.querySelector('.icon-mark-read-on-open-expandos').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.markReadOnOpenExpandos == 'undefined' || result.markReadOnOpenExpandos === false) {
			document.querySelector('#checkbox-mark-read-on-open-expandos').checked = false;
			var value = false;
		}
		console.log('Mark Read On Open Expandos: ' + value);
	});
}
