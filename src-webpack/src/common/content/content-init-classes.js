/* ===== Init class names ===== */

// Adds classnames to elements used by the extension.

export function initClassNames2() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") <= 0) { // new reddit
		var container = document.getElementsByClassName('ListingLayout-outerContainer')[0];
		// apply css depending on page type
		if (link.indexOf("/comments/") >= 0) { // post
			//do nothing
		} else if (link.indexOf("/search/") >= 0) { // search
			// remove post classes
			var sidebar = document.querySelector(".re-sidebar");
			if (sidebar) {
				sidebar.classList.remove("re-sidebar");
			}
			var postContainer = document.querySelector(".re-post-container");
			if (postContainer) {
				postContainer.classList.remove("re-post-container");
			}
		} else { // feed
			// remove post classes
			var sidebar = document.querySelector(".re-sidebar");
			if (sidebar) {
				sidebar.classList.remove("re-sidebar");
			}
			var postContainer = document.querySelector(".re-post-container");
			if (postContainer) {
				postContainer.classList.remove("re-post-container");
			}
		}
	}
}
