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

export function load_saves() {
	if (redditVersion === 'old') {
		loadModerniseOldReddit();
	} else if (redditVersion === 'new') {
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
		loadAutoExpandComments();
		loadAutoCollapseAutoModeratorComment();
	} else if (redditVersion === 'newnew') {
		//loadAddDownloadVideoButton();
		loadBionicReaderForComments();
		loadBionicReaderForPosts();
		loadScrollToNextRootComment();
		loadShowPostAuthor();
		loadShowPostFlair();
		loadAutoLoadMoreComments();
		// Auto Show Comment Formatting Options
		waitForAddedNode({
			query: 'comment-body-header',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				console.log('FOUND');
				//console.log(el);
				setTimeout(() => {
					loadAutoShowCommentFormattingOptions();
				}, 3000);
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
