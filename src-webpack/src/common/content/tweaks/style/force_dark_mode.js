/**
 * Tweaks: Style - Force Reddit Dark Mode
 *
 * @name forceDarkMode
 * @description Force Reddit to use dark mode by replacing the theme-light class with theme-dark.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadForceDarkMode() {
	BROWSER_API.storage.sync.get(['forceDarkMode'], function (result) {
		if (result.forceDarkMode === true) forceDarkMode(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function forceDarkMode(value) {
	if (value) {
		enableForceDarkMode();
	}
}

// Enable Force Dark Mode
function enableForceDarkMode() {
	document.querySelector('html').classList.replace('theme-light', 'theme-dark');
	document.querySelector('html').classList.replace('theme-beta', 'theme-dark');
}
