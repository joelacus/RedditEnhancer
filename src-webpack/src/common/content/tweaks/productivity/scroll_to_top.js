/**
 * Tweaks: Productivity - Show Scroll To Top
 *
 * @name showToTopButton
 * @description Add a button in the top/header bar to scroll the page to the top.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadShowToTopButton() {
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		if (result.showToTopButton) showToTopButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function showToTopButton(value) {
	if (redditVersion === 'newnew' && value) {
		enableShowToTopButtonRV3();
	} else if (redditVersion === 'old' && value) {
		enableShowToTopButtonRV1();
	} else {
		if (document.querySelector('.re-to-top-button')) document.querySelector('.re-to-top-button').remove();
	}
}

// Enable Show To Top Button - RV3
function enableShowToTopButtonRV3() {
	setTimeout(() => {
		if (document.querySelector('.re-to-top-button')) {
			document.querySelector('.re-to-top-button').remove();
			enableShowToTopButtonRV3();
		} else {
			let btn;
			if (document.querySelector('#header-action-item-chat-button')) {
				btn = document.querySelector('#header-action-item-chat-button').cloneNode(true);
			} else if (document.querySelector('header [data-part="inbox"] button')) {
				btn = document.querySelector('header [data-part="inbox"] button').cloneNode(true);
			} else {
				btn = document.createElement('div');
			}
			btn.classList.add('re-to-top-button');
			btn.id = 're-to-top-button';
			if (btn.querySelector('span:has(>svg)')) {
				btn.querySelector('span:has(>svg)').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>';
			} else {
				btn.textContent = 'Top';
			}
			btn.addEventListener('click', function (e) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
			const ad_btn = document.querySelector('[data-part="advertise"]');
			ad_btn.parentElement.prepend(ad_btn, btn);
		}
	}, 1000);
}

// Enable Show To Top Button - RV1
function enableShowToTopButtonRV1() {
	if (document.querySelector('.re-to-top-button')) {
		document.querySelector('.re-to-top-button').remove();
		enableShowToTopButtonRV1();
	} else {
		const div = document.createElement('div');
		div.classList.add('re-to-top-button');
		const span = document.createElement('span');
		span.textContent = 'Top';
		div.appendChild(span);
		const container = document.querySelector('#header-bottom-right');
		container.insertBefore(div, container.firstChild);
		// Scroll To Top button listener
		div.addEventListener('click', function (e) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}
}
