/* ===== Old Reddit Observers / Tweak Loader ===== */

// Load observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.

import { waitForAddedNode } from './main_observer';
import { legacyObserversOld } from './legacy_observers';

import { loadAutoCollapseAutoModeratorComment } from '../../../content/functions/productivity/auto_collapse_automod_comment';
import { loadCustomBackground } from '../../../content/functions/background/custom_background';
import { loadCustomTheme } from '../../../content/functions/style/override_theme_colours';
import { loadExpandContent } from '../../../content/functions/expand_feed_post/expand_content';
import { loadHideGetNewReddit } from '../../../content/functions/hide_elements/hide_get_new_reddit';
import { loadHideHeaderSubBar } from '../../../content/functions/hide_elements/hide_header_sub_bar';
import { loadHideHomeSidebar } from '../../../content/functions/hide_elements/hide_sidebar';
import { loadHidePromotedPosts } from '../../../content/functions/hide_elements/hide_promoted';
import { loadHideRedditPremium } from '../../../content/functions/hide_elements/hide_reddit_premium';
import { loadHideSideMenuOld } from '../../../content/functions/hide_elements/hide_side_menu';
import { loadHideUsernameAndKarma } from '../../../content/functions/hide_elements/hide_username_and_karma';
import { loadLayoutCentre } from '../../../content/functions/expand_feed_post/layout_centre_and_offset';
import { loadResizeFont } from '../../../content/functions/accessibility/resize_font';
import { loadStickySort } from '../../../content/functions/productivity/sticky_sort';
import { moderniseOldReddit } from '../../../content/functions/style/modernise_old_reddit';

export function observersOld() {
	loadCustomBackground();
	loadCustomTheme();
	loadHideGetNewReddit();
	loadHideHeaderSubBar();
	loadHideUsernameAndKarma();
	loadHideSideMenuOld();
	loadHidePromotedPosts();
	moderniseOldReddit();
	loadResizeFont();
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

	// Sidebar
	waitForAddedNode({
		query: '.side',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadHideHomeSidebar();
		},
	});

	// Main Content
	waitForAddedNode({
		query: '#siteTable',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadExpandContent();
			loadLayoutCentre();
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
