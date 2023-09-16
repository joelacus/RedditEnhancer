/* ===== Content / Load Saves ===== */

// Applies certain tweaks after the page has loaded.

import { darkModeAuto } from './functions/dark_mode/dark_mode';
import { alwaysShowRisingButton } from './functions/productivity/always_show_rising';
import { fitImage } from './functions/productivity/image_options';
import { imageScroll } from './functions/productivity/image_options';
import { openSubInNewTab } from './functions/productivity/open_sub_links_in_new_tab';
import { openPostInNewTab } from './functions/productivity/open_post_links_in_new_tab';
import { hidePromoted } from './functions/hide_elements/hide_promoted';
import { showToTopButton } from './functions/productivity/scroll_to_top';
import { showAllButton } from './functions/productivity/show_r_all_button';
import { newPlayer } from './functions/productivity/video_player';
import { sidemenuFeedTop } from './functions/productivity/sidemenu_feed_top';
import { textPostScroll } from './functions/productivity/text_post_scroll';
import { hideSeeFullImage } from './functions/hide_elements/hide_see_full_image';
import { moderniseOldReddit } from './functions/style/modernise_old_reddit';
import { limitInfinityScroll } from './functions/productivity/limit_infinity_scroll';
import { showControversialSortButton } from './functions/productivity/show_controversial_sort_button';
import { hideNSFW } from './functions/hide_elements/hide_nsfw';
import { scrollToNextRootComment } from './functions/productivity/scroll_to_next_root_comment';
import { showPostNumbers } from './functions/productivity/show_post_numbers';
import { autoExpandValue } from './functions/expand_feed_post/auto_expand_value';
import { nonStickyHeaderBar } from './functions/productivity/non_sticky_header_bar';
import { hideOriginalScrollToTop } from './functions/hide_elements/hide_original_scroll_to_top';
//import { bionicReaderComments } from './functions/accessibility/bionic_reader';
//import { bionicReaderPosts } from './functions/accessibility/bionic_reader';
//import { headerHeight } from './content-functions'
//import { expandPostOptions } from './functions/expand_post_options'

export function load_saves() {
	// Dark Mode Auto
	BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
		darkModeAuto(result.darkModeAuto);
	});
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
	// Image Scroll
	BROWSER_API.storage.sync.get(['imageScroll'], function (result) {
		imageScroll(result.imageScroll);
	});
	// Hide See Full Image
	BROWSER_API.storage.sync.get(['hideSeeFullImage'], function (result) {
		hideSeeFullImage(result.hideSeeFullImage);
	});
	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		hidePromoted(result.hidePromoted);
	});
	// Hide NSFW Links
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		hideNSFW(result.hideNSFW);
	});
	// Non Sticky Header Bar
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		nonStickyHeaderBar(result.nonStickyHeaderBar);
	});
	// Open Sub Links In New Tab
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		openSubInNewTab(result.openSubInNewTab);
	});
	// Open Post Links In New Tab
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		openPostInNewTab(result.openPostInNewTab);
	});
	// Show To Top Button
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		showToTopButton(result.showToTopButton);
	});
	// Add r/All Button To Side Menu
	BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
		showAllButton(result.showAllButton);
	});
	// Move Feed Section In Side Menu To The Top
	BROWSER_API.storage.sync.get(['sidemenuFeedTop'], function (result) {
		sidemenuFeedTop(result.sidemenuFeedTop);
	});
	// Text Scroll
	BROWSER_API.storage.sync.get(['textPostScroll'], function (result) {
		textPostScroll(result.textPostScroll);
	});
	// Modernise Old Reddit
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		moderniseOldReddit(result.moderniseOldReddit);
	});
	// Limit Infinity Scroll
	BROWSER_API.storage.sync.get(['limitInfinityScroll'], function (result) {
		limitInfinityScroll(result.limitInfinityScroll);
	});
	// Scroll To Next Root Comment
	BROWSER_API.storage.sync.get(['scrollToNextRootComment'], function (result) {
		scrollToNextRootComment(result.scrollToNextRootComment);
	});
	// Show Post Numbers
	BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
		showPostNumbers(result.showPostNumbers);
	});
	// Feed Auto Expand
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		autoExpandValue(result.autoExpandValue);
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
	/*BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
		bionicReaderComments(result.bionicReaderComments);
	});
	// Enable Bionic Reader For Posts
	BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
		bionicReaderPosts(result.bionicReaderPosts);
	});*/
	// Expand Post Options
	/*BROWSER_API.storage.sync.get(['expandPostOptions'], function(result) {
		expandPostOptions(result.expandPostOptions);
	});*/
	// Header Height
	/*BROWSER_API.storage.sync.get(['headerHeight'], function(result) {
		headerHeight(result.headerHeight);
	});*/
}
load_saves();

// Run again
setTimeout(function () {
	// Show To Top Button
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		showToTopButton(result.showToTopButton);
	});
	// Add r/All Button To Side Menu
	BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
		showAllButton(result.showAllButton);
	});
}, 5000);
