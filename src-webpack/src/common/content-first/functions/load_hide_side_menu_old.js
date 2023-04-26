// Hide Side Menu Old
let loadHideSideMenuOld = function() {
	BROWSER_API.storage.sync.get(['hideSideMenuOld'], function(result) {
		if (result.hideSideMenuOld === true) {
			var el = document.querySelector(".listing-chooser");
			el.classList.add("re-hide");
		}
	});
}
export { loadHideSideMenuOld };
