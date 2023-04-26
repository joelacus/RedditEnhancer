import { loadExpandContent } from '../../content-first/functions/load_expand_content'
import { startObserver } from '../../content-first/functions/load_expand_content'
import { stopObserver } from '../../content-first/functions/load_expand_content'

// Expand Layout
let expandLayout = function(value) {
	// Check reddit version
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		if (value == true) {
			const reMain = document.querySelector('#re-main');
			if (!reMain) {
				const main = document.createElement('div');
				main.id = "re-main"
				const container = document.createElement('div');
				container.id = "re-container"
				const body = document.querySelector('body');
				const sidemenu = document.querySelector('.listing-chooser');
				const side = document.querySelector('.side');
				const content = document.querySelector('.content[role="main"]');
				const sort = document.querySelector('#header .tabmenu');
				body.insertBefore(main, side);
				if (sidemenu) {
					main.append(sidemenu);	
				}
				container.append(content);
				container.append(side);
				main.append(container);
				content.insertBefore(sort, content.firstChild);
			}
			if (document.querySelector('#re-container')) {
				document.querySelector('#re-container').classList.add('re-resize');
			}
		} else if (value == false) {
			if (document.querySelector('#re-container')) {
				document.querySelector('#re-container').classList.remove('re-resize');
			}
		}
	} else { // new reddit
		if (value == true) {
			if (document.querySelector('.re-feed')) {
				document.querySelector('.re-feed').classList.add('re-resize');
			}
			if (document.querySelector('.re-search')) {
				document.querySelector('.re-search').classList.add('re-resize');
			}
			if (document.querySelector('.re-search-parent')) {
				document.querySelector('.re-search-parent').classList.add('re-resize');
			}
			if (document.querySelector('.re-post-container')) {
				document.querySelector('.re-post-container').classList.add('re-resize');
			}
		} else if (value == false) {
			if (document.querySelector('.re-feed')) {
				document.querySelector('.re-feed').classList.remove('re-resize');
			}
			if (document.querySelector('.re-search')) {
				document.querySelector('.re-search').classList.remove('re-resize');
			}
			if (document.querySelector('.re-search-parent')) {
				document.querySelector('.re-search-parent').classList.remove('re-resize');
			}
			if (document.querySelector('.re-post-container')) {
				document.querySelector('.re-post-container').classList.remove('re-resize');
			}
		}
	}
};
export { expandLayout };


// Expand Layout Width
let expandLayoutWidth = function(value) {
	document.documentElement.style.setProperty('--re-content-width', value+'%');
};
export { expandLayoutWidth };


// Layout Centre
let layoutCentre = function(value) {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) {// old reddit
		if (value == true) {
			if (link.indexOf("old.reddit.com/r/") <= 0) {
				BROWSER_API.storage.sync.get(['hideHomeSidebar'], function(result) {
					if (result.hideHomeSidebar != true) {
						document.querySelector('#re-container').classList.add('re-centre-container-old');
					} else {
						document.querySelector('#re-container').classList.remove('re-centre-container-old');
					}
				});
			} else {
				document.querySelector('#re-container').classList.add('re-centre-container-old');
			}
		} else if (value == false) {
			document.querySelector('#re-container').classList.remove('re-centre-container-old');
		}
	} else { //new reddit
		var main_elms = document.querySelector("#AppRouter-main-content").childElementCount;
		if (value == true) {
			var link = window.location.href
			if (link.indexOf("/comments/") <= 0) { //home and sub
				document.querySelector('.re-feed').classList.remove('re-centre-feed-1','re-centre-feed-2','re-centre-feed-3');
				if ((link.indexOf("reddit.com/r/all") >= 0)||(link.indexOf("reddit.com/r/popular") >= 0)||(link.indexOf("reddit.com/r/") <= 0)) { // r/all, popular and home
					BROWSER_API.storage.sync.get(['hideHomeSidebar'], function(result) {
						if (main_elms == 2) {
							if (result.hideHomeSidebar === true) {
								document.querySelector('.re-feed').classList.add('re-centre-feed-3');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							}
						} else {
							if (result.hideHomeSidebar === true) {
								//document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-1');
							}
						}
					});
				} else { // sub
					BROWSER_API.storage.sync.get(['hideSubSidebar'], function(result) {
						if (main_elms == 2) {
							if (result.hideSubSidebar === true) {
								document.querySelector('.re-feed').classList.add('re-centre-feed-3');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							}
						} else {
							if (result.hideSubSidebar === true) {
								//document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-1');
							}
						}
					});
				}
			} else { // post
				if (!document.querySelector('#overlayScrollContainer')) {
					document.querySelector('.re-feed').classList.remove('re-centre-feed-1','re-centre-feed-2','re-centre-feed-3');
					if (main_elms == 2) {
						document.querySelector('.re-feed').classList.add('re-centre-feed-2');
					} else {
						document.querySelector('.re-feed').classList.add('re-centre-feed-1');
					}
				}
			}
			startObserver();
		} else if (value == false) {
			stopObserver();
			document.querySelector('.re-feed').classList.remove('re-centre-feed-1','re-centre-feed-2','re-centre-feed-3');
		}
	}
};
export { layoutCentre };
