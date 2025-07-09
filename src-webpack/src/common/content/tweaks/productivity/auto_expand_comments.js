/**
 * Tweaks: Productivity - Auto Expand Comments
 *
 * @name autoExpandComments
 * @description Automatically expand collapsed comments as the user scrolls down the post comments page.
 *
 * Compatibility: RV1 (Old UI) (2005-), RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadAutoExpandComments() {
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		if (result.autoExpandComments) autoExpandComments(true);
	});
}

/* === Enable/Disable The Feature === */
export function autoExpandComments(value) {
	if (redditVersion === 'newnew' && value) {
		enableAutoExpandCommentsRV3();
	} else if (redditVersion === 'old' && value) {
		enableAutoExpandCommentsRV1();
	} else {
		disableAutoExpandCommentsAll();
	}
}

let comment_id;

// Enable Auto Expand Comments - RV3
function enableAutoExpandCommentsRV3() {
	comment_id = 'shreddit-comment';
	window.addEventListener('scroll', expandComments);
}

// Enable Auto Expand Comments - RV1
function enableAutoExpandCommentsRV1() {
	comment_id = '.comment.collapsed';
	window.addEventListener('scroll', expandComments);
}

// Disable Auto Expand Comments - All
function disableAutoExpandCommentsAll() {
	window.removeEventListener('scroll', expandComments);
}

// Function to check for collapsed comment threads on scroll
function expandComments() {
	// Get the current scroll position
	const scrollX = window.scrollX || window.pageXOffset;
	const scrollY = window.scrollY || window.pageYOffset;

	// Get the comments within the current scroll view
	const comments = document.querySelectorAll(comment_id);
	let visibleComments = [];
	comments.forEach(function (element) {
		const rect = element.getBoundingClientRect();
		const elementX = rect.left + scrollX;
		const elementY = rect.top + scrollY;
		if (elementX >= scrollX && elementX <= scrollX + window.innerWidth && elementY >= scrollY && elementY <= scrollY + window.innerHeight) {
			visibleComments.push(element);
		}
	});

	// Expand the comments
	if (redditVersion === 'newnew') {
		for (let i = 0; i < visibleComments.length; i++) {
			if (visibleComments[i].getAttribute('author') != 'AutoModerator') {
				// auto expand comments if not collapsed by the user
				if (visibleComments[i].getAttribute('re-keep-collapsed') !== 'true') {
					if (visibleComments[i].nodeName === 'SHREDDIT-COMMENT') {
						visibleComments[i].removeAttribute('collapsed');
					}
					if (visibleComments[i].querySelector('[loading="action"][slot^="children"]')) {
						setTimeout(() => {
							visibleComments[i].querySelector('[loading="action"][slot^="children"]').click();
						}, 100);
					}
				}

				// add an event listener to remember if the user has collapsed a comment thread
				setTimeout(() => {
					if (!visibleComments[i].hasAttribute('re-keep-collapsed') && visibleComments[i].shadowRoot.querySelector('button')) {
						visibleComments[i].setAttribute('re-keep-collapsed', false);
						visibleComments[i].shadowRoot.querySelector('button').addEventListener('click', function (e) {
							const keep_collapsed = visibleComments[i].getAttribute('re-keep-collapsed');
							visibleComments[i].setAttribute('re-keep-collapsed', keep_collapsed === 'false' ? true : false);
						});
					}
				}, 150);
			}
		}
	} else if (redditVersion === 'old') {
		for (let i = 0; i < visibleComments.length; i++) {
			if (visibleComments[i].getAttribute('data-author') != 'AutoModerator') {
				visibleComments[i].classList.remove('collapsed');
				visibleComments[i].classList.add('noncollapsed');
				visibleComments[i].querySelector('.expand').textContent = '[–]';
			}
		}
	}
}
