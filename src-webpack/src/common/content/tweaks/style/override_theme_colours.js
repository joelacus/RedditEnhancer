/**
 * Tweaks: Style - Theme Colours
 *
 * @description Change the colours of various elements on Reddit.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */

// Theme Exception
export function loadCustomTheme() {
	BROWSER_API.storage.sync.get(['themeExceptionsEnable', 'themeExceptionMode', 'themeExceptionSubList'], function (result) {
		const link = window.location.href;
		if (redditVersion === 'newnew') {
			if (result.themeExceptionsEnable == true) {
				// check exception mode
				if (result.themeExceptionMode === 'whitelist') {
					// only load theme for listed sub reddits
					const list = result.themeExceptionSubList.replaceAll(' ', '').split(',');
					if (list.some((sub) => link.includes('r/' + sub + '/'))) {
						loadTheme();
					} else {
						removeTheme();
					}
				} else if (result.themeExceptionMode === 'blacklist') {
					// show theme globally except listed sub reddits
					const list = result.themeExceptionSubList.replaceAll(' ', '').split(',');
					if (!list.some((sub) => link.includes('r/' + sub + '/'))) {
						loadTheme();
					} else {
						removeTheme();
					}
				}
			} else {
				// load theme for all sub reddits
				loadTheme();
			}
		}
	});
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
	BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour', 'themeHeaderTextColour', 'themePostBackgroundColour', 'themePostBorderColour', 'themePostCommentsTextColour1', 'themePostCommentsTextColour2', 'themePostContentAndCommentsLinkColour', 'themePostTextColour1', 'themePostTextColour1CSS', 'themeCodeBlockColourCSS', 'themePostTextColour2', 'themePostVisitedTextColour', 'themeSearchbarBgColour', 'themeSearchbarDropdownBgColour', 'themeSidebarBgColour', 'themeSidebarTextColour', 'themeSidemenuBgColour', 'themeSidemenuButtonHoverColour', 'themeSidemenuTextColour', 'themePostUpvoteColour', 'themePostCommentActionRowColour', 'themePostCommentActionRowColourCSS', 'themePostTableBorderColour'], function (result) {
		themeHeaderBackgroundColour(result.themeHeaderBackgroundColour);
		themeHeaderTextColour(result.themeHeaderTextColour);
		themePostBackgroundColour(result.themePostBackgroundColour);
		themePostBorderColour(result.themePostBorderColour);
		themePostCommentsTextColour1(result.themePostCommentsTextColour1);
		themePostCommentsTextColour2(result.themePostCommentsTextColour2);
		themePostContentAndCommentsLinkColour(result.themePostContentAndCommentsLinkColour);
		themePostTextColour1(result.themePostTextColour1);
		themePostTextColour1CSS(result.themePostTextColour1CSS);
		themePostTableBorderColour(result.themePostTableBorderColour);
		themeCodeBlockColourCSS(result.themeCodeBlockColourCSS);
		themePostTextColour2(result.themePostTextColour2);
		themePostVisitedTextColour(result.themePostVisitedTextColour);
		themeSearchbarBgColour(result.themeSearchbarBgColour);
		themeSearchbarDropdownBgColour(result.themeSearchbarDropdownBgColour);
		themeSidebarBgColour(result.themeSidebarBgColour);
		themeSidebarTextColour(result.themeSidebarTextColour);
		themeSidemenuBgColour(result.themeSidemenuBgColour);
		themeSidemenuButtonHoverColour(result.themeSidemenuButtonHoverColour);
		themeSidemenuTextColour(result.themeSidemenuTextColour);
		themePostUpvoteColour(result.themePostUpvoteColour);
		themePostCommentActionRowColour(result.themePostCommentActionRowColour);
		themePostCommentActionRowColourCSS(result.themePostCommentActionRowColourCSS);
	});
}

// Remove Theme
function removeTheme() {
	// remove element properties
	document.documentElement.style.removeProperty('--re-theme-header-bg');
	document.documentElement.style.removeProperty('--re-theme-header-text');
	document.documentElement.style.removeProperty('--re-theme-sort-bg');
	document.documentElement.style.removeProperty('--re-theme-sort-text');
	document.documentElement.style.removeProperty('--re-theme-sort-text-2');
	document.documentElement.style.removeProperty('--re-theme-sort-border');
	document.documentElement.style.removeProperty('--re-theme-post-bg');
	document.documentElement.style.removeProperty('--re-theme-post-text');
	document.documentElement.style.removeProperty('--re-theme-post-visited-text');
	document.documentElement.style.removeProperty('--re-theme-post-text-2');
	document.documentElement.style.removeProperty('--re-theme-post-border');
	// remove stylesheets
	const dynamicStyleElements = document.querySelectorAll(
		`style[id="re-theme-header-bg-colour"],
		style[id="re-theme-header-text-colour"],
		style[id="re-theme-sort-bg-colour"],
		style[id="re-theme-sort-text-colour"],
		style[id="re-theme-sort-text-colour-2"],
		style[id="re-theme-sort-border-colour"],
		style[id="re-theme-post-bg-colour"],
		style[id="re-theme-post-text-colour"],
		style[id="re-theme-post-visited-text-colour"],
		style[id="re-theme-post-text-colour-2"],
		style[id="re-theme-post-border-colour"]`
	);
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

/* === Enable/Disable The Features === */

// Header Background Colour
export function themeHeaderBackgroundColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColourCSS'], function (result) {
			if (typeof result.themeHeaderBackgroundColourCSS !== 'undefined' && result.themeHeaderBackgroundColourCSS !== 'undefined') {
				document.documentElement.style.setProperty('--re-theme-header-bg', result.themeHeaderBackgroundColourCSS);
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
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-header-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Header Background Colour CSS
export function themeHeaderBackgroundColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeHeaderBackgroundColour'], function (result) {
			if (result.themeHeaderBackgroundColour) document.documentElement.style.setProperty('--re-theme-header-bg', value);
		});
	}
}

// Header Text Colour
export function themeHeaderTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeHeaderTextColourCSS'], function (result) {
			if (typeof result.themeHeaderTextColourCSS !== 'undefined' && result.themeHeaderTextColourCSS !== 'undefined') {
				document.documentElement.style.setProperty('--re-theme-header-text', result.themeHeaderTextColourCSS);
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-header-text-colour';
		styleElement.textContent = `header * {
										--button-color-text-default: var(--re-theme-header-text);
										--color-secondary: var(--re-theme-header-text);
									}
									header > nav > :last-child > :nth-child(2) svg {
										color: var(--re-theme-header-text) !important;
										fill: var(--re-theme-header-text) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-header-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-header-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Header Text Colour CSS
export function themeHeaderTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeHeaderTextColour'], function (result) {
			if (result.themeHeaderTextColour) document.documentElement.style.setProperty('--re-theme-header-text', value);
		});
	}
}

// Post Background Colour
export function themePostBackgroundColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
			if (typeof result.themePostBackgroundColourCSS !== 'undefined' && result.themePostBackgroundColourCSS !== 'undefined') {
				document.documentElement.style.setProperty('--re-theme-post-bg', result.themePostBackgroundColourCSS);
			}
		});
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-bg-colour';
		styleElement.textContent = `:root shreddit-app[routename="post_page"] .grid-container.grid,
									:root shreddit-app[routename="comments_page"] .grid-container.grid,
									:root shreddit-app[routename="profile_post_page_comments"] .grid-container.grid,
									r-post-type-select + section {
										--color-neutral-background: var(--re-theme-post-bg) !important;
										--shreddit-content-background: transparent;
										background-color: var(--re-theme-post-bg);
									}
									r-post-type-select {
										margin-left: 0;
									}
									article shreddit-post,
									shreddit-app[routename="comments_page"] #main-content,
									[routename="post_page"] main.main,
									shreddit-app[pagetype="post_submit"] #post-submit-form section,
									community-highlight-carousel,
									.subgrid-container > .masthead {
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
										background-color: var(--re-theme-post-bg);
										border-radius: var(--re-theme-border-radius, 1rem);
										margin-bottom: var(--re-post-separator-height, 10px);
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
									[routename="post_page"] shreddit-post #pdp-credit-bar {
										background: transparent !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Background Colour CSS
export function themePostBackgroundColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostBackgroundColour'], function (result) {
			if (result.themePostBackgroundColour === true) {
				document.documentElement.style.setProperty('--re-theme-post-bg', value);
				if (value.includes('rgba')) {
					fixThreadlinesForTranslucentPosts();
				} else {
					undoFixThreadlinesForTranslucentPosts();
				}
			}
		});
	}
}

// Run After Page Has Loaded Comments
export function loadFixThreadlinesForTranslucentPosts() {
	BROWSER_API.storage.sync.get(['themePostBackgroundColourCSS'], function (result) {
		if (result.themePostBackgroundColourCSS?.includes('rgba') || result.themePostBackgroundColourCSS?.includes('transparent')) {
			fixThreadlinesForTranslucentPosts();
			comment_observer.observe(document.querySelector('shreddit-comment-tree'), { childList: true, subtree: true });
		} else {
			comment_observer.disconnect();
			undoFixThreadlinesForTranslucentPosts();
		}
	});
}

// Observe Feed For New Comments
const comment_observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === '#comment') {
				fixThreadlinesForTranslucentPosts();
				setTimeout(() => {
					fixThreadlinesForTranslucentPosts();
				}, 100);
				setTimeout(() => {
					fixThreadlinesForTranslucentPosts();
				}, 1000);
			}
		});
	});
});

// Fix Comment Threadlines For Translucent Post Background Colours
function fixThreadlinesForTranslucentPosts() {
	if (!document.head.querySelector('style[id="re-theme-fix-comment-threadline"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-fix-comment-threadline';
		styleElement.textContent = `shreddit-comment {
										--color-neutral-background: transparent !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	document.querySelectorAll('shreddit-comment').forEach((comment) => {
		const main_thread = comment.shadowRoot.querySelector('[data-testid="main-thread-line"]');
		const last_thread = comment.shadowRoot.querySelector('#comment-children .threadline:last-of-type');
		if (main_thread && last_thread) {
			const last_thread_height = last_thread.offsetHeight;
			main_thread.style.position = 'absolute';
			main_thread.style.top = '0';
			main_thread.style.height = `calc(100% - ${last_thread_height}px + 13px)`;
		}
	});
}

// Undo Fix Comment Threadlines For Translucent Post Background Colours
function undoFixThreadlinesForTranslucentPosts() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-fix-comment-threadline"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelectorAll('shreddit-comment').forEach((comment) => {
		const main_thread = comment.shadowRoot.querySelector('[data-testid="main-thread-line"]');
		const last_thread = comment.shadowRoot.querySelector('#comment-children .threadline:last-of-type');
		if (main_thread && last_thread) {
			main_thread.removeAttribute('style');
			last_thread.removeAttribute('style');
		}
	});
}

// Post Text Colour
export function themePostTextColour1(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostTextColour1CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-text', result.themePostTextColour1CSS);
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
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-text');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Text Colour CSS
export function themePostTextColour1CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
			if (result.themePostTextColour1) document.documentElement.style.setProperty('--re-theme-post-text', value);
		});
	}
}

// Code Block Colour CSS
export function themeCodeBlockColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour1'], function (result) {
			if (result.themePostTextColour1) document.documentElement.style.setProperty('--re-theme-code-block-text', value);
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
			document.head.removeChild(element);
		});
	}
}

// Post Comments Text Colour
export function themePostCommentsTextColour1(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1CSS'], function (result) {
			if (typeof result.themePostCommentsTextColour1CSS !== 'undefined' && result.themePostCommentsTextColour1CSS !== 'undefined') {
				document.documentElement.style.setProperty('--re-theme-post-comments-text', result.themePostCommentsTextColour1CSS);
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
			document.head.removeChild(element);
		});
	}
}

// Post Comments Text Colour CSS
export function themePostCommentsTextColour1CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour1'], function (result) {
			if (result.themePostCommentsTextColour1) document.documentElement.style.setProperty('--re-theme-post-comments-text', value);
		});
	}
}

// Post Comments Secondary Text Colour
export function themePostCommentsTextColour2(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2CSS'], function (result) {
			if (typeof result.themePostCommentsTextColour2CSS !== 'undefined' && result.themePostCommentsTextColour2CSS !== 'undefined') {
				document.documentElement.style.setProperty('--re-theme-post-comments-text-2', result.themePostCommentsTextColour2CSS);
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
			document.head.removeChild(element);
		});
	}
}

// Post Comments Secondary Text Colour CSS
export function themePostCommentsTextColour2CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentsTextColour2'], function (result) {
			if (result.themePostCommentsTextColour2) document.documentElement.style.setProperty('--re-theme-post-comments-text-2', value);
		});
	}
}

// Post Visited Text Colour
export function themePostVisitedTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostVisitedTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-visited-text', result.themePostVisitedTextColourCSS);
		});
		if (document.head.querySelector('style[id="re-theme-post-visited-text-colour"]')) return;
		let styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-visited-text-colour';
		styleElement.textContent = `shreddit-feed article a.visited\\:text-neutral-content-weak:visited {
										--color-neutral-content-weak: var(--re-theme-post-visited-text) !important;
										color: var(--re-theme-post-visited-text);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-visited-text-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
		document.documentElement.style.removeProperty('--re-theme-post-visited-text');
	}
}

// Post Visited Text Colour CSS
export function themePostVisitedTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostVisitedTextColour'], function (result) {
			if (result.themePostVisitedTextColour) document.documentElement.style.setProperty('--re-theme-post-visited-text', value);
		});
	}
}

// Post Secondary Text Colour
export function themePostTextColour2(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostTextColour2CSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-text-2', result.themePostTextColour2CSS);
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
			document.head.removeChild(element);
		});
	}
}

// Post Secondary Text Colour CSS
export function themePostTextColour2CSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostTextColour2'], function (result) {
			if (result.themePostTextColour2) document.documentElement.style.setProperty('--re-theme-post-text-2', value);
		});
	}
}

// Post Border Colour
export function themePostBorderColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostBorderColourCSS'], function (result) {
			const colour = result.themePostBorderColourCSS ?? '';
			if (colour) document.documentElement.style.setProperty('--re-theme-post-border', colour);
		});
		if (document.head.querySelector('style[id="re-theme-post-border-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-border-colour';
		styleElement.textContent = `article > shreddit-post,
									main.main search-telemetry-tracker > div:not([data-testid="search-scope-switcher"]),
									div[data-testid="search-crosspost-unit"] div:has(> search-telemetry-tracker) {
										border: solid 1px var(--re-theme-post-border);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-border');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-border-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Border Colour CSS
export function themePostBorderColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostBorderColour'], function (result) {
			if (result.themePostBorderColour) document.documentElement.style.setProperty('--re-theme-post-border', value);
		});
	}
}

// Theme Blur Variable
export function themeBlur(value) {
	if (value) document.documentElement.style.setProperty('--re-theme-blur', `${value}px`);
}

// Sidebar Text Colour
export function themeSidebarTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidebarTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-text', result.themeSidebarTextColourCSS);
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
			document.head.removeChild(element);
		});
	}
}

// Sidebar Text Colour CSS
export function themeSidebarTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarTextColour'], function (result) {
			if (result.themeSidebarTextColour) document.documentElement.style.setProperty('--re-theme-sidebar-text', value);
		});
	}
}

// Sidebar Background Colour
export function themeSidebarBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidebarBgColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidebar-bg', result.themeSidebarBgColourCSS);
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
									shreddit-app[pagetype="popular"] #right-sidebar-contents aside aside {
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
			document.head.removeChild(element);
		});
	}
}

// Sidebar Background Colour CSS
export function themeSidebarBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidebarBgColour'], function (result) {
			if (result.themeSidebarBgColour) document.documentElement.style.setProperty('--re-theme-sidebar-bg', value);
		});
	}
}

// Side Menu Text Colour
export function themeSidemenuTextColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidemenu-text', result.themeSidemenuTextColourCSS);
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
			document.head.removeChild(element);
		});
	}
}

// Side Menu Text Colour CSS
export function themeSidemenuTextColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuTextColour'], function (result) {
			if (result.themeSidemenuTextColour) document.documentElement.style.setProperty('--re-theme-sidemenu-text', value);
		});
	}
}

// Side Menu Background Colour
export function themeSidemenuBgColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColourCSS'], function (result) {
			document.documentElement.style.setProperty('--re-theme-sidemenu-bg', result.themeSidemenuBgColourCSS);
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
			document.head.removeChild(element);
		});
	}
}

// Side Menu Background Colour CSS
export function themeSidemenuBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuBgColour'], function (result) {
			if (result.themeSidemenuBgColour) document.documentElement.style.setProperty('--re-theme-sidemenu-bg', value);
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
			document.head.removeChild(element);
		});
	}
}

// Side Menu Button Hover Colour CSS
export function themeSidemenuButtonHoverColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSidemenuButtonHoverColour'], function (result) {
			if (result.themeSidemenuButtonHoverColour) document.documentElement.style.setProperty('--re-theme-sidemenu-btn-hover', value);
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
			document.head.removeChild(element);
		});
	}
}

// Post Content And Comments Link Colour CSS
export function themePostContentAndCommentsLinkColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostContentAndCommentsLinkColour'], function (result) {
			document.documentElement.style.setProperty('--re-theme-post-content-and-comments-link', result.themePostContentAndCommentsLinkColour === true ? value : '#629fff');
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
										--color-input-secondary-hover: color-mix(in srgb, var(--re-theme-searchbar-bg), #000 5%) !important;
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
			document.head.removeChild(element);
		});
	}
}

// Searchbar Background Colour CSS
export function themeSearchbarBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSearchbarBgColour'], function (result) {
			if (result.themeSearchbarBgColour) document.documentElement.style.setProperty('--re-theme-searchbar-bg', value);
		});
	}
}

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
										--color-neutral-background-strong: var(--re-theme-searchbar-dropdown-bg) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-searchbar-dropdown-bg');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-searchbar-dropdown-bg-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Searchbar Focused/Dropdown Background Colour CSS
export function themeSearchbarDropdownBgColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themeSearchbarDropdownBgColour'], function (result) {
			if (result.themeSearchbarDropdownBgColour) document.documentElement.style.setProperty('--re-theme-searchbar-dropdown-bg', value);
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
		styleElement.textContent = `shreddit-post,
									.re-vote-panel {
										--color-action-upvote: var(--re-theme-post-upvote-colour) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-upvote-colour');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-upvote-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Upvote Colour CSS
export function themePostUpvoteColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostUpvoteColour'], function (result) {
			if (result.themePostUpvoteColour) document.documentElement.style.setProperty('--re-theme-post-upvote-colour', value);
		});
	}
}

// Post Comment Action Row Colour
export function themePostCommentActionRowColour(value) {
	if (redditVersion === 'newnew' && value) {
		BROWSER_API.storage.sync.get(['themePostCommentActionRowCSS'], function (result) {
			if (typeof result.themePostCommentActionRowCSS !== 'undefined' && result.themePostCommentActionRowCSS !== 'undefined') {
				document.documentElement.style.setProperty('--re-theme-post-comment-action-row-colour', result.themePostCommentActionRowCSS);
			}
		});
		if (document.head.querySelector('style[id="re-theme-post-comment-action-row-colour"]')) return;
		const styleElement = document.createElement('style');
		styleElement.id = 're-theme-post-comment-action-row-colour';
		styleElement.textContent = `shreddit-post,
									shreddit-comment-action-row {
										--color-button-plain-text: var(--re-theme-post-comment-action-row-colour) !important;
										--color-button-plain-text-weak: var(--re-theme-post-comment-action-row-colour) !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else {
		document.documentElement.style.removeProperty('--re-theme-post-comment-action-row-colour');
		const dynamicStyleElements = document.querySelectorAll('style[id="re-theme-post-comment-action-row-colour"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}

// Post Comment Action Row Colour CSS
export function themePostCommentActionRowColourCSS(value) {
	if (redditVersion === 'newnew') {
		BROWSER_API.storage.sync.get(['themePostCommentActionRowColour'], function (result) {
			if (result.themePostCommentActionRowColour) document.documentElement.style.setProperty('--re-theme-post-comment-action-row-colour', value);
		});
	}
}
