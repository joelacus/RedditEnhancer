/**
 * Tweaks: Hide Elements - Hide Username And Karma
 *
 * @name hideUsernameAndKarma
 * @description Hide the username and/or karma in the top/header bar.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideUsernameAndKarma() {
	BROWSER_API.storage.sync.get(['hideUsername', 'hideKarma'], function (result) {
		if (result.hideUsername) hideUsername(true);
		if (result.hideKarma) hideKarma(true);
	});
}

/* === Enable/Disable The Features === */

/* = Hide Username = */
export function hideUsername(value) {
	if (redditVersion === 'old' && value) {
		enableHideUsernameRV1();
	} else {
		disableHideUsernameAll();
	}
}

// Enable Hide Username - RV1
function enableHideUsernameRV1() {
	if (!document.head.querySelector('style[id="re-hide-username"]')) {
		const style = document.createElement('style');
		style.id = 're-hide-username';
		style.textContent = `#header-bottom-right .user a {
								display: none !important;
							}`;
		document.head.insertBefore(style, document.head.firstChild);
	}
}

// Disable Hide Username - All
function disableHideUsernameAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-username"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* = Hide Karma = */
export function hideKarma(value) {
	if (redditVersion === 'old' && value) {
		enableHideKarmaRV1();
	} else {
		disableHideKarmaAll();
	}
}

// Enable Hide Karma - RV1
function enableHideKarmaRV1() {
	if (!document.head.querySelector('style[id="re-hide-karma"]')) {
		const style = document.createElement('style');
		style.id = 're-hide-karma';
		style.textContent = `#header-bottom-right .user span {
								display: none !important;
							}`;
		document.head.insertBefore(style, document.head.firstChild);
	}
}

// Disable Hide Karma - All
function disableHideKarmaAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-karma"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
