/* ===== Tweaks - Productivity - Scale Post To Fit Video ===== */

/* === Triggered On Page Load === */
export function loadScalePostToFitVideo() {
	BROWSER_API.storage.sync.get(['scalePostToFitVideo'], function (result) {
		if (result.scalePostToFitVideo) {
			scalePostToFitVideo(true);
		}
	});
}

/* === Main Function === */
export function scalePostToFitVideo(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableScalePostToFitVideoNewNew();
		} else if (value === false) {
			disableScalePostToFitVideoAll();
		}
	}
}

// Function - Enable Scale Post To Fit Video - New New
function enableScalePostToFitVideoNewNew() {
	if (!document.head.querySelector('style[id="re-scale-post-to-fit-video"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-scale-post-to-fit-video';
		styleElement.textContent = `/*:root {
										--re-limit-video-width: unset;
										--re-max-video-post-height: unset;
									}*/
									shreddit-aspect-ratio:has(shreddit-player-2) {
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
									[slot="post-media-container"] shreddit-player-2,
									shreddit-player-2::part(video) {
										max-height: var(--re-max-video-post-height, fit-content) !important;
									}
									shreddit-blurred-container [slot="blurred"] {
										max-height: var(--re-max-image-post-height) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	// Replace all instances of <shreddit-aspect-ratio> with <div>
	document.querySelectorAll('shreddit-aspect-ratio:has(shreddit-player-2)').forEach(function (tag) {
		replaceTag(tag);
	});
	if (document.querySelector('shreddit-feed')) {
		observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
	}
}

// Function - Replace <shreddit-aspect-ratio> with <div>
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

// Function - Revert <div> to <shreddit-aspect-ratio>
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

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (addedNode.nodeName === 'ARTICLE') {
				setTimeout(() => {
					document.querySelectorAll('shreddit-aspect-ratio:has(shreddit-player-2)').forEach((tag) => {
						replaceTag(tag);
					});
				}, 1000);
			}
		});
	});
});

// Function - Disable Scale Post To Fit Video - All
export function disableScalePostToFitVideoAll() {
	observer.disconnect();
	const dynamicStyleElements = document.querySelectorAll('style[id="re-scale-post-to-fit-video"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('div[id*="aspect-ratio"]:has(shreddit-player-2)').forEach(function (tag) {
		revertTag(tag);
	});
}
