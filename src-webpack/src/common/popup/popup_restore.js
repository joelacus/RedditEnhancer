/* ===== Popup / Restore ===== */

import { restorePopupAccessibilityOptions } from './restore/restore_accessibility';
import { restorePopupBackgroundOptions } from './restore/restore_background';
import { restorePopupDarkModeOptions } from './restore/restore_dark_mode';
import { restorePopupHideElementsOptions } from './restore/restore_hide_elements';
import { restorePopupProductivityOptions } from './restore/restore_productivity';
import { restorePopupRedditVersionOptions } from './restore/restore_reddit_version';
import { restorePopupResizeFeedOptions } from './restore/restore_resize_elements';
import { restorePopupStyleOptions } from './restore/restore_style';
import { restorePopupMediaOptions } from './restore/restore_media';
import { restorePopupTheme } from './restore/restore_extension_theme';
import { detectFirefoxVersion } from '../content_first/functions/detect_browser_version';
import { restorePopupFontOptions } from './restore/restore_font';
import { fetchLatestVersion } from './functions/check_for_updates';
import { restorePopupBlockOptions } from './restore/restore_block';

/* = Restore Tweak Options On Popup Load = */
window.onload = function () {
	restoreOptions();
	fetchLatestVersion();
};

/* = Restore Settings Function = */
function restoreOptions() {
	// Extension Theme
	restorePopupTheme();

	// Tweak Options
	restorePopupRedditVersionOptions();
	restorePopupBackgroundOptions();
	restorePopupDarkModeOptions();
	restorePopupStyleOptions();
	restorePopupMediaOptions();
	restorePopupProductivityOptions();
	restorePopupResizeFeedOptions();
	restorePopupHideElementsOptions();
	restorePopupFontOptions();
	restorePopupAccessibilityOptions();
	restorePopupBlockOptions();

	// Account Switcher
	/*BROWSER_API.storage.local.get(['accounts'], function (result) {
		console.log(result.accounts);
	});*/

	// Pre-Select Search Input
	document.querySelector('#search').focus();
}

/* = Check Firefox Version = */
if (CHECK_LEGACY_FIREFOX) {
	const firefox_outdated = detectFirefoxVersion();
	if (firefox_outdated) {
		console.log('Firefox version is below 121. Please update.');
		document.querySelector('#firefox-update-message').style.display = 'grid';
	}
}

/* = Highlight Menu Category Icon = */
export function highlightMenuIcon(category) {
	document.querySelectorAll(`.btn-${category} .menu-item-icon`).forEach((icon) => {
		icon.style.backgroundColor = 'var(--accent)';
	});
}

/* = Highlight Tweak Option Icon = */
export function highlightOptionIcon(category) {
	document.querySelectorAll(`.icon-${category}`).forEach((icon) => {
		icon.style.backgroundColor = 'var(--accent)';
	});
}
