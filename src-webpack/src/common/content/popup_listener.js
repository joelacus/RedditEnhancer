/* ===== Content / Settings Listener ===== */

// Listens for commands from the settings popup to enable/disable/change tweaks.

import { addDropShadow } from './functions/style/drop_shadow';
import { alwaysShowPostOptions } from './functions/productivity/always_show_post_options';
import { alwaysShowRisingButton } from './functions/productivity/always_show_rising';
import { autoCollapseAutoModeratorComment } from './functions/productivity/auto_collapse_automod_comment';
import { autoExpandComments } from './functions/productivity/auto_expand_comments';
import { autoExpandValue } from './functions/expand_feed_post/auto_expand_value';
import { autoLoadMoreComments } from './functions/productivity/auto_load_more_comments';
import { bgBlur } from './functions/background/custom_background';
import { bionicReaderBgColour, bionicReaderBgColourCSS, bionicReaderFontColour, bionicReaderFontColourCSS, bionicReaderPosts } from './functions/accessibility/bionic_reader';
import { bionicReaderComments } from './functions/accessibility/bionic_reader';
import { breakReminder } from './functions/productivity/break_reminder';
import { darkMode, darkModeAutoListener } from './functions/dark_mode/dark_mode';
import { expandLayout, expandPostOverlayWidth, expandPostWidth, expandSubWidth, expandLayoutWidth, expandUserProfileWidth, expandTopicFeedWidth } from './functions/expand_feed_post/expand_content';
import { fitImage } from './functions/productivity/scale_tall_images_to_fit_post';
import { hideCreatePost } from './functions/hide_elements/hide_create_post';
import { hideGap } from './functions/style/hide_gap';
import { hideGetNewReddit } from './functions/hide_elements/hide_get_new_reddit';
import { hideHeaderBar } from './functions/hide_elements/hide_header_bar';
import { hideHeaderSubBar } from './functions/hide_elements/hide_header_sub_bar';
import { hideHomeSidebar, hideSubSidebar, hidePostSidebar, hidePostOverlaySidebar, hideUserSidebar, hideRelatedPostsSection, hideSearchSidebar } from './functions/hide_elements/hide_sidebar';
import { hideJoinButtonOnPosts } from './functions/hide_elements/hide_post_join_button';
import { hideNSFW } from './functions/hide_elements/hide_nsfw';
import { hideOriginalScrollToTop } from './functions/hide_elements/hide_original_scroll_to_top';
import { hidePopularButton, hideModerationButton, hideChatButton, hideAdvertiseButton, hideNotificationButton, hideCreatePostButton } from './functions/hide_elements/hide_header_buttons';
import { hidePostHiddenMessage } from './functions/hide_elements/hide_post_hidden_message';
import { hidePromoted } from './functions/hide_elements/hide_promoted';
import { hideRedditPremium } from './functions/hide_elements/hide_reddit_premium';
import { hideSeeFullImage } from './functions/hide_elements/hide_see_full_image';
import { hideSidebarPolicy } from './functions/hide_elements/hide_sidebar_policy';
import { hideSideMenuOld, hideSideMenu } from './functions/hide_elements/hide_side_menu';
import { hideSideMenuCommunitiesSection, hideSideMenuCustomFeedsSection, hideSideMenuModerationSection, hideSideMenuRecentSection, hideSideMenuResourcesSection, hideSideMenuTopSection, hideSideMenuTopicsSection } from './functions/hide_elements/hide_side_menu_sections';
import { hideTurnOnNotificationsPopup } from './functions/hide_elements/hide_turn_on_notifications_popup';
import { hideUsername, hideKarma } from './functions/hide_elements/hide_username_and_karma';
import { hideUserProfilePics } from './functions/hide_elements/hide_user_profile_pics';
import { imageScroll, imageScrollMaxImageWidth } from './functions/productivity/scroll_tall_images';
import { largerClassicPost } from './functions/style/larger_classic_post';
import { layoutCentre, layoutOffset, layoutSubOffset, layoutPostOffset, layoutUserProfileOffset } from './functions/expand_feed_post/layout_centre_and_offset';
import { limitInfinityScroll } from './functions/productivity/limit_infinity_scroll';
import { moderniseOldReddit } from './functions/style/modernise_old_reddit';
import { newPlayer } from './functions/productivity/video_player';
import { nonStickyHeaderBar } from './functions/productivity/non_sticky_header_bar';
import { openPostInNewTab } from './functions/productivity/open_post_links_in_new_tab';
import { openSubInNewTab } from './functions/productivity/open_sub_links_in_new_tab';
import { overrideDropShadow, overrideDropShadowCSS } from './functions/style/override_drop_shadow';
import { postHeight, postHeightSize } from './functions/productivity/post_max_height';
import { postTitleFontSize, postCommentsFontSize, postContentFontSize } from './functions/accessibility/resize_font';
//import { removePageSideMargin } from './functions/expand_feed_post/remove_page_side_margin';
import { scrollToNextRootComment } from './functions/productivity/scroll_to_next_root_comment';
import { scrollToNextRootCommentPosition, scrollToNextRootCommentPositionV } from './functions/productivity/scroll_to_next_root_comment';
import { showAllButton } from './functions/productivity/show_r_all_button';
import { showControversialSortButton } from './functions/productivity/show_controversial_sort_button';
import { showPostAuthor } from './functions/productivity/show_post_author';
import { showPostFlair } from './functions/productivity/show_post_flair';
import { showPostNumbers } from './functions/productivity/show_post_numbers';
import { showToTopButton } from './functions/productivity/scroll_to_top';
import { sidemenuFeedTop } from './functions/productivity/sidemenu_feed_top';
import { stickySort } from './functions/productivity/sticky_sort';
import { textPostScroll } from './functions/productivity/text_post_scroll';
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
} from './functions/style/override_theme_colours';
import { useCustomBackground, setCustomBackground } from './functions/background/custom_background';
import { underlineLinks } from './functions/accessibility/underline_links';
import { autoShowCommentFormattingOptions } from './functions/productivity/auto_show_comment_formatting_options';
import { hideRecommended } from './functions/hide_elements/hide_recommended';
//import { scalePostToFitImageMaxImageWidth, scalePostToFitImage } from './functions/productivity/scale_post_to_fit_image';
//import { dragImageToResize, dragImageToResizeInitialSize } from './functions/productivity/scale_image_on_drag';
import { hidePostBackButton } from './functions/hide_elements/hide_post_back_button';
import { borderRadiusAmount } from './functions/style/border_radius';
import { hidePostKarma } from './functions/hide_elements/hide_post_karma';
import { hideRecentPosts } from './functions/hide_elements/hide_recent_posts';
import { sideMenuWidth } from './functions/productivity/side_menu_width';
import { sideMenuIconsOnly } from './functions/hide_elements/side_menu_icons_only';
import { hideSideMenuFavouriteButton } from './functions/hide_elements/hide_side_menu_favourite_button';
import { sideMenuToggleButton } from './functions/hide_elements/side_menu_toggle_button';
import { hideCompactViewBlankThumbnails } from './functions/hide_elements/hide_compact_view_blank_thumbnails';
import { hideNsfwInSearchResults, hideTrendingTodayInSearchResults } from './functions/hide_elements/hide_search_results_sections';
import { hideCommunityHighlights } from './functions/hide_elements/hide_community_highlights';
import { hideSearchSidebarNsfwUsers } from './functions/hide_elements/hide_search_page_sidebar_nsfw_users';
import { rememberSideMenuSectionHiddenState } from './functions/productivity/remember_side_menu_section_hidden_state';
//import { addDownloadVideoButton } from './functions/productivity/add_download_video_button';

/* = Listen For Settings Change = */
BROWSER_API.runtime.onMessage.addListener((msg, sender, response) => {
	var key = Object.keys(msg)[0];
	var value = Object.values(msg)[0];
	//console.log(key, value);
	if (key == 'darkMode') {
		darkMode(value);
	} else if (key == 'darkModeAutoListener') {
		darkModeAutoListener(value);
	} else if (key == 'useCustomBackground') {
		useCustomBackground(value);
	} else if (key == 'setCustomBackground') {
		setCustomBackground(value);
	} else if (key == 'bgBlur') {
		bgBlur(value);
	} else if (key == 'expandLayout') {
		expandLayout(value);
	} else if (key == 'expandLayoutWidth') {
		expandLayoutWidth(value);
	} else if (key == 'expandPostOverlayWidth') {
		expandPostOverlayWidth(value);
	} else if (key == 'expandPostWidth') {
		expandPostWidth(value);
	} else if (key == 'expandSubWidth') {
		expandSubWidth(value);
	} else if (key == 'expandUserProfileWidth') {
		expandUserProfileWidth(value);
	} else if (key == 'expandTopicFeedWidth') {
		expandTopicFeedWidth(value);
	} else if (key == 'layoutOffset') {
		layoutOffset(value);
	} else if (key == 'layoutSubOffset') {
		layoutSubOffset(value);
	} else if (key == 'layoutPostOffset') {
		layoutPostOffset(value);
	} else if (key == 'layoutUserProfileOffset') {
		layoutUserProfileOffset(value);
	} else if (key == 'layoutCentre') {
		layoutCentre(value);
	} else if (key == 'shadows') {
		addDropShadow(value);
	} else if (key == 'fitImage') {
		fitImage(value);
	} else if (key == 'imageScroll') {
		imageScroll(value);
	} else if (key == 'imageScrollMaxImageWidth') {
		imageScrollMaxImageWidth(value);
	} else if (key == 'hideRedditPremium') {
		hideRedditPremium(value);
	} else if (key == 'hideCreatePost') {
		hideCreatePost(value);
	} else if (key == 'hideAdvertiseButton') {
		hideAdvertiseButton(value);
	} else if (key == 'hideChatButton') {
		hideChatButton(value);
	} else if (key == 'hideModerationButton') {
		hideModerationButton(value);
	} else if (key == 'hidePopularButton') {
		hidePopularButton(value);
	} else if (key == 'hideNotificationButton') {
		hideNotificationButton(value);
	} else if (key == 'hideCreatePostButton') {
		hideCreatePostButton(value);
	} else if (key == 'hideHomeSidebar') {
		hideHomeSidebar(value);
	} else if (key == 'hideSubSidebar') {
		hideSubSidebar(value);
	} else if (key == 'hideGap') {
		hideGap(value);
	} else if (key == 'stickySort') {
		stickySort(value);
	} else if (key == 'hideUsername') {
		hideUsername(value);
	} else if (key == 'hideKarma') {
		hideKarma(value);
	} else if (key == 'alwaysShowRisingButton') {
		alwaysShowRisingButton(value);
	} else if (key == 'hideGetNewReddit') {
		hideGetNewReddit(value);
	} else if (key == 'hideSidebarPolicy') {
		hideSidebarPolicy(value);
	} else if (key == 'openSubInNewTab') {
		openSubInNewTab(value);
	} else if (key == 'openPostInNewTab') {
		openPostInNewTab(value);
	} else if (key == 'hidePromoted') {
		hidePromoted(value);
	} else if (key == 'hideRecommended') {
		hideRecommended(value);
	} else if (key == 'showToTopButton') {
		showToTopButton(value);
	} else if (key == 'showAllButton') {
		showAllButton(value);
	} else if (key == 'newPlayer') {
		newPlayer(value);
	} else if (key == 'sidemenuFeedTop') {
		sidemenuFeedTop(value);
	} else if (key == 'textPostScroll') {
		textPostScroll(value);
	} else if (key == 'hideSeeFullImage') {
		hideSeeFullImage(value);
	} else if (key == 'moderniseOldReddit') {
		moderniseOldReddit(value);
	} else if (key == 'hideHeaderSubBar') {
		hideHeaderSubBar(value);
	} else if (key == 'hideSideMenuOld') {
		hideSideMenuOld(value);
	} else if (key == 'hideSideMenu') {
		hideSideMenu(value);
	} else if (key == 'autoExpandValue') {
		autoExpandValue(value);
	} else if (key == 'hidePostSidebar') {
		hidePostSidebar(value);
	} else if (key == 'hidePostOverlaySidebar') {
		hidePostOverlaySidebar(value);
	} else if (key == 'hideUserSidebar') {
		hideUserSidebar(value);
	} else if (key == 'hideRelatedPostsSection') {
		hideRelatedPostsSection(value);
	} else if (key == 'limitInfinityScroll') {
		limitInfinityScroll(value);
	} else if (key == 'showControversialSortButton') {
		showControversialSortButton(value);
	} else if (key == 'hideNSFW') {
		hideNSFW(value);
	} else if (key == 'hideTurnOnNotificationsPopup') {
		hideTurnOnNotificationsPopup(value);
	} else if (key == 'scrollToNextRootComment') {
		scrollToNextRootComment(value);
	} else if (key == 'showPostNumbers') {
		showPostNumbers(value);
	} else if (key == 'overrideDropShadow') {
		overrideDropShadow(value);
	} else if (key == 'overrideDropShadowCSS') {
		overrideDropShadowCSS(value);
	} else if (key == 'postHeight') {
		postHeight(value);
	} else if (key == 'postHeightSize') {
		postHeightSize(value);
	} else if (key == 'themeHeaderBackgroundColour') {
		themeHeaderBackgroundColour(value);
	} else if (key == 'themeHeaderBackgroundColourCSS') {
		themeHeaderBackgroundColourCSS(value);
	} else if (key == 'themeHeaderTextColour') {
		themeHeaderTextColour(value);
	} else if (key == 'themeHeaderTextColourCSS') {
		themeHeaderTextColourCSS(value);
	} else if (key == 'themeSortBackgroundColour') {
		themeSortBackgroundColour(value);
	} else if (key == 'themeSortBackgroundColourCSS') {
		themeSortBackgroundColourCSS(value);
	} else if (key == 'themeSortTextColour') {
		themeSortTextColour(value);
	} else if (key == 'themeSortTextColourCSS') {
		themeSortTextColourCSS(value);
	} else if (key == 'themeSortTextColour2') {
		themeSortTextColour2(value);
	} else if (key == 'themeSortTextColour2CSS') {
		themeSortTextColour2CSS(value);
	} else if (key == 'themeSortBorderColour') {
		themeSortBorderColour(value);
	} else if (key == 'themeSortBorderColourCSS') {
		themeSortBorderColourCSS(value);
	} else if (key == 'themePostBackgroundColour') {
		themePostBackgroundColour(value);
	} else if (key == 'themePostBackgroundColourCSS') {
		themePostBackgroundColourCSS(value);
	} else if (key == 'themePostVisitedTitleColour') {
		themePostVisitedTitleColour(value);
	} else if (key == 'themePostVisitedTitleColourCSS') {
		themePostVisitedTitleColourCSS(value);
	} else if (key == 'themePostTextColour1') {
		themePostTextColour1(value);
	} else if (key == 'themePostTextColour1CSS') {
		themePostTextColour1CSS(value);
	} else if (key == 'themePostCommentsTextColour1') {
		themePostCommentsTextColour1(value);
	} else if (key == 'themePostCommentsTextColour1CSS') {
		themePostCommentsTextColour1CSS(value);
	} else if (key == 'themePostCommentsTextColour2') {
		themePostCommentsTextColour2(value);
	} else if (key == 'themePostCommentsTextColour2CSS') {
		themePostCommentsTextColour2CSS(value);
	} else if (key == 'themePostTextColour2') {
		themePostTextColour2(value);
	} else if (key == 'themePostTextColour2CSS') {
		themePostTextColour2CSS(value);
	} else if (key == 'themePostBorderColour') {
		themePostBorderColour(value);
	} else if (key == 'themePostBorderColourCSS') {
		themePostBorderColourCSS(value);
	} else if (key == 'themeCreatePostBackgroundColour') {
		themeCreatePostBackgroundColour(value);
	} else if (key == 'themeCreatePostBackgroundColourCSS') {
		themeCreatePostBackgroundColourCSS(value);
	} else if (key == 'themeCreatePostBorderColour') {
		themeCreatePostBorderColour(value);
	} else if (key == 'themeCreatePostBorderColourCSS') {
		themeCreatePostBorderColourCSS(value);
	} else if (key == 'themeSidebarTextColour') {
		themeSidebarTextColour(value);
	} else if (key == 'themeSidebarTextColourCSS') {
		themeSidebarTextColourCSS(value);
	} else if (key == 'themeSidebarBgColour') {
		themeSidebarBgColour(value);
	} else if (key == 'themeSidebarBgColourCSS') {
		themeSidebarBgColourCSS(value);
	} else if (key == 'themeSidebarBorderColour') {
		themeSidebarBorderColour(value);
	} else if (key == 'themeSidebarBorderColourCSS') {
		themeSidebarBorderColourCSS(value);
	} else if (key == 'themeSidemenuTextColour') {
		themeSidemenuTextColour(value);
	} else if (key == 'themeSidemenuTextColourCSS') {
		themeSidemenuTextColourCSS(value);
	} else if (key == 'themeSidemenuBgColour') {
		themeSidemenuBgColour(value);
	} else if (key == 'themeSidemenuBgColourCSS') {
		themeSidemenuBgColourCSS(value);
	} else if (key == 'themeSidemenuButtonHoverColour') {
		themeSidemenuButtonHoverColour(value);
	} else if (key == 'themeSidemenuButtonHoverColourCSS') {
		themeSidemenuButtonHoverColourCSS(value);
	} else if (key == 'themePostContentAndCommentsLinkColour') {
		themePostContentAndCommentsLinkColour(value);
	} else if (key == 'themePostContentAndCommentsLinkColourCSS') {
		themePostContentAndCommentsLinkColourCSS(value);
	} else if (key == 'themeSearchbarBgColour') {
		themeSearchbarBgColour(value);
	} else if (key == 'themeSearchbarBgColourCSS') {
		themeSearchbarBgColourCSS(value);
	} else if (key == 'themeSearchbarDropdownBgColour') {
		themeSearchbarDropdownBgColour(value);
	} else if (key == 'themeSearchbarDropdownBgColourCSS') {
		themeSearchbarDropdownBgColourCSS(value);
	} else if (key == 'themeBlur') {
		themeBlur(value);
	} else if (key == 'bionicReaderPosts') {
		bionicReaderPosts(value);
	} else if (key == 'bionicReaderComments') {
		bionicReaderComments(value);
	} else if (key == 'bionicReaderFontColour') {
		bionicReaderFontColour(value);
	} else if (key == 'bionicReaderFontColourCSS') {
		bionicReaderFontColourCSS(value);
	} else if (key == 'bionicReaderBgColour') {
		bionicReaderBgColour(value);
	} else if (key == 'bionicReaderBgColourCSS') {
		bionicReaderBgColourCSS(value);
	} else if (key == 'alwaysShowPostOptions') {
		alwaysShowPostOptions(value);
	} else if (key == 'hideHeaderBar') {
		hideHeaderBar(value);
	} else if (key == 'nonStickyHeaderBar') {
		nonStickyHeaderBar(value);
	} else if (key == 'hideOriginalScrollToTop') {
		hideOriginalScrollToTop(value);
	} else if (key == 'largerClassicPost') {
		largerClassicPost(value);
	} else if (key == 'scrollToNextRootCommentPosition') {
		scrollToNextRootCommentPosition(value);
	} else if (key == 'scrollToNextRootCommentPositionV') {
		scrollToNextRootCommentPositionV(value);
	} else if (key == 'breakReminder') {
		breakReminder(value);
	} else if (key == 'showPostAuthor') {
		showPostAuthor(value);
	} else if (key == 'showPostFlair') {
		showPostFlair(value);
	} /* else if (key == 'removePageSideMargin') {
		removePageSideMargin(value);
	}*/ else if (key == 'hideSideMenuTopSection') {
		hideSideMenuTopSection(value);
	} else if (key == 'hideSideMenuModerationSection') {
		hideSideMenuModerationSection(value);
	} else if (key == 'hideSideMenuRecentSection') {
		hideSideMenuRecentSection(value);
	} else if (key == 'hideSideMenuCustomFeedsSection') {
		hideSideMenuCustomFeedsSection(value);
	} else if (key == 'hideSideMenuCommunitiesSection') {
		hideSideMenuCommunitiesSection(value);
	} else if (key == 'hideSideMenuResourcesSection') {
		hideSideMenuResourcesSection(value);
	} else if (key == 'hideSideMenuTopicsSection') {
		hideSideMenuTopicsSection(value);
	} else if (key == 'postTitleFontSize') {
		postTitleFontSize(value);
	} else if (key == 'postContentFontSize') {
		postContentFontSize(value);
	} else if (key == 'postCommentsFontSize') {
		postCommentsFontSize(value);
	} else if (key == 'hideUserProfilePics') {
		hideUserProfilePics(value);
	} else if (key == 'autoExpandComments') {
		autoExpandComments(value);
	} else if (key == 'hidePostHiddenMessage') {
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
	}*/ else if (key == 'autoCollapseAutoModeratorComment') {
		autoCollapseAutoModeratorComment(value);
	} else if (key == 'hideJoinButtonOnPosts') {
		hideJoinButtonOnPosts(value);
	} else if (key == 'autoLoadMoreComments') {
		autoLoadMoreComments(value);
	} else if (key == 'underlineLinks') {
		underlineLinks(value);
	} else if (key == 'autoShowCommentFormattingOptions') {
		autoShowCommentFormattingOptions(value);
	} else if (key == 'hideSearchSidebar') {
		hideSearchSidebar(value);
	} else if (key == 'hidePostBackButton') {
		hidePostBackButton(value);
	} else if (key == 'borderRadiusAmount') {
		borderRadiusAmount(value);
	} else if (key == 'hidePostKarma') {
		hidePostKarma(value);
	} else if (key == 'hideRecentPosts') {
		hideRecentPosts(value);
	} else if (key == 'sideMenuWidth') {
		sideMenuWidth(value);
	} else if (key == 'sideMenuIconsOnly') {
		sideMenuIconsOnly(value);
	} else if (key == 'hideSideMenuFavouriteButton') {
		hideSideMenuFavouriteButton(value);
	} else if (key == 'sideMenuToggleButton') {
		sideMenuToggleButton(value);
	} else if (key == 'hideCompactViewBlankThumbnails') {
		hideCompactViewBlankThumbnails(value);
	} else if (key == 'hideNsfwInSearchResults') {
		hideNsfwInSearchResults(value);
	} else if (key == 'hideTrendingTodayInSearchResults') {
		hideTrendingTodayInSearchResults(value);
	} else if (key == 'hideCommunityHighlights') {
		hideCommunityHighlights(value);
	} else if (key == 'hideSearchSidebarNsfwUsers') {
		hideSearchSidebarNsfwUsers(value);
	} else if (key == 'rememberSideMenuSectionHiddenState') {
		rememberSideMenuSectionHiddenState(value);
	}
	return true;
});
