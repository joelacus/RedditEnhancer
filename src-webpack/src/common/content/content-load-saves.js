/* ===== Content / Load Saves ===== */

// Applies certain tweaks after the page has loaded.

import { darkModeAuto } from './functions/dark_mode'
import { alwaysShowRisingButton } from './functions/always_show_rising'
import { fitImage } from './functions/image_options'
import { imageScroll } from './functions/image_options'
import { openSubInNewTab } from './functions/open_sub_links_in_new_tab'
import { hidePromoted } from './functions/hide_promoted'
import { showToTopButton } from './functions/scroll_to_top'
import { showAllButton } from './functions/show_r_all_button'
import { newPlayer } from './functions/video_player'
import { sidemenuFeedTop } from './functions/sidemenu_feed_top'
import { textPostScroll } from './functions/text_post_scroll'
import { hideSeeFullImage } from './functions/hide_see_full_image'
import { moderniseOldReddit } from './functions/modernise_old_reddit'
import { autoExpandValue } from './functions/auto_expand_value'
import { limitInfinityScroll } from './functions/limit_infinity_scroll'
//import { headerHeight } from './content-functions'
//import { expandPostOptions } from './functions/expand_post_options'


export function load_saves() {
	// Dark Mode Auto
	BROWSER_API.storage.sync.get(['darkModeAuto'], function(result) {
		darkModeAuto(result.darkModeAuto);
	});
	// Always Show Rising Button
	BROWSER_API.storage.sync.get(['alwaysShowRisingButton'], function(result) {
		alwaysShowRisingButton(result.alwaysShowRisingButton);
	});
	// Scale Tall Images
	BROWSER_API.storage.sync.get(['fitImage'], function(result) {
		fitImage(result.fitImage);
	});
	// Image Scroll
	BROWSER_API.storage.sync.get(['imageScroll'], function(result) {
		imageScroll(result.imageScroll);
	});
	// Hide See Full Image
	BROWSER_API.storage.sync.get(['hideSeeFullImage'], function(result) {
		hideSeeFullImage(result.hideSeeFullImage);
	});
	// Hide Promoted Links
	BROWSER_API.storage.sync.get(['hidePromoted'], function(result) {
		hidePromoted(result.hidePromoted);
	});
	// Open Sub Links In New Tab
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function(result) {
		openSubInNewTab(result.openSubInNewTab);
	});
	// Show To Top Button
	BROWSER_API.storage.sync.get(['showToTopButton'], function(result) {
		showToTopButton(result.showToTopButton);
	});
	// Add r/All Button To Side Menu
	BROWSER_API.storage.sync.get(['showAllButton'], function(result) {
		showAllButton(result.showAllButton);
	});
	// Move Feed Section In Side Menu To The Top
	BROWSER_API.storage.sync.get(['sidemenuFeedTop'], function(result) {
		sidemenuFeedTop(result.sidemenuFeedTop);
	});
	// New Player
	BROWSER_API.storage.sync.get(['newPlayer'], function(result) {
		newPlayer(result.newPlayer);
	});
	// Text Scroll
	BROWSER_API.storage.sync.get(['textPostScroll'], function(result) {
		textPostScroll(result.textPostScroll);
	});
	// Modernise Old Reddit
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function(result) {
		moderniseOldReddit(result.moderniseOldReddit);
	});
	// Limit Infinity Scroll
	BROWSER_API.storage.sync.get(['limitInfinityScroll'], function(result) {
		limitInfinityScroll(result.limitInfinityScroll);
	});
	// Expand Post Options
	/*BROWSER_API.storage.sync.get(['expandPostOptions'], function(result) {
		expandPostOptions(result.expandPostOptions);
	});*/
	// Header Height
	/*BROWSER_API.storage.sync.get(['headerHeight'], function(result) {
		headerHeight(result.headerHeight);
	});*/
	// Expand Post Options
	/*BROWSER_API.storage.sync.get(['expandPostOptions'], function(result) {
		expandPostOptions(result.expandPostOptions);
	});*/
}
load_saves();
