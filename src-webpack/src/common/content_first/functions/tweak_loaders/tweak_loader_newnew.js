// ────────────────────────────────────────────────────────────────────────────
// Content First - Tweak Loader
//
// Version: Latest Reddit (V3)
//
// Start observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.
// Use this loader to apply tweaks before the page has finished loading (CSS tweaks).
//
// ────────────────────────────────────────────────────────────────────────────

//import { waitForAddedNode } from './main_observer';
//import { loadDragImageToResize } from '../../../content/functions/productivity/scale_image_on_drag';
import { limitImageSize } from '../../../content/tweaks/media/limit_media_size';
import { loadAutoExpandValue } from '../../../content/tweaks/resize_elements/auto_expand_value';
import { loadBionicReaderColours } from '../../../content/tweaks/accessibility/bionic_reader';
import { loadBorderRadiusAmount } from '../../../content/tweaks/style/border_radius';
import { loadCustomBackground } from '../../../content/tweaks/background/custom_background';
import { loadCustomHeaderLogo } from '../../../content/tweaks/style/custom_header_logo';
import { loadCustomTheme } from '../../../content/tweaks/style/override_theme_colours';
import { loadDropShadow } from '../../../content/tweaks/style/drop_shadow';
import { loadExpandContent } from '../../../content/tweaks/resize_elements/expand_content';
import { loadForceDarkMode } from '../../../content/tweaks/style/force_dark_mode';
import { loadFullWidthBanner, loadCompactHeaderSideMenu } from '../../../content/tweaks/style/old_new_ui';
import { loadHideAdvertiseButton, loadHideChatButton, loadHideCreatePostButton, loadHideNotificationButton } from '../../../content/tweaks/hide_elements/hide_header_buttons';
import { loadHideAnnouncementNotifications } from '../../../content/tweaks/hide_elements/hide_announcement_notifications';
import { loadHideBlurredMediaBackground } from '../../../content/tweaks/media/hide_blurred_media_background';
import { loadHideCommunityHighlights } from '../../../content/tweaks/hide_elements/hide_community_highlights';
import { loadHideCommunityStatus } from '../../../content/tweaks/hide_elements/hide_community_status';
import { loadHideCompactViewBlankThumbnails } from '../../../content/tweaks/hide_elements/hide_compact_view_blank_thumbnails';
import { loadHideCompactViewThumbnails } from '../../../content/tweaks/hide_elements/hide_compact_view_thumbnails';
import { loadHideGamificationNotifications } from '../../../content/tweaks/hide_elements/hide_gamification_notifications';
import { loadHideGap } from '../../../content/tweaks/style/hide_gap';
import { loadHideGetAppButton } from '../../../content/tweaks/hide_elements/hide_get_app_button';
import { loadHideHeaderBar } from '../../../content/tweaks/hide_elements/hide_header_bar';
import { loadHideHomeFeed } from '../../../content/tweaks/hide_elements/hide_home_feed';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHideRelatedPostsSection, loadHideSearchSidebar, loadHideSubSidebarException, loadHideUserSidebar, loadHideCustomFeedSidebar } from '../../../content/tweaks/hide_elements/hide_sidebar';
import { loadHideJoinButtonOnPosts } from '../../../content/tweaks/hide_elements/hide_post_join_button';
import { loadHideJoinConversation } from '../../../content/tweaks/hide_elements/hide_join_conversation';
import { loadHidePageFooter } from '../../../content/tweaks/hide_elements/hide_page_footer';
import { loadHidePostBackButton } from '../../../content/tweaks/hide_elements/hide_post_back_button';
import { loadHidePostComments } from '../../../content/tweaks/hide_elements/hide_post_comments';
import { loadHidePostDivider } from '../../../content/tweaks/hide_elements/hide_post_divider';
import { loadHidePostHiddenMessage } from '../../../content/tweaks/hide_elements/hide_post_hidden_message';
import { loadHidePromotedPosts } from '../../../content/tweaks/hide_elements/hide_promoted';
import { loadHideRecentPosts } from '../../../content/tweaks/hide_elements/hide_recent_posts';
import { loadHideRecommendedPosts } from '../../../content/tweaks/hide_elements/hide_recommended';
import { loadHideSearchSidebarNsfwUsers } from '../../../content/tweaks/hide_elements/hide_search_page_sidebar_nsfw_users';
import { loadHideSideMenu } from '../../../content/tweaks/hide_elements/hide_side_menu';
import { loadHideSideMenuSections } from '../../../content/tweaks/hide_elements/hide_side_menu_sections';
import { loadHideUserProfilePics } from '../../../content/tweaks/hide_elements/hide_user_profile_pics';
import { loadHideVideoRecommendations } from '../../../content/tweaks/media/hide_video_recommendations';
import { loadLayoutOffset } from '../../../content/tweaks/resize_elements/layout_offset';
import { loadNonStickyHeaderBar } from '../../../content/tweaks/productivity/non_sticky_header_bar';
import { loadPostFontWeight } from '../../../content/tweaks/font/font_weight';
import { loadResizeFont } from '../../../content/tweaks/font/resize_font';
import { loadResizeTextPostHeight } from '../../../content/tweaks/media/resize_text_post';
import { loadSideMenuWidth } from '../../../content/tweaks/resize_elements/side_menu_width';
import { loadSolidColourBackground } from '../../../content/tweaks/background/bg_solid_colour';
import { loadTextPostPreviewFade } from '../../../content/tweaks/media/text_preview_fade';
import { loadUnderlineLinks } from '../../../content/tweaks/accessibility/underline_links';

export function tweakLoaderNewNew() {
	loadForceDarkMode();
	loadSolidColourBackground();
	loadCustomBackground();
	loadCustomTheme();
	loadDropShadow();
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
	loadHideGetAppButton();
	loadHideNotificationButton();
	loadHideCreatePostButton();
	loadHideChatButton();
	loadHideAdvertiseButton();
	loadHideSideMenuSections();
	loadAutoExpandValue();
	loadExpandContent();
	loadLayoutOffset();
	loadHidePromotedPosts();
	loadHideGap();
	loadResizeFont();
	loadBionicReaderColours();
	loadHideUserProfilePics();
	loadNonStickyHeaderBar();
	loadHidePostHiddenMessage();
	loadHideJoinButtonOnPosts();
	loadUnderlineLinks();
	loadHideRecommendedPosts();
	//loadDragImageToResize();
	loadHidePostBackButton();
	loadBorderRadiusAmount();
	loadHideCompactViewBlankThumbnails();
	loadHideCompactViewThumbnails();
	loadHideCommunityHighlights();
	loadHideSearchSidebarNsfwUsers();
	loadHideHomeFeed();
	loadPostFontWeight();
	loadHidePostDivider();
	loadHideBlurredMediaBackground();
	loadFullWidthBanner();
	loadCompactHeaderSideMenu();
	loadTextPostPreviewFade();
	loadResizeTextPostHeight();
	limitImageSize();
	loadCustomHeaderLogo();
	loadHideVideoRecommendations();
	loadHideCommunityStatus();
	loadHidePageFooter();
	loadHidePostComments();
	loadHideAnnouncementNotifications();
	loadHideGamificationNotifications();
	loadHideJoinConversation();
}
