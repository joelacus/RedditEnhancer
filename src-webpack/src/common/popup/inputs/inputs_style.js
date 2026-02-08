/* ===== Inputs / Style Tweaks ===== */

import { sendMessage } from '../send_message';

// Toggle - Mind The Gap
document.querySelector('#checkbox-hide-gap').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-hide-gap').checked;
	BROWSER_API.storage.sync.set({ hideGap: value });
	document.querySelector('.hide-gap').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ hideGap: value });
});

// Toggle - Add Drop Shadow
document.querySelector('#checkbox-add-drop-shadow').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-add-drop-shadow').checked;
	BROWSER_API.storage.sync.set({ addDropShadow: value });
	sendMessage({ addDropShadow: value });
	const icon = document.querySelector('.icon-add-drop-shadow');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-light-off' : 'icon-light-on', value ? 'icon-light-on' : 'icon-light-off');
});

// Toggle - Drop Shadow CSS Override
document.querySelector('#checkbox-shadow-override').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-shadow-override').checked;
	document.querySelector('.icon-drop-shadow-override').style.backgroundColor = value === true ? 'var(--accent)' : '';
	BROWSER_API.storage.sync.set({ overrideDropShadow: value });
	sendMessage({ overrideDropShadow: value });
});

// Input - Drop Shadow Override CSS
document.querySelector('#input-shadow-override-css').addEventListener('keyup', () => {
	const css = document.querySelector('#input-shadow-override-css').value;
	BROWSER_API.storage.sync.set({ overrideDropShadowCSS: css });
	sendMessage({ overrideDropShadowCSS: css });
});

// Toggle - Modernise Old Reddit
document.querySelector('#checkbox-modern-old-reddit').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-modern-old-reddit').checked;
	BROWSER_API.storage.sync.set({ moderniseOldReddit: value });
	BROWSER_API.storage.sync.set({ hideHeaderSubBar: value });
	BROWSER_API.storage.sync.set({ hideSideMenuOld: value });
	BROWSER_API.storage.sync.set({ largerClassicPost: value });
	document.querySelector('.icon-modern-old-reddit').style.backgroundColor = value === true ? 'var(--accent)' : '';
	document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = value === true ? 'var(--accent)' : '';
	document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = value === true ? 'var(--accent)' : '';
	document.querySelector('.icon-larger-classic-post').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ moderniseOldReddit: value });
	sendMessage({ hideHeaderSubBar: value });
	sendMessage({ hideSideMenuOld: value });
	sendMessage({ largerClassicPost: value });
	document.querySelector('#checkbox-hide-header-sub-bar').checked = value;
	document.querySelector('#checkbox-hide-side-menu-old').checked = value;
	document.querySelector('#checkbox-larger-classic-post').checked = value;
});

// Toggle - Header Background Colour
document.querySelector('#checkbox-header-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-header-bg-colour').checked;
	BROWSER_API.storage.sync.set({ themeHeaderBackgroundColour: value });
	document.querySelector('.icon-header-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeHeaderBackgroundColour: value });
});

// Toggle - Header Text Colour
document.querySelector('#checkbox-header-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-header-text-colour').checked;
	BROWSER_API.storage.sync.set({ themeHeaderTextColour: value });
	document.querySelector('.icon-header-text-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeHeaderTextColour: value });
});

// Toggle - Post Background Colour
document.querySelector('#checkbox-post-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-bg-colour').checked;
	BROWSER_API.storage.sync.set({ themePostBackgroundColour: value });
	document.querySelector('.icon-post-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostBackgroundColour: value });
});

// Toggle - Post Text Colour
document.querySelector('#checkbox-post-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-text-colour').checked;
	BROWSER_API.storage.sync.set({ themePostTextColour1: value });
	document.querySelector('.icon-post-text-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostTextColour1: value });
});

// Toggle - Post Comments Text Colour
document.querySelector('#checkbox-post-comments-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-comments-text-colour').checked;
	BROWSER_API.storage.sync.set({ themePostCommentsTextColour1: value });
	document.querySelector('.icon-post-comments-text-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostCommentsTextColour1: value });
});

// Toggle - Post Comments Secondary Text Colour
document.querySelector('#checkbox-post-comments-secondary-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-comments-secondary-text-colour').checked;
	BROWSER_API.storage.sync.set({ themePostCommentsTextColour2: value });
	document.querySelector('.icon-post-comments-secondary-text-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostCommentsTextColour2: value });
});

// Toggle - Post Followed Text Colour
document.querySelector('#checkbox-post-followed-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-followed-text-colour').checked;
	BROWSER_API.storage.sync.set({ themePostFollowedTextColour: value });
	document.querySelector('.icon-post-followed-text-colour').style.backgroundColor = value ? 'var(--accent)' : '';
	sendMessage({ themePostFollowedTextColour: value });
});

// Toggle - Post Visited Text Colour
document.querySelector('#checkbox-post-visited-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-visited-text-colour').checked;
	BROWSER_API.storage.sync.set({ themePostVisitedTextColour: value });
	document.querySelector('.icon-post-visited-text-colour').style.backgroundColor = value ? 'var(--accent)' : '';
	sendMessage({ themePostVisitedTextColour: value });
});

// Toggle - Post Text Secondary Colour
document.querySelector('#checkbox-post-text-colour-2').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-text-colour-2').checked;
	BROWSER_API.storage.sync.set({ themePostTextColour2: value });
	document.querySelector('.icon-post-text-colour-2').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostTextColour2: value });
});

// Toggle - Post Border Colour
document.querySelector('#checkbox-post-border-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-border-colour').checked;
	BROWSER_API.storage.sync.set({ themePostBorderColour: value });
	document.querySelector('.icon-post-border-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostBorderColour: value });
});

// Slider - Theme Blur
document.querySelector('#input-theme-blur').addEventListener('input', (e) => {
	const value = e.target.value;
	document.querySelector('.icon-theme-blur').style.backgroundColor = value !== 0 ? 'var(--accent)' : '';
	document.querySelector('#theme-blur-value').innerText = `${value}px`;
	sendMessage({ themeBlur: value });
});
document.querySelector('#input-theme-blur').addEventListener('mouseup', (e) => {
	// save value on mouseup to significantly reduce api writes.
	BROWSER_API.storage.sync.set({ themeBlur: e.target.value });
});

// Toggle - Theme Exceptions
document.querySelector('#checkbox-theme-exceptions-enable').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-theme-exceptions-enable').checked;
	BROWSER_API.storage.sync.set({ themeExceptionsEnable: value });
	document.querySelector('.icon-theme-exceptions').style.backgroundColor = value === true ? 'var(--accent)' : '';
});

// Button - Theme Whitelist
document.querySelector('#btn-theme-whitelist').addEventListener('click', () => {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-theme-whitelist').nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'whitelist' });
});

// Button - Theme Blacklist
document.querySelector('#btn-theme-blacklist').addEventListener('click', () => {
	e.currentTarget.classList.add('tab-active');
	document.querySelector('#btn-theme-blacklist').previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'blacklist' });
});

// Textarea - Theme Exceptions
document.querySelector('#input-theme-exceptions').addEventListener('keyup', (e) => {
	BROWSER_API.storage.sync.set({ themeExceptionSubList: e.target.value });
});

// Toggle - Larger Classic Post
document.querySelector('#checkbox-larger-classic-post').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-larger-classic-post').checked;
	BROWSER_API.storage.sync.set({ largerClassicPost: value });
	document.querySelector('.icon-larger-classic-post').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ largerClassicPost: value });
});

// Toggle - Sidebar Text Colour
document.querySelector('#checkbox-sidebar-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-sidebar-text-colour').checked;
	BROWSER_API.storage.sync.set({ themeSidebarTextColour: value });
	document.querySelector('.icon-sidebar-text-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSidebarTextColour: value });
});

// Toggle - Sidebar Background Colour
document.querySelector('#checkbox-sidebar-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-sidebar-bg-colour').checked;
	BROWSER_API.storage.sync.set({ themeSidebarBgColour: value });
	document.querySelector('.icon-sidebar-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSidebarBgColour: value });
});

// Toggle - Side Menu Text Colour
document.querySelector('#checkbox-sidemenu-text-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-sidemenu-text-colour').checked;
	BROWSER_API.storage.sync.set({ themeSidemenuTextColour: value });
	document.querySelector('.icon-sidemenu-text-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSidemenuTextColour: value });
});

// Toggle - Side Menu Background Colour
document.querySelector('#checkbox-sidemenu-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-sidemenu-bg-colour').checked;
	BROWSER_API.storage.sync.set({ themeSidemenuBgColour: value });
	document.querySelector('.icon-sidemenu-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSidemenuBgColour: value });
});

// Toggle - Side Menu Button Hover Colour
document.querySelector('#checkbox-sidemenu-button-hover-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-sidemenu-button-hover-colour').checked;
	BROWSER_API.storage.sync.set({ themeSidemenuButtonHoverColour: value });
	document.querySelector('.icon-sidemenu-button-hover-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSidemenuButtonHoverColour: value });
});

// Toggle - Post Content And Comments Link Colour
document.querySelector('#checkbox-post-content-and-comments-link-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-content-and-comments-link-colour').checked;
	BROWSER_API.storage.sync.set({ themePostContentAndCommentsLinkColour: value });
	document.querySelector('.icon-post-content-and-comments-link-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostContentAndCommentsLinkColour: value });
});

// Toggle - Searchbar Background Colour
document.querySelector('#checkbox-searchbar-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-searchbar-bg-colour').checked;
	BROWSER_API.storage.sync.set({ themeSearchbarBgColour: value });
	document.querySelector('.icon-searchbar-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSearchbarBgColour: value });
});

// Toggle - Searchbar Border Colour
/*document.querySelector('#checkbox-searchbar-border-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-searchbar-border-colour').checked;
	BROWSER_API.storage.sync.set({ themeSearchbarBorderColour: value });
	document.querySelector('.icon-searchbar-border-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSearchbarBorderColour: value });
});*/

// Toggle - Searchbar Focused/Dropdown Background Colour
document.querySelector('#checkbox-searchbar-dropdown-bg-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-searchbar-dropdown-bg-colour').checked;
	BROWSER_API.storage.sync.set({ themeSearchbarDropdownBgColour: value });
	document.querySelector('.icon-searchbar-dropdown-bg-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeSearchbarDropdownBgColour: value });
});

// Slider - Theme Border Radius Amount
document.querySelector('#input-border-radius-amount').addEventListener('input', (e) => {
	document.querySelector('#border-radius-amount-value').textContent = e.target.value != -1 ? e.target.value + 'px' : '';
	document.querySelector('.icon-border-radius-amount').style.backgroundColor = e.target.value != -1 ? 'var(--accent)' : '';
	sendMessage({ borderRadiusAmount: e.target.value });
});
document.querySelector('#input-border-radius-amount').addEventListener('mouseup', (e) => {
	// save value on mouseup to significantly reduce api writes.
	BROWSER_API.storage.sync.set({ borderRadiusAmount: e.target.value });
});

// Toggle - Post Upvote Colour
document.querySelector('#checkbox-post-upvote-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-upvote-colour').checked;
	BROWSER_API.storage.sync.set({ themePostUpvoteColour: value });
	document.querySelector('.icon-post-upvote-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostUpvoteColour: value });
});

// Toggle - OP Comment Highlight Colour
document.querySelector('#checkbox-op-comment-highlight-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-op-comment-highlight-colour').checked;
	BROWSER_API.storage.sync.set({ themeOpCommentHighlightColour: value });
	document.querySelector('.icon-op-comment-highlight-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themeOpCommentHighlightColour: value });
});

// Toggle - Post Comment Action Row Colour
document.querySelector('#checkbox-post-comment-action-row-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-comment-action-row-colour').checked;
	BROWSER_API.storage.sync.set({ themePostCommentActionRowColour: value });
	document.querySelector('.icon-post-comment-action-row-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostCommentActionRowColour: value });
});

// Toggle - Full Width Banner
document.querySelector('#checkbox-full-width-banner').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-full-width-banner').checked;
	BROWSER_API.storage.sync.set({ fullWidthBanner: value });
	document.querySelector('.icon-full-width-banner').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ fullWidthBanner: value });
});

// Toggle - Compact Header Bar & Side Menu
document.querySelector('#checkbox-compact-header-side-menu').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-compact-header-side-menu').checked;
	BROWSER_API.storage.sync.set({ compactHeaderSideMenu: value });
	document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ compactHeaderSideMenu: value });
});

// Toggle - Classic Old Header
document.querySelector('#checkbox-classic-old-ui').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-classic-old-ui').checked;
	BROWSER_API.storage.sync.set({ classicOldUI: value });
	document.querySelector('.icon-classic-old-ui').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ classicOldUI: value });
});

// Toggle - Multicoloured Post Page Comment Thread Lines
document.querySelector('#checkbox-multicoloured-comment-thread-lines').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked;
	BROWSER_API.storage.sync.set({ multicolouredThreadLines: value });
	document.querySelector('.icon-multicoloured-comment-thread-lines').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ multicolouredThreadLines: value });
});

// Input - Multicoloured Post Page Comment Thread Lines Colour List
document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').addEventListener('input', () => {
	const value = document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked;
	const list_value = document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').value;
	BROWSER_API.storage.sync.set({ multicolouredThreadLinesColours: list_value });
	sendMessage({ multicolouredThreadLines: { value, list_value } });
});

// Toggle - Post Table Border Colour
document.querySelector('#checkbox-post-table-border-colour').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-post-table-border-colour').checked;
	BROWSER_API.storage.sync.set({ themePostTableBorderColour: value });
	document.querySelector('.icon-post-table-border-colour').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ themePostTableBorderColour: value });
});

// Toggle - Custom Header Logo
document.querySelector('#checkbox-custom-header-logo').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-custom-header-logo').checked;
	BROWSER_API.storage.sync.set({ customHeaderLogo: value });
	document.querySelector('.icon-custom-header-logo').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ customHeaderLogo: value });
});

// Input - Custom Header Logo URL
document.querySelector('#input-custom-header-logo-url').addEventListener('keyup', () => {
	const url = document.querySelector('#input-custom-header-logo-url').value;
	BROWSER_API.storage.sync.set({ customHeaderLogoUrl: url });
	sendMessage({ setCustomHeaderLogoUrl: url });
});

// Toggle - Attach Side Menu Header
document.querySelector('#checkbox-attach-side-menu-header').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-attach-side-menu-header').checked;
	BROWSER_API.storage.sync.set({ attachSideMenuHeader: value });
	document.querySelector('.icon-attach-side-menu-header').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ attachSideMenuHeader: value });
});

// Toggle - Opt Out Attach Side Menu
document.querySelector('#checkbox-opt-out-attach-side-menu').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-opt-out-attach-side-menu').checked;
	BROWSER_API.storage.sync.set({ optOutAttachSideMenu: value });
	const icon = document.querySelector('.icon-opt-out-attach-side-menu');
	icon.style.backgroundColor = value === true ? 'var(--accent)' : '';
	icon.classList.replace(value ? 'icon-dropdown' : 'icon-dropdown-slash', value ? 'icon-dropdown-slash' : 'icon-dropdown');
	sendMessage({ optOutAttachSideMenu: value });
});

// Toggle - Left Side Vote Buttons
document.querySelector('#checkbox-left-side-vote-buttons').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-left-side-vote-buttons').checked;
	BROWSER_API.storage.sync.set({ leftSideVoteButtons: value });
	document.querySelector('.icon-left-side-vote-buttons').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ leftSideVoteButtons: value });
});

// Toggle - Subreddit Display Name Banner
document.querySelector('#checkbox-subreddit-display-name-banner').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-subreddit-display-name-banner').checked;
	BROWSER_API.storage.sync.set({ subredditDisplayNameBanner: value });
	document.querySelector('.icon-subreddit-display-name-banner').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ subredditDisplayNameBanner: value });
});

// Toggle - Right Side Post Thumbnails
document.querySelector('#checkbox-right-side-post-thumbnails').addEventListener('change', () => {
	const value = document.querySelector('#checkbox-right-side-post-thumbnails').checked;
	BROWSER_API.storage.sync.set({ rightSidePostThumbnails: value });
	document.querySelector('.icon-right-side-post-thumbnails').style.backgroundColor = value === true ? 'var(--accent)' : '';
	sendMessage({ rightSidePostThumbnails: value });
});
