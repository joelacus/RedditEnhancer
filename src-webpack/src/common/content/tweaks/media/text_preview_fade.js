/**
 * Tweaks: Media - Text Post Preview Fade
 *
 * @name textPostPreviewFade
 * @description Add fading effects to the preview of text posts on the feed in Card view.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadTextPostPreviewFade() {
	BROWSER_API.storage.sync.get(['textPostPreviewFade', 'textPostPreviewFadeHeight'], function (result) {
		if (result.textPostPreviewFade) {
			textPostPreviewFade(true);
			setTextPostPreviewFadeHeight(result.textPostPreviewFadeHeight);
		}
	});
}

/* === Enable/Disable The Feature === */
export function textPostPreviewFade(value) {
	if (redditVersion === 'newnew' && value) {
		enableTextPostPreviewFade();
	} else {
		disableTextPostPreviewFade();
	}
}

// Enable Text Post Fade
function enableTextPostPreviewFade() {
	if (!document.head.querySelector('style[id="re-text-post-preview-fade"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-text-post-preview-fade';
		styleElement.textContent = `shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview {
									    mask-image: linear-gradient(180deg, #000 var(--re-text-post-preview-fade, 150px), transparent);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Text Post Fade
function disableTextPostPreviewFade() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-text-post-preview-fade"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Set the custom fade height
export function setTextPostPreviewFadeHeight(value) {
	if (value && value > 0) {
		document.documentElement.style.setProperty('--re-text-post-preview-fade', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-text-post-preview-fade');
	}
}
