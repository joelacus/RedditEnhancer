/* ===== Restore Popup UI / Extension Theme ===== */

import { disableExistingTheme } from '../inputs/extension_theme';

// Restore the extension colour theme.
export function restorePopupTheme() {
	BROWSER_API.storage.sync.get(['addonTheme'], function (result) {
		let theme = 'dark';
		if (result.addonTheme) {
			theme = result.addonTheme;
		}
		disableExistingTheme();
		document.querySelector('body').classList.add(`theme-${theme}`);
		document.querySelector(`#btn-extension-theme-${theme}`).classList.add('active');
		console.log(`Extension Theme: ${theme}`);
	});
}
