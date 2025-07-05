/* ===== Tweaks - Productivity - Sticky Sort ===== */

/* === Triggered On Page Load === */
export function loadStickySort() {
	BROWSER_API.storage.sync.get(['stickySort'], function (result) {
		if (result.stickySort) stickySort(true);
	});
}

/* === Main Function === */
export function stickySort(value) {
	if (redditVersion === 'old') {
		if (value) {
			enableStickySortOld();
		} else {
			disableStickySortOld();
		}
	} else if (redditVersion === 'new') {
		if (value) {
			enableStickySortNew();
		} else {
			disableStickySortNew();
		}
	}
}

// Function - Enable Sticky Sort - Old
function enableStickySortOld() {
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

// Function - Disable Sticky Sort - Old
function disableStickySortOld() {
	const dynamicStyleElements = document.querySelectorAll('#re-sticky-sort');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	if (document.querySelector('.tabmenu')) {
		document.querySelector('.tabmenu').classList.remove('re-sticky-sort');
	}
}

// Function - Enable Sticky Sort - New
function enableStickySortNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-sticky-sort';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE) {
									position: sticky !important;
									top: 48px;
									z-index: 99;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Sticky Sort - New
function disableStickySortNew() {
	const dynamicStyleElements = document.querySelectorAll('#re-sticky-sort');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
