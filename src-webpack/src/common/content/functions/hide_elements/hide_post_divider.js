/* ===== Tweak - Hide - Post Dividers ===== */

export function loadHidePostDivider() {
    BROWSER_API.storage.sync.get('hidePostDivider').then((result) => {
        if (result.hidePostDivider) hidePostDivider(true);
    });
}

export function hidePostDivider(value) {
    if (redditVersion === 'newnew') {
        if (value) {
            enableHidePostDivider();
        } else {
            disableHidePostDivider();
        }
    }
}

function enableHidePostDivider() {
    if (!document.head.querySelector('style[id="re-hide-post-divider"]')) {
        const styleElement = document.createElement('style');
        styleElement.id = 're-hide-post-divider';
        styleElement.textContent =
            `shreddit-title ~ hr,
            article ~ hr,
            faceplate-tracker ~ hr,
            custom-feed > hr,
            search-telemetry-tracker ~ hr,
            comment-body-header > hr {
                display: none;
                visibility: hidden;
            }
            article,
            faceplate-batch > article,
            reddit-feed > faceplate-tracker > div {
                margin-bottom: .6rem !important;
            }
            main#main-content search-telemetry-tracker > div {
                margin: .6rem 0;
            }
            article > shreddit-post {
                padding: .75rem !important;
	            margin: 0 !important;
            }
            shreddit-app[routename="mod_queue"] article > shreddit-post,
            shreddit-app[routename="mod_queue_all"] article > shreddit-post {
                padding-left: 2rem !important;
            }`;
        document.head.insertBefore(styleElement, document.head.firstChild);
    }
}

function disableHidePostDivider() {
    const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-divider"]');
    dynamicStyleElements.forEach((element) => {
        document.head.removeChild(element);
    });
}