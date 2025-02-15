/* ===== Tweaks - Productivity - Side Menu Width ===== */

/* === Triggered On Page Load === */
export function loadSideMenuWidth() {
	BROWSER_API.storage.sync.get(['sideMenuWidth'], function (result) {
		sideMenuWidth(result.sideMenuWidth);
	});
}

/* === Main Function === */
export function sideMenuWidth(value) {
	if (redditVersion === 'newnew') {
		if (parseInt(value) === 199) {
			document.documentElement.style.removeProperty('--re-side-menu-width');
			disableSideMenuWidth();
		} else if (parseInt(value) >= 200) {
			BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
				if (!result.sideMenuIconsOnly) {
					if (!document.querySelector('html').classList.contains('re-hide-side-menu')) {
						document.documentElement.style.setProperty('--re-side-menu-width', value + 'px');
						enableSideMenuWidth();
					}
				}
			});
		}
	}
}

// Function - Enable Side Menu Width - New New
function enableSideMenuWidth() {
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

// Function - Disable Side Menu Width - New New
function disableSideMenuWidth() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-side-menu-width"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
