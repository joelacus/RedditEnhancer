/* ===== Tweaks - Style - Classic Post Height ===== */

/* === Triggered On Page Load === */
export function loadLargerClassicPost() {
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		if (result.largerClassicPost) largerClassicPost(true);
	});
}

/* === Main Function === */
export function largerClassicPost(value) {
	if (redditVersion === 'old' && value) {
		enableLargerClassicPostOld();
	} else if (redditVersion === 'new' && value) {
		enableLargerClassicPostNew();
	} else {
		disableLargerClassicPostAll();
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Larger Classic Post - Old
function enableLargerClassicPostOld() {
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

// Function - Enable Larger Classic Post - New
function enableLargerClassicPostNew() {
	if (!document.head.querySelector('style[id="re-larger-classic-post"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-larger-classic-post';
		styleElement.textContent = `.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) > div:has(.Post) {
										display: flex;
										flex-direction: column;
										grid-gap: 8px;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) .Post {
										border-radius: 4px;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) > div:has(.Post) > div [data-click-id="image"] {
										width: 170px;
										height: 120px;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) > div:has(.Post) [data-click-id="background"] > div:first-child > div:first-child {
										height: 130px;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) > div:has(.Post) [data-click-id="background"] > div > div:first-child > div:first-child {
										height: 120px;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) > div:has(.Post) [data-click-id="background"] > div > [data-click-id="body"] > div:last-child {
										bottom: 10px;
									}
									.ListingLayout-backgroundContainer + div > :last-child > :first-child:has(#LayoutSwitch--picker .icon-view_classic) > div:has(.Post) [data-click-id="body"] h3 {
										font-size: 18px;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Larger Classic Post - All
function disableLargerClassicPostAll() {
	const dynamicStyleElements = document.head.querySelectorAll('#re-larger-classic-post');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
