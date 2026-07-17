// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Background Tweaks
// ────────────────────────────────────────────────────────────────────────────

import i18next from 'i18next';
import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';
import { base64ImageOptimiser } from '../../utilities/image_to_base64';

// Toggle - Background Solid Colour
document.querySelector('#checkbox-bg-solid-colour').addEventListener('change', function () {
	const bgImageCheckbox = document.querySelector('#checkbox-background');

	// disable background image if solid colour is enabled
	if (bgImageCheckbox.checked) {
		bgImageCheckbox.checked = false;
		document.querySelector('.icon-bg-image').style.backgroundColor = '';
		BROWSER_API.storage.sync.set({ useCustomBackground: false });
		sendMessage({ useCustomBackground: false });
	}

	// enable solid colour background
	document.querySelector('.icon-bg-solid-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ solidColourBackground: this.checked });
	sendMessage({ solidColourBackground: this.checked });
});

// Toggle - Background Image
document.querySelector('#checkbox-background').addEventListener('change', function () {
	const bgSolidCheckbox = document.querySelector('#checkbox-bg-solid-colour');

	// disable solid colour background if image is enabled
	if (bgSolidCheckbox.checked) {
		bgSolidCheckbox.checked = false;
		document.querySelector('.icon-bg-solid-colour').style.backgroundColor = '';
		BROWSER_API.storage.sync.set({ solidColourBackground: false });
		sendMessage({ solidColourBackground: false });
	}

	// enable background image
	document.querySelector('.icon-bg-image').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ useCustomBackground: this.checked });
	sendMessage({ useCustomBackground: this.checked });
});

// Slider - Background Blur
const saveBgBlur = debounce(function (value) {
	BROWSER_API.storage.sync.set({ bgBlur: value });
}, 500);
document.querySelector('#input-bg-blur').addEventListener('input', function () {
	const icon = document.querySelector('.icon-bg-blur');
	const display = document.querySelector('#bg-blur-value');
	icon.style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	display.innerText = `${this.value}px`;
	sendMessage({ bgBlur: this.value });
	saveBgBlur(this.value);
});

// Button - Upload Background Image
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

document.querySelector('#btn-upload-background-image').addEventListener('click', function () {
	if (document.querySelector('body#popup')) {
		this.classList.add('disabled');
		document.querySelector('#upload-background-image-info').style.display = '';
		return;
	}
	fileInput.click();
});

fileInput.addEventListener('change', function () {
	const file = this.files[0];
	if (!file) return;

	if (!file.type.startsWith('image/')) {
		console.log('Not an image file');
		this.value = '';
		return;
	}

	base64ImageOptimiser(file)
		.then(function (result) {
			const base64 = result.base64;
			const maxBytes = 10 * 1024 * 1024;

			BROWSER_API.storage.local.get('uploadedBackgrounds', function (localResult) {
				const uploaded = localResult.uploadedBackgrounds || [];
				uploaded.push(base64);
				BROWSER_API.storage.local.set({ uploadedBackgrounds: uploaded }, function () {
					BROWSER_API.storage.local.getBytesInUse('uploadedBackgrounds', function (newUsage) {
						if (newUsage > maxBytes) {
							uploaded.pop();
							BROWSER_API.storage.local.set({ uploadedBackgrounds: uploaded });
							console.log('Upload would exceed 10MiB limit. Actual usage:', newUsage);
							alert('Uploading this image would exceed the 10MiB storage limit. Please delete some uploaded backgrounds first.');
							fileInput.value = '';
							return;
						}
						addUploadedBgNode(base64);
						fileInput.value = '';
					});
				});
			});
		})
		.catch(function (error) {
			console.log('Image upload failed:', error);
			fileInput.value = '';
		});
});

// Button - Add New Background Image
document.querySelector('#btn-add-custom-background').addEventListener('click', addCustomBg);

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
		BROWSER_API.storage.local.set({ customBackground: url });
		// remove existing highlight
		const backgrounds = document.querySelectorAll('.background-img');
		for (let i = 0; i < backgrounds.length; i++) {
			backgrounds[i].parentNode.style.borderColor = '#000';
		}
		// set
		e.target.parentNode.style.borderColor = 'var(--accent)';
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

// Function - Add Uploaded Background Thumbnail to Popup Background Library
function addUploadedBgNode(base64) {
	const node = document.createElement('div');
	node.setAttribute('class', 'background background-uploaded');
	const background_img = document.createElement('div');
	background_img.classList.add('background-img');
	background_img.setAttribute('style', 'background-image: url(' + base64 + ');');
	background_img.addEventListener('click', (e) => {
		const url = e.target.style.getPropertyValue('background-image').slice(4, -1).replace(/"/g, '');
		BROWSER_API.storage.sync.set({ customBackground: '' });
		BROWSER_API.storage.local.set({ customBackground: url });
		const backgrounds = document.querySelectorAll('.background-img');
		for (let i = 0; i < backgrounds.length; i++) {
			backgrounds[i].parentNode.style.borderColor = '#000';
		}
		e.target.parentNode.style.borderColor = 'var(--accent)';
		BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
			if (result.useCustomBackground == true) {
				sendMessage({ setCustomBackground: url });
			}
		});
	});
	node.appendChild(background_img);
	const container = document.querySelector('#backgrounds-container');
	container.insertBefore(node, container.firstChild);
}

// Button - Edit Backgrounds
document.querySelector('#btn-edit-backgrounds').addEventListener('click', () => {
	const btnEdit = document.querySelector('#btn-edit-backgrounds');
	btnEdit.style.display = 'none';
	const btnSave = document.querySelector('#btn-edit-backgrounds-save');
	btnSave.style.display = '';
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
document.querySelector('#btn-edit-backgrounds-save').addEventListener('click', () => {
	const btnEdit = document.querySelector('#btn-edit-backgrounds');
	btnEdit.style.display = '';
	const btnSave = document.querySelector('#btn-edit-backgrounds-save');
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
			const isUploaded = e.currentTarget.parentNode.classList.contains('background-uploaded');

			if (isUploaded) {
				BROWSER_API.storage.local.get('uploadedBackgrounds', function (result) {
					const uploaded = result.uploadedBackgrounds || [];
					const index = uploaded.indexOf(url);
					if (index > -1) {
						uploaded.splice(index, 1);
						BROWSER_API.storage.local.set({ uploadedBackgrounds: uploaded });
					}
				});
			} else {
				BROWSER_API.storage.sync.get('customBackgrounds', function (result) {
					const index = result.customBackgrounds.indexOf(url);
					if (index > -1) {
						result.customBackgrounds.splice(index, 1);
						BROWSER_API.storage.sync.set({ customBackgrounds: result.customBackgrounds });
					}
				});
			}

			// remove element
			e.currentTarget.parentNode.remove();

			// clear selected background if it was the deleted one
			BROWSER_API.storage.sync.get(['customBackground'], function (syncResult) {
				if (url == syncResult.customBackground) {
					BROWSER_API.storage.sync.set({ customBackground: '' });
				}
			});
			BROWSER_API.storage.local.get('customBackground', function (localResult) {
				if (url == localResult.customBackground) {
					BROWSER_API.storage.local.set({ customBackground: '' });
				}
			});

			console.log('deleted: ' + url);
		});
	});
}

// Toggle - Force Custom Background On Old UI
document.querySelector('#checkbox-force-custom-bg-old-ui').addEventListener('change', function () {
	const value = this.checked;
	BROWSER_API.storage.sync.set({ forceCustomBgOldUI: value });
	document.querySelector('.icon-force-custom-bg-old-ui').style.backgroundColor = value ? 'var(--accent)' : '';
	sendMessage({ forceCustomBgOldUI: value });
});
