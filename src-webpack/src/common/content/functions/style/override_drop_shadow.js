// Override Drop Shadow
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

// Override Drop Shadow CSS
export function overrideDropShadowCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
			if (result.overrideDropShadow === true) {
				document.documentElement.style.setProperty('--re-shadow', value);
			}
		});
	}
}
