/**
 * Tweaks: Productivity - Show Subreddit Member Count
 * @name showMemberCount
 * @description Fetch the subreddit member count from Reddit's public API and
 * display it in place of the new "Weekly Users" count in the subreddit header.
 *
 * Compatibility: RV1 (Old UI) (2005–), RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from "../../banner_message";

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowMemberCount() {
    BROWSER_API.storage.sync.get(['showMemberCount']).then((result) => {
        if (result.showMemberCount) showMemberCount(true);
    });
}

/* === Enable/Disable The Feature === */
export function showMemberCount(value) {
    if (value) {
        if (redditVersion === 'old') {
            enableShowMemberCountRV1();
        } else if (redditVersion === 'newnew') {
            enableShowMemberCountRV3();
        }
    } else {
        if (redditVersion === 'old') {
            disableShowMemberCountRV1();
        } else if (redditVersion === 'newnew') {
            showBannerMessage("info", "[RedditEnhancer] Refresh the page for the change to take effect.");
        }
    }
}

async function enableShowMemberCountRV1() {
    let data;

    // Check if the current page is a subreddit or post page, if so get the subreddit name from the URL
    const subreddit = window.location.pathname.match(/^\/r\/([^/]+)\/?/);
    if (!subreddit) return;
    const name = subreddit[1];

    // Fetch subreddit data from Reddit API
    console.debug(`[RedditEnhancer] showMemberCount: Fetching member count from Reddit API for subreddit ${name}`);
    try {
        data = (await BROWSER_API.runtime.sendMessage({
            actions: [
                {
                    action: 'fetchData',
                    url: `https://www.reddit.com/r/${name}/about.json`,
                },
            ],
        })).data;
        if (!data) {
            console.warn(`[RedditEnhancer] showMemberCount: No data found for subreddit ${name}`);
            return;
        }
    } catch (e) {
        console.error(`[RedditEnhancer] showMemberCount: Error fetching member count for subreddit ${name}`, error);
        showBannerMessage('error', error.error || error);
        return;
    }
    // Extract member count from API response
    const memberCount = data.subscribers || -1;

    // Create and insert the member count element into the page
    const text = document.createElement('div');
    text.classList.add('re-member-count');
    text.textContent = `${memberCount.toString(10)} readers`;
    const joinBtn = document.querySelector('.subButtons');
    if (joinBtn && !document.querySelector('.re-member-count')) {
        joinBtn.parentNode.insertBefore(text, joinBtn.nextSibling);
    }
}

function disableShowMemberCountRV1() {
    const memberCountElements = document.querySelectorAll('.re-member-count');
    memberCountElements.forEach((element) => {
        element.remove();
    });
}

async function enableShowMemberCountRV3() {
    let data;

    // Check if the current page has a subreddit header in the sidebar and get the subreddit name
    const header = document.querySelector('shreddit-subreddit-header');
    if (!header) return;
    const name = header.getAttribute('name');
    if (!name) return;

    // Fetch subreddit data from Reddit API
    console.debug(`[RedditEnhancer] showMemberCount: Fetching member count from Reddit API for subreddit ${name}`);
    try {
        data = (await BROWSER_API.runtime.sendMessage({
            actions: [
                {
                    action: 'fetchData',
                    url: `https://www.reddit.com/r/${name}/about.json`,
                },
            ],
        })).data;
        if (!data) {
            console.warn(`[RedditEnhancer] showMemberCount: No data found for subreddit ${name}`);
            return;
        }
    } catch (e) {
        console.error(`[RedditEnhancer] showMemberCount: Error fetching member count for subreddit ${name}`, error);
        showBannerMessage('error', error.error || error);
        return;
    }

    // Extract member count from API response
    const memberCount = data.subscribers || -1;

    // Update the subreddit header with the member count
    const text = header.querySelector('span[slot="weekly-active-users-count"]');
    if (text) text.textContent = formatNumber(memberCount.toString(10));
    if (header.getAttribute('subscribers-text') === '') {
        header.setAttribute('subscribers-text', 'Members');
    }
    header.removeAttribute('weekly-contributions');
}

/**
 * Format numbers to short form, e.g. 1500 to 1.5k.
 *
 * @param num
 * @returns {string|string}
 */
function formatNumber(num) {
    const units = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'G' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'K' },
        { value: 1, symbol: '' },
    ];
    const item = units.find((unit) => num >= unit.value);
    return item ? (num / item.value).toFixed(1).replace(/\.0$/, '') + item.symbol : '0';
}