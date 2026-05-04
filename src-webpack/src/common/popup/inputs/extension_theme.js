// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Extension Theme
// ────────────────────────────────────────────────────────────────────────────

let mediaQueryListener = null;
let storageListener = null;
let waitingForCorrectTheme = false;
let themeTimeout = null;

// Apply theme class to body
function applySystemTheme(theme) {
	const body = document.querySelector('body');
	body.classList.forEach((className) => {
		if (className.includes('theme')) body.classList.remove(className);
	});
	body.classList.add(`theme-${theme}`);
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
	storageListener = (changes, areaName) => {
		if (areaName === 'local' && changes.systemTheme) {
			const newTheme = changes.systemTheme.newValue;
			if (document.querySelector('#btn-extension-theme-auto').classList.contains('active')) {
				applySystemTheme(newTheme);
			}
			// If popup is still hidden waiting for the correct theme, show it now
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

// Show page body (popup only)
export function showPageBody(theme) {
	const body = document.querySelector('body');
	if (body.hasAttribute('style')) {
		body.removeAttribute('style');
	}
	if (theme !== 'dark') document.querySelector('html').removeAttribute('style');
}

// Detect if we're in the popup (vs options page)
function isPopup() {
	return document.querySelector('body#popup') !== null;
}

// Enable Auto Theme
export async function enableAutoTheme() {
	if (IS_CHROME || !isPopup()) {
		// Chrome everywhere, and Firefox options page: direct matchMedia
		const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		applySystemTheme(theme);
		showPageBody(theme);
		if (mediaQueryListener) {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
		}
		mediaQueryListener = () => {
			const newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			applySystemTheme(newTheme);
		};
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryListener);
	} else {
		// Firefox popup: use persisted system theme from content script
		const persisted = await getPersistedSystemTheme();
		if (persisted) {
			applySystemTheme(persisted);
			showPageBody(persisted);
		} else {
			// Fallback: apply temporary theme and keep hidden until storage updates
			const fallback = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			applySystemTheme(fallback);
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
	if (mediaQueryListener) {
		window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
		mediaQueryListener = null;
	}
	detachStorageListener();
}

// Theme Buttons
document.querySelectorAll('[id^="btn-extension-theme"]').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		disableExistingTheme();
		e.currentTarget.classList.add('active');
		const theme = e.currentTarget.id.replace('btn-extension-theme-', '');
		waitingForCorrectTheme = false;
		if (themeTimeout) {
			clearTimeout(themeTimeout);
			themeTimeout = null;
		}
		if (theme === 'auto') {
			enableAutoTheme();
		} else {
			applySystemTheme(theme);
			showPageBody();
		}
		BROWSER_API.storage.sync.set({ addonTheme: theme });
	});
});
