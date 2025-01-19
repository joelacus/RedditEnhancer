/* ===== Restore Popup UI / Reddit Version ===== */

import i18next from 'i18next';
import { filterShowOldVersion, initFilter } from '../inputs/filter_version_select';
import { filterShowNewVersion } from '../inputs/filter_version_select';
import { filterShowNewNewVersion } from '../inputs/filter_version_select';
import { initTopCategoryMenuAccordion } from '../functions/accordion';

// Restore UI settings for Auto Redirect and Version Filter options.

export function restorePopupRedditVersionOptions() {
	// Set Reddit Version Filter
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		if (typeof result.redditVersion != 'undefined') {
			if (result.redditVersion === 'old') {
				filterShowOldVersion();
				var value = 'old';
			} else if (result.redditVersion === 'new') {
				filterShowNewVersion();
				var value = 'new';
				if (localStorage.getItem('DontShowAgainOldNewUiWarning') === null) {
					document.querySelector('#old-new-ui-removal-message').style.display = 'grid';
				}
			} else if (result.redditVersion === 'newnew') {
				filterShowNewNewVersion();
				var value = 'newnew';
			}
		} else if (typeof result.redditVersion == 'undefined') {
			var value = 'choose';
			if (document.querySelector('body#popup')) {
				document.querySelector('#main-menu').classList.add('hidden');
				document.querySelector('#top-menu-accordion').classList.add('hidden');
				document.querySelectorAll('[id^="start-page"]').forEach((el) => {
					el.classList.remove('hidden');
				});
				document.querySelector('#old-reddit').addEventListener('click', hideStartPage);
				document.querySelector('#new-reddit').addEventListener('click', hideStartPage);
				document.querySelector('#newnew-reddit').addEventListener('click', hideStartPage);
			}
			document.querySelector('#chosen-version').textContent = 'Select';
			document.querySelector('#search').blur();
		}
		console.log('Selected Reddit Version: ' + value);
		initFilter();
	});

	// Auto Redirect To Version
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		if (result.autoRedirectVersion === 'newnew') {
			if (localStorage.getItem('DontShowAgainNewNewUiMessage') === null) {
				document.querySelector('#new-new-ui-message').style.display = 'grid';
			}
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('NewNewUI');
		} else if (result.autoRedirectVersion === 'old') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('OldUI');
		} else if (result.autoRedirectVersion === 'new') {
			if (localStorage.getItem('DontShowAgainOldNewUiWarning') === null) {
				document.querySelector('#old-new-ui-removal-message').style.display = 'grid';
			}
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('OldNewUI');
		} else if (result.autoRedirectVersion === 'off') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('Off');
		} else if (typeof result.redditVersion == 'undefined') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('Off');
			document.querySelector('#redirect-old-reddit').addEventListener('click', hideStartPage);
			document.querySelector('#redirect-new-reddit').addEventListener('click', hideStartPage);
			document.querySelector('#redirect-newnew-reddit').addEventListener('click', hideStartPage);
		}
	});
}

// Hide Start Page Elements
function hideStartPage() {
	document.querySelector('#top-menu-accordion').classList.remove('hidden');
	document.querySelector('#main-menu').classList.remove('hidden');
	document.querySelectorAll('[id^="start-page"]').forEach((el) => {
		el.classList.add('hidden');
	});
	initTopCategoryMenuAccordion();
}
