/* ===== Content / Tweak Loader ===== */

// Applies certain tweaks after the page has loaded.

import { loadAddDownloadVideoButton } from './tweaks/media/add_download_video_button';
import { loadAutoCollapseAutoModeratorComment } from './tweaks/productivity/auto_collapse_automod_comment';
import { loadAutoExpandValue } from './tweaks/resize_elements/auto_expand_value';
import { loadBionicReader } from './tweaks/accessibility/bionic_reader';
//import { loadBreakReminder } from './tweaks/productivity/break_reminder';
//import { loadDarkModeAuto } from './tweaks/dark_mode/dark_mode';
import { loadHideNSFW } from './tweaks/hide_elements/hide_nsfw';
import { loadHideBlockedKeywordPosts } from './tweaks/block/block_posts_by_keyword';
//import { loadLimitInfinityScroll } from './tweaks/productivity/limit_infinity_scroll';
import { loadModerniseOldReddit } from './tweaks/style/modernise_old_reddit';
import { loadOpenPostInNewTab } from './tweaks/productivity/open_post_links_in_new_tab';
import { loadOpenSubInNewTab } from './tweaks/productivity/open_sub_links_in_new_tab';
import { loadScrollToNextRootComment } from './tweaks/productivity/scroll_to_next_root_comment';
import { loadShowPostAuthor } from './tweaks/productivity/show_post_author';
import { loadShowPostFlair } from './tweaks/productivity/show_post_flair';
import { loadShowPostNumbers } from './tweaks/productivity/show_post_numbers';
import { loadShowToTopButton } from './tweaks/productivity/scroll_to_top';
import { loadAutoLoadMoreComments } from './tweaks/productivity/auto_load_more_comments';
import { waitForAddedNode } from '../content_first/functions/tweak_loaders/main_observer';
import { loadHidePostKarma, loadHideCommentKarma } from './tweaks/hide_elements/hide_post_comment_karma';
import { loadSideMenuIconsOnly } from './tweaks/hide_elements/side_menu_icons_only';
import { loadHideSideMenuFavouriteButton } from './tweaks/hide_elements/hide_side_menu_favourite_button';
import { loadSideMenuToggleButton } from './tweaks/hide_elements/side_menu_toggle_button';
import { loadHideNsfwInSearchResults, loadHideTrendingTodayInSearchResults } from './tweaks/hide_elements/hide_search_results_sections';
import { loadRememberSideMenuSectionHiddenState } from './tweaks/hide_elements/remember_side_menu_section_hidden_state';
import { loadAddProfilePicturesToComments } from './tweaks/productivity/add_profile_picture_to_comments';
import { loadHideVoteButtons } from './tweaks/hide_elements/hide_vote_buttons';
import { loadSidebarToggleButton } from './tweaks/hide_elements/sidebar_toggle_button';
import { loadScalePostToFitImage } from './tweaks/media/scale_post_to_fit_image';
import { loadImageScroll } from './tweaks/media/scroll_images';
import { loadScalePostToFitVideo } from './tweaks/media/scale_post_to_fit_video';
import { loadFixThreadlinesForTranslucentPosts } from './tweaks/style/override_theme_colours';
import { loadMulticolouredThreadLines } from './tweaks/style/multicoloured_threadlines';
import { loadBetterCommentBox } from './tweaks/productivity/better_comment_box';
import { addBorderRadiusToShadowRootElements } from './tweaks/style/border_radius';
import { loadAlwaysShowPostOptions } from './tweaks/productivity/always_show_post_options';
import { loadReplacePostImagesWithLinks } from './tweaks/media/replace_images_with_links';
import { loadReplacePostVideosWithLinks } from './tweaks/media/replace_videos_with_links';
import { loadCompactPostLinkPreview } from './tweaks/media/compact_post_link_preview';
import { loadUsernameHoverPopupDelay } from './tweaks/productivity/username_hover_popup_delay';
import { loadShowUpvoteRatio } from './tweaks/productivity/show_upvote_ratio';
import { loadAttachSideMenuHeader, loadSubredditDisplayNameBanner, moveSortDropdown } from './tweaks/style/old_new_ui';
import { loadLeftSideVoteButtons } from './tweaks/style/left_side_vote_buttons';
import { loadViewCrossposts } from "./tweaks/productivity/view_crossposts";
import { loadMarkReadOnOpenExpandos } from "./tweaks/productivity/mark_read_on_open_expandos";
import { loadHideAwards } from "./tweaks/hide_elements/hide_awards";
import { loadHighlightOP } from "./tweaks/productivity/highlight_op";

export function loadTweaks() {
	if (redditVersion === 'old') {
		loadModerniseOldReddit();
		loadAutoLoadMoreComments();
		loadAddProfilePicturesToComments();
		loadSidebarToggleButton();
		loadHideBlockedKeywordPosts();
	} else if (redditVersion === 'newnew') {
		loadAddDownloadVideoButton();
		loadBionicReader();
		loadScrollToNextRootComment();
		loadShowPostAuthor();
		loadShowPostFlair();
		loadHidePostKarma();
		loadHideCommentKarma();
		loadHideVoteButtons();
		loadSideMenuToggleButton();
		loadUsernameHoverPopupDelay();
		loadSubredditDisplayNameBanner();
		loadOpenPostInNewTab();
		loadOpenSubInNewTab();

		// Wait for elements to load on the page before loading tweaks.
		setTimeout(addBorderRadiusToShadowRootElements, 2000);

		waitForAddedNode({
			query: 'flex-left-nav-container, #left-sidebar-container',
			parent: document.querySelector('body'),
			done: () => {
				loadAttachSideMenuHeader();
			},
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
				}, 500);
				loadShowPostNumbers();
				loadMarkReadOnOpenExpandos();
				moveSortDropdown();
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
					loadLeftSideVoteButtons();
				}, 500);
				loadAlwaysShowPostOptions();
				loadShowUpvoteRatio();
				loadHideAwards();
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
					loadAlwaysShowPostOptions();
					loadHighlightOP();
					loadHideAwards();
				}, 500);
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
			},
		})

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
		loadAttachSideMenuHeader();
		loadLeftSideVoteButtons();
	}, 5000);
}
loadTweaks();
