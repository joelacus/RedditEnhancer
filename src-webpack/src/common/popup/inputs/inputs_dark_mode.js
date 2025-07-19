/* ===== Inputs / Dark Mode ===== 

import { darkModeTimeCalc } from '../../content/tweaks/dark_mode/dark_mode_time_calc';
import { sendMessage } from '../send_message';

// Toggle - Dark Mode
document.querySelector('#checkbox-dark-mode').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-dark-mode').checked;
	if (state == true) {
		BROWSER_API.storage.sync.set({ darkMode: true });
		var icons = document.querySelectorAll('.icon-dark-mode');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = 'var(--accent)';
		});
		sendMessage({ darkMode: true });
	} else if (state == false) {
		BROWSER_API.storage.sync.set({ darkMode: false });
		var icons = document.querySelectorAll('.icon-dark-mode');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		sendMessage({ darkMode: false });
	}
});

// Tab Switcher - Auto Dark Mode
document.querySelector('#btn-dm-disabled').addEventListener('click', function (e) {
	tabDmDisabled();
});

// Disabled
function tabDmDisabled() {
	BROWSER_API.runtime.sendMessage({ darkModeAutoTime: false });
	document.querySelector('#btn-dm-system').classList.remove('tab-active');
	document.querySelector('#btn-dm-time').classList.remove('tab-active');
	document.querySelector('.icon-auto').style.backgroundColor = '';
	var icons = document.querySelectorAll('.icon-clock');
	icons.forEach(function (icon) {
		icon.style.backgroundColor = '';
	});
	document.querySelector('#btn-dm-disabled').classList.add('tab-active');
	BROWSER_API.storage.sync.set({ darkModeAuto: 'false' });
	sendMessage({ darkModeAutoListener: false });
}
document.querySelector('#btn-dm-system').addEventListener('click', function (e) {
	tabDmSystem();
});

// System Theme
export function tabDmSystem() {
	BROWSER_API.runtime.sendMessage({ darkModeAutoTime: false });
	document.querySelector('#btn-dm-disabled').classList.remove('tab-active');
	document.querySelector('#btn-dm-time').classList.remove('tab-active');
	document.querySelector('.icon-auto').style.backgroundColor = 'var(--accent)';
	var icons = document.querySelectorAll('.icon-clock');
	icons.forEach(function (icon) {
		icon.style.backgroundColor = '';
	});
	document.querySelector('#btn-dm-system').classList.add('tab-active');
	BROWSER_API.storage.sync.set({ darkModeAuto: 'system' });
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.querySelector('#checkbox-dark-mode').checked = true;
		BROWSER_API.storage.sync.set({ darkMode: true });
		var icons = document.querySelectorAll('.icon-dark-mode');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = 'var(--accent)';
		});
		var value = true;
	} else {
		document.querySelector('#checkbox-dark-mode').checked = false;
		BROWSER_API.storage.sync.set({ darkMode: false });
		var icons = document.querySelectorAll('.icon-dark-mode');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		var value = false;
	}
	sendMessage({ darkMode: value });
	sendMessage({ darkModeAutoListener: true });
}

// Time Range
document.querySelector('#btn-dm-time').addEventListener('click', function (e) {
	tabDmTime();
});
export function tabDmTime() {
	BROWSER_API.runtime.sendMessage({ darkModeAutoTime: true });
	document.querySelector('#btn-dm-disabled').classList.remove('tab-active');
	document.querySelector('#btn-dm-system').classList.remove('tab-active');
	document.querySelector('.icon-auto').style.backgroundColor = 'var(--accent)';
	var icons = document.querySelectorAll('.icon-clock');
	icons.forEach(function (icon) {
		icon.style.backgroundColor = 'var(--accent)';
	});
	document.querySelector('#btn-dm-time').classList.add('tab-active');
	darkModeTimeCalc(1);
	BROWSER_API.storage.sync.set({ darkModeAuto: 'time' });
	sendMessage({ darkModeAutoListener: false });
}

// Dark Mode Time Inputs
document.querySelector('#dm-time-start').addEventListener('input', function (e) {
	const time = document.querySelector('#dm-time-start').value;
	BROWSER_API.storage.sync.set({ darkModeTimeStart: time });
});
document.querySelector('#dm-time-end').addEventListener('input', function (e) {
	const time = document.querySelector('#dm-time-end').value;
	BROWSER_API.storage.sync.set({ darkModeTimeEnd: time });
});
*/
