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
        disableBgFadePostOverlay(result.disableBgFadePostOverlay);
    });
}

// Activate the feature based on Reddit version
export function disableBgFadePostOverlay(value) {
    if (value) {
        if (redditVersion === 'new') {
            if (!document.head.querySelector('style[id="re-disable-bg-fade-post-overlay"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-disable-bg-fade-post-overlay';
                styleElement.textContent = `div#overlayScrollContainer {
                                                background: var(--comments-overlay-background);
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