/**
 * Tweaks: Media - Replace Post Images With Links
 *
 * @name replacePostImagesWithLinks
 * @description Hide post images and show links instead on feeds.
 *
 * Compatibility: RV3 (New New UI) (2023-)
 */

/* === Run by Tweak Loader when the Page Loads === */
export function loadReplacePostImagesWithLinks() {
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks'], function (result) {
		replacePostImagesWithLinks(result.replacePostImagesWithLinks);
	});
}

/* === Enable/Disable The Feature === */
export function replacePostImagesWithLinks(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableReplacePostImagesWithLinks();
			if (document.querySelector('shreddit-feed')) {
				observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
			}
		} else {
			observer.disconnect();
			disableReplacePostImagesWithLinks();
		}
	}
}

// Enable Replace Images With Links - RV3
function enableReplacePostImagesWithLinks() {
	// Append Stylesheet
	if (!document.head.querySelector('style[id="re-replace-post-images-with-links"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-replace-post-images-with-links';
		styleElement.textContent = `.re-media-link {
										position: relative;
										display: block;
										margin-bottom: 12px;
										z-index: 9;
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	// Initial Image Posts (Single Images)
	document.querySelectorAll('shreddit-feed shreddit-post:has(img.preview-img)').forEach((post) => {
		if (post.querySelector('shreddit-blurred-container')) return;
		try {
			const url = post.querySelector('img.preview-img').src;
			if (post.querySelector(`.re-media-link[href="${url}"]`)) return;
			appendLink(post, url);
			post.querySelector('[slot="post-media-container"]').style.display = 'none';
		} catch (e) {}
	});

	// Initial Image Posts (Galleries)
	document.querySelectorAll('shreddit-feed shreddit-post:has(gallery-carousel)').forEach((post) => {
		if (post.querySelector('shreddit-blurred-container')) return;
		post.querySelectorAll('li > figure > img').forEach((img) => {
			if (img.getAttribute('data-re-link') === 'true') return;
			const url = img.src || img.getAttribute('data-lazy-src');
			if (!url) return;
			try {
				appendLink(post, url);
				img.setAttribute('data-re-link', 'true');
			} catch (e) {}
		});
		post.querySelector('[slot="post-media-container"]').style.display = 'none';
	});

	// Create and Append Link
	function appendLink(post, url) {
		// Edit URL
		const urlObj = new URL(url);
		urlObj.search = '';
		const image_url = urlObj.toString();

		// Create and Append Text Link
		const a = document.createElement('a');
		a.classList.add('re-media-link');
		a.href = url;
		a.target = '_blank';
		a.textContent = image_url;
		post.append(a);
	}
}

// Disable Replace Images With Links - RV3
function disableReplacePostImagesWithLinks() {
	const single = 'shreddit-feed shreddit-post:has(img.preview-img) [slot="post-media-container"]';
	const gallery = 'shreddit-feed shreddit-post:has(gallery-carousel) [slot="post-media-container"]';
	document.querySelectorAll(single, gallery).forEach((container) => {
		// Show Images
		container.removeAttribute('style');

		// Remove Text Links
		container
			.closest('shreddit-post')
			.querySelectorAll('.re-media-link')
			.forEach((link) => {
				link.remove();
			});

		// Remove "Done" Attributes
		container
			.closest('shreddit-post')
			.querySelectorAll('img')
			.forEach((img) => {
				img.removeAttribute('data-re-link');
			});
	});

	// Remove Stylesheet
	const dynamicStyleElements = document.head.querySelectorAll('style[id="replace-post-images-with-links"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// Observe feed for new posts
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			enableReplacePostImagesWithLinks();
		});
	});
});
