// Hide "Turn On Notifications" Popup

import { hideTurnOnNotificationsPopup } from '../../../content/functions/hide_elements/hide_turn_on_notifications_popup';

export function loadHideTurnOnNotificationsPopup() {
	BROWSER_API.storage.sync.get(['hideTurnOnNotificationsPopup'], function (result) {
		hideTurnOnNotificationsPopup(result.hideTurnOnNotificationsPopup);
	});
}
