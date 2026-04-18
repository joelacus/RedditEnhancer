/**
 * Tweaks: Media - Replace Post Videos With Links
 *
 * @name replacePostVideosWithLinks
 * @description Hide post videos and show links instead on feeds.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { registerMutationCallback } from '../../observer_manager';
import { getBestQualityMp4Url } from './add_download_video_button';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadReplacePostVideosWithLinks() {
	BROWSER_API.storage.sync.get(['replacePostVideosWithLinks'], function (result) {
		if (result.replacePostVideosWithLinks === true) replacePostVideosWithLinks(true);
	});
}

// Store cleanup functions for the observer and scroll event
let observerCleanup = null;
let scrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function replacePostVideosWithLinks(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableReplacePostVideosWithLinks();
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
										enableReplacePostVideosWithLinks();
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'replacePostVideosWithLinks',
				);
			}

			// === Run again on page scroll ===
			// Add scroll event listener with debounce to make sure no posts have been missed
			if (document.querySelector('shreddit-feed')) {
				const debouncedScrollHandler = debounce(() => {
					enableReplacePostVideosWithLinks();
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

			disableReplacePostVideosWithLinks();
		}
	}
}

// Enable Replace Videos With Links - RV3
function enableReplacePostVideosWithLinks() {
	// Append Stylesheet
	if (!document.head.querySelector('style[id="re-replace-post-videos-with-links"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-replace-post-videos-with-links';
		styleElement.textContent = `.re-media-link {
										position: relative;
										display: block;
										margin-bottom: 12px;
										z-index: 9;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// Initial Video Posts
	document.querySelectorAll('shreddit-feed shreddit-post:not([data-re-link]):has(shreddit-player)').forEach((post) => {
		if (post.querySelector('shreddit-blurred-container')) return;
		const packagedMediaJson = post.querySelector('[packaged-media-json]')?.getAttribute('packaged-media-json');
		if (!packagedMediaJson) return;
		const video_url = getBestQualityMp4Url(packagedMediaJson);
		post.querySelector('[slot="post-media-container"]').style.display = 'none';
		appendLink(post, video_url);
		post.setAttribute('data-re-link', 'true');
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

// Disable Replace Videos With Links - RV3
function disableReplacePostVideosWithLinks() {
	document.querySelectorAll('shreddit-feed shreddit-post[data-re-link] [slot="post-media-container"]').forEach((container) => {
		// Show Videos
		container.removeAttribute('style');

		// Remove Text Links
		container
			.closest('shreddit-post')
			.querySelectorAll('.re-media-link')
			.forEach((link) => {
				link.remove();
			});

		// Remove "Done" Attributes
		container.closest('shreddit-post').removeAttribute('data-re-link');
	});

	// Remove Stylesheet
	const dynamicStyleElements = document.head.querySelectorAll('style[id="replace-post-videos-with-links"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
