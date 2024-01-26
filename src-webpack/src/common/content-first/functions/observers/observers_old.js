/* ===== Old Reddit Observers ===== */

import { waitForAddedNode } from './main_observer';
import { legacyObserversOld } from './legacy_observers';

import { loadHideRedditPremium } from '../hide_elements/load_hide_reddit_premium';
import { loadHideHomeSidebar } from '../hide_elements/load_hide_sidebar';
import { loadExpandContent } from '../expand-layout/load_expand_content';
import { loadLayoutCentre } from '../expand-layout/load_layout_centre_and_offset';
import { loadHideHeaderSubBar } from '../hide_elements/load_hide_header_sub_bar';
import { loadHideSideMenuOld } from '../hide_elements/load_hide_side_menu';
import { loadStickySort } from '../productivity/load_sticky_sort';
import { loadHideGetNewReddit } from '../hide_elements/load_hide_get_new_reddit';
import { loadHideUsernameAndKarma } from '../hide_elements/load_hide_username_and_karma';
import { moderniseOldReddit } from '../../../content/functions/style/modernise_old_reddit';
import { loadHidePromotedPosts } from '../hide_elements/load_hide_promoted';
import { loadCustomBackground } from '../style/load_custom_background';
import { loadCustomTheme } from '../style/load_custom_theme_colours';

// Load observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.

export function observersOld() {
	loadCustomBackground();
	loadCustomTheme();
	loadHideGetNewReddit();
	loadHideHeaderSubBar();
	loadHideUsernameAndKarma();
	loadHideSideMenuOld();
	loadHidePromotedPosts();
	moderniseOldReddit();
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
}
