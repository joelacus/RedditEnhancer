/* ===== Tweaks - Hide - Home Feed ===== */

/* === Triggered On Page Load === */
export function loadHideHomeFeed() {
	BROWSER_API.storage.sync.get(['hideHomeFeed'], function (result) {
		if (result.hideHomeFeed) hideHomeFeed(true);
	});
}

/* === Main Function === */
export function hideHomeFeed(value) {
	const path = window.location.pathname;
	const regex = /^\/(r\/(all|popular)\/)?$/;
	if (value && (redditVersion === 'newnew' || redditVersion === 'old' || (redditVersion === 'new' && regex.test(path)))) {
		document.documentElement.classList.add('re-hide-home-feed');
		if (!sessionStorage.getItem('re-hide-home-feed-banner')) {
			document.documentElement.setAttribute('banner', '');
			sessionStorage.setItem('re-hide-home-feed-banner', true);
		}
	} else {
		document.documentElement.classList.remove('re-hide-home-feed');
		document.documentElement.removeAttribute('banner');
		sessionStorage.removeItem('re-hide-home-feed-banner');
	}
}