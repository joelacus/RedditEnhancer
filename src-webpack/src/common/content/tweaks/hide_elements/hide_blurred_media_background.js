/**
 * Tweaks: Hide Elements - Disable background blur behind image previews
 * @name hideBlurredMediaBackground
 * @description Hide the background blur behind (single & carousel) image previews.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHideBlurredMediaBackground() {
    BROWSER_API.storage.sync.get('hideBlurredMediaBackground').then((result) => {
        if (result.hideBlurredMediaBackground) {
            hideBlurredMediaBackground(true);
        }
    });
}

// Activate the feature based on Reddit version
export function hideBlurredMediaBackground(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableHideBlurredMediaBackground();
        } else {
            disableHideBlurredMediaBackground();
        }
    }
}

// Enable the feature
function enableHideBlurredMediaBackground() {
    if (!document.head.querySelector('style[id="re-hide-blurred-media-background"]')) {
        const styleElement = document.createElement('style');
        styleElement.id = 're-hide-blurred-media-background';
        styleElement.textContent =
            `/* Hide the black background for post with one image */
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

// Disable the feature
function disableHideBlurredMediaBackground() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-blurred-media-background"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}