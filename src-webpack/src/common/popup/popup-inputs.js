/* ===== Popup / Inputs ===== */

import { export_backup } from './backup_config';

import './inputs/version_select';
import './inputs/language_select';
import './inputs/search_filter';
import './inputs/menu';
//import './inputs/inputs_accessibility';
import './inputs/inputs_background';
import './inputs/inputs_dark_mode';
import './inputs/inputs_expand_layout';
import './inputs/inputs_hide_elements';
import './inputs/inputs_style';
import './inputs/inputs_productivity';

// Button - Export Backup
document.querySelector('#btn-export-backup').addEventListener('click', function (e) {
	export_backup();
});

// Button - Import Backup
document.querySelector('#btn-import-backup').addEventListener('click', function (e) {
	BROWSER_API.runtime.sendMessage({ importBackupFile: true });
});

// Button - Version Changelog
document.querySelector('#extensionVersion').addEventListener('click', function (e) {
	const changelogPage = document.querySelector('#changelog');
	if (changelogPage.style.display === 'none') {
		changelogPage.style.display = 'flex';
	} else {
		changelogPage.style.display = 'none';
	}
	// Get changelog.txt
	const changelogFile = BROWSER_API.runtime.getURL('changelog.txt');
	// Fetch the file contents
	fetch(changelogFile, {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then((textContent) => {
			document.querySelector('#changelog span').innerText = textContent;
		})
		.catch((error) => {
			console.error('Error fetching the file:', error);
		});
});
