/* ===== Init class names ===== */

// Adds classnames to elements used by the extension, and applies certain tweaks as the page is loading.

import { loadHideCreatePost } from './load_hide_create_post'
import { loadHideGap } from './load_hide_gap'
import { loadHideRedditPremium } from './load_hide_reddit_premium'
import { loadExpandContent } from './load_expand_content'
import { loadHideHomeSidebar } from './load_hide_sidebar'
import { loadHideSubSidebar } from './load_hide_sidebar'
import { loadHidePostSidebar } from './load_hide_sidebar'
import { loadHideUserSidebar } from './load_hide_sidebar'
import { loadHideCoinButton } from './load_hide_header_buttons'
import { loadHidePopularButton } from './load_hide_header_buttons'
import { loadHideHappeningNowButton } from './load_hide_header_buttons'
import { loadHideModerationButton } from './load_hide_header_buttons'
import { loadHideChatButton } from './load_hide_header_buttons'
import { loadHideAdvertiseButton } from './load_hide_header_buttons'
import { loadShowToTopButton } from './load_hide_header_buttons'
import { loadHideNotificationButton } from './load_hide_header_buttons'
import { loadHideCreatePostButton } from './load_hide_header_buttons'
import { loadDropShadow } from './load_drop_shadow'
import { loadStickySort } from './load_sticky_sort'
import { loadLayoutCentre } from './load_expand_content'
import { loadHideSidebarPolicy} from './load_hide_sidebar_policy'
import { loadHideHeaderSubBar} from './load_hide_header_sub_bar'
import { loadHideSideMenuOld } from './load_hide_side_menu_old'


// Add class names to elements
export function initClassNames() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") <= 0) { // new reddit
		if (link.indexOf("/user/") >= 0) { // user
			observerUserSidebar();
			observerUserFeedContainerAndFeed();
			observerUserSort();
			observerID();
			observerHeaderButtons();
		} else if (link.indexOf("/comments/") >= 0) { // post
			observerFeedConainter();
			observerPostSidebar();
			observerPostConainter();
			observerID();
			observerHeaderButtons();
		} else if (link.indexOf("/search/") >= 0) { // search
			observerSearchContainer();
			observerSearchSidebar();
			observerID();
			observerHeaderButtons();
		} else { // feed/sub
			observerFeedContainerAndFeed();
			observerSidebar();
			observerCreatePost();
			observerSort();
			observerRedditPremium();
			observerID();
			observerHeaderButtons();
			observerPolicy();
		}
	} else { // old reddit
		observerBody();
		observerRedditPremium();
		observerID();
		observerSidebarOld();
		observerMainOld();
		observerHeaderSubBar();
		observerSideMenuOld();
		observerStickySort();
	}
}


// Observer
function waitForAddedNode(params) {
	// If element already exists
	const targetNode = document.querySelector(params.query);

	if (targetNode) {
		params.done(targetNode);
	return;
	}

	// If not, wait for it to load
	let timer;

	const observer = new MutationObserver(function(mutations) {
		const el = document.querySelector(params.query);
		if (el) {
			clearTimeout(timer); // cancel the timeout if the element is found
			this.disconnect();
			params.done(el);
		}
	});

	observer.observe(params.parent || document, {
		subtree: !!params.recursive || !params.parent,
		childList: true,
	});

	timer = setTimeout(function() {
		observer.disconnect(); // timeout
	}, 5000);
}


/* ===== Post ===== */

// Feed Container
function observerFeedConainter() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			if (el.childElementCount === 4) {
				el.lastChild.classList.add('re-feed');
			} else {
				setTimeout(function() {
					if (el.childElementCount === 4) {
						el.lastChild.classList.add('re-feed');
					} else {
						setTimeout(function() {
							if (el.childElementCount === 4) {
								el.lastChild.classList.add('re-feed');
							}
						}, 3000);
					}
				}, 2000);
			}
		}
	});
}


// Sidebar
function observerPostSidebar() {
	waitForAddedNode({
		query: '.re-feed [data-redditstyle="true"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			if (!el.parentNode.parentNode.classList.contains('re-sidebar')) {
				el.parentNode.parentNode.classList.add('re-sidebar', 're-sidebar-post');
				loadHideGap();
				loadDropShadow();
				loadHidePostSidebar();
			}
		}
	});
}


// Post Container
function observerPostConainter() {
	waitForAddedNode({
		query: '.re-feed [data-testid="post-container"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.parentNode.classList.add('re-post-container');
			loadExpandContent();
			loadLayoutCentre();
		}
	});
}



/* ===== Search ===== */

// Search Container
function observerSearchContainer() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.lastChild.lastChild.classList.add('re-search-parent');
			el.lastChild.lastChild.lastChild.classList.add('re-search');
			el.lastChild.lastChild.lastChild.lastChild.firstChild.classList.add('re-post-container');
			document.querySelector('[data-testid="posts-list"]').firstChild.classList.add("re-posts-list");
			document.querySelector('[data-testid="search-results-nav"]').classList.add("re-search-results-nav");
			document.querySelector('[data-testid="search-results-subnav"]').classList.add("re-search-results-subnav");
			loadExpandContent();
			loadLayoutCentre();
		}
	});
}


// Search Sidebar
function observerSearchSidebar() {
	waitForAddedNode({
		query: '[data-testid="search-results-sidebar"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.classList.add('re-sidebar');
			el.parentNode.classList.add('re-search-sidebar');
			loadDropShadow();
		}
	});
}



/* ===== Home ===== */

// Feed Container And Feed
function observerFeedContainerAndFeed() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer [data-scroller-first=""]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			if (el.querySelector('#TrendingPostsContainer')) {
				var el = document.querySelectorAll('.ListingLayout-outerContainer [data-scroller-first=""]')[1];
				el.parentNode.classList.add('re-feed-container');
			} else {
				el.parentNode.classList.add('re-feed-container');
				document.querySelector('.ListingLayout-outerContainer').lastChild.lastChild.classList.add('re-feed');
			}
			loadExpandContent();
			loadLayoutCentre();
			loadHideGap();
			loadDropShadow();
		}
	});
}


// Sidebar
function observerSidebar() {
	// Sidebar Home
	waitForAddedNode({
		query: '[data-testid="frontpage-sidebar"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.classList.add('re-sidebar', 're-sidebar-home');
			loadHideHomeSidebar();
		}
	});
	// Sidebar Subreddit
	waitForAddedNode({
		query: '[data-testid="subreddit-sidebar"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.classList.add('re-sidebar', 're-sidebar-sub');
			loadHideSubSidebar();
		}
	});
}

// Policy
function observerPolicy() {
	waitForAddedNode({
		query: '.re-sidebar [href="https://www.redditinc.com/policies/user-agreement"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.parentNode.parentNode.parentNode.parentNode.parentNode.id = 're-policy'
			loadHideSidebarPolicy();
		}
	});
}


// CreatePost
function observerCreatePost() {
	waitForAddedNode({
		query: '[name="createPost"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.parentNode.classList.add('re-create-post');
			loadHideCreatePost();
			if (el.parentNode.previousElementSibling != null) {
				el.parentNode.previousElementSibling.classList.add('re-live');
			}
		}
	});
}


// Sort
function observerSort() {
	waitForAddedNode({
		query: '#view--layout--FUE',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.parentNode.classList.add('re-sort');
			loadStickySort();
		}
	});
}


// Reddit Premium Banner
function observerRedditPremium() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		waitForAddedNode({
			query: '.premium-banner-outer',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.classList.add("re-reddit-premium");
				loadHideRedditPremium();
			}
		});
	} else { // new reddit
		waitForAddedNode({
			query: '.re-sidebar .icon-premium_fill',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("re-reddit-premium");
				loadHideRedditPremium();
			}
		});
	}
}


// Username and Karma
function observerID() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") >= 0) { // old reddit
		waitForAddedNode({
			query: '#header-bottom-right',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.querySelector('.user').querySelector('a').classList.add("re-username");
				el.querySelector('.user').querySelector('span').classList.add("re-karma");
			}
		});
	} else {
		waitForAddedNode({
			query: '#email-collection-tooltip-id',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.lastChild.firstChild.classList.add('re-username');
				el.lastChild.lastChild.classList.add('re-karma');
			}
		});
		waitForAddedNode({
			query: '#USER_DROPDOWN_ID',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.classList.add('re-user-menu');
				el.classList.add('re-user-menu');
			}
		});
	}
}


// Top Bar Buttons
function observerHeaderButtons() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com") <= 0) { // new reddit
		// Coin
		waitForAddedNode({
			query: '#COIN_PURCHASE_DROPDOWN_ID',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.classList.add('re-coin-button');
				loadHideCoinButton();
			}
		});
		// Popular
		waitForAddedNode({
			query: '.icon-popular',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.parentNode.id = 're-header-buttons'
				el.parentNode.classList.add('re-popular-button');
				loadHidePopularButton();
			}
		});
		// Happening Now
		waitForAddedNode({
			query: '#COIN_PURCHASE_DROPDOWN_ID',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				if (el.parentNode.nextSibling){
					el.parentNode.nextSibling.classList.add('re-happening-now-button');
					loadHideHappeningNowButton();
				}
			}
		});
		// Moderation
		waitForAddedNode({
			query: '#Header--Moderation',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.classList.add('re-moderation-button');
				loadHideModerationButton();
			}
		});
		// Chat
		waitForAddedNode({
			query: '#change-username-tooltip-id .icon-chat',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.parentNode.classList.add('re-chat-button');
				loadHideChatButton();
			}
		});
		// Advertise
		waitForAddedNode({
			query: '#change-username-tooltip-id .icon-topic_activism',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.parentNode.classList.add('re-advertise-button');
				loadHideAdvertiseButton();
				setTimeout(function(){
					if (!el.parentNode.parentNode.classList.contains('re-advertise-button')) {
						el.parentNode.parentNode.classList.add('re-advertise-button');
						loadHideAdvertiseButton();
					}
				}, 3000);
			}
		});
		// Create Post
		waitForAddedNode({
			query: '#change-username-tooltip-id .icon-add',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.parentNode.classList.add('re-create-post-button');
				loadHideCreatePostButton();
			}
		});
		// Notifications
		waitForAddedNode({
			query: '#change-username-tooltip-id .icon-notification',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				el.parentNode.parentNode.classList.add('re-notification-button');
				loadHideNotificationButton();
			}
		});
	}
}


/* ===== User ===== */

// Sort
function observerUserSort() {
	waitForAddedNode({
		query: '.re-feed .icon-new_fill',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.parentNode.parentNode.parentNode.classList.add('re-sort');
			loadStickySort();
		}
	});
}


// Sidebar User
function observerUserSidebar() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer [style="margin-left:24px;margin-top:0"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.classList.add('re-sidebar', 're-sidebar-user');
			loadHideUserSidebar();
		}
	});
	waitForAddedNode({
		query: '.ListingLayout-outerContainer [style="margin-left: 24px; margin-top: 0px;"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.classList.add('re-sidebar', 're-sidebar-user');
			loadHideUserSidebar();
		}
	});
}


// Feed Container And Feed
function observerUserFeedContainerAndFeed() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer div[data-scroller-first=""]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			el.parentElement.classList.add('re-feed-container');
			el.parentElement.parentElement.parentElement.classList.add('re-feed');
			loadExpandContent();
			loadLayoutCentre();
			loadHideGap();
			loadDropShadow();
		}
	});
}



/* ===== Popular ===== */
// Feed Container
function observerFeedConainterPopular() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			if (el.childElementCount === 4) {
				el.lastChild.classList.add('re-feed');
			} else {
				setTimeout(function() {
					if (el.childElementCount === 4) {
						el.lastChild.classList.add('re-feed');
					} else {
						setTimeout(function() {
							if (el.childElementCount === 4) {
								el.lastChild.classList.add('re-feed');
							}
						}, 3000);
					}
				}, 2000);
			}
		}
	});
}



/* ===== Old Reddit ===== */

// Sidebar
function observerSidebarOld() {
	waitForAddedNode({
		query: '.side',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			loadHideHomeSidebar();
		}
	});
}

// Main Content
function observerMainOld() {
	waitForAddedNode({
		query: '#siteTable',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			loadExpandContent();
			loadLayoutCentre();
		}
	});
}

// Header Sub Bar
function observerHeaderSubBar() {
	waitForAddedNode({
		query: '#sr-header-area',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			loadHideHeaderSubBar();
		}
	});
}

// Body
function observerBody() {
	waitForAddedNode({
		query: 'body',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			BROWSER_API.storage.sync.get(['moderniseOldReddit'], function(result) {
				if (result.moderniseOldReddit === true) {
					el.classList.add('re-modernise');
				}
			});
		}
	});
}

// Body
function observerSideMenuOld() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com/r/") <= 0) {
		waitForAddedNode({
			query: '.listing-chooser',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				loadHideSideMenuOld();
			}
		});
	}
}

// Sticky Sort
function observerStickySort() {
	var link = window.location.href
	if (link.indexOf("old.reddit.com/r/") <= 0) {
		waitForAddedNode({
			query: '.tabmenu',
			parent: document.querySelector('body'),
			recursive: true,
			done: function(el) {
				loadStickySort();
			}
		});
	}
}


/* ===== Post Overlay ===== */
// Post Sidebar
export function observerPostOverlay() {
	waitForAddedNode({
		query: '#overlayScrollContainer > div:nth-child(2) > div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function(el) {
			//if (!el.classList.contains('re-sidebar')) {
				el.classList.add('re-sidebar-post');
				loadHidePostSidebar();	
			//}
		}
	});
}
