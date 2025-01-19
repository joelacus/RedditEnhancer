/* ===== Popup / Functions / Check For Updates ===== */

import i18next from 'i18next';
import { generateChangelogHTML } from './show_changelog';
const semver = require('semver');

// Check For Latest Extension Version
export async function fetchLatestVersion() {
	const fetchURL = 'https://raw.githubusercontent.com/joelacus/RedditEnhancer/refs/heads/main/changelog.txt';
	return new Promise((resolve, reject) => {
		BROWSER_API.runtime.sendMessage(
			{
				actions: [{ action: 'changeFetchUrl', newFetchUrl: fetchURL }, { action: 'fetchData' }],
			},
			function (response) {
				if (response) {
					setTimeout(() => {
						const latestVersion = response.data.split('\n')[0].split(' ')[1];
						const installedVersion = i18next.t('extensionVersion.message');
						console.log('Installed Version: ' + installedVersion + ' Latest Version: ' + latestVersion);
						if (semver.gt(latestVersion, installedVersion)) {
							// Display update notification
							document.querySelector('#new-update').classList.remove('hidden');
							const message = document.querySelector('#new-update-message').innerText;
							const messageWithVersion = message.replace('<version>', latestVersion);
							document.querySelector('#new-update-message').innerText = messageWithVersion;
							document.querySelector('#new-update-message').classList.remove('hidden');
							// Generate changelog HTML
							const html = generateChangelogHTML(response.data);
							// Append changelog HTML to the extension popup/options page.
							if (document.querySelector('#changelog .log > div')) {
								document.querySelector('#changelog .log > div').remove();
							}
							document.querySelector('#changelog .log').append(html);
						}
					}, 3000);
				}
			}
		);
	});
}
