/**
 * Tweaks: Style - Left-side Vote Buttons on Posts
 *
 * @name leftSideVoteButtons
 * @description Move the vote buttons to the left side of the post.
 *
 * Note: Physically moving the DOM elements seems to break the voting buttons in new Reddit builds,
 *       so the buttons are now moved using pure CSS.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { registerMutationCallback } from '../../observer_manager';

let isAttaching = false;

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadLeftSideVoteButtons() {
	BROWSER_API.storage.sync.get(['leftSideVoteButtons'], function (result) {
		if (result.leftSideVoteButtons === true) leftSideVoteButtons(true);
	});
}

// Store cleanup function for the observer
let observerCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function leftSideVoteButtons(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutes = ['mod_queue'];
	if (redditVersion === 'newnew') {
		if (value && !feedRoutes.includes(routeName)) {
			attachStylesheet();
			attachVoteButtons();
			// Register with centralised observer manager
			// Clean up any existing observer first
			if (observerCleanup) {
				observerCleanup();
			}
			const feed = document.querySelector('shreddit-feed');
			if (feed) {
				observerCleanup = registerMutationCallback(
					feed,
					(mutations) => {
						mutations.forEach((mutation) => {
							mutation.addedNodes.forEach((addedNode) => {
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										if (addedNode) {
											attachVoteButtons();
										}
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'leftSideVoteButtons',
				);
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
			// Cleanup observer
			if (observerCleanup) {
				observerCleanup();
				observerCleanup = null;
			}
			disableLeftSideVoteButtonsRV3();
		}
	}
}

// Enable Left Side Vote Buttons - RV3
function attachStylesheet() {
	if (!document.head.querySelector('style[id="re-left-side-vote-buttons"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-left-side-vote-buttons';
		styleElement.textContent = `
			shreddit-post.re-votes-left {
				padding-left: 3rem !important;
			}
			shreddit-app[routename="post_page"] shreddit-post.re-votes-left {
				padding-left: 2rem !important;
			}
			shreddit-app shreddit-post.re-votes-left.re-has-upvote-ratio {
				padding-left: 3rem !important;
			}
			shreddit-post::part(re-vote-container) {
				position: absolute !important;
				top: 0 !important;;
				left: 0 !important;
			}
			shreddit-post::part(re-vote-group) {
				display: flex;
				flex-direction: column;
				height: fit-content;
				width: fit-content;
				margin: 0.5rem;
				border-radius: var(--re-theme-border-radius, 0.75rem);
			}
			shreddit-post::part(re-vote-number) {
				display: flex;
				flex-direction: column;
			}
			shreddit-post::part(re-upvote-ratio) {
				width: 3rem;
				margin-left: 0 !important;
				margin-top: 0.25rem;
			}
			`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Left Side Vote Buttons - RV3
function disableLeftSideVoteButtonsRV3() {
	document.querySelectorAll('shreddit-post').forEach((post) => {
		const group = post.shadowRoot.querySelector('.rpl-vote-button-group');
		const container = group.closest('shreddit-vote-animations').parentElement;
		const number = post.shadowRoot.querySelector('.rpl-vote-button-group faceplate-number');
		container.removeAttribute('part');
		group.removeAttribute('part');
		number.removeAttribute('part');
		post.classList.remove('re-votes-left');
	});
	const dynamicStyleElements = document.head.querySelectorAll('#re-left-side-vote-buttons');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}

async function attachVoteButtons() {
	if (isAttaching) return;
	isAttaching = true;

	// Get a NodeList of currently displaying posts and convert it to an array
	const posts = document.querySelectorAll('shreddit-post');
	let postArray = [...posts];

	for (const post of postArray) {
		if (!post.classList.contains('re-votes-left')) {
			post.classList.add('re-votes-left');

			const group = post.shadowRoot.querySelector('.rpl-vote-button-group');
			const container = group.closest('shreddit-vote-animations').parentElement;
			const number = post.shadowRoot.querySelector('.rpl-vote-button-group faceplate-number');

			container.setAttribute('part', 're-vote-container');
			group.setAttribute('part', 're-vote-group');
			number.setAttribute('part', 're-vote-number');
		}
	}

	isAttaching = false;
}
