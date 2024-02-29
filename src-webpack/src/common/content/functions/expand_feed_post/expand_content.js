// Expand Feed Layout

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
			disbleExpandContentNewNew();
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
								.re-feed > div {
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
	styleElement.textContent = `@media (min-width: 1920px) {
									shreddit-app[routename="frontpage"] .subgrid-container.xl\\:col-start-5 {
										grid-column-start: 4;
									}
									shreddit-app[routename="frontpage"] #main-content.xl\\:col-span-9 {
										grid-column: span 14/span 14;
									}
									shreddit-app[routename="frontpage"] .main-container {
										margin-right: 1.5rem !important;
									}
									shreddit-app[routename="subreddit"] .subgrid-container.xl\\:col-start-5 {
										grid-column-start: 4;
									}
									shreddit-app[routename="subreddit"] #main-content.xl\\:col-span-9 {
										grid-column: span 10/span 10;
									}
									shreddit-app[routename="post_page"] #main-content.xl\\:col-start-5 {
										grid-column-start: 4;
									}
									shreddit-app[routename="post_page"] #main-content.xl\\:col-end-14 {
										grid-column-end: 15;
									}
									shreddit-app[routename="profile_overview"] #main-content.xl\:col-start-5 {
										grid-column-start: 4;
									}
									shreddit-app[routename="profile_overview"] #main-content.xl\:col-end-14 {
										grid-column-end: 15;
									}
								}

								shreddit-app[routename="frontpage"] #main-content {
									width: var(--re-content-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="subreddit"] #main-content {
									width: var(--re-sub-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="post_page"] #main-content {
									width: var(--re-post-width) !important;
									justify-self: center;
								}
								shreddit-app[routename="profile_overview"] #main-content {
									width: var(--re-user-profile-width) !important;
									justify-self: center;
								}`;
	document.head.appendChild(styleElement);
}

// Function - Disable Expand Content - New New
function disbleExpandContentNewNew() {
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
