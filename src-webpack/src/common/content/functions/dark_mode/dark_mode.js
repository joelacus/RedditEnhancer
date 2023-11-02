import { darkModeTimeCalc } from '../../../popup/popup-functions';

// Dark Mode Auto
let darkModeAuto = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == 'system') {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				BROWSER_API.storage.sync.set({ darkMode: true });
				darkMode(true);
			} else {
				BROWSER_API.storage.sync.set({ darkMode: false });
				darkMode(false);
			}
			startColorModeListener();
		} else if (value == 'time') {
			darkModeTimeCalc(0);
		} else {
			BROWSER_API.storage.sync.get(['darkMode'], function (result) {
				darkMode(result.darkMode);
			});
		}
	}
};
export { darkModeAuto };

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
// Start/Stop browser theme change listener from popup-inputs
let darkModeAutoListener = function (value) {
	if (value === true) {
		startColorModeListener();
	} else if (value === false) {
		stopColorModeListener();
	}
};
export { darkModeAutoListener };

// Dark Mode
let darkMode = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// add dark mode
	} else {
		// new reddit
		var menu_btn = document.querySelector('.re-user-menu');
		if (menu_btn === null) {
			var menu_btn = document.querySelector('#USER_DROPDOWN_ID');
		}
		setTimeout(() => {
			var html = document.getElementsByTagName('html')[0];
			if (html.classList.contains('theme-dark')) {
				if (value == true) {
					window.changeTheme = false;
				} else {
					window.changeTheme = true;
				}
			} else {
				if (value == false) {
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
};
export { darkMode };
