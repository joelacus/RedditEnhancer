/* ===== Inputs / Style Tweaks ===== */

import { sendMessage } from '../send_message';

// Toggle - Mind The Gap
document.querySelector('#checkbox-hide-gap').addEventListener('change', function (e) {
	const hideGap = document.querySelector('#checkbox-hide-gap').checked;
	if (hideGap == true) {
		BROWSER_API.storage.sync.set({ hideGap: true });
		document.querySelector('.hide-gap').style.backgroundColor = 'var(--accent)';
		sendMessage({ hideGap: true });
	} else if (hideGap == false) {
		BROWSER_API.storage.sync.set({ hideGap: false });
		document.querySelector('.hide-gap').style.backgroundColor = '';
		sendMessage({ hideGap: false });
	}
});

// Toggle - Add Drop Shadow
document.querySelector('#checkbox-add-drop-shadow').addEventListener('change', function (e) {
	const addDropShadow = document.querySelector('#checkbox-add-drop-shadow').checked;
	BROWSER_API.storage.sync.set({ addDropShadow: addDropShadow === true });
	sendMessage({ addDropShadow: addDropShadow === true });
	document.querySelector('.icon-add-drop-shadow').style.backgroundColor = addDropShadow === true ? 'var(--accent)' : '';
	if (addDropShadow) {
		document.querySelector('.icon-add-drop-shadow').classList.add('icon-light-on');
		document.querySelector('.icon-add-drop-shadow').classList.remove('icon-light-off');
	} else {
		document.querySelector('.icon-add-drop-shadow').classList.remove('icon-light-on');
		document.querySelector('.icon-add-drop-shadow').classList.add('icon-light-off');
	}
});

// Toggle - Drop Shadow CSS Override
document.querySelector('#checkbox-shadow-override').addEventListener('change', function (e) {
	const overrideDropShadow = document.querySelector('#checkbox-shadow-override').checked;
	document.querySelector('.icon-drop-shadow-override').style.backgroundColor = overrideDropShadow === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ overrideDropShadow: overrideDropShadow === true });
	sendMessage({ overrideDropShadow: overrideDropShadow === true });
});

// Input - Drop Shadow Override CSS
document.querySelector('#input-shadow-override-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-shadow-override-css').value;
	BROWSER_API.storage.sync.set({ overrideDropShadowCSS: css });
	sendMessage({ overrideDropShadowCSS: css });
});

// Toggle - Modernise Old Reddit
document.querySelector('#checkbox-modern-old-reddit').addEventListener('change', function (e) {
	const moderniseOldReddit = document.querySelector('#checkbox-modern-old-reddit').checked;
	if (moderniseOldReddit == true) {
		BROWSER_API.storage.sync.set({ moderniseOldReddit: true });
		BROWSER_API.storage.sync.set({ hideHeaderSubBar: true });
		BROWSER_API.storage.sync.set({ hideSideMenuOld: true });
		BROWSER_API.storage.sync.set({ largerClassicPost: true });
		document.querySelector('.icon-modern-old-reddit').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = 'var(--accent)';
		sendMessage({ moderniseOldReddit: true });
		sendMessage({ hideHeaderSubBar: true });
		sendMessage({ hideSideMenuOld: true });
		sendMessage({ largerClassicPost: true });
		document.querySelector('#checkbox-hide-header-sub-bar').checked = true;
		document.querySelector('#checkbox-hide-side-menu-old').checked = true;
		document.querySelector('#checkbox-larger-classic-post').checked = true;
	} else if (moderniseOldReddit == false) {
		BROWSER_API.storage.sync.set({ moderniseOldReddit: false });
		BROWSER_API.storage.sync.set({ hideHeaderSubBar: false });
		BROWSER_API.storage.sync.set({ hideSideMenuOld: false });
		BROWSER_API.storage.sync.set({ largerClassicPost: false });
		document.querySelector('.icon-modern-old-reddit').style.backgroundColor = '';
		document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = '';
		document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = '';
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = '';
		sendMessage({ moderniseOldReddit: false });
		sendMessage({ hideHeaderSubBar: false });
		sendMessage({ hideSideMenuOld: false });
		sendMessage({ largerClassicPost: false });
		document.querySelector('#checkbox-hide-header-sub-bar').checked = false;
		document.querySelector('#checkbox-hide-side-menu-old').checked = false;
		document.querySelector('#checkbox-larger-classic-post').checked = false;
	}
});

// Toggle - Header Background Colour
document.querySelector('#checkbox-header-bg-colour').addEventListener('change', function (e) {
	const themeHeaderBackgroundColour = document.querySelector('#checkbox-header-bg-colour').checked;
	if (themeHeaderBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themeHeaderBackgroundColour: true });
		document.querySelector('.icon-header-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeHeaderBackgroundColour: true });
	} else if (themeHeaderBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themeHeaderBackgroundColour: false });
		document.querySelector('.icon-header-bg-colour').style.backgroundColor = '';
		sendMessage({ themeHeaderBackgroundColour: false });
	}
});

// Input - Header Background Colour CSS
document.querySelector('#input-header-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-header-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeHeaderBackgroundColourCSS: css });
	sendMessage({ themeHeaderBackgroundColourCSS: css });
});

// Toggle - Header Text Colour
document.querySelector('#checkbox-header-text-colour').addEventListener('change', function (e) {
	const themeHeaderTextColour = document.querySelector('#checkbox-header-text-colour').checked;
	if (themeHeaderTextColour == true) {
		BROWSER_API.storage.sync.set({ themeHeaderTextColour: true });
		document.querySelector('.icon-header-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeHeaderTextColour: true });
	} else if (themeHeaderTextColour == false) {
		BROWSER_API.storage.sync.set({ themeHeaderTextColour: false });
		document.querySelector('.icon-header-text-colour').style.backgroundColor = '';
		sendMessage({ themeHeaderTextColour: false });
	}
});

// Input - Header Text Colour CSS
document.querySelector('#input-header-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-header-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themeHeaderTextColourCSS: css });
	sendMessage({ themeHeaderTextColourCSS: css });
});

// Toggle - Sort Background Colour
document.querySelector('#checkbox-sort-bg-colour').addEventListener('change', function (e) {
	const themeSortBackgroundColour = document.querySelector('#checkbox-sort-bg-colour').checked;
	if (themeSortBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themeSortBackgroundColour: true });
		document.querySelector('.icon-sort-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSortBackgroundColour: true });
	} else if (themeSortBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themeSortBackgroundColour: false });
		document.querySelector('.icon-sort-bg-colour').style.backgroundColor = '';
		sendMessage({ themeSortBackgroundColour: false });
	}
});

// Input - Sort Background Colour CSS
document.querySelector('#input-sort-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSortBackgroundColourCSS: css });
	sendMessage({ themeSortBackgroundColourCSS: css });
});

// Toggle - Sort Text Colour
document.querySelector('#checkbox-sort-text-colour').addEventListener('change', function (e) {
	const themeSortTextColour = document.querySelector('#checkbox-sort-text-colour').checked;
	if (themeSortTextColour == true) {
		BROWSER_API.storage.sync.set({ themeSortTextColour: true });
		document.querySelector('.icon-sort-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSortTextColour: true });
	} else if (themeSortTextColour == false) {
		BROWSER_API.storage.sync.set({ themeSortTextColour: false });
		document.querySelector('.icon-sort-text-colour').style.backgroundColor = '';
		sendMessage({ themeSortTextColour: false });
	}
});

// Input - Sort Text Colour CSS
document.querySelector('#input-sort-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSortTextColourCSS: css });
	sendMessage({ themeSortTextColourCSS: css });
});

// Toggle - Sort Text Colour 2
document.querySelector('#checkbox-sort-text-colour-2').addEventListener('change', function (e) {
	const themeSortTextColour2 = document.querySelector('#checkbox-sort-text-colour-2').checked;
	if (themeSortTextColour2 == true) {
		BROWSER_API.storage.sync.set({ themeSortTextColour2: true });
		document.querySelector('.icon-sort-text-colour-2').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSortTextColour2: true });
	} else if (themeSortTextColour2 == false) {
		BROWSER_API.storage.sync.set({ themeSortTextColour2: false });
		document.querySelector('.icon-sort-text-colour-2').style.backgroundColor = '';
		sendMessage({ themeSortTextColour2: false });
	}
});

// Input - Sort Text Colour 2 CSS
document.querySelector('#input-sort-text-colour-2-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-text-colour-2-css').value;
	BROWSER_API.storage.sync.set({ themeSortTextColour2CSS: css });
	sendMessage({ themeSortTextColour2CSS: css });
});

// Toggle - Sort Border Colour
document.querySelector('#checkbox-sort-border-colour').addEventListener('change', function (e) {
	const themeSortBorderColour = document.querySelector('#checkbox-sort-border-colour').checked;
	if (themeSortBorderColour == true) {
		BROWSER_API.storage.sync.set({ themeSortBorderColour: true });
		document.querySelector('.icon-sort-border-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSortBorderColour: true });
	} else if (themeSortBorderColour == false) {
		BROWSER_API.storage.sync.set({ themeSortBorderColour: false });
		document.querySelector('.icon-sort-border-colour').style.backgroundColor = '';
		sendMessage({ themeSortBorderColour: false });
	}
});

// Input - Sort Border Colour CSS
document.querySelector('#input-sort-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sort-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSortBorderColourCSS: css });
	sendMessage({ themeSortBorderColourCSS: css });
});

// Toggle - Post Background Colour
document.querySelector('#checkbox-post-bg-colour').addEventListener('change', function (e) {
	const themePostBackgroundColour = document.querySelector('#checkbox-post-bg-colour').checked;
	if (themePostBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themePostBackgroundColour: true });
		document.querySelector('.icon-post-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostBackgroundColour: true });
	} else if (themePostBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themePostBackgroundColour: false });
		document.querySelector('.icon-post-bg-colour').style.backgroundColor = '';
		sendMessage({ themePostBackgroundColour: false });
	}
});

// Input - Post Background Colour CSS
document.querySelector('#input-post-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostBackgroundColourCSS: css });
	sendMessage({ themePostBackgroundColourCSS: css });
});

// Toggle - Post Text Colour
document.querySelector('#checkbox-post-text-colour').addEventListener('change', function (e) {
	const themePostTextColour1 = document.querySelector('#checkbox-post-text-colour').checked;
	if (themePostTextColour1 == true) {
		BROWSER_API.storage.sync.set({ themePostTextColour1: true });
		document.querySelector('.icon-post-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostTextColour1: true });
	} else if (themePostTextColour1 == false) {
		BROWSER_API.storage.sync.set({ themePostTextColour1: false });
		document.querySelector('.icon-post-text-colour').style.backgroundColor = '';
		sendMessage({ themePostTextColour1: false });
	}
});

// Input - Post Text Colour CSS
document.querySelector('#input-post-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostTextColour1CSS: css });
	sendMessage({ themePostTextColour1CSS: css });
});

// Toggle - Post Comments Text Colour
document.querySelector('#checkbox-post-comments-text-colour').addEventListener('change', function (e) {
	const themePostCommentsTextColour1 = document.querySelector('#checkbox-post-comments-text-colour').checked;
	if (themePostCommentsTextColour1 == true) {
		BROWSER_API.storage.sync.set({ themePostCommentsTextColour1: true });
		document.querySelector('.icon-post-comments-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostCommentsTextColour1: true });
	} else if (themePostCommentsTextColour1 == false) {
		BROWSER_API.storage.sync.set({ themePostCommentsTextColour1: false });
		document.querySelector('.icon-post-comments-text-colour').style.backgroundColor = '';
		sendMessage({ themePostCommentsTextColour1: false });
	}
});

// Input - Post Comments Text Colour CSS
document.querySelector('#input-post-comments-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-comments-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostCommentsTextColour1CSS: css });
	sendMessage({ themePostCommentsTextColour1CSS: css });
});

// Toggle - Post Comments Secondary Text Colour
document.querySelector('#checkbox-post-comments-secondary-text-colour').addEventListener('change', function (e) {
	const themePostCommentsTextColour2 = document.querySelector('#checkbox-post-comments-secondary-text-colour').checked;
	if (themePostCommentsTextColour2 == true) {
		BROWSER_API.storage.sync.set({ themePostCommentsTextColour2: true });
		document.querySelector('.icon-post-comments-secondary-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostCommentsTextColour2: true });
	} else if (themePostCommentsTextColour2 == false) {
		BROWSER_API.storage.sync.set({ themePostCommentsTextColour2: false });
		document.querySelector('.icon-post-comments-secondary-text-colour').style.backgroundColor = '';
		sendMessage({ themePostCommentsTextColour2: false });
	}
});

// Input - Post Comments Secondary Text Colour CSS
document.querySelector('#input-post-comments-secondary-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-comments-secondary-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostCommentsTextColour2CSS: css });
	sendMessage({ themePostCommentsTextColour2CSS: css });
});

// Toggle - Post Visited Text Colour
document.querySelector('#checkbox-post-visited-text-colour').addEventListener('change', function (e) {
	const themePostVisitedTextColour = document.querySelector('#checkbox-post-visited-text-colour').checked;
	BROWSER_API.storage.sync.set({ themePostVisitedTextColour: themePostVisitedTextColour });
	document.querySelector('.icon-post-visited-text-colour').style.backgroundColor = themePostVisitedTextColour ? 'var(--accent)' : '';
	sendMessage({ themePostVisitedTextColour: themePostVisitedTextColour });
});

// Input - Post Visited Text Colour CSS
document.querySelector('#input-post-visited-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-visited-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostVisitedTextColourCSS: css });
	sendMessage({ themePostVisitedTextColourCSS: css });
});

// Toggle - Post Text Secondary Colour
document.querySelector('#checkbox-post-text-colour-2').addEventListener('change', function (e) {
	const themePostTextColour2 = document.querySelector('#checkbox-post-text-colour-2').checked;
	if (themePostTextColour2 == true) {
		BROWSER_API.storage.sync.set({ themePostTextColour2: true });
		document.querySelector('.icon-post-text-colour-2').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostTextColour2: true });
	} else if (themePostTextColour2 == false) {
		BROWSER_API.storage.sync.set({ themePostTextColour2: false });
		document.querySelector('.icon-post-text-colour-2').style.backgroundColor = '';
		sendMessage({ themePostTextColour2: false });
	}
});

// Input - Post Text Colour 2 CSS
document.querySelector('#input-post-text-colour-2-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-text-colour-2-css').value;
	BROWSER_API.storage.sync.set({ themePostTextColour2CSS: css });
	sendMessage({ themePostTextColour2CSS: css });
});

// Toggle - Post Border Colour
document.querySelector('#checkbox-post-border-colour').addEventListener('change', function (e) {
	const themePostBorderColour = document.querySelector('#checkbox-post-border-colour').checked;
	if (themePostBorderColour == true) {
		BROWSER_API.storage.sync.set({ themePostBorderColour: true });
		document.querySelector('.icon-post-border-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostBorderColour: true });
	} else if (themePostBorderColour == false) {
		BROWSER_API.storage.sync.set({ themePostBorderColour: false });
		document.querySelector('.icon-post-border-colour').style.backgroundColor = '';
		sendMessage({ themePostBorderColour: false });
	}
});

// Input - Post Border Colour CSS
document.querySelector('#input-post-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostBorderColourCSS: css });
	sendMessage({ themePostBorderColourCSS: css });
});

// Slider - Theme Blur
document.querySelector('#input-theme-blur').addEventListener('input', function (e) {
	// set ui
	if (e.target.value != 0) {
		document.querySelector('.icon-theme-blur').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-theme-blur').style.backgroundColor = '';
	}
	document.querySelector('#theme-blur-value').innerText = e.target.value + 'px';
	// apply
	sendMessage({ themeBlur: e.target.value });
});
document.querySelector('#input-theme-blur').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ themeBlur: e.target.value });
});

// Toggle - Theme Exceptions
document.querySelector('#checkbox-theme-exceptions-enable').addEventListener('change', function (e) {
	const themeExceptionsEnable = document.querySelector('#checkbox-theme-exceptions-enable').checked;
	if (themeExceptionsEnable == true) {
		BROWSER_API.storage.sync.set({ themeExceptionsEnable: true });
		document.querySelector('.icon-theme-exceptions').style.backgroundColor = 'var(--accent)';
	} else if (themeExceptionsEnable == false) {
		BROWSER_API.storage.sync.set({ themeExceptionsEnable: false });
		document.querySelector('.icon-theme-exceptions').style.backgroundColor = '';
	}
});

// Button - Theme Whitelist
document.querySelector('#btn-theme-whitelist').addEventListener('click', function (e) {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-theme-whitelist').nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'whitelist' });
});

// Button - Theme Blacklist
document.querySelector('#btn-theme-blacklist').addEventListener('click', function (e) {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-theme-blacklist').previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'blacklist' });
});

// Textarea - Theme Exceptions
document.querySelector('#input-theme-exceptions').addEventListener('keyup', function (e) {
	const value = e.target.value;
	BROWSER_API.storage.sync.set({ themeExceptionSubList: value });
});

// Toggle - Create Post Background Colour
document.querySelector('#checkbox-create-post-bg-colour').addEventListener('change', function (e) {
	const themeCreatePostBackgroundColour = document.querySelector('#checkbox-create-post-bg-colour').checked;
	if (themeCreatePostBackgroundColour == true) {
		BROWSER_API.storage.sync.set({ themeCreatePostBackgroundColour: true });
		document.querySelector('.icon-create-post-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeCreatePostBackgroundColour: true });
	} else if (themeCreatePostBackgroundColour == false) {
		BROWSER_API.storage.sync.set({ themeCreatePostBackgroundColour: false });
		document.querySelector('.icon-create-post-bg-colour').style.backgroundColor = '';
		sendMessage({ themeCreatePostBackgroundColour: false });
	}
});

// Input - Create Post Background Colour CSS
document.querySelector('#input-create-post-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-create-post-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeCreatePostBackgroundColourCSS: css });
	sendMessage({ themeCreatePostBackgroundColourCSS: css });
});

// Toggle - Create Post Border Colour
document.querySelector('#checkbox-create-post-border-colour').addEventListener('change', function (e) {
	const themeCreatePostBorderColour = document.querySelector('#checkbox-create-post-border-colour').checked;
	if (themeCreatePostBorderColour == true) {
		BROWSER_API.storage.sync.set({ themeCreatePostBorderColour: true });
		document.querySelector('.icon-create-post-border-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeCreatePostBorderColour: true });
	} else if (themeCreatePostBorderColour == false) {
		BROWSER_API.storage.sync.set({ themeCreatePostBorderColour: false });
		document.querySelector('.icon-create-post-border-colour').style.backgroundColor = '';
		sendMessage({ themeCreatePostBorderColour: false });
	}
});

// Input - Create Post Border Colour CSS
document.querySelector('#input-create-post-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-create-post-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themeCreatePostBorderColourCSS: css });
	sendMessage({ themeCreatePostBorderColourCSS: css });
});

// Toggle - Larger Classic Post
document.querySelector('#checkbox-larger-classic-post').addEventListener('change', function (e) {
	const largerClassicPost = document.querySelector('#checkbox-larger-classic-post').checked;
	if (largerClassicPost == true) {
		BROWSER_API.storage.sync.set({ largerClassicPost: true });
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = 'var(--accent)';
		sendMessage({ largerClassicPost: true });
	} else if (largerClassicPost == false) {
		BROWSER_API.storage.sync.set({ largerClassicPost: false });
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = '';
		sendMessage({ largerClassicPost: false });
	}
});

// Toggle - Sidebar Text Colour
document.querySelector('#checkbox-sidebar-text-colour').addEventListener('change', function (e) {
	const themeSidebarTextColour = document.querySelector('#checkbox-sidebar-text-colour').checked;
	if (themeSidebarTextColour == true) {
		BROWSER_API.storage.sync.set({ themeSidebarTextColour: true });
		document.querySelector('.icon-sidebar-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSidebarTextColour: true });
	} else if (themeSidebarTextColour == false) {
		BROWSER_API.storage.sync.set({ themeSidebarTextColour: false });
		document.querySelector('.icon-sidebar-text-colour').style.backgroundColor = '';
		sendMessage({ themeSidebarTextColour: false });
	}
});

// Input - Sidebar Text Colour CSS
document.querySelector('#input-sidebar-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sidebar-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSidebarTextColourCSS: css });
	sendMessage({ themeSidebarTextColourCSS: css });
});

// Toggle - Sidebar Background Colour
document.querySelector('#checkbox-sidebar-bg-colour').addEventListener('change', function (e) {
	const themeSidebarBgColour = document.querySelector('#checkbox-sidebar-bg-colour').checked;
	if (themeSidebarBgColour == true) {
		BROWSER_API.storage.sync.set({ themeSidebarBgColour: true });
		document.querySelector('.icon-sidebar-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSidebarBgColour: true });
	} else if (themeSidebarBgColour == false) {
		BROWSER_API.storage.sync.set({ themeSidebarBgColour: false });
		document.querySelector('.icon-sidebar-bg-colour').style.backgroundColor = '';
		sendMessage({ themeSidebarBgColour: false });
	}
});

// Input - Sidebar Background Colour CSS
document.querySelector('#input-sidebar-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sidebar-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSidebarBgColourCSS: css });
	sendMessage({ themeSidebarBgColourCSS: css });
});

// Toggle - Sidemenu Text Colour
document.querySelector('#checkbox-sidemenu-text-colour').addEventListener('change', function (e) {
	const themeSidemenuTextColour = document.querySelector('#checkbox-sidemenu-text-colour').checked;
	if (themeSidemenuTextColour == true) {
		BROWSER_API.storage.sync.set({ themeSidemenuTextColour: true });
		document.querySelector('.icon-sidemenu-text-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSidemenuTextColour: true });
	} else if (themeSidemenuTextColour == false) {
		BROWSER_API.storage.sync.set({ themeSidemenuTextColour: false });
		document.querySelector('.icon-sidemenu-text-colour').style.backgroundColor = '';
		sendMessage({ themeSidemenuTextColour: false });
	}
});

// Input - Sidemenu Text Colour CSS
document.querySelector('#input-sidemenu-text-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sidemenu-text-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSidemenuTextColourCSS: css });
	sendMessage({ themeSidemenuTextColourCSS: css });
});

// Toggle - Sidemenu Background Colour
document.querySelector('#checkbox-sidemenu-bg-colour').addEventListener('change', function (e) {
	const themeSidemenuBgColour = document.querySelector('#checkbox-sidemenu-bg-colour').checked;
	if (themeSidemenuBgColour == true) {
		BROWSER_API.storage.sync.set({ themeSidemenuBgColour: true });
		document.querySelector('.icon-sidemenu-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSidemenuBgColour: true });
	} else if (themeSidemenuBgColour == false) {
		BROWSER_API.storage.sync.set({ themeSidemenuBgColour: false });
		document.querySelector('.icon-sidemenu-bg-colour').style.backgroundColor = '';
		sendMessage({ themeSidemenuBgColour: false });
	}
});

// Input - Sidemenu Background Colour CSS
document.querySelector('#input-sidemenu-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sidemenu-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSidemenuBgColourCSS: css });
	sendMessage({ themeSidemenuBgColourCSS: css });
});

// Toggle - Sidebar Border Colour
document.querySelector('#checkbox-sidebar-border-colour').addEventListener('change', function (e) {
	const themeSidebarBorderColour = document.querySelector('#checkbox-sidebar-border-colour').checked;
	if (themeSidebarBorderColour == true) {
		BROWSER_API.storage.sync.set({ themeSidebarBorderColour: true });
		document.querySelector('.icon-sidebar-border-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSidebarBorderColour: true });
	} else if (themeSidebarBorderColour == false) {
		BROWSER_API.storage.sync.set({ themeSidebarBorderColour: false });
		document.querySelector('.icon-sidebar-border-colour').style.backgroundColor = '';
		sendMessage({ themeSidebarBorderColour: false });
	}
});

// Input - Sidebar Border Colour CSS
document.querySelector('#input-sidebar-border-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sidebar-border-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSidebarBorderColourCSS: css });
	sendMessage({ themeSidebarBorderColourCSS: css });
});

// Toggle - Sidemenu Button Hover Colour
document.querySelector('#checkbox-sidemenu-button-hover-colour').addEventListener('change', function (e) {
	const themeSidemenuButtonHoverColour = document.querySelector('#checkbox-sidemenu-button-hover-colour').checked;
	if (themeSidemenuButtonHoverColour == true) {
		BROWSER_API.storage.sync.set({ themeSidemenuButtonHoverColour: true });
		document.querySelector('.icon-sidemenu-button-hover-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSidemenuButtonHoverColour: true });
	} else if (themeSidemenuButtonHoverColour == false) {
		BROWSER_API.storage.sync.set({ themeSidemenuButtonHoverColour: false });
		document.querySelector('.icon-sidemenu-button-hover-colour').style.backgroundColor = '';
		sendMessage({ themeSidemenuButtonHoverColour: false });
	}
});

// Input - Sidemenu Button Hover Colour CSS
document.querySelector('#input-sidemenu-button-hover-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-sidemenu-button-hover-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSidemenuButtonHoverColourCSS: css });
	sendMessage({ themeSidemenuButtonHoverColourCSS: css });
});

// Toggle - Post Content And Comments Link Colour
document.querySelector('#checkbox-post-content-and-comments-link-colour').addEventListener('change', function (e) {
	const themePostContentAndCommentsLinkColour = document.querySelector('#checkbox-post-content-and-comments-link-colour').checked;
	if (themePostContentAndCommentsLinkColour == true) {
		BROWSER_API.storage.sync.set({ themePostContentAndCommentsLinkColour: true });
		document.querySelector('.icon-post-content-and-comments-link-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostContentAndCommentsLinkColour: true });
	} else if (themePostContentAndCommentsLinkColour == false) {
		BROWSER_API.storage.sync.set({ themePostContentAndCommentsLinkColour: false });
		document.querySelector('.icon-post-content-and-comments-link-colour').style.backgroundColor = '';
		sendMessage({ themePostContentAndCommentsLinkColour: false });
	}
});

// Input - Post Content And Comments Link Colour CSS
document.querySelector('#input-post-content-and-comments-link-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-content-and-comments-link-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostContentAndCommentsLinkColourCSS: css });
	sendMessage({ themePostContentAndCommentsLinkColourCSS: css });
});

// Toggle - Searchbar Background Colour
document.querySelector('#checkbox-searchbar-bg-colour').addEventListener('change', function (e) {
	const themeSearchbarBgColour = document.querySelector('#checkbox-searchbar-bg-colour').checked;
	if (themeSearchbarBgColour == true) {
		BROWSER_API.storage.sync.set({ themeSearchbarBgColour: true });
		document.querySelector('.icon-searchbar-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSearchbarBgColour: true });
	} else if (themeSearchbarBgColour == false) {
		BROWSER_API.storage.sync.set({ themeSearchbarBgColour: false });
		document.querySelector('.icon-searchbar-bg-colour').style.backgroundColor = '';
		sendMessage({ themeSearchbarBgColour: false });
	}
});

// Input - Searchbar Background Colour CSS
document.querySelector('#input-searchbar-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-searchbar-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSearchbarBgColourCSS: css });
	sendMessage({ themeSearchbarBgColourCSS: css });
});

// Toggle - Searchbar Focused/Dropdown Background Colour
document.querySelector('#checkbox-searchbar-dropdown-bg-colour').addEventListener('change', function (e) {
	const themeSearchbarDropdownBgColour = document.querySelector('#checkbox-searchbar-dropdown-bg-colour').checked;
	if (themeSearchbarDropdownBgColour == true) {
		BROWSER_API.storage.sync.set({ themeSearchbarDropdownBgColour: true });
		document.querySelector('.icon-searchbar-dropdown-bg-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themeSearchbarDropdownBgColour: true });
	} else if (themeSearchbarDropdownBgColour == false) {
		BROWSER_API.storage.sync.set({ themeSearchbarDropdownBgColour: false });
		document.querySelector('.icon-searchbar-dropdown-bg-colour').style.backgroundColor = '';
		sendMessage({ themeSearchbarDropdownBgColour: false });
	}
});

// Input - Searchbar Focused/Dropdown Background Colour CSS
document.querySelector('#input-searchbar-dropdown-bg-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-searchbar-dropdown-bg-colour-css').value;
	BROWSER_API.storage.sync.set({ themeSearchbarDropdownBgColourCSS: css });
	sendMessage({ themeSearchbarDropdownBgColourCSS: css });
});

// Slider - Theme Border Radius Amount
document.querySelector('#input-border-radius-amount').addEventListener('input', function (e) {
	document.querySelector('#border-radius-amount-value').textContent = e.target.value != -1 ? e.target.value + 'px' : '';
	document.querySelector('.icon-border-radius-amount').style.backgroundColor = e.target.value != -1 ? 'var(--accent)' : '';
	sendMessage({ borderRadiusAmount: e.target.value });
});
document.querySelector('#input-border-radius-amount').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ borderRadiusAmount: e.target.value });
});

// Toggle - Post Upvote Colour
document.querySelector('#checkbox-post-upvote-colour').addEventListener('change', function (e) {
	const themePostUpvoteColour = document.querySelector('#checkbox-post-upvote-colour').checked;
	if (themePostUpvoteColour == true) {
		BROWSER_API.storage.sync.set({ themePostUpvoteColour: true });
		document.querySelector('.icon-post-upvote-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostUpvoteColour: true });
	} else if (themePostUpvoteColour == false) {
		BROWSER_API.storage.sync.set({ themePostUpvoteColour: false });
		document.querySelector('.icon-post-upvote-colour').style.backgroundColor = '';
		sendMessage({ themePostUpvoteColour: false });
	}
});

// Input - Post Upvote Colour CSS
document.querySelector('#input-post-upvote-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-upvote-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostUpvoteColourCSS: css });
	sendMessage({ themePostUpvoteColourCSS: css });
});

// Toggle - Post Comment Action Row Colour
document.querySelector('#checkbox-post-comment-action-row-colour').addEventListener('change', function (e) {
	const themePostCommentActionRowColour = document.querySelector('#checkbox-post-comment-action-row-colour').checked;
	if (themePostCommentActionRowColour == true) {
		BROWSER_API.storage.sync.set({ themePostCommentActionRowColour: true });
		document.querySelector('.icon-post-comment-action-row-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostCommentActionRowColour: true });
	} else if (themePostCommentActionRowColour == false) {
		BROWSER_API.storage.sync.set({ themePostCommentActionRowColour: false });
		document.querySelector('.icon-post-comment-action-row-colour').style.backgroundColor = '';
		sendMessage({ themePostCommentActionRowColour: false });
	}
});

// Input - Post Comment Action Row Colour CSS
document.querySelector('#input-post-comment-action-row-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-post-comment-action-row-colour-css').value;
	BROWSER_API.storage.sync.set({ themePostCommentActionRowColourCSS: css });
	sendMessage({ themePostCommentActionRowColourCSS: css });
});

// Toggle - Full Width Banner
document.querySelector('#checkbox-full-width-banner').addEventListener('change', function (e) {
	const fullWidthBanner = document.querySelector('#checkbox-full-width-banner').checked;
	if (fullWidthBanner) {
		document.querySelector('.icon-full-width-banner').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-full-width-banner').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ fullWidthBanner: fullWidthBanner });
	sendMessage({ fullWidthBanner: fullWidthBanner });
});

// Toggle - Compact Header Bar & Side Menu
document.querySelector('#checkbox-compact-header-side-menu').addEventListener('change', function (e) {
	const compactHeaderSideMenu = document.querySelector('#checkbox-compact-header-side-menu').checked;
	if (compactHeaderSideMenu) {
		document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ compactHeaderSideMenu: compactHeaderSideMenu });
	sendMessage({ compactHeaderSideMenu: compactHeaderSideMenu });
});

// Toggle - Classic Old Header
document.querySelector('#checkbox-classic-old-ui').addEventListener('change', function (e) {
	const classicOldUI = document.querySelector('#checkbox-classic-old-ui').checked;
	if (classicOldUI) {
		document.querySelector('.icon-classic-old-ui').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-classic-old-ui').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ classicOldUI: classicOldUI });
	sendMessage({ classicOldUI: classicOldUI });
});

// Toggle - Multicoloured Post Page Comment Thread Lines
document.querySelector('#checkbox-multicoloured-comment-thread-lines').addEventListener('change', function (e) {
	const multicolouredThreadLines = document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked;
	if (multicolouredThreadLines) {
		document.querySelector('.icon-multicoloured-comment-thread-lines').style.backgroundColor = 'var(--accent)';
	} else {
		document.querySelector('.icon-multicoloured-comment-thread-lines').style.backgroundColor = '';
	}
	BROWSER_API.storage.sync.set({ multicolouredThreadLines: multicolouredThreadLines });
	sendMessage({ multicolouredThreadLines: multicolouredThreadLines });
});

// Input - Multicoloured Post Page Comment Thread Lines Colour List
document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').addEventListener('input', function (e) {
	const multicolouredThreadLines = document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked;
	const list_value = document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').value;
	BROWSER_API.storage.sync.set({ multicolouredThreadLinesColours: list_value });
	sendMessage({ multicolouredThreadLines: { multicolouredThreadLines, list_value } });
});

// Toggle - Post Table Border Colour
document.querySelector('#checkbox-post-table-border-colour').addEventListener('change', function (e) {
	const themePostTableBorderColour = document.querySelector('#checkbox-post-table-border-colour').checked;
	if (themePostTableBorderColour) {
		BROWSER_API.storage.sync.set({ themePostTableBorderColour: true });
		document.querySelector('.icon-post-table-border-colour').style.backgroundColor = 'var(--accent)';
		sendMessage({ themePostTableBorderColour: true });
	} else {
		BROWSER_API.storage.sync.set({ themePostTableBorderColour: false });
		document.querySelector('.icon-post-table-border-colour').style.backgroundColor = '';
		sendMessage({ themePostTableBorderColour: false });
	}
});

// Input - Code Block Colour CSS
document.querySelector('#input-code-block-colour-css').addEventListener('keyup', function (e) {
	const css = document.querySelector('#input-code-block-colour-css').value;
	BROWSER_API.storage.sync.set({ themeCodeBlockColourCSS: css });
	sendMessage({ themeCodeBlockColourCSS: css });
});

// Toggle - Custom Header Logo
document.querySelector('#checkbox-custom-header-logo').addEventListener('change', function (e) {
	const customHeaderLogo = document.querySelector('#checkbox-custom-header-logo').checked;
	if (customHeaderLogo) {
		BROWSER_API.storage.sync.set({ customHeaderLogo: true });
		document.querySelector('.icon-custom-header-logo').style.backgroundColor = 'var(--accent)';
		sendMessage({ customHeaderLogo: true });
	} else {
		BROWSER_API.storage.sync.set({ customHeaderLogo: false });
		document.querySelector('.icon-custom-header-logo').style.backgroundColor = '';
		sendMessage({ customHeaderLogo: false });
	}
});

// Input - Custom Header Logo URL
document.querySelector('#input-custom-header-logo-url').addEventListener('keyup', function (e) {
	const url = document.querySelector('#input-custom-header-logo-url').value;
	BROWSER_API.storage.sync.set({ customHeaderLogoUrl: url });
	sendMessage({ setCustomHeaderLogoUrl: url });
});

// Toggle - Attach Side Menu Header
document.querySelector('#checkbox-attach-side-menu-header').addEventListener('change', function (e) {
	const attachSideMenuHeader = document.querySelector('#checkbox-attach-side-menu-header').checked;
	if (attachSideMenuHeader) {
		BROWSER_API.storage.sync.set({ attachSideMenuHeader: true });
		document.querySelector('.icon-attach-side-menu-header').style.backgroundColor = 'var(--accent)';
		sendMessage({ attachSideMenuHeader: true });
	} else {
		BROWSER_API.storage.sync.set({ attachSideMenuHeader: false });
		document.querySelector('.icon-attach-side-menu-header').style.backgroundColor = '';
		sendMessage({ attachSideMenuHeader: false });
	}
});

// Toggle - Opt Out Attach Side Menu
document.querySelector('#checkbox-opt-out-attach-side-menu').addEventListener('change', function (e) {
	const optOutAttachSideMenu = document.querySelector('#checkbox-opt-out-attach-side-menu').checked;
	if (optOutAttachSideMenu) {
		BROWSER_API.storage.sync.set({ optOutAttachSideMenu: true });
		document.querySelector('.icon-opt-out-attach-side-menu').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-opt-out-attach-side-menu').classList.remove('icon-dropdown');
		document.querySelector('.icon-opt-out-attach-side-menu').classList.add('icon-dropdown-slash');
		sendMessage({ optOutAttachSideMenu: true });
	} else {
		BROWSER_API.storage.sync.set({ optOutAttachSideMenu: false });
		document.querySelector('.icon-opt-out-attach-side-menu').style.backgroundColor = '';
		document.querySelector('.icon-opt-out-attach-side-menu').classList.remove('icon-dropdown-slash');
		document.querySelector('.icon-opt-out-attach-side-menu').classList.add('icon-dropdown');
		sendMessage({ optOutAttachSideMenu: false });
	}
});

// Toggle - Left Side Vote Buttons
document.querySelector('#checkbox-left-side-vote-buttons').addEventListener('change', function (e) {
	const leftSideVoteButtons = document.querySelector('#checkbox-left-side-vote-buttons').checked;
	if (leftSideVoteButtons) {
		BROWSER_API.storage.sync.set({ leftSideVoteButtons: true });
		document.querySelector('.icon-left-side-vote-buttons').style.backgroundColor = 'var(--accent)';
		sendMessage({ leftSideVoteButtons: true });
	} else {
		BROWSER_API.storage.sync.set({ leftSideVoteButtons: false });
		document.querySelector('.icon-left-side-vote-buttons').style.backgroundColor = '';
		sendMessage({ leftSideVoteButtons: false });
	}
});

// Toggle - Subreddit Display Name Banner
document.querySelector('#checkbox-subreddit-display-name-banner').addEventListener('change', function (e) {
	const subredditDisplayNameBanner = document.querySelector('#checkbox-subreddit-display-name-banner').checked;
	if (subredditDisplayNameBanner) {
		BROWSER_API.storage.sync.set({ subredditDisplayNameBanner: true });
		document.querySelector('.icon-subreddit-display-name-banner').style.backgroundColor = 'var(--accent)';
		sendMessage({ subredditDisplayNameBanner: true });
	} else {
		BROWSER_API.storage.sync.set({ subredditDisplayNameBanner: false });
		document.querySelector('.icon-subreddit-display-name-banner').style.backgroundColor = '';
		sendMessage({ subredditDisplayNameBanner: false });
	}
});

// Toggle - Right Side Post Thumbnails
document.querySelector('#checkbox-right-side-post-thumbnails').addEventListener('change', function (e) {
	const rightSidePostThumbnails = document.querySelector('#checkbox-right-side-post-thumbnails').checked;
	if (rightSidePostThumbnails) {
		BROWSER_API.storage.sync.set({ rightSidePostThumbnails: true });
		document.querySelector('.icon-right-side-post-thumbnails').style.backgroundColor = 'var(--accent)';
		sendMessage({ rightSidePostThumbnails: true });
	} else {
		BROWSER_API.storage.sync.set({ rightSidePostThumbnails: false });
		document.querySelector('.icon-right-side-post-thumbnails').style.backgroundColor = '';
		sendMessage({ rightSidePostThumbnails: false });
	}
});
