/* ===== Content / Load Saves ===== */

// Applies certain tweaks after the page has loaded.

import { darkModeAuto } from './functions/dark_mode/dark_mode';
import { alwaysShowRisingButton } from './functions/productivity/always_show_rising';
import { fitImage } from './functions/productivity/image_options';
import { imageScroll } from './functions/productivity/image_options';
import { openSubInNewTab } from './functions/productivity/open_sub_links_in_new_tab';
import { openPostInNewTab } from './functions/productivity/open_post_links_in_new_tab';
import { showAllButton } from './functions/productivity/show_r_all_button';
import { showToTopButton } from './functions/productivity/scroll_to_top';
import { newPlayer } from './functions/productivity/video_player';
import { sidemenuFeedTop } from './functions/productivity/sidemenu_feed_top';
import { textPostScroll } from './functions/productivity/text_post_scroll';
import { hideSeeFullImage } from './functions/hide_elements/hide_see_full_image';
import { moderniseOldReddit } from './functions/style/modernise_old_reddit';
import { limitInfinityScroll } from './functions/productivity/limit_infinity_scroll';
import { showControversialSortButton } from './functions/productivity/show_controversial_sort_button';
import { hideNSFW } from './functions/hide_elements/hide_nsfw';
import { scrollToNextRootComment } from './functions/productivity/scroll_to_next_root_comment';
import { autoExpandValue } from './functions/expand_feed_post/auto_expand_value';
import { nonStickyHeaderBar } from './functions/productivity/non_sticky_header_bar';
import { hideOriginalScrollToTop } from './functions/hide_elements/hide_original_scroll_to_top';
import { showPostAuthor } from './functions/productivity/show_post_author';
import { bionicReaderPosts, bionicReaderComments, bionicReaderFontColour, bionicReaderBgColour } from './functions/accessibility/bionic_reader';
import { loadShowPostNumbers } from '../content-first/functions/productivity/load_show_post_numbers';
import { loadBreakReminder } from '../content-first/functions/productivity/load_break_reminder';
import { loadAutoExpandComments } from '../content-first/functions/productivity/load_auto_expand_comments';
//import { expandPostOptions } from './functions/expand_post_options'

export function load_saves() {
	if (redditVersion === 'old') {
		// Modernise Old Reddit
		BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
			moderniseOldReddit(result.moderniseOldReddit);
		});
	} else if (redditVersion === 'new') {
		// Always Show Rising Button
		BROWSER_API.storage.sync.get(['alwaysShowRisingButton'], function (result) {
			alwaysShowRisingButton(result.alwaysShowRisingButton);
		});
		// Show Controversial Sort Button
		BROWSER_API.storage.sync.get(['showControversialSortButton'], function (result) {
			showControversialSortButton(result.showControversialSortButton);
		});
		// Scale Tall Images
		BROWSER_API.storage.sync.get(['fitImage'], function (result) {
			fitImage(result.fitImage);
		});
		// Hide See Full Image
		BROWSER_API.storage.sync.get(['hideSeeFullImage'], function (result) {
			hideSeeFullImage(result.hideSeeFullImage);
		});
		// Move Feed Section In Side Menu To The Top
		BROWSER_API.storage.sync.get(['sidemenuFeedTop'], function (result) {
			sidemenuFeedTop(result.sidemenuFeedTop);
		});
		// Text Scroll
		BROWSER_API.storage.sync.get(['textPostScroll'], function (result) {
			textPostScroll(result.textPostScroll);
		});
		// Image Scroll
		BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
			imageScroll(result.imageScroll);
		});
		// Non Sticky Header Bar
		BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
			nonStickyHeaderBar(result.nonStickyHeaderBar);
		});
		// Limit Infinity Scroll
		BROWSER_API.storage.sync.get(['limitInfinityScroll'], function (result) {
			limitInfinityScroll(result.limitInfinityScroll);
		});
		// Hide Original Scroll To Top Button
		BROWSER_API.storage.sync.get(['hideOriginalScrollToTop'], function (result) {
			hideOriginalScrollToTop(result.hideOriginalScrollToTop);
		});
		// New Player
		BROWSER_API.storage.sync.get(['newPlayer'], function (result) {
			newPlayer(result.newPlayer);
		});
		// Enable Bionic Reader For Comments
		BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
			bionicReaderComments(result.bionicReaderComments);
		});
		// Enable Bionic Reader For Posts
		BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
			bionicReaderPosts(result.bionicReaderPosts);
		});
		// Open Sub Links In New Tab
		BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
			openSubInNewTab(result.openSubInNewTab);
		});
		// Open Post Links In New Tab
		BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
			openPostInNewTab(result.openPostInNewTab);
		});
		// Add r/All Button To Side Menu
		BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
			showAllButton(result.showAllButton);
		});
		// Scroll To Next Root Comment
		BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
			scrollToNextRootComment(result.scrollToNextRootComment);
		});
		loadShowPostNumbers();
		loadBreakReminder();
		loadAutoExpandComments();
		// Expand Post Options
		/*BROWSER_API.storage.sync.get(['expandPostOptions'], function(result) {
			expandPostOptions(result.expandPostOptions);
		});*/
	} else if (redditVersion === 'newnew') {
		// Show Post User
		BROWSER_API.storage.sync.get(['showPostAuthor'], function (result) {
			showPostAuthor(result.showPostAuthor);
		});
		// Image Scroll
		BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
			imageScroll(result.imageScroll);
		});
		// Non Sticky Header Bar
		BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
			nonStickyHeaderBar(result.nonStickyHeaderBar);
		});
		// Enable Bionic Reader For Comments
		BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
			bionicReaderComments(result.bionicReaderComments);
		});
		// Enable Bionic Reader For Posts
		BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
			bionicReaderPosts(result.bionicReaderPosts);
		});
		// Scroll To Next Root Comment
		BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
			scrollToNextRootComment(result.scrollToNextRootComment);
		});
	}

	// Common

	// Dark Mode Auto
	BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
		darkModeAuto(result.darkModeAuto);
	});
	// Hide NSFW Links - Has Legacy Support
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		hideNSFW(result.hideNSFW);
	});
	// Show To Top Button
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		showToTopButton(result.showToTopButton);
	});
	// Feed Auto Expand
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		autoExpandValue(result.autoExpandValue);
	});

	// Run again
	setTimeout(() => {
		// Show To Top Button
		BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
			showToTopButton(result.showToTopButton);
		});
		// Add r/All Button To Side Menu
		BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
			showAllButton(result.showAllButton);
		});
	}, 5000);
}
load_saves();
