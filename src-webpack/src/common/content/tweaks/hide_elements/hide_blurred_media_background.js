/* ===== Tweak - Hide - Blurred Media Background ===== */

export function loadHideBlurredMediaBackground() {
    BROWSER_API.storage.sync.get('hideBlurredMediaBackground').then((result) => {
        if (result.hideBlurredMediaBackground) hideBlurredMediaBackground(true);
    });
}

export function hideBlurredMediaBackground(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableHideBlurredMediaBackground();
        } else {
            disableHideBlurredMediaBackground();
        }
    }
}

function enableHideBlurredMediaBackground() {
    if (!document.head.querySelector('style[id="re-hide-blurred-media-background"]')) {
        const styleElement = document.createElement('style');
        styleElement.id = 're-hide-blurred-media-background';
        styleElement.textContent =
            `.bg-black { /* Hide the black background for post with one image */
                --tw-bg-opacity: 0 !important;
            }
            div[slot="post-media-container"],
            div[slot="post-media-container"] > div,
            gallery-carousel li:has(img.media-lightbox-img) { /* Hide the color-natural-bg background color for post with one image */
                background-color: transparent;
            }
            div[slot="post-media-container"]:not(:has(.crosspost-title)) > div { /* Hide the black background for post with many images */
	            border: none !important;
            }
            img.post-background-image-filter { /* Hide the background blur */
                display: none;
                visibility: hidden;
            }`;
        document.head.insertBefore(styleElement, document.head.firstChild);
    }
}

function disableHideBlurredMediaBackground() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-blurred-media-background"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}