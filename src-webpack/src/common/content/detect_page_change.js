// ────────────────────────────────────────────────────────────────────────────
// Detect Page Title Change
// ────────────────────────────────────────────────────────────────────────────

// Detect page changes (search, user profile etc) and reapply tweaks.

import { init } from '../content_first/init';
import { loadTweaks } from './tweak_loader';
import { defaultSortOption } from '../content_first/functions/default_sort_option';
import { i18nReady } from './i18n';

// Detect mutation in page url
let oldHref = document.location.href;
const body = document.querySelector('body');
const observer = new MutationObserver((mutations) => {
	mutations.forEach(() => {
		if (oldHref !== document.location.href) {
			if (document.location.href.endsWith('#lightbox')) return;

			oldHref = document.location.href;

			console.log('[RedditEnhancer] Detected page change. Reloading tweaks.');

			if (document.querySelector('.re-scroll-to-comment-container')) {
				document.querySelector('.re-scroll-to-comment-container').remove();
			}

			defaultSortOption();

			waitForPageLoaded().then(() => {
				init();
				// Wait for i18next to be ready before loading tweaks to avoid
				// translation errors in clean_link, canned_messages, etc.
				i18nReady.then(() => {
					loadTweaks();
				});
			});
		}
	});
});

function waitForPageLoaded(timeoutMs = 3000) {
	return new Promise((resolve) => {
		const indicator = document.querySelector('navigation-indicator');

		if (!indicator?.shadowRoot) {
			setTimeout(resolve, 3000);
			return;
		}

		const root = indicator.shadowRoot;
		const selector = '.bg-global-orangered.transition-transform.animating-in';
		let finished = false;
		let timeoutId;
		let observer;

		const cleanup = () => {
			clearTimeout(timeoutId);
			if (observer) observer.disconnect();
		};

		const finish = () => {
			if (!finished) {
				finished = true;
				cleanup();
				setTimeout(resolve, 0);
			}
		};

		timeoutId = setTimeout(finish, timeoutMs);

		const waitForRemoval = () => {
			observer = new MutationObserver(() => {
				if (!root.querySelector(selector)) finish();
			});
			observer.observe(root, { childList: true, subtree: true });
			if (!root.querySelector(selector)) finish();
		};

		if (root.querySelector(selector)) {
			waitForRemoval();
		} else {
			observer = new MutationObserver(() => {
				if (root.querySelector(selector)) {
					observer.disconnect();
					waitForRemoval();
				}
			});
			observer.observe(root, { childList: true, subtree: true });
		}
	});
}

// Start observer
observer.observe(body, { childList: true, subtree: true });
