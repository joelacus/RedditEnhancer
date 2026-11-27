/**
 * Tweaks: Style - Base Themes
 *
 * @description Apply one of the built-in colour themes to Reddit, with an
 * optional opacity for page chrome, post and sidebar surfaces.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

import { setPostOverflowMenuShadowStyle, removePostOverflowMenuShadowStyle } from './helpers/post_overflow_menu_shadow';

// ────────────────────────────────────────────────────────────────────────────
// Palette data
//
// The popup themes use UI tokens (--bg, --bg-tint-1, --accent…) which do not
// map one-to-one to Reddit's own colour variables. Each preset therefore gets
// an explicit semantic palette. Ids match the theme ids in popup/css/themes.css
// and utilities/theme_list.js.
// ────────────────────────────────────────────────────────────────────────────

const PRESET_THEMES = {
	'catppuccin-latte': {
		mode: 'light',
		bg: '#e6e9ef',
		surface: '#eff1f5',
		surfaceHi: '#dce0e8',
		surfaceLo: '#dce0e8',
		text: '#4c4f69',
		textStrong: '#4c4f69',
		muted: '#6c6f85',
		accent: '#8839ef',
		accentFg: '#ffffff',
		link: '#1e66f5',
		linkVisited: '#7287fd',
		up: '#fe640b',
		down: '#7287fd',
		green: '#40a02b',
		red: '#d20f39',
		yellow: '#df8e1d',
	},
	'catppuccin-frappe': {
		mode: 'dark',
		bg: '#303446',
		surface: '#414559',
		surfaceHi: '#51576d',
		surfaceLo: '#292c3c',
		text: '#c6d0f5',
		textStrong: '#c6d0f5',
		muted: '#a5adce',
		accent: '#ca9ee6',
		accentFg: '#232634',
		link: '#8caaee',
		linkVisited: '#babbf1',
		up: '#ef9f76',
		down: '#babbf1',
		green: '#a6d189',
		red: '#e78284',
		yellow: '#e5c890',
	},
	'catppuccin-macchiato': {
		mode: 'dark',
		bg: '#24273a',
		surface: '#363a4f',
		surfaceHi: '#494d64',
		surfaceLo: '#1e2030',
		text: '#cad3f5',
		textStrong: '#cad3f5',
		muted: '#a5adcb',
		accent: '#c6a0f6',
		accentFg: '#181926',
		link: '#8aadf4',
		linkVisited: '#b7bdf8',
		up: '#f5a97f',
		down: '#b7bdf8',
		green: '#a6da95',
		red: '#ed8796',
		yellow: '#eed49f',
	},
	'catppuccin-mocha': {
		mode: 'dark',
		bg: '#1e1e2e',
		surface: '#313244',
		surfaceHi: '#45475a',
		surfaceLo: '#181825',
		text: '#cdd6f4',
		textStrong: '#cdd6f4',
		muted: '#a6adc8',
		accent: '#cba6f7',
		accentFg: '#11111b',
		link: '#89b4fa',
		linkVisited: '#b4befe',
		up: '#fab387',
		down: '#b4befe',
		green: '#a6e3a1',
		red: '#f38ba8',
		yellow: '#f9e2af',
	},
	nord: {
		mode: 'dark',
		bg: '#2e3440',
		surface: '#3b4252',
		surfaceHi: '#434c5e',
		surfaceLo: '#272c36',
		text: '#d8dee9',
		textStrong: '#eceff4',
		muted: '#8f9aab',
		accent: '#88c0d0',
		accentFg: '#2e3440',
		link: '#88c0d0',
		linkVisited: '#b48ead',
		up: '#d08770',
		down: '#b48ead',
		green: '#a3be8c',
		red: '#bf616a',
		yellow: '#ebcb8b',
	},
	'dracula-light': {
		mode: 'light',
		bg: '#f1efe4',
		surface: '#fffbeb',
		surfaceHi: '#ece9df',
		surfaceLo: '#ece9df',
		text: '#1f1f1f',
		textStrong: '#1f1f1f',
		muted: '#6c664b',
		accent: '#644ac9',
		accentFg: '#ffffff',
		link: '#036a96',
		linkVisited: '#a3144d',
		up: '#a34d14',
		down: '#644ac9',
		green: '#14710a',
		red: '#cb3a2a',
		yellow: '#846e15',
	},
	dracula: {
		mode: 'dark',
		bg: '#282a36',
		surface: '#343746',
		surfaceHi: '#44475a',
		surfaceLo: '#21222c',
		text: '#f8f8f2',
		textStrong: '#f8f8f2',
		muted: '#8f9bc9',
		accent: '#bd93f9',
		accentFg: '#191a21',
		link: '#8be9fd',
		linkVisited: '#ff79c6',
		up: '#ffb86c',
		down: '#bd93f9',
		green: '#50fa7b',
		red: '#ff5555',
		yellow: '#f1fa8c',
	},
	monokai: {
		mode: 'dark',
		bg: '#272822',
		surface: '#34352f',
		surfaceHi: '#3e3d32',
		surfaceLo: '#1e1f1c',
		text: '#f8f8f2',
		textStrong: '#f8f8f2',
		muted: '#a4a49b',
		accent: '#e2e22e',
		accentFg: '#272822',
		link: '#66d9ef',
		linkVisited: '#ae81ff',
		up: '#fd971f',
		down: '#ae81ff',
		green: '#a6e22e',
		red: '#f92672',
		yellow: '#e2e22e',
	},
	'rose-pine': {
		mode: 'dark',
		bg: '#191724',
		surface: '#1f1d2e',
		surfaceHi: '#26233a',
		surfaceLo: '#12101a',
		text: '#e0def4',
		textStrong: '#e0def4',
		muted: '#908caa',
		accent: '#c4a7e7',
		accentFg: '#191724',
		link: '#9ccfd8',
		linkVisited: '#c4a7e7',
		up: '#ebbcba',
		down: '#c4a7e7',
		green: '#9ccfd8',
		red: '#eb6f92',
		yellow: '#f6c177',
	},
	'rose-pine-moon': {
		mode: 'dark',
		bg: '#232136',
		surface: '#2a273f',
		surfaceHi: '#393552',
		surfaceLo: '#1c1a2b',
		text: '#e0def4',
		textStrong: '#e0def4',
		muted: '#908caa',
		accent: '#c4a7e7',
		accentFg: '#232136',
		link: '#9ccfd8',
		linkVisited: '#c4a7e7',
		up: '#ebbcba',
		down: '#c4a7e7',
		green: '#9ccfd8',
		red: '#eb6f92',
		yellow: '#f6c177',
	},
	'rose-pine-dawn': {
		mode: 'light',
		bg: '#f2e9e1',
		surface: '#fffaf3',
		surfaceHi: '#f2e9e1',
		surfaceLo: '#f2e9e1',
		text: '#464261',
		textStrong: '#464261',
		muted: '#797386',
		accent: '#286983',
		accentFg: '#fffaf3',
		link: '#56949f',
		linkVisited: '#907aa9',
		up: '#d7827e',
		down: '#907aa9',
		green: '#56949f',
		red: '#b4637a',
		yellow: '#ea9d34',
	},
};

const PRESET_STYLE_ID = 're-preset-theme';
const PRESET_CLASS = 're-preset-theme';
const PRESET_SHADOW_STYLE_ID = 're-preset-theme-shadow';
const PRESET_SHADOW_CSS = `
	.reddit-search-bar {
		backdrop-filter: blur(var(--re-theme-blur, 10px)) !important;
	}
	.reddit-search-bar > div > form {
		border-radius: var(--re-theme-border-radius, var(--radius-md, 1.25rem));
	}`;
const PRESET_OVERFLOW_STYLE_ID = 're-preset-theme-overflow-menu';
const PRESET_OVERFLOW_HOST_CSS = `
	faceplate-menu {
		background-color: var(--re-theme-post-bg-opaque, var(--re-p-surface)) !important;
		border-radius: var(--re-theme-border-radius, var(--radius-md, 1.25rem)) !important;
		box-shadow: inset 0 0 0 1px var(--re-p-border, transparent) !important;
	}`;
const PRESET_OVERFLOW_DROPDOWN_CSS = `
	.hovercard-body {
		background-color: var(--re-theme-post-bg-opaque, var(--re-p-surface)) !important;
		border-radius: var(--re-theme-border-radius, var(--radius-md, 1.25rem)) !important;
	}`;

// ────────────────────────────────────────────────────────────────────────────
// Public helpers
// ────────────────────────────────────────────────────────────────────────────

// Returns a valid preset id, or null for "none" and anything unknown.
export function normalisePresetId(value) {
	return typeof value === 'string' && Object.prototype.hasOwnProperty.call(PRESET_THEMES, value) ? value : null;
}

// Returns an integer 0-100, defaulting to 100 for missing/invalid values.
export function normalisePresetOpacity(value) {
	const opacity = parseInt(value, 10);
	if (Number.isNaN(opacity)) return 100;
	return Math.min(100, Math.max(0, opacity));
}

// Whether a preset is actually painting this page (the class is only added
// when the current page is allowed by the whitelist/blacklist).
export function isPresetThemeApplied() {
	return document.documentElement.classList.contains(PRESET_CLASS);
}

// Marks the preset as selected without painting the page.
export function setPresetSelected(id) {
	const preset = normalisePresetId(id);
	if (preset) {
		document.documentElement.dataset.rePresetTheme = preset;
	} else {
		delete document.documentElement.dataset.rePresetTheme;
	}
}

export function clearPresetSelected() {
	delete document.documentElement.dataset.rePresetTheme;
}

// The search suggestions dropdown lives inside reddit-search-large's shadow
// root, and the post overflow menu surface lives inside two nested shadow
// roots, so document CSS cannot reach them. Append the shadow stylesheets
// while a base theme is painting, and remove them again for "None"/exceptions.
export function syncPresetShadowStyle() {
	const shadowRoot = document.querySelector('reddit-search-large')?.shadowRoot;
	if (shadowRoot) {
		const existing = shadowRoot.querySelector(`style[id="${PRESET_SHADOW_STYLE_ID}"]`);
		if (!isPresetThemeApplied()) {
			existing?.remove();
		} else if (!existing) {
			const styleElement = document.createElement('style');
			styleElement.id = PRESET_SHADOW_STYLE_ID;
			styleElement.textContent = PRESET_SHADOW_CSS;
			shadowRoot.append(styleElement);
		}
	}
	if (isPresetThemeApplied()) {
		setPostOverflowMenuShadowStyle(PRESET_OVERFLOW_STYLE_ID, PRESET_OVERFLOW_HOST_CSS, PRESET_OVERFLOW_DROPDOWN_CSS);
	} else {
		removePostOverflowMenuShadowStyle(PRESET_OVERFLOW_STYLE_ID);
	}
}

// ────────────────────────────────────────────────────────────────────────────
// Apply / Remove
// ────────────────────────────────────────────────────────────────────────────

export function applyPresetTheme(id, opacity) {
	const preset = normalisePresetId(id);
	if (!preset) {
		removePresetTheme();
		return;
	}

	const theme = PRESET_THEMES[preset];
	const root = document.documentElement;
	root.classList.add(PRESET_CLASS);
	setPresetSelected(preset);
	root.style.setProperty('--re-p-opacity', String(normalisePresetOpacity(opacity) / 100));

	let styleElement = document.getElementById(PRESET_STYLE_ID);
	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.id = PRESET_STYLE_ID;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	if (styleElement.dataset.preset !== preset) {
		styleElement.dataset.preset = preset;
		styleElement.textContent = buildPresetCss(theme);
	}
	syncPresetShadowStyle();
}

export function removePresetTheme() {
	const root = document.documentElement;
	root.classList.remove(PRESET_CLASS);
	root.style.removeProperty('--re-p-opacity');
	document.querySelectorAll(`style[id="${PRESET_STYLE_ID}"]`).forEach((element) => {
		element.remove();
	});
	syncPresetShadowStyle();
}

// Live opacity update; the stylesheet mixes the variable into its surfaces.
export function setPresetOpacity(value) {
	const root = document.documentElement;
	if (!root.classList.contains(PRESET_CLASS)) return;
	root.style.setProperty('--re-p-opacity', String(normalisePresetOpacity(value) / 100));
}

// ────────────────────────────────────────────────────────────────────────────
// CSS generation
// ────────────────────────────────────────────────────────────────────────────

function buildPaletteCss(theme) {
	return `html.re-preset-theme:root {
		color-scheme: ${theme.mode} !important;

		--re-p-opacity: 1;
		--re-p-bg: ${theme.bg};
		--re-p-surface: ${theme.surface};
		--re-p-surface-hi: ${theme.surfaceHi};
		--re-p-surface-lo: ${theme.surfaceLo};
		--re-p-text: ${theme.text};
		--re-p-text-strong: ${theme.textStrong};
		--re-p-muted: ${theme.muted};
		--re-p-accent: ${theme.accent};
		--re-p-accent-fg: ${theme.accentFg};
		--re-p-link: ${theme.link};
		--re-p-link-visited: ${theme.linkVisited};
		--re-p-up: ${theme.up};
		--re-p-down: ${theme.down};
		--re-p-green: ${theme.green};
		--re-p-red: ${theme.red};
		--re-p-yellow: ${theme.yellow};

		--re-p-red-hover: color-mix(in srgb, var(--re-p-red), var(--re-p-text) 15%);
		--re-p-green-hover: color-mix(in srgb, var(--re-p-green), var(--re-p-text) 15%);

		--re-p-accent-hover: color-mix(in srgb, var(--re-p-accent), var(--re-p-text) 15%);
		--re-p-accent-weak: color-mix(in srgb, var(--re-p-accent) 20%, var(--re-p-surface));
		--re-p-link-hover: color-mix(in srgb, var(--re-p-link), var(--re-p-text) 20%);
		--re-p-border: color-mix(in srgb, var(--re-p-text) 16%, transparent);
		--re-p-border-strong: color-mix(in srgb, var(--re-p-text) 32%, transparent);
		--re-p-border-weak: color-mix(in srgb, var(--re-p-text) 9%, transparent);
		--re-p-hover: color-mix(in srgb, var(--re-p-text) 7%, transparent);
		--re-p-active: color-mix(in srgb, var(--re-p-text) 13%, transparent);

		--re-p-bg-trans: var(--re-p-bg);
		--re-p-bg-trans: color-mix(in srgb, var(--re-p-bg) calc(var(--re-p-opacity) * 100%), transparent);
		--re-p-surface-trans: var(--re-p-surface);
		--re-p-surface-trans: color-mix(in srgb, var(--re-p-surface) calc(var(--re-p-opacity) * 100%), transparent);
		--re-p-surface-hi-trans: var(--re-p-surface-hi);
		--re-p-surface-hi-trans: color-mix(in srgb, var(--re-p-surface-hi) calc(var(--re-p-opacity) * 100%), transparent);
		--re-p-surface-lo-trans: var(--re-p-surface-lo);
		--re-p-surface-lo-trans: color-mix(in srgb, var(--re-p-surface-lo) calc(var(--re-p-opacity) * 100%), transparent);

		/* Extension UI tokens used by the confirm modal and the tag popover */
		--bg: var(--re-p-surface-lo);
		--bg-shade-1: var(--re-p-bg);
		--bg-tint-1: var(--re-p-surface);
		--bg-tint-2: var(--re-p-surface-hi);
		--bg-tint-3: var(--re-p-surface-lo);
		--bg-tint-4: var(--re-p-border-strong);
		--text: var(--re-p-text);
		--text-grey: var(--re-p-muted);
		--text-secondary: var(--re-p-muted);
		--accent: var(--re-p-accent);
		--btn-fg: var(--re-p-text);
		--btn-bg: var(--re-p-surface);
		--btn-border: var(--re-p-border);
		--btn-hover: var(--re-p-surface-hi);
		--btn-hover-border: var(--re-p-border-strong);
		--btn-active: color-mix(in srgb, var(--re-p-surface), var(--re-p-text) 10%);
	}`;
}

function buildV3Css() {
	return `
	/* Page canvas and base text */
	html.re-preset-theme:root {
		background-color: var(--re-p-bg) !important;
	}
	html.re-preset-theme body {
		color: var(--re-p-text) !important;
	}

	html.re-preset-theme:root,
	html.re-preset-theme .theme-rpl {
		--shreddit-color-wordmark: var(--re-p-accent) !important;

		/* Neutral backgrounds */
		--color-ui-canvas: var(--re-p-bg) !important;
		--color-ui-modalbackground: var(--re-p-surface-lo) !important;
		--color-neutral-background: var(--re-p-bg) !important;
		--color-neutral-background-canvas: var(--re-p-bg) !important;
		--color-neutral-background-pinned: var(--re-p-bg) !important;
		--color-neutral-background-weak: var(--re-p-bg) !important;
		--color-neutral-background-weak-hover: var(--re-p-surface-lo) !important;
		--color-neutral-background-medium: var(--re-p-surface-lo) !important;
		--color-neutral-background-strong: var(--re-p-surface-lo) !important;
		--color-neutral-background-strong-hover: var(--re-p-surface-hi) !important;
		--color-neutral-background-container: var(--re-p-surface) !important;
		--color-neutral-background-container-hover: var(--re-p-surface-hi) !important;
		--color-neutral-background-container-strong: var(--re-p-surface-hi) !important;
		--color-neutral-background-container-strong-hover: var(--re-p-surface-hi) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi) !important;
		--color-neutral-background-selected: var(--re-p-surface-hi) !important;
		--color-neutral-background-highlighted: var(--re-p-surface-lo) !important;
		--color-neutral-background-highlighted-strong: var(--re-p-surface-hi) !important;
		--color-neutral-background-gilded: var(--re-p-surface-lo) !important;
		--color-neutral-background-gilded-hover: var(--re-p-surface-hi) !important;
		--color-inverted-neutral-background: var(--re-p-text) !important;
		--color-inverted-neutral-background-hover: var(--re-p-text-strong) !important;

		/* Content */
		--color-neutral-content: var(--re-p-text) !important;
		--color-neutral-content-strong: var(--re-p-text-strong) !important;
		--color-neutral-content-weak: var(--re-p-muted) !important;
		--color-neutral-content-disabled: var(--re-p-muted) !important;
		--color-secondary: var(--re-p-text) !important;
		--color-secondary-weak: var(--re-p-muted) !important;
		--color-secondary-hover: var(--re-p-text-strong) !important;
		--color-secondary-plain: var(--re-p-text) !important;
		--color-secondary-plain-hover: var(--re-p-text-strong) !important;
		--color-secondary-plain-weak: var(--re-p-muted) !important;
		--color-secondary-background: var(--re-p-surface-hi) !important;
		--color-secondary-background-hover: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 8%) !important;
		--color-secondary-background-selected: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 14%) !important;
		--color-secondary-onBackground: var(--re-p-text-strong) !important;
		--color-inverted-secondary-background: var(--re-p-text) !important;
		--color-inverted-secondary-background-hover: var(--re-p-text-strong) !important;
		--color-inverted-secondary-background-selected: var(--re-p-text) !important;
		--color-inverted-neutral-content: var(--re-p-bg) !important;
		--color-inverted-neutral-content-strong: var(--re-p-bg) !important;
		--color-inverted-secondary-plain: var(--re-p-bg) !important;
		--color-inverted-secondary-plain-hover: var(--re-p-bg) !important;
		--color-inverted-secondary-onBackground: var(--re-p-bg) !important;

		/* Borders and dividers */
		--color-neutral-border: var(--re-p-border) !important;
		--color-neutral-border-weak: var(--re-p-border-weak) !important;
		--color-neutral-border-medium: var(--re-p-border-strong) !important;
		--color-neutral-border-strong: var(--re-p-text) !important;
		--color-neutral-border-divider: var(--re-p-border) !important;
		--color-divider-default: var(--re-p-border) !important;
		--color-inverted-neutral-border: var(--re-p-border-strong) !important;
		--color-bordered-onBackground: var(--re-p-text) !important;

		/* Links, primary actions and brand */
		--color-primary: var(--re-p-link) !important;
		--color-primary-hover: var(--re-p-link-hover) !important;
		--color-primary-visited: var(--re-p-link-visited) !important;
		--color-primary-plain: var(--re-p-link) !important;
		--color-primary-plain-hover: var(--re-p-link-hover) !important;
		--color-primary-plain-selected: var(--re-p-text-strong) !important;
		--color-primary-plain-visited: var(--re-p-link-visited) !important;
		--color-primary-background: var(--re-p-accent) !important;
		--color-primary-background-hover: var(--re-p-accent-hover) !important;
		--color-primary-background-selected: var(--re-p-accent) !important;
		--color-primary-background-highlighted: color-mix(in srgb, var(--re-p-accent) 18%, var(--re-p-bg)) !important;
		--color-primary-onBackground: var(--re-p-accent-fg) !important;
		--color-primary-onBackground-selected: var(--re-p-accent-fg) !important;
		--color-primary-border: var(--re-p-border-strong) !important;
		--color-primary-border-hover: var(--re-p-text) !important;
		--color-primarynext-background: var(--re-p-accent) !important;
		--color-primarynext-background-hover: var(--re-p-accent-hover) !important;
		--color-primarynext-border: var(--re-p-border-strong) !important;
		--color-primarynext-border-hover: var(--re-p-text) !important;
		--color-primarynext-onBackground: var(--re-p-accent-fg) !important;
		--color-primarynext-plain: var(--re-p-link) !important;
		--color-primarynext-plain-hover: var(--re-p-link-hover) !important;
		--color-primarynext-plain-selected: var(--re-p-text-strong) !important;
		--color-primarynext-plain-visited: var(--re-p-link-visited) !important;
		--color-a-default: var(--re-p-link) !important;
		--color-a-hover: var(--re-p-link-hover) !important;
		--color-a-visited: var(--re-p-link-visited) !important;
		--color-action-primary: var(--re-p-text-strong) !important;
		--color-action-secondary: var(--re-p-text) !important;
		--color-brand-background: var(--re-p-accent) !important;
		--color-brand-background-hover: var(--re-p-accent-hover) !important;
		--color-brand-onBackground: var(--re-p-accent-fg) !important;
		--color-brand-gradient-active: var(--re-p-accent) !important;
		--color-brand-gradient-active-highlight: var(--re-p-accent) !important;
		--color-brand-gradient-default: var(--re-p-accent) !important;
		--color-brand-gradient-default-highlight: var(--re-p-accent) !important;
		--color-brand-gradient-hover: var(--re-p-accent-hover) !important;
		--color-brand-gradient-hover-highlight: var(--re-p-accent-hover) !important;
		--color-banner-brand: var(--re-p-accent) !important;
		--color-banner-brand-text: var(--re-p-accent-fg) !important;
		--color-global-brand-orangered: var(--re-p-accent) !important;
		--color-global-orangered: var(--re-p-accent) !important;
		--color-global-darkblue: var(--re-p-surface-lo) !important;
		--color-global-alienblue: var(--re-p-link) !important;
		--color-adsplat-accent-plain: var(--re-p-accent) !important;
		--color-adsplat-accent-plain-weaker: color-mix(in srgb, var(--re-p-accent), var(--re-p-text) 20%) !important;
		--color-adsplat-accent-background-highlighted: color-mix(in srgb, var(--re-p-accent) 22%, var(--re-p-surface)) !important;
		--shreddit-color-streak-not-reached-text: var(--re-p-muted) !important;
		--color-global-admin: var(--re-p-accent) !important;
		--color-global-admin-content: var(--re-p-accent) !important;
		--color-identity-admin: var(--re-p-accent) !important;
		--color-category-live: var(--re-p-accent) !important;
		--color-global-focus: var(--re-p-accent) !important;
		--color-interactive-focused: var(--re-p-accent) !important;

		/* Votes */
		--color-action-upvote: var(--re-p-up) !important;
		--color-action-downvote: var(--re-p-down) !important;
		--color-upvote-background: var(--re-p-up) !important;
		--color-upvote-background-hover: color-mix(in srgb, var(--re-p-up), var(--re-p-text) 15%) !important;
		--color-upvote-background-disabled: color-mix(in srgb, var(--re-p-up) 30%, transparent) !important;
		--color-upvote-content: var(--re-p-up) !important;
		--color-upvote-content-weak: var(--re-p-up) !important;
		--color-upvote-onBackground: var(--re-p-accent-fg) !important;
		--color-upvote-onStrongScrim: var(--re-p-up) !important;
		--color-upvote-onStrongScrim-weaker: var(--re-p-up) !important;
		--color-upvote-plain: var(--re-p-up) !important;
		--color-upvote-plain-weaker: var(--re-p-up) !important;
		--color-upvote-disabled: color-mix(in srgb, var(--re-p-up) 30%, transparent) !important;
		--color-upvote-plain-disabled: color-mix(in srgb, var(--re-p-up) 30%, transparent) !important;
		--color-downvote-background: var(--re-p-down) !important;
		--color-downvote-background-hover: color-mix(in srgb, var(--re-p-down), var(--re-p-text) 15%) !important;
		--color-downvote-background-disabled: color-mix(in srgb, var(--re-p-down) 30%, transparent) !important;
		--color-downvote-content: var(--re-p-down) !important;
		--color-downvote-content-weak: var(--re-p-down) !important;
		--color-downvote-onBackground: var(--re-p-accent-fg) !important;
		--color-downvote-onStrongScrim: var(--re-p-down) !important;
		--color-downvote-onStrongScrim-weaker: var(--re-p-down) !important;
		--color-downvote-plain: var(--re-p-down) !important;
		--color-downvote-plain-weaker: var(--re-p-down) !important;
		--color-downvote-disabled: color-mix(in srgb, var(--re-p-down) 30%, transparent) !important;
		--color-downvote-plain-disabled: color-mix(in srgb, var(--re-p-down) 30%, transparent) !important;

		/* Alerts, status and tags */
		--color-alert-positive: var(--re-p-green) !important;
		--color-alert-negative: var(--re-p-red) !important;
		--color-alert-caution: var(--re-p-yellow) !important;
		--color-success-content: var(--re-p-green) !important;
		--color-success-plain: var(--re-p-green) !important;
		--color-success-plain-hover: color-mix(in srgb, var(--re-p-green), var(--re-p-text) 15%) !important;
		--color-success-background: color-mix(in srgb, var(--re-p-green) 70%, var(--re-p-bg)) !important;
		--color-success-background-hover: var(--re-p-green) !important;
		--color-success-onBackground: var(--re-p-accent-fg) !important;
		--color-danger-content: var(--re-p-red) !important;
		--color-danger-plain: var(--re-p-red) !important;
		--color-danger-plain-hover: color-mix(in srgb, var(--re-p-red), var(--re-p-text) 15%) !important;
		--color-danger-background: color-mix(in srgb, var(--re-p-red) 70%, var(--re-p-bg)) !important;
		--color-danger-background-hover: var(--re-p-red) !important;
		--color-danger-onBackground: var(--re-p-accent-fg) !important;
		--color-caution-plain: var(--re-p-yellow) !important;
		--color-caution-plain-hover: color-mix(in srgb, var(--re-p-yellow), var(--re-p-text) 15%) !important;
		--color-caution-background: var(--re-p-yellow) !important;
		--color-caution-background-hover: color-mix(in srgb, var(--re-p-yellow), var(--re-p-text) 15%) !important;
		--color-caution-onBackground: var(--re-p-accent-fg) !important;
		--color-warning-content: var(--re-p-yellow) !important;
		--color-warning-content-hover: color-mix(in srgb, var(--re-p-yellow), var(--re-p-text) 15%) !important;
		--color-warning-background: var(--re-p-yellow) !important;
		--color-warning-background-hover: color-mix(in srgb, var(--re-p-yellow), var(--re-p-text) 15%) !important;
		--color-warning-onBackground: var(--re-p-accent-fg) !important;
		--color-banner-success: color-mix(in srgb, var(--re-p-green) 70%, var(--re-p-bg)) !important;
		--color-banner-success-text: var(--re-p-accent-fg) !important;
		--color-banner-error: color-mix(in srgb, var(--re-p-red) 70%, var(--re-p-bg)) !important;
		--color-banner-error-text: var(--re-p-accent-fg) !important;
		--color-banner-caution: var(--re-p-yellow) !important;
		--color-banner-caution-text: var(--re-p-accent-fg) !important;
		--color-banner-caution-hover: color-mix(in srgb, var(--re-p-yellow), var(--re-p-text) 15%) !important;
		--color-banner-plain: var(--re-p-surface) !important;
		--color-banner-plain-text: var(--re-p-text) !important;
		--color-banner-plain-inverted: var(--re-p-text) !important;
		--color-banner-plain-inverted-text: var(--re-p-bg) !important;

		--color-global-nsfw: var(--re-p-red) !important;
		--color-global-nsfw-content: color-mix(in srgb, var(--re-p-red), var(--re-p-text) 35%) !important;
		--color-category-nsfw: var(--re-p-red) !important;
		--color-category-spoiler: var(--re-p-text) !important;
		--color-global-moderator: var(--re-p-green) !important;
		--color-global-moderator-content: var(--re-p-green) !important;
		--color-identity-moderator: var(--re-p-green) !important;
		--color-global-online: var(--re-p-green) !important;
		--color-online: var(--re-p-green) !important;
		--color-global-offline: var(--re-p-muted) !important;
		--color-offline: var(--re-p-muted) !important;
		--color-favorite: var(--re-p-yellow) !important;
		--color-global-stars: var(--re-p-yellow) !important;
		--color-identity-coins: var(--re-p-yellow) !important;
		--color-global-incognito: var(--re-p-green) !important;

		--color-tags-author-background: color-mix(in srgb, var(--re-p-accent) 24%, var(--re-p-surface)) !important;
		--color-tags-author-content: var(--re-p-accent) !important;
		--color-tags-author-content-weaker: color-mix(in srgb, var(--re-p-accent), var(--re-p-text) 25%) !important;
		--color-tags-author-media-content-weaker: color-mix(in srgb, var(--re-p-accent), var(--re-p-text) 25%) !important;
		--color-tags-admin-background: color-mix(in srgb, var(--re-p-accent) 20%, var(--re-p-surface)) !important;
		--color-tags-admin-content: var(--re-p-accent) !important;
		--color-tags-moderator-background: color-mix(in srgb, var(--re-p-green) 20%, var(--re-p-surface)) !important;
		--color-tags-moderator-content: var(--re-p-green) !important;
		--color-tags-moderator-content-weaker: color-mix(in srgb, var(--re-p-green), var(--re-p-text) 25%) !important;
		--color-tags-moderator-media-content-weaker: color-mix(in srgb, var(--re-p-green), var(--re-p-text) 25%) !important;
		--color-tags-nsfw-background: color-mix(in srgb, var(--re-p-red) 22%, var(--re-p-surface)) !important;
		--color-tags-nsfw-content: var(--re-p-red) !important;
		--color-tags-nsfw-content-weaker: color-mix(in srgb, var(--re-p-red), var(--re-p-text) 25%) !important;
		--color-tags-nsfw-media-content-weaker: color-mix(in srgb, var(--re-p-red), var(--re-p-text) 25%) !important;
		--color-tags-caution-background: color-mix(in srgb, var(--re-p-yellow) 20%, var(--re-p-surface)) !important;
		--color-tags-caution-content: var(--re-p-yellow) !important;
		--color-tags-success-background: color-mix(in srgb, var(--re-p-green) 20%, var(--re-p-surface)) !important;
		--color-tags-success-content: var(--re-p-green) !important;
		--color-tags-danger-background: color-mix(in srgb, var(--re-p-red) 20%, var(--re-p-surface)) !important;
		--color-tags-danger-content: var(--re-p-red) !important;
		--color-tags-neutral-background: var(--re-p-surface-hi) !important;
		--color-tags-neutral-content: var(--re-p-text) !important;
		--color-tags-neutral-content-weaker: var(--re-p-muted) !important;
		--color-tags-app-background: var(--re-p-surface-hi) !important;
		--color-tags-app-content: var(--re-p-text) !important;
		--color-tags-app-content-weaker: var(--re-p-muted) !important;
		--color-tags-verified-background: var(--re-p-surface-hi) !important;
		--color-tags-verified-content: var(--re-p-text) !important;
		--color-tags-verified-content-weaker: var(--re-p-muted) !important;

		/* Buttons */
		--button-color-background-default: var(--re-p-surface-hi) !important;
		--button-color-background-hover: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 10%) !important;
		--button-color-background-active: var(--re-p-surface-hi) !important;
		--button-color-background-activated: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 16%) !important;
		--button-color-background-focus: var(--re-p-surface-hi) !important;
		--button-color-background-disabled: var(--re-p-hover) !important;
		--button-color-text-default: var(--re-p-text-strong) !important;
		--button-color-text-hover: var(--re-p-text-strong) !important;
		--button-color-text-activated: var(--re-p-text-strong) !important;
		--button-color-text-disabled: var(--re-p-muted) !important;
		--button-border-color-default: transparent !important;
		--color-button-secondary-background: var(--re-p-surface-hi) !important;
		--color-button-secondary-background-hover: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 10%) !important;
		--color-button-secondary-background-activated: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 16%) !important;
		--color-button-secondary-background-focus: var(--re-p-surface-hi) !important;
		--color-button-secondary-background-disabled: var(--re-p-hover) !important;
		--color-button-secondary-text: var(--re-p-text-strong) !important;
		--color-button-secondary-text-activated: var(--re-p-text-strong) !important;
		--color-button-secondary-text-disabled: var(--re-p-muted) !important;
		--color-button-secondary-border: transparent !important;
		--color-button-secondary-border-hover: var(--re-p-border) !important;
		--color-button-plain-background-activated: var(--re-p-active) !important;
		--color-button-plain-background-hover: var(--re-p-hover) !important;
		--color-button-plain-text: var(--re-p-text) !important;
		--color-button-plain-text-hover: var(--re-p-text-strong) !important;
		--color-button-plain-text-activated: var(--re-p-text-strong) !important;
		--color-button-plain-text-weak: var(--re-p-muted) !important;
		--color-button-plain-text-disabled: var(--re-p-muted) !important;
		--color-button-plain-border-hover: var(--re-p-border) !important;
		--color-button-tertiary-background-activated: var(--re-p-active) !important;
		--color-button-tertiary-background-hover: var(--re-p-hover) !important;
		--color-button-tertiary-text: var(--re-p-text-strong) !important;
		--color-button-tertiary-text-activated: var(--re-p-text-strong) !important;
		--color-button-tertiary-text-disabled: var(--re-p-muted) !important;
		--color-button-primary-background-activated: var(--re-p-accent) !important;
		--color-button-primary-background-hover: var(--re-p-accent-hover) !important;
		--color-button-primary-text-activated: var(--re-p-accent-fg) !important;
		--color-button-primary-border-hover: var(--re-p-accent-hover) !important;
		--color-button-primary-border-active: var(--re-p-accent) !important;
		--color-button-favorite-text: var(--re-p-yellow) !important;

		/* Inputs */
		--color-input-default: var(--re-p-surface-lo) !important;
		--color-input-hover: var(--re-p-surface-hi) !important;
		--color-input-pressed: var(--re-p-active) !important;
		--color-input-text: var(--re-p-text) !important;
		--color-input-secondary: var(--re-p-surface-hi) !important;
		--color-input-secondary-hover: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 8%) !important;
		--color-input-secondary-text: var(--re-p-text-strong) !important;
		--color-input-border: var(--re-p-border) !important;
		--color-input-bordered: var(--re-p-border) !important;
		--color-input-bordered-hover: var(--re-p-border-strong) !important;
		--color-input-bordered-text: var(--re-p-text) !important;
		--color-input-helper-text: var(--re-p-muted) !important;
		--color-input-radio: var(--re-p-muted) !important;
		--color-input-radio-hover: var(--re-p-text) !important;

		/* Switches */
		--color-switch-input-background-default: var(--re-p-surface-hi) !important;
		--color-switch-input-background-default-hover: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 8%) !important;
		--color-switch-input-background-checked: var(--re-p-accent) !important;
		--color-switch-input-background-checked-hover: var(--re-p-accent-hover) !important;
		--color-switch-input-background-handle: var(--re-p-accent-fg) !important;
		--color-switch-input-background-handle-disabled: var(--re-p-muted) !important;
		--color-switch-input-background-disabled: var(--re-p-surface) !important;
		--color-switch-input-background-pressed-scrim: var(--re-p-active) !important;
		--color-primary-switchBackground: var(--re-p-surface-hi) !important;
		--color-primary-switchBackground-hover: color-mix(in srgb, var(--re-p-surface-hi), var(--re-p-text) 8%) !important;
		--color-primary-switchBackground-selected: var(--re-p-accent) !important;
		--color-primary-switchBackground-selected-hover: var(--re-p-accent-hover) !important;

		/* Tooltips, menus and media overlays */
		--color-tooltip-bg-neutral: var(--re-p-surface-lo) !important;
		--color-tooltip-text-neutral: var(--re-p-text) !important;
		--color-tooltip-bg-primary: var(--re-p-accent) !important;
		--color-tooltip-text-primary: var(--re-p-accent-fg) !important;
		--color-tooltip-bg-inverted: var(--re-p-text) !important;
		--color-tooltip-text-inverted: var(--re-p-bg) !important;

		/* Grey scale used by newer components */
		--color-tone-1: var(--re-p-text-strong) !important;
		--color-tone-2: var(--re-p-muted) !important;
		--color-tone-3: var(--re-p-border-strong) !important;
		--color-tone-4: var(--re-p-surface-hi) !important;
		--color-tone-5: var(--re-p-surface) !important;
		--color-tone-6: var(--re-p-surface-lo) !important;
		--color-tone-7: var(--re-p-bg) !important;

		/* Misc states */
		--color-interactive-pressed: var(--re-p-active) !important;
		--color-interactive-background-disabled: var(--re-p-hover) !important;
		--color-interactive-content-disabled: var(--re-p-muted) !important;
		--color-inverted-interactive-pressed: var(--re-p-active) !important;
		--color-inverted-interactive-background-disabled: var(--re-p-hover) !important;
		--color-inverted-interactive-content-disabled: var(--re-p-muted) !important;
		--color-transparent-background-hover: var(--re-p-hover) !important;
		--color-opacity-08: color-mix(in srgb, var(--re-p-text) 8%, transparent) !important;
		--color-opacity-50: color-mix(in srgb, var(--re-p-text) 50%, transparent) !important;
		--color-shimmer-background: color-mix(in srgb, var(--re-p-text) 5%, transparent) !important;
		--color-banner-plain: var(--re-p-surface) !important;
		--color-plain-onBackground: var(--re-p-text) !important;
		--color-plain-inverted-onBackground: var(--re-p-accent-fg) !important;
	}

	/* Header, drawer, search bar and side menu */
	html.re-preset-theme header,
	html.re-preset-theme #user-drawer-content,
	html.re-preset-theme #left-sidebar-container,
	html.re-preset-theme reddit-search-large {
		--color-neutral-background: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-strong: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-strong-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-weak: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-weak-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-medium: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-selected: var(--re-p-surface-hi-trans) !important;
		--color-secondary-background: var(--re-p-surface-hi-trans) !important;
		--color-secondary-background-hover: color-mix(in srgb, var(--re-p-surface-hi-trans), var(--re-p-text) 8%) !important;
		--color-secondary-background-selected: color-mix(in srgb, var(--re-p-surface-hi-trans), var(--re-p-text) 14%) !important;
		--color-neutral-content: var(--re-p-text) !important;
		--color-neutral-content-strong: var(--re-p-text-strong) !important;
		--color-neutral-content-weak: var(--re-p-muted) !important;
		--color-secondary: var(--re-p-text) !important;
		--color-secondary-weak: var(--re-p-muted) !important;
		--color-secondary-hover: var(--re-p-text-strong) !important;
		--color-neutral-border: var(--re-p-border) !important;
		--color-a-default: var(--re-p-link) !important;
		--color-a-hover: var(--re-p-link-hover) !important;
		--color-brand-background: var(--re-p-accent) !important;
		--color-brand-background-hover: var(--re-p-accent-hover) !important;
		--shreddit-color-wordmark: var(--re-p-accent) !important;
	}
	html.re-preset-theme header,
	html.re-preset-theme #user-drawer-content {
		background-color: var(--re-p-surface-lo-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
	}
	html.re-preset-theme #user-drawer-content {
		backdrop-filter: blur(var(--re-theme-blur));
	}
	html.re-preset-theme reddit-search-large {
		/* The host is a rectangular layout box. Painting it would show square
		   corners behind the rounded search field once Theme Opacity makes the
		   theme translucent; the field and dropdown paint their own surfaces. */
		background-color: transparent !important;
	}
	html.re-preset-theme #left-sidebar-container {
		background-color: transparent !important;
		backdrop-filter: blur(var(--re-theme-blur));
	}

	/* Feed posts and post/comments pages */
	html.re-preset-theme shreddit-post,
	html.re-preset-theme shreddit-ad-post,
	html.re-preset-theme shreddit-comments-page-ad,
	html.re-preset-theme shreddit-profile-comment,
	html.re-preset-theme community-highlight-card {
		--color-neutral-background: var(--re-p-surface-trans) !important;
		--color-neutral-background-strong: var(--re-p-surface) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-weak: var(--re-p-surface) !important;
		--color-neutral-background-container: var(--re-p-surface) !important;
		--shreddit-content-background: transparent !important;
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border-color: var(--re-p-border) !important;
	}
	/*html.re-preset-theme shreddit-post:hover,*/
	html.re-preset-theme shreddit-ad-post:hover,
	html.re-preset-theme shreddit-comments-page-ad:hover,
	html.re-preset-theme shreddit-profile-comment:hover,
	html.re-preset-theme community-highlight-card:hover {
		background-color: var(--re-p-surface-hi-trans) !important;
	}
	html.re-preset-theme #comment-tree {
		--color-neutral-background: var(--re-p-bg) !important;
		--color-neutral-background-strong: var(--re-p-surface) !important;
		--color-neutral-background-weak: var(--re-p-surface) !important;
		--shreddit-content-background: transparent !important;
	}
	html.re-preset-theme [pagetype="search_results"] main.main > div {
		--color-neutral-background: var(--re-p-surface-trans) !important;
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
	}

	/* Right sidebar cards */
	html.re-preset-theme #right-sidebar-container {
		--color-neutral-background: transparent !important;
		--color-neutral-background-weak: var(--re-p-surface-trans) !important;
		--color-neutral-background-weak-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-container: var(--re-p-surface-trans) !important;
		--color-neutral-background-container-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-container-strong: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-strong: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-highlighted: var(--re-p-surface-hi-trans) !important;
	}
	html.re-preset-theme #right-sidebar-container .theme-rpl,
	html.re-preset-theme #left-sidebar-container .theme-rpl {
		--color-neutral-background: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-strong: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-weak: var(--re-p-surface-lo-trans) !important;
		--color-neutral-background-weak-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-container: var(--re-p-surface-trans) !important;
		--color-neutral-background-container-hover: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-container-strong: var(--re-p-surface-hi-trans) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi-trans) !important;
		--color-secondary-background: var(--re-p-surface-hi-trans) !important;
	}

	/* Keep menus, dialogues and hover cards opaque and readable */
	html.re-preset-theme rpl-menu,
	html.re-preset-theme rpl-dialog,
	html.re-preset-theme faceplate-dialog,
	html.re-preset-theme shreddit-overflow-menu,
	html.re-preset-theme .user-hover-card,
	html.re-preset-theme [role="dialog"],
	html.re-preset-theme [role="menu"],
	html.re-preset-theme [role="tooltip"] {
		--color-neutral-background: var(--re-p-surface-lo) !important;
		--color-neutral-background-strong: var(--re-p-surface) !important;
		--color-neutral-background-container: var(--re-p-surface) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi) !important;
		--color-neutral-background-weak: var(--re-p-surface-lo) !important;
		background-color: var(--re-p-surface-lo) !important;
	}
	html.re-preset-theme rpl-menu,
	html.re-preset-theme shreddit-overflow-menu,
	html.re-preset-theme .user-hover-card {
		border-color: var(--re-p-border) !important;
	}

	/* Post overflow menu. The host is only a layout wrapper, so it carries the
	   theme tokens without painting a background of its own. The visible menu
	   surface is styled inside its shadow roots. */
	html.re-preset-theme shreddit-post-overflow-menu {
		--color-neutral-background: var(--re-p-surface-lo) !important;
		--color-neutral-background-strong: var(--re-p-surface) !important;
		--color-neutral-background-container: var(--re-p-surface) !important;
		--color-neutral-background-hover: var(--re-p-surface-hi) !important;
		--color-neutral-background-weak: var(--re-p-surface-lo) !important;
		--color-neutral-border: var(--re-p-border) !important;
		--color-secondary-plain: var(--re-p-text) !important;
		--color-secondary-plain-hover: var(--re-p-text-strong) !important;
		--color-neutral-content: var(--re-p-text) !important;
		--color-neutral-content-strong: var(--re-p-text-strong) !important;
		--color-neutral-content-weak: var(--re-p-muted) !important;
		background: transparent !important;
	}

	/* Sort dropdown container */
	html.re-preset-theme div:has(>[bundlename="shreddit_sort_dropdown"]) {
		border-radius: var(--re-theme-border-radius, var(--radius-md, 1.25rem));
		background: var(--re-p-surface) !important;
		margin: 0.5rem 0;
	}

	/* Individual colour pickers layer on top of the base theme. Each picker is
	   used as-is, including any alpha the user picked, so Theme Opacity keeps
	   affecting only the base palette. The base aliases avoid self-referencing
	   the variable being redefined. */
	html.re-preset-theme:root {
		--re-p-base-surface: var(--re-p-surface);
		--re-p-base-surface-lo: var(--re-p-surface-lo);
		--re-p-base-surface-trans: var(--re-p-surface-trans);
		--re-p-base-surface-hi-trans: var(--re-p-surface-hi-trans);
		--re-p-base-surface-lo-trans: var(--re-p-surface-lo-trans);
		--re-p-base-border: var(--re-p-border);
	}

	/* Header, drawer and search bar */
	html.re-preset-theme header,
	html.re-preset-theme #user-drawer-content {
		--re-p-surface-lo: var(--re-theme-header-bg, var(--re-p-base-surface-lo));
		--re-p-surface-lo-trans: var(--re-theme-header-bg, var(--re-p-base-surface-lo-trans));
	}
	html.re-preset-theme reddit-search-large {
		--re-p-surface-lo: var(--re-theme-searchbar-bg, var(--re-p-base-surface-lo));
		--re-p-surface-lo-trans: var(--re-theme-searchbar-bg, var(--re-p-base-surface-lo-trans));
		--color-neutral-background: var(--re-theme-searchbar-dropdown-bg, var(--re-theme-searchbar-bg, var(--re-p-base-surface-lo-trans))) !important;
		--color-secondary-background: var(--re-theme-searchbar-bg, var(--re-p-base-surface-hi-trans)) !important;
	}

	/* Side menu */
	html.re-preset-theme #left-sidebar-container,
	html.re-preset-theme reddit-sidebar-nav {
		--re-p-surface-lo: var(--re-theme-sidemenu-bg, var(--re-p-base-surface-lo));
		--re-p-surface-lo-trans: var(--re-theme-sidemenu-bg, var(--re-p-base-surface-lo-trans));
		--color-neutral-background-hover: var(--re-theme-sidemenu-bg, var(--re-p-base-surface-hi-trans)) !important;
	}

	/* Feed posts, post/comments pages and search result cards */
	html.re-preset-theme shreddit-post,
	html.re-preset-theme shreddit-ad-post,
	html.re-preset-theme shreddit-comments-page-ad,
	html.re-preset-theme shreddit-profile-comment,
	html.re-preset-theme community-highlight-card {
		--re-p-surface: var(--re-theme-post-bg, var(--re-p-base-surface));
		--re-p-surface-trans: var(--re-theme-post-bg, var(--re-p-base-surface-trans));
		--re-p-border: var(--re-theme-post-border, var(--re-p-base-border));
	}
	html.re-preset-theme #comment-tree,
	html.re-preset-theme [pagetype="search_results"] main.main > div {
		--re-p-surface: var(--re-theme-post-bg, var(--re-p-base-surface));
		--re-p-surface-trans: var(--re-theme-post-bg, var(--re-p-base-surface-trans));
	}

	/* Right sidebar cards */
	html.re-preset-theme #right-sidebar-contents aside,
	html.re-preset-theme [pagetype="search_results"] #right-sidebar-container > div > div {
		--color-neutral-background-weak: var(--re-theme-sidebar-bg, var(--re-p-base-surface-trans)) !important;
		--color-neutral-background-hover: var(--re-theme-sidebar-bg, var(--re-p-base-surface-hi-trans)) !important;
		backdrop-filter: blur(var(--re-theme-blur));
	}

	/* Links */
	html.re-preset-theme:root,
	html.re-preset-theme .theme-rpl,
	html.re-preset-theme header {
		--color-a-default: var(--re-theme-post-content-and-comments-link, var(--re-p-link)) !important;
		--color-primary: var(--re-theme-post-content-and-comments-link, var(--re-p-link)) !important;
	}

	/* Fixes */
	html.re-preset-theme shreddit-app[routename='post_page'] shreddit-post,
	html.re-preset-theme shreddit-app[pagetype='single_comment_thread'] shreddit-post,
	html.re-preset-theme #pdp-credit-bar,
	html.re-preset-theme shreddit-overflow-menu {
		background: transparent !important;
	}
	html.re-preset-theme shreddit-post:hover {
		--color-neutral-background: var(--re-p-surface-trans) !important;
	}
	html.re-preset-theme [source="comment_composer"] faceplate-textarea-input {
		margin-top: 1rem;
	}
	#interest-feed-header {
		border-radius: var(--re-theme-border-radius, var(--radius-md, 1.25rem));
		background: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		margin: 0.5rem 0;
	}
	`;
}

function buildV1Css() {
	return `
	/* Modernise Old Reddit token bridge */
	html.re-preset-theme:root {
		--re-background-primary: var(--re-p-bg);
		--re-background-secondary: var(--re-p-surface-trans);
		--re-background-tertiary: var(--re-p-surface-hi);
		--re-text-primary: var(--re-p-text);
		--re-text-secondary: var(--re-p-muted);
		--re-text-highlight: var(--re-p-text-strong);
		--re-text-muted: var(--re-p-muted);
		--re-border-primary: var(--re-p-border);
		--re-hover-overlay: var(--re-p-hover);
		--re-link: var(--re-p-link);
	}

	/* Page and base elements */
	html.re-preset-theme {
		background-color: var(--re-p-bg) !important;
	}
	html.re-preset-theme body {
		background-color: var(--re-p-bg) !important;
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme a {
		color: var(--re-p-link) !important;
	}
	html.re-preset-theme a:visited {
		color: var(--re-p-link-visited) !important;
	}
	html.re-preset-theme .md {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .md a {
		color: var(--re-p-link) !important;
	}
	html.re-preset-theme .md blockquote {
		border-left-color: var(--re-p-border-strong) !important;
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme code,
	html.re-preset-theme pre {
		background-color: var(--re-p-surface-lo) !important;
		color: var(--re-p-text) !important;
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme hr {
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme th,
	html.re-preset-theme td {
		border-color: var(--re-p-border) !important;
	}

	/* Header */
	html.re-preset-theme #header {
		background: var(--re-p-surface-lo-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border-bottom-color: var(--re-p-border) !important;
	}
	html.re-preset-theme #sr-header-area {
		background-color: transparent !important;
		border-bottom-color: var(--re-p-border) !important;
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme #sr-header-area a {
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme #header-bottom-right {
		background-color: transparent !important;
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme #header-bottom-right a {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme #header .pagename a {
		color: var(--re-p-text-strong) !important;
	}
	html.re-preset-theme #header .tabmenu li a {
		background: var(--re-p-surface-hi) !important;
		color: var(--re-p-text) !important;
		border-color: transparent !important;
	}
	html.re-preset-theme #header .tabmenu li.selected a {
		background: var(--re-p-bg) !important;
		color: var(--re-p-accent) !important;
		border-color: var(--re-p-border) !important;
		border-bottom-color: var(--re-p-bg) !important;
	}
	html.re-preset-theme .fancy-toggle-button .option.add {
		background: var(--re-p-green) !important;
		border-color: var(--re-p-green) !important;
		color: var(--re-p-bg) !important;
	}
	html.re-preset-theme .fancy-toggle-button .option.remove {
		background: var(--re-p-surface-hi) !important;
		border-color: var(--re-p-border) !important;
		color: var(--re-p-text) !important;
	}

	/* Search and form controls */
	html.re-preset-theme input[type="text"],
	html.re-preset-theme input[type="password"],
	html.re-preset-theme input[type="url"],
	html.re-preset-theme input[type="email"],
	html.re-preset-theme input[type="number"],
	html.re-preset-theme input[type="search"],
	html.re-preset-theme textarea,
	html.re-preset-theme select {
		background-color: var(--re-p-surface-lo) !important;
		color: var(--re-p-text) !important;
		border: 1px solid var(--re-p-border) !important;
	}
	html.re-preset-theme select option {
		background-color: var(--re-p-surface-lo) !important;
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme button:not(.re-modal-content button):not(.re-create-tag-btn):not(.re-block-user-btn):not(.re-block-subreddit-btn):not(#search .search-submit-button),
	html.re-preset-theme input[type="submit"]:not(#search input[type="submit"]),
	html.re-preset-theme input[type="button"],
	html.re-preset-theme input[type="reset"],
	html.re-preset-theme .fancybutton,
	html.re-preset-theme .pretty-button {
		background: var(--re-p-surface-hi) !important;
		color: var(--re-p-text-strong) !important;
		border: 1px solid var(--re-p-border) !important;
		text-shadow: none !important;
		box-shadow: none !important;
	}
	html.re-preset-theme button:not(.re-modal-content button):not(.re-create-tag-btn):not(.re-block-user-btn):not(.re-block-subreddit-btn):not(#search .search-submit-button):hover,
	html.re-preset-theme input[type="submit"]:not(#search input[type="submit"]):hover,
	html.re-preset-theme input[type="button"]:hover,
	html.re-preset-theme input[type="reset"]:hover,
	html.re-preset-theme .fancybutton:hover,
	html.re-preset-theme .pretty-button:hover {
		background: var(--re-p-accent) !important;
		color: var(--re-p-accent-fg) !important;
	}

	/* Search */
	html.re-preset-theme #search {
		position: relative;
		width: 300px;
		max-width: 100%;
		padding-right: 0 !important;
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme #search input[type="text"] {
		box-sizing: border-box;
		height: 42px;
		width: 100% !important;
		min-width: 0 !important;
		max-width: none !important;
		border-radius: 50px;
		background-color: var(--re-p-surface-lo) !important;
		border: 1px solid var(--re-p-border) !important;
		color: var(--re-p-text) !important;
		padding: 0 44px 0 16px !important;
		outline: none;
		font-size: 14px !important;
	}
	html.re-preset-theme #search input[type="text"]::placeholder {
		color: var(--re-p-muted) !important;
		opacity: 1;
		text-transform: capitalize;
	}
	html.re-preset-theme #search input[type="text"]:hover,
	html.re-preset-theme #search input[type="text"]:focus {
		border-color: var(--re-p-accent) !important;
	}
	html.re-preset-theme #search input[type="submit"],
	html.re-preset-theme #search .search-submit-button {
		position: absolute;
		top: 5px;
		right: 5px;
		display: block;
		width: 32px;
		height: 32px;
		margin: 0 !important;
		padding: 0 !important;
		border: none !important;
		border-radius: 50%;
		background-color: var(--re-p-muted) !important;
		background-image: none !important;
		box-shadow: none !important;
		cursor: pointer;
		-webkit-mask: var(--icon-search) center / 18px no-repeat;
		mask: var(--icon-search) center / 18px no-repeat;
	}
	html.re-preset-theme #search input[type="submit"]:hover,
	html.re-preset-theme #search .search-submit-button:hover {
		background-color: var(--re-p-accent) !important;
	}
	html.re-preset-theme #search .search-submit-button .search-icon {
		display: none !important;
	}
	html.re-preset-theme #search input[type="submit"]:focus-visible,
	html.re-preset-theme #search .search-submit-button:focus-visible {
		outline: 2px solid var(--re-p-accent);
		outline-offset: 2px;
	}
	html.re-preset-theme body:not(.re-modernise) #search > label,
	html.re-preset-theme body:not(.re-modernise) #search > p {
		display: block;
		width: 100%;
		margin: 4px 0 0 !important;
		color: var(--re-p-muted) !important;
		font-size: 12px;
		line-height: 1.4;
	}
	html.re-preset-theme body:not(.re-modernise) #search > label {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	html.re-preset-theme body:not(.re-modernise) #search > label input[type="checkbox"] {
		margin: 0;
	}
	html.re-preset-theme #search > p a,
	html.re-preset-theme #search_showmore {
		color: var(--re-p-link) !important;
		font-size: 12px;
		text-decoration: none;
	}
	html.re-preset-theme #search > p a:hover,
	html.re-preset-theme #search_showmore:hover {
		text-decoration: underline;
	}
	html.re-preset-theme #searchexpando {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		width: min(480px, 100%);
		box-sizing: border-box;
		margin: 0 !important;
		padding: 12px 16px !important;
		background: var(--re-p-surface-lo) !important;
		color: var(--re-p-text) !important;
		border: 1px solid var(--re-p-border) !important;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
		z-index: 1000;
		font-size: 13px;
		line-height: 1.4;
	}
	html.re-preset-theme #searchexpando label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 4px 0;
		color: var(--re-p-text) !important;
		font-size: 13px;
	}
	html.re-preset-theme #searchexpando input[type="checkbox"] {
		margin: 0;
	}
	html.re-preset-theme #searchexpando p,
	html.re-preset-theme #searchexpando dl,
	html.re-preset-theme #searchexpando dd {
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme #searchexpando dt {
		margin-top: 8px;
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme #searchexpando dt i {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme #searchexpando code {
		background-color: var(--re-p-hover);
		border-radius: 3px;
		padding: 1px 4px;
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme #searchexpando a,
	html.re-preset-theme #searchexpando #search_hidemore,
	html.re-preset-theme #searchexpando #search_showmore {
		color: var(--re-p-link) !important;
		text-decoration: none;
	}
	html.re-preset-theme #searchexpando a:hover,
	html.re-preset-theme #searchexpando #search_hidemore:hover,
	html.re-preset-theme #searchexpando #search_showmore:hover {
		text-decoration: underline;
	}
	html.re-preset-theme .searchpane {
		margin: 16px 24px !important;
		padding: 12px 16px !important;
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border: 1px solid var(--re-p-border) !important;
		border-radius: 8px;
	}
	html.re-preset-theme .searchpane h4 {
		margin: 0 !important;
		color: var(--re-p-muted) !important;
		font-size: 12px !important;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	html.re-preset-theme .search-result-listing {
		font-size: 13px !important;
	}
	html.re-preset-theme .search-result-listing:not(:has(.search-result)):has(+ .search-result-listing .search-result) {
		display: none !important;
	}
	html.re-preset-theme .search-result-group {
		width: auto !important;
		max-width: none !important;
		min-width: 0 !important;
		box-sizing: border-box;
		padding: 0 24px 24px !important;
		font-size: 13px !important;
	}
	html.re-preset-theme .search-result-group-header {
		margin: 16px 0 !important;
		border-bottom: 1px solid var(--re-p-border) !important;
		color: var(--re-p-muted) !important;
		font-size: 13px !important;
	}
	html.re-preset-theme .search-result-group-header .search-menu,
	html.re-preset-theme .search-result-group-header .search-menu a {
		color: var(--re-p-muted) !important;
		font-size: 13px !important;
	}
	html.re-preset-theme .search-result-group-header .search-menu a:hover,
	html.re-preset-theme .search-result-group-header .search-menu .selected {
		color: var(--re-p-link) !important;
	}
	html.re-preset-theme .search-result {
		box-sizing: border-box;
		width: auto !important;
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border: 1px solid var(--re-p-border) !important;
		border-radius: 8px;
		padding: 12px !important;
		margin: 10px 0 14px !important;
		font-size: 13px !important;
	}
	html.re-preset-theme .search-result:hover {
		border-color: var(--re-p-border-strong) !important;
	}
	html.re-preset-theme .search-result .thumbnail {
		margin-right: 12px;
	}
	html.re-preset-theme .search-result .search-title,
	html.re-preset-theme .search-result .search-link {
		color: var(--re-p-link) !important;
		font-weight: 600;
	}
	html.re-preset-theme .search-result .search-title:visited,
	html.re-preset-theme .search-result .search-link:visited {
		color: var(--re-p-link-visited) !important;
	}
	html.re-preset-theme .search-result .search-title:hover,
	html.re-preset-theme .search-result .search-link:hover {
		text-decoration: underline;
	}
	html.re-preset-theme .search-result .search-result-meta,
	html.re-preset-theme .search-result .search-result-footer,
	html.re-preset-theme .search-result .search-score,
	html.re-preset-theme .search-result .search-time,
	html.re-preset-theme .search-result-group-header {
		color: var(--re-p-muted) !important;
		font-size: 12px !important;
	}
	html.re-preset-theme .search-result .search-result-meta a {
		color: var(--re-p-link) !important;
	}
	html.re-preset-theme .search-result-group-header {
		border-bottom-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .search-result-body,
	html.re-preset-theme .search-result-body p {
		color: var(--re-p-text) !important;
		font-size: 13px !important;
		line-height: 1.45 !important;
	}
	html.re-preset-theme .search-result-body {
		padding-right: 0 !important;
	}
	html.re-preset-theme .search-result-body a,
	html.re-preset-theme .search-comments {
		color: var(--re-p-link) !important;
	}
	html.re-preset-theme .search-result .search-expando-button-label-collapsed,
	html.re-preset-theme .search-result .search-expando-button-label-expanded {
		color: var(--re-p-link) !important;
	}
	html.re-preset-theme .search-result mark {
		background: var(--re-p-yellow) !important;
		color: #111 !important;
		border-radius: 2px;
		padding: 0 2px;
	}
	html.re-preset-theme .search-result-group footer .info,
	html.re-preset-theme .search-result-group footer .nav-buttons {
		color: var(--re-p-muted) !important;
		font-size: 13px;
	}
	html.re-preset-theme .search-result-group footer .nav-buttons .nextprev a {
		background-color: var(--re-p-surface-hi) !important;
		border: 1px solid var(--re-p-border) !important;
		border-radius: 4px;
		color: var(--re-p-text) !important;
		padding: 4px 10px;
	}

	/* Dropdown menus */
	html.re-preset-theme .drop-choices {
		background-color: var(--re-p-surface-lo) !important;
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .drop-choices a {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .drop-choices a:hover,
	html.re-preset-theme .drop-choices .selected a {
		background-color: var(--re-p-accent) !important;
		color: var(--re-p-accent-fg) !important;
	}

	/* Posts */
	html.re-preset-theme .link {
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border-bottom: 1px solid var(--re-p-border-weak) !important;
	}
	html.re-preset-theme .link .title {
		color: var(--re-p-text-strong) !important;
	}
	html.re-preset-theme .link .title:visited {
		color: var(--re-p-link-visited) !important;
	}
	html.re-preset-theme .link .tagline,
	html.re-preset-theme .link .tagline a,
	html.re-preset-theme .link .flat-list a {
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme .link .score {
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme .link .score.likes {
		color: var(--re-p-up) !important;
	}
	html.re-preset-theme .link .score.dislikes {
		color: var(--re-p-down) !important;
	}
	html.re-preset-theme .morelink,
	html.re-preset-theme .morelink a {
		background: var(--re-p-surface-hi) !important;
		color: var(--re-p-text-strong) !important;
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .morelink:hover,
	html.re-preset-theme .morelink:hover a {
		background: var(--re-p-accent) !important;
		color: var(--re-p-accent-fg) !important;
	}
	html.re-preset-theme .nextprev a {
		background-color: var(--re-p-surface-hi) !important;
		color: var(--re-p-text) !important;
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .linkflairlabel,
	html.re-preset-theme .flair {
		background: var(--re-p-surface-hi) !important;
		color: var(--re-p-text) !important;
		border-color: var(--re-p-border) !important;
	}

	/* Comments */
	html.re-preset-theme .comment .usertext-body {
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .comment .md {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .comment .tagline,
	html.re-preset-theme .comment .tagline a,
	html.re-preset-theme .comment .flat-list a {
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme .comment .tagline .submitter {
		color: var(--re-p-accent) !important;
	}
	html.re-preset-theme .comment .tagline .moderator {
		color: var(--re-p-green) !important;
	}
	html.re-preset-theme .comment .tagline .admin {
		color: var(--re-p-red) !important;
	}
	html.re-preset-theme .comment .child {
		border-left-color: var(--re-p-border-weak) !important;
	}

	/* Sidebar and wiki boxes */
	html.re-preset-theme .side {
		background-color: transparent !important;
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .side .sidebox .spacer {
		background: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border-radius: 6px;
	}
	html.re-preset-theme .titlebox,
	html.re-preset-theme .titlebox .usertext-body,
	html.re-preset-theme .sidecontentbox .content,
	html.re-preset-theme .linkinfo,
	html.re-preset-theme .login-form-side,
	html.re-preset-theme .side .side-message {
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		color: var(--re-p-text) !important;
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .titlebox h1,
	html.re-preset-theme .titlebox h1 a {
		color: var(--re-p-text-strong) !important;
	}
	html.re-preset-theme .side .flairtoggle {
		background-color: transparent !important;
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme .side .flairtoggle label {
		color: var(--re-p-muted) !important;
	}
	html.re-preset-theme .side .flairselector {
		background-color: var(--re-p-surface) !important;
		border-color: var(--re-p-border) !important;
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .side .md,
	html.re-preset-theme .side .md p {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .subscribers .word,
	html.re-preset-theme .users-online .word {
		color: var(--re-p-muted) !important;
	}

	/* Listing chooser (side menu) */
	html.re-preset-theme .listing-chooser {
		background-color: var(--re-p-surface-lo-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
	}
	html.re-preset-theme .listing-chooser .grippy {
		background-color: var(--re-p-surface-lo) !important;
	}
	html.re-preset-theme .listing-chooser li {
		color: var(--re-p-text) !important;
	}
	html.re-preset-theme .listing-chooser li.selected {
		background-color: var(--re-p-surface-hi) !important;
	}

	/* Footer */
	html.re-preset-theme .footer,
	html.re-preset-theme .footer-parent {
		background-color: transparent !important;
		color: var(--re-p-muted) !important;
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme .footer a {
		color: var(--re-p-link) !important;
	}

	/* Modernise Old Reddit cards */
	html.re-preset-theme #siteTable .thing {
		background-color: var(--re-p-surface-trans) !important;
		backdrop-filter: blur(var(--re-theme-blur));
		border-color: var(--re-p-border) !important;
	}
	html.re-preset-theme #siteTable .thing:hover {
		border-color: var(--re-p-accent) !important;
	}
	`;
}

export function buildPresetCss(theme) {
	const useV1 = typeof redditVersion !== 'undefined' && redditVersion === 'old';
	return `${buildPaletteCss(theme)}${useV1 ? buildV1Css() : buildV3Css()}`;
}
