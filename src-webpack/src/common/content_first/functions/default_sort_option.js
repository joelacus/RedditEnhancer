/**
 * Set the preferred sort option for home feed, comments, user activities,
 * custom feeds and search results.
 *
 * On v3 UI, the home feed and comment sort options are attached to the Reddit
 * logo and the post links, so Reddit SPA will immediately sort the feed instead
 * of having to go through a page reload.
 *
 * User can change the feed sort option manually at any time.
 */

import { showBannerMessage } from "../../content/banner_message";

// Preload home feed and comment sorting options to attach to Reddit logo and posts
const {
    enableDefaultHomeFeedSortOption: homeFeedSort,
    defaultHomeFeedSortOption: homeFeedSortOption,
    enableDefaultCommentsSortOption: commentSort,
    defaultCommentsSortOption: commentSortOption
} = await getStorage([
    'enableDefaultHomeFeedSortOption',
    'defaultHomeFeedSortOption',
    'enableDefaultCommentsSortOption',
    'defaultCommentsSortOption'
]);
let subreddit, popstate = false;

// When pressing the back button on the page or in the browser, Reddit SPA makes
// a popstate event. Detect this popstate event to stop defaultSortOption from
// reloading the previous page, which is usually an already sorted feed
//
// Note: FF only. popstate events on Chrome happens after pressing the back button,
// then having interaction with the new page (including navigating to a new page),
// whereas popstate on FF happens right after pressing the back button
window.addEventListener('popstate', () => {
    if (typeof window.InstallTrigger !== 'undefined') popstate = true;
});

export async function defaultSortOption() {
    // Get the current URL, which tells RE the current type of page
    const url = new URL(window.location.href);
    // Once the page has loaded, attempt to attach the sorting option to the
    // posts and the Reddit logo in the header
    if (document.readyState === 'complete') {
        if (redditVersion === "newnew") attachSortObserver(url);
    } else {
        window.addEventListener('load', function() {
            if (redditVersion === "newnew") attachSortObserver(url);
        });
    }

    if (/\/(submit|wiki|rules|notifications)/.test(url.pathname)) {
        console.debug("[RedditEnhancer] Skipping defaultSortOption because the current page (submit, wiki, rules) is not sortable");
        const page = url.pathname.match(/\/(submit|wiki|rules|notifications)/)?.[1] || '';
        sessionStorage.setItem('RE.page', page);
    } else if (url.pathname.includes('/comments/') && url.pathname.split('/').filter(item => item !== '').length > 5) {
        // Skip if it's a comment permalink
        console.debug("[RedditEnhancer] Skipping defaultSortOption because the current page (comment permalink) is not sortable");
        sessionStorage.setItem('RE.page', 'comment_permalink');
    } else if (url.href.includes('#lightbox') || classify(url) || popstate) {
        console.debug("[RedditEnhancer] Skipping defaultSortOption for temporary sort option change, or due to popstate or pageshow event: " + popstate);
        popstate = false;
    } else if (url.pathname.includes('/comments/') || (url.searchParams.get('type') === 'comments' && /\/search\//.test(url.pathname))) {
        // Post page and comment search page
        try {
            const {
                enableDefaultCommentsSortOption: sort,
                defaultCommentsSortOption: sortOption
            } = await getStorage(['enableDefaultCommentsSortOption', 'defaultCommentsSortOption']);
            const currentSort = url.searchParams.get('sort');
            console.debug(`[RedditEnhancer] Detected post page or comment search page. Sorting enabled: ${sort}, target sort: ${sortOption}, current sort: ${currentSort}`);
            if (sort && sortOption && (!currentSort || currentSort !== sortOption)) {
                url.searchParams.set('sort', sortOption);
                console.debug("[RedditEnhancer] defaultSortOption: Redirecting to " + url.href);
                window.location.replace(url.href);
            }
        } catch (error) {
            showBannerMessage('error', '[RedditEnhancer] An error occurred when redirecting to the preferred comment sort option.');
            console.error("[RedditEnhancer] Error occurred when redirecting to the preferred comment sort option: " + error);
        }
    } else if (['', '/', '/best/', '/hot/', '/new/', '/top/', '/rising/'].includes(url.pathname)) {
        // Home page
        try {
            const {
                enableDefaultHomeFeedSortOption: sort,
                defaultHomeFeedSortOption: sortOption
            } = await getStorage(['enableDefaultHomeFeedSortOption', 'defaultHomeFeedSortOption']);
            console.debug(`[RedditEnhancer] Detected home feed. Sorting enabled: ${sort}, target sort: ${sortOption}`);
            if (sort && sortOption && !url.pathname.includes(sortOption)) {
                url.pathname = sortOption;
                console.debug("[RedditEnhancer] defaultSortOption: Redirecting to " + url.href);
                window.location.replace(url.href);
            }
        } catch (error) {
            showBannerMessage('error', '[RedditEnhancer] An error occurred when redirecting to the preferred home feed sort option.');
            console.error("[RedditEnhancer] Error occurred when redirecting to the preferred home feed sort option: " + error);
        }
    } else if (url.searchParams.get('type') === 'posts' || /\/search\//.test(url.pathname) || /\/user\/(?!.*\/m\/)/.test(url.pathname)) {
        // Post search and user pages
        try {
            let {
                enableDefaultFeedSortOption: sort,
                defaultFeedSortOption: sortOption
            } = await getStorage(['enableDefaultFeedSortOption', 'defaultFeedSortOption']);
            const currentSort = url.searchParams.get('sort');
            console.debug(`[RedditEnhancer] Detected post search page or user page. Sorting enabled: ${sort}, target sort: ${sortOption}, current sort: ${currentSort}`);
            if (sortOption === 'relevance') sortOption = 'best';
            if (sort && sortOption && (!currentSort || currentSort !== sortOption)) {
                url.searchParams.set('sort', sortOption);
                console.debug("[RedditEnhancer] defaultSortOption: Redirecting to " + url.href);
                window.location.replace(url.href);
            }
        } catch (error) {
            showBannerMessage('error', '[RedditEnhancer] An error occurred when redirecting to the preferred feed sort option.');
            console.error("[RedditEnhancer] Error occurred when redirecting to the preferred feed sort option: " + error);
        }
    } else if (/^\/r\/[^\/]+\/(best|hot|new|top|rising)?\/?$|\/m\//.test(url.pathname)) {
        // Subreddit and multireddit (custom feed) pages
        try {
            const {
                enableDefaultFeedSortOption: sort,
                defaultFeedSortOption: sortOption
            } = await getStorage(['enableDefaultFeedSortOption', 'defaultFeedSortOption']);
            const currentSort = url.pathname.split('/').filter(item => item !== '').pop();
            console.debug(`[RedditEnhancer] Detected subreddit or multireddit (custom feed) page. Sorting enabled: ${sort}, target sort: ${sortOption}, current sort/name: ${currentSort}`);
            if (sort && sortOption && (!currentSort || currentSort !== sortOption)) {
                // Replace the pathname, remove currentSort at the end
                url.pathname = url.pathname.replace(/\/(best|hot|new|top|rising)?\/?$/, '/') + `${sortOption}`;
                console.debug("[RedditEnhancer] defaultSortOption: Redirecting to " + url.href);
                window.location.replace(url.href);
            }
        } catch (error) {
            showBannerMessage('error', '[RedditEnhancer] An error occurred when redirecting to the preferred feed sort option.');
            console.error("[RedditEnhancer] Error occurred when redirecting to the preferred feed sort option: " + error);
        }
    }
}

// Attach home feed and comment sorting options to the Reddit logo and feed posts
// on homepage, subreddit listings and custom feeds. A MutationObserver is placed
// to watch for new posts loaded dynamically using virtual scroll.
export function attachSortObserver(url) {
    // Comment sorting option to posts
    if (/^\/$|^(\/(best|hot|new|top|rising)\/|\/r\/[^\/]+\/(best|hot|new|top|rising)?\/?)$|\/m\//.test(url.pathname) && commentSort && commentSortOption) {
        changePostURLToSort();
        const feed = document.querySelector('shreddit-feed');
        if (feed) {
            observer.observe(feed, {childList: true});
            console.debug("[RedditEnhancer] defaultSortOption: Attached observer for watching new posts");
        }
    }
    // Home feed sorting option to Reddit logo
    if (homeFeedSort && homeFeedSortOption) {
        document.getElementById("reddit-logo")?.setAttribute('href', `/${homeFeedSortOption}`);
        console.debug("[RedditEnhancer] defaultSortOption: Attached home feed sort option to Reddit logo");
        document.querySelector('left-nav-top-section')?.shadowRoot?.querySelector('#home-posts > a')?.setAttribute('href', `/${homeFeedSortOption}?feed=home`);
    }
}

// Add the comment sorting option to the href attribute of shreddit-post > a.
export function changePostURLToSort() {
    const posts = document.querySelectorAll('shreddit-post');
    let postArray = [...posts];
    for (const post of postArray) {
        try {
            if (post.getAttribute('sort') === commentSortOption) continue;
            // WILL AFFECT SHARE LINK.
            // post.setAttribute('permalink', post.getAttribute('permalink') + '?sort=' + commentSortOption);
            const redirect = post.querySelector('a:first-child[slot="full-post-link"]');
            if (redirect) {
                redirect.setAttribute('href', redirect.getAttribute('href') + '?sort=' + commentSortOption);
            }
            // const compact = post.querySelector('unpacking-overflow-menu');
            // if (compact) {
            //     compact.setAttribute('permalink', compact.getAttribute('permalink') + '?sort=' + commentSortOption);
            // }
            post.setAttribute('sort', commentSortOption);
        } catch (error) {
            console.error("[RedditEnhancer] Error occurred when attaching comment sort option to posts: " + error);
        }
    }
}

defaultSortOption().then(() => {}).catch(console.error);

/**
 * Get the feature state from browser sync storage
 *
 * @param keys Keys to get
 * @returns {Promise<Map>} browser.runtime.lastError if RE fails to access browser
 * sync storage;<br>result (containing key values) otherwise
 */
function getStorage(keys) {
    return new Promise((resolve, reject) => {
        BROWSER_API.storage.sync.get(keys, (result) => {
            if (BROWSER_API.runtime.lastError) return reject(BROWSER_API.runtime.lastError);
            resolve(result);
        });
    });
}

/**
 * Check if the page is the same type as the previous page (prevents applying
 * defaultSortOption when a previous sorting option has been applied).
 *
 * @param url URL of the current page to check
 * @returns {boolean} Whether defaultSortOption should be applied
 */
function classify(url) {
    const previousType = sessionStorage.getItem('RE.page'), previousSub = subreddit;
    const navigationEntries = performance.getEntriesByType('navigation');
    subreddit = url.pathname.match(/^\/r\/([^\/]+)\//)?.[1];

    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
        // Page reload (#213: only detect "reload" PerformanceNavigationTiming instead of "navigate" or "back_forward")
        return false;
    } else if (['/', '/best/', '/hot/', '/new/', '/top/', '/rising/'].includes(url.pathname) && previousType !== 'home') {
        sessionStorage.setItem('RE.page', 'home');
        return !!window.chrome && previousType === 'comments';
    } else if (url.pathname.includes('/comments/') && previousType !== 'comments') {
        sessionStorage.setItem('RE.page', 'comments');
        return false;
    } else if (/^\/r\/[^\/]+\/(best|hot|new|top|rising)?\/?$/.test(url.pathname) && (previousType !== 'subreddit' || previousType === 'subreddit' && subreddit !== previousSub)) {
        // Note: when temporarily changing the comment sort option, `type` may
        // change to `subreddit` for a split second (?!)
        sessionStorage.setItem('RE.page', 'subreddit');
        return !!window.chrome && previousType === 'comments';
    } else if (/\/m\//.test(url.pathname) && previousType !== 'multireddit') {
        sessionStorage.setItem('RE.page', 'multireddit');
        return !!window.chrome && previousType === 'comments';
    } else if (/\/user\/(?!.*\/m\/)/.test(url.pathname) && previousType !== 'user') {
        sessionStorage.setItem('RE.page', 'user');
        return false;
    } else if (url.searchParams.get('type') === 'comments' && /\/search\//.test(url.pathname) && previousType !== 'comment_search') {
        sessionStorage.setItem('RE.page', 'comment_search');
        return false;
    } else if (url.searchParams.get('type') === 'posts' && /\/search\//.test(url.pathname) && previousType !== 'post_search') {
        sessionStorage.setItem('RE.page', 'post_search');
        return false;
    } else return true;
}

// Observer for watching new posts in feed
const observer = new MutationObserver(debounce(mutations => {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(addedNode => {
            if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
                changePostURLToSort();
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