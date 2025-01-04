/**
 * @function sendMessage
 * @description Send a message to all active Reddit tabs.
 * 
 * @param {Object} message - the message to send.
 */

export function sendMessage(message) {
	BROWSER_API.tabs.query({}, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url && tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, message);
			}
		});
	});
}
