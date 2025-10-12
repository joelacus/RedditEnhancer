/**
 * Tweaks: Hide Elements - Hide Side Menu Favourite Buttons
 *
 * @name hideSideMenuFavouriteButton
 * @description Hide the favourite (star) buttons in the community section of the side menu.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadHideSideMenuFavouriteButton() {
	BROWSER_API.storage.sync.get(['hideSideMenuFavouriteButton'], function (result) {
		if (result.hideSideMenuFavouriteButton) hideSideMenuFavouriteButton(true);
	});
}

/* === Enable/Disable The Feature === */
export function hideSideMenuFavouriteButton(value) {
	if (redditVersion === 'newnew' && value) {
		// create stylesheet
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-favourite-button';
		styleElement.textContent = `left-nav-community-item::part(star),
									left-nav-multireddit-item::part(star) {
										display: none;
									}
									left-nav-community-item:hover::part(star),
									left-nav-multireddit-item:hover::part(star) {
										display: flex;
									}`;
		// append stylesheet to first items
		if (!document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item style[id="re-hide-side-menu-favourite-button"]')) {
			document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item').append(styleElement);
		}
		if (!document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item style[id="re-hide-side-menu-favourite-button"]')) {
			document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item').append(styleElement.cloneNode(true));
		}
		if (!document.querySelector('left-nav-multireddits-controller').shadowRoot.querySelector('left-nav-multireddit-item style[id="re-hide-side-menu-favourite-button"]')) {
			document.querySelector('left-nav-multireddits-controller').shadowRoot.querySelector('left-nav-multireddit-item').append(styleElement.cloneNode(true));
		}
		// append part attribute to items
		enableHideSideMenuFavouriteButton();
	} else {
		disableHideSideMenuFavouriteButton();
	}
}

// Enable Hide Side Menu Favourite Button - RV3
function enableHideSideMenuFavouriteButton() {
	document
		.querySelector('left-nav-communities-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has(> span > shreddit-favorite-button), span:has([icon-name="star-outline"])')?.setAttribute('part', 'star');
		});
	document
		.querySelector('left-nav-moderation-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has(> span > shreddit-favorite-button), span:has([icon-name="star-outline"])')?.setAttribute('part', 'star');
		});
	document
		.querySelector('left-nav-multireddits-controller')
		.shadowRoot.querySelectorAll('left-nav-multireddit-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has(> span > shreddit-favorite-button), span:has([icon-name="star-outline"])')?.setAttribute('part', 'star');
		});
	BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
		if (result.sideMenuIconsOnly) {
			document.documentElement.style.setProperty('--re-side-menu-width', '72px');
		}
	});
}

// Disable Hide Side Menu Favourite Button - RV3
function disableHideSideMenuFavouriteButton() {
	const dynamicStyleElements = document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item').querySelectorAll('style[id="re-hide-side-menu-favourite-button"]');
	dynamicStyleElements.forEach((element) => {
		document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item').removeChild(element);
	});
	const dynamicStyleElements2 = document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item').querySelectorAll('style[id="re-hide-side-menu-favourite-button"]');
	dynamicStyleElements2.forEach((element) => {
		document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item').removeChild(element);
	});
	const dynamicStyleElements3 = document.querySelector('left-nav-multireddits-controller').shadowRoot.querySelector('left-nav-multireddit-item').querySelectorAll('style[id="re-hide-side-menu-favourite-button"]');
	dynamicStyleElements3.forEach((element) => {
		document.querySelector('left-nav-multireddits-controller').shadowRoot.querySelector('left-nav-multireddit-item').removeChild(element);
	});
	BROWSER_API.storage.sync.get(['sideMenuIconsOnly'], function (result) {
		if (result.sideMenuIconsOnly) {
			document.documentElement.style.setProperty('--re-side-menu-width', '86px');
		}
	});
}
