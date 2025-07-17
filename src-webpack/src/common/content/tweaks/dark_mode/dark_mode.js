/**
 * Tweaks: Dark Mode
 *
 * @name darkModeAuto
 * @description Automatically switch between dark and light mode..
 *
 *
 * Notes: Needs rewriting to work with RV3
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

//import { darkModeTimeCalc } from './dark_mode_time_calc';

/* === Run by Tweak Loader when the Page Loads === 
export function loadDarkModeAuto() {
	BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
		darkModeAuto(result.darkModeAuto);
	});
}*/

/* === Enable/Disable The Feature === 
export function darkModeAuto(value) {
	if (redditVersion === 'new') {
		if (value === 'system') {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				BROWSER_API.storage.sync.set({ darkMode: true });
				darkMode(true);
			} else {
				BROWSER_API.storage.sync.set({ darkMode: false });
				darkMode(false);
			}
			startColorModeListener();
		} else if (value === 'time') {
			darkModeTimeCalc(0);
		} else {
			BROWSER_API.storage.sync.get(['darkMode'], function (result) {
				darkMode(result.darkMode);
			});
		}
	}
}*/

/*
// Detect System Theme Change
var colorModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
var colorMode = colorModeQuery.matches ? 'dark' : 'light';
var colorModeChangeHandler = function (event) {
	colorMode = event.matches ? 'dark' : 'light';
	if (colorMode == 'dark') {
		BROWSER_API.storage.sync.set({ darkMode: true });
		darkMode(true);
	} else {
		BROWSER_API.storage.sync.set({ darkMode: false });
		darkMode(false);
	}
};

// Start listener for browser theme change
function startColorModeListener() {
	colorModeQuery.addEventListener('change', colorModeChangeHandler);
}

// Stop listener for browser theme change
function stopColorModeListener() {
	colorModeQuery.removeEventListener('change', colorModeChangeHandler);
}

// Start/Stop browser theme change listener from popup_inputs
export function darkModeAutoListener(value) {
	if (value === true) {
		startColorModeListener();
	} else if (value === false) {
		stopColorModeListener();
	}
}

// Dark Mode
export function darkMode(value) {
	if (redditVersion === 'new') {
		const menu_btn = document.querySelector('#USER_DROPDOWN_ID');
		setTimeout(() => {
			var html = document.getElementsByTagName('html')[0];
			if (html.classList.contains('theme-dark')) {
				if (value === true) {
					window.changeTheme = false;
				} else {
					window.changeTheme = true;
				}
			} else {
				if (value === false) {
					window.changeTheme = false;
				} else {
					window.changeTheme = true;
				}
			}
			if (changeTheme == true) {
				menu_btn.click();
				setTimeout(() => {
					var menus = document.querySelectorAll('[role="menu"]');
					menus.forEach(function (menu) {
						var spans = menu.getElementsByTagName('span');
						var lang = ['dark mode', 'nachtmodus', 'modo oscuro', 'thème sombre', 'modalità scura', 'modo escuro'];
						for (var i = 0; i < spans.length; i++) {
							if (lang.includes(spans[i].innerText.toLowerCase())) {
								var state = spans[i].nextElementSibling.getAttribute('aria-checked');
								if (typeof value === undefined || value === true) {
									if (state != 'true') {
										spans[i].parentNode.click();
									}
								} else if (value === false) {
									if (state != 'false') {
										spans[i].parentNode.click();
									}
								}
								menu_btn.click();
								// reapply custom background
								setTimeout(() => {
									BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
										if (result.useCustomBackground == true) {
											useCustomBackground(true);
										}
									});
								}, 500);
								window.tryDiv = false;
							} else {
								window.tryDiv = true;
							}
						}
						if (tryDiv == true) {
							var divs = menu.getElementsByTagName('div');
							var lang = ['dark mode', 'nachtmodus', 'modo oscuro', 'thème sombre', 'modalità scura', 'modo escuro'];
							for (var i = 0; i < divs.length; i++) {
								if (lang.includes(divs[i].innerText.toLowerCase())) {
									var state = divs[i].nextElementSibling.getAttribute('aria-checked');
									if (typeof value === undefined || value === true) {
										if (state != 'true') {
											divs[i].parentNode.click();
										}
									} else if (value === false) {
										if (state != 'false') {
											divs[i].parentNode.click();
										}
									}
									menu_btn.click();
									// reapply custom background
									setTimeout(() => {
										BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
											if (result.useCustomBackground == true) {
												useCustomBackground(true);
											}
										});
									}, 500);
								}
							}
						}
					});
				}, 500);
			}
		}, 200);
	}
}
*/
