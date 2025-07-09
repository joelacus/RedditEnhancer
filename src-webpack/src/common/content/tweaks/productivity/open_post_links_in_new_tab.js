/**
 * Tweaks: Productivity - Open Post In New Tab
 * @name openPostInNewTab
 * @description Set post links to open in a new tab.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadOpenPostInNewTab() {
	BROWSER_API.storage.sync.get(['openPostInNewTab'], function (result) {
		if (result.openPostInNewTab) openPostInNewTab(true);
	});
}

/* === Enable/Disable The Feature === */
export function openPostInNewTab(value) {
	if (redditVersion === 'newnew' && value) {
		if (document.querySelector('shreddit-app shreddit-feed')) {
			const links = document.querySelectorAll('shreddit-post [slot="full-post-link"]');
			if (links) {
				links.forEach(function (link) {
					link.classList.add('re-post-link');
					link.setAttribute('target', '_blank');
					link.addEventListener('click', function (event) {
						event.stopPropagation();
					});
				});
			}
			observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
		}
	} else {
		observer.disconnect();
		const links = document.querySelectorAll('.re-post-link');
		if (links) {
			links.forEach(function (link) {
				link.classList.remove('re-post-link');
				link.setAttribute('target', '_self');
			});
		}
	}
}

// Observe feed for new posts - RV3
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (['TIME', 'ARTICLE', 'DIV'].includes(addedNode.nodeName)) {
				const links = addedNode.querySelectorAll('shreddit-post [slot="full-post-link"]');
				if (links.length >= 1) {
					links.forEach(function (link) {
						link.classList.add('re-post-link');
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
