// ────────────────────────────────────────────────────────────────────────────
// Background script
// ────────────────────────────────────────────────────────────────────────────

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
		BROWSER_API.storage.sync
			.set(json)
			.then(() => {
				sendResponse({ success: true, message: 'All data stored successfully' });
			})
			.catch((error) => {
				sendResponse({ success: false, message: 'Error storing data', error: error.message });
			});
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
					},
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
	} else if (request.action === 'runAutoplayGifs') {
		handleRunAutoplayGifs(sender, sendResponse);
		return true;
	} else if (request.action === 'runAutoplayVideos') {
		handleRunAutoplayVideos(sender, sendResponse);
		return true;
	} else if (request.action === 'runAutoplayCommentGifs') {
		handleRunAutoplayCommentGifs(sender, sendResponse);
		return true;
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

/* ===== Autoplay Helpers ===== */

function handleRunAutoplayGifs(sender, sendResponse) {
	function runAutoplayGifsInMain() {
		const posts = document.querySelectorAll('shreddit-post[post-type="gif"]');
		posts.forEach((post) => {
			const player = post.querySelector('shreddit-player');
			if (!player) return;
			const rect = player.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			if (rect.top < viewportHeight && rect.bottom > 0) {
				try {
					player.play();
				} catch (e) {}
			}
		});
	}

	const tabId = sender.tab?.id;
	if (!tabId) {
		sendResponse({ success: false });
		return;
	}
	BROWSER_API.scripting
		.executeScript({
			target: { tabId },
			world: 'MAIN',
			func: runAutoplayGifsInMain,
		})
		.then(() => sendResponse({ success: true }))
		.catch((e) => {
			console.error('runAutoplayGifs failed:', e);
			sendResponse({ success: false });
		});
}

function handleRunAutoplayVideos(sender, sendResponse) {
	function runAutoplayVideosInMain() {
		const posts = document.querySelectorAll('shreddit-post[post-type="video"]');
		posts.forEach((post) => {
			const player = post.querySelector('shreddit-player');
			if (!player) return;
			const rect = player.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			if (rect.top < viewportHeight && rect.bottom > 0) {
				try {
					player.play();
				} catch (e) {}
			}
		});
	}

	const tabId = sender.tab?.id;
	if (!tabId) {
		sendResponse({ success: false });
		return;
	}
	BROWSER_API.scripting
		.executeScript({
			target: { tabId },
			world: 'MAIN',
			func: runAutoplayVideosInMain,
		})
		.then(() => sendResponse({ success: true }))
		.catch((e) => {
			console.error('runAutoplayVideos failed:', e);
			sendResponse({ success: false });
		});
}

function handleRunAutoplayCommentGifs(sender, sendResponse) {
	function runAutoplayCommentGifsInMain() {
		const gifs = document.querySelectorAll('shreddit-comment shreddit-player');
		gifs.forEach((gif) => {
			const rect = gif.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			if (rect.top < viewportHeight && rect.bottom > 0) {
				try {
					gif.play();
				} catch (e) {}
			}
		});
	}

	const tabId = sender.tab?.id;
	if (!tabId) {
		sendResponse({ success: false });
		return;
	}
	BROWSER_API.scripting
		.executeScript({
			target: { tabId },
			world: 'MAIN',
			func: runAutoplayCommentGifsInMain,
		})
		.then(() => sendResponse({ success: true }))
		.catch((e) => {
			console.error('runAutoplayCommentGifs failed:', e);
			sendResponse({ success: false });
		});
}

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
				// Handle specific HTTP error codes with user-friendly messages
				if (response.status === 403) {
					throw new Error('Access forbidden: You seem to be rate-limited by the server.');
				} else if (response.status === 404) {
					throw new Error('The requested resource was not found (404).');
				} else if (response.status >= 500) {
					throw new Error(`Server error (${response.status}). Please try again later.`);
				} else {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
			}
			return response.text();
		})
		.then((text) => {
			sendResponse({ success: true, data: text });
		})
		.catch((error) => {
			console.error('Error fetching the text file:', error);

			let userMessage;
			// Check for network/CORS errors (TypeError)
			if (error instanceof TypeError) {
				// Chrome-specific network error message
				if (error.message === 'NetworkError when attempting to fetch resource.') {
					userMessage = 'Cannot retrieve data. The server appears to be unreachable.';
				} else {
					// Generic network/CORS error
					userMessage = 'Cannot retrieve data due to a network error or CORS restriction.';
				}
			} else {
				// Use the error message from thrown errors (HTTP errors) or the error's message
				userMessage = error.message || String(error);
			}

			sendResponse({ success: false, error: userMessage });
		});
}

/* ===== Rules ===== */

// ===== Race Condition Prevention =====
// A global promise queue that serializes all ruleset updates.
// Without this, concurrent calls to addImageRules(), removeImageRules(), and
// updateRedirectRuleset() could interleave and corrupt the ruleset state due to
// the read-modify-write pattern when accessing storage.
// Each queued operation completes fully before the next one begins, ensuring
// atomicity and preventing lost updates.
let rulesetQueue = Promise.resolve();

/**
 * Queues a ruleset update operation to run serially.
 * @param {Function} updateFn - An async function that performs the update
 * @returns {Promise} The promise for the queued operation
 */
function queueRulesetUpdate(updateFn) {
	rulesetQueue = rulesetQueue.then(updateFn).catch((error) => {
		console.error(`${timestamp()} - Ruleset update error:`, error);
	});
	return rulesetQueue;
}

/* ===== Just Open The Image ===== */

// Load Saved Value
BROWSER_API.storage.sync.get(['justOpenTheImage'], function (result) {
	if (result.justOpenTheImage) {
		enableJustOpenTheImage();
	}
});

// Enable
function enableJustOpenTheImage() {
	addImageRules();
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
	if (imageURL) {
		// Security: Validate that the redirect target is a trusted Reddit domain
		try {
			const targetUrl = new URL(imageURL);
			const hostname = targetUrl.hostname;
			// Only allow redirects to *.redd.it domains
			if (hostname === 'redd.it' || hostname.endsWith('.redd.it')) {
				return { redirectUrl: imageURL };
			}
			// Invalid target - do not redirect
			console.warn(`${timestamp()} - Blocked redirect to untrusted domain: ${hostname}`);
		} catch (e) {
			console.error(`${timestamp()} - Invalid URL in redirect: ${imageURL}`);
		}
	}
}
function modifyHeader(details) {
	const acceptHeaderIndex = details.requestHeaders.findIndex((header) => header.name.toLowerCase() === 'accept');
	if (acceptHeaderIndex !== -1) {
		details.requestHeaders[acceptHeaderIndex].value += 'image/avif,image/webp,*/*';
	}
	return { requestHeaders: details.requestHeaders };
}

// Manifest V3
/**
 * Disables the image_ruleset.
 * Uses the queue to ensure atomic read-modify-write and prevent race conditions.
 */
function removeImageRules() {
	return queueRulesetUpdate(async () => {
		// Read current state from storage (source of truth)
		const { enableRulesetIds: enable = [], disableRulesetIds: disable = [] } = await BROWSER_API.storage.sync.get(['enableRulesetIds', 'disableRulesetIds']);

		// Compute new state: remove from enable, add to disable (avoiding duplicates)
		const newEnable = enable.filter((id) => id !== 'image_ruleset');
		const newDisable = [...new Set([...disable, 'image_ruleset'])];

		// Persist new state and update DNR
		await BROWSER_API.storage.sync.set({ enableRulesetIds: newEnable, disableRulesetIds: newDisable });
		await BROWSER_API.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: newEnable,
			disableRulesetIds: newDisable,
		});
		console.log('Remove image ruleset');
	});
}

/**
 * Enables the image_ruleset.
 * Uses the queue to ensure atomic read-modify-write and prevent race conditions.
 */
function addImageRules() {
	return queueRulesetUpdate(async () => {
		// Read current state from storage (source of truth)
		const { enableRulesetIds: enable = [], disableRulesetIds: disable = [] } = await BROWSER_API.storage.sync.get(['enableRulesetIds', 'disableRulesetIds']);

		// Compute new state: add to enable, remove from disable (avoiding duplicates)
		const newDisable = disable.filter((id) => id !== 'image_ruleset');
		const newEnable = [...new Set([...enable, 'image_ruleset'])];

		// Persist new state and update DNR
		await BROWSER_API.storage.sync.set({ enableRulesetIds: newEnable, disableRulesetIds: newDisable });
		await BROWSER_API.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: newEnable,
			disableRulesetIds: newDisable,
		});
		console.log(`${timestamp()} - Add image ruleset`);
	});
}

/* ===== Redirect To Preferred UI ===== */

// Load Saved Value
BROWSER_API.runtime.onStartup.addListener(() => {
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		updateRedirectRuleset(result.autoRedirectVersion);
	});
});

/**
 * Updates the redirect ruleset based on user preference (old/newnew/disabled).
 * Uses the queue to ensure atomic read-modify-write and prevent race conditions.
 * Preserves the image_ruleset state if it was previously enabled/disabled.
 * @param {string} version - 'old', 'newnew', or any other value to disable redirects
 */
function updateRedirectRuleset(version) {
	return queueRulesetUpdate(async () => {
		// Read current state from storage (source of truth)
		const { enableRulesetIds: currentEnable = [], disableRulesetIds: currentDisable = [] } = await BROWSER_API.storage.sync.get(['enableRulesetIds', 'disableRulesetIds']);

		// Determine the new redirect ruleset configuration
		let newEnable, newDisable;

		if (version === 'old') {
			newEnable = ['rv1_ruleset'];
			newDisable = ['rv3_ruleset'];
		} else if (version === 'newnew') {
			newEnable = ['rv3_ruleset'];
			newDisable = ['rv1_ruleset'];
		} else {
			// Disable both redirect rulesets
			newEnable = [];
			newDisable = ['rv1_ruleset', 'rv3_ruleset'];
		}

		// Preserve image_ruleset if it was previously enabled/disabled
		// This ensures the "Just Open The Image" feature isn't affected by redirect changes
		if (currentEnable.includes('image_ruleset') && !newEnable.includes('image_ruleset')) {
			newEnable.push('image_ruleset');
		}
		if (currentDisable.includes('image_ruleset') && !newDisable.includes('image_ruleset')) {
			newDisable.push('image_ruleset');
		}

		// Persist new state and update DNR
		await BROWSER_API.storage.sync.set({ enableRulesetIds: newEnable, disableRulesetIds: newDisable });
		await BROWSER_API.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: newEnable,
			disableRulesetIds: newDisable,
		});

		// Log the action
		if (version === 'old') {
			console.log(`${timestamp()} - Switching to RV1 (Old) redirect ruleset`);
		} else if (version === 'newnew') {
			console.log(`${timestamp()} - Switching to RV3 (Latest) redirect ruleset`);
		} else {
			console.log(`${timestamp()} - Removed RV1 (Old) and RV3 (Latest) rulesets`);
		}
	});
}

/* ===== Canned Messages Context Menu ===== */

// Create context menu items for canned messages
function createCannedMessagesMenu() {
	console.log(`${timestamp()} - Creating canned messages context menu`);
	// Check if feature is enabled first
	BROWSER_API.storage.sync.get(['cannedMessages'], function (result) {
		if (!result.cannedMessages) {
			console.log(`${timestamp()} - Canned messages feature disabled, skipping context menu creation`);
			// Remove any existing menu items
			BROWSER_API.contextMenus.removeAll(() => {});
			return;
		}

		// Remove existing menu items first
		BROWSER_API.contextMenus.removeAll(() => {
			// Get canned messages from storage
			BROWSER_API.storage.sync.get(['cannedMessagesList'], function (result) {
				const messages = result.cannedMessagesList ?? '';
				const messageArray = messages.split('\n').filter((msg) => msg.trim() !== '');

				if (messageArray.length === 0) {
					// Create a disabled placeholder if no messages
					BROWSER_API.contextMenus.create({
						id: 'canned-messages-empty',
						title: 'Canned Messages (none defined)',
						contexts: ['all'],
						enabled: false,
					});
					console.log(`${timestamp()} - Created empty canned messages menu placeholder`);
					return;
				}

				// Create parent menu
				BROWSER_API.contextMenus.create({
					id: 'canned-messages-parent',
					title: 'Canned Messages',
					contexts: ['all'],
				});

				// Create child items for each message
				messageArray.forEach((message, index) => {
					const title = message.length > 60 ? message.substring(0, 60) + '...' : message;
					BROWSER_API.contextMenus.create({
						id: `canned-message-${index}`,
						parentId: 'canned-messages-parent',
						title: title,
						contexts: ['all'],
					});
				});
				console.log(`${timestamp()} - Created canned messages menu with ${messageArray.length} items`);
			});
		});
	});
}

// Update context menu when canned messages list changes
function updateCannedMessagesMenu() {
	console.log(`${timestamp()} - Updating canned messages context menu`);
	createCannedMessagesMenu();
}

// Remove context menu items
function removeCannedMessagesMenu() {
	BROWSER_API.contextMenus.removeAll();
}

// Listen for context menu clicks
BROWSER_API.contextMenus.onClicked.addListener((info, tab) => {
	console.log(`${timestamp()} - Context menu clicked:`, info.menuItemId);
	if (info.menuItemId.startsWith('canned-message-')) {
		const index = parseInt(info.menuItemId.replace('canned-message-', ''), 10);

		BROWSER_API.storage.sync.get(['cannedMessagesList'], function (result) {
			const messages = result.cannedMessagesList ?? '';
			const messageArray = messages.split('\n').filter((msg) => msg.trim() !== '');
			const message = messageArray[index];

			if (message && tab?.id) {
				// Send message to content script to copy and show notification
				BROWSER_API.tabs
					.sendMessage(tab.id, {
						action: 'copyCannedMessage',
						message: message,
					})
					.catch((err) => {
						console.error(`${timestamp()} - Failed to send message to content script:`, err);
					});
			}
		});
	}
});

// Initialise context menu immediately (service worker may not trigger onStartup on reload)
createCannedMessagesMenu();

// Also create menu on install/update
BROWSER_API.runtime.onInstalled.addListener(() => {
	createCannedMessagesMenu();
});

// Create menu when extension starts
BROWSER_API.runtime.onStartup.addListener(() => {
	createCannedMessagesMenu();
});

// Listen for changes to cannedMessagesList or cannedMessages to update the menu
BROWSER_API.storage.onChanged.addListener((changes, namespace) => {
	if (changes.cannedMessagesList || changes.cannedMessages) {
		updateCannedMessagesMenu();
	}
});
