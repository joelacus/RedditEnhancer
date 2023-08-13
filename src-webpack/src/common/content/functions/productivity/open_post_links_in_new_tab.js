// Open links to post in new tab
let openPostInNewTab = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (link.indexOf('/comments/') <= 0 && link.indexOf('/settings/') <= 0) {
			// not post, not settings
			if (value == true) {
				var links = document.querySelectorAll('.re-feed-container [href*="/comments/"]');
				if (links) {
					links.forEach(function (link) {
						link.classList.add('re-post-link');
						link.removeAttribute('data-click-id');
						link.setAttribute('target', '_blank');
						link.addEventListener('click', function (event) {
							event.stopPropagation();
						});
					});
				}
				observer.observe(document.querySelector('.re-feed-container'), { childList: true, subtree: true });
			} else if (value == false) {
				observer.disconnect();
				var links = document.querySelectorAll('.re-post-link');
				if (links) {
					links.forEach(function (link) {
						link.classList.remove('re-post-link');
						link.setAttribute('data-click-id', 'body');
						link.removeAttribute('target');
					});
				}
			}
		}
	}
};
export { openPostInNewTab };

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'DIV') {
				const links = addedNode.querySelectorAll('[data-click-id="body"][href*="/comments/"]');
				if (links.length >= 1) {
					links.forEach(function (link) {
						link.classList.add('re-post-link');
						link.removeAttribute('data-click-id');
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
