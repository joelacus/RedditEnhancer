/* ===== Tweaks - Style - Multicoloured Thread Lines ===== */

// Set the post page comment thread lines to different colours depending on the comment depth.

/* === Triggered On Page Load === */
export function loadMulticolouredThreadLines() {
	BROWSER_API.storage.sync.get(['multicolouredThreadLines'], function (result) {
		if (result.multicolouredThreadLines) multicolouredThreadLines(true);
	});
}

/* === Main Function === */
export function multicolouredThreadLines(value, colours) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableMulticolouredThreadLines(colours);
		} else if (value === false) {
			disableMulticolouredThreadLines();
		}
	}
}

// Function - Enable Multicoloured Thread Lines
function enableMulticolouredThreadLines() {
	BROWSER_API.storage.sync.get(['multicolouredThreadLinesColours'], function (result) {
		// Get Colours, or set default
		const default_colours = ['#e40303', '#ff8c00', '#ffed00', '#388e3c', '#0070ff', '#7e49db', '#f44ae2', '#03e4cf', '#028ed3', '#744f95'];
		let colours = default_colours;
		colours.push.apply(colours, default_colours);
		if (result.multicolouredThreadLinesColours) {
			colours = result.multicolouredThreadLinesColours.replaceAll(' ', '').split(',');
			colours.push.apply(colours, default_colours);
		}

		// Reset Thread Lines
		disableMulticolouredThreadLines();

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
	});
}

// Function - Disable Multicoloured Thread Lines
function disableMulticolouredThreadLines() {
	document.querySelectorAll('shreddit-comment').forEach((comment) => {
		comment.style.removeProperty('--color-tone-4');
	});
}
