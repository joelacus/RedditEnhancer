/**
 * Tweaks: Hide Elements - Hide Awards
 *
 * @name hideAwards
 * @description Hide buttons to give awards on posts and comments.
 *
 * shreddit-post has an attribute `is-awardable` (in Card view) and `is-post-awardable` (in Compact view) which are used
 * to determine if a post can be awarded. For comments, hide the `award-button` element in the overflow menu.
 *
 * This feature also goes nuclear by removing the award dialog scripts from the DOM, making Award buttons useless.
 *
 * Applies to: New New UI (2023–)
 */
import { showBannerMessage } from "../../banner_message";

// Get the feature state from browser sync storage
export function loadHideAwards() {
    BROWSER_API.storage.sync.get(['hideAwards']).then(function (result) {
        if (result.hideAwards) hideAwards(true);
    });
}

// Activate the feature based on Reddit version
export function hideAwards(value) {
    if (value && redditVersion === 'newnew') {
        // Go nuclear and remove all award dialog handler scripts
        document.querySelector('faceplate-loader[name^="AwardDialog_"]')?.remove();
        document.querySelector('faceplate-partial[name^="AwardDialog_"]')?.remove();

        // Add a CSS class which lets RE_styles.css know to hide award-button in comments
        document.documentElement.classList.add('re-hide-awards');

        // Initially remove award buttons from existing posts
        document.querySelectorAll('shreddit-post').forEach(removeAwardBtn);

        // Observe the feed for new posts and remove their award buttons
        const feed = document.querySelector('shreddit-feed');
        if (feed) observer.observe(feed, { childList: true });
    } else {
        // Remove the CSS class that hides award buttons and disconnect the observer
        document.documentElement.classList.remove('re-hide-awards');
        observer.disconnect();
        showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the changes to take effect.');
    }
}

function removeAwardBtn(post) {
    // Remove award button from Card view posts
    post.removeAttribute('is-awardable');

    // Remove award button from Compact view posts
    const overflowMenu = post.querySelector('unpacking-overflow-menu');
    if (overflowMenu) overflowMenu.removeAttribute('is-post-awardable');
}

// Observe feed for new posts
const observer = new MutationObserver(debounce(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (addedNode) {
            if (['TIME', 'ARTICLE', 'DIV', 'SPAN', 'FACEPLATE-PARTIAL', 'FACEPLATE-LOADER'].includes(addedNode.nodeName)) {
                document.querySelectorAll('shreddit-post').forEach(removeAwardBtn);
            }
        });
    });
}, 100));

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}