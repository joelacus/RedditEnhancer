/* ===== Content / Settings Listener ===== */

// Listens for commands from the settings popup to enable/disable/change tweaks.

import { loadStart } from '../content-first/content-first-load-start'
import { load_saves } from './content-load-saves'
import { useCustomBackground } from './functions/custom_background'
import { setCustomBackground } from './functions/custom_background'
import { bgBlur } from './functions/custom_background'
import { expandLayout } from './functions/expand_content'
import { expandLayoutWidth } from './functions/expand_content'
import { layoutCentre } from './functions/expand_content'
import { darkMode } from './functions/dark_mode'
import { darkModeAutoListener } from './functions/dark_mode'
import { addDropShadow } from './functions/drop_shadow'
import { hideRedditPremium } from './functions/hide_reddit_premium'
import { hideCreatePost } from './functions/hide_create_post'
import { hideGap } from './functions/hide_gap'
import { hideUsername } from './functions/hide_username_and_karma'
import { hideKarma } from './functions/hide_username_and_karma'
import { hideHomeSidebar } from './functions/hide_sidebar'
import { hideSubSidebar } from './functions/hide_sidebar'
import { hidePostSidebar } from './functions/hide_sidebar'
import { hideUserSidebar } from './functions/hide_sidebar'
import { hideCoinButton } from './functions/hide_header_buttons'
import { hidePopularButton } from './functions/hide_header_buttons'
import { hideHappeningNowButton } from './functions/hide_header_buttons'
import { hideModerationButton } from './functions/hide_header_buttons'
import { hideChatButton } from './functions/hide_header_buttons'
import { hideAdvertiseButton } from './functions/hide_header_buttons'
import { hideNotificationButton } from './functions/hide_header_buttons'
import { hideCreatePostButton } from './functions/hide_header_buttons'
import { alwaysShowRisingButton } from './functions/always_show_rising'
import { imageScroll } from './functions/image_options'
import { fitImage } from './functions/image_options'
import { stickySort } from './functions/sticky_sort'
import { hideGetNewReddit } from './functions/hide_get_new_reddit'
import { hideSidebarPolicy } from './functions/hide_sidebar_policy'
import { openSubInNewTab } from './functions/open_sub_links_in_new_tab'
import { hidePromoted } from './functions/hide_promoted'
import { showToTopButton } from './functions/scroll_to_top'
import { showAllButton } from './functions/show_r_all_button'
import { newPlayer } from './functions/video_player'
import { sidemenuFeedTop } from './functions/sidemenu_feed_top'
import { textPostScroll } from './functions/text_post_scroll'
import { hideSeeFullImage } from './functions/hide_see_full_image'
import { moderniseOldReddit } from './functions/modernise_old_reddit'
import { hideHeaderSubBar } from './functions/hide_header_sub_bar'
import { hideSideMenuOld } from './functions/hide_side_menu_old'
import { autoExpandValue } from './functions/auto_expand_value'
import { limitInfinityScroll } from './functions/limit_infinity_scroll'
//import { expandPostOptions } from './functions/expand_post_options'
//import { headerHeight } from './content-functions'


/* = Listen For Settings Change = */
BROWSER_API.runtime.onMessage.addListener((msg, sender, response) => {
	var key = Object.keys(msg)[0]
	var value = Object.values(msg)[0]
	//console.log(key, value)
	if (key == "darkMode") {
		darkMode(value);
	} else if (key == "darkModeAutoListener") {
		darkModeAutoListener(value);
	} else if (key == "useCustomBackground") {
		useCustomBackground(value);
	} else if (key == "setCustomBackground") {
		setCustomBackground(value);
	} else if (key == "bgBlur") {
		bgBlur(value);
	} else if (key == "expandLayout") {
		expandLayout(value);
	} else if (key == "expandLayoutWidth") {
		expandLayoutWidth(value);
	} else if (key == "layoutCentre") {
		layoutCentre(value);
	}  else if (key == "shadows") {
		addDropShadow(value);
	} else if (key == "fitImage") {
		fitImage(value);
	} else if (key == "imageScroll") {
		imageScroll(value);
	} else if (key == "hideRedditPremium") {
		hideRedditPremium(value);
	} else if (key == "hideCreatePost") {
		hideCreatePost(value);
	} else if (key == "hideCoinButton") {
		hideCoinButton(value);
	} else if (key == "hideAdvertiseButton") {
		hideAdvertiseButton(value);
	} else if (key == "hideChatButton") {
		hideChatButton(value);
	} else if (key == "hideModerationButton") {
		hideModerationButton(value);
	} else if (key == "hidePopularButton") {
		hidePopularButton(value);
	} else if (key == "hideNotificationButton") {
		hideNotificationButton(value);
	} else if (key == "hideCreatePostButton") {
		hideCreatePostButton(value);
	} else if (key == "hideHappeningNowButton") {
		hideHappeningNowButton(value);
	} else if (key == "hideHomeSidebar") {
		hideHomeSidebar(value);
	} else if (key == "hideSubSidebar") {
		hideSubSidebar(value);
	} else if (key == "hideGap") {
		hideGap(value);
	} else if (key == "stickySort") {
		stickySort(value);
	} else if (key == "hideUsername") {
		hideUsername(value);
	} else if (key == "hideKarma") {
		hideKarma(value);
	} else if (key == "alwaysShowRisingButton") {
		alwaysShowRisingButton(value);
	} else if (key == "hideGetNewReddit") {
		hideGetNewReddit(value);
	} else if (key == "hideSidebarPolicy") {
		hideSidebarPolicy(value);
	} else if (key == "openSubInNewTab") {
		openSubInNewTab(value);
	} else if (key == "hidePromoted") {
		hidePromoted(value);
	} else if (key == "showToTopButton") {
		showToTopButton(value);
	} else if (key == "showAllButton") {
		showAllButton(value);
	} else if (key == "newPlayer") {
		newPlayer(value);
	} else if (key == "sidemenuFeedTop") {
		sidemenuFeedTop(value);
	} else if (key == "textPostScroll") {
		textPostScroll(value);
	} else if (key == "hideSeeFullImage") {
		hideSeeFullImage(value);
	} else if (key == "moderniseOldReddit") {
		moderniseOldReddit(value);
	} else if (key == "hideHeaderSubBar") {
		hideHeaderSubBar(value);
	} else if (key == "hideSideMenuOld") {
		hideSideMenuOld(value);
	} else if (key == "autoExpandValue") {
		autoExpandValue(value);
	} else if (key == "hidePostSidebar") {
		hidePostSidebar(value);
	} else if (key == "hideUserSidebar") {
		hideUserSidebar(value);
	} else if (key == "limitInfinityScroll") {
		limitInfinityScroll(value);
	}/*  else if (key == "headerHeight") {
		headerHeight(value);
	} else if (key == "expandPostOptions") {
		expandPostOptions(value);
	}*/ else if (key == "loadSaves") {
		setTimeout(function () {
			loadStart();
			load_saves();
		}, 100);
	}
	return true;
});
