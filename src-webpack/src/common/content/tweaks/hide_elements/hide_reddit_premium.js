/**
 * Tweaks: Hide Elements - Hide Reddit Premium
 *
 * @name hideRedditPremium
 * @description Hide the "Reddit Premium" banner.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideRedditPremium() {
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		if (result.hideRedditPremium) hideRedditPremium(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideRedditPremium(value) {
	if (redditVersion === 'old' && value) {
		if (!document.head.querySelector('style[id="re-hide-reddit-premium"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-reddit-premium';
			document.head.appendChild(styleElement);
			styleElement.textContent = `.side > div:has(.premium-banner-outer) {
												display: none !important;
											}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-reddit-premium"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
