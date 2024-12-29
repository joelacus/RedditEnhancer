/* ===== Inputs / Productivity Tweaks ===== */

import { sendMessage } from '../send_message';

// Toggle - Scale Tall Images To Fit Post
document.querySelector('#checkbox-fit-image').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-fit-image').checked;
	if (state === true) {
		// disable other image options
		document.querySelector('#checkbox-image-scroll').checked = false;
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-scroll').style.backgroundColor = '';
		/*document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ scalePostToFitImage: false });
		document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = '';
		document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = '';
		document.querySelector('#checkbox-drag-image-to-resize').checked = false;
		BROWSER_API.storage.sync.set({ dragImageToResize: false });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';*/
		// enable
		BROWSER_API.storage.sync.set({ fitImage: true });
		document.querySelector('.icon-scale').style.backgroundColor = 'var(--accent)';
		sendMessage({ fitImage: true });
	} else if (state === false) {
		BROWSER_API.storage.sync.set({ fitImage: false });
		document.querySelector('.icon-scale').style.backgroundColor = '';
		sendMessage({ fitImage: false });
	}
});

// Toggle - Add Scrollbar To Tall Images
document.querySelector('#checkbox-image-scroll').addEventListener('change', function (e) {
	var state = document.querySelector('#checkbox-image-scroll').checked;
	if (state === true) {
		// disable other image options
		document.querySelector('#checkbox-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ fitImage: false });
		document.querySelector('.icon-scale').style.backgroundColor = '';
		/*document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ scalePostToFitImage: false });
		document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = '';
		document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = '';
		document.querySelector('#checkbox-drag-image-to-resize').checked = false;
		BROWSER_API.storage.sync.set({ dragImageToResize: false });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';*/
		// enable
		BROWSER_API.storage.sync.set({ imageScroll: true });
		document.querySelector('.icon-scroll').style.backgroundColor = 'var(--accent)';
		sendMessage({ imageScroll: true });
	} else if (state === false) {
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-scroll').style.backgroundColor = '';
		sendMessage({ imageScroll: false });
	}
});

// Slider - Add Scrollbar To Tall Images Max Image Width
document.querySelector('#input-image-scroll-max-image-width').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	const imageScroll = document.querySelector('#checkbox-image-scroll').checked;
	if (imageScroll === true) {
		if (value != 9) {
			document.querySelector('.icon-image-scroll-max-image-width').style.backgroundColor = 'var(--accent)';
		} else {
			document.querySelector('.icon-image-scroll-max-image-width').style.backgroundColor = '';
		}
	}
	if (value != 9) {
		document.querySelector('#image-scroll-max-image-width-value').innerText = value + '%';
	} else {
		document.querySelector('#image-scroll-max-image-width-value').innerText = '100%';
	}
	// apply
	sendMessage({ imageScrollMaxImageWidth: value });
});
document.querySelector('#input-image-scroll-max-image-width').addEventListener('mouseup', function (e) {
	if (e.target.value != 9) {
		document.querySelector('#image-scroll-max-image-width-value').innerText = e.target.value + '%';
	} else {
		document.querySelector('#image-scroll-max-image-width-value').innerText = '100%';
	}
	// save
	BROWSER_API.storage.sync.set({ imageScrollMaxImageWidth: e.target.value });
});
/*
// Toggle - Scale Post To Fit Image
document.querySelector('#checkbox-scale-post-to-fit-image').addEventListener('change', function (e) {
	const scalePostToFitImage = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	if (scalePostToFitImage === true) {
		// disable other image options
		document.querySelector('#checkbox-image-scroll').checked = false;
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-scroll').style.backgroundColor = '';
		document.querySelector('#checkbox-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ fitImage: false });
		document.querySelector('.icon-scale').style.backgroundColor = '';
		//document.querySelector('#checkbox-drag-image-to-resize').checked = false;
		//BROWSER_API.storage.sync.set({ dragImageToResize: false });
		//document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		//document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';
		// enable
		BROWSER_API.storage.sync.set({ scalePostToFitImage: true });
		document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = 'var(--accent)';
		// set slider icon
		const value = document.querySelector('#input-scale-post-to-fit-image-max-image-width').value;
		if (value != 9) {
			document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = 'var(--accent)';
		} else {
			document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = '';
		}
		sendMessage({ scalePostToFitImage: true });
	} else if (scalePostToFitImage === false) {
		BROWSER_API.storage.sync.set({ scalePostToFitImage: false });
		document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = '';
		document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = '';
		sendMessage({ scalePostToFitImage: false });
	}
});

// Slider - Scale Post To Fit Image Max Image Width
document.querySelector('#input-scale-post-to-fit-image-max-image-width').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	const scalePostToFitImage = document.querySelector('#checkbox-scale-post-to-fit-image').checked;
	if (scalePostToFitImage === true) {
		if (value != 9) {
			document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = 'var(--accent)';
		} else {
			document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = '';
		}
	}
	if (value != 9) {
		document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = e.target.value + '%';
	} else {
		document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = '40%';
	}
	// apply
	sendMessage({ scalePostToFitImageMaxImageWidth: e.target.value });
});
document.querySelector('#input-scale-post-to-fit-image-max-image-width').addEventListener('mouseup', function (e) {
	if (e.target.value != 9) {
		document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = e.target.value + '%';
	} else {
		document.querySelector('#scale-post-to-fit-image-max-image-width-value').innerText = '40%';
	}
	// save
	BROWSER_API.storage.sync.set({ scalePostToFitImageMaxImageWidth: e.target.value });
});
*/

// Toggle - Drag Image To Resize
/*document.querySelector('#checkbox-drag-image-to-resize').addEventListener('change', function (e) {
	const dragImageToResize = document.querySelector('#checkbox-drag-image-to-resize').checked;
	if (dragImageToResize === true) {
		// disable other image options
		document.querySelector('#checkbox-image-scroll').checked = false;
		BROWSER_API.storage.sync.set({ imageScroll: false });
		document.querySelector('.icon-scroll').style.backgroundColor = '';
		document.querySelector('#checkbox-fit-image').checked = false;
		BROWSER_API.storage.sync.set({ fitImage: false });
		document.querySelector('.icon-scale').style.backgroundColor = '';
		//document.querySelector('#checkbox-scale-post-to-fit-image').checked = false;
		//BROWSER_API.storage.sync.set({ scalePostToFitImage: false });
		//document.querySelector('.icon-scale-post-to-fit-image').style.backgroundColor = '';
		//document.querySelector('.icon-scale-post-to-fit-image-max-image-width').style.backgroundColor = '';
		// enable
		BROWSER_API.storage.sync.set({ dragImageToResize: true });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = 'var(--accent)';
		sendMessage({ dragImageToResize: true });
	} else if (dragImageToResize === false) {
		BROWSER_API.storage.sync.set({ dragImageToResize: false });
		document.querySelector('.icon-drag-image-to-resize').style.backgroundColor = '';
		document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';
		sendMessage({ dragImageToResize: false });
	}
});*/

// Slider - Drag Image To Resize Initial Height
/*document.querySelector('#input-drag-image-to-resize-initial-size').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	const dragImageToResize = document.querySelector('#checkbox-drag-image-to-resize').checked;
	console.log(value);
	console.log(dragImageToResize);
	if (dragImageToResize === true) {
		if (value != 99) {
			document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = 'var(--accent)';
		} else {
			document.querySelector('.icon-drag-image-to-resize-initial-size').style.backgroundColor = '';
		}
	}
	if (value != 99) {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
	}
});
document.querySelector('#input-drag-image-to-resize-initial-size').addEventListener('mouseup', function (e) {
	if (e.target.value != 99) {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('#drag-image-to-resize-initial-size-value').innerText = '350px';
	}
	// apply
	sendMessage({ dragImageToResizeInitialSize: e.target.value });
	// save
	BROWSER_API.storage.sync.set({ dragImageToResizeInitialSize: e.target.value });
});*/

// Toggle - Just Open The Image
document.querySelector('#checkbox-just-open-the-image').addEventListener('change', function (e) {
	const justOpenTheImage = document.querySelector('#checkbox-just-open-the-image').checked;
	if (justOpenTheImage === true) {
		// Detect addon manifest version
		if (BROWSER_API.runtime.getManifest().manifest_version === 2) {
			// Request the optional permissions for Firefox
			BROWSER_API.permissions
				.request({
					permissions: ['webRequest', 'webRequestBlocking'],
					origins: ['*://*.redd.it/*'],
				})
				.then((granted) => {
					if (granted) {
						console.log('Optional permissions granted');
						BROWSER_API.storage.sync.set({ justOpenTheImage: true });
						document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
						BROWSER_API.runtime.sendMessage({ justOpenTheImage: true });
					} else {
						console.log('Optional permissions not granted');
						document.querySelector('#checkbox-just-open-the-image').checked = false;
					}
				});
		} else if (BROWSER_API.runtime.getManifest().manifest_version === 3) {
			BROWSER_API.storage.sync.set({ justOpenTheImage: true });
			document.querySelector('.icon-just-open-the-image').style.backgroundColor = 'var(--accent)';
			BROWSER_API.runtime.sendMessage({ justOpenTheImage: true });
		}
	} else if (justOpenTheImage === false) {
		BROWSER_API.storage.sync.set({ justOpenTheImage: false });
		document.querySelector('.icon-just-open-the-image').style.backgroundColor = '';
		BROWSER_API.runtime.sendMessage({ justOpenTheImage: false });
	}
});

// Toggle - Sticky Sort
document.querySelector('#checkbox-sticky-sort').addEventListener('change', function (e) {
	var stickySort = document.querySelector('#checkbox-sticky-sort').checked;
	if (stickySort === true) {
		BROWSER_API.storage.sync.set({ stickySort: true });
		document.querySelector('.sticky-sort').style.backgroundColor = 'var(--accent)';
		sendMessage({ stickySort: true });
	} else if (stickySort === false) {
		BROWSER_API.storage.sync.set({ stickySort: false });
		document.querySelector('.sticky-sort').style.backgroundColor = '';
		sendMessage({ stickySort: false });
	}
});

// Toggle - New Video Player
document.querySelector('#checkbox-new-player').addEventListener('change', function (e) {
	var newPlayer = document.querySelector('#checkbox-new-player').checked;
	if (newPlayer == true) {
		BROWSER_API.storage.sync.set({ newPlayer: true });
		document.querySelector('.icon-new-player').style.backgroundColor = 'var(--accent)';
		sendMessage({ newPlayer: true });
	} else if (newPlayer == false) {
		BROWSER_API.storage.sync.set({ newPlayer: false });
		document.querySelector('.icon-new-player').style.backgroundColor = '';
		sendMessage({ newPlayer: false });
	}
});

// Toggle - Show To Top Button
document.querySelector('#checkbox-show-to-top-button').addEventListener('change', function (e) {
	var showToTopButton = document.querySelector('#checkbox-show-to-top-button').checked;
	if (showToTopButton == true) {
		BROWSER_API.storage.sync.set({ showToTopButton: true });
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = 'var(--accent)';
		sendMessage({ showToTopButton: true });
	} else if (showToTopButton == false) {
		BROWSER_API.storage.sync.set({ showToTopButton: false });
		document.querySelector('.icon-scroll-to-top').style.backgroundColor = '';
		sendMessage({ showToTopButton: false });
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
		sendMessage({ alwaysShowRisingButton: true });
	} else if (alwaysShowRisingButton == false) {
		BROWSER_API.storage.sync.set({ alwaysShowRisingButton: false });
		document.querySelector('.always-show-rising-button').style.backgroundColor = '';
		document.querySelector('.always-show-rising-button').classList.add('icon-rising');
		document.querySelector('.always-show-rising-button').classList.remove('icon-rising-fill');
		sendMessage({ alwaysShowRisingButton: false });
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
		sendMessage({ showControversialSortButton: true });
	} else if (showControversialSortButton == false) {
		BROWSER_API.storage.sync.set({ showControversialSortButton: false });
		document.querySelector('.icon-controversial-sort-button').style.backgroundColor = '';
		document.querySelector('.icon-controversial-sort-button').classList.add('icon-sword');
		document.querySelector('.icon-controversial-sort-button').classList.remove('icon-sword-fill');
		sendMessage({ showControversialSortButton: false });
	}
});

// Toggle - Open Sub Links In New Tab
document.querySelector('#checkbox-open-sub-new-tab').addEventListener('change', function (e) {
	var openSubInNewTab = document.querySelector('#checkbox-open-sub-new-tab').checked;
	if (openSubInNewTab == true) {
		BROWSER_API.storage.sync.set({ openSubInNewTab: true });
		document.querySelector('.open-sub-new-tab').style.backgroundColor = 'var(--accent)';
		sendMessage({ openSubInNewTab: true });
	} else if (openSubInNewTab == false) {
		BROWSER_API.storage.sync.set({ openSubInNewTab: false });
		document.querySelector('.open-sub-new-tab').style.backgroundColor = '';
		sendMessage({ openSubInNewTab: false });
	}
});

// Toggle - Open Post Links In New Tab
document.querySelector('#checkbox-open-post-new-tab').addEventListener('change', function (e) {
	var openPostInNewTab = document.querySelector('#checkbox-open-post-new-tab').checked;
	if (openPostInNewTab == true) {
		BROWSER_API.storage.sync.set({ openPostInNewTab: true });
		document.querySelector('.open-post-new-tab').style.backgroundColor = 'var(--accent)';
		sendMessage({ openPostInNewTab: true });
	} else if (openPostInNewTab == false) {
		BROWSER_API.storage.sync.set({ openPostInNewTab: false });
		document.querySelector('.open-post-new-tab').style.backgroundColor = '';
		sendMessage({ openPostInNewTab: false });
	}
});

// Toggle - Show r/All Button
document.querySelector('#checkbox-show-r-all-button').addEventListener('change', function (e) {
	var showAllButton = document.querySelector('#checkbox-show-r-all-button').checked;
	if (showAllButton == true) {
		BROWSER_API.storage.sync.set({ showAllButton: true });
		document.querySelector('.icon-show-r-all').style.backgroundColor = 'var(--accent)';
		sendMessage({ showAllButton: true });
	} else if (showAllButton == false) {
		BROWSER_API.storage.sync.set({ showAllButton: false });
		document.querySelector('.icon-show-r-all').style.backgroundColor = '';
		sendMessage({ showAllButton: false });
	}
});

// Toggle - Move Feed Section In Side Menu To The Top
document.querySelector('#checkbox-sidemenu-feed-top').addEventListener('change', function (e) {
	var sidemenuFeedTop = document.querySelector('#checkbox-sidemenu-feed-top').checked;
	if (sidemenuFeedTop == true) {
		BROWSER_API.storage.sync.set({ sidemenuFeedTop: true });
		document.querySelector('.icon-sidemenu-feed-top').style.backgroundColor = 'var(--accent)';
		sendMessage({ sidemenuFeedTop: true });
	} else if (sidemenuFeedTop == false) {
		BROWSER_API.storage.sync.set({ sidemenuFeedTop: false });
		document.querySelector('.icon-sidemenu-feed-top').style.backgroundColor = '';
		sendMessage({ sidemenuFeedTop: false });
	}
});

// Toggle - Always Show Post Options
document.querySelector('#checkbox-always-show-post-options').addEventListener('change', function (e) {
	const alwaysShowPostOptions = document.querySelector('#checkbox-always-show-post-options').checked;
	if (alwaysShowPostOptions === true) {
		BROWSER_API.storage.sync.set({ alwaysShowPostOptions: true });
		document.querySelector('.icon-always-show-post-options').style.backgroundColor = 'var(--accent)';
		sendMessage({ alwaysShowPostOptions: true });
	} else if (alwaysShowPostOptions === false) {
		BROWSER_API.storage.sync.set({ alwaysShowPostOptions: false });
		document.querySelector('.icon-always-show-post-options').style.backgroundColor = '';
		sendMessage({ alwaysShowPostOptions: false });
	}
});

// Toggle - Add Scroll To Text Post
document.querySelector('#checkbox-text-scroll-post').addEventListener('change', function (e) {
	var textPostScroll = document.querySelector('#checkbox-text-scroll-post').checked;
	if (textPostScroll == true) {
		BROWSER_API.storage.sync.set({ textPostScroll: true });
		document.querySelector('.icon-text-scroll-post').style.backgroundColor = 'var(--accent)';
		sendMessage({ textPostScroll: true });
	} else if (textPostScroll == false) {
		BROWSER_API.storage.sync.set({ textPostScroll: false });
		document.querySelector('.icon-text-scroll-post').style.backgroundColor = '';
		sendMessage({ textPostScroll: false });
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
	// update background.js listener
	BROWSER_API.runtime.sendMessage({ message: 'update_listener' }, () => {
		//console.log("Listener updated");
	});
	// apply
	sendMessage({ commentsLimit: value });
});
document.querySelector('#input-post-comments-limit').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ commentsLimit: e.target.value });
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
		sendMessage({ limitInfinityScroll: true });
	} else if (limitInfinityScroll == false) {
		BROWSER_API.storage.sync.set({ limitInfinityScroll: false });
		document.querySelector('.icon-limit-infinity-scroll').style.backgroundColor = '';
		document.querySelector('.icon-limit-infinity-scroll').classList.add('icon-infinity');
		document.querySelector('.icon-limit-infinity-scroll').classList.remove('icon-infinity-slash');
		sendMessage({ limitInfinityScroll: false });
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
		sendMessage({ enableDefaultFeedSortOption: true });
	} else if (enableDefaultFeedSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultFeedSortOption: false });
		document.querySelector('.icon-default-feed-sort-option').style.backgroundColor = '';
		sendMessage({ enableDefaultFeedSortOption: false });
	}
});

// Toggle - Enable Default Comments Sort Option
document.querySelector('#checkbox-default-comments-sort-option').addEventListener('change', function (e) {
	var enableDefaultCommentsSortOption = document.querySelector('#checkbox-default-comments-sort-option').checked;
	if (enableDefaultCommentsSortOption == true) {
		BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: true });
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = 'var(--accent)';
		sendMessage({ enableDefaultCommentsSortOption: true });
	} else if (enableDefaultCommentsSortOption == false) {
		BROWSER_API.storage.sync.set({ enableDefaultCommentsSortOption: false });
		document.querySelector('.icon-default-comments-sort-option').style.backgroundColor = '';
		sendMessage({ enableDefaultCommentsSortOption: false });
	}
});

// Toggle - Scroll To Next Root Comment
document.querySelector('#checkbox-scroll-to-next-root-comment').addEventListener('change', function (e) {
	var scrollToNextRootComment = document.querySelector('#checkbox-scroll-to-next-root-comment').checked;
	if (scrollToNextRootComment == true) {
		BROWSER_API.storage.sync.set({ scrollToNextRootComment: true });
		document.querySelector('.icon-hide-turn-on-notifications').style.backgroundColor = 'var(--accent)';
		sendMessage({ scrollToNextRootComment: true });
	} else if (scrollToNextRootComment == false) {
		BROWSER_API.storage.sync.set({ scrollToNextRootComment: false });
		document.querySelector('.icon-scroll-to-next-root-comment').style.backgroundColor = '';
		sendMessage({ scrollToNextRootComment: false });
	}
});

// Slider - Scroll To Root Comment Position Horizontal
document.querySelector('#input-scroll-to-root-comment-position').addEventListener('input', function (e) {
	// set ui
	const value = e.target.value;
	if (value === '-1') {
		document.querySelector('.icon-scroll-to-root-comment-position').style.backgroundColor = '';
		document.querySelector('#scroll-to-root-comment-position-value').innerText = '48px';
	} else {
		document.querySelector('.icon-scroll-to-root-comment-position').style.backgroundColor = 'var(--accent)';
		document.querySelector('#scroll-to-root-comment-position-value').innerText = e.target.value + '%';
	}
	// apply
	sendMessage({ scrollToNextRootCommentPosition: e.target.value });
});
document.querySelector('#input-scroll-to-root-comment-position').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPosition: e.target.value });
});

// Slider - Scroll To Root Comment Position Vertical
document.querySelector('#input-scroll-to-root-comment-position-v').addEventListener('input', function (e) {
	// set ui
	var value = e.target.value;
	if (value === '-1') {
		document.querySelector('.icon-scroll-to-root-comment-position-v').style.backgroundColor = '';
		document.querySelector('#scroll-to-root-comment-position-v-value').innerText = '50%';
	} else {
		document.querySelector('.icon-scroll-to-root-comment-position-v').style.backgroundColor = 'var(--accent)';
		document.querySelector('#scroll-to-root-comment-position-v-value').innerText = e.target.value + '%';
	}
	// apply
	sendMessage({ scrollToNextRootCommentPositionV: e.target.value });
});
document.querySelector('#input-scroll-to-root-comment-position-v').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ scrollToNextRootCommentPositionV: e.target.value });
});

// Toggle - Show Post Numbers
document.querySelector('#checkbox-show-post-numbers').addEventListener('change', function (e) {
	var showPostNumbers = document.querySelector('#checkbox-show-post-numbers').checked;
	if (showPostNumbers == true) {
		BROWSER_API.storage.sync.set({ showPostNumbers: true });
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = 'var(--accent)';
		sendMessage({ showPostNumbers: true });
	} else if (showPostNumbers == false) {
		BROWSER_API.storage.sync.set({ showPostNumbers: false });
		document.querySelector('.icon-show-post-numbers').style.backgroundColor = '';
		sendMessage({ showPostNumbers: false });
	}
});

// Toggle - Show Post Author
document.querySelector('#checkbox-show-post-author').addEventListener('change', function (e) {
	var showPostAuthor = document.querySelector('#checkbox-show-post-author').checked;
	if (showPostAuthor == true) {
		BROWSER_API.storage.sync.set({ showPostAuthor: true });
		document.querySelector('.icon-show-post-author').style.backgroundColor = 'var(--accent)';
		sendMessage({ showPostAuthor: true });
	} else if (showPostAuthor == false) {
		BROWSER_API.storage.sync.set({ showPostAuthor: false });
		document.querySelector('.icon-show-post-author').style.backgroundColor = '';
		sendMessage({ showPostAuthor: false });
	}
});

// Toggle - Show Post Flair
document.querySelector('#checkbox-show-post-flair').addEventListener('change', function (e) {
	var showPostFlair = document.querySelector('#checkbox-show-post-flair').checked;
	if (showPostFlair == true) {
		BROWSER_API.storage.sync.set({ showPostFlair: true });
		document.querySelector('.icon-show-post-flair').style.backgroundColor = 'var(--accent)';
		sendMessage({ showPostFlair: true });
	} else if (showPostFlair == false) {
		BROWSER_API.storage.sync.set({ showPostFlair: false });
		document.querySelector('.icon-show-post-flair').style.backgroundColor = '';
		sendMessage({ showPostFlair: false });
	}
});

// Toggle - Add User Profile Pictures To Comments
document.querySelector('#checkbox-add-profile-pictures-to-comments').addEventListener('change', function (e) {
	var addProfilePicturesToComments = document.querySelector('#checkbox-add-profile-pictures-to-comments').checked;
	if (addProfilePicturesToComments == true) {
		BROWSER_API.storage.sync.set({ addProfilePicturesToComments: true });
		document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = 'var(--accent)';
		sendMessage({ addProfilePicturesToComments: true });
	} else if (addProfilePicturesToComments == false) {
		BROWSER_API.storage.sync.set({ addProfilePicturesToComments: false });
		document.querySelector('.icon-add-profile-pictures-to-comments').style.backgroundColor = '';
		sendMessage({ addProfilePicturesToComments: false });
	}
});

// Toggle - Post Height
document.querySelector('#checkbox-post-height').addEventListener('change', function (e) {
	const postHeight = document.querySelector('#checkbox-post-height').checked;
	if (postHeight === true) {
		// enable
		BROWSER_API.storage.sync.set({ postHeight: true });
		document.querySelector('.icon-post-height').style.backgroundColor = 'var(--accent)';
		sendMessage({ postHeight: true });
	} else if (postHeight === false) {
		BROWSER_API.storage.sync.set({ postHeight: false });
		document.querySelector('.icon-post-height').style.backgroundColor = '';
		sendMessage({ postHeight: false });
	}
});

// Slider - Feed Post Height
document.querySelector('#input-feed-post-max-height').addEventListener('input', function (e) {
	// set ui
	if (value != 296) {
		document.querySelector('#feed-post-max-height-value').innerText = e.target.value + 'px';
	} else {
		document.querySelector('#feed-post-max-height-value').innerText = '512px';
	}
});
document.querySelector('#input-feed-post-max-height').addEventListener('mouseup', function (e) {
	if (e.target.value != 296) {
		document.querySelector('#feed-post-max-height-value').innerText = e.target.value + 'px';
		var value = e.target.value;
	} else {
		document.querySelector('#feed-post-max-height-value').innerText = '512px';
		var value = 512;
	}
	// apply
	sendMessage({ postHeightSize: value });
	// save
	BROWSER_API.storage.sync.set({ postHeightSize: e.target.value });
});

// Toggle - Non Sticky Header Bar
document.querySelector('#checkbox-non-sticky-header-bar').addEventListener('change', function (e) {
	var nonStickyHeaderBar = document.querySelector('#checkbox-non-sticky-header-bar').checked;
	if (nonStickyHeaderBar == true) {
		BROWSER_API.storage.sync.set({ nonStickyHeaderBar: true });
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-non-sticky-header-bar').classList.remove('icon-sticky-note');
		document.querySelector('.icon-non-sticky-header-bar').classList.add('icon-sticky-note-slash');
		sendMessage({ nonStickyHeaderBar: true });
	} else if (nonStickyHeaderBar == false) {
		BROWSER_API.storage.sync.set({ nonStickyHeaderBar: false });
		document.querySelector('.icon-non-sticky-header-bar').style.backgroundColor = '';
		document.querySelector('.icon-non-sticky-header-bar').classList.remove('icon-sticky-note-slash');
		document.querySelector('.icon-non-sticky-header-bar').classList.add('icon-sticky-note');
		sendMessage({ nonStickyHeaderBar: false });
	}
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
		sendMessage({ breakReminder: true });
	} else if (breakReminder == false) {
		BROWSER_API.storage.sync.set({ breakReminder: false });
		document.querySelector('.icon-break-reminder').style.backgroundColor = '';
		sendMessage({ breakReminder: false });
	}
});

// Slider - Break Reminder Frequency
document.querySelector('#input-break-reminder-frequency').addEventListener('input', function (e) {
	// set ui
	document.querySelector('#break-reminder-frequency-value').innerText = e.target.value;
	// apply
	sendMessage({ breakReminderFrequency: e.target.value });
});
document.querySelector('#input-break-reminder-frequency').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ breakReminderFrequency: e.target.value });
});

// Toggle - Auto Expand Comments
document.querySelector('#checkbox-auto-expand-comments').addEventListener('change', function (e) {
	const autoExpandComments = document.querySelector('#checkbox-auto-expand-comments').checked;
	if (autoExpandComments === true) {
		BROWSER_API.storage.sync.set({ autoExpandComments: true });
		document.querySelector('.icon-auto-expand-comments').style.backgroundColor = 'var(--accent)';
		sendMessage({ autoExpandComments: true });
	} else if (autoExpandComments === false) {
		BROWSER_API.storage.sync.set({ autoExpandComments: false });
		document.querySelector('.icon-auto-expand-comments').style.backgroundColor = '';
		sendMessage({ autoExpandComments: false });
	}
});

// Toggle - Add Video Download Button
/*document.querySelector('#checkbox-add-download-video-button').addEventListener('change', function (e) {
	const addDownloadVideoButton = document.querySelector('#checkbox-add-download-video-button').checked;
	if (addDownloadVideoButton === true) {
		BROWSER_API.storage.sync.set({ addDownloadVideoButton: true });
		document.querySelector('.icon-add-download-video-button').style.backgroundColor = 'var(--accent)';
		sendMessage({ addDownloadVideoButton: true });
	} else if (addDownloadVideoButton === false) {
		BROWSER_API.storage.sync.set({ addDownloadVideoButton: false });
		document.querySelector('.icon-add-download-video-button').style.backgroundColor = '';
		sendMessage({ addDownloadVideoButton: false });
	}
});*/

// Toggle - Auto Collapse AutoModerator Comment
document.querySelector('#checkbox-auto-collapse-automoderator-comment').addEventListener('change', function (e) {
	const autoCollapseAutoModeratorComment = document.querySelector('#checkbox-auto-collapse-automoderator-comment').checked;
	if (autoCollapseAutoModeratorComment === true) {
		BROWSER_API.storage.sync.set({ autoCollapseAutoModeratorComment: true });
		document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = 'var(--accent)';
		sendMessage({ autoCollapseAutoModeratorComment: true });
	} else if (autoCollapseAutoModeratorComment === false) {
		BROWSER_API.storage.sync.set({ autoCollapseAutoModeratorComment: false });
		document.querySelector('.icon-auto-collapse-automoderator-comment').style.backgroundColor = '';
		sendMessage({ autoCollapseAutoModeratorComment: false });
	}
});

// Toggle - Auto Load More Comments
document.querySelector('#checkbox-auto-load-more-comments').addEventListener('change', function (e) {
	const autoLoadMoreComments = document.querySelector('#checkbox-auto-load-more-comments').checked;
	if (autoLoadMoreComments === true) {
		BROWSER_API.storage.sync.set({ autoLoadMoreComments: true });
		document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = 'var(--accent)';
		sendMessage({ autoLoadMoreComments: true });
	} else if (autoLoadMoreComments === false) {
		BROWSER_API.storage.sync.set({ autoLoadMoreComments: false });
		document.querySelector('.icon-auto-load-more-comments').style.backgroundColor = '';
		sendMessage({ autoLoadMoreComments: false });
	}
});

// Toggle - Auto Show Comment Formatting Options
document.querySelector('#checkbox-auto-show-comment-formatting-options').addEventListener('change', function (e) {
	const autoShowCommentFormattingOptions = document.querySelector('#checkbox-auto-show-comment-formatting-options').checked;
	if (autoShowCommentFormattingOptions === true) {
		BROWSER_API.storage.sync.set({ autoShowCommentFormattingOptions: true });
		document.querySelector('.icon-auto-show-comment-formatting-options').style.backgroundColor = 'var(--accent)';
		document.querySelector('.icon-auto-show-comment-formatting-options').classList.remove('icon-hide');
		document.querySelector('.icon-auto-show-comment-formatting-options').classList.add('icon-show');
		sendMessage({ autoShowCommentFormattingOptions: true });
	} else if (autoShowCommentFormattingOptions === false) {
		BROWSER_API.storage.sync.set({ autoShowCommentFormattingOptions: false });
		document.querySelector('.icon-auto-show-comment-formatting-options').style.backgroundColor = '';
		document.querySelector('.icon-auto-show-comment-formatting-options').classList.remove('icon-show');
		document.querySelector('.icon-auto-show-comment-formatting-options').classList.add('icon-hide');
		sendMessage({ autoShowCommentFormattingOptions: false });
	}
});

// Slider - Side Menu Width
document.querySelector('#input-side-menu-width').addEventListener('input', function (e) {
	// set ui
	if (e.target.value === '199') {
		document.querySelector('.icon-side-menu-width').style.backgroundColor = '';
		document.querySelector('#side-menu-width-value').textContent = '';
	} else {
		document.querySelector('.icon-side-menu-width').style.backgroundColor = 'var(--accent)';
		document.querySelector('#side-menu-width-value').textContent = e.target.value + 'px';
	}
	// apply
	sendMessage({ sideMenuWidth: e.target.value });
});
document.querySelector('#input-side-menu-width').addEventListener('mouseup', function (e) {
	BROWSER_API.storage.sync.set({ sideMenuWidth: e.target.value });
});

// Toggle - Remember Side Menu Section Hidden State
document.querySelector('#checkbox-remember-side-menu-section-hidden-state').addEventListener('change', function (e) {
	const rememberSideMenuSectionHiddenState = document.querySelector('#checkbox-remember-side-menu-section-hidden-state').checked;
	if (rememberSideMenuSectionHiddenState === true) {
		BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenState: true });
		document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = 'var(--accent)';
		sendMessage({ rememberSideMenuSectionHiddenState: true });
	} else if (rememberSideMenuSectionHiddenState === false) {
		BROWSER_API.storage.sync.set({ rememberSideMenuSectionHiddenState: false });
		document.querySelector('.icon-remember-side-menu-section-hidden-state').style.backgroundColor = '';
		sendMessage({ rememberSideMenuSectionHiddenState: false });
	}
});
