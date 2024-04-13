/* ===== Tweaks - Style - Classic Post Height ===== */

/* === Triggered On Page Load === */
export function loadLargerClassicPost() {
	BROWSER_API.storage.sync.get(['largerClassicPost'], function (result) {
		largerClassicPost(result.largerClassicPost);
	});
}

/* === Main Function === */
export function largerClassicPost(value) {
	if (redditVersion === 'old' && value === true) {
		enableLargerClassicPostOld();
	} else if (redditVersion === 'new' && value === true) {
		if (useLegacy) {
			enableLargerClassicPostNewLegacy();
		} else {
			enableLargerClassicPostNew();
		}
	} else if (value === false) {
		disableLargerClassicPostAll();
	}
}

// Function - Enable Larger Classic Post - Old
function enableLargerClassicPostOld() {
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

// Function - Enable Larger Classic Post - New - Legacy
function enableLargerClassicPostNewLegacy() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-larger-classic-post';
	styleElement.textContent = `.re-feed-container.view-classic {
									display: flex;
									flex-direction: column;
									grid-gap: 8px;
								}
								.re-feed-container.view-classic .Post {
									border-radius: 4px;
								}
								.re-feed-container.view-classic > div [data-click-id="image"] {
									width: 170px;
									height: 120px;
								}
								.re-feed-container.view-classic [data-click-id="background"] > div:first-child > div:first-child {
									height: 130px;
								}
								.re-feed-container.view-classic [data-click-id="background"] > div > div:first-child > div:first-child {
									height: 120px;
								}
								.re-feed-container.view-classic [data-click-id="background"] > div > [data-click-id="body"] > div:last-child {
									bottom: 10px;
								}
								.re-feed-container.view-classic [data-click-id="body"] h3 {
									font-size: 18px;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);

	if (document.querySelector('.re-sort .icon-view_classic')) {
		document.querySelector('.re-feed-container').classList.add('view-classic');
	}
}

// Function - Enable Larger Classic Post - New
function enableLargerClassicPostNew() {
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

// Function - Disable Larger Classic Post - All
function disableLargerClassicPostAll() {
	const dynamicStyleElements = document.querySelectorAll('#re-larger-classic-post');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
