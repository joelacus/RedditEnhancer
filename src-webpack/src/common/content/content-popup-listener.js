/* ===== Content / Settings Listener ===== */

// Listens for commands from the settings popup to enable/disable/change tweaks.

import { loadStart } from '../content-first/content-first-load-start';
import { load_saves } from './content-load-saves';
import { useCustomBackground } from './functions/background/custom_background';
import { setCustomBackground } from './functions/background/custom_background';
import { bgBlur } from './functions/background/custom_background';
import { expandLayout } from './functions/expand_feed_post/expand_content';
import { expandLayoutWidth } from './functions/expand_feed_post/expand_content';
import { layoutCentre } from './functions/expand_feed_post/expand_content';
import { darkMode } from './functions/dark_mode/dark_mode';
import { darkModeAutoListener } from './functions/dark_mode/dark_mode';
import { addDropShadow } from './functions/style/drop_shadow';
import { hideRedditPremium } from './functions/hide_elements/hide_reddit_premium';
import { hideCreatePost } from './functions/hide_elements/hide_create_post';
import { hideGap } from './functions/hide_elements/hide_gap';
import { hideUsername } from './functions/hide_elements/hide_username_and_karma';
import { hideKarma } from './functions/hide_elements/hide_username_and_karma';
import { hideHomeSidebar } from './functions/hide_elements/hide_sidebar';
import { hideSubSidebar } from './functions/hide_elements/hide_sidebar';
import { hidePostSidebar } from './functions/hide_elements/hide_sidebar';
import { hideUserSidebar } from './functions/hide_elements/hide_sidebar';
import { hideCoinButton } from './functions/hide_elements/hide_header_buttons';
import { hidePopularButton } from './functions/hide_elements/hide_header_buttons';
import { hideHappeningNowButton } from './functions/hide_elements/hide_header_buttons';
import { hideModerationButton } from './functions/hide_elements/hide_header_buttons';
import { hideChatButton } from './functions/hide_elements/hide_header_buttons';
import { hideAdvertiseButton } from './functions/hide_elements/hide_header_buttons';
import { hideNotificationButton } from './functions/hide_elements/hide_header_buttons';
import { hideCreatePostButton } from './functions/hide_elements/hide_header_buttons';
import { alwaysShowRisingButton } from './functions/productivity/always_show_rising';
import { imageScroll } from './functions/productivity/image_options';
import { fitImage } from './functions/productivity/image_options';
import { stickySort } from './functions/productivity/sticky_sort';
import { hideGetNewReddit } from './functions/hide_elements/hide_get_new_reddit';
import { hideSidebarPolicy } from './functions/hide_elements/hide_sidebar_policy';
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
import { hideHeaderSubBar } from './functions/hide_elements/hide_header_sub_bar';
import { hideSideMenuOld } from './functions/hide_elements/hide_side_menu_old';
import { autoExpandValue } from './functions/expand_feed_post/auto_expand_value';
import { limitInfinityScroll } from './functions/productivity/limit_infinity_scroll';
import { showControversialSortButton } from './functions/productivity/show_controversial_sort_button';
import { hideNSFW } from './functions/hide_elements/hide_nsfw';
import { hideTurnOnNotificationsPopup } from './functions/hide_elements/hide_turn_on_notifications_popup';
import { scrollToNextRootComment } from './functions/productivity/scroll_to_next_root_comment';
import { showPostNumbers } from './functions/productivity/show_post_numbers';
import { overrideDropShadow } from './functions/style/override_drop_shadow';
import { overrideDropShadowCSS } from './functions/style/override_drop_shadow';
import { postMaxHeight } from './functions/productivity/post_max_height';
import { themeHeaderBackgroundColour } from './functions/style/override_theme_colours';
import { themeHeaderBackgroundColourCSS } from './functions/style/override_theme_colours';
import { themeHeaderTextColour } from './functions/style/override_theme_colours';
import { themeHeaderTextColourCSS } from './functions/style/override_theme_colours';
import { themeSortBackgroundColour } from './functions/style/override_theme_colours';
import { themeSortBackgroundColourCSS } from './functions/style/override_theme_colours';
import { themeSortTextColour } from './functions/style/override_theme_colours';
import { themeSortTextColourCSS } from './functions/style/override_theme_colours';
import { themeSortTextColour2 } from './functions/style/override_theme_colours';
import { themeSortTextColour2CSS } from './functions/style/override_theme_colours';
import { themeSortBorderColour } from './functions/style/override_theme_colours';
import { themeSortBorderColourCSS } from './functions/style/override_theme_colours';
import { themePostBackgroundColour } from './functions/style/override_theme_colours';
import { themePostBackgroundColourCSS } from './functions/style/override_theme_colours';
import { themePostTextColour1 } from './functions/style/override_theme_colours';
import { themePostTextColour1CSS } from './functions/style/override_theme_colours';
import { themePostVisitedTitleColour } from './functions/style/override_theme_colours';
import { themePostVisitedTitleColourCSS } from './functions/style/override_theme_colours';
import { themePostTextColour2 } from './functions/style/override_theme_colours';
import { themePostTextColour2CSS } from './functions/style/override_theme_colours';
import { themePostBorderColour } from './functions/style/override_theme_colours';
import { themePostBorderColourCSS } from './functions/style/override_theme_colours';
import { themeBlur } from './functions/style/override_theme_colours';
import { bionicReaderPosts } from './functions/accessibility/bionic_reader';
import { bionicReaderComments } from './functions/accessibility/bionic_reader';
//import { expandPostOptions } from './functions/expand_post_options'
//import { headerHeight } from './content-functions'

/* = Listen For Settings Change = */
BROWSER_API.runtime.onMessage.addListener((msg, sender, response) => {
	var key = Object.keys(msg)[0];
	var value = Object.values(msg)[0];
	//console.log(key, value)
	if (key == 'darkMode') {
		darkMode(value);
	} else if (key == 'darkModeAutoListener') {
		darkModeAutoListener(value);
	} else if (key == 'useCustomBackground') {
		useCustomBackground(value);
	} else if (key == 'setCustomBackground') {
		setCustomBackground(value);
	} else if (key == 'bgBlur') {
		bgBlur(value);
	} else if (key == 'expandLayout') {
		expandLayout(value);
	} else if (key == 'expandLayoutWidth') {
		expandLayoutWidth(value);
	} else if (key == 'layoutCentre') {
		layoutCentre(value);
	} else if (key == 'shadows') {
		addDropShadow(value);
	} else if (key == 'fitImage') {
		fitImage(value);
	} else if (key == 'imageScroll') {
		imageScroll(value);
	} else if (key == 'hideRedditPremium') {
		hideRedditPremium(value);
	} else if (key == 'hideCreatePost') {
		hideCreatePost(value);
	} else if (key == 'hideCoinButton') {
		hideCoinButton(value);
	} else if (key == 'hideAdvertiseButton') {
		hideAdvertiseButton(value);
	} else if (key == 'hideChatButton') {
		hideChatButton(value);
	} else if (key == 'hideModerationButton') {
		hideModerationButton(value);
	} else if (key == 'hidePopularButton') {
		hidePopularButton(value);
	} else if (key == 'hideNotificationButton') {
		hideNotificationButton(value);
	} else if (key == 'hideCreatePostButton') {
		hideCreatePostButton(value);
	} else if (key == 'hideHappeningNowButton') {
		hideHappeningNowButton(value);
	} else if (key == 'hideHomeSidebar') {
		hideHomeSidebar(value);
	} else if (key == 'hideSubSidebar') {
		hideSubSidebar(value);
	} else if (key == 'hideGap') {
		hideGap(value);
	} else if (key == 'stickySort') {
		stickySort(value);
	} else if (key == 'hideUsername') {
		hideUsername(value);
	} else if (key == 'hideKarma') {
		hideKarma(value);
	} else if (key == 'alwaysShowRisingButton') {
		alwaysShowRisingButton(value);
	} else if (key == 'hideGetNewReddit') {
		hideGetNewReddit(value);
	} else if (key == 'hideSidebarPolicy') {
		hideSidebarPolicy(value);
	} else if (key == 'openSubInNewTab') {
		openSubInNewTab(value);
	} else if (key == 'openPostInNewTab') {
		openPostInNewTab(value);
	} else if (key == 'hidePromoted') {
		hidePromoted(value);
	} else if (key == 'showToTopButton') {
		showToTopButton(value);
	} else if (key == 'showAllButton') {
		showAllButton(value);
	} else if (key == 'newPlayer') {
		newPlayer(value);
	} else if (key == 'sidemenuFeedTop') {
		sidemenuFeedTop(value);
	} else if (key == 'textPostScroll') {
		textPostScroll(value);
	} else if (key == 'hideSeeFullImage') {
		hideSeeFullImage(value);
	} else if (key == 'moderniseOldReddit') {
		moderniseOldReddit(value);
	} else if (key == 'hideHeaderSubBar') {
		hideHeaderSubBar(value);
	} else if (key == 'hideSideMenuOld') {
		hideSideMenuOld(value);
	} else if (key == 'autoExpandValue') {
		autoExpandValue(value);
	} else if (key == 'hidePostSidebar') {
		hidePostSidebar(value);
	} else if (key == 'hideUserSidebar') {
		hideUserSidebar(value);
	} else if (key == 'limitInfinityScroll') {
		limitInfinityScroll(value);
	} else if (key == 'showControversialSortButton') {
		showControversialSortButton(value);
	} else if (key == 'hideNSFW') {
		hideNSFW(value);
	} else if (key == 'hideTurnOnNotificationsPopup') {
		hideTurnOnNotificationsPopup(value);
	} else if (key == 'scrollToNextRootComment') {
		scrollToNextRootComment(value);
	} else if (key == 'showPostNumbers') {
		showPostNumbers(value);
	} else if (key == 'overrideDropShadow') {
		overrideDropShadow(value);
	} else if (key == 'overrideDropShadowCSS') {
		overrideDropShadowCSS(value);
	} else if (key == 'postMaxHeight') {
		postMaxHeight(value);
	} else if (key == 'themeHeaderBackgroundColour') {
		themeHeaderBackgroundColour(value);
	} else if (key == 'themeHeaderBackgroundColourCSS') {
		themeHeaderBackgroundColourCSS(value);
	} else if (key == 'themeHeaderTextColour') {
		themeHeaderTextColour(value);
	} else if (key == 'themeHeaderTextColourCSS') {
		themeHeaderTextColourCSS(value);
	} else if (key == 'themeSortBackgroundColour') {
		themeSortBackgroundColour(value);
	} else if (key == 'themeSortBackgroundColourCSS') {
		themeSortBackgroundColourCSS(value);
	} else if (key == 'themeSortTextColour') {
		themeSortTextColour(value);
	} else if (key == 'themeSortTextColourCSS') {
		themeSortTextColourCSS(value);
	} else if (key == 'themeSortTextColour2') {
		themeSortTextColour2(value);
	} else if (key == 'themeSortTextColour2CSS') {
		themeSortTextColour2CSS(value);
	} else if (key == 'themeSortBorderColour') {
		themeSortBorderColour(value);
	} else if (key == 'themeSortBorderColourCSS') {
		themeSortBorderColourCSS(value);
	} else if (key == 'themePostBackgroundColour') {
		themePostBackgroundColour(value);
	} else if (key == 'themePostBackgroundColourCSS') {
		themePostBackgroundColourCSS(value);
	} else if (key == 'themePostVisitedTitleColour') {
		themePostVisitedTitleColour(value);
	} else if (key == 'themePostVisitedTitleColourCSS') {
		themePostVisitedTitleColourCSS(value);
	} else if (key == 'themePostTextColour1') {
		themePostTextColour1(value);
	} else if (key == 'themePostTextColour1CSS') {
		themePostTextColour1CSS(value);
	} else if (key == 'themePostTextColour2') {
		themePostTextColour2(value);
	} else if (key == 'themePostTextColour2CSS') {
		themePostTextColour2CSS(value);
	} else if (key == 'themePostBorderColour') {
		themePostBorderColour(value);
	} else if (key == 'themePostBorderColourCSS') {
		themePostBorderColourCSS(value);
	} else if (key == 'themeBlur') {
		themeBlur(value);
	} /* else if (key == 'bionicReaderPosts') {
		bionicReaderPosts(value);
	} else if (key == 'bionicReaderComments') {
		bionicReaderComments(value);
	}   else if (key == "headerHeight") {
		headerHeight(value);
	} else if (key == "expandPostOptions") {
		expandPostOptions(value);
	}*/ else if (key == 'loadSaves') {
		setTimeout(function () {
			loadStart();
			load_saves();
		}, 100);
	}
	return true;
});
