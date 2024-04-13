/* ===== Tweaks - Hide - NSFW Posts ===== */

/* === Triggered On Page Load === */
export function loadHideNSFW() {
	BROWSER_API.storage.sync.get(['hideNSFW'], function (result) {
		hideNSFW(result.hideNSFW);
	});
}

/* === Main Function === */
export function hideNSFW(value) {
	if (redditVersion === 'old') {
		if (value === true) {
			enableHideNsfwPostsOld();
		} else if (value === false) {
			disableHideNsfwPostsAll();
		}
	} else if (redditVersion === 'new') {
		if (value === true) {
			enableHideNsfwPostsNew();
		} else if (value === false) {
			disableHideNsfwPostsAll();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableHideNsfwPostsNewNew();
		} else if (value === false) {
			disableHideNsfwPostsAll();
		}
	}
}

// Function - Enable Hide NSFW Posts - Old
function enableHideNsfwPostsOld() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-nsfw-posts';
	styleElement.textContent = `#siteTable > .thing:has(.nsfw-stamp) {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide NSFW Posts - New
function enableHideNsfwPostsNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-nsfw-posts';
	styleElement.textContent = `#AppRouter-main-content .Post:has(span[style="border:1px solid #FF585B;color:#FF585B"]),
									#AppRouter-main-content .Post:has([style="border: 1px solid rgb(255, 88, 91); color: rgb(255, 88, 91);"]) {
										display: none !important;
									}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Enable Hide NSFW Posts - New New
function enableHideNsfwPostsNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-hide-nsfw-posts';
	styleElement.textContent = `shreddit-app shreddit-post:has([reason="nsfw"]) {
									display: none !important;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Hide NSFW Posts - All
function disableHideNsfwPostsAll() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-hide-nsfw-posts"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
