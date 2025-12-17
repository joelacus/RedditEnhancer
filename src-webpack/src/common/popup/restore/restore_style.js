/* ===== Restore Popup UI / Style ===== */

import { highlightMenuIcon } from '../popup_restore';

// Restore UI settings for "Style" options.

export function restorePopupStyleOptions() {
	// Border Radius Amount
	BROWSER_API.storage.sync.get(['borderRadiusAmount'], function (result) {
		if (parseInt(result.borderRadiusAmount) >= 0) {
			document.querySelector('#input-border-radius-amount').value = result.borderRadiusAmount;
			document.querySelector('#border-radius-amount-value').textContent = result.borderRadiusAmount + 'px';
			document.querySelector('.icon-border-radius-amount').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('style-tweaks');
			var value = result.borderRadiusAmount + 'px';
		} else {
			document.querySelector('#input-border-radius-amount').value = -1;
			document.querySelector('#border-radius-amount-value').textContent = '';
			var value = 'false';
		}
		console.log('Border Radius Amount: ' + value);
	});

	// Add Drop Shadow
	BROWSER_API.storage.sync.get(['addDropShadow'], function (result) {
		if (result.addDropShadow == true) {
			document.querySelector('#checkbox-add-drop-shadow').checked = true;
			document.querySelector('.icon-add-drop-shadow').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-add-drop-shadow').classList.add('icon-light-on');
			document.querySelector('.icon-add-drop-shadow').classList.remove('icon-light-off');
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.addDropShadow == 'undefined' || result.addDropShadow == false) {
			document.querySelector('#checkbox-add-drop-shadow').checked = false;
			var value = false;
		}
		console.log('Add Drop Shadows: ' + value);
	});

	// Override Drop Shadow
	BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
		if (result.overrideDropShadow == true) {
			document.querySelector('.icon-drop-shadow-override').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-shadow-override').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.overrideDropShadow == 'undefined' || result.overrideDropShadow == false) {
			document.querySelector('#checkbox-shadow-override').checked = false;
			var value = false;
		}
		console.log('Override Drop Shadow: ' + value);
	});

	// Override Drop Shadow CSS
	BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
		if (typeof result.overrideDropShadowCSS != 'undefined') {
			document.querySelector('#input-shadow-override-css').value = result.overrideDropShadowCSS;
			var value = result.overrideDropShadowCSS;
		} else {
			document.querySelector('#input-shadow-override-css').value = '';
			var value = '';
		}
		console.log('Override Drop Shadow CSS: ' + value);
	});

	// Modernise Old Reddit
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		if (result.moderniseOldReddit == true) {
			document.querySelector('#checkbox-modern-old-reddit').checked = true;
			document.querySelector('.icon-modern-old-reddit').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.moderniseOldReddit == 'undefined' || result.moderniseOldReddit == false) {
			document.querySelector('#checkbox-modern-old-reddit').checked = false;
			var value = false;
		}
		console.log('Modernise Old Reddit: ' + value);
	});

	// Sidebar Text Colour
	BROWSER_API.storage.sync.get(['themeSidebarTextColour'], function (result) {
		if (result.themeSidebarTextColour == true) {
			document.querySelector('.icon-sidebar-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sidebar-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSidebarTextColour == 'undefined' || result.themeSidebarTextColour == false) {
			document.querySelector('#checkbox-sidebar-text-colour').checked = false;
			var value = false;
		}
		console.log('Sidebar Text Colour: ' + value);
	});

	// Sidebar Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSidebarTextColourCSS'], function (result) {
		const value = result.themeSidebarTextColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'sidebar-fg')?.picker;
		get_picker.setColor(value);
		console.log('Sidebar Text Colour CSS: ' + value);
	});

	// Sidebar Background Colour
	BROWSER_API.storage.sync.get(['themeSidebarBgColour'], function (result) {
		if (result.themeSidebarBgColour == true) {
			document.querySelector('.icon-sidebar-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sidebar-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSidebarBgColour == 'undefined' || result.themeSidebarBgColour == false) {
			document.querySelector('#checkbox-sidebar-bg-colour').checked = false;
			var value = false;
		}
		console.log('Sidebar Background Colour: ' + value);
	});

	// Sidebar Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSidebarBgColourCSS'], function (result) {
		const value = result.themeSidebarBgColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'sidebar-bg')?.picker;
		get_picker.setColor(value);
		console.log('Sidebar Background Colour CSS: ' + value);
	});

	// Side Menu Text Colour
	BROWSER_API.storage.sync.get(['themeSidemenuTextColour'], function (result) {
		if (result.themeSidemenuTextColour == true) {
			document.querySelector('.icon-sidemenu-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sidemenu-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSidemenuTextColour == 'undefined' || result.themeSidemenuTextColour == false) {
			document.querySelector('#checkbox-sidemenu-text-colour').checked = false;
			var value = false;
		}
		console.log('Side Menu Text Colour: ' + value);
	});

	// Side Menu Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
		const value = result.themeSidemenuTextColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'sidemenu-fg')?.picker;
		get_picker.setColor(value);
		console.log('Side Menu Text Colour CSS: ' + value);
	});

	// Side Menu Background Colour
	BROWSER_API.storage.sync.get(['themeSidemenuBgColour'], function (result) {
		if (result.themeSidemenuBgColour == true) {
			document.querySelector('.icon-sidemenu-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sidemenu-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSidemenuBgColour == 'undefined' || result.themeSidemenuBgColour == false) {
			document.querySelector('#checkbox-sidemenu-bg-colour').checked = false;
			var value = false;
		}
		console.log('Side Menu Background Colour: ' + value);
	});

	// Side Menu Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
		const value = result.themeSidemenuBgColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'sidemenu-bg')?.picker;
		get_picker.setColor(value);
		console.log('Side Menu Background Colour CSS: ' + value);
	});

	// Side Menu Button Hover Colour
	BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColour'], function (result) {
		if (result.themeSidemenuButtonHoverColour == true) {
			document.querySelector('.icon-sidemenu-button-hover-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sidemenu-button-hover-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSidemenuButtonHoverColour == 'undefined' || result.themeSidemenuButtonHoverColour == false) {
			document.querySelector('#checkbox-sidemenu-button-hover-colour').checked = false;
			var value = false;
		}
		console.log('Side Menu Button Hover Colour: ' + value);
	});

	// Side Menu Button Hover Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColourCSS'], function (result) {
		const value = result.themeSidemenuButtonHoverColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'sidemenu-btn-hover')?.picker;
		get_picker.setColor(value);
		console.log('Side Menu Button Hover Colour CSS: ' + value);
	});

	// Post Content And Comments Link Colour
	BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColour'], function (result) {
		if (result.themePostContentAndCommentsLinkColour == true) {
			document.querySelector('.icon-post-content-and-comments-link-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-content-and-comments-link-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostContentAndCommentsLinkColour == 'undefined' || result.themePostContentAndCommentsLinkColour == false) {
			document.querySelector('#checkbox-post-content-and-comments-link-colour').checked = false;
			var value = false;
		}
		console.log('Post Content And Comments Link Colour: ' + value);
	});

	// Post Content And Comments Link Colour CSS
	BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColourCSS'], function (result) {
		const value = result.themePostContentAndCommentsLinkColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-and-comment-links')?.picker;
		get_picker.setColor(value);
		console.log('Post Content And Comments Link Colour CSS: ' + value);
	});

	// Searchbar Background Colour
	BROWSER_API.storage.sync.get(['themeSearchbarBgColour'], function (result) {
		if (result.themeSearchbarBgColour == true) {
			document.querySelector('.icon-searchbar-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-searchbar-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSearchbarBgColour == 'undefined' || result.themeSearchbarBgColour == false) {
			document.querySelector('#checkbox-searchbar-bg-colour').checked = false;
			var value = false;
		}
		console.log('Searchbar Background Colour: ' + value);
	});

	// Searchbar Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSearchbarBgColourCSS'], function (result) {
		const value = result.themeSearchbarBgColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'searchbar-bg')?.picker;
		get_picker.setColor(value);
		console.log('Searchbar Background Colour CSS: ' + value);
	});

	// Searchbar Focused/Dropdown Background Colour
	BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColour'], function (result) {
		if (result.themeSearchbarDropdownBgColour == true) {
			document.querySelector('.icon-searchbar-dropdown-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-searchbar-dropdown-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSearchbarDropdownBgColour == 'undefined' || result.themeSearchbarDropdownBgColour == false) {
			document.querySelector('#checkbox-searchbar-dropdown-bg-colour').checked = false;
			var value = false;
		}
		console.log('Searchbar Focused/Dropdown Background Colour: ' + value);
	});

	// Searchbar Focused/Dropdown Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColourCSS'], function (result) {
		const value = result.themeSearchbarDropdownBgColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'searchbar-dropdown-bg')?.picker;
		get_picker.setColor(value);
		console.log('Searchbar Focused/Dropdown Background Colour CSS: ' + value);
	});

	// Theme Header Background Colour
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
		if (result.themeHeaderBackgroundColour == true) {
			document.querySelector('.icon-header-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-header-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeHeaderBackgroundColour == 'undefined' || result.themeHeaderBackgroundColour == false) {
			document.querySelector('#checkbox-header-bg-colour').checked = false;
			var value = false;
		}
		console.log('Header Background Colour: ' + value);
	});

	// Theme Header Background Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
		const value = result.themeHeaderBackgroundColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'header-bg')?.picker;
		get_picker.setColor(value);
		console.log('Header Background Colour CSS: ' + value);
	});

	// Theme Header Text Colour
	BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
		if (result.themeHeaderTextColour == true) {
			document.querySelector('.icon-header-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-header-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeHeaderTextColour == 'undefined' || result.themeHeaderTextColour == false) {
			document.querySelector('#checkbox-header-text-colour').checked = false;
			var value = false;
		}
		console.log('Header Text Colour: ' + value);
	});

	// Theme Header Text Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
		const value = result.themeHeaderTextColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'header-fg')?.picker;
		get_picker.setColor(value);
		console.log('Header Text Colour CSS: ' + value);
	});

	// Theme Post Background Colour
	BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
		if (result.themePostBackgroundColour == true) {
			document.querySelector('.icon-post-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostBackgroundColour == 'undefined' || result.themePostBackgroundColour == false) {
			document.querySelector('#checkbox-post-bg-colour').checked = false;
			var value = false;
		}
		console.log('Post Background Colour: ' + value);
	});

	// Theme Post Background Colour CSS
	BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
		const value = result.themePostBackgroundColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-bg')?.picker;
		get_picker.setColor(value);
		console.log('Post Background Colour CSS: ' + value);
	});

	// Theme Post Text Colour
	BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
		if (result.themePostTextColour1 == true) {
			document.querySelector('.icon-post-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostTextColour1 == 'undefined' || result.themePostTextColour1 == false) {
			document.querySelector('#checkbox-post-text-colour').checked = false;
			var value = false;
		}
		console.log('Post Text Colour: ' + value);
	});

	// Theme Post Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
		const value = result.themePostTextColour1CSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg')?.picker;
		get_picker.setColor(value);
		console.log('Post Text Colour CSS: ' + value);
	});

	// Theme Post Comments Text Colour
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour1'], function (result) {
		if (result.themePostCommentsTextColour1 == true) {
			document.querySelector('.icon-post-comments-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-comments-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostCommentsTextColour1 == 'undefined' || result.themePostCommentsTextColour1 == false) {
			document.querySelector('#checkbox-post-comments-text-colour').checked = false;
			var value = false;
		}
		console.log('Post Comments Text Colour: ' + value);
	});

	// Theme Post Comments Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour1CSS'], function (result) {
		const value = result.themePostCommentsTextColour1CSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-comments-fg')?.picker;
		get_picker.setColor(value);
		console.log('Post Comments Text Colour CSS: ' + value);
	});

	// Theme Post Comments Secondary Text Colour
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour2'], function (result) {
		if (result.themePostCommentsTextColour2 == true) {
			document.querySelector('.icon-post-comments-secondary-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-comments-secondary-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostCommentsTextColour2 == 'undefined' || result.themePostCommentsTextColour2 == false) {
			document.querySelector('#checkbox-post-comments-secondary-text-colour').checked = false;
			var value = false;
		}
		console.log('Post Comments Secondary Text Colour: ' + value);
	});

	// Theme Post Comments Secondary Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour2CSS'], function (result) {
		const value = result.themePostCommentsTextColour2CSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-comments-fg-2')?.picker;
		get_picker.setColor(value);
		console.log('Post Comments Secondary Text Colour CSS: ' + value);
	});

	// Theme Post Comment Action Row Colour
	BROWSER_API.storage.sync.get(['themePostCommentActionRowColour'], function (result) {
		if (result.themePostCommentActionRowColour == true) {
			document.querySelector('.icon-post-comment-action-row-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-comment-action-row-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostCommentActionRowColour == 'undefined' || result.themePostCommentActionRowColour == false) {
			document.querySelector('#checkbox-post-comment-action-row-colour').checked = false;
			var value = false;
		}
		console.log('Post Comment Action Row Colour: ' + value);
	});

	// Theme Post Comment Action Row Colour CSS
	BROWSER_API.storage.sync.get(['themePostCommentActionRowColourCSS'], function (result) {
		const value = result.themePostCommentActionRowColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-comment-action-row-fg')?.picker;
		get_picker.setColor(value);
		console.log('Post Comment Action Row Colour CSS: ' + value);
	});

	// Theme Post Visited Text Colour
	BROWSER_API.storage.sync.get(['themePostVisitedTextColour'], function (result) {
		if (result.themePostVisitedTextColour === true) {
			document.querySelector('.icon-post-visited-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-visited-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostVisitedTextColour == 'undefined' || result.themePostVisitedTextColour === false) {
			document.querySelector('#checkbox-post-visited-text-colour').checked = false;
			var value = false;
		}
		console.log('Post Visited Text Colour: ' + value);
	});

	// Theme Post Visited Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostVisitedTextColourCSS'], function (result) {
		const value = result.themePostVisitedTextColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg-visited')?.picker;
		get_picker.setColor(value);
		console.log('Post Visited Text Colour CSS: ' + value);
	});

	// Theme Post Text Colour 2
	BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
		if (result.themePostTextColour2 == true) {
			document.querySelector('.icon-post-text-colour-2').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-text-colour-2').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostTextColour2 == 'undefined' || result.themePostTextColour2 == false) {
			document.querySelector('#checkbox-post-text-colour-2').checked = false;
			var value = false;
		}
		console.log('Post Text Colour 2: ' + value);
	});

	// Theme Post Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
		const value = result.themePostTextColour2CSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg-2')?.picker;
		get_picker.setColor(value);
		console.log('Post Text Colour 2 CSS: ' + value);
	});

	// Theme Post Border Colour
	BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
		if (result.themePostBorderColour == true) {
			document.querySelector('.icon-post-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-border-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostBorderColour == 'undefined' || result.themePostBorderColour == false) {
			document.querySelector('#checkbox-post-border-colour').checked = false;
			var value = false;
		}
		console.log('Post Border Colour: ' + value);
	});

	// Theme Post Border Colour CSS
	BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
		const value = result.themePostBorderColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-border')?.picker;
		get_picker.setColor(value);
		console.log('Post Border Colour CSS: ' + value);
	});

	// Theme Post Upvote Colour
	BROWSER_API.storage.sync.get(['themePostUpvoteColour'], function (result) {
		if (result.themePostUpvoteColour == true) {
			document.querySelector('.icon-post-upvote-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-upvote-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostUpvoteColour == 'undefined' || result.themePostUpvoteColour == false) {
			document.querySelector('#checkbox-post-upvote-colour').checked = false;
			var value = false;
		}
		console.log('Post Upvote Colour: ' + value);
	});

	// Theme Post Upvote Colour CSS
	BROWSER_API.storage.sync.get(['themePostUpvoteColourCSS'], function (result) {
		const value = result.themePostUpvoteColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-upvote')?.picker;
		get_picker.setColor(value);
		console.log('Post Upvote Colour CSS: ' + value);
	});

	// Theme Blur
	BROWSER_API.storage.sync.get(['themeBlur'], function (result) {
		if (typeof result.themeBlur != 'undefined') {
			document.querySelector('#input-theme-blur').value = result.themeBlur;
			document.querySelector('#theme-blur-value').innerText = result.themeBlur + 'px';
			if (result.bgBlur != 0) {
				document.querySelector('.icon-theme-blur').style.backgroundColor = 'var(--accent)';
			}
			var value = result.themeBlur;
		} else if (typeof result.themeBlur == 'undefined') {
			document.querySelector('.icon-theme-blur').style.backgroundColor = 'var(--accent)';
			document.querySelector('#input-theme-blur').value = 5;
			document.querySelector('#theme-blur-value').innerText = '5px';
			var value = 0;
		}
		console.log('Theme Blur: ' + value + 'px');
	});

	// Theme Exceptions Enable
	BROWSER_API.storage.sync.get(['themeExceptionsEnable'], function (result) {
		if (result.themeExceptionsEnable == true) {
			document.querySelector('.icon-theme-exceptions').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-theme-exceptions-enable').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeExceptionsEnable == 'undefined' || result.themeExceptionsEnable == false) {
			document.querySelector('#checkbox-theme-exceptions-enable').checked = false;
			var value = false;
		}
		console.log('Theme Exceptions Enable: ' + value);
	});

	// Theme Exception Mode
	BROWSER_API.storage.sync.get(['themeExceptionMode'], function (result) {
		if (typeof result.themeExceptionMode == 'undefined' || result.themeExceptionMode === 'blacklist') {
			var value = 'blacklist';
		} else if (result.themeExceptionMode === 'whitelist') {
			document.querySelector('#btn-theme-blacklist').classList.remove('tab-active');
			document.querySelector('#btn-theme-whitelist').classList.add('tab-active');
			document.querySelector('[data-lang=ThemeWhitelistInfo]').classList.remove('hidden');
			document.querySelector('[data-lang=ThemeBlacklistInfo]').classList.add('hidden');
			var value = 'whitelist';
		}
		console.log('Theme Exception Mode: ' + value);
	});

	// Theme Exceptions List
	BROWSER_API.storage.sync.get(['themeExceptionSubList'], function (result) {
		if (typeof result.themeExceptionSubList != 'undefined') {
			var value = result.themeExceptionSubList;
			document.querySelector('#input-theme-exceptions').value = value;
		} else {
			var value = '';
		}
		console.log('Theme Exceptions Sub List: ' + value);
	});

	// Hide Gap
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		const hideGap = result.hideGap;
		document.querySelector('#checkbox-hide-gap').checked = hideGap;
		document.querySelector('.hide-gap').style.backgroundColor = hideGap ? 'var(--accent)' : '';
		if (hideGap) highlightMenuIcon('style-tweaks');
		console.log('Hide Gap: ' + hideGap);
	});

	// Full Width Banner
	BROWSER_API.storage.sync.get(['fullWidthBanner'], function (result) {
		const fullWidthBanner = result.fullWidthBanner === true;
		document.querySelector('#checkbox-full-width-banner').checked = fullWidthBanner;
		document.querySelector('.icon-full-width-banner').style.backgroundColor = fullWidthBanner ? 'var(--accent)' : '';
		if (fullWidthBanner) highlightMenuIcon('style-tweaks');
		console.log('Full Width Banner: ' + fullWidthBanner);
	});

	// Compact Header Bar & Side Menu
	BROWSER_API.storage.sync.get(['compactHeaderSideMenu'], function (result) {
		const compactHeaderSideMenu = result.compactHeaderSideMenu === true;
		document.querySelector('#checkbox-compact-header-side-menu').checked = compactHeaderSideMenu;
		document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = compactHeaderSideMenu ? 'var(--accent)' : '';
		if (compactHeaderSideMenu) highlightMenuIcon('style-tweaks');
		console.log('Compact Header Side Menu: ' + compactHeaderSideMenu);
	});

	// Classic Old UI
	BROWSER_API.storage.sync.get(['classicOldUI'], function (result) {
		const classicOldUI = result.classicOldUI === true;
		document.querySelector('#checkbox-classic-old-ui').checked = classicOldUI;
		document.querySelector('.icon-classic-old-ui').style.backgroundColor = classicOldUI ? 'var(--accent)' : '';
		if (classicOldUI) highlightMenuIcon('style-tweaks');
		console.log('Classic Old UI: ' + classicOldUI);
	});

	// Multicoloured Post Page Comment Thread Lines
	BROWSER_API.storage.sync.get(['multicolouredThreadLines'], function (result) {
		const multicolouredThreadLines = result.multicolouredThreadLines === true;
		document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked = multicolouredThreadLines;
		document.querySelector('.icon-multicoloured-comment-thread-lines').style.backgroundColor = multicolouredThreadLines ? 'var(--accent)' : '';
		if (multicolouredThreadLines) highlightMenuIcon('style-tweaks');
		console.log('Multicoloured Post Page Comment Thread Lines: ' + multicolouredThreadLines);
	});

	// Multicoloured Post Page Comment Thread Lines Colour List
	BROWSER_API.storage.sync.get(['multicolouredThreadLinesColours'], function (result) {
		const value = result.multicolouredThreadLinesColours ?? '';
		document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').value = value;
		console.log('Multicoloured Post Page Comment Thread Lines Colour List: ' + value);
	});

	// Post Table Border Colour
	BROWSER_API.storage.sync.get(['themePostTableBorderColour'], function (result) {
		const themePostTableBorderColour = result.themePostTableBorderColour === true;
		document.querySelector('#checkbox-post-table-border-colour').checked = themePostTableBorderColour;
		document.querySelector('.icon-post-table-border-colour').style.backgroundColor = themePostTableBorderColour ? 'var(--accent)' : '';
		if (themePostTableBorderColour) highlightMenuIcon('style-tweaks');
		console.log('Post Table Border Colour: ' + themePostTableBorderColour);
	});

	// Code Block Colour CSS
	BROWSER_API.storage.sync.get(['themeCodeBlockColourCSS'], function (result) {
		const value = result.themeCodeBlockColourCSS ?? '';
		const get_picker = colour_pickers.find((item) => item.id === 'post-code-fg')?.picker;
		get_picker.setColor(value);
		console.log('Code Block Colour CSS: ' + result.themeCodeBlockColourCSS);
	});

	// Custom Header Logo
	BROWSER_API.storage.sync.get(['customHeaderLogo'], function (result) {
		const customHeaderLogo = result.customHeaderLogo === true;
		document.querySelector('#checkbox-custom-header-logo').checked = customHeaderLogo;
		document.querySelector('.icon-custom-header-logo').style.backgroundColor = customHeaderLogo ? 'var(--accent)' : '';

		if (customHeaderLogo) highlightMenuIcon('style-tweaks');

		console.log('Custom Header Logo: ' + customHeaderLogo);
	});

	// Custom Header Logo URL
	BROWSER_API.storage.sync.get(['customHeaderLogoUrl'], function (result) {
		const url = result.customHeaderLogoUrl ?? '';
		document.querySelector('#input-custom-header-logo-url').value = url;
		console.log('Custom Header Logo URL: ' + url);
	});

	// Attach Side Menu Header
	BROWSER_API.storage.sync.get(['attachSideMenuHeader'], function (result) {
		const attachSideMenuHeader = result.attachSideMenuHeader === true;
		document.querySelector('#checkbox-attach-side-menu-header').checked = attachSideMenuHeader;
		document.querySelector('.icon-attach-side-menu-header').style.backgroundColor = attachSideMenuHeader ? 'var(--accent)' : '';
		if (attachSideMenuHeader) highlightMenuIcon('style-tweaks');
		console.log('Attach Side Menu Toggle: ' + attachSideMenuHeader);
	});

	// Opt Out Attach Side Menu
	BROWSER_API.storage.sync.get(['optOutAttachSideMenu'], function (result) {
		const optOutAttachSideMenu = result.optOutAttachSideMenu === true;
		document.querySelector('#checkbox-opt-out-attach-side-menu').checked = optOutAttachSideMenu;
		document.querySelector('.icon-opt-out-attach-side-menu').style.backgroundColor = optOutAttachSideMenu ? 'var(--accent)' : '';
		if (optOutAttachSideMenu) {
			document.querySelector('.icon-opt-out-attach-side-menu').classList.remove('icon-dropdown');
			document.querySelector('.icon-opt-out-attach-side-menu').classList.add('icon-dropdown-slash');
			highlightMenuIcon('style-tweaks');
		}
		console.log('Opt Out Attach Side Menu: ' + optOutAttachSideMenu);
	});

	// Left Side Vote Buttons
	BROWSER_API.storage.sync.get(['leftSideVoteButtons'], function (result) {
		const leftSideVoteButtons = result.leftSideVoteButtons === true;
		document.querySelector('#checkbox-left-side-vote-buttons').checked = leftSideVoteButtons;
		document.querySelector('.icon-left-side-vote-buttons').style.backgroundColor = leftSideVoteButtons ? 'var(--accent)' : '';
		if (leftSideVoteButtons) highlightMenuIcon('style-tweaks');
		console.log('Left Side Vote Buttons: ' + leftSideVoteButtons);
	});

	// Subreddit Display Name Banner
	BROWSER_API.storage.sync.get(['subredditDisplayNameBanner'], function (result) {
		const subredditDisplayNameBanner = result.subredditDisplayNameBanner === true;
		document.querySelector('#checkbox-subreddit-display-name-banner').checked = subredditDisplayNameBanner;
		document.querySelector('.icon-subreddit-display-name-banner').style.backgroundColor = subredditDisplayNameBanner ? 'var(--accent)' : '';
		if (subredditDisplayNameBanner) highlightMenuIcon('style-tweaks');
		console.log('Subreddit Display Name Banner: ' + subredditDisplayNameBanner);
	});

	// Non Sticky Header Bar
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		const nonStickyHeaderBar = result.nonStickyHeaderBar === true;
		document.querySelector('#checkbox-non-sticky-header-bar').checked = nonStickyHeaderBar;
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = nonStickyHeaderBar ? 'var(--accent)' : '';
		if (nonStickyHeaderBar) {
			document.querySelector('.icon-non-sticky-header-bar').classList.remove('icon-sticky-note');
			document.querySelector('.icon-non-sticky-header-bar').classList.add('icon-sticky-note-slash');
			highlightMenuIcon('style-tweaks');
		}
		console.log('Non Sticky Header Bar: ' + nonStickyHeaderBar);
	});

	// Right Side Post Thumbnails
	BROWSER_API.storage.sync.get(['rightSidePostThumbnails'], function (result) {
		const rightSidePostThumbnails = result.rightSidePostThumbnails === true;
		document.querySelector('#checkbox-right-side-post-thumbnails').checked = rightSidePostThumbnails;
		document.querySelector('.icon-right-side-post-thumbnails').style.backgroundColor = rightSidePostThumbnails ? 'var(--accent)' : '';
		if (rightSidePostThumbnails) highlightMenuIcon('style-tweaks');
		console.log('Right Side Post Thumbnails: ' + rightSidePostThumbnails);
	});
}
