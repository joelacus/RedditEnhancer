/**
 * Tweaks: Hide Elements - Hide Vote Buttons
 *
 * @name hideVoteButtons
 * @description Hide the vote buttons on posts and comments.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideVoteButtons() {
	BROWSER_API.storage.sync.get(['hideVoteButtons']).then((result) => {
		if (result.hideVoteButtons) hideVoteButtons(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideVoteButtons(value) {
	if (redditVersion === 'old') {
		if (value) {
			if (!document.head.querySelector('style[id="re-hide-vote-buttons"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-vote-buttons';
				styleElement.textContent = `/* Post vote buttons */
                                            .thing div.midcol,
                                            /* Comment vote buttons */
                                            .comment div.midcol {
                                                display: none;
                                                visibility: hidden;
                                            }
                                            a.thumbnail {
                                                margin-left: .5rem;
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
				styleElement.textContent = `.re-vote-panel span,
                                            shreddit-post::part(vote),
                                            shreddit-comment-action-row::part(vote) {
                                                display: none;
                                                visibility: hidden;
                                            }`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			attachPartObserver();
			observer.observe(document.querySelector('.main-container'), { childList: true, subtree: true });
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
