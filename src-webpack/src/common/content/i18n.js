// ────────────────────────────────────────────────────────────────────────────
// Content / Internationalisation
// ────────────────────────────────────────────────────────────────────────────
//
// Initialises i18next for content scripts. Uses the language saved in storage
// and loads translations from the _locales directory via runtime.getURL to
// ensure the correct extension-absolute path is used.

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

let i18nPromise;

function initI18n() {
	if (i18nPromise) return i18nPromise;

	i18nPromise = new Promise((resolve) => {
		BROWSER_API.storage.sync.get(['language'], function (result) {
			let lang = typeof result.language === 'undefined' ? 'en' : result.language;
			console.log('[RedditEnhancer] Content script language:', result.language || 'en');

			i18next
				.use(HttpBackend)
				.init({
					lng: lang,
					fallbackLng: 'en',
					backend: {
						loadPath: BROWSER_API.runtime.getURL('_locales/{{lng}}/messages.json'),
					},
				})
				.then(() => {
					console.log('[RedditEnhancer] i18next initialised for content scripts');
					resolve();
				})
				.catch((err) => {
					console.error('[RedditEnhancer] i18next initialisation error:', err);
					// Resolve anyway to avoid blocking tweak loading
					resolve();
				});
		});
	});

	return i18nPromise;
}

// Start initialisation immediately upon module load
const i18nReady = initI18n();

export { initI18n, i18nReady };
