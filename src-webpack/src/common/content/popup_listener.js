/* ===== Content / Settings Listener ===== */

// Listens for commands from the settings popup to enable/disable/change tweaks.

import { addDropShadow } from './tweaks/style/drop_shadow';
import { alwaysShowPostOptions, hidePostBrandAwarenessOption, hidePostDeleteOption, hidePostEditOption, hidePostHideOption, hidePostNotificationOption, hidePostNsfwOption, hidePostReportOption, hidePostSaveOption, hidePostSpoilerOption, removeCommentButtonIcons } from './tweaks/productivity/always_show_post_options';
import { autoCollapseAutoModeratorComment } from './tweaks/productivity/auto_collapse_automod_comment';
import { autoExpandValue } from './tweaks/resize_elements/auto_expand_value';
import { autoLoadMoreComments, autoLoadMoreCommentsDownvotedOnly } from './tweaks/productivity/auto_load_more_comments';
import { bgBlur } from './tweaks/background/custom_background';
import { bionicReaderBgColour, bionicReaderBgColourCSS, bionicReaderFontColour, bionicReaderFontColourCSS, bionicReaderPosts } from './tweaks/accessibility/bionic_reader';
import { bionicReaderComments } from './tweaks/accessibility/bionic_reader';
//import { breakReminder } from './tweaks/productivity/break_reminder';
//import { darkMode, darkModeAutoListener } from './tweaks/dark_mode/dark_mode';
import { expandLayout, snapSidebar, expandPostWidth, expandSubWidth, expandLayoutWidth, expandUserProfileWidth, expandTopicFeedWidth, expandCustomFeedWidth, resizeMainContainerWidth } from './tweaks/resize_elements/expand_content';
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
import { hideSideMenuCommunitiesSection, hideSideMenuCustomFeedsSection, hideSideMenuGamesSection, hideSideMenuModerationSection, hideSideMenuRecentSection, hideSideMenuResourcesSection, hideSideMenuTopSection, hideSideMenuTopicsSection } from './tweaks/hide_elements/hide_side_menu_sections';
import { hideUsername, hideKarma } from './tweaks/hide_elements/hide_username_and_karma';
import { hideUserProfilePics } from './tweaks/hide_elements/hide_user_profile_pics';
import { imageScroll } from './tweaks/media/scroll_images';
import { setMaxImagePostHeight, setMaxImageWidth, setMaxVideoWidth, setMaxVideoPostHeight } from './tweaks/media/limit_media_size';
import { largerClassicPost } from './tweaks/style/larger_classic_post';
import { layoutOffset, layoutSubOffset, layoutPostOffset, layoutUserProfileOffset, layoutSearchPageOffset } from './tweaks/resize_elements/layout_offset';
import { layoutCentre } from './tweaks/resize_elements/layout_centre';
//import { limitInfinityScroll } from './tweaks/productivity/limit_infinity_scroll';
import { moderniseOldReddit } from './tweaks/style/modernise_old_reddit';
import { nonStickyHeaderBar } from './tweaks/productivity/non_sticky_header_bar';
import { openPostInNewTab } from './tweaks/productivity/open_post_links_in_new_tab';
import { openSubInNewTab } from './tweaks/productivity/open_sub_links_in_new_tab';
import { overrideDropShadow, overrideDropShadowCSS } from './tweaks/style/drop_shadow';
import { postTitleFontSize, postCommentsFontSize, postContentFontSize, feedPostTitleFontSize, feedPostContentFontSize, createPostTitleFontSize, createPostBodyFontSize } from './tweaks/font/resize_font';
import { feedPostContentFontWeight, feedPostTitleFontWeight, postCommentsFontWeight, postContentFontWeight, postTitleFontWeight } from './tweaks/font/font_weight';
import { scrollToNextRootComment, scrollToNextRootCommentPosition, scrollToNextRootCommentRemoveStyle } from './tweaks/productivity/scroll_to_next_root_comment';
import { showPostAuthor } from './tweaks/productivity/show_post_author';
import { showPostFlair } from './tweaks/productivity/show_post_flair';
import { showPostNumbers } from './tweaks/productivity/show_post_numbers';
import { showToTopButton } from './tweaks/productivity/scroll_to_top';
import { stickySort } from './tweaks/productivity/sticky_sort';
import {
	themeBlur,
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
	themePostFollowedTextColour,
	themePostFollowedTextColourCSS,
	themePostVisitedTextColour,
	themePostVisitedTextColourCSS,
	themeSearchbarBgColour,
	themeSearchbarBgColourCSS,
	themeSearchbarDropdownBgColour,
	themeSearchbarDropdownBgColourCSS,
	themeSidebarBgColour,
	themeSidebarBgColourCSS,
	themeSidebarTextColour,
	themeSidebarTextColourCSS,
	themeSidemenuBgColour,
	themeSidemenuBgColourCSS,
	themeSidemenuButtonHoverColour,
	themeSidemenuButtonHoverColourCSS,
	themeSidemenuTextColour,
	themeSidemenuTextColourCSS,
	themePostUpvoteColourCSS,
	themePostUpvoteColour,
	themePostCommentActionRowColour,
	themePostCommentActionRowColourCSS,
	themeOpCommentHighlightColour,
	themeOpCommentHighlightColourCSS,
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
import { hideBlockedUserPosts } from './tweaks/block/block_posts_by_user';
import { hideBlockedLinkPosts } from './tweaks/block/block_posts_by_url';
import { hideVideoRecommendations } from './tweaks/media/hide_video_recommendations';
import { leftSideVoteButtons } from './tweaks/style/left_side_vote_buttons';
import { hideCommunityStatus } from './tweaks/hide_elements/hide_community_status';
import { rightSidePostThumbnails } from './tweaks/style/right_side_post_thumbnails';
import { viewCrossposts } from './tweaks/productivity/view_crossposts';
import { markReadOnOpenExpandos } from './tweaks/productivity/mark_read_on_open_expandos';
import { hideAwards } from './tweaks/hide_elements/hide_awards';
//import { dragImageToResize, dragImageToResizeInitialSize } from './functions/productivity/scale_image_on_drag';
import { addDownloadVideoButton } from './tweaks/media/add_download_video_button';
import { fullWidthExpandos } from './tweaks/media/full_width_expandos';
import { hideSearchHero } from './tweaks/hide_elements/hide_search_hero';
import { showCommentAbsoluteTimestamp, showPostAbsoluteTimestamp, updateCommentAbsoluteTimestamps, updatePostAbsoluteTimestamps } from './tweaks/productivity/show_absolute_timestamps';
import { markPostAsReadButton } from './tweaks/productivity/mark_read_on_open_expandos';
import { showMemberCount } from './tweaks/productivity/show_member_count';
import { hideUsernameInSubSidebar } from './tweaks/hide_elements/hide_username_in_sub_sidebar';
import { solidColourBackground, solidColourBackgroundCSS } from './tweaks/background/bg_solid_colour';
import { hideGetAppButton } from './tweaks/hide_elements/hide_get_app_button';
import { hideAiInSearch } from './tweaks/hide_elements/hide_ai_in_search';
import { showToTopButtonFloat } from './tweaks/productivity/scroll_to_top_float';
import { scrollToPost } from './tweaks/productivity/scroll_to_post';
import { hideLogoInSearch } from './tweaks/hide_elements/hide_logo_in_search';
import { replaceSearchPlaceholderText } from './tweaks/hide_elements/replace_search_placeholder';

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
	addDownloadVideoButton,
	addDropShadow,
	addProfilePicturesToComments,
	alwaysShowPostOptions,
	attachSideMenuHeader,
	autoCollapseAutoModeratorComment,
	autoExpandValue,
	autoLoadMoreComments,
	autoLoadMoreCommentsDownvotedOnly,
	betterCommentBox,
	bgBlur,
	bionicReaderBgColour,
	bionicReaderBgColourCSS,
	bionicReaderComments,
	bionicReaderFontColour,
	bionicReaderFontColourCSS,
	bionicReaderPosts,
	borderRadiusAmount,
	classicOldUI,
	compactHeaderSideMenu,
	compactPostLinkPreview,
	createPostBodyFontSize,
	createPostTitleFontSize,
	customFonts,
	customHeaderLogo,
	expandCustomFeedWidth,
	expandLayout,
	expandLayoutWidth,
	expandPostWidth,
	expandSubWidth,
	expandTopicFeedWidth,
	expandUserProfileWidth,
	feedPostContentFontSize,
	feedPostContentFontWeight,
	feedPostTitleFontSize,
	feedPostTitleFontWeight,
	forceCustomBgOldUI,
	fullWidthBanner,
	fullWidthExpandos,
	hideAdvertiseButton,
	hideAwards,
	hideBlockedKeywordPosts,
	hideBlockedUserPosts,
	hideBlockedLinkPosts,
	hideBlurredMediaBackground,
	hideChatButton,
	hideCommentKarma,
	hideCommunityHighlights,
	hideCommunityStatus,
	hideCompactViewBlankThumbnails,
	hideCompactViewThumbnails,
	hideCreatePostButton,
	hideCustomFeedSidebar,
	hideGap,
	hideGetNewReddit,
	hideHeaderBar,
	hideGetAppButton,
	hideAiInSearch,
	hideLogoInSearch,
	replaceSearchPlaceholderText,
	hideHeaderSubBar,
	hideHomeFeed,
	hideHomeSidebar,
	hideJoinButtonOnPosts,
	hideKarma,
	hideModerationButton,
	hideNotificationButton,
	hideNSFW,
	hideNsfwInSearchResults,
	hidePostBackButton,
	hidePostBrandAwarenessOption,
	hidePostDeleteOption,
	hidePostDivider,
	hidePostEditOption,
	hidePostHiddenMessage,
	hidePostHideOption,
	hidePostKarma,
	hidePostNotificationOption,
	hidePostNsfwOption,
	hidePostReportOption,
	hidePostSaveOption,
	hidePostSidebar,
	hidePostSpoilerOption,
	hidePromoted,
	hideRecentPosts,
	hideRecommended,
	hideRedditPremium,
	hideRelatedPostsSection,
	hideSearchHero,
	hideSearchSidebar,
	hideSearchSidebarNsfwUsers,
	hideSideMenu,
	hideSideMenuCommunitiesSection,
	hideSideMenuCustomFeedsSection,
	hideSideMenuFavouriteButton,
	hideSideMenuGamesSection,
	hideSideMenuModerationSection,
	hideSideMenuOld,
	hideSideMenuRecentSection,
	hideSideMenuResourcesSection,
	hideSideMenuTopicsSection,
	hideSideMenuTopSection,
	hideSubSidebar,
	hideTrendingTodayInSearchResults,
	hideUsername,
	hideUsernameInSubSidebar,
	hideUserProfilePics,
	hideUserSidebar,
	hideVideoRecommendations,
	hideVoteButtons,
	imageScroll,
	largerClassicPost,
	layoutCentre,
	layoutOffset,
	layoutPostOffset,
	layoutSearchPageOffset,
	layoutSubOffset,
	layoutUserProfileOffset,
	leftSideVoteButtons,
	markReadOnOpenExpandos,
	moderniseOldReddit,
	multicolouredThreadLines,
	nonStickyHeaderBar,
	openPostInNewTab,
	openSubInNewTab,
	optOutAttachSideMenu,
	overrideDropShadow,
	overrideDropShadowCSS,
	postCommentsFontSize,
	postCommentsFontWeight,
	postContentFontSize,
	postContentFontWeight,
	postSeparatorHeight,
	postTitleFontSize,
	postTitleFontWeight,
	rememberSideMenuSectionHiddenState,
	removeCommentButtonIcons,
	replacePostImagesWithLinks,
	replacePostVideosWithLinks,
	resizeMainContainerWidth,
	rightSidePostThumbnails,
	scalePostToFitImage,
	scalePostToFitVideo,
	scrollToNextRootComment,
	scrollToNextRootCommentPosition,
	scrollToNextRootCommentRemoveStyle,
	scrollToPost,
	setCustomBackground,
	setCustomHeaderLogoUrl,
	setMaxImagePostHeight,
	setMaxImageWidth,
	setMaxVideoPostHeight,
	setMaxVideoWidth,
	showMemberCount,
	showPostAuthor,
	showPostFlair,
	showPostNumbers,
	showToTopButton,
	showToTopButtonFloat,
	showUpvoteRatio,
	sidebarToggleButton,
	sideMenuIconsOnly,
	sideMenuToggleButton,
	sideMenuWidth,
	snapSidebar,
	stickySort,
	subredditDisplayNameBanner,
	textPostPreviewFade,
	textPostPreviewFadeHeight,
	textPostPreviewMaxHeight,
	themeBlur,
	themeCodeBlockColourCSS,
	themeHeaderBackgroundColour,
	themeHeaderBackgroundColourCSS,
	themeHeaderTextColour,
	themeHeaderTextColourCSS,
	themePostBackgroundColour,
	themePostBackgroundColourCSS,
	themePostBorderColour,
	themePostBorderColourCSS,
	themePostCommentActionRowColour,
	themePostCommentActionRowColourCSS,
	themePostCommentsTextColour1,
	themePostCommentsTextColour1CSS,
	themePostCommentsTextColour2,
	themePostCommentsTextColour2CSS,
	themePostContentAndCommentsLinkColour,
	themePostContentAndCommentsLinkColourCSS,
	themePostTableBorderColour,
	themePostTextColour1,
	themePostTextColour1CSS,
	themePostTextColour2,
	themePostTextColour2CSS,
	themePostUpvoteColour,
	themePostUpvoteColourCSS,
	themePostFollowedTextColour,
	themePostFollowedTextColourCSS,
	themePostVisitedTextColour,
	themePostVisitedTextColourCSS,
	themeSearchbarBgColour,
	themeSearchbarBgColourCSS,
	/*themeSearchbarBorderColour,
	themeSearchbarBorderColourCSS,*/
	themeSearchbarDropdownBgColour,
	themeSearchbarDropdownBgColourCSS,
	themeSidebarBgColour,
	themeSidebarBgColourCSS,
	themeSidebarTextColour,
	themeSidebarTextColourCSS,
	themeSidemenuBgColour,
	themeSidemenuBgColourCSS,
	themeSidemenuButtonHoverColour,
	themeSidemenuButtonHoverColourCSS,
	themeSidemenuTextColour,
	themeSidemenuTextColourCSS,
	underlineLinks,
	useCustomBackground,
	usernameHoverPopupDelay,
	viewCrossposts,
	showCommentAbsoluteTimestamp,
	showPostAbsoluteTimestamp,
	markPostAsReadButton,
	updateCommentAbsoluteTimestamps,
	updatePostAbsoluteTimestamps,
	solidColourBackground,
	solidColourBackgroundCSS,
	themeOpCommentHighlightColour,
	themeOpCommentHighlightColourCSS,
	//breakReminder,
	//darkMode,
	//darkModeAutoListener,
	//dragImageToResize,
	//dragImageToResizeInitialSize,
	//limitInfinityScroll,
};

function forceCustomBgOldUI(value) {
	useCustomBackground(value);
}

function textPostPreviewFadeHeight(value) {
	setTextPostPreviewFadeHeight(value);
}

function textPostPreviewMaxHeight(value) {
	setTextPostPreviewMaxHeight(value);
}
