/* ===== Content First - Tweak Loader - New New Reddit (V3) ===== */

// Start observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.
// Use this loader to apply tweaks before the page has finished loading (CSS tweaks).

import { waitForAddedNode } from './main_observer';

import { loadAlwaysShowPostOptions } from '../../../content/tweaks/productivity/always_show_post_options';
import { loadAutoCollapseAutoModeratorComment } from '../../../content/tweaks/productivity/auto_collapse_automod_comment';
import { loadAutoExpandComments } from '../../../content/tweaks/productivity/auto_expand_comments';
import { loadAutoExpandValue } from '../../../content/tweaks/resize_elements/auto_expand_value';
import { loadBionicReaderColours } from '../../../content/tweaks/accessibility/bionic_reader';
import { loadCustomBackground } from '../../../content/tweaks/background/custom_background';
import { loadCustomTheme } from '../../../content/tweaks/style/override_theme_colours';
//import { loadDragImageToResize } from '../../../content/functions/productivity/scale_image_on_drag';
import { loadExpandContent } from '../../../content/tweaks/resize_elements/expand_content';
import { loadHideAdvertiseButton, loadHideChatButton, loadHideCreatePostButton, loadHideNotificationButton } from '../../../content/tweaks/hide_elements/hide_header_buttons';
import { loadHideGap } from '../../../content/tweaks/style/hide_gap';
import { loadHideHeaderBar } from '../../../content/tweaks/hide_elements/hide_header_bar';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHideRelatedPostsSection, loadHideSearchSidebar, loadHideSubSidebarException, loadHideUserSidebar, loadHideCustomFeedSidebar } from '../../../content/tweaks/hide_elements/hide_sidebar';
import { loadHideJoinButtonOnPosts } from '../../../content/tweaks/hide_elements/hide_post_join_button';
import { loadHidePostHiddenMessage } from '../../../content/tweaks/hide_elements/hide_post_hidden_message';
import { loadHidePromotedPosts } from '../../../content/tweaks/hide_elements/hide_promoted';
import { loadHideSideMenu } from '../../../content/tweaks/hide_elements/hide_side_menu';
import { loadHideSideMenuSections } from '../../../content/tweaks/hide_elements/hide_side_menu_sections';
import { loadHideUserProfilePics } from '../../../content/tweaks/hide_elements/hide_user_profile_pics';
import { loadImageScroll } from '../../../content/tweaks/productivity/scroll_tall_images';
import { loadLayoutOffset } from '../../../content/tweaks/resize_elements/layout_centre_and_offset';
import { loadNonStickyHeaderBar } from '../../../content/tweaks/productivity/non_sticky_header_bar';
import { loadResizeFont } from '../../../content/tweaks/font/resize_font';
import { loadPostFontWeight } from '../../../content/tweaks/font/font_weight';
//import { loadScalePostToFitImage } from '../../../content/functions/productivity/scale_post_to_fit_image';
import { loadScrollToNextRootCommentPosition } from '../../../content/tweaks/productivity/scroll_to_next_root_comment';
import { loadUnderlineLinks } from '../../../content/tweaks/accessibility/underline_links';
import { loadHideRecommendedPosts } from '../../../content/tweaks/hide_elements/hide_recommended';
import { loadHidePostBackButton } from '../../../content/tweaks/hide_elements/hide_post_back_button';
import { loadBorderRadiusAmount } from '../../../content/tweaks/style/border_radius';
import { loadHideRecentPosts } from '../../../content/tweaks/hide_elements/hide_recent_posts';
import { loadSideMenuWidth } from '../../../content/tweaks/resize_elements/side_menu_width';
import { loadHideCompactViewBlankThumbnails } from '../../../content/tweaks/hide_elements/hide_compact_view_blank_thumbnails';
import { loadHideCommunityHighlights } from '../../../content/tweaks/hide_elements/hide_community_highlights';
import { loadHideSearchSidebarNsfwUsers } from '../../../content/tweaks/hide_elements/hide_search_page_sidebar_nsfw_users';
import { loadHideHomeFeed } from '../../../content/tweaks/hide_elements/hide_home_feed';
import { loadFullWidthBanner } from "../../../content/tweaks/style/old_new_ui";
import { loadHidePostDivider } from "../../../content/tweaks/hide_elements/hide_post_divider";
import { loadHideBlurredMediaBackground } from "../../../content/tweaks/hide_elements/hide_blurred_media_background";
import { loadCompactHeaderSideMenu } from "../../../content/tweaks/style/old_new_ui";
import { loadResizeMainContainer } from "../../../content/tweaks/resize_elements/resize_main_container";

export function tweakLoaderNewNew() {
	loadCustomBackground();
	loadCustomTheme();
	loadSideMenuWidth();
	loadHideSideMenu();
	loadHideHomeSidebar();
	loadHideRecentPosts();
	loadHideSubSidebarException();
	loadHidePostSidebar();
	loadHideRelatedPostsSection();
	loadHideUserSidebar();
	loadHideSearchSidebar();
	loadHideCustomFeedSidebar();
	loadHideHeaderBar();
	loadHideNotificationButton();
	loadHideCreatePostButton();
	loadHideChatButton();
	loadHideAdvertiseButton();
	loadHideSideMenuSections();
	loadAutoExpandValue();
	loadExpandContent();
	loadLayoutOffset();
	loadHidePromotedPosts();
	loadScrollToNextRootCommentPosition();
	loadHideGap();
	loadResizeFont();
	loadBionicReaderColours();
	loadHideUserProfilePics();
	loadAutoExpandComments();
	loadImageScroll();
	loadNonStickyHeaderBar();
	loadHidePostHiddenMessage();
	loadHideJoinButtonOnPosts();
	loadUnderlineLinks();
	loadHideRecommendedPosts();
	//loadScalePostToFitImage();
	//loadDragImageToResize();
	loadHidePostBackButton();
	loadBorderRadiusAmount();
	loadHideCompactViewBlankThumbnails();
	loadHideCommunityHighlights();
	loadHideSearchSidebarNsfwUsers();
	loadHideHomeFeed();
	loadPostFontWeight();
	loadHidePostDivider();
	loadHideBlurredMediaBackground();
	loadFullWidthBanner();
	loadCompactHeaderSideMenu();
	loadResizeMainContainer();

	// Always Show Post Options
	waitForAddedNode({
		query: 'shreddit-post',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadAlwaysShowPostOptions();
		},
	});

	// Auto Collapse AutoModerator Comment
	waitForAddedNode({
		query: 'shreddit-comment[author="AutoModerator"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadAutoCollapseAutoModeratorComment();
		},
	});
}
