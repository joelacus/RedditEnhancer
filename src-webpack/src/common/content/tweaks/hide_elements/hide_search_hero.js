/**
 * Tweaks: Hide Elements - Hide the Search Banner on Home Feed
 * @name hideSearchHero
 * @description Hide the large search banner that appears at the top of the home feed.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideSearchHero() {
    BROWSER_API.storage.sync.get(['hideSearchHero']).then((result) => {
        if (result.hideSearchHero) hideSearchHero(true);
    });
}

/* === Enable/Disable The Feature === */
export function hideSearchHero(value) {
    if (redditVersion === 'newnew' && value) {
        enableHideSearchHero();
    } else {
        disableHideSearchHero();
    }
}

function enableHideSearchHero() {
    if (!document.head.querySelector('style[id="re-hide-search-hero"]')) {
        const styleElement = document.createElement('style');
        styleElement.id = 're-hide-search-hero';
        styleElement.textContent = `.masthead #search-hero {
                                        display: none !important;
                                    }
                                    reddit-search-large {
                                        border: none !important;
                                    }`;
        document.head.insertBefore(styleElement, document.head.firstChild);
    }
}

function disableHideSearchHero() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-search-hero"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}