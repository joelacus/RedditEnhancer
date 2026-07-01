/**
 * Tweaks: Productivity - Scroll to the next/previous post on keypress
 *
 * @name scrollToPost
 * @description Scroll to the next/previous post on a feed with a keypress (J, K, Up Arrow, Down Arrow).
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { showBannerMessage } from '../../banner_message';

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

let showNsfw = true;
export function loadScrollToPost() {
	BROWSER_API.storage.sync.get(['scrollToPost', 'hideNSFW'], function (result) {
		if (result.scrollToPost) scrollToPost(true);
		showNsfw = result.hideNSFW ?? true;
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function scrollToPost(value) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutesv3 = ['frontpage', 'popular', 'subreddit', 'custom_feed', 'post_page', 'comments_page'];
	if (redditVersion === 'newnew' && value) {
		if (feedRoutesv3.includes(routeName)) enableScrollToPostRV3();
	} else if (redditVersion === 'old' && value) {
		enableScrollToPostRV1();
	} else {
		disableScrollToPostAll();
	}
}

let navigationCleanup = null;

// Enable Scroll To Post - RV3
function enableScrollToPostRV3() {
	if (!navigationCleanup) {
		navigationCleanup = createKeyboardNavigator('shreddit-feed', 'article:has(shreddit-post)', 'RV3');
	}
}

// Enable Scroll To Post - RV1
function enableScrollToPostRV1() {
	if (!navigationCleanup) {
		navigationCleanup = createKeyboardNavigator('#siteTable', '[id^="thing"]', 'RV1');
	}
}

// Disable Scroll To Post - All
function disableScrollToPostAll() {
	showBannerMessage('info', '[RedditEnhancer] Change requires a page refresh to take effect.');
}

// Scroll to next/previous post on keypress (J, K, Up, Down).
function createKeyboardNavigator(containerSelector, elementSelector, RedditVersion) {
	let currentIndex = -1;

	function getElements() {
		const container = document.querySelector(containerSelector);
		return container ? Array.from(container.querySelectorAll(elementSelector)) : [];
	}

	function findCurrentIndex(elements) {
		return elements.findIndex((el) => el.hasAttribute('data-nav-selected'));
	}

	function findNextValidIndex(elements, startIndex, direction) {
		let index = startIndex;

		while (index >= 0 && index < elements.length) {
			const notHidden = !elements[index].classList.contains('re-hide');
			if (RedditVersion === 'RV3') {
				const isNsfw = elements[index].querySelector('shreddit-blurred-container[reason="nsfw"]') ?? elements[index].querySelector('shreddit-post[nsfw]') ?? false;
				const showNsfwPost = isNsfw ? showNsfw : true;
				const notDisplayNone = window.getComputedStyle(elements[index]).display === 'none' ? false : true;
				if (showNsfwPost && notHidden && notDisplayNone) {
					return index;
				}
			} else if (RedditVersion === 'RV1') {
				const isNsfw = elements[index].querySelector('.nsfw-stamp') ?? false;
				const showNsfwPost = isNsfw ? showNsfw : true;
				const notDisplayNone = !window.getComputedStyle(elements[index]).display === 'none';
				if (showNsfwPost && notHidden && !elements[index].classList.contains('promoted')) {
					return index;
				}
			}
			index += direction;
		}

		return -1;
	}

	function scrollToElement(elements, index, offset = 0) {
		if (index < 0 || index >= elements.length) return;

		// Remove attribute from all elements
		elements.forEach((el) => {
			el.removeAttribute('data-nav-selected');
		});

		// Add attribute to current element
		elements[index].setAttribute('data-nav-selected', 'true');

		// Scroll to element top minus offset
		const elementTop = elements[index].getBoundingClientRect().top + window.scrollY;
		window.scrollTo({ top: elementTop - (100 - offset), behavior: 'smooth' });

		currentIndex = index;
	}

	function handleKeyPress(e) {
		const elements = getElements();
		if (elements.length === 0) return;

		if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'REDDIT-SEARCH-LARGE') {
			if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowDown') {
				if (e.key === 'ArrowDown') e.preventDefault();
				const current = findCurrentIndex(elements);
				if (current === -1) {
					const firstValid = findNextValidIndex(elements, 0, 1);
					if (firstValid !== -1) scrollToElement(elements, firstValid, 0);
				} else {
					const nextValid = findNextValidIndex(elements, current + 1, 1);
					if (nextValid !== -1) scrollToElement(elements, nextValid, 0);
				}
			} else if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowUp') {
				if (e.key === 'ArrowUp') e.preventDefault();
				const current = findCurrentIndex(elements);
				if (current === -1) {
					const firstValid = findNextValidIndex(elements, 0, 1);
					if (firstValid !== -1) scrollToElement(elements, firstValid, 0);
				} else {
					const prevValid = findNextValidIndex(elements, current - 1, -1);
					if (prevValid !== -1) scrollToElement(elements, prevValid, 0);
				}
			} else if (e.key === ' ') {
				e.preventDefault();
				const current = findCurrentIndex(elements);
				// RV3
				elements[current]?.querySelector('shreddit-post')?.shadowRoot?.querySelector('.toggle__expando-button')?.click();
				// RV1
				elements[current]?.querySelector('.expando-button')?.click();
			}
		}
	}

	// Add event listener
	document.addEventListener('keydown', handleKeyPress);

	// Return cleanup function
	return function cleanup() {
		document.removeEventListener('keydown', handleKeyPress);
		const elements = getElements();
		elements.forEach((el) => (el.style.border = ''));
	};
}
