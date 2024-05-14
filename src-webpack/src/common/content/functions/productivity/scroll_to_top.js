/* ===== Tweaks - Productivity - Show Scroll To Top Bottom ===== */

/* === Triggered On Page Load === */
export function loadShowToTopButton() {
	BROWSER_API.storage.sync.get(['showToTopButton'], function (result) {
		showToTopButton(result.showToTopButton);
	});
}

/* === Main Function === */
export function showToTopButton(value) {
	if (redditVersion === 'old' && value === true) {
		enableShowToTopButtonOld();
	} else if (redditVersion === 'new' && value === true) {
		enableShowToTopButtonNew();
	} else if (redditVersion === 'newnew' && value === true) {
		enableShowToTopButtonNewNew();
	} else if (value === false) {
		if (document.querySelector('.re-to-top-button')) document.querySelector('.re-to-top-button').remove();
	}
}

// Function - Enable Show To Top Button - Old
function enableShowToTopButtonOld() {
	if (document.querySelector('.re-to-top-button')) {
		document.querySelector('.re-to-top-button').remove();
		enableShowToTopButtonOld();
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

// Function - Enable Show To Top Button - New
function enableShowToTopButtonNew() {
	if (document.querySelector('.re-to-top-button')) {
		document.querySelector('.re-to-top-button').remove();
		enableShowToTopButtonNew();
	} else {
		if (useLegacy) {
			const styles = document.querySelector('#re-header-buttons [href="/r/popular/"]').classList;
			const div = document.createElement('div');
			div.setAttribute('class', styles);
			div.classList.remove('re-popular-button', 're-hide');
			div.classList.add('re-to-top-button');
			div.setAttribute('aria-label', 'To Top');
			div.setAttribute('title', 'To Top');
			const i = document.createElement('i');
			i.setAttribute('class', 'icon icon-up');
			div.appendChild(i);
			const container = document.querySelector('#re-header-buttons');
			container.prepend(div, container.firstChild);
		} else {
			const styles = document.querySelector('#change-username-tooltip-id span:has(.icon-add)').classList;
			const div = document.createElement('div');
			div.setAttribute('class', styles);
			div.classList.remove('re-hide');
			div.classList.add('re-to-top-button');
			div.setAttribute('aria-label', 'To Top');
			div.setAttribute('title', 'To Top');
			const i = document.createElement('i');
			i.setAttribute('class', 'icon icon-up');
			div.appendChild(i);
			const container = document.querySelector('#change-username-tooltip-id');
			container.prepend(div, container.firstChild);
		}
	}
	// Scroll To Top button listener
	document.querySelector('.re-to-top-button').addEventListener('click', function (e) {
		const postOverlay = document.querySelector('#overlayScrollContainer');
		if (postOverlay) {
			postOverlay.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	});
}

// Function - Enable Show To Top Button - New New
function enableShowToTopButtonNewNew() {
	setTimeout(() => {
		if (document.querySelector('.re-to-top-button')) {
			document.querySelector('.re-to-top-button').remove();
			enableShowToTopButtonNewNew();
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
				btn.querySelector('span:has(>svg)').innerHTML =
					'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>';
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
