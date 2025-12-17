/**
 * Tweaks: Productivity - Show Navigation Buttons for the Previous/Next Root Comment
 *
 * @name scrollToNextRootComment
 * @description Add navigation buttons to scroll to the previous or next top-level comment on Reddit comment pages.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadScrollToNextRootComment() {
	BROWSER_API.storage.sync.get(['scrollToNextRootComment', 'scrollToNextRootCommentPosition'], function (result) {
		if (result.scrollToNextRootComment) {
			scrollToNextRootComment(true);
			scrollToNextRootCommentPosition(result.scrollToNextRootCommentPosition);
		}
	});
}

/* === Enable/Disable The Feature === */
export function scrollToNextRootComment(value) {
	const isCommentPage = window.location.href.match('https://.*.reddit.com/r/.*/comments/.*');
	// Remove existing navigation buttons if any
	if (isCommentPage && value) {
		if (document.querySelector('.re-scroll-to-comment-container')) disableScrollToNextRootCommentAll();
		if (redditVersion === 'newnew' && value) {
			enableScrollToNextRootCommentRV3();
		} else if (redditVersion === 'old' && value) {
			enableScrollToNextRootCommentRV1();
		} else {
			disableScrollToNextRootCommentAll();
		}
	}
}

// Enable Scroll To Next Root Comment - RV3
function enableScrollToNextRootCommentRV3() {
	// Determine the header bar height based on enabled RE features
	let headerHeight = 72; // 64px header + 8px padding
	BROWSER_API.storage.sync.get(['hideHeaderBar', 'nonStickyHeaderBar', 'compactHeaderSideMenu'], (result) => {
		if (result.hideHeaderBar || result.nonStickyHeaderBar) {
			headerHeight = 8;
		} else if (result.compactHeaderSideMenu) {
			headerHeight = 56; // 48px header + 8px padding
		}
	});

	// Create button container
	const container = document.createElement('div');
	container.classList.add('re-scroll-to-comment-container');

	// Create previous button
	const prevBtn = document.createElement('div');
	prevBtn.setAttribute('id', 're-prev-comment');
	// on click
	prevBtn.addEventListener('click', function () {
		// get all the elements of type "shreddit-comment"
		const reRootComments = Array.from(document.querySelectorAll('#comment-tree > shreddit-comment'));
		// get current postion
		const currentScrollPosition = Math.floor(window.scrollY);
		let previousComment = null;
		// find the previous "shreddit-comment" element above the current scroll position
		for (let i = reRootComments.length - 1; i >= 0; i--) {
			const commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - headerHeight);
			if (currentScrollPosition > commentOffsetTop - 2 && currentScrollPosition > commentOffsetTop + 2) {
				previousComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (previousComment) {
			const scrollToPosition = Math.floor(previousComment.getBoundingClientRect().top + currentScrollPosition - headerHeight);
			window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
		}
	});
	container.append(prevBtn);

	// Create move handle
	const handle = document.createElement('div');
	handle.classList.add('re-root-scroll-handle');
	container.append(handle);
	makeDraggable(container, '.re-root-scroll-handle');

	// Create next button
	const nextBtn = document.createElement('div');
	nextBtn.setAttribute('id', 're-next-comment');
	// on click
	nextBtn.addEventListener('click', function () {
		// get all the elements of type "shreddit-comment"
		const reRootComments = Array.from(document.querySelectorAll('#comment-tree > shreddit-comment'));
		// get current postion
		const currentScrollPosition = Math.floor(window.scrollY);
		let nextComment = null;
		// find the next "shreddit-comment" element below the current scroll position
		for (let i = 0; i < reRootComments.length; i++) {
			const commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - headerHeight);
			if (currentScrollPosition < commentOffsetTop - 2 && currentScrollPosition < commentOffsetTop + 2) {
				nextComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (nextComment) {
			const scrollToPosition = Math.floor(nextComment.getBoundingClientRect().top + currentScrollPosition - headerHeight);
			window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
		}
	});
	container.append(nextBtn);

	// Append container to body
	document.querySelector('body').appendChild(container);
}

// Enable Scroll To Next Root Comment - RV1
function enableScrollToNextRootCommentRV1() {
	// Determine the header bar height based on enabled RE features
	// Only 6px padding, since there's no sticky header bar on default Old UI
	let headerHeight = 6;
	BROWSER_API.storage.sync.get(['moderniseOldReddit'], (result) => {
		if (result.moderniseOldReddit) {
			headerHeight = 60; // 48px header + 12px padding
		}
	});

	// Create button container
	const container = document.createElement('div');
	container.classList.add('re-scroll-to-comment-container');

	// Create previous button
	const prevBtn = document.createElement('div');
	prevBtn.setAttribute('id', 're-prev-comment');
	// on click
	prevBtn.addEventListener('click', function () {
		// get all the elements of type ".thing"
		const reRootComments = Array.from(document.querySelectorAll('.commentarea > div[id^="siteTable"] > .thing'));
		// get current postion
		const currentScrollPosition = Math.floor(window.scrollY);
		let previousComment = null;
		// find the previous ".thing" element above the current scroll position
		for (let i = reRootComments.length - 1; i >= 0; i--) {
			const commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - headerHeight);
			if (currentScrollPosition > commentOffsetTop - 2 && currentScrollPosition > commentOffsetTop + 2) {
				previousComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (previousComment) {
			const scrollToPosition = Math.floor(previousComment.getBoundingClientRect().top + currentScrollPosition - headerHeight);
			window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
		}
	});
	container.append(prevBtn);

	// Create move handle
	const handle = document.createElement('div');
	handle.classList.add('re-root-scroll-handle');
	container.append(handle);
	makeDraggable(container, '.re-root-scroll-handle');

	// Create next button
	const nextBtn = document.createElement('div');
	nextBtn.setAttribute('id', 're-next-comment');
	// on click
	nextBtn.addEventListener('click', function () {
		// get all the elements of type ".thing"
		const reRootComments = Array.from(document.querySelectorAll('.commentarea > div[id^="siteTable"] > .thing'));
		// get current postion
		const currentScrollPosition = Math.floor(window.scrollY);
		let nextComment = null;
		// find the next ".thing" element below the current scroll position
		for (let i = 0; i < reRootComments.length; i++) {
			const commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - headerHeight);
			if (currentScrollPosition < commentOffsetTop - 2 && currentScrollPosition < commentOffsetTop + 2) {
				nextComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (nextComment) {
			const scrollToPosition = Math.floor(nextComment.getBoundingClientRect().top + currentScrollPosition - headerHeight);
			window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
		}
	});
	container.append(nextBtn);

	// Append container to body
	document.querySelector('html').append(container);
}

// Disable Scroll To Next Root Comment - All
function disableScrollToNextRootCommentAll() {
	document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
		el.remove();
	});
}

// Set the position of the comment navigation buttons. Default to x: 48px, y: 50% (see RE_styles.css)
export function scrollToNextRootCommentPosition(pos) {
	if (pos.x !== -1 && pos.x !== '-1' && typeof pos.x !== 'undefined') {
		document.documentElement.style.setProperty('--re-scroll-to-root-comment-position', pos.x + '%');
	}
	if (pos.y !== -1 && pos.y !== '-1' && typeof pos.y !== 'undefined') {
		document.documentElement.style.setProperty('--re-scroll-to-root-comment-position-v', pos.y + (redditVersion === 'old' ? 'vh' : '%'));
	}
}

// Make the container draggable
function makeDraggable(element, handleSelector) {
	const handle = element.querySelector(handleSelector);
	let isDragging = false;
	let offsetX, offsetY, leftPercent, topPercent;

	handle.addEventListener('mousedown', (e) => {
		isDragging = true;
		const rect = element.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;
		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (!isDragging) return;

		const winWidth = window.innerWidth;
		const winHeight = window.innerHeight;
		const elemWidth = element.offsetWidth;
		const elemHeight = element.offsetHeight;

		let left = e.clientX - offsetX;
		let top = e.clientY - offsetY;

		left = Math.max(0, Math.min(left, winWidth - elemWidth));
		top = Math.max(0, Math.min(top, winHeight - elemHeight));

		leftPercent = (left / winWidth) * 100;
		topPercent = (top / winHeight) * 100;

		element.style.left = `${leftPercent}%`;
		element.style.top = `${topPercent}%`;
	});

	document.addEventListener('mouseup', () => {
		if (isDragging) {
			isDragging = false;
			scrollToNextRootCommentPosition({ x: leftPercent, y: topPercent });
			BROWSER_API.runtime.sendMessage({ SaveScrollToNextRootCommentPosition: { x: leftPercent, y: topPercent } });
		}
	});
}

export function scrollToNextRootCommentRemoveStyle() {
	document.querySelector('.re-scroll-to-comment-container').removeAttribute('style');
}
