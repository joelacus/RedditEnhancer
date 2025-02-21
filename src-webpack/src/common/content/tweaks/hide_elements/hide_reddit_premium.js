/* ===== Tweaks - Hide - Reddit Premium ===== */

/* === Triggered On Page Load === */
export function loadHideRedditPremium() {
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function (result) {
		if (result.hideRedditPremium) hideRedditPremium(true);
	});
}

/* === Main Function === */
export function hideRedditPremium(value) {
	if (redditVersion === 'old' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-reddit-premium').classList.add('re-hide');
		} else {
			if (!document.head.querySelector('style[id="re-hide-reddit-premium"]')) {
				const styleElement = document.createElement('style');
				styleElement.id = 're-hide-reddit-premium';
				document.head.appendChild(styleElement);
				styleElement.textContent = `.side > div:has(.premium-banner-outer) {
												display: none !important;
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		}
	} else if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			document.querySelector('.re-reddit-premium').classList.add('re-hide');
			if (link.indexOf('old.reddit.com') <= 0) {
				document.querySelector('.re-reddit-premium').nextSibling.style.marginTop = '0';
			}
		} else {
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
		}
	} else if (value === false) {
		if (useLegacy) {
			document.querySelector('.re-reddit-premium').classList.remove('re-hide');
		} else {
			const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-reddit-premium"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}
