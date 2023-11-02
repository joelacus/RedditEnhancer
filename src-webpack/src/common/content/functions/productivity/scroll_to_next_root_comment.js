// Scroll To Next Root Comment
let scrollToNextRootComment = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value == true || value == undefined) {
			var link = window.location.href;
			if (link.match('https://.*.reddit.com/r/.*/comments/.*')) {
				// Remove existing buttons
				if (document.querySelector('.re-scroll-to-comment-container') != null) {
					document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
						el.remove();
					});
				}

				// Find all root comments and add class
				function find_root_comments() {
					document.querySelectorAll('.Comment').forEach(function (comment) {
						if (window.getComputedStyle(comment.querySelector('.icon-expand').parentElement).getPropertyValue('opacity') == 0) {
							const previousSibling = comment.previousElementSibling;
							if (previousSibling && previousSibling.childElementCount === 1) {
								comment.classList.add('re-root-comment');
							}
						}
					});
				}

				// Create button container
				const container = document.createElement('div');
				container.classList.add('re-scroll-to-comment-container');

				// Create previous button
				const prevBtn = document.createElement('div');
				prevBtn.setAttribute('id', 're-prev-comment');
				prevBtn.setAttribute('class', 'icon icon-up');
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
				nextBtn.setAttribute('class', 'icon icon-down');
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
			} else {
				document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
					el.remove();
				});
			}
		} else if (value == false) {
			document.querySelectorAll('.re-scroll-to-comment-container').forEach(function (el) {
				el.remove();
			});
		}
	}
};
export { scrollToNextRootComment };

// Scroll To Next Root Comment Position
let scrollToNextRootCommentPosition = function (value) {
	var link = window.location.href;
	if (link.indexOf('old.reddit.com') >= 0) {
		// old reddit
		// do nothing
	} else {
		// new reddit
		if (value === '-1') {
			document.documentElement.style.setProperty('--re-scroll-to-root-comment-position', '48px');
		} else {
			document.documentElement.style.setProperty('--re-scroll-to-root-comment-position', value + '%');
		}
	}
};

export { scrollToNextRootCommentPosition };
