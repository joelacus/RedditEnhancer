/* ===== Tweaks - Hide - Reddit Premium ===== */

/* === Triggered On Page Load === */
export function loadHideRedditPremium() {
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		if (result.hideRedditPremium) hideRedditPremium(true);
	});
}

/* === Main Function === */
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
	} else if (redditVersion === 'new' && value) {
		if (!document.head.querySelector('style[id="re-hide-reddit-premium"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-reddit-premium';
			document.head.appendChild(styleElement);
			styleElement.textContent = `[data-testid="frontpage-sidebar"] > div:has(.icon-premium_fill) {
												display: none !important;
											}
											[data-testid="frontpage-sidebar"] > div:has(.icon-premium_fill) + div {
												margin-top: 0;
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
