/* ===== Tweaks - Background - Use Custom Background ===== */

/* === Triggered On Page Load === */
export function loadCustomBackground() {
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		if (result.useCustomBackground) useCustomBackground(true);
	});
}

/* === Main Function === */
export function useCustomBackground(value) {
	if (value) {
		setBackgroundAndBlur();
		switch (redditVersion) {
			case 'old':
				BROWSER_API.storage.sync.get(['forceCustomBgOldUI', 'moderniseOldReddit'], (result) => {
					if (result.forceCustomBgOldUI || result.moderniseOldReddit) enableUseCustomBackgroundOld();
				});
				break;
			case 'new':
				enableUseCustomBackgroundNew();
				break;
			case 'newnew':
				enableUseCustomBackgroundNewNew();
				break;
		}
	} else {
		disableUseCustomBackgroundAll();
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
	if (value !== '') {
		document.documentElement.style.setProperty('--re-background-image', 'url("' + value + '")');
	}
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
	styleElement.textContent = `body {
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
								shreddit-app[routename="post_page"] main.main,
								shreddit-app[routename="comments_page"] main.main,
								shreddit-app[routename="profile_post_page"] main.main,
								shreddit-app[routename="post_stats"] main.main {
									margin: 1rem 0;
									padding: 0 1rem .75rem 1rem;
									height: min-content;
									background-color: var(--re-theme-post-bg, var(--color-neutral-background, #000));
									border-radius: var(--re-theme-border-radius, 0);
									box-sizing: border-box;
									
									& > shreddit-post {
										margin: 0;
										padding: 0;
										
										& div[slot="credit-bar"] {
											padding-top: 0.875rem;
										}
									}
								}
								shreddit-app[routename="post_stats"] main.main > div {
									margin-top: 0;
								}
								shreddit-app[routename="post_page"] div[slot="post-insights-panel"] .p-md,
								shreddit-app[routename="comments_page"] div[slot="post-insights-panel"] .p-md,
								shreddit-app[routename="profile_post_page"] div[slot="post-insights-panel"] .p-md {
									padding: 0;
								}
								shreddit-app div.sidebar-grid {
									background-color: var(--color-neutral-background) !important;
									max-width: unset;
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
