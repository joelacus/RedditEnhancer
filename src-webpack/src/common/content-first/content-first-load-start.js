/* ===== Content First - Load Start ===== */

import { loadStyles } from './functions/load_styles';
import { loadCustomTheme } from './functions/load_custom_theme_colours';
import { loadHideUsernameAndKarma } from './functions/load_hide_username_and_karma';
import { loadCustomBackground } from './functions/load_custom_background';
import { loadHideGetNewReddit } from './functions/load_hide_get_new_reddit';
import { loadHideTurnOnNotificationsPopup } from './functions/load_hide_turn_on_notifications_popup';
import { loadHideHeaderBar } from './functions/load_hide_header_bar';
import { initClassNames } from './functions/init_class_names';
import './functions/load_custom_theme_colours';

// Start applying changes
export function loadStart() {
	// Add-on Style Prerequisite
	loadStyles();

	// Lost Custom Theme
	loadCustomTheme();

	// Hide Username And Karma
	loadHideUsernameAndKarma();

	// Custom Background + Blur
	loadCustomBackground();

	// Hide 'Get New Reddit'
	loadHideGetNewReddit();

	// "Turn On Notifications" Popup
	loadHideTurnOnNotificationsPopup();

	// Hide Header Bar
	loadHideHeaderBar();

	// Adds classnames and loads all other tweaks capable of running as the page is still loading
	initClassNames();
}
