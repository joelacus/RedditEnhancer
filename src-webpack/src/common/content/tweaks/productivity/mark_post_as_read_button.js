/**
 * Tweaks: Productivity - Mark Post as Read
 *
 * @name markPostsAsRead
 * @description Adds a new button to mark the posts as read, works in compact and card view.
 * @see background.js, popup/inputs/inputs_productivity.js
 *
 * This function sends a markVisited message to background.js, which adds the post URL to the browser history using
 * the history.addUrl API. To do so, upon turning on the function, granting the browser history permission is required.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';

/* === Run by Tweak Loader when the Page Loads === */
export function loadMarkPostAsReadButton() {
	BROWSER_API.storage.sync.get(['markPostAsReadButton'], function (result) {
		if (result.markPostAsReadButton) markPostAsReadButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function markPostAsReadButton(value) {
	if (value && redditVersion === 'newnew') {
		enableMarkPostAsReadButton();
		const feedElement = document.querySelector('shreddit-feed');
		if (feedElement) {
			observer.observe(feedElement, { childList: true });
			console.debug('[RedditEnhancer] markPostAsReadButton: Attached observer to watch for new posts');
		}
	} else {
		observer.disconnect();
		showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the change to take full effect.');
	}
}

let flag = false;

// Enable Mark Post as Read - RV3
function enableMarkPostAsReadButton() {
	if (flag) return;
	flag = true;

	BROWSER_API.storage.sync.get(['markReadOnOpenExpandos'], function (result) {
		const posts = document.querySelectorAll('shreddit-post');
		for (const post of posts) {
			const url = window.location.origin + post.getAttribute('permalink');

			BROWSER_API.runtime
				.sendMessage({ actions: [{ action: 'checkVisited', url: url }] })
				.then(function (response) {
					if (response.visited) return;

					// Add click event listener to expando button if the URL is not visited
					const expando_not_disabled = post.shadowRoot?.querySelector('.toggle__expando-button:not([disabled])');
					if (result.markReadOnOpenExpandos && expando_not_disabled) {
						// The expando button will handle marking the post as read, no need to add another button
						return;
					} else if (!post.shadowRoot?.querySelector('.re-mark-post-as-read')) {
						const button = document.createElement('button');
						button.setAttribute('class', 're-mark-post-as-read button border-md flex flex-row justify-center items-center h-xl font-semibold relative  text-12 button-secondary inline-flex items-center px-sm');
						button.setAttribute('style', 'margin-right: 4px;');

						// Add a double tick icon to the button
						const parser = new DOMParser();
						const double_tick_svg_str = `<svg class="re-icon-double-tick" width="22" height="22" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path id="path2" d="m482.08 125.21c-4.9259 6.1e-4 -9.8528 1.9008-13.652 5.6995l-203.2 203.12a8.58 8.58 0 0 1-12.129 0l-91.761-91.673a8.58 8.58 0 0 1-5e-3 -2e-3c-7.5986-7.5986-19.706-7.5986-27.305 0-7.5987 7.5987-7.5986 19.706 0 27.305l111.44 111.44c7.5987 7.5987 19.706 7.5986 27.305 0l222.87-222.87c7.5986-7.5986 7.5986-19.706 0-27.305a8.58 8.58 0 0 1-0.0455-0.10773c-3.7818-3.7178-8.6466-5.5912-13.52-5.5918z" stop-color="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2256" style="paint-order:fill markers stroke"/><path id="path1" d="m364.42 125.21c-4.9268 0-9.8545 1.9002-13.654 5.6995l-136.58 136.52 27.303 27.277 136.49-136.49c7.5986-7.5987 7.5986-19.706 0-27.305a8.58 8.58 0 0 1-0.0455-0.10773c-3.7824-3.7184-8.6482-5.5918-13.522-5.5918zm-334.4 111.44c-4.9266 0-9.8522 1.9002-13.652 5.6995-7.5987 7.5987-7.5986 19.706 0 27.305l111.44 111.44c7.5986 7.5987 19.706 7.5987 27.305 0l31.308-31.308-27.3-27.303-11.55 11.545a8.58 8.58 0 0 1-12.129 0l-91.761-91.673a8.58 8.58 0 0 1-0.0049-2e-3c-3.7993-3.7993-8.7272-5.6995-13.654-5.6995z" stop-color="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2256"/></svg>`;
						const double_tick_svg = parser.parseFromString(double_tick_svg_str, 'image/svg+xml')?.activeElement;
						button.append(double_tick_svg);

						button.addEventListener('click', () => {
							// Send a message to background.js, which has the permission to call history.addUrl()
							BROWSER_API.runtime
								.sendMessage({ actions: [{ action: 'markVisited', url: url }] })
								.then(function (response) {
									console.debug(`[RedditEnhancer] markPostAsRead: Marking URL as visited: ${url}`);
									button.style.display = 'none';
								})
								.catch(function (error) {
									console.error(`[RedditEnhancer] markPostAsRead: Error marking post as read: ${url}, `, error);
								});
							// Call the function to process any new posts added to the feed
							enableMarkPostAsReadButton();
						});
						const upvote_el = post.shadowRoot.querySelector('span:has(> span > [class*="text-action-upvote"])');
						upvote_el?.parentNode.insertBefore(button, upvote_el);
					}
				})
				.catch(function (error) {
					console.error(`[RedditEnhancer] Error checking if a URL has been visited: ${url}, `, error);
				});
		}
		flag = false;
	});
}

// Observer for watching new posts in feed
const observer = new MutationObserver(
	debounce((mutations) => {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach((addedNode) => {
				if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
					enableMarkPostAsReadButton();
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
