/**
 * Tweaks: Resize Feed/Post - Feed Centre
 *
 * @name layoutCentre
 * @description
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadLayoutCentre() {
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		if (result.layoutCentre) layoutCentre(true);
	});
}

/* === Enable/Disable The Feature === */
export function layoutCentre(value) {
	if (redditVersion === 'old') {
		if (value) {
			enableLayoutCentreRV1();
		} else {
			disableLayoutCentreRV1;
		}
	}
}

// Enable Layout Centre - RV1
function enableLayoutCentreRV1() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-centre-container-old';
	styleElement.textContent = `.listing-page div.content[role="main"],
								.messages-page div.content[role="main"],
								.wiki-page div.content[role="main"],
								.profile-page div.content[role="main"],
								.moderator div.content[role="main"],
								.search-page div.content[role="main"],
								.submit-page div.content[role="main"],
								.comments-page div.content[role="main"],
								.other-discussions-page div.content[role="main"],
								.multi-page div.content[role="main"] {
									margin: .5rem auto !important;
									max-width: calc(100% - 2rem) !important;
								}
								.listing-page.with-listing-chooser:not(.multi-page) div.content[role="main"]::before {
									text-align: center;
								}
								body.with-listing-chooser div.listing-chooser {
									z-index: 1 !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Layout Centre - RV1
function disableLayoutCentreRV1() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-centre-container-old"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
