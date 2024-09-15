/* ===== Tweaks - Hide - Create Post ===== */

/* === Triggered On Page Load === */
export function loadHideCreatePost() {
	BROWSER_API.storage.sync.get(['hideCreatePost'], function (result) {
		hideCreatePost(result.hideCreatePost);
	});
}

/* === Main Function === */
export function hideCreatePost(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableHideCreatePostNew();
		} else if (value === false) {
			disableHideCreatePostNew();
		}
	}
}

// Function - Enable Hide Create Post - New
function enableHideCreatePostNew() {
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

// Function - Disable Hide Create Post - New
function disableHideCreatePostNew() {
	if (useLegacy) {
		document.querySelector('.re-create-post').classList.remove('re-hide');
	} else {
		const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-create-post"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
