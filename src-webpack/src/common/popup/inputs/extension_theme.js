/* ===== Inputs / Extension Theme ===== */

// Theme Buttons
document.querySelectorAll('[id^="btn-extension-theme"]').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		disableExistingTheme();
		e.currentTarget.classList.add('active');
		const theme = e.currentTarget.id.replace('btn-extension-theme-', '');
		document.querySelector('body').classList.add(`theme-${theme}`);
		BROWSER_API.storage.sync.set({ addonTheme: theme });
	});
});

// Function - Disable Existing Theme
export function disableExistingTheme() {
	document.querySelectorAll('.settings-theme .btn').forEach((btn) => {
		btn.classList.remove('active');
	});
	const body = document.querySelector('body');
	body.classList.forEach((className) => {
		if (className.includes('theme')) {
			body.classList.remove(className);
		}
	});
}
