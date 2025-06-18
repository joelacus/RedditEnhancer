/**
 * Tweaks: Productivity - Browse Crossposts in Other Subreddits
 *
 * @name viewCrossposts
 * @description Show a list of crossposts in other subreddits when viewing a post.
 *
 * Applies to: New New UI (2023-)
 */
import { showBannerMessage } from "../../banner_message";

let running = false;

// Get the feature state from browser sync storage
export function loadViewCrossposts() {
    BROWSER_API.storage.sync.get(['viewCrossposts'], function (result) {
        if (result.viewCrossposts) viewCrossposts(true);
    });
}

// Activate the feature based on Reddit version
export function viewCrossposts(value) {
    if (redditVersion === 'newnew') {
        if (window.location.pathname.includes('/comments/') && !window.location.hash.includes('lightbox')) {
            value ? enableViewCrossposts() : disableViewCrossposts();
        }
    }
}

// Enable the feature
async function enableViewCrossposts() {
    if (running) return console.log('[RedditEnhancer] viewCrossposts: already running');
    running = true;

    try {
        // Check if the 'View discussions in other communities' link already exists
        if (document.querySelector('#re-view-crossposts')) {
            return console.log('[RedditEnhancer] viewCrossposts: toggle is already attached');
        }
        // Find the ID of the current post
        const post = document.querySelector('shreddit-post');
        if (!post) {
            return console.warn('[RedditEnhancer] viewCrossposts: current page seems to be a post page, but no shreddit-post found');
        }
        const id = post.getAttribute('id').match(/t3_([^\/]+)/)[1];
        console.debug(`[RedditEnhancer] viewCrossposts: Fetching crosspost data for post ID ${id}`);
        const data = await fetchPostData(id);
        if (!data || !Array.isArray(data) || data.length < 2) {
            throw new TypeError('[RedditEnhancer] viewCrossposts: no crossposts found, Reddit API returned no data or unexpected data format');
        }
        const crossposts = data[1].data.children;
        if (crossposts.length === 0) {
            return console.log('[RedditEnhancer] viewCrossposts: no crossposts found for this post');
        }
        console.debug(`[RedditEnhancer] viewCrossposts: Reddit API returned ${crossposts.length} crossposts for post ID ${id}. Creating container...`);
        // Create a list container for crossposts, hidden until clicked
        const container = Object.assign(document.createElement('section'), {
            id: 're-crosspost-list',
            className: 'hidden py-sm',
        });
        // Add crossposts to the container. Note: Set is used to filter out duplicates returned by Reddit API based on permalinks
        const uniqueItems = new Set();
        for (const item of crossposts) {
            // Skip if the item has already been added
            if (uniqueItems.has(item.data.permalink)) continue;
            uniqueItems.add(item.data.permalink);
            // Create a link item for each crosspost
            const link = Object.assign(document.createElement('a'), {
                href: `https://${window.location.hostname}${item.data.permalink}`,
                target: '_blank',
                className: 'block mb-xs hover:no-underline',
            });
            // TITLE [NSFW SPOILER] [FLAIR]
            const title = Object.assign(document.createElement('span'), {
                innerHTML: `${item.data.title}
                            ${item.data.over_18 ? ' <span class="text-category-nsfw" aria-label="NSFW">NSFW</span>' : ''}
                            ${item.data.spoiler ? ' <span style="color:#888;" aria-label="Spoiler">SPOILER</span>' : ''}`,
                className: 'text-tone-1 font-semibold hover:underline',
            });
            // SUBREDDIT Posted by u/AUTHOR RELATIVE TIME SCORE COMMENTS [ARCHIVED LOCKED]
            const tagline = Object.assign(document.createElement('span'), {
                innerHTML: `${item.data.subreddit_name_prefixed} &middot; Posted by u/${item.data.author} ${getRelativeTime(item.data.created_utc * 1000)}
                            &middot; ${item.data.score} points &middot; ${item.data.num_comments} comments
                            ${item.data.archived ? '&#x1F5C4;' : ''}${item.data.locked ? ' &#x1F512;' : ''}`,
                className: 'block text-secondary-weak'
            });
            link.appendChild(title);
            // Add post flair if exists
            if (item.data.link_flair_richtext.length > 0 || (item.data.link_flair_text && item.data.link_flair_text.trim() !== '')) {
                const flair = Object.assign(document.createElement('span'), {
                    style: `background-color: ${item.data.link_flair_background_color}; color: ${item.data.link_flair_text_color === 'dark' ? '#000' : '#fff'};`,
                    innerHTML: item.data.link_flair_richtext.map(f => f.t).join(' ') || item.data.link_flair_text,
                    className: 're-post-flair inline-block truncate max-w-full text-12 font-normal align-text-bottom box-border px-[6px] rounded-[20px] leading-4 text-secondary relative py-0 ml-xs'
                });
                link.appendChild(flair);
            }
            link.appendChild(tagline);
            container.appendChild(link);
        }
        // Show a warning if there are differences from the number of crossposts returned by Reddit API
        if (container.children.length < crossposts.length) {
            const warning = Object.assign(document.createElement('p'), {
                className: 'mb-xs',
                textContent: 'Some crossposts are not displayed because Reddit API returned some duplicate crosspost items.'
            });
            container.insertBefore(warning, container.firstChild);
        }
        // Place the container after the comment tree
        console.debug(`[RedditEnhancer] viewCrossposts: ${crossposts.length} crossposts added to the container. Placing container...`);
        const commentTree = document.querySelector('div[id^="comment-tree-content-anchor-"]');
        if (!commentTree) {
            return console.warn('[RedditEnhancer] viewCrossposts: comment tree not found, cannot place crosspost container');
        }
        commentTree.insertAdjacentElement('afterend', container);
        // Create a link to toggle the visibility of the crosspost container
        console.debug('[RedditEnhancer] viewCrossposts: Crosspost container placed. Creating toggle link...');
        const link = Object.assign(document.createElement('a'), {
            id: 're-view-crossposts',
            textContent: `View discussions in ${container.children.length} other communit${container.children.length > 1 ? 'ies' : 'y'}`,
            className: 'mt-sm text-right shrink-0 text-neutral-content-weak',
        });
        // Add a click event listener to toggle the visibility of the crosspost container and the comment tree
        link.addEventListener('click', (e) => {
            e.preventDefault();
            commentTree.classList.toggle('hidden');
            container.classList.toggle('hidden');
        });
        // Add the link to the comment body header
        console.debug('[RedditEnhancer] viewCrossposts: Toggle link created. Appending to comment body header...');
        // Check if comment-body-header exists, if not (due to no comments) create a placeholder
        if (!document.querySelector('comment-body-header > div')) {
            const placeholder = document.createElement('div');
            placeholder.classList.add('flex', 'h-[40px]', 'items-center', 'justify-end');
            document.querySelector('comment-body-header')?.appendChild(placeholder);
        }
        // Append the link to the comment body header
        document.querySelector('comment-body-header > div')?.appendChild(link);
    } catch (e) {
        // Log the error to the developer console
        console.error('[RedditEnhancer] viewCrossposts: ', e);
    } finally {
        running = false;
    }
}

// Disable the feature
function disableViewCrossposts() {
    // Remove the crosspost container if it exists
    const container = document.querySelector('#re-crosspost-list');
    if (container) {
        container.remove();
        console.debug('[RedditEnhancer] viewCrossposts: Crosspost container removed');
    } else {
        console.warn('[RedditEnhancer] viewCrossposts: No crosspost container found to remove');
    }
    // Remove the toggle link if it exists
    const toggleLink = document.querySelector('#re-view-crossposts');
    if (toggleLink) {
        toggleLink.remove();
        console.debug('[RedditEnhancer] viewCrossposts: Toggle link removed');
    } else {
        console.warn('[RedditEnhancer] viewCrossposts: No toggle link found to remove');
    }
}

// Function to fetch post data from Reddit API
async function fetchPostData(postID) {
    const fetch_url = `https://www.reddit.com/duplicates/${postID}.json`;
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    let response;

    try {
        if (isChrome && window.location.hostname === 'sh.reddit.com') {
            response = await fetch(fetch_url, { method: 'GET', mode: 'no-cors' });
        } else {
            response = await fetch(fetch_url, { method: 'GET' });
        }
        if (!response.ok) { throw response.status; }
        return await response.json();
    } catch (error) {
        // If this is a known error, display a visual banner message
        if (error instanceof TypeError && error.message === 'NetworkError when attempting to fetch resource.') {
            showBannerMessage('error', 'Cannot retrieve post data as www.reddit.com is currently unreachable.');
        } else if (error === 403) {
            showBannerMessage('error', 'Error retrieving post data: you seem to be rate-limited by reddit');
        } else {
            showBannerMessage('error', 'Cannot retrieve post data as something wrong happened on Reddit\'s end.');
        }

        // Log the error to the developer console
        console.error('[RedditEnhancer] Error retrieving post data:', error);
        throw error;
    }
}

// Helper to get relative time string
function getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000); // seconds
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min. ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr. ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) === 1 ? '' : 's'} ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} mo. ago`;
    return `${Math.floor(diff / 31536000)} yr. ago`;
}