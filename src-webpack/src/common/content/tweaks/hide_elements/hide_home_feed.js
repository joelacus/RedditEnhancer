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
	if (value === true) {
		if (redditVersion === 'newnew') {
			enableHideHomeFeedNewNew();
		} else if (redditVersion === 'old') {
			enableHideHomeFeedOld();
		} else if (redditVersion === 'new') {
			if (path === '/' || path === '/r/all/' || path === '/r/popular/') {
				enableHideHomeFeedNew();
			} else {
				disableHideHomeFeedAll();
			}
		}
	} else {
		disableHideHomeFeedAll();
	}
}

/* === Enable/Disable Functions === */

const hiddenIcon = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>')`;

// Function - Enable Hide Home Feed - Old
function enableHideHomeFeedOld() {
	if (!document.head.querySelector('style[id="re-hide-home-feed"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-home-feed';
		/*
			.listing-page: targets all pages with listings (home, all, popular, topic, custom feeds, moderator pages)
			.with-listing-chooser: targets pages with the custom feed selector (excluding subreddits)
			:not(.multi-page): not targeting custom feeds => home, all, popular, topic
		 */
		styleElement.textContent = `.listing-page.with-listing-chooser:not(.multi-page) div.content[role="main"] {
										visibility: hidden;
									}
									.listing-page.with-listing-chooser:not(.multi-page) div.content[role="main"]::before {
										content: "Hide Home Feed is enabled.";
										visibility: visible;
										display: block;
										color: #aaa;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

function enableHideHomeFeedNew() {
	if (!document.head.querySelector('style[id="re-hide-home-feed"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-home-feed';
		styleElement.textContent = `.ListingLayout-outerContainer {
										visibility: hidden;
									}
									div#AppRouter-main-content::before {
										visibility: visible;
										display: block;
										margin: 2rem auto;
										content: ${hiddenIcon};
										width: 64px;
									}
									.theme-light div#AppRouter-main-content::before {
										filter: invert(.9);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide Home Feed - New New
function enableHideHomeFeedNewNew() {
	if (!document.head.querySelector('style[id="re-hide-home-feed"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-home-feed';
		styleElement.textContent = `shreddit-app[routename="frontpage"] main.main, 
									shreddit-app[routename="all"] main.main,
									shreddit-app[routename="popular"] main.main,
									shreddit-app[routename="topic"] main.main {
										visibility: hidden;
									}
									shreddit-app[routename="frontpage"] shreddit-feed, 
									shreddit-app[routename="all"] shreddit-feed,
									shreddit-app[routename="popular"] shreddit-feed,
									shreddit-app[routename="topic"] shreddit-feed,
									shreddit-app[routename="popular"] shreddit-gallery-carousel {
										display: none;
									}
									[routename="frontpage"] main.main::before, 
									[routename="all"] main.main::before,
									[routename="popular"] main.main::before,
									[routename="topic"] main.main::before {
										visibility: visible;
										display: block;
										margin: 2rem auto;
										content: ${hiddenIcon};
										width: 64px;
									}
									.theme-light [routename="frontpage"] main.main::before, 
									.theme-light [routename="all"] main.main::before,
									.theme-light [routename="popular"] main.main::before,
									.theme-light [routename="topic"] main.main::before {
										filter: invert(.9);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Hide Home Feed - All
function disableHideHomeFeedAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-home-feed"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	const hiddenIcon = document.querySelector('#re-home-feed-hidden-icon');
	if (hiddenIcon) {
		hiddenIcon.remove();
	}
}
