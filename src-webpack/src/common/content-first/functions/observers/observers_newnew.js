/* ===== New New Reddit Observers / Tweak Loader ===== */

// Load observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.

import { waitForAddedNode } from './main_observer';

import { loadAlwaysShowPostOptions } from '../../../content/functions/productivity/always_show_post_options';
import { loadAutoCollapseAutoModeratorComment } from '../../../content/functions/productivity/auto_collapse_automod_comment';
import { loadAutoExpandComments } from '../../../content/functions/productivity/auto_expand_comments';
import { loadAutoExpandValue } from '../../../content/functions/expand_feed_post/auto_expand_value';
import { loadBionicReaderColours } from '../../../content/functions/accessibility/bionic_reader';
import { loadCustomBackground } from '../../../content/functions/background/custom_background';
import { loadCustomTheme } from '../../../content/functions/style/override_theme_colours';
//import { loadDragImageToResize } from '../../../content/functions/productivity/scale_image_on_drag';
import { loadExpandContent } from '../../../content/functions/expand_feed_post/expand_content';
import { loadHideAdvertiseButton, loadHideChatButton, loadHideCreatePostButton, loadHideNotificationButton } from '../../../content/functions/hide_elements/hide_header_buttons';
import { loadHideGap } from '../../../content/functions/style/hide_gap';
import { loadHideHeaderBar } from '../../../content/functions/hide_elements/hide_header_bar';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHideRelatedPostsSection, loadHideSearchSidebar, loadHideSubSidebarException, loadHideUserSidebar, loadHideCustomFeedSidebar } from '../../../content/functions/hide_elements/hide_sidebar';
import { loadHideJoinButtonOnPosts } from '../../../content/functions/hide_elements/hide_post_join_button';
import { loadHidePostHiddenMessage } from '../../../content/functions/hide_elements/hide_post_hidden_message';
import { loadHidePromotedPosts } from '../../../content/functions/hide_elements/hide_promoted';
import { loadHideSideMenu } from '../../../content/functions/hide_elements/hide_side_menu';
import { loadHideSideMenuSections } from '../../../content/functions/hide_elements/hide_side_menu_sections';
import { loadHideUserProfilePics } from '../../../content/functions/hide_elements/hide_user_profile_pics';
import { loadImageScroll } from '../../../content/functions/productivity/scroll_tall_images';
import { loadLayoutOffset } from '../../../content/functions/expand_feed_post/layout_centre_and_offset';
import { loadNonStickyHeaderBar } from '../../../content/functions/productivity/non_sticky_header_bar';
//import { loadRemovePageSideMargin } from '../../../content/functions/expand_feed_post/remove_page_side_margin';
import { loadResizeFont } from '../../../content/functions/accessibility/resize_font';
//import { loadScalePostToFitImage } from '../../../content/functions/productivity/scale_post_to_fit_image';
import { loadScrollToNextRootCommentPosition } from '../../../content/functions/productivity/scroll_to_next_root_comment';
import { loadUnderlineLinks } from '../../../content/functions/accessibility/underline_links';
import { loadHideRecommendedPosts } from '../../../content/functions/hide_elements/hide_recommended';
import { loadHidePostBackButton } from '../../../content/functions/hide_elements/hide_post_back_button';
import { loadBorderRadiusAmount } from '../../../content/functions/style/border_radius';
import { loadHideRecentPosts } from '../../../content/functions/hide_elements/hide_recent_posts';
import { loadSideMenuWidth } from '../../../content/functions/productivity/side_menu_width';
import { loadHideCompactViewBlankThumbnails } from '../../../content/functions/hide_elements/hide_compact_view_blank_thumbnails';
import { loadHideCommunityHighlights } from '../../../content/functions/hide_elements/hide_community_highlights';
import { loadHideSearchSidebarNsfwUsers } from '../../../content/functions/hide_elements/hide_search_page_sidebar_nsfw_users';
import { loadHidePostDivider } from '../../../content/functions/hide_elements/hide_post_divider';
import { loadHideBlurredMediaBackground } from '../../../content/functions/hide_elements/hide_blurred_media_background';
import { loadFullWidthBanner } from '../../../content/functions/style/full_width_banner';
import { loadCompactHeaderSideMenu } from '../../../content/functions/style/compact_header_side_menu';
import { loadResizeMainContainer } from '../../../content/functions/expand_feed_post/resize_main_container';

export function observersNewNew() {
	loadCustomBackground();
	loadCustomTheme();
	loadSideMenuWidth();
	loadHideSideMenu();
	loadHideHomeSidebar();
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
	//loadRemovePageSideMargin();
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
	loadHideRecentPosts();
	loadHideCompactViewBlankThumbnails();
	loadHideCommunityHighlights();
	loadHideSearchSidebarNsfwUsers();
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
