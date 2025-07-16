/**
 * Tweaks: Media - Add Download Video Button
 *
 * @name addDownloadVideoButton
 * @description Add a button on video posts to download the video file.
 *
 * Notes: Currently only works for mp4 URLs. Additional functionality is required for m3u8 URLs.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';
import { logToDevConsole } from '../../logging';

/* === Run by Tweak Loader when the Page Loads === */
export function loadAddDownloadVideoButton() {
	BROWSER_API.storage.sync.get(['addDownloadVideoButton'], function (result) {
		if (result.addDownloadVideoButton) addDownloadVideoButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function addDownloadVideoButton(value) {
	if (redditVersion === 'newnew' && value) {
		document.querySelectorAll('shreddit-post').forEach((post) => {
			if (post.querySelector(':has(shreddit-player-2)')) {
				enableAddVideoDownloadButtonRV3(post);
			}
		});
		observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
	} else {
		observer.disconnect();
		disableAddVideoDownloadButtonAll();
	}
}

// Enable Add Download Video Button - RV3
function enableAddVideoDownloadButtonRV3(post) {
	const container = post.shadowRoot?.querySelector('div:has([name="comments-action-button"])');
	if (!post && !container) return;
	const valid_source = post.querySelector('shreddit-player-2')?.shadowRoot?.querySelector('video')?.src;
	if (valid_source && !container.querySelector('.re-video-download-btn')) {
		const btn = document.createElement('div');
		btn.classList.add('re-video-download-btn');
		btn.setAttribute('style', 'cursor: pointer;text-decoration: underline;z-index: 99;');
		btn.textContent = 'Download Video';
		btn.addEventListener('click', async function (e) {
			e.stopPropagation();
			const post = e.currentTarget.getRootNode().host;
			const post_title = post
				.getAttribute('post-title')
				.replaceAll(/[^a-zA-Z ]/g, '')
				.trim()
				.replaceAll(' ', '_');
			const video_url = post.querySelector('shreddit-player-2').shadowRoot.querySelector('video').src;
			if (video_url && video_url.includes('.mp4') && post_title) {
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
					console.log(error);
					showBannerMessage('error', error.error || error);
				}
			} else {
				logToDevConsole('error', `Missing video filename and/or video URL - ${post_title} - ${video_url}`);
				showBannerMessage('error', 'Missing video filename and/or video URL');
			}
		});
		container.appendChild(btn);
	} else {
		console.log(post.querySelector('shreddit-player-2')?.shadowRoot?.querySelector('video'));
		console.log(`[Reddit Enhancer] Above video is not an mp4 video. Not adding download button.`);
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

// Observe feed for new posts
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'ARTICLE') {
				setTimeout(() => {
					const post = addedNode.querySelector('shreddit-post');
					if (addedNode) {
						enableAddVideoDownloadButtonRV3(post);
					}
				}, 1000);
			}
		});
	});
});
