// Override Drop Shadow
let overrideDropShadow = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
				document.documentElement.style.setProperty('--re-shadow', result.overrideDropShadowCSS);
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-shadow');
		}
	}
};
export { overrideDropShadow };

// Override Drop Shadow CSS
let overrideDropShadowCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
			if (result.overrideDropShadow === true) {
				document.documentElement.style.setProperty('--re-shadow', value);
			}
		});
	}
};
export { overrideDropShadowCSS };
