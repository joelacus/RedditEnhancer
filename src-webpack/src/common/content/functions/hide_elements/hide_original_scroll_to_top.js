// Hide Original Scroll To Top
let hideOriginalScrollToTop = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-hide-original-scroll-to-top';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-sidebar [style="top:calc(100vh - 8px)"], 
								  .re-sidebar [style="top: calc(-8px + 100vh);"],
								  .re-sidebar-post [style="top: calc(-56px + 100vh);"] {
									display: none;
								}`;
			styleElement.innerHTML = dynamicStyle;
		} else if (value == false) {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-original-scroll-to-top"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { hideOriginalScrollToTop };
