/**
 * Tweaks: Hide Elements - Hide Home Feed
 *
 * @name hideHomeFeed
 * @description Hide home feed to prevent distraction.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideHomeFeed() {
	BROWSER_API.storage.sync.get(['hideHomeFeed'], function (result) {
		if (result.hideHomeFeed) hideHomeFeed(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideHomeFeed(value) {
	const path = window.location.pathname;
	const regex = /^\/(r\/(all|popular)\/)?$/;
	if (value && (redditVersion === 'newnew' || redditVersion === 'old')) {
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
