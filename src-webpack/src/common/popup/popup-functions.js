/* ===== Popup / Functions ===== */

import { detectFirefoxVersion } from '../content-first/detect_firefox_version';

/* ===== Save Custom Background ===== */

export function addCustomBg(e) {
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
				BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
					tabs.forEach(function (tab) {
						if (tab.url.includes('reddit.com') && tab.discarded == false) {
							BROWSER_API.tabs.sendMessage(tab.id, { setCustomBackground: url });
						}
					});
				});
			}
		});
	});
	node.appendChild(background_img);
	// add element to current instance
	const grid = document.querySelector('.p-grid-bg');
	grid.insertBefore(node, grid.firstChild);
	document.querySelector('#input-custom-background').value = '';
}

/* ===== Add Listeners To Backgrounds ===== */

export function addBackgroundDeleteListeners() {
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

export function addBackgroundListeners() {
	const background = document.querySelectorAll('.background-img');
	for (let i = 0; i < background.length; i++) {
		background[i].addEventListener('click', function () {
			const backgrounds = document.querySelectorAll('.background-img');
			for (let i = 0; i < backgrounds.length; i++) {
				backgrounds[i].parentNode.style.borderColor = '#000';
			}
			background[i].parentNode.style.borderColor = 'var(--accent)';
			const url = background[i].style.getPropertyValue('background-image').slice(4, -1).replace(/"/g, '');
			console.log(url);
			BROWSER_API.storage.sync.set({ customBackground: url });
			BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
				if (result.useCustomBackground == true) {
					BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
						tabs.forEach(function (tab) {
							if (tab.url.includes('reddit.com') && tab.discarded == false) {
								BROWSER_API.tabs.sendMessage(tab.id, { setCustomBackground: url });
							}
						});
					});
				}
			});
		});
	}
}

/* ===== Input Functions ===== */

/* Dark Mode Time Calculate */
export function darkModeTimeCalc(i) {
	// get start and end times
	BROWSER_API.storage.sync.get(['darkModeTimeStart', 'darkModeTimeEnd'], function (result) {
		if (result.darkModeTimeStart == undefined) {
			var startTime = '19:00';
		} else {
			var startTime = result.darkModeTimeStart;
		}
		if (result.darkModeTimeEnd == undefined) {
			var endTime = '07:00';
		} else {
			var endTime = result.darkModeTimeEnd;
		}
		// get current time in hours
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var currentTime = hours + minutes / 60;
		// convert start time to hours
		var startHours = parseInt(startTime.split(':')[0]);
		var startMinutes = parseInt(startTime.split(':')[1]);
		var startTimeInHours = startHours + startMinutes / 60;
		// convert end time to hours
		var endHours = parseInt(endTime.split(':')[0]);
		var endMinutes = parseInt(endTime.split(':')[1]);
		var endTimeInHours = endHours + endMinutes / 60;
		// compare
		if (startTimeInHours > endTimeInHours) {
			var value = currentTime >= startTimeInHours || currentTime < endTimeInHours;
		} else {
			var value = currentTime >= startTimeInHours && currentTime < endTimeInHours;
		}
		// set ui if triggered from popup
		if (i === 1) {
			if (value == true) {
				document.querySelector('#checkbox-dark-mode').checked = true;
				document.querySelector('body').classList.remove('light-mode');
				var colour = 'var(--accent)';
			} else {
				document.querySelector('#checkbox-dark-mode').checked = false;
				document.querySelector('body').classList.add('light-mode');
				var colour = '';
			}
			var icons = document.querySelectorAll('.icon-dark-mode');
			icons.forEach(function (icon) {
				icon.style.color = colour;
			});
		}
		// apply setting
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { darkMode: value });
				}
			});
		});
	});
}

// Check Firefox Version
const useLegacy = detectFirefoxVersion();
if (useLegacy) {
	console.log('Firefox version is below 121. Please update.');
	if (document.querySelector('#alert-update')) {
		document.querySelector('#alert-update').style.display = 'block';
	}
}
