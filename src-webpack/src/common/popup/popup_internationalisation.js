/* ===== Popup / Internationalisation ===== */

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

// Load Language From Save
BROWSER_API.storage.sync.get(['language'], function (result) {
	if (typeof result.language == 'undefined') {
		console.log('Language: not set');
		document.querySelector('#chosen-lang').textContent = 'English';
		init_i18n('en');
	} else {
		if (result.language === 'en-GB') {
			var langName = document.querySelector('#en').textContent;
			init_i18n('en-GB');
		} else {
			var langName = document.querySelector('#' + result.language).textContent;
			init_i18n(result.language);
		}
		console.log('Language: ' + result.language);
		document.querySelector('#chosen-lang').textContent = langName;
	}
});

// Init Internationalisation
export function init_i18n(lang) {
	i18next
		.use(HttpBackend)
		.init({
			lng: lang,
			fallbackLng: 'en',
			backend: {
				loadPath: '/_locales/{{lng}}/messages.json',
			},
		})
		.then(() => {
			translate();
		});
}

// Translate based on selected language
function translate() {
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		if (result.redditVersion === 'old') {
			document.querySelector('#chosen-version').textContent = i18next.t('Old.message');
		} else if (result.redditVersion === 'newnew') {
			document.querySelector('#chosen-version').textContent = i18next.t('Latest.message');
		} else {
			document.querySelector('#chosen-version').textContent = i18next.t('Select.message');
		}
	});
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		if (result.autoRedirectVersion === 'old') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('Old.message');
		} else if (result.autoRedirectVersion === 'newnew') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('Latest.message');
		} else {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('Off.message');
		}
	});
	document.getElementById('input-custom-background').placeholder = i18next.t('CustomBgInputPlaceholder.message');
	document.getElementById('search').placeholder = i18next.t('Search.message') + '...';

	document.querySelectorAll('[data-lang]').forEach(function (item) {
		const data_lang = item.getAttribute('data-lang');
		item.textContent = i18next.t(data_lang + '.message');
	});

	document.querySelectorAll('[data-lang-placeholder]').forEach(function (item) {
		const data_lang = item.getAttribute('data-lang-placeholder');
		item.placeholder = i18next.t(data_lang + '.message');
	});
}
