/**
 * Tweaks: Hide Elements - Hide vote buttons
 * @name hideVoteButtons
 * @description Hide the vote buttons on posts and comments.
 *
 * Applies to: Old New UI (2018-2024), New New UI (2023-)
 */

// Get the feature state from browser sync storage
export function loadHideVoteButtons() {
    BROWSER_API.storage.sync.get(['hideVoteButtons']).then((result) => {
        if (result.hideVoteButtons) hideVoteButtons(true);
    });
}

// Activate the feature based on Reddit version
export function hideVoteButtons(value) {
    if (redditVersion === 'new') {
        if (value) {
            if (!document.head.querySelector('style[id="re-hide-vote-buttons"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-hide-vote-buttons';
                styleElement.textContent = `/* Post vote buttons */
                                            div[data-testid="post-container"] div[id*="vote-arrows-"],
                                            #overlayScrollContainer > div div[id*="vote-arrows-"],
                                            /* Comment vote buttons */
                                            .Comment div[id*="vote-arrows-"] {
                                                display: none;
                                                visibility: hidden;
                                            }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
        } else {
            const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-vote-buttons"]');
            dynamicStyleElements.forEach((element) => {
                document.head.removeChild(element);
            });
        }
    } else if (redditVersion === 'newnew') {
        if (value) {
            if (!document.head.querySelector('style[id="re-hide-vote-buttons"]')) {
                const styleElement = document.createElement('style');
                styleElement.id = 're-hide-vote-buttons';
                styleElement.textContent = `shreddit-post::part(vote),
                                            shreddit-comment-action-row::part(vote) {
                                                display: none;
                                                visibility: hidden;
                                            }`;
                document.head.insertBefore(styleElement, document.head.firstChild);
            }
            attachPartObserver();
            observer.observe(document.querySelector('.main-container'), {childList: true, subtree: true});
        } else {
            observer.disconnect();
            const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-vote-buttons"]');
            dynamicStyleElements.forEach((element) => {
                document.head.removeChild(element);
            });
            detachPartObserver();
        }
    }
}

// Attach part attribute to element inside shadow DOM (shreddit-post, shreddit-comment-action-row)
function attachPartObserver() {
    document.querySelectorAll('shreddit-post, shreddit-comment-action-row').forEach((element) => {
        if (element.shadowRoot.querySelector('span:has(>button[upvote])')) {
            if (element.tagName === 'SHREDDIT-POST') {
                element.shadowRoot.querySelector('span:has(>span[data-post-click-location="vote"])').setAttribute('part', 'vote');
            } else {
                element.shadowRoot.querySelector('span:has(>button[upvote])').setAttribute('part', 'vote');
            }
        }
    });
}

// Detach part attribute from element inside shadow DOM (shreddit-post, shreddit-comment-action-row)
function detachPartObserver() {
    document.querySelectorAll('shreddit-post, shreddit-comment-action-row').forEach((element) => {
        if (element.shadowRoot.querySelector('span:has(>button[upvote])')) {
            if (element.tagName === 'SHREDDIT-POST') {
                element.shadowRoot.querySelector('span:has(>span[data-post-click-location="vote"])').removeAttribute('part');
            } else {
                element.shadowRoot.querySelector('span:has(>button[upvote])').removeAttribute('part');
            }
        }
    });
}

// Observer for dynamically added elements
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.nodeName === 'DIV' || addedNode.nodeName === 'SHREDDIT-COMMENT') {
                setTimeout(attachPartObserver, 0);
            }
        });
    });
});