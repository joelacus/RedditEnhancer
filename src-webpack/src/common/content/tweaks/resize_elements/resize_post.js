/* ===== Tweaks - Resize Text Post ===== */

/* === Triggered On Page Load === */
export function loadResizePostHeight() {
	BROWSER_API.storage.sync.get(['textPostPreviewMaxHeight'], function (result) {
		if (result.textPostPreviewMaxHeight) setTextPostPreviewMaxHeight(result.textPostPreviewMaxHeight);
	});
}

/* === Main Function === */
export function resizeTextPostHeight(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableResizeTextPostHeightNewNew();
		} else if (value === false) {
			disableResizeTextPostHeightNewNew();
		}
	}
}

/* === Enable/Disable Functions === */

// Function - Enable Resize Text Post Height - New New
function enableResizeTextPostHeightNewNew() {
	if (!document.head.querySelector('style[id="re-resize-text-post-height"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-resize-text-post-height';
		styleElement.textContent = `shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > p, 
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > p ~ object,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > hr {
									    display: block !important;
									    margin: 0 0 .75rem 0 !important; /* Adjust paragraph spacing here */
									    overflow: inherit;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview ol,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview ul {
									    overflow: inherit;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview {
									    max-height: var(--re-text-post-preview-max-height, 250px);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Resize Text Post Height - New New
function disableResizeTextPostHeightNewNew() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-resize-text-post-height"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Function - Set The Custom Max Height
export function setTextPostPreviewMaxHeight(value) {
	enableResizeTextPostHeightNewNew();
	if (value && value > 0) {
		document.documentElement.style.setProperty('--re-text-post-preview-max-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-text-post-preview-max-height');
	}
}

/* ===== Tweaks - Resize Image Post ===== */

/* === Triggered On Page Load === 
export function loadResizeImagePostHeight() {
	BROWSER_API.storage.sync.get(['resizeImagePostHeight'], function (result) {
		if (result.resizeImagePostHeight) resizeImagePostHeight(true);
	});
}*/

/* === Main Function === 
export function resizeImagePostHeight(value) {
	if (redditVersion === 'newnew') {
		if (value === true) {
			enableResizeImagePostHeightNewNew();
		} else if (value === false) {
			disableResizeImagePostHeightNewNew();
		}
	}
}*/

/* === Enable/Disable Functions === 

// Function - Enable Resize Image Post Height - New New
function enableResizeImagePostHeightNewNew() {
	if (!document.head.querySelector('style[id="re-resize-image-post-height"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-resize-image-post-height';
		styleElement.textContent = `shreddit-post:has(shreddit-aspect-ratio) [slot="post-media-container"] {
										max-height: 100px;
										display: flex;
										flex-direction: column;
										justify-content: center;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Function - Disable Resize Image Post Height - New New
function disableResizeImagePostHeightNewNew() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-resize-image-post-height"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}*/
