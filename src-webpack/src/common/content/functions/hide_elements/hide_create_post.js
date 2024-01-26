// Hide Create Post

export function hideCreatePost(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			hideCreatePostNew();
		} else if (value === false) {
			showCreatePostNew();
		}
	}
}

// Function - Hide Create Post - New
function hideCreatePostNew() {
	if (useLegacy) {
		document.querySelector('.re-create-post').classList.add('re-hide');
	} else {
		const styleElement = document.createElement('style');
		styleElement.id = 're-hide-create-post';
		styleElement.textContent = `div:has(> input[name="createPost"]) {
									display: none;
								}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Show Create Post - New
function showCreatePostNew() {
	if (useLegacy) {
		document.querySelector('.re-create-post').classList.remove('re-hide');
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-create-post"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
