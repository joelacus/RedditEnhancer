/* ===== Reddit Auto Redirect To Version ===== */

function autoRedirectVersion() {
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		let newURL = false;
		if (result.autoRedirectVersion === 'old') {
			newURL = checkAndRedirect('old.reddit.com');
		} else if (result.autoRedirectVersion === 'new') {
			newURL = checkAndRedirect('new.reddit.com');
		} else if (result.autoRedirectVersion === 'newnew') {
			newURL = checkAndRedirect('sh.reddit.com');
		}
		if (newURL) {
			window.location = newURL;
		}
	});
}
autoRedirectVersion();

function checkAndRedirect(versionHost) {
	// Get the current URL
	const currentURL = location.href;
	const currentProtocol = location.protocol;
	const currentHost = location.hostname;
	const currentPath = location.pathname;
	// Declare new URL
	let newURL = null;
	// Ignore certain URLs
	const ignore_list = ['reddit.com/settings', '/followers/', 'preview.redd.it', 'i.redd.it', '/gallery/'];
	const ignore = ignore_list.some((link) => currentURL.includes(link));
	if (!ignore) {
		// Check if the URL contains the specified version
		if (currentHost === versionHost) {
			newURL = false;
		} else {
			// Replace the existing subdomain with the specified version
			newURL = currentProtocol + '//' + versionHost + currentPath;
		}
	}
	return newURL;
}
