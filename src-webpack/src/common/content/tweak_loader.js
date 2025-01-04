/* ===== Content / Load Tweaks ===== */

// Applies certain tweaks after the page has loaded.

//import { loadAddDownloadVideoButton } from './functions/productivity/add_download_video_button';
import { loadAlwaysShowRisingButton } from './functions/productivity/always_show_rising';
import { loadAutoCollapseAutoModeratorComment } from './functions/productivity/auto_collapse_automod_comment';
import { loadAutoExpandComments } from './functions/productivity/auto_expand_comments';
import { loadAutoExpandValue } from './functions/expand_feed_post/auto_expand_value';
import { loadBionicReaderForComments, loadBionicReaderForPosts } from './functions/accessibility/bionic_reader';
import { loadBreakReminder } from './functions/productivity/break_reminder';
import { loadDarkModeAuto } from './functions/dark_mode/dark_mode';
import { loadFitImage } from './functions/productivity/scale_tall_images_to_fit_post';
import { loadHideNSFW } from './functions/hide_elements/hide_nsfw';
import { loadHideOriginalScrollToTop } from './functions/hide_elements/hide_original_scroll_to_top';
import { loadHideSeeFullImage } from './functions/hide_elements/hide_see_full_image';
import { loadLimitInfinityScroll } from './functions/productivity/limit_infinity_scroll';
import { loadModerniseOldReddit } from './functions/style/modernise_old_reddit';
import { loadNewPlayer } from './functions/productivity/video_player';
import { loadOpenPostInNewTab } from './functions/productivity/open_post_links_in_new_tab';
import { loadOpenSubInNewTab } from './functions/productivity/open_sub_links_in_new_tab';
import { loadScrollToNextRootComment } from './functions/productivity/scroll_to_next_root_comment';
import { loadShowAllButton } from './functions/productivity/show_r_all_button';
import { loadShowControversialSortButton } from './functions/productivity/show_controversial_sort_button';
import { loadShowPostAuthor } from './functions/productivity/show_post_author';
import { loadShowPostFlair } from './functions/productivity/show_post_flair';
import { loadShowPostNumbers } from './functions/productivity/show_post_numbers';
import { loadShowToTopButton } from './functions/productivity/scroll_to_top';
import { loadSidemenuFeedTop } from './functions/productivity/sidemenu_feed_top';
import { loadTextPostScroll } from './functions/productivity/text_post_scroll';
import { loadAutoLoadMoreComments } from './functions/productivity/auto_load_more_comments';
import { waitForAddedNode } from '../content-first/functions/observers/main_observer';
import { loadAutoShowCommentFormattingOptions } from './functions/productivity/auto_show_comment_formatting_options';
import { loadHidePostKarma } from './functions/hide_elements/hide_post_karma';
import { loadSideMenuIconsOnly } from './functions/hide_elements/side_menu_icons_only';
import { loadHideSideMenuFavouriteButton } from './functions/hide_elements/hide_side_menu_favourite_button';
import { loadSideMenuToggleButton } from './functions/hide_elements/side_menu_toggle_button';
import { loadHideNsfwInSearchResults, loadHideTrendingTodayInSearchResults } from './functions/hide_elements/hide_search_results_sections';
import { loadRememberSideMenuSectionHiddenState } from './functions/productivity/remember_side_menu_section_hidden_state';
import { loadCompactSubRuleList } from './functions/style/compact_sub_rule_list';

export function load_saves() {
	if (redditVersion === 'old') {
		loadModerniseOldReddit();
		loadAutoExpandComments();
		loadAutoLoadMoreComments();
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
				}, 3000);
				setTimeout(() => {
					loadAutoShowCommentFormattingOptions();
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
load_saves();
