// Hide "Turn On Notifications" Popup
let loadHideTurnOnNotificationsPopup = function () {
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		if (result.hideTurnOnNotificationsPopup === true) {
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-hide-popup';
			document.head.appendChild(styleElement);
			const dynamicStyle = `div[id^='popup-'][style*='transform'] {
									display: none;
								}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};
export { loadHideTurnOnNotificationsPopup };
