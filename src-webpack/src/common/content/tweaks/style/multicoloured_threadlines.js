/**
 * Tweaks: Style - Multicoloured Thread Lines
 *
 * @name multicolouredThreadLines
 * @description Set the post page comment thread lines to different colours depending on the comment depth.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

// Module state
let observer = null;
let currentColours = [];

// ─── Run by Tweak Loader when the Page Loads ────────────────────────────────

export function loadMulticolouredThreadLines() {
	BROWSER_API.storage.sync.get(['multicolouredThreadLines'], function (result) {
		if (result.multicolouredThreadLines === true) multicolouredThreadLines(true);
	});
}

// ─── Enable/Disable The Feature ─────────────────────────────────────────────

export function multicolouredThreadLines(value, colours) {
	const routeName = document.querySelector('shreddit-app')?.getAttribute('routename');
	const feedRoutes = ['post_page', 'comments_page'];
	if (redditVersion === 'newnew' && value && feedRoutes.includes(routeName)) {
		enableMulticolouredThreadLinesRV3(colours);
	} else {
		disableMulticolouredThreadLinesRV3();
	}
}

// Enable Multicoloured Thread Lines - RV3
function enableMulticolouredThreadLinesRV3() {
	BROWSER_API.storage.sync.get(['multicolouredThreadLinesColours'], function (result) {
		console.log('RUN');
		// Get Colours, or set default
		const default_colours = ['#3D8AB4', '#813AB4', '#789B36', '#DF8A35', '#C7433C', '#C73D7B', '#51DBA6'];
		//['#e40303', '#ff8c00', '#ffed00', '#388e3c', '#0070ff', '#7e49db', '#f44ae2', '#03e4cf', '#028ed3', '#744f95'];

		let colours = default_colours;
		colours.push.apply(colours, default_colours);
		if (result.multicolouredThreadLinesColours) {
			colours = result.multicolouredThreadLinesColours.replaceAll(' ', '').split(',');
			colours.push.apply(colours, default_colours);
		}

		// Store current colours for mutation observer
		currentColours = colours;

		// Reset Thread Lines
		document.querySelectorAll('shreddit-comment').forEach((comment) => {
			comment.style.removeProperty('--color-tone-4');
		});

		// Select all root comments
		const elements = document.querySelectorAll('shreddit-comment-tree > shreddit-comment');

		// Iterate over all root comments and search for sub comments
		elements.forEach((element) => {
			element.style.setProperty('--color-tone-4', colours[0]);
			searchForSubComments(element, 1);
		});

		// Recursively search for sub comments
		function searchForSubComments(element, depth) {
			const subComments = element.querySelectorAll('shreddit-comment');
			subComments.forEach((sub_comments) => {
				// Don't set the property if it has already been set
				if (!sub_comments.style?.getPropertyValue('--color-tone-4')) {
					sub_comments.style.setProperty('--color-tone-4', colours[depth]);
					// Go deeper
					searchForSubComments(sub_comments, depth + 1);
				}
			});
		}

		// Setup MutationObserver to handle dynamically added comments
		observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((addedNode) => {
					if (addedNode.nodeType !== Node.ELEMENT_NODE) return;
					if (addedNode.matches('shreddit-comment')) {
						processNewComment(addedNode);
					}
					addedNode.querySelectorAll('shreddit-comment').forEach(processNewComment);
				});
			});
		});

		// Observe all comment trees
		document.querySelectorAll('shreddit-comment-tree').forEach((tree) => {
			observer.observe(tree, { childList: true, subtree: true });
		});
	});
}

// Disable Multicoloured Thread Lines - RV3
function disableMulticolouredThreadLinesRV3() {
	document.querySelectorAll('shreddit-comment').forEach((comment) => {
		comment.style.removeProperty('--color-tone-4');
	});
	if (observer) {
		observer.disconnect();
		observer = null;
	}
}

// ─── Helper Functions ───────────────────────────────────────────────────────

function getCommentDepth(comment) {
	let depth = 0;
	let parent = comment.parentElement;
	while (parent) {
		if (parent.tagName === 'SHREDDIT-COMMENT') {
			depth++;
		} else if (parent.tagName === 'SHREDDIT-COMMENT-TREE') {
			break;
		}
		parent = parent.parentElement;
	}
	return depth;
}

function processNewComment(comment) {
	// Skip if already processed
	if (comment.style.getPropertyValue('--color-tone-4')) return;

	const depth = getCommentDepth(comment);
	comment.style.setProperty('--color-tone-4', currentColours[depth] || currentColours[currentColours.length - 1]);

	// Recursively process any existing sub-comments
	(function recurse(commentElement, currentDepth) {
		const subComments = commentElement.querySelectorAll('shreddit-comment');
		subComments.forEach((sub) => {
			if (!sub.style.getPropertyValue('--color-tone-4')) {
				sub.style.setProperty('--color-tone-4', currentColours[currentDepth] || currentColours[currentColours.length - 1]);
				recurse(sub, currentDepth + 1);
			}
		});
	})(comment, depth + 1);
}
