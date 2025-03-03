/**
 * Tweaks: Productivity - Show Upvote Ratio
 * @name showUpvoteRatio
 * @description Show the upvote ratio of post in post detail view.
 *
 * Applies to: New New UI (2023-)
 *
 * @see ./show_post_flair.js
 */

import { fetchPostData } from "./show_post_flair";

// Get the feature state from browser sync storage
export function loadShowUpvoteRatio() {
    BROWSER_API.storage.sync.get(['showUpvoteRatio'], function (result) {
        if (result.showUpvoteRatio) showUpvoteRatio(true);
    });
}

// Activate the feature based on Reddit version
export function showUpvoteRatio(value) {
    if (redditVersion === 'new') {
        if (value && window.location.pathname.includes('/comments/')) {
            attachRatio(document.querySelector('div#overlayScrollContainer div.Post'));
        } else {
            document.querySelector('.re-upvote-ratio').remove();
        }
    } else if (redditVersion === 'newnew') {
        const routeName = document.querySelector('shreddit-app').getAttribute('routename');
        const feedRoutes = ['post_page', 'comment_page'];
        if (value && feedRoutes.includes(routeName)) {
            attachRatio(document.querySelector('shreddit-post'));
        } else {
            document.querySelector('shreddit-post::part(re-upvote-ratio)').remove();
        }
    }
}

async function attachRatio(post) {
    const postID = post.getAttribute('id');
    const postData = await fetchPostData(postID);
    const upvoteRatio = postData.children[0].data.upvote_ratio || -0.01;

    let ratio = Object.assign(document.createElement('span'), {
        textContent: ` (${upvoteRatio * 100}%)`,
        className: 're-upvote-ratio',
        part: 're-upvote-ratio'
    })

    if (redditVersion === 'new' && !post.querySelector('.re-upvote-ratio')) {
        post.querySelector('button[data-click-id="upvote"] + div').append(ratio);
    } else if (redditVersion === 'newnew' && !post.querySelector('shreddit-post-flair > .re-upvote-ratio')) {
        document.querySelector('shreddit-post').shadowRoot
                .querySelector('span[data-post-click-location="vote"] faceplate-number')
                .append(ratio);
    }
}
