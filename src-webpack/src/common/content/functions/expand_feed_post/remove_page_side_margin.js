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
								shreddit-app > .grid-container {
									transform: translateY(-2px);
								}
								shreddit-app[routename="subreddit"] .grid-container,
								shreddit-app[routename="post_page"] .sidebar-grid {
									transform: translateY(-7px);
								}
								/*shreddit-app[routename="post_page"] .sidebar-grid {
									position: absolute;
									top: var(--shreddit-header-height);
								}*/`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable the Page Side Margin - New New
function disableRemovePageSideMargin() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-remove-page-side-margin"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
