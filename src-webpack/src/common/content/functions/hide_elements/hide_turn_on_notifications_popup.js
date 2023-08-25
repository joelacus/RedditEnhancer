// Hide "Turn On Notifications" Popup
let hideTurnOnNotificationsPopup = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value === true) {
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-hide-popup';
			document.head.appendChild(styleElement);
			const dynamicStyle = `div[id^='popup-'][style*='transform'] {
									display: none;
								}`;
			styleElement.innerHTML = dynamicStyle;
		} else if (value === false) {
			const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-popup"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { hideTurnOnNotificationsPopup };
