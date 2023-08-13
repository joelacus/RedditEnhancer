// Input - Language Select

import { init_i18n } from '../popup-internationalisation';

const lang_dropdown = document.querySelector('#select-lang');
const lang_dropdownMenu = document.querySelector('#select-lang-menu');
document.querySelector('#select-lang .select').addEventListener('click', function () {
	if (lang_dropdown.classList.contains('active')) {
		lang_dropdown.classList.remove('active');
		lang_dropdownMenu.style.maxHeight = '0';
	} else {
		lang_dropdown.classList.add('active');
		lang_dropdownMenu.style.maxHeight = lang_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!lang_dropdown.contains(event.target)) {
		lang_dropdown.classList.remove('active');
		lang_dropdownMenu.style.maxHeight = '0';
	}
});
lang_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	if (btn === 'li') {
		var lang = event.target.id;
	}
	if (btn === 'span') {
		var lang = event.target.parentNode.id;
	}
	document.querySelector('#select-lang .select').querySelector('span').textContent = event.target.textContent;
	lang_dropdown.classList.remove('active');
	lang_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ language: lang });
	init_i18n(lang);
});
