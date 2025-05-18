/* ===== Background script ===== */

import { darkModeTimeCalc } from './content/tweaks/dark_mode/dark_mode_time_calc';
//const muxjs = require('mux.js');
let fetchUrl = '';

// Logging
function timestamp() {
	const D = new Date();
	const time = D.toLocaleTimeString();
	const date = D.toLocaleDateString('en-GB');
	const timestamp = `${date} ${time}`;
	return timestamp;
}
console.log(`${timestamp()} - Extension loaded`);

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
	} else if (request.openOptionsPage === true) {
		BROWSER_API.tabs.create({ url: `options.html` }, function (tab) {});
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
	} else if (request.autoRedirectVersion) {
		updateRedirectRuleset(request.autoRedirectVersion);
	} else if (request.log === 'log') {
		console.log(`${timestamp()} - ${request.message}`);
	} else if (request.log === 'warn') {
		console.warn(`${timestamp()} - ${request.message}`);
	} else if (request.log === 'error') {
		console.error(`${timestamp()} - ${request.message}`);
	} /* else if (request.action === 'downloadVideo') {
		const videoUrl = request.videoUrl;
		BROWSER_API.downloads.download({
			url: videoUrl,
			filename: 'downloaded-video.mp4', // Set the desired file name
			saveAs: true, // Show the "Save As" dialog
		});
	} else if (request.action === 'testQualities') {
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

/* ===== Rules ===== */
let options = { enableRulesetIds: [], disableRulesetIds: [] };

/* ===== Just Open The Image ===== */

// Load Saved Value
BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
	if (result.justOpenTheImage === true) {
		enableJustOpenTheImage();
	} else {
		disableJustOpenTheImage();
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
	} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
		addImageRules();
	}
}

// Disable
function disableJustOpenTheImage() {
	if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
		BROWSER_API.webRequest.onBeforeRequest.removeListener(redirectToImageUrl, { urls: ['*://www.reddit.com/media*'], types: ['main_frame'] }, ['blocking']);
		BROWSER_API.webRequest.onBeforeSendHeaders.removeListener(modifyHeader, { urls: ['*://*.redd.it/*'] }, ['blocking', 'requestHeaders']);
	} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
		removeImageRules();
	}
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

// Manifest V3
function removeImageRules() {
	const rule = options.enableRulesetIds.indexOf('image_ruleset');
	if (rule > -1) {
		options.enableRulesetIds.splice(rule, 1);
	}
	options.disableRulesetIds.push('image_ruleset');
	BROWSER_API.declarativeNetRequest.updateEnabledRulesets(options).then(() => {
		console.log('Remove image ruleset');
		BROWSER_API.tabs
			.reload()
			.then(() => {
				return;
			})
			.catch((error) => {
				console.error('Error updating rules:', error);
			});
	});
}

function addImageRules() {
	const rule = options.disableRulesetIds.indexOf('image_ruleset');
	if (rule > -1) {
		options.disableRulesetIds.splice(rule, 1);
	}
	options.enableRulesetIds.push('image_ruleset');
	BROWSER_API.declarativeNetRequest
		.updateEnabledRulesets(options)
		.then(() => {
			console.log('Add image ruleset');
			//reload_tabs();
		})
		.catch((error) => {
			console.error('Error updating rules:', error);
		});
}

/* ===== Redirect To Preferred UI ===== */

// Load Saved Value
BROWSER_API.runtime.onStartup.addListener(() => {
	console.log('Extension started!');
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		updateRedirectRuleset(result.autoRedirectVersion);
	});
});

// Update Redirect Ruleset
function updateRedirectRuleset(version) {
	console.log('Redirect to: ' + version);
	if (version === 'old') {
		options = { enableRulesetIds: ['old_ruleset'], disableRulesetIds: ['new_ruleset', 'sh_ruleset'] };
		console.log('Removed new and sh rulesets. Added old ruleset');
	} else if (version === 'new') {
		options = { enableRulesetIds: ['new_ruleset'], disableRulesetIds: ['old_ruleset', 'sh_ruleset'] };
		console.log('Removed old and sh rulesets. Added new ruleset');
	} else if (version === 'newnew') {
		options = { enableRulesetIds: ['sh_ruleset'], disableRulesetIds: ['old_ruleset', 'new_ruleset'] };
		console.log('Removed old and new rulesets. Added sh ruleset');
	} else {
		options = { enableRulesetIds: [], disableRulesetIds: ['old_ruleset', 'new_ruleset', 'sh_ruleset'] };
		console.log('Removed old, new and sh rulesets');
	}
	BROWSER_API.declarativeNetRequest.updateEnabledRulesets(options).then(() => {
		console.log('Updated enabled rulesets');
	});
}

/* ===== Merge Video And Audio ===== (DOESN'T WORK) 
const appendBuffer = (buffer1, buffer2) => {
	const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

const mergeVideoAndAudio = async (videoUrl, audioUrl) => {
	const videoResponse = await fetch(videoUrl);
	console.log(videoResponse);
	const videoBuffer = await videoResponse.arrayBuffer();
	console.log(videoBuffer);

	const audioResponse = await fetch(audioUrl);
	const audioBuffer = await audioResponse.arrayBuffer();

	//const transmuxer = new muxjs.mp4.Transmuxer({ remux: true });
	var transmuxer = new muxjs.mp4.Transmuxer(initOptions);
	console.log(transmuxer);

	let mergedBuffer = new Uint8Array(0);
	console.log(mergedBuffer);

	transmuxer.on('data', (segment) => {
		console.log('got data!');
		mergedBuffer = appendBuffer(mergedBuffer.buffer, segment.initSegment);
		mergedBuffer = appendBuffer(mergedBuffer.buffer, segment.data);
		console.log(mergedBuffer);
	});

	transmuxer.on('done', () => {
		const blob = new Blob([mergedBuffer], { type: 'video/mp4' });
		const url = URL.createObjectURL(blob);
		browser.downloads.download({
			url: url,
			filename: 'merged-video.mp4',
			saveAs: true,
		});
	});

	console.log('push');

	// Push video and audio data to the transmuxer
	transmuxer.push(new Uint8Array(videoBuffer));
	transmuxer.push(new Uint8Array(audioBuffer));

	// Signal that we are done with pushing data
	transmuxer.flush();
};*/
