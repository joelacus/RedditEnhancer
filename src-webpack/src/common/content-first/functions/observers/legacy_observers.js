// Legacy Observers For Pre Firefox v121

import { waitForAddedNode } from './main_observer';
import { loadHideAdvertiseButton, loadHideChatButton, loadHideCreatePostButton, loadHideModerationButton, loadHideNotificationButton } from '../hide_elements/load_hide_header_buttons';
import { loadHideCreatePost } from '../hide_elements/load_hide_create_post';
import { loadHideRedditPremium } from '../hide_elements/load_hide_reddit_premium';
import { loadHideSidebarPolicy } from '../hide_elements/load_hide_sidebar_policy';
import { loadHideHomeSidebar, loadHidePostSidebar, loadHideSubSidebarException, loadHideUserSidebar } from '../hide_elements/load_hide_sidebar';
import { loadExpandContent } from '../expand-layout/load_expand_content';
import { loadLayoutCentre } from '../expand-layout/load_layout_centre_and_offset';
import { loadOverrideDropShadow } from '../style/load_override_drop_shadow';
import { loadDropShadow } from '../style/load_drop_shadow';
import { loadHideGap } from '../style/load_hide_gap';
import { loadBreakReminder } from '../productivity/load_break_reminder';
import { loadShowPostNumbers } from '../productivity/load_show_post_numbers';
import { loadStickySort } from '../productivity/load_sticky_sort';

export function legacyObserversNew() {
	// Advertise
	waitForAddedNode({
		query: '#change-username-tooltip-id .icon-topic_activism',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.classList.add('re-advertise-button');
			loadHideAdvertiseButton();
			setTimeout(() => {
				if (!el.parentNode.parentNode.classList.contains('re-advertise-button')) {
					el.parentNode.parentNode.classList.add('re-advertise-button');
					loadHideAdvertiseButton();
				}
			}, 3000);
		},
	});
	// Chat
	waitForAddedNode({
		query: '#change-username-tooltip-id .icon-chat',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.classList.add('re-chat-button');
			loadHideChatButton();
		},
	});
	// Create Post
	waitForAddedNode({
		query: '#change-username-tooltip-id .icon-add',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.classList.add('re-create-post-button');
			loadHideCreatePostButton();
		},
	});
	// Moderation
	waitForAddedNode({
		query: '#Header--Moderation',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.classList.add('re-moderation-button');
			loadHideModerationButton();
		},
	});
	// Header Buttons
	waitForAddedNode({
		query: '.icon-popular',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.id = 're-header-buttons';
		},
	});
	// Notifications
	waitForAddedNode({
		query: '#change-username-tooltip-id .icon-notification',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.classList.add('re-notification-button');
			loadHideNotificationButton();
		},
	});
	// Create Post
	waitForAddedNode({
		query: '[name="createPost"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.classList.add('re-create-post');
			loadHideCreatePost();
			if (el.parentNode.previousElementSibling != null) {
				el.parentNode.previousElementSibling.classList.add('re-live');
			}
		},
	});
	// Reddit Premium
	waitForAddedNode({
		query: '.re-sidebar .icon-premium_fill',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('re-reddit-premium');
			loadHideRedditPremium();
		},
	});
	// Policy
	waitForAddedNode({
		query: '.re-sidebar [href="https://www.redditinc.com/policies/user-agreement"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.parentNode.parentNode.parentNode.id = 're-policy';
			loadHideSidebarPolicy();
		},
	});
	// Sidebar Home
	waitForAddedNode({
		query: '[data-testid="frontpage-sidebar"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.classList.add('re-sidebar', 're-sidebar-home');
			loadHideHomeSidebar();
		},
	});
	// Sidebar Subreddit
	waitForAddedNode({
		query: '[data-testid="subreddit-sidebar"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.classList.add('re-sidebar', 're-sidebar-sub');
			loadHideSubSidebarException();
		},
	});
	// Post Container
	waitForAddedNode({
		query: '.re-feed [data-testid="post-container"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.classList.add('re-post-container');
			loadExpandContent();
			loadLayoutCentre();
		},
	});
	// Sidebar
	waitForAddedNode({
		query: '.re-feed [data-redditstyle="true"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.classList.add('re-sidebar', 're-sidebar-post');
			loadHideGap();
			loadDropShadow();
			loadOverrideDropShadow();
			loadHidePostSidebar();
		},
	});
}

// Feed Container And Feed
export function observerFeedContainerAndFeed() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer [data-scroller-first=""]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
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
			loadOverrideDropShadow();
			BROWSER_API.storage.sync.get(['breakReminder'], function (result) {
				if (result.breakReminder === true) {
					loadBreakReminder(true);
				}
			});
		},
	});
	var link = window.location.href;
	if (link.indexOf('reddit.com/r/') <= 0) {
		// Show Post Numbers - Home
		waitForAddedNode({
			query: '.ListingLayout-outerContainer > div [data-click-id="subreddit"]',
			parent: document.querySelector('body'),
			recursive: true,
			done: function (el) {
				BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
					if (result.showPostNumbers === true) {
						loadShowPostNumbers(true);
					}
				});
			},
		});
	} else {
		// Show Post Numbers - Sub
		function showPostNumbersOnSub() {
			waitForAddedNode({
				query: '.ListingLayout-outerContainer > div [data-adclicklocation="top_bar"] [data-click-id="user"]',
				parent: document.querySelector('body'),
				recursive: true,
				done: function (el) {
					if (el.textContent !== '') {
						BROWSER_API.storage.sync.get(['showPostNumbers'], function (result) {
							if (result.showPostNumbers === true) {
								showPostNumbers(true);
							}
						});
					} else {
						setTimeout(() => {
							showPostNumbersOnSub();
						}, 1000);
					}
				},
			});
		}
		showPostNumbersOnSub();
	}
}

// Feed Container
export function observerFeedConainter() {
	const link = window.location.href;
	let page = '';
	if (link.indexOf('/comments/') >= 0) {
		page = '-post';
	}
	waitForAddedNode({
		query: '.ListingLayout-outerContainer div:nth-child(2)',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			if (el.childElementCount === 4) {
				el.lastChild.classList.add('re-feed' + page);
			} else {
				setTimeout(() => {
					if (el.childElementCount === 4) {
						el.lastChild.classList.add('re-feed' + page);
					} else {
						setTimeout(() => {
							if (el.childElementCount === 4) {
								el.lastChild.classList.add('re-feed' + page);
							}
						}, 3000);
					}
				}, 2000);
			}
		},
	});
}

// Feed Container And Feed
export function observerUserFeedContainerAndFeed() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer div[data-scroller-first=""]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentElement.classList.add('re-feed-container');
			el.parentElement.parentElement.parentElement.classList.add('re-feed');
			loadExpandContent();
			loadLayoutCentre();
			loadHideGap();
			loadDropShadow();
			loadOverrideDropShadow();
		},
	});
}

// Sort
export function observerSort() {
	// sort bar
	waitForAddedNode({
		query: '#view--layout--FUE',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.classList.add('re-sort');
			loadStickySort();
		},
	});

	// classic post view
	waitForAddedNode({
		query: '.re-sort .icon-view_classic',
		parent: document.querySelector('body'),
		recursive: false,
		done: function (el) {
			if (el) {
				waitForAddedNode({
					query: '.re-feed-container',
					parent: document.querySelector('body'),
					recursive: true,
					done: function (el) {
						document.querySelector('.re-feed-container').classList.add('view-classic');
					},
				});
			}
			BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
				if (result.largerClassicPost === true) {
					document.body.classList.add('re-larger-classic-post');
				}
			});
		},
	});
}

// Sidebar User
export function observerUserSidebar() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer [style="margin-left:24px;margin-top:0"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.classList.add('re-sidebar', 're-sidebar-user');
			loadHideUserSidebar();
		},
	});
	waitForAddedNode({
		query: '.ListingLayout-outerContainer [style="margin-left: 24px; margin-top: 0px;"]',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.classList.add('re-sidebar', 're-sidebar-user');
			loadHideUserSidebar();
		},
	});
}

// Search Container
export function observerSearchContainer() {
	waitForAddedNode({
		query: '.ListingLayout-outerContainer',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.lastChild.lastChild.classList.add('re-search-parent');
			el.lastChild.lastChild.lastChild.classList.add('re-search');
			el.lastChild.lastChild.lastChild.lastChild.firstChild.classList.add('re-post-container');
			document.querySelector('[data-testid="posts-list"]').firstChild.classList.add('re-posts-list');
			document.querySelector('[data-testid="search-results-nav"]').classList.add('re-search-results-nav');
			document.querySelector('[data-testid="search-results-subnav"]').classList.add('re-search-results-subnav');
			loadExpandContent();
			loadLayoutCentre();
		},
	});
}

// Sort
export function observerUserSort() {
	waitForAddedNode({
		query: '.re-feed .icon-new_fill',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.parentNode.parentNode.classList.add('re-sort');
			loadStickySort();
		},
	});
}

export function legacyObserversOld() {
	// Reddit Premium
	waitForAddedNode({
		query: '.premium-banner-outer',
		parent: document.querySelector('body'),
		recursive: true,
		done: function (el) {
			el.parentNode.classList.add('re-reddit-premium');
			loadHideRedditPremium();
		},
	});
}
