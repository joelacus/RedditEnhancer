/**
 * Tweaks: Media - Replace Post Images With Links
 *
 * @name replacePostImagesWithLinks
 * @description Hide post images and show links instead on feeds.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

let enableHome;
let enableSubs;

export function loadReplacePostImagesWithLinks() {
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks', 'replacePostImagesWithLinksHome', 'replacePostImagesWithLinksSubreddits'], function (result) {
		enableHome = result.replacePostImagesWithLinksHome !== false ? true : false;
		enableSubs = result.replacePostImagesWithLinksSubreddits !== false ? true : false;
		if (result.replacePostImagesWithLinks === true) replacePostImagesWithLinks(true);
	});
}

// Store cleanup functions for the observer and scroll event
let observerCleanup = null;
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function replacePostImagesWithLinks(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			// === Initial pass on currently loaded posts ===
			enableReplacePostImagesWithLinks();

			// === Run again when new posts are added ===
			// Register with centralised observer manager
			// Clean up any existing observer first
			if (observerCleanup) {
				observerCleanup();
			}
			const feed = document.querySelector('shreddit-feed');
			if (feed) {
				observerCleanup = registerMutationCallback(
					feed,
					(mutations) => {
						mutations.forEach((mutation) => {
							mutation.addedNodes.forEach((addedNode) => {
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										enableReplacePostImagesWithLinks();
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'replacePostImagesWithLinks',
				);
			}

			// === Run again on page scroll ===
			// Add scroll event listener with debounce to make sure no posts have been missed
			if (document.querySelector('shreddit-feed')) {
				const debouncedScrollHandler = debounce(() => {
					enableReplacePostImagesWithLinks();
				}, 200);

				window.addEventListener('scroll', debouncedScrollHandler);
				scrollCleanup = () => {
					window.removeEventListener('scroll', debouncedScrollHandler);
				};
			}
		} else {
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}

			// Cleanup scroll event listener
			if (scrollCleanup) {
				scrollCleanup();
				scrollCleanup = null;
			}

			disableReplacePostImagesWithLinks();
		}
	}
}

export function replacePostImagesWithLinksHome(value) {
	enableHome = value;
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks'], function (result) {
		if (value && result.replacePostImagesWithLinks) {
			enableReplacePostImagesWithLinks();
		} else {
			const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
			if (routeName === 'frontpage') disableReplacePostImagesWithLinks();
		}
	});
}

export function replacePostImagesWithLinksSubreddits(value) {
	enableSubs = value;
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks'], function (result) {
		if (value && result.replacePostImagesWithLinks) {
			enableReplacePostImagesWithLinks();
		} else {
			const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
			if (routeName === 'subreddit') disableReplacePostImagesWithLinks();
		}
	});
}

// Enable Replace Images With Links - RV3
function enableReplacePostImagesWithLinks() {
	// Append Stylesheet
	if (!document.head.querySelector('style[id="re-replace-post-images-with-links"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-replace-post-images-with-links';
		styleElement.textContent = `.re-media-link {
										position: relative;
										display: block;
										margin-bottom: 12px;
										z-index: 9;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');

	if ((enableHome === true && routeName === 'frontpage') || (enableSubs === true && routeName === 'subreddit') || !['frontpage', 'subreddit'].includes(routeName)) {
		// Initial Image Posts (Single Images)
		document.querySelectorAll('shreddit-feed shreddit-post:not([data-re-link]):has(img.preview-img)').forEach((post) => {
			if (post.querySelector('shreddit-blurred-container')) return;
			try {
				const url = post.querySelector('img.preview-img').src;
				if (post.querySelector(`.re-media-link[href="${url}"]`)) return;
				appendLink(post, url);
				post.setAttribute('data-re-link', 'true');
				post.querySelector('[slot="post-media-container"]').style.display = 'none';
			} catch (e) {}
		});

		// Initial Image Posts (Galleries)
		document.querySelectorAll('shreddit-feed shreddit-post:not([data-re-link]):has(gallery-carousel)').forEach((post) => {
			if (post.querySelector('shreddit-blurred-container')) return;
			post.querySelectorAll('li > figure > img').forEach((img) => {
				if (img.getAttribute('data-re-link') === 'true') return;
				const url = img.src || img.getAttribute('data-lazy-src');
				if (!url) return;
				try {
					appendLink(post, url);
					img.setAttribute('data-re-link', 'true');
				} catch (e) {}
			});
			post.setAttribute('data-re-link', 'true');
			post.querySelector('[slot="post-media-container"]').style.display = 'none';
		});

		// Create and Append Link
		function appendLink(post, url) {
			// Edit URL
			const urlObj = new URL(url);
			urlObj.search = '';
			const image_url = urlObj.toString();

			// Create and Append Text Link
			const a = document.createElement('a');
			a.classList.add('re-media-link');
			a.href = url;
			a.target = '_blank';
			a.textContent = image_url;
			post.append(a);
		}
	}
}

// Disable Replace Images With Links - RV3
function disableReplacePostImagesWithLinks() {
	document.querySelectorAll('.re-media-link').forEach((link) => {
		link.remove();
	});
	document.querySelectorAll('[slot="post-media-container"]').forEach((post) => {
		post.style.display = '';
	});
	document.querySelectorAll('[data-re-link]').forEach((post) => {
		post.removeAttribute('data-re-link');
	});

	// Remove Stylesheet
	const dynamicStyleElements = document.head.querySelectorAll('style[id="replace-post-images-with-links"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
