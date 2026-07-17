// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Background
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { sendMessage } from '../../utilities/send_message';
import { validateColour, validateInt } from './validation';

// Restore UI settings for "Background" options.

export function restorePopupBackgroundOptions() {
	// Toggle - Solid Colour Background
	BROWSER_API.storage.sync.get(['solidColourBackground'], function (result) {
		const value = result.solidColourBackground === true;
		document.querySelector('#checkbox-bg-solid-colour').checked = value;
		document.querySelector('.icon-bg-solid-colour').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('background');
		console.log(`Solid Colour Background: ${value}`);
	});

	// Colour Picker - Solid Colour Background
	BROWSER_API.storage.sync.get(['solidColourBackgroundCSS'], function (result) {
		const raw = result.solidColourBackgroundCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'background')?.picker;
		get_picker.setColor(value);
		console.log(`Solid Colour Background CSS: ${value}`);
	});

	// Custom Image Background
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		const value = result.useCustomBackground === true;
		document.querySelector('#checkbox-background').checked = value;
		document.querySelector('.icon-bg-image').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('background');
		console.log(`Use Custom Background: ${value}`);
	});

	// Load Saved Backgrounds Into Library
	BROWSER_API.storage.sync.get(['customBackgrounds'], function (result) {
		const backgrounds = result.customBackgrounds;
		if (typeof backgrounds != 'undefined' && backgrounds.length !== 0) {
			document.querySelector('#no-saved-backgrounds-message').remove();
			backgrounds.forEach(function (value) {
				console.log('Custom Background URL: ' + value);
				const node = document.createElement('div');
				node.setAttribute('class', 'background');
				const background_img = document.createElement('div');
				background_img.classList.add('background-img');
				background_img.setAttribute('style', 'background-image: url("' + value + '");');
				node.appendChild(background_img);
				const container = document.querySelector('#backgrounds-container');
				container.insertBefore(node, container.firstChild);
			});
		}

		// Load Uploaded Backgrounds
		BROWSER_API.storage.local.get('uploadedBackgrounds', function (localResult) {
			const uploaded = localResult.uploadedBackgrounds;
			if (typeof uploaded != 'undefined' && uploaded.length !== 0) {
				if (document.querySelector('#no-saved-backgrounds-message')) {
					document.querySelector('#no-saved-backgrounds-message').remove();
				}
				uploaded.forEach(function (value) {
					console.log('Uploaded Background: ' + value.substring(0, 50) + '...');
					const node = document.createElement('div');
					node.setAttribute('class', 'background background-uploaded');
					const background_img = document.createElement('div');
					background_img.classList.add('background-img');
					background_img.setAttribute('style', 'background-image: url(' + value + ');');
					node.appendChild(background_img);
					const container = document.querySelector('#backgrounds-container');
					container.insertBefore(node, container.firstChild);
				});
			}
			addBackgroundListeners();
		});
	});

	// Set Selected Background
	BROWSER_API.storage.sync.get(['customBackground'], function (syncResult) {
		let selectedBg = syncResult.customBackground;

		if (!selectedBg) {
			BROWSER_API.storage.local.get('customBackground', function (localResult) {
				selectedBg = localResult.customBackground;
				highlightSelectedBackground(selectedBg);
			});
		} else {
			highlightSelectedBackground(selectedBg);
		}
	});

	function highlightSelectedBackground(value) {
		if (typeof value != 'undefined') {
			const url = `url("${value}")`;
			const elms = document.querySelectorAll('*[style]');
			Array.prototype.forEach.call(elms, function (elm) {
				const bg = elm.style.backgroundImage || '';
				if (url === bg) elm.parentNode.style.borderColor = 'var(--accent)';
			});
			console.log('Selected Custom Background: ' + value);
		}
	}

	// Background Blur
	BROWSER_API.storage.sync.get(['bgBlur'], function (result) {
		const value = validateInt(parseInt(result.bgBlur), 0, 30, 0);
		document.querySelector('#input-bg-blur').value = value;
		document.querySelector('#bg-blur-value').innerText = `${value}px`;
		document.querySelector('.icon-bg-blur').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
		console.log(`Background Blur: ${value}px`);
	});

	// Force Custom Background on Old Reddit
	BROWSER_API.storage.sync.get(['forceCustomBgOldUI'], function (result) {
		const value = result.forceCustomBgOldUI === true;
		document.querySelector('#checkbox-force-custom-bg-old-ui').checked = value;
		document.querySelector('.icon-force-custom-bg-old-ui').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('background');
		console.log('Force Custom Background on Old Reddit: ' + value);
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
			const isUploaded = background[i].parentNode.classList.contains('background-uploaded');
			if (isUploaded) {
				BROWSER_API.storage.sync.set({ customBackground: '' });
				BROWSER_API.storage.local.set({ customBackground: url });
			} else {
				BROWSER_API.storage.sync.set({ customBackground: url });
				BROWSER_API.storage.local.set({ customBackground: url });
			}
			BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
				if (result.useCustomBackground == true) {
					sendMessage({ setCustomBackground: url });
				}
			});
		});
	}
}
