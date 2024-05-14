/* ===== Tweaks - Hide - Promoted Links ===== */

/* === Triggered On Page Load === */
export function loadHidePromotedPosts() {
	BROWSER_API.storage.sync.get(['hidePromoted'], function (result) {
		hidePromoted(result.hidePromoted);
	});
}

/* === Main Function === */
export function hidePromoted(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHidePromotedPostsOld();
		} else if (value === false) {
			disableHidePromotedPostsAll();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			if (useLegacy) {
				enableHidePromotedPostsNewLegacy();
			} else {
				enableHidePromotedPostsNew();
			}
		} else if (value === false) {
			if (useLegacy) {
				disableHidePromotedPostsNewLegacy();
			} else {
				disableHidePromotedPostsAll();
			}
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHidePromotedPostsNewNew();
		} else if (value === false) {
			disableHidePromotedPostsAll();
		}
	}
}

// Function - Enable Hide Promoted Posts - Old
function enableHidePromotedPostsOld() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-promoted-posts';
	styleElement.textContent = `#siteTable > .thing.promoted {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide Promoted Posts - New - Legacy
function enableHidePromotedPostsNewLegacy() {
	const links = document.querySelectorAll('.re-feed-container .promotedlink');
	if (links) {
		links.forEach(function (link) {
			link.parentNode.parentNode.parentNode.classList.add('re-hide');
		});
	}
	observer.observe(document.body, { childList: true, subtree: true });
}

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName != '#text') {
				const link = addedNode.querySelector('.re-feed-container .promotedlink');
				if (link) {
					var links = document.querySelectorAll('.re-feed-container .promotedlink');
					links.forEach(function (link) {
						link.parentNode.parentNode.parentNode.classList.add('re-hide');
					});
				}
			}
		});
	});
});

// Function - Disable Hide Promoted Posts - New - Legacy
function disableHidePromotedPostsNewLegacy() {
	observer.disconnect();
	const links = document.querySelectorAll('.re-feed-container .promotedlink');
	if (links) {
		links.forEach(function (link) {
			link.parentNode.parentNode.parentNode.classList.remove('re-hide');
		});
	}
}

// Function - Enable Hide Promoted Posts - New
function enableHidePromotedPostsNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-promoted-posts';
	styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child > div > div:has(.promotedlink) {
									display: none !important;
								}
								.ListingLayout-backgroundContainer + div > :last-child > :last-child > :first-child > div:has([data-before-content="advertisement"]) {
									display: none !important;
								}
								.Post.promotedlink {
									display: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide Promoted Posts - New New
function enableHidePromotedPostsNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-promoted-posts';
	styleElement.textContent = `shreddit-ad-post,
								shreddit-comments-page-ad,
								shreddit-sidebar-ad {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Promoted Posts - All
function disableHidePromotedPostsAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-promoted-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
