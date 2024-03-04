// Remove Page Side Margin

export function removePageSideMargin(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableRemovePageSideMargin();
		} else if (value === false) {
			disableRemovePageSideMargin();
		}
	}
}

// Function - Enable the Page Side Margin - New New
function enableRemovePageSideMargin() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-remove-page-side-margin';
	styleElement.textContent = `shreddit-app .grid-container,
								shreddit-app .sidebar-grid {
									min-width: 100% !important;
									margin: 0 !important;
								}
								shreddit-app[routename="post_page"] #right-sidebar-container,
								shreddit-app[routename="subreddit"] .subgrid-container {
									margin-right: 1.5rem;
								}
								shreddit-app #right-sidebar-container {
									margin-right: 0 !important;
								}
								shreddit-app #right-sidebar-container > faceplate-partial > section {
									border-radius: 0 !important;
								}
								shreddit-app[routename="frontpage"] {
									--page-y-padding: calc(var(--shreddit-header-height) - 4px) !important;
								}
								shreddit-app[routename="subreddit"] {
									--page-y-padding: calc(var(--shreddit-header-height) - 9px) !important;
								}
								shreddit-app[routename="post_page"] {
									--page-y-padding: calc(var(--shreddit-header-height) - 10px) !important;
								}
								shreddit-app[routename^="profile_"] {
									--page-y-padding: calc(var(--shreddit-header-height) - 7px) !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable the Page Side Margin - New New
function disableRemovePageSideMargin() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-remove-page-side-margin"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
