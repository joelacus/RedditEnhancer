/* ===== Tweaks - Style - Hide Interface Gap ===== */

/* === Triggered On Page Load === */
export function loadHideGap() {
	BROWSER_API.storage.sync.get(['hideGap'], function (result) {
		if (result.hideGap) hideGap(true);
	});
}

/* === Main Function === */
export function hideGap(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHideGapNew();
		} else {
			disableHideGapAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideGapNewNew();
		} else if (value === false) {
			disableHideGapAll();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Hide Gap - New
function enableHideGapNew() {
	if (!document.head.querySelector('style[id="re-hide-ui-gap"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-ui-gap';
		styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child {
										padding: 0 !important;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child > :first-child,
									.ListingLayout-backgroundContainer + div > :last-child > :last-child {
										margin: 0 !important;;  
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child > div:has(#view--layout--FUE) {
										margin: 0 !important;
										border-radius: 0 !important;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :last-child > :first-child > div {
										border-radius: 0 !important;
										margin-top: 0 !important;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :last-child > :first-child > div > div {
										border-radius: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Enable Hide Gap - New New
function enableHideGapNewNew() {
	if (!document.head.querySelector('style[id="re-hide-ui-gap"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-ui-gap';
		styleElement.textContent = `#main-content,
									main.main,
									shreddit-post,
									#right-sidebar-container aside,
									[routename="post_page"] #right-sidebar-container {
										margin-top: 0 !important;
									}
									#main-content,
									main.main {
										max-width: 100% !important;
										margin-left: 0 !important;
									}
									shreddit-post, comment-body-header {
										margin-bottom: 0 !important;
										border-radius: 0 !important;
									}
									shreddit-comment-tree, shreddit-feed > article > shreddit-post {
										border-radius: 0 !important;
									}
									.sidebar-grid {
										grid-gap: 0.5rem !important;
									}
									.gap-md {
										gap: 0 !important;
									}
									shreddit-app[routename="subreddit"],
									shreddit-app[routename="subreddit"] .main-container {
										padding-left: 0 !important;
									}
									shreddit-app[routename="subreddit"] .masthead {
										margin-left: 0 !important;
										margin-right: 0 !important;
									}
									shreddit-app[routename="subreddit"] .community-banner {
										margin-top: 0;
										border-radius: 0;
									}
									#right-sidebar-container {
										margin-top: 3rem !important;
									}
									#right-sidebar-container section {
										margin: 0 !important;
										border-radius: 0 !important;
									}
									#right-sidebar-container > aside > div,
									aside {
										border-radius: 0 !important
									}
									shreddit-app[routename="post_page"] {
										margin-right: calc(0.5rem * var(--re-hide-sidebar-gap-multiplyer)) !important;
									}
									shreddit-app[routename="post_page"] .subgrid-container,
									shreddit-app[routename="profile_post_page"] .subgrid-container {
										padding-left: 0 !important;
									}
									shreddit-app .subgrid-container {
										padding: 0;
									}
									shreddit-app[routename="frontpage"] #main-content,
									shreddit-app[routename="subreddit"] #main-content,
									shreddit-app[routename="post_page"] #main-content,
									shreddit-app[routename="frontpage"] main.main,
									shreddit-app[routename="subreddit"] main.main,
									shreddit-app[routename="post_page"] main.main,
									shreddit-app[routename="profile_overview"] #main-content,
									shreddit-app[routename="profile_overview"] main.main,
									html.re-hide-home-sidebar shreddit-app[routename="frontpage"] #main-content,
									html.re-hide-post-sidebar shreddit-app[routename="post_page"] #main-content,
									html.re-hide-home-sidebar shreddit-app[routename="frontpage"] main.main,
									html.re-hide-post-sidebar shreddit-app[routename="post_page"] main.main,
									html.re-hide-profile-sidebar shreddit-app[routename="profile_overview"] #main-content,
									html.re-hide-profile-sidebar shreddit-app[routename="profile_overview"] main.main {
										max-width: 100% !important;
									}
									.main-container {
										grid-gap: 0 !important;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
	//document.documentElement.style.setProperty('--re-hide-side-menu-gap-multiplyer2', 0);
}

// Function - Disable Hide Gap - All
function disableHideGapAll() {
	//document.documentElement.style.removeProperty('--re-hide-side-menu-gap-multiplyer2');
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-ui-gap"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
