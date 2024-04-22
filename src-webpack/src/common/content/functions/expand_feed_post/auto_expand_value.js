/* ===== Tweaks - Expand Feed/Post - Auto Expand Feed/Post To 100% At Value ===== */

/* === Triggered On Page Load === */
export function loadAutoExpandValue() {
	BROWSER_API.storage.sync.get(['autoExpandValue'], function (result) {
		autoExpandValue(result.autoExpandValue);
	});
}

/* === Main Function === */
export function autoExpandValue(widthVariable) {
	if (redditVersion === 'old' || redditVersion === 'new') {
		disableAutoExpandValue();
		enableAutoExpandValue(widthVariable);
	} else if (redditVersion === 'newnew') {
		disableAutoExpandValue();
		enableAutoExpandValueNewNew(widthVariable);
	}
}

// Function - Enable Auto Expand Value - New
function enableAutoExpandValue(widthVariable) {
	const styleElement = document.createElement('style');
	styleElement.id = 're-auto-expand-layout';
	styleElement.textContent = `@media only screen and (max-width: ${widthVariable}px) {
									.ListingLayout-backgroundContainer + div > :last-child > :first-child,
									#re-container {
										--re-content-width: 100% !important;
										--re-sub-width: 100% !important;
										--re-post-width: 100% !important;
										--re-post-overlay-width: 100% !important;
										--re-user-profile-width: 100% !important;
									}
									.ListingLayout-backgroundContainer + div > :last-child,
									#re-container {
										overflow-x: unset !important;
										transform: none !important;
									}
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Auto Expand Value - New
function disableAutoExpandValue() {
	const dynamicStyleElements1 = document.querySelectorAll('style[id="re-auto-expand-layout"]');
	dynamicStyleElements1.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Enable Auto Expand Value - New New
function enableAutoExpandValueNewNew(widthVariable) {
	const styleElement = document.createElement('style');
	styleElement.id = 're-auto-expand-layout';
	styleElement.textContent = `@media only screen and (max-width: ${widthVariable}px) {
									.subgrid-container {
										width: 100% !important;
									}
									.main-container {
										margin: 0 !important;
									}
									#main-content {
										max-width: 100% !important;
										--re-content-width: 100% !important;
										--re-sub-width: 100% !important;
										--re-post-width: 100% !important;
										--re-post-overlay-width: 100% !important;
										--re-user-profile-width: 100% !important;
										transform: none !important;
									}
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}
