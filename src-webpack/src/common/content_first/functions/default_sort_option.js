/* ===== Default Sort Option ===== */

export function defaultSortOption() {
	const url = new URL(window.location.href);
	if (url.pathname.includes('/comments/') || (url.searchParams.get('type') === 'comments' && /\/search\//.test(url.pathname))) {
		// Set default comments sort option if true
		BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption', 'defaultCommentsSortOption'], function (result) {
			if (result.enableDefaultCommentsSortOption && result.defaultCommentsSortOption !== undefined) {
				const url = new URL(window.location.href);
				const sortTarget = result.defaultCommentsSortOption;
				const sortValue = url.searchParams.get('sort');
				if (typeof sortTarget !== undefined) {
					if (sortValue) {
						if (sortValue !== sortTarget) {
							url.searchParams.set('sort', sortTarget);
							window.location.replace(url.href);
						}
					} else {
						url.searchParams.set('sort', sortTarget);
						window.location.replace(url.href);
					}
				}
			}
		});
	} else {
		// Set default feed sort option if true
		BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption', 'defaultFeedSortOption'], function (result) {
			if (result.enableDefaultFeedSortOption) {
				if (result.defaultFeedSortOption !== undefined) {
					const url = new URL(window.location.href);
					const sortTarget = result.defaultFeedSortOption;
					const lastPath = url.pathname
						.split('/')
						.filter((item) => item !== '')
						.pop();
					if (lastPath) {
						if (!lastPath.includes(sortTarget)) {
							if (url.pathname.includes('/submit') || url.pathname.includes('/wiki') || url.pathname.includes('/rules')) {
								return;
							} else if (url.searchParams.get('type') === 'posts' || /\/search\//.test(url.pathname) || /\/user\/(?!.*\/m\/)/.test(url.pathname)) {
								const sortParam = url.searchParams.get('sort');
								if (sortParam !== sortTarget) {
									url.searchParams.set('sort', sortTarget);
									window.location.replace(url.href);
								}
							} else {
								let newPath;
								if (['hot', 'new', 'top', 'best', 'controversial', 'rising', 'comments', 'relevance'].includes(lastPath)) {
									newPath = [
										...url.pathname
											.split('/')
											.filter((item) => item !== '')
											.slice(0, -1),
										sortTarget,
									].join('/');
									url.pathname = newPath;
									window.location.replace(url.href);
								} else {
									if (url.pathname === '/' || /\/r\/|\/m\//.test(url.pathname)) {
										newPath = [...url.pathname.split('/').filter((item) => item !== ''), sortTarget].join('/');
										url.pathname = newPath;
										window.location.replace(url.href);
									}
								}
							}
						}
					} else {
						url.pathname = sortTarget;
						window.location.replace(url.href);
					}
				}
			}
		});
	}
}
defaultSortOption();
