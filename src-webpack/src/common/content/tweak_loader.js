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
import { loadFitImage } from './tweaks/productivity/scale_tall_images_to_fit_post';
import { loadHideNSFW } from './tweaks/hide_elements/hide_nsfw';
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
import { loadAutoShowCommentFormattingOptions } from './tweaks/productivity/auto_show_comment_formatting_options';
import { loadHidePostKarma } from './tweaks/hide_elements/hide_post_karma';
import { loadSideMenuIconsOnly } from './tweaks/hide_elements/side_menu_icons_only';
import { loadHideSideMenuFavouriteButton } from './tweaks/hide_elements/hide_side_menu_favourite_button';
import { loadSideMenuToggleButton } from './tweaks/hide_elements/side_menu_toggle_button';
import { loadHideNsfwInSearchResults, loadHideTrendingTodayInSearchResults } from './tweaks/hide_elements/hide_search_results_sections';
import { loadRememberSideMenuSectionHiddenState } from './tweaks/hide_elements/remember_side_menu_section_hidden_state';
import { loadAddProfilePicturesToComments } from './tweaks/productivity/add_profile_picture_to_comments';
import { loadCompactSubRuleList } from "./tweaks/style/old_new_ui";
import { addBorderRadiusToShadowRootElements } from "./tweaks/style/border_radius";

export function loadTweaks() {
	if (redditVersion === 'old') {
		loadModerniseOldReddit();
		loadAutoExpandComments();
		loadAutoLoadMoreComments();
		loadAddProfilePicturesToComments();
	} else if (redditVersion === 'new') {
		const link = window.location.href;
		if (link.indexOf('/comments/') >= 0) {
			loadAutoExpandComments();
			loadAutoLoadMoreComments();
			loadAutoCollapseAutoModeratorComment();
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
		loadShowPostNumbers();
		loadBreakReminder();
	} else if (redditVersion === 'newnew') {
		//loadAddDownloadVideoButton();
		loadBionicReaderForComments();
		loadBionicReaderForPosts();
		loadScrollToNextRootComment();
		loadShowPostAuthor();
		loadShowPostFlair();
		loadAutoLoadMoreComments();
		loadHidePostKarma();
		loadSideMenuToggleButton();
		loadCompactSubRuleList();

		// Wait for elements to load on the page before loading tweaks.
		waitForAddedNode({
			query: 'comment-body-header',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				setTimeout(() => {
					loadAutoShowCommentFormattingOptions();
					addBorderRadiusToShadowRootElements();
				}, 3000);
				setTimeout(() => {
					loadAutoShowCommentFormattingOptions();
					addBorderRadiusToShadowRootElements();
				}, 10000);
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
	}, 5000);
}
loadTweaks();
