/* ===== Inputs / Accessibility Tweaks ===== */

import { sendMessage } from '../send_message';

// Toggle - Underline Links
document.querySelector('#checkbox-underline-links').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-underline-links').checked;
	BROWSER_API.storage.sync.set({ underlineLinks: value });
	document.querySelector('.icon-underline-links').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ underlineLinks: value });
});

// Toggle - Bionic Reader - Posts
document.querySelector('#checkbox-bionic-reader-posts').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-bionic-reader-posts').checked;
	BROWSER_API.storage.sync.set({ bionicReaderPosts: value });
	const icon = document.querySelector('.icon-bionic-reader-posts');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-book' : 'icon-book-open', value ? 'icon-book-open' : 'icon-book');
	sendMessage({ bionicReaderPosts: value });
});

// Toggle - Bionic Reader - Comments
document.querySelector('#checkbox-bionic-reader-comments').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-bionic-reader-comments').checked;
	BROWSER_API.storage.sync.set({ bionicReaderComments: value });
	const icon = document.querySelector('.icon-bionic-reader-comments');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-book' : 'icon-book-open', value ? 'icon-book-open' : 'icon-book');
	sendMessage({ bionicReaderComments: value });
});

// Toggle - Bionic Font Colour
document.querySelector('#checkbox-bionic-font-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-bionic-font-colour').checked;
	BROWSER_API.storage.sync.set({ bionicReaderFontColour: value });
	document.querySelector('.icon-bionic-font-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ bionicReaderFontColour: value });
});

// Input - Bionic Font Colour CSS
document.querySelector('#input-bionic-font-colour-css').addEventListener('keyup', (e) => {
	const css = e.currentTarget.value;
	BROWSER_API.storage.sync.set({ bionicReaderFontColourCSS: css });
	sendMessage({ bionicReaderFontColourCSS: css });
});

// Toggle - Bionic Background Colour
document.querySelector('#checkbox-bionic-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-bionic-bg-colour').checked;
	BROWSER_API.storage.sync.set({ bionicReaderBgColour: value });
	document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ bionicReaderBgColour: value });
});

// Input - Bionic Background Colour CSS
document.querySelector('#input-bionic-bg-colour-css').addEventListener('keyup', (e) => {
	const css = e.currentTarget.value;
	BROWSER_API.storage.sync.set({ bionicReaderBgColourCSS: css });
	sendMessage({ bionicReaderBgColourCSS: css });
});
