/* ===== Tweaks - Hide - Side Menu Favourite Buttons ===== */

/* === Triggered On Page Load === */
export function loadHideSideMenuFavouriteButton() {
	BROWSER_API.storage.sync.get(['hideSideMenuFavouriteButton'], function (result) {
		hideSideMenuFavouriteButton(result.hideSideMenuFavouriteButton);
	});
}

/* === Main Function === */
export function hideSideMenuFavouriteButton(value) {
	if (redditVersion === 'newnew' && value === true) {
		// create stylesheet
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-side-menu-favourite-button';
		styleElement.textContent = `left-nav-community-item::part(star),
									left-nav-multireddit-item::part(star) {
                                        display: none !important;
                                    }`;
		// append stylesheet to first items
		document.querySelector('left-nav-communities-controller').shadowRoot.querySelector('left-nav-community-item').append(styleElement);
		document.querySelector('left-nav-moderation-controller').shadowRoot.querySelector('left-nav-community-item').append(styleElement.cloneNode(true));
		document.querySelector('left-nav-multireddits-controller').shadowRoot.querySelector('left-nav-multireddit-item').append(styleElement.cloneNode(true));
		// append part attribute to items
		enableHideSideMenuFavouriteButton();
	} else if (redditVersion === 'newnew' && value === false) {
		disableHideSideMenuFavouriteButton();
	}
}

// Function - Enable Hide Side Menu Favourite Button - New New
function enableHideSideMenuFavouriteButton() {
	document
		.querySelector('left-nav-communities-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has([icon-name="star-outline"])').setAttribute('part', 'star');
		});
	document
		.querySelector('left-nav-moderation-controller')
		.shadowRoot.querySelectorAll('left-nav-community-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has([icon-name="star-outline"])').setAttribute('part', 'star');
		});
	document
		.querySelector('left-nav-multireddits-controller')
		.shadowRoot.querySelectorAll('left-nav-multireddit-item')
		.forEach((item) => {
			item.shadowRoot.querySelector('span:has([icon-name="star-outline"])').setAttribute('part', 'star');
		});
}

// Function - Disable Hide Side Menu Favourite Button - New New
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
}
