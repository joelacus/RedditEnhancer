/* ===== Old New Reddit Observers / Tweak Loader ===== */

//import { waitForAddedNode } from './main_observer';

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
import {
	loadHideAdvertiseButton,
	loadHideChatButton,
	loadHideCreatePostButton,
	loadHideModerationButton,
	loadHideNotificationButton,
	loadHidePopularButton,
} from '../../../content/functions/hide_elements/hide_header_buttons';
import { loadAutoExpandComments } from '../../../content/functions/productivity/auto_expand_comments';
import { loadBionicReaderColours } from '../../../content/functions/accessibility/bionic_reader';
import { loadCustomBackground } from '../../../content/functions/background/custom_background';
import { loadCustomTheme } from '../../../content/functions/style/override_theme_colours';
//import { loadDragImageToResize } from '../../../content/functions/productivity/scale_image_on_drag';
import { loadDropShadow } from '../../../content/functions/style/drop_shadow';
import { loadExpandContent } from '../../../content/functions/expand_feed_post/expand_content';
import { loadHideCreatePost } from '../../../content/functions/hide_elements/hide_create_post';
import { loadHideGap } from '../../../content/functions/style/hide_gap';
import { loadHideHeaderBar } from '../../../content/functions/hide_elements/hide_header_bar';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHidePostOverlaySidebar, loadHideSubSidebarException, loadHideUserSidebar } from '../../../content/functions/hide_elements/hide_sidebar';
import { loadHideJoinButtonOnPosts } from '../../../content/functions/hide_elements/hide_post_join_button';
import { loadHidePostHiddenMessage } from '../../../content/functions/hide_elements/hide_post_hidden_message';
import { loadHidePromotedPosts } from '../../../content/functions/hide_elements/hide_promoted';
import { loadHideRedditPremium } from '../../../content/functions/hide_elements/hide_reddit_premium';
import { loadHideSidebarPolicy } from '../../../content/functions/hide_elements/hide_sidebar_policy';
import { loadHideTurnOnNotificationsPopup } from '../../../content/functions/hide_elements/hide_turn_on_notifications_popup';
import { loadHideUsernameAndKarma } from '../../../content/functions/hide_elements/hide_username_and_karma';
import { loadHideUserProfilePics } from '../../../content/functions/hide_elements/hide_user_profile_pics';
import { loadImageScroll } from '../../../content/functions/productivity/scroll_tall_images';
import { loadLargerClassicPost } from '../../../content/functions/style/larger_classic_post';
import { loadLayoutCentre } from '../../../content/functions/expand_feed_post/layout_centre_and_offset';
import { loadNonStickyHeaderBar } from '../../../content/functions/productivity/non_sticky_header_bar';
import { loadOverrideDropShadow } from '../../../content/functions/style/override_drop_shadow';
import { loadPostHeight } from '../../../content/functions/productivity/post_max_height';
import { loadResizeFont } from '../../../content/functions/accessibility/resize_font';
//import { loadScalePostToFitImage } from '../../../content/functions/productivity/scale_post_to_fit_image';
import { loadScrollToNextRootCommentPosition } from '../../../content/functions/productivity/scroll_to_next_root_comment';
import { loadStickySort } from '../../../content/functions/productivity/sticky_sort';
import { loadUnderlineLinks } from '../../../content/functions/accessibility/underline_links';

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
		loadHideJoinButtonOnPosts();
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
	loadUnderlineLinks();

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
