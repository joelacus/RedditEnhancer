/* ===== Tweaks - Media - Replace Post Images With Links ===== */

// Hide post images and show links instead on feeds.

/* === Triggered On Page Load === */
export function loadReplacePostImagesWithLinks() {
	BROWSER_API.storage.sync.get(['replacePostImagesWithLinks'], function (result) {
		replacePostImagesWithLinks(result.replacePostImagesWithLinks);
	});
}

/* === Main Functions === */

export function replacePostImagesWithLinks(value) {
	if (redditVersion === 'newnew') {
		if (value) {
			enableReplacePostImagesWithLinks();
			// if (document.querySelector('shreddit-feed')) {
			// 	observer.observe(document.querySelector('shreddit-feed'), { childList: true, subtree: true });
			// }
		} else {
			// observer.disconnect();
			disableReplacePostImagesWithLinks();
		}
	}
}

// Function - Enable Replace Images With Links
function enableReplacePostImagesWithLinks() {
	let titleHeight = document.querySelector('shreddit-post h1').offsetHeight;
	let flairHeight = document.querySelector('shreddit-post shreddit-post-flair') ?
		document.querySelector('shreddit-post shreddit-post-flair').offsetHeight + 8 : 0;
	let postLink = document.querySelector('shreddit-post[post-type="link"]').getAttribute('content-href');
	document.querySelector('div:has(> faceplate-tracker[source="post_lightbox"])').remove();

	// Append Stylesheet
	if (!document.head.querySelector('style[id="re-replace-post-images-with-links"]')) {
		const styleElement = document.createElement('style');
		styleElement.id = 're-replace-post-images-with-links';
		styleElement.textContent = `shreddit-app[routename="post_page"] shreddit-post[post-type="link"] img#post-image,
		 							shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] img#post-image {
										width: 144px;
										height: 116px;
										object-fit: cover;
										float: right;
										border-radius: var(--re-theme-border-radius, 4px);
										border: 1px solid var(--color-neutral-border-weak);
									}
									shreddit-app[routename="post_page"] shreddit-post[post-type="link"] div[slot="post-media-container"],
									shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] div[slot="post-media-container"] {
										margin-top: -${titleHeight + flairHeight}px;
										margin-left: auto;
										width: fit-content;
									}
									shreddit-app[routename="post_page"] shreddit-post[post-type="link"] h1,
									shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] h1 {
										margin-right: 152px;
									}
									shreddit-app[routename="post_page"] shreddit-post[post-type="link"] h1 + a,
									shreddit-app[routename="comment_page"] shreddit-post[post-type="link"] h1 + a {
										float: left;
										margin-top: calc(-118px + ${titleHeight + flairHeight}px);
										max-width: calc(100% - 152px);
									}`;
		document.head.insertBefore(styleElement, document.head.firstChild);
	}

	let postLink2 = document.createElement('a');
	postLink2.setAttribute('href', postLink);
	postLink2.textContent = postLink;
	postLink2.classList.add('relative', 'text-12', 'xs:text-14', 'font-semibold', 'mb-xs', 'post-link', 'max-w-full',
		'truncate', 'a', 'cursor-pointer', 'hover:underline');
	postLink2.setAttribute('target', '_blank');
	postLink2.setAttribute('rel', 'noopener noreferrer ugc');
	document.querySelector('shreddit-post').insertBefore(postLink2, document.querySelector('shreddit-post h1').nextSibling);

	// // Initial Image Posts (Single Images)
	// document.querySelectorAll('shreddit-feed shreddit-post:has(img.preview-img)').forEach((post) => {
	// 	if (post.querySelector('shreddit-blurred-container')) return;
	// 	try {
	// 		const url = post.querySelector('img.preview-img').src;
	// 		if (post.querySelector(`.re-media-link[href="${url}"]`)) return;
	// 		appendLink(post, url);
	// 		post.querySelector('[slot="post-media-container"]').style.display = 'none';
	// 	} catch (e) {}
	// });
	//
	// // Initial Image Posts (Galleries)
	// document.querySelectorAll('shreddit-feed shreddit-post:has(gallery-carousel)').forEach((post) => {
	// 	if (post.querySelector('shreddit-blurred-container')) return;
	// 	post.querySelectorAll('li > figure > img').forEach((img) => {
	// 		if (img.getAttribute('data-re-link') === 'true') return;
	// 		const url = img.src || img.getAttribute('data-lazy-src');
	// 		if (!url) return;
	// 		try {
	// 			appendLink(post, url);
	// 			img.setAttribute('data-re-link', 'true');
	// 		} catch (e) {}
	// 	});
	// 	post.querySelector('[slot="post-media-container"]').style.display = 'none';
	// });
	//
	// // Create and Append Link
	// function appendLink(post, url) {
	// 	// Edit URL
	// 	const urlObj = new URL(url);
	// 	urlObj.search = '';
	// 	const image_url = urlObj.toString();
	//
	// 	// Create and Append Text Link
	// 	const a = document.createElement('a');
	// 	a.classList.add('re-media-link');
	// 	a.href = url;
	// 	a.target = '_blank';
	// 	a.textContent = image_url;
	// 	post.append(a);
	// }
}

// Function - Disable Replace Images With Links
function disableReplacePostImagesWithLinks() {
	// const single = 'shreddit-feed shreddit-post:has(img.preview-img) [slot="post-media-container"]';
	// const gallery = 'shreddit-feed shreddit-post:has(gallery-carousel) [slot="post-media-container"]';
	// document.querySelectorAll(single, gallery).forEach((container) => {
	// 	// Show Images
	// 	container.removeAttribute('style');
	//
	// 	// Remove Text Links
	// 	container
	// 		.closest('shreddit-post')
	// 		.querySelectorAll('.re-media-link')
	// 		.forEach((link) => {
	// 			link.remove();
	// 		});
	//
	// 	// Remove "Done" Attributes
	// 	container
	// 		.closest('shreddit-post')
	// 		.querySelectorAll('img')
	// 		.forEach((img) => {
	// 			img.removeAttribute('data-re-link');
	// 		});
	// });

	// Remove Stylesheet
	const dynamicStyleElements = document.head.querySelectorAll('style[id="replace-post-images-with-links"]');
	dynamicStyleElements.forEach((element) => {
		document.head.removeChild(element);
	});
}

// // Observe feed for new posts
// const observer = new MutationObserver((mutations) => {
// 	mutations.forEach((mutation) => {
// 		mutation.addedNodes.forEach((addedNode) => {
// 			enableReplacePostImagesWithLinks();
// 		});
// 	});
// });

/*
const blurred_observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			console.log(node);
		});
	});
});

blurred_observer.observe(document.querySelector('shreddit-post:has(shreddit-blurred-container)'), { childList: true, subtree: true });
*/
