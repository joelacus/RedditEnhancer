/* ===== New New Reddit Observers ===== */

import { waitForAddedNode } from './main_observer';

import { loadHideHeaderBar } from '../hide_elements/load_hide_header_bar';
import { loadHideAdvertiseButton, loadHideChatButton, loadHideCreatePostButton, loadHideNotificationButton } from '../hide_elements/load_hide_header_buttons';
import { loadHideSideMenu } from '../hide_elements/load_hide_side_menu';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHideRelatedPostsSection, loadHideSubSidebarException, loadHideUserSidebar } from '../hide_elements/load_hide_sidebar';
import { loadRemovePageSideMargin } from '../expand-layout/load_remove_page_side_margin';
import { loadHideSideMenuSections } from '../hide_elements/load_hide_side_menu_sections';
import { loadExpandContent } from '../expand-layout/load_expand_content';
import { loadLayoutOffset } from '../expand-layout/load_layout_centre_and_offset';
import { loadHidePromotedPosts } from '../hide_elements/load_hide_promoted';
import { loadScrollToNextRootCommentPosition } from '../productivity/load_scroll_to_next_root_comment';
import { loadHideGap } from '../hide_elements/load_hide_gap';
import { loadResizeFont } from '../style/load_resize_font';
import { loadBionicReaderColours } from '../accessibility/load_bionic_reader';
import { loadCustomBackground } from '../style/load_custom_background';
import { loadCustomTheme } from '../style/load_custom_theme_colours';
import { loadHideUserProfilePics } from '../hide_elements/load_hide_user_profile_pics';
import { loadAutoExpandComments } from '../productivity/load_auto_expand_comments';
import { loadImageScroll } from '../productivity/load_scroll_tall_images';
import { loadNonStickyHeaderBar } from '../productivity/load_non_sticky_header_bar';
import { loadHidePostHiddenMessage } from '../hide_elements/load_hide_post_hidden_message';
import { loadAlwaysShowPostOptions } from '../productivity/load_always_show_post_options';
//import { loadScalePostToFitImage } from '../productivity/load_scale_post_to_fit_image';
//import { loadDragImageToResize } from '../productivity/load_scale_image_on_drag';

// Load observers to wait for elements to load before tweaking, or load the tweak directly if an observer is not needed.

export function observersNewNew() {
	loadCustomBackground();
	loadCustomTheme();
	loadHideSideMenu();
	loadHideHomeSidebar();
	loadHideSubSidebarException();
	loadHidePostSidebar();
	loadHideRelatedPostsSection();
	loadHideUserSidebar();
	loadHideHeaderBar();
	loadHideNotificationButton();
	loadHideCreatePostButton();
	loadHideChatButton();
	loadHideAdvertiseButton();
	loadRemovePageSideMargin();
	loadHideSideMenuSections();
	loadExpandContent();
	loadLayoutOffset();
	loadHidePromotedPosts();
	loadScrollToNextRootCommentPosition();
	loadHideGap();
	loadResizeFont();
	loadBionicReaderColours();
	loadHideUserProfilePics();
	loadAutoExpandComments();
	loadImageScroll();
	loadNonStickyHeaderBar();
	loadHidePostHiddenMessage();

	waitForAddedNode({
		query: 'shreddit-post',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			loadAlwaysShowPostOptions();
		},
	});
	//loadScalePostToFitImage();
	//loadDragImageToResize();
}
