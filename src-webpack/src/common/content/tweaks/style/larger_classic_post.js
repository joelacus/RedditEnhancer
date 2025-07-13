/**
 * Tweaks: Style - Classic Post Height
 *
 * @name largerClassicPost
 * @description Make the posts on feeds slightly larger.
 *
 * Compatibility: RV1 (Old UI) (2005-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadLargerClassicPost() {
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		if (result.largerClassicPost) largerClassicPost(true);
	});
}

/* === Enable/Disable The Feature === */
export function largerClassicPost(value) {
	if (redditVersion === 'old' && value) {
		enableLargerClassicPostRV1();
	} else {
		disableLargerClassicPostAll();
	}
}

// Enable Larger Classic Post - RV1
function enableLargerClassicPostRV1() {
	if (!document.head.querySelector('style[id="re-larger-classic-post"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-larger-classic-post';
		styleElement.textContent = `#siteTable .thing .thumbnail {
										display: flex;
										justify-content: center;
										height: 120px;
										width: 170px;
										border-radius: 4px;
										margin-right: 10px;
									}
									#siteTable .thing .thumbnail.self,
									#siteTable .thing .thumbnail.default,
									#siteTable .thing .thumbnail.image,
									#siteTable .thing .thumbnail.nsfw,
									#siteTable .thing .thumbnail.spoiler {
										height: 50px;
										width: 70px;
									}
									#siteTable .thing .thumbnail img {
										height: 100%;
										width: auto;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Larger Classic Post - All
function disableLargerClassicPostAll() {
	const dynamicStyleElements = document.head.querySelectorAll('#re-larger-classic-post');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
