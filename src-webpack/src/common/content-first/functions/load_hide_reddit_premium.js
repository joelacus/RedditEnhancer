// Hide Reddit Premium
let loadHideRedditPremium = function() {
	BROWSER_API.storage.sync.get(['hideRedditPremium'], function(result) {
		if (result.hideRedditPremium === true) {
			var link = window.location.href
			var el = document.querySelector(".re-reddit-premium");
			el.classList.add("re-hide");
			if (link.indexOf("old.reddit.com") <= 0) { // new reddit
				el.nextSibling.style.marginTop = "0"
			}
		}
	});
}
export { loadHideRedditPremium };
