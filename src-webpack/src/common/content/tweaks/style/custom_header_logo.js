/**
 * Tweaks: Style - Custom Header Logo
 *
 * @name customHeaderLogo
 * @description Set a custom image URL to replace the Reddit header logo.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadCustomHeaderLogo() {
	BROWSER_API.storage.sync.get(['customHeaderLogo', 'setCustomHeaderLogoUrl'], function (result) {
		if (result.customHeaderLogo) customHeaderLogo(true);
	});
}

/* === Enable/Disable The Feature === */
export function customHeaderLogo(value) {
	if (redditVersion === 'newnew' && value) {
		enableCustomHeaderLogoRV3();
	} else if (redditVersion === 'old' && value) {
		enableCustomHeaderLogoRV1();
	} else {
		disableCustomHeaderLogoAll();
	}
}

// Enable Custom Header Logo - RV3
export function enableCustomHeaderLogoRV3() {
	if (!document.head.querySelector('style[id="re-custom-logo"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-custom-logo';
		styleElement.textContent = `#reddit-logo span {
										display: none !important;
									}
									#reddit-logo {
										height: 47px;
										width: 230px;
										margin-top: 1px;
										background-image: var(--re-custom-logo);
										background-repeat: no-repeat;
										background-size: contain;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	BROWSER_API.storage.sync.get(['customHeaderLogoUrl'], function (result) {
		const url = result.customHeaderLogoUrl || '';
		setCustomHeaderLogoUrl(url);
	});
}

// Enable Custom Header Logo - RV1
export function enableCustomHeaderLogoRV1() {
	if (!document.head.querySelector('style[id="re-custom-logo"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-custom-logo';
		styleElement.textContent = `#header-img {
										background-image: var(--re-custom-logo) !important;
										background-size: contain;
  										background-position: unset !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	BROWSER_API.storage.sync.get(['customHeaderLogoUrl'], function (result) {
		const url = result.customHeaderLogoUrl || '';
		setCustomHeaderLogoUrl(url);
	});
}

// Disable Custom Header Logo - All
export function disableCustomHeaderLogoAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-custom-logo"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.documentElement.style.removeProperty('--re-custom-logo');
}

// Set Custom Header Logo URL Style Property
export function setCustomHeaderLogoUrl(url) {
	document.documentElement.style.setProperty('--re-custom-logo', `url(${url})`);
}
