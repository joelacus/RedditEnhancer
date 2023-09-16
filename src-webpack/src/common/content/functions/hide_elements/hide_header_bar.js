// Hide HeaderBar
let hideHeaderBar = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-hide-header-bar';
			document.head.appendChild(styleElement);
			const dynamicStyle = `header {
									display: none !important;
								}`;
			styleElement.innerHTML = dynamicStyle;
		} else if (value == false) {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-header-bar"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { hideHeaderBar };
