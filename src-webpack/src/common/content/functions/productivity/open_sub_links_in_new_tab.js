// Open links to subreddit in new tab
let openSubInNewTab = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			var links = document.querySelectorAll('[data-click-id="subreddit"]');
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
			observer.observe(document.body, { childList: true, subtree: true });
		} else if (value == false) {
			observer.disconnect();
			var links = document.querySelectorAll('.re-sub-link');
			if (links) {
				links.forEach(function (link) {
					link.classList.remove('re-sub-link');
					link.setAttribute('data-click-id', 'subreddit');
					link.removeAttribute('target');
				});
			}
		}
	}
};
export { openSubInNewTab };

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			if (addedNode.nodeName === 'A') {
				const link = addedNode.querySelector('[data-click-id="subreddit"]');
				if (link) {
					const links = document.querySelectorAll('[data-click-id="subreddit"]');
					links.forEach(function (link) {
						link.classList.add('re-sub-link');
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
