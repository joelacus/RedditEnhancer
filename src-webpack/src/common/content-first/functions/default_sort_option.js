/* ===== Default Sort Option ===== */

var link = window.location.href;

export function defaultSortOption() {
	if (link.includes('/comments/')) {
		// Set default comments sort option if true
		BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption', 'defaultCommentsSortOption'], function (result) {
			if (result.enableDefaultCommentsSortOption === true) {
				// Sets the default comments sort option on page load
				if (result.defaultCommentsSortOption != undefined) {
					var urlParams = new URLSearchParams(document.location.search);
					if (urlParams.size != 0) {
						const sortValue = urlParams.get('sort');
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
							urlParams.append('sort', result.defaultCommentsSortOption);
							// replace the current URL with the updated one
							window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
							// reload the page
							location.reload();
						}
					} else {
						// append sort parameter
						urlParams.append('sort', result.defaultCommentsSortOption);
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
		BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption', 'defaultFeedSortOption'], function (result) {
			if (result.enableDefaultFeedSortOption === true) {
				if (result.defaultFeedSortOption != undefined) {
					var link = window.location.href;
					// remove trailing /
					if (link.endsWith('/')) {
						var link = link.slice(0, -1);
					}
					const sort = result.defaultFeedSortOption;
					// if selected sort is not already set
					if (!link.endsWith(sort)) {
						// remove existing sort option
						if (link.endsWith('hot') || link.endsWith('new') || link.endsWith('top')) {
							var link = link.slice(0, -4);
						} else if (link.endsWith('best')) {
							var link = link.slice(0, -5);
						} else if (link.endsWith('controversial')) {
							var link = link.slice(0, -14);
						} else if (link.endsWith('rising')) {
							var link = link.slice(0, -7);
						}

						const regex = /\.com\/r\/[^/]+\/?$/;
						if (link.endsWith('.com') || regex.test(link)) {
							// home and subreddit
							const newLink = link + '/' + sort;
							window.location.href = newLink;
						} else if (link.includes('/user/')) {
							// user
							var urlParams = new URLSearchParams(location.search);
							if (urlParams.size != 0) {
								const sortValue = urlParams.get('sort');
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
									urlParams.append('sort', result.defaultFeedSortOption);
									// replace the current URL with the updated one
									window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
									// reload the page
									location.reload();
								}
							} else {
								console.log('here');
								// append sort parameter
								urlParams.append('sort', result.defaultFeedSortOption);
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
}
defaultSortOption();
