/**
 * Tweaks: Style - Add Drop Shadow
 *
 * @name addDropShadow
 * @description Add a drop shadow effect to certain elements on the website.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadDropShadow() {
	BROWSER_API.storage.sync.get(['addDropShadow', 'overrideDropShadow'], function (result) {
		if (result.addDropShadow) addDropShadow(true);
		if (result.overrideDropShadow) overrideDropShadow(true);
	});
}

/* === Enable/Disable The Features === */
export function addDropShadow(value) {
	if (redditVersion === 'newnew' && value) {
		enableAddDropShadowRV3();
	} else {
		disableAddDropShadowAll();
	}
}

export function overrideDropShadow(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
			document.documentElement.style.setProperty('--re-shadow', result.overrideDropShadowCSS);
		});
	} else {
		document.documentElement.style.removeProperty('--re-shadow');
	}
}

// Enable Add Drop Shadow - RV3
function enableAddDropShadowRV3() {
	if (!document.head.querySelector('style[id="re-drop-shadow"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-drop-shadow';
		styleElement.textContent = `:root {
										--re-shadow :  rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px
									}
									reddit-header-large,
									#left-sidebar-container,
									html:not(.re-hide-post-dividers) #right-sidebar-contents > [id^="subreddit-right"],
									html.re-hide-post-dividers #right-sidebar-container aside > div > div,
									html.re-hide-post-dividers #right-sidebar-container shreddit-subreddit-header::part(header),
									html.re-hide-post-dividers #right-sidebar-container achievements-entrypoint::part(achievements-entrypoint),
									shreddit-feed > article,
									[pagetype="post_detail"] #main-content {
										box-shadow: var(--re-shadow);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Add Drop Shadow - All
function disableAddDropShadowAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-drop-shadow"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Set Drop Shadow CSS Value
export function overrideDropShadowCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
			if (result.overrideDropShadow) {
				document.documentElement.style.setProperty('--re-shadow', value);
			}
		});
	}
}
