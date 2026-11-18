// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Extension Theme
// ────────────────────────────────────────────────────────────────────────────
// The theme UI is three mode buttons (Auto / Light / Dark) plus two theme
// menus. addonTheme stores the display mode, addonThemeLight and
// addonThemeDark store the theme id selected in each menu ('light' and
// 'dark' are the "Default" entries). See utilities/theme_list.js for the
// theme registry and the id resolution rules.

import { isDarkThemeId, resolvePageTheme } from '../../utilities/theme_list';

let mediaQueryListener = null;
let storageListener = null;
let waitingForCorrectTheme = false;
let themeTimeout = null;

// The display mode currently applied (set by every apply path below) so the
// theme menus can tell whether a pick should re-apply the body class
// instantly. Null until the theme is restored on load.
let displayedMode = null;

export function setDisplayedMode(mode) {
	displayedMode = mode;
}

// Apply theme class to body. Accepts a theme id from the registry.
export function applyThemeId(id) {
	const body = document.querySelector('body');
	body.classList.forEach((className) => {
		if (className.includes('theme')) body.classList.remove(className);
	});
	body.classList.add(`theme-${id}`);
}

// Read the theme ids selected in the light/dark theme menus
async function getMenuKeys() {
	if (typeof BROWSER_API === 'undefined') return {};
	try {
		return await BROWSER_API.storage.sync.get(['addonThemeLight', 'addonThemeDark']);
	} catch (e) {
		return {};
	}
}

// Resolve a display mode ('auto'/'light'/'dark') to the theme id selected in
// that mode's menu ('auto' follows the system preference) and apply it.
// displayedMode records the resolved mode so the theme menus can tell
// whether a pick should re-apply the body class instantly.
async function applyMode(mode) {
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const menuKeys = await getMenuKeys();
	const id = resolvePageTheme(mode, systemDark, menuKeys);
	applyThemeId(id);
	displayedMode = mode === 'auto' ? (systemDark ? 'dark' : 'light') : mode;
	return id;
}

// Get persisted system theme from storage (popup Firefox workaround only)
async function getPersistedSystemTheme() {
	if (typeof BROWSER_API === 'undefined') return null;
	try {
		const result = await BROWSER_API.storage.local.get('systemTheme');
		return result && result.systemTheme ? result.systemTheme : null;
	} catch (e) {
		return null;
	}
}

// Attach storage listener for system theme updates (popup Firefox only)
function attachStorageListener() {
	if (storageListener || typeof BROWSER_API === 'undefined' || IS_CHROME) return;
	storageListener = async (changes, areaName) => {
		if (areaName === 'local' && changes.systemTheme) {
			const newTheme = changes.systemTheme.newValue;
			if (document.querySelector('#btn-extension-theme-auto').classList.contains('active')) {
				// Re-resolve through the selected light/dark themes
				const menuKeys = await getMenuKeys();
				applyThemeId(resolvePageTheme('auto', newTheme === 'dark', menuKeys));
				displayedMode = newTheme;
			} // If popup is still hidden waiting for the correct theme, show it now
			if (waitingForCorrectTheme) {
				if (themeTimeout) {
					clearTimeout(themeTimeout);
					themeTimeout = null;
				}
				showPageBody(newTheme);
				waitingForCorrectTheme = false;
			}
		}
	};
	BROWSER_API.storage.onChanged.addListener(storageListener);
}

function detachStorageListener() {
	if (storageListener && typeof BROWSER_API !== 'undefined' && !IS_CHROME) {
		BROWSER_API.storage.onChanged.removeListener(storageListener);
		storageListener = null;
	}
	if (themeTimeout) {
		clearTimeout(themeTimeout);
		themeTimeout = null;
	}
}

// Show page body (popup only). The theme id or mode decides whether the dark
// html background set on the options page stays or is removed.
export function showPageBody(themeIdOrMode) {
	const body = document.querySelector('body');
	if (body.hasAttribute('style')) {
		body.removeAttribute('style');
	}
	if (!isDarkThemeId(themeIdOrMode)) document.querySelector('html').removeAttribute('style');
}

// Detect if we're in the popup (vs options page)
function isPopup() {
	return document.querySelector('body#popup') !== null;
}

// Enable Auto Theme
export async function enableAutoTheme() {
	if (IS_CHROME || !isPopup()) {
		// Chrome everywhere, and Firefox options page: direct matchMedia
		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		await applyMode('auto');
		showPageBody(systemDark ? 'dark' : 'light');
		if (mediaQueryListener) {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
		}
		mediaQueryListener = () => {
			applyMode('auto');
		};
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryListener);
	} else {
		// Firefox popup: use persisted system theme from content script
		const persisted = await getPersistedSystemTheme();
		if (persisted) {
			const menuKeys = await getMenuKeys();
			applyThemeId(resolvePageTheme('auto', persisted === 'dark', menuKeys));
			displayedMode = persisted;
			showPageBody(persisted);
		} else {
			// Fallback: apply temporary theme and keep hidden until storage updates
			const fallback = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			const menuKeys = await getMenuKeys();
			applyThemeId(resolvePageTheme('auto', fallback === 'dark', menuKeys));
			displayedMode = fallback;
			waitingForCorrectTheme = true;
			document.querySelector('body').setAttribute('style', 'display: none');
			// Timeout: show fallback after 500ms if storage hasn't updated
			themeTimeout = setTimeout(() => {
				if (waitingForCorrectTheme) {
					showPageBody(fallback);
					waitingForCorrectTheme = false;
					themeTimeout = null;
				}
			}, 500);
		}
		attachStorageListener();
	}
}

// Disable Existing Theme
export function disableExistingTheme() {
	document.querySelectorAll('.settings-theme .btn').forEach((btn) => {
		btn.classList.remove('active');
	});
	const body = document.querySelector('body');
	body.classList.forEach((className) => {
		if (className.includes('theme')) body.classList.remove(className);
	});
	displayedMode = null;
	if (mediaQueryListener) {
		window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
		mediaQueryListener = null;
	}
	detachStorageListener();
}

// Theme Buttons (Auto / Light / Dark)
document.querySelectorAll('[id^="btn-extension-theme"]').forEach((btn) => {
	btn.addEventListener('click', async function (e) {
		disableExistingTheme();
		e.currentTarget.classList.add('active');
		const mode = e.currentTarget.id.replace('btn-extension-theme-', '');
		waitingForCorrectTheme = false;
		if (themeTimeout) {
			clearTimeout(themeTimeout);
			themeTimeout = null;
		}
		if (mode === 'auto') {
			await enableAutoTheme();
		} else {
			const id = await applyMode(mode);
			showPageBody(id);
		}
		BROWSER_API.storage.sync.set({ addonTheme: mode });
	});
});

// Theme Menus (light / dark). Picking a theme saves the menu's key and, when
// the popup is currently displayed in that menu's mode, re-applies the body
// class immediately.
function setupThemeMenu(dropdownId, chosenId, storageKey, menuMode) {
	const dropdown = document.querySelector(dropdownId);
	if (!dropdown) return;
	const chosen = dropdown.querySelector(chosenId);
	const menu = dropdown.querySelector(dropdownId + '-menu');

	dropdown.querySelector('.select').addEventListener('click', function () {
		if (dropdown.classList.contains('active')) {
			dropdown.classList.remove('active');
			menu.style.maxHeight = '0';
			menu.style.overflowY = 'hidden';
		} else {
			dropdown.classList.add('active');
			menu.style.maxHeight = Math.min(menu.scrollHeight, 210) + 'px';
			setTimeout(() => {
				menu.style.overflowY = 'auto';
			}, 220);
		}
	});

	menu.querySelectorAll('li').forEach(function (item) {
		item.addEventListener('click', function () {
			const themeId = item.dataset.theme;
			chosen.textContent = item.textContent;
			dropdown.classList.remove('active');
			menu.style.maxHeight = '0';
			const keys = {};
			keys[storageKey] = themeId;
			BROWSER_API.storage.sync.set(keys);
			// Instant apply when the changed menu matches the displayed mode
			if (displayedMode === menuMode) applyThemeId(themeId);
		});
	});
}

setupThemeMenu('#select-theme-light', '#chosen-theme-light', 'addonThemeLight', 'light');
setupThemeMenu('#select-theme-dark', '#chosen-theme-dark', 'addonThemeDark', 'dark');
