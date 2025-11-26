/* ===== Popup / Inputs ===== */

// Event listeners for the popup and options page.

import './functions/accordion';
import './inputs/extension_theme';
import './inputs/filter_version_select';
import './inputs/colour_pickers';
import './inputs/inputs_accessibility';
import './inputs/inputs_account_switcher';
import './inputs/inputs_background';
import './inputs/inputs_block';
import './inputs/inputs_dark_mode';
import './inputs/inputs_resize_elements';
import './inputs/inputs_font';
import './inputs/inputs_hide_elements';
import './inputs/inputs_media';
import './inputs/inputs_productivity';
import './inputs/inputs_style';
import './inputs/language_select';
import './inputs/menu';
import './inputs/reddit_version_redirect';
import './inputs/search_filter';
import { export_backup } from './backup_config';
import { restorePopupTheme } from './restore/restore_extension_theme';
import { showChangelog } from './functions/show_changelog';
import { initTopCategoryMenu } from './functions/init_top_category_menu';

/* = Banner Message = */

// Close
document.querySelector('#firefox-update-message .close').addEventListener('click', function (e) {
	e.currentTarget.closest('.banner-message').style.display = 'none';
});
document.querySelector('#new-new-ui-message .close').addEventListener('click', function (e) {
	e.currentTarget.closest('.banner-message').style.display = 'none';
});

// Don't Show Again
document.querySelector('#new-new-ui-message .dont-show-again').addEventListener('click', function (e) {
	e.currentTarget.closest('.banner-message').style.display = 'none';
	localStorage.setItem('DontShowAgainNewNewUiMessage', true);
});

/* = Header = */

// Shade
if (document.querySelector('body#popup')) {
	// Button - Shade
	document.querySelector('#btn-shade').addEventListener('click', function (e) {
		document.querySelector('#btn-shade').style.display = 'none';
		document.querySelector('#btn-unshade').style.display = 'block';
		document.querySelector('body').style.height = '25px';
		document.querySelector('.menu-title-container').style.marginTop = '-4px';
		document.querySelector('.top-menu-bar').style.display = 'none';
		document.querySelector('#start-page').style.display = 'none';
		document.querySelector('#main-menu').style.display = 'none';
		document.querySelector('.footer').style.display = 'none';
		document.querySelector('#settings').style.display = 'none';
	});

	// Button - Unshade
	document.querySelector('#btn-unshade').addEventListener('click', function (e) {
		document.querySelector('#btn-shade').style.display = 'block';
		document.querySelector('#btn-unshade').style.display = 'none';
		document.querySelector('body').style.height = '';
		document.querySelector('.menu-title-container').style.marginTop = '';
		document.querySelector('.top-menu-bar').style.display = '';
		document.querySelector('#start-page').style.display = '';
		document.querySelector('#main-menu').style.display = '';
		document.querySelector('.footer').style.display = '';
		document.querySelector('#settings').style.display = 'none';
	});
}

// Top Category Menu
if (document.querySelector('body#popup')) {
	initTopCategoryMenu();
}

/* = Footer = */

// Button - Extension Settings
document.querySelector('#btn-settings').addEventListener('click', function () {
	if (document.querySelector('body#popup')) {
		document.querySelector('#changelog').style.display = 'none';
		const settingsPage = document.querySelector('#settings');
		if (settingsPage.style.display === 'none') {
			settingsPage.style.display = 'flex';
		} else {
			settingsPage.style.display = 'none';
		}
	} else {
		document.querySelector('#changelog').classList.add('hidden');
		document.querySelector('#settings').classList.remove('hidden');
		document.querySelectorAll('.options-page-menu-container .active').forEach((item) => {
			item.classList.remove('active');
		});
		document.querySelectorAll('#btn-settings').forEach((btn) => {
			btn.classList.add('active');
		});
		document.querySelectorAll('#main-menu .sub-list').forEach((sub) => {
			sub.classList.add('hidden');
		});
		restorePopupTheme();
	}
});

// Set Settings button as active on options page
if (document.querySelector('body#options-page')) {
	setTimeout(() => {
		document.querySelector('.side-menu #btn-settings').classList.add('active');
	}, 500);
}

// Button - Version Changelog
document.querySelectorAll('.btn-changelog').forEach((btn) => {
	btn.addEventListener('click', function () {
		showChangelog();
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

// Function - Get Browser Type
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

/* = Extension Settings = */

// Button - Reset Settings
document.querySelector('#btn-reset-settings').addEventListener('click', function () {
	document.querySelector('#btn-reset-settings').classList.add('hidden');
	document.querySelector('#btn-reset-settings-confirm').classList.remove('hidden');
	setTimeout(() => {
		document.querySelector('#btn-reset-settings').classList.remove('hidden');
		document.querySelector('#btn-reset-settings-confirm').classList.add('hidden');
	}, 10000);
});

// Button - Reset Settings Confirm
document.querySelector('#btn-reset-settings-confirm').addEventListener('click', function () {
	localStorage.clear();
	BROWSER_API.storage.sync.clear(function () {
		var error = BROWSER_API.runtime.lastError;
		if (error) {
			document.querySelector('#reset-settings-error-message').classList.remove('hidden');
		} else {
			document.querySelector('#reset-settings-cleared-message').classList.remove('hidden');
		}
	});
	document.querySelector('#btn-reset-settings-confirm').classList.add('hidden');
	setTimeout(() => {
		document.querySelector('#reset-settings-cleared-message').classList.add('hidden');
		document.querySelector('#reset-settings-error-message').classList.add('hidden');
		document.querySelector('#btn-reset-settings').classList.remove('hidden');
	}, 5000);
});

// Button - Export Backup
document.querySelector('#btn-export-backup').addEventListener('click', function () {
	export_backup();
});

// Button - Import Backup
document.querySelector('#btn-import-backup').addEventListener('click', function () {
	BROWSER_API.runtime.sendMessage({ importBackupFile: true });
});

// Button - Open Options Page
if (document.querySelector('body#popup')) {
	document.querySelector('#btn-open-options-page').addEventListener('click', function () {
		BROWSER_API.runtime.sendMessage({ openOptionsPage: true });
	});
}
