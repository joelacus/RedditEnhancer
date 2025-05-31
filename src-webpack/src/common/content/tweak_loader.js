/* ===== Content / Tweak Loader ===== */

// Applies certain tweaks after the page has loaded.

//import { loadAddDownloadVideoButton } from './functions/productivity/add_download_video_button';
import { loadAlwaysShowRisingButton } from './tweaks/productivity/always_show_rising';
import { loadAutoCollapseAutoModeratorComment } from './tweaks/productivity/auto_collapse_automod_comment';
import { loadAutoExpandComments } from './tweaks/productivity/auto_expand_comments';
import { loadAutoExpandValue } from './tweaks/resize_elements/auto_expand_value';
import { loadBionicReaderForComments, loadBionicReaderForPosts } from './tweaks/accessibility/bionic_reader';
import { loadBreakReminder } from './tweaks/productivity/break_reminder';
import { loadDarkModeAuto } from './tweaks/dark_mode/dark_mode';
import { loadFitImage } from './tweaks/media/scale_tall_images_to_fit_post';
import { loadHideNSFW } from './tweaks/hide_elements/hide_nsfw';
import { loadHideBlockedKeywordPosts } from './tweaks/block/block_posts_by_keyword';
import { loadHideOriginalScrollToTop } from './tweaks/hide_elements/hide_original_scroll_to_top';
import { loadHideSeeFullImage } from './tweaks/hide_elements/hide_see_full_image';
import { loadLimitInfinityScroll } from './tweaks/productivity/limit_infinity_scroll';
import { loadModerniseOldReddit } from './tweaks/style/modernise_old_reddit';
import { loadNewPlayer } from './tweaks/productivity/video_player';
import { loadOpenPostInNewTab } from './tweaks/productivity/open_post_links_in_new_tab';
import { loadOpenSubInNewTab } from './tweaks/productivity/open_sub_links_in_new_tab';
import { loadScrollToNextRootComment } from './tweaks/productivity/scroll_to_next_root_comment';
import { loadShowAllButton } from './tweaks/productivity/show_r_all_button';
import { loadShowControversialSortButton } from './tweaks/productivity/show_controversial_sort_button';
import { loadShowPostAuthor } from './tweaks/productivity/show_post_author';
import { loadShowPostFlair } from './tweaks/productivity/show_post_flair';
import { loadShowPostNumbers } from './tweaks/productivity/show_post_numbers';
import { loadShowToTopButton } from './tweaks/productivity/scroll_to_top';
import { loadSidemenuFeedTop } from './tweaks/productivity/sidemenu_feed_top';
import { loadTextPostScroll } from './tweaks/productivity/text_post_scroll';
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
import { loadAutoShowCommentFormattingOptions } from './tweaks/productivity/auto_show_comment_formatting_options';
import { addBorderRadiusToShadowRootElements } from './tweaks/style/border_radius';
import { loadAlwaysShowPostOptions } from './tweaks/productivity/always_show_post_options';
import { loadReplacePostImagesWithLinks } from './tweaks/media/replace_images_with_links';
import { loadReplacePostVideosWithLinks } from './tweaks/media/replace_videos_with_links';
import { loadCompactPostLinkPreview } from './tweaks/media/compact_post_link_preview';
import { loadUsernameHoverPopupDelay } from './tweaks/productivity/username_hover_popup_delay';
import { loadShowUpvoteRatio } from './tweaks/productivity/show_upvote_ratio';
import { loadAttachSideMenuHeader, loadSubredditDisplayNameBanner } from './tweaks/style/old_new_ui';
import { loadLeftSideVoteButtons } from './tweaks/style/left_side_vote_buttons';
import { setSubredditBackground } from "./tweaks/background/custom_background";

export function loadTweaks() {
	if (redditVersion === 'old') {
		loadModerniseOldReddit();
		loadAutoExpandComments();
		loadAutoLoadMoreComments();
		loadAddProfilePicturesToComments();
		loadSidebarToggleButton();
		loadHideBlockedKeywordPosts();
	} else if (redditVersion === 'new') {
		const link = window.location.href;
		if (link.indexOf('/comments/') >= 0) {
			loadAutoExpandComments();
			loadAutoLoadMoreComments();
			loadAutoCollapseAutoModeratorComment();

			waitForAddedNode({
				query: 'div.Post',
				parent: document.querySelector('body'),
				recursive: true,
				done: loadShowUpvoteRatio,
			});
		}
		loadAlwaysShowRisingButton();
		loadShowControversialSortButton();
		loadFitImage();
		loadHideSeeFullImage();
		loadSidemenuFeedTop();
		loadTextPostScroll();
		loadLimitInfinityScroll();
		loadHideOriginalScrollToTop();
		loadNewPlayer();
		loadOpenSubInNewTab();
		loadOpenPostInNewTab();
		loadShowAllButton();
		loadScrollToNextRootComment();
		loadBionicReaderForPosts();
		loadBionicReaderForComments();
		loadBreakReminder();
		loadHidePostKarma();
		loadHideCommentKarma();
		loadHideVoteButtons();

		waitForAddedNode({
			query: 'div[data-scroller-first]',
			parent: document.querySelector('ListingLayout-outerContainer'),
			recursive: true,
			done: function () {
				loadShowPostNumbers();
			},
		});
	} else if (redditVersion === 'newnew') {
		//loadAddDownloadVideoButton();
		loadBionicReaderForComments();
		loadBionicReaderForPosts();
		loadScrollToNextRootComment();
		loadShowPostAuthor();
		loadShowPostFlair();
		loadAutoLoadMoreComments();
		loadHidePostKarma();
		loadHideCommentKarma();
		loadHideVoteButtons();
		loadSideMenuToggleButton();
		loadUsernameHoverPopupDelay();
		loadSubredditDisplayNameBanner();
		setSubredditBackground();

		// Wait for elements to load on the page before loading tweaks.
		setTimeout(addBorderRadiusToShadowRootElements, 2000);

		waitForAddedNode({
			query: 'shreddit-app > faceplate-perfmetric-collector + div',
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
			},
		});

		waitForAddedNode({
			query: 'shreddit-comment-tree',
			parent: document.querySelector('body'),
			recursive: true,
			done: function () {
				setTimeout(() => {
					loadAutoShowCommentFormattingOptions();
					loadCompactPostLinkPreview();
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
	loadDarkModeAuto();
	loadHideNSFW();
	loadShowToTopButton();

	// Run again (make sure it loaded correctly)
	setTimeout(() => {
		loadShowToTopButton();
		loadShowAllButton();
		loadAttachSideMenuHeader();
	}, 5000);
}
loadTweaks();
