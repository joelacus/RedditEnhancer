/* ===== Background script ===== */

import { darkModeTimeCalc } from '../common/popup/popup-functions';
let fetchUrl = '';

// Listen For Messages
BROWSER_API.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request);
	if (request.darkModeAutoTime === true) {
		checkTime(true);
	} else if (request.darkModeAutoTime === false) {
		checkTime(false);
	} else if (request.importBackupFile === true) {
		BROWSER_API.storage.sync.get(['language'], function (result) {
			if (typeof result.language != 'undefined') {
				BROWSER_API.tabs.create({ url: `restore_config.html?&lang=` + result.language }, function (tab) {});
			} else {
				BROWSER_API.tabs.create({ url: `restore_config.html` }, function (tab) {});
			}
		});
	} else if (request.restore) {
		restoreBackup(request);
	} else if (request.actions) {
		for (const action of request.actions) {
			if (action.action === 'changeFetchUrl') {
				// Set the new fetch URL based on the action
				fetchUrl = action.newFetchUrl;
			} else if (action.action === 'fetchData') {
				// Fetch data using the current fetch URL
				fetchData(function (response) {
					// Send the data back to the caller
					sendResponse(response);
				});
				return true;
			}
		}
	}
});

// Dark Mode Time Range Check On Add-On Load
BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
	if (result.darkModeAuto == 'time') {
		checkTime(true);
	}
});

// Check Time And Apply Dark Mode If Within Time Range
let interval = null;
function checkTime(i) {
	if (i === true) {
		if (interval === null) {
			interval = setInterval(function () {
				darkModeTimeCalc(0);
			}, 60000);
		}
	} else if (i === false) {
		clearInterval(interval);
		interval = null;
	}
}

// Refresh Tweaks When Add-On is Reloaded
BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
	tabs.forEach(function (tab) {
		if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded === false) {
			BROWSER_API.tabs.sendMessage(tab.id, { loadSaves: true });
		}
	});
});

// Restore backup config
function restoreBackup(request) {
	console.log('restoring backup config...');
	const json = Object.values(request)[0];
	for (const [key, value] of Object.entries(json)) {
		console.log(key, value);
		BROWSER_API.storage.sync.set({ [key]: value });
	}
}

// Function to fetch data
function fetchData(sendResponse) {
	fetch(fetchUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then((data) => {
			// Send the data back to the caller
			sendResponse({ data });
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
			// Send an error back to the caller
			sendResponse({ action: 'fetchData', error: error.message });
		});
}
