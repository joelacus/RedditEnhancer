/* ===== Inputs / Background Tweaks ===== */

import i18next from 'i18next';
import { sendMessage } from '../send_message';

// Toggle - Background Solid Colour
document.querySelector('#checkbox-bg-solid-colour').addEventListener('change', () => {
	const bg_solid_value = document.querySelector('#checkbox-bg-solid-colour').checked;
	const bg_image_value = document.querySelector('#checkbox-background').checked;

	// disable background image
	if (bg_image_value) {
		bg_image_value.checked = false;
		document.querySelector('.icon-bg-image').style.backgroundColor = '';
		BROWSER_API.storage.sync.set({ useCustomBackground: false });
		sendMessage({ useCustomBackground: false });
	}

	// enable solid colour background
	document.querySelector('.icon-bg-solid-colour').style.backgroundColor = bg_solid_value === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ solidColourBackground: bg_solid_value });
	sendMessage({ solidColourBackground: bg_solid_value });
});

// Toggle - Background Image
document.querySelector('#checkbox-background').addEventListener('change', () => {
	const bg_solid_value = document.querySelector('#checkbox-bg-solid-colour').checked;
	const bg_image_value = document.querySelector('#checkbox-background').checked;

	// disable solid colour background
	if (bg_solid_value) {
		bg_solid_value.checked = false;
		document.querySelector('.icon-bg-solid-colour').style.backgroundColor = '';
		BROWSER_API.storage.sync.set({ solidColourBackground: false });
		sendMessage({ solidColourBackground: false });
	}

	// enable background image
	document.querySelector('.icon-bg-image').style.backgroundColor = bg_image_value === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ useCustomBackground: bg_image_value });
	sendMessage({ useCustomBackground: bg_image_value });
});

// Slider - Background Blur
document.querySelector('#input-bg-blur').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-bg-blur').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
	document.querySelector('#bg-blur-value').innerText = `${value}px`;
	sendMessage({ bgBlur: e.target.value });
});
document.querySelector('#input-bg-blur').addEventListener('mouseup', (e) => {
	// save value on mouseup to significantly reduce api writes.
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
			img.onerror = img.onabort = () => {
				clearTimeout(timer);
				reject('error');
			};
			img.onload = () => {
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
	const node = document.createElement('div');
	node.setAttribute('class', 'background');
	// add image node
	const background_img = document.createElement('div');
	background_img.classList.add('background-img');
	background_img.setAttribute('style', 'background-image: url(' + imageURL + ');');
	background_img.addEventListener('click', (e) => {
		const url = e.target.style.getPropertyValue('background-image').slice(4, -1).replace(/"/g, '');
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
document.querySelector('.btn-edit-backgrounds').addEventListener('click', () => {
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
document.querySelector('.btn-edit-backgrounds-save').addEventListener('click', () => {
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
		btn.addEventListener('click', (e) => {
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

// Toggle - Force Custom Background On Old UI
document.querySelector('#checkbox-force-custom-bg-old-ui').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-force-custom-bg-old-ui').checked;
	BROWSER_API.storage.sync.set({ forceCustomBgOldUI: value });
	document.querySelector('.icon-force-custom-bg-old-ui').style.backgroundColor = value ? 'var(--accent)' : '';
	sendMessage({ forceCustomBgOldUI: value });
});
