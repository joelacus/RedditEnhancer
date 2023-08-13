import { loadCustomBackground } from '../../../content-first/functions/load_custom_background';

// Use Custom Background
let useCustomBackground = function (value) {
	if (value == true) {
		loadCustomBackground();
	} else if (value == false) {
		document.documentElement.style.setProperty('--re-background-image', '');
		document.documentElement.style.setProperty('--re-background-blur', '');
	}
};
export { useCustomBackground };

// Set Custom Background Variable
let setCustomBackground = function (value) {
	document.documentElement.style.setProperty('--re-background-image', 'url(' + value + ')');
};
export { setCustomBackground };

// Background Blur Variable
let bgBlur = function (value) {
	if (value != undefined) {
		document.documentElement.style.setProperty('--re-background-blur', value + 'px');
	} else {
		document.documentElement.style.setProperty('--re-background-blur', '0px');
	}
};
export { bgBlur };
