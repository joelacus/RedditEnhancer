/* ===== Tweaks - Hide - Original Scroll To Top ===== */

/* === Triggered On Page Load === */
export function loadHideOriginalScrollToTop() {
	BROWSER_API.storage.sync.get(['hideOriginalScrollToTop'], function (result) {
		hideOriginalScrollToTop(result.hideOriginalScrollToTop);
	});
}

/* === Main Function === */
export function hideOriginalScrollToTop(value) {
	if (redditVersion === 'new') {
		if (useLegacy && value === true) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-original-scroll-to-top';
			document.head.appendChild(styleElement);
			styleElement.textContent = `
									.re-sidebar [style="top:calc(100vh - 8px)"], 
									.re-sidebar [style="top: calc(-8px + 100vh);"],
									.re-sidebar-post [style="top: calc(-56px + 100vh);"] {
										display: none;
									}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		} else if (!useLegacy && value === true) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-original-scroll-to-top';
			document.head.appendChild(styleElement);
			styleElement.textContent = `
									[data-testid="subreddit-sidebar"] > :last-child > :last-child:has(button), 
									[data-testid="frontpage-sidebar"] > :last-child > :last-child:has(button),
									#overlayScrollContainer > :nth-child(2) > :last-child > :first-child > :last-child:has(button),
									.ListingLayout-backgroundContainer + div > :last-of-type > :last-of-type [style="top:calc(100vh - 8px)"] {
										display: none ;
									}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		} else if (value === false) {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-original-scroll-to-top"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}
