/* ===== Content First - Tweak Loader - Old Reddit (V1) ===== */

// Start observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.
// Use this loader to apply tweaks before the page has finished loading (CSS tweaks).

import { waitForAddedNode } from './main_observer';
import { legacyObserversOld } from './legacy_observers';

import { loadAutoCollapseAutoModeratorComment } from '../../../content/tweaks/productivity/auto_collapse_automod_comment';
import { loadCustomBackground } from '../../../content/tweaks/background/custom_background';
import { loadCustomTheme } from '../../../content/tweaks/style/override_theme_colours';
import { loadExpandContent } from '../../../content/tweaks/resize_elements/expand_content';
import { loadHideGetNewReddit } from '../../../content/tweaks/hide_elements/hide_get_new_reddit';
import { loadHideHeaderSubBar } from '../../../content/tweaks/hide_elements/hide_header_sub_bar';
import { loadHideHomeSidebar } from '../../../content/tweaks/hide_elements/hide_sidebar';
import { loadHidePromotedPosts } from '../../../content/tweaks/hide_elements/hide_promoted';
import { loadHideRedditPremium } from '../../../content/tweaks/hide_elements/hide_reddit_premium';
import { loadHideSideMenuOld } from '../../../content/tweaks/hide_elements/hide_side_menu';
import { loadHideUsernameAndKarma } from '../../../content/tweaks/hide_elements/hide_username_and_karma';
import { loadLayoutCentre } from '../../../content/tweaks/resize_elements/layout_centre_and_offset';
import { loadResizeFont } from '../../../content/tweaks/font/resize_font';
import { loadPostFontWeight } from '../../../content/tweaks/font/font_weight';
import { loadStickySort } from '../../../content/tweaks/productivity/sticky_sort';
import { moderniseOldReddit } from '../../../content/tweaks/style/modernise_old_reddit';
import { loadHideHomeFeed } from '../../../content/tweaks/hide_elements/hide_home_feed';
import { loadScrollToNextRootComment, loadScrollToNextRootCommentPosition } from '../../../content/tweaks/productivity/scroll_to_next_root_comment';
import { loadCustomFonts } from "../../../content/tweaks/font/custom_fonts";
import { loadHideCommentKarma, loadHidePostKarma } from "../../../content/tweaks/hide_elements/hide_post_comment_karma";
import { loadHideVoteButtons } from "../../../content/tweaks/hide_elements/hide_vote_buttons";
import { loadHideCompactViewBlankThumbnails } from "../../../content/tweaks/hide_elements/hide_compact_view_blank_thumbnails";
import { loadHideCompactViewThumbnails } from "../../../content/tweaks/hide_elements/hide_compact_view_thumbnails";

export function tweakLoaderOld() {
	loadExpandContent();
	loadLayoutCentre();
	loadHideHomeSidebar();
	loadCustomBackground();
	loadCustomTheme();
	loadHideGetNewReddit();
	loadHideHeaderSubBar();
	loadHideUsernameAndKarma();
	loadHideSideMenuOld();
	loadHidePromotedPosts();
	moderniseOldReddit();
	loadResizeFont();
	loadHideHomeFeed();
	loadScrollToNextRootComment();
	loadScrollToNextRootCommentPosition();
	loadPostFontWeight();
	loadCustomFonts();
	loadHidePostKarma();
	loadHideCommentKarma();
	loadHideVoteButtons();
	loadHideCompactViewBlankThumbnails();
	loadHideCompactViewThumbnails();

	if (useLegacy) {
		legacyObserversOld();
	} else {
		loadHideRedditPremium();
	}

	// Body
	waitForAddedNode({
		query: 'body',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
				if (result.largerClassicPost === true) {
					document.body.classList.add('re-larger-classic-post');
				}
			});
		},
	});

	// Sticky Sort
	waitForAddedNode({
		query: '.tabmenu',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadStickySort();
		},
	});

	// Auto Collapse AutoModerator Comment
	waitForAddedNode({
		query: '.comment[data-author="AutoModerator"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadAutoCollapseAutoModeratorComment();
		},
	});
}
