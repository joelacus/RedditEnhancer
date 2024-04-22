/* ===== Tweaks - Expand Feed/Post - Expand Feed/Post ===== */

/* === Triggered On Page Load === */
export function loadExpandContent() {
	BROWSER_API.storage.sync.get(['expandLayout', 'expandLayoutWidth', 'expandSubWidth', 'expandPostWidth', 'expandPostOverlayWidth', 'expandUserProfileWidth'], function (result) {
		expandLayout(result.expandLayout);
		expandLayoutWidth(result.expandLayoutWidth);
		expandSubWidth(result.expandSubWidth);
		expandPostWidth(result.expandPostWidth);
		expandPostOverlayWidth(result.expandPostOverlayWidth);
		expandUserProfileWidth(result.expandUserProfileWidth);
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
			main.append(sidem - enu);
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
								}
								#re-container > .content > #siteTable {
									margin-left: 0 !important;
								}
								#re-container > .content > ul {
									margin-left: 0 !important;
									width: calc(100% - 26px);
								}
								.re-centre-container-old {
									transform: translateX(182px);
								}
								.thing .usertext-body > .md {
									max-width: 100%;
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
	styleElement.textContent = `@media (min-width: 768px) {
									shreddit-app[routename="frontpage"] .main-container {
										margin-right: 2rem !important;
									}
								}
								@media (max-width: 768px) {
									shreddit-app[routename="subreddit"] .subgrid-container {
										margin-right: 0;
									}
								}

								shreddit-app[routename="frontpage"] #main-content,
								shreddit-app[routename="all"] #main-content,
								shreddit-app[routename="popular"] #main-content {
									width: var(--re-content-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="subreddit"] #main-content {
									width: var(--re-sub-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="post_page"] #main-content,
								shreddit-app[routename="comments_page"] #main-content,
								shreddit-app[routename="profile_post_page"] #main-content {
									width: var(--re-post-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="profile_overview"] #main-content,
								shreddit-app[routename="profile_posts"] #main-content,
								shreddit-app[routename="profile_comments"] #main-content,
								shreddit-app[routename="profile_saved"] #main-content,
								shreddit-app[routename="profile_hidden"] #main-content,
								shreddit-app[routename="profile_upvoted"] #main-content,
								shreddit-app[routename="profile_downvoted"] #main-content {
									width: var(--re-user-profile-width) !important;
									justify-self: center;
								}

								body:has(#main-content.gird),
								body:has(#main-content.col-start-1) {
									@media (min-width: 1920px) {
										shreddit-app[routename="frontpage"] .subgrid-container.xl\\:col-start-5 {
											grid-column-start: 4;
										}
										shreddit-app[routename="frontpage"] #main-content.xl\\:col-span-9 {
											grid-column: span 10/span 10;
										}
										shreddit-app[routename="subreddit"] .subgrid-container.xl\\:col-start-5 {
											grid-column-start: 4;
										}
										shreddit-app[routename="subreddit"] #main-content.xl\\:col-span-9 {
											grid-column: span 10/span 10;
										}
										shreddit-app[routename="post_page"] #main-content.xl\\:col-start-5,
										shreddit-app[routename="profile_post_page"] #main-content.xl\\:col-start-5 {
											grid-column-start: 4;
										}
										shreddit-app[routename="post_page"] #main-content.xl\\:col-end-14,
										shreddit-app[routename="profile_post_page"] #main-content.xl\\:col-end-14 {
											grid-column-end: 15;
										}
										shreddit-app[routename="profile_overview"] #main-content.xl\\:col-start-5 {
											grid-column-start: 4;
										}
										shreddit-app[routename="profile_overview"] #main-content.xl\\:col-end-14 {
											grid-column-end: 15;
										}
									}
								
									.re-hide-home-sidebar {
										@media (min-width: 960px) {
											shreddit-app[routename="frontpage"] #main-content.s\\:col-span-8 {
												grid-column: span 12/span 12;
											}
											shreddit-app[routename="frontpage"] .main-container {
												margin-right: 2rem !important;
											}
										}
										@media (min-width: 1200px) {
											shreddit-app[routename="frontpage"] #main-content.m\\:col-span-6 {
												grid-column: span 9/span 9;
											}
											shreddit-app[routename="frontpage"] .main-container {
												margin-right: 1.5rem !important;
											}
										}
										@media (min-width: 1416px) {
											shreddit-app[routename="frontpage"] #main-content.l\\:col-span-9 {
												grid-column: span 13/span 13;
											}
											shreddit-app[routename="frontpage"] .main-container {
												margin-right: 1.5rem !important;
											}
										}
										@media (min-width: 1920px) {
											shreddit-app[routename="frontpage"] #main-content.xl\\:col-span-9 {
												grid-column: span 14/span 14;
											}
											shreddit-app[routename="frontpage"] .main-container {
												margin-right: 1.5rem !important;
											}
										}
									}

									.re-hide-sub-sidebar {
										@media (min-width: 960px) {
											shreddit-app[routename="subreddit"] #main-content {
												grid-column: span 14/span 14 !important;
											}
										}
										@media (min-width: 1200px) {
											shreddit-app[routename="subreddit"] #main-content {
												grid-column: span 14/span 14 !important;
											}
										}
										@media (min-width: 1416px) {
											shreddit-app[routename="subreddit"] #main-content {
												grid-column: span 14/span 14 !important;
											}
										}
										@media (min-width: 1920px) {
											shreddit-app[routename="subreddit"] #main-content {
												grid-column: span 14/span 14 !important;
											}
										}
									}

									.re-hide-post-sidebar {
										@media (min-width: 768px) {
											shreddit-app[routename="post_page"] #main-content > shreddit-post,
											shreddit-app[routename="profile_post_page"] #main-content > shreddit-post {
												margin-right: 1.5rem !important;
											}
											shreddit-app[routename="post_page"] #main-content > [id^="comment-tree-content"],
											shreddit-app[routename="profile_post_page"] #main-content > [id^="comment-tree-content"] {
												margin-right: 2rem !important;
											}
										}
										@media (min-width: 960px) {
											shreddit-app[routename="post_page"] #main-content > shreddit-post,
											shreddit-app[routename="profile_post_page"] #main-content > shreddit-post {
												margin-right: 1.5rem !important;
											}
											shreddit-app[routename="post_page"] #main-content > [id^="comment-tree-content"],
											shreddit-app[routename="profile_post_page"] #main-content > [id^="comment-tree-content"] {
												margin-right: 2rem !important;
											}
										}
										@media (min-width: 1200px) {
											shreddit-app[routename="post_page"] #main-content > shreddit-post,
											shreddit-app[routename="profile_post_page"] #main-content > shreddit-post {
												margin-right: 1rem !important;
											}
											shreddit-app[routename="post_page"] #main-content > [id^="comment-tree-content"],
											shreddit-app[routename="profile_post_page"] #main-content > [id^="comment-tree-content"] {
												margin-right: 1.5rem !important;
											}
										}
										@media (min-width: 1416px) {
											shreddit-app[routename="post_page"] #main-content > shreddit-post,
											shreddit-app[routename="profile_post_page"] #main-content > shreddit-post {
												margin-right: 1rem !important;
											}
											shreddit-app[routename="post_page"] #main-content > [id^="comment-tree-content"],
											shreddit-app[routename="profile_post_page"] #main-content > [id^="comment-tree-content"] {
												margin-right: 1.5rem !important;
											}
										}
										@media (min-width: 1920px) {
											shreddit-app[routename="post_page"] #main-content > shreddit-post,
											shreddit-app[routename="profile_post_page"] #main-content > shreddit-post {
												margin-right: 1rem !important;
											}
											/*shreddit-app[routename="post_page"] #main-content > [bundlename="comment_body_header"] {
												margin-right: 1rem !important;
											}*/
											shreddit-app[routename="post_page"] #main-content > [id^="comment-tree-content"],
											shreddit-app[routename="profile_post_page"] #main-content > [id^="comment-tree-content"] {
												margin-right: 1.5rem !important;
											}
										}
									}

									shreddit-app[routename="post_page"] [bundlename="comment_body_header"] comment-body-header {
										width: calc(100% - 1.5rem);
									}
								}

								body:has(.main-container.flex) {
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
									shreddit-app[routename="popular"] .subgrid-container {
										width: calc(100vw - 272px);
									}
									shreddit-app[routename="frontpage"] .main-container {
										display: grid;
										grid-template-columns: calc(100% - 316px) 316px;
									}
									shreddit-app[routename="subreddit"] .main-container,
									shreddit-app[routename="post_page"] .main-container,
									shreddit-app[routename="comments_page"] .main-container,
									shreddit-app[routename="profile_post_page"] .main-container,
									shreddit-app[routename="profile_overview"] .main-container,
									shreddit-app[routename="profile_posts"] .main-container,
									shreddit-app[routename="profile_comments"] .main-container,
									shreddit-app[routename="profile_saved"] .main-container,
									shreddit-app[routename="profile_hidden"] .main-container,
									shreddit-app[routename="profile_upvoted"] .main-container,
									shreddit-app[routename="profile_downvoted"] .main-container,
									shreddit-app[routename="all"] .main-container,
									shreddit-app[routename="popular"] .main-container {
										display: grid;
										grid-template-columns: auto 316px;
									}
									@media (max-width: 959px) {
										.main-container {
											grid-template-columns: auto !important;
										}
									}
									shreddit-app[routename="frontpage"] #main-content,
									shreddit-app[routename="subreddit"] #main-content,
									shreddit-app[routename="post_page"] #main-content,
									shreddit-app[routename="comments_page"] #main-content,
									shreddit-app[routename="profile_post_page"] #main-content,
									shreddit-app[routename="profile_overview"] #main-content,
									shreddit-app[routename="profile_posts"] #main-content,
									shreddit-app[routename="profile_comments"] #main-content,
									shreddit-app[routename="profile_saved"] #main-content,
									shreddit-app[routename="profile_hidden"] #main-content,
									shreddit-app[routename="profile_upvoted"] #main-content,
									shreddit-app[routename="profile_downvoted"] #main-content,
									shreddit-app[routename="all"] #main-content,
									shreddit-app[routename="popular"] #main-content {
										max-width: calc(100vw - 272px - 316px - 2.5rem);
									}
								}

								html.re-hide-sidemenu body:has(.main-container.flex) {
									shreddit-app[routename="frontpage"] .subgrid-container,
									shreddit-app[routename="subreddit"] .subgrid-container,
									shreddit-app[routename="all"] .subgrid-container,
									shreddit-app[routename="popular"] .subgrid-container {
										width: 100vw;
										margin-right: 3rem;
									}
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
									shreddit-app[routename="popular"] .subgrid-container {
										width: calc(100vw - 2rem);
										padding: 0;
										margin-left: 0;
									}
									shreddit-app[routename="frontpage"] #main-content,
									shreddit-app[routename="subreddit"] #main-content,
									shreddit-app[routename="post_page"] #main-content,
									shreddit-app[routename="comments_page"] #main-content,
									shreddit-app[routename="profile_post_page"] #main-content,
									shreddit-app[routename="profile_overview"] #main-content,
									shreddit-app[routename="profile_posts"] #main-content,
									shreddit-app[routename="profile_comments"] #main-content,
									shreddit-app[routename="profile_saved"] #main-content,
									shreddit-app[routename="profile_hidden"] #main-content,
									shreddit-app[routename="profile_upvoted"] #main-content,
									shreddit-app[routename="profile_downvoted"] #main-content,
									shreddit-app[routename="all"] #main-content,
									shreddit-app[routename="popular"] #main-content {
										max-width: calc(100vw - 316px - 3rem);
									}
								}

								html.re-hide-home-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="frontpage"] #main-content,
									shreddit-app[routename="all"] #main-content,
									shreddit-app[routename="popular"] #main-content {
										max-width: calc(100vw - 272px);
									}
									shreddit-app[routename="frontpage"] .main-container, 
									shreddit-app[routename="all"] .main-container,
									shreddit-app[routename="popular"] .main-container {
										grid-template-columns: 100% !important;
									}
								}
								html.re-hide-sub-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="subreddit"] #main-content {
										max-width: calc(100vw - 272px);
									}
									shreddit-app[routename="subreddit"] .main-container {
										grid-template-columns: 100% !important;
									}
								}
								html.re-hide-post-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="post_page"] #main-content,
									shreddit-app[routename="comments_page"] #main-content,
									shreddit-app[routename="profile_post_page"] #main-content {
										max-width: calc(100vw - 272px);
									}
									shreddit-app[routename="post_page"] .main-container,
									shreddit-app[routename="comments_page"] .main-container,
									shreddit-app[routename="profile_post_page"] .main-container {
										grid-template-columns: 100% !important;
									}
								}
								html.re-hide-profile-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="profile_overview"] #main-content,
									shreddit-app[routename="profile_posts"] #main-content,
									shreddit-app[routename="profile_comments"] #main-content,
									shreddit-app[routename="profile_saved"] #main-content,
									shreddit-app[routename="profile_hidden"] #main-content,
									shreddit-app[routename="profile_upvoted"] #main-content,
									shreddit-app[routename="profile_downvoted"] #main-content {
										max-width: calc(100vw - 272px);
									}
									shreddit-app[routename="profile_overview"] .main-container,
									shreddit-app[routename="profile_posts"] .main-container,
									shreddit-app[routename="profile_comments"] .main-container,
									shreddit-app[routename="profile_saved"] .main-container,
									shreddit-app[routename="profile_hidden"] .main-container,
									shreddit-app[routename="profile_upvoted"] .main-container,
									shreddit-app[routename="profile_downvoted"] .main-container {
										grid-template-columns: 100% !important;
									}
								}
								
								html.re-hide-sidemenu.re-hide-home-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="frontpage"] .subgrid-container,
									shreddit-app[routename="all"] .subgrid-container,
									shreddit-app[routename="popular"] .subgrid-container {
										width: 100vw !important;
										margin-right: 0rem !important;
									}
									shreddit-app[routename="frontpage"] #main-content,
									shreddit-app[routename="all"] #main-content,
									shreddit-app[routename="popular"] #main-content {
										max-width: 100vw;
									}
								}
								html.re-hide-sidemenu.re-hide-sub-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="subreddit"] .subgrid-container {
										width: 100vw !important;
										margin-right: 0rem !important;
									}
									shreddit-app[routename="subreddit"] #main-content {
										max-width: 100vw;
									}
								}
								html.re-hide-sidemenu.re-hide-post-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="post_page"] .subgrid-container,
									shreddit-app[routename="comments_page"] .subgrid-container,
									shreddit-app[routename="profile_post_page"] .subgrid-container {
										width: calc(100vw - 2.5rem) !important;
										margin-right: 0rem !important;
									}
									shreddit-app[routename="post_page"] #main-content,
									shreddit-app[routename="comments_page"] #main-content,
									shreddit-app[routename="profile_post_page"] #main-content {
										max-width: 100vw;
									}
								}
								html.re-hide-sidemenu.re-hide-profile-sidebar body:has(.main-container.flex) {
									shreddit-app[routename="profile_overview"] .subgrid-container,
									shreddit-app[routename="profile_posts"] .subgrid-container,
									shreddit-app[routename="profile_comments"] .subgrid-container,
									shreddit-app[routename="profile_saved"] .subgrid-container,
									shreddit-app[routename="profile_hidden"] .subgrid-container,
									shreddit-app[routename="profile_upvoted"] .subgrid-container,
									shreddit-app[routename="profile_downvoted"] .subgrid-container {
										width: 100vw !important;
										margin-right: 0rem !important;
									}
									shreddit-app[routename="profile_overview"] #main-content,
									shreddit-app[routename="profile_posts"] #main-content,
									shreddit-app[routename="profile_comments"] #main-content,
									shreddit-app[routename="profile_saved"] #main-content,
									shreddit-app[routename="profile_hidden"] #main-content,
									shreddit-app[routename="profile_upvoted"] #main-content,
									shreddit-app[routename="profile_downvoted"] #main-content {
										max-width: 100vw;
									}
								}
								@media (min-width: 960px) {
									.subgrid-container {
										width: 100% !important;
									}
								}`;
	document.head.appendChild(styleElement);
}

// Function - Disable Expand Content - New New
function disableExpandContentNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-expand-feed-layout"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
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
