/* ===== Default Sort Option ===== */

export function defaultSortOption() {
	const url = new URL(window.location.href);
	if (url.pathname.includes('/comments/')) {
		// Set default comments sort option if true
		BROWSER_API.storage.sync.get(['enableDefaultCommentsSortOption', 'defaultCommentsSortOption'], function (result) {
			if (result.enableDefaultCommentsSortOption) {
				if (result.defaultCommentsSortOption != undefined) {
					const url = new URL(window.location.href);
					const sortTarget = result.defaultCommentsSortOption;
					const sortValue = url.searchParams.get('sort');
					if (typeof sortTarget != undefined) {
						if (sortValue) {
							if (sortValue != sortTarget) {
								url.searchParams.set('sort', sortTarget);
								window.location.href = url.href;
							}
						} else {
							url.searchParams.set('sort', sortTarget);
							window.location.href = url.href;
						}
					}
				}
			}
		});
	} else {
		// Set default feed sort option if true
		BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption', 'defaultFeedSortOption'], function (result) {
			if (result.enableDefaultFeedSortOption) {
				if (result.defaultFeedSortOption != undefined) {
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
							} else if (url.pathname.includes('/user/')) {
								const sortParam = url.searchParams.get('sort');
								if (sortParam != sortTarget) {
									url.searchParams.set('sort', sortTarget);
									window.location.href = url.href;
								}
							} else {
								let newPath;
								if (['hot', 'new', 'top', 'best', 'controversial', 'rising'].includes(lastPath)) {
									newPath = [
										...url.pathname
											.split('/')
											.filter((item) => item !== '')
											.slice(0, -1),
										sortTarget,
									].join('/');
									url.pathname = newPath;
									window.location.href = url.href;
								} else {
									if (url.pathname === '/' || url.pathname.includes('/r/')) {
										newPath = [...url.pathname.split('/').filter((item) => item !== ''), sortTarget].join('/');
										url.pathname = newPath;
										window.location.href = url.href;
									}
								}
							}
						}
					} else {
						url.pathname = sortTarget;
						window.location.href = url.href;
					}
				}
			}
		});
	}
}
defaultSortOption();
