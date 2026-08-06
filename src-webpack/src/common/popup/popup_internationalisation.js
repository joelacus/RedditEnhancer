// ────────────────────────────────────────────────────────────────────────────
// Popup / Internationalisation
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';

// Bundle every locale into the popup so first paint never waits for an
// extension-URL fetch. require.context keeps the language list in one place:
// adding a new _locales/<lang>/messages.json file automatically includes it.
const localeContext = require.context('../_locales', true, /messages\.json$/);
const localeResources = localeContext.keys().reduce((resources, localePath) => {
	const match = localePath.match(/^\.\/([^/]+)\/messages\.json$/);
	if (match) resources[match[1]] = { translation: localeContext(localePath) };
	return resources;
}, {});

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
	try {
		if (i18next.isInitialized) {
			// All resources are already in memory, so this updates synchronously.
			i18next.changeLanguage(lang);
		} else {
			i18next.init({
				lng: lang,
				fallbackLng: 'en',
				resources: localeResources,
				initAsync: false,
			});
		}

		translate();
		document.documentElement.lang = lang.replace('_', '-');
	} catch (error) {
		console.error('Failed to initialise popup translations:', error);
	} finally {
		// Translation and theme restoration can finish in either order. Removing
		// this class only after translate() makes the first visible frame complete.
		document.body.classList.remove('i18n-pending');
	}
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
		} else if (result.autoRedirectVersion === 'latest' || result.autoRedirectVersion === 'newnew') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('Latest.message');
		} else if (result.autoRedirectVersion === 'old_www') {
			document.querySelector('#chosen-reddit-version').textContent = i18next.t('OldWww.message');
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
