// ────────────────────────────────────────────────────────────────────────────
// Utility / Colour Functions
// ────────────────────────────────────────────────────────────────────────────

export function getRandomColour() {
	const letters = '0123456789ABCDEF';
	let colour = '#';
	for (let i = 0; i < 6; i++) {
		colour += letters[Math.floor(Math.random() * 16)];
	}
	return colour;
}

export function getContrastTextColour(bgHex) {
	const rgb = hexToRgb(bgHex);
	if (!rgb) return '#000';
	const lum = getLuminance(rgb.r, rgb.g, rgb.b);
	return lum > 0.179 ? '#000' : '#fff';
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: null;
}

function getLuminance(r, g, b) {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
