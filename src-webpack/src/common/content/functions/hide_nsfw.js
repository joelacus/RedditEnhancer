// Hide NSFW Posts
let hideNSFW = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true) {
			// hide any nsfw posts
			document.querySelectorAll('.Post').forEach(function (item) {
				const found = Array.from(item.querySelectorAll('span')).find((el) => el.textContent === 'nsfw');
				if (found != undefined) {
					item.parentNode.parentNode.classList.add('re-hide');
				}
			});
			// start observer
			observer.observe(document.body, { childList: true, subtree: true });
		} else if (value == false) {
			// stop observer
			observer.disconnect();
			// show any nsfw posts
			document.querySelectorAll('.Post').forEach(function (item) {
				const found = Array.from(item.querySelectorAll('span')).find((el) => el.textContent === 'nsfw');
				if (found != undefined) {
					item.parentNode.parentNode.classList.remove('re-hide');
				}
			});
		}
	}
};
export { hideNSFW };

// observe added nodes and hide any nsfw posts
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (addedNode) {
			document.querySelectorAll('.Post').forEach(function (item) {
				const found = Array.from(item.querySelectorAll('span')).find((el) => el.textContent === 'nsfw');
				if (found != undefined) {
					item.parentNode.parentNode.classList.add('re-hide');
				}
			});
		});
	});
});
