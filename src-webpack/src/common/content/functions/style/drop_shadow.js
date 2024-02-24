// Add Drop Shadow

export function addDropShadow(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableAddDropShadowNew();
		} else if (value === false) {
			disableAddDropShadowNew();
		}
	}
}

// Function - Enable Add Drop Shadow - New
function enableAddDropShadowNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-drop-shadow';
	styleElement.textContent = `:root {
									--re-shadow :  rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px
								}
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker) > div:has(.Post) > div,
								.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child,
								.ListingLayout-backgroundContainer + div > :last-child > :last-child > :first-child > div,
								.ListingLayout-backgroundContainer + div > :first-child > :first-child > :last-child > :first-child div:has([data-testid="posts-list"]),
								[data-testid="search-results-sidebar"] > :first-child,
								.ListingLayout-backgroundContainer + div > :last-child > :first-child > :first-child:has([name="createPost"]),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.icon-new_fill),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post) > div,
								.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(>[data-testid="post-container"]) {
									box-shadow: var(--re-shadow);
								}
								.ListingLayout-backgroundContainer + div > :last-child > :last-child > :first-child > div:has([style="top:calc(100vh - 8px)"]),
								.ListingLayout-backgroundContainer + div > :last-child > :last-child > :first-child > div:has([style="top: calc(-8px + 100vh);"]),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has([data-testid="safe-search-toggle"]),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has([aria-labelledby="send-replies"]),
								[data-testid="search-results-nav"], [data-testid="search-results-subnav"],
								[data-testid="frontpage-sidebar"] > :last-child,
								.ListingLayout-backgroundContainer + div > :last-child > div:has(.Post):has(.Comment):has(.icon-new_fill),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has([tabindex="0"]),
								.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post):has(.Comment) > div {
									box-shadow: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Add Drop Shadow - New
function disableAddDropShadowNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-drop-shadow"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
