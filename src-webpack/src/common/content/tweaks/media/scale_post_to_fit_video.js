/**
 * Tweaks: Media - Scale Post To Fit Video
 *
 * @name scalePostToFitVideo
 * @description Scale the post vertically to fit the full height of the video.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadScalePostToFitVideo() {
	BROWSER_API.storage.sync.get(['scalePostToFitVideo'], function (result) {
		if (result.scalePostToFitVideo === true) scalePostToFitVideo(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function scalePostToFitVideo(value) {
	if (redditVersion === 'newnew' && value) {
		enableScalePostToFitVideoRV3();
	} else {
		disableScalePostToFitVideoAll();
	}
}

// Enable Scale Post To Fit Video - RV3
function enableScalePostToFitVideoRV3() {
	if (!document.head.querySelector('style[id="re-scale-post-to-fit-video"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-scale-post-to-fit-video';
		styleElement.textContent = `shreddit-aspect-ratio:has(shreddit-player-2) {
										min-height: fit-content !important;
										padding: 0 !important;
									}
									shreddit-aspect-ratio:has(shreddit-player-2) shreddit-media-lightbox-listener {
										display: block !important;
										height: fit-content !important;
									}
									shreddit-aspect-ratio:has(shreddit-player-2) div:has(>img) {
										height: fit-content !important;
									}
									[slot="post-media-container"] shreddit-player-2 {
										display: flex;
										justify-content: center;
										max-height: fit-content !important;
										overflow-y: auto !important;
										max-width: var(--re-limit-video-width, 100%) !important;
										margin: 0 auto;
									}
									[slot="post-media-container"] shreddit-player-2 {
										overflow: hidden !important;
									}
									[slot="post-media-container"] shreddit-player-2 {
										max-height: var(--re-max-video-post-height, fit-content) !important;
									}
									shreddit-player-2::part(video) {
										min-width: 100%;
										min-height: 100%;
										width: auto;
										height: auto;
									}
									shreddit-blurred-container [slot="blurred"] {
										max-height: var(--re-max-image-post-height) !important;
									}
									shreddit-post [slot="expando"] > [class="max-h-[540px]"] {
										max-height: fit-content !important;
   										aspect-ratio: unset !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	// Replace all instances of <shreddit-aspect-ratio> with <div>
	document.querySelectorAll('shreddit-aspect-ratio:has(shreddit-player-2)').forEach(function (tag) {
		replaceTag(tag);
	});
	if (document.querySelector('shreddit-feed')) {
		// Clean up any existing observer first
		if (observerCleanup) {
			observerCleanup();
		}
		observerCleanup = registerMutationCallback(
			document.querySelector('shreddit-feed'),
			(mutations) => {
				mutations.forEach((mutation) => {
					mutation.addedNodes.forEach((addedNode) => {
						if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
							setTimeout(() => {
								document.querySelectorAll('shreddit-aspect-ratio:has(shreddit-player-2)').forEach((tag) => {
									replaceTag(tag);
								});
							}, 1000);
						}
					});
				});
			},
			{ childList: true, subtree: true },
			'scalePostToFitVideo',
		);
	}
}

// Replace <shreddit-aspect-ratio> with <div>
function replaceTag(tag) {
	const newDiv = document.createElement('div');
	Array.from(tag.attributes).forEach((attr) => {
		newDiv.setAttribute(attr.name, attr.value);
	});
	while (tag.firstChild) {
		newDiv.appendChild(tag.firstChild);
	}
	tag.parentNode.replaceChild(newDiv, tag);
	newDiv.querySelector('shreddit-player-2').shadowRoot.querySelector('video').setAttribute('part', 'video');
	setTimeout(() => {
		newDiv.querySelector('shreddit-player-2').shadowRoot.querySelector('video').setAttribute('part', 'video');
	}, 1000);
}

// Revert <div> to <shreddit-aspect-ratio>
function revertTag(tag) {
	const newSar = document.createElement('shreddit-aspect-ratio');
	Array.from(tag.attributes).forEach((attr) => {
		newSar.setAttribute(attr.name, attr.value);
	});
	while (tag.firstChild) {
		newSar.appendChild(tag.firstChild);
	}
	tag.parentNode.replaceChild(newSar, tag);
}

// Disable Scale Post To Fit Video - All
export function disableScalePostToFitVideoAll() {
	// Cleanup observer
	if (observerCleanup) {
		observerCleanup();
		observerCleanup = null;
	}
	const dynamicStyleElements = document.querySelectorAll('style[id="re-scale-post-to-fit-video"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
	document.querySelectorAll('div[id*="aspect-ratio"]:has(shreddit-player-2)').forEach(function (tag) {
		revertTag(tag);
	});
}
