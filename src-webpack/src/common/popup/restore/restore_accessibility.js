// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Accessibility
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { validateColour } from './validation';

// Restore UI settings for "Accessibility" options.

export function restorePopupAccessibilityOptions() {
	// Underline Links
	BROWSER_API.storage.sync.get(['underlineLinks'], function (result) {
		const checked = result.underlineLinks === true;
		document.querySelector('#checkbox-underline-links').checked = checked;
		document.querySelector('.icon-underline-links').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('accessibility');
		console.log('Underline Links: ' + checked);
	});

	// Bionic Reader - Comments
	BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
		const checked = result.bionicReaderComments === true;
		document.querySelector('#checkbox-bionic-reader-comments').checked = checked;
		const icon = document.querySelector('.icon-bionic-reader-comments');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-book' : 'icon-book-open', checked ? 'icon-book-open' : 'icon-book');
		if (checked) highlightMenuIcon('accessibility');
		console.log('Bionic Reader Comments: ' + checked);
	});

	// Bionic Reader - Posts
	BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
		const checked = result.bionicReaderPosts === true;
		document.querySelector('#checkbox-bionic-reader-posts').checked = checked;
		const icon = document.querySelector('.icon-bionic-reader-posts');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-book' : 'icon-book-open', checked ? 'icon-book-open' : 'icon-book');
		if (checked) highlightMenuIcon('accessibility');
		console.log('Bionic Reader Posts: ' + checked);
	});

	// Bionic Font Colour
	BROWSER_API.storage.sync.get(['bionicReaderFontColour'], function (result) {
		const checked = result.bionicReaderFontColour === true;
		document.querySelector('#checkbox-bionic-font-colour').checked = checked;
		document.querySelector('.icon-bionic-font-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('accessibility');
		console.log('Bionic Font Colour: ' + checked);
	});

	// Bionic Font Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderFontColourCSS'], function (result) {
		const raw = result.bionicReaderFontColourCSS ?? '';
		const value = validateColour(raw);
		document.querySelector('#input-bionic-font-colour-css').value = value;
		console.log('Bionic Font Colour CSS: ' + value);
	});

	// Bionic Background Colour
	BROWSER_API.storage.sync.get(['bionicReaderBgColour'], function (result) {
		const checked = result.bionicReaderBgColour === true;
		document.querySelector('#checkbox-bionic-bg-colour').checked = checked;
		document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('accessibility');
		console.log('Bionic Background Colour: ' + checked);
	});

	// Bionic Background Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderBgColourCSS'], function (result) {
		const raw = result.bionicReaderBgColourCSS ?? '';
		const value = validateColour(raw);
		document.querySelector('#input-bionic-bg-colour-css').value = value;
		console.log('Bionic Background Colour CSS: ' + value);
	});
}
