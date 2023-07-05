/* ===== Comment Limiter ===== */

// Limits the number of comments on a post when opened in its own tab/window.

BROWSER_API.storage.sync.get(['commentsLimit'], function (result) {
	if (result.commentsLimit != null && result.commentsLimit != -10) {
		// check if the navigation is to a Reddit comments page
		var link = window.location.href;
		if (link.match('https://.*.reddit.com/.*/comments/.*')) {
			// check if url already has query parameters
			const urlParams = new URLSearchParams(document.location.search);
			if (urlParams.size != 0) {
				const limitValue = urlParams.get('limit');
				if (limitValue != null) {
					if (limitValue != result.commentsLimit) {
						// modify limit parameter
						let urlParams = new URLSearchParams(document.location.search);
						urlParams.set('limit', result.commentsLimit);
						// replace the current URL with the updated one
						window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
						// reload the page
						location.reload();
					}
				} else {
					// append limit parameter
					let urlParams = new URLSearchParams(document.location.search);
					urlParams.append('limit', result.commentsLimit);
					// replace the current URL with the updated one
					window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
					// reload the page
					location.reload();
				}
			} else {
				// append limit parameter
				let urlParams = new URLSearchParams(document.location.search);
				urlParams.append('limit', result.commentsLimit);
				// replace the current URL with the updated one
				window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
				// reload the page
				location.reload();
			}
		}
	}
});
