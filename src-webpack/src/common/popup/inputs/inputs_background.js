/* ===== Inputs / Background Tweaks ===== */

import i18next from 'i18next';
import { sendMessage } from '../send_message';

// Toggle - Use Custom Background
document.querySelector('#checkbox-background').addEventListener('change', function (e) {
	const state = document.querySelector('#checkbox-background').checked;
	if (state == true) {
		BROWSER_API.storage.sync.set({ useCustomBackground: true });
		const icons = document.querySelectorAll('.icon-background');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = 'var(--accent)';
		});
		sendMessage({ useCustomBackground: true });
	} else if (state == false) {
		BROWSER_API.storage.sync.set({ useCustomBackground: false });
		const icons = document.querySelectorAll('.icon-background');
		icons.forEach(function (icon) {
			icon.style.backgroundColor = '';
		});
		sendMessage({ useCustomBackground: false });
	}
});

// Slider - Background Blur
document.querySelector('#input-bg-blur').addEventListener('input', function (e) {
	if (e.target.value != 0) {
		document.querySelector('.icon-bg-blur').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-bg-blur').style.backgroundColor = '';
	}
	document.querySelector('#bg-blur-value').innerText = e.target.value + 'px';
	sendMessage({ bgBlur: e.target.value });
});
document.querySelector('#input-bg-blur').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ bgBlur: e.target.value });
});

// Button - Add New Background Image
document.querySelector('.btn-add-custom-background').addEventListener('click', addCustomBg);

// Function - Check and Save New Background Image
function addCustomBg(e) {
	e.preventDefault();
	const imageURL = document.querySelector('#input-custom-background').value;
	if (imageURL.startsWith('data:image') || imageURL.length >= 1000) {
		console.log('URL is too long and/or is a base64 string');
		document.querySelector('#input-custom-background').value = '';
	} else {
		console.log('testing: ' + imageURL);
		return new Promise(function (resolve, reject) {
			var timeout = 5000;
			var timer,
				img = new Image();
			img.onerror = img.onabort = function () {
				clearTimeout(timer);
				reject('error');
			};
			img.onload = function () {
				clearTimeout(timer);
				resolve('success');
				BROWSER_API.storage.sync.get('customBackgrounds', function (result) {
					if (result.customBackgrounds == null || result.customBackgrounds == '') {
						var saveCustomBg = [];
						saveCustomBg.push(imageURL);
						document.querySelector('#no-saved-backgrounds-message').remove();
						addCustomBgNode(imageURL);
					} else if (result.customBackgrounds != '') {
						if (result.customBackgrounds.indexOf(imageURL) == -1) {
							console.log('adding new link');
							result.customBackgrounds.push(imageURL);
							addCustomBgNode(imageURL);
						} else {
							console.log('background already added');
							document.querySelector('#input-custom-background').value = '';
						}
						var saveCustomBg = result.customBackgrounds;
					}
					BROWSER_API.storage.sync.set({ customBackgrounds: saveCustomBg });
				});
			};
			timer = setTimeout(() => {
				// reset .src to invalid URL so it stops previous
				// loading, but doesn't trigger new load
				img.src = '//!!!!/test.jpg';
				reject('timeout');
			}, timeout);
			img.src = imageURL;
		});
	}
}

// Function - Add Background Thumbnail to Popup Background Library
function addCustomBgNode(imageURL) {
	// create background element container
	var node = document.createElement('div');
	node.setAttribute('class', 'background');
	// add image node
	var background_img = document.createElement('div');
	background_img.classList.add('background-img');
	background_img.setAttribute('style', 'background-image: url(' + imageURL + ');');
	background_img.addEventListener('click', function (e) {
		var url = e.target.style.getPropertyValue('background-image').slice(4, -1).replace(/"/g, '');
		BROWSER_API.storage.sync.set({ customBackground: url });
		// remove existing highlight
		const backgrounds = document.querySelectorAll('.background-img');
		for (let i = 0; i < backgrounds.length; i++) {
			backgrounds[i].parentNode.style.borderColor = '#000';
		}
		// set
		e.target.parentNode.style.borderColor = 'var(--accent)';
		BROWSER_API.storage.sync.set({ customBackground: url });
		BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
			if (result.useCustomBackground == true) {
				sendMessage({ setCustomBackground: url });
			}
		});
	});
	node.appendChild(background_img);
	// add element to current instance
	const container = document.querySelector('#backgrounds-container');
	container.insertBefore(node, container.firstChild);
	document.querySelector('#input-custom-background').value = '';
}

// Button - Edit Backgrounds
document.querySelector('.btn-edit-backgrounds').addEventListener('click', function (e) {
	const btnEdit = document.querySelector('.btn-edit-backgrounds');
	btnEdit.style.display = 'none';
	const btnSave = document.querySelector('.btn-edit-backgrounds-save');
	btnSave.style.display = 'block';
	const background = document.querySelectorAll('.background');
	for (let i = 0; i < background.length; i++) {
		if (background[i].firstChild.id == '') {
			const btn = document.createElement('div');
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
	const btnEdit = document.querySelector('.btn-edit-backgrounds');
	btnEdit.style.display = 'block';
	const btnSave = document.querySelector('.btn-edit-backgrounds-save');
	btnSave.style.display = 'none';
	const background = document.querySelectorAll('.background');
	for (let i = 0; i < background.length; i++) {
		if (background[i].firstChild.id == '') {
			const del = background[i].querySelector('.btn-delete-background');
			background[i].removeChild(del);
			background[i].classList.remove('background-edit');
		}
	}
	// if no custom backgrounds
	const container = document.querySelector('#backgrounds-container');
	console.log(container.childElementCount);
	if (container.childElementCount === 0) {
		const container = document.querySelector('#backgrounds-container');
		const span = document.createElement('span');
		span.id = 'no-saved-backgrounds-message';
		span.textContent = i18next.t('NoSavedBackgrounds.message');
		container.append(span);
	}
});

// Add Event Listeners To Backgrounds
function addBackgroundDeleteListeners() {
	const delete_buttons_bg = document.querySelectorAll('.btn-delete-background');
	delete_buttons_bg.forEach(function (btn) {
		btn.addEventListener('click', function (e) {
			// delete link from save
			const url = e.currentTarget.previousSibling.style.getPropertyValue('background-image').slice(4, -1).replace(/"/g, '');
			BROWSER_API.storage.sync.get('customBackgrounds', function (result) {
				const index = result.customBackgrounds.indexOf(url);
				if (index > -1) {
					result.customBackgrounds.splice(index, 1);
					BROWSER_API.storage.sync.set({ customBackgrounds: result.customBackgrounds });
				}
			});
			// remove element
			e.currentTarget.parentNode.remove();
			BROWSER_API.storage.sync.get(['customBackground'], function (result) {
				if (url == result.customBackground) {
					BROWSER_API.storage.sync.set({ customBackground: '' });
				}
			});
			console.log('deleted: ' + url);
		});
	});
}

// Toggle - Disable Background Fade Post Overlay
document.querySelector('#checkbox-disable-bg-fade-post-overlay').addEventListener('change', function (e) {
	const disableBgFadePostOverlay = document.querySelector('#checkbox-disable-bg-fade-post-overlay').checked;
	document.querySelector('.icon-disable-bg-fade-post-overlay').style.backgroundColor = disableBgFadePostOverlay ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ disableBgFadePostOverlay: disableBgFadePostOverlay });
	sendMessage({ disableBgFadePostOverlay: disableBgFadePostOverlay });
});
