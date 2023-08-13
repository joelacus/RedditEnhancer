// Override Theme Colour
/*let overrideThemeColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['overrideThemeColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme', result.overrideThemeColourCSS);
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.id = 're-theme-colour';
				document.head.appendChild(styleElement);
				const dynamicStyle = `* { --newCommunityTheme-body: var(--re-theme);
											--newRedditTheme-body: var(--re-theme);
											--newRedditTheme-field: var(--re-theme);
										}
										.re-feed-container > div {
											background-color: var(--re-theme);
											border-radius: 4px;
										}
										.Post, .Post [data-click-id="background"] {
											background-color: transparent !important;
										}
										.Post [data-click-id="media"], .Post [data-click-id="media"] > div {
											background: transparent !important;
										}
										#header-search-bar {
											background: none;
										}
										.re-post-container > div {
											background: none !important;
										}
										header, [role="menu"], .re-sort, .Post, .re-post-container {
											backdrop-filter: blur(10px) !important;
										}`;
				styleElement.innerHTML = dynamicStyle;
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme');
			const dynamicStyleElement = document.getElementById('re-theme-colour');
			if (dynamicStyleElement) {
				document.head.removeChild(dynamicStyleElement);
			}
		}
	}
};
export { overrideThemeColour };
*/

/*
// Override Border Colour
let overrideBorderColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['overrideBorderColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-border', result.overrideBorderColourCSS);
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.id = 're-border';
				document.head.appendChild(styleElement);
				const dynamicStyle = `* { --newRedditTheme-line: var(--re-border);
										--newCommunityTheme-line: var(--re-border);
										--newCommunityTheme-postLine: var(--re-border);
										--post-line-color: var(--re-border) !important;
										--newRedditTheme-widgetColors-sidebarWidgetBorderColor: var(--re-border);); }`;
				styleElement.innerHTML = dynamicStyle;
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-border');
		}
	}
};
export { overrideBorderColour };

// Override Border Colour CSS
let overrideBorderColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['overrideBorderColour'], function (result) {
			console.log(result.overrideBorderColour);
			if (result.overrideBorderColour === true) {
				document.documentElement.style.setProperty('--re-border', value);
				const dynamicStyleElement = document.getElementById('re-border');
				if (dynamicStyleElement) {
					document.head.removeChild(dynamicStyleElement);
				}
			}
		});
	}
};
export { overrideBorderColourCSS };*/

// Header Background Colour
let themeHeaderBackgroundColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-header-bg');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-bg-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themeHeaderBackgroundColour };

// Header Background Colour CSS
let themeHeaderBackgroundColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
			if (result.themeHeaderBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-header-bg', value);
			}
		});
	}
};
export { themeHeaderBackgroundColourCSS };

// Header Text Colour
let themeHeaderTextColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-header-text');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-text-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themeHeaderTextColour };

// Header Text Colour CSS
let themeHeaderTextColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
			if (result.themeHeaderTextColour === true) {
				document.documentElement.style.setProperty('--re-theme-header-text', value);
			}
		});
	}
};
export { themeHeaderTextColourCSS };

// Sort Background Colour
let themeSortBackgroundColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeSortBackgroundColourCSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-sort-bg');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-bg-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themeSortBackgroundColour };

// Sort Background Colour CSS
let themeSortBackgroundColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themeSortBackgroundColour'], function (result) {
			if (result.themeSortBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-sort-bg', value);
			}
		});
	}
};
export { themeSortBackgroundColourCSS };

// Sort Text Colour
let themeSortTextColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeSortTextColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme-sort-text', result.themeSortTextColourCSS);
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.id = 're-theme-sort-text-colour';
				document.head.appendChild(styleElement);
				const dynamicStyle = `.re-sort * {
										--newCommunityTheme-button: var(--re-theme-sort-text);
									}`;
				styleElement.innerHTML = dynamicStyle;
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-sort-text');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-text-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themeSortTextColour };

// Sort Text Colour CSS
let themeSortTextColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themeSortTextColour'], function (result) {
			if (result.themeSortTextColour === true) {
				document.documentElement.style.setProperty('--re-theme-sort-text', value);
			}
		});
	}
};
export { themeSortTextColourCSS };

// Sort Text Colour 2
let themeSortTextColour2 = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeSortTextColour2CSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme-sort-text-2', result.themeSortTextColour2CSS);
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.id = 're-theme-sort-text-colour-2';
				document.head.appendChild(styleElement);
				const dynamicStyle = `.re-sort * {
										--newCommunityTheme-actionIcon: var(--re-theme-sort-text-2);
									}`;
				styleElement.innerHTML = dynamicStyle;
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-sort-text-2');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-text-colour-2"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themeSortTextColour2 };

// Sort Text Colour 2 CSS
let themeSortTextColour2CSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themeSortTextColour2'], function (result) {
			if (result.themeSortTextColour2 === true) {
				document.documentElement.style.setProperty('--re-theme-sort-text-2', value);
			}
		});
	}
};
export { themeSortTextColour2CSS };

// Sort Border Colour
let themeSortBorderColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themeSortBorderColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme-sort-border', result.themeSortBorderColourCSS);
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.id = 're-theme-sort-border-colour';
				document.head.appendChild(styleElement);
				const dynamicStyle = `.re-sort {
										--newCommunityTheme-postLine: var(--re-theme-sort-border);
									}`;
				styleElement.innerHTML = dynamicStyle;
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-sort-border');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sort-border-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themeSortBorderColour };

// Sort Border Colour CSS
let themeSortBorderColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themeSortBorderColour'], function (result) {
			if (result.themeSortBorderColour === true) {
				document.documentElement.style.setProperty('--re-theme-sort-border', value);
			}
		});
	}
};
export { themeSortBorderColourCSS };

// Post Background Colour
let themePostBackgroundColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-post-bg');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-bg-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themePostBackgroundColour };

// Post Background Colour CSS
let themePostBackgroundColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
			if (result.themePostBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-bg', value);
			}
		});
	}
};
export { themePostBackgroundColourCSS };

// Post Text Colour
let themePostTextColour1 = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-post-text');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themePostTextColour1 };

// Post Text Colour CSS
let themePostTextColour1CSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
			if (result.themePostTextColour1 === true) {
				document.documentElement.style.setProperty('--re-theme-post-text', value);
			}
		});
	}
};
export { themePostTextColour1CSS };

// Post Visited title Colour
let themePostVisitedTitleColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themePostVisitedTitleColourCSS'], function (result) {
				document.documentElement.style.setProperty('--re-theme-post-visited-title', result.themePostVisitedTitleColourCSS);
				const styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.id = 're-theme-post-visited-title-colour';
				document.head.appendChild(styleElement);
				const dynamicStyle = `.Post * {
										--postTitle-VisitedLinkColor: var(--re-theme-post-visited-title) !important;
										--postTitleLink-VisitedLinkColor: var(--re-theme-post-visited-title) !important;
									}`;
				styleElement.innerHTML = dynamicStyle;
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-post-visited-title');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-visited-title-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themePostVisitedTitleColour };

// Post Visited title Colour CSS
let themePostVisitedTitleColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themePostVisitedTitleColour'], function (result) {
			if (result.themePostVisitedTitleColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-visited-title', value);
			}
		});
	}
};
export { themePostVisitedTitleColourCSS };

// Post Text Colour 2
let themePostTextColour2 = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-post-text-2');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour-2"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themePostTextColour2 };

// Post Text Colour 2 CSS
let themePostTextColour2CSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
			if (result.themePostTextColour2 === true) {
				document.documentElement.style.setProperty('--re-theme-post-text-2', value);
			}
		});
	}
};
export { themePostTextColour2CSS };

// Post Border Colour
let themePostBorderColour = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		if (value === true) {
			BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
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
			});
		} else if (value === false) {
			document.documentElement.style.removeProperty('--re-theme-post-border');
			const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-border-colour"]');
			dynamicStyleElements.forEach((element) => {
				document.head.removeChild(element);
			});
		}
	}
};
export { themePostBorderColour };

// Post Border Colour CSS
let themePostBorderColourCSS = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
	} else {
		// new reddit
		BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
			if (result.themePostBorderColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-border', value);
			}
		});
	}
};
export { themePostBorderColourCSS };

// Theme Blur Variable
let themeBlur = function (value) {
	if (value != undefined) {
		document.documentElement.style.setProperty('--re-theme-blur', value + 'px');
	} else {
		document.documentElement.style.setProperty('--re-theme-blur', '0px');
	}
};
export { themeBlur };
