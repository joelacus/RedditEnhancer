/**
 * Tweaks: Productivity - Show Upvote Ratio
 * @name showUpvoteRatio
 * @description Show the upvote ratio of post in post detail view.
 *
 * Applies to: New New UI (2023-)
 */

import { showBannerMessage } from "../../banner_message";

// Flag to halt the process and prevent multiple error messages when an error occur
let e = false;

// Get the feature state from browser sync storage
export function loadShowUpvoteRatio() {
    BROWSER_API.storage.sync.get(['showUpvoteRatio'], function (result) {
        if (result.showUpvoteRatio) showUpvoteRatio(true);
    });
}

// Activate the feature based on Reddit version
export function showUpvoteRatio(value) {
    const routeName = document.querySelector('shreddit-app').getAttribute('routename');
    const feedRoutes = ['post_page', 'comment_page'];

    if (value && redditVersion === 'newnew' && feedRoutes.includes(routeName)) {
        attachRatio(document.querySelector('shreddit-post'));
    } else {
        document.querySelector('shreddit-post::part(re-upvote-ratio)').remove();
    }
}

async function attachRatio(post) {

    if (e) return;

    if (!post.querySelector('shreddit-post-flair > .re-upvote-ratio')) {
        const postID = post.getAttribute('id');
        const postData = await fetchPostData(postID);
        const upvoteRatio = postData.children[0].data.upvote_ratio;

        if (upvoteRatio) {
            let ratio = Object.assign(document.createElement('span'), {
                textContent: ` (${upvoteRatio * 100}%)`,
                part: 're-upvote-ratio',
            });
            document.querySelector('shreddit-post').shadowRoot
                .querySelector('span[data-post-click-location="vote"] faceplate-number').append(ratio);
        }
    }
}

// Function to fetch post data from Reddit API
async function fetchPostData(postID) {
    const fetch_url = `https://www.reddit.com/api/info.json?id=${postID}`;
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    let response;

    try {
        if (isChrome && window.location.hostname === 'sh.reddit.com') {
            response = await fetch(fetch_url, { method: 'GET', mode: 'no-cors' });
        } else {
            response = await fetch(fetch_url, { method: 'GET' });
        }
        if (!response.ok) { throw response.status; }
        const data = await response.json();
        return data.data;
    } catch (error) {
        // whoa there, pardner!
        if (e) return;

        // If this is a known error, display a visual banner message
        if (error instanceof TypeError && error.message === 'NetworkError when attempting to fetch resource.') {
            showBannerMessage('error', 'Cannot retrieve post data and show upvote ratio as www.reddit.com is currently unreachable.');
        } else if (error === 403) {
            showBannerMessage('error', 'Error retrieving post data: you seem to be rate-limited by reddit');
        } else {
            showBannerMessage('error', 'Cannot retrieve post data and show upvote ratio as something wrong happened on Reddit\'s end.');
        }

        // Log the error to the developer console
        console.error('[RedditEnhancer] Error retrieving post data and showing upvote ratio:', error);
        e = true;
        throw error;
    }
}