/* ===== Dark Mode Time Calculate ===== */

import { sendMessage } from '../../../popup/send_message';

export function darkModeTimeCalc(i) {
	// get start and end times
	BROWSER_API.storage.sync.get(['darkModeTimeStart', 'darkModeTimeEnd'], function (result) {
		if (result.darkModeTimeStart == undefined) {
			var startTime = '19:00';
		} else {
			var startTime = result.darkModeTimeStart;
		}
		if (result.darkModeTimeEnd == undefined) {
			var endTime = '07:00';
		} else {
			var endTime = result.darkModeTimeEnd;
		}
		// get current time in hours
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var currentTime = hours + minutes / 60;
		// convert start time to hours
		var startHours = parseInt(startTime.split(':')[0]);
		var startMinutes = parseInt(startTime.split(':')[1]);
		var startTimeInHours = startHours + startMinutes / 60;
		// convert end time to hours
		var endHours = parseInt(endTime.split(':')[0]);
		var endMinutes = parseInt(endTime.split(':')[1]);
		var endTimeInHours = endHours + endMinutes / 60;
		// compare
		if (startTimeInHours > endTimeInHours) {
			var value = currentTime >= startTimeInHours || currentTime < endTimeInHours;
		} else {
			var value = currentTime >= startTimeInHours && currentTime < endTimeInHours;
		}
		// set ui if triggered from popup
		if (i === 1) {
			if (value == true) {
				document.querySelector('#checkbox-dark-mode').checked = true;
			} else {
				document.querySelector('#checkbox-dark-mode').checked = false;
			}
			const icons = document.querySelectorAll('.icon-dark-mode');
			icons.forEach(function (icon) {
				icon.style.color = 'var(--accent)';
			});
		}
		// apply setting
		sendMessage({ darkMode: value });
	});
}
