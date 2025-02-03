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

	// Dropshadows
	BROWSER_API.storage.sync.get(['shadows'], function (result) {
		if (result.shadows == true) {
			document.querySelector('#checkbox-shadow').checked = true;
			document.querySelector('.icon-shadow').style.backgroundColor = 'var(--accent)';
			document.querySelector('.icon-shadow').classList.add('icon-light-on');
			document.querySelector('.icon-shadow').classList.remove('icon-light-off');
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.shadows == 'undefined' || result.shadows == false) {
			document.querySelector('#checkbox-shadow').checked = false;
			var value = false;
		}
		console.log('Use Drop Shadows: ' + value);
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
		if (typeof result.themeSidebarTextColourCSS != 'undefined') {
			document.querySelector('#input-sidebar-text-colour-css').value = result.themeSidebarTextColourCSS;
			var value = result.themeSidebarTextColourCSS;
		} else {
			document.querySelector('#input-sidebar-text-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themeSidebarBgColourCSS != 'undefined') {
			document.querySelector('#input-sidebar-bg-colour-css').value = result.themeSidebarBgColourCSS;
			var value = result.themeSidebarBgColourCSS;
		} else {
			document.querySelector('#input-sidebar-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Sidebar Background Colour CSS: ' + value);
	});

	// Sidemenu Text Colour
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
		console.log('Sidemenu Text Colour: ' + value);
	});

	// Sidemenu Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
		if (typeof result.themeSidemenuTextColourCSS != 'undefined') {
			document.querySelector('#input-sidemenu-text-colour-css').value = result.themeSidemenuTextColourCSS;
			var value = result.themeSidemenuTextColourCSS;
		} else {
			document.querySelector('#input-sidemenu-text-colour-css').value = '';
			var value = '';
		}
		console.log('Sidemenu Text Colour CSS: ' + value);
	});

	// Sidemenu Background Colour
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
		console.log('Sidemenu Background Colour: ' + value);
	});

	// Sidemenu Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
		if (typeof result.themeSidemenuBgColourCSS != 'undefined') {
			document.querySelector('#input-sidemenu-bg-colour-css').value = result.themeSidemenuBgColourCSS;
			var value = result.themeSidemenuBgColourCSS;
		} else {
			document.querySelector('#input-sidemenu-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Sidemenu Background Colour CSS: ' + value);
	});

	// Sidemenu Button Hover Colour
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
		console.log('Sidemenu Button Hover Colour: ' + value);
	});

	// Sidemenu Button Hover Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColourCSS'], function (result) {
		if (typeof result.themeSidemenuButtonHoverColourCSS != 'undefined') {
			document.querySelector('#input-sidemenu-button-hover-colour-css').value = result.themeSidemenuButtonHoverColourCSS;
			var value = result.themeSidemenuButtonHoverColourCSS;
		} else {
			document.querySelector('#input-sidemenu-button-hover-colour-css').value = '';
			var value = '';
		}
		console.log('Sidemenu Button Hover Colour CSS: ' + value);
	});

	// Sidebar Border Colour
	BROWSER_API.storage.sync.get(['themeSidebarBorderColour'], function (result) {
		if (result.themeSidebarBorderColour == true) {
			document.querySelector('.icon-sidebar-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sidebar-border-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSidebarBorderColour == 'undefined' || result.themeSidebarBorderColour == false) {
			document.querySelector('#checkbox-sidebar-border-colour').checked = false;
			var value = false;
		}
		console.log('Sidebar Border Colour: ' + value);
	});

	// Sidebar Border Colour CSS
	BROWSER_API.storage.sync.get(['themeSidebarBorderColourCSS'], function (result) {
		if (typeof result.themeSidebarBorderColourCSS != 'undefined') {
			document.querySelector('#input-sidebar-border-colour-css').value = result.themeSidebarBorderColourCSS;
			var value = result.themeSidebarBorderColourCSS;
		} else {
			document.querySelector('#input-sidebar-border-colour-css').value = '';
			var value = '';
		}
		console.log('Sidebar Border Colour CSS: ' + value);
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
		if (typeof result.themePostContentAndCommentsLinkColourCSS != 'undefined') {
			document.querySelector('#input-post-content-and-comments-link-colour-css').value = result.themePostContentAndCommentsLinkColourCSS;
			var value = result.themePostContentAndCommentsLinkColourCSS;
		} else {
			document.querySelector('#input-post-content-and-comments-link-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themeSearchbarBgColourCSS != 'undefined') {
			document.querySelector('#input-searchbar-bg-colour-css').value = result.themeSearchbarBgColourCSS;
			var value = result.themeSearchbarBgColourCSS;
		} else {
			document.querySelector('#input-searchbar-bg-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themeSearchbarDropdownBgColourCSS != 'undefined') {
			document.querySelector('#input-searchbar-dropdown-bg-colour-css').value = result.themeSearchbarDropdownBgColourCSS;
			var value = result.themeSearchbarDropdownBgColourCSS;
		} else {
			document.querySelector('#input-searchbar-dropdown-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Searchbar Focused/Dropdown Background Colour CSS: ' + value);
	});

	// Theme Create Post Background Colour
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColour'], function (result) {
		if (result.themeCreatePostBackgroundColour == true) {
			document.querySelector('.icon-create-post-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-create-post-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeCreatePostBackgroundColour == 'undefined' || result.themeCreatePostBackgroundColour == false) {
			document.querySelector('#checkbox-create-post-bg-colour').checked = false;
			var value = false;
		}
		console.log('Create Post Background Colour: ' + value);
	});

	// Theme Create Post Background Colour CSS
	BROWSER_API.storage.sync.get(['themeCreatePostBackgroundColourCSS'], function (result) {
		if (typeof result.themeCreatePostBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-create-post-bg-colour-css').value = result.themeCreatePostBackgroundColourCSS;
			var value = result.themeCreatePostBackgroundColourCSS;
		} else {
			document.querySelector('#input-create-post-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Create Post Background Colour CSS: ' + value);
	});

	// Theme Create Post Border Colour
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColour'], function (result) {
		if (result.themeCreatePostBorderColour == true) {
			document.querySelector('.icon-create-post-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-create-post-border-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeCreatePostBorderColour == 'undefined' || result.themeCreatePostBorderColour == false) {
			document.querySelector('#checkbox-create-post-border-colour').checked = false;
			var value = false;
		}
		console.log('Create Post Border Colour: ' + value);
	});

	// Theme Create Post Border Colour CSS
	BROWSER_API.storage.sync.get(['themeCreatePostBorderColourCSS'], function (result) {
		if (typeof result.themeCreatePostBorderColourCSS != 'undefined') {
			document.querySelector('#input-create-post-border-colour-css').value = result.themeCreatePostBorderColourCSS;
			var value = result.themeCreatePostBorderColourCSS;
		} else {
			document.querySelector('#input-create-post-border-colour-css').value = '';
			var value = '';
		}
		console.log('Create Post Border Colour CSS: ' + value);
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
		if (typeof result.themeHeaderBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-header-bg-colour-css').value = result.themeHeaderBackgroundColourCSS;
			var value = result.themeHeaderBackgroundColourCSS;
		} else {
			document.querySelector('#input-header-bg-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themeHeaderTextColourCSS != 'undefined') {
			document.querySelector('#input-header-text-colour-css').value = result.themeHeaderTextColourCSS;
			var value = result.themeHeaderTextColourCSS;
		} else {
			document.querySelector('#input-header-text-colour-css').value = '';
			var value = '';
		}
		console.log('Header Text Colour CSS: ' + value);
	});

	// Theme Sort Background Colour
	BROWSER_API.storage.sync.get(['themeSortBackgroundColour'], function (result) {
		if (result.themeSortBackgroundColour == true) {
			document.querySelector('.icon-sort-bg-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-bg-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSortBackgroundColour == 'undefined' || result.themeSortBackgroundColour == false) {
			document.querySelector('#checkbox-sort-bg-colour').checked = false;
			var value = false;
		}
		console.log('Sort Background Colour: ' + value);
	});

	// Theme Sort Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSortBackgroundColourCSS'], function (result) {
		if (typeof result.themeSortBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-sort-bg-colour-css').value = result.themeSortBackgroundColourCSS;
			var value = result.themeSortBackgroundColourCSS;
		} else {
			document.querySelector('#input-sort-bg-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Background Colour CSS: ' + value);
	});

	// Theme Sort Text Colour
	BROWSER_API.storage.sync.get(['themeSortTextColour'], function (result) {
		if (result.themeSortTextColour == true) {
			document.querySelector('.icon-sort-text-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-text-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSortTextColour == 'undefined' || result.themeSortTextColour == false) {
			document.querySelector('#checkbox-sort-text-colour').checked = false;
			var value = false;
		}
		console.log('Sort Text Colour: ' + value);
	});

	// Theme Sort Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSortTextColourCSS'], function (result) {
		if (typeof result.themeSortTextColourCSS != 'undefined') {
			document.querySelector('#input-sort-text-colour-css').value = result.themeSortTextColourCSS;
			var value = result.themeSortTextColourCSS;
		} else {
			document.querySelector('#input-sort-text-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Text Colour CSS: ' + value);
	});

	// Theme Sort Text Colour 2
	BROWSER_API.storage.sync.get(['themeSortTextColour2'], function (result) {
		if (result.themeSortTextColour2 == true) {
			document.querySelector('.icon-sort-text-colour-2').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-text-colour-2').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSortTextColour2 == 'undefined' || result.themeSortTextColour2 == false) {
			document.querySelector('#checkbox-sort-text-colour-2').checked = false;
			var value = false;
		}
		console.log('Sort Text Colour 2: ' + value);
	});

	// Theme Sort Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themeSortTextColour2CSS'], function (result) {
		if (typeof result.themeSortTextColour2CSS != 'undefined') {
			document.querySelector('#input-sort-text-colour-2-css').value = result.themeSortTextColour2CSS;
			var value = result.themeSortTextColour2CSS;
		} else {
			document.querySelector('#input-sort-text-colour-2-css').value = '';
			var value = '';
		}
		console.log('Sort Text Colour 2 CSS: ' + value);
	});

	// Theme Sort Border Colour
	BROWSER_API.storage.sync.get(['themeSortBorderColour'], function (result) {
		if (result.themeSortBorderColour == true) {
			document.querySelector('.icon-sort-border-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-sort-border-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themeSortBorderColour == 'undefined' || result.themeSortBorderColour == false) {
			document.querySelector('#checkbox-sort-border-colour').checked = false;
			var value = false;
		}
		console.log('Sort Border Colour: ' + value);
	});

	// Theme Sort Border Colour CSS
	BROWSER_API.storage.sync.get(['themeSortBorderColourCSS'], function (result) {
		if (typeof result.themeSortBorderColourCSS != 'undefined') {
			document.querySelector('#input-sort-border-colour-css').value = result.themeSortBorderColourCSS;
			var value = result.themeSortBorderColourCSS;
		} else {
			document.querySelector('#input-sort-border-colour-css').value = '';
			var value = '';
		}
		console.log('Sort Border Colour CSS: ' + value);
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
		if (typeof result.themePostBackgroundColourCSS != 'undefined') {
			document.querySelector('#input-post-bg-colour-css').value = result.themePostBackgroundColourCSS;
			var value = result.themePostBackgroundColourCSS;
		} else {
			document.querySelector('#input-post-bg-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themePostTextColour1CSS != 'undefined') {
			document.querySelector('#input-post-text-colour-css').value = result.themePostTextColour1CSS;
			var value = result.themePostTextColour1CSS;
		} else {
			document.querySelector('#input-post-text-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themePostCommentsTextColour1CSS != 'undefined') {
			document.querySelector('#input-post-comments-text-colour-css').value = result.themePostCommentsTextColour1CSS;
			var value = result.themePostCommentsTextColour1CSS;
		} else {
			document.querySelector('#input-post-comments-text-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themePostCommentsTextColour2CSS != 'undefined') {
			document.querySelector('#input-post-comments-secondary-text-colour-css').value = result.themePostCommentsTextColour2CSS;
			var value = result.themePostCommentsTextColour2CSS;
		} else {
			document.querySelector('#input-post-comments-secondary-text-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themePostCommentActionRowColourCSS != 'undefined') {
			document.querySelector('#input-post-comment-action-row-colour-css').value = result.themePostCommentActionRowColourCSS;
			var value = result.themePostCommentActionRowColourCSS;
		} else {
			document.querySelector('#input-post-comment-action-row-colour-css').value = '';
			var value = '';
		}
		console.log('Post Comment Action Row Colour CSS: ' + value);
	});

	// Theme Post Visited Title Colour
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColour'], function (result) {
		if (result.themePostVisitedTitleColour == true) {
			document.querySelector('.icon-post-visited-title-colour').style.backgroundColor = 'var(--accent)';
			document.querySelector('#checkbox-post-visited-title-colour').checked = true;
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.themePostVisitedTitleColour == 'undefined' || result.themePostVisitedTitleColour == false) {
			document.querySelector('#checkbox-post-visited-title-colour').checked = false;
			var value = false;
		}
		console.log('Post Visited Title Colour: ' + value);
	});

	// Theme Post Visited Title Colour CSS
	BROWSER_API.storage.sync.get(['themePostVisitedTitleColourCSS'], function (result) {
		if (typeof result.themePostVisitedTitleColourCSS != 'undefined') {
			document.querySelector('#input-post-visited-title-colour-css').value = result.themePostVisitedTitleColourCSS;
			var value = result.themePostVisitedTitleColourCSS;
		} else {
			document.querySelector('#input-post-visited-title-colour-css').value = '';
			var value = '';
		}
		console.log('Post Visited Title Colour CSS: ' + value);
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
		if (typeof result.themePostTextColour2CSS != 'undefined') {
			document.querySelector('#input-post-text-colour-2-css').value = result.themePostTextColour2CSS;
			var value = result.themePostTextColour2CSS;
		} else {
			document.querySelector('#input-post-text-colour-2-css').value = '';
			var value = '';
		}
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
		if (typeof result.themePostBorderColourCSS != 'undefined') {
			document.querySelector('#input-post-border-colour-css').value = result.themePostBorderColourCSS;
			var value = result.themePostBorderColourCSS;
		} else {
			document.querySelector('#input-post-border-colour-css').value = '';
			var value = '';
		}
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
		if (typeof result.themePostUpvoteColourCSS != 'undefined') {
			document.querySelector('#input-post-upvote-colour-css').value = result.themePostUpvoteColourCSS;
			var value = result.themePostUpvoteColourCSS;
		} else {
			document.querySelector('#input-post-upvote-colour-css').value = '';
			var value = '';
		}
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
		if (result.hideGap == true) {
			document.querySelector('#checkbox-hide-gap').checked = true;
			document.querySelector('.hide-gap').style.backgroundColor = 'var(--accent)';
			highlightMenuIcon('style-tweaks');
			var value = true;
		} else if (typeof result.hideGap == 'undefined' || result.hideGap == false) {
			document.querySelector('#checkbox-hide-gap').checked = false;
			var value = false;
		}
		console.log('Hide Gap: ' + value);
	});

	// Full Width Banner
	BROWSER_API.storage.sync.get(['fullWidthBanner'], function (result) {
		const fullWidthBanner = result.fullWidthBanner === true;
		document.querySelector('.icon-full-width-banner').style.backgroundColor = fullWidthBanner ? 'var(--accent)' : '';
		document.querySelector('#checkbox-full-width-banner').checked = fullWidthBanner;
		if (fullWidthBanner) {
			highlightMenuIcon('style-tweaks');
		}
		console.log('Full Width Banner: ' + fullWidthBanner);
	});

	// Compact Sub Rule List
	BROWSER_API.storage.sync.get(['compactSubRuleList'], function (result) {
		const compactSubRuleList = result.compactSubRuleList === true;
		document.querySelector('.icon-compact-sub-rule-list').style.backgroundColor = compactSubRuleList ? 'var(--accent)' : '';
		document.querySelector('#checkbox-compact-sub-rule-list').checked = compactSubRuleList;
		if (compactSubRuleList) {
			highlightMenuIcon('style-tweaks');
		}
		console.log('Compact Sub Rule List: ' + compactSubRuleList);
	});

	// Compact Header Bar & Side Menu
	BROWSER_API.storage.sync.get(['compactHeaderSideMenu'], function (result) {
		const compactHeaderSideMenu = result.compactHeaderSideMenu === true;
		document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = compactHeaderSideMenu ? 'var(--accent)' : '';
		document.querySelector('#checkbox-compact-header-side-menu').checked = compactHeaderSideMenu;
		if (compactHeaderSideMenu) {
			highlightMenuIcon('style-tweaks');
		}
		console.log('Compact Header Side Menu: ' + compactHeaderSideMenu);
	});

	// Text Post Preview Fade
	BROWSER_API.storage.sync.get(['textPostPreviewFade'], function (result) {
		const textPostPreviewFade = result.textPostPreviewFade === true;
		document.querySelector('#checkbox-text-post-preview-fade').checked = textPostPreviewFade;
		if (textPostPreviewFade) {
			highlightMenuIcon('style-tweaks');
			document.querySelectorAll('.icon-text-post-preview-fade').forEach((icon) => {
				icon.classList.add('active');
			});
		}
		console.log('Text Post Preview Fade: ' + textPostPreviewFade);
	});

	// Text Post Preview Fade Height
	BROWSER_API.storage.sync.get(['textPostPreviewFade', 'textPostPreviewFadeHeight'], function (result) {
		const value = result.textPostPreviewFadeHeight || -1;
		document.querySelector('#input-text-post-preview-fade-height').value = value;
		document.querySelector('#text-post-preview-fade-height').innerText = value >= 0 ? value + 'px' : '';
		if (result.textPostPreviewFade === true && value > -1) {
			document.querySelector('.icon-text-post-preview-fade-height').style.backgroundColor = 'var(--accent)';
		}
		console.log(`Text Post Preview Fade Height: ${value >= 0 ? value + 'px' : 'default'}`);
	});
}
