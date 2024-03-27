/* ===== Reddit Auto Redirect To Version ===== */

export function autoRedirectVersion() {
	BROWSER_API.storage.sync.get(['autoRedirectVersion'], function (result) {
		if (result.autoRedirectVersion === 'old') {
			checkAndRedirect('old.reddit.com');
		} else if (result.autoRedirectVersion === 'new') {
			checkAndRedirect('new.reddit.com');
		} else if (result.autoRedirectVersion === 'newnew') {
			checkAndRedirect('sh.reddit.com');
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
	const currentQuery = location.search;

	// Stop redirect loop if Reddit forces the latest version.
	// Works on Firefox and Edge. Need Chrome fix.
	if (currentQuery.includes('?rdt=')) {
		return;
	}

	// Redirect these URLs
	const redirectList = [
		'^.*www.reddit.com*',
		'^.*old.reddit.com*',
		'^.*new.reddit.com*',
		'^.*sh.reddit.com*',
		'^.*.reddit.com/r/.*(?:/.*)?$',
		'^.*.reddit.com/r/.*/comments/.*$',
		'^.*.reddit.com/user/.**',
	];

	const redirect = redirectList.some((pattern) => {
		const regex = new RegExp(pattern);
		return regex.test(currentURL);
	});

	// Do not redirect these URLs
	const doNotRedirectList = [
		'reddit.com/settings',
		'/followers/',
		'preview.redd.it',
		'i.redd.it',
		'/gallery/',
		'/about/modqueue',
		'/about/reports',
		'/about/spam',
		'/about/edited',
		'/about/unmoderated',
		'chat.reddit.com',
		'mod.reddit.com',
	];

	const doNotRedirect = doNotRedirectList.some((link) => currentURL.includes(link));

	let newURL;

	if (redirect && !doNotRedirect) {
		// Check if the URL contains the specified version
		if (currentHost !== versionHost) {
			newURL = currentProtocol + '//' + versionHost + currentPath;
			window.location = newURL;
		}
	}
}
