// Hide Promoted Links
let hidePromoted = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			var links = document.querySelectorAll('.re-feed-container .promotedlink');
			if (links) {
				links.forEach(function (link) {
					link.parentNode.parentNode.parentNode.classList.add('re-hide');
				});
			}
			observer.observe(document.body, { childList: true, subtree: true });
		} else if (value == false) {
			observer.disconnect();
			var links = document.querySelectorAll('.re-feed-container .promotedlink');
			if (links) {
				links.forEach(function (link) {
					link.parentNode.parentNode.parentNode.classList.remove('re-hide');
				});
			}
		}
	}
};
export { hidePromoted };

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			var link = addedNode.querySelector('.re-feed-container .promotedlink');
			if (link) {
				var links = document.querySelectorAll('.re-feed-container .promotedlink');
				links.forEach(function (link) {
					link.parentNode.parentNode.parentNode.classList.add('re-hide');
				});
			}
		});
	});
});
