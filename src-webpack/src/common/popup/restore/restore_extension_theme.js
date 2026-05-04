// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Extension Theme
// ────────────────────────────────────────────────────────────────────────────

import { disableExistingTheme, enableAutoTheme, showPageBody } from '../inputs/extension_theme';

// Restore the extension colour theme.
export function restorePopupTheme() {
	BROWSER_API.storage.sync.get(['addonTheme'], function (result) {
		let theme = 'dark';
		if (result.addonTheme) {
			theme = result.addonTheme;
		}
		disableExistingTheme();

		if (theme === 'auto') {
			enableAutoTheme();
			document.querySelector('#btn-extension-theme-auto').classList.add('active');
			// Page visibility handled by enableAutoTheme based on storage availability
		} else {
			document.querySelector('body').classList.add(`theme-${theme}`);
			if (theme !== 'dark') document.querySelector('html').removeAttribute('style');
			document.querySelector(`#btn-extension-theme-${theme}`).classList.add('active');
			showPageBody();
		}

		console.log(`Extension Theme: ${theme}`);
	});
}
