/* ===== Inputs / Auto Redirect To Reddit Version ===== */

import i18next from 'i18next';
import { selectFilterShowNewNewVersion, selectFilterShowOldVersion } from './filter_version_select';

const redirect_dropdown = document.querySelector('#select-reddit-version');
const redirect_dropdownMenu = document.querySelector('#select-reddit-version-menu');

document.querySelector('#select-reddit-version .select').addEventListener('click', function () {
	if (redirect_dropdown.classList.contains('active')) {
		redirect_dropdown.classList.remove('active');
		redirect_dropdownMenu.style.maxHeight = '0';
	} else {
		redirect_dropdown.classList.add('active');
		redirect_dropdownMenu.style.maxHeight = redirect_dropdownMenu.scrollHeight + 'px';
	}
});

document.addEventListener('click', function (e) {
	if (!redirect_dropdown.contains(e.target)) {
		redirect_dropdown.classList.remove('active');
		redirect_dropdownMenu.style.maxHeight = '0';
	}
});

redirect_dropdownMenu.addEventListener('click', function (e) {
	const btn = e.target.tagName.toLowerCase();
	if (btn === 'li') {
		var version = e.target.getAttribute('data-version');
	}
	if (btn === 'span') {
		var version = e.target.parentNode.getAttribute('data-version');
	}
	if (version === 'old') {
		selectFilterShowOldVersion(i18next.t('OldUI.message'));
	} else if (version === 'newnew') {
		selectFilterShowNewNewVersion(i18next.t('NewNewUI.message'));
		if (localStorage.getItem('DontShowAgainNewNewUiMessage') === null) {
			document.querySelector('#new-new-ui-message').style.display = 'grid';
		}
	} else if (version === 'off') {
		selectFilterShowNewNewVersion(i18next.t('NewNewUI.message'));
	}
	document.querySelector('#select-reddit-version .select').querySelector('span').textContent = e.target.textContent;
	redirect_dropdown.classList.remove('active');
	redirect_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ autoRedirectVersion: version });
	BROWSER_API.runtime.sendMessage({ autoRedirectVersion: version });
});
