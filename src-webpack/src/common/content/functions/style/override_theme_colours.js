/* = Theme Colours = */

// Header Background Colour
export function themeHeaderBackgroundColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-header-bg', result.themeHeaderBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-header-bg-colour';
			styleElement.textContent = `header *,
										.ListingLayout-backgroundContainer + div > :first-child:has(>div>div>div>a) {
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
										header, header [role="menu"],
										.ListingLayout-backgroundContainer + div > :first-child:has(>div>div>div>a) {
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
										}
										* {
											--color-secondary-background: rgba(0,0,0,0.3) !important;
											--color-secondary-background-hover: rgba(0,0,0,0.6) !important;
											--color-secondary-background-selected: rgba(0,0,0,0.6) !important;
											--color-neutral-background-hover: rgba(0,0,0,0.6) !important;
										}
										reddit-search-large {
											display: flex;
											width: 100% !important;
											border-radius: var(--radius-md);
											backdrop-filter: blur(var(--re-theme-blur));
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
												backdrop-filter: blur(var(--re-theme-blur)) !important;
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
				styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has([name="createPost"]) {
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
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.icon-new_fill) {
											--newCommunityTheme-body: var(--re-theme-sort-bg);
											--newCommunityTheme-field: var(--re-theme-sort-bg);
										}
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.icon-new_fill) {
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
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.icon-new_fill) {
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
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.icon-new_fill) {
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
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(.icon-new_fill) {
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
			styleElement.textContent = `.Post *, .ListingLayout-backgroundContainer + div > :last-child > :first-child:has(.Post):has(.Comment) * {
											--newCommunityTheme-body: var(--re-theme-post-bg);
											--newRedditTheme-body: var(--re-theme-post-bg);
											--newRedditTheme-field: var(--re-theme-post-bg);
										}
										#AppRouter-main-content > div > div > .ListingLayout-backgroundContainer + div > :last-child > :first-child {
											background-color: transparent;
										}
										.Post:has([data-click-id="background"]) {
											background-color: var(--re-theme-post-bg) !important;
										}
										.Post [data-click-id="background"] {
											background-color: transparent !important;
										}
										div:has(> div > div > #CommentSort--SortPicker),
										.ListingLayout-backgroundContainer + div > :last-child > :first-child > :last-child > :last-child {
											background: none;
										}
										.Post, .re-post-container, .ListingLayout-backgroundContainer + div > :last-child > div:has(.Post):has(.Comment) {
											backdrop-filter: blur(var(--re-theme-blur));
										}
										.ListingLayout-backgroundContainer + div > :last-child > div:has(.Post):has(.Comment):has(.icon-new_fill) {
											backdrop-filter: none !important;
										}
										div:has(.Post):has(.Comment) .Post {
											backdrop-filter: none !important;
										}
										#comment_search-bar {
											background-color: rgba(0,0,0,0.2) !important;
											border: solid 1px rgba(0,0,0,0.3) !important;
										}
										#comment_search-bar:hover {
											border: solid 1px rgba(0,0,0,0.3) !important;
										}
										* {
											--comments-overlay-background: var(--re-theme-post-bg) !important;
										}
										#overlayScrollContainer {
											--newRedditTheme-body: transparent !important;
											--newRedditTheme-bodyAlpha80: transparent !important;
										}
										#overlayScrollContainer >  div:has([data-testid="post-container"]) {
											backdrop-filter:blur(var(--re-theme-blur));
										}
										.Post > :last-child > div:has(img) > div,
										.Post > :last-child > div:has(img) > div > :last-child,
										.Post > :last-child > div:has(video) > div,
										.Post > :last-child > div:has(video) > div > :last-child {
											background: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-bg', result.themePostBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-bg-colour';
			styleElement.textContent = `shreddit-post, comment-body-header, #comment-tree {
											--shreddit-content-background: var(--re-theme-post-bg) !important;
											--color-neutral-background: var(--re-theme-post-bg) !important;
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}
										shreddit-post {
											background-color: var(--re-theme-post-bg) !important;
										}
										shreddit-comment {
											--color-neutral-background: transparent !important;
										}
										shreddit-comment button:hover {
											--color-secondary-background-hover: rgba(0,0,0,0.3) !important;
											--button-border-color: rgba(0,0,0,0.6) !important;
										}
										[pagetype="search_results"] #main-content > div {
											--color-neutral-background: var(--re-theme-post-bg) !important;
											backdrop-filter: blur(var(--re-theme-blur)) !important;
											border-radius: 8px;
										}
										/*shreddit-overflow-menu {
											--color-neutral-background-strong: var(--re-theme-post-bg) !important;
										}*/`;
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
										shreddit-post [data-post-click-location="text-body"] p {
											color: var(--re-theme-post-text) !important;
										}
										[data-testid="search-post"] > post-consume-tracker > div {
											--color-neutral-content-strong: var(--re-theme-post-text) !important;
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

// Post Comments Text Colour
export function themePostCommentsTextColour1(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-comments-text', result.themePostCommentsTextColour1CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-comments-text-colour';
			styleElement.textContent = `.Comment * {
											--newCommunityTheme-bodyText: var(--re-theme-post-comments-text) !important;
											--newRedditTheme-titleText: var(--re-theme-post-comments-text) !important;
										}
										.threadline {
											border-color: var(--re-theme-post-comments-text) !important;
											opacity: 0.2;
										}
										.Comment div[id^="vote-arrows-"] > div {
											color: var(--re-theme-post-comments-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-comments-text', result.themePostCommentsTextColour1CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-comments-text-colour';
			styleElement.textContent = `shreddit-comment p {
											color: var(--re-theme-post-comments-text) !important;
											--color-neutral-content-strong: var(--re-theme-post-comments-text) !important;
										}
										shreddit-comment [noun="comment_author"] > a {
											color: var(--re-theme-post-comments-text) !important;
										}
										shreddit-comment faceplate-number {
											color: var(--re-theme-post-comments-text) !important;
										}
										shreddit-comment shreddit-comment-action-row {
											--color-button-plain-text: var(--re-theme-post-comments-text) !important;
										}
										shreddit-post + [bundlename="comment_body_header"] {
											--color-neutral-content-weak: var(--re-theme-post-comments-text) !important;
										}
										/** {
											/*--color-secondary-plain: var(--re-theme-post-comments-text) !important;*/
											--color-secondary-background: rgba(0,0,0,0.3) !important;
											--color-secondary-background-hover: rgba(0,0,0,0.6) !important;
										}*/`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-comments-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-comments-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Comments Text Colour CSS
export function themePostCommentsTextColour1CSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1'], function (result) {
			if (result.themePostCommentsTextColour1 === true) {
				document.documentElement.style.setProperty('--re-theme-post-comments-text', value);
			}
		});
	}
}

// Post Comments Secondary Text Colour
export function themePostCommentsTextColour2(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-comments-text-2', result.themePostCommentsTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-comments-text-2-colour';
			styleElement.textContent = `.Comment * {
											--newCommunityTheme-metaText: var(--re-theme-post-comments-text-2) !important;
											--newCommunityTheme-actionIcon: var(--re-theme-post-comments-text-2) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-comments-text-2', result.themePostCommentsTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-post-comments-text-2-colour';
			styleElement.textContent = `shreddit-comment {
											--color-neutral-content-weak: var(--re-theme-post-comments-text-2) !important;
											--color-secondary-weak: var(--re-theme-post-comments-text-2) !important;
										}
										shreddit-comment-tree * {
											--color-neutral-content-strong: var(--re-theme-post-comments-text-2) !important;
										}
										shreddit-comment shreddit-comment-action-row {
											--color-secondary: var(--re-theme-post-comments-text-2) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-post-comments-text-2');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-comments-text-2-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Comments Secondary Text Colour CSS
export function themePostCommentsTextColour2CSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2'], function (result) {
			if (result.themePostCommentsTextColour2 === true) {
				document.documentElement.style.setProperty('--re-theme-post-comments-text-2', value);
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

// Post Secondary Text Colour
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
										}
										[data-testid="search-post"] > post-consume-tracker > div {
											--color-neutral-content-weak: var(--re-theme-post-text-2) !important;
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

// Post Secondary Text Colour CSS
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

// Sidebar Text Colour
export function themeSidebarTextColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidebarTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-text', result.themeSidebarTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidebar-text-colour';
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :last-child {
											--newRedditTheme-bodyText: var(--re-theme-sidebar-text) !important;
											--newCommunityTheme-widgetColors-sidebarWidgetTitleColor: none !important;
											--newCommunityTheme-metaText: var(--re-theme-sidebar-text) !important;
											--newCommunityTheme-widgetColors-sidebarWidgetTextColor: var(--re-theme-sidebar-text) !important;
											--newCommunityTheme-widgetColors-sidebarWidgetTextColorShaded80: var(--re-theme-sidebar-text) !important;
											--newCommunityTheme-button: var(--re-theme-sidebar-text) !important;
											--newCommunityTheme-linkText: var(--re-theme-sidebar-text) !important;
											--newCommunityTheme-bodyText: var(--re-theme-sidebar-text) !important;
										}
										.ListingLayout-backgroundContainer + div > :last-child > :last-child button {
											--widget-button-color: var(--re-theme-sidebar-text) !important;
											--widget-button-hover-color: var(--re-theme-sidebar-text) !important;
											--widget-button-border: 1px solid var(--re-theme-sidebar-text) !important;
											--widget-button-hover-border: 1px solid var(--re-theme-sidebar-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidebarTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-text', result.themeSidebarTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidebar-text-colour';
			styleElement.textContent = `#right-sidebar-container {
											color: var(--re-theme-sidebar-text) !important;
											--color-neutral-content: var(--re-theme-sidebar-text) !important;
											--color-secondary: var(--re-theme-sidebar-text) !important;
											--color-neutral-content-weak: var(--re-theme-sidebar-text) !important;
											--color-secondary-weak: var(--re-theme-sidebar-text) !important;
											--color-neutral-border-strong: var(--re-theme-sidebar-text) !important;
											--color-secondary-hover: var(--re-theme-sidebar-text) !important;
										}
										#right-sidebar-container .button {
											color: var(--re-theme-sidebar-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sidebar-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidebar-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sidebar Text Colour CSS
export function themeSidebarTextColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarTextColour'], function (result) {
			if (result.themeSidebarTextColour === true) {
				document.documentElement.style.setProperty('--re-theme-sidebar-text', value);
			}
		});
	}
}

// Sidebar Background Colour
export function themeSidebarBgColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidebarBgColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-bg', result.themeSidebarBgColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidebar-bg-colour';
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :last-child {
											--newRedditTheme-widgetColors-sidebarWidgetBackgroundColor: var(--re-theme-sidebar-bg) !important;
											--newCommunityTheme-widgetColors-sidebarWidgetHeaderColor: var(--re-theme-sidebar-bg) !important;
										}
										.ListingLayout-backgroundContainer + div > :last-child > :last-child > div > div {
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}
										.ListingLayout-backgroundContainer + div > :last-child > :last-child > div > :last-child {
											backdrop-filter: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidebarBgColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-bg', result.themeSidebarBgColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidebar-bg-colour';
			styleElement.textContent = `#right-sidebar-container,
										[pagetype="search_results"] #right-sidebar-container > div > div {
											--color-neutral-background-weak: var(--re-theme-sidebar-bg) !important;
											--color-neutral-background-hover: rgba(0,0,0,0.6) !important;
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}
										#right-sidebar-container .button {
											--button-color-background-default: rgba(0,0,0,0.4) !important;
											--button-color-background-hover: rgba(0,0,0,0.6) !important;
										}
										[pagetype="search_results"] #right-sidebar-container,
										[routename="all"] #right-sidebar-container {
											backdrop-filter: none !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sidebar-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidebar-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sidebar Background Colour CSS
export function themeSidebarBgColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarBgColour'], function (result) {
			if (result.themeSidebarBgColour === true) {
				document.documentElement.style.setProperty('--re-theme-sidebar-bg', value);
			}
		});
	}
}

// Sidemenu Text Colour
export function themeSidemenuTextColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidemenu-text', result.themeSidemenuTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidemenu-text-colour';
			styleElement.textContent = `#AppRouter-main-content > :first-child:has(>[role="menu"]) {
											--newCommunityTheme-bodyText: var(--re-theme-sidemenu-text) !important;
											--newRedditTheme-actionIcon: var(--re-theme-sidemenu-text) !important;
											--newRedditTheme-bodyText: var(--re-theme-sidemenu-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidemenu-text', result.themeSidemenuTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidemenu-text-colour';
			styleElement.textContent = `#left-sidebar-container {
											--color-secondary: var(--re-theme-sidemenu-text) !important;
											--color-secondary-plain: var(--re-theme-sidemenu-text) !important;
											--color-secondary-weak: var(--re-theme-sidemenu-text) !important;
											--color-secondary-hover: var(--re-theme-sidemenu-text) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sidemenu-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidemenu-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sidemenu Text Colour CSS
export function themeSidemenuTextColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColour'], function (result) {
			if (result.themeSidemenuTextColour === true) {
				document.documentElement.style.setProperty('--re-theme-sidemenu-text', value);
			}
		});
	}
}

// Sidemenu Background Colour
export function themeSidemenuBgColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidemenu-bg', result.themeSidemenuBgColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidemenu-bg-colour';
			styleElement.textContent = `#AppRouter-main-content > :first-child:has(>[role="menu"]) {
											--newRedditTheme-body: var(--re-theme-sidemenu-bg) !important;
											--newRedditTheme-field: rgba(0,0,0,0.2) !important; 
											--newRedditTheme-line: rgba(0,0,0,0.3) !important;
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}
										#header-subreddit-filter:hover, #header-subreddit-filter:focus {
											background-color: rgba(0,0,0,0.5);
											border-color: rgba(0,0,0,0.6) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (redditVersion === 'newnew' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidemenu-bg', result.themeSidemenuBgColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidemenu-bg-colour';
			styleElement.textContent = `#left-sidebar-container {
											--color-neutral-background: var(--re-theme-sidemenu-bg) !important;
											--color-neutral-background-hover: rgba(0,0,0,0.2) !important;
											--color-neutral-background-selected: rgba(0,0,0,0.3) !important;
											backdrop-filter: blur(var(--re-theme-blur)) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sidemenu-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidemenu-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sidemenu Background Colour CSS
export function themeSidemenuBgColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColour'], function (result) {
			if (result.themeSidemenuBgColour === true) {
				document.documentElement.style.setProperty('--re-theme-sidemenu-bg', value);
			}
		});
	}
}

// Sidebar Border Colour
export function themeSidebarBorderColour(value) {
	if (redditVersion === 'new' && value === true) {
		BROWSER_API.storage.sync.get(['themeSidebarBorderColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-border', result.themeSidebarBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.id = 're-theme-sidebar-border-colour';
			styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :last-child > div > div {
											--newRedditTheme-widgetColors-sidebarWidgetBorderColor: var(--re-theme-sidebar-border) !important;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		});
	} else if (value === false) {
		document.documentElement.style.removeProperty('--re-theme-sidebar-border');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidebar-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Sidebar Border Colour CSS
export function themeSidebarBorderColourCSS(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarBorderColour'], function (result) {
			if (result.themeSidebarBorderColour === true) {
				document.documentElement.style.setProperty('--re-theme-sidebar-border', value);
			}
		});
	}
}
