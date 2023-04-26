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


// Detect Navigation And Reload Saves/Tweaks
// Currently requires [navigation] permission. If there is a way without needing it, I will change it.
const filter = {
  url:
  [
    {hostContains: "reddit.com"}
  ]
}
function onHistoryStateUpdated(details) {
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded === false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true}).catch(function(){
					//console.log("error")
				});
			};
		});
	});
}
BROWSER_API.webNavigation.onHistoryStateUpdated.addListener(onHistoryStateUpdated, filter);


// Refresh Tweaks When Add-On is Reloaded
BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
	tabs.forEach(function(tab){
		if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded === false)) {
			BROWSER_API.tabs.sendMessage(tab.id, {loadSaves: true}).catch(function(){
				//console.log("error")
			});
		};
	});
});


// Limit Post Comments
// Currently requires [navigation] permission. If there is a way without needing it, I will change it.
function handleBeforeNavigate(details) {
	BROWSER_API.storage.sync.get(['commentsLimit'], function(result) {
		// Check if the navigation is to a Reddit comments page
		if (details.url.match('https://.*.reddit.com/.*\/comments\/.*')) {
			let newUrl;
			// Check if the URL already has the query parameter "?limit=50" (or some other number)
			if (details.url.includes('?limit=')) {
				if (result.commentsLimit == -10) {
					newUrl = details.url.replace(/(\?|\&)limit=\d+/, '');
				} else {
					newUrl = details.url.replace(/(\?|\&)limit=\d+/, '?limit='+result.commentsLimit);
				}
			} else {
				if (result.commentsLimit == -10) {
					newUrl = details.url
				} else {
					newUrl = details.url + '?limit='+result.commentsLimit;
				}
			}

			// Remove the listener
			BROWSER_API.webNavigation.onBeforeNavigate.removeListener(handleBeforeNavigate);

			// Navigate to the modified URL
			BROWSER_API.tabs.update(details.tabId, {url: newUrl});
		}
	});
}

// Listen for tab navigations
BROWSER_API.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate);

// Refresh listener on limit input change
BROWSER_API.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === "update_listener") {
		BROWSER_API.webNavigation.onBeforeNavigate.removeListener(handleBeforeNavigate);
		BROWSER_API.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate);
	}
});
