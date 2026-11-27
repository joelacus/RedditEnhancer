// ────────────────────────────────────────────────────────────────────────────
// Background script
// ────────────────────────────────────────────────────────────────────────────

//import { darkModeTimeCalc } from './content/tweaks/dark_mode/dark_mode_time_calc';

import { importLegacyBackup, restoreLocalBackupStores } from './utilities/block_store';
import { restoreLocalBackupData } from './utilities/local_data';

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
		BROWSER_API.storage.sync.get(['language', 'addonTheme'], function (result) {
			const lang = typeof result.language != 'undefined' ? '&lang=' + result.language : '';
			const theme = `&theme=${result.addonTheme}`;
			BROWSER_API.tabs.create({ url: `restore_config.html?&lang=${lang || theme ? '?' : ''}${lang}${theme}` }, function (tab) {});
		});
	} else if (request.SaveScrollToNextRootCommentPosition) {
		const pos = request.SaveScrollToNextRootCommentPosition;
		BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: { x: pos.x, y: pos.y } });
	} else if (request.SaveScrollToTopFloatPosition) {
		const pos = request.SaveScrollToTopFloatPosition;
		BROWSER_API.storage.sync.set({ scrollToTopFloatPosition: { x: pos.x, y: pos.y } });
	} else if (request.restore) {
		const json = Object.values(request)[0];
		// Block lists and user tags live in storage.local; the restore page
		// passes them through the same payload and they are routed here
		// (replacing the stored state to reproduce the backup), while the
		// settings go to storage.sync. The local image data
		// (uploaded header logo and backgrounds) rides in `localData` and
		// must not land in the sync write below.
		const { blockStore, redditUserTags, localData, ...syncData } = json;
		BROWSER_API.storage.sync
			.set(syncData)
			.then(async () => {
				// Restore the storage.local stores from the backup.
				try {
					await restoreLocalBackupStores(json);
				} catch (e) {
					console.error(`${timestamp()} - Local backup store restore failed:`, e);
				}
				// Restore the storage.local image data from the backup.
				try {
					await restoreLocalBackupData(localData);
				} catch (e) {
					console.error(`${timestamp()} - Local backup data restore failed:`, e);
				}
				// Fold any restored legacy block lists into the compressed block store.
				try {
					await importLegacyBackup();
				} catch (e) {
					console.error(`${timestamp()} - Block list import failed:`, e);
				}
				sendResponse({ success: true, message: 'All data stored successfully' });
			})
			.catch((error) => {
				sendResponse({ success: false, message: 'Error storing data', error: error.message });
			});
		return true;
	} else if (request.openOptionsPage === true) {
		BROWSER_API.tabs.create({ url: 'options.html' }, function (tab) {});
	} else if (request.openUserTaggingManager === true) {
		BROWSER_API.storage.sync.get(['language', 'addonTheme'], function (result) {
			const lang = typeof result.language != 'undefined' ? '&lang=' + result.language : '';
			const user = request.user ? '&user=' + encodeURIComponent(request.user) : '';
			const theme = `&theme=${result.addonTheme}`;
			BROWSER_API.tabs.create({ url: `user_tagging_manager.html${lang || user || theme ? '?' : ''}${lang}${user}${theme}` }, function (tab) {});
		});
	} else if (request.openBlockManager === true) {
		BROWSER_API.storage.sync.get(['language', 'addonTheme'], function (result) {
			const lang = typeof result.language != 'undefined' ? '&lang=' + result.language : '';
			const tab = request.tab ? '&tab=' + encodeURIComponent(request.tab) : '';
			const theme = `&theme=${result.addonTheme}`;
			BROWSER_API.tabs.create({ url: `block_manager.html${lang || tab || theme ? '?' : ''}${lang}${tab}${theme}` }, function (tab) {});
		});
	} else if (request.actions) {
		for (const action of request.actions) {
			if (action.action === 'fetchData' && action.url) {
				//console.log('fetchData', action.url);
				fetchData(action.url, sendResponse);
				return true;
			} else if (action.action === 'fetchText' && action.url) {
				fetchText(action.url, sendResponse);
				return true;
			} else if (action.action === 'resolveImagePage' && action.url) {
				resolveImagePage(action.url, sendResponse);
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
				if (!sender.tab) {
					sendResponse({ success: false, missingPermission: 'history' });
					return true;
				}
				BROWSER_API.permissions.contains({ permissions: ['history'] }, (granted) => {
					if (!granted) {
						sendResponse({ success: false, missingPermission: 'history' });
						return;
					}
					BROWSER_API.history.addUrl({ url: action.url }, function () {
						console.log(`${timestamp()} - Marking URL as visited: ${action.url}`);
					});
					sendResponse({ success: true });
				});
				return true;
			} else if (action.action === 'downloadVideo' && action.filename && action.url) {
				if (!sender.tab) {
					sendResponse({ success: false, missingPermission: 'downloads' });
					return true;
				}
				BROWSER_API.permissions.contains({ permissions: ['downloads'] }, function (granted) {
					if (!granted) {
						sendResponse({ success: false, missingPermission: 'downloads' });
						return;
					}
					BROWSER_API.downloads.download(
						{
							url: action.url,
							filename: action.filename.endsWith('.mp4') ? action.filename : action.filename + '.mp4',
							saveAs: true,
						},
						function (downloadId) {
							if (BROWSER_API.runtime.lastError) {
								console.error(timestamp() + ' - Download failed: ' + BROWSER_API.runtime.lastError.message);
							} else {
								console.log(timestamp() + ' - Downloading video: ' + action.filename + ' - ' + action.url);
							}
						},
					);
					sendResponse({ success: true });
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
	if (!BROWSER_API.scripting) {
		console.warn('runAutoplayGifs failed: scripting API unavailable');
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
	if (!BROWSER_API.scripting) {
		console.warn('runAutoplayVideos failed: scripting API unavailable');
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
	if (!BROWSER_API.scripting) {
		console.warn('runAutoplayCommentGifs failed: scripting API unavailable');
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

// Resolve an imgur/postimg/ibb page URL to its preview image URL.
// The content script uses this for comment links that point at a page rather
// than at an image file. Host access is optional: without it the content
// script keeps the original link and only thumbnails direct image URLs.
const IMAGE_PAGE_ORIGINS = ['*://*.imgur.com/*', '*://*.postimg.cc/*', '*://*.ibb.co/*'];
const IMAGE_PAGE_HOSTS = new Set(['imgur.com', 'www.imgur.com', 'postimg.cc', 'www.postimg.cc', 'ibb.co', 'www.ibb.co']);
const imagePageCache = new Map();

function resolveImagePage(url, sendResponse) {
	let pageUrl;
	try {
		pageUrl = new URL(url);
	} catch {
		sendResponse({ success: false, error: 'Invalid URL' });
		return;
	}
	if (!/^https?:$/i.test(pageUrl.protocol) || !IMAGE_PAGE_HOSTS.has(pageUrl.hostname.toLowerCase())) {
		sendResponse({ success: false, error: 'Unsupported image host' });
		return;
	}
	if (imagePageCache.has(pageUrl.href)) {
		sendResponse({ success: true, imageUrl: imagePageCache.get(pageUrl.href) });
		return;
	}

	BROWSER_API.permissions.contains({ origins: IMAGE_PAGE_ORIGINS }, (granted) => {
		if (!granted) {
			sendResponse({ success: false, missingPermission: true });
			return;
		}

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 10000);
		resolveImagePageImage(pageUrl, controller.signal)
			.then((imageUrl) => {
				if (!imageUrl) {
					sendResponse({ success: false, error: 'No preview image found' });
					return;
				}
				if (imagePageCache.size >= 100) imagePageCache.delete(imagePageCache.keys().next().value);
				imagePageCache.set(pageUrl.href, imageUrl);
				sendResponse({ success: true, imageUrl });
			})
			.catch((error) => {
				console.debug(`${timestamp()} - resolveImagePage: ${pageUrl.href}: ${error.message || error}`);
				sendResponse({ success: false, error: error.name === 'AbortError' ? 'Timed out fetching the page' : error.message || 'Could not fetch the page' });
			})
			.finally(() => clearTimeout(timeout));
	});
}

async function resolveImagePageImage(pageUrl, signal) {
	// imgur albums: the download redirect names the first image, and it usually
	// answers while the album page itself is rate-limited.
	const imgurImage = await resolveImgurAlbumZip(pageUrl, signal);
	if (imgurImage) return imgurImage;

	return fetchImagePage(imagePageCandidates(pageUrl), signal);
}

async function resolveImgurAlbumZip(pageUrl, signal) {
	const host = pageUrl.hostname.replace(/^www\./i, '').toLowerCase();
	if (host !== 'imgur.com') return null;
	const match = pageUrl.pathname.match(/^\/(?:a|gallery)\/([A-Za-z0-9]+)/i);
	if (!match) return null;

	try {
		// HEAD keeps the redirect chain without downloading the album archive.
		// The final URL is /download/<first image id>/ even when the download
		// itself is refused.
		const response = await fetch(`https://imgur.com/a/${match[1]}/zip`, {
			method: 'HEAD',
			credentials: 'omit',
			redirect: 'follow',
			signal,
		});
		const imageId = response.url.match(/\/download\/([A-Za-z0-9]+)/i)?.[1];
		return imageId ? `https://i.imgur.com/${imageId}.jpg` : null;
	} catch (error) {
		if (error.name === 'AbortError') throw error;
		console.debug(`${timestamp()} - resolveImagePage: imgur zip: ${error.message || error}`);
		return null;
	}
}

// imgur serves its app shell (with the OG image meta tags) from an album URL
// with a ".json" suffix, and that route often answers while the normal page is
// rate-limited. Gallery URLs use the same album id.
function imagePageCandidates(pageUrl) {
	const candidates = [pageUrl.href];
	const host = pageUrl.hostname.replace(/^www\./i, '').toLowerCase();

	if (host === 'imgur.com') {
		const match = pageUrl.pathname.match(/^\/(?:a|gallery)\/([A-Za-z0-9]+)/i);
		if (match) {
			const jsonUrl = `https://imgur.com/a/${match[1]}.json`;
			if (!candidates.includes(jsonUrl)) candidates.push(jsonUrl);
		}
	}
	return candidates;
}

async function fetchImagePage(candidates, signal) {
	for (const candidate of candidates) {
		try {
			const response = await fetch(candidate, { credentials: 'omit', redirect: 'follow', signal });
			if (!response.ok) continue;
			const html = (await response.text()).slice(0, 1000000);
			const imageUrl = extractImagePageImage(html, candidate);
			if (imageUrl) return imageUrl;
		} catch (error) {
			if (error.name === 'AbortError') throw error;
			console.debug(`${timestamp()} - resolveImagePage: ${candidate}: ${error.message || error}`);
		}
	}
	return null;
}

function extractImagePageImage(html, baseUrl) {
	const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
	let twitterImage = null;

	for (const tag of metaTags) {
		const key = tag.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
		if (key !== 'og:image' && key !== 'og:image:secure_url' && key !== 'twitter:image') continue;

		const content = tag.match(/content\s*=\s*["']([^"']+)["']/i)?.[1];
		if (!content) continue;

		const imageUrl = toAbsoluteImageUrl(decodeHtmlEntities(content), baseUrl);
		if (!imageUrl) continue;
		// Empty/deleted Imgur pages fall back to the generic logo; don't use it.
		if (/^https:\/\/s\.imgur\.com\/images\/logo/i.test(imageUrl)) continue;
		if (key === 'twitter:image') {
			if (!twitterImage) twitterImage = imageUrl;
		} else {
			return imageUrl;
		}
	}
	return twitterImage;
}

function toAbsoluteImageUrl(value, baseUrl) {
	try {
		const imageUrl = new URL(value, baseUrl);
		if (imageUrl.protocol === 'http:' && baseUrl.startsWith('https:')) imageUrl.protocol = 'https:';
		if (imageUrl.protocol !== 'http:' && imageUrl.protocol !== 'https:') return null;
		return imageUrl.href;
	} catch {
		return null;
	}
}

function decodeHtmlEntities(value) {
	return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x2F;/gi, '/').replace(/&#47;/g, '/').replace(/&#x3A;/gi, ':').replace(/&#58;/g, ':');
}

/* ===== Rules ===== */

// ===== Race Condition Prevention =====
// A global promise queue that serialises all ruleset updates.
// Without this, concurrent calls to enableJustOpenTheImage(), disableJustOpenTheImage(), and
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

/**
 * Disables the image_ruleset.
 * Uses the queue to ensure atomic read-modify-write and prevent race conditions.
 */
function disableJustOpenTheImage() {
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
function enableJustOpenTheImage() {
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
 * Updates the redirect ruleset based on user preference (old/latest/old_www).
 * Uses the queue to ensure atomic read-modify-write and prevent race conditions.
 * Preserves the image_ruleset state if it was previously enabled/disabled.
 * @param {string} version - 'old', 'latest', 'old_www', 'off', or legacy 'newnew'
 */
function updateRedirectRuleset(version) {
	return queueRulesetUpdate(async () => {
		const { enableRulesetIds: currentEnable = [], disableRulesetIds: currentDisable = [] } = await BROWSER_API.storage.sync.get(['enableRulesetIds', 'disableRulesetIds']);

		const normalisedVersion = version === 'newnew' ? 'latest' : version;

		let newEnable, newDisable;

		switch (normalisedVersion) {
			case 'old':
				console.log(`${timestamp()} - Switching to Old redirect ruleset`);
				newEnable = ['rv1_ruleset'];
				newDisable = ['rv3_ruleset', 'rv1_www_ruleset'];
				break;
			case 'latest':
				console.log(`${timestamp()} - Switching to Latest redirect ruleset`);
				newEnable = ['rv3_ruleset'];
				newDisable = ['rv1_ruleset', 'rv1_www_ruleset'];
				break;
			case 'old_www':
				console.log(`${timestamp()} - Switching to Old (www only) redirect ruleset`);
				newEnable = ['rv1_www_ruleset'];
				newDisable = ['rv1_ruleset', 'rv3_ruleset'];
				break;
			default:
				console.log(`${timestamp()} - Removed all redirect rulesets`);
				newEnable = [];
				newDisable = ['rv1_ruleset', 'rv3_ruleset', 'rv1_www_ruleset'];
		}

		if (currentEnable.includes('image_ruleset') && !newEnable.includes('image_ruleset')) {
			newEnable.push('image_ruleset');
		}
		if (currentDisable.includes('image_ruleset') && !newDisable.includes('image_ruleset')) {
			newDisable.push('image_ruleset');
		}

		await BROWSER_API.storage.sync.set({ enableRulesetIds: newEnable, disableRulesetIds: newDisable });
		await BROWSER_API.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: newEnable,
			disableRulesetIds: newDisable,
		});
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
