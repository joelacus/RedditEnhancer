// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Extension Theme
// ────────────────────────────────────────────────────────────────────────────

import { disableExistingTheme, enableAutoTheme, showPageBody, applyThemeId, setDisplayedMode } from '../inputs/extension_theme';
import { splitAddonTheme, themeLabel } from '../../utilities/theme_list';

// Restore the extension colour theme.
export function restorePopupTheme() {
	BROWSER_API.storage.sync.get(['addonTheme', 'addonThemeLight', 'addonThemeDark'], function (result) {
		// addonTheme holds the display mode and addonThemeLight/addonThemeDark
		// the theme selected in each menu. Older builds stored a single value
		// that could also be a theme id ('classic-light', 'grey'): split it
		// into the new format and write the normalized keys back.
		const split = splitAddonTheme(result.addonTheme || 'dark');
		const mode = split.mode;
		const lightTheme = result.addonThemeLight || split.lightTheme;
		const darkTheme = result.addonThemeDark || split.darkTheme;

		const needsNormalisation = (result.addonTheme && result.addonTheme !== mode) || (result.addonTheme && (!result.addonThemeLight || !result.addonThemeDark));
		if (needsNormalisation) {
			BROWSER_API.storage.sync.set({ addonTheme: mode, addonThemeLight: lightTheme, addonThemeDark: darkTheme });
		}

		// Dropdown captions. Not translated (theme names are proper nouns),
		// so nothing re-runs after this to overwrite them.
		document.querySelector('#chosen-theme-light').textContent = themeLabel(lightTheme);
		document.querySelector('#chosen-theme-dark').textContent = themeLabel(darkTheme);

		disableExistingTheme();

		if (mode === 'auto') {
			document.querySelector('#btn-extension-theme-auto').classList.add('active');
			enableAutoTheme();
			// displayedMode is set by enableAutoTheme once the system theme is known
		} else {
			const id = mode === 'light' ? lightTheme : darkTheme;
			applyThemeId(id);
			showPageBody(id);
			document.querySelector(`#btn-extension-theme-${mode}`).classList.add('active');
			setDisplayedMode(mode);
		}

		console.log(`Extension Theme: ${mode} (light: ${lightTheme}, dark: ${darkTheme})`);
	});
}
