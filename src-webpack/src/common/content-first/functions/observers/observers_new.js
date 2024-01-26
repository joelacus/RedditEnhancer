/* ===== New Reddit Observers ===== */

import { loadHideHomeSidebar, loadHidePostSidebar, loadHidePostOverlaySidebar, loadHideSubSidebarException, loadHideUserSidebar } from '../hide_elements/load_hide_sidebar';
import { loadExpandContent } from '../expand-layout/load_expand_content';
import { loadLayoutCentre } from '../expand-layout/load_layout_centre_and_offset';
import { loadHideGap } from '../hide_elements/load_hide_gap';
import { loadDropShadow } from '../style/load_drop_shadow';
import { loadOverrideDropShadow } from '../style/load_override_drop_shadow';
import { loadStickySort } from '../productivity/load_sticky_sort';
import {
	loadHideAdvertiseButton,
	loadHideChatButton,
	loadHideCreatePostButton,
	loadHideModerationButton,
	loadHideNotificationButton,
	loadHidePopularButton,
} from '../hide_elements/load_hide_header_buttons';
import { loadHideCreatePost } from '../hide_elements/load_hide_create_post';
import { loadHideRedditPremium } from '../hide_elements/load_hide_reddit_premium';
import { loadHideSidebarPolicy } from '../hide_elements/load_hide_sidebar_policy';
import { loadHideHeaderBar } from '../hide_elements/load_hide_header_bar';
import { loadHideUsernameAndKarma } from '../hide_elements/load_hide_username_and_karma';
import { loadHideTurnOnNotificationsPopup } from '../hide_elements/load_hide_turn_on_notifications_popup';
import { loadHidePromotedPosts } from '../hide_elements/load_hide_promoted';
import {
	legacyObserversNew,
	observerFeedConainter,
	observerFeedContainerAndFeed,
	observerSearchContainer,
	observerSort,
	observerUserFeedContainerAndFeed,
	observerUserSidebar,
	observerUserSort,
} from './legacy_observers';
import { loadScrollToNextRootCommentPosition } from '../productivity/load_scroll_to_next_root_comment';
import { loadLargerClassicPost } from '../style/load_larger_classic_post';
import { loadResizeFont } from '../style/load_resize_font';
import { loadBionicReaderColours } from '../accessibility/load_bionic_reader';
import { loadHideUserProfilePics } from '../hide_elements/load_hide_user_profile_pics';
import { loadCustomBackground } from '../style/load_custom_background';
import { loadCustomTheme } from '../style/load_custom_theme_colours';
import { loadAutoExpandComments } from '../productivity/load_auto_expand_comments';

// Load observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.

export function observersNew() {
	if (typeof useLegacy != 'undefined') {
		if (useLegacy) {
			legacyObserversNew();
		}
	} else {
		window.useLegacy = false;
	}
	const link = window.location.href;
	if (link.indexOf('/comments/') >= 0) {
		// post
		loadCommon();
		loadHideUserProfilePics();
		loadAutoExpandComments();
		if (useLegacy) {
			observerFeedConainter();
		} else {
			loadHidePostSidebar();
		}
	} else if (link.indexOf('/user/') >= 0) {
		loadCommon();
		if (useLegacy) {
			observerUserFeedContainerAndFeed();
			observerUserSidebar();
			observerUserSort();
		} else {
			loadHideUserSidebar();
		}
	} else if (link.indexOf('/search/') >= 0) {
		// search
		loadCommon();
		if (useLegacy) {
			observerSearchContainer();
		}
	} else {
		// feed/sub
		loadCommon();
		loadLargerClassicPost();
		if (useLegacy) {
			observerFeedContainerAndFeed();
			observerSort();
		} else {
			loadHideCreatePost();
			loadHideRedditPremium();
			loadHideSidebarPolicy();
			loadHideHomeSidebar();
			loadHideSubSidebarException();
			loadHidePostOverlaySidebar();
			loadStickySort();
		}
	}
}

function loadCommon() {
	loadCustomBackground();
	loadCustomTheme();
	loadHideHeaderBar();
	loadHideUsernameAndKarma();
	loadHideTurnOnNotificationsPopup();
	loadScrollToNextRootCommentPosition();
	loadHidePopularButton();
	loadHidePromotedPosts();
	loadBionicReaderColours();

	if (!useLegacy) {
		loadExpandContent();
		loadLayoutCentre();
		loadHideAdvertiseButton();
		loadHideChatButton();
		loadHideCreatePostButton();
		loadHideModerationButton();
		loadHideNotificationButton();
		loadResizeFont();
		loadHideGap();
		loadDropShadow();
		loadOverrideDropShadow();
	}
}
