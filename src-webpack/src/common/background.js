/* ===== Background script ===== */

//import { darkModeTimeCalc } from './content/tweaks/dark_mode/dark_mode_time_calc';

// Logging
function timestamp() {
	const D = new Date();
	const time = D.toLocaleTimeString();
	const date = D.toLocaleDateString('en-GB');
	return `${date} ${time}`;
}
console.log(`${timestamp()} - Extension loaded`);

// Listen For Messages
BROWSER_API.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	/*if (request.darkModeAutoTime === true) {
		checkTime(true);
	} else if (request.darkModeAutoTime === false) {
		checkTime(false);
	} else */ if (request.importBackupFile === true) {
		BROWSER_API.storage.sync.get(['language'], function (result) {
			if (typeof result.language != 'undefined') {
				BROWSER_API.tabs.create({ url: `restore_config.html?&lang=` + result.language }, function (tab) {});
			} else {
				BROWSER_API.tabs.create({ url: `restore_config.html` }, function (tab) {});
			}
		});
	} else if (request.SaveScrollToNextRootCommentPosition) {
		const pos = request.SaveScrollToNextRootCommentPosition;
		BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: { x: pos.x, y: pos.y } });
	} else if (request.SaveScrollToTopFloatPosition) {
		const pos = request.SaveScrollToTopFloatPosition;
		BROWSER_API.storage.sync.set({ scrollToTopFloatPosition: { x: pos.x, y: pos.y } });
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
	} else if (request.openOptionsPage === true) {
		BROWSER_API.tabs.create({ url: `options.html` }, function (tab) {});
	} else if (request.actions) {
		for (const action of request.actions) {
			if (action.action === 'fetchData' && action.url) {
				//console.log('fetchData', action.url);
				fetchData(action.url, sendResponse);
				return true;
			} else if (action.action === 'fetchText' && action.url) {
				fetchText(action.url, sendResponse);
				return true;
			} else if (action.action === 'checkVisited' && action.url) {
				BROWSER_API.history.search({ text: action.url, maxResults: 1 }, function (data) {
					if (data.length > 0) {
						sendResponse({ visited: true, message: 'URL has been visited', url: action.url });
					} else {
						sendResponse({ visited: false, message: 'URL has not been visited', url: action.url });
					}
				});
				return true;
			} else if (action.action === 'markVisited' && action.url) {
				BROWSER_API.history.addUrl({ url: action.url }, function () {
					console.log(`${timestamp()} - Marking URL as visited: ${action.url}`);
				});
			} else if (action.action === 'downloadVideo' && action.filename && action.url) {
				BROWSER_API.downloads.download(
					{
						url: action.url,
						filename: action.filename.endsWith('.mp4') ? action.filename : `${action.filename}.mp4`,
						saveAs: true,
					},
					(downloadId) => {
						if (BROWSER_API.runtime.lastError) {
							console.error(`${timestamp()} - Download failed:, ${BROWSER_API.runtime.lastError}`);
						} else {
							console.log(`${timestamp()} - Downloading video: ${action.filename} - ${action.url}`);
						}
					}
				);
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
	}
});

// Dark Mode Time Range Check On Add-On Load
/*BROWSER_API.storage.sync.get(['darkModeAuto'], function (result) {
	if (result.darkModeAuto == 'time') {
		checkTime(true);
	}
});*/

// Check Time And Apply Dark Mode If Within Time Range
/*let interval = null;
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
}*/

// Fetch JSON data
// @see content/tweaks/productivity/show_post_flair.js
async function fetchData(url, sendResponse) {
	fetch(url, {
		method: 'GET',
		mode: IS_CHROME && (await getActiveTabDomain()) === 'sh.reddit.com' ? 'no-cors' : 'cors',
	})
		.then((response) => {
			if (!response.ok) throw response.status;
			return response.json();
		})
		.then((data) => {
			// Send the data back to the caller
			sendResponse(data);
		})
		.catch((error) => {
			console.error('Error fetching data from API: ', JSON.stringify(error, null, 2) || String(error));
			if (error instanceof TypeError && error.message === 'NetworkError when attempting to fetch resource.') {
				sendResponse({ error: 'Cannot retrieve data as www.reddit.com is currently unreachable.' });
			} else if (error === 403) {
				sendResponse({ error: 'Error retrieving data: you seem to be rate-limited by reddit' });
			} else {
				sendResponse({ error: error.message || String(error) });
			}
		});
}

async function getActiveTabDomain() {
	const tabs = await BROWSER_API.tabs.query({ active: true, currentWindow: true });
	if (tabs.length > 0 && tabs[0].url) {
		const url = new URL(tabs[0].url);
		return url.hostname;
	}
	return null;
}

// Fetch text files
function fetchText(url, sendResponse) {
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then((text) => {
			sendResponse({ success: true, data: text });
		})
		.catch((error) => {
			console.error('Error fetching the text file:', error);
			sendResponse({ success: false, error: error.message });
		});
}

/* ===== Rules ===== */
let options = { enableRulesetIds: [], disableRulesetIds: [] };

/* ===== Just Open The Image ===== */

// Load Saved Value
BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
	if (result.justOpenTheImage) {
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
			console.log(`${timestamp()} - Add image ruleset`);
			//reload_tabs();
		})
		.catch((error) => {
			console.error(`${timestamp()} - Error updating rules:`, error);
		});
}

/* ===== Redirect To Preferred UI ===== */

// Load Saved Value
BROWSER_API.runtime.onStartup.addListener(() => {
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		updateRedirectRuleset(result.autoRedirectVersion);
	});
});

// Update Redirect Ruleset
function updateRedirectRuleset(version) {
	if (version === 'old') {
		options = { enableRulesetIds: ['rv1_ruleset'], disableRulesetIds: ['rv3_ruleset'] };
		BROWSER_API.declarativeNetRequest.updateEnabledRulesets(options).then(() => {
			console.log(`${timestamp()} - Switching to RV1 (Old) redirect ruleset`);
		});
	} else if (version === 'newnew') {
		options = { enableRulesetIds: ['rv3_ruleset'], disableRulesetIds: ['rv1_ruleset'] };
		BROWSER_API.declarativeNetRequest.updateEnabledRulesets(options).then(() => {
			console.log(`${timestamp()} - Switching to RV3 (Latest) redirect ruleset`);
		});
	} else {
		options = { enableRulesetIds: [], disableRulesetIds: ['rv1_ruleset', 'rv3_ruleset'] };

		BROWSER_API.declarativeNetRequest.updateEnabledRulesets(options).then(() => {
			console.log(`${timestamp()} - Removed RV1 (Old) and RV3 (Latest) rulesets`);
		});
	}
}
