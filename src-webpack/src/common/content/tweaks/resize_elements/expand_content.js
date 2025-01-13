/* ===== Tweaks - Expand Feed/Post - Expand Feed/Post ===== */

/* === Triggered On Page Load === */
export function loadExpandContent() {
	BROWSER_API.storage.sync.get(['expandLayout', 'expandLayoutWidth', 'expandSubWidth', 'expandPostWidth', 'expandPostOverlayWidth', 'expandUserProfileWidth', 'expandTopicFeedWidth', 'expandCustomFeedWidth'], function (result) {
		if (result.expandLayout) expandLayout(true);
		expandLayoutWidth(result.expandLayoutWidth);
		expandSubWidth(result.expandSubWidth);
		expandPostWidth(result.expandPostWidth);
		expandPostOverlayWidth(result.expandPostOverlayWidth);
		expandUserProfileWidth(result.expandUserProfileWidth);
		expandTopicFeedWidth(result.expandTopicFeedWidth);
		expandCustomFeedWidth(result.expandCustomFeedWidth);
	});
}

/* === Main Function === */
export function expandLayout(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableExpandContentOld();
		} else if (value === false) {
			disableExpandContentOld();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			if (useLegacy) {
				console.log('legacy expand');
				enableExpandContentNewLegacy();
			} else {
				enableExpandContentNew();
			}
		} else if (value === false) {
			if (useLegacy) {
				disableExpandContentNewLegacy();
			} else {
				disableExpandContentNew();
			}
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableExpandContentNewNew();
		} else if (value === false) {
			disableExpandContentNewNew();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Expand Content - Old
function enableExpandContentOld() {
	const reMain = document.querySelector('#re-main');
	if (!reMain) {
		// Restructure HTML
		const main = document.createElement('div');
		main.id = 're-main';
		const container = document.createElement('div');
		container.id = 're-container';
		const body = document.querySelector('body');
		const sidemenu = document.querySelector('.listing-chooser');
		const side = document.querySelector('.side');
		const content = document.querySelector('.content[role="main"]');
		const sort = document.querySelector('#header .tabmenu');
		body.insertBefore(main, side);
		if (sidemenu) {
			main.append(sidemenu);
		}
		container.append(content);
		container.append(side);
		main.append(container);
		content.insertBefore(sort, content.firstChild);
	}
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `#re-main {
									display: flex;
									width: 100%;
									justify-content: center;
								}
								#re-container {
									display: flex;
									width: var(--re-content-width) !important;
								}
								.subscriber.listing-page #re-container {
									width: var(--re-sub-width) !important;
								}
								.comments-page #re-container {
									width: var(--re-post-width) !important;
								  }
								#re-container .content {
									width: 100% !important;
									margin-left: 24px !important;
								}
								#re-container .sidecontentbox .content {
									width: calc(100% - 10px) !important;
									margin-left: 0 !important;
								}
								#re-container > .content > #siteTable {
									margin-left: 0 !important;
								}
								#re-container > .content > ul {
									margin-left: 0 !important;
									margin-right: 0 !important;
								}
								.re-centre-container-old {
									transform: translateX(182px);
								}
								.thing .usertext-body > .md {
									max-width: 100%;
								}
								#re-container .side {
									margin-left: 0 !important;
								}
								#re-container .commentarea {
									width: calc(100% - 26px);
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
	// Apply resize
	/*if (document.querySelector('#re-container')) {
		document.querySelector('#re-container').classList.add('re-resize');
	}*/
}

// Function - Disable Expand Content - Old
function disableExpandContentOld() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-expand-feed-layout"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
	/*if (document.querySelector('#re-container')) {
		document.querySelector('#re-container').classList.remove('re-resize');
	}*/
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
	styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child:has([data-testid="frontpage-sidebar"]) > :first-child {
									width: var(--re-content-width) !important;
								}
								.ListingLayout-backgroundContainer + div > :last-child:has([data-testid="subreddit-sidebar"]) > :first-child:has(#view--layout--FUE) {
									width: var(--re-sub-width) !important;
								}
								.ListingLayout-backgroundContainer + div > div[style^="max-width"] {
									max-width: 100% !important;
								}
								/*.ListingLayout-backgroundContainer + div > div[style^="max-width"] > :first-child {
									max-width: var(--re-sub-width) !important; 
								}*/
								.ListingLayout-backgroundContainer + div > :last-child:has(.Post[data-testid="post-container"] [data-test-id="post-content"]) {
									max-width: 100% !important;
								}
								.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(.Post[data-testid="post-container"] [data-test-id="post-content"]) {
									max-width: var(--re-post-width) !important;
								}
								#overlayScrollContainer > div:has(.Post) :first-child {
									max-width: 100% !important;
								}
								#overlayScrollContainer > :first-child,
								#overlayScrollContainer > div:has(.Post) {
									width: var(--re-post-overlay-width) !important;
									max-width: var(--re-post-overlay-width) !important;
								}
								#overlayScrollContainer > :first-child > div {
									max-width: 100% !important;
								}
								#SHORTCUT_FOCUSABLE_DIV [class^="subredditvars-r-"] :first-child::after {
									width: var(--re-post-overlay-width) !important;
									max-width: var(--re-post-overlay-width) !important;
								}
								.ListingLayout-backgroundContainer + div:has([href="/settings/profile"]) > :last-child > :first-child {
									width: var(--re-user-profile-width) !important;
								}
								.Post [data-test-id="post-content"] > div:has(.RichTextJSON-root) {
									max-width: 100% !important;
								}
								.Comment > :last-child {
									max-width: 100% !important;
								}
								.ListingLayout-backgroundContainer + div:has(button#MULTIREDDIT_TOP_BAR_OVERFLOW) > :last-child > :first-child {
									width: var(--re-custom-feed-width);
								}
								.ListingLayout-backgroundContainer + div:has(button#MULTIREDDIT_TOP_BAR_OVERFLOW) > :first-child > div {
									max-width: var(--re-custom-feed-width);
									padding: 0 1.5rem;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Expand Content - New
function disableExpandContentNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-expand-feed-layout"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Expand Content - New New
function enableExpandContentNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-expand-feed-layout';
	styleElement.textContent = `:root {
									--re-side-menu-width: 272px;								
									--re-home-sidebar-width: 316px;
									--re-post-sidebar-width: 316px;
									--re-search-sidebar-width: 316px;
									--re-sub-sidebar-width: 316px;
									--re-user-profile-sidebar-width: 316px;
									--re-custom-feed-sidebar-width: 316px;
								}

								/* @media (min-width: 768px) {
									shreddit-app[routename="frontpage"] .main-container {
										margin-right: 2rem !important;
									}
								} */

								@media (max-width: 768px) {
									shreddit-app[routename="subreddit"] .subgrid-container {
										margin-right: 0;
									}
								}

								@media (min-width: 960px) {
									.subgrid-container {
										width: 100% !important;
									}
								}

								@media (max-width: 959px) {
									.main-container {
										grid-template-columns: auto !important;
										--re-sub-sidebar-width: 0 !important;
									}
								}

								@media (max-width: 770px) {
									.main-container {
										--re-home-sidebar-width: 0 !important;
										--re-post-sidebar-width: 0 !important;
										--re-search-sidebar-width: 0 !important;
										--re-user-profile-sidebar-width: 0 !important;
									}
									#right-sidebar-container {
										display: none !important;
									}
								}

								@media (max-width: 1200px) {
									.subgrid-container {
										--re-side-menu-width: 0 !important;
									}
								}

								@media (min-width: 1200px) {
									.m\\:grid-cols-\\[272px_1fr\\] {
										grid-template-columns: var(--re-side-menu-width) 1fr !important;
									}
									.grid-container:not(.grid-full) {
										grid-template-columns: var(--re-side-menu-width) 1fr !important;;
									}
								}
								
								shreddit-app[routename="frontpage"] #main-content,
								shreddit-app[routename="all"] #main-content,
								shreddit-app[routename="popular"] #main-content,
								shreddit-app[pagetype="search_results"] #main-content,
								shreddit-app[pagetype="post_submit"] #main-content,
								shreddit-app[routename="frontpage"] main.main,
								shreddit-app[routename="all"] main.main,
								shreddit-app[routename="popular"] main.main,
								shreddit-app[pagetype="search_results"] main.main,
								shreddit-app[pagetype="post_submit"] main.main{
									width: var(--re-content-width) !important;
									min-width: var(--re-content-width) !important;
									justify-self: center;
									margin-left: 0;
								}
								shreddit-app[routename="inbox"] #main-content,
								shreddit-app[routename="inbox"] main.main {
									max-width: var(--re-content-width) !important;
									justify-self: center;
								}
								shreddit-app[pagetype="search_results"] #main-content,
								shreddit-app[pagetype="search_results"] main.main {
									max-width: 100% !important;
								}
								shreddit-app[routename="subreddit"] #main-content,
								shreddit-app[routename="subreddit"] main.main {
									width: var(--re-sub-width);
									max-width: 100%;
								}
								shreddit-app[routename="subreddit_wiki"] #main-content,
								shreddit-app[routename="subreddit_wiki"] main.main {
									max-width: var(--re-sub-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="post_page"] #main-content,
								shreddit-app[routename="comments_page"] #main-content,
								shreddit-app[routename="profile_post_page"] #main-content,
								shreddit-app[routename="subreddit_wiki"] #main-content,
								shreddit-app[routename="post_page"] main.main,
								shreddit-app[routename="comments_page"] main.main,
								shreddit-app[routename="profile_post_page"] main.main,
								shreddit-app[routename="subreddit_wiki"] main.main {
									max-width: var(--re-post-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="profile_overview"] #main-content,
								shreddit-app[routename="profile_posts"] #main-content,
								shreddit-app[routename="profile_comments"] #main-content,
								shreddit-app[routename="profile_saved"] #main-content,
								shreddit-app[routename="profile_hidden"] #main-content,
								shreddit-app[routename="profile_upvoted"] #main-content,
								shreddit-app[routename="profile_downvoted"] #main-content,
								shreddit-app[routename="profile_overview"] main.main,
								shreddit-app[routename="profile_posts"] main.main,
								shreddit-app[routename="profile_comments"] main.main,
								shreddit-app[routename="profile_saved"] main.main,
								shreddit-app[routename="profile_hidden"] main.main,
								shreddit-app[routename="profile_upvoted"] main.main,
								shreddit-app[routename="profile_downvoted"] main.main{
									width: var(--re-user-profile-width) !important;
									min-width: var(--re-user-profile-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="topic"] #main-content,
								shreddit-app[routename="topic"] main.main {
									min-width: var(--re-topic-feed-width) !important;
									max-width: var(--re-topic-feed-width) !important;
									justify-self: center;
								}

								/*shreddit-app .grid-container {
									grid-template-columns: var(--re-side-menu-width) auto;
								}*/
								shreddit-app[routename="frontpage"] .subgrid-container,
								shreddit-app[routename="subreddit"] .subgrid-container,
								shreddit-app[routename="post_page"] .subgrid-container,
								shreddit-app[routename="comments_page"] .subgrid-container,
								shreddit-app[routename="profile_post_page"] .subgrid-container,
								shreddit-app[routename="profile_overview"] .subgrid-container,
								shreddit-app[routename="profile_posts"] .subgrid-container,
								shreddit-app[routename="profile_comments"] .subgrid-container,
								shreddit-app[routename="profile_saved"] .subgrid-container,
								shreddit-app[routename="profile_hidden"] .subgrid-container,
								shreddit-app[routename="profile_upvoted"] .subgrid-container,
								shreddit-app[routename="profile_downvoted"] .subgrid-container,
								shreddit-app[routename="all"] .subgrid-container,
								shreddit-app[routename="popular"] .subgrid-container,
								shreddit-app[pagetype="search_results"] .subgrid-container,
								shreddit-app[routename="explore-page"] .subgrid-container,
								shreddit-app[pagetype="post_submit"] .subgrid-container,
								shreddit-app[pagetype="custom_feed"] .subgrid-container {
									width: 100% !important;
									min-width: calc(100vw - var(--re-side-menu-width)) !important;
									max-width: calc(100vw - var(--re-side-menu-width)) !important;
								}

								shreddit-app[routename="frontpage"] .main-container, 
								shreddit-app[routename="all"] .main-container,
								shreddit-app[routename="popular"] .main-container,
								shreddit-app[routename="topic"] .main-container,
								shreddit-app[routename="inbox"] .main-container {
									display: grid;
									grid-template-columns: auto var(--re-home-sidebar-width) !important;
								}

								shreddit-app[pagetype="search_results"] .main-container {
									display: grid;
									grid-template-columns: auto var(--re-search-sidebar-width) !important;
								}

								shreddit-app[routename="subreddit"] .main-container {
									display: grid;
									grid-template-columns: auto var(--re-sub-sidebar-width) !important;
								}

								shreddit-app[routename="subreddit_wiki"] .main-container,
								shreddit-app[pagetype="post_submit"] .main-container {
									display: grid;
									grid-template-columns: auto 316px;
								}

								shreddit-app[routename="profile_post_page"] .main-container,
								shreddit-app[routename="profile_overview"] .main-container,
								shreddit-app[routename="profile_posts"] .main-container,
								shreddit-app[routename="profile_comments"] .main-container,
								shreddit-app[routename="profile_saved"] .main-container,
								shreddit-app[routename="profile_hidden"] .main-container,
								shreddit-app[routename="profile_upvoted"] .main-container,
								shreddit-app[routename="profile_downvoted"] .main-container {
									display: grid;
									grid-template-columns: auto var(--re-user-profile-sidebar-width) !important;
								}
								
								shreddit-app[routename="post_page"] .main-container,
								shreddit-app[routename="comments_page"] .main-container {
									display: grid;
									grid-template-columns: auto var(--re-post-sidebar-width) !important;
								}

								shreddit-app[pagetype="custom_feed"] .main-container {
									display: grid;
									grid-template-columns: auto var(--re-custom-feed-sidebar-width) !important;
									min-width: var(--re-main-container-width, 100%);
									max-width: calc(100% - var(--re-side-menu-width));
								}

								shreddit-app[pagetype="custom_feed"] #main-content,
								shreddit-app[pagetype="custom_feed"] main.main {
									min-width: var(--re-custom-feed-width) !important;
									max-width: var(--re-custom-feed-width) !important;
									justify-self: center;
								}
									
								/*shreddit-app[routename="explore-page"] .main-container {
									width: calc(100vw - 2rem) !important;
								}*/`;
	document.head.appendChild(styleElement);
	document.documentElement.classList.add('re-expand-feed-layout');
}

// Function - Disable Expand Content - New New
function disableExpandContentNewNew() {
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
