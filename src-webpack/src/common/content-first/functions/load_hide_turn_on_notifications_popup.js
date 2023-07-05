// Hide "Turn On Notifications" Popup
let loadHideTurnOnNotificationsPopup = function () {
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		if (result.hideTurnOnNotificationsPopup === true) {
			var popup = document.querySelector("[id^='popup-']");
			popup.classList.add('re-hide');
		}
	});
};
export { loadHideTurnOnNotificationsPopup };
