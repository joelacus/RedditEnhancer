/**
 * Tweaks: Productivity - Sticky Sort
 *
 * @name stickySort
 * @description Always keep the sort bar visible when the user scrolls down the page.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadStickySort() {
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		if (result.stickySort) stickySort(true);
	});
}

/* === Enable/Disable The Feature === */
export function stickySort(value) {
	if (redditVersion === 'old') {
		if (value) {
			enableStickySortRV1();
		} else {
			disableStickySortRV1();
		}
	}
}

// Enable Sticky Sort - RV1
function enableStickySortRV1() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-sticky-sort';
	styleElement.textContent = `.re-sticky-sort {
									position: sticky !important;
									top: 48px;
									z-index: 99;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
	if (document.querySelector('.tabmenu')) {
		document.querySelector('.tabmenu').classList.add('re-sticky-sort');
	}
}

// Disable Sticky Sort - RV1
function disableStickySortRV1() {
	const dynamicStyleElements = document.querySelectorAll('#re-sticky-sort');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	if (document.querySelector('.tabmenu')) {
		document.querySelector('.tabmenu').classList.remove('re-sticky-sort');
	}
}
