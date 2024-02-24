// Feed Post Height

export function postHeight(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enablePostHeightNew();
		} else if (value === false) {
			disablePostHeightNew();
		}
	}
}

// Function - Set Height
export function postHeightSize(value) {
	if (redditVersion === 'new') {
		if (value > 99 && value <= 1000) {
			document.documentElement.style.setProperty('--re-max-post-height', value + 'px');
		} else {
			document.documentElement.style.removeProperty('--re-max-post-height');
		}
	}
}

// Function - Enable Post Height - New
function enablePostHeightNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-post-max-height';
	styleElement.textContent = `:root {
									--re-max-post-height: 800px
								}
								.Post div [data-click-id="media"], 
								.Post div[style*="max-height:"] {
									max-height: var(--re-max-post-height) !important;
									height: var(--re-max-post-height) !important;
								}
								.Post div[style^="height:"] {
									height: var(--re-max-post-height) !important;
								}
								.Post div[style^="max-height:"] > div,
								.Post div[style^="max-height:"] img,
								.Post div[style^="height:"]{
									min-height: var(--re-max-post-height) !important;
									object-fit: contain;
									background: none;
								}
								.Post figure div {
									width: 100%;
									align-items: flex-start;
								}
								.Post div:has(> img) {
									width: 100%;
								}
								.Post img {
									height: 100%;
									object-fit: contain;
								}
								.Post video {
									width: 100%;
								}
								.Post div[data-click-id="text"]:has(> .RichTextJSON-root),
								.Post div[data-click-id="text"] > .RichTextJSON-root {
									height: unset !important;
									min-height: unset !important;
								}
								[data-testid="post-container"] > [data-test-id="post-content"] > [data-click-id="media"] {
									max-height: var(--re-max-post-height) !important;
								}
								.Post div[data-click-id="text"]:has(> .RichTextJSON-root),
								.Post div[data-click-id="text"] > .RichTextJSON-root {
									height: unset !important;
									min-height: unset !important;
								}
								.Post .ImageBox-image {
									height: 100%;
								}
								.Post figure > div {
									height:inherit;
								}
								.Post figure a > div {
									height:inherit;
								}
								.Post figure img {
									width: 100%;
									height: 100%;
									object-fit: contain;
									overflow: hidden;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Post Height - New
function disablePostHeightNew() {
	document.documentElement.style.removeProperty('--re-max-post-height');
	const dynamicStyleElements = document.querySelectorAll('style[id="re-post-max-height"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
