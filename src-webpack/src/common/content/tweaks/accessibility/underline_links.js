/* ===== Tweaks - Accessibility - Underline Links ===== */

/* === Triggered On Page Load === */
export function loadUnderlineLinks() {
	BROWSER_API.storage.sync.get(['underlineLinks'], function (result) {
		underlineLinks(result.underlineLinks);
	});
}

/* === Main Function === */
export function underlineLinks(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableUnderlineLinksNew();
		} else if (value === false) {
			disableUnderlineLinksAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			underlineLinksNewNew();
		} else if (value === false) {
			disableUnderlineLinksAll();
		}
	}
}

// Function - Enable Underline Links - New
function enableUnderlineLinksNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-underlink-links';
	styleElement.textContent = `.Post .RichTextJSON-root a {
									text-decoration: underline !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Underline Links - New New
function underlineLinksNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-underlink-links';
	styleElement.textContent = `shreddit-post p a,
								shreddit-comment p a {
									text-decoration: underline !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Underline Links - All
function disableUnderlineLinksAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-underlink-links"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
