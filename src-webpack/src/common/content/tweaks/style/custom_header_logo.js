/**
 * Tweaks: Style - Custom Header Logo
 * @name customHeaderLogo
 * @description Set a custom image URL to replace the Reddit header logo.
 *
 * Applies to: New New UI (2023-)
 */

// Load the feature state from browser sync storage
export function loadCustomHeaderLogo() {
	BROWSER_API.storage.sync.get(['customHeaderLogo', 'setCustomHeaderLogoUrl'], function (result) {
		if (result.customHeaderLogo) {
			customHeaderLogo(true);
		}
	});
}

// Activate the feature based on Reddit version
export function customHeaderLogo(value) {
	const enableFunctionMap = {
		newnew: enableCustomHeaderLogoNewNew,
		old: enableCustomHeaderLogoOld,
	};

	if (value) {
		enableFunctionMap[redditVersion]?.(value);
	} else {
		disableCustomHeaderLogoAll();
	}
}

// Function - Enable Custom Header Logo - New New
export function enableCustomHeaderLogoNewNew() {
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

// Function - Enable Custom Header Logo - Old
export function enableCustomHeaderLogoOld() {
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

// Function - Disable Custom Header Logo
export function disableCustomHeaderLogoAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-custom-logo"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.documentElement.style.removeProperty('--re-custom-logo');
}

// Function - Set Custom Header Logo URL Style Property
export function setCustomHeaderLogoUrl(url) {
	document.documentElement.style.setProperty('--re-custom-logo', `url(${url})`);
}
