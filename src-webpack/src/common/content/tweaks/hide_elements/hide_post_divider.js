/**
 * Tweaks: Hide Elements - Hide post separators
 * @name hidePostDivider
 * @description Hide the separator lines between entries in feeds (frontpage, subreddits, etc.)
 *
 * Applies to: New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHidePostDivider() {
    BROWSER_API.storage.sync.get('hidePostDivider').then((result) => {
        if (result.hidePostDivider) {
            hidePostDivider(true);
        }
    });
}

// Activate the feature based on Reddit version
export function hidePostDivider(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableHidePostDivider();
        } else {
            disableHidePostDivider();
        }
    }
}

// Enable the feature
function enableHidePostDivider() {
    if (!document.head.querySelector('style[id="re-hide-post-divider"]')) {
        const styleElement = document.createElement('style');
        styleElement.id = 're-hide-post-divider';
        styleElement.textContent =
            `shreddit-title ~ hr,
            article ~ hr,
            faceplate-tracker ~ hr,
            custom-feed > hr,
            search-telemetry-tracker ~ hr,
            comment-body-header > hr {
                display: none;
                visibility: hidden;
            }
            /* Add margins between posts to compensate for removed dividers, Card and Compact view */
            article:has(> shreddit-post[view-type="cardView"]),
            faceplate-batch > article:has(> shreddit-post[view-type="cardView"]),
            /* Comment search results */
            reddit-feed > faceplate-tracker > div {
                margin-bottom: var(--re-post-separator-width, .6rem) !important;
            }
            main#main-content search-telemetry-tracker > div {
                margin: var(--re-post-separator-width, .6rem) 0;
            }
            /* Add padding to posts, Card and Compact view */
            article > shreddit-post[view-type="cardView"] {
                margin: 0 !important;
                padding: .75rem !important;
            }
            article > shreddit-post[view-type="compactView"] {
                padding: .25rem !important;
                margin: 0;
            }
            /* Allow spaces for post selection checkboxes in mod queue */
            shreddit-app[routename="mod_queue"] article > shreddit-post,
            shreddit-app[routename="mod_queue_all"] article > shreddit-post {
                padding-left: 2rem !important;
            }`;
        document.head.insertBefore(styleElement, document.head.firstChild);
    }
}

// Disable the feature
function disableHidePostDivider() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-divider"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}

// Set custom width for post separators
export function setPostSeperatorWidth(value) {
    if (value) {
        document.documentElement.style.setProperty('--re-post-separator-width', value + '%');
    } else {
        document.documentElement.style.removeProperty('--re-post-separator-width');
    }
}