/* ===== Tweaks - Background - Use Custom Background ===== */

/* === Triggered On Page Load === */
export function loadCustomBackground() {
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		if (result.useCustomBackground) useCustomBackground(true);
	});
}

/* === Main Function === */
export function useCustomBackground(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableUseCustomBackgroundOld();
			setBackgroundAndBlur();
		} else if (value === false) {
			disableUseCustomBackgroundAll();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			enableUseCustomBackgroundNew();
			setBackgroundAndBlur();
		} else if (value === false) {
			disableUseCustomBackgroundAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableUseCustomBackgroundNewNew();
			setBackgroundAndBlur();
		} else if (value === false) {
			disableUseCustomBackgroundAll();
		}
	}
}

// Function - Set Background and Blur Properties
function setBackgroundAndBlur() {
	BROWSER_API.storage.sync.get(['customBackground', 'bgBlur'], function (result) {
		setCustomBackground(result.customBackground);
		bgBlur(result.bgBlur);
	});
}

// Set Custom Background Property
export function setCustomBackground(value) {
	document.documentElement.style.setProperty('--re-background-image', 'url("' + value + '")');
}

// Set Background Blur Property
export function bgBlur(value) {
	if (value != undefined) {
		document.documentElement.style.setProperty('--re-background-blur', value + 'px');
	} else {
		document.documentElement.style.setProperty('--re-background-blur', '0px');
	}
}

// Function - Enable Use Custom Background - Old
function enableUseCustomBackgroundOld() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-custom-background';
	styleElement.textContent = `body {
									background: var(--re-background-image) no-repeat center center / cover !important;
									backdrop-filter: blur(var(--re-background-blur));
									background-attachment: fixed !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Use Custom Background - New
function enableUseCustomBackgroundNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-custom-background';
	styleElement.textContent = `.ListingLayout-backgroundContainer {
									--pseudo-before-background: var(--re-background-image) no-repeat center center / cover !important;
								}
								.ListingLayout-backgroundContainer:before {
									filter: blur(var(--re-background-blur));
									transform: scale(1.22);
									overflow: hidden;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Use Custom Background - New New
function enableUseCustomBackgroundNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-custom-background';
	styleElement.textContent = `:root {
									--color-neutral-background: #000 !important;
								}
								body {
									background-color: transparent !important;
								}
								body:before {
									content: "";
									position: fixed;
									background: var(--re-background-image) no-repeat center center / cover;
									width: 100%;
									height: 100vh; 
									transform: scale(1);
									transform-origin: top left;
									z-index: -1;
									filter: blur(var(--re-background-blur));
								}
								shreddit-app .grid-container,
								shreddit-app .sidebar-grid {
									background: none !important;
								}
								shreddit-app #main-content {
									margin-top: 8px;
								}
								shreddit-app main shreddit-async-loader comment-body-header,
								shreddit-app main #comment-tree {
									width: 100%;
									margin-left: -0.5rem;
									margin-bottom: .5rem;
									padding-left: .5rem !important;
									padding-right: .5rem !important;
									padding-bottom: .5rem;
									border-radius: 16px;
								}`;

	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Use Custom Background - All
function disableUseCustomBackgroundAll() {
	document.documentElement.style.setProperty('--re-background-image', '');
	document.documentElement.style.setProperty('--re-background-blur', '');

	const dynamicStyleElements = document.querySelectorAll('style[id="re-custom-background"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
