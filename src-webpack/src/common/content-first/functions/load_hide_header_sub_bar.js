// Hide Header Sub Bar on old.reddit
let loadHideHeaderSubBar = function() {
	BROWSER_API.storage.sync.get(['hideHeaderSubBar'], function(result) {
		if (result.hideHeaderSubBar === true) {
			var link = window.location.href
			var el = document.querySelector("#sr-header-area");
			if (link.indexOf("old.reddit.com/r/") >= 0) {
				el.classList.add("re-hide");
			} else {
				el.classList.add("re-hide");	
			}
		}
	});
}
export { loadHideHeaderSubBar };
