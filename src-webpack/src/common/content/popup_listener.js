/* ===== Content / Settings Listener ===== */

// Listens for commands from the settings popup to enable/disable/change tweaks.

import { addDropShadow } from './tweaks/style/drop_shadow';
import { alwaysShowPostOptions, hidePostBrandAwarenessOption, hidePostDeleteOption, hidePostEditOption, hidePostHideOption, hidePostNotificationOption, hidePostNsfwOption, hidePostReportOption, hidePostSaveOption, hidePostSpoilerOption } from './tweaks/productivity/always_show_post_options';
import { autoCollapseAutoModeratorComment } from './tweaks/productivity/auto_collapse_automod_comment';
import { autoExpandComments } from './tweaks/productivity/auto_expand_comments';
import { autoExpandValue } from './tweaks/resize_elements/auto_expand_value';
import { autoLoadMoreComments } from './tweaks/productivity/auto_load_more_comments';
import { bgBlur } from './tweaks/background/custom_background';
import { bionicReaderBgColour, bionicReaderBgColourCSS, bionicReaderFontColour, bionicReaderFontColourCSS, bionicReaderPosts } from './tweaks/accessibility/bionic_reader';
import { bionicReaderComments } from './tweaks/accessibility/bionic_reader';
import { breakReminder } from './tweaks/productivity/break_reminder';
import { darkMode, darkModeAutoListener } from './tweaks/dark_mode/dark_mode';
import { expandLayout, expandPostOverlayWidth, expandPostWidth, expandSubWidth, expandLayoutWidth, expandUserProfileWidth, expandTopicFeedWidth, expandCustomFeedWidth } from './tweaks/resize_elements/expand_content';
import { hideGap } from './tweaks/style/hide_gap';
import { hideGetNewReddit } from './tweaks/hide_elements/hide_get_new_reddit';
import { hideHeaderBar } from './tweaks/hide_elements/hide_header_bar';
import { hideHeaderSubBar } from './tweaks/hide_elements/hide_header_sub_bar';
import { hideHomeSidebar, hideSubSidebar, hidePostSidebar, hideUserSidebar, hideRelatedPostsSection, hideSearchSidebar, hideCustomFeedSidebar } from './tweaks/hide_elements/hide_sidebar';
import { hideJoinButtonOnPosts } from './tweaks/hide_elements/hide_post_join_button';
import { hideNSFW } from './tweaks/hide_elements/hide_nsfw';
import { hideModerationButton, hideChatButton, hideAdvertiseButton, hideNotificationButton, hideCreatePostButton } from './tweaks/hide_elements/hide_header_buttons';
import { hidePostHiddenMessage } from './tweaks/hide_elements/hide_post_hidden_message';
import { hidePromoted } from './tweaks/hide_elements/hide_promoted';
import { hideRedditPremium } from './tweaks/hide_elements/hide_reddit_premium';
import { hideSideMenuOld, hideSideMenu } from './tweaks/hide_elements/hide_side_menu';
import { hideSideMenuCommunitiesSection, hideSideMenuCustomFeedsSection, hideSideMenuModerationSection, hideSideMenuRecentSection, hideSideMenuResourcesSection, hideSideMenuTopSection, hideSideMenuTopicsSection } from './tweaks/hide_elements/hide_side_menu_sections';
import { hideUsername, hideKarma } from './tweaks/hide_elements/hide_username_and_karma';
import { hideUserProfilePics } from './tweaks/hide_elements/hide_user_profile_pics';
import { imageScroll } from './tweaks/media/scroll_images';
import { setMaxImagePostHeight, setMaxImageWidth, setMaxVideoWidth, setMaxVideoPostHeight } from './tweaks/media/limit_media_size';
import { largerClassicPost } from './tweaks/style/larger_classic_post';
import { layoutCentre, layoutOffset, layoutSubOffset, layoutPostOffset, layoutUserProfileOffset, layoutSearchPageOffset } from './tweaks/resize_elements/layout_centre_and_offset';
//import { limitInfinityScroll } from './tweaks/productivity/limit_infinity_scroll';
import { moderniseOldReddit } from './tweaks/style/modernise_old_reddit';
import { nonStickyHeaderBar } from './tweaks/productivity/non_sticky_header_bar';
import { openPostInNewTab } from './tweaks/productivity/open_post_links_in_new_tab';
import { openSubInNewTab } from './tweaks/productivity/open_sub_links_in_new_tab';
import { overrideDropShadow, overrideDropShadowCSS } from './tweaks/style/override_drop_shadow';
import { postTitleFontSize, postCommentsFontSize, postContentFontSize, feedPostTitleFontSize, feedPostContentFontSize, createPostTitleFontSize, createPostBodyFontSize } from './tweaks/font/resize_font';
import { feedPostContentFontWeight, feedPostTitleFontWeight, postCommentsFontWeight, postContentFontWeight, postTitleFontWeight } from './tweaks/font/font_weight';
import { scrollToNextRootComment, scrollToNextRootCommentPosition } from './tweaks/productivity/scroll_to_next_root_comment';
import { showPostAuthor } from './tweaks/productivity/show_post_author';
import { showPostFlair } from './tweaks/productivity/show_post_flair';
import { showPostNumbers } from './tweaks/productivity/show_post_numbers';
import { showToTopButton } from './tweaks/productivity/scroll_to_top';
import { stickySort } from './tweaks/productivity/sticky_sort';
import {
	themeBlur,
	themeCreatePostBackgroundColour,
	themeCreatePostBackgroundColourCSS,
	themeCreatePostBorderColour,
	themeCreatePostBorderColourCSS,
	themeHeaderBackgroundColour,
	themeHeaderBackgroundColourCSS,
	themeHeaderTextColour,
	themeHeaderTextColourCSS,
	themePostBackgroundColour,
	themePostBackgroundColourCSS,
	themePostBorderColour,
	themePostBorderColourCSS,
	themePostCommentsTextColour1,
	themePostCommentsTextColour1CSS,
	themePostCommentsTextColour2,
	themePostCommentsTextColour2CSS,
	themePostContentAndCommentsLinkColour,
	themePostContentAndCommentsLinkColourCSS,
	themePostTextColour1,
	themePostTextColour1CSS,
	themePostTableBorderColour,
	themeCodeBlockColourCSS,
	themePostTextColour2,
	themePostTextColour2CSS,
	themePostVisitedTextColour,
	themePostVisitedTextColourCSS,
	themeSearchbarBgColour,
	themeSearchbarBgColourCSS,
	themeSearchbarDropdownBgColour,
	themeSearchbarDropdownBgColourCSS,
	themeSidebarBgColour,
	themeSidebarBgColourCSS,
	themeSidebarBorderColour,
	themeSidebarBorderColourCSS,
	themeSidebarTextColour,
	themeSidebarTextColourCSS,
	themeSidemenuBgColour,
	themeSidemenuBgColourCSS,
	themeSidemenuButtonHoverColour,
	themeSidemenuButtonHoverColourCSS,
	themeSidemenuTextColour,
	themeSidemenuTextColourCSS,
	themeSortBackgroundColour,
	themeSortBackgroundColourCSS,
	themeSortBorderColour,
	themeSortBorderColourCSS,
	themeSortTextColour,
	themeSortTextColourCSS,
	themeSortTextColour2,
	themeSortTextColour2CSS,
	themePostUpvoteColourCSS,
	themePostUpvoteColour,
	themePostCommentActionRowColour,
	themePostCommentActionRowColourCSS,
} from './tweaks/style/override_theme_colours';
import { useCustomBackground, setCustomBackground } from './tweaks/background/custom_background';
import { underlineLinks } from './tweaks/accessibility/underline_links';
import { betterCommentBox } from './tweaks/productivity/better_comment_box';
import { hideRecommended } from './tweaks/hide_elements/hide_recommended';
import { scalePostToFitImage } from './tweaks/media/scale_post_to_fit_image';
import { hidePostBackButton } from './tweaks/hide_elements/hide_post_back_button';
import { borderRadiusAmount } from './tweaks/style/border_radius';
import { hidePostKarma, hideCommentKarma } from './tweaks/hide_elements/hide_post_comment_karma';
import { hideRecentPosts } from './tweaks/hide_elements/hide_recent_posts';
import { sideMenuWidth } from './tweaks/resize_elements/side_menu_width';
import { sideMenuIconsOnly } from './tweaks/hide_elements/side_menu_icons_only';
import { hideSideMenuFavouriteButton } from './tweaks/hide_elements/hide_side_menu_favourite_button';
import { sideMenuToggleButton } from './tweaks/hide_elements/side_menu_toggle_button';
import { hideCompactViewBlankThumbnails } from './tweaks/hide_elements/hide_compact_view_blank_thumbnails';
import { hideNsfwInSearchResults, hideTrendingTodayInSearchResults } from './tweaks/hide_elements/hide_search_results_sections';
import { hideCommunityHighlights } from './tweaks/hide_elements/hide_community_highlights';
import { hideSearchSidebarNsfwUsers } from './tweaks/hide_elements/hide_search_page_sidebar_nsfw_users';
import { rememberSideMenuSectionHiddenState } from './tweaks/hide_elements/remember_side_menu_section_hidden_state';
import { hideHomeFeed } from './tweaks/hide_elements/hide_home_feed';
import { addProfilePicturesToComments } from './tweaks/productivity/add_profile_picture_to_comments';
import { hidePostDivider, postSeparatorHeight } from './tweaks/hide_elements/hide_post_divider';
import { hideBlurredMediaBackground } from './tweaks/media/hide_blurred_media_background';
import { fullWidthBanner, compactHeaderSideMenu, attachSideMenuHeader, optOutAttachSideMenu, subredditDisplayNameBanner } from './tweaks/style/old_new_ui';
import { textPostPreviewFade, setTextPostPreviewFadeHeight } from './tweaks/media/text_preview_fade';
import { resizeMainContainer, resizeMainContainerWidth } from './tweaks/resize_elements/resize_main_container';
import { hideVoteButtons } from './tweaks/hide_elements/hide_vote_buttons';
import { sidebarToggleButton } from './tweaks/hide_elements/sidebar_toggle_button';
import { hideCompactViewThumbnails } from './tweaks/hide_elements/hide_compact_view_thumbnails';
import { setTextPostPreviewMaxHeight } from './tweaks/media/resize_text_post';
import { customFonts } from './tweaks/font/custom_fonts';
import { scalePostToFitVideo } from './tweaks/media/scale_post_to_fit_video';
import { classicOldUI } from './tweaks/style/classic_old_ui';
import { multicolouredThreadLines } from './tweaks/style/multicoloured_threadlines';
import { replacePostImagesWithLinks } from './tweaks/media/replace_images_with_links';
import { replacePostVideosWithLinks } from './tweaks/media/replace_videos_with_links';
import { compactPostLinkPreview } from './tweaks/media/compact_post_link_preview';
import { usernameHoverPopupDelay } from './tweaks/productivity/username_hover_popup_delay';
import { showUpvoteRatio } from './tweaks/productivity/show_upvote_ratio';
import { customHeaderLogo, setCustomHeaderLogoUrl } from './tweaks/style/custom_header_logo';
import { hideBlockedKeywordPosts } from './tweaks/block/block_posts_by_keyword';
import { hideVideoRecommendations } from './tweaks/media/hide_video_recommendations';
import { leftSideVoteButtons } from './tweaks/style/left_side_vote_buttons';
import { hideCommunityStatus } from './tweaks/hide_elements/hide_community_status';
import { rightSidePostThumbnails } from './tweaks/style/right_side_post_thumbnails';
import { viewCrossposts } from './tweaks/productivity/view_crossposts';
import { markReadOnOpenExpandos } from './tweaks/productivity/mark_read_on_open_expandos';
import { addDownloadVideoButton } from './tweaks/media/add_download_video_button';
//import { dragImageToResize, dragImageToResizeInitialSize } from './tweaks/productivity/scale_image_on_drag';

/* = Listen For Settings Change = */
BROWSER_API.runtime.onMessage.addListener((msg, sender, response) => {
	const key = Object.keys(msg)[0];
	const value = Object.values(msg)[0];
	//console.log(key, value);

	// Find the function in the registry matching the same name as the key.
	if (typeof functionRegistry[key] === 'function') {
		functionRegistry[key](value);
	} else {
		console.error(`Function ${key} not found`);
	}

	return true;
});

/* = Functions Registry = */
const functionRegistry = {
	darkMode,
	darkModeAutoListener,
	useCustomBackground,
	setCustomBackground,
	bgBlur,
	expandLayout,
	expandLayoutWidth,
	expandPostOverlayWidth,
	expandPostWidth,
	expandSubWidth,
	expandUserProfileWidth,
	expandTopicFeedWidth,
	expandCustomFeedWidth,
	layoutOffset,
	layoutSubOffset,
	layoutPostOffset,
	layoutUserProfileOffset,
	layoutSearchPageOffset,
	layoutCentre,
	shadows,
	imageScroll,
	setMaxImageWidth,
	setMaxImagePostHeight,
	setMaxVideoWidth,
	setMaxVideoPostHeight,
	hideRedditPremium,
	hideAdvertiseButton,
	hideBlockedKeywordPosts,
	hideChatButton,
	hideModerationButton,
	hideNotificationButton,
	hideCreatePostButton,
	hideHomeSidebar,
	hideSubSidebar,
	hideGap,
	stickySort,
	hideUsername,
	hideKarma,
	hideGetNewReddit,
	openSubInNewTab,
	openPostInNewTab,
	hidePromoted,
	hideRecommended,
	showToTopButton,
	moderniseOldReddit,
	hideHeaderSubBar,
	hideSideMenuOld,
	hideSideMenu,
	autoExpandValue,
	hidePostSidebar,
	hideUserSidebar,
	hideCustomFeedSidebar,
	hideRelatedPostsSection,
	//limitInfinityScroll,
	hideNSFW,
	scrollToNextRootComment,
	showPostNumbers,
	overrideDropShadow,
	overrideDropShadowCSS,
	themeHeaderBackgroundColour,
	themeHeaderBackgroundColourCSS,
	themeHeaderTextColour,
	themeHeaderTextColourCSS,
	themeSortBackgroundColour,
	themeSortBackgroundColourCSS,
	themeSortTextColour,
	themeSortTextColourCSS,
	themeSortTextColour2,
	themeSortTextColour2CSS,
	themeSortBorderColour,
	themeSortBorderColourCSS,
	themePostBackgroundColour,
	themePostBackgroundColourCSS,
	themePostVisitedTextColour,
	themePostVisitedTextColourCSS,
	themePostTextColour1,
	themePostTextColour1CSS,
	themePostTableBorderColour,
	themeCodeBlockColourCSS,
	themePostCommentsTextColour1,
	themePostCommentsTextColour1CSS,
	themePostCommentsTextColour2,
	themePostCommentsTextColour2CSS,
	themePostTextColour2,
	themePostTextColour2CSS,
	themePostBorderColour,
	themePostBorderColourCSS,
	themeCreatePostBackgroundColour,
	themeCreatePostBackgroundColourCSS,
	themeCreatePostBorderColour,
	themeCreatePostBorderColourCSS,
	themeSidebarTextColour,
	themeSidebarTextColourCSS,
	themeSidebarBgColour,
	themeSidebarBgColourCSS,
	themeSidebarBorderColour,
	themeSidebarBorderColourCSS,
	themeSidemenuTextColour,
	themeSidemenuTextColourCSS,
	themeSidemenuBgColour,
	themeSidemenuBgColourCSS,
	themeSidemenuButtonHoverColour,
	themeSidemenuButtonHoverColourCSS,
	themePostContentAndCommentsLinkColour,
	themePostContentAndCommentsLinkColourCSS,
	themeSearchbarBgColour,
	themeSearchbarBgColourCSS,
	themeSearchbarDropdownBgColour,
	themeSearchbarDropdownBgColourCSS,
	themePostUpvoteColour,
	themePostUpvoteColourCSS,
	themeBlur,
	bionicReaderPosts,
	bionicReaderComments,
	bionicReaderFontColour,
	bionicReaderFontColourCSS,
	bionicReaderBgColour,
	bionicReaderBgColourCSS,
	alwaysShowPostOptions,
	hideHeaderBar,
	nonStickyHeaderBar,
	largerClassicPost,
	scrollToNextRootCommentPosition,
	breakReminder,
	showPostAuthor,
	showPostFlair,
	hideSideMenuTopSection,
	hideSideMenuModerationSection,
	hideSideMenuRecentSection,
	hideSideMenuCustomFeedsSection,
	hideSideMenuCommunitiesSection,
	hideSideMenuResourcesSection,
	hideSideMenuTopicsSection,
	postTitleFontSize,
	postContentFontSize,
	postCommentsFontSize,
	hideUserProfilePics,
	autoExpandComments,
	hidePostHiddenMessage,
	scalePostToFitImage,
	scalePostToFitVideo,
	autoCollapseAutoModeratorComment,
	hideJoinButtonOnPosts,
	autoLoadMoreComments,
	underlineLinks,
	betterCommentBox,
	hideSearchSidebar,
	hidePostBackButton,
	borderRadiusAmount,
	hidePostKarma,
	hideCommentKarma,
	hideVoteButtons,
	hideRecentPosts,
	sideMenuWidth,
	sideMenuIconsOnly,
	hideSideMenuFavouriteButton,
	sideMenuToggleButton,
	hideCompactViewBlankThumbnails,
	hideCompactViewThumbnails,
	hideNsfwInSearchResults,
	hideTrendingTodayInSearchResults,
	hideCommunityHighlights,
	hideSearchSidebarNsfwUsers,
	rememberSideMenuSectionHiddenState,
	hideHomeFeed,
	postTitleFontWeight,
	postContentFontWeight,
	postCommentsFontWeight,
	feedPostTitleFontSize,
	feedPostContentFontSize,
	feedPostTitleFontWeight,
	feedPostContentFontWeight,
	themePostCommentActionRowColour,
	themePostCommentActionRowColourCSS,
	createPostTitleFontSize,
	createPostBodyFontSize,
	addProfilePicturesToComments,
	hidePostDivider,
	postSeparatorHeight,
	hideBlurredMediaBackground,
	fullWidthBanner,
	compactHeaderSideMenu,
	resizeMainContainer,
	resizeMainContainerWidth,
	textPostPreviewFade,
	textPostPreviewFadeHeight,
	textPostPreviewMaxHeight,
	customFonts,
	sidebarToggleButton,
	multicolouredThreadLines,
	classicOldUI,
	replacePostImagesWithLinks,
	replacePostVideosWithLinks,
	compactPostLinkPreview,
	forceCustomBgOldUI,
	usernameHoverPopupDelay,
	showUpvoteRatio,
	customHeaderLogo,
	setCustomHeaderLogoUrl,
	attachSideMenuHeader,
	optOutAttachSideMenu,
	hideVideoRecommendations,
	leftSideVoteButtons,
	hideCommunityStatus,
	subredditDisplayNameBanner,
	hidePostNotificationOption,
	hidePostSaveOption,
	hidePostHideOption,
	hidePostReportOption,
	hidePostEditOption,
	hidePostDeleteOption,
	hidePostSpoilerOption,
	hidePostNsfwOption,
	hidePostBrandAwarenessOption,
	rightSidePostThumbnails,
	viewCrossposts,
	markReadOnOpenExpandos,
	addDownloadVideoButton,
	//dragImageToResize,
	//dragImageToResizeInitialSize,
};

function forceCustomBgOldUI(value) {
	useCustomBackground(value);
}

function shadows(value) {
	addDropShadow(value);
}

function textPostPreviewFadeHeight(value) {
	setTextPostPreviewFadeHeight(value);
}

function textPostPreviewMaxHeight(value) {
	setTextPostPreviewMaxHeight(value);
}
