/* ===== Tweaks - Style - Override Drop Shadow ===== */

/* === Triggered On Page Load === */
export function loadOverrideDropShadow() {
	BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
		if (redditVersion === 'new') {
			if (result.overrideDropShadow === true) {
				BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
					document.documentElement.style.setProperty('--re-shadow', result.overrideDropShadowCSS);
				});
			} else if (result.overrideDropShadow === false) {
				document.documentElement.style.removeProperty('--re-shadow');
			}
		}
	});
}

/* === Main Function === */

// Function - Enable/Disable
export function overrideDropShadow(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
				document.documentElement.style.setProperty('--re-shadow', result.overrideDropShadowCSS);
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-shadow');
		}
	}
}

// Function - CSS Value
export function overrideDropShadowCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
			if (result.overrideDropShadow === true) {
				document.documentElement.style.setProperty('--re-shadow', value);
			}
		});
	}
}
