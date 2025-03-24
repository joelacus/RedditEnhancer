/* ===== Default Sort Option ===== */

export function defaultSortOption() {
	// Don't redirect the page if it has been redirected in the last 20 seconds. (allows for manual override of sort option)
	BROWSER_API.storage.sync.get(['DefaultSortFeedOptionGracePeriod'], function (result) {
		const grace_period = result.DefaultSortFeedOptionGracePeriod ?? 20;
		const now = Date.now();
		const isWithinGracePeriod = now - parseInt(sessionStorage.getItem('lastPageRedirectTime')) <= grace_period * 1000;
		if (isWithinGracePeriod) return;

		sessionStorage.setItem('lastPageRedirectTime', now);

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
			BROWSER_API.storage.sync.get(['enableDefaultFeedSortOption', 'defaultFeedSortOption', 'enableDefaultHomeFeedSortOption', 'defaultHomeFeedSortOption'], function (result) {
				if (isHomePage()) {
					if (result.enableDefaultHomeFeedSortOption) {
						if (result.defaultHomeFeedSortOption !== undefined) {
							const url = new URL(window.location.href);
							var sortTarget = result.defaultHomeFeedSortOption;
							if (sortTarget === 'relevance') {
								sortTarget = 'best';
							}
							if (url.pathname.includes(sortTarget)) {
								return;
							} else {
								url.pathname = sortTarget;
								window.location.replace(url.href);
							}
						}
					}
				} else {
					if (result.enableDefaultFeedSortOption) {
						if (result.defaultFeedSortOption !== undefined) {
							const url = new URL(window.location.href);
							var sortTarget = result.defaultFeedSortOption;
							if (sortTarget === 'relevance') {
								sortTarget = 'best';
							}
							console.log(sortTarget);
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
										if (['hot', 'new', 'top', 'best', 'controversial', 'rising', 'comments'].includes(lastPath)) {
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
				}
			});
		}
	});
}
defaultSortOption();

function isHomePage() {
	let pathname = window.location.pathname;
	if (pathname.length > 1 && pathname.endsWith('/')) {
		pathname = pathname.slice(0, -1);
	}
	if (pathname === '/' || pathname === '') {
		return true;
	}
	if (pathname === '/best' || pathname === '/hot' || pathname === '/new' || pathname === '/top' || pathname === '/rising') {
		return true;
	}
	return false;
}
