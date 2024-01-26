// Show Scroll To Top Bottom

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
			if (document.querySelector('header [data-part="chat"]')) {
				const btn = document.querySelector('header [data-part="chat"]').cloneNode(true);
				btn.setAttribute('data-part', 'top');
				btn.classList.add('re-to-top-button');
				btn.querySelector('faceplate-tooltip a').href = '';
				btn.querySelector('faceplate-tooltip a').target = '';
				btn.querySelector('faceplate-tooltip a span').innerHTML =
					'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>';
				btn.querySelector('faceplate-tooltip > span').textContent = 'Top';
				btn.querySelector('faceplate-screen-reader-content').textContent = 'Scroll To Top';
				btn.addEventListener('click', function (e) {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				});
				const ad_btn = document.querySelector('[data-part="advertise"]');
				ad_btn.parentElement.prepend(ad_btn, btn);
			}
		}
	}, 2000);
}
