/**
 * Tweaks: Style - Left-side Vote Buttons on Posts
 *
 * @name leftSideVoteButtons
 * @description Move the vote buttons to the left side of the post.
 *
 * On v3 UI, post content in feed are nested under two HTML elements, an <article> and a custom semantic <shreddit-post>,
 * the latter of which is grid-based. To place the vote buttons on the left side of the posts, because moving the
 * grid layout takes a lot of shadow DOM effort, within the <article> I have to shrink the <shreddit-post> and align it
 * to the right, leaving enough space on the left for the buttons. This means that the vote buttons are part of <article>
 * rather than <shreddit-post>.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';

let isAttaching = false;

/* === Run by Tweak Loader when the Page Loads === */
export function loadLeftSideVoteButtons() {
	BROWSER_API.storage.sync.get(['leftSideVoteButtons'], function (result) {
		if (result.leftSideVoteButtons) leftSideVoteButtons(true);
	});
}

/* === Enable/Disable The Feature === */
export function leftSideVoteButtons(value) {
	if (redditVersion === 'newnew') {
		if (value && !document.querySelector('shreddit-app').getAttribute('routename').includes('mod_queue')) {
			enableLeftSideVoteButtonsRV3();
			attachVoteButtons();
			if (document.querySelector('shreddit-feed')) {
				observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
			}
			if (document.querySelector('shreddit-post[view-context="CommentsPage"]')) {
				const crosspost = document.querySelector('shreddit-post').getAttribute('post-type');
				const tagline = document.querySelector('shreddit-post span.avatar + div > div');
				if (tagline) {
					const author = tagline.querySelector('faceplate-tracker[noun="user_profile"]:first-child');
					if (author) {
						if (crosspost === 'crosspost') {
							author.childNodes[0].textContent = 'Crossposted by u/' + author.childNodes[0].textContent;
						} else {
							author.childNodes[0].textContent = 'Posted by u/' + author.childNodes[0].textContent;
						}
					}
					document.querySelector('shreddit-post span#time-ago-separator').insertAdjacentElement('afterend', tagline);
				}
			}
		} else {
			disableLeftSideVoteButtonsRV3();
			observer.disconnect();
		}
	}
}

// Enable Left Side Vote Buttons - RV3
function enableLeftSideVoteButtonsRV3() {
	if (!document.head.querySelector('style[id="re-left-side-vote-buttons"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-left-side-vote-buttons';
		styleElement.textContent = `
			shreddit-feed > article:has(> shreddit-post),
			shreddit-feed faceplate-batch > article:has(> shreddit-post) {
				display: flex;
				background-color: color-mix(in srgb, var(--color-neutral-background), transparent 25%);
				backdrop-filter: blur(var(--re-theme-blur));
				border: 1px solid var(--re-theme-post-border);
				border-radius: var(--re-theme-border-radius);
			}
			shreddit-feed > article > shreddit-post,
			shreddit-feed faceplate-batch > article > shreddit-post {
				flex-grow: 1;
				border: none;
				min-width: 0;
				
				& > span.min-h-\\[32px\\] {
					min-height: revert;
					margin-bottom: 8px;
				}
				& a.h-xl[data-testid="subreddit-name"] {
					height: revert;
				}
				& faceplate-hovercard a span[avatar],
				& span.h-lg.w-lg {
					width: 20px;
					height: 20px;
					
					& img {
						width: 100% !important;
					}
				}
			}
			shreddit-feed .re-vote-panel {
			    display: flex;
                flex-direction: column;
                align-items: center;
                flex: 0 0 40px;
            }
			shreddit-app[routename="post_page"] main.main,
			shreddit-app[routename="comments_page"] main.main,
			shreddit-app[routename="profile_post_page"] main.main,
			shreddit-app[routename="profile_post_page_comments"] main.main {
			    padding-left: 0;
			    
			    & .re-vote-panel {
			        display: inline-block;
			        width: 40px;
			        vertical-align: top;
			        padding: .25rem 0;
			        margin-top: .75rem;
			    }
			    & .re-vote-panel + shreddit-post {
                    display: inline-block;
                    width: calc(100% - 40px);
                    padding-left: .75rem;
                }
                comment-body-header {
                    margin-left: 0;
                    padding-left: 44px;
                    padding-right: 1rem;
                }
                shreddit-comments-page-tools {
                    padding-left: 28px;
                }
                shreddit-comment-tree {
                    margin-left: 4px;
                    margin-top: 8px;
                }
                shreddit-post .md,
                shreddit-comment > .md {
                    padding-right: 1rem;
                }
			}
			span[id^="comment-tree-content-anchor-"] > div {
			    padding: 1rem 3rem;
                width: calc(100% - 4.5rem);
            }
            div[slot="commentAvatar"] a span,
            div[slot="commentAvatar"] a svg {
                width: 1.75rem;
                height: 1.75rem;
            }
            div[slot="commentAvatar"] a > span {
                margin: 0 0.125rem;
            }
            div[slot="credit-bar"] span.avatar,
            div[slot="credit-bar"] span.avatar * {
                width: 20px !important;
                height: 20px;
                margin: initial;
                font-size: initial;
                line-height: normal;
            }
            shreddit-post > div.flex.relative.pt-md[slot="credit-bar"] {
                padding-top: .5rem;
                height: 24px;
            }
            [routename="post_page"] shreddit-post span.avatar + div > div,
            [routename="comment_page"] shreddit-post span.avatar + div > div {
                display: none;
            }
            div#pdp-credit-bar[slot="credit-bar"] pdp-back-button {
                position: absolute;
                left: -5.5rem;
                top: 0;
            }
            shreddit-app[routename="post_page"] shreddit-post[post-type="link"]:has(img#post-image) h1,
            shreddit-app[routename="comment_page"] shreddit-post[post-type="link"]:has(img#post-image) h1 {
                margin-right: calc(144px + 2rem);
            }
            #re-crosspost-list {
                margin-left: 40px;
            }
            
            [routename="profile_post_page"] #pdp-credit-bar > span.truncate > span,
            [routename="profile_post_page"] #pdp-credit-bar > span.truncate > div .subreddit-name,
            [routename="profile_post_page"] #pdp-credit-bar > span.truncate > div #time-ago-separator,
            [routename="profile_post_page_comments"] #pdp-credit-bar > span.truncate > span,
            [routename="profile_post_page_comments"] #pdp-credit-bar > span.truncate > div .subreddit-name,
            [routename="profile_post_page_comments"] #pdp-credit-bar > span.truncate > div #time-ago-separator {
                display: none;
            }
            [routename="profile_post_page"] #pdp-credit-bar > span.truncate,
            [routename="profile_post_page_comments"] #pdp-credit-bar > span.truncate {
                align-items: start;
            }
            [routename="profile_post_page"] #pdp-credit-bar > span.truncate > div,
            [routename="profile_post_page_comments"] #pdp-credit-bar > span.truncate > div {
                flex-direction: row-reverse;
            }
            [routename="profile_post_page"] #pdp-credit-bar .author-name:before,
            [routename="profile_post_page_comments"] #pdp-credit-bar .author-name:before {
                content: "Posted by u/";
            }
            [routename="profile_post_page"] shreddit-post h1[slot="title"],
            [routename="profile_post_page_comments"] shreddit-post h1[slot="title"] {
                margin-top: 0;
            }
            
            shreddit-app[routename='post_page'] shreddit-post span[slot='mod-overflow-menu'],
			shreddit-app[routename='comments_page'] shreddit-post span[slot='mod-overflow-menu'],
			shreddit-app[routename='profile_post_page'] shreddit-post span[slot='mod-overflow-menu'] {
				margin-right: 18px;
			}
			shreddit-comment:not([is-highlighted]) > shreddit-comment-action-row > span[slot='mod-overflow-menu'] {
				margin-right: 11px;
			}
			`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Left Side Vote Buttons - RV3
function disableLeftSideVoteButtonsRV3() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-left-side-vote-buttons"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	showBannerMessage('info', '[RedditEnhancer] Please refresh the page for the change to take full effect.');
}

async function attachVoteButtons() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('shreddit-post');
	let postArray = [...posts];

	for (const post of postArray) {
		if (!post.parentNode.querySelector('.re-vote-panel')) {
			const votePanel = Object.assign(document.createElement('div'), {
				className: 're-vote-panel',
			});
			const voteButtons = post.shadowRoot?.querySelector('span[data-post-click-location="vote"]')?.parentNode;
			if (voteButtons) {
				votePanel.appendChild(voteButtons);
				post.parentNode.insertBefore(votePanel, post);
			}
		}
	}

	isAttaching = false;
}

// Observer for watching new posts in feed
const observer = new MutationObserver(
	debounce((mutations) => {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach((addedNode) => {
				if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
					attachVoteButtons();
				}
			});
		});
	}, 100)
);

// Allowing some timeout between attachment to prevent performance issues
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
