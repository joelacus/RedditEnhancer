/* ===== Content / Settings Listener ===== */

// Listens for commands from the settings popup to enable/disable/change tweaks.

import { addDropShadow } from './tweaks/style/drop_shadow';
import { alwaysShowPostOptions } from './tweaks/productivity/always_show_post_options';
import { alwaysShowRisingButton } from './tweaks/productivity/always_show_rising';
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
import { fitImage } from './tweaks/productivity/scale_tall_images_to_fit_post';
import { hideCreatePost } from './tweaks/hide_elements/hide_create_post';
import { hideGap } from './tweaks/style/hide_gap';
import { hideGetNewReddit } from './tweaks/hide_elements/hide_get_new_reddit';
import { hideHeaderBar } from './tweaks/hide_elements/hide_header_bar';
import { hideHeaderSubBar } from './tweaks/hide_elements/hide_header_sub_bar';
import { hideHomeSidebar, hideSubSidebar, hidePostSidebar, hidePostOverlaySidebar, hideUserSidebar, hideRelatedPostsSection, hideSearchSidebar, hideCustomFeedSidebar } from './tweaks/hide_elements/hide_sidebar';
import { hideJoinButtonOnPosts } from './tweaks/hide_elements/hide_post_join_button';
import { hideNSFW } from './tweaks/hide_elements/hide_nsfw';
import { hideOriginalScrollToTop } from './tweaks/hide_elements/hide_original_scroll_to_top';
import { hidePopularButton, hideModerationButton, hideChatButton, hideAdvertiseButton, hideNotificationButton, hideCreatePostButton } from './tweaks/hide_elements/hide_header_buttons';
import { hidePostHiddenMessage } from './tweaks/hide_elements/hide_post_hidden_message';
import { hidePromoted } from './tweaks/hide_elements/hide_promoted';
import { hideRedditPremium } from './tweaks/hide_elements/hide_reddit_premium';
import { hideSeeFullImage } from './tweaks/hide_elements/hide_see_full_image';
import { hideSidebarPolicy } from './tweaks/hide_elements/hide_sidebar_policy';
import { hideSideMenuOld, hideSideMenu } from './tweaks/hide_elements/hide_side_menu';
import { hideSideMenuCommunitiesSection, hideSideMenuCustomFeedsSection, hideSideMenuModerationSection, hideSideMenuRecentSection, hideSideMenuResourcesSection, hideSideMenuTopSection, hideSideMenuTopicsSection } from './tweaks/hide_elements/hide_side_menu_sections';
import { hideTurnOnNotificationsPopup } from './tweaks/hide_elements/hide_turn_on_notifications_popup';
import { hideUsername, hideKarma } from './tweaks/hide_elements/hide_username_and_karma';
import { hideUserProfilePics } from './tweaks/hide_elements/hide_user_profile_pics';
import { imageScroll, imageScrollMaxImageWidth } from './tweaks/productivity/scroll_tall_images';
import { largerClassicPost } from './tweaks/style/larger_classic_post';
import { layoutCentre, layoutOffset, layoutSubOffset, layoutPostOffset, layoutUserProfileOffset, layoutSearchPageOffset } from './tweaks/resize_elements/layout_centre_and_offset';
import { limitInfinityScroll } from './tweaks/productivity/limit_infinity_scroll';
import { moderniseOldReddit } from './tweaks/style/modernise_old_reddit';
import { newPlayer } from './tweaks/productivity/video_player';
import { nonStickyHeaderBar } from './tweaks/productivity/non_sticky_header_bar';
import { openPostInNewTab } from './tweaks/productivity/open_post_links_in_new_tab';
import { openSubInNewTab } from './tweaks/productivity/open_sub_links_in_new_tab';
import { overrideDropShadow, overrideDropShadowCSS } from './tweaks/style/override_drop_shadow';
import { postHeight, postHeightSize } from './tweaks/productivity/post_max_height';
import { postTitleFontSize, postCommentsFontSize, postContentFontSize, feedPostTitleFontSize, feedPostContentFontSize, createPostTitleFontSize, createPostBodyFontSize } from './tweaks/font/resize_font';
import { feedPostContentFontWeight, feedPostTitleFontWeight, postCommentsFontWeight, postContentFontWeight, postTitleFontWeight } from './tweaks/font/font_weight';
import { scrollToNextRootComment } from './tweaks/productivity/scroll_to_next_root_comment';
import { scrollToNextRootCommentPosition, scrollToNextRootCommentPositionV } from './tweaks/productivity/scroll_to_next_root_comment';
import { showAllButton } from './tweaks/productivity/show_r_all_button';
import { showControversialSortButton } from './tweaks/productivity/show_controversial_sort_button';
import { showPostAuthor } from './tweaks/productivity/show_post_author';
import { showPostFlair } from './tweaks/productivity/show_post_flair';
import { showPostNumbers } from './tweaks/productivity/show_post_numbers';
import { showToTopButton } from './tweaks/productivity/scroll_to_top';
import { sidemenuFeedTop } from './tweaks/productivity/sidemenu_feed_top';
import { stickySort } from './tweaks/productivity/sticky_sort';
import { textPostScroll } from './tweaks/productivity/text_post_scroll';
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
	themePostTextColour2,
	themePostTextColour2CSS,
	themePostVisitedTitleColour,
	themePostVisitedTitleColourCSS,
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
import { autoShowCommentFormattingOptions } from './tweaks/productivity/auto_show_comment_formatting_options';
import { hideRecommended } from './tweaks/hide_elements/hide_recommended';
//import { scalePostToFitImageMaxImageWidth, scalePostToFitImage } from './functions/productivity/scale_post_to_fit_image';
//import { dragImageToResize, dragImageToResizeInitialSize } from './functions/productivity/scale_image_on_drag';
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
import { hideBlurredMediaBackground } from './tweaks/hide_elements/hide_blurred_media_background';
import { fullWidthBanner, compactHeaderSideMenu, compactSubRuleList, textPostPreviewFade, setTextPostPreviewFadeHeight } from './tweaks/style/old_new_ui';
import { resizeMainContainer, resizeMainContainerWidth } from './tweaks/resize_elements/resize_main_container';
import { hideVoteButtons } from './tweaks/hide_elements/hide_vote_buttons';
import { sidebarToggleButton } from "./tweaks/hide_elements/sidebar_toggle_button";
import { hideCompactViewThumbnails } from './tweaks/hide_elements/hide_compact_view_thumbnails';
import { setTextPostPreviewMaxHeight } from './tweaks/resize_elements/resize_post';
import { customFonts } from './tweaks/font/custom_fonts';
//import { addDownloadVideoButton } from './functions/productivity/add_download_video_button';

/* = Listen For Settings Change = */
BROWSER_API.runtime.onMessage.addListener((msg, sender, response) => {
	const key = Object.keys(msg)[0];
	const value = Object.values(msg)[0];
	//console.log(key, value);
	if (key === 'darkMode') {
		darkMode(value);
	} else if (key === 'darkModeAutoListener') {
		darkModeAutoListener(value);
	} else if (key === 'useCustomBackground') {
		useCustomBackground(value);
	} else if (key === 'setCustomBackground') {
		setCustomBackground(value);
	} else if (key === 'bgBlur') {
		bgBlur(value);
	} else if (key === 'expandLayout') {
		expandLayout(value);
	} else if (key === 'expandLayoutWidth') {
		expandLayoutWidth(value);
	} else if (key === 'expandPostOverlayWidth') {
		expandPostOverlayWidth(value);
	} else if (key === 'expandPostWidth') {
		expandPostWidth(value);
	} else if (key === 'expandSubWidth') {
		expandSubWidth(value);
	} else if (key === 'expandUserProfileWidth') {
		expandUserProfileWidth(value);
	} else if (key === 'expandTopicFeedWidth') {
		expandTopicFeedWidth(value);
	} else if (key === 'expandCustomFeedWidth') {
		expandCustomFeedWidth(value);
	} else if (key === 'layoutOffset') {
		layoutOffset(value);
	} else if (key === 'layoutSubOffset') {
		layoutSubOffset(value);
	} else if (key === 'layoutPostOffset') {
		layoutPostOffset(value);
	} else if (key === 'layoutUserProfileOffset') {
		layoutUserProfileOffset(value);
	} else if (key === 'layoutSearchPageOffset') {
		layoutSearchPageOffset(value);
	} else if (key === 'layoutCentre') {
		layoutCentre(value);
	} else if (key === 'shadows') {
		addDropShadow(value);
	} else if (key === 'fitImage') {
		fitImage(value);
	} else if (key === 'imageScroll') {
		imageScroll(value);
	} else if (key === 'imageScrollMaxImageWidth') {
		imageScrollMaxImageWidth(value);
	} else if (key === 'hideRedditPremium') {
		hideRedditPremium(value);
	} else if (key === 'hideCreatePost') {
		hideCreatePost(value);
	} else if (key === 'hideAdvertiseButton') {
		hideAdvertiseButton(value);
	} else if (key === 'hideChatButton') {
		hideChatButton(value);
	} else if (key === 'hideModerationButton') {
		hideModerationButton(value);
	} else if (key === 'hidePopularButton') {
		hidePopularButton(value);
	} else if (key === 'hideNotificationButton') {
		hideNotificationButton(value);
	} else if (key === 'hideCreatePostButton') {
		hideCreatePostButton(value);
	} else if (key === 'hideHomeSidebar') {
		hideHomeSidebar(value);
	} else if (key === 'hideSubSidebar') {
		hideSubSidebar(value);
	} else if (key === 'hideGap') {
		hideGap(value);
	} else if (key === 'stickySort') {
		stickySort(value);
	} else if (key === 'hideUsername') {
		hideUsername(value);
	} else if (key === 'hideKarma') {
		hideKarma(value);
	} else if (key === 'alwaysShowRisingButton') {
		alwaysShowRisingButton(value);
	} else if (key === 'hideGetNewReddit') {
		hideGetNewReddit(value);
	} else if (key === 'hideSidebarPolicy') {
		hideSidebarPolicy(value);
	} else if (key === 'openSubInNewTab') {
		openSubInNewTab(value);
	} else if (key === 'openPostInNewTab') {
		openPostInNewTab(value);
	} else if (key === 'hidePromoted') {
		hidePromoted(value);
	} else if (key === 'hideRecommended') {
		hideRecommended(value);
	} else if (key === 'showToTopButton') {
		showToTopButton(value);
	} else if (key === 'showAllButton') {
		showAllButton(value);
	} else if (key === 'newPlayer') {
		newPlayer(value);
	} else if (key === 'sidemenuFeedTop') {
		sidemenuFeedTop(value);
	} else if (key === 'textPostScroll') {
		textPostScroll(value);
	} else if (key === 'hideSeeFullImage') {
		hideSeeFullImage(value);
	} else if (key === 'moderniseOldReddit') {
		moderniseOldReddit(value);
	} else if (key === 'hideHeaderSubBar') {
		hideHeaderSubBar(value);
	} else if (key === 'hideSideMenuOld') {
		hideSideMenuOld(value);
	} else if (key === 'hideSideMenu') {
		hideSideMenu(value);
	} else if (key === 'autoExpandValue') {
		autoExpandValue(value);
	} else if (key === 'hidePostSidebar') {
		hidePostSidebar(value);
	} else if (key === 'hidePostOverlaySidebar') {
		hidePostOverlaySidebar(value);
	} else if (key === 'hideUserSidebar') {
		hideUserSidebar(value);
	} else if (key === 'hideCustomFeedSidebar') {
		hideCustomFeedSidebar(value);
	} else if (key === 'hideRelatedPostsSection') {
		hideRelatedPostsSection(value);
	} else if (key === 'limitInfinityScroll') {
		limitInfinityScroll(value);
	} else if (key === 'showControversialSortButton') {
		showControversialSortButton(value);
	} else if (key === 'hideNSFW') {
		hideNSFW(value);
	} else if (key === 'hideTurnOnNotificationsPopup') {
		hideTurnOnNotificationsPopup(value);
	} else if (key === 'scrollToNextRootComment') {
		scrollToNextRootComment(value);
	} else if (key === 'showPostNumbers') {
		showPostNumbers(value);
	} else if (key === 'overrideDropShadow') {
		overrideDropShadow(value);
	} else if (key === 'overrideDropShadowCSS') {
		overrideDropShadowCSS(value);
	} else if (key === 'postHeight') {
		postHeight(value);
	} else if (key === 'postHeightSize') {
		postHeightSize(value);
	} else if (key === 'themeHeaderBackgroundColour') {
		themeHeaderBackgroundColour(value);
	} else if (key === 'themeHeaderBackgroundColourCSS') {
		themeHeaderBackgroundColourCSS(value);
	} else if (key === 'themeHeaderTextColour') {
		themeHeaderTextColour(value);
	} else if (key === 'themeHeaderTextColourCSS') {
		themeHeaderTextColourCSS(value);
	} else if (key === 'themeSortBackgroundColour') {
		themeSortBackgroundColour(value);
	} else if (key === 'themeSortBackgroundColourCSS') {
		themeSortBackgroundColourCSS(value);
	} else if (key === 'themeSortTextColour') {
		themeSortTextColour(value);
	} else if (key === 'themeSortTextColourCSS') {
		themeSortTextColourCSS(value);
	} else if (key === 'themeSortTextColour2') {
		themeSortTextColour2(value);
	} else if (key === 'themeSortTextColour2CSS') {
		themeSortTextColour2CSS(value);
	} else if (key === 'themeSortBorderColour') {
		themeSortBorderColour(value);
	} else if (key === 'themeSortBorderColourCSS') {
		themeSortBorderColourCSS(value);
	} else if (key === 'themePostBackgroundColour') {
		themePostBackgroundColour(value);
	} else if (key === 'themePostBackgroundColourCSS') {
		themePostBackgroundColourCSS(value);
	} else if (key === 'themePostVisitedTitleColour') {
		themePostVisitedTitleColour(value);
	} else if (key === 'themePostVisitedTitleColourCSS') {
		themePostVisitedTitleColourCSS(value);
	} else if (key === 'themePostTextColour1') {
		themePostTextColour1(value);
	} else if (key === 'themePostTextColour1CSS') {
		themePostTextColour1CSS(value);
	} else if (key === 'themePostCommentsTextColour1') {
		themePostCommentsTextColour1(value);
	} else if (key === 'themePostCommentsTextColour1CSS') {
		themePostCommentsTextColour1CSS(value);
	} else if (key === 'themePostCommentsTextColour2') {
		themePostCommentsTextColour2(value);
	} else if (key === 'themePostCommentsTextColour2CSS') {
		themePostCommentsTextColour2CSS(value);
	} else if (key === 'themePostTextColour2') {
		themePostTextColour2(value);
	} else if (key === 'themePostTextColour2CSS') {
		themePostTextColour2CSS(value);
	} else if (key === 'themePostBorderColour') {
		themePostBorderColour(value);
	} else if (key === 'themePostBorderColourCSS') {
		themePostBorderColourCSS(value);
	} else if (key === 'themeCreatePostBackgroundColour') {
		themeCreatePostBackgroundColour(value);
	} else if (key === 'themeCreatePostBackgroundColourCSS') {
		themeCreatePostBackgroundColourCSS(value);
	} else if (key === 'themeCreatePostBorderColour') {
		themeCreatePostBorderColour(value);
	} else if (key === 'themeCreatePostBorderColourCSS') {
		themeCreatePostBorderColourCSS(value);
	} else if (key === 'themeSidebarTextColour') {
		themeSidebarTextColour(value);
	} else if (key === 'themeSidebarTextColourCSS') {
		themeSidebarTextColourCSS(value);
	} else if (key === 'themeSidebarBgColour') {
		themeSidebarBgColour(value);
	} else if (key === 'themeSidebarBgColourCSS') {
		themeSidebarBgColourCSS(value);
	} else if (key === 'themeSidebarBorderColour') {
		themeSidebarBorderColour(value);
	} else if (key === 'themeSidebarBorderColourCSS') {
		themeSidebarBorderColourCSS(value);
	} else if (key === 'themeSidemenuTextColour') {
		themeSidemenuTextColour(value);
	} else if (key === 'themeSidemenuTextColourCSS') {
		themeSidemenuTextColourCSS(value);
	} else if (key === 'themeSidemenuBgColour') {
		themeSidemenuBgColour(value);
	} else if (key === 'themeSidemenuBgColourCSS') {
		themeSidemenuBgColourCSS(value);
	} else if (key === 'themeSidemenuButtonHoverColour') {
		themeSidemenuButtonHoverColour(value);
	} else if (key === 'themeSidemenuButtonHoverColourCSS') {
		themeSidemenuButtonHoverColourCSS(value);
	} else if (key === 'themePostContentAndCommentsLinkColour') {
		themePostContentAndCommentsLinkColour(value);
	} else if (key === 'themePostContentAndCommentsLinkColourCSS') {
		themePostContentAndCommentsLinkColourCSS(value);
	} else if (key === 'themeSearchbarBgColour') {
		themeSearchbarBgColour(value);
	} else if (key === 'themeSearchbarBgColourCSS') {
		themeSearchbarBgColourCSS(value);
	} else if (key === 'themeSearchbarDropdownBgColour') {
		themeSearchbarDropdownBgColour(value);
	} else if (key === 'themeSearchbarDropdownBgColourCSS') {
		themeSearchbarDropdownBgColourCSS(value);
	} else if (key === 'themePostUpvoteColour') {
		themePostUpvoteColour(value);
	} else if (key === 'themePostUpvoteColourCSS') {
		themePostUpvoteColourCSS(value);
	} else if (key === 'themeBlur') {
		themeBlur(value);
	} else if (key === 'bionicReaderPosts') {
		bionicReaderPosts(value);
	} else if (key === 'bionicReaderComments') {
		bionicReaderComments(value);
	} else if (key === 'bionicReaderFontColour') {
		bionicReaderFontColour(value);
	} else if (key === 'bionicReaderFontColourCSS') {
		bionicReaderFontColourCSS(value);
	} else if (key === 'bionicReaderBgColour') {
		bionicReaderBgColour(value);
	} else if (key === 'bionicReaderBgColourCSS') {
		bionicReaderBgColourCSS(value);
	} else if (key === 'alwaysShowPostOptions') {
		alwaysShowPostOptions(value);
	} else if (key === 'hideHeaderBar') {
		hideHeaderBar(value);
	} else if (key === 'nonStickyHeaderBar') {
		nonStickyHeaderBar(value);
	} else if (key === 'hideOriginalScrollToTop') {
		hideOriginalScrollToTop(value);
	} else if (key === 'largerClassicPost') {
		largerClassicPost(value);
	} else if (key === 'scrollToNextRootCommentPosition') {
		scrollToNextRootCommentPosition(value);
	} else if (key === 'scrollToNextRootCommentPositionV') {
		scrollToNextRootCommentPositionV(value);
	} else if (key === 'breakReminder') {
		breakReminder(value);
	} else if (key === 'showPostAuthor') {
		showPostAuthor(value);
	} else if (key === 'showPostFlair') {
		showPostFlair(value);
	} else if (key === 'hideSideMenuTopSection') {
		hideSideMenuTopSection(value);
	} else if (key === 'hideSideMenuModerationSection') {
		hideSideMenuModerationSection(value);
	} else if (key === 'hideSideMenuRecentSection') {
		hideSideMenuRecentSection(value);
	} else if (key === 'hideSideMenuCustomFeedsSection') {
		hideSideMenuCustomFeedsSection(value);
	} else if (key === 'hideSideMenuCommunitiesSection') {
		hideSideMenuCommunitiesSection(value);
	} else if (key === 'hideSideMenuResourcesSection') {
		hideSideMenuResourcesSection(value);
	} else if (key === 'hideSideMenuTopicsSection') {
		hideSideMenuTopicsSection(value);
	} else if (key === 'postTitleFontSize') {
		postTitleFontSize(value);
	} else if (key === 'postContentFontSize') {
		postContentFontSize(value);
	} else if (key === 'postCommentsFontSize') {
		postCommentsFontSize(value);
	} else if (key === 'hideUserProfilePics') {
		hideUserProfilePics(value);
	} else if (key === 'autoExpandComments') {
		autoExpandComments(value);
	} else if (key === 'hidePostHiddenMessage') {
		hidePostHiddenMessage(value);
	} /* else if (key == 'scalePostToFitImage') {
		scalePostToFitImage(value);
	} else if (key == 'scalePostToFitImageMaxImageWidth') {
		scalePostToFitImageMaxImageWidth(value);
	}*/ /*else if (key == 'dragImageToResize') {
		dragImageToResize(value);
	} else if (key == 'dragImageToResizeInitialSize') {
		dragImageToResizeInitialSize(value);
	}*/ /* else if (key == 'addDownloadVideoButton') {
		addDownloadVideoButton(value);
	}*/ else if (key === 'autoCollapseAutoModeratorComment') {
		autoCollapseAutoModeratorComment(value);
	} else if (key === 'hideJoinButtonOnPosts') {
		hideJoinButtonOnPosts(value);
	} else if (key === 'autoLoadMoreComments') {
		autoLoadMoreComments(value);
	} else if (key === 'underlineLinks') {
		underlineLinks(value);
	} else if (key === 'autoShowCommentFormattingOptions') {
		autoShowCommentFormattingOptions(value);
	} else if (key === 'hideSearchSidebar') {
		hideSearchSidebar(value);
	} else if (key === 'hidePostBackButton') {
		hidePostBackButton(value);
	} else if (key === 'borderRadiusAmount') {
		borderRadiusAmount(value);
	} else if (key === 'hidePostKarma') {
		hidePostKarma(value);
	} else if (key === 'hideCommentKarma') {
		hideCommentKarma(value);
	} else if (key === 'hideVoteButtons') {
		hideVoteButtons(value);
	} else if (key === 'hideRecentPosts') {
		hideRecentPosts(value);
	} else if (key === 'sideMenuWidth') {
		sideMenuWidth(value);
	} else if (key === 'sideMenuIconsOnly') {
		sideMenuIconsOnly(value);
	} else if (key === 'hideSideMenuFavouriteButton') {
		hideSideMenuFavouriteButton(value);
	} else if (key === 'sideMenuToggleButton') {
		sideMenuToggleButton(value);
	} else if (key === 'hideCompactViewBlankThumbnails') {
		hideCompactViewBlankThumbnails(value);
	} else if (key === 'hideCompactViewThumbnails') {
		hideCompactViewThumbnails(value);
	} else if (key === 'hideNsfwInSearchResults') {
		hideNsfwInSearchResults(value);
	} else if (key === 'hideTrendingTodayInSearchResults') {
		hideTrendingTodayInSearchResults(value);
	} else if (key === 'hideCommunityHighlights') {
		hideCommunityHighlights(value);
	} else if (key === 'hideSearchSidebarNsfwUsers') {
		hideSearchSidebarNsfwUsers(value);
	} else if (key === 'rememberSideMenuSectionHiddenState') {
		rememberSideMenuSectionHiddenState(value);
	} else if (key === 'hideHomeFeed') {
		hideHomeFeed(value);
	} else if (key === 'postTitleFontWeight') {
		postTitleFontWeight(value);
	} else if (key === 'postContentFontWeight') {
		postContentFontWeight(value);
	} else if (key === 'postCommentsFontWeight') {
		postCommentsFontWeight(value);
	} else if (key === 'feedPostTitleFontSize') {
		feedPostTitleFontSize(value);
	} else if (key === 'feedPostContentFontSize') {
		feedPostContentFontSize(value);
	} else if (key === 'feedPostTitleFontWeight') {
		feedPostTitleFontWeight(value);
	} else if (key === 'feedPostContentFontWeight') {
		feedPostContentFontWeight(value);
	} else if (key === 'themePostCommentActionRowColour') {
		themePostCommentActionRowColour(value);
	} else if (key === 'themePostCommentActionRowColourCSS') {
		themePostCommentActionRowColourCSS(value);
	} else if (key === 'createPostTitleFontSize') {
		createPostTitleFontSize(value);
	} else if (key === 'createPostBodyFontSize') {
		createPostBodyFontSize(value);
	} else if (key === 'addProfilePicturesToComments') {
		addProfilePicturesToComments(value);
	} else if (key === 'hidePostDivider') {
		hidePostDivider(value);
	} else if (key === 'postSeparatorHeight') {
		postSeparatorHeight(value);
	} else if (key === 'hideBlurredMediaBackground') {
		hideBlurredMediaBackground(value);
	} else if (key === 'fullWidthBanner') {
		fullWidthBanner(value);
	} else if (key === 'compactHeaderSideMenu') {
		compactHeaderSideMenu(value);
	} else if (key === 'compactSubRuleList') {
		compactSubRuleList(value);
	} else if (key === 'resizeMainContainer') {
		resizeMainContainer(value);
	} else if (key === 'resizeMainContainerWidth') {
		resizeMainContainerWidth(value);
	} else if (key === 'textPostPreviewFade') {
		textPostPreviewFade(value);
	} else if (key === 'textPostPreviewFadeHeight') {
		setTextPostPreviewFadeHeight(value);
	} else if (key === 'textPostPreviewMaxHeight') {
		setTextPostPreviewMaxHeight(value);
	} else if (key === 'customFonts') {
		customFonts(value);
	} else if (key === 'sidebarToggleButton') {
		sidebarToggleButton(value);
	}
	return true;
});
