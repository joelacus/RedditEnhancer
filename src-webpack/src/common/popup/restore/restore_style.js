// ────────────────────────────────────────────────────────────────────────────
// Popup / Restore / Style
// ────────────────────────────────────────────────────────────────────────────

import { highlightMenuIcon } from '../popup_restore';
import { validateColour, validateInt } from './validation';

// Restore UI settings for "Style" options.

export function restorePopupStyleOptions() {
	// Border Radius Amount
	BROWSER_API.storage.sync.get(['borderRadiusAmount'], function (result) {
		const value = validateInt(parseInt(result.borderRadiusAmount), -1, 40, -1);
		const hasValue = value !== -1;
		document.querySelector('#input-border-radius-amount').value = value;
		document.querySelector('#border-radius-amount-value').textContent = hasValue ? `${value}px` : '';
		document.querySelector('.icon-border-radius-amount').style.backgroundColor = hasValue ? 'var(--accent)' : '';
		if (hasValue) highlightMenuIcon('style-tweaks');
		console.log('Border Radius Amount: ' + (hasValue ? `${value}px` : 'default'));
	});

	// Add Drop Shadows
	BROWSER_API.storage.sync.get(['addDropShadow'], function (result) {
		const checked = result.addDropShadow === true;
		document.querySelector('#checkbox-add-drop-shadow').checked = checked;
		document.querySelector('.icon-add-drop-shadow').style.backgroundColor = checked ? 'var(--accent)' : '';
		const icon = document.querySelector('.icon-add-drop-shadow');
		icon.classList.replace(checked ? 'icon-light-off' : 'icon-light-on', checked ? 'icon-light-on' : 'icon-light-off');
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Add Drop Shadows: ' + checked);
	});

	// Override Drop Shadow
	BROWSER_API.storage.sync.get(['overrideDropShadow'], function (result) {
		const checked = result.overrideDropShadow === true;
		document.querySelector('#checkbox-shadow-override').checked = checked;
		document.querySelector('.icon-drop-shadow-override').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Override Drop Shadow: ' + checked);
	});

	// Override Drop Shadow CSS
	BROWSER_API.storage.sync.get(['overrideDropShadowCSS'], function (result) {
		const value = result.overrideDropShadowCSS ?? '';
		document.querySelector('#input-shadow-override-css').value = value;
		console.log('Override Drop Shadow CSS: ' + value);
	});

	// Force Dark Mode
	BROWSER_API.storage.sync.get(['forceDarkMode'], function (result) {
		const checked = result.forceDarkMode === true;
		document.querySelector('#checkbox-force-dark-mode').checked = checked;
		document.querySelector('.icon-force-dark-mode').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Force Dark Mode: ' + checked);
	});

	// Modernise Old Reddit
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], function (result) {
		const checked = result.moderniseOldReddit === true;
		document.querySelector('#checkbox-modern-old-reddit').checked = checked;
		document.querySelector('.icon-modern-old-reddit').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Modernise Old Reddit: ' + checked);
	});

	// Sidebar Text Colour
	BROWSER_API.storage.sync.get(['themeSidebarTextColour'], function (result) {
		const checked = result.themeSidebarTextColour === true;
		document.querySelector('#checkbox-sidebar-text-colour').checked = checked;
		document.querySelector('.icon-sidebar-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Sidebar Text Colour: ' + checked);
	});

	// Sidebar Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSidebarTextColourCSS'], function (result) {
		const raw = result.themeSidebarTextColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'sidebar-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Sidebar Text Colour CSS: ' + value);
	});

	// Sidebar Background Colour
	BROWSER_API.storage.sync.get(['themeSidebarBgColour'], function (result) {
		const checked = result.themeSidebarBgColour === true;
		document.querySelector('#checkbox-sidebar-bg-colour').checked = checked;
		document.querySelector('.icon-sidebar-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Sidebar Background Colour: ' + checked);
	});

	// Sidebar Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSidebarBgColourCSS'], function (result) {
		const raw = result.themeSidebarBgColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'sidebar-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Sidebar Background Colour CSS: ' + value);
	});

	// Side Menu Text Colour
	BROWSER_API.storage.sync.get(['themeSidemenuTextColour'], function (result) {
		const checked = result.themeSidemenuTextColour === true;
		document.querySelector('#checkbox-sidemenu-text-colour').checked = checked;
		document.querySelector('.icon-sidemenu-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Side Menu Text Colour: ' + checked);
	});

	// Side Menu Text Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
		const raw = result.themeSidemenuTextColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'sidemenu-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Side Menu Text Colour CSS: ' + value);
	});

	// Side Menu Background Colour
	BROWSER_API.storage.sync.get(['themeSidemenuBgColour'], function (result) {
		const checked = result.themeSidemenuBgColour === true;
		document.querySelector('#checkbox-sidemenu-bg-colour').checked = checked;
		document.querySelector('.icon-sidemenu-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Side Menu Background Colour: ' + checked);
	});

	// Side Menu Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
		const raw = result.themeSidemenuBgColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'sidemenu-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Side Menu Background Colour CSS: ' + value);
	});

	// Side Menu Button Hover Colour
	BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColour'], function (result) {
		const checked = result.themeSidemenuButtonHoverColour === true;
		document.querySelector('#checkbox-sidemenu-button-hover-colour').checked = checked;
		document.querySelector('.icon-sidemenu-button-hover-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Side Menu Button Hover Colour: ' + checked);
	});

	// Side Menu Button Hover Colour CSS
	BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColourCSS'], function (result) {
		const raw = result.themeSidemenuButtonHoverColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'sidemenu-btn-hover')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Side Menu Button Hover Colour CSS: ' + value);
	});

	// Post Content And Comments Link Colour
	BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColour'], function (result) {
		const checked = result.themePostContentAndCommentsLinkColour === true;
		document.querySelector('#checkbox-post-content-and-comments-link-colour').checked = checked;
		document.querySelector('.icon-post-content-and-comments-link-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Content And Comments Link Colour: ' + checked);
	});

	// Post Content And Comments Link Colour CSS
	BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColourCSS'], function (result) {
		const raw = result.themePostContentAndCommentsLinkColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-and-comment-links')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Content And Comments Link Colour CSS: ' + value);
	});

	// Searchbar Background Colour
	BROWSER_API.storage.sync.get(['themeSearchbarBgColour'], function (result) {
		const checked = result.themeSearchbarBgColour === true;
		document.querySelector('#checkbox-searchbar-bg-colour').checked = checked;
		document.querySelector('.icon-searchbar-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Searchbar Background Colour: ' + checked);
	});

	// Searchbar Border Colour
	/*BROWSER_API.storage.sync.get(['themeSearchbarBorderColour'], function (result) {
		const checked = result.themeSearchbarBorderColour === true;
		document.querySelector('.icon-searchbar-border-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		document.querySelector('#checkbox-searchbar-border-colour').checked = checked;
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Searchbar Border Colour: ' + checked);
	});*/

	// Searchbar Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSearchbarBgColourCSS'], function (result) {
		const raw = result.themeSearchbarBgColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'searchbar-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Searchbar Background Colour CSS: ' + value);
	});

	// Searchbar Focused/Dropdown Background Colour
	BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColour'], function (result) {
		const checked = result.themeSearchbarDropdownBgColour === true;
		document.querySelector('#checkbox-searchbar-dropdown-bg-colour').checked = checked;
		document.querySelector('.icon-searchbar-dropdown-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Searchbar Focused/Dropdown Background Colour: ' + checked);
	});

	// Searchbar Focused/Dropdown Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColourCSS'], function (result) {
		const raw = result.themeSearchbarDropdownBgColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'searchbar-dropdown-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Searchbar Focused/Dropdown Background Colour CSS: ' + value);
	});

	// Theme Header Background Colour
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
		const checked = result.themeHeaderBackgroundColour === true;
		document.querySelector('#checkbox-header-bg-colour').checked = checked;
		document.querySelector('.icon-header-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Header Background Colour: ' + checked);
	});

	// Theme Header Background Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
		const raw = result.themeHeaderBackgroundColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'header-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Header Background Colour CSS: ' + value);
	});

	// Theme Header Text Colour
	BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
		const checked = result.themeHeaderTextColour === true;
		document.querySelector('#checkbox-header-text-colour').checked = checked;
		document.querySelector('.icon-header-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Header Text Colour: ' + checked);
	});

	// Theme Header Text Colour CSS
	BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
		const raw = result.themeHeaderTextColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'header-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Header Text Colour CSS: ' + value);
	});

	// Theme Post Background Colour
	BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
		const checked = result.themePostBackgroundColour === true;
		document.querySelector('#checkbox-post-bg-colour').checked = checked;
		document.querySelector('.icon-post-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Background Colour: ' + checked);
	});

	// Theme Post Background Colour CSS
	BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
		const raw = result.themePostBackgroundColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Background Colour CSS: ' + value);
	});

	// Theme Post Text Colour
	BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
		const checked = result.themePostTextColour1 === true;
		document.querySelector('#checkbox-post-text-colour').checked = checked;
		document.querySelector('.icon-post-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Text Colour: ' + checked);
	});

	// Theme Post Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
		const raw = result.themePostTextColour1CSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Text Colour CSS: ' + value);
	});

	// Theme Post Comments Text Colour
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour1'], function (result) {
		const checked = result.themePostCommentsTextColour1 === true;
		document.querySelector('#checkbox-post-comments-text-colour').checked = checked;
		document.querySelector('.icon-post-comments-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Comments Text Colour: ' + checked);
	});

	// Theme Post Comments Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour1CSS'], function (result) {
		const raw = result.themePostCommentsTextColour1CSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-comments-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Comments Text Colour CSS: ' + value);
	});

	// Theme Post Comments Secondary Text Colour
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour2'], function (result) {
		const checked = result.themePostCommentsTextColour2 === true;
		document.querySelector('#checkbox-post-comments-secondary-text-colour').checked = checked;
		document.querySelector('.icon-post-comments-secondary-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Comments Secondary Text Colour: ' + checked);
	});

	// Theme Post Comments Secondary Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostCommentsTextColour2CSS'], function (result) {
		const raw = result.themePostCommentsTextColour2CSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-comments-fg-2')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Comments Secondary Text Colour CSS: ' + value);
	});

	// Theme Post Comment Action Row Colour
	BROWSER_API.storage.sync.get(['themePostCommentActionRowColour'], function (result) {
		const checked = result.themePostCommentActionRowColour === true;
		document.querySelector('#checkbox-post-comment-action-row-colour').checked = checked;
		document.querySelector('.icon-post-comment-action-row-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Comment Action Row Colour: ' + checked);
	});

	// Theme Post Comment Action Row Colour CSS
	BROWSER_API.storage.sync.get(['themePostCommentActionRowColourCSS'], function (result) {
		const raw = result.themePostCommentActionRowColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-comment-action-row-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Comment Action Row Colour CSS: ' + value);
	});

	// Theme Post Followed Text Colour
	BROWSER_API.storage.sync.get(['themePostFollowedTextColour'], function (result) {
		const checked = result.themePostFollowedTextColour === true;
		document.querySelector('#checkbox-post-followed-text-colour').checked = checked;
		document.querySelector('.icon-post-followed-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Followed Text Colour: ' + checked);
	});

	// Theme Post Followed Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostFollowedTextColourCSS'], function (result) {
		const raw = result.themePostFollowedTextColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg-followed')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Followed Text Colour CSS: ' + value);
	});

	// Theme Post Visited Text Colour
	BROWSER_API.storage.sync.get(['themePostVisitedTextColour'], function (result) {
		const checked = result.themePostVisitedTextColour === true;
		document.querySelector('#checkbox-post-visited-text-colour').checked = checked;
		document.querySelector('.icon-post-visited-text-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Visited Text Colour: ' + checked);
	});

	// Theme Post Visited Text Colour CSS
	BROWSER_API.storage.sync.get(['themePostVisitedTextColourCSS'], function (result) {
		const raw = result.themePostVisitedTextColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg-visited')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Visited Text Colour CSS: ' + value);
	});

	// Theme Post Text Colour 2
	BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
		const checked = result.themePostTextColour2 === true;
		document.querySelector('#checkbox-post-text-colour-2').checked = checked;
		document.querySelector('.icon-post-text-colour-2').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Text Colour 2: ' + checked);
	});

	// Theme Post Text Colour 2 CSS
	BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
		const raw = result.themePostTextColour2CSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-fg-2')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Text Colour 2 CSS: ' + value);
	});

	// Theme Post Border Colour
	BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
		const checked = result.themePostBorderColour === true;
		document.querySelector('#checkbox-post-border-colour').checked = checked;
		document.querySelector('.icon-post-border-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Border Colour: ' + checked);
	});

	// Theme Post Border Colour CSS
	BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
		const raw = result.themePostBorderColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-border')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Border Colour CSS: ' + value);
	});

	// Post Upvote Colour
	BROWSER_API.storage.sync.get(['themePostUpvoteColour'], function (result) {
		const checked = result.themePostUpvoteColour === true;
		document.querySelector('#checkbox-post-upvote-colour').checked = checked;
		document.querySelector('.icon-post-upvote-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Upvote Colour: ' + checked);
	});

	// Theme Post Upvote Colour CSS
	BROWSER_API.storage.sync.get(['themePostUpvoteColourCSS'], function (result) {
		const raw = result.themePostUpvoteColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-upvote')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Post Upvote Colour CSS: ' + value);
	});

	// Theme OP Comment Highlight Colour
	BROWSER_API.storage.sync.get(['themeOpCommentHighlightColour'], function (result) {
		const checked = result.themeOpCommentHighlightColour === true;
		document.querySelector('#checkbox-op-comment-highlight-colour').checked = checked;
		document.querySelector('.icon-op-comment-highlight-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('OP Comment Highlight Colour: ' + checked);
	});

	// Theme OP Comment Highlight Colour CSS
	BROWSER_API.storage.sync.get(['themeOpCommentHighlightColourCSS'], function (result) {
		const raw = result.themeOpCommentHighlightColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'op-comment-highlight')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('OP Comment Highlight Colour CSS: ' + value);
	});

	// Theme Blur
	BROWSER_API.storage.sync.get(['themeBlur'], function (result) {
		const value = result.themeBlur ?? 0;
		document.querySelector('#input-theme-blur').value = value;
		document.querySelector('#theme-blur-value').innerText = value + 'px';
		document.querySelector('.icon-theme-blur').style.backgroundColor = value != 0 ? 'var(--accent)' : '';
		console.log('Theme Blur: ' + value + 'px');
	});

	// Theme Exceptions Enable
	BROWSER_API.storage.sync.get(['themeExceptionsEnable'], function (result) {
		const checked = result.themeExceptionsEnable === true;
		document.querySelector('#checkbox-theme-exceptions-enable').checked = checked;
		document.querySelector('.icon-theme-exceptions').style.backgroundColor = checked ? 'var(--accent)' : '';
		console.log('Theme Exceptions Enable: ' + checked);
	});

	// Theme Exception Mode
	BROWSER_API.storage.sync.get(['themeExceptionMode'], function (result) {
		const mode = result.themeExceptionMode || 'whitelist';
		document.querySelector('#btn-theme-whitelist').classList.toggle('tab-active', mode === 'whitelist');
		document.querySelector('#btn-theme-blacklist').classList.toggle('tab-active', mode === 'blacklist');
		document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.toggle('hidden', mode !== 'whitelist');
		document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.toggle('hidden', mode !== 'blacklist');
		console.log('Theme Exception Mode: ' + mode);
	});

	// Theme Exceptions
	BROWSER_API.storage.sync.get(['themeExceptionSubList'], function (result) {
		const value = result.themeExceptionSubList ?? '';
		document.querySelector('#input-theme-exceptions').value = value;
		console.log('Theme Exceptions: ' + value);
	});

	// Larger Classic Post
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		const checked = result.largerClassicPost === true;
		document.querySelector('#checkbox-larger-classic-post').checked = checked;
		document.querySelector('.icon-larger-classic-post').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Larger Classic Post: ' + checked);
	});

	// Hide Gap
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		const checked = result.hideGap === true;
		document.querySelector('#checkbox-hide-gap').checked = checked;
		document.querySelector('.hide-gap').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Hide Gap: ' + checked);
	});

	// Full Width Banner
	BROWSER_API.storage.sync.get(['fullWidthBanner'], function (result) {
		const checked = result.fullWidthBanner === true;
		document.querySelector('#checkbox-full-width-banner').checked = checked;
		document.querySelector('.icon-full-width-banner').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Full Width Banner: ' + checked);
	});

	// Compact Header Bar & Side Menu
	BROWSER_API.storage.sync.get(['compactHeaderSideMenu'], function (result) {
		const checked = result.compactHeaderSideMenu === true;
		document.querySelector('#checkbox-compact-header-side-menu').checked = checked;
		document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Compact Header Bar & Side Menu: ' + checked);
	});

	// Classic Old UI
	BROWSER_API.storage.sync.get(['classicOldUI'], function (result) {
		const checked = result.classicOldUI === true;
		document.querySelector('#checkbox-classic-old-ui').checked = checked;
		document.querySelector('.icon-classic-old-ui').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Classic Old UI: ' + checked);
	});

	// Multicoloured Post Page Comment Thread Lines
	BROWSER_API.storage.sync.get(['multicolouredThreadLines'], function (result) {
		const checked = result.multicolouredThreadLines === true;
		document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked = checked;
		document.querySelector('.icon-multicoloured-comment-thread-lines').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Multicoloured Post Page Comment Thread Lines: ' + checked);
	});

	// Multicoloured Post Page Comment Thread Lines Colour List
	BROWSER_API.storage.sync.get(['multicolouredThreadLinesColours'], function (result) {
		const value = result.multicolouredThreadLinesColours ?? '';
		document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').value = value;
		console.log('Multicoloured Post Page Comment Thread Lines Colour List: ' + value);
	});

	// Post Table Border Colour
	BROWSER_API.storage.sync.get(['themePostTableBorderColour'], function (result) {
		const checked = result.themePostTableBorderColour === true;
		document.querySelector('#checkbox-post-table-border-colour').checked = checked;
		document.querySelector('.icon-post-table-border-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Post Table Border Colour: ' + checked);
	});

	// Code Block Colour CSS
	BROWSER_API.storage.sync.get(['themeCodeBlockColourCSS'], function (result) {
		const raw = result.themeCodeBlockColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'post-code-fg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Code Block Colour CSS: ' + value);
	});

	// Custom Header Logo
	BROWSER_API.storage.sync.get(['customHeaderLogo'], function (result) {
		const checked = result.customHeaderLogo === true;
		document.querySelector('#checkbox-custom-header-logo').checked = checked;
		document.querySelector('.icon-custom-header-logo').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Custom Header Logo: ' + checked);
	});

	// Custom Header Logo URL
	BROWSER_API.storage.sync.get(['customHeaderLogoUrl'], function (result) {
		const value = result.customHeaderLogoUrl ?? '';
		document.querySelector('#input-custom-header-logo-url').value = value;
		console.log('Custom Header Logo URL: ' + value);
	});

	// Attach Side Menu Header
	BROWSER_API.storage.sync.get(['attachSideMenuHeader'], function (result) {
		const checked = result.attachSideMenuHeader === true;
		document.querySelector('#checkbox-attach-side-menu-header').checked = checked;
		document.querySelector('.icon-attach-side-menu-header').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Attach Side Menu Header: ' + checked);
	});

	// Opt Out Attach Side Menu
	BROWSER_API.storage.sync.get(['optOutAttachSideMenu'], function (result) {
		const checked = result.optOutAttachSideMenu === true;
		document.querySelector('#checkbox-opt-out-attach-side-menu').checked = checked;
		const icon = document.querySelector('.icon-opt-out-attach-side-menu');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-dropdown' : 'icon-dropdown-slash', checked ? 'icon-dropdown-slash' : 'icon-dropdown');
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Opt Out Attach Side Menu: ' + checked);
	});

	// Left Side Vote Buttons
	BROWSER_API.storage.sync.get(['leftSideVoteButtons'], function (result) {
		const checked = result.leftSideVoteButtons === true;
		document.querySelector('#checkbox-left-side-vote-buttons').checked = checked;
		document.querySelector('.icon-left-side-vote-buttons').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Left Side Vote Buttons: ' + checked);
	});

	// Subreddit Display Name Banner
	BROWSER_API.storage.sync.get(['subredditDisplayNameBanner'], function (result) {
		const checked = result.subredditDisplayNameBanner === true;
		document.querySelector('#checkbox-subreddit-display-name-banner').checked = checked;
		document.querySelector('.icon-subreddit-display-name-banner').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Subreddit Display Name Banner: ' + checked);
	});

	// Non Sticky Header Bar
	BROWSER_API.storage.sync.get(['nonStickyHeaderBar'], function (result) {
		const checked = result.nonStickyHeaderBar === true;
		document.querySelector('#checkbox-non-sticky-header-bar').checked = checked;
		const icon = document.querySelector('.icon-non-sticky-header-bar');
		icon.style.backgroundColor = checked ? 'var(--accent)' : '';
		icon.classList.replace(checked ? 'icon-sticky-note' : 'icon-sticky-note-slash', checked ? 'icon-sticky-note-slash' : 'icon-sticky-note');
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Non Sticky Header Bar: ' + checked);
	});

	// Right Side Post Thumbnails
	BROWSER_API.storage.sync.get(['rightSidePostThumbnails'], function (result) {
		const checked = result.rightSidePostThumbnails === true;
		document.querySelector('#checkbox-right-side-post-thumbnails').checked = checked;
		document.querySelector('.icon-right-side-post-thumbnails').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Right Side Post Thumbnails: ' + checked);
	});

	// Sub Header Background Colour
	BROWSER_API.storage.sync.get(['themeSubHeaderBackgroundColour'], function (result) {
		const checked = result.themeSubHeaderBackgroundColour === true;
		document.querySelector('#checkbox-sub-header-bg-colour').checked = checked;
		document.querySelector('.icon-sub-header-bg-colour').style.backgroundColor = checked ? 'var(--accent)' : '';
		if (checked) highlightMenuIcon('style-tweaks');
		console.log('Sub Header Background Colour: ' + checked);
	});

	// Sub Header Background Colour CSS
	BROWSER_API.storage.sync.get(['themeSubHeaderBackgroundColourCSS'], function (result) {
		const raw = result.themeSubHeaderBackgroundColourCSS ?? '';
		const value = validateColour(raw);
		const get_picker = colour_pickers.find((item) => item.id === 'sub-header-bg')?.picker;
		if (get_picker) get_picker.setColor(value);
		console.log('Sub Header Background Colour CSS: ' + value);
	});
}
