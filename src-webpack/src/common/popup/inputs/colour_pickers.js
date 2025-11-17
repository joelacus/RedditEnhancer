/* ===== Inputs / Colour Pickers ===== */

import ColorPicker from '../colorpicker.js';
import { sendMessage } from '../send_message.js';

// Create global colour picker element array for restoring colour values.
window.colour_pickers = [];

// Init all colour pickers
document.querySelectorAll('.colour-picker').forEach((input) => {
	const id = input.dataset.styleId;

	// disable alpha for certain colour pickers
	const hasAlpha = !['background'].includes(id);

	const picker = new ColorPicker(input, {
		toggleStyle: 'input',
		enableAlpha: hasAlpha,
		formats: ['hex', 'rgb', 'hsv', 'hsl'],
		defaultFormat: 'hex',
		submitMode: 'confirm', // 'instant' | 'confirm'
		showClearButton: true,
		dismissOnOutsideClick: true,
		staticPlacement: 'center center',
	});
	input.placeholder = 'Select Colour';
	colour_pickers.push({ id, picker });

	// Set and save colour on pick
	picker.on('pick', (colour) => {
		if (!colour) return;
		const hex = colour.string('hex') ?? '';
		const rgb = colour.string('rgb') ?? '';
		const rgba = colour.string('rgba') ?? '';
		switch (id) {
			case 'background':
				sendMessage({ solidColourBackgroundCSS: hex });
				BROWSER_API.storage.sync.set({ solidColourBackgroundCSS: hex });
				break;
			default:
				break;
		}
	});
});
