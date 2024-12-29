/* ===== Restore Popup UI / Accessibility ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Accessibility" options.

export function restorePopupAccessibilityOptions() {
	// Underline Links
	BROWSER_API.storage.sync.get(['underlineLinks'], function (result) {
		if (result.underlineLinks === true) {
			document.querySelector('.icon-underline-links').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-underline-links').checked = true;
			highlightMenuIcon('accessibility');
			var value = true;
		} else if (typeof result.underlineLinks == 'undefined' || result.underlineLinks === false) {
			document.querySelector('#checkbox-underline-links').checked = false;
			var value = false;
		}
		console.log('Underline Links: ' + value);
	});

	// Bionic Reader - Comments
	BROWSER_API.storage.sync.get(['bionicReaderComments'], function (result) {
		if (result.bionicReaderComments == true) {
			document.querySelector('.icon-bionic-reader-comments').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-bionic-reader-comments').classList.remove('icon-book');
			document.querySelector('.icon-bionic-reader-comments').classList.add('icon-book-open');
			document.querySelector('#checkbox-bionic-reader-comments').checked = true;
			highlightMenuIcon('accessibility');
			var value = true;
		} else if (typeof result.bionicReaderComments == 'undefined' || result.bionicReaderComments == false) {
			document.querySelector('#checkbox-bionic-reader-comments').checked = false;
			var value = false;
		}
		console.log('Bionic Reader Comments: ' + value);
	});

	// Bionic Reader - Posts
	BROWSER_API.storage.sync.get(['bionicReaderPosts'], function (result) {
		if (result.bionicReaderPosts == true) {
			document.querySelector('.icon-bionic-reader-posts').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-bionic-reader-posts').classList.remove('icon-book');
			document.querySelector('.icon-bionic-reader-posts').classList.add('icon-book-open');
			document.querySelector('#checkbox-bionic-reader-posts').checked = true;
			highlightMenuIcon('accessibility');
			var value = true;
		} else if (typeof result.bionicReaderPosts == 'undefined' || result.bionicReaderPosts == false) {
			document.querySelector('#checkbox-bionic-reader-posts').checked = false;
			var value = false;
		}
		console.log('Bionic Reader Posts: ' + value);
	});

	// Bionic Font Colour
	BROWSER_API.storage.sync.get(['bionicReaderFontColour'], function (result) {
		if (result.bionicReaderFontColour == true) {
			document.querySelector('.icon-bionic-font-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-bionic-font-colour').checked = true;
			highlightMenuIcon('accessibility');
			var value = true;
		} else if (typeof result.bionicReaderFontColour == 'undefined' || result.bionicReaderFontColour == false) {
			document.querySelector('#checkbox-bionic-font-colour').checked = false;
			var value = false;
		}
		console.log('Bionic Font Colour: ' + value);
	});

	// Bionic Font Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderFontColourCSS'], function (result) {
		if (typeof result.bionicReaderFontColourCSS != 'undefined') {
			document.querySelector('#input-bionic-font-colour-css').value = result.bionicReaderFontColourCSS;
			var value = result.bionicReaderFontColourCSS;
		} else {
			document.querySelector('#input-bionic-font-colour-css').value = '';
			var value = '';
		}
		console.log('Bionic Font Colour CSS: ' + value);
	});

	// Bionic Background Colour
	BROWSER_API.storage.sync.get(['bionicReaderBgColour'], function (result) {
		if (result.bionicReaderBgColour == true) {
			document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-bionic-bg-colour').checked = true;
			highlightMenuIcon('accessibility');
			var value = true;
		} else if (typeof result.bionicReaderBgColour == 'undefined' || result.bionicReaderBgColour == false) {
			document.querySelector('#checkbox-bionic-bg-colour').checked = false;
			var value = false;
		}
		console.log('Bionic Background Colour: ' + value);
	});

	// Bionic Background Colour CSS
	BROWSER_API.storage.sync.get(['bionicReaderBgColourCSS'], function (result) {
		if (typeof result.bionicReaderBgColourCSS != 'undefined') {
			document.querySelector('#input-bionic-bg-colour-css').value = result.bionicReaderBgColourCSS;
			var value = result.bionicReaderBgColourCSS;
		} else {
			document.querySelector('#input-bionic-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Bionic Background Colour CSS: ' + value);
	});
}
