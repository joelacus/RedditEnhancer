/**
 * Tweaks: Hide Elements - Hide NSFW/L Posts
 *
 * @name hideNSFW
 * @description Hide NSFW/L posts on the feed.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideNSFW() {
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		if (result.hideNSFW) hideNSFW(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideNSFW(value) {
	if (redditVersion === 'old' && value) {
		enableHideNsfwPostsRV1();
	} else if (redditVersion === 'newnew' && value) {
		enableHideNsfwPostsRV3();
	} else {
		disableHideNsfwPostsAll();
	}
}

// Enable Hide NSFW Posts - RV1
function enableHideNsfwPostsRV1() {
	if (!document.head.querySelector('style[id="re-hide-nsfw-posts"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-nsfw-posts';
		styleElement.textContent = `#siteTable > .thing:has(.nsfw-stamp) {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Enable Hide NSFW Posts - RV3
function enableHideNsfwPostsRV3() {
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

// Disable Hide NSFW Posts - All
function disableHideNsfwPostsAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-nsfw-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
