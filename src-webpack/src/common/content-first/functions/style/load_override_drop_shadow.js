// Override Drop Shadow

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
