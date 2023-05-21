// Expand Card View
export function loadExpandContent(){
	BROWSER_API.storage.sync.get(['expandLayout','expandLayoutWidth'], function(result) {
		// Resize content frames if true
		if (result.expandLayout == true) {
			// Check reddit version
			var link = window.location.href
			if (link.indexOf("old.reddit.com") >= 0) { // old reddit
				// Restructure HTML
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
			

				// Apply resize
				if (result.expandLayout == true) {
					if (document.querySelector('#re-container')) {
						document.querySelector('#re-container').classList.add('re-resize');
					}
				} else if (result.expandLayout == false) {
					if (document.querySelector('#re-container')) {
						document.querySelector('#re-container').classList.remove('re-resize');
					}
				}

				// Apply prefix/suffix to vars
				if (result.expandLayoutWidth != undefined) {
					var value = result.expandLayoutWidth+"%"
				} else {
					var value = "80%"
				}

				// Set css root variable
				document.documentElement.style.setProperty('--re-content-width', value);
			} else { // new reddit
				// Apply class
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

				// Apply prefix/suffix to vars
				if (result.expandLayoutWidth != undefined) {
					var value = result.expandLayoutWidth+"%"
				} else {
					var value = "80%"
				}

				// Set css root variable
				document.documentElement.style.setProperty('--re-content-width', value);

				// Remove 1600px max in-line width style from feed
				document.querySelector('.re-feed.re-resize').style = ""
			}
		} else if (result.expandLayout == false) {
			document.documentElement.style.setProperty('--re-content-width', result.expandLayoutWidth+"%");
		}
		if (result.expandLayoutWidth == undefined) {
			// Set css root variable
			document.documentElement.style.setProperty('--re-content-width', "80%");
		}
	});
}


// Layout Centre
let loadLayoutCentre = function() {
	BROWSER_API.storage.sync.get(['layoutCentre'], function(result) {
		var link = window.location.href
		if (link.indexOf("old.reddit.com") >= 0) {// old reddit
			if (result.layoutCentre == true) {
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
			} else if (result.layoutCentre == false) {
				document.querySelector('#re-container').classList.remove('re-centre-container-old');
			}
		} else { //new reddit
			var main_elms = document.querySelector("#AppRouter-main-content").childElementCount;
			if (result.layoutCentre == true) {
				var link = window.location.href
				document.querySelector('.re-feed').classList.remove('re-centre-feed-1','re-centre-feed-2','re-centre-feed-3');
				if (link.indexOf("reddit.com/user/") >= 0) { // user
					BROWSER_API.storage.sync.get(['hideUserSidebar'], function(result) {
						if (main_elms == 2) {
							if (result.hideUserSidebar === true) {
								document.querySelector('.re-feed').classList.add('re-centre-feed-3');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							}
						} else {
							if (result.hideUserSidebar === true) {
								//
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-1');
							}
						}
					});
				} else if (link.indexOf("/comments/") >= 0) { // post
					document.querySelector('.re-feed').classList.remove('re-centre-feed-1','re-centre-feed-2','re-centre-feed-3');
					BROWSER_API.storage.sync.get(['hidePostSidebar'], function(result) {
						if (main_elms == 2) {
							if (result.hidePostSidebar === true) {
								document.querySelector('.re-feed').classList.add('re-centre-feed-3');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							}
						} else {
							if (result.hidePostSidebar === true) {
								//
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-1');
							}
						}
					});
				} else if ((link.indexOf("reddit.com/r/popular") >= 0)||(link.indexOf("reddit.com/r/all") >= 0)||(link.indexOf("reddit.com/r/") <= 0)) { // r/all, r/popular, home
					BROWSER_API.storage.sync.get(['hideHomeSidebar'], function(result) {
						if (main_elms == 2) {
							if (result.hideHomeSidebar === true) {
								document.querySelector('.re-feed').classList.add('re-centre-feed-3');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							}
						} else {
							if (result.hideHomeSidebar === true) {
								//
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-1');
							}
						}
					});
				} else if (link.indexOf("reddit.com/r/") >= 0) { // sub
					BROWSER_API.storage.sync.get(['hideSubSidebar'], function(result) {
						if (main_elms == 2) {
							if (result.hideSubSidebar === true) {
								document.querySelector('.re-feed').classList.add('re-centre-feed-3');
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-2');
							}
						} else {
							if (result.hideSubSidebar === true) {
								//
							} else {
								document.querySelector('.re-feed').classList.add('re-centre-feed-1');
							}
						}
					});
				}
				startObserver();
			} else if (result.layoutCentre == false) {
				stopObserver();
				document.querySelector('.re-feed').classList.remove('re-centre-feed-1','re-centre-feed-2','re-centre-feed-3');
			}
		}
	});
}
export { loadLayoutCentre };


// Watch for sidemenu show/hide and reapply centre
let isObserverRunning = false;

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === "childList") {
			loadLayoutCentre();
		}
	});
});

export function startObserver() {
	var target = document.getElementById("AppRouter-main-content");
	if (target) {
		if (isObserverRunning === true) {
			//console.log('Observer is already running');
			return;
		} else if (isObserverRunning === false) {
			observer.observe(target, { childList: true });
			isObserverRunning = true;
			//console.log('Observer started');
		}
	} else {
		const checkIfTargetIsLoaded = setInterval(function () {
			if (document.body.contains(target)) {
				clearInterval(checkIfTargetIsLoaded);
				startObserver();
			}
		}, 1000);
	}
}

export function stopObserver() {
	observer.disconnect();
	isObserverRunning = false;
	//console.log('Observer stopped');
}
