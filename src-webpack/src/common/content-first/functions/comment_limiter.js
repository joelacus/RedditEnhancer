/* ===== Comment Limiter ===== */

// Limits the number of comments on a post when opened in its own tab/window.

BROWSER_API.storage.sync.get(['commentsLimit'], function(result) {
	console.log(result.commentsLimit)
	if ((result.commentsLimit != null)&&(result.commentsLimit != -10)) {
		// check if the navigation is to a Reddit comments page
		var link = window.location.href
		if (link.match('https://.*.reddit.com/.*\/comments\/.*')) {
			let newLink;
			// check if the URL does not already contain "?limit=50" (50 = set parameter)
			if (!link.includes('?limit='+result.commentsLimit)) {
				// check if the URL has "?limit="
				if (link.includes('?limit=')) {
					if (result.commentsLimit == -10) {
						// remove if parameter disabled
						newLink = link.replace(/(\?|\&)limit=\d+/, '');
						window.location.href = newLink
					} else {
						// replace limiter with set parameter
						newLink = link.replace(/(\?|\&)limit=\d+/, '?limit='+result.commentsLimit);
						window.location.href = newLink
					}
				} else {
					if (result.commentsLimit == -10) {
						// do nothing
					} else {
						// append comment limiter
						newLink = link + '?limit='+result.commentsLimit;
						window.location.href = newLink
					}
				}
			}
		}
	}
});
