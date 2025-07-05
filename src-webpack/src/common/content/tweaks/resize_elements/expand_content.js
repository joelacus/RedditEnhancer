/* ===== Tweaks - Expand Feed/Post - Expand Feed/Post ===== */

/* === Triggered On Page Load === */
import { showBannerMessage } from "../../banner_message";

export function loadExpandContent() {
	BROWSER_API.storage.sync.get(['snapSidebar', 'expandLayout', 'expandLayoutWidth', 'expandSubWidth', 'expandPostWidth', 'expandPostOverlayWidth', 'expandUserProfileWidth', 'expandTopicFeedWidth', 'expandCustomFeedWidth', 'resizeMainContainerWidth'], function (result) {
		snap = result.snapSidebar;
		if (result.expandLayout) expandLayout(true);
		expandLayoutWidth(result.expandLayoutWidth);
		expandSubWidth(result.expandSubWidth);
		expandPostWidth(result.expandPostWidth);
		expandPostOverlayWidth(result.expandPostOverlayWidth);
		expandUserProfileWidth(result.expandUserProfileWidth);
		expandTopicFeedWidth(result.expandTopicFeedWidth);
		expandCustomFeedWidth(result.expandCustomFeedWidth);
		resizeMainContainerWidth(result.resizeMainContainerWidth);
	});
}

let snap = false;

/* === Main Function === */
export function expandLayout(value) {
	if (value) {
		switch (redditVersion) {
			case 'old':
				enableExpandContentOld();
				break;
			case 'new':
				if (useLegacy) enableExpandContentNewLegacy();
				else enableExpandContentNew();
				break;
			case 'newnew':
				enableExpandContentNewNew();
				break;
		}
	} else {
		disableExpandContentAll();
		if (legacy) document.querySelector('.re-feed').style.maxWidth = '1600px';
	}
}

export function snapSidebar(value) {
	showBannerMessage('info', "[RedditEnhancer] Changes will take effect after a reload or the next time you load Reddit.");
}

/* === Enable/Disable Functions === */

// Function - Enable Expand Content - Old
function enableExpandContentOld() {
	// const reMain = document.querySelector('#re-main');
	// if (!reMain) {
	// 	// Restructure HTML
	// 	const main = document.createElement('div');
	// 	main.id = 're-main';
	// 	const container = document.createElement('div');
	// 	container.id = 're-container';
	// 	const body = document.querySelector('body');
	// 	const sidemenu = document.querySelector('.listing-chooser');
	// 	const side = document.querySelector('.side');
	// 	const content = document.querySelector('.content[role="main"]');
	// 	const sort = document.querySelector('#header .tabmenu');
	// 	body.insertBefore(main, side);
	// 	if (sidemenu) {
	// 		main.append(sidemenu);
	// 	}
	// 	container.append(content);
	// 	container.append(side);
	// 	main.append(container);
	// 	content.insertBefore(sort, content.firstChild);
	// }
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `div.content {
									margin: .5rem 0;
								}
								.listing-page div.content[role="main"],
								.messages-page div.content[role="main"],
								.wiki-page div.content[role="main"],
								.submit-page div.content[role="main"],
								.moderator div.content[role="main"] {
									width: var(--re-content-width);
									max-width: calc(100% - 15px);
								}
								.comments-page div.content[role="main"],
								.other-discussions-page div.content[role="main"] {
									width: var(--re-post-width);
									margin: .5rem 8px;
									max-width: calc(100% - 2rem);
								}
								.profile-page div.content[role="main"] {
									width: var(--re-user-profile-width);
								}
								.listing-page.multi-page div.content[role="main"] {
									width: var(--re-custom-feed-width);
									max-width: calc(100% - 15px);
								}
								/* Expand the post content, comments and wiki page content */
								.md,
								div.content[role="main"] .subreddit-rules-page,
								div.search-result-group {
									max-width: initial !important;
								}
								div.search-result-group {
									padding: 1rem;
								}
								.wiki-page div.wiki-page-content {
									margin: .25rem;
								}
								div.panestack-title,
								p#noresults,
								div.infobar,
								.commentarea div.menuarea {
									margin: 10px 0;
								}
								.comments-page div.midcol,
								div.gold-accent.comment-visits-box,
								div.commentarea > form.usertext {
									margin-left: 0 !important;
								}
								.res-commentBoxes div.comment {
									margin: 0 0 8px 0 !important;
								}
								div.searchpane {
									margin: 5px;
								}
								div.markdownEditor-wrapper,
								div.usertext-edit textarea,
								div.roundfield .usertext-edit,
								.moderator div.usertext-edit.md-container,
								form#compose-message div.roundfield {
									width: 100%;
									max-width: initial;
								}
								.comments-page div.usertext-edit.md-container {
									width: 50%;
									max-width: initial;
								}
								/* Submit post page */
								.submit-page div.formtabs-content,
								div.usertext.usertext--with-margin {
									width: 100%;
								}
								.submit-page div.roundfield {
									width: calc(100% - 20px);
								}
								div.roundfield textarea[name="title"],
								div.roundfield input[type="text"],
								div.roundfield input[type="url"],
								div.roundfield input[type="password"],
								div.roundfield input[type="number"],
								#compose-message div.roundfield select {
									width: calc(100% - .5rem);
								}
								/* Moderator pages */
								div.linefield,
								div.linefield.mobile {
									width: 60%;
								}
								/* Changes for "Modernise Old Reddit" */
								.re-modernise #re-container {
									display: flex;
								}
								.re-modernise .content > .tabmenu {
									margin-top: 16px !important;
									width: calc(100% - 75px) !important;
								}
								.re-modernise .comments-page #siteTable {
									margin-left: 0 !important;
									width: 100% !important;
								}
								.re-modernise .comments-page .tabmenu {
									margin-left: 0 !important;
									width: calc(100% - 28px) !important;
								}
								.re-modernise .side {
									margin-left: 0 !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Expand Content - New - Legacy
function enableExpandContentNewLegacy() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `.re-feed {
									width: var(--re-content-width) !important;
									max-width: var(--re-content-width) !important;
								}
								.re-sub {
									width: var(--re-sub-width) !important;
									max-width: var(--re-sub-width) !important;
								}
								.re-post {
									width: var(--re-psot-width) !important;
									max-width: var(--re-psot-width) !important;
								}
								.re-user {
									width: var(--re-user-profile-width) !important;
									max-width: var(--re-user-profile-width) !important;
								}
								.re-feed > div,
								.re-feed-sub > div,
								.re-feed-post > div,
								.re-feed-user > div {
									width: 100% !important;
									max-width: 100% !important;
								}
								.re-search {
									min-width: calc(var(--re-content-width) - 48px) !important;
									max-width: calc(var(--re-content-width) - 48px) !important;
								}
								.re-search-parent {
									min-width: 100%;
									margin: 0;
								}
								.re-post-container {
									width: 100% !important;
									max-width: 100% !important;
								}
								.re-post-container .Comment div:nth-child(3) {
									max-width: 100% !important;
								}
								[data-test-id="post-content"] [data-click-id="text"] {
									max-width: 100% !important;
								}
								#overlayScrollContainer div {
									max-width: 100%;
								}
								#overlayScrollContainer > div {
									max-width: var(--re-post-overlay-width);
									background-color: var(--comments-overlay-background);
								}
								#overlayScrollContainer [data-test-id="post-content"] div[style="max-width: 800px;"] {
									max-width: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
	document.querySelector('.re-feed').style = '';
}

// Function - Disable Expand Content - New - Legacy
function disableExpandContentNewLegacy() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-expand-feed-layout"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.querySelector('.re-feed').style.maxWidth = '1600px';
}

// Function - Enable Expand Content - New
function enableExpandContentNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child:has([data-testid="frontpage-sidebar"]) {
									width: var(--re-content-width) !important;
								}
								.ListingLayout-backgroundContainer + div > :last-child:has([data-testid="frontpage-sidebar"]) > :first-child,
								.ListingLayout-backgroundContainer + div > :last-child:has([data-testid="subreddit-sidebar"]) > :first-child {
									width: 100%;
									max-width: 100%;
								}
								.ListingLayout-backgroundContainer + div > :last-child:has([data-testid="subreddit-sidebar"]) {
									width: var(--re-sub-width) !important;
								}
								.ListingLayout-backgroundContainer + div:has([data-testid="subreddit-sidebar"]) > :nth-child(2) > div {
									max-width: var(--re-sub-width) !important;
									box-sizing: border-box;
								}
								.ListingLayout-backgroundContainer + div > div[style^="max-width"] {
									max-width: 100%;
								}
								.ListingLayout-backgroundContainer + div:has(.Post[data-testid="post-container"] [data-test-id="post-content"]) > span a div,
								.ListingLayout-backgroundContainer + div:has(.Post[data-testid="post-container"] [data-test-id="post-content"]) > :nth-child(2) > div,
								.ListingLayout-backgroundContainer + div > :last-child:has(.Post[data-testid="post-container"] [data-test-id="post-content"]) {
									max-width: var(--re-post-width) !important;
								}
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(.Post[data-testid="post-container"] [data-test-id="post-content"]) {
									max-width: 100%;
								}
								#overlayScrollContainer > div:nth-child(2) > div:first-child {
									max-width: initial;
									margin-right: 1.25rem;
								}
								#overlayScrollContainer div:has(> div[data-testid="no-edit-description-block"]) > div:first-child {
									width: 310px;
								}
								/* overlayScrollContainer top bar and background */
								#overlayScrollContainer > :first-child,
								#SHORTCUT_FOCUSABLE_DIV [class^="subredditvars-r-"] :first-child::after {
									width: var(--re-post-overlay-width);
									max-width: 100%;
								}
								#overlayScrollContainer > :first-child > div {
									max-width: 100%;
								}
								#overlayScrollContainer > div:has(.Post) {
									width: var(--re-post-overlay-width);
									max-width: var(--re-post-overlay-width);
								}
								.ListingLayout-backgroundContainer + div:has(span[id^="profile--id-card--"]) > :last-child,
								.ListingLayout-backgroundContainer + div > div > div:has(a[data-testid^="/user/"]) {
									width: var(--re-user-profile-width);
								}
								.ListingLayout-backgroundContainer + div > div > div:has(a[data-testid^="/user/"]) {
									margin: 0 auto;
									
									& > div {
										left: initial;
										right: initial;
									}
								}
								.ListingLayout-backgroundContainer + div:has(span[id^="profile--id-card--"]) > :last-child > :first-child {
									width: 100%;
								}
								.Post [data-test-id="post-content"] > div:has(.RichTextJSON-root) {
									max-width: 100% !important;
								}
								.Comment > :last-child {
									max-width: 100% !important;
								}
								/* Search result pages */
								.ListingLayout-backgroundContainer + div:has([data-testid="search-results-sidebar"]) > div {
									width: var(--re-content-width);
									max-width: 100%;
								}
								.ListingLayout-backgroundContainer + div:has([data-testid="search-results-sidebar"]) > div > div {
									max-width: initial;
								}
								.ListingLayout-backgroundContainer + div:has([data-testid="search-results-sidebar"]) > div > div > :nth-child(2) > :first-child {
									max-width: initial;
								}
								/* Custom feed/multireddit */
								.ListingLayout-backgroundContainer + div:has(button#MULTIREDDIT_TOP_BAR_OVERFLOW) > :last-child {
									width: var(--re-custom-feed-width);
								}
								.ListingLayout-backgroundContainer + div:has(button#MULTIREDDIT_TOP_BAR_OVERFLOW) > :last-child > :first-child {
									width: 100%;
								}
								.ListingLayout-backgroundContainer + div:has(button#MULTIREDDIT_TOP_BAR_OVERFLOW) > :first-child > div {
									max-width: var(--re-custom-feed-width);
									padding: 0 1.5rem;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Expand Content - New New
function enableExpandContentNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `
		@media (min-width: 960px) {
			shreddit-app .grid-container:not(.grid-full) .subgrid-container {
				width: 100%;
				max-width: revert;
				gap: revert;
				padding: revert;
			}
			div.main-container.grid {
            	grid-template-columns: 1fr minmax(0,316px);
            	gap: 1.25rem;
            	margin: 0 auto;
            }
            /* Align subreddit title with main-content */
            .masthead,
            .masthead > section {
                margin: 0 auto;
            }
            shreddit-gallery-carousel > li {
            	padding: 0 !important;
			}
            community-appearance-entrypoint[target="banner"] {
                margin-bottom: 3rem !important;
            }
        }`;
	if (!snap) {
		styleElement.textContent += `
			@media (min-width: 960px) {
				shreddit-app[routename="frontpage"] .main-container,
				shreddit-app[routename="all"] .main-container,
				shreddit-app[routename="popular"] .main-container,
				shreddit-app[routename="popular"] div.masthead,
				shreddit-app[routename="mod_queue_all"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\],
				shreddit-app[pagetype="search_results"] .main-container,
				shreddit-app[pagetype="post_submit"] .main-container,
				shreddit-app[routename="inbox"] .main-container {
					max-width: min(var(--re-content-width), var(--re-main-container-width));
				}
				shreddit-app[routename="subreddit"] .main-container,
				shreddit-app[routename="subreddit"] .masthead,
				shreddit-app[routename="subreddit_wiki"] .main-container,
				shreddit-app[routename="subreddit_wiki"] .masthead,
				shreddit-app[routename="mod_queue"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\] {
					max-width: min(var(--re-sub-width), var(--re-main-container-width));
				}
				shreddit-app[routename="post_page"] .main-container,
				shreddit-app[routename="comments_page"] .main-container,
				shreddit-app[routename="profile_post_page"] .main-container,
				shreddit-app[routename="profile_post_page_comments"] .main-container,
				shreddit-app[routename="post_stats"] .main-container {
					max-width: min(var(--re-post-width), var(--re-main-container-width));
				}
				shreddit-app[routename="profile_overview"] .main-container,
				shreddit-app[routename="profile_posts"] .main-container,
				shreddit-app[routename="profile_comments"] .main-container,
				shreddit-app[routename="profile_saved"] .main-container,
				shreddit-app[routename="profile_hidden"] .main-container,
				shreddit-app[routename="profile_upvoted"] .main-container,
				shreddit-app[routename="profile_downvoted"] .main-container {
					max-width: min(var(--re-user-profile-width), var(--re-main-container-width));
				}
				shreddit-app[routename="topic"] .main-container {
					max-width: min(var(--re-topic-feed-width), var(--re-main-container-width));
				}
				shreddit-app[pagetype="custom_feed"] .main-container,
				shreddit-app[pagetype="custom_feed"] div.masthead {
					max-width: min(var(--re-custom-feed-width), var(--re-main-container-width));
				}
			}`;
	} else {
		styleElement.textContent += `
			@media (min-width: 960px) {
				div.main-container.grid {
					max-width: 100%;
					padding: 0 1.5rem;
					box-sizing: border-box;
				}
				shreddit-app[routename="frontpage"] main.main,
				shreddit-app[routename="all"] main.main,
				shreddit-app[routename="popular"] main.main,
				shreddit-app[routename="mod_queue_all"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\],
				shreddit-app[pagetype="search_results"] main.main,
				shreddit-app[pagetype="post_submit"] main.main,
				shreddit-app[routename="inbox"] main.main {
					max-width: var(--re-content-width);
					margin: 0 auto;
				}
				shreddit-app[routename="popular"] .masthead {
					max-width: calc(100vw - 2rem);
				}
				shreddit-app[routename="subreddit"] main.main,
				shreddit-app[routename="subreddit_wiki"] main.main,
				shreddit-app[routename="mod_queue"] div[slot="mod-queue-feed"] > div.max-w-\\[756px\\] {
					max-width: var(--re-sub-width);
					margin: 0 auto;
				}
				shreddit-app[routename="subreddit"] .masthead,
				shreddit-app[routename="subreddit_wiki"] .masthead {
					padding: 0 1.5rem;
				}
				shreddit-app[routename="post_page"] main.main,
				shreddit-app[routename="comments_page"] main.main,
				shreddit-app[routename="profile_post_page"] main.main,
				shreddit-app[routename="profile_post_page_comments"] main.main,
				shreddit-app[routename="post_stats"] main.main {
					max-width: var(--re-post-width);
					margin: 0 auto;
				}
				shreddit-app[routename="profile_overview"] main.main,
				shreddit-app[routename="profile_posts"] main.main,
				shreddit-app[routename="profile_comments"] main.main,
				shreddit-app[routename="profile_saved"] main.main,
				shreddit-app[routename="profile_hidden"] main.main,
				shreddit-app[routename="profile_upvoted"] main.main,
				shreddit-app[routename="profile_downvoted"] main.main {
					max-width: var(--re-user-profile-width);
					margin: 0 auto;
				}
				shreddit-app[routename="topic"] main.main {
					max-width: var(--re-topic-feed-width);
					margin: 0 auto;
				}
				shreddit-app[pagetype="custom_feed"] main.main {
					max-width: var(--re-custom-feed-width);
					margin: 0 auto;
				}
			}`;
	}
	document.head.appendChild(styleElement);
	document.documentElement.classList.add('re-expand-feed-layout');
}

function disableExpandContentAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-expand-feed-layout"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	document.documentElement.classList.remove('re-expand-feed-layout');
}

// Page Style Property - Expand Layout Width
export function expandLayoutWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-content-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-content-width', '80%');
	}
}

// Page Style Property - Expand Post Overlay Width
export function expandPostOverlayWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-post-overlay-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-post-overlay-width', '80%');
	}
}

// Page Style Property - Expand Post Width
export function expandPostWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-post-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-post-width', '80%');
	}
}

// Page Style Property - Expand Sub Reddit Width
export function expandSubWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-sub-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-sub-width', '80%');
	}
}

// Page Style Property - Expand User Profile Feed Width
export function expandUserProfileWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-user-profile-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-user-profile-width', '80%');
	}
}

// Page Style Property - Expand Topic Feed Width
export function expandTopicFeedWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-topic-feed-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-topic-feed-width', '80%');
	}
}

// Page Style Property - Expand Custom Feed Width
export function expandCustomFeedWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-custom-feed-width', value + '%');
	} else {
		document.documentElement.style.setProperty('--re-custom-feed-width', '80%');
	}
}

// Set the custom width
export function resizeMainContainerWidth(value) {
	if (value) {
		document.documentElement.style.setProperty('--re-main-container-width', value + '%');
	} else {
		document.documentElement.style.removeProperty('--re-main-container-width');
	}
}