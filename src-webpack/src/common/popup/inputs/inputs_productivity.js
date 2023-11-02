// Inputs - Productivity Tweaks

// Toggle - Scale Tall Images To Fit Post
document.querySelector('#checkbox-fit-image').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-fit-image').checked;
	if (state == true) {
		document.querySelector('#checkbox-image-scroll').checked = false;
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-scroll').style.backgroundColor = '';
		BROWSER_API.storage.sync.set({ fitImage: true });
		document.querySelector('.icon-scale').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { fitImage: true });
				}
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({ fitImage: false });
		document.querySelector('.icon-scale').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { fitImage: false });
				}
			});
		});
	}
});

// Toggle - Add Scrollbar To Tall Images
document.querySelector('#checkbox-image-scroll').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-image-scroll').checked;
	if (state == true) {
		document.querySelector('#checkbox-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ fitImage: false });
		document.querySelector('.icon-scale').style.backgroundColor = '';
		BROWSER_API.storage.sync.set({ imageScroll: true });
		document.querySelector('.icon-scroll').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { imageScroll: true });
				}
			});
		});
	} else if (state == false) {
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-scroll').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.includes('reddit.com') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { imageScroll: false });
				}
			});
		});
	}
});

// Slider - Header Height
/*document.querySelector('#input-header-height').addEventListener("input", function(e) {
	// set ui
	var value = e.target.value
	if (value == 4) {
		document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
		var height = "228px"
	} else if (value == 3) {
		document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
		var height = "128px"
	} else if (value == 2) {
		document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
		var height = "64px"
	} else if (value == 1) {
		document.querySelector('.header-height').style.backgroundColor = "var(--accent)"
		var height = "0px"
	} else if (value == 0) {
		document.querySelector('.header-height').style.backgroundColor = ""
		var height = "default"
	}
	document.querySelector("#header-height-value").innerText = height
	// save
	BROWSER_API.storage.sync.set({headerHeight: value});
	// apply
	BROWSER_API.tabs.query({currentWindow: true}, function (tabs){
		tabs.forEach(function(tab){
			if ((tab.url.match('https:\/\/.*.reddit.com\/.*'))&&(tab.discarded == false)) {
				BROWSER_API.tabs.sendMessage(tab.id, {headerHeight: value});
			};
		});
	});
});*/

// Toggle - Sticky Sort
document.querySelector('#checkbox-sticky-sort').addEventListener('change', function (e) {
	var stickySort = document.querySelector('#checkbox-sticky-sort').checked;
	if (stickySort == true) {
		BROWSER_API.storage.sync.set({ stickySort: true });
		document.querySelector('.sticky-sort').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { stickySort: true });
				}
			});
		});
	} else if (stickySort == false) {
		BROWSER_API.storage.sync.set({ stickySort: false });
		document.querySelector('.sticky-sort').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { stickySort: false });
				}
			});
		});
	}
});

// Toggle - New Video Player
document.querySelector('#checkbox-new-player').addEventListener('change', function (e) {
	var newPlayer = document.querySelector('#checkbox-new-player').checked;
	if (newPlayer == true) {
		BROWSER_API.storage.sync.set({ newPlayer: true });
		document.querySelector('.icon-new-player').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { newPlayer: true });
				}
			});
		});
	} else if (newPlayer == false) {
		BROWSER_API.storage.sync.set({ newPlayer: false });
		document.querySelector('.icon-new-player').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { newPlayer: false });
				}
			});
		});
	}
});

// Toggle - Show To Top Button
document.querySelector('#checkbox-show-to-top-button').addEventListener('change', function (e) {
	var showToTopButton = document.querySelector('#checkbox-show-to-top-button').checked;
	if (showToTopButton == true) {
		BROWSER_API.storage.sync.set({ showToTopButton: true });
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showToTopButton: true });
				}
			});
		});
	} else if (showToTopButton == false) {
		BROWSER_API.storage.sync.set({ showToTopButton: false });
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showToTopButton: false });
				}
			});
		});
	}
});

// Toggle - Always Show Rising Sort Button
document.querySelector('#checkbox-always-show-rising-button').addEventListener('change', function (e) {
	var alwaysShowRisingButton = document.querySelector('#checkbox-always-show-rising-button').checked;
	if (alwaysShowRisingButton == true) {
		BROWSER_API.storage.sync.set({ alwaysShowRisingButton: true });
		document.querySelector('.always-show-rising-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.always-show-rising-button').classList.remove('icon-rising');
		document.querySelector('.always-show-rising-button').classList.add('icon-rising-fill');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { alwaysShowRisingButton: true });
				}
			});
		});
	} else if (alwaysShowRisingButton == false) {
		BROWSER_API.storage.sync.set({ alwaysShowRisingButton: false });
		document.querySelector('.always-show-rising-button').style.backgroundColor = '';
		document.querySelector('.always-show-rising-button').classList.add('icon-rising');
		document.querySelector('.always-show-rising-button').classList.remove('icon-rising-fill');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { alwaysShowRisingButton: false });
				}
			});
		});
	}
});

// Toggle - Show Controversial Sort Button
document.querySelector('#checkbox-controversial-sort-button').addEventListener('change', function (e) {
	var showControversialSortButton = document.querySelector('#checkbox-controversial-sort-button').checked;
	if (showControversialSortButton == true) {
		BROWSER_API.storage.sync.set({ showControversialSortButton: true });
		document.querySelector('.icon-controversial-sort-button').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-controversial-sort-button').classList.remove('icon-sword');
		document.querySelector('.icon-controversial-sort-button').classList.add('icon-sword-fill');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showControversialSortButton: true });
				}
			});
		});
	} else if (showControversialSortButton == false) {
		BROWSER_API.storage.sync.set({ showControversialSortButton: false });
		document.querySelector('.icon-controversial-sort-button').style.backgroundColor = '';
		document.querySelector('.icon-controversial-sort-button').classList.add('icon-sword');
		document.querySelector('.icon-controversial-sort-button').classList.remove('icon-sword-fill');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showControversialSortButton: false });
				}
			});
		});
	}
});

// Toggle - Open Sub Links In New Tab
document.querySelector('#checkbox-open-sub-new-tab').addEventListener('change', function (e) {
	var openSubInNewTab = document.querySelector('#checkbox-open-sub-new-tab').checked;
	if (openSubInNewTab == true) {
		BROWSER_API.storage.sync.set({ openSubInNewTab: true });
		document.querySelector('.open-sub-new-tab').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { openSubInNewTab: true });
				}
			});
		});
	} else if (openSubInNewTab == false) {
		BROWSER_API.storage.sync.set({ openSubInNewTab: false });
		document.querySelector('.open-sub-new-tab').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { openSubInNewTab: false });
				}
			});
		});
	}
});

// Toggle - Open Post Links In New Tab
document.querySelector('#checkbox-open-post-new-tab').addEventListener('change', function (e) {
	var openPostInNewTab = document.querySelector('#checkbox-open-post-new-tab').checked;
	if (openPostInNewTab == true) {
		BROWSER_API.storage.sync.set({ openPostInNewTab: true });
		document.querySelector('.open-post-new-tab').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { openPostInNewTab: true });
				}
			});
		});
	} else if (openPostInNewTab == false) {
		BROWSER_API.storage.sync.set({ openPostInNewTab: false });
		document.querySelector('.open-post-new-tab').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { openPostInNewTab: false });
				}
			});
		});
	}
});

// Toggle - Show r/All Button
document.querySelector('#checkbox-show-r-all-button').addEventListener('change', function (e) {
	var showAllButton = document.querySelector('#checkbox-show-r-all-button').checked;
	if (showAllButton == true) {
		BROWSER_API.storage.sync.set({ showAllButton: true });
		document.querySelector('.icon-show-r-all').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showAllButton: true });
				}
			});
		});
	} else if (showAllButton == false) {
		BROWSER_API.storage.sync.set({ showAllButton: false });
		document.querySelector('.icon-show-r-all').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showAllButton: false });
				}
			});
		});
	}
});

// Toggle - Move Feed Section In Side Menu To The Top
document.querySelector('#checkbox-sidemenu-feed-top').addEventListener('change', function (e) {
	var sidemenuFeedTop = document.querySelector('#checkbox-sidemenu-feed-top').checked;
	if (sidemenuFeedTop == true) {
		BROWSER_API.storage.sync.set({ sidemenuFeedTop: true });
		document.querySelector('.icon-sidemenu-feed-top').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { sidemenuFeedTop: true });
				}
			});
		});
	} else if (sidemenuFeedTop == false) {
		BROWSER_API.storage.sync.set({ sidemenuFeedTop: false });
		document.querySelector('.icon-sidemenu-feed-top').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { sidemenuFeedTop: false });
				}
			});
		});
	}
});

// Toggle - Expand Post Options
/*document.querySelector('#checkbox-expand-post-options').addEventListener('change', function (e) {
	var expandPostOptions = document.querySelector('#checkbox-expand-post-options').checked;
	if (expandPostOptions == true) {
		BROWSER_API.storage.sync.set({ expandPostOptions: true });
		document.querySelector('.icon-expand-post-options').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { expandPostOptions: true });
				}
			});
		});
	} else if (expandPostOptions == false) {
		BROWSER_API.storage.sync.set({ expandPostOptions: false });
		document.querySelector('.icon-expand-post-options').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { expandPostOptions: false });
				}
			});
		});
	}
});*/

// Toggle - Add Scroll To Text Post
document.querySelector('#checkbox-text-scroll-post').addEventListener('change', function (e) {
	var textPostScroll = document.querySelector('#checkbox-text-scroll-post').checked;
	if (textPostScroll == true) {
		BROWSER_API.storage.sync.set({ textPostScroll: true });
		document.querySelector('.icon-text-scroll-post').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { textPostScroll: true });
				}
			});
		});
	} else if (textPostScroll == false) {
		BROWSER_API.storage.sync.set({ textPostScroll: false });
		document.querySelector('.icon-text-scroll-post').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { textPostScroll: false });
				}
			});
		});
	}
});

// Slider - Comments Limit
document.querySelector('#input-post-comments-limit').addEventListener('input', function (e) {
	// set ui
	var value = e.target.value;
	if (value == 0) {
		document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-comments-limit-value').innerText = '1';
		var value = 1;
	} else if (value != -10) {
		document.querySelector('.icon-post-comments-limit').style.backgroundColor = 'var(--accent)';
		document.querySelector('#post-comments-limit-value').innerText = e.target.value;
	} else {
		document.querySelector('.icon-post-comments-limit').style.backgroundColor = '';
		document.querySelector('#post-comments-limit-value').innerText = '∞';
	}
	// save
	BROWSER_API.storage.sync.set({ commentsLimit: value });
	// update background.js listener
	BROWSER_API.runtime.sendMessage({ message: 'update_listener' }, () => {
		//console.log("Listener updated");
	});
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { commentsLimit: value });
			}
		});
	});
});

// Toggle - Limit Infinity Scroll
document.querySelector('#checkbox-limit-infinity-scroll').addEventListener('change', function (e) {
	var limitInfinityScroll = document.querySelector('#checkbox-limit-infinity-scroll').checked;
	if (limitInfinityScroll == true) {
		BROWSER_API.storage.sync.set({ limitInfinityScroll: true });
		document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity');
		document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity-slash');
		if (document.querySelector('#checkbox-break-reminder').checked === true) {
			document.querySelector('#checkbox-break-reminder').click();
		}
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { limitInfinityScroll: true });
				}
			});
		});
	} else if (limitInfinityScroll == false) {
		BROWSER_API.storage.sync.set({ limitInfinityScroll: false });
		document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = '';
		document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity');
		document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity-slash');
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { limitInfinityScroll: false });
				}
			});
		});
	}
});

// Dropdown - Default Feed Sort Option
const feed_sort_option_dropdown = document.querySelector('#select-feed-sort-option');
const feed_sort_option_dropdownMenu = document.querySelector('#select-feed-sort-option-menu');
document.querySelector('#select-feed-sort-option .select').addEventListener('click', function () {
	if (feed_sort_option_dropdown.classList.contains('active')) {
		feed_sort_option_dropdown.classList.remove('active');
		feed_sort_option_dropdownMenu.style.maxHeight = '0';
	} else {
		feed_sort_option_dropdown.classList.add('active');
		feed_sort_option_dropdownMenu.style.maxHeight = feed_sort_option_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!feed_sort_option_dropdown.contains(event.target)) {
		feed_sort_option_dropdown.classList.remove('active');
		feed_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
feed_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	if (btn === 'li') {
		var feedSortOption = event.target.id.replace('feed-sort-', '');
	}
	if (btn === 'span') {
		var feedSortOption = event.target.parentNode.id.replace('feed-sort-', '');
	}
	document.querySelector('#select-feed-sort-option .select').querySelector('span').textContent = event.target.textContent;
	feed_sort_option_dropdown.classList.remove('active');
	feed_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultFeedSortOption: feedSortOption });
});

// Dropdown - Default Comments Sort Option
const comments_sort_option_dropdown = document.querySelector('#select-comments-sort-option');
const comments_sort_option_dropdownMenu = document.querySelector('#select-comments-sort-option-menu');
document.querySelector('#select-comments-sort-option .select').addEventListener('click', function () {
	if (comments_sort_option_dropdown.classList.contains('active')) {
		comments_sort_option_dropdown.classList.remove('active');
		comments_sort_option_dropdownMenu.style.maxHeight = '0';
	} else {
		comments_sort_option_dropdown.classList.add('active');
		comments_sort_option_dropdownMenu.style.maxHeight = comments_sort_option_dropdownMenu.scrollHeight + 'px';
	}
});
document.addEventListener('click', function (event) {
	if (!comments_sort_option_dropdown.contains(event.target)) {
		comments_sort_option_dropdown.classList.remove('active');
		comments_sort_option_dropdownMenu.style.maxHeight = '0';
	}
});
comments_sort_option_dropdownMenu.addEventListener('click', function (event) {
	const btn = event.target.tagName.toLowerCase();
	if (btn === 'li') {
		var commentsSortOption = event.target.id.replace('comments-sort-', '');
	}
	if (btn === 'span') {
		var commentsSortOption = event.target.parentNode.id.replace('comments-sort-', '');
	}
	document.querySelector('#select-comments-sort-option .select').querySelector('span').textContent = event.target.textContent;
	comments_sort_option_dropdown.classList.remove('active');
	comments_sort_option_dropdownMenu.style.maxHeight = '0';
	BROWSER_API.storage.sync.set({ defaultCommentsSortOption: commentsSortOption });
});

// Toggle - Enable Default Feed Sort Option
document.querySelector('#checkbox-default-feed-sort-option').addEventListener('change', function (e) {
	var enableDefaultFeedSortOption = document.querySelector('#checkbox-default-feed-sort-option').checked;
	if (enableDefaultFeedSortOption == true) {
		BROWSER_API.storage.sync.set({ enableDefaultFeedSortOption: true });
		document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { enableDefaultFeedSortOption: true });
				}
			});
		});
	} else if (enableDefaultFeedSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultFeedSortOption: false });
		document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { enableDefaultFeedSortOption: false });
				}
			});
		});
	}
});

// Toggle - Enable Default Comments Sort Option
document.querySelector('#checkbox-default-comments-sort-option').addEventListener('change', function (e) {
	var enableDefaultCommentsSortOption = document.querySelector('#checkbox-default-comments-sort-option').checked;
	if (enableDefaultCommentsSortOption == true) {
		BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: true });
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { enableDefaultCommentsSortOption: true });
				}
			});
		});
	} else if (enableDefaultCommentsSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: false });
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { enableDefaultCommentsSortOption: false });
				}
			});
		});
	}
});

// Toggle - Scroll To Next Root Comment
document.querySelector('#checkbox-scroll-to-next-root-comment').addEventListener('change', function (e) {
	var showScrollToNextRootComment = document.querySelector('#checkbox-scroll-to-next-root-comment').checked;
	if (showScrollToNextRootComment == true) {
		BROWSER_API.storage.sync.set({ showScrollToNextRootComment: true });
		document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showScrollToNextRootComment: true });
				}
			});
		});
	} else if (showScrollToNextRootComment == false) {
		BROWSER_API.storage.sync.set({ showScrollToNextRootComment: false });
		document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showScrollToNextRootComment: false });
				}
			});
		});
	}
});

// Toggle - Scroll To Next Root Comment
document.querySelector('#checkbox-scroll-to-next-root-comment').addEventListener('change', function (e) {
	var scrollToNextRootComment = document.querySelector('#checkbox-scroll-to-next-root-comment').checked;
	if (scrollToNextRootComment == true) {
		BROWSER_API.storage.sync.set({ scrollToNextRootComment: true });
		document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { scrollToNextRootComment: true });
				}
			});
		});
	} else if (scrollToNextRootComment == false) {
		BROWSER_API.storage.sync.set({ scrollToNextRootComment: false });
		document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { scrollToNextRootComment: false });
				}
			});
		});
	}
});

// Toggle - Show Post Numbers
document.querySelector('#checkbox-show-post-numbers').addEventListener('change', function (e) {
	var showPostNumbers = document.querySelector('#checkbox-show-post-numbers').checked;
	if (showPostNumbers == true) {
		BROWSER_API.storage.sync.set({ showPostNumbers: true });
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showPostNumbers: true });
				}
			});
		});
	} else if (showPostNumbers == false) {
		BROWSER_API.storage.sync.set({ showPostNumbers: false });
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { showPostNumbers: false });
				}
			});
		});
	}
});

// Slider - Feed Post Max Height
document.querySelector('#input-feed-post-max-height').addEventListener('input', function (e) {
	// set ui
	var value = e.target.value;
	if (value != 296) {
		document.querySelector('.icon-feed-post-max-height').style.backgroundColor = 'var(--accent)';
		document.querySelector('#feed-post-max-height-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('.icon-feed-post-max-height').style.backgroundColor = '';
		document.querySelector('#feed-post-max-height-value').innerText = '512px';
	}
});
document.querySelector('#input-feed-post-max-height').addEventListener('mouseup', function (e) {
	if (e.target.value != 296) {
		document.querySelector('#feed-post-max-height-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('#feed-post-max-height-value').innerText = '512px';
	}
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { postMaxHeight: e.target.value });
			}
		});
	});
	// save
	BROWSER_API.storage.sync.set({ postMaxHeight: e.target.value });
});

// Toggle - Non Sticky Header Bar
document.querySelector('#checkbox-non-sticky-header-bar').addEventListener('change', function (e) {
	var nonStickyHeaderBar = document.querySelector('#checkbox-non-sticky-header-bar').checked;
	if (nonStickyHeaderBar == true) {
		BROWSER_API.storage.sync.set({ nonStickyHeaderBar: true });
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = 'var(--accent)';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { nonStickyHeaderBar: true });
				}
			});
		});
	} else if (nonStickyHeaderBar == false) {
		BROWSER_API.storage.sync.set({ nonStickyHeaderBar: false });
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { nonStickyHeaderBar: false });
				}
			});
		});
	}
});

// Slider - Scroll To Root Comment Position
document.querySelector('#input-scroll-to-root-comment-position').addEventListener('input', function (e) {
	// set ui
	var value = e.target.value;
	if (value === '-1') {
		document.querySelector('.icon-scroll-to-root-comment-position').style.backgroundColor = '';
		document.querySelector('#scroll-to-root-comment-position-value').innerText = '48px';
	} else {
		document.querySelector('.icon-scroll-to-root-comment-position').style.backgroundColor = 'var(--accent)';
		document.querySelector('#scroll-to-root-comment-position-value').innerText = e.target.value + '%';
	}
});
document.querySelector('#input-scroll-to-root-comment-position').addEventListener('input', function (e) {
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { scrollToNextRootCommentPosition: e.target.value });
			}
		});
	});
	// save
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: e.target.value });
});

// Toggle - Break Reminder
document.querySelector('#checkbox-break-reminder').addEventListener('change', function (e) {
	var breakReminder = document.querySelector('#checkbox-break-reminder').checked;
	if (breakReminder == true) {
		BROWSER_API.storage.sync.set({ breakReminder: true });
		document.querySelector('.icon-break-reminder').style.backgroundColor = 'var(--accent)';
		if (document.querySelector('#checkbox-limit-infinity-scroll').checked === true) {
			document.querySelector('#checkbox-limit-infinity-scroll').click();
		}
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { breakReminder: true });
				}
			});
		});
	} else if (breakReminder == false) {
		BROWSER_API.storage.sync.set({ breakReminder: false });
		document.querySelector('.icon-break-reminder').style.backgroundColor = '';
		BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
			tabs.forEach(function (tab) {
				if (tab.url.match('https://.*.reddit.com/.*') && tab.discarded == false) {
					BROWSER_API.tabs.sendMessage(tab.id, { breakReminder: false });
				}
			});
		});
	}
});

// Slider - Break Reminder Frequency
document.querySelector('#input-break-reminder-frequency').addEventListener('input', function (e) {
	// set ui
	document.querySelector('#break-reminder-frequency-value').innerText = e.target.value;
	// apply
	BROWSER_API.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes('reddit.com') && tab.discarded == false) {
				BROWSER_API.tabs.sendMessage(tab.id, { breakReminderFrequency: e.target.value });
			}
		});
	});
	// save
	BROWSER_API.storage.sync.set({ breakReminderFrequency: e.target.value });
});
