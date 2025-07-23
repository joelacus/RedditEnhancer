/**
 * Tweaks: Productivity - Mark Post as Read on Opening Expandos in Compact View
 *
 * @name markReadOnOpenExpandos
 * @description Marks posts as read when opening expandos in compact view... as the name implies, similar to RES.
 * @see background.js, popup/inputs/inputs_productivity.js
 *
 * This function sends a markVisited message to background.js, which adds the post URL to the browser history using
 * the history.addUrl API. To do so, upon turning on the function, granting the browser history permission is required.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */
import { showBannerMessage } from '../../banner_message';

let flag = false;

/* === Run by Tweak Loader when the Page Loads === */
export function loadMarkReadOnOpenExpandos() {
	BROWSER_API.storage.sync.get(['markReadOnOpenExpandos'], function (result) {
		if (result.markReadOnOpenExpandos) markReadOnOpenExpandos(true);
	});
}

/* === Enable/Disable The Feature === */
export function markReadOnOpenExpandos(value) {
	if (value && redditVersion === 'newnew') {
		enableMarkReadOnOpenExpandos();
		const feedElement = document.querySelector('shreddit-feed');
		if (feedElement) {
			observer.observe(feedElement, { childList: true });
			console.debug('[RedditEnhancer] markReadOnOpenExpandos: Attached observer to watch for new posts');
		}
	} else {
		observer.disconnect();
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the change to take full effect.');
	}
}

// Enable Mark Post as Read on Opening Expandos in Compact View - RV3
function enableMarkReadOnOpenExpandos() {
	if (flag) return;
	flag = true;

	const posts = document.querySelectorAll('shreddit-post[view-type="compactView"]');
	for (const post of posts) {
		const url = window.location.origin + post.getAttribute('permalink');
		const expando = post.shadowRoot?.querySelector('.toggle__expando-button:not([disabled])');
		if (expando && expando.getAttribute('re-mark-read-on-open') !== '') {
			expando.addEventListener('click', () => {
				// Send a message to background.js, which has the permission to call history.addUrl()
				BROWSER_API.runtime
					.sendMessage({ actions: [{ action: 'markVisited', url: url }] })
					.then(function (response) {
						console.debug(`[RedditEnhancer] markReadOnOpenExpandos: Marking URL as visited: ${url}`);
					})
					.catch(function (error) {
						console.error(`[RedditEnhancer] markReadOnOpenExpandos: Error marking post as read: ${url}, `, error);
					});
			});
			expando.setAttribute('re-mark-read-on-open', '');
		}
	}

	flag = false;
}

// Observer for watching new posts in feed
const observer = new MutationObserver(
	debounce((mutations) => {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach((addedNode) => {
				if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
					enableMarkReadOnOpenExpandos();
				}
			});
		});
	}, 100)
);

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
