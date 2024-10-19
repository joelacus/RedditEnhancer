/* ===== Tweaks - Hide - "Turn On Notifications" Popup ===== */

/* === Triggered On Page Load === */
export function loadHideTurnOnNotificationsPopup() {
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		if (result.hideTurnOnNotificationsPopup) hideTurnOnNotificationsPopup(true);
	});
}

/* === Main Function === */
export function hideTurnOnNotificationsPopup(value) {
	if (value === true) {
		hideTurnOnNotificationsPopupNew();
	} else if (value === false) {
		showTurnOnNotificationsPopupNew();
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide "Turn On Notifications" Popup - New
function hideTurnOnNotificationsPopupNew() {
	if (!document.head.querySelector('style[id="re-hide-popup"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-popup';
		document.head.appendChild(styleElement);
		styleElement.textContent = `div[id^='popup-'][style*='transform'] {
										display: none;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide "Turn On Notifications" Popup - New
function showTurnOnNotificationsPopupNew() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-popup"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
