/* ===== Restore Popup UI / Extension Theme ===== */

// Restore the extension colour theme.

export function restorePopupTheme() {
	BROWSER_API.storage.sync.get(['addonTheme', 'darkMode'], function (result) {
		if (typeof result.addonTheme == 'undefined') {
			if (result.darkMode === false) {
				setExtensionLightTheme();
			} else {
				setExtensionDarkTheme();
			}
		} else if (result.addonTheme == 'dark') {
			setExtensionDarkTheme();
		} else if (result.addonTheme == 'light') {
			setExtensionLightTheme();
		} else if (result.addonTheme == 'classic-light') {
			setExtensionClassicLightTheme();
		}
	});
	function setExtensionDarkTheme() {
		document.querySelector('body').classList.add('dark-theme');
		document.querySelector('#btn-extension-theme-dark').classList.add('active');
		console.log('Extension Theme: dark');
	}
	function setExtensionLightTheme() {
		document.querySelector('body').classList.add('light-theme');
		document.querySelector('#btn-extension-theme-light').classList.add('active');
		console.log('Extension Theme: light');
	}
	function setExtensionClassicLightTheme() {
		document.querySelector('body').classList.add('classic-light-theme');
		document.querySelector('#btn-extension-theme-classic-light').classList.add('active');
		console.log('Extension Theme: classic light');
	}
}
