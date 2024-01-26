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
document.addEventListener('click', function (e) {
	if (!lang_dropdown.contains(e.target)) {
		lang_dropdown.classList.remove('active');
		lang_dropdownMenu.style.maxHeight = '0';
	}
});
lang_dropdownMenu.addEventListener('click', function (e) {
	const btn = e.target.tagName.toLowerCase();
	let lang = '';
	if (btn === 'li') {
		lang = e.target.id;
		var text = e.target.textContent;
	}
	if (btn === 'span') {
		lang = e.target.parentNode.id;
		var text = e.target.textContent;
	}
	if (btn === 'div') {
		lang = e.target.parentNode.id;
		var text = e.target.nextElementSibling.textContent;
	}
	document.querySelector('#select-lang .select').querySelector('span').textContent = text;
	lang_dropdown.classList.remove('active');
	lang_dropdownMenu.style.maxHeight = '0';
	if (lang === 'en' && navigator.language === 'en-GB') {
		lang = 'en-GB';
	}
	BROWSER_API.storage.sync.set({ language: lang });
	init_i18n(lang);
});
