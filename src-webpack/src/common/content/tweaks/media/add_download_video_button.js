/**
 * Tweaks: Media - Add Download Video Button
 *
 * @name addDownloadVideoButton
 * @description Add a button on video posts to download the video file.
 *
 * Notes: Now supports both direct MP4 and m3u8 (HLS) streams by extracting MP4 URLs
 * from the packaged-media-json attribute.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadAddDownloadVideoButton() {
	BROWSER_API.storage.sync.get(['addDownloadVideoButton'], function (result) {
		if (result.addDownloadVideoButton === true) addDownloadVideoButton(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function addDownloadVideoButton(value) {
	if (redditVersion === 'newnew' && value) {
		document.querySelectorAll('shreddit-post').forEach((post) => {
			if (post.querySelector(':has(shreddit-player)') || post.querySelector(':has(shreddit-player-2)')) {
				enableAddVideoDownloadButtonRV3(post);
			}
		});
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
									const post = addedNode.querySelector('shreddit-post');
									if (addedNode) {
										enableAddVideoDownloadButtonRV3(post);
									}
								}, 1000);
							}
						});
					});
				},
				{ childList: true, subtree: true },
				'addDownloadVideoButton',
			);
		}
	} else {
		// Cleanup observer
		if (observerCleanup) {
			observerCleanup();
			observerCleanup = null;
		}
		disableAddVideoDownloadButtonAll();
	}
}

// Enable Add Download Video Button - RV3
function enableAddVideoDownloadButtonRV3(post) {
	let container = post;
	const routename = document.querySelector('shreddit-app').getAttribute('routename');
	if (routename === 'post_page') {
		setTimeout(() => {
			container = post.shadowRoot?.querySelector('[part="actionBar"]');
			addDownloadButton();
		}, 5000);
	} else {
		addDownloadButton();
	}

	function addDownloadButton() {
		const packagedMediaJson = post?.querySelector('[packaged-media-json]')?.getAttribute('packaged-media-json');
		if (!packagedMediaJson) return;
		const video_url = getBestQualityMp4Url(packagedMediaJson);
		const post_title =
			post
				.getAttribute('post-title')
				?.replaceAll(/[^a-zA-Z ]/g, '')
				?.trim()
				?.replaceAll(' ', '_') ?? 'video';

		if (video_url && !container.querySelector('.re-video-download-btn')) {
			const btn = document.createElement('div');
			btn.classList.add('re-video-download-btn');
			if (routename === 'post_page') btn.setAttribute('style', 'cursor: pointer;text-decoration: underline;z-index: 99;');
			if (routename !== 'post_page') btn.setAttribute('style', 'position: absolute;bottom: 0.75rem;right: 1rem;cursor: pointer;text-decoration: underline;z-index: 99;');
			btn.textContent = 'Download Video';
			btn.addEventListener('click', async function (e) {
				e.stopPropagation();
				try {
					await BROWSER_API.runtime.sendMessage({
						actions: [
							{
								action: 'downloadVideo',
								filename: post_title,
								url: video_url,
							},
						],
					});
				} catch (error) {
					console.error(error);
					showBannerMessage('error', error.error || error);
				}
			});
			container.appendChild(btn);
		}
	}
}

// Disable Add Download Video Button - All
function disableAddVideoDownloadButtonAll() {
	document.querySelectorAll('shreddit-post').forEach((post) => {
		if (post.shadowRoot.querySelector('.re-video-download-btn')) {
			post.shadowRoot.querySelector('.re-video-download-btn').remove();
		}
	});
}

// Extract the highest quality MP4 URL from packaged-media-json attribute
export function getBestQualityMp4Url(packagedMediaJson) {
	try {
		// Unescape HTML entities and parse JSON
		const jsonString = packagedMediaJson.replace(/&quot;/g, '"');
		const data = JSON.parse(jsonString);

		// Get permutations array with MP4 URLs
		const permutations = data?.playbackMp4s?.permutations;
		if (!Array.isArray(permutations) || permutations.length === 0) return null;

		// Sort by resolution (width × height) descending to get highest quality
		const sorted = permutations.sort((a, b) => {
			const areaA = (a.source.dimensions?.width || 0) * (a.source.dimensions?.height || 0);
			const areaB = (b.source.dimensions?.width || 0) * (b.source.dimensions?.height || 0);
			return areaB - areaA;
		});

		// Return the URL of the highest quality MP4
		return sorted[0]?.source?.url || null;
	} catch (error) {
		console.error('Failed to parse packaged-media-json:', error);
		return null;
	}
}
