/* ===== Tweaks - Productivity - Auto Expand Comments ===== */

/* === Triggered On Page Load === */
export function loadAutoExpandComments() {
	BROWSER_API.storage.sync.get(['autoExpandComments'], function (result) {
		autoExpandComments(result.autoExpandComments);
	});
}

/* === Main Function === */
export function autoExpandComments(value) {
	if (redditVersion === 'newnew' && value === true) {
		enableAutoExpandCommentsNewNew();
	} else if (redditVersion === 'new' && value === true) {
		enableAutoExpandCommentsNew();
	} else if (redditVersion === 'old' && value === true) {
		enableAutoExpandCommentsOld();
	} else if (value === false) {
		disableAutoExpandCommentsAll();
	}
}

let expand_comments_button;

// Function - Enable Auto Expand Comments - New New
function enableAutoExpandCommentsNewNew() {
	expand_comments_button = 'shreddit-comment[collapsed]';
	window.addEventListener('scroll', expandComments);
}

// Function - Enable Auto Expand Comments - New
function enableAutoExpandCommentsNew() {
	expand_comments_button = '.Comment:has(> button > .icon-expand) > :last-child.undefined';
	window.addEventListener('scroll', expandComments);
}

// Function - Enable Auto Expand Comments - Old
function enableAutoExpandCommentsOld() {
	expand_comments_button = '.comment.collapsed';
	window.addEventListener('scroll', expandComments);
}

// Function - Disable Auto Expand Comments - All
function disableAutoExpandCommentsAll() {
	window.removeEventListener('scroll', expandComments);
}

// Function to check for "expand comments" buttons on scroll
function expandComments() {
	// Get the current scroll position
	var scrollX = window.scrollX || window.pageXOffset;
	var scrollY = window.scrollY || window.pageYOffset;

	// Get the elements within the current scroll view
	var elementsInViewport = document.querySelectorAll(expand_comments_button);

	var visibleElements = [];

	elementsInViewport.forEach(function (element) {
		var rect = element.getBoundingClientRect();
		var elementX = rect.left + scrollX;
		var elementY = rect.top + scrollY;

		if (elementX >= scrollX && elementX <= scrollX + window.innerWidth && elementY >= scrollY && elementY <= scrollY + window.innerHeight) {
			visibleElements.push(element);
		}
	});

	// Expand Comments
	if (redditVersion === 'newnew') {
		for (let i = 0; i < visibleElements.length; i++) {
			if (visibleElements[i].getAttribute('author') != 'AutoModerator') {
				visibleElements[i].removeAttribute('collapsed');
			}
		}
	} else if (redditVersion === 'new') {
		for (let i = 0; i < visibleElements.length; i++) {
			if (!visibleElements[i].querySelector('[id^="CommentTopMeta--Mod"]')) {
				if (window.getComputedStyle(visibleElements[i].parentElement.parentElement).display === 'block') {
					visibleElements[i].parentElement.querySelector('button').click();
				}
			}
		}
	} else if (redditVersion === 'old') {
		for (let i = 0; i < visibleElements.length; i++) {
			if (visibleElements[i].getAttribute('data-author') != 'AutoModerator') {
				visibleElements[i].classList.remove('collapsed');
				visibleElements[i].classList.add('noncollapsed');
				visibleElements[i].querySelector('.expand').textContent = '[–]';
			}
		}
	}
}
