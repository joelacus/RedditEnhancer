/**
 * Tweaks: Hide Elements - Hide Original Scroll To Top
 *
 * @name hideNSFW
 * @description Hide NSFW/L posts on the feed.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */

export function loadHideOriginalScrollToTop() {
	BROWSER_API.storage.sync.get(['hideOriginalScrollToTop'], function (result) {
		if (result.hideOriginalScrollToTop) hideOriginalScrollToTop(true);
	});
}

/* === Main Function === */
export function hideOriginalScrollToTop(value) {
	if (redditVersion === 'new') {
		if (value) {
			enableHideOriginalScrollToTopNew();
		} else {
			disableHideOriginalScrollToTopAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Original Scroll To Top - New
function enableHideOriginalScrollToTopNew() {
	if (!document.head.querySelector('style[id="re-hide-original-scroll-to-top"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-original-scroll-to-top';
		document.head.appendChild(styleElement);
		styleElement.textContent = `[data-testid="subreddit-sidebar"] > :last-child > :last-child:has(button), 
									[data-testid="frontpage-sidebar"] > :last-child > :last-child:has(button),
									#overlayScrollContainer > :nth-child(2) > :last-child > :first-child > :last-child:has(button),
									.ListingLayout-backgroundContainer + div > :last-of-type > :last-of-type [style="top:calc(100vh - 8px)"] {
										display: none ;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Original Scroll To Top - All
function disableHideOriginalScrollToTopAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-original-scroll-to-top"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
