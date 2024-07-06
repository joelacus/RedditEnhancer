/* ===== Popup / Inputs ===== */

import { export_backup } from './backup_config';

import './inputs/filter_version_select';
import './inputs/language_select';
import './inputs/search_filter';
import './inputs/reddit_version_redirect';
import './inputs/menu';
import './inputs/inputs_accessibility';
import './inputs/inputs_account_switcher';
import './inputs/inputs_background';
import './inputs/inputs_dark_mode';
import './inputs/inputs_expand_layout';
import './inputs/inputs_hide_elements';
import './inputs/inputs_productivity';
import './inputs/inputs_style';

// Button - Export Backup
document.querySelector('#btn-export-backup').addEventListener('click', function () {
	export_backup();
});

// Button - Import Backup
document.querySelector('#btn-import-backup').addEventListener('click', function () {
	BROWSER_API.runtime.sendMessage({ importBackupFile: true });
});

// Button - Version Changelog
document.querySelector('#extensionVersion').addEventListener('click', function () {
	const settingsPage = document.querySelector('#settings');
	settingsPage.style.display = 'none';
	const changelogPage = document.querySelector('#changelog');
	if (changelogPage.style.display === 'none') {
		changelogPage.style.display = 'flex';
	} else {
		changelogPage.style.display = 'none';
	}
	// Get changelog.txt
	const changelogFile = BROWSER_API.runtime.getURL('changelog.txt');
	// Fetch the file contents
	fetch(changelogFile, {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then((textContent) => {
			document.querySelector('#changelog span').innerText = textContent;
		})
		.catch((error) => {
			console.error('Error fetching the file:', error);
		});
});

// Button - Rate
document.querySelector('#btn-rate').addEventListener('click', function () {
	const browserType = getBrowserType();
	if (browserType === 'firefox') {
		window.open('https://addons.mozilla.org/firefox/addon/reddit-enhancer/', '_blank');
	} else if (browserType === 'edge') {
		window.open('https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk', '_blank');
	} else if (browserType === 'chrome' || browserType === 'opera' || browserType === 'unknown') {
		window.open('https://chromewebstore.google.com/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa', '_blank');
	}
});

function getBrowserType() {
	const test = (regexp) => {
		return regexp.test(navigator.userAgent);
	};
	if (test(/opr\//i) || !!window.opr) {
		return 'opera';
	} else if (test(/edg/i)) {
		return 'edge';
	} else if (test(/chrome|chromium|crios/i)) {
		return 'chrome';
	} else if (test(/firefox|fxios/i)) {
		return 'firefox';
	} /* else if (test(/safari/i)) {
	  return 'safari';
	}*/ else {
		return 'unknown';
	}
}

// Button - Settings
document.querySelector('#btn-settings').addEventListener('click', function () {
	const changelogPage = document.querySelector('#changelog');
	changelogPage.style.display = 'none';
	const settingsPage = document.querySelector('#settings');
	if (settingsPage.style.display === 'none') {
		settingsPage.style.display = 'flex';
	} else {
		settingsPage.style.display = 'none';
	}
});

// Button - Addon Theme
document.querySelector('#btn-addon-theme-dark').addEventListener('click', function (e) {
	document.querySelector('#btn-addon-theme-light').classList.remove('active');
	document.querySelector('#btn-addon-theme-classic-light').classList.remove('active');
	e.currentTarget.classList.add('active');
	document.querySelector('body').classList.remove('light-theme', 'classic-light-theme');
	BROWSER_API.storage.sync.set({ addonTheme: 'dark' });
});
document.querySelector('#btn-addon-theme-light').addEventListener('click', function (e) {
	document.querySelector('#btn-addon-theme-dark').classList.remove('active');
	document.querySelector('#btn-addon-theme-classic-light').classList.remove('active');
	e.currentTarget.classList.add('active');
	document.querySelector('body').classList.remove('classic-light-theme');
	document.querySelector('body').classList.add('light-theme');
	BROWSER_API.storage.sync.set({ addonTheme: 'light' });
});
document.querySelector('#btn-addon-theme-classic-light').addEventListener('click', function (e) {
	document.querySelector('#btn-addon-theme-dark').classList.remove('active');
	document.querySelector('#btn-addon-theme-light').classList.remove('active');
	e.currentTarget.classList.add('active');
	document.querySelector('body').classList.remove('light-theme');
	document.querySelector('body').classList.add('classic-light-theme');
	BROWSER_API.storage.sync.set({ addonTheme: 'classic-light' });
});

// Button - Shade
document.querySelector('#btn-shade').addEventListener('click', function (e) {
	document.querySelector('#btn-shade').style.display = 'none';
	document.querySelector('#btn-unshade').style.display = 'block';
	document.querySelector('body').style.height = '40px';
	document.querySelector('.top-menu-bar').style.display = 'none';
	document.querySelector('#start-page').style.display = 'none';
	document.querySelector('#main-menu').style.display = 'none';
	document.querySelector('.footer').style.display = 'none';
	document.querySelector('#settings').style.display = 'none';
});
document.querySelector('#btn-unshade').addEventListener('click', function (e) {
	document.querySelector('#btn-shade').style.display = 'block';
	document.querySelector('#btn-unshade').style.display = 'none';
	document.querySelector('body').style.height = '';
	document.querySelector('.top-menu-bar').style.display = '';
	document.querySelector('#start-page').style.display = '';
	document.querySelector('#main-menu').style.display = '';
	document.querySelector('.footer').style.display = '';
	document.querySelector('#settings').style.display = 'none';
});
