/**
 * Tweaks: Resize Feed / Post - Resize Main Container
 * @name resizeMainContainer
 * @description [EXPERIMENTAL] Resize the main container to a custom width. Unlike expand_content,
 * this resizes the entire container and keeps the main feed and sidebar together.
 * NOTE: Ideally all widths of "Resize Feed / Post" should be set to 100%.
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadResizeMainContainer() {
    BROWSER_API.storage.sync.get(['resizeMainContainer', 'resizeMainContainerWidth'], function (result) {
        if (result.resizeMainContainer) resizeMainContainer(true);
        resizeMainContainerWidth(result.resizeMainContainerWidth);
    });
}

// Activate the feature based on Reddit version
export function resizeMainContainer(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableResizeMainContainer();
        } else {
            disableResizeMainContainer();
        }
    }
}

// Enable the feature
function enableResizeMainContainer() {
    const styleElement = document.createElement('style');
    styleElement.id = 're-resize-main-container';
    styleElement.textContent =
        `@media (min-width: 960px) {
            div.main-container {
                width: var(--re-main-container-width) !important;
                margin: 0 auto;
            }
            /* Align subreddit title with main-content */
            shreddit-app div.subgrid-container {
                gap: 0;
            }
            div.masthead > section,
            div.masthead:has(> custom-feed-header) {
                width: var(--re-main-container-width);
                margin: 0 auto;
            }
            community-appearance-entrypoint[target="banner"] {
                margin-bottom: 3rem !important;
            }
        }`;
    document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable the feature
function disableResizeMainContainer() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-resize-main-container"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}

// Set the custom width
export function resizeMainContainerWidth(value) {
    if (value) {
        document.documentElement.style.setProperty('--re-main-container-width', value + '%');
    } else {
        document.documentElement.style.setProperty('--re-main-container-width', '80%');
    }
}