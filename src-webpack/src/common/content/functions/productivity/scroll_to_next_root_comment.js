// Scroll To Next Root Comment
export function scrollToNextRootComment(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			const link = window.location.href;
			if (link.match('https://.*.reddit.com/r/.*/comments/.*')) {
				enableScrollToNextRootCommentNew();
			} else {
				disableScrollToNextRootCommentAll();
			}
		} else if (value === false || value === undefined) {
			disableScrollToNextRootCommentAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			const link = window.location.href;
			if (link.match('https://.*.reddit.com/r/.*/comments/.*')) {
				enableScrollToNextRootCommentNewNew();
			} else {
				disableScrollToNextRootCommentAll();
			}
		} else if (value === false || value === undefined) {
			disableScrollToNextRootCommentAll();
		}
	}
}

// Function - Enable Scroll To Next Root Comment - New
function enableScrollToNextRootCommentNew() {
	// Remove existing buttons
	if (document.querySelector('.re-scroll-to-comment-container') != null) {
		document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
			el.remove();
		});
	}

	// Find all root comments and add class
	function find_root_comments() {
		document.querySelectorAll('.Comment').forEach(function (comment) {
			if (!comment.classList.contains('re-root-comment')) {
				if (window.getComputedStyle(comment.querySelector('.icon-expand').parentElement).getPropertyValue('opacity') == 0) {
					const previousSibling = comment.previousElementSibling;
					if (previousSibling && previousSibling.childElementCount === 1) {
						comment.classList.add('re-root-comment');
					}
				}
			}
		});
	}
	// init root comment classes
	setTimeout(() => {
		find_root_comments();
	}, 5000);

	// Create button container
	const container = document.createElement('div');
	container.classList.add('re-scroll-to-comment-container');

	// Create previous button
	const prevBtn = document.createElement('div');
	prevBtn.setAttribute('id', 're-prev-comment');
	// on click
	prevBtn.addEventListener('click', function () {
		// get all the elements with the class "re-root-comment"
		find_root_comments();
		const reRootComments = Array.from(document.getElementsByClassName('re-root-comment'));
		// get current postion
		if (document.querySelector('#overlayScrollContainer')) {
			var currentScrollPosition = document.querySelector('#overlayScrollContainer').scrollTop;
		} else {
			var currentScrollPosition = window.scrollY;
		}
		let previousComment = null;
		// find the previous "re-root-comment" element above the current scroll position
		for (let i = reRootComments.length - 1; i >= 0; i--) {
			if (document.querySelector('#overlayScrollContainer')) {
				var commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - 100);
			} else {
				var commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - 45);
			}
			if (commentOffsetTop < currentScrollPosition) {
				previousComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (previousComment) {
			if (document.querySelector('#overlayScrollContainer')) {
				const scrollToPosition = Math.floor(previousComment.getBoundingClientRect().top + currentScrollPosition - 100);
				document.querySelector('#overlayScrollContainer').scrollTo({ top: scrollToPosition, behavior: 'smooth' });
			} else {
				const scrollToPosition = Math.floor(previousComment.getBoundingClientRect().top + currentScrollPosition - 45);
				window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
			}
		}
	});
	container.append(prevBtn);

	// Create next button
	const nextBtn = document.createElement('div');
	nextBtn.setAttribute('id', 're-next-comment');
	// on click
	nextBtn.addEventListener('click', function () {
		// get all the elements with the class "re-root-comment"
		find_root_comments();
		const reRootComments = Array.from(document.getElementsByClassName('re-root-comment'));
		// get current postion
		if (document.querySelector('#overlayScrollContainer')) {
			var currentScrollPosition = document.querySelector('#overlayScrollContainer').scrollTop;
		} else {
			var currentScrollPosition = window.scrollY;
		}
		let nextComment = null;
		// find the next "re-root-comment" element below the current scroll position
		for (let i = 0; i < reRootComments.length; i++) {
			if (document.querySelector('#overlayScrollContainer')) {
				var commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - 100);
			} else {
				var commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - 45);
			}
			if (commentOffsetTop > currentScrollPosition) {
				nextComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (nextComment) {
			if (document.querySelector('#overlayScrollContainer')) {
				const scrollToPosition = Math.floor(nextComment.getBoundingClientRect().top + currentScrollPosition - 100);
				document.querySelector('#overlayScrollContainer').scrollTo({ top: scrollToPosition, behavior: 'smooth' });
			} else {
				const scrollToPosition = Math.floor(nextComment.getBoundingClientRect().top + currentScrollPosition - 45);
				window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
			}
		}
	});
	container.append(nextBtn);

	// Append container to body
	document.querySelector('body').appendChild(container);
}

// Function - Enable Scroll To Next Root Comment - New New
function enableScrollToNextRootCommentNewNew() {
	// Remove existing buttons
	if (document.querySelector('.re-scroll-to-comment-container') != null) {
		document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
			el.remove();
		});
	}

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
			const commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - 60);
			if (currentScrollPosition > commentOffsetTop - 2 && currentScrollPosition > commentOffsetTop + 2) {
				previousComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (previousComment) {
			const scrollToPosition = Math.floor(previousComment.getBoundingClientRect().top + currentScrollPosition - 60);
			window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
		}
	});
	container.append(prevBtn);

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
			const commentOffsetTop = Math.floor(reRootComments[i].getBoundingClientRect().top + currentScrollPosition - 60);
			if (currentScrollPosition < commentOffsetTop - 2 && currentScrollPosition < commentOffsetTop + 2) {
				nextComment = reRootComments[i];
				break;
			}
		}
		// scroll to comment
		if (nextComment) {
			const scrollToPosition = Math.floor(nextComment.getBoundingClientRect().top + currentScrollPosition - 60);
			window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
		}
	});
	container.append(nextBtn);

	// Append container to body
	document.querySelector('body').appendChild(container);
}

// Function - Disable Scroll To Next Root Comment - All
function disableScrollToNextRootCommentAll() {
	document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
		el.remove();
	});
}

// Scroll To Next Root Comment Position Horizontal
export function scrollToNextRootCommentPosition(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		if (value === '-1' || typeof value === 'undefined') {
			document.documentElement.style.setProperty('--re-scroll-to-root-comment-position', '48px');
		} else {
			document.documentElement.style.setProperty('--re-scroll-to-root-comment-position', value + '%');
		}
	}
}

// Scroll To Next Root Comment Position Vertical
export function scrollToNextRootCommentPositionV(value) {
	if (redditVersion === 'new' || redditVersion === 'newnew') {
		if (value === '-1' || typeof value === 'undefined') {
			document.documentElement.style.setProperty('--re-scroll-to-root-comment-position-v', '50%');
		} else {
			document.documentElement.style.setProperty('--re-scroll-to-root-comment-position-v', value + '%');
		}
	}
}
