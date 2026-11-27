/**
 * Tweaks: Style - Theme Colours
 *
 * @description Change the colours of various elements on Reddit.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

import { validateColour } from '../../../popup/restore/validation';
import { loadFixThreadlinesForTranslucentPosts } from './helpers/fix_threadlines_for_translucent_posts';
import { setPostOverflowMenuShadowStyle, removePostOverflowMenuShadowStyle } from './helpers/post_overflow_menu_shadow';
import { applyPresetTheme, clearPresetSelected, isPresetThemeApplied, normalisePresetId, removePresetTheme, setPresetOpacity, setPresetSelected } from './preset_themes';

const POST_BG_OVERFLOW_STYLE_ID = 're-theme-post-bg-overflow-menu';
const POST_BG_OVERFLOW_HOST_CSS = `
	faceplate-menu {
		background-color: var(--re-theme-post-bg-opaque, var(--re-p-surface)) !important;
	}`;
const POST_BG_OVERFLOW_DROPDOWN_CSS = `
	.hovercard-body {
		background-color: var(--re-theme-post-bg-opaque, var(--re-p-surface)) !important;
	}`;

// Set a theme custom property, ignoring missing or invalid colour values
// (e.g. corrupted sync data) instead of applying them to the page.
function setThemeProperty(name, value) {
	if (typeof value !== 'string' || value === '') return;
	const colour = validateColour(value, '');
	if (colour === '') return;
	document.documentElement.style.setProperty(name, colour);
}

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

// Theme exception check, shared by the page load and popup messages.
function isThemeAllowedOnPage(result) {
	if (result.themeExceptionsEnable != true) return true;
	const list = String(result.themeExceptionSubList || '')
		.replaceAll(' ', '')
		.split(',')
		.filter(Boolean);
	if (list.length === 0) return true;
	const link = window.location.href;
	const matches = list.some((sub) => link.includes('r/' + sub + '/'));
	if (result.themeExceptionMode === 'whitelist') return matches;
	if (result.themeExceptionMode === 'blacklist') return !matches;
	return true;
}

// Theme Exception + Base Theme
export function loadCustomTheme() {
	BROWSER_API.storage.sync.get(['themeExceptionsEnable', 'themeExceptionMode', 'themeExceptionSubList', 'themeBase', 'themeBaseOpacity'], function (result) {
		const preset = normalisePresetId(result.themeBase);
		const allowed = isThemeAllowedOnPage(result);
		removeTheme();
		if (preset) {
			setPresetSelected(preset);
		} else {
			clearPresetSelected();
		}
		if (!allowed) {
			removePresetTheme();
			return;
		}
		// The individual colour options layer on top of the base theme, so they
		// are loaded whether or not a base theme is selected.
		if (redditVersion === 'newnew') loadTheme();
		if (preset) {
			applyPresetTheme(preset, result.themeBaseOpacity);
		} else {
			removePresetTheme();
		}
	});
}

// Apply a base theme change from the popup. The message value is used
// directly instead of re-reading storage, so a fast theme switch cannot race
// the storage write. "None" removes the base theme and leaves the individual
// colour options in place.
export function themeBase(value) {
	const preset = normalisePresetId(value);
	BROWSER_API.storage.sync.get(['themeExceptionsEnable', 'themeExceptionMode', 'themeExceptionSubList', 'themeBaseOpacity'], function (result) {
		const allowed = isThemeAllowedOnPage(result);
		if (preset) {
			setPresetSelected(preset);
		} else {
			clearPresetSelected();
		}
		if (!allowed) {
			removePresetTheme();
			removeTheme();
		} else if (preset) {
			applyPresetTheme(preset, result.themeBaseOpacity);
		} else {
			removePresetTheme();
		}
		loadFixThreadlinesForTranslucentPosts({ preset });
	});
}

export function themeBaseOpacity(value) {
	if (!isPresetThemeApplied()) return;
	setPresetOpacity(value);
	loadFixThreadlinesForTranslucentPosts({ opacity: value });
}

// Load Theme
function loadTheme() {
	BROWSER_API.storage.sync.get(['themeBlur'], function (result) {
		const blur = result.themeBlur ?? '';
		if (blur) {
			themeBlur(blur);
		} else {
			themeBlur('10px');
		}
	});

	// Add theme styles while the page is still loading.
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour', 'themeHeaderTextColour', 'themePostBackgroundColour', 'themePostBorderColour', 'themePostCommentsTextColour1', 'themePostCommentsTextColour2', 'themePostContentAndCommentsLinkColour', 'themePostTextColour1', 'themeCodeBlockColourCSS', 'themePostTextColour2', 'themePostFollowedTextColour', 'themePostVisitedTextColour', 'themeSearchbarBgColour', 'themeSearchbarBorderColour', 'themeSearchbarDropdownBgColour', 'themeSidebarBgColour', 'themeSidebarTextColour', 'themeSidemenuBgColour', 'themeSidemenuButtonHoverColour', 'themeSidemenuTextColour', 'themePostUpvoteColour', 'themePostDownvoteColour', 'themePostCommentActionRowColour', 'themePostTableBorderColour', 'themeSubHeaderBackgroundColour', 'themeProfileHeaderBgColour'], function (result) {
		themeHeaderBackgroundColour(result.themeHeaderBackgroundColour);
		themeHeaderTextColour(result.themeHeaderTextColour);
		themePostBackgroundColour(result.themePostBackgroundColour);
		themePostBorderColour(result.themePostBorderColour);
		themePostCommentsTextColour1(result.themePostCommentsTextColour1);
		themePostCommentsTextColour2(result.themePostCommentsTextColour2);
		themePostContentAndCommentsLinkColour(result.themePostContentAndCommentsLinkColour);
		themePostTextColour1(result.themePostTextColour1);
		themePostTableBorderColour(result.themePostTableBorderColour);
		themeCodeBlockColourCSS(result.themeCodeBlockColourCSS);
		themePostTextColour2(result.themePostTextColour2);
		themePostVisitedTextColour(result.themePostVisitedTextColour);
		themePostFollowedTextColour(result.themePostFollowedTextColour);
		themeSearchbarBgColour(result.themeSearchbarBgColour);
		//themeSearchbarBorderColour(result.themeSearchbarBorderColour);
		themeSearchbarDropdownBgColour(result.themeSearchbarDropdownBgColour);
		themeSidebarBgColour(result.themeSidebarBgColour);
		themeSidebarTextColour(result.themeSidebarTextColour);
		themeSidemenuBgColour(result.themeSidemenuBgColour);
		themeSidemenuButtonHoverColour(result.themeSidemenuButtonHoverColour);
		themeSidemenuTextColour(result.themeSidemenuTextColour);
		themePostUpvoteColour(result.themePostUpvoteColour);
		themePostDownvoteColour(result.themePostDownvoteColour);
		themePostCommentActionRowColour(result.themePostCommentActionRowColour);
		themeSubHeaderBackgroundColour(result.themeSubHeaderBackgroundColour);
		themeProfileHeaderBgColour(result.themeProfileHeaderBgColour);
	});
}

// Load theme tweaks that require the page to be fully loaded first.
export function loadThemeAfterPageLoad() {
	BROWSER_API.storage.sync.get(['themeOpCommentHighlightColour', 'themeOpCommentHighlightColourCSS'], function (result) {
		themeOpCommentHighlightColour(result.themeOpCommentHighlightColour === true);
		themeOpCommentHighlightColourCSS(result.themeOpCommentHighlightColourCSS);
	});
}

// Remove all per-element theme colours. The OP comment highlight and the
// translucent-comment threadline fix are independent tweaks that must keep
// working while a base theme is active, so they are left alone.
function removeTheme() {
	const root = document.documentElement;
	const properties = [];
	for (let i = 0; i < root.style.length; i++) {
		const name = root.style[i];
		if (name.startsWith('--re-theme-') && name !== '--re-theme-op-comment-highlight-colour') {
			properties.push(name);
		}
	}
	properties.forEach((name) => root.style.removeProperty(name));

	document.querySelectorAll('style[id^="re-theme-"]').forEach((element) => {
		if (element.id !== 're-theme-op-comment-highlight-colour' && element.id !== 're-theme-fix-comment-threadline') {
			element.remove();
		}
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

// Header Background Colour
export function themeHeaderBackgroundColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
			if (typeof result.themeHeaderBackgroundColourCSS !== 'undefined' && result.themeHeaderBackgroundColourCSS !== 'undefined') {
				setThemeProperty('--re-theme-header-bg', result.themeHeaderBackgroundColourCSS);
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-header-bg-colour';
		styleElement.textContent = `header,
									#user-drawer-content {
										--color-neutral-background: var(--re-theme-header-bg);
										--color-neutral-background-strong: var(--re-theme-header-bg);
										backdrop-filter: blur(var(--re-theme-blur)) !important;
									}
									html.theme-dark reddit-search-large {
										--color-neutral-background-strong: #181C1F !important;
									}
									html.theme-dark header {
										--color-secondary-background: rgba(0,0,0,0.3) !important;
										--color-secondary-background-hover: rgba(0,0,0,0.6) !important;
										--color-secondary-background-selected: rgba(0,0,0,0.6) !important;
										--color-neutral-background-hover: rgba(0,0,0,0.6) !important;
									}
									html.theme-light reddit-search-large {
										--color-neutral-background-strong: white !important;
									}
									html.theme-light header {
										--color-secondary-background: rgba(255,255,255,0.3) !important;
										--color-secondary-background-hover: rgba(255,255,255,0.6) !important;
										--color-secondary-background-selected: rgba(255,255,255,0.6) !important;
										--color-neutral-background-hover: rgba(255,255,255,0.6) !important;
									}
									reddit-search-large {
										display: flex;
										width: 100% !important;
										border-radius: var(--radius-md);
										backdrop-filter: blur(var(--re-theme-blur));
									}
									reddit-header-large button:hover,
									reddit-header-large a.button-plain:hover {
										--button-color-background: oklch(from var(--re-theme-header-bg) clamp(0.20, calc(l + 0.05), 0.92) c h) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-header-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Header Background Colour CSS
export function themeHeaderBackgroundColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
			if (result.themeHeaderBackgroundColour) setThemeProperty('--re-theme-header-bg', value);
		});
	}
}

// Header Text Colour
export function themeHeaderTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
			if (typeof result.themeHeaderTextColourCSS !== 'undefined' && result.themeHeaderTextColourCSS !== 'undefined') {
				setThemeProperty('--re-theme-header-text', result.themeHeaderTextColourCSS);
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-header-text-colour';
		styleElement.textContent = `header * {
										--button-color-text-default: var(--re-theme-header-text);
										--color-secondary: var(--re-theme-header-text);
										--button-color-text-activated: var(--re-theme-header-text) !important;
										color: var(--re-theme-header-text);
									}
									header > nav > :last-child > :nth-child(2) svg {
										color: var(--re-theme-header-text) !important;
										fill: var(--re-theme-header-text) !important;
									}
									reddit-search-large {
										--color-neutral-content-strong: var(--re-theme-header-text) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-header-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Header Text Colour CSS
export function themeHeaderTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
			if (result.themeHeaderTextColour) setThemeProperty('--re-theme-header-text', value);
		});
	}
}

// Sub Header Background Colour
export function themeSubHeaderBackgroundColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSubHeaderBackgroundColourCSS'], function (result) {
			if (typeof result.themeSubHeaderBackgroundColourCSS !== 'undefined' && result.themeSubHeaderBackgroundColourCSS !== 'undefined') {
				setThemeProperty('--re-theme-sub-header-bg', result.themeSubHeaderBackgroundColourCSS);
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-sub-header-bg-colour';
		styleElement.textContent = `.re-full-width-banner .masthead,
									#subreddit-banner-img {
										background: none !important;
									}
									.masthead,
									div:has(>[bundlename="shreddit_sort_dropdown"]) {
										background-color: var(--re-theme-sub-header-bg) !important;
									}
									div.masthead:has(#subreddit-banner-img[class*="image:var"]) section{
										padding-top: 8px !important;
									}
									div.masthead:not(:has(#subreddit-banner-img[class*="image:var"])) section{
										margin-top: 0 !important;
									}
									div:has(>[bundlename="shreddit_sort_dropdown"]) {
										border-radius: var(--re-theme-border-radius);
									}
									div.masthead:not(:has(#subreddit-banner-img[class*="image:var"])) #subreddit-banner-img {
										border-bottom-left-radius: 0 !important;
										border-bottom-right-radius: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-sub-header-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sub-header-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Sub Header Background Colour CSS
export function themeSubHeaderBackgroundColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSubHeaderBackgroundColour'], function (result) {
			if (result.themeSubHeaderBackgroundColour) setThemeProperty('--re-theme-sub-header-bg', value);
		});
	}
}

// Post Background Colour
export function themePostBackgroundColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
			if (typeof result.themePostBackgroundColourCSS !== 'undefined' && result.themePostBackgroundColourCSS !== 'undefined') {
				setThemeProperty('--re-theme-post-bg', result.themePostBackgroundColourCSS);
				document.documentElement.style.setProperty('--re-theme-post-bg-opaque', 'oklch(from var(--re-theme-post-bg) l c h / 100%)');
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-bg-colour';
		styleElement.textContent = `:root shreddit-app[routename="post_page"] .grid-container .main,
									:root shreddit-app[routename="comments_page"] .grid-container .main,
									:root shreddit-app[routename="profile_post_page_comments"] .grid-container .main,
									r-post-type-select + section {
										--color-neutral-background: var(--re-theme-post-bg) !important;
										--shreddit-content-background: transparent;
										background-color: var(--re-theme-post-bg);
									}
									shreddit-app[routename="post_page"] [slot="credit-bar"] {
										background: transparent;
									}
									r-post-type-select {
										margin-left: 0;
									}
									article shreddit-post,
									shreddit-app[routename="comments_page"] #main-content,
									[routename="post_page"] main.main,
									community-highlight-carousel,
									.subgrid-container > .masthead,
									shreddit-profile-comment {
										backdrop-filter: blur(var(--re-theme-blur)) !important;
									}
									shreddit-feed article,
									shreddit-post,
									comment-body-header,
									#comment-tree {
										--shreddit-content-background: transparent !important;
										--color-neutral-background: var(--re-theme-post-bg) !important;
									}
									div[slot="mod-queue-feed"],
									community-highlight-card {
										--color-neutral-background: var(--re-theme-post-bg);
										--color-neutral-background-weak: var(--re-theme-post-bg);
									}
									div[data-test-id="pm-archive-conversation"],
									aside#mod-queue-pdp-panel,
									#subreddit-wiki-header,
									#subreddit-wiki-header + div {
										background-color: var(--re-theme-post-bg);
									}
									shreddit-feed shreddit-post:hover,
									community-highlight-card:hover {
										--color-neutral-background-hover: color-mix(in srgb, var(--re-theme-post-bg), #000 5%) !important;
										background-color: color-mix(in srgb, var(--re-theme-post-bg), #000 5%) !important;
									}
									shreddit-feed shreddit-post:focus-within {
										--color-neutral-background-hover: var(--re-theme-post-bg);
									}
									div[slot="post-insights-panel"] > faceplate-tracker > div {
										background-color: inherit !important;
									}
									[pagetype="search_results"] main.main > div {
										--color-neutral-background: var(--re-theme-post-bg) !important;
										backdrop-filter: blur(var(--re-theme-blur)) !important;
										border-radius: 8px;
									}
									#main-content [bundlename="comment_body_header"],
									main.main [bundlename="comment_body_header"] {
										position: relative;
									}
									@media (min-width: 960px) {
										[bundlename="comment_body_header"] comment-body-header {
											margin-left: -0.5rem;
											margin-bottom: 0;
											padding-left: 8px;
											padding-top: 12px;
										}
									}
									shreddit-comments-sort-dropdown {
										--color-neutral-background: transparent !important;
									}
									main.main > a,
									shreddit-profile-comment {
										background-color: var(--re-theme-post-bg) !important;
										border-radius: var(--re-theme-border-radius, 1rem);
										margin-bottom: var(--re-post-separator-height, 10px);
									}
									shreddit-profile-comment > div {
										background: transparent;
									}
									shreddit-profile-comment:hover {
										background-color: color-mix(in srgb, var(--re-theme-post-bg) 95%, #000 5%) !important;
									}
									[routename="keyword-management"] post-consume-tracker > div {
										background-color: var(--re-theme-post-bg);
										border-radius: 0;
									}
									[routename="keyword-management"] faceplate-tracker:first-of-type post-consume-tracker > div {
										border-top-left-radius: var(--re-theme-border-radius, 1rem);
										border-top-right-radius: var(--re-theme-border-radius, 1rem);
									}
									[routename="keyword-management"] faceplate-tracker:last-of-type post-consume-tracker > div {
										border-bottom-left-radius: var(--re-theme-border-radius, 1rem);
										border-bottom-right-radius: var(--re-theme-border-radius, 1rem);
									}
									shreddit-profile-comment:hover {
										background-color: transparent;
									}
									shreddit-profile-comment > div:hover {
										border-radius: var(--re-theme-border-radius, 1rem) !important;
										background-color: color-mix(in srgb, var(--re-theme-post-bg), #000 10%) !important;
									}
									shreddit-app[routename^='profile_'] a[href="/settings/profile/#visibility"] {
										background-color: var(--re-theme-post-bg) !important;
										--color-neutral-background-hover: color-mix(in srgb, var(--re-theme-post-bg), #000 10%) !important;
										backdrop-filter: blur(var(--re-theme-blur)) !important
									}
									[routename="post_page"] shreddit-post #pdp-credit-bar,
									[view-context="CommentsPage"] #pdp-credit-bar {
										background: transparent !important;
									}
									community-recommendation {
										background: var(--re-theme-post-bg);
									}
									rpl-menu,
									.user-hover-card {
										background: var(--re-theme-post-bg-opaque);
									}
									rpl-menu-item:hover {
										cursor: pointer;
										background: oklch(from var(--re-theme-post-bg-opaque) clamp(0.20, calc(l + 0.05), 0.92) c h);
									}
									shreddit-overflow-menu,
									shreddit-post-overflow-menu {
										--color-neutral-background-strong: var(--re-theme-post-bg-opaque);
										--color-neutral-background-hover: oklch(from var(--re-theme-post-bg-opaque) clamp(0.20, calc(l + 0.05), 0.92) c h);
									}
									#sticky-comment-composer-wrapper {
										background: none !important;
									}
									[pagetype="moderation_pages_moderators"] #main-content div:has(>h1) > div {
										background: var(--re-theme-post-bg);
									}

									/* Profile Page */

									div:has(>div>[name^="FeedOptionsDropdown_"]),
									div:has(> #profile-feed-tabgroup) {
										background: var(--re-theme-post-bg);
										border-radius: var(--re-theme-border-radius) !important;
										backdrop-filter: blur(var(--re-theme-blur)) !important;
										margin-left: 0;
										margin-right: 0;
									}
									div:has(>[name^="FeedOptionsDropdown_"]){
										margin: 0;
									}
									#profile-feed-tabgroup,
									div:has(>div>[name^="FeedOptionsDropdown_"]) {
										padding: 0.25rem;
									}
									#subgrid-container div:has(>div>create-post-entry-point-wrapper) {
										background: var(--re-theme-post-bg) !important;
									}
									div:has(>div>create-post-entry-point-wrapper) {
										border-radius: var(--border-radius);
										padding: 0 !important;
									}
									div:has(>create-post-entry-point-wrapper) {
										padding: 0.5rem;
									}
									div:has(>[bundlename="shreddit_sort_dropdown"]),
									#interest-feed-header {
										border-radius: var(--re-theme-border-radius, var(--radius-md, 1.25rem));
										background: var(--re-theme-post-bg) !important;
										margin: 0.5rem 0;
									}
									#user-drawer-content {
										backdrop-filter: blur(var(--re-theme-blur)) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
		setPostOverflowMenuShadowStyle(POST_BG_OVERFLOW_STYLE_ID, POST_BG_OVERFLOW_HOST_CSS, POST_BG_OVERFLOW_DROPDOWN_CSS);
		loadFixThreadlinesForTranslucentPosts({ customEnabled: true });
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		removePostOverflowMenuShadowStyle(POST_BG_OVERFLOW_STYLE_ID);
		if (redditVersion === 'newnew') loadFixThreadlinesForTranslucentPosts({ customEnabled: false });
	}
}

// Post Background Colour CSS
export function themePostBackgroundColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
			if (result.themePostBackgroundColour === true) {
				setThemeProperty('--re-theme-post-bg', value);
				setThemeProperty('--re-theme-post-bg-opaque', `oklch(from ${value} l c h / 100%)`);
				loadFixThreadlinesForTranslucentPosts({ customEnabled: true, postBg: value });
			}
		});
	}
}

// Post Text Colour
export function themePostTextColour1(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
			setThemeProperty('--re-theme-post-text', result.themePostTextColour1CSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-text-colour"]')) return;
		let styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-text-colour';
		styleElement.textContent = `shreddit-post [id^="post-title"] {
										--color-neutral-content-strong: var(--re-theme-post-text) !important;
									}
									shreddit-post .text-neutral-content,
									div.md {
										--color-neutral-content: var(--re-theme-post-text);
										--color-tone-1: var(--re-theme-post-text);
										color: var(--re-theme-post-text);
									}
									div.md pre,
									div.md code {
										color: var(--re-theme-code-block-text, var(--re-theme-post-text)) !important;
									}
									[data-testid="search-post"] > post-consume-tracker > div {
										--color-neutral-content-strong: var(--re-theme-post-text) !important;
									}
									[bundlename="shreddit_sort_dropdown"] {
										--color-neutral-content-weak: var(--re-theme-post-text) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Text Colour CSS
export function themePostTextColour1CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
			if (result.themePostTextColour1) setThemeProperty('--re-theme-post-text', value);
		});
	}
}

// Code Block Colour CSS
export function themeCodeBlockColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
			if (result.themePostTextColour1) setThemeProperty('--re-theme-code-block-text', value);
		});
	}
}

// Post Table Border Colour
export function themePostTableBorderColour(on) {
	if (redditVersion === 'newnew' && on) {
		if (document.head.querySelector('style[id="re-theme-post-table-border-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-table-border-colour';
		styleElement.textContent = `.md table {
										border: 2px solid var(--re-theme-post-text, #eee) !important;
										border-collapse: collapse !important;
									}
									shreddit-post .md table {
										width: fit-content !important;
									}
									.md th, .md td {
										border: 1px solid var(--re-theme-post-text, #eee) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-table-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Comments Text Colour
export function themePostCommentsTextColour1(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1CSS'], function (result) {
			if (typeof result.themePostCommentsTextColour1CSS !== 'undefined' && result.themePostCommentsTextColour1CSS !== 'undefined') {
				setThemeProperty('--re-theme-post-comments-text', result.themePostCommentsTextColour1CSS);
			}
		});
		if (document.head.querySelector('style[id="re-theme-post-comments-text-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-comments-text-colour';
		styleElement.textContent = `shreddit-comment p {
										color: var(--re-theme-post-comments-text) !important;
										--color-neutral-content-strong: var(--re-theme-post-comments-text) !important;
									}
									shreddit-comment [noun="comment_author"] > a,
									shreddit-comment faceplate-number,
									shreddit-composer::part(md-inner) {
										color: var(--re-theme-post-comments-text) !important;
									}
									shreddit-post + [bundlename="comment_body_header"] {
										--color-neutral-content-weak: var(--re-theme-post-comments-text) !important;
									}
									/* shreddit-comment-tree {
										--color-tone-4: var(--re-theme-post-comments-text) !important;
									}
									* {
										--color-secondary-plain: var(--re-theme-post-comments-text) !important;
										--color-secondary-background: rgba(0,0,0,0.3) !important;
										--color-secondary-background-hover: rgba(0,0,0,0.6) !important;
									} */`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-comments-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-comments-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Comments Text Colour CSS
export function themePostCommentsTextColour1CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1'], function (result) {
			if (result.themePostCommentsTextColour1) setThemeProperty('--re-theme-post-comments-text', value);
		});
	}
}

// Post Comments Secondary Text Colour
export function themePostCommentsTextColour2(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2CSS'], function (result) {
			if (typeof result.themePostCommentsTextColour2CSS !== 'undefined' && result.themePostCommentsTextColour2CSS !== 'undefined') {
				setThemeProperty('--re-theme-post-comments-text-2', result.themePostCommentsTextColour2CSS);
			}
		});
		if (document.head.querySelector('style[id="re-theme-post-comments-text-2-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-comments-text-2-colour';
		styleElement.textContent = `shreddit-comment {
										--color-neutral-content-weak: var(--re-theme-post-comments-text-2) !important;
										--color-secondary-weak: var(--re-theme-post-comments-text-2) !important;
									}
									shreddit-comment-tree :not(shreddit-composer) {
										--color-neutral-content-strong: var(--re-theme-post-comments-text-2) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-comments-text-2');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-comments-text-2-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Comments Secondary Text Colour CSS
export function themePostCommentsTextColour2CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2'], function (result) {
			if (result.themePostCommentsTextColour2) setThemeProperty('--re-theme-post-comments-text-2', value);
		});
	}
}

// Post Followed Text Colour
export function themePostFollowedTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostFollowedTextColourCSS'], function (result) {
			setThemeProperty('--re-theme-post-followed-text', result.themePostFollowedTextColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-followed-text-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-followed-text-colour';
		styleElement.textContent = `shreddit-post:has([slot='credit-bar'] [icon-name='notifications-fill']) a[id^="post-title"],
									shreddit-post:has(unpacking-overflow-menu[is-receiving-post-replies]) a[id^="post-title"] {
										color: var(--re-theme-post-followed-text) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-followed-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		document.documentElement.style.removeProperty('--re-theme-post-followed-text');
	}
}

// Post Followed Text Colour CSS
export function themePostFollowedTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostFollowedTextColour'], function (result) {
			if (result.themePostFollowedTextColour) setThemeProperty('--re-theme-post-followed-text', value);
		});
	}
}

// Post Visited Text Colour
export function themePostVisitedTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostVisitedTextColourCSS'], function (result) {
			setThemeProperty('--re-theme-post-visited-text', result.themePostVisitedTextColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-visited-text-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-visited-text-colour';
		styleElement.textContent = `shreddit-feed article a[id^="post-title"]:visited {
										color: var(--re-theme-post-visited-text, #CF5FFF);
									}
									shreddit-feed article a.visited\\:text-neutral-content-weak:visited {
										--color-neutral-content-weak: var(--re-theme-post-visited-text, #CF5FFF);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-visited-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
		document.documentElement.style.removeProperty('--re-theme-post-visited-text');
	}
}

// Post Visited Text Colour CSS
export function themePostVisitedTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostVisitedTextColour'], function (result) {
			if (result.themePostVisitedTextColour) setThemeProperty('--re-theme-post-visited-text', value);
		});
	}
}

// Post Secondary Text Colour
export function themePostTextColour2(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
			setThemeProperty('--re-theme-post-text-2', result.themePostTextColour2CSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-text-colour-2"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-text-colour-2';
		styleElement.textContent = `shreddit-post [slot="credit-bar"] {
										--color-neutral-content-weak: var(--re-theme-post-text-2) !important;
										--color-neutral-content: var(--re-theme-post-text-2) !important;
									}
									shreddit-post {
										--color-button-secondary-text: var(--re-theme-post-text-2) !important;
										--color-button-plain-text: var(--re-theme-post-text-2) !important;
										--button-color-text-default: var(--re-theme-post-text-2) !important;
									}
									shreddit-post .button {
										--button-color-text-default: var(--re-theme-post-text-2) !important;
										--button-color-text-hover: var(--re-theme-post-text-2) !important;
									}
									@media (hover: hover) and (pointer: fine) {
										shreddit-post .hover\\:text-secondary:hover {
											color:  var(--re-theme-post-text-2) !important;
										}
									}
									[data-testid="search-post"] > post-consume-tracker > div,
									[bundlename="comment_body_header"] {
										--color-neutral-content-weak: var(--re-theme-post-text-2) !important;
										--color-secondary-weak: var(--re-theme-post-text-2) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-text-2');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour-2"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Secondary Text Colour CSS
export function themePostTextColour2CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
			if (result.themePostTextColour2) setThemeProperty('--re-theme-post-text-2', value);
		});
	}
}

// Post Border Colour
export function themePostBorderColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
			const colour = result.themePostBorderColourCSS ?? '';
			if (colour) setThemeProperty('--re-theme-post-border', colour);
		});
		if (document.head.querySelector('style[id="re-theme-post-border-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-border-colour';
		styleElement.textContent = `article > shreddit-post,
									shreddit-profile-comment,
									shreddit-app[routename^='profile_'] a[href="/settings/profile/#visibility"],
									main.main search-telemetry-tracker > div:not([data-testid="search-scope-switcher"]),
									div[data-testid="search-crosspost-unit"] div:has(> search-telemetry-tracker) {
										border: solid 1px var(--re-theme-post-border);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-border');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Border Colour CSS
export function themePostBorderColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
			if (result.themePostBorderColour) setThemeProperty('--re-theme-post-border', value);
		});
	}
}

// Theme Blur Variable
export function themeBlur(value) {
	const amount = parseFloat(value);
	if (!Number.isFinite(amount) || amount < 0) return;
	document.documentElement.style.setProperty('--re-theme-blur', `${amount}px`);
}

// Sidebar Text Colour
export function themeSidebarTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidebarTextColourCSS'], function (result) {
			setThemeProperty('--re-theme-sidebar-text', result.themeSidebarTextColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-sidebar-text-colour"]')) return;
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
										--color-neutral-content-strong: var(--re-theme-sidebar-text) !important;
										--color-action-primary: var(--re-theme-sidebar-text) !important;
									}
									#right-sidebar-container .button {
										color: var(--re-theme-sidebar-text) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-sidebar-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidebar-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Sidebar Text Colour CSS
export function themeSidebarTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarTextColour'], function (result) {
			if (result.themeSidebarTextColour) setThemeProperty('--re-theme-sidebar-text', value);
		});
	}
}

// Sidebar Background Colour
export function themeSidebarBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidebarBgColourCSS'], function (result) {
			setThemeProperty('--re-theme-sidebar-bg', result.themeSidebarBgColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-sidebar-bg-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-sidebar-bg-colour';
		styleElement.textContent = `#right-sidebar-contents aside,
									[pagetype="search_results"] #right-sidebar-container > div > div {
										--color-neutral-background-weak: var(--re-theme-sidebar-bg) !important;
										--color-neutral-background-hover: color-mix(in srgb, var(--re-theme-sidebar-bg), rgba(0,0,0,0.3)) !important;
									}
									html:not(.re-hide-post-dividers) #right-sidebar-contents > [id^="subreddit-right"] > aside > div,									
									#right-sidebar-container shreddit-subreddit-header::part(header),
									#right-sidebar-container achievements-entrypoint::part(achievements-entrypoint),
									#right-sidebar-contents aside shreddit-subreddit-header,
									shreddit-app:not([pagetype="popular"]) #right-sidebar-contents aside > div > div,
									shreddit-app[pagetype="popular"] #right-sidebar-contents aside aside,
									#right-sidebar-contents aside {
										backdrop-filter: blur(var(--re-theme-blur));
									}
									.theme-dark #right-sidebar-container .button {
										--button-color-background-default: rgba(0,0,0,0.4) !important;
										--button-color-background-hover: rgba(0,0,0,0.6) !important;
									}
									[pagetype="search_results"] #right-sidebar-container,
									[routename="all"] #right-sidebar-container {
										backdrop-filter: none !important;
									}
									@media (max-width: 960px) {
										#right-sidebar-contents {
											background-color: var(--re-theme-sidebar-bg);
										}
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-sidebar-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidebar-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Sidebar Background Colour CSS
export function themeSidebarBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarBgColour'], function (result) {
			if (result.themeSidebarBgColour) setThemeProperty('--re-theme-sidebar-bg', value);
		});
	}
}

// Side Menu Text Colour
export function themeSidemenuTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
			setThemeProperty('--re-theme-sidemenu-text', result.themeSidemenuTextColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-sidemenu-text-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-sidemenu-text-colour';
		styleElement.textContent = `#left-sidebar-container {
											--color-secondary: var(--re-theme-sidemenu-text) !important;
											--color-secondary-plain: var(--re-theme-sidemenu-text) !important;
											--color-secondary-weak: var(--re-theme-sidemenu-text) !important;
											--color-secondary-hover: var(--re-theme-sidemenu-text) !important;
										}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-sidemenu-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidemenu-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Side Menu Text Colour CSS
export function themeSidemenuTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColour'], function (result) {
			if (result.themeSidemenuTextColour) setThemeProperty('--re-theme-sidemenu-text', value);
		});
	}
}

// Side Menu Background Colour
export function themeSidemenuBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
			setThemeProperty('--re-theme-sidemenu-bg', result.themeSidemenuBgColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-sidemenu-bg-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-sidemenu-bg-colour';
		styleElement.textContent = `#left-sidebar-container,
									reddit-sidebar-nav {
										--color-neutral-background: var(--re-theme-sidemenu-bg) !important;
										--color-neutral-background-hover: rgba(0,0,0,0.2) !important;
										--color-neutral-background-selected: rgba(0,0,0,0.3) !important;
										backdrop-filter: blur(var(--re-theme-blur)) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-sidemenu-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidemenu-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Side Menu Background Colour CSS
export function themeSidemenuBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColour'], function (result) {
			if (result.themeSidemenuBgColour) setThemeProperty('--re-theme-sidemenu-bg', value);
		});
	}
}

// Side Menu Button Hover Colour
export function themeSidemenuButtonHoverColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColourCSS'], function (result) {
			themeSidemenuButtonHoverColourCSS(result.themeSidemenuButtonHoverColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-sidemenu-btn-hover-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-sidemenu-btn-hover-colour';
		styleElement.textContent = `#left-sidebar-container div,
									#left-sidebar-container left-nav-communities-controller,
									#left-sidebar-container left-nav-top-section,
									#left-sidebar-container left-nav-create-community-button,
									#left-sidebar-container a,
									#left-sidebar-container reddit-recent-pages,
									#left-sidebar-container left-nav-moderation-controller,
									#left-sidebar-container left-nav-multireddits-controller {
										--color-neutral-background-hover: var(--re-theme-sidemenu-btn-hover) !important;
										--color-secondary-background-hover: var(--re-theme-sidemenu-btn-hover) !important;
										--color-neutral-background-hovered: var(--re-theme-sidemenu-btn-hover) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-sidemenu-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-sidemenu-btn-hover-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Side Menu Button Hover Colour CSS
export function themeSidemenuButtonHoverColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColour'], function (result) {
			if (result.themeSidemenuButtonHoverColour) setThemeProperty('--re-theme-sidemenu-btn-hover', value);
		});
	}
}

// Post Content And Comments Link Colour
export function themePostContentAndCommentsLinkColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColourCSS'], function (result) {
			themePostContentAndCommentsLinkColourCSS(result.themePostContentAndCommentsLinkColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-content-and-comments-link-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-content-and-comments-link-colour';
		styleElement.textContent = `:root, .theme-rpl, .theme-light.theme-rpl {
										--color-a-default: var(--re-theme-post-content-and-comments-link) !important;
										--color-primary: var(--re-theme-post-content-and-comments-link) !important;
									}
									.md p a {
										color: var(--re-theme-post-content-and-comments-link) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-content-and-comments-link');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-content-and-comments-link-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Content And Comments Link Colour CSS
export function themePostContentAndCommentsLinkColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColour'], function (result) {
			setThemeProperty('--re-theme-post-content-and-comments-link', result.themePostContentAndCommentsLinkColour === true ? value : '#629fff');
		});
	}
}

// Searchbar Background Colour
export function themeSearchbarBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSearchbarBgColourCSS'], function (result) {
			themeSearchbarBgColourCSS(result.themeSearchbarBgColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-searchbar-bg-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-searchbar-bg-colour';
		styleElement.textContent = `reddit-search-large {
										--color-secondary-background: var(--re-theme-searchbar-bg) !important;
										--color-input-secondary-hover: oklch(from var(--re-theme-searchbar-bg) clamp(0.25, calc(l + 0.3), 0.95) c h) !important;
										--color-neutral-background: var(--re-theme-searchbar-bg-opaque);
									}
									html.theme-dark reddit-search-large,
									html.theme-light reddit-search-large {
										--color-neutral-background-strong: var(--re-theme-searchbar-bg) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-searchbar-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-searchbar-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Searchbar Background Colour CSS
export function themeSearchbarBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSearchbarBgColour'], function (result) {
			if (result.themeSearchbarBgColour) {
				setThemeProperty('--re-theme-searchbar-bg', value);
				setThemeProperty('--re-theme-searchbar-bg-opaque', `oklch(from ${value} l c h / 100%)`);
			}
		});
	}
}

// Searchbar Border Colour
/*export function themeSearchbarBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSearchbarBorderColourCSS'], function (result) {
			themeSearchbarBorderColourCSS(result.themeSearchbarBorderColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-searchbar-border-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-searchbar-border-colour';
		styleElement.textContent = `html.theme-light reddit-search-large {
										--color-neutral-background-strong: var(--re-theme-searchbar-border) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-searchbar-border');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-searchbar-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Searchbar Border Colour CSS
export function themeSearchbarBorderColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSearchbarBorderColour'], function (result) {
			if (result.themeSearchbarBorderColour) setThemeProperty('--re-theme-searchbar-border', value);
		});
	}
}*/

// Searchbar Focused/Dropdown Background Colour
export function themeSearchbarDropdownBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColourCSS'], function (result) {
			themeSearchbarDropdownBgColourCSS(result.themeSearchbarDropdownBgColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-searchbar-dropdown-bg-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-searchbar-dropdown-bg-colour';
		styleElement.textContent = `reddit-search-large {
										--color-neutral-background: var(--re-theme-searchbar-dropdown-bg) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-searchbar-dropdown-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-searchbar-dropdown-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Searchbar Focused/Dropdown Background Colour CSS
export function themeSearchbarDropdownBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColour'], function (result) {
			if (result.themeSearchbarDropdownBgColour) setThemeProperty('--re-theme-searchbar-dropdown-bg', value);
		});
	}
}

// Post Upvote Colour
export function themePostUpvoteColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostUpvoteColourCSS'], function (result) {
			themePostUpvoteColourCSS(result.themePostUpvoteColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-upvote-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-upvote-colour';
		styleElement.textContent = `shreddit-post {
										--color-upvote-background: var(--re-theme-post-upvote-colour) !important;
										--color-upvote-plain-weaker: var(--re-theme-post-upvote-colour) !important;
										--color-upvote-background-hover: var(--re-theme-post-upvote-colour) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-upvote-colour');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-upvote-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Upvote Colour CSS
export function themePostUpvoteColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostUpvoteColour'], function (result) {
			if (result.themePostUpvoteColour) setThemeProperty('--re-theme-post-upvote-colour', value);
		});
	}
}

// Post Downvote Colour
export function themePostDownvoteColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostDownvoteColourCSS'], function (result) {
			themePostDownvoteColourCSS(result.themePostDownvoteColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-downvote-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-downvote-colour';
		styleElement.textContent = `shreddit-post {
										--color-downvote-background: var(--re-theme-post-downvote-colour) !important;
										--color-downvote-plain-weaker: var(--re-theme-post-downvote-colour) !important;
										--color-downvote-background-hover: var(--re-theme-post-downvote-colour) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-downvote-colour');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-downvote-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Downvote Colour CSS
export function themePostDownvoteColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostDownvoteColour'], function (result) {
			if (result.themePostDownvoteColour) setThemeProperty('--re-theme-post-downvote-colour', value);
		});
	}
}

// Post Comment Action Row Colour
export function themePostCommentActionRowColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostCommentActionRowCSS'], function (result) {
			if (typeof result.themePostCommentActionRowCSS !== 'undefined' && result.themePostCommentActionRowCSS !== 'undefined') {
				setThemeProperty('--re-theme-post-comment-action-row-colour', result.themePostCommentActionRowCSS);
			}
		});
		if (document.head.querySelector('style[id="re-theme-post-comment-action-row-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-comment-action-row-colour';
		styleElement.textContent = `shreddit-comment-action-row {
										--color-button-plain-text: var(--re-theme-post-comment-action-row-colour) !important;
										--color-button-plain-text-weak: var(--re-theme-post-comment-action-row-colour) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-comment-action-row-colour');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-comment-action-row-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Post Comment Action Row Colour CSS
export function themePostCommentActionRowColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentActionRowColour'], function (result) {
			if (result.themePostCommentActionRowColour) setThemeProperty('--re-theme-post-comment-action-row-colour', value);
		});
	}
}

// OP Comment Highlight Colour
export function themeOpCommentHighlightColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeOpCommentHighlightColourCSS'], function (result) {
			const value = result.themeOpCommentHighlightColourCSS || 'rgba(217, 57, 0, 0.07)';
			themeOpCommentHighlightColourCSS(value);
		});

		if (document.head.querySelector('style[id="re-theme-op-comment-highlight-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-op-comment-highlight-colour';
		styleElement.textContent = `shreddit-comment[is-op] > details > summary > div[slot="commentMeta"],
									shreddit-comment[is-op] > details > div > div:nth-child(3),
									shreddit-comment[is-op] > details > div > div:nth-child(4){
										background-color: var(--re-theme-op-comment-highlight-colour, rgba(217, 57, 0, 0.07));
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-op-comment-highlight-colour');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-op-comment-highlight-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// OP Comment Highlight Colour CSS
export function themeOpCommentHighlightColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostUpvoteColour'], function (result) {
			if (result.themePostUpvoteColour) setThemeProperty('--re-theme-op-comment-highlight-colour', value);
		});
	}
}

// Profile Header Background Colour
export function themeProfileHeaderBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeProfileHeaderBgColourCSS'], function (result) {
			if (typeof result.themeProfileHeaderBgColourCSS !== 'undefined' && result.themeProfileHeaderBgColourCSS !== 'undefined') {
				setThemeProperty('--re-theme-profile-header-bg', result.themeProfileHeaderBgColourCSS);
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-profile-header-bg-colour';
		styleElement.textContent = `[routename="profile_overview"] main div:has(>[data-testid="profile-details-wrapper"]),
									div:has(>[data-testid="profile-main"]) {
										background: var(--re-theme-profile-header-bg);
										border-bottom-left-radius: var(--re-theme-border-radius);
										border-bottom-right-radius: var(--re-theme-border-radius);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-profile-header-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-profile-header-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			element.remove();
		});
	}
}

// Profile Header Background Colour CSS
export function themeProfileHeaderBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeProfileHeaderBgColour'], function (result) {
			if (result.themeProfileHeaderBgColour) setThemeProperty('--re-theme-profile-header-bg', value);
		});
	}
}
