// ────────────────────────────────────────────────────────────────────────────
// Popup / Inputs / Style Tweaks
// ────────────────────────────────────────────────────────────────────────────

import { debounce } from '../../utilities/debounce';
import { sendMessage } from '../../utilities/send_message';

// Toggle - Mind The Gap
document.querySelector('#checkbox-hide-gap').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ hideGap: this.checked });
	sendMessage({ hideGap: this.checked });
	document.querySelector('.hide-gap').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Add Drop Shadow
document.querySelector('#checkbox-add-drop-shadow').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ addDropShadow: this.checked });
	sendMessage({ addDropShadow: this.checked });
	const icon = document.querySelector('.icon-add-drop-shadow');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-light-off' : 'icon-light-on', this.checked ? 'icon-light-on' : 'icon-light-off');
});

// Toggle - Drop Shadow CSS Override
document.querySelector('#checkbox-shadow-override').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ overrideDropShadow: this.checked });
	sendMessage({ overrideDropShadow: this.checked });
	document.querySelector('.icon-drop-shadow-override').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Drop Shadow Override CSS
const saveOverrideDropShadowCSS = debounce(function (css) {
	BROWSER_API.storage.sync.set({ overrideDropShadowCSS: css });
}, 500);
document.querySelector('#input-shadow-override-css').addEventListener('input', function () {
	sendMessage({ overrideDropShadowCSS: this.value });
	saveOverrideDropShadowCSS(this.value);
});

// Toggle - Modernise Old Reddit
document.querySelector('#checkbox-modern-old-reddit').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ moderniseOldReddit: this.checked });
	BROWSER_API.storage.sync.set({ hideHeaderSubBar: this.checked });
	BROWSER_API.storage.sync.set({ hideSideMenuOld: this.checked });
	BROWSER_API.storage.sync.set({ largerClassicPost: this.checked });
	document.querySelector('.icon-modern-old-reddit').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	document.querySelector('.icon-hide-header-sub-bar').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	document.querySelector('.icon-hide-side-menu-old').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	document.querySelector('.icon-larger-classic-post').style.backgroundColor = this.checked ? 'var(--accent)' : '';
	sendMessage({ moderniseOldReddit: this.checked });
	sendMessage({ hideHeaderSubBar: this.checked });
	sendMessage({ hideSideMenuOld: this.checked });
	sendMessage({ largerClassicPost: this.checked });
	document.querySelector('#checkbox-hide-header-sub-bar').checked = this.checked;
	document.querySelector('#checkbox-hide-side-menu-old').checked = this.checked;
	document.querySelector('#checkbox-larger-classic-post').checked = this.checked;
});

// Toggle - Header Background Colour
document.querySelector('#checkbox-header-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeHeaderBackgroundColour: this.checked });
	sendMessage({ themeHeaderBackgroundColour: this.checked });
	document.querySelector('.icon-header-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Header Text Colour
document.querySelector('#checkbox-header-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeHeaderTextColour: this.checked });
	sendMessage({ themeHeaderTextColour: this.checked });
	document.querySelector('.icon-header-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Background Colour
document.querySelector('#checkbox-post-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostBackgroundColour: this.checked });
	sendMessage({ themePostBackgroundColour: this.checked });
	document.querySelector('.icon-post-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Text Colour
document.querySelector('#checkbox-post-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostTextColour1: this.checked });
	sendMessage({ themePostTextColour1: this.checked });
	document.querySelector('.icon-post-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Comments Text Colour
document.querySelector('#checkbox-post-comments-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostCommentsTextColour1: this.checked });
	sendMessage({ themePostCommentsTextColour1: this.checked });
	document.querySelector('.icon-post-comments-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Comments Secondary Text Colour
document.querySelector('#checkbox-post-comments-secondary-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostCommentsTextColour2: this.checked });
	sendMessage({ themePostCommentsTextColour2: this.checked });
	document.querySelector('.icon-post-comments-secondary-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Followed Text Colour
document.querySelector('#checkbox-post-followed-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostFollowedTextColour: this.checked });
	sendMessage({ themePostFollowedTextColour: this.checked });
	document.querySelector('.icon-post-followed-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Visited Text Colour
document.querySelector('#checkbox-post-visited-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostVisitedTextColour: this.checked });
	sendMessage({ themePostVisitedTextColour: this.checked });
	document.querySelector('.icon-post-visited-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Text Secondary Colour
document.querySelector('#checkbox-post-text-colour-2').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostTextColour2: this.checked });
	sendMessage({ themePostTextColour2: this.checked });
	document.querySelector('.icon-post-text-colour-2').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Border Colour
document.querySelector('#checkbox-post-border-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostBorderColour: this.checked });
	sendMessage({ themePostBorderColour: this.checked });
	document.querySelector('.icon-post-border-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Theme Blur
const saveThemeBlur = debounce(function (value) {
	BROWSER_API.storage.sync.set({ themeBlur: value });
}, 500);
document.querySelector('#input-theme-blur').addEventListener('input', function () {
	document.querySelector('.icon-theme-blur').style.backgroundColor = this.value != 0 ? 'var(--accent)' : '';
	document.querySelector('#theme-blur-value').innerText = `${this.value}px`;
	sendMessage({ themeBlur: this.value });
	saveThemeBlur(this.value);
});

// Toggle - Theme Exceptions
document.querySelector('#checkbox-theme-exceptions-enable').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeExceptionsEnable: this.checked });
	document.querySelector('.icon-theme-exceptions').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Button - Theme Whitelist
document.querySelector('#btn-theme-whitelist').addEventListener('click', function () {
	this.classList.add('tab-active');
	document.querySelector('#btn-theme-whitelist').nextElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'whitelist' });
});

// Button - Theme Blacklist
document.querySelector('#btn-theme-blacklist').addEventListener('click', function () {
	this.classList.add('tab-active');
	document.querySelector('#btn-theme-blacklist').previousElementSibling.classList.remove('tab-active');
	document.querySelector('[data-lang="ThemeBlacklistInfo"]').classList.remove('hidden');
	document.querySelector('[data-lang="ThemeWhitelistInfo"]').classList.add('hidden');
	BROWSER_API.storage.sync.set({ themeExceptionMode: 'blacklist' });
});

// Textarea - Theme Exceptions
document.querySelector('#input-theme-exceptions').addEventListener(
	'input',
	debounce(function () {
		BROWSER_API.storage.sync.set({ themeExceptionSubList: this.value });
	}, 500),
);

// Toggle - Larger Classic Post
document.querySelector('#checkbox-larger-classic-post').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ largerClassicPost: this.checked });
	sendMessage({ largerClassicPost: this.checked });
	document.querySelector('.icon-larger-classic-post').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Sidebar Text Colour
document.querySelector('#checkbox-sidebar-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSidebarTextColour: this.checked });
	sendMessage({ themeSidebarTextColour: this.checked });
	document.querySelector('.icon-sidebar-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Sidebar Background Colour
document.querySelector('#checkbox-sidebar-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSidebarBgColour: this.checked });
	sendMessage({ themeSidebarBgColour: this.checked });
	document.querySelector('.icon-sidebar-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Side Menu Text Colour
document.querySelector('#checkbox-sidemenu-text-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSidemenuTextColour: this.checked });
	sendMessage({ themeSidemenuTextColour: this.checked });
	document.querySelector('.icon-sidemenu-text-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Side Menu Background Colour
document.querySelector('#checkbox-sidemenu-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSidemenuBgColour: this.checked });
	sendMessage({ themeSidemenuBgColour: this.checked });
	document.querySelector('.icon-sidemenu-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Side Menu Button Hover Colour
document.querySelector('#checkbox-sidemenu-button-hover-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSidemenuButtonHoverColour: this.checked });
	sendMessage({ themeSidemenuButtonHoverColour: this.checked });
	document.querySelector('.icon-sidemenu-button-hover-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Content And Comments Link Colour
document.querySelector('#checkbox-post-content-and-comments-link-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostContentAndCommentsLinkColour: this.checked });
	sendMessage({ themePostContentAndCommentsLinkColour: this.checked });
	document.querySelector('.icon-post-content-and-comments-link-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Searchbar Background Colour
document.querySelector('#checkbox-searchbar-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSearchbarBgColour: this.checked });
	sendMessage({ themeSearchbarBgColour: this.checked });
	document.querySelector('.icon-searchbar-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Searchbar Border Colour
/*document.querySelector('#checkbox-searchbar-border-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSearchbarBorderColour: this.checked });
	sendMessage({ themeSearchbarBorderColour: this.checked });
	document.querySelector('.icon-searchbar-border-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});*/

// Toggle - Searchbar Focused/Dropdown Background Colour
document.querySelector('#checkbox-searchbar-dropdown-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSearchbarDropdownBgColour: this.checked });
	sendMessage({ themeSearchbarDropdownBgColour: this.checked });
	document.querySelector('.icon-searchbar-dropdown-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Slider - Theme Border Radius Amount
const saveBorderRadiusAmount = debounce(function (value) {
	BROWSER_API.storage.sync.set({ borderRadiusAmount: value });
}, 500);
document.querySelector('#input-border-radius-amount').addEventListener('input', function () {
	document.querySelector('#border-radius-amount-value').textContent = this.value != -1 ? this.value + 'px' : '';
	document.querySelector('.icon-border-radius-amount').style.backgroundColor = this.value != -1 ? 'var(--accent)' : '';
	sendMessage({ borderRadiusAmount: this.value });
	saveBorderRadiusAmount(this.value);
});

// Toggle - Post Upvote Colour
document.querySelector('#checkbox-post-upvote-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostUpvoteColour: this.checked });
	sendMessage({ themePostUpvoteColour: this.checked });
	document.querySelector('.icon-post-upvote-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - OP Comment Highlight Colour
document.querySelector('#checkbox-op-comment-highlight-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeOpCommentHighlightColour: this.checked });
	sendMessage({ themeOpCommentHighlightColour: this.checked });
	document.querySelector('.icon-op-comment-highlight-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Post Comment Action Row Colour
document.querySelector('#checkbox-post-comment-action-row-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostCommentActionRowColour: this.checked });
	sendMessage({ themePostCommentActionRowColour: this.checked });
	document.querySelector('.icon-post-comment-action-row-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Full Width Banner
document.querySelector('#checkbox-full-width-banner').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ fullWidthBanner: this.checked });
	sendMessage({ fullWidthBanner: this.checked });
	document.querySelector('.icon-full-width-banner').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Compact Header Bar & Side Menu
document.querySelector('#checkbox-compact-header-side-menu').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ compactHeaderSideMenu: this.checked });
	sendMessage({ compactHeaderSideMenu: this.checked });
	document.querySelector('.icon-compact-header-side-menu').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Classic Old Header
document.querySelector('#checkbox-classic-old-ui').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ classicOldUI: this.checked });
	sendMessage({ classicOldUI: this.checked });
	document.querySelector('.icon-classic-old-ui').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Multicoloured Post Page Comment Thread Lines
document.querySelector('#checkbox-multicoloured-comment-thread-lines').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ multicolouredThreadLines: this.checked });
	sendMessage({ multicolouredThreadLines: this.checked });
	document.querySelector('.icon-multicoloured-comment-thread-lines').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Multicoloured Post Page Comment Thread Lines Colour List
const saveMulticolouredThreadLinesColours = debounce(function (list_value) {
	const isEnabled = document.querySelector('#checkbox-multicoloured-comment-thread-lines').checked;
	sendMessage({ multicolouredThreadLines: { isEnabled, list_value } });
	BROWSER_API.storage.sync.set({ multicolouredThreadLinesColours: list_value });
}, 500);
document.querySelector('#input-multicoloured-comment-thread-lines-colour-list').addEventListener('input', function () {
	saveMulticolouredThreadLinesColours(this.value);
});

// Toggle - Post Table Border Colour
document.querySelector('#checkbox-post-table-border-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themePostTableBorderColour: this.checked });
	sendMessage({ themePostTableBorderColour: this.checked });
	document.querySelector('.icon-post-table-border-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Custom Header Logo
document.querySelector('#checkbox-custom-header-logo').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ customHeaderLogo: this.checked });
	sendMessage({ customHeaderLogo: this.checked });
	document.querySelector('.icon-custom-header-logo').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Input - Custom Header Logo URL
const saveCustomHeaderLogoUrl = debounce(function (url) {
	sendMessage({ setCustomHeaderLogoUrl: this.value });
	BROWSER_API.storage.sync.set({ customHeaderLogoUrl: url });
}, 500);
document.querySelector('#input-custom-header-logo-url').addEventListener('input', function () {
	saveCustomHeaderLogoUrl(this.value);
});

// Toggle - Attach Side Menu Header
document.querySelector('#checkbox-attach-side-menu-header').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ attachSideMenuHeader: this.checked });
	sendMessage({ attachSideMenuHeader: this.checked });
	document.querySelector('.icon-attach-side-menu-header').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Opt Out Attach Side Menu
document.querySelector('#checkbox-opt-out-attach-side-menu').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ optOutAttachSideMenu: this.checked });
	sendMessage({ optOutAttachSideMenu: this.checked });
	const icon = document.querySelector('.icon-opt-out-attach-side-menu');
	icon.style.backgroundColor = this.checked ? 'var(--accent)' : '';
	icon.classList.replace(this.checked ? 'icon-dropdown' : 'icon-dropdown-slash', this.checked ? 'icon-dropdown-slash' : 'icon-dropdown');
});

// Toggle - Left Side Vote Buttons
document.querySelector('#checkbox-left-side-vote-buttons').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ leftSideVoteButtons: this.checked });
	sendMessage({ leftSideVoteButtons: this.checked });
	document.querySelector('.icon-left-side-vote-buttons').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Subreddit Display Name Banner
document.querySelector('#checkbox-subreddit-display-name-banner').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ subredditDisplayNameBanner: this.checked });
	sendMessage({ subredditDisplayNameBanner: this.checked });
	document.querySelector('.icon-subreddit-display-name-banner').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Right Side Post Thumbnails
document.querySelector('#checkbox-right-side-post-thumbnails').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ rightSidePostThumbnails: this.checked });
	sendMessage({ rightSidePostThumbnails: this.checked });
	document.querySelector('.icon-right-side-post-thumbnails').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Force Dark Mode
document.querySelector('#checkbox-force-dark-mode').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ forceDarkMode: this.checked });
	sendMessage({ forceDarkMode: this.checked });
	document.querySelector('.icon-force-dark-mode').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});

// Toggle - Sub Header Background Colour
document.querySelector('#checkbox-sub-header-bg-colour').addEventListener('change', function () {
	BROWSER_API.storage.sync.set({ themeSubHeaderBackgroundColour: this.checked });
	sendMessage({ themeSubHeaderBackgroundColour: this.checked });
	document.querySelector('.icon-sub-header-bg-colour').style.backgroundColor = this.checked ? 'var(--accent)' : '';
});
