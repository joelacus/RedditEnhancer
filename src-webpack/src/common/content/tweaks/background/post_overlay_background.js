/**
 * Tweaks: Background - Disable Background Fade Behind Post Overlay
 * @name disableBackgroundFadePostOverlay
 * @description Disable the background fade behind post overlay.
 *
 * Applies to: Old New UI (2018-2024)
 */

// Get the feature state from browser sync storage
export function loadDisableBgFadePostOverlay() {
    BROWSER_API.storage.sync.get(['disableBgFadePostOverlay'], function (result) {
        if (result.disableBgFadePostOverlay) disableBgFadePostOverlay(true);
    });
}

// Activate the feature based on Reddit version
export function disableBgFadePostOverlay(value) {
    if (value) {
        if (redditVersion === 'new') {
            if (!document.head.querySelector('style[id="re-disable-bg-fade-post-overlay"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-disable-bg-fade-post-overlay';
                styleElement.textContent = `#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
                                                background-color: var(--comments-overlay-background);
                                            }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        }
    } else {
        const dynamicStyleElements = document.head.querySelectorAll('style[id="re-disable-bg-fade-post-overlay"]');
        dynamicStyleElements.forEach((element) => {
            document.head.removeChild(element);
        });
    }
}

/**
 * Tweaks: Background - Blur background behind post overlay
 * @name blurBackgroundPostOverlay
 * @description Blur the background behind post overlay.
 *
 * Kudos to zadencodes on userstyles.world for the original code.
 *
 * Applies to: Old New UI (2018-2024)
 */

// Get the feature state from browser sync storage
export function loadBlurBackgroundPostOverlay() {
    BROWSER_API.storage.sync.get(['blurBackgroundPostOverlay'], function (result) {
        if (result.blurBackgroundPostOverlay) blurBackgroundPostOverlay(true);
    });
}

// Activate the feature based on Reddit version
export function blurBackgroundPostOverlay(value) {
    if (value) {
        if (redditVersion === 'new') {
            if (!document.head.querySelector('style[id="re-blur-bg-post-overlay"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-blur-bg-post-overlay';
                styleElement.textContent = `#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
                                                background-color: transparent;
                                                backdrop-filter: blur(15px);
                                                -webkit-backdrop-filter: blur(15px);
                                                --comments-overlay-background: transparent !important;
                                            }
                                            div#overlayScrollContainer > div:first-child {
                                                background-color: rgba(0, 0, 0, .15);
                                                backdrop-filter: blur(35px);
                                                -webkit-backdrop-filter: blur(35px);
                                            }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        }
    } else {
        const dynamicStyleElements = document.head.querySelectorAll('style[id="re-blur-bg-post-overlay"]');
        dynamicStyleElements.forEach((element) => {
            document.head.removeChild(element);
        });
    }
}