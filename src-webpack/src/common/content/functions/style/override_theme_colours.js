/* = Theme Colours = */

// Header Background Colour
export function themeHeaderBackgroundColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-header-bg', result.themeHeaderBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-header-bg-colour';
			styleElement.textContent = `header * {
											--newRedditTheme-body: var(--re-theme-header-bg);
											--newCommunityTheme-body: var(--re-theme-header-bg);
											--newRedditTheme-field: var(--re-theme-header-bg);
										}
										header [role="menu"] {
											--newCommunityTheme-body: var(--re-theme-header-bg);
										}
										#header-search-bar {
											background: none;
										}
										header, header [role="menu"] {
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-header-bg', result.themeHeaderBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-header-bg-colour';
			styleElement.textContent = `header, #user-drawer-content {
											--color-neutral-background: var(--re-theme-header-bg);
											--color-neutral-background-strong: var(--re-theme-header-bg);
											/*--color-secondary-background:  var(--re-theme-header-bg);*/
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-header-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Header Background Colour CSS
export function themeHeaderBackgroundColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
			if (result.themeHeaderBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-header-bg', value);
			}
		});
	}
}

// Header Text Colour
export function themeHeaderTextColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-header-text', result.themeHeaderTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-header-text-colour';
			styleElement.textContent = `header * {
											--newRedditTheme-bodyText: var(--re-theme-header-text);
											--newCommunityTheme-navIcon: var(--re-theme-header-text);
										}
										#email-collection-tooltip-id > :last-child > :last-child, .re-to-top-button i, #SearchDropdown .icon-search {
											color: var(--re-theme-header-text);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-header-text', result.themeHeaderTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-header-text-colour';
			styleElement.textContent = `header * {
											--button-color-text-default: var(--re-theme-header-text);
											--color-secondary: var(--re-theme-header-text);
										}
										header > nav > :last-child > :nth-child(2) svg {
											color: var(--re-theme-header-text) !important;
											fill: var(--re-theme-header-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-header-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Header Text Colour CSS
export function themeHeaderTextColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
			if (result.themeHeaderTextColour === true) {
				document.documentElement.style.setProperty('--re-theme-header-text', value);
			}
		});
	}
}

// Create Post Background Colour
export function themeCreatePostBackgroundColour(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme-create-post-bg', result.themeCreatePostBackgroundColourCSS);
				const styleElement = document.createElement('style');
				styleElement.id = 're-theme-create-post-bg-colour';
				styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has([name="createPost"]) {
									--newCommunityTheme-body: var(--re-theme-create-post-bg);
									--newRedditTheme-body: var(--re-theme-create-post-bg);
									--newRedditTheme-field: var(--re-theme-create-post-bg);
								}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-create-post-bg');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-create-post-bg-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Create Post Background Colour CSS
export function themeCreatePostBackgroundColourCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColour'], function (result) {
			if (result.themeCreatePostBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-create-post-bg', value);
			}
		});
	}
}

// Create Post Border Colour
export function themeCreatePostBorderColour(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeCreatePostBorderColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme-create-post-border', result.themeCreatePostBorderColourCSS);
				const styleElement = document.createElement('style');
				styleElement.id = 're-theme-create-post-border-colour';
				styleElement.textContent = `.re-create-post {
									--newRedditTheme-postLine: var(--re-theme-create-post-border);
								}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-create-post-border');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-create-post-border-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
}

// Create Post Border Colour CSS
export function themeCreatePostBorderColourCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['themeCreatePostBorderColour'], function (result) {
			if (result.themeCreatePostBorderColour === true) {
				document.documentElement.style.setProperty('--re-theme-create-post-border', value);
			}
		});
	}
}

// Sort Background Colour
export function themeSortBackgroundColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSortBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sort-bg', result.themeSortBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sort-bg-colour';
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE), .ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE) * {
											--newCommunityTheme-body: var(--re-theme-sort-bg);
											--newCommunityTheme-field: var(--re-theme-sort-bg);
										}
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE) {
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sort-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sort Background Colour CSS
export function themeSortBackgroundColourCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['themeSortBackgroundColour'], function (result) {
			if (result.themeSortBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-sort-bg', value);
			}
		});
	}
}

// Sort Text Colour
export function themeSortTextColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSortTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sort-text', result.themeSortTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sort-text-colour';
			styleElement.textContent = `.re-sort * {
											--newCommunityTheme-button: var(--re-theme-sort-text);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sort-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sort Text Colour CSS
export function themeSortTextColourCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['themeSortTextColour'], function (result) {
			if (result.themeSortTextColour === true) {
				document.documentElement.style.setProperty('--re-theme-sort-text', value);
			}
		});
	}
}

// Sort Text Colour 2
export function themeSortTextColour2(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSortTextColour2CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sort-text-2', result.themeSortTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sort-text-colour-2';
			styleElement.textContent = `.re-sort * {
											--newCommunityTheme-actionIcon: var(--re-theme-sort-text-2);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sort-text-2');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-text-colour-2"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sort Text Colour 2 CSS
export function themeSortTextColour2CSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['themeSortTextColour2'], function (result) {
			if (result.themeSortTextColour2 === true) {
				document.documentElement.style.setProperty('--re-theme-sort-text-2', value);
			}
		});
	}
}

// Sort Border Colour
export function themeSortBorderColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSortBorderColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sort-border', result.themeSortBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sort-border-colour';
			styleElement.textContent = `.re-sort {
											--newCommunityTheme-postLine: var(--re-theme-sort-border);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sort-border');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sort Border Colour CSS
export function themeSortBorderColourCSS(value) {
	if (redditVersion === 'new') {
		BROWSER_API.storage.sync.get(['themeSortBorderColour'], function (result) {
			if (result.themeSortBorderColour === true) {
				document.documentElement.style.setProperty('--re-theme-sort-border', value);
			}
		});
	}
}

// Post Background Colour
export function themePostBackgroundColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-bg', result.themePostBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-bg-colour';
			styleElement.textContent = `.Post *, .ListingLayout-backgroundContainer + div > :last-child > :first-child * {
											--newCommunityTheme-body: var(--re-theme-post-bg);
											--newRedditTheme-body: var(--re-theme-post-bg);
											--newRedditTheme-field: var(--re-theme-post-bg);
										}
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.Post) > div {
											background-color: var(--re-theme-post-bg);
										}
										.ListingLayout-backgroundContainer + div > :last-child > :first-child {
											background-color: var(--re-theme-post-bg);
											border-radius: 4px;
										}
										#AppRouter-main-content > div > div > .ListingLayout-backgroundContainer + div > :last-child > :first-child {
											background-color: transparent;
										}
										.Post, .Post [data-click-id="background"] {
											background-color: transparent !important;
										}
										.Post [data-click-id="media"], .Post [data-click-id="media"] > div {
											background: transparent !important;
										}
										.Post, .re-post-container {
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}
										div:has(> div > div > #CommentSort--SortPicker),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > :last-child > :last-child {
											background: none;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-bg', result.themePostBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-bg-colour';
			styleElement.textContent = `shreddit-post, comment-body-header, #comment-tree {
											--shreddit-content-background: var(--re-theme-post-bg);
											--color-neutral-background: var(--re-theme-post-bg);
										}
										shreddit-post {
											background-color: var(--re-theme-post-bg) !important;
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}
										shreddit-comment {
											--color-neutral-background: transparent !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Background Colour CSS
export function themePostBackgroundColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
			if (result.themePostBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-bg', value);
			}
		});
	}
}

// Post Text Colour
export function themePostTextColour1(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-text', result.themePostTextColour1CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-text-colour';
			styleElement.textContent = `.Post * {
											--posttitletextcolor: var(--re-theme-post-text) !important;
											--newCommunityTheme-bodyText: var(--re-theme-post-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-text', result.themePostTextColour1CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-text-colour';
			styleElement.textContent = `shreddit-post [id^="post-title"] {
											--color-neutral-content-strong: var(--re-theme-post-text) !important;
										}
										shreddit-post [data-post-click-location="text-body"] p,
										shreddit-comment p {
											color: var(--re-theme-post-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Text Colour CSS
export function themePostTextColour1CSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
			if (result.themePostTextColour1 === true) {
				document.documentElement.style.setProperty('--re-theme-post-text', value);
			}
		});
	}
}

// Post Visited title Colour
export function themePostVisitedTitleColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostVisitedTitleColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-visited-title', result.themePostVisitedTitleColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-visited-title-colour';
			styleElement.textContent = `.Post * {
											--postTitle-VisitedLinkColor: var(--re-theme-post-visited-title) !important;
											--postTitleLink-VisitedLinkColor: var(--re-theme-post-visited-title) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostVisitedTitleColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-visited-title', result.themePostVisitedTitleColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-visited-title-colour';
			styleElement.textContent = `shreddit-post [id^="post-title"] {
											--color-neutral-content-weak: var(--re-theme-post-visited-title) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-visited-title');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-visited-title-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Visited title Colour CSS
export function themePostVisitedTitleColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostVisitedTitleColour'], function (result) {
			if (result.themePostVisitedTitleColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-visited-title', value);
			}
		});
	}
}

// Post Text Colour 2
export function themePostTextColour2(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-text-2', result.themePostTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-text-colour-2';
			styleElement.textContent = `.Post * {
											--newCommunityTheme-actionIcon: var(--re-theme-post-text-2) !important;
										}
										.Post, .Post [data-adclicklocation="top_bar"] * {
											color: var(--re-theme-post-text-2) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-text-2', result.themePostTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-text-colour-2';
			styleElement.textContent = `shreddit-post [slot="credit-bar"] {
											--color-neutral-content-weak: var(--re-theme-post-text-2) !important;
											--color-neutral-content: var(--re-theme-post-text-2) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-text-2');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour-2"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Text Colour 2 CSS
export function themePostTextColour2CSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
			if (result.themePostTextColour2 === true) {
				document.documentElement.style.setProperty('--re-theme-post-text-2', value);
			}
		});
	}
}

// Post Border Colour
export function themePostBorderColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-border', result.themePostBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-border-colour';
			styleElement.textContent = `.Post {
											--newCommunityTheme-postLine: var(--re-theme-post-border);
										}
										.re-post-container {
											border: solid 1px var(--re-theme-post-border);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-border', result.themePostBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-border-colour';
			styleElement.textContent = `shreddit-post {
											border: solid 1px var(--re-theme-post-border);
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-border');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Border Colour CSS
export function themePostBorderColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
			if (result.themePostBorderColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-border', value);
			}
		});
	}
}

// Theme Blur Variable
export function themeBlur(value) {
	if (value != undefined) {
		document.documentElement.style.setProperty('--re-theme-blur', value + 'px');
	} else {
		document.documentElement.style.setProperty('--re-theme-blur', '0px');
	}
}
