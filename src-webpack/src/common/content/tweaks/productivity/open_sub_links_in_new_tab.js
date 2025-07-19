/**
 * Tweaks: Productivity - Open Subreddits In New Tab
 * @name openSubInNewTab
 * @description Set subreddit links to open in a new tab.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadOpenSubInNewTab() {
	BROWSER_API.storage.sync.get(['openSubInNewTab'], function (result) {
		if (result.openSubInNewTab) openSubInNewTab(true);
	});
}

/* === Enable/Disable The Feature === */
export function openSubInNewTab(value) {
	if (redditVersion === 'newnew' && value) {
		const links = document.querySelectorAll('shreddit-post [data-testid="subreddit-name"]');
		if (links) {
			links.forEach(function (link) {
				link.classList.add('re-sub-link');
				link.removeAttribute('data-click-id');
				link.setAttribute('target', '_blank');
				link.addEventListener('click', function (event) {
					event.stopPropagation();
				});
			});
		}
		if (document.querySelector('shreddit-feed')) {
			observer.observe(document.querySelector('shreddit-feed'), {childList: true, subtree: true});
		}
	} else {
		observer.disconnect();
		const links = document.querySelectorAll('.re-sub-link');
		if (links) {
			links.forEach(function (link) {
				link.classList.remove('re-sub-link');
				link.setAttribute('data-click-id', 'subreddit');
				link.removeAttribute('target');
			});
		}
	}
}

// Observe feed for new posts - RV3
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (['TIME', 'ARTICLE', 'DIV'].includes(addedNode.nodeName)) {
				const links = addedNode.querySelectorAll('shreddit-post [data-testid="subreddit-name"]');
				if (links.length >= 1) {
					links.forEach(function (link) {
						link.classList.add('re-sub-link');
						link.setAttribute('target', '_blank');
						link.addEventListener('click', function (event) {
							event.stopPropagation();
						});
					});
				}
			}
		});
	});
});
