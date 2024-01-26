// Hide Interface Gap

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

// Function - Enable Hide Gap - New
function enableHideGapNew() {
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

// Function - Enable Hide Gap - New New
function enableHideGapNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-ui-gap';
	styleElement.textContent = `#main-content, shreddit-post {
									margin-top: 0 !important;
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
									border-radius: 0
								}
								#right-sidebar-container, .grid-container .subgrid-container, 
								shreddit-feed > article > shreddit-post {
									margin: -1px !important;
								}
								#right-sidebar-container section {
									margin: 0 !important;
									border-radius: 0 !important;
								}
								shreddit-app[routename="post_page"] {
									margin-right: calc(0.5rem * var(--re-hide-sidebar-gap-multiplyer)) !important;
									padding-left: calc(0.5rem * var(--re-hide-sidemenu-gap-multiplyer)) !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Gap - All
function disableHideGapAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-ui-gap"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
