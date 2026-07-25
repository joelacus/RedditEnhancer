// ────────────────────────────────────────────────────────────────────────────
// Utility / Send Message
// ────────────────────────────────────────────────────────────────────────────

export async function sendMessage(message) {
	//console.log(message);
	try {
		const tabs = await BROWSER_API.tabs.query({ url: '*://*.reddit.com/*' });
		tabs.forEach((tab) => {
			if (tab.id && !tab.discarded) {
				BROWSER_API.tabs.sendMessage(tab.id, message).catch(() => {});
			}
		});
	} catch (e) {
		// No Reddit tabs open — silent
	}
}
