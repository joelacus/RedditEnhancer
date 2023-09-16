// Hide Header Bar
let loadHideHeaderBar = function () {
	BROWSER_API.storage.sync.get(['hideHeaderBar'], function (result) {
		if (result.hideHeaderBar === true) {
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-hide-header-bar';
			document.head.appendChild(styleElement);
			const dynamicStyle = `header {
									display: none !important;
								}
								#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
									top: 0;
								}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};
export { loadHideHeaderBar };
