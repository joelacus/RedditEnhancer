/**
 * Tweaks: Accessibility - Underline Links
 * @name underlineLinks
 * @description Ensures that links are underlined in posts and comments to make the stand out.
 *
 * Applies to: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */

export function loadUnderlineLinks() {
	BROWSER_API.storage.sync.get(['underlineLinks'], function (result) {
		underlineLinks(result.underlineLinks);
	});
}

/* === Enable/Disable The Feature === */
export function underlineLinks(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			underlineLinksRV3();
		} else {
			disableUnderlineLinksAll();
		}
	}
}

// Function - Enable Underline Links - RV3
function underlineLinksRV3() {
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
