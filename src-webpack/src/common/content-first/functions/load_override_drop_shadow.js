// Override Drop Shadow
let loadOverrideDropShadow = function () {
	BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
		} else {
			// new reddit
			if (result.overrideDropShadow === true) {
				BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
					document.documentElement.style.setProperty('--re-shadow', result.overrideDropShadowCSS);
				});
			} else if (result.overrideDropShadow === false) {
				document.documentElement.style.removeProperty('--re-shadow');
			}
		}
	});
};
export { loadOverrideDropShadow };
