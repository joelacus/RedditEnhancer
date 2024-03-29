/* ===== New Reddit Observers ===== */

import { waitForAddedNode } from './main_observer';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHidePostOverlaySidebar, loadHideSubSidebarException, loadHideUserSidebar } from '../hide_elements/load_hide_sidebar';
import { loadExpandContent } from '../expand-layout/load_expand_content';
import { loadLayoutCentre } from '../expand-layout/load_layout_centre_and_offset';
import { loadHideGap } from '../style/load_hide_gap';
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
import { loadHidePostHiddenMessage } from '../hide_elements/load_hide_post_hidden_message';
import { loadPostHeight } from '../productivity/load_post_height';
import { loadImageScroll } from '../productivity/load_scroll_tall_images';
import { loadNonStickyHeaderBar } from '../productivity/load_non_sticky_header_bar';
import { loadAutoCollapseAutoModeratorComment } from '../productivity/load_auto_collapse_automod_comment';
//import { loadScalePostToFitImage } from '../productivity/load_scale_post_to_fit_image';
//import { loadDragImageToResize } from '../productivity/load_scale_image_on_drag';

// Load observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.

export function observersNew() {
	if (typeof useLegacy != 'undefined') {
		if (useLegacy) {
			console.log('legacy observers new');
			legacyObserversNew();
		} else {
			window.useLegacy = false;
		}
	} else {
		window.useLegacy = false;
	}
	const link = window.location.href;
	if (link.indexOf('/comments/') >= 0) {
		// post
		loadCommon();
		//loadScalePostToFitImage();
		//loadDragImageToResize();
		loadPostHeight();
		loadHideUserProfilePics();
		loadAutoExpandComments();
		if (useLegacy) {
			console.log('legacy observers feed container');
			observerFeedConainter();
		} else {
			loadHidePostSidebar();
		}
		/*waitForAddedNode({
			query: '.Comment:has([href="/user/AutoModerator/"]) button',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadAutoCollapseAutoModeratorComment();
			},
		});*/
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
		loadHidePostHiddenMessage();
		loadPostHeight();
		//loadScalePostToFitImage();
		//loadDragImageToResize();
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
	loadImageScroll();
	loadNonStickyHeaderBar();
	loadExpandContent();
	loadHideGap();

	if (!useLegacy) {
		loadLayoutCentre();
		loadHideAdvertiseButton();
		loadHideChatButton();
		loadHideCreatePostButton();
		loadHideModerationButton();
		loadHideNotificationButton();
		loadResizeFont();
		loadDropShadow();
		loadOverrideDropShadow();
	}
}
