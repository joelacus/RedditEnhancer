// Inputs - Background Tweaks

import { addCustomBg } from '../popup-functions';
import { addBackgroundDeleteListeners } from '../popup-functions';

// Button - Add New Background Image
document.querySelector('.btn-add-custom-background').addEventListener('click', addCustomBg);

// Toggle - Use Custom Background
document.querySelector('#checkbox-background').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-background').checked;
	if (state == true) {
		BROWSER_API.storage.sync.set({ useCustomBackground: true });
		var icons = document.querySelectorAll('.icon-background');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = 'var(--accent)';
		});
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { useCustomBackground: true });
				}
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({ useCustomBackground: false });
		var icons = document.querySelectorAll('.icon-background');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { useCustomBackground: false });
				}
			});
		});
	}
});

// Button - Edit Backgrounds
document.querySelector('.btn-edit-backgrounds').addEventListener('click', function (e) {
	var btnEdit = document.querySelector('.btn-edit-backgrounds');
	btnEdit.style.display = 'none';
	var btnSave = document.querySelector('.btn-edit-backgrounds-save');
	btnSave.style.display = 'block';
	const background = document.querySelectorAll('.background');
	for (let i = 0; i < background.length; i++) {
		if (background[i].firstChild.id == '') {
			var btn = document.createElement('div');
			btn.setAttribute('class', 'btn-delete-background');
			const btnDel = document.createElement('i');
			btnDel.setAttribute('class', 'btn-icon icon-bin');
			btn.append(btnDel);
			background[i].appendChild(btn);
			background[i].classList.add('background-edit');
		}
	}
	addBackgroundDeleteListeners();
});

// Button - Save Backgrounds
document.querySelector('.btn-edit-backgrounds-save').addEventListener('click', function (e) {
	var btnEdit = document.querySelector('.btn-edit-backgrounds');
	btnEdit.style.display = 'block';
	var btnSave = document.querySelector('.btn-edit-backgrounds-save');
	btnSave.style.display = 'none';
	const background = document.querySelectorAll('.background');
	for (let i = 0; i < background.length; i++) {
		if (background[i].firstChild.id == '') {
			var del = background[i].querySelector('.btn-delete-background');
			background[i].removeChild(del);
			background[i].classList.remove('background-edit');
		}
	}
});

// Slider - Background Blur
document.querySelector('#input-bg-blur').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value != 0) {
		document.querySelector('.icon-bg-blur').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-bg-blur').style.backgroundColor = '';
	}
	document.querySelector('#bg-blur-value').innerText = e.target.value + 'px';
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { bgBlur: value });
			}
		});
	});
});
document.querySelector('#input-bg-blur').addEventListener('mouseup', function (e) {
	// save
	BROWSER_API.storage.sync.set({ bgBlur: e.target.value });
});
