// Hide "Turn On Notifications" Popup
let hideTurnOnNotificationsPopup = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		var popup = document.querySelector("[id^='popup-']");
		if (popup) {
			if (value == true) {
				popup.classList.add('re-hide');
			} else if (value == false) {
				if (popup.classList.contains('re-hide')) {
					popup.classList.remove('re-hide');
				}
			}
		}
	}
};
export { hideTurnOnNotificationsPopup };
