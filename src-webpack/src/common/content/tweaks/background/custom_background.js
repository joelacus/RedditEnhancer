/**
 * Tweaks: Background - Use Custom Background
 * @name useCustomBackground
 * @description Change the web page background to a custom image. Also changes the background image blur.
 *
 * Applies to: RV1 (Old New UI) (2018-2024), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadCustomBackground() {
	BROWSER_API.storage.sync.get(['useCustomBackground'], function (result) {
		if (result.useCustomBackground) useCustomBackground(true);
	});
}

/* === Enable/Disable The Feature === */
export function useCustomBackground(value) {
	if (value) {
		setBackgroundAndBlur();
		if (redditVersion === 'old') {
			BROWSER_API.storage.sync.get(['forceCustomBgOldUI', 'moderniseOldReddit'], (result) => {
				if (result.forceCustomBgOldUI || result.moderniseOldReddit) enableUseCustomBackgroundRV1();
			});
		} else if (redditVersion === 'newnew') {
			enableUseCustomBackgroundRV3();
		}
	} else {
		disableUseCustomBackgroundAll();
	}
}

// Load Background and Blur Properties
function setBackgroundAndBlur() {
	BROWSER_API.storage.sync.get(['customBackground', 'bgBlur'], function (result) {
		setCustomBackground(result.customBackground);
		bgBlur(result.bgBlur);
	});
}

// Set Custom Background Property
export function setCustomBackground(value) {
	if (value !== '') {
		document.documentElement.style.setProperty('--re-background-image', 'url("' + value + '") no-repeat center center / cover');
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

// Enable Use Custom Background - RV1
function enableUseCustomBackgroundRV1() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-custom-background';
	styleElement.textContent = `body {
									background: var(--re-background-image) !important;
									backdrop-filter: blur(var(--re-background-blur));
									background-attachment: fixed !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Enable Use Custom Background - RV3
function enableUseCustomBackgroundRV3() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-custom-background';
	styleElement.textContent = `body {
									background-color: transparent !important;
								}
								body:before {
									content: "";
									position: fixed;
									background: var(--re-background-image);
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
								[routename="subreddit"] div.masthead,
								[routename="subreddit_wiki"] div.masthead {
									background-color: var(--re-theme-post-bg);
								}
								community-highlight-carousel {
									background-color: var(--re-theme-post-bg, transparent);
									border-radius: var(--re-theme-border-radius, 1rem);
								}
								community-highlight-carousel.community-highlight-carousel > h3 {
									padding-left: .75rem;
									padding-block: .125rem;
								}
								[routename="post_page"] main.main,
								[routename="comments_page"] main.main,
								[routename="profile_post_page"] main.main,
								[routename="profile_post_page_comments"] main.main,
								[routename="post_stats"] main.main {
									margin: 1rem 0;
									padding: 0 1rem .75rem 1rem;
									height: min-content;
									background-color: var(--re-theme-post-bg, var(--color-neutral-background, #000));
									border-radius: var(--re-theme-border-radius, 0);
									box-sizing: border-box;
									
									& shreddit-post {
										margin: 0;
										padding: 0;
										
										& > :first-child {
											padding-top: 0.75rem;
										}
									}
									
									& div.re-vote-panel {
										margin-top: 0 !important;
									}
									& div.re-vote-panel + shreddit-post {
										padding-left: .25rem !important;
									}
								}
								shreddit-app[routename="post_stats"] main.main > div {
									margin-top: 0;
								}
								shreddit-app[routename="post_page"] div[slot="post-insights-panel"] .p-md,
								shreddit-app[routename="comments_page"] div[slot="post-insights-panel"] .p-md,
								shreddit-app[routename="profile_post_page"] div[slot="post-insights-panel"] .p-md
								shreddit-app[routename="profile_post_page_comments"] div[slot="post-insights-panel"] .p-md {
									padding: 0;
								}
								shreddit-app div.sidebar-grid {
									background-color: var(--color-neutral-background) !important;
									max-width: unset;
								}
								`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Disable Use Custom Background - All
function disableUseCustomBackgroundAll() {
	document.documentElement.style.setProperty('--re-background-image', '');
	document.documentElement.style.setProperty('--re-background-blur', '');

	const dynamicStyleElements = document.querySelectorAll('style[id="re-custom-background"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
