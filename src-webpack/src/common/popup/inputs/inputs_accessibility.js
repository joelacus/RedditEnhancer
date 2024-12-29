/* ===== Inputs / Accessibility Tweaks ===== */

import { sendMessage } from '../send_message';

// Toggle - Underline Links
document.querySelector('#checkbox-underline-links').addEventListener('change', function (e) {
	const underlineLinks = document.querySelector('#checkbox-underline-links').checked;
	if (underlineLinks == true) {
		BROWSER_API.storage.sync.set({ underlineLinks: true });
		document.querySelector('.icon-underline-links').style.backgroundColor = 'var(--accent)';
		sendMessage({ underlineLinks: true });
	} else if (underlineLinks == false) {
		BROWSER_API.storage.sync.set({ underlineLinks: false });
		document.querySelector('.icon-underline-links').style.backgroundColor = '';
		sendMessage({ underlineLinks: false });
	}
});

// Toggle - Bionic Reader - Posts
document.querySelector('#checkbox-bionic-reader-posts').addEventListener('change', function (e) {
	const bionicReaderPosts = document.querySelector('#checkbox-bionic-reader-posts').checked;
	if (bionicReaderPosts == true) {
		BROWSER_API.storage.sync.set({ bionicReaderPosts: true });
		document.querySelector('.icon-bionic-reader-posts').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-bionic-reader-posts').classList.remove('icon-book');
		document.querySelector('.icon-bionic-reader-posts').classList.add('icon-book-open');
		sendMessage({ bionicReaderPosts: true });
	} else if (bionicReaderPosts == false) {
		BROWSER_API.storage.sync.set({ bionicReaderPosts: false });
		document.querySelector('.icon-bionic-reader-posts').style.backgroundColor = '';
		document.querySelector('.icon-bionic-reader-posts').classList.remove('icon-book-open');
		document.querySelector('.icon-bionic-reader-posts').classList.add('icon-book');
		sendMessage({ bionicReaderPosts: false });
	}
});

// Toggle - Bionic Reader - Comments
document.querySelector('#checkbox-bionic-reader-comments').addEventListener('change', function (e) {
	const bionicReaderPosts = document.querySelector('#checkbox-bionic-reader-comments').checked;
	if (bionicReaderPosts == true) {
		BROWSER_API.storage.sync.set({ bionicReaderComments: true });
		document.querySelector('.icon-bionic-reader-comments').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-bionic-reader-comments').classList.remove('icon-book');
		document.querySelector('.icon-bionic-reader-comments').classList.add('icon-book-open');
		sendMessage({ bionicReaderComments: true });
	} else if (bionicReaderPosts == false) {
		BROWSER_API.storage.sync.set({ bionicReaderComments: false });
		document.querySelector('.icon-bionic-reader-comments').style.backgroundColor = '';
		document.querySelector('.icon-bionic-reader-comments').classList.remove('icon-book-open');
		document.querySelector('.icon-bionic-reader-comments').classList.add('icon-book');
		sendMessage({ bionicReaderComments: false });
	}
});

// Toggle - Bionic Font Colour
document.querySelector('#checkbox-bionic-font-colour').addEventListener('change', function (e) {
	const bionicReaderFontColour = document.querySelector('#checkbox-bionic-font-colour').checked;
	if (bionicReaderFontColour == true) {
		BROWSER_API.storage.sync.set({ bionicReaderFontColour: true });
		document.querySelector('.icon-bionic-font-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ bionicReaderFontColour: true });
	} else if (bionicReaderFontColour == false) {
		BROWSER_API.storage.sync.set({ bionicReaderFontColour: false });
		document.querySelector('.icon-bionic-font-colour').style.backgroundColor = '';
		sendMessage({ bionicReaderFontColour: false });
	}
});

// Input - Bionic Font Colour CSS
document.querySelector('#input-bionic-font-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-bionic-font-colour-css').value;
	BROWSER_API.storage.sync.set({ bionicReaderFontColourCSS: css });
	sendMessage({ bionicReaderFontColourCSS: css });
});

// Toggle - Bionic Background Colour
document.querySelector('#checkbox-bionic-bg-colour').addEventListener('change', function (e) {
	const bionicReaderBgColour = document.querySelector('#checkbox-bionic-bg-colour').checked;
	if (bionicReaderBgColour == true) {
		BROWSER_API.storage.sync.set({ bionicReaderBgColour: true });
		document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ bionicReaderBgColour: true });
	} else if (bionicReaderBgColour == false) {
		BROWSER_API.storage.sync.set({ bionicReaderBgColour: false });
		document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = '';
		sendMessage({ bionicReaderBgColour: false });
	}
});

// Input - Bionic Background Colour CSS
document.querySelector('#input-bionic-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-bionic-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ bionicReaderBgColourCSS: css });
	sendMessage({ bionicReaderBgColourCSS: css });
});
