/* ===== Content First - Tweak Loader - Old New (V2) ===== */

// Start observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.
// Use this loader to apply tweaks before the page has finished loading (CSS tweaks).

//import { waitForAddedNode } from './main_observer';

import { legacyObserversNew, observerFeedContainer, observerFeedContainerAndFeed, observerSearchContainer, observerSort, observerUserFeedContainerAndFeed, observerUserSidebar, observerUserSort } from './legacy_observers';
import { loadHideAdvertiseButton, loadHideChatButton, loadHideCreatePostButton, loadHideModerationButton, loadHideNotificationButton, loadHidePopularButton } from '../../../content/tweaks/hide_elements/hide_header_buttons';
import { loadBionicReaderColours } from '../../../content/tweaks/accessibility/bionic_reader';
import { loadCustomBackground } from '../../../content/tweaks/background/custom_background';
import { loadCustomTheme } from '../../../content/tweaks/style/override_theme_colours';
import { loadDropShadow } from '../../../content/tweaks/style/drop_shadow';
import { loadExpandContent } from '../../../content/tweaks/resize_elements/expand_content';
import { loadHideCreatePost } from '../../../content/tweaks/hide_elements/hide_create_post';
import { loadHideGap } from '../../../content/tweaks/style/hide_gap';
import { loadHideHeaderBar } from '../../../content/tweaks/hide_elements/hide_header_bar';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHidePostOverlaySidebar, loadHideSubSidebarException, loadHideUserSidebar, loadHideSearchSidebar, loadHideCustomFeedSidebar } from '../../../content/tweaks/hide_elements/hide_sidebar';
import { loadHideJoinButtonOnPosts } from '../../../content/tweaks/hide_elements/hide_post_join_button';
import { loadHidePostHiddenMessage } from '../../../content/tweaks/hide_elements/hide_post_hidden_message';
import { loadHidePromotedPosts } from '../../../content/tweaks/hide_elements/hide_promoted';
import { loadHideRedditPremium } from '../../../content/tweaks/hide_elements/hide_reddit_premium';
import { loadHideSidebarPolicy } from '../../../content/tweaks/hide_elements/hide_sidebar_policy';
import { loadHideTurnOnNotificationsPopup } from '../../../content/tweaks/hide_elements/hide_turn_on_notifications_popup';
import { loadHideUsernameAndKarma } from '../../../content/tweaks/hide_elements/hide_username_and_karma';
import { loadHideUserProfilePics } from '../../../content/tweaks/hide_elements/hide_user_profile_pics';
import { loadImageScroll } from '../../../content/tweaks/productivity/scroll_images';
import { loadLargerClassicPost } from '../../../content/tweaks/style/larger_classic_post';
import { loadLayoutCentre } from '../../../content/tweaks/resize_elements/layout_centre_and_offset';
import { loadNonStickyHeaderBar } from '../../../content/tweaks/productivity/non_sticky_header_bar';
import { loadOverrideDropShadow } from '../../../content/tweaks/style/override_drop_shadow';
import { loadPostHeight } from '../../../content/tweaks/productivity/post_max_height';
import { loadResizeFont } from '../../../content/tweaks/font/resize_font';
import { loadPostFontWeight } from '../../../content/tweaks/font/font_weight';
import { loadScrollToNextRootCommentPosition } from '../../../content/tweaks/productivity/scroll_to_next_root_comment';
import { loadStickySort } from '../../../content/tweaks/productivity/sticky_sort';
import { loadUnderlineLinks } from '../../../content/tweaks/accessibility/underline_links';
import { loadHideRecommendedPosts } from '../../../content/tweaks/hide_elements/hide_recommended';
import { loadHideHomeFeed } from '../../../content/tweaks/hide_elements/hide_home_feed';
import { loadHidePostKarma, loadHideCommentKarma } from '../../../content/tweaks/hide_elements/hide_post_comment_karma';
import { loadHideVoteButtons } from '../../../content/tweaks/hide_elements/hide_vote_buttons';

export function tweakLoaderOldNew() {
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
		loadPostHeight();
		loadHideUserProfilePics();
		if (useLegacy) {
			console.log('legacy observers feed container');
			observerFeedContainer();
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
		loadHideSearchSidebar();
		loadHidePostOverlaySidebar();
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
		loadHideHomeFeed();
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
			loadHideCustomFeedSidebar();
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
	loadPostFontWeight();
	loadHidePostKarma();
	loadHideCommentKarma();
	loadHideVoteButtons();

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
		loadHideRecommendedPosts();
	}
}
