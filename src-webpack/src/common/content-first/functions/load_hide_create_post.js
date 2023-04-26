// Hide Create Post
let loadHideCreatePost = function() {
	BROWSER_API.storage.sync.get(['hideCreatePost'], function(result) {
		var link = window.location.href
		if (link.indexOf("old.reddit.com") >= 0) { // old reddit
			// do nothing
		} else { // new reddit
			if (result.hideCreatePost == true) {
				document.querySelector('.re-create-post').classList.add('re-hide');
			}
		}
	});
}
export { loadHideCreatePost };
