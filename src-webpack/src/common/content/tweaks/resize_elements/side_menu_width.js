/**
 * Tweaks: Resize Feed/Post - Side Menu Width
 *
 * @name sideMenuWidth
 * @description Change the width of the side menu (left).
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadSideMenuWidth() {
	BROWSER_API.storage.sync.get(['sideMenuWidth'], function (result) {
		sideMenuWidth(result.sideMenuWidth);
	});
}

/* === Enable/Disable The Feature === */
export function sideMenuWidth(value) {
	if (redditVersion === 'newnew') {
		if (parseInt(value) === 199) {
			document.documentElement.style.removeProperty('--re-side-menu-width');
			disableSideMenuWidthAll();
		} else if (parseInt(value) >= 200) {
			BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
				if (!result.sideMenuIconsOnly) {
					if (!document.querySelector('html').classList.contains('re-hide-side-menu')) {
						document.documentElement.style.setProperty('--re-side-menu-width', value + 'px');
						enableSideMenuWidthRV3();
					}
				}
			});
		}
	}
}

// Enable Side Menu Width - RV3
function enableSideMenuWidthRV3() {
	if (!document.querySelector('style[id="re-side-menu-width"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-side-menu-width';
		styleElement.textContent = `@media (min-width: 1200px) {
										div.grid-container:not(.grid-full), 
										div.grid-container:not(.grid-full).flex-nav-expanded {
											--flex-nav-width: var(--re-side-menu-width);
										}
									}
									flex-left-nav-container#left-sidebar-container {
										--flex-nav-expanded-size: var(--re-side-menu-width);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Side Menu Width - All
function disableSideMenuWidthAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-side-menu-width"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
