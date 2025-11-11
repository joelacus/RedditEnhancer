/* ===== Restore Popup UI / Background ===== */

import { highlightMenuIcon } from '../popup_restore';
import { sendMessage } from '../send_message';
import ColorPicker from '../colorpicker.js';

// Restore UI settings for "Background" options.

export function restorePopupBackgroundOptions() {
	// Solid Colour Background
	BROWSER_API.storage.sync.get(['solidColourBackground'], function (result) {
		const value = result.solidColourBackground === true ? true : false;
		if (value) {
			document.querySelector('.icon-bg-solid-colour').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('background');
		}
		document.querySelector('#checkbox-bg-solid-colour').checked = value;
		console.log(`Solid Colour Background: ${value}`);
	});

	BROWSER_API.storage.sync.get(['solidColourBackgroundCSS'], function (result) {
		const value = result.solidColourBackgroundCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'background')?.picker;
		get_picker.setColor(value);
		console.log(`Solid Colour Background CSS: ${value}`);
	});

	// Custom Image Background
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		const value = result.useCustomBackground === true ? true : false;
		if (value) {
			document.querySelector('.icon-bg-image').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('background');
		}
		document.querySelector('#checkbox-background').checked = value;
		console.log(`Use Custom Background: ${value}`);
	});

	// Load Saved Backgrounds Into Library
	BROWSER_API.storage.sync.get(['customBackgrounds'], function (result) {
		const backgrounds = result.customBackgrounds;
		if (typeof backgrounds != 'undefined' && backgrounds.length !== 0) {
			document.querySelector('#no-saved-backgrounds-message').remove();
			backgrounds.forEach(function (value) {
				console.log('Custom Background URL: ' + value);
				// create background element container
				const node = document.createElement('div');
				node.setAttribute('class', 'background');
				// add image node
				const background_img = document.createElement('div');
				background_img.classList.add('background-img');
				background_img.setAttribute('style', 'background-image: url("' + value + '");');
				node.appendChild(background_img);
				// append element to container
				const container = document.querySelector('#backgrounds-container');
				container.insertBefore(node, container.firstChild);
			});
		} else {
			console.log('No Saved Custom Backgrounds');
		}
		addBackgroundListeners();
	});

	// Set Selected Background
	BROWSER_API.storage.sync.get(['customBackground'], function (result) {
		// highlight chosen background
		if (typeof result.customBackground != 'undefined') {
			var url = 'url("' + result.customBackground + '")';
			var elms = document.querySelectorAll('*[style]');
			Array.prototype.forEach.call(elms, function (elm) {
				var bg = elm.style.backgroundImage || '';
				if (url == bg) {
					elm.parentNode.style.borderColor = 'var(--accent)';
				}
			});
			var value = result.customBackground;
		} else if (typeof result.customBackground == 'undefined') {
			var value = 'none';
		}
		console.log('Selected Custom Background: ' + value);
	});

	// Background Blur
	BROWSER_API.storage.sync.get(['bgBlur'], function (result) {
		if (typeof result.bgBlur != 'undefined') {
			document.querySelector('#input-bg-blur').value = result.bgBlur;
			document.querySelector('#bg-blur-value').innerText = result.bgBlur + 'px';
			if (result.bgBlur != 0) {
				document.querySelector('.icon-bg-blur').style.backgroundColor = 'var(--accent)';
			}
			var value = result.bgBlur;
		} else if (typeof result.bgBlur == 'undefined') {
			document.querySelector('#input-bg-blur').value = 0;
			document.querySelector('#bg-blur-value').innerText = '0px';
			var value = 0;
		}
		console.log('Background Blur: ' + value + 'px');
	});

	// Force Custom Background on Old Reddit
	BROWSER_API.storage.sync.get(['forceCustomBgOldUI'], function (result) {
		const forceCustomBgOldUI = result.forceCustomBgOldUI === true;
		document.querySelector('.icon-force-custom-bg-old-ui').style.backgroundColor = forceCustomBgOldUI ? 'var(--accent)' : '';
		document.querySelector('#checkbox-force-custom-bg-old-ui').checked = forceCustomBgOldUI;
		if (forceCustomBgOldUI) {
			highlightMenuIcon('background');
		}
		console.log('Force Custom Background on Old Reddit: ' + forceCustomBgOldUI);
	});
}

// Add Event Listeners To Backgrounds
function addBackgroundListeners() {
	const background = document.querySelectorAll('.background-img');
	for (let i = 0; i < background.length; i++) {
		background[i].addEventListener('click', function () {
			const backgrounds = document.querySelectorAll('.background-img');
			for (let i = 0; i < backgrounds.length; i++) {
				backgrounds[i].parentNode.style.borderColor = '#000';
			}
			background[i].parentNode.style.borderColor = 'var(--accent)';
			const url = background[i].style.getPropertyValue('background-image').slice(4, -1).replace(/"/g, '');
			BROWSER_API.storage.sync.set({ customBackground: url });
			BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
				if (result.useCustomBackground == true) {
					sendMessage({ setCustomBackground: url });
				}
			});
		});
	}
}
