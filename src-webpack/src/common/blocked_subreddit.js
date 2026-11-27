// ────────────────────────────────────────────────────────────────────────────
// Blocked Subreddit Page
// ────────────────────────────────────────────────────────────────────────────
// Standalone extension page shown when a subreddit's page scope is blocked.
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import './blocked_subreddit.css';
import { applyPageTheme } from './utilities/theme_list.js';

const params = new URLSearchParams(window.location.search);
const subreddit = params.get('sub') || '';

const nameEl = document.querySelector('#blocked-subreddit-name');
if (subreddit) nameEl.textContent = 'r/' + subreddit;
else nameEl.hidden = true;

// The theme and language are read from storage rather than passed in the URL:
// the redirect happens in a content script, before any of this page's JS runs.
BROWSER_API.storage.sync.get(['language', 'addonTheme'], function (result) {
	const lang = typeof result.language !== 'undefined' ? result.language : 'en';
	applyPageTheme(result.addonTheme);
	init_i18n(lang);
});

function init_i18n(lng) {
	document.documentElement.lang = lng;
	i18next
		.use(HttpBackend)
		.init({
			lng: lng || 'en',
			fallbackLng: 'en',
			backend: {
				loadPath: '/_locales/{{lng}}/messages.json',
			},
			showSupportNotice: false,
		})
		.then(translate);
}

function translate() {
	document.querySelectorAll('[data-lang]').forEach(function (item) {
		const key = item.getAttribute('data-lang');
		if (key) item.textContent = i18next.t(key + '.message');
	});
}
