// ────────────────────────────────────────────────────────────────────────────
// Content Script: System Theme Detection
// Purpose: Accurately detect system theme via matchMedia (webpage context) and
//          persist it to extension storage so popup/options can use it as a
//          reliable source (fixes Firefox bug where matchMedia lies in
//          extension pages).
// ────────────────────────────────────────────────────────────────────────────

(() => {
	const getSystemTheme = () => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	// Persist the detected theme to extension storage
	const persistTheme = (theme) => {
		const target = typeof browser !== 'undefined' ? browser : chrome;
		if (target.storage && target.storage.local) {
			target.storage.local.set({ systemTheme: theme }).catch(() => {});
		}
	};

	// Initial store
	const initialTheme = getSystemTheme();
	persistTheme(initialTheme);

	// Update on system theme change
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		persistTheme(e.matches ? 'dark' : 'light');
	});
})();
