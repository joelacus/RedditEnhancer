// Custom Theme Colour Styles

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
themeHeaderBackgroundColour();

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
themeHeaderTextColour();

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
themeSortBackgroundColour();

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
themeSortTextColour();

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
themeSortTextColour2();

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
themeSortBorderColour();

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
									}`;
			styleElement.innerHTML = dynamicStyle;
		}
	});
};
themePostBackgroundColour();

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
themePostTextColour1();

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
themePostTextColour2();

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
themePostVisitedTitleColour();

// Post Border Colour
let themePostBorderColour = function () {
	BROWSER_API.storage.sync.get(['themePostBorderColour', 'themePostBorderColourCSS'], function (result) {
		if (result.themePostBorderColour === true) {
			document.documentElement.style.setProperty('--re-theme-post-border', result.themePostBorderColourCSS);
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 're-theme-sort-border-colour';
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
themePostBorderColour();

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
themeBlur();
