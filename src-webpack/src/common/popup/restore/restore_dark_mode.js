/* ===== Restore Popup UI / Dark Mode ===== 

import { tabDmSystem } from '../inputs/inputs_dark_mode';
import { tabDmTime } from '../inputs/inputs_dark_mode';
import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Dark Mode" options.

export function restorePopupDarkModeOptions() {
	// Get saved settings
	BROWSER_API.storage.sync.get(['darkMode', 'darkModeAuto', 'darkModeTimeStart', 'darkModeTimeEnd'], function (result) {
		// Dark Mode
		if (typeof result.darkMode == 'undefined') {
			BROWSER_API.storage.sync.set({ darkMode: true });
		}
		if (typeof result.darkMode == 'undefined' || result.darkMode == true) {
			document.querySelector('#checkbox-dark-mode').checked = true;
			highlightMenuIcon('dark-mode');
			var value = true;
		} else if (result.darkMode == false) {
			document.querySelector('#checkbox-dark-mode').checked = false;
			var value = false;
		}
		console.log('Dark Mode: ' + value);

		// Dark Mode Auto
		if (typeof result.darkModeAuto == 'undefined') {
			BROWSER_API.storage.sync.set({ darkModeAuto: 'false' });
			var value = 'false';
		} else if (result.darkModeAuto == 'system') {
			tabDmSystem();
			var value = 'system';
		} else if (result.darkModeAuto == 'time') {
			tabDmTime();
			var value = 'time';
		} else {
			var value = 'false';
		}
		console.log('Dark Mode Auto: ' + value);

		// Dark Mode Time Values
		if (result.darkModeTimeStart == undefined) {
			document.querySelector('#dm-time-start').value = '19:00';
			console.log('Dark Mode Auto Time Start: 19:00');
		} else {
			document.querySelector('#dm-time-start').value = result.darkModeTimeStart;
			console.log('Dark Mode Auto Time Start: ' + result.darkModeTimeStart);
		}
		if (result.darkModeTimeEnd == undefined) {
			document.querySelector('#dm-time-end').value = '07:00';
			console.log('Dark Mode Auto Time End: 07:00');
		} else {
			document.querySelector('#dm-time-end').value = result.darkModeTimeEnd;
			console.log('Dark Mode Auto Time End: ' + result.darkModeTimeEnd);
		}
	});
}
*/
