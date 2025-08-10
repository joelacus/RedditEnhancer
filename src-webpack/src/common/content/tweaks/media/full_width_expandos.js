/**
 * Tweaks: Media - Expand post previews in Compact view
 *
 * @name fullWidthExpandos
 * @description Remove the width limit and grid placement of expando content in Compact view.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from "../../banner_message";

export function loadFullWidthExpandos() {
    BROWSER_API.storage.sync.get(['fullWidthExpandos']).then((result) => {
        if (result.fullWidthExpandos) fullWidthExpandos(true);
    });
}

/* === Enable/Disable The Feature === */
export function fullWidthExpandos(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            document.querySelectorAll('shreddit-post[view-type="compactView"]').forEach(removeGridClasses);

            // Observe for new posts being added to the feed
            const feed = document.querySelector('shreddit-feed');
            if (feed) postObserver.observe(feed, { childList: true });
        } else {
            postObserver.disconnect();
            showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
        }
    }
}

function removeGridClasses(post) {
    const shadowRoot = post.shadowRoot;
    if (shadowRoot) {
        const thumbnail = shadowRoot.querySelector('slot[name="thumbnail"]');
        if (thumbnail) {
            thumbnail.parentElement.setAttribute('part', 'thumbnail');
        }
        const expandoContent = shadowRoot.querySelector('slot[name="expando-content"]');
        if (expandoContent) {
            expandoContent.parentElement.classList.remove('xs:col-start-2', 'xs:col-end-3');
        }
    }
    const expandoContent = post.querySelector('.toggle__expando .max-w-\\[768px\\], .toggle__expando .max-w-\\[720px\\]');
    if (expandoContent) {
        expandoContent.classList.remove('max-w-[768px]', 'max-w-[720px]', 'max-h-[540px]');
    }
}

// Observe feed for new posts
const postObserver = new MutationObserver(
    debounce(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-PARTIAL', 'FACEPLATE-LOADER'].includes(addedNode.nodeName)) {
                    document.querySelectorAll('shreddit-post[view-type="compactView"]').forEach(removeGridClasses);
                }
            });
        });
    }, 100)
);

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}