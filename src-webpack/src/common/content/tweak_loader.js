// ────────────────────────────────────────────────────────────────────────────
// Content / Tweak Loader
//
// Applies certain tweaks after the page has loaded.
//
// ────────────────────────────────────────────────────────────────────────────

import { i18nReady } from './i18n';
import { waitForAddedNode } from '../content_first/functions/tweak_loaders/main_observer';
import './tweaks/productivity/canned_messages';
//import { loadBreakReminder } from './tweaks/productivity/break_reminder';
//import { loadDarkModeAuto } from './tweaks/dark_mode/dark_mode';
//import { loadLimitInfinityScroll } from './tweaks/productivity/limit_infinity_scroll';
import { addBorderRadiusToShadowRootElements } from './tweaks/style/border_radius';
import { loadAddDownloadVideoButton } from './tweaks/media/add_download_video_button';
import { loadAddProfilePicturesToComments } from './tweaks/productivity/add_profile_picture_to_comments';
import { loadAlwaysShowCommentOptions } from './tweaks/productivity/always_show_comment_options';
import { loadAlwaysShowPostOptions } from './tweaks/productivity/always_show_post_options';
import { loadAttachSideMenuHeader, loadSubredditDisplayNameBanner, moveSortDropdown } from './tweaks/style/old_new_ui';
import { loadAutoCollapseAutoModeratorComment } from './tweaks/productivity/auto_collapse_automod_comment';
import { loadAutoExpandValue } from './tweaks/resize_elements/auto_expand_value';
import { loadAutoLoadMoreComments } from './tweaks/productivity/auto_load_more_comments';
import { loadAutoplayCommentGifs } from './tweaks/media/autoplay_comment_gifs';
import { loadAutoplayGifs } from './tweaks/media/autoplay_gifs';
import { loadAutoplayVideos } from './tweaks/media/autoplay_videos';
import { loadBetterCommentBox } from './tweaks/productivity/better_comment_box';
import { loadBionicReader } from './tweaks/accessibility/bionic_reader';
import { loadCleanLink } from './tweaks/productivity/clean_link';
import { loadCompactPostLinkPreview } from './tweaks/media/compact_post_link_preview';
import { loadFixThreadlinesForTranslucentPosts, loadThemeAfterPageLoad } from './tweaks/style/override_theme_colours';
import { loadFullWidthExpandos } from './tweaks/media/full_width_expandos';
import { loadGalleryKeyboardNavigation } from './tweaks/media/gallery_keyboard_navigation';
import { loadHideAiInSearch } from './tweaks/hide_elements/hide_ai_in_search';
import { loadHideAwards } from './tweaks/hide_elements/hide_awards';
import { loadHideBlockedKeywordComments } from './tweaks/block/block_comments_by_keyword';
import { loadHideBlockedKeywordPosts } from './tweaks/block/block_posts_by_keyword';
import { loadHideBlockedLinkPosts } from './tweaks/block/block_posts_by_url';
import { loadHideBlockedSubredditPosts } from './tweaks/block/block_posts_by_subreddit';
import { loadHideBlockedUserPosts } from './tweaks/block/block_posts_by_user';
import { loadHideLogoInSearch } from './tweaks/hide_elements/hide_logo_in_search';
import { loadHideNSFW } from './tweaks/hide_elements/hide_nsfw';
import { loadHideNsfwInSearchResults, loadHideTrendingTodayInSearchResults } from './tweaks/hide_elements/hide_search_results_sections';
import { loadHidePostComments } from './tweaks/hide_elements/hide_post_comments';
import { loadHidePostKarma, loadHideCommentKarma } from './tweaks/hide_elements/hide_post_comment_karma';
import { loadHideRelatedCommunities } from './tweaks/hide_elements/hide_related_communities';
import { loadHideSideMenuFavouriteButton } from './tweaks/hide_elements/hide_side_menu_favourite_button';
import { loadHideUsernameInSubSidebar } from './tweaks/hide_elements/hide_username_in_sub_sidebar';
import { loadHideVoteButtons } from './tweaks/hide_elements/hide_vote_buttons';
import { loadImageScroll } from './tweaks/media/scroll_images';
import { loadLeftSideVoteButtons } from './tweaks/style/left_side_vote_buttons';
import { loadMarkReadOnOpenExpandos } from './tweaks/productivity/mark_read_on_open_expandos';
import { loadModerniseOldReddit } from './tweaks/style/modernise_old_reddit';
import { loadMulticolouredThreadLines } from './tweaks/style/multicoloured_threadlines';
import { loadNumberedPostImages } from './tweaks/media/numbered_post_images';
import { loadOpenPostInNewTab } from './tweaks/productivity/open_post_links_in_new_tab';
import { loadOpenSubInNewTab } from './tweaks/productivity/open_sub_links_in_new_tab';
import { loadRememberSideMenuSectionHiddenState } from './tweaks/hide_elements/remember_side_menu_section_hidden_state';
import { loadReplacePostImagesWithLinks } from './tweaks/media/replace_images_with_links';
import { loadReplacePostVideosWithLinks } from './tweaks/media/replace_videos_with_links';
import { loadReplaceSearchPlaceholderText } from './tweaks/hide_elements/replace_search_placeholder';
import { loadScalePostToFitImage } from './tweaks/media/scale_post_to_fit_image';
import { loadScalePostToFitVideo } from './tweaks/media/scale_post_to_fit_video';
import { loadScrollToNextRootComment } from './tweaks/productivity/scroll_to_next_root_comment';
import { loadScrollToPost } from './tweaks/productivity/scroll_to_post';
import { loadShowCommentAbsoluteTimestamp, loadShowPostAbsoluteTimestamp } from './tweaks/productivity/show_absolute_timestamps';
import { loadShowCommunitiesFilter } from './tweaks/productivity/community_filter';
import { loadShowMemberCount } from './tweaks/productivity/show_member_count';
import { loadShowPostAuthor } from './tweaks/productivity/show_post_author';
import { loadShowPostFlair } from './tweaks/productivity/show_post_flair';
import { loadShowPostNumbers } from './tweaks/productivity/show_post_numbers';
import { loadShowToTopButton } from './tweaks/productivity/scroll_to_top';
import { loadShowToTopButtonFloat } from './tweaks/productivity/scroll_to_top_float';
import { loadShowUpvoteRatio } from './tweaks/productivity/show_upvote_ratio';
import { loadSidebarToggleButton } from './tweaks/hide_elements/sidebar_toggle_button';
import { loadSideMenuIconsOnly } from './tweaks/hide_elements/side_menu_icons_only';
import { loadSideMenuToggleButton } from './tweaks/hide_elements/side_menu_toggle_button';
import { loadUsernameHoverPopupDelay } from './tweaks/productivity/username_hover_popup_delay';
import { loadViewCrossposts } from './tweaks/productivity/view_crossposts';

export function loadTweaks() {
	if (redditVersion === 'old') {
		loadModerniseOldReddit();
		loadAutoLoadMoreComments();
		loadAddProfilePicturesToComments();
		loadSidebarToggleButton();
		loadHideBlockedKeywordPosts();
		loadHideBlockedUserPosts();
		loadHideBlockedLinkPosts();
		loadHideBlockedSubredditPosts();
		loadHideBlockedKeywordComments();
		loadShowMemberCount();
		loadShowPostAbsoluteTimestamp();
		loadShowCommentAbsoluteTimestamp();
		loadShowToTopButtonFloat();
		loadScrollToPost();
		loadCleanLink();
		loadHidePostComments();
		loadNumberedPostImages();
	} else if (redditVersion === 'newnew') {
		loadAddDownloadVideoButton();
		loadBionicReader();
		loadScrollToNextRootComment();
		loadShowPostAuthor();
		loadShowPostFlair();
		loadHidePostKarma();
		loadHideVoteButtons();
		loadSideMenuToggleButton();
		loadUsernameHoverPopupDelay();
		loadSubredditDisplayNameBanner();
		loadOpenPostInNewTab();
		loadOpenSubInNewTab();
		loadHideUsernameInSubSidebar();
		loadHideAiInSearch();
		loadHideLogoInSearch();
		loadReplaceSearchPlaceholderText();
		loadHideRelatedCommunities();
		loadShowToTopButtonFloat();
		loadScrollToPost();
		loadCleanLink();

		// Wait for elements to load on the page before loading tweaks.
		setTimeout(addBorderRadiusToShadowRootElements, 2000);

		waitForAddedNode({
			query: '#communities_section',
			parent: document.querySelector('body'),
			done: loadShowCommunitiesFilter,
		});

		waitForAddedNode({
			query: 'reddit-sidebar-nav',
			parent: document.querySelector('body'),
			done: loadAttachSideMenuHeader,
		});

		waitForAddedNode({
			query: '#communities_section left-nav-communities-controller',
			shadowRoot: true,
			parent: document.querySelector('body'),
			recursive: true,
			done: function (shadowRoot) {
				setTimeout(() => {
					loadSideMenuIconsOnly();
					loadHideSideMenuFavouriteButton();
				}, 2000);
				setTimeout(() => {
					loadSideMenuIconsOnly();
					loadHideSideMenuFavouriteButton();
				}, 10000);
			},
		});

		waitForAddedNode({
			query: 'faceplate-expandable-section-helper:has([aria-controls="moderation_section"])',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadRememberSideMenuSectionHiddenState();
			},
		});

		waitForAddedNode({
			query: 'faceplate-expandable-section-helper:has([aria-controls="multireddits_section"])',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadRememberSideMenuSectionHiddenState();
			},
		});

		waitForAddedNode({
			query: 'reddit-recent-pages',
			shadowRoot: true,
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				setTimeout(() => {
					loadRememberSideMenuSectionHiddenState();
				}, 500);
			},
		});

		waitForAddedNode({
			query: 'faceplate-expandable-section-helper:has([aria-controls="communities_section"])',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadRememberSideMenuSectionHiddenState();
			},
		});

		waitForAddedNode({
			query: 'faceplate-expandable-section-helper:has([aria-controls="RESOURCES"])',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadRememberSideMenuSectionHiddenState();
			},
		});

		waitForAddedNode({
			query: 'reddit-search-large',
			shadowRoot: true,
			parent: document.querySelector('body'),
			recursive: true,
			done: function (shadowRoot) {
				setTimeout(() => {
					loadHideNsfwInSearchResults();
					loadHideTrendingTodayInSearchResults();
					loadHideAiInSearch();
					loadHideLogoInSearch();
					loadReplaceSearchPlaceholderText();
				}, 1000);
			},
		});

		waitForAddedNode({
			query: 'shreddit-feed shreddit-post',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				setTimeout(() => {
					loadHideBlockedKeywordPosts();
					loadHideBlockedUserPosts();
					loadHideBlockedLinkPosts();
					loadMarkReadOnOpenExpandos();
				}, 500);
				loadShowPostNumbers();
				moveSortDropdown();
				loadFullWidthExpandos();
			},
		});

		waitForAddedNode({
			query: 'shreddit-post',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				setTimeout(() => {
					loadScalePostToFitImage();
					loadScalePostToFitVideo();
					loadImageScroll();
					loadReplacePostImagesWithLinks();
					loadReplacePostVideosWithLinks();
					loadShowMemberCount();
					loadAlwaysShowPostOptions();
					loadShowUpvoteRatio();
					loadHideAwards();
					loadShowPostAbsoluteTimestamp();
					loadNumberedPostImages();
					loadAutoplayVideos();
					loadAutoplayGifs();
					loadAutoplayCommentGifs();
					loadGalleryKeyboardNavigation();
				}, 500);
			},
		});

		waitForAddedNode({
			query: 'shreddit-post',
			parent: document.querySelector('body'),
			recursive: true,
			shadowRoot: true,
			shadowChild: '.rpl-vote-button-group',
			done: function (shadowRoot) {
				loadLeftSideVoteButtons();
			},
		});

		waitForAddedNode({
			query: 'search-telemetry-tracker:has(.post-credit-row)',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				setTimeout(() => {
					loadShowPostAbsoluteTimestamp();
				}, 500);
			},
		});

		waitForAddedNode({
			query: '[noun="insights"] div:last-child > div:first-child > div:first-child span',
			parent: document.querySelector('shreddit-subreddit-header'),
			recursive: true,
			done: function () {
				loadShowMemberCount();
			},
		});

		waitForAddedNode({
			query: 'shreddit-comment-tree',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				setTimeout(() => {
					loadBetterCommentBox();
					loadCompactPostLinkPreview();
					loadViewCrossposts();
					addBorderRadiusToShadowRootElements();
					loadAlwaysShowCommentOptions();
					loadHideAwards();
					loadShowCommentAbsoluteTimestamp();
					loadThemeAfterPageLoad();
					loadHidePostComments();
				}, 500);
				loadHideCommentKarma();
			},
		});

		waitForAddedNode({
			query: 'shreddit-comment-tree shreddit-comment',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				setTimeout(() => {
					loadFixThreadlinesForTranslucentPosts();
					loadMulticolouredThreadLines();
					loadHideBlockedKeywordComments();
				}, 2000);
				loadAutoLoadMoreComments();
			},
		});

		waitForAddedNode({
			query: 'shreddit-feed shreddit-profile-comment',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadAlwaysShowPostOptions();
				moveSortDropdown();
			},
		});

		waitForAddedNode({
			query: 'shreddit-comment[author="AutoModerator"]',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				loadAutoCollapseAutoModeratorComment();
			},
		});
	}

	// Common
	loadAutoExpandValue();
	// loadDarkModeAuto();
	loadHideNSFW();
	loadShowToTopButton();

	// Run again (make sure it loaded correctly)
	setTimeout(() => {
		loadShowToTopButton();
		loadSideMenuToggleButton();

		if (!document.querySelector('.re-header-menu reddit-sidebar-nav')) {
			loadAttachSideMenuHeader();
		}
	}, 5000);
}

// Wait for i18n to be ready before loading tweaks initially
i18nReady.then(() => {
	loadTweaks();
});

/* 
   Some tweaks don't run correctly until the page has fully loaded or been focused.
   This can happen when using "open link in new tab", so load the tweaks again when
   the tab is focused to ensure they are working.
 */
let focused_once = false;
window.onfocus = function () {
	if (!focused_once) {
		console.log('[RedditEnhancer] Tab focused, loading tweaks again.');
		loadTweaks();
		focused_once = true;
	}
};
