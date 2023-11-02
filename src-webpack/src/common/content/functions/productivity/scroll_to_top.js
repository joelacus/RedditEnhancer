// Show Scroll To Top Bottom
let showToTopButton = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		if (value == true) {
			if (document.querySelector('.re-to-top-button')) {
				document.querySelector('.re-to-top-button').style.display = '';
			} else {
				const container = document.querySelector('#header-bottom-right');
				const div = document.createElement('div');
				div.classList.add('re-to-top-button');
				const span = document.createElement('span');
				span.textContent = 'Top';
				div.appendChild(span);
				container.insertBefore(div, container.firstChild);
				// Scroll To Top button listener
				div.addEventListener('click', function (e) {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				});
			}
		} else if (value == false) {
			document.querySelector('.re-to-top-button').style.display = 'none';
		}
	} else {
		// new reddit
		var container = document.querySelector('#re-header-buttons');
		if (value == true) {
			if (document.querySelector('#re-header-buttons')) {
				if (document.querySelector('.re-to-top-button')) {
					document.querySelector('.re-to-top-button').style.display = '';
				} else {
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
					container.prepend(div, container.firstChild);
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
		} else if (value == false) {
			if (container) {
				document.querySelector('.re-to-top-button').style.display = 'none';
			}
		}
	}
};
export { showToTopButton };
