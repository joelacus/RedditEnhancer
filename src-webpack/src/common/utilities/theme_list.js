// ────────────────────────────────────────────────────────────────────────────
// Utility / Theme List
// ────────────────────────────────────────────────────────────────────────────
// Every extension UI theme, shared by the popup theme menus and the pages
// that receive the theme through the URL (block manager, tag manager,
// restore page). Ids match the body classes in popup/css/themes.css
// (theme-<id>). Labels stay untranslated: theme names are proper nouns.
// Sources: catppuccin.com/palette, colorvio.com/nord-colors,
// draculatheme.com/spec (the light variant is Alucard Classic), the
// brayevalerien Monokai gist and rosepinetheme.com/palette.
// ────────────────────────────────────────────────────────────────────────────

export const THEME_LIST = [
	// The shipped themes. 'light' and 'dark' are the "Default" entries of
	// their menus and keep their original ids/classes.
	{ id: 'light', label: 'Default', mode: 'light' },
	{ id: 'dark', label: 'Default', mode: 'dark' },
	{ id: 'classic-light', label: 'Classic Light', mode: 'light' },
	{ id: 'grey', label: 'Grey', mode: 'light' },
	// Catppuccin
	{ id: 'catppuccin-latte', label: 'Catppuccin Latte', mode: 'light' },
	{ id: 'catppuccin-frappe', label: 'Catppuccin Frappé', mode: 'dark' },
	{ id: 'catppuccin-macchiato', label: 'Catppuccin Macchiato', mode: 'dark' },
	{ id: 'catppuccin-mocha', label: 'Catppuccin Mocha', mode: 'dark' },
	// Nord
	{ id: 'nord', label: 'Nord', mode: 'dark' },
	// Dracula
	{ id: 'dracula-light', label: 'Dracula Light', mode: 'light' },
	{ id: 'dracula', label: 'Dracula', mode: 'dark' },
	// Monokai Pro (Classic filter)
	{ id: 'monokai', label: 'Monokai', mode: 'dark' },
	// Rosé Pine
	{ id: 'rose-pine', label: 'Rosé Pine', mode: 'dark' },
	{ id: 'rose-pine-moon', label: 'Rosé Pine Moon', mode: 'dark' },
	{ id: 'rose-pine-dawn', label: 'Rosé Pine Dawn', mode: 'light' },
];

// The themes offered by the popup "Base Theme" dropdown. 'light', 'dark',
// 'classic-light' and 'grey' are the popup UI's own defaults, not Reddit
// base themes.
export const PRESET_THEME_LIST = THEME_LIST.filter((theme) => !['light', 'dark', 'classic-light', 'grey'].includes(theme.id));

export function isValidThemeId(id) {
	return THEME_LIST.some((theme) => theme.id === id);
}

export function isPresetThemeId(id) {
	return PRESET_THEME_LIST.some((theme) => theme.id === id);
}

// Label shown for a theme id in the menus (also used for the dropdown
// captions). Unknown ids fall back to the default dark theme's label.
export function themeLabel(id) {
	const theme = THEME_LIST.find((theme) => theme.id === id);
	return theme ? theme.label : 'Default';
}

// Whether a theme id (or a bare 'light'/'dark' mode string, which are also
// the default themes' ids) paints the UI dark. Drives showPageBody(), which
// keeps the dark html background behind the options page unless the theme
// is light.
export function isDarkThemeId(id) {
	const theme = THEME_LIST.find((theme) => theme.id === id);
	return theme ? theme.mode === 'dark' : false;
}

// Old addonTheme values were a single theme id ('classic-light'/'grey' were
// theme picks, 'light'/'dark'/'auto' were modes). Splits a value into the new
// format: the display mode plus the theme each menu should show when the
// stored menu keys are absent.
export function splitAddonTheme(theme) {
	if (theme === 'auto' || theme === 'light') return { mode: theme, lightTheme: 'light', darkTheme: 'dark' };
	if (theme === 'dark') return { mode: 'dark', lightTheme: 'light', darkTheme: 'dark' };
	if (theme === 'classic-light' || theme === 'grey') return { mode: 'light', lightTheme: theme, darkTheme: 'dark' };
	return { mode: 'dark', lightTheme: 'light', darkTheme: 'dark' };
}

// Resolves a URL theme param (block manager, tag manager, restore page) to a
// theme id: a mode picks the theme selected in that mode's menu, 'auto'
// follows the system preference, legacy raw ids pass through and anything
// unknown falls back to the default dark theme. Pure: pages pass the menu
// keys they read from storage and their matchMedia result.
export function resolvePageTheme(theme, systemDark, menuKeys) {
	const lightTheme = (menuKeys && menuKeys.addonThemeLight) || 'light';
	const darkTheme = (menuKeys && menuKeys.addonThemeDark) || 'dark';
	if (theme === 'auto') return systemDark ? darkTheme : lightTheme;
	if (theme === 'light') return lightTheme;
	if (theme === 'dark') return darkTheme;
	if (isValidThemeId(theme)) return theme;
	return 'dark';
}

// Applies the resolved theme class to a page body. The pages import
// themes.css, which defines the theme-<id> custom properties.
export async function applyPageTheme(param) {
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const menuKeys = await new Promise((resolve) => BROWSER_API.storage.sync.get(['addonThemeLight', 'addonThemeDark'], resolve));
	document.querySelector('body').classList.add('theme-' + resolvePageTheme(param, systemDark, menuKeys));
}
