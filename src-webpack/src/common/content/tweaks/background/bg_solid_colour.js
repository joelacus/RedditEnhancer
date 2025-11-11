/**
 * Tweaks: Background - Solid Colour
 *
 * @name solidColourBackground
 * @description Change the web page background to a solid colour.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadSolidColourBackground() {
	BROWSER_API.storage.sync.get(['solidColourBackground', 'solidColourBackgroundCSS'], function (result) {
		if (result.solidColourBackground) solidColourBackground(true);
		solidColourBackgroundCSS(result.solidColourBackgroundCSS);
	});
}

/* === Enable/Disable The Feature === */
export function solidColourBackground(value) {
	if (value) {
		if (redditVersion === 'newnew') {
			enableSolidBackgroundBackgroundRV3();
		} else if (redditVersion === 'old') {
			enableSolidBackgroundBackgroundRV1();
		}
	} else {
		disableSolidColourBackgroundAll();
	}
}

// Enable Solid Colour Background - RV3
function enableSolidBackgroundBackgroundRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-solid-colour-background';
	styleElement.textContent = `body {
									background: var(--re-background-colour) !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Enable Solid Colour Background - RV1
function enableSolidBackgroundBackgroundRV1() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-solid-colour-background';
	styleElement.textContent = `body,
                                body > .side {
									background-color: var(--re-background-colour) !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Use Custom Background - All
function disableSolidColourBackgroundAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-solid-colour-background"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Solid Colour Background CSS
export function solidColourBackgroundCSS(value) {
	if (redditVersion === 'newnew' || redditVersion === 'old') {
		BROWSER_API.storage.sync.get(['solidColourBackground'], function (result) {
			console.log(result.solidColourBackground);
			if (result.solidColourBackground) document.documentElement.style.setProperty('--re-background-colour', value);
		});
	}
}
