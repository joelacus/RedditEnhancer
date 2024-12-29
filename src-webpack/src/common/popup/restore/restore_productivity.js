/* ===== Restore Popup UI / Productivity ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Productivity" options.

export function restorePopupProductivityOptions() {
	// Scale Tall Images To Fit Post
	BROWSER_API.storage.sync.get(['fitImage'], function (result) {
		if (result.fitImage == true) {
			document.querySelector('#checkbox-fit-image').checked = true;
			document.querySelector('.icon-scale').style.backgroundColorr = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.fitImage == 'undefined' || result.fitImage == false) {
			document.querySelector('#checkbox-fit-image').checked = false;
			var value = false;
		}
		console.log('Scale Tall Images: ' + value);
	});

	// Add Scrollbar To Tall Images
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		if (result.imageScroll == true) {
			document.querySelector('#checkbox-image-scroll').checked = true;
			document.querySelector('.icon-scroll').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.imageScroll == 'undefined' || result.imageScroll == false) {
			document.querySelector('#checkbox-image-scroll').checked = false;
			var value = false;
		}
		console.log('Scroll Tall Images: ' + value);
	});

	// Add Scrollbar To Tall Images Max Image Size
	BROWSER_API.storage.sync.get(['imageScrollMaxImageWidth'], function (result) {
		if (typeof result.imageScrollMaxImageWidth != 'undefined') {
			if (result.imageScrollMaxImageWidth > 9 && result.imageScrollMaxImageWidth <= 100) {
				highlightMenuIcon('productivity-tweaks');
				const imageScroll = document.querySelector('#checkbox-image-scroll').checked;
				if (imageScroll === true) {
					document.querySelector('.icon-image-scroll-max-image-width').style.backgroundColor = 'var(--accent)';
				}
				document.querySelector('#input-image-scroll-max-image-width').value = result.imageScrollMaxImageWidth;
				document.querySelector('#image-scroll-max-image-width-value').innerText = result.imageScrollMaxImageWidth + '%';
				var value = result.imageScrollMaxImageWidth + 'px';
			} else {
				document.querySelector('#input-image-scroll-max-image-width').value = 9;
				document.querySelector('#image-scroll-max-image-width-value').innerText = '100%';
				var value = 'default (100%)';
			}
		} else if (typeof result.imageScrollMaxImageWidth == 'undefined') {
			document.querySelector('#input-image-scroll-max-image-width').value = 9;
			document.querySelector('#image-scroll-max-image-width-value').innerText = '100%';
			var value = 'default (100%)';
		}
		console.log('Add Scrollbar To Tall Images Max Image Size: ' + value);
	});

	// New Player
	BROWSER_API.storage.sync.get(['newPlayer'], function (result) {
		if (result.newPlayer == true) {
			document.querySelector('#checkbox-new-player').checked = true;
			document.querySelector('.icon-new-player').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.newPlayer == 'undefined' || result.newPlayer == false) {
			document.querySelector('#checkbox-new-player').checked = false;
			var value = false;
		}
		console.log('Use New Video Player: ' + value);
	});

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
		if (result.alwaysShowPostOptions == true) {
			document.querySelector('#checkbox-always-show-post-options').checked = true;
			document.querySelector('.icon-always-show-post-options').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.alwaysShowPostOptions == 'undefined' || result.alwaysShowPostOptions == false) {
			document.querySelector('#checkbox-always-show-post-options').checked = false;
			var value = false;
		}
		console.log('Always Show Post Options: ' + value);
	});

	// Add Scroll To Text Post
	BROWSER_API.storage.sync.get(['textPostScroll'], function (result) {
		if (result.textPostScroll == true) {
			document.querySelector('#checkbox-text-scroll-post').checked = true;
			document.querySelector('.icon-text-scroll-post').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('productivity-tweaks');
			var value = true;
		} else if (typeof result.textPostScroll == 'undefined' || result.textPostScroll == false) {
			document.querySelector('#checkbox-text-scroll-post').checked = false;
			var value = false;
		}
		console.log('Add Scroll To Long Text Posts: ' + value);
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
				const text = document.querySelector('#feed-sort-' + result.defaultFeedSortOption).textContent;
				document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = text;
				var value = result.defaultFeedSortOption;
			} else if (typeof result.defaultFeedSortOption == 'undefined') {
				const text = document.querySelector('#feed-sort-best').textContent;
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

	// Scroll To Next Root Comment Position Horizontal
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPosition'], function (result) {
		if (typeof result.scrollToNextRootCommentPosition == 'undefined' || result.scrollToNextRootCommentPosition === '-1') {
			document.querySelector('#input-scroll-to-root-comment-position').value = -1;
			document.querySelector('#scroll-to-root-comment-position-value').innerText = '48px';
			console.log('Scroll To Next Root Comment Position: 48px');
		} else if (typeof result.scrollToNextRootCommentPosition != 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position').value = result.scrollToNextRootCommentPosition;
			document.querySelector('#scroll-to-root-comment-position-value').innerText = result.scrollToNextRootCommentPosition + '%';
			document.querySelector('.icon-scroll-to-root-comment-position').style.backgroundColor = 'var(--accent)';
			var value = result.scrollToNextRootCommentPosition;
			console.log('Scroll To Next Root Comment Position: ' + value + '%');
		}
	});

	// Scroll To Next Root Comment Position Vertical
	BROWSER_API.storage.sync.get(['scrollToNextRootCommentPositionV'], function (result) {
		if (typeof result.scrollToNextRootCommentPositionV == 'undefined' || result.scrollToNextRootCommentPositionV === '-1') {
			document.querySelector('#input-scroll-to-root-comment-position-v').value = -1;
			document.querySelector('#scroll-to-root-comment-position-v-value').innerText = '50%';
			console.log('Scroll To Next Root Comment Position Vertically: 50%');
		} else if (typeof result.scrollToNextRootCommentPositionV != 'undefined') {
			document.querySelector('#input-scroll-to-root-comment-position-v').value = result.scrollToNextRootCommentPositionV;
			document.querySelector('#scroll-to-root-comment-position-v-value').innerText = result.scrollToNextRootCommentPositionV + '%';
			document.querySelector('.icon-scroll-to-root-comment-position-v').style.backgroundColor = 'var(--accent)';
			var value = result.scrollToNextRootCommentPositionV;
			console.log('Scroll To Next Root Comment Position Vertically: ' + value + '%');
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

	/*
// Scale Post To Fit Image
BROWSER_API.storage.sync.get(['scalePostToFitImage'], function (result) {
    if (result.scalePostToFitImage == true) {
        document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = 'var(--accent)';
        document.querySelector('#checkbox-scale-post-to-fit-image').checked = true;
        highlightMenuIcon('productivity-tweaks');
        var value = true;
    } else if (typeof result.scalePostToFitImage == 'undefined' || result.scalePostToFitImage == false) {
        document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
        var value = false;
    }
    console.log('Scale Post To Fit Image: ' + value);
});

// Scale Post To Fit Image Max Image Size
BROWSER_API.storage.sync.get(['scalePostToFitImageMaxImageWidth'], function (result) {
    if (typeof result.scalePostToFitImageMaxImageWidth != 'undefined') {
        if (result.scalePostToFitImageMaxImageWidth > 29 && result.scalePostToFitImageMaxImageWidth <= 100) {
            highlightMenuIcon('productivity-tweaks');
            const scalePostToFitImage = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
            if (scalePostToFitImage === true) {
                document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = 'var(--accent)';
            }
            document.querySelector('#input-scale-post-to-fit-image-max-image-width').value = result.scalePostToFitImageMaxImageWidth;
            document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = result.scalePostToFitImageMaxImageWidth + '%';
            var value = result.scalePostToFitImageMaxImageWidth + 'px';
        } else {
            document.querySelector('#input-scale-post-to-fit-image-max-image-width').value = 29;
            document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = '40%';
            var value = 'default (40%)';
        }
    } else if (typeof result.scalePostToFitImageMaxImageWidth == 'undefined') {
        document.querySelector('#input-scale-post-to-fit-image-max-image-width').value = 29;
        document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = '40%';
        var value = 'default (40%)';
    }
    console.log('Scale Post To Fit Image Max Image Size: ' + value);
});
*/

	// Drag Image to Resize
	/*BROWSER_API.storage.sync.get(['dragImageToResize'], function (result) {
    if (result.dragImageToResize == true) {
        document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = 'var(--accent)';
        document.querySelector('#checkbox-drag-image-to-resize').checked = true;
        highlightMenuIcon('productivity-tweaks');
        var value = true;
    } else if (typeof result.dragImageToResize == 'undefined' || result.dragImageToResize == false) {
        document.querySelector('#checkbox-drag-image-to-resize').checked = false;
        var value = false;
    }
    console.log('Drag Image to Resize: ' + value);
});

// Drag Image to Resize Initial Size
BROWSER_API.storage.sync.get(['dragImageToResizeInitialSize'], function (result) {
    if (typeof result.dragImageToResizeInitialSize != 'undefined') {
        if (result.dragImageToResizeInitialSize > 99 && result.dragImageToResizeInitialSize <= 1000) {
            highlightMenuIcon('productivity-tweaks');
            const dragImageToResize = document.querySelector('#checkbox-drag-image-to-resize').checked;
            if (dragImageToResize === true) {
                document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = 'var(--accent)';
            }
            document.querySelector('#input-drag-image-to-resize-initial-size').value = result.dragImageToResizeInitialSize;
            document.querySelector('#drag-image-to-resize-initial-size-value').innerText = result.dragImageToResizeInitialSize + 'px';
            var value = result.dragImageToResizeInitialSize + 'px';
        } else {
            document.querySelector('#input-drag-image-to-resize-initial-size').value = 99;
            document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
            var value = 'default (350px)';
        }
    } else if (typeof result.dragImageToResizeInitialSize == 'undefined') {
        document.querySelector('#input-drag-image-to-resize-initial-size').value = 99;
        document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
        var value = 'default (350px)';
    }
    console.log('Drag Image to Resize Initial Size: ' + value);
});*/

	// Just Open The Image
	BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
		if (result.justOpenTheImage == true) {
			if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
				BROWSER_API.permissions.contains(
					{
						permissions: ['webRequest', 'webRequestBlocking'],
						origins: ['*://*.redd.it/*'],
					},
					(result) => {
						if (result) {
							document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
							document.querySelector('#checkbox-just-open-the-image').checked = true;
							highlightMenuIcon('productivity-tweaks');
							var value = true;
						} else {
							var value = 'false. Optional permissions not granted';
						}
						console.log('Just Open The Image: ' + value);
					}
				);
			} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
				document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
				document.querySelector('#checkbox-just-open-the-image').checked = true;
				highlightMenuIcon('productivity-tweaks');
				console.log('Just Open The Image: (true)');
			}
		} else if (typeof result.justOpenTheImage == 'undefined' || result.justOpenTheImage == false) {
			document.querySelector('#checkbox-just-open-the-image').checked = false;
			console.log('Just Open The Image: (false)');
		}
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

	// Add Download Video Button
	/*BROWSER_API.storage.sync.get(['addDownloadVideoButton'], function (result) {
    if (result.addDownloadVideoButton === true) {
        document.querySelector('.icon-add-download-video-button').style.backgroundColor = 'var(--accent)';
        document.querySelector('#checkbox-add-download-video-button').checked = true;
        highlightMenuIcon('productivity-tweaks');
        var value = true;
    } else if (typeof result.addDownloadVideoButton == 'undefined' || result.addDownloadVideoButton == false) {
        document.querySelector('#checkbox-add-download-video-button').checked = false;
        var value = false;
    }
    console.log('Add Download Video Button: ' + value);
});*/

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

	// Auto Show Comment Formatting Options
	BROWSER_API.storage.sync.get(['autoShowCommentFormattingOptions'], function (result) {
		if (result.autoShowCommentFormattingOptions === true) {
			document.querySelector('.icon-auto-show-comment-formatting-options').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-auto-show-comment-formatting-options').checked = true;
			highlightMenuIcon('productivity-tweaks');
			document.querySelector('.icon-auto-show-comment-formatting-options').classList.remove('icon-hide');
			document.querySelector('.icon-auto-show-comment-formatting-options').classList.add('icon-show');
			var value = true;
		} else if (typeof result.autoShowCommentFormattingOptions == 'undefined' || result.autoShowCommentFormattingOptions === false) {
			document.querySelector('#checkbox-auto-show-comment-formatting-options').checked = false;
			var value = false;
		}
		console.log('Auto Show Comment Formatting Options: ' + value);
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
}
