// Hide Reddit Premium
let hideRedditPremium = function(value) {
	var link = window.location.href
	var el = document.querySelector(".re-reddit-premium");
	if (value === true) {
		el.classList.add("re-hide");
		if (link.indexOf("old.reddit.com") <= 0) { // new reddit
			el.nextSibling.style.marginTop = "0"
		}
	} else if (value === false) {
		el.classList.remove("re-hide");
		if (link.indexOf("old.reddit.com") <= 0) { // new reddit
			el.nextSibling.style.marginTop = ""
		}
	}
}
export { hideRedditPremium };
