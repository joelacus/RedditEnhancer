// Sticky Sort

export function stickySort(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableStickySortOld();
		} else if (value === false) {
			disableStickySortOld();
		}
	} else if (redditVersion === 'new') {
		if (useLegacy) {
			if (value === true) {
				enableStickySortNewLegacy();
			} else if (value === false) {
				disableStickySortNewLegacy();
			}
		} else {
			if (value === true) {
				enableStickySortNew();
			} else if (value === false) {
				disableStickySortNew();
			}
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

// Function - Enable Sticky Sort - New - Legacy
function enableStickySortNewLegacy() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-sticky-sort';
	styleElement.textContent = `.re-sticky-sort {
									position: sticky !important;
									top: 48px;
									z-index: 99;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
	if (document.querySelector('.re-sort')) {
		document.querySelector('.re-sort').classList.add('re-sticky-sort');
	}
}

// Function - Disable Sticky Sort - New - Legacy
function disableStickySortNewLegacy() {
	const dynamicStyleElements = document.querySelectorAll('#re-sticky-sort');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	if (document.querySelector('.re-sort')) {
		document.querySelector('.re-sort').classList.remove('re-sticky-sort');
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
