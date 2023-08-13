/* ===== Popup / Internationalisation ===== */

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

// Load Language From Save
BROWSER_API.storage.sync.get(['language'], function (result) {
	if (typeof result.language == 'undefined') {
		console.log('Language: not set');
		auto();
	} else {
		console.log('Language: ' + result.language);
		const lang = document.querySelector('#' + result.language).textContent;
		document.querySelector('#chosen-lang').textContent = lang;
		init_i18n(result.language);
	}
});

// Init Translation
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
		if (result.redditVersion === 'new' || typeof result.redditVersion == 'undefined') {
			document.querySelector('#chosen-version').textContent = i18next.t('textNewReddit.message');
		} else {
			document.querySelector('#chosen-version').textContent = i18next.t('textOldReddit.message');
		}
	});
	document.getElementById('name').textContent = i18next.t('extensionName.message');
	document.getElementById('extensionVersion').textContent = i18next.t('extensionVersion.message');
	document.getElementById('input-custom-background').placeholder = i18next.t('textCustomBgInputPlaceholder.message');
	document.getElementById('search').placeholder = i18next.t('textSearch.message') + '...';

	document.querySelectorAll('[id^="text"]').forEach(function (item) {
		const id = item.id.replace(/\d+/g, '');
		item.textContent = i18next.t(id + '.message');
	});
}

// Auto translate if selected language save doesn't exist
function auto() {
	BROWSER_API.storage.sync.get(['redditVersion'], function (result) {
		if (result.redditVersion === 'new' || typeof result.redditVersion == 'undefined') {
			document.getElementById('chosen-version').textContent = BROWSER_API.i18n.getMessage('textNewReddit');
		} else {
			document.getElementById('chosen-version').textContent = BROWSER_API.i18n.getMessage('textOldReddit');
		}
	});
	document.getElementById('name').textContent = BROWSER_API.i18n.getMessage('extensionName');
	document.getElementById('extensionVersion').textContent = BROWSER_API.i18n.getMessage('extensionVersion');
	document.getElementById('input-custom-background').placeholder = BROWSER_API.i18n.getMessage('textCustomBgInputPlaceholder');
	document.getElementById('search').placeholder = BROWSER_API.i18n.getMessage('textSearch') + '...';

	document.querySelectorAll('[id^="text"]').forEach(function (item) {
		const id = item.id.replace(/\d+/g, '');
		item.textContent = BROWSER_API.i18n.getMessage(id);
	});
}
