/* ===== Tweaks - Hide - Sidebar Policy Section ===== */

/* === Triggered On Page Load === */
export function loadHideSidebarPolicy() {
	BROWSER_API.storage.sync.get(['hideSidebarPolicy'], function (result) {
		if (result.hideSidebarPolicy) hideSidebarPolicy(true);
	});
}

/* === Main Function === */
export function hideSidebarPolicy(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			if (useLegacy) {
				document.querySelector('#re-policy').classList.add('re-hide');
			} else {
				if (!document.head.querySelector('style[id="re-hide-side-menu-policy"]')) {
					const styleElement = document.createElement('style');
					styleElement.id = 're-hide-side-menu-policy';
					styleElement.textContent = `[data-testid="frontpage-sidebar"] > :last-child > div:has([href="https://www.redditinc.com/policies/user-agreement"]) {
													display: none !important;
												}`;
					document.head.insertBefore(styleElement, document.head.firstChild);
				}
			}
		} else if (value === false) {
			if (useLegacy) {
				document.querySelector('#re-policy').classList.remove('re-hide');
			} else {
				const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-side-menu-policy"]');
				dynamicStyleElements.forEach((element) => {
					document.head.removeChild(element);
				});
			}
		}
	}
}
