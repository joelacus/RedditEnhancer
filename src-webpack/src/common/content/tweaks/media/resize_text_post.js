/**
 * Tweaks: Media - Resize Text Post
 *
 * @name resizeTextPostHeight
 * @description Resize the text preview height of text posts.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadResizeTextPostHeight() {
	BROWSER_API.storage.sync.get(['textPostPreviewMaxHeight'], function (result) {
		if (result.textPostPreviewMaxHeight) setTextPostPreviewMaxHeight(result.textPostPreviewMaxHeight);
	});
}

/* === Enable/Disable The Feature === */
export function resizeTextPostHeight(value) {
	if (redditVersion === 'newnew' && value) {
		enableResizeTextPostHeightRV3();
	} else {
		disableResizeTextPostHeightAll();
	}
}

// Enable Resize Text Post Height - RV3
function enableResizeTextPostHeightRV3() {
	if (!document.head.querySelector('style[id="re-resize-text-post-height"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-resize-text-post-height';
		styleElement.textContent = `shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > p, 
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > object,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > hr {
									    display: block !important;
									    margin: 0 0 .75rem 0 !important; /* Adjust paragraph spacing here */
									    overflow: inherit;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview strong,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table th {
									    font-weight: 700;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview em {
									    font-style: italic;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview sup {
									    font-size: 83.33%;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview ol,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview ul {
									    overflow: inherit;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre,
									div.md pre {
									    padding: 0.5rem;
									    background-color: var(--color-tone-5);
									    border: none;
									    border-radius: 0;
									    font-size: 1em;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > blockquote {
										display: block !important;
									    margin: 0 0 1rem 0;
									    padding: 0 0 0 1rem;
									    border-left: 5px solid var(--color-tone-5);
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > blockquote > * {
										display: block !important;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > blockquote > :not(:last-child) {
										margin-bottom: .75rem; /* Adjust paragraph spacing here */
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table {
									    display: table !important;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table thead {
										display: table-header-group !important;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table tbody {
										display: table-row-group !important;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table tr {
									    display: table-row !important;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table th,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table td {
									    display: table-cell !important;
									    padding: .5rem;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table .align-left {
									    text-align: left;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table thead tr,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table tr:nth-child(2n) {
									    background-color: var(--color-tone-6);
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > blockquote::before,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > blockquote::after,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table::before,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > table::after,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre::before,
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview > pre::after {
									    content: none;
									}
									shreddit-post:not([view-context="BrandPostPerformanceFeed"]) div.md.feed-card-text-preview {
									    max-height: var(--re-text-post-preview-max-height, 250px);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}
}

// Disable Resize Text Post Height - All
function disableResizeTextPostHeightAll() {
	const dynamicStyleElements = document.head.querySelectorAll('style[id="re-resize-text-post-height"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Set The Custom Max Height
export function setTextPostPreviewMaxHeight(value) {
	enableResizeTextPostHeightRV3();
	if (value && value > 0) {
		document.documentElement.style.setProperty('--re-text-post-preview-max-height', value + 'px');
	} else {
		document.documentElement.style.removeProperty('--re-text-post-preview-max-height');
	}
}
