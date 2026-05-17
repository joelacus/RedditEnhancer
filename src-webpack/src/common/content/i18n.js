// ────────────────────────────────────────────────────────────────────────────
// Content / Internationalisation
// ────────────────────────────────────────────────────────────────────────────
//
// Initialises i18next for content scripts. Because Chrome MV3 blocks content-script
// fetch() requests to chrome-extension:// URLs from an injected web-page context,
// locale data is bundled directly with this module using webpack resource imports
// instead of being fetched from _locales/ at runtime.
//
// The native i18n API (chrome.i18n / browser.i18n) resolves by base key only, so
// the custom backend strips the ".message" suffix before looking up each entry.
// Fallback to English when a key is not present in the current locale.

import i18next from 'i18next';
import resourcesEN from '../../common/_locales/en/messages.json';

// ─── Native i18n backend backed by chrome.i18n / browser.i18n ────────────────

const i18nPlugin = {
	type: 'backend',
	name: 'nativeChromeFirefoxI18n',
	read(language, key, options = {}) {
		const baseKey = key.endsWith('.message') ? key.slice(0, -8) : key;
		const message = BROWSER_API.i18n.getMessage(baseKey);
		if (message !== '') return Promise.resolve(message);
		// Key missing in the current language — try English
		if (language !== 'en') {
			return BROWSER_API.i18n.getMessage(baseKey, ['en']);
		}
		return Promise.resolve(key);
	},
};

// ─── Bootstrap shared translation database from the English locale ────────────
//
// The locale JSON files use keys like "ExtensionName.message": "Reddit Enhancer".
// i18next stores them in its own namespace (default: "translation"), so we map
// each message file into { [lang]: { translation: { "Key": "Value" } } } and
// pass all loaded locales to i18next via the resources option. This fully
// initialises i18next without any network request, eliminating the Chrome MV3
// content-script fetch restriction entirely.

const ALL_LOCALES = ['en', 'en-GB', 'en-US', 'cs', 'de', 'es', 'es-MX', 'fi', 'fr', 'hu', 'it', 'nl', 'no', 'pl', 'pt', 'pt-BR', 'sv', 'uk'];
const CORE_NS = 'translation';

// Pre-load all known locale files from webpack's module graph so the
// resulting bundle carries the full translation catalogue for unlimited
// runtime language switching without any network round-trip.
function loadAllLocaleResources() {
	return ALL_LOCALES.reduce((acc, lang) => {
		acc[lang] = { [CORE_NS]: loadLocaleByKey(lang) };
		return acc;
	}, {});
}

function loadLocaleByKey(lang) {
	switch (lang) {
		case 'en':
			return resourcesEN;
		case 'en-GB':
			return require('../../common/_locales/en-GB/messages.json');
		case 'en-US':
			return require('../../common/_locales/en-US/messages.json');
		case 'cs':
			return require('../../common/_locales/cs/messages.json');
		case 'de':
			return require('../../common/_locales/de/messages.json');
		case 'es':
			return require('../../common/_locales/es/messages.json');
		case 'es-MX':
			return require('../../common/_locales/es-MX/messages.json');
		case 'fi':
			return require('../../common/_locales/fi/messages.json');
		case 'fr':
			return require('../../common/_locales/fr/messages.json');
		case 'hu':
			return require('../../common/_locales/hu/messages.json');
		case 'it':
			return require('../../common/_locales/it/messages.json');
		case 'nl':
			return require('../../common/_locales/nl/messages.json');
		case 'no':
			return require('../../common/_locales/no/messages.json');
		case 'pl':
			return require('../../common/_locales/pl/messages.json');
		case 'pt':
			return require('../../common/_locales/pt/messages.json');
		case 'pt-BR':
			return require('../../common/_locales/pt-BR/messages.json');
		case 'sv':
			return require('../../common/_locales/sv/messages.json');
		case 'uk':
			return require('../../common/_locales/uk/messages.json');
		default:
			return resourcesEN;
	}
}

// ─── Init i18n ──────────────────────────────────────────────────────────

let i18nPromise;

function initI18n() {
	if (i18nPromise) return i18nPromise;

	i18nPromise = new Promise((resolve) => {
		BROWSER_API.storage.sync.get(['language'], function (result) {
			let lang = typeof result.language === 'undefined' ? 'en' : result.language;
			console.log('[RedditEnhancer] Content script language:', result.language || 'en');

			i18next
				.use(i18nPlugin)
				.init({
					lng: lang,
					fallbackLng: 'en',
					// Load every supported locale from the module graph so runtime
					// language switching works without any network round-trip.
					resources: loadAllLocaleResources(),
					ns: [CORE_NS],
					defaultNS: CORE_NS,
					parseMissingKeyHandler: (key) => `[${key}]`, // still falls back to key when entirely unavailable
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
