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
                // Deliberate selectors to override Post Overlay Width
                styleElement.textContent = `div#overlayScrollContainer > div:first-child,
                                            #SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] :first-child::after {
                                                width: 100%;
                                                max-width: 100%;
                                            }
                                            div#overlayScrollContainer > div:first-child > div {
                                                width: var(--re-post-overlay-width);
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
                                                backdrop-filter: blur(var(--re-theme-blur, 15px));
                                                -webkit-backdrop-filter: blur(var(--re-theme-blur, 15px));
                                                --comments-overlay-background: transparent !important;
                                            }
                                            div#overlayScrollContainer > div:first-child {
                                                width: 100%;
                                                max-width: 100%;
                                                backdrop-filter: blur(calc(var(--re-theme-blur, 15px) + 20px));
                                                -webkit-backdrop-filter: blur(calc(var(--re-theme-blur, 15px) + 20px));
                                            }
                                            div#overlayScrollContainer > div:first-child > div {
                                                width: var(--re-post-overlay-width);
                                            }
                                            .theme-dark div#overlayScrollContainer > div:first-child {
                                                background-color: rgba(0, 0, 0, .15);
                                            }
                                            .theme-light div#overlayScrollContainer > div:first-child {
                                                background-color: rgba(255, 255, 255, .25);
                                            }
                                            .theme-light div#overlayScrollContainer > div:first-child :not(button.voteButton *) {
                                                color: black !important;
                                            }
                                            div#overlayScrollContainer > div:first-child button.voteButton:focus {
                                                background-color: unset;
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