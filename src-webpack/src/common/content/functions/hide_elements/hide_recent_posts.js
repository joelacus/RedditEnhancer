/* ===== Tweaks - Hide - Recent Posts ===== */

/* === Triggered On Page Load === */
export function loadHideRecentPosts() {
	BROWSER_API.storage.sync.get(['hideRecentPosts'], function (result) {
		hideRecentPosts(result.hideRecentPosts);
	});
}

/* === Main Function === */
export function hideRecentPosts(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideRecentPosts();
		} else if (value === false) {
			disableHideRecentPosts();
		}
	}
}

// Function - Enable Hide Recent Posts - New New
function enableHideRecentPosts() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-recent-posts';
	styleElement.textContent = `recent-posts {
                                    display: none !important;
                                }`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide Recent Posts - New New
function disableHideRecentPosts() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-recent-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
