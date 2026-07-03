/**
 * Tweaks: Hide Elements - Hide Post Karma
 *
 * @name hidePostKarma
 * @description Hide the post karma.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { debounce } from '../../../utilities/debounce';
import { registerMutationCallback } from '../../observer_manager';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHidePostKarma() {
	BROWSER_API.storage.sync.get(['hidePostKarma'], function (result) {
		if (result.hidePostKarma) hidePostKarma(true);
	});
}

// Store cleanup functions for the observers and scroll event
let hidePostKarmaObserverCleanup = null;
let hideCommentKarmaObserverCleanup = null;
let hideCommentKarmaScrollCleanup = null;

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hidePostKarma(value) {
	if (redditVersion === 'old') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-post-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-karma';
				styleElement.textContent = `.link div.midcol div.score {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-karma"]');
			dynamicStyleElements.forEach((element) => {
				element.remove();
			});
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-post-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-post-karma';
				styleElement.textContent = `shreddit-post::part(karma) {
												display: none !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			// hide post karma
			document.querySelectorAll('shreddit-post').forEach((post) => {
				enableHidePostKarma(post);
			});
			// Register with centralised observer manager
			// Clean up any existing observer first
			if (hidePostKarmaObserverCleanup) {
				hidePostKarmaObserverCleanup();
			}
			const feed = document.querySelector('shreddit-feed');
			if (feed) {
				hidePostKarmaObserverCleanup = registerMutationCallback(
					feed,
					(mutations) => {
						mutations.forEach((mutation) => {
							mutation.addedNodes.forEach((addedNode) => {
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										document.querySelectorAll('shreddit-post').forEach(enableHidePostKarma);
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'hidePostKarma',
				);
			}
		} else {
			// Cleanup observer
			if (hidePostKarmaObserverCleanup) {
				hidePostKarmaObserverCleanup();
				hidePostKarmaObserverCleanup = null;
			}
			disableHidePostKarma();
		}
	}
}

// Enable Hide Post Karma - RV3
function enableHidePostKarma(post) {
	post.shadowRoot?.querySelector('span:has(>faceplate-number)')?.setAttribute('part', 'karma');
}

// Disable Hide Post Karma - RV3
function disableHidePostKarma() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-post-karma"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
	document.querySelectorAll('shreddit-post').forEach((post) => {
		post.shadowRoot?.querySelector('span:has(>faceplate-number)')?.removeAttribute('part');
	});
}

/**
 * Tweaks: Hide Elements - Hide Comment Karma
 *
 * @name hideCommentKarma
 * @description Hide the comment karma.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHideCommentKarma() {
	BROWSER_API.storage.sync.get(['hideCommentKarma'], function (result) {
		if (result.hideCommentKarma) hideCommentKarma(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hideCommentKarma(value) {
	if (redditVersion === 'old') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-comment-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-comment-karma';
				styleElement.textContent = `.comment p.tagline span.score {
												display: none;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-comment-karma"]');
			dynamicStyleElements.forEach((element) => {
				element.remove();
			});
		}
	} else if (redditVersion === 'newnew') {
		if (value) {
			// append stylesheet
			if (!document.head.querySelector('style[id="re-hide-comment-karma"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-comment-karma';
				styleElement.textContent = `shreddit-comment-action-row::part(karma) {
												display: none !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
			// hide comment karma
			document.querySelectorAll('shreddit-comment-action-row').forEach((comment) => {
				enableHideCommentKarma(comment);
			});
			// Register with centralised observer manager
			// Clean up any existing observer first
			if (hideCommentKarmaObserverCleanup) {
				hideCommentKarmaObserverCleanup();
			}
			const feed = document.querySelector('shreddit-feed');
			if (feed) {
				hideCommentKarmaObserverCleanup = registerMutationCallback(
					feed,
					(mutations) => {
						mutations.forEach((mutation) => {
							mutation.addedNodes.forEach((addedNode) => {
								if (['TIME', 'ARTICLE', 'DIV', 'SPAN'].includes(addedNode.nodeName)) {
									setTimeout(() => {
										document.querySelectorAll('shreddit-comment-action-row').forEach(enableHideCommentKarma);
									}, 1000);
								}
							});
						});
					},
					{ childList: true, subtree: true },
					'hideCommentKarma',
				);
			}

			// Add scroll event listener for post_detail pages with debounce
			if (document.querySelector('shreddit-app[pagetype="post_detail"]')) {
				const debouncedScrollHandler = debounce(() => {
					document.querySelectorAll('shreddit-comment-action-row').forEach(enableHideCommentKarma);
				}, 100);

				window.addEventListener('scroll', debouncedScrollHandler);
				hideCommentKarmaScrollCleanup = () => {
					window.removeEventListener('scroll', debouncedScrollHandler);
				};
			}
		} else {
			// Cleanup observer
			if (hideCommentKarmaObserverCleanup) {
				hideCommentKarmaObserverCleanup();
				hideCommentKarmaObserverCleanup = null;
			}
			disableHideCommentKarma();

			// Cleanup scroll event listener
			if (hideCommentKarmaScrollCleanup) {
				hideCommentKarmaScrollCleanup();
				hideCommentKarmaScrollCleanup = null;
			}
		}
	}
}

// Enable Hide Comment Karma - RV3
function enableHideCommentKarma(comment) {
	comment.shadowRoot?.querySelector('span:has(>faceplate-number)')?.setAttribute('part', 'karma');
}

// Disable Hide Comment Karma - RV3
function disableHideCommentKarma() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-comment-karma"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
	document.querySelectorAll('shreddit-comment-action-row').forEach((comment) => {
		comment.shadowRoot.querySelector('span:has(>faceplate-number)')?.removeAttribute('part');
	});
}
