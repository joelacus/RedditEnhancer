/* ===== Tweaks - Hide - Create Post ===== */

/* === Triggered On Page Load === */
export function loadHideCreatePost() {
	BROWSER_API.storage.sync.get(['hideCreatePost'], function (result) {
		if (result.hideCreatePost) hideCreatePost(true);
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

/* === Enable/Disable Functions === */

// Function - Enable Hide Create Post - New
function enableHideCreatePostNew() {
	if (useLegacy) {
		document.querySelector('.re-create-post').classList.add('re-hide');
	} else {
		if (!document.head.querySelector('style[id="re-hide-create-post"]')) {
			const styleElement = document.createElement('style');
			styleElement.id = 're-hide-create-post';
			styleElement.textContent = `div:has(> input[name="createPost"]) {
											display: none;
										}`;
			document.head.insertBefore(styleElement, document.head.firstChild);
		}
	}
}

// Function - Disable Hide Create Post - New
function disableHideCreatePostNew() {
	if (useLegacy) {
		document.querySelector('.re-create-post').classList.remove('re-hide');
	} else {
		const dynamicStyleElements = document.head.querySelectorAll('style[id="re-hide-create-post"]');
		dynamicStyleElements.forEach((element) => {
			document.head.removeChild(element);
		});
	}
}
