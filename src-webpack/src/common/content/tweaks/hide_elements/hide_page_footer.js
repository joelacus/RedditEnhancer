/**
 * Tweaks: Hide Elements - Hide Page Footer Text
 *
 * @name hidePageFooter
 * @description Hide the footer text at the bottom of the page.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadHidePageFooter() {
	BROWSER_API.storage.sync.get(['hidePageFooter'], function (result) {
		if (result.hidePageFooter) hidePageFooter(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function hidePageFooter(value) {
	if (redditVersion === 'newnew' && value) {
		enableHidePageFooter();
	} else {
		disableHidePageFooter();
	}
}

// Enable Hide Page Footer Text - RV3
function enableHidePageFooter() {
	if (!document.head.querySelector('style[id="re-hide-side-menu-footer"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-footer';
		styleElement.textContent = `reddit-sidebar-nav nav > div:has(a[href="https://redditinc.com"]),
									#right-sidebar-container > .legal-links,
									.main-container .legal-links {
										display: none !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Hide Page Footer Text - RV3
function disableHidePageFooter() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-side-menu-footer"]');
	dynamicStyleElements.forEach((element) => {
		element.remove();
	});
}
