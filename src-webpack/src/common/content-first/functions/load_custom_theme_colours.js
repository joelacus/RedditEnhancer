// Custom Theme Colour Styles

// Theme Exception
let loadCustomTheme = function () {
	BROWSER_API.storage.sync.get(['themeExceptionsEnable', 'themeExceptionMode', 'themeExceptionSubList'], function (result) {
		var link = window.location.href;
		if (link.indexOf('old.reddit.com') >= 0) {
			// old reddit
			// do nothing
		} else {
			// new reddit
			if (result.themeExceptionsEnable == true) {
				// check exception mode
				if (result.themeExceptionMode === 'whitelist') {
					// only load theme for listed sub reddits
					const list = result.themeExceptionSubList.replaceAll(' ', '').split(',');
					if (list.some((sub) => link.includes('r/' + sub + '/'))) {
						loadTheme();
					} else {
						removeTheme();
					}
				} else if (result.themeExceptionMode === 'blacklist') {
					// show theme globally except listed sub reddits
					const list = result.themeExceptionSubList.replaceAll(' ', '').split(',');
					if (!list.some((sub) => link.includes('r/' + sub + '/'))) {
						loadTheme();
					} else {
						removeTheme();
					}
				}
			} else {
				// load theme for all sub reddits
				loadTheme();
			}
		}
	});
};
export { loadCustomTheme };

function loadTheme() {
	themeBlur();
	themeHeaderBackgroundColour();
	themeHeaderTextColour();
	themeSortBackgroundColour();
	themeSortTextColour();
	themeSortTextColour2();
	themeSortBorderColour();
	themePostBackgroundColour();
	themePostTextColour1();
	themePostTextColour2();
	themePostVisitedTitleColour();
	themePostBorderColour();
	themeCreatePostBackgroundColour();
	themeCreatePostBorderColour();
}

function removeTheme() {
	// remove element properties
	document.documentElement.style.removeProperty('--re-theme-header-bg');
	document.documentElement.style.removeProperty('--re-theme-header-text');
	document.documentElement.style.removeProperty('--re-theme-sort-bg');
	document.documentElement.style.removeProperty('--re-theme-sort-text');
	document.documentElement.style.removeProperty('--re-theme-sort-text-2');
	document.documentElement.style.removeProperty('--re-theme-sort-border');
	document.documentElement.style.removeProperty('--re-theme-post-bg');
	document.documentElement.style.removeProperty('--re-theme-post-text');
	document.documentElement.style.removeProperty('--re-theme-post-visited-title');
	document.documentElement.style.removeProperty('--re-theme-post-text-2');
	document.documentElement.style.removeProperty('--re-theme-post-border');
	// remove stylesheets
	const dynamicStyleElements = document.querySelectorAll(
		`style[id="re-theme-header-bg-colour"],
		style[id="re-theme-header-text-colour"],
		style[id="re-theme-sort-bg-colour"],
		style[id="re-theme-sort-text-colour"],
		style[id="re-theme-sort-text-colour-2"],
		style[id="re-theme-sort-border-colour"],
		style[id="re-theme-post-bg-colour"],
		style[id="re-theme-post-text-colour"],
		style[id="re-theme-post-visited-title-colour"],
		style[id="re-theme-post-text-colour-2"],
		style[id="re-theme-post-border-colour"`
	);
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Header Background Colour
let themeHeaderBackgroundColour = function () {
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour', 'themeHeaderBackgroundColourCSS'], function (result) {
		if (result.themeHeaderBackgroundColour === true) {
			document.documentElement.style.setProperty('--re-theme-header-bg', result.themeHeaderBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-header-bg-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `header * {
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
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Header Text Colour
let themeHeaderTextColour = function () {
	BROWSER_API.storage.sync.get(['themeHeaderTextColour', 'themeHeaderTextColourCSS'], function (result) {
		if (result.themeHeaderTextColour === true) {
			document.documentElement.style.setProperty('--re-theme-header-text', result.themeHeaderTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-header-text-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `header * {
										--newRedditTheme-bodyText: var(--re-theme-header-text);
										--newCommunityTheme-navIcon: var(--re-theme-header-text);
									}
									.re-karma, #re-header-buttons, #SearchDropdown .icon-search {
										color: var(--re-theme-header-text);
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Sort Background Colour
let themeSortBackgroundColour = function () {
	BROWSER_API.storage.sync.get(['themeSortBackgroundColour', 'themeSortBackgroundColourCSS'], function (result) {
		if (result.themeSortBackgroundColour === true) {
			document.documentElement.style.setProperty('--re-theme-sort-bg', result.themeSortBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-sort-bg-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-sort, .re-sort * {
										--newCommunityTheme-body: var(--re-theme-sort-bg);
										--newCommunityTheme-field: var(--re-theme-sort-bg);
									}
									.re-sort {
										backdrop-filter: blur(var(--re-theme-blur)) !important;
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Sort Text Colour
let themeSortTextColour = function () {
	BROWSER_API.storage.sync.get(['themeSortTextColour', 'themeSortTextColourCSS'], function (result) {
		if (result.themeSortTextColour === true) {
			document.documentElement.style.setProperty('--re-theme-sort-text', result.themeSortTextColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-sort-text-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-sort * {
										--newCommunityTheme-button: var(--re-theme-sort-text);
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Sort Text Colour 2
let themeSortTextColour2 = function () {
	BROWSER_API.storage.sync.get(['themeSortTextColour2', 'themeSortTextColour2CSS'], function (result) {
		if (result.themeSortTextColour2 === true) {
			document.documentElement.style.setProperty('--re-theme-sort-text-2', result.themeSortTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-sort-text-colour-2';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-sort * {
										--newCommunityTheme-actionIcon: var(--re-theme-sort-text-2);
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Sort Border Colour
let themeSortBorderColour = function () {
	BROWSER_API.storage.sync.get(['themeSortBorderColour', 'themeSortBorderColourCSS'], function (result) {
		if (result.themeSortBorderColour === true) {
			document.documentElement.style.setProperty('--re-theme-sort-border', result.themeSortBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-sort-border-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-sort {
										--newCommunityTheme-postLine: var(--re-theme-sort-border);
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Post Background Colour
let themePostBackgroundColour = function () {
	BROWSER_API.storage.sync.get(['themePostBackgroundColour', 'themePostBackgroundColourCSS'], function (result) {
		if (result.themePostBackgroundColour === true) {
			document.documentElement.style.setProperty('--re-theme-post-bg', result.themePostBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-post-bg-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.Post *, .re-feed-container * {
										--newCommunityTheme-body: var(--re-theme-post-bg);
										--newRedditTheme-body: var(--re-theme-post-bg);
										--newRedditTheme-field: var(--re-theme-post-bg);
									}
									.re-feed-container > div {
										background-color: var(--re-theme-post-bg);
										border-radius: 4px;
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
									.Post [data-adclicklocation="media"] > div {
										background-color: transparent; 
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Post Text Colour
let themePostTextColour1 = function () {
	BROWSER_API.storage.sync.get(['themePostTextColour1', 'themePostTextColour1CSS'], function (result) {
		if (result.themePostTextColour1 === true) {
			document.documentElement.style.setProperty('--re-theme-post-text', result.themePostTextColour1CSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-post-text-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.Post * {
										--posttitletextcolor: var(--re-theme-post-text) !important;
										--newCommunityTheme-bodyText: var(--re-theme-post-text) !important;
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Post Text Colour 2
let themePostTextColour2 = function () {
	BROWSER_API.storage.sync.get(['themePostTextColour2', 'themePostTextColour2CSS'], function (result) {
		if (result.themePostTextColour2 === true) {
			document.documentElement.style.setProperty('--re-theme-post-text-2', result.themePostTextColour2CSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-post-text-colour-2';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.Post * {
										--newCommunityTheme-actionIcon: var(--re-theme-post-text-2) !important;
									}
									.Post, .Post [data-adclicklocation="top_bar"] * {
										color: var(--re-theme-post-text-2) !important;
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Visited Post Title Colour
let themePostVisitedTitleColour = function () {
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColour', 'themePostVisitedTitleColourCSS'], function (result) {
		if (result.themePostVisitedTitleColour === true) {
			document.documentElement.style.setProperty('--re-theme-post-visited-title', result.themePostVisitedTitleColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-post-text-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.Post * {
									--postTitle-VisitedLinkColor: var(--re-theme-post-visited-title) !important;
									--postTitleLink-VisitedLinkColor: var(--re-theme-post-visited-title) !important;
								}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Post Border Colour
let themePostBorderColour = function () {
	BROWSER_API.storage.sync.get(['themePostBorderColour', 'themePostBorderColourCSS'], function (result) {
		if (result.themePostBorderColour === true) {
			document.documentElement.style.setProperty('--re-theme-post-border', result.themePostBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-post-border-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.Post {
										--newCommunityTheme-postLine: var(--re-theme-post-border);
									}
									.re-post-container {
										border: solid 1px var(--re-theme-post-border);
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Theme Blur Variable
let themeBlur = function () {
	BROWSER_API.storage.sync.get(['themeBlur'], function (result) {
		if (typeof result.themeBlur != 'undefined') {
			document.documentElement.style.setProperty('--re-theme-blur', result.themeBlur + 'px');
		} else if (typeof result.themeBlur == 'undefined') {
			document.documentElement.style.setProperty('--re-theme-blur', '10px');
		}
	});
};

// Create Post Background Colour
let themeCreatePostBackgroundColour = function () {
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColour', 'themeCreatePostBackgroundColourCSS'], function (result) {
		if (result.themeCreatePostBackgroundColour === true) {
			document.documentElement.style.setProperty('--re-theme-create-post-bg', result.themeCreatePostBackgroundColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-create-post-bg-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-create-post {
									--newCommunityTheme-body: var(--re-theme-create-post-bg);
									--newRedditTheme-body: var(--re-theme-create-post-bg);
									--newRedditTheme-field: var(--re-theme-create-post-bg);
								}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};

// Create Post Border Colour
let themeCreatePostBorderColour = function () {
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColour', 'themeCreatePostBorderColourCSS'], function (result) {
		if (result.themeCreatePostBorderColour === true) {
			document.documentElement.style.setProperty('--re-theme-create-post-border', result.themeCreatePostBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-create-post-border-colour';
			document.head.appendChild(styleElement);
			const dynamicStyle = `.re-create-post {
									--newRedditTheme-postLine: var(--re-theme-create-post-border);
								}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};
