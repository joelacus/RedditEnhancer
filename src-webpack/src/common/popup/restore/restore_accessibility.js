/* ===== Restore Popup UI / Accessibility ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Accessibility" options.

export function restorePopupAccessibilityOptions() {
	// Underline Links
	BROWSER_API.storage.sync.get(['underlineLinks'], function (result) {
		const value = result.underlineLinks === true;
		document.querySelector('#checkbox-underline-links').checked = value;
		document.querySelector('.icon-underline-links').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('accessibility');
		console.log('Underline Links: ' + value);
	});

	// Bionic Reader - Comments
	BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
		const value = result.bionicReaderComments === true;
		document.querySelector('#checkbox-bionic-reader-comments').checked = value;
		const icon = document.querySelector('.icon-bionic-reader-comments');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-book' : 'icon-book-open', value ? 'icon-book-open' : 'icon-book');
		if (value) highlightMenuIcon('accessibility');
		console.log('Bionic Reader Comments: ' + value);
	});

	// Bionic Reader - Posts
	BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
		const value = result.bionicReaderPosts === true;
		document.querySelector('#checkbox-bionic-reader-posts').checked = value;
		const icon = document.querySelector('.icon-bionic-reader-posts');
		icon.style.backgroundColor = value ? 'var(--accent)' : '';
		icon.classList.replace(value ? 'icon-book' : 'icon-book-open', value ? 'icon-book-open' : 'icon-book');
		if (value) highlightMenuIcon('accessibility');
		console.log('Bionic Reader Posts: ' + value);
	});

	// Bionic Font Colour
	BROWSER_API.storage.sync.get(['bionicReaderFontColour'], function (result) {
		const value = result.bionicReaderFontColour === true;
		document.querySelector('#checkbox-bionic-font-colour').checked = value;
		document.querySelector('.icon-bionic-font-colour').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('accessibility');
		console.log('Bionic Font Colour: ' + value);
	});

	// Bionic Font Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderFontColourCSS'], function (result) {
		const value = result.bionicReaderFontColourCSS ?? '';
		document.querySelector('#input-bionic-font-colour-css').value = value;
		console.log('Bionic Font Colour CSS: ' + value);
	});

	// Bionic Background Colour
	BROWSER_API.storage.sync.get(['bionicReaderBgColour'], function (result) {
		const value = result.bionicReaderBgColour === true;
		document.querySelector('#checkbox-bionic-bg-colour').checked = value;
		document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = value ? 'var(--accent)' : '';
		if (value) highlightMenuIcon('accessibility');
		console.log('Bionic Background Colour: ' + value);
	});

	// Bionic Background Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderBgColourCSS'], function (result) {
		const value = result.bionicReaderBgColourCSS ?? '';
		document.querySelector('#input-bionic-bg-colour-css').value = value;
		console.log('Bionic Background Colour CSS: ' + value);
	});
}
