// Scale Tall Images To Fit Post
export function fitImage(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			document.querySelector('body').classList.remove('re-image-scroll');
			document.querySelector('body').classList.add('re-fit-image');
		} else if (value === false) {
			document.querySelector('body').classList.remove('re-fit-image');
		}
	}
}

// Add Scroll Bar To Tall Images
export function imageScroll(value) {
	if (redditVersion === 'new') {
		if (value === true) {
			enableImageScrollNew();
		} else if (value === false) {
			disableImageScrollNew();
		}
	} else if (redditVersion === 'newnew') {
		if (value === true) {
			enableImageScrollNewNew();
		} else if (value === false) {
			disableImageScrollNewNew();
		}
	}
}

// Function - Enable Image Scroll - New
function enableImageScrollNew() {
	document.querySelector('body').classList.remove('re-fit-image');
	document.querySelector('body').classList.add('re-image-scroll');
}

// Function - Disable Image Scroll - New
function disableImageScrollNew() {
	document.querySelector('body').classList.remove('re-image-scroll');
}

// Function - Enable Image Scroll - New New
function enableImageScrollNewNew() {
	const styleElement = document.createElement('style');
	styleElement.id = 're-image-scroll';
	styleElement.textContent = `shreddit-app shreddit-post shreddit-aspect-ratio div {
									overflow-y: scroll !important;
								}
								shreddit-app shreddit-post shreddit-aspect-ratio div a {
									display: flex;
									justify-content: center;
								}
								shreddit-app shreddit-post shreddit-aspect-ratio div a:last-child img {
									width: 90% !important;
									object-fit: cover;
									min-height: fit-content;
									object-position: top;
									max-height: none;
								}`;
	document.head.insertBefore(styleElement, document.head.firstChild);
}

// Function - Disable Image Scroll - New New
function disableImageScrollNewNew() {
	const dynamicStyleElements = document.querySelectorAll('style[id="re-image-scroll"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}
