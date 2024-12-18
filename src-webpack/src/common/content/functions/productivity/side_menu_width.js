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
		if (value === '199') {
			document.documentElement.style.removeProperty('--re-side-menu-width');
			disableSideMenuWidth();
		} else if (value >= '200') {
			if (!document.querySelector('html').classList.contains('re-hide-side-menu')) {
				document.documentElement.style.setProperty('--re-side-menu-width', value + 'px');
				enableSideMenuWidth();
			}
		}
	}
}

// Function - Enable Side Menu Width - New New
function enableSideMenuWidth() {
	if (!document.querySelector('style[id="re-side-menu-width"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-side-menu-width';
		styleElement.textContent = `#left-sidebar-container {
										max-width: var(--re-side-menu-width) !important;
									}
									@media (min-width: 1200px) {
										.grid-container {
											grid-template-columns: var(--re-side-menu-width) 1fr !important;
										}
									}
									@media (min-width: 1200px) {
										.m\\:max-w-\\[calc\\(100vw-272px\\)\\] {
											max-width: calc(100vw - var(--re-side-menu-width)) !important;
										}
									}
									@media (min-width: 1200px) {
										.m\\:grid-cols-\\[272px_1fr\\] {
											grid-template-columns: var(--re-side-menu-width) 1fr !important;
										}
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
