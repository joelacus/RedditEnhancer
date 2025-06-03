/**
 * Tweak type: Hide Elements
 * Tweak name: Hide NSFW/L Posts
 *
 * @name hideNSFW
 * @description Hide NSFW/L posts on the feed.
 *
 * Compatibility: V1 - Old UI (2005-)
 *                V3 - New New UI (2023-)
 */

/* === Get saved value and enable tweak if true on page load === */
export function loadHideNSFW() {
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		if (result.hideNSFW) hideNSFW(true);
	});
}

/* === Enable/Disable tweak based on Reddit version === */
export function hideNSFW(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHideNsfwPostsV1();
		} else if (value === false) {
			disableHideNsfwPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideNsfwPostsV3();
		} else if (value === false) {
			disableHideNsfwPostsAll();
		}
	}
}

/* === Functions to Enable/Disable the tweak === */

// Enable "Hide NSFW Posts" - V1
function enableHideNsfwPostsV1() {
	if (!document.head.querySelector('style[id="re-hide-nsfw-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-nsfw-posts';
		styleElement.textContent = `#siteTable > .thing:has(.nsfw-stamp) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Enable "Hide NSFW Posts" - V3
function enableHideNsfwPostsV3() {
	if (!document.head.querySelector('style[id="re-hide-nsfw-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-nsfw-posts';
		styleElement.textContent = `shreddit-app article:has(shreddit-blurred-container[reason="nsfw"]),
									shreddit-app article:has(shreddit-post[nsfw]) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable "Hide NSFW Posts" - All
function disableHideNsfwPostsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-nsfw-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
