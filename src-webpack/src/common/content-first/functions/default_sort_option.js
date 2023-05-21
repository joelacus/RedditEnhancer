/* ===== Default Sort Option ===== */


var link = window.location.href;
if (link.includes('/comments/')) {
	// Set default comments sort option if true
	BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption','defaultCommentsSortOption'], function(result) {
		if (result.enableDefaultCommentsSortOption === true) {
			// Sets the default comments sort option on page load
			if (typeof result.defaultCommentsSortOption != undefined) {
				var link = window.location.href;
				var urlParams = new URLSearchParams(document.location.search);
				if (urlParams.size != 0) {
					const sortValue = urlParams.get("sort");
					if (sortValue != null) {
						if (sortValue != result.defaultCommentsSortOption) {
							// modify sort parameter
							urlParams.set('sort', result.defaultCommentsSortOption);
							// replace the current URL with the updated one
							window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
							// reload the page
							location.reload();
						}
					} else {
						// append sort parameter
						urlParams.append("sort", result.defaultCommentsSortOption);
						// replace the current URL with the updated one
						window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
						// reload the page
						location.reload();
					}
				} else {
					// append sort parameter
					urlParams.append("sort", result.defaultCommentsSortOption);
					// replace the current URL with the updated one
					window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
					// reload the page
					location.reload();
				}
			}
		}
	});
} else {
	// Set default feed sort option if true
	BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption','defaultFeedSortOption'], function(result) {
		if (result.enableDefaultFeedSortOption === true) {
			if (typeof result.defaultFeedSortOption != null) {
				var link = window.location.href;
				// remove trailing /
				if (link.endsWith('/')) {
					var link = link.slice(0, -1);
				}
				var sort = result.defaultFeedSortOption;
				if ((link.endsWith('hot'))||(link.endsWith('new'))||(link.endsWith('top'))||(link.endsWith('controversial'))||(link.endsWith('rising'))) {
					// do nothing
				} else {
					const regex = /\.com\/r\/[^/]+\/?$/;
					if ((link.endsWith('.com'))||(regex.test(link))) { // home and subreddit
						const newLink = link+'/'+sort;
						window.location.href = newLink
					} else if (link.includes('/user/')) { // user
						var urlParams = new URLSearchParams(location.search);
						if (urlParams.size != 0) {
							const sortValue = urlParams.get("sort");
							if (sortValue != null) {
								if (sortValue != result.defaultFeedSortOption) {
									// modify sort parameter
									urlParams.set('sort', result.defaultFeedSortOption);
									// replace the current URL with the updated one
									window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
									// reload the page
									location.reload();
								}
							} else {
								// append sort parameter
								urlParams.append("sort", result.defaultFeedSortOption);
								// replace the current URL with the updated one
								window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
								// reload the page
								location.reload();
							}
						} else {
							// append sort parameter
							urlParams.append("sort", result.defaultFeedSortOption);
							// replace the current URL with the updated one
							window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
							// reload the page
							location.reload();
						}
					}
				}
			}
		}
	});
}
