/* ===== Tweaks - Style - Full Width Subreddit Banner ===== */

/* === Triggered On Page Load === */
export function loadFullWidthBanner() {
    BROWSER_API.storage.sync.get(['fullWidthBanner'], function (result) {
        if (result.fullWidthBanner) fullWidthBanner(true);
    });
}

/* === Main Function === */
export function fullWidthBanner(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableFullWidthBanner();
        } else {
            disableFullWidthBanner();
        }
    }
}

// Function - Enable Full Width Banner
function enableFullWidthBanner() {
    const styleElement = document.createElement('style');
    styleElement.id = 're-full-width-banner';
    styleElement.textContent = 
        `div.community-banner {
        	margin-top: 0;
        	border-radius: 0;
        }
        shreddit-app[routename="subreddit"] div.subgrid-container,
        shreddit-app[routename="subreddit_wiki"] div.subgrid-container {
        	padding: 0 !important;
        	max-width: 100% !important;
        	width: 100%;
        }
        shreddit-app[routename="subreddit"] div.main-container,
        shreddit-app[routename="subreddit_wiki"] div.main-container {
        	width: initial;
        	padding: 0 1rem;
        }
        html:not(.re-expand-feed-layout) shreddit-app[routename="subreddit"] div.main-container,
        html:not(.re-expand-feed-layout) shreddit-app[routename="subreddit_wiki"] div.main-container {
        	justify-content: center;
        }`;
    document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Full Width Banner
function disableFullWidthBanner() {
    const styleElement = document.head.querySelectorAll('style[id="re-full-width-banner"]');
    styleElement.forEach((element) => {
        document.head.removeChild(element);
    });
}