/* ===== Popup / Restore ===== */

import i18next from 'i18next';
import { restorePopupAccessibilityOptions } from './restore/restore_accessibility';
import { restorePopupBackgroundOptions } from './restore/restore_background';
import { restorePopupDarkModeOptions } from './restore/restore_dark_mode';
import { restorePopupHideElementsOptions } from './restore/restore_hide_elements';
import { restorePopupProductivityOptions } from './restore/restore_productivity';
import { restorePopupRedditVersionOptions } from './restore/restore_reddit_version';
import { restorePopupResizeFeedOptions } from './restore/restore_resize_elements';
import { restorePopupStyleOptions } from './restore/restore_style';
import { restorePopupTheme } from './restore/restore_extension_theme';
import { detectFirefoxVersion } from '../content_first/functions/detect_browser_version';
import { restorePopupFontOptions } from './restore/restore_font';
const semver = require('semver');

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
	restorePopupProductivityOptions();
	restorePopupResizeFeedOptions();
	restorePopupHideElementsOptions();
	restorePopupFontOptions();
	restorePopupAccessibilityOptions();

	// Account Switcher
	/*BROWSER_API.storage.local.get(['accounts'], function (result) {
		console.log(result.accounts);
	});*/

	// Pre-Select Search Input
	document.querySelector('#search').focus();
}

/* = Check For Latest Extension Version = */
async function fetchLatestVersion() {
	const fetchURL = 'https://raw.githubusercontent.com/joelacus/RedditEnhancer/refs/heads/main/changelog.txt';
	return new Promise((resolve, reject) => {
		BROWSER_API.runtime.sendMessage(
			{
				actions: [{ action: 'changeFetchUrl', newFetchUrl: fetchURL }, { action: 'fetchData' }],
			},
			function (response) {
				if (response) {
					setTimeout(() => {
						const latestVersion = response.data.split('\n')[0].split(' ')[1];
						const installedVersion = i18next.t('extensionVersion.message');
						console.log('Installed Version: ' + installedVersion + ' Latest Version: ' + latestVersion);
						if (semver.gt(latestVersion, installedVersion)) {
							document.querySelector('#new-update').classList.remove('hidden');
							const message = document.querySelector('#new-update-message').innerText;
							const messageWithVersion = message.replace('<version>', latestVersion);
							document.querySelector('#new-update-message').innerText = messageWithVersion;
							document.querySelector('#new-update-message').classList.remove('hidden');
							document.querySelector('#changelog .log').innerText = response.data;
						}
					}, 3000);
				}
			}
		);
	});
}

/* = Check Firefox Version = */
if (CHECK_LEGACY_FIREFOX) {
	const useLegacy = detectFirefoxVersion();
	if (useLegacy) {
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
