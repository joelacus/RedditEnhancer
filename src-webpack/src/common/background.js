/* ===== Background script ===== */

import { darkModeTimeCalc } from '../common/popup/popup-functions';
//import muxjs from 'mux.js/dist/mux.js';
//const muxjs = require('mux.js');
let fetchUrl = '';

// Listen For Messages
BROWSER_API.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
		const json = Object.values(request)[0];
		for (const [key, value] of Object.entries(json)) {
			BROWSER_API.storage.sync
				.set({ [key]: value })
				.then(() => {
					sendResponse({ success: true, message: 'Data stored successfully' });
				})
				.catch((error) => {
					sendResponse({ success: false, message: 'Error storing data' });
				});
		}
		return true;
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
	} else if (request.justOpenTheImage === true) {
		enableJustOpenTheImage();
	} else if (request.justOpenTheImage === false) {
		disableJustOpenTheImage();
	} /* else if (request.action === 'downloadVideo') {
		const videoUrl = request.videoUrl;
		BROWSER_API.downloads.download({
			url: videoUrl,
			filename: 'downloaded-video.mp4', // Set the desired file name
			saveAs: true, // Show the "Save As" dialog
		});
	}  else if (request.action === 'testQualities') {
		const videoUrl = request.url;
		const audioUrl = videoUrl.replace(/DASH_\d+\.mp4$/, 'DASH_AUDIO_128.mp4');
		const availableQualities = ['96', '220', '270', '360', '480', '720', '1080'];
		// Iterate over qualities and find the highest available quality
		async function findHighestQuality() {
			let highestQuality = '96';
			let highestQualityUrl = videoUrl;
			for (const quality of availableQualities) {
				const testUrl = videoUrl.replace(/_(\d+)\.mp4$/, `_${quality}.mp4`);
				const isAvailable = await testVideoQuality(testUrl);
				if (isAvailable) {
					highestQuality = quality;
					highestQualityUrl = videoUrl.replace(/_(\d+)\.mp4$/, `_${quality}.mp4`);
				}
			}
			console.log(highestQuality);
			mergeVideoAndAudio(highestQualityUrl, audioUrl);
			sendResponse({ highestQuality, highestQualityUrl, audioUrl });
		}
		findHighestQuality();
		return true;
	}*/

	// Function to test video quality
	/*async function testVideoQuality(url) {
		try {
			const response = await fetch(url, { method: 'HEAD' });
			return response.ok;
		} catch (error) {
			console.error('Error testing video quality:', error);
			return false;
		}
	}*/
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

/* ===== Merge Video And Audio ===== (DOESN'T WORK)
const mergeVideoAndAudio = async (videoUrl, audioUrl) => {
	console.log(videoUrl, audioUrl);

	// Initialise merged buffer
	const mergedBuffer = new ArrayBuffer();

	const videoResponse = await fetch(videoUrl);
	const videoBuffer = await videoResponse.arrayBuffer();

	const audioResponse = await fetch(audioUrl);
	const audioBuffer = await audioResponse.arrayBuffer();

	const transmuxer = new muxjs.mp4.Transmuxer({ remux: true });

	console.log(transmuxer);

	// Append init segment to merged buffer
	transmuxer.on('data', (segment) => {
		console.log('got data!');

		mergedBuffer = appendInitSegment(mergedBuffer, segment.initSegment);
		mergedBuffer = appendData(mergedBuffer, segment.data);
	});

	transmuxer.on('end', () => {
		const url = URL.createObjectURL(mergedBuffer);
		console.log(url);
		browser.downloads.download({
			url: url,
			filename: 'merged-video.mp4',
			saveAs: true,
		});
	});

	transmuxer.push(new Uint8Array(videoBuffer), { startTime: 0, mimeType: 'video/mp4' });
	transmuxer.push(new Uint8Array(audioBuffer), { startTime: 0, mimeType: 'audio/aac' });

	transmuxer.flush();
};*/

/* ===== Just Open The Image ===== */

// Load Saved Value
BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
	if (result.justOpenTheImage === true) {
		enableJustOpenTheImage();
	}
});

// Enable
function enableJustOpenTheImage() {
	if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
		BROWSER_API.permissions.contains(
			{
				permissions: ['webRequest', 'webRequestBlocking'],
				origins: ['*://*.redd.it/*'],
			},
			(result) => {
				if (result) {
					BROWSER_API.webRequest.onBeforeRequest.addListener(redirectToImageUrl, { urls: ['*://www.reddit.com/media*'], types: ['main_frame'] }, ['blocking']);
					BROWSER_API.webRequest.onBeforeSendHeaders.addListener(modifyHeader, { urls: ['*://*.redd.it/*'] }, ['blocking', 'requestHeaders']);
				} else {
					console.log('Optional permissions not granted');
				}
			}
		);
	} /* else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
		removeRules();
		addRules();
	}*/
}

// Disable
function disableJustOpenTheImage() {
	if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
		BROWSER_API.webRequest.onBeforeRequest.removeListener(redirectToImageUrl, { urls: ['*://www.reddit.com/media*'], types: ['main_frame'] }, ['blocking']);
		BROWSER_API.webRequest.onBeforeSendHeaders.removeListener(modifyHeader, { urls: ['*://*.redd.it/*'] }, ['blocking', 'requestHeaders']);
	} /* else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
		removeRules();
	}*/
}

// Manifest V2
function redirectToImageUrl(details) {
	const url = new URL(details.url);
	const imageURL = url.searchParams.get('url');
	if (imageURL) return { redirectUrl: imageURL };
}
function modifyHeader(details) {
	const acceptHeaderIndex = details.requestHeaders.findIndex((header) => header.name.toLowerCase() === 'accept');
	if (acceptHeaderIndex !== -1) {
		details.requestHeaders[acceptHeaderIndex].value += 'image/avif,image/webp,*/*';
	}
	return { requestHeaders: details.requestHeaders };
}

/*
// Manifest V3 (DOESN'T WORK)

"permissions": ["storage", "tabs", "declarativeNetRequest"],
"host_permissions": ["*://*.reddit.com/*", "*://*.redd.it/*"],

function removeRules() {
	BROWSER_API.declarativeNetRequest
		.updateDynamicRules({
			removeRuleIds: [1, 2, 3],
		})
		.then(() => {
			console.log('Rules removed.');
		});
}
function addRules() {
	const rules = [
		{
			id: 1,
			priority: 1,
			action: {
				type: 'redirect',
				redirect: {
					regexSubstitution: '$1',
				},
			},
			condition: {
				regexFilter: '^www\\.reddit\\.com/media\\?url=(.*)$',
			},
		},
		{
			id: 2,
			priority: 2,
			action: { type: 'block' },
			condition: { urlFilter: '*://www.reddit.com/media*', resourceTypes: ['main_frame'] },
		},
		{
			id: 3,
			priority: 3,
			action: {
				type: 'modifyHeaders',
				requestHeaders: [{ header: 'Accept', operation: 'set', value: 'image/avif,image/webp,/*' }],
			},
			condition: { urlFilter: '*://*.redd.it/' },
		},
	];
	BROWSER_API.declarativeNetRequest
		.updateDynamicRules({ addRules: rules })
		.then(() => {
			console.log('New rules added.');
		})
		.catch((error) => {
			console.error('Error adding new rules:', error);
		});
}*/
