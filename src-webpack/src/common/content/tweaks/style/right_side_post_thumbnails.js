/**
 * Tweaks: Style - Show post thumbnails on the right side
 *
 * @name rightSidePostThumbnails
 * @description Display post thumbnails on the right side of posts.
 *
 * Applies to: Old UI (2005–)
 */

// Get the feature state from browser sync storage
export function loadRightSidePostThumbnails() {
    BROWSER_API.storage.sync.get(['rightSidePostThumbnails'], function (result) {
        if (result.rightSidePostThumbnails) rightSidePostThumbnails(true);
    });
}

// Activate the feature based on Reddit version
export function rightSidePostThumbnails(value) {
    if (redditVersion === 'old') {
        if (value) {
            if (!document.head.querySelector('style[id="re-right-side-post-thumbnails"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-right-side-post-thumbnails';
                styleElement.textContent = `
                    #siteTable .thing:not(.compressed) {
                    	min-height: 70px;
                    }
                    #siteTable .thing.self:has(.thumbnail.self),
                    #siteTable .thing.spoiler:not(.compressed),
                    #siteTable .thing.over18:has(.thumbnail.nsfw),
                    #siteTable .thing:has(.thumbnail.default) {
                    	min-height: 50px;
                    }
                    a.thumbnail {
                    	float: right;
                    }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        } else {
            const dynamicStyleElements = document.querySelectorAll('style[id="re-right-side-post-thumbnails"]');
            dynamicStyleElements.forEach((element) => {
                document.head.removeChild(element);
            });
        }
    }
}