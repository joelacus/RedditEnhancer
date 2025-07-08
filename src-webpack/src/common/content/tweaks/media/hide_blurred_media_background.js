/**
 * Tweaks: Media - Disable Blurred Media Background
 *
 * @name hideBlurredMediaBackground
 * @description Hide the background blur behind (single & carousel) image previews.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideBlurredMediaBackground() {
	BROWSER_API.storage.sync.get(['hideBlurredMediaBackground']).then((result) => {
		if (result.hideBlurredMediaBackground) {
			hideBlurredMediaBackground(true);
		}
	});
}

/* === Enable/Disable The Feature === */
export function hideBlurredMediaBackground(value) {
	if (redditVersion === 'newnew' && value) {
		enableHideBlurredMediaBackground();
	} else {
		disableHideBlurredMediaBackground();
	}
}

// Enable "Disable Blurred Media Background"
function enableHideBlurredMediaBackground() {
	if (!document.head.querySelector('style[id="re-hide-blurred-media-background"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-blurred-media-background';
		styleElement.textContent = `/* Hide the black background for post with one image */
            .bg-black {
                --tw-bg-opacity: 0 !important;
            }
            /* Hide the color-natural-bg background color for post with one image */
            div[slot="post-media-container"],
            div[slot="post-media-container"] > div,
            gallery-carousel li:has(img.media-lightbox-img) {
                background-color: transparent;
            }
            /* Hide the black background for post with many images */
            div[slot="post-media-container"]:not(:has(.crosspost-title)) > div {
	            border: none !important;
            }
            /* Hide the background blur */
            img.post-background-image-filter {
                display: none;
                visibility: hidden;
            }`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable "Disable Blurred Media Background"
function disableHideBlurredMediaBackground() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-blurred-media-background"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
