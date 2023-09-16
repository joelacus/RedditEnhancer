// Non Sticky HeaderBar
let nonStickyHeaderBar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-non-sticky-header-bar';
			document.head.appendChild(styleElement);
			const dynamicStyle = `header {
									position: absolute !important;
								}
								#SHORTCUT_FOCUSABLE_DIV > div[class*="subredditvars-r"] > div {
									top: 0;
								}`;
			styleElement.innerHTML = dynamicStyle;
		} else if (value == false) {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-non-sticky-header-bar"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { nonStickyHeaderBar };
