/* ===== Tweaks - Expand Feed/Post - Feed Centre And Offset ===== */

/* === Triggered On Page Load === */

// Feed Centre
export function loadLayoutCentre() {
	BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
		if (result.layoutCentre) layoutCentre(true);
	});
}

// Feed Offset
export function loadLayoutOffset() {
	BROWSER_API.storage.sync.get(['layoutOffset', 'layoutSubOffset', 'layoutPostOffset', 'layoutUserProfileOffset', 'layoutSearchPageOffset'], function (result) {
		layoutOffset(result.layoutOffset);
		layoutSubOffset(result.layoutSubOffset);
		layoutPostOffset(result.layoutPostOffset);
		layoutUserProfileOffset(result.layoutUserProfileOffset);
		layoutSearchPageOffset(result.layoutSearchPageOffset);
	});
}

/* === Main Function === */
export function layoutCentre(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableLayoutCentreOld();
		} else if (value === false) {
			disableLayoutCentreOld();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			if (useLegacy) {
				enableLayoutCentreNewLegacy();
			} else {
				enableLayoutCentreNew();
			}
		} else if (value === false) {
			if (useLegacy) {
				disableLayoutCentreNewLegacy();
			} else {
				disableLayoutCentreNew();
			}
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Layout Centre - Old
function enableLayoutCentreOld() {
	const link = window.location.href;
	if (link.indexOf('old.reddit.com/r/') <= 0) {
		BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
			if (result.hideHomeSidebar != true) {
				document.querySelector('#re-container').classList.add('re-centre-container-old');
			} else {
				document.querySelector('#re-container').classList.remove('re-centre-container-old');
			}
		});
	} else {
		document.querySelector('#re-container').classList.add('re-centre-container-old');
	}
}

// Function - Disable Layout Centre - Old
function disableLayoutCentreOld() {
	document.querySelector('#re-container').classList.remove('re-centre-container-old');
}

// Function - Enable Layout Centre - New - Legacy
function enableLayoutCentreNewLegacy() {
	const main_elms = document.querySelector('#AppRouter-main-content').childElementCount;
	const link = window.location.href;
	document.querySelector('.re-feed').classList.remove('re-centre-feed-1', 're-centre-feed-2', 're-centre-feed-3');
	if (link.indexOf('reddit.com/user/') >= 0) {
		// user
		BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
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
	} else if (link.indexOf('/comments/') >= 0) {
		// post
		document.querySelector('.re-feed').classList.remove('re-centre-feed-1', 're-centre-feed-2', 're-centre-feed-3');
		BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
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
	} else if (link.indexOf('reddit.com/r/popular') >= 0 || link.indexOf('reddit.com/r/all') >= 0 || link.indexOf('reddit.com/r/') <= 0) {
		// r/all, r/popular, home
		BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
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
	} else if (link.indexOf('reddit.com/r/') >= 0) {
		// sub
		BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
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
}

// Function - Disable Layout Centre - New - Legacy
function disableLayoutCentreNewLegacy() {
	stopObserver();
	document.querySelector('.re-feed').classList.remove('re-centre-feed-1', 're-centre-feed-2', 're-centre-feed-3');
}

// Function - Enable Layout Centre - New
function enableLayoutCentreNew() {
	const link = window.location.href;
	if (link.indexOf('/comments/') >= 0) {
		// post
		BROWSER_API.storage.sync.get(['hidePostSidebar'], function (result) {
			if (result.hidePostSidebar) {
				const dynamicStyleElements = document.querySelectorAll('style[id="re-centre-post-feed"]');
				dynamicStyleElements.forEach((element) => {
					document.head.removeChild(element);
				});
			} else {
				const styleElement = document.createElement('style');
				styleElement.id = 're-centre-post-feed';
				styleElement.textContent = `.ListingLayout-backgroundContainer + div {
												overflow-x: hidden;
											}
											.ListingLayout-backgroundContainer + div:has(.Comment) > :last-child {
												transform: translateX(168px);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
				document.querySelector('#re-centre-post-feed');
				document.querySelector('#re-centre-post-feed');
			}
		});
	} else if (link.indexOf('reddit.com/r/') >= 0) {
		// sub
		BROWSER_API.storage.sync.get(['hideSubSidebar'], function (result) {
			if (result.hideSubSidebar) {
				const dynamicStyleElements = document.querySelectorAll('style[id="re-centre-sub-feed"]');
				dynamicStyleElements.forEach((element) => {
					document.head.removeChild(element);
				});
			} else {
				const styleElement = document.createElement('style');
				styleElement.id = 're-centre-sub-feed';
				styleElement.textContent = `.ListingLayout-backgroundContainer + div {
												overflow-x: hidden;
											}
											.ListingLayout-backgroundContainer + div:has([data-testid="subreddit-sidebar"]) > :last-child {
												transform: translateX(168px);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		});
	} else if (link.indexOf('reddit.com/user/') >= 0) {
		// user
		BROWSER_API.storage.sync.get(['hideUserSidebar'], function (result) {
			if (result.hideUserSidebar) {
				const dynamicStyleElements = document.querySelectorAll('style[id="re-centre-user-feed"]');
				dynamicStyleElements.forEach((element) => {
					document.head.removeChild(element);
				});
			} else {
				const styleElement = document.createElement('style');
				styleElement.id = 're-centre-user-feed';
				styleElement.textContent = `.ListingLayout-backgroundContainer + div {
												overflow-x: hidden;
											}
											.ListingLayout-backgroundContainer + div:has([href="/settings/profile"]) > :last-child {
												transform: translateX(168px);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		});
	} else if (link.indexOf('reddit.com/r/popular') >= 0 || link.indexOf('reddit.com/r/all') >= 0 || link.indexOf('reddit.com/r/') <= 0) {
		// r/all, r/popular, home
		BROWSER_API.storage.sync.get(['hideHomeSidebar'], function (result) {
			if (result.hideHomeSidebar) {
				const dynamicStyleElements = document.querySelectorAll('style[id="re-centre-home-feed"]');
				dynamicStyleElements.forEach((element) => {
					document.head.removeChild(element);
				});
			} else {
				const styleElement = document.createElement('style');
				styleElement.id = 're-centre-home-feed';
				styleElement.textContent = `.ListingLayout-backgroundContainer + div {
												overflow-x: hidden;
											}
											.ListingLayout-backgroundContainer + div:has([data-testid="frontpage-sidebar"]) > :last-child {
												transform: translateX(168px);
											}`;
				document.head.insertBefore(styleElement, document.head.firstChild);
			}
		});
	}
}

// Function - Disable Layout Centre - New
function disableLayoutCentreNew() {
	const dynamicStyleElements1 = document.querySelectorAll('style[id="re-centre-home-feed"]');
	dynamicStyleElements1.forEach((element) => {
		document.head.removeChild(element);
	});
	const dynamicStyleElements2 = document.querySelectorAll('style[id="re-centre-sub-feed"]');
	dynamicStyleElements2.forEach((element) => {
		document.head.removeChild(element);
	});
	const dynamicStyleElements3 = document.querySelectorAll('style[id="re-centre-user-feed"]');
	dynamicStyleElements3.forEach((element) => {
		document.head.removeChild(element);
	});
	const dynamicStyleElements4 = document.querySelectorAll('style[id="re-centre-post-feed"]');
	dynamicStyleElements4.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Watch for sidemenu show/hide and reapply centre
let isObserverRunning = false;

const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'childList') {
			BROWSER_API.storage.sync.get(['layoutCentre'], function (result) {
				layoutCentre(result.layoutCentre);
			});
		}
	});
});

function startObserver() {
	var target = document.getElementById('AppRouter-main-content');
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

function stopObserver() {
	observer.disconnect();
	isObserverRunning = false;
	//console.log('Observer stopped');
}

// Function - Layout Offset
export function layoutOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-offset', value + '%');
	}
}

// Function - Layout Sub Offset
export function layoutSubOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-sub-offset', value + '%');
	}
}

// Function - Layout Post Offset
export function layoutPostOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-post-offset', value + '%');
	}
}

// Function - Layout User Profile Offset
export function layoutUserProfileOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-user-profile-offset', value + '%');
	}
}

// Function - Layout Search Page Offset
export function layoutSearchPageOffset(value) {
	if (redditVersion === 'newnew') {
		document.documentElement.style.setProperty('--re-layout-search-page-offset', value + '%');
	}
}
