/* ===== Tweaks - Productivity - Show r/All Button In Header ===== */

/* === Triggered On Page Load === */
export function loadShowAllButton() {
	BROWSER_API.storage.sync.get(['showAllButton'], function (result) {
		if (result.showAllButton) showAllButton(true);
	});
}

/* === Main Function === */
export function showAllButton(value) {
	if (redditVersion === 'new' && value) {
		if (document.querySelector('.re-all-button')) {
			document.querySelector('.re-all-button').style.display = '';
		} else {
			if (document.querySelector('#change-username-tooltip-id span:has(.icon-chat)')) {
				const span_styles = document.querySelector('#change-username-tooltip-id span:has(.icon-chat)').classList;
				const span = document.createElement('span');
				span.setAttribute('class', span_styles);
				const a_styles = document.querySelector('#change-username-tooltip-id span:has(.icon-chat) a').classList;
				const a = document.createElement('a');
				a.setAttribute('class', a_styles);
				a.classList.remove('re-hide');
				a.classList.add('re-all-button');
				a.setAttribute('href', '/r/all/');
				a.setAttribute('aria-label', 'All');
				a.setAttribute('title', 'All');
				const i_styles = document.querySelector('#change-username-tooltip-id span:has(.icon-chat) i').classList;
				const i = document.createElement('i');
				i.setAttribute('class', i_styles);
				i.classList.remove('icon-chat');
				i.classList.add('icon-all');
				a.appendChild(i);
				span.appendChild(a);
				const container = document.querySelector('#change-username-tooltip-id');
				container.prepend(span, container.firstChild);
			}
		}
	} else {
		if (document.querySelector('.re-all-button')) {
			document.querySelector('.re-all-button').style.display = 'none';
		}
	}
}
