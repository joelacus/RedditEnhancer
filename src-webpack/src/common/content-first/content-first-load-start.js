/* ===== Content First - Load Start ===== */

import { loadStyles } from './functions/load_styles';
import { loadHideUsernameAndKarma } from './functions/load_hide_username_and_karma';
import { loadCustomBackground } from './functions/load_custom_background';
import { loadHideGetNewReddit } from './functions/load_hide_get_new_reddit';
import { initClassNames } from './functions/init_class_names';
import './functions/load_custom_theme_colours';

// Start applying changes
export function loadStart() {
	// Add-on Style Prerequisite
	loadStyles();

	// Hide Username And Karma
	loadHideUsernameAndKarma();

	// Custom Background + Blur
	loadCustomBackground();

	// Hide 'Get New Reddit'
	loadHideGetNewReddit();

	// Adds classnames and loads all other tweaks capable of running as the page is still loading
	initClassNames();
}
