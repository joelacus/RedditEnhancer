// Hide "Turn On Notifications" Popup

export function hideTurnOnNotificationsPopup(value) {
	if (value === true) {
		hideTurnOnNotificationsPopupNew();
	} else if (value === false) {
		showTurnOnNotificationsPopupNew();
	}
}

// Function - Hide "Turn On Notifications" Popup - New
function hideTurnOnNotificationsPopupNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-popup';
	document.head.appendChild(styleElement);
	styleElement.textContent = `div[id^='popup-'][style*='transform'] {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Show "Turn On Notifications" Popup - New
function showTurnOnNotificationsPopupNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-popup"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
