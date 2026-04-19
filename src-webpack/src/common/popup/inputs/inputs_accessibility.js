// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Accessibility Tweaks
// ────────────────────────────────────────────────────────────────────────────

import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';

// Toggle - Underline Links
document.querySelector('#checkbox-underline-links').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ underlineLinks: this.checked });
	sendMessage({ underlineLinks: this.checked });
	document.querySelector('.icon-underline-links').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Bionic Reader - Posts
document.querySelector('#checkbox-bionic-reader-posts').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ bionicReaderPosts: this.checked });
	sendMessage({ bionicReaderPosts: this.checked });
	const icon = document.querySelector('.icon-bionic-reader-posts');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-book' : 'icon-book-open', this.checked ? 'icon-book-open' : 'icon-book');
});

// Toggle - Bionic Reader - Comments
document.querySelector('#checkbox-bionic-reader-comments').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ bionicReaderComments: this.checked });
	sendMessage({ bionicReaderComments: this.checked });
	const icon = document.querySelector('.icon-bionic-reader-comments');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-book' : 'icon-book-open', this.checked ? 'icon-book-open' : 'icon-book');
});

// Toggle - Bionic Font Colour
document.querySelector('#checkbox-bionic-font-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ bionicReaderFontColour: this.checked });
	sendMessage({ bionicReaderFontColour: this.checked });
	document.querySelector('.icon-bionic-font-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Bionic Font Colour CSS
const saveBionicFontColour = debounce(function (value) {
	BROWSER_API.storage.sync.set({ bionicReaderFontColourCSS: value });
}, 500);
document.querySelector('#input-bionic-font-colour-css').addEventListener('input', function () {
	const value = this.value;
	sendMessage({ bionicReaderFontColourCSS: value });
	saveBionicFontColour(value);
});

// Toggle - Bionic Background Colour
document.querySelector('#checkbox-bionic-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ bionicReaderBgColour: this.checked });
	sendMessage({ bionicReaderBgColour: this.checked });
	document.querySelector('.icon-bionic-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Bionic Background Colour CSS
const saveBionicBgColour = debounce(function (value) {
	BROWSER_API.storage.sync.set({ bionicReaderBgColourCSS: value });
}, 500);
document.querySelector('#input-bionic-bg-colour-css').addEventListener('input', function () {
	const value = this.value;
	sendMessage({ bionicReaderBgColourCSS: value });
	saveBionicBgColour(value);
});
