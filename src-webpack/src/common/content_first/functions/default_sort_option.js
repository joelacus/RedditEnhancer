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
let type, subreddit, popstate = false;

// When pressing the back button on the page or in the browser, Reddit SPA makes
// a popstate event. Detect this popstate event to stop defaultSortOption from
// reloading the previous page, which is usually an already sorted feed
window.addEventListener('popstate', () => { popstate = true; });

export async function defaultSortOption() {
    // Get the current URL, which tells RE the current type of page
    const url = new URL(window.location.href);
    // Once the page has loaded, attempt to attach the sorting option to the
    // posts and the Reddit logo in the header
    if (redditVersion === "newnew") {
        if (document.readyState === 'complete') {
            attachSortObserver(url);
        } else {
            window.addEventListener('load', () => attachSortObserver(url));
        }
    }
    // If it is the same type of page (because user manually change the sorting
    // option), or was navigated using the Back button, don't override previous sort
    if (url.href.includes('#lightbox') || classify(url) || popstate) {
        console.debug("[RedditEnhancer] Skipping defaultSortOption for temporary sort option change, or due to popstate event: " + popstate);
        popstate = false;
        return;
    }

    if (/\/(submit|wiki|rules)/.test(url.pathname)) {
        console.debug("[RedditEnhancer] Skipping defaultSortOption because the current page (submit, wiki, rules) is not sortable");
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
                url.pathname = [...url.pathname.split('/').filter((item) => item !== ''), sortOption].join('/');
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
function attachSortObserver(url) {
    // Comment sorting option to posts
    if (/^(\/(best|hot|new|top|rising)\/|\/r\/[^\/]+\/(best|hot|new|top|rising)?\/?)$|\/m\//.test(url.pathname) && commentSort && commentSortOption) {
        changePostURLToSort();
        observer.observe(document.querySelector('shreddit-feed'), {childList: true});
        console.debug("[RedditEnhancer] defaultSortOption: Attached observer for watching new posts");
    }
    // Home feed sorting option to Reddit logo
    if (homeFeedSort && homeFeedSortOption) {
        document.getElementById("reddit-logo")?.setAttribute('href', `/${homeFeedSortOption}`);
        console.debug("[RedditEnhancer] defaultSortOption: Attached home feed sort option to Reddit logo");
    }
}

// Add the comment sorting option to the href attribute of shreddit-post > a.
export function changePostURLToSort() {
    const posts = document.querySelectorAll('shreddit-post');
    let postArray = [...posts];
    for (const post of postArray) {
        try {
            if (post.getAttribute('sort') === commentSortOption) continue;
            const redirect = post.querySelector('a:first-child[slot="full-post-link"]');
            if (redirect) {
                redirect.setAttribute('href', redirect.getAttribute('href') + '?sort=' + commentSortOption);
                post.setAttribute('sort', commentSortOption);
            }
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
    const previousType = type, previousSub = subreddit;
    subreddit = url.pathname.match(/^\/r\/([^\/]+)\//)?.[1];

    if (['/', '/best/', '/hot/', '/new/', '/top/', '/rising/'].includes(url.pathname) && type !== 'home') {
        type = 'home';
        return !!window.chrome && (!!window.CSS || !!window.webkitRequestFileSystem) && previousType === 'comments';
    } else if (url.pathname.includes('/comments/') && type !== 'comments') {
        type = 'comments';
        return false;
    } else if (/^\/r\/[^\/]+\/(best|hot|new|top|rising)?\/?$/.test(url.pathname) && (type !== 'subreddit' || subreddit !== previousSub)) {
        // Note: when temporarily changing the comment sort option, `type` may
        // change to `subreddit` for a split second (?!)
        type = 'subreddit';
        return !!window.chrome && (!!window.CSS || !!window.webkitRequestFileSystem) && previousType === 'comments';
    } else if (/\/m\//.test(url.pathname) && type !== 'multireddit') {
        type = 'multireddit';
        return !!window.chrome && (!!window.CSS || !!window.webkitRequestFileSystem) && previousType === 'comments';
    } else if (/\/user\/(?!.*\/m\/)/.test(url.pathname) && type !== 'user') {
        type = 'user';
        return false;
    } else if (url.searchParams.get('type') === 'comments' && /\/search\//.test(url.pathname) && type !== 'comment_search') {
        type = 'comment_search';
        return false;
    } else if (url.searchParams.get('type') === 'posts' && /\/search\//.test(url.pathname) && type !== 'post_search') {
        type = 'post_search';
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