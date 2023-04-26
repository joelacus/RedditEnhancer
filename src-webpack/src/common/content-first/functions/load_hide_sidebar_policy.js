// Hide Sidebar Policy
let loadHideSidebarPolicy = function() {
	BROWSER_API.storage.sync.get(['hideSidebarPolicy'], function(result) {
		var link = window.location.href
		if (link.indexOf("old.reddit.com") >= 0) { // old reddit
			// do nothing
		} else { // new reddit
			if (result.hideSidebarPolicy == true) {
				document.querySelector('#re-policy').classList.add('re-hide');
			}
		}
	});
}
export { loadHideSidebarPolicy };
