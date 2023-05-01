/* ===== Background script ===== */

import { darkModeTimeCalc } from '../common/popup/popup-functions'


// Listen For Messages
BROWSER_API.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.darkModeAutoTime === true) {
		checkTime(true);
	} else if (request.darkModeAutoTime === false) {
		checkTime(false);
	}
});


// Dark Mode Time Range Check On Add-On Load
BROWSER_API.storage.sync.get(['darkModeAuto'], function(result) {
	if (result.darkModeAuto == "time") {
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
BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
	tabs.forEach(function(tab){
		if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded === false)) {
			BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true});
		};
	});
});
