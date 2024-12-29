/* === Send Message === */

export function sendMessage(message) {
	//console.log(message);
	BROWSER_API.tabs.query({}, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url && tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, message);
			}
		});
	});
}
