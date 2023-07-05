// Show Scroll To Top Bottom
let showAllButton = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		var container = document.querySelector('#re-header-buttons');
		if (value == true) {
			if (document.querySelector('.re-all-button')) {
				document.querySelector('.re-all-button').style.display = '';
			} else {
				const styles = document.querySelector('#re-header-buttons [href="/r/popular/"]').classList;
				const a = document.createElement('a');
				a.setAttribute('href', '/r/all/');
				a.setAttribute('class', styles);
				a.classList.remove('re-popular-button', 're-hide');
				a.classList.add('re-all-button');
				a.setAttribute('aria-label', 'All');
				a.setAttribute('title', 'All');
				const i = document.createElement('i');
				i.setAttribute('class', 'icon icon-all');
				a.appendChild(i);
				container.insertBefore(a, container.querySelector('[href="/r/popular/"]').nextSibling);
			}
		} else if (value == false) {
			if (document.querySelector('.re-all-button')) {
				document.querySelector('.re-all-button').style.display = 'none';
			}
		}
	}
};
export { showAllButton };
